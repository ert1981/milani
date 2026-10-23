/* Emotions — نگاشت صدا
   قانون‌ها: تصویر زوم و کشیده نمی‌شود؛ درخت و قاب سیاه ثابت‌اند (درخت یک بار کشیده می‌شود و هر فریم همان روی کار می‌نشیند)؛
   اثر بعد از رسم اول متوقف نمی‌شود: ذره‌ها از پایین دوباره بالا می‌آیند و نخ‌ها همیشه می‌چرخند، و زمینه خیلی آرام محو می‌شود تا رد قدیمی جا برای رد تازه باز کند.
   صدا فقط ذره‌ها، نخ‌ها و دانه‌های زمینه را حرکت می‌دهد و هر لایه از پارامتر جدای صدا.
   همه‌چیز نرم است: با صدا زود بالا می‌رود و آرام برمی‌گردد؛ در سکوت اثر به حرکت آرام خودش برمی‌گردد. */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 }; // بدون زوم، نور و رنگِ کلی و بدون شتاب فریم
(function () {
  const sm = {};
  const c01 = (x) => (Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : 0);
  const cpm = (x) => (Number.isFinite(x) ? Math.max(-1, Math.min(1, x)) : 0);
  function ar(k, v, up, down) { const p = sm[k] || 0; return (sm[k] = p + (v - p) * (v > p ? up : down)); }
  const T = (window.__EMO = { rise: 0, swell: 0, fine: 0, spark: 0, thread: 0, turn: 0, twist: 0, dots: 0, fade: 0, sway: 0 });
  window.__emoTick = function () {
    const s = window.SONIC || {}, on = s.active ? 1 : 0, quiet = 1 - 0.85 * c01(s.silence);
    T.rise   = ar('rise', on * quiet * c01(0.7 * (s.level || 0) + 0.3 * Math.max(0, cpm(s.dynamics))), 0.3, 0.04);   // سرعت بالا رفتن ذره‌های بزرگ ← بلندی + اوج‌گیری
    T.swell  = ar('swell', on * quiet * c01(0.6 * (s.bass || 0) + 0.4 * (s.sub || 0)), 0.4, 0.05);                     // اندازهٔ ذره‌های بزرگ ← بم و زیرِبم
    T.fine   = ar('fine', on * quiet * c01(0.6 * (s.high || 0) + 0.4 * (s.presence || 0)), 0.35, 0.05);                // سرعت ذره‌های ریز ← صدای زیر و حضور
    T.spark  = ar('spark', on * quiet * c01(s.onset || 0), 0.6, 0.08);                                                  // اندازهٔ ذره‌های ریز ← شروع ضرب‌ها
    T.thread = ar('thread', on * quiet * c01(0.5 * (s.mid || 0) + 0.5 * (s.centroid || 0)), 0.3, 0.05);               // بلندی خط نخ‌ها ← میانه و روشنی صدا
    T.turn   = ar('turn', on * quiet * c01(s.voiced ? 0.5 + 0.5 * (s.vibrato || 0) : 0.3 * (s.lowMid || 0)), 0.2, 0.04); // تندی چرخش نخ‌ها ← آواز و لرزش صدا
    T.twist  = ar('twist', on * cpm(s.pitchDelta), 0.2, 0.05);                                                           // جهت چرخش نخ‌ها ← بالا/پایین رفتن نُت
    T.dots   = ar('dots', on * quiet * c01(1.2 * (s.flux || 0) + 0.6 * (s.attack || 0)), 0.5, 0.08);                  // تعداد دانه‌های پراکنده ← تغییر طیف + تیزی شروع
    T.sway   = ar('sway', on * quiet * c01(s.tempo), 0.1, 0.03);                                                         // تاب خوردن ذره‌ها به چپ و راست ← تمپو
    T.fade   = ar('fade', c01(s.silence || 0), 0.05, 0.05);                                                              // در سکوت زمینه کمی زودتر آرام و پاک می‌شود
  };
})();
