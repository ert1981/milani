/* Old Tree — نگاشت صدا
   قانون‌ها: بدون زوم و کشیدگی؛ درخت، زمین و قاب ثابت‌اند (نگاشت خودکار viz-map که شکل‌ها را تاب می‌داد برداشته شد)؛
   تابلو و همهٔ نوشته‌ها حذف شده‌اند. صدا فقط پرنده‌ها و نخ‌های معلق را حرکت می‌دهد، هر کدام از پارامتر جدای صدا.
   نرم: با صدا زود بالا می‌رود و آرام برمی‌گردد؛ در سکوت همه‌چیز به حرکت آرام خودش برمی‌گردد. */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };
(function () {
  const sm = {}, V = {};
  const c01 = (x) => (Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : 0);
  const cpm = (x) => (Number.isFinite(x) ? Math.max(-1, Math.min(1, x)) : 0);
  function ar(k, v, up, down) { const p = sm[k] || 0; return (sm[k] = p + (v - p) * (v > p ? up : down)); }
  let last = -1;
  function tick() {
    const s = window.SONIC || {}, on = s.active ? 1 : 0, quiet = 1 - 0.85 * c01(s.silence);
    V.fly   = ar('fly', on * quiet * c01(0.7 * (s.level || 0) + 0.3 * Math.max(0, cpm(s.dynamics))), 0.3, 0.04); // گلهٔ پرنده‌ها ← بلندی + اوج‌گیری
    V.hop   = ar('hop', on * quiet * c01(0.6 * (s.onset || 0) + 0.4 * (s.attack || 0)), 0.6, 0.08);              // پرنده‌های ریز ← شروع ضرب و تیزی صدا
    V.drift = ar('drift', on * quiet * c01(0.6 * (s.bass || 0) + 0.4 * (s.sub || 0)), 0.4, 0.05);                // سرعت نخ‌ها ← بم و زیرِبم
    V.turn  = ar('turn', on * quiet * c01(s.voiced ? 0.5 + 0.5 * (s.vibrato || 0) : 0.4 * (s.mid || 0)), 0.2, 0.04); // چرخش نخ‌ها ← آواز
    V.twist = ar('twist', on * cpm(s.pitchDelta), 0.2, 0.05);                                                     // جهت چرخش ← بالا/پایین رفتن نُت
    V.wind  = ar('wind', on * quiet * c01(0.5 * (s.level || 0) + 0.3 * (s.lowMid || 0) + 0.2 * (s.attack || 0)), 0.25, 0.03); // شدت باد روی علفزار ← بلندی + میانهٔ بم + تیزی شروع
    V.gustS = ar('gustS', on * c01(s.tempo), 0.08, 0.02);                                                          // تندی موج باد ← تمپو
    windPhase += 0.025 + 0.09 * V.gustS + 0.05 * V.wind;                                                           // موج باد از چپ به راست روی علفزار می‌دود
  }
  let windPhase = 0, grassG = null, grassSeed = 0;
  // باد روی هر تیغهٔ علف: در سکوت نسیمی آرام، با صدا تندتر و بلندتر؛ هر تیغه با کمی تأخیر نسبت به همسایه‌اش
  window.__otWind = function (px, py) {
    window.__ot('wind');
    const a = 0.03 + 0.32 * V.wind;
    return a * Math.sin(windPhase - px * 0.006) + 0.4 * a * Math.sin(windPhase * 1.7 - px * 0.017 + py * 0.01);
  };
  // تصادفِ ثابتِ علفزار: هر فریم از همان نقطه شروع می‌شود، پس علف‌ها هر بار همان‌اند
  window.__otRand = function () {
    if (!grassSeed) { const hh = (window.hl && hl.tx && hl.tx.hash) || new URLSearchParams(location.search).get('h') || '0x1'; grassSeed = (parseInt(hh.slice(-8), 16) >>> 0) || 7; }
    let t = grassSeed;
    const r = function () { t = (t + 0x6D2B79F5) | 0; let z = Math.imul(t ^ (t >>> 15), 1 | t); z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z; return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
    return function (a, b) { if (Array.isArray(a)) return a[Math.floor(r() * a.length)]; if (a === undefined) return r(); if (b === undefined) return r() * a; return a + (b - a) * r(); };
  };
  // لایهٔ علفزار
  window.__otGrass = function () {
    if (!grassG) grassG = createGraphics(800, 800);
    grassG.clear(); grassG.resetMatrix();
    return grassG;
  };
  // باد درخت با صدا تکان نمی‌خورد (درخت ثابت می‌ماند)؛ این تابع قبلاً از viz-map می‌آمد
  window.__vizWind = function () { return 1; };
  // یک بار در هر فریم به‌روز می‌شود، هر چند بار هم خوانده شود
  window.__ot = function (k) {
    const f = typeof frameCount !== 'undefined' ? frameCount : 0;
    if (f !== last) { last = f; tick(); }
    return V[k] || 0;
  };
  // ── علفزار «A Field in the Wind» روی مستطیل مشکی ──
  // یک مستطیل مشکی از پایین کانواس تا مرکز بیضیِ زیر درخت (y=608، بیضیِ drawStructure4) کشیده می‌شود
  // و علفزارِ A Field in the Wind (سه لایه تیغهٔ خمیده) یک بار ساخته می‌شود و رویش می‌نشیند تا آن را بپوشاند.
  // باد روی علف‌ها هماهنگ با صداست: شدت ← بلندی + میانهٔ بم + تیزی شروع، تندی موج ← تمپو؛ در سکوت نسیمی آرام.
  const DY = 140;                      // درخت و مستطیل تا وسط ارتفاع علفزار پایین آمده‌اند (لایهٔ درخت بلندتر است، پس تاج بریده نمی‌شود)
  window.__otDY = DY;
  const GROUND_TOP = 608 + DY, GROUND_Y = 812;
  let MEAD = null, mT = 0, mLast = -1, mCv = null, mCtx = null, mFresh = false;
  function sow() {
    const r = window.__otRand();
    MEAD = [];
    const spec = [[1500, 30, 230, 0.4, 5.5, 20, 125], [1500, 40, 230, 0.3, 2.5, 30, 230], [1300, 20, 190, 0.4, 5.5, 30, 255]];
    for (const [n, hMin, hMax, wMin, wMax, aMin, aMax] of spec) {
      const L = new Map();
      for (let i = 0; i < n; i++) {
        const b = { x: r(-60, width + 60), h: r(hMin, hMax), bend: r(8, 140), phase: r(0, 6.2832) };
        b.give = 0.45 + (b.h / 230) * 0.85;
        const w = Math.max(0.4, Math.round(r(wMin, wMax) / 0.9) * 0.9), a = Math.max(10, Math.round(r(aMin, aMax) / 34) * 34);
        const k = w + ':' + a; if (!L.has(k)) L.set(k, { w, a, list: [] }); L.get(k).list.push(b);
      }
      MEAD.push(Array.from(L.values()));
    }
  }
  window.__otMeadow = function () {
    if (!MEAD) sow();
    window.__ot('wind');
    const s = window.SONIC || {}, on = s.active ? 1 : 0, q = 1 - 0.85 * c01(s.silence);
    // هر لایهٔ علف از بخش جدای صدا قد می‌کشد: لایهٔ پشت ← بم، لایهٔ میانی ← میانه، لایهٔ جلو ← زیر
    const hk = [ar('gh0', on * q * c01(0.6 * (s.bass || 0) + 0.4 * (s.sub || 0)), 0.3, 0.04),
                ar('gh1', on * q * c01(0.6 * (s.mid || 0) + 0.4 * (s.centroid || 0)), 0.3, 0.04),
                ar('gh2', on * q * c01(0.6 * (s.high || 0) + 0.4 * (s.presence || 0)), 0.3, 0.04)];
    const thick = ar('gth', on * q * c01(0.6 * (s.onset || 0) + 0.4 * (s.attack || 0)), 0.5, 0.06);   // ضخامت تیغه‌ها ← شروع ضرب و تیزی صدا
    const f = typeof frameCount !== 'undefined' ? frameCount : 0;
    if (f !== mLast) { mLast = f; mT += (1 / 30) * (0.7 + 1.6 * (V.gustS || 0)); }   // زمانِ باد: با تمپو تندتر
    const gust = 0.22 + 1.1 * (V.wind || 0);                                              // شدت باد ← صدا
    // علفزار روی یک بوم نرم‌افزاری جدا (فقط نوار پایین) کشیده و یک‌جا روی کانواس گذاشته می‌شود:
    // همان نتیجه (ترکیب source-over)، ولی هزاران منحنی پهن روی CPU خیلی سریع‌تر از مسیر GPU کانواس اصلی کشیده می‌شوند
    const pd = pixelDensity(), TOP = 440, main = drawingContext;
    if (!mCv || mCv.width !== Math.ceil(width * pd) || mCv.height !== Math.ceil((height - TOP) * pd)) {
      mFresh = false; mCv = document.createElement('canvas'); mCv.width = Math.ceil(width * pd); mCv.height = Math.ceil((height - TOP) * pd);
      mCtx = mCv.getContext('2d', { willReadFrequently: true });
    }
    // در گروکلی علفزار هر دو فریم یک بار از نو کشیده می‌شود (۱۵ بار در ثانیه) و در فریم میانی همان تصویر قبلی گذاشته می‌شود:
    // تکان علف همان است، کار نصف می‌شود؛ وابسته به شمارهٔ فریم است، پس یک بذر همیشه همان فریم‌ها را می‌دهد
    if (window.__GROKLY_FEED && mFresh && (f & 1)) { main.save(); main.setTransform(1, 0, 0, 1, 0, 0); main.drawImage(mCv, 0, Math.round(TOP * pd)); main.restore(); return; }
    mFresh = true;
    const ctx = mCtx;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, mCv.width, mCv.height);
    ctx.save();
    ctx.setTransform(pd, 0, 0, pd, 0, -TOP * pd);
    ctx.fillStyle = '#000'; ctx.fillRect(-10, GROUND_TOP, width + 20, height - GROUND_TOP + 10);         // مستطیل مشکی
    ctx.lineCap = 'butt';
    ctx.beginPath(); ctx.rect(-10, -10, width + 20, GROUND_TOP + 10); ctx.clip();                     // فقط بخش بیرون از مستطیل مشکی دیده می‌شود؛ بقیه رسم نمی‌شود
    for (let li = 0; li < MEAD.length; li++) for (const bk of MEAD[li]) {
      const grow = 0.85 + 0.45 * hk[li];                                                   // قد ← صدا
      ctx.strokeStyle = 'rgba(0,0,0,' + Math.min(1, bk.a / 255 + 0.35) + ')'; ctx.lineWidth = bk.w * (1 + 0.9 * thick); ctx.beginPath(); // علفزار مشکی
      for (const b of bk.list) {
        const wave = Math.sin(mT * 1.35 - b.x * 0.0045 + b.phase), flutter = Math.sin(mT * 2.3 + b.phase * 3.1) * 0.5;
        const bend = b.bend * gust * b.give * (0.72 + 0.5 * wave + 0.3 * flutter);
        const h = b.h * grow * (1 - Math.abs(bend) * 0.0012);
        if (GROUND_Y - h > GROUND_TOP + ctx.lineWidth) continue;                              // تیغه‌ای که کاملاً زیر مستطیل مشکی پنهان است کشیده نمی‌شود (نتیجه همان است)
        // only the part of the blade above the black ground is visible: trace the same curve from the parameter t0 where it
        // passes (just below) the ground's top edge, so the hidden lower part is never stroked (identical picture, much less work)
        const yT = GROUND_TOP + ctx.lineWidth, f = (GROUND_Y - yT) / h;
        if (f <= 0.02) {
          ctx.moveTo(b.x, GROUND_Y);
          ctx.bezierCurveTo(b.x + bend * 0.2, GROUND_Y - h * 0.3, b.x + bend * 0.6, GROUND_Y - h * 0.7, b.x + bend, GROUND_Y - h);
        } else {
          let lo = 0, hi = 1; // rise(t) = 0.9 t(1-t)² + 2.1 t²(1-t) + t³ grows with t: bisect rise(t0) = f
          for (let it = 0; it < 14; it++) { const t = (lo + hi) / 2, u = 1 - t; if (0.9 * t * u * u + 2.1 * t * t * u + t * t * t < f) lo = t; else hi = t; }
          const t = lo, x0 = b.x, x1 = b.x + bend * 0.2, x2 = b.x + bend * 0.6, x3 = b.x + bend, y0 = GROUND_Y, y1 = GROUND_Y - h * 0.3, y2 = GROUND_Y - h * 0.7, y3 = GROUND_Y - h;
          const L = (p, q) => p + (q - p) * t; // de Casteljau: the [t, 1] part of the same cubic
          const ax = L(x0, x1), bx = L(x1, x2), cx = L(x2, x3), dx = L(ax, bx), ex = L(bx, cx), fx = L(dx, ex);
          const ay = L(y0, y1), by = L(y1, y2), cy = L(y2, y3), dy = L(ay, by), ey = L(by, cy), fy = L(dy, ey);
          ctx.moveTo(fx, fy);
          ctx.bezierCurveTo(ex, ey, cx, cy, x3, y3);
        }
      }
      ctx.stroke();
    }
    ctx.restore();
    main.save(); main.setTransform(1, 0, 0, 1, 0, 0); main.drawImage(mCv, 0, Math.round(TOP * pd)); main.restore();
  };
})();
