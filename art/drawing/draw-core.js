/* draw-core.js — "My drawing": the visitor's own strokes as a Milani artwork (shared by the editor and the art frame).
   A drawing is { v: 1, paper: '#rrggbb', aspect: width / height, strokes: [{ c: '#rrggbb', w: width as a fraction of the
   drawing's height, p: [x0, y0, x1, y1, …] in 0…1 of the drawing's width / height }] }.
   MilaniDraw.motion() follows the sound one frame at a time (no wall clock), so one drawing + one sound = the same video. */
(function () {
  var num = function (v) { return typeof v === 'number' && isFinite(v) ? v : 0; };
  var c01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var hexOk = function (c) { return /^#[0-9a-f]{6}$/i.test(c || ''); };
  // a drawing from storage or another window: only the fields above, in range
  function clean(d) {
    if (!d || typeof d !== 'object' || !Array.isArray(d.strokes)) return null;
    var out = { v: 1, paper: hexOk(d.paper) ? d.paper : '#0c0c0d', aspect: num(d.aspect) > 0.2 && num(d.aspect) < 5 ? +d.aspect : 0.8, strokes: [] };
    for (var i = 0; i < d.strokes.length && out.strokes.length < 4000; i++) {
      var s = d.strokes[i]; if (!s || !Array.isArray(s.p) || s.p.length < 2) continue;
      var p = []; for (var k = 0; k + 1 < s.p.length; k += 2) { var x = num(s.p[k]), y = num(s.p[k + 1]); p.push(Math.max(-0.2, Math.min(1.2, x)), Math.max(-0.2, Math.min(1.2, y))); }
      out.strokes.push({ c: hexOk(s.c) ? s.c : '#ffffff', w: Math.max(0.001, Math.min(0.3, num(s.w) || 0.01)), p: p });
    }
    return out;
  }
  // FNV-1a of the drawing: its seed, so a changed drawing always reloads the art frame
  function hash(d) {
    var s = JSON.stringify(d), h = 0x811c9dc5, h2 = 0x01000193 ^ s.length;
    for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i); h = Math.imul(h ^ c, 16777619) >>> 0; h2 = Math.imul(h2 ^ c, 2246822519) >>> 0; }
    return '0x' + ('00000000' + h.toString(16)).slice(-8) + ('00000000' + h2.toString(16)).slice(-8) + '0'.repeat(48);
  }
  // sound → motion state (smoothed per frame, like Paris): drive = bass + beat, body = loudness, kick = a beat that decays
  function motion() { return { drive: 0, body: 0, kick: 0, phase: 0, bands: new Array(32).fill(0), last: -1 }; }
  function feed(m, f, ms) {
    f = f || {}; var on = f.active === false ? 0 : 1, q = 1 - 0.85 * c01(num(f.silence));
    var ease = function (k, v, up, down) { var c = m[k]; m[k] = c + (v - c) * (v > c ? up : down); return m[k]; };
    ease('drive', on * q * c01(0.6 * num(f.bass) + 0.4 * num(f.pulse)), 0.35, 0.07);
    ease('body', on * q * c01(num(f.level)), 0.3, 0.06);
    m.kick = f.beat ? 1 : m.kick * 0.84;
    var dt = m.last < 0 || ms <= m.last ? 1 / 30 : Math.min(0.25, (ms - m.last) / 1000); m.last = ms;
    m.phase += dt * (0.7 + 3.2 * m.drive + 1.2 * m.body); // the strokes travel faster with the bass
    var b = f.bands || []; for (var i = 0; i < 32; i++) m.bands[i] += (q * c01(num(b[i])) - m.bands[i]) * 0.3;
  }
  // draw the drawing on a W×H context; m = motion state (null: still, as drawn)
  function render(g, d, W, H, m) {
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.shadowBlur = 0;
    g.fillStyle = (d && d.paper) || '#0c0c0d'; g.fillRect(0, 0, W, H);
    if (!d || !d.strokes || !d.strokes.length) { g.restore(); return; }
    var aw = d.aspect || W / H, s = Math.max(W / aw, H), ox = (W - aw * s) / 2, oy = (H - s) / 2, u = Math.min(W, H);
    var still = !m, drive = still ? 0 : m.drive, body = still ? 0 : m.body, kick = still ? 0 : m.kick, ph = still ? 0 : m.phase;
    g.lineCap = 'round'; g.lineJoin = 'round';
    for (var j = 0; j < d.strokes.length; j++) {
      var st = d.strokes[j], p = st.p, n = p.length / 2, band = still ? 0 : m.bands[(j * 5) % 32];
      // wobble size: a breath in silence, up to ~5 % of the frame with loud bass
      var A = still ? 0 : u * (0.0025 + 0.028 * drive + 0.016 * body + 0.012 * band);
      var cx = 0, cy = 0; for (var k = 0; k < n; k++) { cx += p[2 * k]; cy += p[2 * k + 1]; } cx /= n; cy /= n;
      var k2 = 1 + 0.07 * kick + 0.03 * band, sw = st.w * s * (1 + 0.55 * body + 0.35 * kick);
      var X = function (k) { var x = p[2 * k], y = p[2 * k + 1]; x = cx + (x - cx) * k2; y = cy + (y - cy) * k2; return ox + x * aw * s + A * Math.sin(ph * 2.1 + y * 9 + j * 1.7); };
      var Y = function (k) { var x = p[2 * k], y = p[2 * k + 1]; x = cx + (x - cx) * k2; y = cy + (y - cy) * k2; return oy + y * s + A * Math.cos(ph * 1.8 + x * 8 + j * 2.3); };
      g.strokeStyle = g.fillStyle = st.c; g.lineWidth = sw;
      if (!still && kick > 0.05) { g.shadowColor = st.c; g.shadowBlur = sw * 1.6 * kick; } else g.shadowBlur = 0;
      if (n === 1) { g.beginPath(); g.arc(X(0), Y(0), sw / 2, 0, 7); g.fill(); continue; }
      g.beginPath(); g.moveTo(X(0), Y(0));
      for (var i = 1; i < n - 1; i++) { var xa = X(i), ya = Y(i); g.quadraticCurveTo(xa, ya, (xa + X(i + 1)) / 2, (ya + Y(i + 1)) / 2); }
      g.lineTo(X(n - 1), Y(n - 1)); g.stroke();
    }
    g.restore();
  }
  window.MilaniDraw = { clean: clean, hash: hash, motion: motion, feed: feed, render: render };
})();
