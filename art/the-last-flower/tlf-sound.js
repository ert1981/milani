/* The Last Flower — نگاشت صدا به موج‌ها و خطوط
   قانون‌ها: تصویر زوم و کشیده نمی‌شود؛ درخت فقط با باد خودِ اثر تکان می‌خورد (نه با صدا)؛
   صدا فقط موج‌ها و خطوطِ آب، بازتاب، دانه‌ها و قطره‌ها را حرکت می‌دهد و هر لایه از پارامتر جدای صدا.
   همه مقادیر نرم می‌شوند: با صدا زود بالا می‌روند و آرام برمی‌گردند؛ در سکوت همه‌چیز به حالت اصلی اثر برمی‌گردد. */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 }; // بدون زوم، نور و رنگِ کلی و بدون شتاب فریم
(function () {
  const sm = {}, bandS = new Array(32).fill(0);
  const c01 = (x) => (Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : 0);
  const cpm = (x) => (Number.isFinite(x) ? Math.max(-1, Math.min(1, x)) : 0);
  // حمله و رهاسازی: up سرعت بالا رفتن، down سرعت برگشت
  function ar(k, v, up, down) { const p = sm[k] || 0; return (sm[k] = p + (v - p) * (v > p ? up : down)); }
  const T = (window.__TLF = { sky: 0, flow: 0, deepA: 0, deepB: 0, deepC: 0, wob: 0, swim: 0, rock: 0, rain: 0, rainSpeed: 0, seedRun: 0, seedGlow: 0, seedLift: 0, calm: 1 });

  // یک بار در هر فریم
  window.__tlfTick = function () {
    const s = window.SONIC || {};
    const on = s.active ? 1 : 0;
    const quiet = 1 - 0.85 * c01(s.silence);                                     // در سکوت آرام شو
    T.sky   = ar('sky', on * quiet * c01(0.65 * (s.level || 0) + 0.35 * Math.max(0, cpm(s.dynamics))), 0.3, 0.04);   // موج‌های بالای آب ← بلندی صدا + اوج‌گیری
    T.flow  = ar('flow', on * cpm((s.centroid || 0) - 0.4 + 0.6 * cpm(s.trend)), 0.08, 0.02);                       // جهت سُرخوردن خطوط بالا ← روشنی صدا + روند
    T.deepA = ar('dA', on * quiet * c01(0.6 * (s.bass || 0) + 0.4 * (s.sub || 0)), 0.35, 0.05);                   // موج بلند و آرامِ عمق ← بم و زیرِبم
    T.deepB = ar('dB', on * quiet * c01(0.5 * (s.onset || 0) + 0.5 * (s.lowMid || 0)), 0.5, 0.07);                // موج میانی ← شروع ضرب‌ها + میانهٔ بم
    T.deepC = ar('dC', on * quiet * c01(s.voiced ? 0.4 + 0.6 * (s.vibrato || 0) : 0), 0.2, 0.04);                 // موج ریز ← آواز و لرزش صدای خواننده
    T.pitch = ar('pd', on * cpm(s.pitchDelta), 0.2, 0.05);                                                          // بالا/پایین رفتن نُت ← جهت موج ریز
    T.wob   = ar('wob', on * quiet * c01(0.6 * (s.high || 0) + 0.4 * (s.air || 0)), 0.4, 0.06);                  // لرزش خط‌به‌خط ← صدای زیر و هوا
    T.swim  = ar('swim', on * quiet * c01(0.6 * (s.mid || 0) + 0.4 * (s.presence || 0)), 0.3, 0.05);              // موج بازتاب درخت در آب ← میانه و حضور صدا
    T.rock  = ar('rock', on * quiet * c01(s.pulse || 0), 0.6, 0.08);                                                // تکان بازتاب ← ضربان
    T.rain  = ar('rain', on * quiet * c01(1.4 * (s.attack || 0) + 0.8 * (s.flux || 0) - 0.15), 0.6, 0.12);        // قطره‌های باران ← تیزی شروع صدا + تغییر طیف
    T.rainSpeed = ar('rs', on * c01(s.tempo), 0.1, 0.03);                                                           // سرعت قطره‌ها ← تمپو
    T.seedRun  = ar('sr', on * quiet * c01(0.5 * (s.rolloff || 0) + 0.5 * (s.level || 0)), 0.25, 0.04);         // سرعت دانه‌های معلق ← وسعت طیف + بلندی
    T.seedGlow = ar('sg', on * quiet * c01(s.air || 0), 0.3, 0.05);                                                 // درخشش دانه‌ها ← هوای صدا (بالاترین فرکانس‌ها)
    T.seedLift = ar('sl', on * cpm(s.pitchDelta), 0.15, 0.04);                                                      // بالا/پایین رفتن دانه‌ها ← جهت نُت
    const b = s.bands || [];
    for (let i = 0; i < 32; i++) bandS[i] += ((on * quiet * c01(b[i])) - bandS[i]) * (b[i] > bandS[i] ? 0.4 : 0.06);
  };

  // هر خطِ موج یک باند طیف دارد: خطوط بالای آب از باندهای زیر، خطوط زیر آب از باندهای بم (هر خط مستقل)
  const bandOf = (y, deep) => { const k = Math.floor(y / 3); return deep ? bandS[(k * 5) % 14] : bandS[14 + ((k * 7) % 18)]; };

  // جابه‌جایی افقیِ یک نوار موج بالای سطح آب
  window.__tlfSky = function (y, rise, t) {
    return Math.sin(t * 0.9 - y * 0.035) * T.sky * (1.5 + rise * 5) // موج اصلی ← بلندی
      + T.flow * 2.2 * rise                                          // سُرخوردن آرام ← روشنی صدا
      + Math.sin(y * 0.21 + t * 3.1) * bandOf(y, false) * 2.6;       // لرزش همین خط ← باند خودش
  };
  // جابه‌جایی یک نوار زیر سطح آب: سه موج، هر کدام از پارامتر جدا
  window.__tlfDeep = function (y, depth, t) {
    return Math.sin(t * 0.8 - depth * 4.2) * T.deepA * (3 + depth * 9)                        // موج بلند ← بم
      + Math.sin(t * 2.2 + depth * 11.0 + 0.7) * T.deepB * (2 + depth * 5)                    // موج میانی ← ضرب
      + Math.sin(t * 4.6 + T.pitch * 3 - y * 0.18) * T.deepC * (1 + depth * 3)                 // موج ریز ← آواز
      + Math.sin(y * 0.14 + t * 5.3) * (T.wob * 1.6 + bandOf(y, true) * 2.4);                  // لرزش همین خط ← زیر + باند خودش
  };
  // بازتاب درخت در آب (خود درخت ثابت است)
  window.__tlfRefl = function (y, depth, t) {
    return Math.sin(y * 0.09 + t * 2.4) * T.swim * (1 + depth * 8)
      + Math.sin(t * 1.3 + depth * 2.4) * T.rock * (1 + depth * 5);
  };
})();
