/* Imago — نگاشت صدا
   قانون‌ها: بدون زوم، نور و چرخش رنگِ کلِ تصویر (VIZ صفر)؛ قاب (g1/g2) و ترکیب‌بندی ثابت‌اند.
   اثر در هر لایه یکی از ده‌ها تابع را با بذر انتخاب می‌کند (drawQ2j ← حدود ۱۵۰ تابع، Cov ← drawJM*، QD ← خط QP12).
   تقریباً همهٔ این تابع‌ها منحنی‌هایشان را با noise(…, t/50) × p.size از آرایه‌های نقطه (PD*, QP*, QR*, JM*, …) می‌کشند،
   پس صدا از سه راه به همهٔ آن‌ها می‌رسد، و هر لایه ویژگی‌های صدای خودش را دارد:
     ۱) فاز موج: در طول اجرای هر لایه به t یک جابه‌جایی جدا اضافه می‌شود که با صدا جلو می‌رود (موج‌ها تندتر می‌رقصند)؛
     ۲) دامنهٔ موج: size نقطه‌های آرایه‌های هر لایه با صدا بزرگ‌تر می‌شود (پیچ‌وتاب بیشتر)؛
     ۳) ذره‌ها (کلاس‌هایی که update دارند) با صدا گام بلندتری برمی‌دارند؛ لکه‌های Ab4A و موج‌های amplitude/frequency هم بازتر می‌شوند.
   نرم: با صدا زود بالا می‌رود (حملهٔ تند) و آرام برمی‌گردد (رهایی کند)؛ در سکوت همه‌چیز به حرکت اصلی اثر برمی‌گردد.
   فقط به صدا وابسته است، پس یک بذر با یک صدا همیشه همان فریم‌ها را می‌دهد. */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };
(function () {
  const sm = {};
  const c01 = (x) => (Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : 0);
  // حملهٔ تند، رهایی کند
  function ar(k, v, up, down) { const p = sm[k] || 0; return (sm[k] = p + (v - p) * (v > p ? up : down)); }
  const IM = (window.__IM = { blob: 1, bg: 1, line: 1, cov: 1, part: 0 });
  const off = { bg: 0, line: 0, cov: 0 }; // جابه‌جایی فاز هر لایه (به واحد t)
  let base = null, groups = null, wrapped = false;

  // آرایه‌های نقطهٔ هر لایه (با نامشان در کد اثر)
  const NAMES = 'JM1 JM10 JM102 JM103 JM10g JM10k JM11 JM112 JM113 JM11g JM11k JM12 JM122 JM123 JM12g JM12k JM13 JM13A JM13A2 JM13A3 JM13Ag JM13Ak JM14B JM14B2 JM14B3 JM14Bg JM14Bk JM15C JM15C2 JM15C3 JM15Cg JM15Ck JM16X JM16X2 JM16X3 JM16Xg JM16Xk JM2 JM22 JM23 JM4 JM42 JM43 JM5 JM52 JM53 JM6 JM62 JM63 JM7 JM72 JM73 JM8 JM82 JM83 JMxex1 JMxex10 JMxex102 JMxex103 JMxex10g JMxex10k JMxex11 JMxex112 JMxex113 JMxex11g JMxex11k JMxex12 JMxex122 JMxex123 JMxex12g JMxex12k JMxex13 JMxex13A JMxex13A2 JMxex13A3 JMxex13Ag JMxex13Ak JMxex14B JMxex14B2 JMxex14B3 JMxex14Bg JMxex14Bk JMxex15C JMxex15C2 JMxex15C3 JMxex15Cg JMxex15Ck JMxex16X JMxex16X2 JMxex16X3 JMxex16Xg JMxex16Xk JMxex2 JMxex22 JMxex23 JMxex5 JMxex52 JMxex53 JMxex6 JMxex62 JMxex63 JMxex7 JMxex72 JMxex73 JMxex8 JMxex82 JMxex83 MJ3 MJ32 MJ33 PD PD01 PD02 PD07 PD08 PD12 PD13 PD14 PD15 PD16 PD17 PD18 PD2 PD201 PD207 PD208 PD212 PD213 PD214 PD215 PD216 PD217 PD218 PD22 PD222 PD223 PD224 PD23 PD230 PD24 PD3 PD30 PD301 PD307 PD308 PD312 PD313 PD314 PD315 PD317 PD318 PD322 PD323 PD324 PD330 PDe PDe01 PDe07 PDe08 PDe17 PDe30 PDg PDg01 PDg08 PDg30 PDk PDk01 PDk07 PDk08 QP1 QP12 QP13 QP1e QP1g QP1k QR10 QR102 QR103 QR10e QR10g QR10k QR11 QR112 QR113 QR11e QR11g QR11k'.split(' ');
  function collect() {
    groups = { bg: [], line: [], cov: [] };
    for (const n of NAMES) {
      let a; try { a = (0, eval)(n); } catch (e) { continue; }
      if (!Array.isArray(a)) continue;
      // JM/MJ ← لایهٔ رویی Cov؛ QP/QR ← خط نازک QD؛ PD ← لایهٔ پس‌زمینه (drawQ2j)
      const g = /^(JM|MJ)/.test(n) ? 'cov' : /^(QP|QR)/.test(n) ? 'line' : 'bg';
      groups[g].push(a);
    }
  }
  function scaleGroup(list, k) {
    for (const a of list) for (const p of a) {
      if (!p || typeof p.size !== 'number') continue;
      if (p.__b === undefined) p.__b = p.size;
      p.size = p.__b * k;
    }
  }
  // هر لایه در طول اجرایش t را با فاز خودش می‌بیند؛ افزایش‌های خود لایه به t حفظ می‌شود
  function wrapLayer(name, key) {
    const fn = window[name]; if (typeof fn !== 'function' || fn.__im) return;
    const w = function () { const o = off[key]; t += o; try { return fn.apply(this, arguments); } finally { t -= o; } };
    w.__im = true; window[name] = w;
  }
  // ذره‌ها: پس از update اصلی، به اندازهٔ IM.part بار دیگر در جهت سرعتشان جلو می‌روند
  function wrapParticles() {
    for (const c of ['SandGrain', 'AirBubble', 'titoE', 'ritoD', 'Mover', 'Jlod', 'Particle', 'Threadd', 'Thread', 'Circled', 'Circle', 'Line', 'Parandeh', 'Galin']) {
      let C; try { C = (0, eval)(c); } catch (e) { continue; }
      const P = C && C.prototype; if (!P || typeof P.update !== 'function' || P.update.__im) continue;
      const u = P.update;
      P.update = function () {
        const r = u.apply(this, arguments), k = IM.part;
        if (k > 0.001) {
          const pos = this.position || this.pos, vel = this.velocity || this.vel;
          if (pos && vel && typeof pos.x === 'number' && typeof vel.x === 'number') {
            pos.x = Math.max(0, Math.min(width, pos.x + vel.x * k));
            pos.y = Math.max(0, Math.min(height, pos.y + vel.y * k));
          }
        }
        return r;
      };
      P.update.__im = true;
    }
  }

  window.VIZ_BEFORE = window.VIZ_BEFORE || [];
  window.VIZ_BEFORE.push(function () {
    try {
      if (!wrapped) { wrapped = true; wrapLayer('drawQ2j', 'bg'); wrapLayer('QD', 'line'); wrapLayer('Cov', 'cov'); wrapLayer('Cov2', 'cov'); wrapParticles(); }
      if (!groups) collect();
      if (base === null) base = { a: amplitude, f: frequency };
      const s = window.SONIC || {}, on = s.active ? 1 : 0, q = on * (1 - 0.85 * c01(s.silence)); // در سکوت آرام می‌شود
      // پس‌زمینه (موج‌های بزرگ PD): بم و بم‌میانه ← سرعت موج؛ بلندی کلی ← دامنهٔ موج
      const bgFlow = ar('bgF', q * c01(0.6 * (s.bass || 0) + 0.4 * (s.lowMid || 0)), 0.3, 0.04);
      const bgSwell = ar('bgS', q * c01(1.2 * (s.level || 0)), 0.35, 0.03);
      // خط نازک QD: زیر و درخشش صدا ← لرزش تند؛ تغییر طیف (flux) ← دامنه
      const lnFlow = ar('lnF', q * c01(0.5 * (s.high || 0) + 0.3 * (s.presence || 0) + 0.2 * (s.centroid || 0)), 0.4, 0.05);
      const lnSwell = ar('lnS', q * c01(1.5 * (s.flux || 0) + 0.3 * (s.air || 0)), 0.4, 0.04);
      // لایهٔ رویی Cov (منحنی‌های JM): میانه و صدای آوازی ← سرعت؛ شروع ضرب و ضربه ← دامنه
      const cvFlow = ar('cvF', q * c01(0.6 * (s.mid || 0) + 0.4 * (s.voiced || 0)), 0.25, 0.04);
      const cvSwell = ar('cvS', q * c01(0.7 * (s.onset || 0) + 0.5 * (s.beat ? 1 : 0) + 0.3 * (s.pulse || 0)), 0.5, 0.05);
      // ذره‌ها: زیر و شروع ضرب ← گام بلندتر
      IM.part = 2.2 * ar('pt', q * c01(0.6 * (s.high || 0) + 0.6 * (s.onset || 0)), 0.4, 0.05);
      // لکه‌های Ab4A و موج‌های amplitude/frequency: زیربم (sub + bass) ← پیچ‌وتاب؛ میانه ← سرعت
      const blob = ar('bl', q * c01(0.5 * (s.sub || 0) + 0.5 * (s.bass || 0) + 0.3 * (s.level || 0)), 0.3, 0.04);
      const flow = ar('fl', q * c01(0.6 * (s.mid || 0) + 0.4 * (s.centroid || 0)), 0.2, 0.04);
      IM.blob = 1 + 1.4 * blob;
      amplitude = base.a * (1 + 1.2 * blob);
      frequency = base.f * (1 + 2.2 * flow);
      // فاز هر لایه جلو می‌رود (در سکوت صفر = حرکت اصلی)
      off.bg += 26 * bgFlow; off.line += 34 * lnFlow; off.cov += 22 * cvFlow;
      // دامنهٔ هر لایه (در سکوت ۱ = شکل اصلی)
      scaleGroup(groups.bg, 1 + 0.8 * bgSwell);
      scaleGroup(groups.line, 1 + 1.0 * lnSwell);
      scaleGroup(groups.cov, 1 + 0.6 * cvSwell);
    } catch (e) {}
  });
})();
