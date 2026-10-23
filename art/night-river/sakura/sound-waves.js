/* sound-waves.js — Night River (Sakura scene): every wave layer behind the tree answers to its own part of the sound.
   قانون صاحب اثر: درخت و قاب هرگز با صدا جابه‌جا یا بزرگ‌وکوچک نمی‌شوند؛ فقط موج‌های پشت درخت و برف حرکت می‌کنند.
   صحنهٔ ساکورا ۱۵ فریم در ثانیه جلو می‌رود (هر دو فریم ویدیو یک بار)، پس همهٔ ثابت‌های زمانی بر حسب ثانیه‌اند.

   شکل‌دهی صدا (برای همهٔ لایه‌ها):
     · پوش (envelope) با «حملهٔ تند، رهایی آرام»: موج با صدا زود بالا می‌آید و آرام فرود می‌آید، پس هیچ پرشی نیست و در سکوت نرم آرام می‌گیرد.
     · زانوی نرم: اوج‌ها فشرده می‌شوند و هیچ لایه‌ای از سقف خودش رد نمی‌شود.
     · حالت گفتار ↔ حالت موسیقی: از flatness (صدای نویزی/سازی) و vibrato (لرزش زیر و بمی گفتار) یک وزن آرام ساخته می‌شود؛
       ریتم (tempo، tempoPhase) فقط در موسیقی اثر دارد — در گفتار، تشخیص ضرب هجاها را ضرب می‌گیرد و tempo همیشه پر است.
     · فازها انباشته می‌شوند (نه زمان × سرعت)، پس تغییر سرعت هرگز پرش فاز نمی‌سازد؛ هر لایه فاز و تأخیر خودش را دارد تا لایه‌ها هم‌زمان نتپند.

   ۱۲ لایهٔ موج Flying above the clouds()، از عقب به جلو، ۴ گروه سه‌تایی:
     آسمان        ← trend (میانگین ۳ ثانیهٔ بلندی) آرام بالا آمدن · air (نفس، «س»، ۱۰–۱۶ کیلوهرتز) لرزش ریز لبه · centroid (روشنی صدا) سرعت لرزش
     تپه‌های دور   ← level (بلندی) ارتفاع موج، با تأخیر کوچک برای هر لایه (موجی که از عقب به جلو می‌رود) · dynamics (اوج/فرود) بالا و پایین رفتن نرم لایه
     تپه‌های میانی ← voiced (صدای آهنگین) پیدا شدن · pitch نسبی (زیر و بمی نسبت به میانگین خود گوینده) طول موج · pitchDelta (بالا/پایین رفتن نت) جهت و سرعت جریان ·
                     vibrato (تحریر) لرزش ملایم تاج، فقط وقتی واقعاً تحریر هست
     تپه‌های نزدیک ← bass + sub (صدای بم) پف کردن · onset (هر حمله) تاجی که از چپ به راست می‌رود (تا ۴ تاج هم‌زمان) · tempoPhase (ریتم) نفس کشیدن، فقط در موسیقی
   برف (Particle): سرعت ← level + tempo (فقط موسیقی) · وزش کناری ← attack (پوش نرم، نه ضربهٔ تک‌فریمی) · درخشش ← presence ·
                   تعداد دانه‌ها ← rolloff (خیلی آرام، تا دانه‌ها چشمک نزنند) · سکوت ← آرام‌تر و کمتر */
(function () {
  var M = function () { return window.SONIC || {}; };
  var DT = 1 / 15;                                               // هر فراخوانی __waveFrame یک فریم صحنه = ۱/۱۵ ثانیه
  var E = {}, cl = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  // پوش: tu ثابت زمانی حمله، td ثابت زمانی رهایی (ثانیه)
  function env(k, x, tu, td) { var c = E[k] === undefined ? 0 : E[k]; c += (x - c) * (1 - Math.exp(-DT / (x > c ? tu : td))); E[k] = c; return c; }
  // زانوی نرم: زیر آستانهٔ t هیچ، بالای آن تند شروع و نرم به ۱ می‌رسد
  function soft(x, t) { var s = cl((x - t) / (1 - t)); return 1 - (1 - s) * (1 - s); }
  var lim = function (x, m) { return m * Math.tanh(x / m); };    // سقف نرم برای جابه‌جایی‌ها

  var S = {}, H = [], crests = [], lastOn = 0, ph = { sky: 0, mid: 0, vib: 0, beat: 0 }, pAvg = 0.2, n = 0;
  window.__wl = -1;
  // once per drawn frame (start of the wave function)
  window.__waveFrame = function () {
    var m = M(); window.__wl = -1; n++;
    // حالت موسیقی (۰ گفتار … ۱ موسیقی): آرام و دوطرفه، تا تصویر بین دو حالت جابه‌جا نپرد
    var fl = env('fl', m.flatness || 0, 0.7, 0.7), vb = env('vb', m.vibrato || 0, 0.7, 0.7);
    if (E.mus === undefined) E.mus = 0.5;
    S.mus = env('mus', 0.6 * cl((fl - 0.07) / 0.12) + 0.4 * cl((0.45 - vb) / 0.35), 1.2, 1.2);
    S.en = env('en', m.level || 0, 0.12, 0.9);                   // انرژی کلی: در سکوت در حدود یک ثانیه آرام می‌گیرد
    // آسمان
    S.trend = env('tr', m.trend || 0, 1.0, 2.0);
    S.air = env('air', soft(m.air || 0, 0.1), 0.1, 0.5);
    ph.sky += DT * (2.2 + 4.5 * env('cen', m.centroid || 0, 0.4, 0.8));
    // تپه‌های دور: یک تاریخچهٔ کوتاه از بلندی، تا هر لایه کمی دیرتر از لایهٔ پشتی جواب بدهد
    H.unshift(soft(env('lv', m.level || 0, 0.08, 0.6), 0.05)); if (H.length > 8) H.length = 8;
    S.dyn = lim(env('dyn', m.dynamics || 0, 0.35, 0.8), 0.8);
    // تپه‌های میانی: زیر و بمی نسبت به میانگین خود صدا (گفتار در بازهٔ باریکی است، پس فاصله از میانگین بیانگرتر است)
    var vo = m.voiced || 0;
    S.voiced = env('vo', soft(vo, 0.2), 0.3, 0.9);
    if (vo > 0.3) pAvg += ((m.pitch || 0) - pAvg) * 0.02;
    S.pRel = env('pr', cl(0.5 + 4 * ((m.pitch || 0) - pAvg)), 0.8, 0.8);
    ph.mid += 0.03 + lim(0.3 * env('pd', m.pitchDelta || 0, 0.25, 0.4), 0.12);
    S.vib = env('vib', soft(m.vibrato || 0, 0.5) * S.voiced, 0.3, 0.5);
    ph.vib += 0.9;
    // تپه‌های نزدیک
    S.low = lim(env('low', 0.7 * (m.bass || 0) + 0.3 * (m.sub || 0), 0.07, 0.5), 0.9);
    // onset: لبهٔ بالارونده (نمونه‌برداری ۱۵ فریمی ممکن است قلهٔ ۱ را نبیند) و حداقل ۰٫۲۵ ثانیه فاصله بین تاج‌ها
    var on = m.onset || 0;
    if (on >= 0.75 && on > lastOn + 0.05 && (!crests.length || crests[crests.length - 1].age > 3)) {
      crests.push({ x: -120, a: 0.35 + 0.65 * soft(m.level || 0, 0.1), age: 0 }); if (crests.length > 4) crests.shift();
    }
    lastOn = on;
    for (var i = crests.length - 1; i >= 0; i--) { var c = crests[i]; c.x += 34; c.a *= 0.95; c.age++; if (c.x > 1000 || c.a < 0.02) crests.splice(i, 1); }
    // ریتم: یک فاز آرام که به tempoPhase قفل می‌شود، تا با جابه‌جا شدن ضرب نپرد
    var bpm = 60 + 120 * (m.tempo || 0), e = (m.tempoPhase || 0) - ph.beat; e -= Math.round(e);
    ph.beat += DT * bpm / 60 + 0.15 * e; ph.beat -= Math.floor(ph.beat);
    S.breath = S.mus * soft(S.en, 0.05);
    // برف
    var tempoM = (m.tempo || 0) * S.mus, calm = 1 - 0.8 * (m.silence || 0);
    window.__snow = {
      speed: (0.35 + 1.1 * (0.45 * env('st', tempoM, 1.0, 1.5) + 0.55 * soft(S.en, 0.05))) * calm,
      gust: -8 * env('ga', soft(m.attack || 0, 0.25), 0.1, 0.7),
      fall: (0.6 + 1.8 * env('sf', tempoM, 1.0, 1.5)) * calm,
      bright: 0.45 + 0.55 * env('pre', m.presence || 0, 0.15, 0.6),
      count: (0.35 + 0.65 * env('ro', m.rolloff || 0, 1.5, 3.0)) * (0.6 + 0.4 * calm),
    };
  };
  window.__waveNext = function () { window.__wl++; };
  // y: the layer's own noise curve at x; returns the sound-shaped y (never touches the tree, which is drawn later on its own layer)
  window.__wave = function (x, y) {
    var L = Math.max(0, window.__wl), g = Math.min(3, (L / 3) | 0), j = L % 3;
    if (g === 0) {
      // آسمان: بالا آمدن آرام با trend · لرزش ریز با air، هر لایه طول موج و فاز خودش
      y += -60 * S.trend + 6 * S.air * Math.sin(x * (0.1 + 0.025 * j) + ph.sky * (1 + 0.3 * j) + L * 2.1);
    } else if (g === 1) {
      // تپه‌های دور: level با تأخیر ۰، ۲ و ۴ فریم برای سه لایه · dynamics بالا/پایین
      var lv = H[Math.min(H.length - 1, 2 * j)] || 0;
      y = 600 + (y - 600) * (1 + 0.55 * lv) - 40 * S.dyn;
    } else if (g === 2) {
      // تپه‌های میانی: voiced دامنه · pitch نسبی طول موج (حول وسط تصویر، تا تغییرش لبه را نپراند) · vibrato لرزش تاج
      y += 34 * S.voiced * Math.sin((x - 400) * (0.012 + 0.022 * S.pRel) * (1 + 0.15 * j) + ph.mid + L * 1.3)
         + 4 * S.vib * Math.sin(x * 0.3 + ph.vib + L);
    } else {
      // تپه‌های نزدیک: پف بم با پنجرهٔ مکانی جدا برای هر لایه · تاج‌های onset · نفس ریتم (فقط موسیقی، و فاز هر لایه کمی عقب‌تر)
      y += -48 * S.low * (0.5 + 0.5 * Math.sin(x * 0.007 + L * 1.7));
      var cr = 0;
      for (var i = 0; i < crests.length; i++) { var dx = (x - crests[i].x + 40 * j) / 70; cr += crests[i].a * Math.exp(-dx * dx); }
      y += -40 * lim(cr, 1.2);
      y += 10 * S.breath * Math.sin(2 * Math.PI * (ph.beat - 0.12 * j));
    }
    return y;
  };
})();
