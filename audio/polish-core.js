// Grokly voice polish: the streaming DSP core (team C). Runs in a Web Worker (audio/polish-worker.js), and in node for tests.
// Same chain as spec qa/specs/voice-polish.md, rebuilt to be memory-lean:
//   • the sound is processed IN PLACE, in blocks of 64 k samples; filter / detector / delay states carry across blocks;
//   • only small block buffers (a few × 64 k floats) and per-50/100 ms arrays are allocated, never a full-length copy;
//   • dynamics compute their gains at control rate (every 8 samples, gains ramped in between), so exp/log run 1/8 as often;
//   • loudness is two-pass: measure (100 ms K-weighted sub-blocks) → constant gain, inside the streaming limiter pass.
// Passes over the sound: analysis (read), chain (expander → EQ → compressor → de-esser), leveler + gain + true-peak
// limiter (+ at most 2 small correction passes), true-peak check. Pure function of (samples, settings): deterministic,
// and the result does not depend on the block size (control steps follow the global sample index).
(function (G) {
  const D = G.GroklyDSP;
  const B = 65536, CR = 8, CH = 2; // block, control rate, exported channels (dual-mono)
  const TARGETS = { social: { lufs: -14, tp: -2.0, label: 'Social video' }, podcast: { lufs: -16, tp: -2.0, label: 'Podcast' },
    music: { lufs: -14, tp: -2.5, label: 'Music video' } }; // music: dense transients overshoot more in Opus/AAC (0.7 dB measured on a click track), so 0.5 dB more headroom // ceilings keep 1 dB for resampling + codec (Opus overshoot measured up to 0.9 dB on 300 s)
  const DB2LN = Math.LN10 / 20, LN2DB10 = 10 / Math.LN10;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const coef = (ms, sr) => Math.exp(-1 / ((ms / 1000) * sr));
  const bq = (c) => ({ b0: c.b0, b1: c.b1, b2: c.b2, a1: c.a1, a2: c.a2, z1: 0, z2: 0 });
  function runBq(f, w, n) {
    const { b0, b1, b2, a1, a2 } = f; let z1 = f.z1, z2 = f.z2;
    for (let i = 0; i < n; i++) { const v = w[i], o = b0 * v + z1; z1 = b1 * v - a1 * o + z2; z2 = b2 * v - a2 * o; w[i] = o; }
    f.z1 = z1; f.z2 = z2;
  }
  const runAll = (fs, w, n) => { for (const f of fs) runBq(f, w, n); };
  const L = (p) => (p > 0 ? -0.691 + 10 * Math.log10(p) : -Infinity);
  const median = (arr) => { const v = Float32Array.from(arr).sort(); return v.length ? v[(v.length - 1) >> 1] : NaN; };
  const pctOf = (arr, f) => { const v = Float32Array.from(arr).sort(); return v.length ? v[Math.round(f * (v.length - 1))] : NaN; };

  // ---------- streaming K-weighted meter: mean square per 100 ms sub-block ----------
  function kMeter(sr, n) {
    const fs = D.kWeight(sr).map(bq), hop = Math.round(0.1 * sr), out = new Float64Array(Math.ceil(n / hop) + 2), buf = new Float32Array(B);
    let acc = 0, cnt = 0, k = 0;
    return {
      hop,
      push(src, off, len) { buf.set(src.subarray(off, off + len)); runAll(fs, buf, len); for (let i = 0; i < len; i++) { acc += buf[i] * buf[i]; if (++cnt === hop) { out[k++] = acc / hop; acc = 0; cnt = 0; } } },
      done() { if (cnt) out[k++] = acc / hop; return out.subarray(0, k); },
    };
  }
  // BS.1770 integrated loudness from 100 ms sub-blocks (400 ms blocks = 4 sub-blocks, 100 ms hop); gl: linear gain per sub-block
  function integratedSub(sub, ch = CH, gl = null, g0 = 1) {
    const p = (i) => sub[i] * (gl ? gl[Math.min(i, gl.length - 1)] ** 2 : 1) * g0 * g0 * ch, blocks = [];
    if (sub.length < 4) { let s = 0; for (let i = 0; i < sub.length; i++) s += p(i); blocks.push(s / 4); }
    for (let j = 0; j + 4 <= sub.length; j++) blocks.push((p(j) + p(j + 1) + p(j + 2) + p(j + 3)) / 4);
    const abs = blocks.filter((b) => L(b) >= -70); if (!abs.length) return -Infinity;
    const rel = L(abs.reduce((s, b) => s + b, 0) / abs.length) - 10, kept = abs.filter((b) => L(b) >= rel);
    return L(kept.reduce((s, b) => s + b, 0) / kept.length);
  }

  // ---------- true peak, streaming (4× polyphase, same filter as dsp.js) ----------
  const TPH = (() => { const T = 48, PH = 4, I0 = (z) => { let s = 1, t = 1; for (let k = 1; k < 30; k++) { t *= (z / (2 * k)) ** 2; s += t; } return s; };
    const h = new Float64Array(T), M = (T - 1) / 2; for (let n = 0; n < T; n++) { const t = (n - M) / PH, s = t === 0 ? 1 : Math.sin(Math.PI * t) / (Math.PI * t); h[n] = (s * I0(8 * Math.sqrt(1 - ((n - M) / M) ** 2))) / I0(8); }
    const ph = []; for (let p = 1; p < PH; p++) { const c = []; for (let k = p; k < T; k += PH) c.push(h[k]); const s = c.reduce((a, b) => a + b, 0); ph.push(Float64Array.from(c, (v) => v / s)); } return ph; })();
  const NT = 12, HT = 6; // taps per phase; phases at i use y[i-5 .. i+6]
  // tp[u] for u in [u0, u1) from y (needs y[u0-6 .. u1+6] valid)
  function tpRange(y, tp, u0, u1) {
    const c1 = TPH[0], c2 = TPH[1], c3 = TPH[2];
    for (let u = u0 - 1; u < u1; u++) { const a = y[u] < 0 ? -y[u] : y[u]; if (u >= u0) tp[u] = a; }
    for (let i = u0 - 1; i < u1; i++) {
      let s1 = 0, s2 = 0, s3 = 0; const base = i + HT;
      for (let k = 0; k < NT; k++) { const v = y[base - k]; s1 += c1[k] * v; s2 += c2[k] * v; s3 += c3[k] * v; }
      let a = s1 < 0 ? -s1 : s1; const b2 = s2 < 0 ? -s2 : s2, b3 = s3 < 0 ? -s3 : s3; if (b2 > a) a = b2; if (b3 > a) a = b3;
      if (i >= u0 && a > tp[i]) tp[i] = a; if (i + 1 < u1 && a > tp[i + 1]) tp[i + 1] = a;
    }
  }
  function truePeakDb(x) { // streaming max, block buffers only
    const n = x.length, P = 8, y = new Float32Array(B + 2 * P), tp = new Float32Array(B + 2 * P); let m = 0;
    for (let a = 0; a < n; a += B) {
      const len = Math.min(B, n - a);
      for (let u = 0; u < len + 2 * P; u++) { const j = a + u - P; y[u] = j >= 0 && j < n ? x[j] : 0; }
      tpRange(y, tp, P, P + len); for (let u = P; u < P + len; u++) if (tp[u] > m) m = tp[u];
    }
    return m > 0 ? 20 * Math.log10(m) : -Infinity;
  }

  // ---------- [A] analysis (read only) ----------
  function analyse(x, sr) {
    const n = x.length, fl = Math.round(0.05 * sr), nf = Math.max(1, Math.ceil(n / fl)), fr = new Float32Array(nf); let dc = 0;
    for (let k = 0; k < nf; k++) { let s = 0; const a = k * fl, e = Math.min(n, a + fl); for (let i = a; i < e; i++) { s += x[i] * x[i]; dc += x[i]; } fr[k] = 10 * Math.log10(s / fl + 1e-20); }
    dc /= n || 1;
    // clipping: share of samples inside flat runs (≥ 3 samples) at |x| ≥ 0.98 of full scale (label only)
    let clipN = 0, run = 0; for (let i = 0; i < n; i++) { if ((x[i] < 0 ? -x[i] : x[i]) >= 0.98) { run++; if (run === 3) clipN += 3; else if (run > 3) clipN++; } else run = 0; }
    const clip = n ? clipN / n : 0;
    // background floor over ALL frames (digital silence counts as silence), for the "noisy" label only
    const floor = pctOf(Array.from(fr, (v) => Math.max(-120, v)), 0.1);
    const live = fr.filter((v) => v > -90), noise = live.length ? pctOf(live, 0.1) : -90;
    const km = kMeter(sr, n); for (let a = 0; a < n; a += B) km.push(x, a, Math.min(B, n - a));
    const sub0 = km.done(), lufs = integratedSub(sub0, 1);
    const speechThr = Math.max(noise + 10, pctOf(live, 0.5) - 12);
    const pick = (ok, max) => { const ks = []; for (let k = 0; k < nf; k++) if (ok(k)) ks.push(k); const st = Math.max(1, Math.ceil(ks.length / max)); return ks.filter((_, i) => i % st === 0); };
    // F0: normalised autocorrelation on a 4× decimated 40 ms window (computed per frame, ≤ 300 frames)
    const dsr = sr / 4, W = Math.round(0.04 * dsr), lo = Math.floor(dsr / 400), hi = Math.ceil(dsr / 70), dec = new Float32Array(W + hi + 1), f0s = [];
    for (const k of pick((k) => fr[k] >= speechThr, 300)) {
      const a = k * fl; if (a + 4 * (W + hi + 1) >= n) continue;
      for (let i = 0; i < dec.length; i++) { const j = a + 4 * i; dec[i] = (x[j] + x[j + 1] + x[j + 2] + x[j + 3]) / 4; }
      let e0 = 0; for (let i = 0; i < W; i++) e0 += dec[i] * dec[i];
      let best = 0, bl = 0;
      for (let l = lo; l <= hi; l++) { let c = 0, e1 = 0; for (let i = 0; i < W; i++) { c += dec[i] * dec[i + l]; e1 += dec[i + l] * dec[i + l]; } const r = c / Math.sqrt(e0 * e1 + 1e-12); if (r > best) { best = r; bl = l; } }
      if (best > 0.6) f0s.push(dsr / bl);
    }
    const f0 = f0s.length >= 5 ? median(f0s) : 0;
    // spectra: 8192-pt over ≤ 40 quiet frames (hum), 4096-pt LTAS over ≤ 120 speech frames, spread over the sound
    const w8 = D.hann(8192), w4 = D.hann(4096); let quiet = null, nq = 0, ltas = null, ns = 0;
    for (const k of pick((k) => fr[k] < noise + 4 && fr[k] > -90 && k * fl + 8192 <= n, 40)) { const p = D.power(x, k * fl, 8192, w8); quiet = quiet || new Float64Array(4096); for (let i = 0; i < 4096; i++) quiet[i] += p[i]; nq++; }
    for (const k of pick((k) => fr[k] >= speechThr && k * fl + 4096 <= n, 120)) { const p = D.power(x, k * fl, 4096, w4); ltas = ltas || new Float64Array(2048); for (let i = 0; i < 2048; i++) ltas[i] += p[i]; ns++; }
    let hum = 0;
    if (quiet && nq >= 4) {
      const bin = sr / 8192, dbAt = (f) => { let m = 0; for (let b = Math.floor((f - 1) / bin); b <= Math.ceil((f + 1) / bin); b++) m = Math.max(m, quiet[b]); return 10 * Math.log10(m + 1e-30); };
      const ref = []; for (let b = Math.round(30 / bin); b <= Math.round(300 / bin); b++) ref.push(10 * Math.log10(quiet[b] + 1e-30));
      const med = median(ref); for (const h of [50, 60]) if (dbAt(h) >= med + 12 && [2, 3].some((m) => dbAt(h * m) >= med + 6)) { hum = h; break; }
    }
    let bands = null, rolloff = sr / 2;
    if (ltas && ns >= 3) {
      const bin = sr / 4096, band = (a, b) => { let s = 0; for (let i = Math.max(1, Math.round(a / bin)); i <= Math.min(2047, Math.round(b / bin)); i++) s += ltas[i]; return 10 * Math.log10(s / ns + 1e-30); };
      bands = { band, e150_400: band(150, 400), e1k_4k: band(1000, 4000), e4k_8k: band(4000, 8000) };
      let mx = 0; for (let i = 1; i < 2048; i++) mx = Math.max(mx, ltas[i]);
      for (let i = 2047; i > 0; i--) if (ltas[i] > mx * 1e-5) { rolloff = i * bin; break; }
    }
    // compressor threshold: median 400 ms speech level + 4 dB (8 frames, hop 2 frames)
    const lv = []; for (let k = 0; k + 8 <= nf; k += 2) { let s = 0; for (let j = k; j < k + 8; j++) s += Math.pow(10, fr[j] / 10); const d = 10 * Math.log10(s / 8); if (d > speechThr) lv.push(d); }
    return { n, fr, fl, dc, noise, lufs, f0, hum, bands, rolloff, snr: lufs - noise, floor, clip, speechThr, compT: lv.length >= 3 ? median(lv) + 4 : null };
  }

  // ---------- adaptive EQ (coefficients only) ----------
  function eqFilters(sr, A, k) {
    const cs = [], moves = [], b = A.bands;
    let mud = -2; if (b) mud = -Math.min(4, Math.max(0, b.e150_400 - b.e1k_4k - 6));
    if (mud < -0.1) { let fm = 250; if (b) { let best = -1e9; for (let f = 180; f <= 350; f *= 1.06) { const e = b.band(f / 1.06, f * 1.06); if (e > best) { best = e; fm = f; } } } cs.push(D.biquad('peaking', fm, 1.0, mud * k, sr)); moves.push(`mud ${Math.round(fm)} Hz ${(mud * k).toFixed(1)} dB`); }
    if (b) { let best = 0, fb = 0; const r = Math.pow(2, 1 / 6), t = Math.pow(2, 1 / 3);
      for (let f = 500; f <= 1200; f *= 1.04) { const e = b.band(f / r, f * r), nb = (b.band(f / t / r, (f / t) * r) + b.band((f * t) / r, f * t * r)) / 2, ex = e - nb; if (ex > 4 && ex > best) { best = ex; fb = f; } }
      if (fb) { cs.push(D.biquad('peaking', fb, 2.0, -2 * k, sr)); moves.push(`box ${Math.round(fb)} Hz`); } }
    if (!b || b.e4k_8k <= b.e1k_4k - 6) { cs.push(D.biquad('peaking', 3500, 0.9, Math.min(3, 2 * k), sr)); moves.push('presence +' + Math.min(3, 2 * k).toFixed(1)); }
    if (A.rolloff >= 8000 && sr > 24000) { cs.push(D.biquad('highshelf', 10000, Math.SQRT1_2, Math.min(3, 1.5 * k), sr)); moves.push('air +' + Math.min(3, 1.5 * k).toFixed(1)); }
    return { fs: cs.map(bq), moves };
  }

  // ---------- pass 1: high-pass/notches → expander → EQ → compressor → de-esser, in place ----------
  function chain(x, sr, A, strength, prog) {
    const n = x.length, info = {};
    const fc = A.f0 > 165 ? 100 : A.f0 && A.f0 < 100 ? 70 : 80; info.hp = fc;
    const pre = D.butterHP4(fc, sr); if (A.hum) for (let m = 1; m <= 5 && A.hum * m < sr / 2; m++) pre.push(D.biquad('notch', A.hum * m, 30, 0, sr));
    const preF = pre.map(bq), eq = eqFilters(sr, A, strength); info.eq = eq.moves;
    // expander (1:2 below T, range 10 dB, hysteresis 3 dB, attack 1 / hold 60 / release 150 ms, look-ahead 5 ms)
    const exOn = A.snr >= 20, T = clamp(A.noise + 8, -65, -35), LA = exOn ? Math.round(0.005 * sr) : 0; info.expander = exOn;
    const ring = new Float32Array(Math.max(1, LA)); let rp = 0, xms = 0, xopen = false, xg = 0, xheld = 0, xgl = 1, xdg = 0;
    const xcR = coef(10, sr), xcA = Math.pow(coef(1, sr), CR), xcRel = Math.pow(coef(150, sr), CR), xhold = Math.round(0.06 * sr);
    // compressor 3:1, knee 6 dB, detector RMS 5 ms, attack 15 / release 150 ms
    const cT = A.compT, cOn = cT !== null, R = 3, knee = 6, ccD = coef(5, sr), ccA = Math.pow(coef(15, sr), CR), ccRel = Math.pow(coef(150, sr), CR);
    const sgain = (l) => { const o = l - cT; if (o <= -knee / 2) return 0; if (o >= knee / 2) return -(o * (1 - 1 / R)); const z = o + knee / 2; return -((1 - 1 / R) * z * z) / (2 * knee); };
    let cms = 0, cg = 0, cgl = 1, cdg = 0, grSum = 0, grN = 0;
    // de-esser: detector 5–9 kHz vs full band (RMS 2 ms), split 4.5 kHz Linkwitz-Riley, ≤ 6 dB on the top band
    const dOn = sr >= 20000, sideF = dOn ? [D.biquad('highpass', 5000, Math.SQRT1_2, 0, sr), D.biquad('lowpass', 9000, Math.SQRT1_2, 0, sr)].map(bq) : [];
    const loF = dOn ? D.lr4('lowpass', 4500, sr).map(bq) : [], hiF = dOn ? D.lr4('highpass', 4500, sr).map(bq) : [];
    const dcD = coef(2, sr), dcA = Math.pow(coef(1, sr), CR), dcRel = Math.pow(coef(60, sr), CR);
    let dms = 0, dmf = 0, dg = 0, dgl = 1, ddg = 0, dmax = 0;
    const w = new Float32Array(B), s = new Float32Array(B), lo = new Float32Array(B);
    const km = kMeter(sr, n);
    let gi = 0; // global stream index (control steps follow it, so blocks do not change the result)
    for (let a = 0; a < n + LA; a += B) {
      const len = Math.min(B, n + LA - a);
      for (let i = 0; i < len; i++) { const j = a + i; w[i] = j < n ? x[j] - A.dc : 0; }
      runAll(preF, w, len);
      if (exOn) for (let i = 0; i < len; i++, gi++) {
        const v = w[i]; xms = xcR * xms + (1 - xcR) * v * v;
        if (gi % CR === 0) {
          const lv = LN2DB10 * Math.log(xms + 1e-20); if (lv >= T) xopen = true; else if (lv < T - 3) xopen = false;
          const thr = xopen ? T - 3 : T, want = lv < thr ? Math.max(-10, lv - thr) : 0;
          if (want >= xg) { xg = xcA * xg + (1 - xcA) * want; xheld = xhold; } else if (xheld > 0) xheld -= CR; else xg = xcRel * xg + (1 - xcRel) * want;
          xdg = (Math.exp(xg * DB2LN) - xgl) / CR;
        }
        xgl += xdg; const d = ring[rp]; ring[rp] = v; rp = rp + 1 === LA ? 0 : rp + 1; w[i] = d * xgl; // gain at t applied to the sound 5 ms earlier
      } else gi += len;
      runAll(eq.fs, w, len);
      if (cOn) for (let i = 0, g = gi - len; i < len; i++, g++) {
        const v = w[i]; cms = ccD * cms + (1 - ccD) * v * v;
        if (g % CR === 0) { const lv = LN2DB10 * Math.log(cms + 1e-20), want = sgain(lv); cg = want < cg ? ccA * cg + (1 - ccA) * want : ccRel * cg + (1 - ccRel) * want; cdg = (Math.exp(cg * DB2LN) - cgl) / CR; if (lv > A.speechThr) { grSum -= cg; grN++; } }
        cgl += cdg; w[i] = v * cgl;
      }
      if (dOn) {
        s.set(w.subarray(0, len)); lo.set(w.subarray(0, len)); runAll(sideF, s, len); runAll(loF, lo, len); runAll(hiF, w, len);
        for (let i = 0, g = gi - len; i < len; i++, g++) {
          const full = lo[i] + w[i]; dms = dcD * dms + (1 - dcD) * s[i] * s[i]; dmf = dcD * dmf + (1 - dcD) * full * full;
          if (g % CR === 0) { const ex = LN2DB10 * Math.log((dms + 1e-20) / (dmf + 1e-20)) + 6, want = ex > 0 && dmf > 1e-7 ? -Math.min(ex * 0.7, 6) : 0; dg = want < dg ? dcA * dg + (1 - dcA) * want : dcRel * dg + (1 - dcRel) * want; if (-dg > dmax) dmax = -dg; ddg = (Math.exp(dg * DB2LN) - dgl) / CR; }
          dgl += ddg; w[i] = lo[i] + w[i] * dgl;
        }
      }
      // write back (the stream is LA samples late: stream index j → sound index j − LA), and measure
      const o0 = Math.max(0, LA - a), o1 = Math.min(len, n + LA - a);
      if (o1 > o0) { x.set(w.subarray(o0, o1), a + o0 - LA); km.push(w, o0, o1 - o0); }
      if (prog) prog(0.15 + (0.55 * Math.min(n, a + len)) / n);
    }
    info.compGR = grN ? +(grSum / grN).toFixed(2) : 0; info.deessMax = +dmax.toFixed(1);
    return { info, sub: km.done() };
  }

  // ---------- leveler gains per 100 ms sub-block: slow ride toward the speech median, frozen in pauses ----------
  function levelerGains(sub, A) {
    const n = sub.length, half = 15, st = new Float32Array(n), sp = new Uint8Array(n), fr = A.fr; let acc = 0, cnt = 0; // 3 s window centred on k
    for (let k = 0; k < n + half; k++) { if (k < n) { acc += sub[k]; cnt++; } if (k >= 2 * half && k - 2 * half < n) { acc -= sub[k - 2 * half]; cnt--; } const c = k - half; if (c >= 0 && c < n) st[c] = L(acc / Math.max(1, cnt)); }
    for (let k = 0; k < n; k++) { const p = (Math.pow(10, (fr[2 * k] ?? -200) / 10) + Math.pow(10, (fr[2 * k + 1] ?? -200) / 10)) / 2; sp[k] = 10 * Math.log10(p + 1e-20) > A.speechThr && st[k] > -70 ? 1 : 0; }
    const vals = []; for (let k = 0; k < n; k++) if (sp[k]) vals.push(st[k]);
    if (vals.length < 10) return { gl: null, range: 0 };
    const med = median(vals), gl = new Float32Array(n); let g = 0, mx = 0;
    for (let k = 0; k < n; k++) { if (sp[k]) g += clamp(clamp(med - st[k], -6, 6) - g, -0.2, 0.2); gl[k] = Math.exp(g * DB2LN); mx = Math.max(mx, Math.abs(g)); } // ≤ 2 dB/s
    return { gl, range: +mx.toFixed(1) };
  }

  // ---------- gain (leveler curve × constant) + true-peak limiter, streaming, in place ----------
  // look-ahead 5 ms: g = ceiling / true peak, sliding minimum over [i, i+L], box average over [i−L, i] (never above g),
  // exponential release 80 ms. Returns the output's K-weighted sub-blocks and the share of samples limited by > 4 dB.
  function limitPass(x, sr, ceilDb, gl, g0, prog, p0, p1) {
    const n = x.length, LL = Math.round(0.005 * sr), P = LL + 8, ceil = Math.pow(10, (ceilDb - 0.1) / 20), rel = 1 - coef(80, sr);
    const hop = Math.round(0.1 * sr), Y = new Float32Array(B + 2 * P), TP = new Float32Array(B + 2 * P), M = new Float32Array(B + 2 * P), dq = new Int32Array(B + 2 * P), out = new Float32Array(B);
    const km = kMeter(sr, n);
    const gainAt = (j) => { if (!gl) return g0; const p = j / hop, k = Math.floor(p), f = p - k, a = gl[Math.min(k, gl.length - 1)], b = gl[Math.min(k + 1, gl.length - 1)]; return (a + (b - a) * f) * g0; };
    let r = 1, heavy = 0, prevLen = 0;
    for (let a = 0; a < n; a += B) {
      const len = Math.min(B, n - a);
      if (a) Y.copyWithin(0, prevLen, prevLen + P); else Y.fill(0, 0, P); // carry: the un-limited y of the previous P samples
      for (let u = P; u < len + 2 * P; u++) { const j = a + u - P; Y[u] = j < n ? x[j] * gainAt(j) : 0; } // x[j ≥ a+len] is not written yet
      const u0 = P - LL, u1 = P + len + LL; tpRange(Y, TP, u0, u1);
      for (let u = u0; u < u1; u++) TP[u] = TP[u] > ceil ? ceil / TP[u] : 1; // TP now holds g
      // M[u] = min g[u .. u+LL], u in [u0, P+len) (monotonic deque, scanning down)
      let h = 0, t = 0;
      for (let u = u1 - 1; u >= u0; u--) { while (t > h && TP[dq[t - 1]] >= TP[u]) t--; dq[t++] = u; while (dq[h] > u + LL) h++; if (u < P + len) M[u] = TP[dq[h]]; }
      let acc = 0; for (let u = u0; u < P; u++) acc += M[u];
      for (let u = P, i = 0; u < P + len; u++, i++) {
        acc += M[u]; const sm = acc / (LL + 1); acc -= M[u - LL];
        r = Math.min(sm, r + (1 - r) * rel); if (r < 0.631) heavy++;
        out[i] = Y[u] * r;
      }
      x.set(out.subarray(0, len), a); km.push(out, 0, len); prevLen = len;
      if (prog) prog(p0 + ((p1 - p0) * (a + len)) / n);
    }
    return { sub: km.done(), heavy: heavy / Math.max(1, n) };
  }

  // 8–10: constant gain to the target (as dual-mono stereo), true-peak limit, re-measure, correct ≤ 2 times
  function normalise(x, sr, tgt, sub, gl, maxGain, prog, natural = true) {
    let target = tgt.lufs; const L0 = integratedSub(sub, CH, gl);
    if (!isFinite(L0)) return { lufs: -Infinity, tp: -Infinity, gain: 0, target, heavy: 0 };
    const g = clamp(target - L0, -40, maxGain);
    let lim = limitPass(x, sr, tgt.tp, gl, Math.exp(g * DB2LN), prog, 0.72, 0.88), now = integratedSub(lim.sub, CH), gain = g;
    if (natural && lim.heavy > 0.01) target -= 1; // voice: > 4 dB of limiting on > 1 % of the sound ⇒ 1 LU quieter, natural (never for the export master)
    // the limiter took some loudness: small corrections on the limited sound, secant steps (loudness gained per dB)
    let slope = 0.6;
    for (let k = 0; k < 4 && Math.abs(now - target) > 0.25 && gain < maxGain; k++) {
      const c = clamp((target - now) / slope, -12, maxGain - gain), was = now; gain += c;
      lim = limitPass(x, sr, tgt.tp, null, Math.exp(c * DB2LN), prog, 0.88 + k * 0.025, 0.905 + k * 0.025); now = integratedSub(lim.sub, CH);
      if (Math.abs(c) > 0.05) slope = clamp((now - was) / c, 0.2, 1);
    }
    return { lufs: now, tp: truePeakDb(x), gain, target, heavy: lim.heavy };
  }

  // the whole chain, in place on x (a Float32Array the caller owns)
  function polish(x, sr, opt = {}, prog) {
    const tgt = TARGETS[opt.target] || TARGETS.social, strength = opt.strength || 1;
    const A = analyse(x, sr); if (prog) prog(0.15);
    const info = { analysis: { noise: +A.noise.toFixed(1), lufsIn: +(A.lufs + 3.01).toFixed(1), f0: Math.round(A.f0), hum: A.hum, snr: +A.snr.toFixed(1), rolloff: Math.round(A.rolloff), floor: +A.floor.toFixed(1), clip: +A.clip.toFixed(5) } };
    if (!isFinite(A.lufs)) return { silent: true, ...info };
    const c = chain(x, sr, A, strength, prog); Object.assign(info, c.info);
    const lev = opt.leveler === false ? { gl: null, range: 0 } : levelerGains(c.sub, A); info.leveler = lev.range;
    const r = normalise(x, sr, tgt, c.sub, lev.gl, 30, prog);
    Object.assign(info, { lufs: r.lufs, tp: r.tp, gain: r.gain, target: r.target, limited: +r.heavy.toFixed(4) });
    if (prog) prog(1);
    return info;
  }
  // export: 8–10 on the final sound (voice + music), in place
  function master(x, sr, target, prog) {
    const km = kMeter(sr, x.length); for (let a = 0; a < x.length; a += B) km.push(x, a, Math.min(B, x.length - a));
    const r = normalise(x, sr, TARGETS[target] || TARGETS.social, km.done(), null, 20, prog, false);
    return { lufs: r.lufs, tp: r.tp, gain: r.gain };
  }
  // full-length measurement, streaming (tests / read-outs)
  function measure(x, sr) { const km = kMeter(sr, x.length); for (let a = 0; a < x.length; a += B) km.push(x, a, Math.min(B, x.length - a)); return { lufs: integratedSub(km.done(), CH), tp: truePeakDb(x) }; }

  G.GroklyPolishCore = { TARGETS, CH, polish, master, measure, analyse, truePeakDb, integratedSub, kMeter, B };
})(typeof self !== 'undefined' ? self : globalThis);
