/* gl-sound.js — Garden Lights in Grokly: the cubes, the light of every cell (canvas) and the wind answer to the sound.
   هیچ زومی از صدا نیست؛ دوربین فقط حرکت خود اثر را دارد.

   شکل‌دهی صدا: هر ویژگی یک بار در هر فریم (با frameCount) هموار می‌شود — «حملهٔ تند، رهایی آرام» — و زانوی نرم اوج‌ها را فشرده می‌کند؛
   در سکوت همه‌چیز در حدود یک ثانیه نرم به حالت خود اثر برمی‌گردد. حالت گفتار ↔ موسیقی از flatness و vibrato ساخته می‌شود:
   tempo و pulse فقط در موسیقی اثر دارند (در گفتار، هجاها ضرب گرفته می‌شوند و tempo همیشه پر است).
   هر بخش ویژگی‌های خودش را دارد، تا مکعب‌ها، نورها و باد مستقل از هم حرکت کنند:
     جهت نور هر کانواس (سلول) ← (خواست صاحب اثر) صدا جهتِ نور را می‌چرخاند، نه شدتش را: روشنایی همان روشنایی خود اثر است.
                             هر سلول یک باند از طیف (باندهای ۳ تا ۲۶، بی‌افراطی‌ترین بم و زیر) دارد، نسبت به اوج اخیر همان باند سنجیده می‌شود
                             تا هر سلول همهٔ دامنه‌اش را داشته باشد؛ زود می‌چرخد (۰٫۰۸ ثانیه) و آرام (۰٫۷ ثانیه) برمی‌گردد،
                             تا حدود ۶۰ درجه، سلول‌ها یک‌درمیان ساعتگرد/پادساعتگرد و هر کدام با اندازهٔ خودش؛ در سکوت نرم به جهت اصلی برمی‌گردد.
     اندازهٔ مکعب‌ها (واکنش مکعب‌ها ۴۰٪ کمتر به خواست هنرمند) ← طول: level (بلندی، پوش نرم) + onset (هر حمله، جهش کوتاهی که ۰٫۳ ثانیه‌ای محو می‌شود) · ضخامت: bass + sub (صدای بم)
     باد                   ← شدت وزش: lowMid (بدنهٔ صدا) · وزش ناگهانی: attack (زود می‌آید، حدود یک ثانیه آرام می‌خوابد) ·
                             پایهٔ باد: trend (میانگین ۳ ثانیهٔ بلندی) ·
                             سرعت گذر باد: tempo در موسیقی + flux (سرعت تغییر صدا) در گفتار؛ در سکوت (silence) آرام می‌گیرد ·
                             __windTurn (pitchDelta) هموار شده ولی به اثر وصل نیست: چرخش جهت باد کل میدان موج را جابه‌جا می‌کند */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };   // no extra draws, no zoom
(function () {
  var Z = {};
  var S = function () { var s = window.SONIC; return s && s.active ? s : Z; };
  var v = function (k) { var x = S()[k]; return typeof x === 'number' ? x : 0; };
  var DT = 1 / 30, E = {}, cl = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  // پوش: tu ثابت زمانی حمله، td ثابت زمانی رهایی (ثانیه)
  function env(k, x, tu, td) { var c = E[k] === undefined ? 0 : E[k]; c += (x - c) * (1 - Math.exp(-DT / (x > c ? tu : td))); E[k] = c; return c; }
  function soft(x, t) { var s = cl((x - t) / (1 - t)); return 1 - (1 - s) * (1 - s); }   // زانوی نرم
  var P = {}, last = null, frame = 0, lastOn = 0, hit = 0;
  // یک بار در هر فریم (کلید: frameCount، که با ساعت فریم Grokly جلو می‌رود)
  function tick() {
    var key = typeof frameCount === 'number' ? frameCount : performance.now();
    if (key === last) return P; last = key; frame++;
    var fl = env('fl', v('flatness'), 0.7, 0.7), vb = env('vb', v('vibrato'), 0.7, 0.7);
    if (E.mus === undefined) E.mus = 0.5;
    P.mus = env('mus', 0.6 * cl((fl - 0.07) / 0.12) + 0.4 * cl((0.45 - vb) / 0.35), 1.2, 1.2);
    P.level = soft(env('lv', v('level'), 0.07, 0.5), 0.05);
    var on = v('onset'); if (on >= 0.75 && on > lastOn + 0.05) hit = 1; else hit *= Math.exp(-DT / 0.3); lastOn = on;
    P.hit = hit;
    P.low = soft(env('low', 0.7 * v('bass') + 0.3 * v('sub'), 0.08, 0.6), 0.05);
    P.pulse = v('pulse') * P.mus;
    P.body = soft(env('lm', v('lowMid'), 0.12, 0.7), 0.05);
    P.att = env('att', soft(v('attack'), 0.25), 0.08, 0.9);
    P.trend = env('tr', v('trend'), 1.0, 2.0);
    var calm = 1 - 0.7 * v('silence'), en = env('en', v('level'), 0.15, 0.9);
    P.speed = (0.65 + 1.0 * env('tp', v('tempo') * P.mus, 1.0, 1.5) * soft(en, 0.05) + 0.45 * env('fx', v('flux'), 0.3, 0.8) * (1 - P.mus)) * calm;
    P.turn = 0.25 * env('pd', v('pitchDelta'), 0.4, 0.8);
    return P;
  }
  var cellIdx = new Map(), cellTurn = [], cellPeak = [], cellAt = [], n = 0;
  function cellOf(L) { var i = cellIdx.get(L); if (i === undefined) { i = n++; cellIdx.set(L, i); cellTurn[i] = 0; cellPeak[i] = 0.12; cellAt[i] = -1; } return i; }
  // نور هر سلول (makeLight) — شدت دیگر به صدا وابسته نیست (برای سازگاری، صفر برمی‌گرداند)
  window.__cellLight = function () { return 0; };
  // جهت نور هر سلول (رادیان، به L.dir افزوده می‌شود): باند خودش، هموار، در سکوت صفر
  window.__lightDir = function (L) {
    tick(); var i = cellOf(L);
    if (cellAt[i] !== frame) {   // هر سلول یک بار در هر فریم (چند مکعب یک سلول را با هم دارند)
      cellAt[i] = frame;
      var b = (S().bands || [])[3 + (i * 7) % 24] || 0;
      cellPeak[i] = Math.max(b, 0.12, cellPeak[i] * Math.exp(-DT / 4));          // اوج اخیر باند، با فراموشی ۴ ثانیه‌ای
      var x = soft(b / cellPeak[i], 0.08), g = cellTurn[i];
      cellTurn[i] = g + (x - g) * (1 - Math.exp(-DT / (x > g ? 0.08 : 0.7)));
    }
    return (i % 2 ? -1 : 1) * (0.75 + 0.35 * ((i * 0.618) % 1)) * cellTurn[i];
  };
  // واکنش مکعب‌ها ۴۰٪ کمتر به خواست هنرمند: بخش صدایی طول و ضخامت ۶۰٪ شده؛ اندازهٔ پایه (سکوت) همان ۰٫۷ و ۰٫۷۵ اصلی است
  window.__cubes = function () { var p = tick(); return { len: 0.7 + 0.6 * (0.75 * p.level + 0.3 * p.hit), th: 0.75 + 0.6 * (0.65 * p.low) }; };
  window.__windGust = function () { var p = tick(); return 0.55 + 1.0 * p.body + 0.6 * p.att; };
  window.__windBase = function () { return 0.3 * tick().trend; };
  window.__windSpeed = function () { return tick().speed; };
  window.__windTurn = function () { return tick().turn; };
})();
