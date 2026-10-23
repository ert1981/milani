// Grokly "Find who speaks" (team C): non-AI two-speaker turn detection, after spec qa/specs/audio-analysis.md §3,
// simplified to the unit the app tags: each subtitle line. Our own code; classic signal processing, deterministic.
//   per 20 ms frame on speech: 13 MFCC (26 mel filters 100–8000 Hz, log, DCT-II, c0 dropped), F0 (normalised
//   autocorrelation, 70–400 Hz), spectral centroid → per line: mean MFCC, median F0 in semitones, mean centroid
//   → z-score per dimension (F0 weighted ×3, centroid ×1) → k-means k = 2, seeded with the two most distant lines,
//   weighted by speech frames → short lines (< 0.8 s) follow their neighbours → Host = the voice of the first line.
// Check: ΔBIC per frame (one diagonal Gaussian vs the two clusters, MFCC + F0): < 0.2 ⇒ one voice (all Host);
// < 1 ⇒ the voices sound alike and we say so. (Measured: one voice −0.1…0.0; two voices 4.2–6.9.)
// It only fills the Host / Guest tags; the user can change any line.
(() => {
  const D = window.GroklyDSP, N = 2048;
  let mel = null;
  function melBank(sr) {
    if (mel && mel.sr === sr) return mel.f;
    const m = (f) => 2595 * Math.log10(1 + f / 700), im = (v) => 700 * (Math.pow(10, v / 2595) - 1), lo = m(100), hi = m(8000), pts = [];
    for (let i = 0; i < 28; i++) pts.push(Math.round((im(lo + ((hi - lo) * i) / 27) * N) / sr));
    const f = []; for (let b = 0; b < 26; b++) { const a = pts[b], c = pts[b + 1], e = pts[b + 2], w = new Float64Array(N / 2); for (let k = a; k <= e; k++) w[k] = k <= c ? (k - a) / Math.max(1, c - a) : (e - k) / Math.max(1, e - c); f.push(w); }
    mel = { sr, f }; return f;
  }
  const dct = (v) => { const out = []; for (let k = 1; k <= 13; k++) { let s = 0; for (let n = 0; n < v.length; n++) s += v[n] * Math.cos((Math.PI * k * (n + 0.5)) / v.length); out.push(s); } return out; };

  function frames(x, sr) {
    const hop = Math.round(0.02 * sr), w = D.hann(N), fb = melBank(sr), nf = Math.max(0, Math.floor((x.length - N) / hop) + 1), E = [];
    for (let k = 0; k < nf; k++) { let s = 0; for (let i = k * hop; i < k * hop + N; i += 2) s += x[i] * x[i]; E.push(10 * Math.log10((2 * s) / N + 1e-20)); }
    const live = E.filter((e) => e > -90), thr = Math.max(D.pct(live, 0.15) + 10, D.pct(live, 0.6) - 15);
    // F0 on a 2× decimated copy (cheap low-pass: pair average)
    const dsr = sr / 2, dx = new Float32Array(Math.floor(x.length / 2)); for (let i = 0; i < dx.length; i++) dx[i] = (x[2 * i] + x[2 * i + 1]) / 2;
    const W = Math.round(0.03 * dsr), lo = Math.floor(dsr / 400), hi = Math.ceil(dsr / 70);
    const out = [];
    for (let k = 0; k < nf; k++) {
      if (E[k] < thr) { out.push(null); continue; }
      const p = D.power(x, k * hop, N, w), mels = fb.map((f) => { let s = 0; for (let i = 0; i < f.length; i++) if (f[i]) s += f[i] * p[i]; return Math.log(s + 1e-10); });
      let cs = 0, ct = 0; for (let i = 1; i < N / 2; i++) { cs += i * p[i]; ct += p[i]; }
      const a = Math.floor((k * hop) / 2); let f0 = 0;
      if (a + W + hi < dx.length) {
        let e0 = 0; for (let i = 0; i < W; i++) e0 += dx[a + i] * dx[a + i];
        let best = 0, bl = 0; for (let l = lo; l <= hi; l++) { let c = 0, e1 = 0; for (let i = 0; i < W; i++) { c += dx[a + i] * dx[a + i + l]; e1 += dx[a + i + l] * dx[a + i + l]; } const r = c / Math.sqrt(e0 * e1 + 1e-12); if (r > best) { best = r; bl = l; } }
        if (best > 0.7) f0 = dsr / bl;
      }
      out.push({ t: (k * hop + N / 2) / sr, mfcc: dct(mels), f0, cen: ((ct ? cs / ct : 0) * sr) / N });
    }
    return out;
  }

  // lines: [{ start, end }] in seconds → { labels: ['host'|'guest'], confidence, voices }
  function detect(x, sr, lines) {
    const F = frames(x, sr), segs = lines.map((ln) => {
      const fr = F.filter((f) => f && f.t >= ln.start && f.t < ln.end);
      if (fr.length < 5) return null;
      const m = new Array(13).fill(0); fr.forEach((f) => f.mfcc.forEach((v, i) => (m[i] += v / fr.length)));
      const f0 = fr.filter((f) => f.f0).map((f) => 12 * Math.log2(f.f0 / 100));
      return { n: fr.length, v: [...m, f0.length >= 3 ? D.pct(f0, 0.5) : NaN, fr.reduce((s, f) => s + f.cen, 0) / fr.length] };
    });
    const ok = segs.filter(Boolean);
    if (ok.length < 2) return { labels: lines.map(() => 'host'), confidence: 0, reason: 'few' };
    const dim = ok[0].v.length, f0Med = D.pct(ok.map((s) => s.v[13]).filter((v) => isFinite(v)), 0.5);
    ok.forEach((s) => { if (!isFinite(s.v[13])) s.v[13] = isFinite(f0Med) ? f0Med : 0; });
    const W = [...new Array(13).fill(1), 3, 1], mu = [], sd = [];
    for (let d = 0; d < dim; d++) { const col = ok.map((s) => s.v[d]), m = col.reduce((a, b) => a + b, 0) / col.length; mu.push(m); sd.push(Math.sqrt(col.reduce((a, b) => a + (b - m) ** 2, 0) / col.length) || 1); }
    ok.forEach((s) => (s.z = s.v.map((v, d) => ((v - mu[d]) / sd[d]) * W[d])));
    const dist = (a, b) => Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
    let A = 0, B = 1, far = -1; for (let i = 0; i < ok.length; i++) for (let j = i + 1; j < ok.length; j++) { const d = dist(ok[i].z, ok[j].z); if (d > far) { far = d; A = i; B = j; } }
    let c = [ok[A].z.slice(), ok[B].z.slice()], lab = ok.map(() => 0);
    for (let it = 0; it < 30; it++) {
      const nl = ok.map((s) => (dist(s.z, c[0]) <= dist(s.z, c[1]) ? 0 : 1)), same = nl.every((v, i) => v === lab[i]); lab = nl;
      for (const k of [0, 1]) { const mem = ok.filter((_, i) => lab[i] === k), wsum = mem.reduce((s, m) => s + m.n, 0); if (!wsum) continue; c[k] = c[k].map((_, d) => mem.reduce((s, m) => s + m.z[d] * m.n, 0) / wsum); }
      if (same && it) break;
    }
    const within = ok.reduce((s, m, i) => s + dist(m.z, c[lab[i]]), 0) / ok.length, conf = dist(c[0], c[1]) / (within || 1e-6);
    // back to every line (lines without enough speech take the previous line's voice), then short lines follow neighbours
    let k = 0, prev = null; const per = segs.map((s) => (s ? (prev = lab[k++]) : prev));
    const first = per.findIndex((v) => v !== null); for (let i = 0; i < per.length; i++) if (per[i] === null) per[i] = first >= 0 ? per[first] : 0;
    for (let i = 0; i < per.length; i++) {
      if (lines[i].end - lines[i].start >= 0.8) continue;
      const a = i > 0 ? per[i - 1] : null, b = i + 1 < per.length ? per[i + 1] : null;
      if (a !== null && (b === null || a === b)) per[i] = a; else if (a === null && b !== null) per[i] = b;
    }
    // ΔBIC per frame (diagonal Gaussians on MFCC + F0 of the speech frames: one voice vs the two clusters, λ = 1)
    const fv = (f) => [...f.mfcc, f.f0 ? 12 * Math.log2(f.f0 / 100) : NaN];
    const pool = [[], []]; segs.forEach((s, i) => { if (!s) return; const ln = lines[i], kk = per[i]; for (const f of F) if (f && f.t >= ln.start && f.t < ln.end) pool[kk].push(fv(f)); });
    const ldet = (rows) => { let s = 0; for (let d = 0; d < 14; d++) { const col = rows.map((r) => r[d]).filter((v) => isFinite(v)); if (col.length < 3) continue; const m = col.reduce((a, b) => a + b, 0) / col.length; s += Math.log(col.reduce((a, b) => a + (b - m) ** 2, 0) / col.length + 1e-6); } return s; };
    const n0 = pool[0].length, n1 = pool[1].length, nn = n0 + n1, dBIC = n0 && n1 ? (nn * ldet([...pool[0], ...pool[1]]) - n0 * ldet(pool[0]) - n1 * ldet(pool[1])) / 2 - 0.5 * 28 * Math.log(nn) : 0;
    const oneVoice = dBIC / Math.max(1, nn) < 0.2; // one Gaussian explains the frames as well as two ⇒ one voice
    const host = per[0], labels = per.map((v) => (oneVoice || v === host ? 'host' : 'guest'));
    const f0Of = (v) => { const xs = ok.filter((_, i) => (lab[i] === v)).map((s) => s.v[13]); return xs.length ? Math.round(100 * Math.pow(2, D.pct(xs, 0.5) / 12)) : 0; };
    return { labels, confidence: +conf.toFixed(2), dBIC: +(dBIC / Math.max(1, nn)).toFixed(3), voices: { host: { f0: f0Of(host), lines: labels.filter((l) => l === 'host').length }, guest: { f0: f0Of(1 - host), lines: labels.filter((l) => l === 'guest').length } } };
  }

  // ---------- UI (Subtitles tab) ----------
  let ui = null, H = null, undo = null;
  function mount(box, host) {
    if (!box) return; H = host;
    const el = document.createElement('div'); el.className = 'vp';
    el.innerHTML = `<div class="vp-row"><button class="btn small" id="spkFind" type="button">Find who speaks</button><button class="btn small" id="spkUndo" type="button" hidden>Undo</button></div>
      <div class="note" id="spkNote" role="status" aria-live="polite">Two voices (a podcast)? Milani listens to each subtitle line and marks it Host or Guest; you can change any line.</div>`;
    box.append(el);
    ui = { btn: el.querySelector('#spkFind'), undo: el.querySelector('#spkUndo'), note: el.querySelector('#spkNote') };
    ui.btn.onclick = run; ui.undo.onclick = back;
  }
  function run() {
    const S = H.S, lines = S.subs.filter((s) => s.text.trim() && !s.sample);
    if (lines.length < 2) { ui.note.textContent = 'Make the subtitles first (Turn my speech into text, or type the lines), then press Find who speaks.'; return; }
    ui.btn.disabled = true; ui.note.textContent = 'Listening for two voices…';
    setTimeout(() => {
      try {
        const r = detect(S.pcm, H.SR, lines); undo = { subs: S.subs, was: S.subs.map((s) => s.who) };
        lines.forEach((s, i) => (s.who = r.labels[i]));
        const g = r.voices ? r.voices.guest.lines : 0;
        ui.note.textContent = !g ? 'We heard one voice only, so every line is Host.'
          : r.dBIC < 1 ? `The two voices sound alike, so some lines may be wrong: please check them (Host ${r.voices.host.lines} lines, Guest ${g}).`
          : `Host ${r.voices.host.lines} lines, Guest ${g} lines.` + (S.guest ? ' To fix a line, choose Host or Guest in its menu.' : ' Add a guest photo in the Photo tab to show who speaks.');
        ui.undo.hidden = false; H.renderLines(); H.drawPreview(H.curFrame());
      } catch (e) { console.warn('Grokly speakers', e); ui.note.textContent = 'Could not tell the voices apart on this sound. You can set Host / Guest on each line.'; }
      finally { ui.btn.disabled = false; }
    }, 30);
  }
  function back() { const S = H.S; if (!undo || undo.subs !== S.subs) { ui.undo.hidden = true; return; } S.subs.forEach((s, i) => { if (undo.was[i] === undefined) delete s.who; else s.who = undo.was[i]; }); undo = null; ui.undo.hidden = true; ui.note.textContent = 'Host / Guest tags restored.'; H.renderLines(); H.drawPreview(H.curFrame()); }

  window.GroklySpeakers = { detect, frames, mount, run };
})();
