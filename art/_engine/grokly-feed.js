/* grokly-feed.js — loaded first in every art piece when it runs inside the Grokly app.
   It hands the clock to Grokly: time stands still and frames only advance when Grokly steps them,
   with the song's features in window.SONIC. So the preview and the exported video are frame-exact,
   whatever the speed of the phone. Opened on its own (not inside Grokly), the piece runs normally. */
(function () {
  var host = false;
  try { host = window.parent !== window && !!window.parent.__groklyHost; } catch (e) {}
  if (!host) return;
  window.__GROKLY_FEED = true;
  var now = 0, p0 = performance.now(), d0 = Date.now(), queue = [], ids = 0;
  performance.now = function () { return p0 + now; };
  Date.now = function () { return d0 + now; };
  try { Object.defineProperty(window, 'devicePixelRatio', { get: function () { return 1; }, configurable: true }); } catch (e) {}
  window.requestAnimationFrame = function (cb) { queue.push([++ids, cb]); return ids; };
  window.cancelAnimationFrame = function (k) { queue = queue.filter(function (x) { return x[0] !== k; }); };
  // setTimeout / setInterval run on the same frozen virtual clock: a timer fires during the frame step whose time reaches it,
  // in a fixed order (due time, then creation order), so a piece that uses timers still gives identical frames for one seed.
  // Before the first frame, timers due at time 0 (setTimeout(fn) / setInterval(fn, 0), e.g. the p5 hooks) still run, on a real pump.
  var RT = window.setTimeout.bind(window), RI = window.setInterval.bind(window), RC = window.clearTimeout.bind(window), RCI = window.clearInterval.bind(window);
  var timers = [], tseq = 0, tid = 10000000, stepped = false;
  function addTimer(fn, ms, args, rep) {
    if (typeof fn !== 'function') { var code = String(fn); fn = function () { (0, eval)(code); }; }
    var d = Math.max(0, +ms || 0), t = { id: ++tid, due: now + d, every: rep ? Math.max(1, d) : 0, fn: fn, args: args, seq: ++tseq };
    timers.push(t); return t.id;
  }
  function dropTimer(k) { for (var i = 0; i < timers.length; i++) if (timers[i].id === k) { timers.splice(i, 1); return true; } return false; }
  window.setTimeout = function (fn, ms) { return addTimer(fn, ms, Array.prototype.slice.call(arguments, 2), false); };
  window.setInterval = function (fn, ms) { return addTimer(fn, ms, Array.prototype.slice.call(arguments, 2), true); };
  window.clearTimeout = function (k) { if (!dropTimer(k)) RC(k); };
  window.clearInterval = function (k) { if (!dropTimer(k)) RCI(k); };
  function runTimers() {
    for (var guard = 0; guard < 5000; guard++) {
      var best = -1;
      for (var i = 0; i < timers.length; i++) { var x = timers[i]; if (x.due <= now && (best < 0 || x.due < timers[best].due || (x.due === timers[best].due && x.seq < timers[best].seq))) best = i; }
      if (best < 0) return;
      var t = timers[best];
      if (t.every) { t.due += t.every; t.seq = ++tseq; } else timers.splice(best, 1);
      try { t.fn.apply(window, t.args); } catch (e) { if (window.console) console.error(e); }
    }
  }
  var pump = RI(function () { if (stepped) return RCI(pump); runTimers(); }, 10);
  var st = document.createElement('style');
  st.textContent = '#viz-bar,#viz-stage,#viz-hint,.viz-bar{display:none!important}html,body{margin:0!important;overflow:hidden!important;background:#000}';
  document.documentElement.appendChild(st);

  // one video frame: set the sound, move the clock, run whatever the piece asked to draw next
  window.__groklyStep = function (f, ms) {
    now = ms;
    var S = window.SONIC;
    if (S) {
      // every sound parameter Grokly measures (level, bass, … pitch, pitchDelta, voiced, centroid, flux, onset, silence, tempoPhase …)
      for (var k in f) { var v = f[k]; if (k !== 'bands' && (typeof v === 'number' || typeof v === 'boolean')) S[k] = v; }
      S.beat = !!f.beat; S.active = true;
      if (S.bands && S.bands.length) for (var i = 0; i < S.bands.length; i++) S.bands[i] = f.bands[i] || 0;
    }
    if (!stepped) { stepped = true; RCI(pump); }
    runTimers();
    var run = queue; queue = [];
    for (var j = 0; j < run.length; j++) { try { run[j][1](p0 + now); } catch (e) { if (window.console) console.error(e); } }
  };
  window.__groklyCanvas = function () {
    var cs = Array.prototype.filter.call(document.querySelectorAll('canvas'), function (c) { return c.id !== 'viz-stage' && c.width > 20 && c.height > 20 && c.style.display !== 'none' && getComputedStyle(c).display !== 'none'; });
    cs.sort(function (a, b) { return b.width * b.height - a.width * a.height; });
    return cs[0] || null;
  };
})();
