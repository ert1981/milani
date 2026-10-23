/* A Field in the Wind — نگاشت صدا
   قانون‌ها: بدون زوم و کشیدگی؛ درخت فقط با باد خودِ اثر تکان می‌خورد (نه با صدا)؛ آسمان، ماه و ستاره‌ها ثابت‌اند.
   صدا علفزار، خوشه‌های گندم، شقایق‌ها و دانه‌های معلق را حرکت می‌دهد و هر لایه از پارامتر جدای صدا.
   نرم: با صدا زود بالا می‌رود و آرام برمی‌گردد؛ در سکوت همه‌چیز به باد آرام خودِ اثر برمی‌گردد. */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };
(function () {
  const sm = {};
  const c01 = (x) => (Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : 0);
  const cpm = (x) => (Number.isFinite(x) ? Math.max(-1, Math.min(1, x)) : 0);
  function ar(k, v, up, down) { const p = sm[k] || 0; return (sm[k] = p + (v - p) * (v > p ? up : down)); }
  const F = (window.__FW = { g: 0, wheat: 0, pop: 0, seed: 0, glow: 0, lift: 0, th: 1, h: [1, 1, 1] });
  window.__fwTick = function () {
    const s = window.SONIC || {}, on = s.active ? 1 : 0, q = 1 - 0.85 * c01(s.silence);
    F.g     = 1.1 * ar('g', on * q * c01(0.5 * (s.level || 0) + 0.3 * (s.lowMid || 0) + 0.2 * Math.max(0, cpm(s.dynamics))), 0.25, 0.03); // باد روی علفزار ← بلندی + میانهٔ بم + اوج‌گیری
    F.wheat = 0.9 * ar('wh', on * q * c01(0.6 * (s.onset || 0) + 0.4 * (s.attack || 0)), 0.5, 0.06);                                  // تکان خوشه‌های گندم ← شروع ضرب و تیزی صدا
    F.pop   = 0.9 * ar('pp', on * q * c01(s.voiced ? 0.5 + 0.5 * (s.vibrato || 0) : 0.4 * (s.mid || 0)), 0.2, 0.04);                // تاب شقایق‌ها ← آواز و لرزش صدا
    F.seed  = ar('sd', on * q * c01(0.5 * (s.rolloff || 0) + 0.5 * (s.presence || 0)), 0.25, 0.04);                                  // سرعت دانه‌های معلق ← وسعت طیف و حضور صدا
    F.glow  = ar('gl', on * q * c01(s.air || 0), 0.3, 0.05);                                                                          // درخشش دانه‌ها ← هوای صدا
    F.lift  = ar('lf', on * cpm(s.pitchDelta), 0.15, 0.04);                                                                           // بالا/پایین رفتن دانه‌ها ← جهت نُت
    F.th    = 1 + 0.8 * ar('th', on * q * c01(0.6 * (s.bass || 0) + 0.4 * (s.sub || 0)), 0.4, 0.05);                                  // ضخامت تیغه‌های علف ← بم و زیرِبم
    // قد هر لایهٔ علف از بخش جدای صدا: لایهٔ پشت ← بم، میانی ← میانه، جلو ← زیر
    F.h[0] = 0.9 + 0.3 * ar('h0', on * q * c01(0.6 * (s.bass || 0) + 0.4 * (s.sub || 0)), 0.3, 0.04);
    F.h[1] = 0.9 + 0.3 * ar('h1', on * q * c01(0.6 * (s.mid || 0) + 0.4 * (s.centroid || 0)), 0.3, 0.04);
    F.h[2] = 0.9 + 0.3 * ar('h2', on * q * c01(0.6 * (s.high || 0) + 0.4 * (s.presence || 0)), 0.3, 0.04);
  };
})();
/* پارامترهای Generate: جای خورشید، اندازه‌اش و تعداد شقایق‌ها از روی هش. کد پیش‌فرض همان اثر اصلی است.
   از یک تصادفِ جدا (نه رشتهٔ تصادفیِ خود اثر) خوانده می‌شود تا بقیهٔ ترکیب‌بندی عوض نشود. */
(function () {
  const h = new URLSearchParams(location.search).get('h') || '';
  const custom = /^0x[0-9a-f]{64}$/i.test(h) && h.toLowerCase() !== '0x6d696c616e69617274652d6772' + '0'.repeat(38);
  let t = (parseInt(h.slice(-16, -8), 16) >>> 0) || 1;
  const r = () => { t = (t + 0x6D2B79F5) | 0; let z = Math.imul(t ^ (t >>> 15), 1 | t); z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z; return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
  const P = { custom: custom };
  if (custom) {
    P.sunX = 0.12 + 0.76 * r();            // جای افقی خورشید (نسبت به پهنا)
    P.sunY = 0.12 + 0.38 * r();            // جای عمودی خورشید (نسبت به ارتفاع، همیشه بالای افق)
    P.sunR = 30 + 70 * r();                // شعاع خورشید (پیکسل در کانواس ۸۰۰)
    const n = 2 + Math.floor(r() * 8);     // تعداد شقایق‌ها: ۲ تا ۹
    P.poppies = [];
    for (let i = 0; i < n; i++) { const s = 0.4 + 0.6 * r(); P.poppies.push({ x: 0.12 + 0.76 * r(), y: 0.25 + 0.55 * r(), s: s, blur: s > 0.8 ? 0 : (1 - s) * 7 }); }
  }
  window.__FWP = P;
})();
