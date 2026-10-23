/* Hart — نگاشت صدا (ویژهٔ این اثر)
   قانون‌ها: بدون زوم، نور و چرخش رنگِ کل تصویر؛ قاب ثابت؛ همهٔ نوشته‌ها حذف شده‌اند.
   نرم: با صدا زود بالا می‌رود و آرام برمی‌گردد؛ در سکوت همه‌چیز به حالت اصلی اثر برمی‌گردد. */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };
(function () {
  const sm = {};
  const c01 = (x) => (Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : 0);
  const cpm = (x) => (Number.isFinite(x) ? Math.max(-1, Math.min(1, x)) : 0);
  function ar(k, v, up, down) { const p = sm[k] || 0; return (sm[k] = p + (v - p) * (v > p ? up : down)); }
  let flip = 1, gap = 0;
  VIZ_BEFORE.push(function (m) {
    const s = window.SONIC || m || {}, on = s.active ? 1 : 0, q = 1 - 0.85 * c01(s.silence);
    // سرعت شبیه‌سازی (مثل قبل) ← بلندی صدا و ضربان
    hartSpeed = 1 + Math.round(5 * (s.level || 0) + 6 * (s.pulse || 0));
    // اندازهٔ قلم پلاتر ← بلندی + بم + اوج‌گیری؛ در سکوت اندازهٔ اصلی (۱)
    window.__hartPen = 1 + 1.6 * ar('pen', on * q * c01(0.45 * (s.level || 0) + 0.35 * (s.bass || 0) + 0.2 * Math.max(0, cpm(s.dynamics))), 0.35, 0.05);
    // جهت حرکت پرنده‌ها: بالا/پایین رفتن نُت آن‌ها را می‌چرخاند؛ هر شروع ضربِ تیز جهت چرخش را برعکس می‌کند (با فاصلهٔ حداقل ۱۲ فریم)
    if (gap > 0) gap--;
    if (on && (s.onset || 0) > 0.6 && gap === 0) { flip = -flip; gap = 12; }
    const turn = ar('turn', on * q * (0.5 * c01(s.onset || 0) + 0.5 * Math.abs(cpm(s.pitchDelta)) + 0.3 * c01(s.attack || 0)), 0.3, 0.05);
    window.__hartTurn = flip * 0.09 * turn;
    // (حذف شد: هر ۱۶ ضرب حس عوض می‌شد و اثر از نو کشیده می‌شد؛ حالا اثر تا انتها همان رسم را ادامه می‌دهد)
  });
  let hb = 0;
})();
