/* fern-sound.js — صدا به حرکتِ «سرخس» (Reza Milani · Grokly)
   ─────────────────────────────────────────────────────────────
   هر لایهٔ حرکت از ویژگی‌های جداگانهٔ صدا (window.SONIC) فرمان می‌گیرد، نه همه از بلندی صدا.
   همهٔ ویژگی‌ها نرم می‌شوند: بالا رفتن سریع، پایین آمدن آرام؛ دامنه‌ها ملایم‌اند و در سکوت همه‌چیز آرام به حالت اصلی برمی‌گردد.
   وقتی همهٔ ویژگی‌ها صفرند، حرکت دقیقاً همان حرکت اصلی اثر است (همان کد ⇒ همان تصویر اصلی).
   هیچ زوم، کشیدگی یا جابه‌جایی کلِ تصویر از صدا نیست؛ فقط ذره‌ها (جوهرِ سرخس) با صدا حرکت می‌کنند و قاب ثابت است.
   این فایل از رشتهٔ تصادفی hl هیچ عددی برنمی‌دارد، پس ترکیب‌بندی هر کد دست‌نخورده می‌ماند. */
(function () {
  // افکت‌های عمومی viz-audio.js خاموش: نه زوم، نه نور، نه چرخش رنگ، نه فریم اضافه
  window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };

  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var num = function (v) { return typeof v === 'number' && isFinite(v) ? v : 0; };

  // نرم‌کنندهٔ هر ویژگی: up سرعت حمله (سریع)، down سرعت رهاسازی (آرام) — به‌ازای هر فریم ۳۰ هرتز
  var S = {};
  // Grokly's virtual clock: the ms Grokly passes to each frame step (fixed 1000/30 steps in a video)
  var V = { on: false, now: 0, last: null };
  if (window.__GROKLY_FEED && typeof window.__groklyStep === 'function') {
    var gstep = window.__groklyStep;
    V.on = true;
    window.__groklyStep = function (f, ms) { V.now = ms; return gstep(f, ms); };
  }
  function env(k, v, up, down, dt) {
    var c = S[k] === undefined ? 0 : S[k];
    var a = v > c ? up : down;
    a = 1 - Math.pow(1 - a, dt * 30); // مستقل از نرخ فریم
    S[k] = c + (v - c) * a;
    return S[k];
  }

  var F = {
    t: 0, dt: 1 / 30,
    // مقدارهای نرم‌شده
    level: 0, bass: 0, sub: 0, lowMid: 0, mid: 0, high: 0, presence: 0, air: 0,
    centroid: 0, rolloff: 0, flatness: 0, flux: 0, zcr: 0, voiced: 0, pitch: 0, pitchHzN: 0,
    pitchDelta: 0, vibrato: 0, trend: 0, dynamics: 0, attack: 0, pulse: 0, tempo: 0, beatGlow: 0,
    calm: 1, act: 0, gust: 0,
    // جهت: dir بین −۱ و +۱، با فنرِ میرای بحرانی آرام به dirTarget می‌رسد (بی‌پرش، بی‌فراجهش)
    dir: 1, dirVel: 0, dirTarget: 1, lastFlip: -99, prevOnset: 0, prevAttack: 0, flips: 0,
    swayPh: 0, wobPh: 0, beats: 0, beatGroup: -1,
    bands: new Float32Array(32)
  };

  // هر فریم یک بار، در ابتدای draw()
  F.frame = function () {
    var A = window.SONIC || {};
    // Inside Grokly the frame time comes from Grokly's own virtual clock (the ms of each step), not from p5's deltaTime:
    // deltaTime is performance.now() differences, and performance.now() = real load time + virtual time, so its last
    // bits changed from run to run; this smoothing amplified them and the same seed gave different frames.
    // First frame: deltaTime is 0 there (clamped to 1/120 below), as before.
    var dms;
    if (V.on) { dms = V.last === null ? 0 : V.now - V.last; V.last = V.now; }
    else dms = typeof deltaTime === 'number' ? deltaTime : 33.3;
    var dt = clamp(dms / 1000, 1 / 120, 0.1);
    F.dt = dt; F.t += dt;

    // سکوت (۰ در صدا … ۱ پس از ۳ ثانیه سکوت) → calm: همه‌چیز آرام کند و نرم می‌شود
    var sil = env('silence', num(A.silence), 0.08, 0.2, dt);
    F.calm = 1 - 0.45 * sil;
    // act: «صدا هست» — فقط برای اینکه چرخش‌ها در بی‌صدایی به صفر برگردند
    F.act = env('act', clamp(num(A.level) * 3, 0, 1) * (1 - sil), 0.3, 0.04, dt);

    // بم و زیر‌بم (bass, sub) → گام ذره‌ها: سرخس با بم بلندتر قدم برمی‌دارد
    F.bass = env('bass', num(A.bass), 0.5, 0.06, dt);
    F.sub = env('sub', num(A.sub), 0.5, 0.05, dt);
    // میانهٔ پایین (lowMid) → دامنهٔ تاب خوردن (sway) ذره‌ها به چپ و راست
    F.lowMid = env('lowMid', num(A.lowMid), 0.4, 0.05, dt);
    // میانه (mid) → خمیدگی: چقدر جهت جریان می‌چرخد
    F.mid = env('mid', num(A.mid), 0.4, 0.05, dt);
    // زیر (high) و هوا (air) → لرزش ریز نقطه‌های جوهر
    F.high = env('high', num(A.high), 0.6, 0.1, dt);
    F.air = env('air', num(A.air), 0.6, 0.1, dt);
    // حضور (presence) و صدای سایشی (zcr) → ضخامت خط ردّ ذره‌ها
    F.presence = env('presence', num(A.presence), 0.5, 0.08, dt);
    F.zcr = env('zcr', num(A.zcr), 0.5, 0.08, dt);
    // بلندی (level) → غلظت جوهر (شفافیت نقطه‌ها)
    F.level = env('level', num(A.level), 0.5, 0.06, dt);
    // روشنی صدا (centroid) → سرعت «نفس کشیدن» اندازهٔ نقطه‌ها؛ rolloff → عمق این نفس
    F.centroid = env('centroid', num(A.centroid), 0.3, 0.05, dt);
    F.rolloff = env('rolloff', num(A.rolloff), 0.3, 0.05, dt);
    // نویزی بودن (flatness) → ریش‌ریش شدن مسیر: هر ذره کمی موج شخصی می‌گیرد
    F.flatness = env('flatness', num(A.flatness), 0.3, 0.05, dt);
    // تغییر طیف (flux) → تراکم ردّ خط: وقتی صدا زنده و پرتغییر است، خط‌ها پشت‌سرهم‌تر کشیده می‌شوند
    F.flux = env('flux', num(A.flux), 0.5, 0.06, dt);
    // آواز (voiced) و زیر و بمی (pitch) → رشد: ذره‌ها رو به بالا (یا پایین، بسته به جهت) کشیده می‌شوند
    F.voiced = env('voiced', num(A.voiced), 0.3, 0.04, dt);
    F.pitch = env('pitch', num(A.pitch), 0.2, 0.04, dt);
    // فرکانس نت (pitchHz) → فاصلهٔ موج تاب‌خوردن میان ذره‌ها (نت زیرتر = موج‌های ریزتر)
    var hz = num(A.pitchHz);
    if (hz > 0) env('pitchHzN', clamp(Math.log(hz / 70) / Math.log(1000 / 70), 0, 1), 0.2, 0.02, dt);
    else env('pitchHzN', S.pitchHzN || 0, 1, 1, dt);
    F.pitchHzN = S.pitchHzN || 0;
    // جهت ملودی (pitchDelta −۱…+۱) → چرخش ملایم: ملودی بالارونده جریان را پادساعتگرد می‌پیچاند
    F.pitchDelta = env('pitchDelta', clamp(num(A.pitchDelta), -1, 1), 0.15, 0.04, dt);
    // لرزش صدا (vibrato) → لرزش سریع و ریز روی تاب‌خوردن
    F.vibrato = env('vibrato', num(A.vibrato), 0.3, 0.06, dt);
    // میانگین بلندی چندثانیه‌ای (trend) → سرعت پایهٔ رشد در بلندمدت
    F.trend = env('trend', num(A.trend), 0.2, 0.02, dt);
    // اوج‌گیری/فرود (dynamics −۱…+۱) → crescendo پیچ را باز می‌کند، decrescendo جمع می‌کند
    F.dynamics = env('dynamics', clamp(num(A.dynamics), -1, 1), 0.2, 0.05, dt);
    // ضربه (beat/pulse) → بزرگ شدن کوتاه نقطه‌ها؛ beats → هر ضربه یک گروه (یک‌چهارم) از ذره‌ها را بیدار می‌کند
    F.pulse = env('pulse', num(A.pulse), 0.7, 0.12, dt);
    if (A.beat) F.beatGroup = (num(A.beats) | 0) & 3;
    // تمپو (tempo) → سرعت تاب‌خوردن؛ tempoPhase → درخشش کوچکِ هم‌گام با ضرب
    F.tempo = env('tempo', num(A.tempo), 0.1, 0.02, dt);
    var tp = num(A.tempoPhase), hasTempo = num(A.tempo) > 0 ? 1 : 0;
    F.beatGlow = env('beatGlow', hasTempo * (1 - tp) * (1 - tp), 0.6, 0.15, dt);
    // شدت حمله (attack) → تندباد کوتاه: گام‌ها برای لحظه‌ای بلندتر
    F.attack = env('attack', num(A.attack), 0.7, 0.08, dt);
    F.gust = env('gust', F.attack, 0.6, 0.05, dt);
    // طیف ۳۲ باند (bands) → هر ذره به یک باند گوش می‌دهد و گام و اندازه‌اش از آن باند است
    var B = A.bands || [];
    for (var i = 0; i < 32; i++) F.bands[i] = env('b' + i, num(B[i]), 0.5, 0.08, dt);

    // ── «هر تنش صدا جهت حرکت را عوض می‌کند» ──
    // رویداد تیز = لبهٔ بالاروندهٔ onset یا attack؛ با فاصلهٔ بازگشت ۰٫۴ ثانیه تا هر فریم جهت عوض نشود
    var on = num(A.onset), at = num(A.attack);
    var hit = (on > 0.6 && on - F.prevOnset > 0.2) || (at > 0.5 && at - F.prevAttack > 0.15);
    F.prevOnset = on; F.prevAttack = at;
    if (hit && F.t - F.lastFlip > 0.4 && sil < 0.9) { F.dirTarget = -F.dirTarget; F.lastFlip = F.t; F.flips++; }
    // فنر میرای بحرانی: جهت آرام از +۱ به −۱ (یا برعکس) می‌رود، از صفر می‌گذرد و در حدود نیم ثانیه می‌نشیند
    var w = 7;
    F.dirVel += (w * w * (F.dirTarget - F.dir) - 2 * w * F.dirVel) * dt;
    F.dir += F.dirVel * dt;

    // فاز تاب‌خوردن: سرعتش از تمپو (۰٫۲ تا ۰٫۹ هرتز)، و همیشه رو به جلو (پیوسته)
    F.swayPh += 2 * Math.PI * (0.2 + 0.7 * F.tempo) * dt * F.calm;
    F.wobPh += 2 * Math.PI * (1.5 + 4 * F.vibrato) * dt;

    // مقدارهای مشترک همهٔ ذره‌ها (یک بار در هر فریم)
    F._turn = F.dir * F.act * (0.22 + 0.55 * F.mid) * clamp(1 + 0.5 * F.dynamics, 0.5, 1.5) + 0.35 * F.pitchDelta * F.act;
    F._sway = F.dir * (0.3 * F.lowMid + 0.08 * F.vibrato * Math.sin(F.wobPh));
    F._swaySpread = 0.004 + 0.02 * F.pitchHzN;
    F._stride = (1 + 0.45 * F.bass + 0.2 * F.sub + 0.25 * F.trend + 0.5 * F.gust) * F.calm + (1 - F.calm) * 0.15;
    F._lift = -F.dir * 0.9 * F.voiced * (0.3 + 0.7 * F.pitch) * F.calm;
  };

  // ── قلاب‌های ذره‌ای (از sketch.js صدا زده می‌شوند) ──
  // چرخش جهت حرکت ذره (رادیان): خمیدگی (mid) + تاب (lowMid، tempo، vibrato) + ریش‌ریش (flatness)
  F.turn = function (p) {
    var i = p.i || 0;
    return F._turn
      + F._sway * Math.sin(F.swayPh + i * F._swaySpread * 6.283)
      + 0.45 * F.flatness * F.act * Math.sin(i * 1.7 + F.t * 2.3);
  };
  // جابه‌جایی ذره در این فریم: گام (bass, sub, trend, attack, باند خود ذره) + رشد (voiced, pitch)
  F.step = function (p, angle) {
    var b = F.bands[(p.i || 0) & 31];
    var st = 2 * F._stride * (1 + 0.3 * b * F.act);
    return [Math.cos(angle) * st, Math.sin(angle) * st + F._lift];
  };
  // نفس کشیدن اندازهٔ نقطه: سرعت از centroid، عمق از rolloff (بی‌صدا: دقیقاً همان sin(frameCount × inkVariation) اصلی)
  F.breathRate = function () { return 1 + 0.8 * F.centroid; };
  F.breathDepth = function () { return 0.3 + 0.25 * F.rolloff; };
  // اندازهٔ نقطه: ضربه (pulse) برای گروهِ بیدارشده، درخشش ضرب (tempoPhase)، و باند خود ذره
  F.size = function (p) {
    var i = p.i || 0, g = (i & 3) === F.beatGroup ? 1 : 0.35;
    return 1 + 0.35 * F.pulse * g + 0.12 * F.beatGlow + 0.2 * F.bands[i & 31] * F.act;
  };
  // غلظت جوهر: بلندی صدا (level) و اوج‌گیری (dynamics)
  F.ink = function () { return clamp(1 + 0.6 * F.level + 0.2 * Math.max(0, F.dynamics), 0.6, 1.8); };
  // لرزش ریز نقطه‌ها: high و air
  F.jitter = function () { return 1 + 2 * F.high + 1.5 * F.air; };
  // ضخامت ردّ خط: presence و zcr
  F.trailW = function () { return 1 + 0.5 * F.presence + 0.3 * F.zcr; };
  // هر چند فریم یک‌بار ردّ خط کشیده شود: اصلی ۳؛ با flux زیاد ۲
  F.trailEvery = function () { return F.flux > 0.55 && F.act > 0.3 ? 2 : 3; };

  window.FERN_SOUND = F;
})();
