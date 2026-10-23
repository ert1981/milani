/* ot-build.js — progressive build of the tree layer (shapegraphic2).
   The tree is generated once by a deep recursive branching pass and then reused every frame. Running that pass in
   one go (hundreds of thousands of branches) blocked the main thread for 1.5–3 s and froze the app preview.

   Here the chosen tree function and the sketch functions it calls (the recursive branch functions) are rebuilt at
   runtime as generator functions: identical code, plus a pause check on entry. The build then runs a fixed slice per
   frame and resumes where it stopped on the next frame. Nothing about the drawing itself changes:
   - The build gets its own copy of both random streams (hl.random and Math.random), started from exactly the state
     the original one-shot build started from, so it draws the same numbers in the same order: the finished tree layer
     is the same as before. The rest of the sketch keeps using the main streams.
   - Calls that other code makes on the tree layer while the build is still running (e.g. the per-frame noStroke())
     are held back and applied after the build, in their original order, so they cannot change the tree's style.
   - The slice size is counted in a deterministic cost unit, never wall-clock time, so a given ?h= seed always shows
     the same frames, in the live preview and in a frame-stepped export alike.
   - Lines, circles, ellipses and arcs that lie wholly outside the layer (most of the random 0..10000 "scribble"
     strokes) are skipped: they would not paint a single pixel. The finished layer matches the one-shot build up to
     sub-pixel anti-aliasing noise from the different batching of canvas work.
   - While the build is running, the few main-canvas shapes the tree functions draw (and that the finished layer used to
     cover in that same frame) are not drawn, so a half-built layer never reveals them.
   If the runtime rewrite fails for any reason, the tree is built in one go exactly as before. */
(function () {
  // ready signal for Grokly: it keeps warming up (stepping frames) until this is true, so the first shown or exported
  // frame already has the finished tree. index.html sets it to false first thing; this repeats it in case it was not.
  if (window.__groklyReady !== true) window.__groklyReady = false;
  var BUDGET = 18000;  // tree work per frame, in the cost units below (about 18 ms)
  var B = window.__otB = { s: 0, b: BUDGET };
  var g = null, ctx = null, held = [];
  var state = 'idle', it = null, treeHL = 0, treeMR = null, inBuild = false;

  var NAMES = ['strokeWeight', 'line', 'fill', 'stroke', 'translate', 'rotate', 'push', 'pop', 'circle', 'arc', 'noStroke',
    'ellipse', 'scale', 'noFill', 'vertex', 'beginShape', 'endShape', 'strokeCap', 'rect', 'curveVertex', 'point', 'quad',
    'triangle', 'bezier', 'curve', 'bezierVertex', 'quadraticVertex', 'resetMatrix', 'applyMatrix', 'rectMode', 'ellipseMode',
    'angleMode', 'colorMode', 'strokeJoin', 'blendMode', 'erase', 'noErase', 'clear', 'background', 'image', 'tint', 'noTint',
    'text', 'textSize', 'textAlign', 'textFont', 'shearX', 'shearY', 'smooth', 'noSmooth'];
  // rough main-thread cost of each call, in microseconds on a mid-range laptop (deterministic: never read from the clock)
  var COST = { line: 1.5, culled: 0.3, color: 0.6, push: 1, pop: 2.5, stroke: 2.6, fill: 2.4, strokeWeight: 0.3, translate: 1, rotate: 1, scale: 1,
    circle: 5, ellipse: 5, arc: 5, rect: 5, endShape: 5, point: 3, quad: 5, triangle: 5, bezier: 5, curve: 5, image: 50, text: 20, background: 50 };
  // calls that do not move the transform (anything else not tracked below re-reads it from the canvas)
  var KEEPS = { line: 1, fill: 1, stroke: 1, strokeWeight: 1, noStroke: 1, noFill: 1, circle: 1, arc: 1, ellipse: 1, vertex: 1,
    beginShape: 1, endShape: 1, strokeCap: 1, rect: 1, curveVertex: 1, point: 1, quad: 1, triangle: 1, bezier: 1, curve: 1,
    bezierVertex: 1, quadraticVertex: 1, rectMode: 1, ellipseMode: 1, angleMode: 1, colorMode: 1, strokeJoin: 1, smooth: 1, noSmooth: 1 };

  // the layer's current transform, mirrored in JS during the build so culling needs no canvas round trip
  var M = [1, 0, 0, 1, 0, 0], MS = [], cull = true;
  function readM() { var m = ctx.getTransform(); M = [m.a, m.b, m.c, m.d, m.e, m.f]; }
  function track(n, a) {
    if (n === 'scale' && typeof a[0] === 'number') {
      var sx = a[0], sy = typeof a[1] === 'number' ? a[1] : sx;
      M[0] *= sx; M[1] *= sx; M[2] *= sy; M[3] *= sy;
    } else if (n === 'push') MS.push(M.slice());
    else if (n === 'pop') { if (MS.length) M = MS.pop(); else readM(); }
    else readM();
  }
  // safety net: if the mirrored transform ever drifts from the canvas, stop culling for the rest of the build
  function checkM() {
    var m = ctx.getTransform(), d = [m.a - M[0], m.b - M[1], m.c - M[2], m.d - M[3], m.e - M[4], m.f - M[5]];
    for (var i = 0; i < 6; i++) if (!(Math.abs(d[i]) < (i < 4 ? 1e-6 : 0.01))) { cull = false; return; }
  }

  // true when no pixel of the stroked line can land on the layer (device-space test against the layer bounds)
  function lineIsOffCanvas(x1, y1, x2, y2) {
    var W = ctx.canvas.width, H = ctx.canvas.height;
    var ax = M[0] * x1 + M[2] * y1 + M[4], ay = M[1] * x1 + M[3] * y1 + M[5];
    var bx = M[0] * x2 + M[2] * y2 + M[4], by = M[1] * x2 + M[3] * y2 + M[5];
    var s = Math.sqrt(M[0] * M[0] + M[1] * M[1] + M[2] * M[2] + M[3] * M[3]); // >= the largest stretch of the transform
    var r = ctx.lineWidth * s * 0.75 + 2; // covers round and square caps plus antialiasing
    if ((ax < -r && bx < -r) || (ax > W + r && bx > W + r) || (ay < -r && by < -r) || (ay > H + r && by > H + r)) return true;
    // clip the segment against the bounds grown by r (Liang–Barsky); no overlap means nothing is drawn
    var dx = bx - ax, dy = by - ay, t0 = 0, t1 = 1;
    for (var i = 0; i < 4; i++) {
      var p = i === 0 ? -dx : i === 1 ? dx : i === 2 ? -dy : dy;
      var q = i === 0 ? ax + r : i === 1 ? W + r - ax : i === 2 ? ay + r : H + r - ay;
      if (p === 0) { if (q < 0) return true; continue; }
      var t = q / p;
      if (p < 0) { if (t > t1) return true; if (t > t0) t0 = t; } else { if (t < t0) return true; if (t < t1) t1 = t; }
    }
    return false;
  }

  // the same test for circle / ellipse / arc: a disc of radius max(|w|, |h|) around (x, y) holds the whole shape and its
  // stroke in the CENTER and RADIUS ellipse modes (the only modes culled)
  function shapeIsOffCanvas(x, y, w, h) {
    if (typeof x !== 'number' || typeof y !== 'number' || typeof w !== 'number' || typeof h !== 'number') return false;
    var mode = g._renderer && g._renderer._ellipseMode;
    if (mode !== 'center' && mode !== 'radius') return false;
    var s = Math.sqrt(M[0] * M[0] + M[1] * M[1] + M[2] * M[2] + M[3] * M[3]); // >= the largest stretch of the transform
    var r = (Math.max(Math.abs(w), Math.abs(h)) + ctx.lineWidth) * s + 2;
    var cx = M[0] * x + M[2] * y + M[4], cy = M[1] * x + M[3] * y + M[5];
    return cx < -r || cy < -r || cx > ctx.canvas.width + r || cy > ctx.canvas.height + r;
  }

  // wrap the tree layer's drawing calls: counted (and transform-tracked) while the build runs,
  // held back when made from outside the build while it is still running
  window.__otDefer = function (graphics) {
    g = graphics; ctx = g.drawingContext;
    var R = g._renderer, fast = !!(R && !R.isP3D && R.drawingContext === ctx && typeof g._toRadians === 'function');
    // during the build the three hottest calls go straight to p5's 2D renderer, doing exactly what p5.Graphics would
    // (minus argument copying): line -> renderer.line when stroking, translate -> renderer.translate,
    // rotate -> renderer.rotate(_toRadians(angle))
    // stroke()/fill() with plain number or string arguments: the colour string p5 would compute is cached per argument
    // list, then set exactly as p5's stroke()/fill() do (flags + renderer _setStroke/_setFill)
    var colorCache = {};
    function colorFast(isStroke, args) {
      var pi = R._pInst;
      if (!args.length || !pi || pi._addAccsOutput()) return false;
      var key = '';
      for (var i = 0; i < args.length; i++) {
        var v = args[i], t = typeof v;
        if (t === 'number') key += 'n' + v + '|'; else if (t === 'string') key += 's' + v + '|'; else return false;
      }
      var css = colorCache[key];
      if (css === undefined) css = colorCache[key] = pi.color.apply(pi, args).toString();
      if (isStroke) { R._strokeSet = true; R._doStroke = true; R._setStroke(css); }
      else { R._fillSet = true; R._doFill = true; R._setFill(css); }
      return true;
    }
    function plainLine() { return !R._clipping && !(g._accessibleOutputs && (g._accessibleOutputs.grid || g._accessibleOutputs.text)); }
    NAMES.forEach(function (n) {
      if (typeof g[n] !== 'function') return;
      var f = g[n], cost = COST[n] || 0.05, keeps = !!KEEPS[n];
      if (n === 'line') {
        g.line = function (x1, y1, x2, y2) {
          if (inBuild) {
            if (arguments.length === 4) {
              if (cull && lineIsOffCanvas(x1, y1, x2, y2)) { B.s += COST.culled; return g; }
              B.s += COST.line;
              if (fast && plainLine()) { if (R._doStroke) R.line(x1, y1, x2, y2); return g; }
            } else B.s += COST.line;
            return f.apply(g, arguments);
          }
          if (state === 'building') { held.push([f, Array.prototype.slice.call(arguments)]); return g; }
          return f.apply(g, arguments);
        };
        return;
      }
      if (n === 'circle' || n === 'ellipse' || n === 'arc') {
        g[n] = function (x, y, w, h) {
          if (inBuild) {
            if (cull && shapeIsOffCanvas(x, y, w, n === 'circle' ? w : h)) { B.s += COST.culled; return g; }
            B.s += cost; return f.apply(g, arguments);
          }
          if (state === 'building') { held.push([f, Array.prototype.slice.call(arguments)]); return g; }
          return f.apply(g, arguments);
        };
        return;
      }
      if (n === 'translate' || n === 'rotate') {
        var isT = n === 'translate';
        g[n] = function (x, y) {
          if (inBuild) {
            B.s += cost;
            if (fast && typeof x === 'number' && (isT ? typeof y === 'number' && arguments.length === 2 : arguments.length === 1)) {
              if (isT) { R.translate(x, y); M[4] += M[0] * x + M[2] * y; M[5] += M[1] * x + M[3] * y; return g; }
              var rad = g._toRadians(x), cs = Math.cos(rad), sn = Math.sin(rad);
              R.rotate(rad);
              M = [M[0] * cs + M[2] * sn, M[1] * cs + M[3] * sn, M[2] * cs - M[0] * sn, M[3] * cs - M[1] * sn, M[4], M[5]];
              return g;
            }
            f.apply(g, arguments); readM(); return g;
          }
          if (state === 'building') { held.push([f, Array.prototype.slice.call(arguments)]); return g; }
          return f.apply(g, arguments);
        };
        return;
      }
      if (n === 'stroke' || n === 'fill') {
        var isS = n === 'stroke';
        g[n] = function () {
          if (inBuild) {
            if (fast && colorFast(isS, arguments)) { B.s += COST.color; return g; }
            B.s += cost; return f.apply(g, arguments);
          }
          if (state === 'building') { held.push([f, Array.prototype.slice.call(arguments)]); return g; }
          return f.apply(g, arguments);
        };
        return;
      }
      g[n] = function () {
        if (n === 'colorMode') colorCache = {};
        if (inBuild) {
          B.s += cost;
          var out = f.apply(g, arguments);
          if (!keeps) track(n, arguments);
          return out;
        }
        if (state === 'building') { held.push([f, Array.prototype.slice.call(arguments)]); return g; }
        return f.apply(g, arguments);
      };
    });
  };

  // ── runtime rewrite of the tree functions into generators ──
  var IDC = /[\p{L}\p{N}_$\u0640\u200c\u200d]/u; // identifier characters (the sketch uses Persian names with U+0640)
  // skip a comment or string starting at i; returns the index after it, or -1 when there is none at i
  function skipLit(src, i) {
    var ch = src[i], nx = src[i + 1], n = src.length;
    if (ch === '/' && nx === '/') { var e = src.indexOf('\n', i); return e < 0 ? n : e; }
    if (ch === '/' && nx === '*') { var c = src.indexOf('*/', i + 2); return c < 0 ? n : c + 2; }
    if (ch === '"' || ch === "'" || ch === '`') {
      var j = i + 1;
      while (j < n && src[j] !== ch) { if (src[j] === '\\') j++; j++; }
      return j + 1;
    }
    return -1;
  }
  function isId(c, ch) {
    if (c < 128) return (c >= 97 && c <= 122) || (c >= 65 && c <= 90) || (c >= 48 && c <= 57) || c === 95 || c === 36;
    return IDC.test(ch);
  }
  // every identifier outside comments and strings: cb(identifier, start, end)
  function scan(src, cb) {
    var i = 0, n = src.length;
    while (i < n) {
      var sk = skipLit(src, i);
      if (sk >= 0) { i = sk; continue; }
      if (isId(src.charCodeAt(i), src[i]) && !(src.charCodeAt(i) >= 48 && src.charCodeAt(i) <= 57)) {
        var k = i + 1;
        while (k < n && isId(src.charCodeAt(k), src[k])) k++;
        cb(src.slice(i, k), i, k);
        i = k; continue;
      }
      i++;
    }
  }
  // index of the bracket closing the one at `open`
  function matchClose(src, open) {
    var depth = 0, i = open, n = src.length;
    while (i < n) {
      var sk = skipLit(src, i);
      if (sk >= 0) { i = sk; continue; }
      var ch = src[i];
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') { depth--; if (depth === 0) return i; }
      i++;
    }
    return -1;
  }
  function prevChar(src, i) { i--; while (i >= 0 && /\s/.test(src[i])) i--; return i >= 0 ? src[i] : ''; }
  function prevWord(src, i) { i--; while (i >= 0 && /\s/.test(src[i])) i--; var e = i + 1; while (i >= 0 && IDC.test(src[i])) i--; return src.slice(i + 1, e); }
  function nextChar(src, i) { while (i < src.length && /\s/.test(src[i])) i++; return src[i]; }
  var fnCache = {};
  function sketchFn(name) {
    if (Object.prototype.hasOwnProperty.call(fnCache, name)) return fnCache[name];
    return (fnCache[name] = sketchFnSrc(name));
  }
  function sketchFnSrc(name) {
    if (!Object.prototype.hasOwnProperty.call(window, name)) return null;
    var f = window[name];
    if (typeof f !== 'function') return null;
    var s = Function.prototype.toString.call(f);
    if (!/^function\s/.test(s) || s.indexOf('[native code]') >= 0) return null;
    return s;
  }
  function stripLits(s) {
    var out = '', i = 0;
    while (i < s.length) { var sk = skipLit(s, i); if (sk >= 0) { out += ' '; i = sk; } else out += s[i++]; }
    return out;
  }

  // same text with comments blanked out and strings replaced by '0's (same length, line breaks kept)
  function blank(s) {
    var out = '', i = 0;
    while (i < s.length) {
      var sk = skipLit(s, i);
      if (sk < 0) { out += s[i++]; continue; }
      var lit = s.slice(i, sk), isStr = lit[0] !== '/';
      out += lit.replace(/[^\n]/g, isStr ? '0' : ' ');
      i = sk;
    }
    return out;
  }
  // how to turn the call bl[a..cl] into a delegating call without changing how the statement parses:
  // a bare `yield* f(...)` where the call is a whole statement / right-hand side / argument, `(yield* f(...))` inside
  // a larger expression; anything unclear is refused (the whole build then simply runs in one go, as before)
  function wrapCall(bl, a, cl, what) {
    var j = cl + 1, nl = false;
    while (j < bl.length && /\s/.test(bl[j])) { if (bl[j] === '\n') nl = true; j++; }
    var nc = bl[j];
    var endOK = nc === undefined || ';,)}]:'.indexOf(nc) >= 0 || (nl && !/[.(\[+\-*/%<>=&|?^`]/.test(nc));
    var i = a - 1, pnl = false;
    while (i >= 0 && /\s/.test(bl[i])) { if (bl[i] === '\n') pnl = true; i--; }
    var pc = i >= 0 ? bl[i] : '', pc2 = i > 0 ? bl[i - 1] : '', pw = prevWord(bl, a);
    var exprStart = '(,[:?'.indexOf(pc) >= 0 || pw === 'return' || (pc === '=' && '=!<>'.indexOf(pc2) < 0);
    var stmtStart = pc === '' || ';{}'.indexOf(pc) >= 0 || pw === 'else' || pw === 'do';
    var asiStart = pc === ')' || ((IDC.test(pc) || pc === ']') && pnl);
    if (endOK && (exprStart || stmtStart || asiStart)) return [[a, 'yield* ']];
    if (exprStart || stmtStart || '+-*/%!<>&|~^='.indexOf(pc) >= 0) return [[a, '(yield* '], [cl + 1, ')']];
    throw new Error('unsupported call form: ' + what);
  }

  function buildGenerator(rootName) {
    // 1. the sketch functions reachable from the root and the call graph between them
    var srcs = {}, calls = {}, todo = [rootName];
    while (todo.length) {
      var nm = todo.pop();
      if (srcs[nm] !== undefined) continue;
      var s = sketchFn(nm);
      if (!s) throw new Error('not a sketch function: ' + nm);
      srcs[nm] = s; calls[nm] = {};
      scan(s, function (id, a, b) {
        if (nextChar(s, b) !== '(' || prevChar(s, a) === '.' || prevWord(s, a) === 'function') return;
        if (!sketchFn(id)) return;
        calls[nm][id] = 1;
        if (srcs[id] === undefined) todo.push(id);
      });
    }
    // 2. generators: the root, every function on a call cycle (the recursion), and every function that calls one of them
    var names = Object.keys(srcs), gen = {};
    function reaches(from, target) {
      var seen = {}, st = Object.keys(calls[from]);
      while (st.length) { var x = st.pop(); if (x === target) return true; if (seen[x]) continue; seen[x] = 1; for (var y in calls[x]) st.push(y); }
      return false;
    }
    names.forEach(function (x) { if (x === rootName || reaches(x, x)) gen[x] = 1; });
    for (var changed = true; changed;) {
      changed = false;
      names.forEach(function (x) { if (gen[x]) return; for (var y in calls[x]) if (gen[y]) { gen[x] = 1; changed = true; return; } });
    }
    // 3. rewrite: function* declaration, (yield* f(...)) around every call of a generator, a pause check on entry
    var out = [];
    Object.keys(gen).forEach(function (nm) {
      var s = srcs[nm], ins = [];
      var po = s.indexOf('('), pc = matchClose(s, po), bo = s.indexOf('{', pc);
      if (po < 0 || pc < 0 || bo < 0) throw new Error('cannot parse ' + nm);
      var bl = blank(s);
      scan(s, function (id, a, b) {
        if (!gen[id] || a < po) return;                       // not a generator, or this function's own name
        if (a < bo) throw new Error('generator used in the parameters of ' + nm);
        var pv = prevChar(bl, a);
        if (pv === '.') return;                                // a property of the same name
        var pw = prevWord(bl, a), k = b;
        while (k < s.length && /\s/.test(s[k])) k++;
        if (s[k] !== '(' || pw === 'new' || pw === 'function') throw new Error(id + ' is not called directly in ' + nm);
        var cl = matchClose(s, k);
        if (cl < 0) throw new Error('unbalanced call in ' + nm);
        ins.push.apply(ins, wrapCall(bl, a, cl, id + ' in ' + nm));
      });
      // a rewritten call inside a nested plain or arrow function would not compile: refuse instead
      if (ins.length && /=>|\bfunction\b/.test(stripLits(s.slice(bo)))) throw new Error('nested function in ' + nm);
      ins.push([bo + 1, ' if ((__otB.s += 0.3) >= __otB.b) yield;']);
      ins.sort(function (x, y) { return y[0] - x[0]; });
      ins.forEach(function (x) { s = s.slice(0, x[0]) + x[1] + s.slice(x[0]); });
      out.push(s.replace(/^function\s*/, 'function* '));
    });
    var code = '(function () {\n' + out.join('\n') + '\nreturn ' + rootName + ';\n})()';
    return (0, eval)(code); // indirect eval: global scope and sloppy mode, like the sketch itself
  }

  var MAIN_SHAPES = ['rect', 'ellipse', 'circle', 'arc', 'triangle', 'quad', 'point'];
  function noop() {}
  // one slice of the build, on the build's own random streams
  function step() {
    B.s = 0;
    var mainHL = hl.rngState(), mainMR = treeMR ? Math.random.getState() : null;
    hl.setRngState(treeHL); if (treeMR) Math.random.setState(treeMR);
    readM();
    // a few tree functions also paint a shape on the main canvas (e.g. drawStructure22's rect) that the finished layer
    // covers in the same frame and that is never drawn again; with a partly built layer it would flash for one frame
    var shown = {};
    MAIN_SHAPES.forEach(function (n) { shown[n] = window[n]; window[n] = noop; });
    inBuild = true;
    var r;
    try { r = it.next(); if (cull) checkM(); }
    catch (e) { if (window.console) console.error('old-tree build:', e); r = { done: true }; }
    finally {
      MAIN_SHAPES.forEach(function (n) { window[n] = shown[n]; });
      inBuild = false;
      treeHL = hl.rngState(); if (treeMR) treeMR = Math.random.getState();
      hl.setRngState(mainHL); if (mainMR) Math.random.setState(mainMR);
    }
    if (r.done) {
      state = 'done';
      window.__groklyReady = true;
      var h = held; held = [];
      for (var i = 0; i < h.length; i++) h[i][0].apply(g, h[i][1]);
    } else {
      image(g, 0, 0); // the partly built layer, drawn where the finished build draws it
    }
  }

  // called by reza() every frame in place of the chosen tree function
  window.__otTree = function (fn) {
    if (state === 'idle') {
      var root = null;
      try { if (g && hl.rngState && Math.random.getState && fn && fn.name) root = buildGenerator(fn.name); }
      catch (e) { if (window.console) console.warn('old-tree: progressive build unavailable (' + e.message + '), building in one go'); }
      if (!root) { state = 'sync'; try { return fn(); } finally { window.__groklyReady = true; } } // built in one go
      treeHL = hl.rngState();
      treeMR = Math.random.getState();
      it = root();
      state = 'building';
      B.b = BUDGET / 4; // the first frame also sows the meadow and compiles the generators: give it a smaller slice
      step();
      B.b = BUDGET;
      return;
    }
    if (state === 'building') return step();
    return fn();
  };
  // for tests: 'building' while the tree is still filling in
  window.__otBuildState = function () { return state; };
})();
