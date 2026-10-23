/* ABX shim (prepended) — maps ABX token data onto the classic Art Blocks surface this script expects. */
var tokenData = (function () {
  var td = (window.abx && abx.tokenData) || window.abxTokenData || {};
  // Grokly: the seed comes from ?h=0x… (Generate); outside Grokly the ABX token data as before
  var qh = new URLSearchParams(location.search).get('h');
  return { hash: td.seed || (qh && /^0x[0-9a-f]{64}$/i.test(qh) ? qh : undefined), tokenId: td.tokenId };
})();
if (typeof window.$renderPreview !== 'function') {
  window.$renderPreview = function () { if (window.abx) { abx.traits(window.$features); abx.done(); } };
}
/* The garden in spring — Art Blocks script (p5.js 1.9.0). Persian calligraphy, the poetry of Hafez, generative art.
   Keys: I show/hide verse + translation · S save 8K PNG · G grain · Z camera · C small flowers · Space pause.
   Randomness: tokenData.hash only.
   v3: landscape. The canvas is locked to 3:2 (width:height) and letterboxed inside any viewport; the composition is laid out for the wide frame. */
window.$useRenderPreview = true;
let previewed = false;
const HASH = (typeof tokenData !== 'undefined' && tokenData.hash) || '0x' + '0'.repeat(64);
const SEED = (() => { let h = 2166136261; for (let i = 0; i < HASH.length; i++) h = Math.imul(h ^ HASH.charCodeAt(i), 16777619); return h >>> 0; })();
const QR = (() => { const x = HASH.slice(2); let a = parseInt(x.slice(32, 40), 16) | 0, b = parseInt(x.slice(40, 48), 16) | 0, c = parseInt(x.slice(48, 56), 16) | 0, d = parseInt(x.slice(56, 64), 16) | 0;
const n = () => { a |= 0; b |= 0; c |= 0; d |= 0; let t = (((a + b) | 0) + d) | 0; d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); c = (c + t) | 0; return (t >>> 0) / 4294967296; };
for (let i = 0; i < 16; i++) n(); return n; })();
const EN_STACK = '"EB Garamond", "Iowan Old Style", Georgia, "Times New Roman", serif';
/* EB Garamond (Georg Duffner, Octavio Pardo; https://github.com/octaviopardo/EBGaramond12) is embedded below as WOFF2.
   It is licensed under the SIL Open Font License, Version 1.1 (https://openfontlicense.org): free to use, embed and
   redistribute with this software; the font may not be sold on its own. The Persian (Nastaliq) font was removed:
   only the public-domain English translations of the verses are drawn. */
const FONT_DATA = { enI: "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", enR: "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" };
(() => { if (typeof FontFace === 'undefined' || !document.fonts) return;
  const buf = s => { const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; };
  [['EB Garamond', 'enI', { style: 'italic', weight: '100 900' }], ['EB Garamond', 'enR', { style: 'normal', weight: '100 900' }]].forEach(([n, k, d]) => {
    try { const f = new FontFace(n, buf(FONT_DATA[k]), d); document.fonts.add(f); f.load().catch(() => {}); } catch (e) {}
  }); })();
const HAFEZ_EN = {
'الا یا ایها الساقی ادر کأسا و ناولها': { g: 1, src: 'Bell', no: 'I', verified: true,
en: ['Arise, oh Cup-bearer, rise! and bring', 'To lips that are thirsting the bowl they praise,', 'For it seemed that love was an easy thing,', 'But my feet have fallen on difficult ways.'] },
'شب تاریک و بیم موج و گردابی چنین هایل': { g: 1, src: 'Bell', no: 'I', verified: true,
en: ['The waves run high, night is clouded with fears,', 'And eddying whirlpools clash and roar;', 'How shall my drowning voice strike their ears', 'Whose light-freighted vessels have reached the shore?'] },
'اگر آن ترک شیرازی به دست آرد دل ما را': { g: 3, src: 'Bell', no: 'V', verified: true,
en: ['Oh Turkish maid of Shiraz! in thy hand', 'If thou\u2019lt take my heart, for the mole on thy cheek', 'I would barter Bokhara and Samarkand.'] },
'صبا به لطف بگو آن غزال رعنا را': { g: 4, src: 'Clarke', verified: true,
en: ['O breeze! with softness speak to the beautiful fawn,', 'saying: \u201CThou hast given to us', 'desire for the mountain and the desert.\u201D'] },
'دل می‌رود ز دستم صاحب‌دلان خدا را': { g: 5, src: 'Clarke', ode: '6 (3)', verified: true,
en: ['For God\u2019s sake! O pious ones! forth from the hand, goeth my heart.', 'O the pain that the hidden mystery should be disclosed.'] },
'دوش دیدم که ملائک در میخانه زدند': { g: 184, src: 'Bell', no: 'XXXIV', verified: true,
en: ['Last night I dreamed that angels stood without', 'The tavern door, and knocked in vain, and wept;', 'They took the clay of Adam, and, methought,', 'Moulded a cup therewith while all men slept.'] },
'سال‌ها دل طلب جام جم از ما می‌کرد': { g: 143, src: 'Clarke', verified: true,
en: ['Search for the cup of Jamshid from me, years my heart made;', 'and for what it possessed, from a stranger, entreaty made.'] },
'بیا تا گل برافشانیم و می در ساغر اندازیم': { g: 374, src: 'Clarke', ode: '370 (379)', verified: true,
en: ['Come; so that the rose we may scatter, and, into the cup, the wine cast;', 'the roof of the sky we rend; and a new way, cast.'] },
'در ازل پرتو حسنت ز تجلی دم زد': { g: 152, src: 'Clarke', ode: '186 (178)', verified: true,
en: ['In eternity without beginning, of glory, the splendour-ray of Thy beauty boasted.', 'Revealed became love; and, upon all the world, fire dashed.'] },
'ما در پیاله عکس رخ یار دیده‌ایم': { g: 11, src: 'Bell', no: 'IX', verified: true,
en: ['Reflected within the goblet\u2019s ring', 'I see the glow of my Love\u2019s red cheek,', 'And scant of wit, ye who fail to seek', 'The pleasures that wine alone can bring!'] },
'من نه آن رندم که ترک شاهد و ساغر کنم': { g: 348, src: 'Clarke', ode: '438 (439)', verified: true,
en: ['Not that profligate am I that abandoning of the Beloved and of the cup I make:', 'An act like this, the muhtasib knoweth seldom do I make.'] },
'روز وصل دوستداران یاد باد': { g: 103, src: 'Bell', no: 'XXXV', verified: true,
en: ['Forget not when dear friend to friend returned,', 'Forget not days gone by, forget them not!'] },
'ساقی به نور باده برافروز جام ما': { g: 11, src: 'Bell', no: 'IX', verified: true,
en: ['Oh Cup-bearer, set my glass afire', 'With the light of wine! oh minstrel, sing:', 'The world fulfilleth my heart\u2019s desire!'] }
};
const HAFEZ_CREDIT = {
Bell: e => `Gertrude Bell, 1897 \u00B7 ${e.no} \u00B7 Ghazal ${e.g}`,
Clarke: e => `H. Wilberforce Clarke, 1891 \u00B7 Ghazal ${e.g}`,
literal: e => `Literal rendering \u00B7 Ghazal ${e.g}`
};
const TRAITS = (() => {
const FAMILIES = [
{ key: 'Meadow', fa: 'چمنزار', w: 34, pals: [
[0, 'Meadow I'], [1, 'Meadow II'], [2, 'Meadow III'], [3, 'Meadow IV'], [4, 'Meadow V'], [5, 'Meadow VI'], [6, 'Meadow VII'], [7, 'Meadow VIII']] },
{ key: 'Gabbeh', fa: 'گبه', w: 22, pals: [
[25, 'گبهٔ درخت، سبز اسپرک و نیل'], [26, 'گبهٔ قشقایی، زمینهٔ اسپرک'], [28, 'گبهٔ بختیاری، لاکی و سبز'], [29, 'گبهٔ پوست انار'], [34, 'گبهٔ ابرش سبز یشمی']] },
{ key: 'Jajim', fa: 'جاجیم', w: 18, pals: [
[35, 'جاجیم شاهسون، آذربایجان'], [36, 'جاجیم قشقایی، فارس'], [37, 'جاجیم کردی'], [40, 'جاجیم مغان، لاکی و سبز تند'], [42, 'جاجیم لوزی تودرتو'], [43, 'جاجیم ملیله‌دار'], [45, 'جاجیم روستایی، رنگ شاد']] },
{ key: 'Gelim', fa: 'گلیم', w: 16, pals: [
[48, 'گلیم سنه، لاکی روی سرمه‌ای'], [49, 'گلیم قشقایی، ستارهٔ هشت‌پر'], [53, 'ورنی شاهسون'], [55, 'سوزنی قشقایی'], [56, 'گلیم حصیری و لادی'], [58, 'گلیم محرمات'], [60, 'گلیم خرچنگی']] },
{ key: 'Anticyclone', fa: 'آنتی‌سیکلون', w: 10, pals: [
[9, 'Anticyclone o1'], [14, 'Anticyclone o6'], [16, 'Anticyclone o8'], [17, 'Anticyclone o9'], [19, 'Anticyclone o11']] }
];
const DANDELIONS = [{ key: 'Solitary', fa: 'تک', n: 1, w: 70 }, { key: 'Trio', fa: 'سه‌تایی', n: 3, w: 30 }];
const DISTANCE = [
{ key: 'Wide', fa: 'دور', w: 40, lo: 1, hi: 1 },
{ key: 'Near', fa: 'نزدیک', w: 30, lo: 1.5, hi: 3 },
{ key: 'Close', fa: 'خیلی نزدیک', w: 20, lo: 3, hi: 6 },
{ key: 'Intimate', fa: 'رودررو', w: 10, lo: 6, hi: 10 }
];
const WIND = [
{ key: 'Westerly', fa: 'باد باختری', w: 30, ang: 0 },
{ key: 'Easterly', fa: 'باد خاوری', w: 30, ang: Math.PI },
{ key: 'Falling Air', fa: 'باد فرودین', w: 25, ang: Math.PI / 2 },
{ key: 'Rising Air', fa: 'باد فرازین', w: 15, ang: -Math.PI / 2 }
];
const VERSE_W = [8, 8, 9, 8, 8, 5, 7, 7, 6, 8, 8, 9, 9];
function rng(seed) {
let s = String('anticyclone-meadow:' + seed), a = 1779033703, b = 3144134277, c = 1013904242, d = 2773480762;
for (let i = 0; i < s.length; i++) { const k = s.charCodeAt(i); a = b ^ Math.imul(a ^ k, 597399067); b = c ^ Math.imul(b ^ k, 2869860233); c = d ^ Math.imul(c ^ k, 951274213); d = a ^ Math.imul(d ^ k, 2716044179); }
const r = () => { a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0; return (t >>> 0) / 4294967296; };
for (let i = 0; i < 12; i++) r();
return r;
}
const pickW = (r, list, wf = x => x.w) => { const s = list.reduce((t, x) => t + wf(x), 0); let v = r() * s; for (const x of list) { v -= wf(x); if (v <= 0) return x; } return list[list.length - 1]; };
function derive(seed) {
const r = rng(seed);
const fam = pickW(r, FAMILIES), pal = fam.pals[Math.floor(r() * fam.pals.length)];
const dan = pickW(r, DANDELIONS);
const dist = pickW(r, DISTANCE), zoom = dist.lo + (dist.hi - dist.lo) * r();
const wind = pickW(r, WIND), windAngle = wind.ang + (r() - 0.5) * 1.1;
const vpick = pickW(r, VERSE_W.map((w, i) => ({ w, i })));
const prob = (fam.w / 100) * (1 / fam.pals.length) * (dan.w / 100) * (dist.w / 100) * (wind.w / 100) * (VERSE_W[vpick.i] / 100);
return {
family: fam.key, familyFa: fam.fa, palette: pal[1], palIndex: pal[0],
dandelions: dan.key, count: dan.n,
distance: dist.key, zoom,
wind: wind.key, windAngle,
verseIndex: vpick.i, prob
};
}
return { FAMILIES, DANDELIONS, DISTANCE, WIND, VERSE_W, derive };
})();
const QASEDAK = (() => {
const VERSES = [
['الا یا ایها الساقی ادر کأسا و ناولها', 'که عشق آسان نمود اول ولی افتاد مشکل‌ها'],
['شب تاریک و بیم موج و گردابی چنین هایل', 'کجا دانند حال ما سبکباران ساحل‌ها'],
['اگر آن ترک شیرازی به دست آرد دل ما را', 'به خال هندویش بخشم سمرقند و بخارا را'],
['صبا به لطف بگو آن غزال رعنا را', 'که سر به کوه و بیابان تو داده‌ای ما را'],
['دل می‌رود ز دستم صاحب‌دلان خدا را', 'دردا که راز پنهان خواهد شد آشکارا'],
['دوش دیدم که ملائک در میخانه زدند', 'گل آدم بسرشتند و به پیمانه زدند'],
['سال‌ها دل طلب جام جم از ما می‌کرد', 'وآنچه خود داشت ز بیگانه تمنا می‌کرد'],
['بیا تا گل برافشانیم و می در ساغر اندازیم', 'فلک را سقف بشکافیم و طرحی نو دراندازیم'],
['در ازل پرتو حسنت ز تجلی دم زد', 'عشق پیدا شد و آتش به همه عالم زد'],
['ما در پیاله عکس رخ یار دیده‌ایم', 'ای بی‌خبر ز لذت شرب مدام ما'],
['من نه آن رندم که ترک شاهد و ساغر کنم', 'محتسب داند که من این کارها کمتر کنم'],
['روز وصل دوستداران یاد باد', 'یاد باد آن روزگاران یاد باد'],
['ساقی به نور باده برافروز جام ما', 'مطرب بگو که کار جهان شد به کام ما']
];
const FONT = 'EB Garamond', SHEAR = 0.16, FS = EN_STACK, WT = 500; // the words are drawn in English (EB Garamond); VERSES stay only as keys into HAFEZ_EN
if (typeof document !== 'undefined' && document.fonts) document.fonts.load(`${WT} 40px "${FONT}"`, 'Love garden').catch(() => {});
// once the font is there it stays: remember it (document.fonts.check on every frame cost up to ~25 ms on a slow machine)
let FONT_SEEN = false;
const fontReady = () => FONT_SEEN || (FONT_SEEN = !!(typeof document !== 'undefined' && document.fonts && document.fonts.check(`${WT} 20px "${FONT}"`)));
// the English translation of a verse, as two "hemistich" lines (for the two great circles) and its words (for the strands)
function verseEn(V) {
const e = (typeof HAFEZ_EN !== 'undefined' && HAFEZ_EN[V[0]]) || { en: ['love', 'garden'] }, en = e.en.length ? e.en : ['love', 'garden'];
const lines = en.length >= 2 ? [en[0], en[1]] : [en[0], en[0]];
const words = en.join(' ').split(/\s+/).map(w => w.replace(/^[^A-Za-z\u00C0-\u024F]+|[^A-Za-z\u00C0-\u024F\u2019']+$/g, '')).filter(w => w.length > 1);
return { lines: lines.map(l => l.replace(/[,;:]$/, '')), words: words.length ? words : ['love'] };
}
function hashSeed(s) {
s = String(s); let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
for (let i = 0; i < s.length; i++) { const k = s.charCodeAt(i); h1 = h2 ^ Math.imul(h1 ^ k, 597399067); h2 = h3 ^ Math.imul(h2 ^ k, 2869860233); h3 = h4 ^ Math.imul(h3 ^ k, 951274213); h4 = h1 ^ Math.imul(h4 ^ k, 2716044179); }
return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}
function RNG(seed) {
let [a, b, c, d] = hashSeed(seed);
const next = () => { a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0; return (t >>> 0) / 4294967296; };
for (let i = 0; i < 12; i++) next();
return { random: next, u: (lo = 0, hi = 1) => lo + (hi - lo) * next(), i: (lo, hi) => Math.floor(lo + (hi - lo) * next()), n: (mu = 0, sd = 1) => mu + sd * Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next()), sign: () => (next() < 0.5 ? -1 : 1), pick: xs => xs[Math.floor(next() * xs.length)], perm: n => { const p = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; } return p; }, choiceW: w => { const s = w.reduce((x, y) => x + y, 0); let v = next() * s; for (let i = 0; i < w.length; i++) { v -= w[i]; if (v <= 0) return i; } return w.length - 1; } };
}
const nrm = a => { const l = Math.hypot(a[0], a[1], a[2]); return a.map(v => v / l); };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const basis = a => { const t = Math.abs(a[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]; const u = nrm(cross(a, t)); return [u, cross(a, u)]; };
const css = c => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
const xf = (ctx, F, x, y) => { const c = F.cam, p = (c && c.pd) || 1; c ? ctx.setTransform(c.z * p, 0, 0, c.z * p, (c.z * x + c.ex) * p, (c.z * y + c.ey) * p) : ctx.setTransform(1, 0, 0, 1, x, y); };
function buildHead(rng, cx, cy, R, o) {
const V = rng.pick(o.verses), ink = o.ink, small = R < 30;
const SS = Math.max(small ? 8 : 4, o.ss || 0), pad = R * 0.12, px = Math.ceil((R + pad) * 2 * SS);
const cv = document.createElement('canvas'); cv.width = cv.height = px;
const g = cv.getContext('2d'); g.setTransform(SS, 0, 0, SS, px / 2, px / 2);
g.direction = 'ltr'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
g.font = `${WT} 100px ${FS}`;
const mm = g.measureText('Love garden'), emH = Math.max(40, mm.actualBoundingBoxAscent + mm.actualBoundingBoxDescent), sizeFor = h => 0.9 * 100 * h / emH; // Latin words a little smaller and lighter than the Nastaliq was, so the sphere keeps its airy look
const VE = verseEn(V), words = VE.words;
const axis = () => { const z = rng.u(-0.92, 0.92), t = rng.u(0, 6.2832), r = Math.sqrt(1 - z * z); return [r * Math.cos(t), r * Math.sin(t), z]; };
const levels = small ? [R / 4.5, R / 3.6, R / 3] : [R / 16, R / 10, R / 6.2], strands = [], wordsAt = [];
for (let k = 0, K = small ? rng.i(2, 4) : rng.i(16, 22); k < K; k++) {
const a = axis(), [u, v] = basis(a), n = small ? 1 : rng.i(3, 6), h = levels[rng.choiceW([8, 5, 3])], dk = rng.u(0, 1);
const Rs = R - 1.1 * h - (3 + dk * 20) * R / 400, sp = h * rng.u(0.95, 1.2), off = rng.u(-0.3, 0.3) * Rs;
for (let i = 0; i < n; i++) { const dd = off + (i - (n - 1) / 2) * sp; if (Math.abs(dd) > 0.85 * Rs) continue; strands.push({ a, u, v, dd, Rs, h }); }
}
const beta = rng.u(0.25, 0.45) * rng.sign(), av = nrm([Math.sin(rng.u(-0.14, 0.14)), Math.cos(beta), Math.sin(beta)]), [uv, vv] = basis(av);
const hv = small ? R / 2.5 : R / 6.5, Rv = R - 0.95 * hv - R / 100;
[[VE.lines[0], -0.8 * hv], [VE.lines[1], 0.8 * hv]].forEach(([line, dd]) => strands.push({ a: av, u: uv, v: vv, dd: dd * Math.sign(av[1] || 1), Rs: Rv + 1e3, h: hv, line }));
strands.sort((p, q) => p.Rs - q.Rs);
for (const st of strands) {
const Rs = st.line ? Rv : st.Rs, r = Math.sqrt(Math.max(1, Rs * Rs - st.dd * st.dd)), c = st.a.map(x => x * st.dd);
const P = th => [0, 1, 2].map(i => c[i] + r * (Math.cos(th) * st.u[i] + Math.sin(th) * st.v[i]));
const thf = Math.atan2(st.v[2], st.u[2]), tx = -Math.sin(thf) * st.u[0] + Math.cos(thf) * st.v[0], dir = tx >= 0 ? 1 : -1;
const size = sizeFor(st.h); g.font = `${WT} ${size}px ${FS}`;
const gap = size * 0.32, items = []; // word space for English
if (st.line) {
let lw = g.measureText(st.line).width, sz = size; if (lw > 1.75 * r) { sz *= 1.75 * r / lw; g.font = `${WT} ${sz}px ${FS}`; lw = g.measureText(st.line).width; }
items.push({ t: st.line, tau: 0, sz });
let tau = lw / 2 + gap, k = 0; const sh = rng.perm(words.length);
while (tau < Math.PI * r * 0.97) { const t = words[sh[k++ % words.length]], w = g.measureText(t).width; items.push({ t, tau: tau + w / 2, sz }); items.push({ t, tau: -(tau + w / 2), sz }); tau += w + gap; }
} else {
const sh = rng.perm(words.length); let tau = -Math.PI * r * 0.97 + rng.u(0, 40), k = rng.i(0, words.length);
while (tau < Math.PI * r * 0.97) { const t = words[sh[k++ % words.length]], w = g.measureText(t).width; items.push({ t, tau: tau + w / 2, sz: size }); tau += w + gap; }
}
for (const it of items) {
const th = thf + dir * it.tau / r, p = P(th); if (p[2] < 0) continue;
const q = P(th + dir * 0.01), ang = Math.atan2(q[1] - p[1], q[0] - p[0]), depth = 0.62 + 0.38 * Math.min(1, p[2] / R), scl = 0.55 + 0.45 * Math.max(0, p[2] / Rs);
const w = { t: it.t, sz: it.sz, x: p[0], y: p[1], ang, scl, a: 0.4 + 0.6 * depth, on: true, regrow: 0 };
wordXf(g, w, 'draw', ink, st.line ? 0.2 : 0.12);
wordsAt.push(w);
}
}
g.globalCompositeOperation = 'destination-in'; g.fillStyle = '#000'; g.beginPath(); g.arc(0, 0, R + pad * 0.3, 0, 7); g.fill();
g.globalCompositeOperation = 'source-over';
return { x: cx, y: cy, R, r: R + pad, cv, g, words: wordsAt, flying: [], dx: 0, dy: 0, vx: 0, vy: 0, verse: V };
}
function wordXf(g, w, mode, ink, halo) {
g.save(); g.translate(w.x, w.y); g.rotate(w.ang); g.scale(w.scl, w.scl); g.transform(1, 0, -SHEAR, 1, 0, 0);
g.font = `${WT} ${w.sz}px ${FS}`; g.direction = 'ltr'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
if (mode === 'erase') { g.globalCompositeOperation = 'destination-out'; g.lineWidth = w.sz * 0.3; g.strokeText(w.t, 0, 0); g.fillText(w.t, 0, 0); }
else {
g.globalCompositeOperation = 'destination-out'; g.lineWidth = w.sz * (halo || 0.12); g.strokeText(w.t, 0, 0);
g.globalCompositeOperation = 'source-over'; g.globalAlpha = w.a; g.fillStyle = css(ink); g.fillText(w.t, 0, 0);
}
g.restore();
}
function build(o = {}) {
const rng = RNG(o.seed ?? 1), w = o.w, h = o.h, R0 = o.R || Math.min(w, h) * 0.06, n = Math.max(1, Math.min(5, o.count ?? rng.i(1, 6)));
const opt = { verses: o.verses || VERSES, ink: o.ink || [255, 255, 255], ss: o.ss };
const used = [], heads = [];
for (let d = 0; d < n; d++) {
const Rd = d === 0 ? R0 : R0 / rng.u(2, 3);
let p;
if (o.positions && o.positions[d]) p = o.positions[d];
else { let best = null; for (let t = 0; t < 60; t++) { const x = rng.u(Rd * 3, w - Rd * 3), y = rng.u(Rd * 3, h - Rd * 9); const dm = used.length ? Math.min(...used.map(q => Math.hypot(q[0] - x, q[1] - y))) : 1e9; if (!best || dm > best[2]) best = [x, y, dm]; } p = best; }
used.push(p);
const free = opt.verses.filter(v => !heads.some(H => H.verse === v));
heads.push(buildHead(RNG((o.seed ?? 1) + ':qasedak:' + d), p[0], p[1], Rd, { ...opt, verses: d === 0 && o.verse0 ? [o.verse0] : (free.length ? free : opt.verses) }));
}
return { heads, w, h, ink: opt.ink, stem: o.stem || 'rgba(214,220,196,0.85)', fontOK: fontReady(), lastT: 0, stemK: o.stemK, topFrac: o.topFrac, stemDark: o.stemDark, cam: o.cam || null };
}
function step(F, wind, t) {
const dt = Math.min(0.1, Math.max(0, t - (F.lastT || t))); F.lastT = t;
for (const B of F.heads) {
const [wx, wy] = wind(B.x, B.y) || [0, 0];
const om = 2.6, z = 0.3;
B.vx += ((wx - B.dx) * om * om - 2 * z * om * B.vx) * dt; B.vy += ((wy - B.dy) * om * om - 2 * z * om * B.vy) * dt;
B.dx += B.vx * dt; B.dy += B.vy * dt;
seeds(F, B, wx, wy, dt, t);
}
}
function headPos(B) { const bend = B.R * 0.35; return [B.x + B.dx * bend, B.y + B.dy * bend]; }
function seeds(F, B, dx, dy, dt, t) {
const U = Math.hypot(dx, dy), attached = B.words.filter(w => w.on && w.regrow <= t);
if (U > 0.3 && attached.length) {
let n = QR() < (U - 0.3) * 4 * dt ? 1 : 0; if (U > 1.2 && QR() < dt * 3) n += 1;
for (; n > 0; n--) {
const ux = dx / (U || 1), uy = dy / (U || 1), cand = attached.filter(w => (w.x * ux + w.y * uy) < 0);
const pool = (cand.length && QR() < 0.75) ? cand : attached, w = pool[Math.floor(QR() * pool.length)];
if (!w || !w.on) continue;
w.on = false; wordXf(B.g, w, 'erase');
const [hx, hy] = headPos(B);
B.flying.push({ w, x: hx + w.x, y: hy + w.y, vx: dx * 20, vy: dy * 20 - 6, rot: w.ang, spin: (QR() - 0.5) * 0.6, ph: QR() * 6.28, t: 0, a: 1 });
}
}
for (let i = B.flying.length - 1; i >= 0; i--) {
const f = B.flying[i]; f.t += dt;
const gust = Math.sin(t * 1.7 + f.ph) * 0.5 + Math.sin(t * 3.3 + f.ph * 2.1) * 0.3;
const twx = dx * 60 + gust * 8, twy = dy * 60 + 6 - Math.abs(gust) * 14 + Math.sin(t * 0.9 + f.ph) * 6;
f.vx += (twx - f.vx) * dt * 3; f.vy += (twy - f.vy) * dt * 3;
f.x += f.vx * dt; f.y += f.vy * dt; f.rot += (f.spin + gust * 0.4) * dt;
const far = Math.hypot(f.x - B.x, f.y - B.y) / Math.max(F.w, F.h);
f.a = Math.max(0, 1 - far * 1.1) * Math.min(1, f.t * 3);
const m = 60;
if (f.x < -m || f.x > F.w + m || f.y < -m || f.y > F.h + m || f.a <= 0.02) { f.w.regrow = t + 30 + QR() * 30; B.flying.splice(i, 1); }
}
for (const w of B.words) if (!w.on && w.regrow && w.regrow <= t && !B.flying.some(f => f.w === w)) { w.on = true; w.regrow = 0; wordXf(B.g, w, 'draw', F.ink); }
}
function stem(ctx, F, B, top) {
const [hx, hy] = headPos(B), bend = B.R * 0.35, L = Math.min(B.R * (F.stemK || 7), F.h - 6 - B.y), rx = B.x, ry = B.y + L;
ctx.save(); xf(ctx, F, 0, 0);
let ss = F.stem;
if (F.stemDark) {
ss = ctx.createLinearGradient(rx, ry, hx, hy);
ss.addColorStop(0, F.stemDark); ss.addColorStop(0.3, F.stemDark); ss.addColorStop(0.42, F.stem); ss.addColorStop(1, F.stem);
}
ctx.strokeStyle = ss; ctx.lineWidth = Math.max(1, B.R * 0.07); ctx.lineCap = 'round';
const cx = rx + B.dx * bend * 0.9, cy = ry - L * 0.55 + B.dy * bend * 0.4;
if (top && F.topFrac != null) {
const s = 1 - F.topFrac, ax = rx + (cx - rx) * s, ay = ry + (cy - ry) * s, bx = cx + (hx - cx) * s, by = cy + (hy - cy) * s;
ctx.beginPath(); ctx.moveTo(ax + (bx - ax) * s, ay + (by - ay) * s); ctx.quadraticCurveTo(bx, by, hx, hy); ctx.stroke();
} else {
if (top) { const u = L / 10; ctx.setLineDash([u * 1.6, u * 1.1, u * 0.7, u * 1.8, u * 1.2, u * 0.9, u * 2.0, u * 0.7]); ctx.lineDashOffset = -(B.x % 37); }
ctx.beginPath(); ctx.moveTo(rx, ry); ctx.quadraticCurveTo(cx, cy, hx, hy); ctx.stroke();
}
ctx.setLineDash([]);
ctx.fillStyle = F.stem; ctx.beginPath(); ctx.arc(hx, hy, Math.max(1.2, B.R * 0.12), 0, 7); ctx.fill();
ctx.restore();
}
function drawStems(ctx, F, alpha = 1) { ctx.save(); ctx.globalAlpha = alpha; for (const B of F.heads) stem(ctx, F, B, false); ctx.restore(); }
function draw(ctx, F, alpha = 1) {
ctx.save(); ctx.globalAlpha = alpha;
for (const B of F.heads) {
stem(ctx, F, B, true);
const [hx, hy] = headPos(B);
xf(ctx, F, hx, hy);
ctx.drawImage(B.cv, -B.r, -B.r, B.r * 2, B.r * 2);
ctx.beginPath(); ctx.arc(0, 0, B.R * 1.02, 0, 7); ctx.save(); ctx.clip();
const hi = ctx.createRadialGradient(-0.4 * B.R, -0.45 * B.R, 0, -0.4 * B.R, -0.45 * B.R, B.R * 0.55);
hi.addColorStop(0, 'rgba(255,255,255,0.28)'); hi.addColorStop(1, 'rgba(255,255,255,0)');
ctx.fillStyle = hi; ctx.fillRect(-B.R * 1.1, -B.R * 1.1, B.R * 2.2, B.R * 2.2); ctx.restore();
xf(ctx, F, 0, 0);
for (const f of B.flying) {
ctx.save(); ctx.translate(f.x, f.y); ctx.globalAlpha = alpha * f.a;
ctx.rotate(f.rot - f.w.ang + Math.PI / 2 + Math.sin((F.lastT || 0) * 2 + f.ph) * 0.18);
const L = f.w.sz * 1.1 * f.w.scl;
ctx.strokeStyle = css(F.ink); ctx.globalAlpha *= 0.75; ctx.lineWidth = Math.max(0.5, f.w.sz * 0.04); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, L); ctx.stroke(); ctx.globalAlpha = alpha * f.a;
ctx.fillStyle = css(F.ink); ctx.beginPath(); ctx.arc(0, L, Math.max(0.6, f.w.sz * 0.07), 0, 7); ctx.fill();
ctx.rotate(-Math.PI / 2); ctx.scale(f.w.scl, f.w.scl); ctx.transform(1, 0, -SHEAR, 1, 0, 0);
ctx.font = `${WT} ${f.w.sz}px ${FS}`; ctx.direction = 'ltr'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
ctx.fillText(f.w.t, 0, 0); ctx.restore();
}
}
ctx.restore();
}
return { VERSES, RNG, build, step, draw, drawStems, headPos, fontReady };
})();
const traitEn = en => { const all = en.join(' '); if (all.length <= 150) return all; let t = en[0]; for (let i = 1; i < en.length && (t + ' ' + en[i]).length <= 148; i++) t += ' ' + en[i]; return t + ' \u2026'; };
const T0 = TRAITS.derive(HASH), V0 = QASEDAK.VERSES[T0.verseIndex], E0 = HAFEZ_EN[V0[0]];
window.$features = { Family: T0.family, Palette: T0.palette, Dandelions: T0.dandelions, Distance: T0.distance, Wind: T0.wind,
Verse: traitEn(E0.en), Translation: E0.src === 'literal' ? 'Literal rendering' : (E0.src === 'Bell' ? 'Gertrude Bell (1897)' : 'H. Wilberforce Clarke (1891)'), Ghazal: String(E0.g) };
const COLLECTION = {
name: "The garden in spring",
editions: 250,
description: "This collection brings together Persian calligraphy, the poetry of Hafez, and generative art.\n\nHafez was a fourteenth-century poet from Shiraz, Iran, whose verses continue to shape Persian culture. Writing about love, longing, wine, beauty, and spiritual freedom, he transformed everyday images into gateways to deeper questions about being human.\n\nEach frame presents a verse from Hafez alongside an original visual composition. The flowing forms of Persian calligraphy meet the evolving possibilities of generative art, creating images that exist between language and abstraction, tradition and technology.\n\nFor viewers unfamiliar with Hafez, these works offer an invitation: to encounter his poetry not only through translation, but also through rhythm, form, color, and feeling.\n\nKeys: press I to show or hide the verse and its English translation. Press S to download the current frame as a high-resolution PNG (8K, 3:2, at least 7680 px wide)."
};
window.$collection = COLLECTION;
const CFG = {
aspect: 3 / 2,
windSpeed: 1.0,
bg: [18, 28, 22],
};
let seed = 42;
const SC = () => Math.sqrt(width * height / (506 * 900));
const Q_R = () => 506 * 0.11 * SC();
let palette = null;
let staticLayer = null;
let cylinders = [];
let poppies = [];
let chamomiles = [];
let showChamomile = true;
let windTime = 0;
let paused = false;
let resizeTimer = null;
const $fps = { textContent: '' };
function hashString(str) {
let h = 2166136261;
for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
return h >>> 0;
}
const PALETTES = [
[[58, 90, 64], [88, 129, 87], [163, 177, 138], [218, 215, 205], [40, 75, 50]],
[[45, 100, 55], [120, 160, 70], [190, 180, 90], [90, 70, 40], [60, 130, 75]],
[[30, 80, 40], [100, 140, 60], [180, 200, 100], [220, 210, 180], [50, 90, 65]],
[[70, 120, 60], [140, 170, 90], [230, 200, 120], [40, 70, 50], [180, 60, 50]],
[[50, 110, 60], [110, 150, 80], [200, 190, 110], [80, 60, 35], [55, 95, 70]],
[[40, 90, 50], [95, 135, 70], [170, 160, 85], [220, 200, 160], [45, 80, 55]],
[[65, 125, 70], [130, 165, 95], [210, 195, 130], [100, 80, 45], [50, 100, 60]],
[[35, 85, 45], [85, 130, 65], [160, 150, 80], [230, 220, 190], [55, 95, 55]],
];
const DYE = {
shiri: [236, 226, 204], krem: [228, 214, 186], nokhodi: [214, 190, 150], shotori: [178, 134, 90], gerdu: [112, 74, 48],
sukhte: [76, 50, 36], meshki: [42, 34, 32], khakestari: [152, 145, 136],
ronas: [180, 60, 44], ronasTire: [132, 38, 36], goli: [204, 98, 90], narenji: [216, 114, 54], holui: [232, 172, 124], golbehi: [226, 164, 152],
laki: [168, 30, 52], lakiTond: [188, 32, 42], esparak: [226, 184, 68], khardali: [194, 150, 58], anar: [170, 150, 94],
sabz: [72, 130, 82], chamani: [96, 152, 72], yashmi: [62, 132, 118], zeytuni: [120, 122, 64],
asemani: [112, 156, 200], nili: [48, 86, 152], sormei: [32, 44, 90], firuze: [58, 150, 160], badenjani: [88, 40, 68], arghavani: [134, 52, 96]
};
const TEXTILE = [
'ronas shiri nokhodi sormei esparak', 'shiri shotori gerdu khakestari goli', 'shiri nokhodi shotori gerdu meshki', 'nili asemani shiri ronas sormei',
'sabz chamani esparak shiri laki', 'esparak narenji gerdu shiri zeytuni', 'shotori narenji shiri sormei goli', 'laki yashmi khardali krem sormei',
'anar gerdu nokhodi ronas zeytuni', 'badenjani arghavani golbehi shiri khardali', 'narenji holui ronas sukhte shiri', 'khakestari shiri meshki ronas asemani',
'nokhodi gerdu laki nili esparak', 'yashmi sabz khardali krem ronasTire',
'laki chamani esparak sormei shiri', 'ronas narenji khardali yashmi shiri meshki', 'laki sormei krem sabz arghavani', 'lakiTond krem meshki nili',
'ronas shiri gerdu nili esparak', 'lakiTond chamani narenji krem sormei', 'narenji firuze shiri sormei khardali', 'arghavani yashmi esparak shiri laki',
'goli zeytuni nokhodi sukhte asemani', 'meshki shiri laki esparak', 'narenji esparak chamani golbehi sormei', 'sormei nili laki krem firuze',
'krem nokhodi gerdu ronas sukhte',
'laki sormei shiri yashmi khardali goli', 'ronas nili shiri narenji sabz', 'gerdu ronas shiri meshki khardali', 'ronasTire badenjani sormei shotori shiri',
'gerdu arghavani sormei lakiTond nokhodi', 'laki sormei esparak sabz shiri firuze', 'laki shiri sormei esparak', 'narenji sabz sormei shiri laki esparak',
'nokhodi gerdu ronas zeytuni krem', 'nili asemani sormei shiri', 'ronas shiri sormei esparak sabz gerdu', 'laki gerdu krem nokhodi sormei',
'narenji shiri sormei yashmi esparak'
].map(s => s.split(' ').map(k => DYE[k]));
const ORIGINALS = [
[[190, 95, 55], [45, 65, 75], [210, 125, 85], [35, 45, 60]], [[170, 115, 65], [55, 85, 75], [35, 55, 65], [150, 105, 75]],
[[210, 145, 75], [65, 75, 85], [45, 55, 60], [185, 105, 65]], [[90, 150, 190], [210, 105, 65], [55, 65, 80], [165, 85, 75]],
[[200, 125, 75], [75, 95, 105], [45, 50, 55], [155, 95, 70]], [[25, 35, 90], [30, 140, 160], [230, 120, 140], [245, 225, 200]],
[[20, 70, 160], [210, 50, 60], [255, 160, 100], [40, 140, 90]], [[35, 50, 110], [255, 145, 110], [40, 170, 175], [240, 215, 185]],
[[50, 150, 100], [220, 100, 130], [25, 80, 170], [200, 60, 70]], [[45, 110, 145], [55, 145, 105], [195, 55, 48], [248, 240, 220]],
[[35, 65, 85], [165, 85, 55], [220, 155, 65], [245, 235, 210]], [[60, 150, 115], [190, 50, 45], [50, 100, 140], [250, 242, 225]],
[[40, 90, 120], [200, 70, 50], [180, 140, 70], [240, 230, 205]]
];
const isGreen = c => c[1] >= c[0] && c[1] > c[2] + 8 && c[1] - Math.min(c[0], c[2]) > 20;
const ALL_PALETTES = PALETTES.concat(ORIGINALS, TEXTILE).filter(p => p.some(isGreen));
const ALL_SRC = PALETTES.concat(ORIGINALS, TEXTILE);
let T = null;
const lum = c => 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2];
let sunDir = 0;
function makeLight() {
const warm = random(0.35, 1);
const I = random(0.9, 1.1);
const sky = random(-0.03, 0.03);
return {
dir: sunDir + random(-1.0, 1.0),
sun: [(0.60 + 0.08 * warm) * I, (0.59 + 0.01 * warm) * I, (0.60 - 0.14 * warm) * I],
amb: [0.36 + sky, 0.42 + sky * 0.5, 0.54 - sky],
};
}
function shade(col, k, L) {
return [
Math.min(255, col[0] * (L.amb[0] + L.sun[0] * k)),
Math.min(255, col[1] * (L.amb[1] + L.sun[1] * k)),
Math.min(255, col[2] * (L.amb[2] + L.sun[2] * k)),
];
}
function deriveParams() {
const shrink = random(2, 7);
return {
numCenters: 2 + floor(random(2)),
curlStrength: 0.5 + random(1.0),
noiseScale: 0.004 + random(0.003),
noiseAmp: 0.4 + random(0.5),
baseAngle: random(TWO_PI),
numPaths: 4 + floor(random(6)),
pathSteps: 6 + floor(random(5)),
cylinderDensity: 0.35 + random(0.25),
cylLengthMin: 10 / shrink, cylLengthMax: 28 / shrink,
cylThickMin: 3.5 / shrink, cylThickMax: 11 / shrink,
};
}
function sampleField(x, y, p, localSeed, centers) {
const n = noise(x * p.noiseScale, y * p.noiseScale, localSeed * 0.00005);
let vx = Math.cos(p.baseAngle) + Math.cos(n * TWO_PI) * p.noiseAmp;
let vy = Math.sin(p.baseAngle) + Math.sin(n * TWO_PI) * p.noiseAmp;
for (const c of centers) {
const dx = x - c.x, dy = y - c.y;
const dist = Math.sqrt(dx * dx + dy * dy) + 1;
const rot = c.strength * Math.exp(-dist / Math.max(c.radius, 3));
vx += -dy * rot / dist;
vy += dx * rot / dist;
}
const mag = Math.hypot(vx, vy) || 1;
return [vx / mag, vy / mag];
}
function generateCell(cell, g, drawOnly) {
const localSeed = (seed + floor(cell.noiseOffset)) >>> 0;
randomSeed(localSeed);
noiseSeed(localSeed);
const p = deriveParams();
const centers = [];
for (let i = 0; i < p.numCenters; i++) {
centers.push({
x: random(cell.w * 0.05, cell.w * 0.95),
y: random(cell.h * 0.05, cell.h * 0.95),
strength: random(0.45, 1.2) * p.curlStrength,
radius: random(15, Math.max(16, cell.w * 0.22)),
});
}
const L = makeLight();
for (let i = 0; i < p.numPaths; i++) {
let x = random(-cell.w * 0.1, cell.w * 1.1);
let y = random(-cell.h * 0.1, cell.h * 1.1);
const pts = [[x, y]];
const step = random(1.4, 2.0);
for (let s = 0; s < p.pathSteps; s++) {
const v = sampleField(x, y, p, localSeed, centers);
x += v[0] * step; y += v[1] * step;
pts.push([x, y]);
}
const col = palette[floor(random(palette.length))];
const width = random(0.5, 1.3);
const last = pts[pts.length - 1];
const pa = Math.atan2(last[1] - pts[0][1], last[0] - pts[0][0]);
const lit = shade(col, 0.5 + 0.5 * Math.cos(pa - L.dir), L);
g.stroke(lit[0], lit[1], lit[2], 140);
g.strokeWeight(Math.max(0.3, width * 0.22));
g.beginShape();
for (const pt of pts) g.vertex(cell.x + pt[0], cell.y + pt[1]);
g.endShape();
for (let k = 1; k < pts.length; k++) {
if (random() > p.cylinderDensity) continue;
const a = pts[k - 1], b = pts[k];
const bend = random(-0.55, 0.55);
const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + random(-0.4, 0.4);
(drawOnly ? [] : cylinders).push({
x: cell.x + (a[0] + b[0]) * 0.5,
y: cell.y + (a[1] + b[1]) * 0.5,
angle: ang,
len: random(p.cylLengthMin, p.cylLengthMax),
th: random(p.cylThickMin, p.cylThickMax),
bend,
la: ang + bend * 1.2 - L.dir,
L,
col,
});
}
}
}
function buildCells() {
randomSeed(seed + 19000);
random();
palette = ALL_SRC[T.palIndex];
const dk = palette.reduce((a, c) => lum(c) < lum(a) ? c : a);
CFG.bg = dk.map(v => Math.round(10 + v * 0.14));
document.body.style.background = `rgb(${CFG.bg})`;
const baseW = 506 / 18 * SC(), baseH = 900 / 26 * SC();
const cells = [];
let y = 0, lastRow = [];
for (let r = 0; r < 48 && y < height - 3; r++) {
let rowH = Math.min(baseH * random(0.45, 1.9), height - y);
if (rowH < 4) break;
const row = [];
let x = 0;
for (let c = 0; c < 48 && x < width - 3; c++) {
let w = Math.min(baseW * random(0.35, 1.9), width - x);
if (w < 4) break;
row.push({ x, y, w, h: rowH, noiseOffset: random(5e6) });
x += w;
}
if (row.length) {
const last = row[row.length - 1];
last.w = width - last.x;
cells.push(...row);
lastRow = row;
}
y += rowH;
}
if (y < height) for (const c of lastRow) c.h += height - y;
return cells;
}
function buildPoppies() {
randomSeed(seed + 50000);
const n = 4 + floor(random(5));
const places = [];
for (let i = 0; i < n; i++) {
places.push({ x: random(width * 0.1, width * 0.9), y: random(height * 0.15, height * 0.85), s: random(0.28, 1.35) });
}
return places.map((pl, i) => {
randomSeed(seed + i * 137);
noiseSeed(seed + i * 137);
const base = random(20, 180);
const offX = random(5, 40);
const amp = random(60, 160);
let r, g, b;
do {
r = random(200, 255); g = random(15, 60); b = random(30, 80);
} while (Math.hypot(r - 230, g - 40, b - 50) > 40);
const petal = [];
const rad = r * 0.4 + base;
for (let a = 0; a < TWO_PI; a += 0.08) {
const d = map(noise(map(Math.cos(a), -1, 1, 0, 3), map(Math.sin(a), -1, 1, 0, 3)), 0, 1, -amp, amp);
const rr = Math.max(rad * 0.25, rad + d) / 8;
petal.push([rr * Math.cos(a) + offX, rr * Math.sin(a)]);
}
const inner = [];
for (let a = 0; a < TWO_PI; a += 0.1) {
const d = map(noise(Math.cos(a), Math.sin(a)), 0, 1, -amp * 0.6, amp * 0.6);
const rr = Math.max(20, 80 + d) / 12;
inner.push([rr * Math.cos(a), rr * Math.sin(a)]);
}
return { ...pl, petal, inner, rgb: [r, g, b], cw: random(12, 28), ch: random(10, 22) };
});
}
function rgbStr(c, a = 1) { return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`; }
function sizeVar(y) {
const g = Math.exp(randomGaussian(0, 0.38));
const depth = 0.8 + 0.4 * (y / height);
return Math.min(2.4, Math.max(0.4, g)) * depth;
}
function buildChamomiles() {
randomSeed(seed + 70000);
const s = SC();
const heavyRight = random() < 0.5;
const bias = (u) => heavyRight ? 1 - u : u;
const clusters = [];
const nc = 3 + floor(random(3));
for (let i = 0; i < nc; i++) {
clusters.push({
x: bias(Math.pow(random(), 1.6)) * width,
y: random(0.06, 0.96) * height,
r: random(0.07, 0.17) * 506 * s,
});
}
const n = floor(random(80, 120) * (width * height) / (506 * 900));
const list = [];
for (let i = 0; i < n; i++) {
let x, y;
if (random() < 0.6) {
const c = clusters[floor(random(clusters.length))];
const a = random(TWO_PI), d = Math.sqrt(random()) * c.r;
x = c.x + Math.cos(a) * d * 1.3; y = c.y + Math.sin(a) * d;
} else {
x = bias(Math.pow(random(), 1.3)) * width; y = random(height);
}
const r = random(3, 7.5) * s * sizeVar(y);
const cr = r * 0.32;
const np = 11 + floor(random(5));
const step = TWO_PI / np;
const petals = [];
for (let k = 0; k < np; k++) {
const len = r * random(0.6, 0.78);
const tone = random(-10, 6);
petals.push({
a: k * step + random(-0.12, 0.12),
len, w: len * random(0.34, 0.44),
col: rgbStr([241 + tone, 234 + tone, 214 + tone * 0.6], 0.96),
});
}
list.push({
x, y, r, cr, petals, s, m: 0.45, r0: 5.25 * s,
off: step * 0.5,
rot: random(TWO_PI),
sy: random(0.68, 1),
back: rgbStr([206, 196, 170], 0.9),
c1: rgbStr([224 + random(-8, 8), 168 + random(-10, 10), 58]),
c2: rgbStr([192, 128, 42], 0.85),
c3: rgbStr([246, 210, 120], 0.8),
});
}
return list;
}
function drawPetalFlower(ctx, f) {
ctx.fillStyle = f.back;
for (const p of f.petals) {
const a = p.a + f.off, d = f.cr + p.len * 0.42;
ctx.beginPath();
ctx.ellipse(Math.cos(a) * d, Math.sin(a) * d, p.len * 0.52, p.w * 0.5, a, 0, TWO_PI);
ctx.fill();
}
for (const p of f.petals) {
const d = f.cr + p.len * 0.45;
ctx.fillStyle = p.col;
ctx.beginPath();
ctx.ellipse(Math.cos(p.a) * d, Math.sin(p.a) * d, p.len * 0.5, p.w * 0.5, p.a, 0, TWO_PI);
ctx.fill();
}
ctx.fillStyle = f.c1;
ctx.beginPath(); ctx.arc(0, 0, f.cr, 0, TWO_PI); ctx.fill();
ctx.fillStyle = f.c2;
ctx.beginPath(); ctx.ellipse(f.cr * 0.22, f.cr * 0.28, f.cr * 0.62, f.cr * 0.5, 0.5, 0, TWO_PI); ctx.fill();
ctx.fillStyle = f.c3;
ctx.beginPath(); ctx.arc(-f.cr * 0.32, -f.cr * 0.32, f.cr * 0.28, 0, TWO_PI); ctx.fill();
}
const WILDFLOWERS = [
{ w: 0.26, m: 0.9, kind: 'petal', petals: [12, 16], pl: [0.6, 0.75], pw: [0.32, 0.42], cr: 0.34, r: [3.5, 7],
col: [222, 186, 82], back: [190, 150, 62], c1: [184, 124, 44], c2: [146, 92, 34], c3: [226, 168, 72] },
{ w: 0.26, m: 0.7, kind: 'cornflower', r: [3, 6], col: [92, 122, 178], back: [66, 88, 142], c1: [66, 60, 108], c3: [140, 160, 206] },
{ w: 0.2, m: 0.3, kind: 'cluster', r: [1.4, 2.4], col: [220, 194, 78], back: [186, 156, 60], c1: [160, 120, 40] },
{ w: 0.15, m: 0.55, kind: 'petal', petals: [5, 5], pl: [0.6, 0.7], pw: [0.6, 0.75], cr: 0.22, r: [2.8, 5],
col: [126, 104, 166], back: [94, 78, 132], c1: [214, 206, 226], c2: [152, 132, 188], c3: [238, 234, 242] },
{ w: 0.13, m: 1.0, kind: 'petal', petals: [5, 5], pl: [0.62, 0.72], pw: [0.7, 0.85], cr: 0.24, r: [3.5, 6.5],
col: [180, 108, 134], back: [148, 82, 108], c1: [232, 212, 216], c2: [198, 150, 166], c3: [244, 232, 236] },
];
function makeWildflower(x, y, sp, s) {
const r = random(sp.r[0], sp.r[1]) * s * sizeVar(y);
const tone = () => random(-10, 8);
const f = { x, y, r, s, m: sp.m, r0: (sp.r[0] + sp.r[1]) * 0.5 * s, kind: sp.kind, rot: random(TWO_PI), sy: random(0.68, 1), back: rgbStr(sp.back, 0.9), c1: rgbStr(sp.c1) };
if (sp.kind === 'petal') {
const np = floor(random(sp.petals[0], sp.petals[1] + 1));
const step = TWO_PI / np;
f.cr = r * sp.cr; f.off = step * 0.5;
f.c2 = rgbStr(sp.c2, 0.85); f.c3 = rgbStr(sp.c3, 0.8);
f.petals = [];
for (let k = 0; k < np; k++) {
const len = r * random(sp.pl[0], sp.pl[1]), t = tone();
f.petals.push({ a: k * step + random(-0.12, 0.12), len, w: len * random(sp.pw[0], sp.pw[1]),
col: rgbStr([sp.col[0] + t, sp.col[1] + t, sp.col[2] + t * 0.6], 0.96) });
}
} else if (sp.kind === 'cornflower') {
const nf = 7 + floor(random(3));
f.c3 = rgbStr(sp.c3, 0.9);
f.florets = [];
for (let k = 0; k < nf; k++) {
const t = tone();
f.florets.push({ a: k * TWO_PI / nf + random(-0.15, 0.15), l: random(0.85, 1.05),
col: rgbStr([sp.col[0] + t, sp.col[1] + t, sp.col[2] + t], 0.96) });
}
} else {
const m = 3 + floor(random(5));
f.buds = [];
for (let k = 0; k < m; k++) {
const a = random(TWO_PI), d = random(0.5, 3) * r, t = tone();
f.buds.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, rr: r * random(0.75, 1.1), rot: random(TWO_PI),
col: rgbStr([sp.col[0] + t, sp.col[1] + t, sp.col[2] + t * 0.5], 0.95) });
}
}
return f;
}
function buildWildflowers() {
randomSeed(seed + 71000);
const s = SC();
const total = random(110, 160) * (width * height) / (506 * 900);
const list = [];
for (const sp of WILDFLOWERS) {
const heavyRight = random() < 0.5;
const bias = (u) => heavyRight ? 1 - u : u;
const patches = [];
for (let i = 0; i < 2 + floor(random(2)); i++) {
patches.push({ x: bias(Math.pow(random(), 1.5)) * width, y: random(0.05, 0.96) * height, r: random(0.06, 0.15) * 506 * s });
}
const n = floor(total * sp.w);
for (let i = 0; i < n; i++) {
let x, y;
if (random() < 0.65) {
const c = patches[floor(random(patches.length))];
const a = random(TWO_PI), d = Math.sqrt(random()) * c.r;
x = c.x + Math.cos(a) * d * 1.3; y = c.y + Math.sin(a) * d;
} else {
x = bias(Math.pow(random(), 1.2)) * width; y = random(height);
}
list.push(makeWildflower(x, y, sp, s));
}
}
return list;
}
function drawCornflower(ctx, f) {
const r = f.r;
for (const fl of f.florets) {
const ca = Math.cos(fl.a), sa = Math.sin(fl.a), L = r * fl.l;
ctx.fillStyle = f.back;
ctx.beginPath(); ctx.ellipse(ca * L * 0.4, sa * L * 0.4, L * 0.32, L * 0.12, fl.a, 0, TWO_PI); ctx.fill();
ctx.fillStyle = fl.col;
ctx.beginPath(); ctx.ellipse(ca * L * 0.74, sa * L * 0.74, L * 0.2, L * 0.22, fl.a, 0, TWO_PI); ctx.fill();
for (const o of [-1, 0, 1]) {
const px = ca * L * 0.92 - sa * o * L * 0.15, py = sa * L * 0.92 + ca * o * L * 0.15;
ctx.beginPath(); ctx.arc(px, py, L * 0.09, 0, TWO_PI); ctx.fill();
}
}
ctx.fillStyle = f.c1;
ctx.beginPath(); ctx.arc(0, 0, r * 0.24, 0, TWO_PI); ctx.fill();
ctx.fillStyle = f.c3;
ctx.beginPath(); ctx.arc(-r * 0.07, -r * 0.07, r * 0.08, 0, TWO_PI); ctx.fill();
}
function drawCluster(ctx, f) {
for (const b of f.buds) {
for (let k = 0; k < 4; k++) {
const a = b.rot + k * HALF_PI;
ctx.fillStyle = k % 2 ? f.back : b.col;
ctx.beginPath(); ctx.arc(b.x + Math.cos(a) * b.rr * 0.55, b.y + Math.sin(a) * b.rr * 0.55, b.rr * 0.5, 0, TWO_PI); ctx.fill();
}
ctx.fillStyle = f.c1;
ctx.beginPath(); ctx.arc(b.x, b.y, b.rr * 0.28, 0, TWO_PI); ctx.fill();
}
}
let FLOWER_SS = 2, PD = 1, EXPORT_GRAIN = null, GRAIN_MASK = null;
function buildFlowerSprites() {
const SS = FLOWER_SS;
for (const f of chamomiles) {
const E = f.r * (f.kind === 'cluster' ? 4.4 : 1.3) + 1, px = Math.max(2, Math.ceil(E * 2 * SS));
const cv = document.createElement('canvas'); cv.width = cv.height = px;
const g = cv.getContext('2d'); g.setTransform(SS, 0, 0, SS, px / 2, px / 2);
if (f.kind === 'cornflower') drawCornflower(g, f);
else if (f.kind === 'cluster') drawCluster(g, f);
else drawPetalFlower(g, f);
f.spr = cv; f.E = E;
}
}
function drawChamomiles(t) {
const ctx = drawingContext, ux = WIND.ux, uy = WIND.uy, Z = CAM.z * PD, EX = CAM.ex * PD, EY = CAM.ey * PD;
for (let i = 0, N = chamomiles.length; i < N; i++) {
const f = chamomiles[i], q = f.q, a = f.rot + q * f.side * 0.2;
const sy = f.sy * (1 - 0.12 * (q > 0 ? q : 0));
const c = Math.cos(a), s = Math.sin(a), E = f.E;
ctx.setTransform(Z * c, Z * s, -Z * s * sy, Z * c * sy, Z * (f.x + ux * q * 4 * f.s) + EX, Z * (f.y + uy * q * 4 * f.s) + EY);
ctx.drawImage(f.spr, -E, -E, E * 2, E * 2);
}
ctx.setTransform(Z, 0, 0, Z, EX, EY);
}
// layout in stages (a generator), so that inside Grokly the build can be spread over several frames
// (the one-call layout was a ~1 s blocking task on a slow machine). layout() runs every stage at once, as before.
function* layoutStages() {
T = TRAITS.derive(HASH);
cylinders = [];
qField = null;
if (staticLayer) staticLayer.remove();
staticLayer = createGraphics(width, height);
staticLayer.pixelDensity(1);
staticLayer.noFill();
randomSeed(seed + 33000);
sunDir = random(TWO_PI);
const cells = buildCells();
staticLayer.background(...CFG.bg);
yield;
for (const c of cells) { generateCell(c, staticLayer); yield; }
cacheCylStyles();
poppies = buildPoppies();
yield;
chamomiles = buildChamomiles().concat(buildWildflowers()).sort((a, b) => a.y - b.y);
yield;
buildFlowerSprites();
yield;
noiseSeed(seed + 90001);
randomSeed(seed);
initWind();
yield;
yield* buildGrainStages();
buildQasedak();
pickCamZoom();
}
function layout() { for (const _ of layoutStages()); }
// Grokly: setup() only makes the canvas; each frame then runs ONE layout stage (a fixed number of frames, so every run
// is the same) while window.__groklyReady is false. When the last stage is done, the frame counter and millis() are
// rewound, so the piece then draws exactly the frames it drew after a one-call layout. Ready after the usual 3 frames.
let LAYOUT_GEN = null, BUILT_DRAWS = -1;
function buildStep() {
// every stage sees frameCount 0 and millis() 0, as the one-call layout did inside setup() (render() and the sound
// hooks it calls key their per-frame state on frameCount)
const P = window.p5 && window.p5.instance;
if (P) { P._setProperty('frameCount', 0); P._millisStart = window.performance.now(); }
if (LAYOUT_GEN.next().done) { LAYOUT_GEN = null; BUILT_DRAWS = 0; }
}
let qField = null;
const CAM = { z: 1, ex: 0, ey: 0, on: true, max: 10, zs: 1 };
function pickCamZoom() { CAM.zs = 1; } // Milani: always the wide view (the Near/Close/Intimate zoom up to 10x blurred the garden and blew up the text)
function updateCam() {
const B = qField && qField.heads[0];
if (!CAM.on || !B) { CAM.z = 1; CAM.ex = CAM.ey = 0; return; }
const z = CAM.zs, f = 0, fx = B.x, fy = B.y;
const sx = fx + (width / 2 - fx) * f, sy = fy + (height / 2 - fy) * f;
CAM.z = z;
CAM.ex = Math.min(0, Math.max(width - z * width, sx - z * fx));
CAM.ey = Math.min(0, Math.max(height - z * height, sy - z * fy));
}
function buildQasedak() {
const n = T.count;
qField = QASEDAK.build({ seed: seed + ':meadow', w: width, h: height, R: Q_R(), count: n, verse0: QASEDAK.VERSES[T.verseIndex], ss: 10, cam: CAM, stemK: 3, topFrac: 0.2, ink: [246, 240, 226], stem: qStemColor(), stemDark: qStemColor(0.38), positions: qPositions(n) });
buildInscription();
}
let INSCR = null, showInscr = false;
const EN_FONT = EN_STACK;
const inscrFontKey = () => (document.fonts ? +document.fonts.check('italic 20px "EB Garamond"') : 0);
if (document.fonts) { document.fonts.load('italic 20px "EB Garamond"', 'Love'); }
function buildInscription(ss = 2) {
INSCR = null;
const B0 = qField && qField.heads[0]; if (!B0) return;
const V = B0.verse, e = HAFEZ_EN[V[0]] || { en: [], src: 'literal', g: '?' };
const Bw = Math.min(width, height * 0.5625), SS = ss;
let fa = Math.max(15, Bw * 0.036);
const en = Math.max(11, fa * 0.5), cr = Math.max(9, en * 0.78), maxW = Math.min(width * 0.62, Math.max(Bw * 0.66, width * 0.34));
const m = document.createElement('canvas').getContext('2d');
const wFa = 0; // only the English translation is shown (no Persian line)
m.font = `italic ${en}px ${EN_FONT}`;
const lines = [];
for (const L of e.en) {
if (m.measureText(L).width <= maxW) { lines.push(L); continue; }
let cur = '';
for (const w of L.split(' ')) { const t = cur ? cur + ' ' + w : w; if (m.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
if (cur) lines.push(cur);
}
const credit = (HAFEZ_CREDIT[e.src] || HAFEZ_CREDIT.literal)(e).toUpperCase();
m.font = `${cr}px ${EN_FONT}`;
const wCr = m.measureText(credit).width + credit.length * cr * 0.12;
const wEn = Math.max(0, ...lines.map(l => { m.font = `italic ${en}px ${EN_FONT}`; return m.measureText(l).width; }));
const lhFa = 0, lhEn = en * 1.42, pad = fa * 0.8;
const W = Math.ceil(Math.max(wFa, wEn, wCr) + pad * 2), H = Math.ceil(pad + lines.length * lhEn + en * 0.9 + cr * 1.4 + pad);
const cv = document.createElement('canvas'); cv.width = W * SS; cv.height = H * SS;
const g = cv.getContext('2d'); g.scale(SS, SS);
g.fillStyle = '#fff'; g.shadowColor = 'rgba(0,0,0,0.55)'; g.shadowBlur = fa * 0.4; g.shadowOffsetY = fa * 0.04;
const R = pad + wFa, L0 = pad;
let y = pad + lhFa * 0.72;
g.textBaseline = 'alphabetic'; void R; void lhFa;
y = pad + lhEn * 0.75;
g.direction = 'ltr'; g.textAlign = 'left'; g.shadowBlur = en * 0.5;
g.font = `italic ${en}px ${EN_FONT}`;
for (const l of lines) { g.fillText(l, L0, y); y += lhEn; }
y += en * 0.55;
g.font = `${cr}px ${EN_FONT}`; g.globalAlpha = 0.78;
if ('letterSpacing' in g) { g.letterSpacing = `${cr * 0.12}px`; } g.fillText(credit, L0, y);
INSCR = { cv, W, H, x: Bw * 0.06 - pad, y: height - H - Bw * 0.06 + pad * 0.6, key: inscrFontKey() };
}
function drawInscription() {
if (!showInscr || !INSCR) return;
if (INSCR.key !== inscrFontKey()) { buildInscription(); if (!INSCR) return; }
drawingContext.drawImage(INSCR.cv, INSCR.x, INSCR.y, INSCR.W, INSCR.H);
}
function qPositions(n) {
randomSeed(seed + 88000);
const R = Q_R(), PHI = 0.382;
const g = random() < 0.5 ? 1 / 3 : PHI;
const left = WIND.ux > 0.15 ? true : WIND.ux < -0.15 ? false : random() < 0.5;
const up = WIND.uy > 0.25 ? true : WIND.uy < -0.25 ? false : random() < 0.6;
const jx = () => random(-0.02, 0.02) * width, jy = () => random(-0.02, 0.02) * height;
const X = u => (left ? u : 1 - u) * width, Y = v => (up ? v : 1 - v) * height;
const fitY = (y, r) => Math.max(r * 1.4, Math.min(height - r * 3.8, y));
const P = [[X(g) + jx(), fitY(Y(g) + jy(), R)]];
if (n > 1) {
const r = R * 0.45;
P.push([X(1 - g * 0.85) + jx(), fitY(Y(1 - g * 1.1) + jy(), r)]);
P.push([X(g + (1 - 2 * g) * random(0.35, 0.55)) + jx(), fitY(Y(1 - g * 0.55) + jy(), r)]);
}
return P.slice(0, n);
}
function qStemColor(k = 1) {
const c = palette.reduce((a, b) => lum(b) > lum(a) ? b : a).map(v => Math.round(v * k));
return `rgba(${c[0]},${c[1]},${c[2]},0.9)`;
}
function qWind(x, y) {
const g = windAt({ x, y, pn: 0, flut: 0, tf: 0, tp: 0 }, windTime) * 1.3;
return [WIND.ux * g, WIND.uy * g];
}
let WIND = { ang: 0, ux: 1, uy: 0, v: 40, k: 0.0055, base: 0.22, gust: 0.95 };
const WG = { s: 32, nx: 0, ny: 0, g: null, t: NaN };
function windGrid(t) {
const s = WG.s, nx = Math.ceil(width / s) + 2, ny = Math.ceil(height / s) + 2;
if (!WG.g || WG.nx !== nx || WG.ny !== ny) { WG.nx = nx; WG.ny = ny; WG.g = new Float32Array(nx * ny); }
const G = WG.g, ux = WIND.ux, uy = WIND.uy, k = WIND.k, vt = WIND.v * t, tz = t * 0.04 + 500;
for (let j = 0; j < ny; j++) {
const y = (j - 1) * s;
for (let i = 0; i < nx; i++) {
const x = (i - 1) * s;
const g = noise((x * ux + y * uy - vt) * k, (-x * uy + y * ux) * k * 0.6, tz);
const e = Math.min(1, Math.max(0, (g - 0.35) / 0.4));
G[j * nx + i] = e * e * (3 - 2 * e);
}
}
WG.t = t;
}
function gustAt(x, y, t) {
if (WG.t !== t) windGrid(t);
const s = WG.s, nx = WG.nx, ny = WG.ny;
let fx = x / s + 1, fy = y / s + 1;
fx = fx < 0 ? 0 : fx > nx - 1.001 ? nx - 1.001 : fx; fy = fy < 0 ? 0 : fy > ny - 1.001 ? ny - 1.001 : fy;
const i = fx | 0, j = fy | 0, u = fx - i, v = fy - j, G = WG.g, r = j * nx + i;
return (G[r] * (1 - u) + G[r + 1] * u) * (1 - v) + (G[r + nx] * (1 - u) + G[r + nx + 1] * u) * v;
}
function windAt(o, t) {
const front = o.x * WIND.ux + o.y * WIND.uy - WIND.v * t;
const gust = gustAt(o.x, o.y, t);
const wave = 0.5 + 0.5 * Math.sin(front * WIND.k * 6 + o.pn);
return WIND.base + __windBase() + WIND.gust * __windGust() * gust * (0.55 + 0.45 * wave) + (o.flut ?? 0.06) * Math.sin(t * o.tf + o.tp); // باد: bass + lowMid + attack + level
}
function initWind() {
randomSeed(seed + 34000);
const s = SC();
random(); const a = T.windAngle;
WIND = { ang: a, ux: Math.cos(a), uy: Math.sin(a), v: 42 * s, k: 0.0055 / s, base: 0.22, gust: 0.95 };
WG.t = NaN;
const prep = (o, f0, f1, z0, z1, ang) => {
o.wn = TWO_PI * random(f0, f1);
o.z = random(z0, z1);
o.tp = random(TWO_PI);
o.tf = random(2.5, 4.5);
o.side = Math.sin(a - ang);
o.pn = noise((-o.x * WIND.uy + o.y * WIND.ux) * 0.004, 700) * 4;
o.q = windAt(o, windTime);
o.v = 0;
};
for (const c of cylinders) {
prep(c, 0.6, 1.1, 0.1, 0.2, c.angle);
c.wn *= Math.sqrt(4 / Math.max(2, c.len));
}
const prepMass = (o, M, ang) => {
prep(o, 1, 1, 0, 0, ang);
const sq = Math.sqrt(M);
o.wn = TWO_PI * random(0.85, 1.15) * 0.95 / sq;
o.z = Math.min(0.3, 0.09 + 0.06 / sq);
o.gain = Math.min(1.7, 0.95 / sq);
o.flut = Math.min(0.2, 0.06 / M);
o.q = windAt(o, windTime) * o.gain;
};
for (const f of chamomiles) prepMass(f, f.m * Math.pow(f.r / f.r0, 1.5), f.rot);
for (const p of poppies) prepMass(p, 1.8 * Math.pow(p.s / 0.72, 1.5), random(TWO_PI));
}
function stepWind(dt) {
const n = Math.min(4, Math.max(1, Math.ceil(dt * 60))), h = dt / n, t = windTime;
const step = (o) => {
const F = windAt(o, t) * (o.gain ?? 1);
for (let i = 0; i < n; i++) {
const acc = o.wn * o.wn * (F - o.q) - 2 * o.z * o.wn * o.v;
o.v += acc * h; o.q += o.v * h;
}
};
for (const c of cylinders) step(c);
for (const f of chamomiles) step(f);
for (const p of poppies) step(p);
}
const GRAIN = { frames: 8, fps: 24, strength: 0.34, threshold: 0.5 };
let grainFrames = [];
let showGrain = true;
// in stages (generator) for the sliced Grokly build: after the mask, and after every 2nd grain frame
function buildGrain() { for (const _ of buildGrainStages()); }
function* buildGrainStages() {
grainFrames = [];
render();
const w = width, h = height;
const src = drawingContext.getImageData(0, 0, w, h).data;
const B = 4, mw = Math.ceil(w / B), mh = Math.ceil(h / B);
const mask = new Float32Array(mw * mh);
GRAIN_MASK = { mask, mw, mh, B };
for (let by = 0; by < mh; by++) {
for (let bx = 0; bx < mw; bx++) {
let s = 0, n = 0;
for (let y = by * B; y < Math.min(h, by * B + B); y++) {
for (let x = bx * B; x < Math.min(w, bx * B + B); x++) {
const i = (y * w + x) * 4;
s += 0.2126 * src[i] + 0.7152 * src[i + 1] + 0.0722 * src[i + 2]; n++;
}
}
const d = Math.max(0, Math.min(1, (GRAIN.threshold - s / n / 255) / GRAIN.threshold));
mask[by * mw + bx] = Math.pow(d, 1.2);
}
}
yield;
let st = (seed ^ 0x5bd1e995) >>> 0;
const rnd = () => {
st = (st + 0x6D2B79F5) >>> 0; let t = st;
t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61);
return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
const cw = (w >> 1) + 1, ch = (h >> 1) + 1;
const coarse = new Float32Array(cw * ch);
for (let f = 0; f < GRAIN.frames; f++) {
for (let i = 0; i < coarse.length; i++) coarse[i] = rnd() - 0.5;
const cv = document.createElement('canvas');
cv.width = w; cv.height = h;
const g2 = cv.getContext('2d');
const img = g2.createImageData(w, h), d = img.data;
for (let y = 0; y < h; y++) {
const mrow = (y / B | 0) * mw, crow = (y >> 1) * cw;
for (let x = 0; x < w; x++) {
const m = mask[mrow + (x / B | 0)];
if (m < 0.01) continue;
const g = 0.6 * (rnd() - 0.5) + 0.4 * coarse[crow + (x >> 1)];
const v = g > 0 ? 205 : 0, i = (y * w + x) * 4;
d[i] = d[i + 1] = d[i + 2] = v;
d[i + 3] = Math.min(255, Math.abs(g) * 2 * m * GRAIN.strength * 255);
}
}
g2.putImageData(img, 0, 0);
grainFrames.push(cv);
if (f & 1) yield;
}
}
function buildExportGrain(S) {
if (!GRAIN_MASK) return null;
const { mask, mw, B } = GRAIN_MASK, w = Math.round(width * S), h = Math.round(height * S);
const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
const g2 = cv.getContext('2d'), img = g2.createImageData(w, h), d = img.data;
let st = (seed ^ 0x2545f491) >>> 0;
const rnd = () => { st = (st + 0x6D2B79F5) >>> 0; let t = st; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
for (let y = 0; y < h; y++) {
const mrow = ((y / S) / B | 0) * mw;
for (let x = 0; x < w; x++) {
const m = mask[mrow + ((x / S) / B | 0)]; if (m < 0.01) continue;
const g = rnd() - 0.5, i = (y * w + x) * 4;
d[i] = d[i + 1] = d[i + 2] = g > 0 ? 205 : 0;
d[i + 3] = Math.min(255, Math.abs(g) * 2 * m * GRAIN.strength * 255);
}
}
g2.putImageData(img, 0, 0);
return cv;
}
function drawGrain() {
if (!showGrain) return;
if (EXPORT_GRAIN) { drawingContext.drawImage(EXPORT_GRAIN, 0, 0, width, height); return; }
if (!grainFrames.length) return;
const tick = Math.floor(millis() / (1000 / GRAIN.fps));
const hsh = Math.imul(tick ^ 0x9e3779b9, 2654435761) >>> 0;
const ctx = drawingContext;
ctx.drawImage(grainFrames[hsh % GRAIN.frames], (hsh >> 8) % 3 - 1, (hsh >> 12) % 3 - 1);
}
const KSTEPS = 32, KMAX = 1.25, THQ = 0.35;
let STYLE_LIST = [], THS = [];
function cacheCylStyles() {
const memo = new Map(), ids = new Map();
STYLE_LIST = [];
const q6 = v => Math.min(255, Math.round(v / 6) * 6);
let maxT = 0;
for (const c of cylinders) {
c.ti = Math.max(1, Math.round(c.th / THQ)); if (c.ti > maxT) maxT = c.ti;
const key = c.col.join() + '|' + c.L.dir;
let arr = memo.get(key);
if (!arr) {
arr = [];
for (let s = 0; s < KSTEPS; s++) {
const k = s / (KSTEPS - 1) * KMAX, col = c.col, L = c.L;
const str = `rgba(${q6(col[0] * (L.amb[0] + L.sun[0] * k))},${q6(col[1] * (L.amb[1] + L.sun[1] * k))},${q6(col[2] * (L.amb[2] + L.sun[2] * k))},0.745)`;
let id = ids.get(str); if (id === undefined) { id = STYLE_LIST.length; STYLE_LIST.push(str); ids.set(str, id); }
arr.push(id);
}
memo.set(key, arr);
}
c.styles = arr;
}
THS = Array.from({ length: maxT + 1 }, (_, i) => i * THQ);
}
function drawCylinders(t) {
const ctx = drawingContext;
ctx.lineCap = 'round';
const ux = WIND.ux, uy = WIND.uy, kq = (KSTEPS - 1) / KMAX, TW = THS.length, CS = __cubes(); // مکعب‌ها: اندازه با صدا
const paths = new Map();
for (let i = 0, N = cylinders.length; i < N; i++) {
const c = cylinders[i];
const sway = c.q * c.side * 0.42;
const wb = c.q * c.side * 1.1;
const k = Math.min(KMAX, 0.5 + 0.5 * Math.cos(c.la + sway - __lightDir(c.L)) + (c.q > 0 ? c.q * 0.28 : 0)); // نور هر کانواس: جهت نور با باند خودش می‌چرخد، شدت نور ثابت (gl-sound.js)
const key = c.styles[(k * kq + 0.5) | 0] * TW + c.ti;
let P = paths.get(key); if (!P) { P = new Path2D(); paths.set(key, P); }
const a = c.angle + sway, ca = Math.cos(a), sa = Math.sin(a);
const h = c.len * 0.5 * CS.len, bb = (c.bend + wb) * c.th * 1.4;
const ey = bb * 0.3, cy = bb * 1.7;
const px = c.x + ux * c.q * c.len * 0.35, py = c.y + uy * c.q * c.len * 0.35;
P.moveTo(px - h * ca - ey * sa, py - h * sa + ey * ca);
P.quadraticCurveTo(px - cy * sa, py + cy * ca, px + h * ca - ey * sa, py + h * sa + ey * ca);
}
for (const [key, P] of paths) {
ctx.strokeStyle = STYLE_LIST[(key / TW) | 0];
ctx.lineWidth = THS[key % TW] * CS.th;
ctx.stroke(P);
}
}
function drawPoppy(p, t) {
const wx = WIND.ux * p.q * 10 * p.s, wy = WIND.uy * p.q * 10 * p.s;
const rot = p.q * 0.12 * p.side + 0.03 * Math.sin(t * 1.7 + p.tp);
const [r, g, b] = p.rgb;
push();
translate(p.x + wx, p.y + wy);
rotate(rot);
scale(p.s);
noStroke();
fill(r, g, b, 200);
beginShape(); for (const v of p.petal) vertex(v[0], v[1]); endShape(CLOSE);
fill(r * 0.6, g * 0.5, b * 0.5, 180);
beginShape(); for (const v of p.inner) vertex(v[0], v[1]); endShape(CLOSE);
fill(20, 20, 30, 220);
ellipse(0, 0, p.cw, p.ch);
pop();
}
function render() {
const ctx = drawingContext;
updateCam();
if (CAM.z > 1.0001) { ctx.setTransform(PD, 0, 0, PD, 0, 0); ctx.fillStyle = `rgb(${CFG.bg})`; ctx.fillRect(0, 0, width, height); }
CAM.pd = PD;
ctx.setTransform(PD * CAM.z, 0, 0, PD * CAM.z, PD * CAM.ex, PD * CAM.ey);
image(staticLayer, 0, 0, width, height);
if (qField) QASEDAK.drawStems(drawingContext, qField, 1);
drawCylinders(windTime);
if (showChamomile) drawChamomiles(windTime);
for (const p of poppies) drawPoppy(p, windTime);
if (qField) QASEDAK.draw(drawingContext, qField, 1);
ctx.setTransform(PD, 0, 0, PD, 0, 0);
drawGrain();
drawInscription();
}
function draw() {
if (LAYOUT_GEN) { buildStep(); return; }
if (BUILT_DRAWS >= 0 && ++BUILT_DRAWS === 3) { window.__groklyReady = true; BUILT_DRAWS = -1; }
const dt = Math.min(deltaTime, 100) / 1000 * CFG.windSpeed * __windSpeed(); // سرعت باد: tempo، سکوت
windTime += dt;
stepWind(dt);
if (qField && QASEDAK.fontReady() !== qField.fontOK) buildQasedak();
if (qField) QASEDAK.step(qField, qWind, windTime);
if (frameCount < 60 && frameCount % 10 === 0) {
const [w, h] = canvasSize();
if (w !== width || h !== height) { resizeCanvas(w, h); layout(); }
}
render();
if (!previewed && windTime > 6) { previewed = true; if (typeof window.$renderPreview === 'function') window.$renderPreview(); }
if (frameCount % 15 === 0) $fps.textContent = `${frameRate().toFixed(0)} fps`;
}
function canvasSize() {
const W = Math.max(150, window.innerWidth || windowWidth), H = Math.max(100, window.innerHeight || windowHeight);
const n = Math.max(50, Math.floor(Math.min(W / 3, H / 2)));
return [3 * n, 2 * n];
}
function setup() {
const [w, h] = canvasSize();
const cnv = createCanvas(w, h);
pixelDensity(1);
document.documentElement.style.height = '100%';
Object.assign(document.body.style, { margin: '0', padding: '0', minHeight: '100%', overflow: 'hidden' });
Object.assign(cnv.elt.style, { position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', margin: 'auto', display: 'block' });
seed = SEED;
if (window.__GROKLY_FEED) { LAYOUT_GEN = layoutStages(); window.__groklyReady = false; }
else layout();
}
function windowResized() {
clearTimeout(resizeTimer);
resizeTimer = setTimeout(() => {
const [w, h] = canvasSize();
if (w === width && h === height) return;
resizeCanvas(w, h);
layout();
if (paused) render();
}, 150);
}
function togglePause() {
paused = !paused;
paused ? noLoop() : loop();
}
let saving = false;
function saveImage() {
if (saving) return; saving = true;
const k = Math.max(1, Math.min(Math.ceil(7680 / Math.max(width, height)), Math.floor(Math.sqrt(1.2e8 / (width * height)))));
const wasPaused = paused; noLoop();
$fps.textContent = `saving ${width * k}×${height * k}…`;
setTimeout(() => {
const oldStatic = staticLayer;
try {
PD = k; pixelDensity(k);
const g = createGraphics(width, height); g.pixelDensity(k); g.noFill();
randomSeed(seed + 33000); sunDir = random(TWO_PI);
const cells = buildCells(); g.background(...CFG.bg);
for (const c of cells) generateCell(c, g, true);
staticLayer = g;
FLOWER_SS = 2 * k; buildFlowerSprites();
if (showInscr) buildInscription(k);
EXPORT_GRAIN = showGrain ? buildExportGrain(Math.min(k, 3)) : null;
render();
saveCanvas(`the-garden-in-spring-${seed}-${width * k}x${height * k}`, 'png');
} finally {
if (staticLayer !== oldStatic) staticLayer.remove();
staticLayer = oldStatic; PD = 1; pixelDensity(1); EXPORT_GRAIN = null;
FLOWER_SS = 2; buildFlowerSprites(); buildInscription();
noiseSeed(seed + 90001); WG.t = NaN;
render(); saving = false;
if (!wasPaused) loop();
}
}, 40);
}
function keyPressed() {
if (key === 's' || key === 'S') saveImage();
else if (key === 'i' || key === 'I') { showInscr = !showInscr; if (paused) render(); }
else if (key === 'z' || key === 'Z') { CAM.on = !CAM.on; if (paused) render(); }
else if (key === 'g' || key === 'G') { showGrain = !showGrain; if (paused) render(); }
else if (key === 'c' || key === 'C') { showChamomile = !showChamomile; if (paused) render(); }
else if (key === ' ') { togglePause(); return false; }
}
/* ABX shim (appended) — report traits as soon as $features exist (they are set synchronously at load). */
if (window.abx && window.$features) abx.traits(window.$features);
