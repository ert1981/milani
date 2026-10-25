/* draw-core.js — "My drawing": the visitor's own strokes as a Milani artwork (shared by the editor and the art frame).
   A drawing is { v: 1, paper: '#rrggbb', aspect: width / height, strokes: [{ c: '#rrggbb', w: width as a fraction of the
   drawing's height, p: [x0, y0, x1, y1, …] in 0…1 of the drawing's width / height, k: weight 0 light … 1 heavy (absent: automatic) }] }.

   Every stroke is a vibrating string with a mass. Automatic mass = brush width × length (× a little more for dark ink);
   the Weight control sets it instead. Three string modes per stroke (pinned at both ends) are damped springs:
     ω₁ = ω₀ / √M (heavy: low, slow; light: high, fast), damping c = 2ζ√(kM) (heavy: slow to start and slow to settle).
   The sound pushes them: bass + beat → mode 1, low-mid / mid → mode 2, high → mode 3; every beat is an impulse J / M.
   On top, a line wave travels along the stroke's own path at the stroke's own frequency, as big as the string's energy.
   All of it moves on a fixed number of sub-steps per video frame (no wall clock, no Math.random), so one drawing + one
   sound always gives the same video, and the preview and the export match. */
(function () {
  var num = function (v) { return typeof v === 'number' && isFinite(v) ? v : 0; };
  var c01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var hexOk = function (c) { return /^#[0-9a-f]{6}$/i.test(c || ''); };
  // a drawing from storage or another window: only the fields above, in range (drawings saved before weights still load: automatic)
  function clean(d) {
    if (!d || typeof d !== 'object' || !Array.isArray(d.strokes)) return null;
    var out = { v: 1, paper: hexOk(d.paper) ? d.paper : '#0c0c0d', aspect: num(d.aspect) > 0.2 && num(d.aspect) < 5 ? +d.aspect : 0.8, strokes: [] };
    for (var i = 0; i < d.strokes.length && out.strokes.length < 4000; i++) {
      var s = d.strokes[i]; if (!s || !Array.isArray(s.p) || s.p.length < 2) continue;
      var p = []; for (var k = 0; k + 1 < s.p.length; k += 2) { var x = num(s.p[k]), y = num(s.p[k + 1]); p.push(Math.max(-0.2, Math.min(1.2, x)), Math.max(-0.2, Math.min(1.2, y))); }
      var o = { c: hexOk(s.c) ? s.c : '#ffffff', w: Math.max(0.001, Math.min(0.3, num(s.w) || 0.01)), p: p };
      if (typeof s.k === 'number' && isFinite(s.k)) o.k = c01(s.k);
      out.strokes.push(o);
    }
    return out;
  }
  // FNV-1a of the drawing: its seed, so a changed drawing always reloads the art frame
  function hash(d) {
    var s = JSON.stringify(d), h = 0x811c9dc5, h2 = 0x01000193 ^ s.length;
    for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i); h = Math.imul(h ^ c, 16777619) >>> 0; h2 = Math.imul(h2 ^ c, 2246822519) >>> 0; }
    return '0x' + ('00000000' + h.toString(16)).slice(-8) + ('00000000' + h2.toString(16)).slice(-8) + '0'.repeat(48);
  }
  var lum = function (c) { var n = parseInt(c.slice(1), 16); return (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; };
  var M_MIN = 0.15, M_MAX = 9, REF = 0.0045; // a 1 %-wide stroke across half the frame has mass ≈ 1
  // the stroke's shape for the string: arc length along it, unit normals, and its mass (cached on the stroke object)
  var GEO = typeof WeakMap === 'function' ? new WeakMap() : null;
  function geo(st, aw) {
    var key = aw.toFixed(4), c = GEO && GEO.get(st); if (c && c.key === key) return c;
    var p = st.p, n = p.length / 2, U = new Float32Array(n), NX = new Float32Array(n), NY = new Float32Array(n), L = 0;
    for (var i = 1; i < n; i++) { L += Math.hypot((p[2 * i] - p[2 * i - 2]) * aw, p[2 * i + 1] - p[2 * i - 1]); U[i] = L; }
    for (i = 0; i < n; i++) {
      var a = Math.max(0, i - 2), b = Math.min(n - 1, i + 2), tx = (p[2 * b] - p[2 * a]) * aw, ty = p[2 * b + 1] - p[2 * a + 1], tl = Math.hypot(tx, ty) || 1;
      NX[i] = -ty / tl; NY[i] = tx / tl; if (L > 0) U[i] /= L;
    }
    var auto = Math.max(M_MIN, Math.min(M_MAX, ((st.w * Math.max(L, st.w)) / REF) * (0.75 + 0.5 * (1 - lum(st.c)))));
    var M = typeof st.k === 'number' ? M_MIN * Math.pow(M_MAX / M_MIN, st.k) : auto;
    c = { key: key, U: U, NX: NX, NY: NY, L: L, M: M, auto: auto }; if (GEO) GEO.set(st, c); return c;
  }
  // deterministic noise in −1…1 (integer hash; no Math.random)
  function rnd(a, b, c) { var h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x7f4a7c15, 0xc2b2ae35) ^ Math.imul(c + 0x165667b1, 0x27d4eb2f); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; return ((h >>> 0) / 4294967295) * 2 - 1; }
  var W0 = 2 * Math.PI * 2.3, ZETA = 0.11, W_MAX = 2 * Math.PI * 11, SUB = 6, NOISE = 3, BEAT_J = 0.13;
  // motion state; one string per stroke, made on first use
  function motion() { return { drive: 0, body: 0, kick: 0, bands: new Array(32).fill(0), last: -1, n: 0, s: [] };
  }
  function str(m, j) { var s = m.s[j]; if (!s) s = m.s[j] = { q: [0, 0, 0], v: [0, 0, 0], ph: 0, e: 0 }; return s; }
  // one video frame of sound: d = the drawing (its strokes are the strings)
  function feed(m, f, ms, d) {
    f = f || {}; var on = f.active === false ? 0 : 1, q = 1 - 0.85 * c01(num(f.silence));
    var ease = function (k, v, up, down) { var c = m[k]; m[k] = c + (v - c) * (v > c ? up : down); return m[k]; };
    ease('drive', on * q * c01(0.6 * num(f.bass) + 0.4 * num(f.pulse)), 0.35, 0.07);
    ease('body', on * q * c01(num(f.level)), 0.3, 0.06);
    m.kick = f.beat ? 1 : m.kick * 0.84;
    var b = f.bands || []; for (var i = 0; i < 32; i++) m.bands[i] += (q * c01(num(b[i])) - m.bands[i]) * 0.3;
    var dt = m.last < 0 || ms <= m.last ? 1 / 30 : Math.min(0.25, (ms - m.last) / 1000); m.last = ms;
    if (!d || !d.strokes) return;
    var aw = d.aspect || 1, beat = !!f.beat && on;
    var F = [on * q * c01(0.7 * num(f.bass) + 0.3 * num(f.pulse) + 0.25 * num(f.level)), on * q * c01(0.6 * num(f.lowMid) + 0.6 * num(f.mid)), on * q * c01(num(f.high) * 1.2 + 0.5 * num(f.presence))];
    var sub = Math.max(SUB, Math.ceil(dt * 30 * SUB - 1e-6)), h = dt / sub; // sub-steps of at most 1/180 s, so even a jump of the clock stays stable (ω·h < 0.6)
    for (var j = 0; j < d.strokes.length; j++) {
      var st = d.strokes[j], G = geo(st, aw), M = G.M, s = str(m, j), w1 = Math.min(W_MAX, W0 / Math.sqrt(M)), band = m.bands[(j * 5) % 32];
      if (beat) for (var n = 0; n < 3; n++) s.v[n] += (BEAT_J * (0.5 + num(f.bass)) * (n === 0 ? 1 : 0.5 / n) * (rnd(j, n, m.n) > -0.3 ? 1 : -1)) / Math.pow(M, 1.2); // a beat strikes the string: Δv = J / M (a little steeper, so the weight shows)
      for (var k = 0; k < sub; k++) {
        m.n++;
        for (n = 0; n < 3; n++) {
          var wn = Math.min(W_MAX * 1.3, w1 * (n + 1)), kk = M * wn * wn, cc = 2 * ZETA * Math.sqrt(kk * M);
          var force = (NOISE * Math.pow(M, -0.5) * (F[n] + 0.4 * band) * rnd(j, n + 7, m.n)) / (n + 1); // sound-driven buffeting: deterministic white noise scaled by its band; heavier strings answer less
          s.v[n] += (h * (force - cc * s.v[n] - kk * s.q[n])) / M; s.q[n] += h * s.v[n]; // semi-implicit Euler, stable for ω·h < 2
        }
        s.ph += h * w1; // the travelling wave runs at the string's own frequency
      }
      var en = Math.sqrt(s.q[0] * s.q[0] + s.q[1] * s.q[1] + s.q[2] * s.q[2]); s.e += (en - s.e) * 0.25;
      for (n = 0; n < 3; n++) { if (!isFinite(s.q[n]) || !isFinite(s.v[n])) { s.q[n] = 0; s.v[n] = 0; } var lim = Math.min(0.08, 0.2 * G.L + 0.01); if (s.q[n] > lim) { s.q[n] = lim; s.v[n] *= 0.5; } else if (s.q[n] < -lim) { s.q[n] = -lim; s.v[n] *= 0.5; } }
    }
  }
  // draw the drawing on a W×H context; m = motion state (null: still, as drawn)
  function render(g, d, W, H, m) {
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.shadowBlur = 0;
    g.fillStyle = (d && d.paper) || '#0c0c0d'; g.fillRect(0, 0, W, H);
    if (!d || !d.strokes || !d.strokes.length) { g.restore(); return; }
    var aw = d.aspect || W / H, s = Math.max(W / aw, H), ox = (W - aw * s) / 2, oy = (H - s) / 2;
    var still = !m, body = still ? 0 : m.body, kick = still ? 0 : m.kick;
    g.lineCap = 'round'; g.lineJoin = 'round';
    var xs = [], ys = [];
    for (var j = 0; j < d.strokes.length; j++) {
      var st = d.strokes[j], p = st.p, n = p.length / 2, G = geo(st, aw), S = still ? null : m.s[j];
      var lt = 1 / Math.sqrt(G.M), sw = st.w * s * (1 + (0.25 + 0.35 * lt) * body + 0.3 * kick * lt);
      // the travelling line wave: wavelength grows with the mass (heavy = long slow swells, light = short quick ripples)
      var lam = Math.max(0.02, 0.05 + 0.07 * Math.sqrt(G.M)), cyc = G.L / lam, rip = S ? 0.6 * S.e : 0;
      xs.length = ys.length = n;
      for (var i = 0; i < n; i++) {
        var x = ox + p[2 * i] * aw * s, y = oy + p[2 * i + 1] * s;
        if (S) { var u = G.U[i], env = Math.sin(Math.PI * u), off = S.q[0] * env + S.q[1] * Math.sin(2 * Math.PI * u) + S.q[2] * Math.sin(3 * Math.PI * u) + rip * Math.sqrt(env) * Math.sin(2 * Math.PI * (u * cyc) - S.ph);
          if (n < 3) { x += S.q[0] * s * 0.6; y += S.q[1] * s * 0.6; } else { x += G.NX[i] * off * s; y += G.NY[i] * off * s; } }
        xs[i] = x; ys[i] = y;
      }
      g.strokeStyle = g.fillStyle = st.c; g.lineWidth = sw;
      if (!still && kick > 0.05) { g.shadowColor = st.c; g.shadowBlur = sw * 1.6 * kick * (0.4 + 0.6 * lt); } else g.shadowBlur = 0;
      if (n === 1) { g.beginPath(); g.arc(xs[0], ys[0], sw / 2, 0, 7); g.fill(); continue; }
      g.beginPath(); g.moveTo(xs[0], ys[0]);
      for (i = 1; i < n - 1; i++) g.quadraticCurveTo(xs[i], ys[i], (xs[i] + xs[i + 1]) / 2, (ys[i] + ys[i + 1]) / 2);
      g.lineTo(xs[n - 1], ys[n - 1]); g.stroke();
    }
    g.restore();
  }
  // the stroke's mass (for the editor and tests)
  function mass(st, aspect) { return geo(st, aspect || 1).M; }
  window.MilaniDraw = { clean: clean, hash: hash, motion: motion, feed: feed, render: render, mass: mass, M_MIN: M_MIN, M_MAX: M_MAX };
})();
