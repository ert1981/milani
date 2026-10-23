/* muz-sound.js — منطق صدا برای «موز ۲» (Muz II) · رضا میلانی
   -----------------------------------------------------------------
   این فایل جای کتابخانهٔ p5.sound را گرفته است.
   • داخل Grokly: هیچ صدایی پخش یا بارگذاری نمی‌شود؛ ویژگی‌های صدا هر فریم در window.SONIC می‌آیند.
   • بیرون از Grokly (صفحهٔ تنها): با کلیک، آهنگ a/b1.mp3 از راه viz-audio.js پخش می‌شود
     و همان window.SONIC را پر می‌کند. پس هر دو حالت یک منطق دارند.

   قانون‌های هنرمند:
   • قاب، فیگورها و پیکره‌های اصلی ثابت می‌مانند (هیچ صدایی به آن‌ها نمی‌رسد).
   • کل تصویر هرگز بزرگ/کوچک، جابه‌جا، روشن/تاریک یا رنگ‌گردان نمی‌شود.
   • فقط سه لایه با صدا زنده‌اند و هر لایه از ویژگی‌های «جداگانه» تغذیه می‌شود:
       ۱) خط‌های موجی پس‌زمینه (QD)          ← بم: bass + sub + pulse
       ۲) خط‌های رنگی رونده (o6QD)            ← میانه: lowMid + mid + centroid
       ۳) خط‌های سیاه ظریف (o6QD2)             ← زیر: high + air + flux
       ۴) ذره‌ها / پرنده‌ها (Parandeh, Galin)   ← ضربه و صدای انسان: onset + attack + presence + pitchDelta
       ۵) لکه‌های پراکندهٔ بافت (Ab4A، باد)    ← نویزی بودن صدا: zcr + flatness
   • همه‌چیز نرم می‌شود: «حملهٔ سریع، رهایی آهسته»، و در سکوت آرام آرام به حالت اصلی برمی‌گردد.
   • همه‌چیز قطعی (deterministic) است: نه Math.random، نه تایمر، نه ساعت؛ فقط شمارش فریم.        */
(function () {
  'use strict';

  // حفظ ظاهر اصلی: p5.sound هنگام بارگذاری سه بافر نویز (۲ ثانیه × نرخ نمونه) با Math.random می‌ساخت
  // و همین ۶ × ۴۴۱۰۰ = ۲۶۴۶۰۰ عدد تصادفی را پیش از اسکچ مصرف می‌کرد. اکنون که p5.sound حذف شده،
  // همان تعداد را اینجا مصرف می‌کنیم تا بذر پیش‌فرض Grokly دقیقاً همان ترکیب اصلی را بسازد.
  // (پیش‌تر این عدد به نرخ نمونهٔ کارت صدای دستگاه بستگی داشت ← روی دستگاه ۴۸ کیلوهرتزی اثر دیگری می‌ساخت؛ اکنون همه‌جا یکسان است.)
  for (let i = 0; i < 264600; i++) Math.random();

  // عدد امن: اگر ویژگی‌ای نبود یا NaN بود، صفر برمی‌گردد (جلوگیری از NaN در طراحی)
  function num(v) { return typeof v === 'number' && isFinite(v) ? v : 0; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function S() { return window.SONIC || {}; }

  // نرم‌کننده: اگر هدف بالاتر رفت سریع می‌رسد (attack)، اگر پایین آمد آهسته رها می‌شود (release)
  function follow(cur, target, attack, release) { return cur + (target - cur) * (target > cur ? attack : release); }

  // پوشش‌های نرم‌شدهٔ هر لایه (۰ = آرام، ۱ = پرانرژی)
  const E = { wave: 0, drift: 0, shiver: 0, burst: 0, grain: 0, turn: 0, sway: 0 };
  // فاز (زمان نویز) جداگانهٔ هر لایهٔ خطی؛ با صدا تندتر جلو می‌رود و در سکوت فقط با سرعت عادی
  const P = { wave: 0, drift: 0, shiver: 0 };
  let lastFrame = -1;

  // ---------------------------------------------------------------
  // هر فریم یک بار، در ابتدای draw() صدا زده می‌شود (هوک در sketch.js)
  // ---------------------------------------------------------------
  function frame() {
    const fc = typeof frameCount === 'number' ? frameCount : 0;
    if (fc === lastFrame) return; lastFrame = fc;
    const s = S();
    // سکوت: silence از ۰ (صدا هست) تا ۱ (سه ثانیه سکوت). calm هدف‌ها را آرام کم می‌کند تا اثر در سکوت بخوابد.
    const calm = 1 - 0.85 * clamp01(num(s.silence));

    // ۱) موج‌های پس‌زمینه ← بم و ضربهٔ کیک: bass و sub بدنهٔ موج، pulse تکانهٔ کوتاه روی هر ضرب
    const tWave = clamp01(0.55 * num(s.bass) + 0.25 * num(s.sub) + 0.35 * num(s.pulse)) * calm;
    E.wave = follow(E.wave, tWave, 0.45, 0.035);

    // ۲) خط‌های رنگی رونده ← بدنهٔ میانی صدا (صدای خواننده، ساز): lowMid و mid، و centroid برای «روشنی» طیف
    const tDrift = clamp01(0.4 * num(s.lowMid) + 0.45 * num(s.mid) + 0.3 * num(s.centroid)) * calm;
    E.drift = follow(E.drift, tDrift, 0.35, 0.03);

    // ۳) خط‌های سیاه ظریف ← بسامدهای زیر و تغییر طیف: high و air برای لرزش، flux برای تکان‌های ریز
    const tShiver = clamp01(0.5 * num(s.high) + 0.3 * num(s.air) + 0.5 * num(s.flux)) * calm;
    E.shiver = follow(E.shiver, tShiver, 0.5, 0.05);

    // ۴-الف) جهش ذره‌ها ← شروع نت‌ها و هجاها: onset و attack (تند می‌آید، آرام فروکش می‌کند)
    const tBurst = clamp01(0.7 * num(s.onset) + 0.5 * num(s.attack)) * calm;
    E.burst = follow(E.burst, tBurst, 0.6, 0.06);

    // ۴-ب) اندازهٔ ذره‌ها ← presence (حضور صدای انسان/ساز در ۲ تا ۵ کیلوهرتز)
    const tGrain = clamp01(num(s.presence)) * calm;
    E.grain = follow(E.grain, tGrain, 0.4, 0.04);

    // ۴-پ) چرخش مسیر پرنده‌ها ← pitchDelta (بالا/پایین رفتن زیروبمی، −۱..۱) فقط وقتی صدا «آوازی» است (voiced)
    const tTurn = Math.max(-1, Math.min(1, num(s.pitchDelta))) * clamp01(num(s.voiced)) * calm;
    E.turn = follow(E.turn, tTurn, 0.3, 0.05);

    // ۵) لکه‌های پراکندهٔ بافت (Ab4A) ← «نویزی بودن» صدا: zcr (صامت‌ها، سنج‌ها، خش) و flatness (طیف تخت = نویز)
    const tSway = clamp01(0.6 * num(s.zcr) + 0.5 * num(s.flatness)) * calm;
    E.sway = follow(E.sway, tSway, 0.4, 0.04);

    // فاز هر لایه: سرعت پایه ۰ (همان حرکت اصلی اثر) + سرعت اضافه از صدای همان لایه
    P.wave += 1.6 * E.wave;      // موج‌ها با بم تندتر می‌روند
    P.drift += 0.9 * E.drift;    // خط‌های رنگی با میانه آرام‌تر می‌رانند
    P.shiver += 2.2 * E.shiver;  // خط‌های ظریف با زیر تند می‌لرزند
  }

  // ---------------------------------------------------------------
  // هوک‌های لایه‌ها (در sketch.js صدا زده می‌شوند)
  // ---------------------------------------------------------------
  const lines = {
    // QD: دامنهٔ انحنای موج پس‌زمینه؛ ۱ یعنی همان شکل اصلی، با بم تا ۲٫۲ برابر
    waveAmp: function () { return 1 + 1.2 * E.wave; },
    waveT: function () { return P.wave; },
    // o6QD: خط‌های رنگی؛ با میانه انحنا تا ۱٫۹ برابر
    driftAmp: function () { return 1 + 0.9 * E.drift; },
    driftT: function () { return P.drift; },
    // o6QD2: خط‌های سیاه ظریف؛ با زیر کمی بیشتر می‌لرزند
    shiverAmp: function () { return 1 + 0.8 * E.shiver; },
    shiverT: function () { return P.shiver; },
  };

  // باد لکه‌های بافت (Ab4A): پیش‌تر viz-map.js آن را با bass می‌داد و خودش حذف شده بود ← خطای ReferenceError.
  // اکنون اینجا تعریف شده: ۱ = حرکت اصلی، با zcr/flatness تا ۴ برابر تاب می‌خورند
  window.__vizWind = function () { return 1 + 3 * E.sway; };

  const particles = {
    // پرنده‌ها روی شروع نت‌ها جهش می‌کنند: سرعت اضافه (۰ در سکوت)
    boost: function () { return 0.9 * E.burst; },
    // با بالا و پایین رفتن زیروبمی، مسیر کمی می‌چرخد (رادیان در هر فریم)
    turn: function () { return 0.06 * E.turn; },
    // اندازهٔ اضافهٔ مربع‌ها (پیکسل) از presence
    grow: function () { return 7 * E.grain; },
  };

  // ---------------------------------------------------------------
  // جایگزین ساکت p5.FFT و p5.Amplitude
  // کد اصلی اثر بیش از ۲۰۰ بار در هر فریم fft.analyze() می‌خواند (بسیار کند).
  // این نسخه هیچ هزینه‌ای ندارد و «سکوت» برمی‌گرداند؛ پس قاب و فیگورها همان شکل اصلی را دارند
  // و صدا فقط از راه هوک‌های بالا به لایه‌های مجاز می‌رسد.
  // ---------------------------------------------------------------
  const ZERO_BINS = new Array(128).fill(0);
  const ZERO_WAVE = new Array(1024).fill(0);
  const fft = {
    analyze: function () { return ZERO_BINS; },
    waveform: function () { return ZERO_WAVE; },
    getEnergy: function () { return 0; },
    getCentroid: function () { return 0; },
    smooth: function () { return fft; },
    setInput: function () {},
  };
  const amp = { getLevel: function () { return 0; }, smooth: function () {}, setInput: function () {}, toggleNormalize: function () {} };

  // ---------------------------------------------------------------
  // آهنگ پیش‌فرض (فقط بیرون از Grokly و فقط پس از کلیک کاربر)
  // ---------------------------------------------------------------
  let started = false;
  const song = {
    play: function () {
      if (window.__GROKLY_FEED || started || !window.VIZ_AUDIO) return;
      started = true;
      window.VIZ_AUDIO.useFile('a/b1.mp3').catch(function () { started = false; });
    },
    stop: function () {}, pause: function () {}, isPlaying: function () { return started; }, loop: function () { song.play(); },
  };

  // ---------------------------------------------------------------
  // filter(OPAQUE) روی کل بوم در هر فریم ~۲۸۰ میلی‌ثانیه طول می‌کشید.
  // پس از بار اول، همهٔ پیکسل‌ها مات‌اند و هیچ کدی دوباره شفافشان نمی‌کند؛ پس یک بار کافی است (نتیجه یکسان).
  // ---------------------------------------------------------------
  let opaqueDone = false;
  function opaqueOnce() {
    if (opaqueDone) return; opaqueDone = true;
    // false = p5's CPU filter. By default p5 1.9 runs filter() through a WebGL shader, and creating that WebGL context
    // for this single call took seconds of one blocking task on a software GPU. Same picture: only a few faint
    // anti-aliased edge pixels (alpha near 0) round differently.
    filter(OPAQUE, false);
  }

  // ---------------------------------------------------------------
  // قطعیت در هر اندازهٔ بوم (ربطی به صدا ندارد؛ رفع باگ)
  // چند آرایه در setup به تعداد «پهنای بوم» ساخته می‌شدند و هر عضو عدد تصادفی مصرف می‌کرد؛ پس با همان بذر،
  // بوم ۵۴۰ پیکسلی و بوم ۱۰۸۰ یا افقی ترکیب (فیگورها و رنگ‌ها)ی دیگری می‌گرفتند.
  // stableArray همیشه به اندازهٔ n0 (پهنای مرجع ۵۴۰) از رشتهٔ اصلی مصرف می‌کند:
  //  • عضوهای کمتر از n0 دقیقاً مثل قبل ساخته می‌شوند (ظاهر اصلی در ۵۴۰ حفظ می‌شود)
  //  • اگر بوم کوچک‌تر باشد، بقیه ساخته و دور ریخته می‌شوند تا مصرف یکسان بماند
  //  • اگر بزرگ‌تر باشد، عضوهای اضافه از یک مولد فرعیِ قطعی (از هش) ساخته می‌شوند
  // ---------------------------------------------------------------
  function sidePrng(salt) {
    // مولد فرعی: از کل هش (FNV-1a) و یک «نمک» جداگانه برای هر کاربرد
    const h = String((window.tokenData && window.tokenData.hash) || '0x0') + ':' + salt;
    let a = 2166136261;
    for (let i = 0; i < h.length; i++) { a ^= h.charCodeAt(i); a = Math.imul(a, 16777619) >>> 0; }
    return function () { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  let sideSalt = 0;
  function stableArray(n, n0, make) {
    n = Math.max(0, Math.floor(n)); n0 = Math.max(0, Math.floor(n0));
    const out = [];
    for (let i = 0; i < Math.min(n, n0); i++) out.push(make(i));
    for (let i = n; i < n0; i++) make(i); // دور ریخته می‌شود؛ فقط برای مصرف یکسان
    if (n > n0) {
      const main = Math.random; Math.random = sidePrng('arr' + (++sideSalt));
      try { for (let i = n0; i < n; i++) out.push(make(i)); } finally { Math.random = main; }
    }
    return out;
  }

  // ---------------------------------------------------------------
  // انتخاب پایدار زیرطرح‌ها (فیگور، ذره‌ها، خط‌ها) — رفع باگ
  // پیش‌تر هر انتخاب در فریم اول از رشتهٔ تصادفی اصلی برداشته می‌شد که مصرفش به اندازهٔ بوم بستگی داشت؛
  // پس پیش‌نمایش (بوم کوچک) و ویدیوی خروجی (بوم ۱۰۸۰) دو اثر متفاوت نشان می‌دادند.
  // اکنون انتخاب فقط از هش می‌آید. بذر پیش‌فرض Grokly به همان ترکیب اصلی‌اش (o305 · A24 · drawJM4) سنجاق شده است.
  // ---------------------------------------------------------------
  const DEFAULT_SEED = '0x6d696c616e69617274652d6772' + '0'.repeat(38);
  const PINNED = { 14: 'o305', 30: 'A24', 16: 'drawJM4' };
  function pick(slot, functions) {
    const h = String((window.tokenData && window.tokenData.hash) || '').toLowerCase();
    if (h === DEFAULT_SEED && PINNED[slot]) {
      for (let i = 0; i < functions.length; i++) if (functions[i] && functions[i].name === PINNED[slot]) return functions[i];
    }
    return functions[Math.floor(sidePrng('pick' + slot)() * functions.length)];
  }

  window.MuzSound = { pick: pick, stableArray: stableArray, frame: frame, lines: lines, particles: particles, fft: fft, amp: amp, song: song, opaqueOnce: opaqueOnce, num: num, E: E };
})();
