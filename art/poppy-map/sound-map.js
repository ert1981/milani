/* sound-map.js — Poppy Map in Grokly: every moving part of the piece answers to its own part of the sound.
   هیچ زومی نیست و اندازهٔ شقایق‌ها و قاب ثابت است؛ صدا فقط ضخامت و پررنگی خطوط پس‌زمینه، ستون‌ها، مارپیچ و خورشید را تغییر می‌دهد.

   شکل‌دهی صدا: هر ویژگی یک بار در هر فریم (با frameCount) هموار می‌شود — «حملهٔ تند، رهایی آرام» — پس خطوطی که روی هم انباشته می‌شوند
   با هر هجا پرپر نمی‌زنند و در سکوت در حدود یک ثانیه نرم نازک و کم‌رنگ می‌شوند. زانوی نرم اوج‌ها را فشرده می‌کند تا هیچ خطی بی‌اندازه کلفت نشود.
   حالت گفتار ↔ موسیقی: وزنی آرام از flatness و vibrato؛ tempo فقط در موسیقی سرعت مارپیچ را بالا می‌برد
   (در گفتار، هجاها ضرب گرفته می‌شوند و tempo همیشه پر است — قبلاً مارپیچ در گفتار چهار برابر تند می‌چرخید).

     شقایق‌ها، قاصدک‌ها و ساقه‌ها ← بدون صدا: فقط حرکت خود اثر (owner)
     ضخامت خطوط پس‌زمینه (هر نوع خط ویژگی خودش):
        خط سیاه لبه‌ای ← bass + sub (صدای بم، پوش نرم) + ضربهٔ onset که زود می‌آید و ۰٫۳ ثانیه‌ای محو می‌شود
        خط سیاه درهم   ← level (بلندی، پوش نرم) + فقط اوج‌گیری dynamics (کرشندو کلفت‌تر می‌کند، فرود نه)
        خط شیری        ← centroid (روشنی صدا) + air (نفس، «س»)
        خط رنگی        ← voiced (صدای آهنگین) + pitch نسبی (زیر و بمی نسبت به میانگین خود صدا) + vibrato (فقط تحریر واقعی)
     پررنگی خطوط ← خط سیاه: level · خط رنگی: voiced · خط شیری: centroid (همه هموار)
     ستون‌های پایین ← bands (طیف ۳۲ باندی): هر ستون یک باند، با زانوی نرم · onset (هر حمله) جهش کوتاه
     مارپیچ شیری   ← tempo (فقط موسیقی) سرعت چرخش · pitchDelta (بالا رفتن نت تندتر، پایین آمدن کندتر؛ هرگز برعکس نمی‌چرخد) ·
                     air (نفس) لرزش ریز · high (صدای زیر) ضخامت · silence (سکوت) آرام گرفتن
     خورشید        ← presence (وضوح حروف) درخشش · mid (صدای میانی) اندازهٔ هالهٔ نقطه‌ها (۰٫۹ تا ۱٫۲)
     سرعت رشد خط‌ها ← lowMid (بدنهٔ صدا): به‌جای پرش صفر/یک، یک انباشتگر نرم که گاه‌گاه یک گام اضافه می‌دهد        */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };      // no extra draws, no zoom
(function () {
  var Z = { level: 0, bass: 0, lowMid: 0, mid: 0, high: 0, sub: 0, presence: 0, air: 0, centroid: 0, rolloff: 1, flatness: 0, flux: 0, zcr: 0,
    onset: 0, voiced: 0, pitch: 0, pitchDelta: 0, vibrato: 0, trend: 0, dynamics: 0, attack: 0, silence: 0, tempo: 0, tempoPhase: 0, pulse: 0 };
  window.__S = function () { var s = window.SONIC; if (!s || !s.active) return Z; return s; };
  var v = function (k) { var x = window.__S()[k]; return typeof x === 'number' ? x : Z[k]; };
  var DT = 1 / 30, E = {}, cl = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  // پوش: tu ثابت زمانی حمله، td ثابت زمانی رهایی (ثانیه)
  function env(k, x, tu, td) { var c = E[k] === undefined ? 0 : E[k]; c += (x - c) * (1 - Math.exp(-DT / (x > c ? tu : td))); E[k] = c; return c; }
  function soft(x, t) { var s = cl((x - t) / (1 - t)); return 1 - (1 - s) * (1 - s); }   // زانوی نرم
  var P = {}, last = null, lastOn = 0, hit = 0, pAvg = 0.2, grow = 0;
  // یک بار در هر فریم (کلید: frameCount، که با ساعت فریم Grokly جلو می‌رود)
  function tick() {
    var key = typeof frameCount === 'number' ? frameCount : performance.now();
    if (key === last) return P; last = key;
    var fl = env('fl', v('flatness'), 0.7, 0.7), vb = env('vb', v('vibrato'), 0.7, 0.7);
    if (E.mus === undefined) E.mus = 0.5;
    P.mus = env('mus', 0.6 * cl((fl - 0.07) / 0.12) + 0.4 * cl((0.45 - vb) / 0.35), 1.2, 1.2);
    P.level = env('lv', v('level'), 0.06, 0.6);
    P.low = env('low', 0.7 * v('bass') + 0.3 * v('sub'), 0.06, 0.5);
    var on = v('onset'); if (on >= 0.75 && on > lastOn + 0.05) hit = 1; else hit *= Math.exp(-DT / 0.3); lastOn = on;
    P.hit = hit;
    P.cresc = env('dyn', Math.max(0, v('dynamics')), 0.25, 0.8);
    P.cen = env('cen', v('centroid'), 0.2, 0.8);
    P.air = env('air', soft(v('air'), 0.1), 0.08, 0.5);
    var vo = v('voiced'); P.voiced = env('vo', soft(vo, 0.2), 0.15, 0.8);
    if (vo > 0.3) pAvg += (v('pitch') - pAvg) * 0.01;
    P.pRel = env('pr', cl(0.5 + 4 * (v('pitch') - pAvg)), 0.4, 0.6);
    P.vib = env('vib', soft(v('vibrato'), 0.5) * P.voiced, 0.3, 0.5);
    P.high = env('hi', v('high'), 0.1, 0.6);
    P.pres = env('pre', v('presence'), 0.1, 0.6);
    P.mid = env('mid', v('mid'), 0.15, 0.7);
    var calm = 1 - 0.8 * v('silence');
    P.spin = (0.5 + 1.1 * env('tp', v('tempo') * P.mus, 1.0, 1.5) * soft(P.level, 0.05)) * calm
           + Math.max(-0.35, Math.min(0.5, 0.9 * env('pd', v('pitchDelta'), 0.25, 0.5)));
    grow += 0.7 * soft(env('lm', v('lowMid'), 0.2, 0.6), 0.25); P.growth = grow >= 1 ? 2 : 1; if (grow >= 1) grow -= 1;
    return P;
  }
  // owner: poppies, dandelions and stems move on their own — no sound in them
  window.__grassWind = function () { return 1; };
  window.__grassShown = function () { return true; };
  // ستون‌ها: هر ستون یک باند (باندهای ۰، ۶، ۱۲، ۱۸، ۲۴ — از بم تا زیر) + جهش onset
  window.__band = function (i) { var p = tick(), b = (window.__S().bands || []); return 0.3 + 0.95 * soft(b[(i * 6) % 32] || 0, 0.03) + 0.35 * p.hit; };
  window.__morph = function () { return 1; };
  window.__petalFreq = function () { return 1; };
  window.__tremble = function () { return 0; };
  window.__breath = function () { return 0; };
  window.__inkAlpha = function (a) { return Math.min(255, a * (0.5 + 0.7 * tick().level)); };
  // background map lines: their THICKNESS follows the sound, each kind of line its own part
  window.__inkWeight = function (w) { var p = tick(); return w * (0.55 + 1.3 * soft(p.low, 0.05) + 0.5 * p.hit); };          // خطوط سیاه لبه‌ای ← bass + sub + onset
  window.__wInk = function (w) { var p = tick(); return w * (0.45 + 1.5 * soft(p.level, 0.05) + 0.45 * p.cresc); };         // خطوط سیاه درهم ← level + dynamics (اوج)
  window.__wCream = function (w) { var p = tick(); return w * (0.45 + 1.6 * p.cen + 0.6 * p.air); };                        // خطوط شیری ← centroid + air
  window.__wColour = function (w) { var p = tick(); return w * (0.4 + 1.3 * p.voiced + 0.8 * p.pRel * p.voiced + 0.4 * p.vib); }; // خط رنگی ← voiced + pitch + vibrato
  window.__lineAlpha = function (a) { return Math.min(255, a * (0.45 + 0.75 * tick().voiced)); };
  window.__creamAlpha = function (a) { return Math.min(255, a * (0.5 + 0.8 * tick().cen)); };
  window.__spin = function () { return tick().spin; };
  window.__jit = function () { return 0.6 + 0.9 * tick().air; };
  window.__spiralW = function (w) { return w * (0.7 + 0.8 * soft(tick().high, 0.05)); };
  window.__sunAlpha = function () { return 120 + 135 * soft(tick().pres, 0.03); };
  window.__sunSize = function (d) { return d * (0.9 + 0.3 * tick().mid); };
  window.__growth = function () { return tick().growth; };
})();
