/* viz-map.js — ties the music to the sketch's own motion variables, when it has them.
   Loaded after the sketch. Works on the shared structure of Reza's sketches:
   a global `amplitude` (distortion), `frequency` / `noiseScale` (how fast noise moves),
   and wind = map(noise(...)) inside the drawing functions (patched to wind * __vizWind()). */
(function () {
  const M = () => window.SONIC || { level: 0, bass: 0, mid: 0, high: 0, pulse: 0 };
  // wind: called from patched lines
  window.__vizWind = function () { const m = M(); return 1 + 1.8 * m.bass + 0.9 * m.pulse; };
  window.VIZ_BEFORE = window.VIZ_BEFORE || [];
  function scaleGlobal(name, fn) {
    let base;
    try { base = eval(name); } catch (e) { return false; }
    if (typeof base !== 'number' || !isFinite(base)) return false;
    window.VIZ_BEFORE.push((m) => { try { eval(name + ' = ' + (base * fn(m)).toFixed(6)); } catch (e) {} });
    return true;
  }
  function start() {
    const done = [];
    if (scaleGlobal('amplitude', (m) => 0.7 + 0.9 * m.level + 0.8 * m.pulse)) done.push('amplitude');
    if (scaleGlobal('frequency', (m) => 0.85 + 0.6 * m.mid)) done.push('frequency');
    if (scaleGlobal('noiseScale', (m) => 0.9 + 0.3 * m.high)) done.push('noiseScale');
    (window.VIZ_EXTRA || []).forEach((f) => { try { f(); } catch (e) {} });
    window.__vizMapped = done;
  }
  // wait until setup() has run so globals hold their real starting values
  const iv = setInterval(() => { if (typeof frameCount !== 'undefined' && frameCount > 0) { clearInterval(iv); start(); } }, 50);
})();
