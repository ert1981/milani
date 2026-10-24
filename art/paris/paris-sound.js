/* paris-sound.js — sound for "Paris" (Reza Milani · Milani)
   Only the motion of the three ink lines follows the music: bass + beat make them travel faster (k), loudness makes the
   black ink a little fuller (ink). No zoom, light, colour shift or extra frames. In silence k = ink = 1: the original sketch.
   Smoothing is per frame (no wall clock), so one seed gives the same video every time. */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };
(function () {
  var num = function (v) { return typeof v === 'number' && isFinite(v) ? v : 0; };
  var c01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var s = { drive: 0, body: 0 };
  function ease(k, v, up, down) { var c = s[k]; s[k] = c + (v - c) * (v > c ? up : down); return s[k]; }
  var P = (window.PARIS_SOUND = { k: 1, ink: 1 });
  P.frame = function () {
    var A = window.SONIC || {}, on = A.active ? 1 : 0, q = 1 - 0.85 * c01(num(A.silence));
    var drive = ease('drive', on * q * c01(0.6 * num(A.bass) + 0.4 * num(A.pulse)), 0.35, 0.06);
    var body = ease('body', on * q * c01(num(A.level)), 0.3, 0.05);
    P.k = 1 + 1.4 * drive;   // lerp speeds ×1 … ×2.4
    P.ink = 1 + 0.35 * body; // black ink up to +35 %
  };
})();
