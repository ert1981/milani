/* sound-waves.js — Dusk Hills in Grokly: each wave layer behind the dark foreground hill answers to its own part of the sound.
   صدا فقط روی موج‌های پشت تپهٔ تیره و جهت پرنده‌های کوچک اثر دارد؛ تپهٔ جلو، علف‌ها و قاب ثابت‌اند و هیچ زومی نیست.

   شکل‌دهی صدا (برای همهٔ لایه‌ها، ۳۰ فریم در ثانیه):
     · پوش (envelope) «حملهٔ تند، رهایی آرام»: موج با صدا زود بالا می‌آید و آرام فرود می‌آید؛ در سکوت در حدود یک ثانیه نرم آرام می‌گیرد، نه یخ می‌زند نه می‌پرد.
     · زانوی نرم و سقف نرم (tanh): اوج‌ها فشرده می‌شوند و هیچ لایه‌ای از حد خودش بیرون نمی‌زند.
     · حالت گفتار ↔ موسیقی: وزنی آرام از flatness (صدای سازی/نویزی) و vibrato (لرزش زیر و بمی گفتار)؛
       ریتم (tempo، tempoPhase) فقط در موسیقی اثر دارد — در گفتار هجاها ضرب گرفته می‌شوند و tempo همیشه پر است.
     · فازها انباشته می‌شوند، پس تغییر سرعت پرش نمی‌سازد؛ هر لایه فاز/تأخیر خودش را دارد تا لایه‌ها با هم نتپند.

   ۱۲ لایهٔ موج Take Flight Alone، از عقب به جلو (لایهٔ ۱۲، تپهٔ سبز تیرهٔ جلو، ثابت می‌ماند):
     آسمان        layers 1–3  ← trend (میانگین ۳ ثانیه) بالا آمدن آرام · air (نفس، «س») لرزش ریز لبه · centroid (روشنی صدا) سرعت لرزش
     تپه‌های دور   layers 4–6  ← level (بلندی صدا) ارتفاع موج، هر لایه کمی دیرتر از لایهٔ پشتی (موجی که از عقب به جلو می‌آید) · dynamics (اوج/فرود) بالا و پایین رفتن نرم
     تپه‌های میانی layers 7–9  ← voiced (صدای آهنگین) پیدا شدن · pitch نسبی (زیر و بمی نسبت به میانگین خود صدا) طول موج ·
                                 pitchDelta (بالا/پایین رفتن نت) سرعت و جهت جریان · vibrato (تحریر) لرزش ملایم تاج، فقط وقتی تحریر واقعی هست
     تپه‌های نزدیک layers 10–11 ← bass + sub (صدای بم) پف کردن · onset (هر حمله) تاج رونده، تا ۴ تاج هم‌زمان · tempoPhase (ریتم) نفس کشیدن، فقط در موسیقی
   پرنده‌های کوچک: فقط جهت پروازشان با بلندی صدا عوض می‌شود: صدای آرام ← به راست، صدای بلند ← به چپ.
     بلندی هموار شده با دو آستانه (۰٫۵۸ / ۰٫۳۸) و دست‌کم ۱٫۳ ثانیه ماندن روی هر جهت، تا گله با هر کلمه برنگردد.
     صدا آن‌ها را بالا یا پایین نمی‌برد. */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };   // no extra draws when loud: the pace of the piece stays its own
(function () {
  var M = function () { return (window.SONIC && SONIC.active) ? SONIC : {}; };
  var DT = 1 / 30;
  var E = {}, cl = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  // پوش: tu ثابت زمانی حمله، td ثابت زمانی رهایی (ثانیه)
  function env(k, x, tu, td) { var c = E[k] === undefined ? 0 : E[k]; c += (x - c) * (1 - Math.exp(-DT / (x > c ? tu : td))); E[k] = c; return c; }
  // زانوی نرم: زیر آستانهٔ t هیچ، بالای آن تند شروع و نرم به ۱ می‌رسد
  function soft(x, t) { var s = cl((x - t) / (1 - t)); return 1 - (1 - s) * (1 - s); }
  var lim = function (x, m) { return m * Math.tanh(x / m); };

  var S = {}, H = [], crests = [], lastOn = 0, ph = { sky: 0, mid: 0, vib: 0, beat: 0 }, pAvg = 0.2, loud = false, hold = 0;
  window.__wl = -1;
  window.__waveFrame = function () {
    var m = M(); window.__wl = -1;
    // حالت موسیقی (۰ گفتار … ۱ موسیقی)
    var fl = env('fl', m.flatness || 0, 0.7, 0.7), vb = env('vb', m.vibrato || 0, 0.7, 0.7);
    if (E.mus === undefined) E.mus = 0.5;
    S.mus = env('mus', 0.6 * cl((fl - 0.07) / 0.12) + 0.4 * cl((0.45 - vb) / 0.35), 1.2, 1.2);
    S.en = env('en', m.level || 0, 0.12, 0.9);
    // آسمان
    S.trend = env('tr', m.trend || 0, 1.0, 2.0);
    S.air = env('air', soft(m.air || 0, 0.1), 0.1, 0.5);
    ph.sky += DT * (2.2 + 4.5 * env('cen', m.centroid || 0, 0.4, 0.8));
    // تپه‌های دور: تاریخچهٔ کوتاه بلندی، برای تأخیر هر لایه
    H.unshift(soft(env('lv', m.level || 0, 0.08, 0.6), 0.05)); if (H.length > 12) H.length = 12;
    S.dyn = lim(env('dyn', m.dynamics || 0, 0.35, 0.8), 0.8);
    // تپه‌های میانی
    var vo = m.voiced || 0;
    S.voiced = env('vo', soft(vo, 0.2), 0.3, 0.9);
    if (vo > 0.3) pAvg += ((m.pitch || 0) - pAvg) * 0.01;
    S.pRel = env('pr', cl(0.5 + 4 * ((m.pitch || 0) - pAvg)), 0.8, 0.8);
    ph.mid += 0.015 + lim(0.15 * env('pd', m.pitchDelta || 0, 0.25, 0.4), 0.06);
    S.vib = env('vib', soft(m.vibrato || 0, 0.5) * S.voiced, 0.3, 0.5);
    ph.vib += 0.45;
    // تپه‌های نزدیک
    S.low = lim(env('low', 0.7 * (m.bass || 0) + 0.3 * (m.sub || 0), 0.07, 0.5), 0.9);
    var on = m.onset || 0;
    if (on >= 0.75 && on > lastOn + 0.05 && (!crests.length || crests[crests.length - 1].age > 7)) {
      crests.push({ x: -120, a: 0.35 + 0.65 * soft(m.level || 0, 0.1), age: 0 }); if (crests.length > 4) crests.shift();
    }
    lastOn = on;
    for (var i = crests.length - 1; i >= 0; i--) { var c = crests[i]; c.x += 17; c.a *= 0.975; c.age++; if (c.x > 1400 || c.a < 0.02) crests.splice(i, 1); }
    var bpm = 60 + 120 * (m.tempo || 0), e = (m.tempoPhase || 0) - ph.beat; e -= Math.round(e);
    ph.beat += DT * bpm / 60 + 0.08 * e; ph.beat -= Math.floor(ph.beat);
    S.breath = S.mus * soft(S.en, 0.05);
    // پرنده‌ها: بلندی هموار + دو آستانه + حداقل ۱٫۳ ثانیه ماندن
    var lv = env('bird', m.level || 0, 0.25, 0.5); hold++;
    if (hold > 40 && !loud && lv > 0.58) { loud = true; hold = 0; } else if (hold > 40 && loud && lv < 0.38) { loud = false; hold = 0; }
    window.__birdDir = m.active === undefined && !window.SONIC ? 0 : (loud ? -1 : 1);
  };
  window.__waveNext = function () { window.__wl++; };
  window.__wave = function (x, y) {
    var L = Math.max(0, window.__wl);
    if (L >= 11) return y;   // لایهٔ اول از جلو (سبز تیره) — owner: the sound never touches it; only the waves behind it move
    var g = L < 3 ? 0 : L < 6 ? 1 : L < 9 ? 2 : 3, j = g === 3 ? L - 9 : L % 3;
    var Hh = (typeof height === 'number' ? height : 800), k = Hh / 800;
    if (g === 0) {
      // آسمان: trend بالا آمدن · air لرزش، هر لایه طول موج و فاز خودش
      y += -60 * k * S.trend + 6 * k * S.air * Math.sin(x * (0.1 + 0.025 * j) / k + ph.sky * (1 + 0.3 * j) + L * 2.1);
    } else if (g === 1) {
      // تپه‌های دور: level با تأخیر ۰، ۴ و ۸ فریم · dynamics
      var lv = H[Math.min(H.length - 1, 4 * j)] || 0;
      y = Hh * 0.75 + (y - Hh * 0.75) * (1 + 0.55 * lv) - 40 * k * S.dyn;
    } else if (g === 2) {
      // تپه‌های میانی: voiced دامنه · pitch نسبی طول موج (حول وسط) · vibrato لرزش تاج
      var cx = (typeof width === 'number' ? width : 800) / 2;
      y += 34 * k * S.voiced * Math.sin((x - cx) * (0.012 + 0.022 * S.pRel) * (1 + 0.15 * j) / k + ph.mid + L * 1.3)
         + 4 * k * S.vib * Math.sin(x * 0.3 / k + ph.vib + L);
    } else {
      // تپه‌های نزدیک: پف بم · تاج‌های onset · نفس ریتم (فقط موسیقی، فاز لایهٔ جلوتر کمی عقب‌تر)
      y += -48 * k * S.low * (0.5 + 0.5 * Math.sin(x * 0.007 / k + L * 1.7));
      var cr = 0;
      for (var i = 0; i < crests.length; i++) { var dx = (x - (crests[i].x - 40 * j) * k) / (70 * k); cr += crests[i].a * Math.exp(-dx * dx); }
      y += -40 * k * lim(cr, 1.2);
      y += 10 * k * S.breath * Math.sin(2 * Math.PI * (ph.beat - 0.15 * j));
    }
    return y;
  };
})();
