/* sakura-source.js — Night River (v2: Sakura scene + Night River ink). Loaded right after grokly-feed.js (before p5).
   Scene: the Sakura piece runs in a small hidden child frame; inside Grokly it is stepped in lock-step with this frame
   (same SONIC features, same virtual clock), so the result is frame-exact and seeded by ?h=.
   Ink: assets/4.jpeg (the brush-wave painting) is turned ONCE into a transparent layer (paper → alpha, ink colour kept)
   and laid over the scene each frame with the sound-driven swell / flow / breath from viz-extra.js.
   The composite is what Night River's renderDistort() treats with its paper / scanline / noise pass. */
(function () {
  var q = new URLSearchParams(location.search);
  var hash = q.get('h') || '0xe48fe5e1d59b85050fc50325b9399093b7d886843d827a4b09ee190d9de87043';
  var feed = !!window.__GROKLY_FEED;
  if (feed) window.__groklyHost = true;            // lets the child's grokly-feed.js hand its clock to us
  var fr = document.createElement('iframe');
  fr.setAttribute('aria-hidden', 'true'); fr.tabIndex = -1; fr.title = '';
  fr.style.cssText = 'position:fixed;left:-10000px;top:0;width:800px;height:800px;border:0;pointer-events:none';
  fr.src = 'sakura/index.html?h=' + hash + '&tid=0';
  (document.body || document.documentElement).appendChild(fr);

  function child() { try { return fr.contentWindow; } catch (e) { return null; } }
  function source() {
    var w = child(); if (!w || !w.document) return null;
    if (w.__groklyCanvas) return w.__groklyCanvas();
    var cs = Array.prototype.filter.call(w.document.querySelectorAll('canvas'), function (c) { return c.width > 20 && c.style.display !== 'none'; });
    cs.sort(function (a, b) { return b.width * b.height - a.width * a.height; });
    return cs[0] || null;
  }
  function canvas(w, h, rf) { var c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d', rf ? { willReadFrequently: true } : undefined)]; }
  var S = canvas(1000, 1000), sceneCv = S[0], sx = S[1];          // Sakura, cropped + centred on the tree (redrawn when Sakura moves)
  var C = canvas(1000, 1000, true), cx = C[1];                     // scene + ink, read back for Night River's pixel loop
  var ink = null, inkBox = null, shift = null, crownTop = 560, dirty = true, sceneOK = false;

  // Sakura paints a 75 px white frame round its 800 px canvas (barfi(): strokeWeight(150) rect): crop 80 px.
  // The tree stands left of centre: shift the scene so the trunk is centred (survives the 4:5 and 9:16 crops),
  // and fill the uncovered edge with a mirror of the scene, so the white frame never shows.
  function drawScene() {
    var s = source(); if (!s) return false;
    var b = Math.round(s.width * 80 / 800), sw = s.width - 2 * b, sh = s.height - 2 * b;
    if (shift === null) shift = findShift(s, b, sw, sh);
    if (shift) {
      var r = shift > 0 ? shift : 1000 + shift;
      sx.setTransform(-1, 0, 0, 1, 2 * r, 0); sx.drawImage(s, b, b, sw, sh, shift, 0, 1000, 1000);
    }
    sx.setTransform(1, 0, 0, 1, 0, 0); sx.drawImage(s, b, b, sw, sh, shift, 0, 1000, 1000);
    return true;
  }
  // trunk = the darkest column band low in the picture; crown top = first row (below the top fifth) with many
  // dark branch pixels — the ink stays above it, so the tree is never covered or changed by the sound
  function findShift(s, b, sw, sh) {
    var t = canvas(100, 100, true)[1]; t.drawImage(s, b, b, sw, sh, 0, 0, 100, 100);
    var all = t.getImageData(0, 0, 100, 100).data;
    for (var ry = 20; ry < 90; ry++) { var dk = 0; for (var rx = 0; rx < 100; rx++) { var k = (ry * 100 + rx) * 4; if (all[k] + all[k + 1] + all[k + 2] < 180) dk++; } if (dk >= 6) { crownTop = ry * 10; break; } }
    var d = t.getImageData(0, 60, 100, 32).data, col = new Array(100).fill(0);
    for (var y = 0; y < 32; y++) for (var x = 0; x < 100; x++) { var i = (y * 100 + x) * 4; if (d[i] + d[i + 1] + d[i + 2] < 150) col[x]++; }
    var best = 50, bv = -1;
    for (var x2 = 3; x2 < 97; x2++) { var v = col[x2 - 2] + col[x2 - 1] + col[x2] + col[x2 + 1] + col[x2 + 2]; if (v > bv) { bv = v; best = x2; } }
    if (bv < 20) return 0;                                        // no clear trunk: leave the scene where it is
    return Math.max(-180, Math.min(180, Math.round((50 - best) * 10)));
  }

  window.NRS = {
    ready: function () { var w = child(); return !!(source() && (!feed || (w && w.__groklyStep))); },
    // once: paper → transparent; the ink keeps its blue/black (un-mixed from the paper colour)
    buildInk: function (im, pick) {
      var el = im && (im.canvas || im.elt || im); if (!el || !el.width) return;
      var X0 = 0.06, X1 = 0.94, Y0 = 0.21, Y1 = 0.665;               // the brush strokes, without the small field sketch below
      var W = 960, H = 540, L = canvas(W, H, true), g = L[1];
      g.drawImage(el, el.width * X0, el.height * Y0, el.width * (X1 - X0), el.height * (Y1 - Y0), 0, 0, W, H);
      var id = g.getImageData(0, 0, W, H), d = id.data, n = W * H, i;
      var lum = new Float32Array(n), hist = new Uint32Array(256);
      for (i = 0; i < n; i++) { var l = 0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]; lum[i] = l; hist[l | 0]++; }
      var acc = 0, Lp = 240; for (var k = 255; k >= 0; k--) { acc += hist[k]; if (acc > n * 0.35) { Lp = k; break; } }   // paper level
      var pr = 0, pg = 0, pb = 0, pn = 0;
      for (i = 0; i < n; i++) if (lum[i] >= Lp - 4) { pr += d[i * 4]; pg += d[i * 4 + 1]; pb += d[i * 4 + 2]; pn++; }
      pr /= pn; pg /= pn; pb /= pn;
      for (i = 0; i < n; i++) {
        var t = (Lp - lum[i]) / Math.max(1, Lp - 20);                 // 0 on paper … 1 on the darkest ink
        var a = t <= 0.08 ? 0 : Math.min(1, Math.pow((t - 0.08) / 0.72, 1.15)), j = i * 4;   // light washes stay see-through
        if (a > 0) {
          d[j] = Math.max(0, Math.min(255, pr - (pr - d[j]) / a));
          d[j + 1] = Math.max(0, Math.min(255, pg - (pg - d[j + 1]) / a));
          d[j + 2] = Math.max(0, Math.min(255, pb - (pb - d[j + 2]) / a));
        }
        var y = (i / W) | 0, fade = y > H * 0.8 ? 1 - (y - H * 0.8) / (H * 0.2) : 1;   // soft lower edge into the crown
        d[j + 3] = Math.round(255 * a * fade);
      }
      g.putImageData(id, 0, 0);
      ink = L[0];
      pick = pick || 1;
      inkBox = { flip: pick % 2 === 0, y: [20, 50, 80, 36][(pick >> 1) % 4] };   // seed-chosen placement (from randImg)
    },
    // one composite: scene (redrawn only when Sakura moved) + the ink with the sound params P (from viz-extra.js)
    refresh: function (P) {
      if (typeof img === 'undefined' || !img) return;
      if (dirty || !sceneOK) { sceneOK = drawScene(); dirty = false; }
      if (!sceneOK) return;
      cx.globalAlpha = 1; cx.drawImage(sceneCv, 0, 0);
      if (ink) {
        P = P || { sy: 1, dx: 0, alpha: 0.9 };
        // the ink band lives in the sky: at its largest swell (SY_MAX) its lower edge still ends above the crown
        var top = inkBox.y, h0 = Math.max(180, Math.min(540, (crownTop - 12 - top) / 1.2));
        var w = 1080, h = h0 * Math.min(1.2, P.sy), x = -40 + P.dx, y = top + (h0 - h) * 0.5;
        cx.save(); cx.globalAlpha = P.alpha;
        if (inkBox.flip) { cx.translate(1000, 0); cx.scale(-1, 1); }
        cx.drawImage(ink, x, y, w, h); cx.restore();
      }
      img.pixels = cx.getImageData(0, 0, 1000, 1000).data; img.width = img.height = 1000;
    },
  };
  if (!feed) { setInterval(function () { dirty = true; }, 66); return; }
  // Sakura is the expensive half (~25 ms a draw in software GL), so it advances on every 2nd video frame
  // (15 fps scene under 30 fps ink/scanlines/noise); ?every=1 for every frame on fast machines.
  var EVERY = Math.max(1, +(q.get('every') || 2)), n = 0;
  var step = window.__groklyStep, pick = window.__groklyCanvas;
  var WARM = 40, WARM_MS = WARM * 1000 / 15, warmK = 0, offset = 0, early = 0;
  var quiet = { level: 0, bass: 0, lowMid: 0, mid: 0, high: 0, beat: false, pulse: 0, beats: 0, bands: [] };
  // Sakura builds its sky up over the first seconds: run it ahead (quietly, WARM steps) so frame 0 shows the full scene.
  // Its clock then stays WARM_MS ahead of ours, so it only ever moves forward.
  // The warm-up used to run as one 40-step call (1.5 s+ of one blocking task on a slow machine). Now it is spread over
  // Grokly's build steps: while it runs, window.__groklyReady is false and each Grokly step only advances Sakura by
  // WARM_PER steps (Night River itself does not move, and its clock is shifted back by the steps spent, so its frames
  // and Sakura's are exactly the ones the one-call warm-up gave). Grokly then gives Night River the usual first EARLY steps.
  var WARM_PER = 1, EARLY = 3;
  window.__groklyStep = function (f, ms) {
    var w = child();
    if (warmK < WARM) {
      if (w && w.__groklyStep) for (var j = 0; j < WARM_PER && warmK < WARM; j++) { warmK++; w.__groklyStep(quiet, warmK * 1000 / 15); }
      offset = ms; dirty = true;
      return;
    }
    ms -= offset;
    if (w && w.__groklyStep && n++ % EVERY === 0) { w.__groklyStep(f, ms + WARM_MS); dirty = true; }
    if (window.p5 && window.p5.instance) { window.p5.instance._lastTargetFrameTime = -1e9; window.p5.instance._lastFrameTime = -1e9; }   // frameRate(20) must not skip stepped frames
    step(f, ms);
    if (window.__groklyReady === false && ++early >= EARLY) window.__groklyReady = true;
  };
  // Grokly gets no canvas until the child scene exists, so its setup waits for both pieces.
  window.__groklyCanvas = function () {
    if (!window.NRS.ready()) return null;
    if (warmK < WARM && window.__groklyReady !== false) { window.__groklyReady = false; dirty = true; }
    return pick();
  };
})();
