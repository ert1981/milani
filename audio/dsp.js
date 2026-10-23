// Grokly audio (team C): shared DSP for app/audio/*.js. Our own code (no third-party code), pure functions, no clocks,
// no randomness, so every result is a deterministic function of the input samples.
//   biquads (RBJ Audio-EQ-Cookbook formulas, as the Web Audio spec uses), radix-2 FFT,
//   ITU-R BS.1770-4 / EBU R128 loudness (K-weighting, 400 ms blocks / 100 ms hop, −70 abs and −10 LU relative gates),
//   short-term loudness, LRA (EBU Tech 3342), 4× oversampled true peak.
(() => {
  // ---------- biquads ----------
  // c = { b0, b1, b2, a1, a2 } (normalised by a0)
  function biquad(type, f, Q, gainDb, sr) {
    const w = (2 * Math.PI * f) / sr, cs = Math.cos(w), sn = Math.sin(w), al = sn / (2 * Q), A = Math.pow(10, (gainDb || 0) / 40);
    let b0, b1, b2, a0, a1, a2;
    switch (type) {
      case 'highpass': b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = b0; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al; break;
      case 'lowpass': b0 = (1 - cs) / 2; b1 = 1 - cs; b2 = b0; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al; break;
      case 'notch': b0 = 1; b1 = -2 * cs; b2 = 1; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al; break;
      case 'peaking': b0 = 1 + al * A; b1 = -2 * cs; b2 = 1 - al * A; a0 = 1 + al / A; a1 = -2 * cs; a2 = 1 - al / A; break;
      case 'highshelf': { const s2 = 2 * Math.sqrt(A) * al;
        b0 = A * (A + 1 + (A - 1) * cs + s2); b1 = -2 * A * (A - 1 + (A + 1) * cs); b2 = A * (A + 1 + (A - 1) * cs - s2);
        a0 = A + 1 - (A - 1) * cs + s2; a1 = 2 * (A - 1 - (A + 1) * cs); a2 = A + 1 - (A - 1) * cs - s2; break; }
      default: throw new Error('biquad type ' + type);
    }
    return { b0: b0 / a0, b1: b1 / a0, b2: b2 / a0, a1: a1 / a0, a2: a2 / a0 };
  }
  // filter x through a cascade of biquads (transposed direct form II, float64 state) → new Float32Array
  function filter(x, cs) {
    let y = Float32Array.from(x);
    for (const c of cs) {
      const { b0, b1, b2, a1, a2 } = c; let z1 = 0, z2 = 0;
      for (let i = 0; i < y.length; i++) { const v = y[i], o = b0 * v + z1; z1 = b1 * v - a1 * o + z2; z2 = b2 * v - a2 * o; y[i] = o; }
    }
    return y;
  }
  const butterHP4 = (f, sr) => [biquad('highpass', f, 0.5412, 0, sr), biquad('highpass', f, 1.3066, 0, sr)];
  const lr4 = (type, f, sr) => [biquad(type, f, Math.SQRT1_2, 0, sr), biquad(type, f, Math.SQRT1_2, 0, sr)]; // Linkwitz-Riley 24 dB/oct

  // ---------- FFT (in place, radix 2) ----------
  function fft(re, im) {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) { let b = n >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; } }
    for (let len = 2; len <= n; len <<= 1) {
      const ang = (-2 * Math.PI) / len, wr = Math.cos(ang), wi = Math.sin(ang);
      for (let i = 0; i < n; i += len) {
        let cr = 1, ci = 0;
        for (let k = 0; k < len / 2; k++) {
          const a = i + k, b = a + len / 2, tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
          re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
          const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr;
        }
      }
    }
  }
  const hann = (n) => { const w = new Float32Array(n); for (let i = 0; i < n; i++) w[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1)); return w; };
  // power spectrum (|X|², length n/2) of x[a .. a+n) with window w
  function power(x, a, n, w) {
    const re = new Float64Array(n), im = new Float64Array(n);
    for (let i = 0; i < n; i++) re[i] = (x[a + i] || 0) * w[i];
    fft(re, im); const p = new Float64Array(n / 2);
    for (let i = 0; i < n / 2; i++) p[i] = re[i] * re[i] + im[i] * im[i];
    return p;
  }

  // ---------- loudness (BS.1770-4) ----------
  // K-weighting coefficients for any sample rate from the analogue prototype (same derivation as pyloudnorm)
  function kWeight(sr) {
    let f0 = 1681.974450955533, G = 3.999843853973347, Q = 0.7071752369554196, K = Math.tan((Math.PI * f0) / sr);
    const Vh = Math.pow(10, G / 20), Vb = Math.pow(Vh, 0.4996667741545416), a0 = 1 + K / Q + K * K;
    const shelf = { b0: (Vh + (Vb * K) / Q + K * K) / a0, b1: (2 * (K * K - Vh)) / a0, b2: (Vh - (Vb * K) / Q + K * K) / a0, a1: (2 * (K * K - 1)) / a0, a2: (1 - K / Q + K * K) / a0 };
    f0 = 38.13547087602444; Q = 0.5003270373238773; K = Math.tan((Math.PI * f0) / sr);
    const d = 1 + K / Q + K * K, hp = { b0: 1, b1: -2, b2: 1, a1: (2 * (K * K - 1)) / d, a2: (1 - K / Q + K * K) / d };
    return [shelf, hp];
  }
  // mean square of the K-weighted signal per block (len, hop in samples)
  function blockPowers(x, sr, blockS = 0.4, hopS = 0.1) {
    const k = filter(x, kWeight(sr)), B = Math.round(blockS * sr), H = Math.round(hopS * sr), out = [];
    if (k.length < B) { let s = 0; for (let i = 0; i < k.length; i++) s += k[i] * k[i]; out.push(k.length ? s / B : 0); return out; }
    const cum = new Float64Array(k.length + 1); for (let i = 0; i < k.length; i++) cum[i + 1] = cum[i] + k[i] * k[i];
    for (let a = 0; a + B <= k.length; a += H) out.push((cum[a + B] - cum[a]) / B);
    return out;
  }
  const L = (p) => (p > 0 ? -0.691 + 10 * Math.log10(p) : -Infinity);
  // integrated loudness of a mono signal; channels = 2 measures it as dual-mono stereo (L = R = x: channel energies add, +3.01 dB)
  function integrated(x, sr, channels = 1, powers) {
    const bp = (powers || blockPowers(x, sr)).map((p) => p * channels);
    const abs = bp.filter((p) => L(p) >= -70); if (!abs.length) return -Infinity;
    const rel = L(abs.reduce((s, p) => s + p, 0) / abs.length) - 10, kept = abs.filter((p) => L(p) >= rel);
    return L(kept.reduce((s, p) => s + p, 0) / kept.length);
  }
  // short-term loudness (3 s window) every hop seconds
  const shortTerm = (x, sr, channels = 1, hopS = 0.1) => blockPowers(x, sr, 3, hopS).map((p) => L(p * channels));
  function lra(x, sr, channels = 1) { // EBU Tech 3342
    const st = shortTerm(x, sr, channels, 1 / 3).filter((l) => l >= -70); if (st.length < 2) return 0;
    const pw = st.map((l) => Math.pow(10, (l + 0.691) / 10)), rel = L(pw.reduce((s, p) => s + p, 0) / pw.length) - 20;
    const v = st.filter((l) => l >= rel).sort((a, b) => a - b); if (v.length < 2) return 0;
    const q = (f) => v[Math.min(v.length - 1, Math.round(f * (v.length - 1)))]; return q(0.95) - q(0.1);
  }

  // ---------- true peak: 4× oversampling, 48-tap windowed-sinc (Kaiser β 8), cutoff at the original Nyquist ----------
  const TP_TAPS = 48, PH = 4, tpH = (() => {
    const I0 = (z) => { let s = 1, t = 1; for (let k = 1; k < 30; k++) { t *= (z / (2 * k)) ** 2; s += t; } return s; };
    const h = new Float64Array(TP_TAPS), M = (TP_TAPS - 1) / 2, beta = 8;
    for (let n = 0; n < TP_TAPS; n++) { const t = (n - M) / PH, s = t === 0 ? 1 : Math.sin(Math.PI * t) / (Math.PI * t); h[n] = s * I0(beta * Math.sqrt(1 - ((n - M) / M) ** 2)) / I0(beta); }
    const ph = []; for (let p = 0; p < PH; p++) { const c = []; for (let k = p; k < TP_TAPS; k += PH) c.push(h[k]); const s = c.reduce((a, b) => a + b, 0); ph.push(Float64Array.from(c, (v) => v / s)); }
    return ph; // phase p: 12 taps, unity DC gain
  })();
  // per-sample true peak: tp[i] = max |x| over the 4 interpolated points around sample i (attributed to i and i+1)
  function truePeaks(x) {
    const n = x.length, tp = new Float32Array(n), T = tpH[0].length, Dl = T / 2, xp = new Float64Array(n + T + 1); // phase delay ≈ Dl samples
    xp.set(x, T); // x[j] = xp[j + T]; zeros outside
    const c1 = tpH[1], c2 = tpH[2], c3 = tpH[3];
    for (let i = 0; i < n; i++) {
      let a = x[i] < 0 ? -x[i] : x[i]; if (a > tp[i]) tp[i] = a;
      let s1 = 0, s2 = 0, s3 = 0; const base = i + Dl + T; // j = i + Dl - k → xp[base - k]
      for (let k = 0; k < T; k++) { const v = xp[base - k]; s1 += c1[k] * v; s2 += c2[k] * v; s3 += c3[k] * v; }
      if (s1 < 0) s1 = -s1; if (s2 < 0) s2 = -s2; if (s3 < 0) s3 = -s3;
      a = s1 > s2 ? s1 : s2; if (s3 > a) a = s3;
      if (a > tp[i]) tp[i] = a; if (i + 1 < n && a > tp[i + 1]) tp[i + 1] = a;
    }
    return tp;
  }
  function truePeakDb(x) { const tp = truePeaks(x); let m = 0; for (let i = 0; i < tp.length; i++) if (tp[i] > m) m = tp[i]; return m > 0 ? 20 * Math.log10(m) : -Infinity; }

  // ---------- small helpers ----------
  const db = (v) => (v > 1e-10 ? 20 * Math.log10(v) : -200);
  const pct = (arr, f) => { if (!arr.length) return NaN; const v = Float64Array.from(arr).sort(); return v[Math.min(v.length - 1, Math.max(0, Math.round(f * (v.length - 1))))]; };
  // RMS (dBFS) of frames of `len` samples every `hop` samples
  function frameDb(x, len, hop) { const out = []; for (let a = 0; a + len <= x.length || (a === 0 && x.length); a += hop) { let s = 0; const e = Math.min(x.length, a + len); for (let i = a; i < e; i++) s += x[i] * x[i]; out.push(10 * Math.log10(s / len + 1e-20)); if (e >= x.length) break; } return out; }

  window.GroklyDSP = { biquad, filter, butterHP4, lr4, fft, hann, power, kWeight, blockPowers, integrated, shortTerm, lra, truePeaks, truePeakDb, db, pct, frameDb, loud: L };
})();
