/* drawing.js — the art frame for "My drawing". Inside Milani the host steps it frame by frame (window.__groklyStep);
   the drawing itself comes from the host page (window.parent.__milaniDrawings[seed]), else from this browser's storage. */
(function () {
  var h = new URLSearchParams(location.search).get('h') || '', d = null;
  try { var reg = window.parent !== window && window.parent.__milaniDrawings; if (reg && reg[h]) d = reg[h]; } catch (e) {}
  if (!d) { try { d = JSON.parse(localStorage.getItem('grokly.drawing') || 'null'); } catch (e) {} }
  d = MilaniDraw.clean(d) || { v: 1, paper: '#0c0c0d', aspect: 0.8, strokes: [] };
  var cv = document.createElement('canvas'), g = cv.getContext('2d'), m = MilaniDraw.motion();
  function size() { var w = Math.max(32, Math.round(innerWidth || 540)), hh = Math.max(32, Math.round(innerHeight || 675)); if (cv.width !== w || cv.height !== hh) { cv.width = w; cv.height = hh; } }
  size(); document.body.appendChild(cv);
  MilaniDraw.render(g, d, cv.width, cv.height, m);
  window.__groklyCanvas = function () { return cv; };
  window.__milaniStrings = m; // the strings' state (read-only use: tests)
  window.__groklyStep = function (f, ms) { size(); MilaniDraw.feed(m, f, ms, d); MilaniDraw.render(g, d, cv.width, cv.height, m); };
  // opened on its own: play with a gentle made-up beat
  var host = false; try { host = window.parent !== window && !!window.parent.__groklyHost; } catch (e) {}
  if (!host) { var t0 = performance.now(); (function tick(t) { var s = (t - t0) / 1000, b = Math.max(0, Math.sin(s * 4)); window.__groklyStep({ level: 0.3 + 0.3 * b, bass: b, pulse: b, beat: b > 0.99, bands: [] }, t - t0); requestAnimationFrame(tick); })(t0); }
})();
