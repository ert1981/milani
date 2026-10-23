// Grokly colour: perceptual colour (OKLab / OKLCH), harmonies, seeded "Surprise", presets and the WCAG contrast guard.
// Spec: qa/specs/colour-harmony.md. No dependencies; works in the browser (window.GroklyColour) and in Node (tests).
(function (root) {
  'use strict';
  // ---------- sRGB ⇄ OKLab (Ottosson 2020) ----------
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const delin = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
  function hexToRgb(hex) { const n = parseInt(hex.slice(1, 7), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
  function rgbToHex([r, g, b]) { const h = (v) => Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, '0'); return '#' + h(r) + h(g) + h(b); }
  function linToOklab(r, g, b) {
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
  }
  function oklabToLin(L, a, b) {
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  }
  function hexToOklch(hex) { const [r, g, b] = hexToRgb(hex).map(lin), [L, a, bb] = linToOklab(r, g, b); return { L, C: Math.hypot(a, bb), h: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360 }; }
  const inGamut = (rgb) => rgb.every((v) => v >= -1e-6 && v <= 1 + 1e-6);
  // OKLCH → hex; out-of-gamut colours lose chroma (steps of 0.002) at constant L and h — never per-channel clipping
  function oklch(L, C, h) {
    L = Math.max(0, Math.min(1, L)); let c = Math.max(0, C);
    for (;;) { const hr = (h * Math.PI) / 180, rgb = oklabToLin(L, c * Math.cos(hr), c * Math.sin(hr)); if (inGamut(rgb) || c <= 0) return rgbToHex(rgb.map((v) => delin(Math.max(0, Math.min(1, v))))); c = Math.max(0, c - 0.002); }
  }
  // ---------- WCAG 2.x ----------
  function wcagLum(hex) { const [r, g, b] = hexToRgb(hex).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; }
  function contrast(a, b) { const x = wcagLum(a), y = wcagLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  // role thresholds (spec 1.4): [hard minimum, target]
  const ROLES = { text: [4.5, 7], mark: [3, 4.5], touch: [1.5, 1.5] };
  // move fg's OKLCH lightness away from bg until the ratio is reached (binary search, 20 steps); flip side if impossible
  function solveL(fg, bg, ratio) {
    if (contrast(fg, bg) >= ratio) return fg;
    const f = hexToOklch(fg), Lb = hexToOklch(bg).L;
    const tryDir = (up) => { let lo = f.L, hi = up ? 1 : 0; if (contrast(oklch(hi, f.C, f.h), bg) < ratio) return null;
      for (let i = 0; i < 20; i++) { const mid = (lo + hi) / 2; if (contrast(oklch(mid, f.C, f.h), bg) >= ratio) hi = mid; else lo = mid; } return oklch(hi, f.C, f.h); };
    const first = f.L >= Lb; return tryDir(first) || tryDir(!first) || (contrast('#111111', bg) >= contrast('#ffffff', bg) ? '#111111' : '#ffffff');
  }
  // ---------- painter's (RYB) wheel → OK hue ----------
  const RYB = [[0, 29.2], [60, 53.0], [120, 109.8], [180, 151.1], [240, 264.1], [300, 293.9], [360, 389.2]];
  function rybToOk(t) { t = ((t % 360) + 360) % 360; for (let i = 0; i < RYB.length - 1; i++) { const [a, ha] = RYB[i], [b, hb] = RYB[i + 1]; if (t >= a && t <= b) return (ha + ((t - a) / (b - a)) * (hb - ha)) % 360; } return 29.2; }
  function okToRyb(h) { h = ((h % 360) + 360) % 360; if (h < 29.2) h += 360; for (let i = 0; i < RYB.length - 1; i++) { const [a, ha] = RYB[i], [b, hb] = RYB[i + 1]; if (h >= ha && h <= hb) return a + ((h - ha) / (hb - ha)) * (b - a); } return 0; }
  const HARMONIES = { mono: [0], analogous: [30, -30], complementary: [180], split: [150, 210], triadic: [120, -120] };
  const HARMONY_NAMES = { mono: 'Monochrome', analogous: 'Analogous', complementary: 'Complementary', split: 'Split-complementary', triadic: 'Triadic' };
  // ---------- seeded randomness ----------
  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const weighted = (rng, w) => { let r = rng() * Object.values(w).reduce((a, b) => a + b, 0); for (const [k, v] of Object.entries(w)) { if ((r -= v) <= 0) return k; } return Object.keys(w)[0]; };
  const rand = (rng, a, b) => a + rng() * (b - a);
  const okDist = (x, y) => { const p = hexToOklch(x), q = hexToOklch(y), lab = (o) => [o.L, o.C * Math.cos((o.h * Math.PI) / 180), o.C * Math.sin((o.h * Math.PI) / 180)], [a1, b1, c1] = lab(p), [a2, b2, c2] = lab(q); return Math.hypot(a1 - a2, b1 - b2, c1 - c2); };
  // banned "default look" (spec 1.3)
  function banned(bg, acc, ink) {
    const B = hexToOklch(bg), A = hexToOklch(acc), I = ink ? hexToOklch(ink) : null;
    if (B.h >= 260 && B.h <= 300 && B.C > 0.08 && A.h >= 200 && A.h <= 300) return true; // purple-blue
    if (A.C > 0.22 && B.L < 0.35) return true; // neon accent on a dark background
    if (bg.toLowerCase() === '#000000' && ink && ink.toLowerCase() === '#ffffff') return true;
    return false;
  }
  // dominant hue of a picture: 64×64, OKLab, k-means k = 5 (seeded init); the cluster with the largest pixels × chroma (C > 0.04)
  function dominantHue(img, rng) {
    if (!img || !img.data) return null; const px = [];
    for (let i = 0; i < img.data.length; i += 4 * Math.max(1, Math.floor(img.data.length / 4 / 4096))) { const [r, g, b] = [img.data[i], img.data[i + 1], img.data[i + 2]].map((v) => lin(v / 255)); px.push(linToOklab(r, g, b)); }
    if (px.length < 10) return null; let cent = Array.from({ length: 5 }, () => px[Math.floor(rng() * px.length)].slice()); let lab = new Array(px.length).fill(0);
    for (let it = 0; it < 8; it++) {
      for (let i = 0; i < px.length; i++) { let bi = 0, bd = 1e9; for (let k = 0; k < 5; k++) { const d = (px[i][0] - cent[k][0]) ** 2 + (px[i][1] - cent[k][1]) ** 2 + (px[i][2] - cent[k][2]) ** 2; if (d < bd) { bd = d; bi = k; } } lab[i] = bi; }
      const sum = Array.from({ length: 5 }, () => [0, 0, 0, 0]); px.forEach((p, i) => { const s = sum[lab[i]]; s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; s[3]++; });
      cent = cent.map((c, k) => (sum[k][3] ? [sum[k][0] / sum[k][3], sum[k][1] / sum[k][3], sum[k][2] / sum[k][3]] : c));
    }
    let best = null, score = 0; cent.forEach((c, k) => { const C = Math.hypot(c[1], c[2]), n = lab.filter((x) => x === k).length; if (C > 0.04 && n * C > score) { score = n * C; best = ((Math.atan2(c[2], c[1]) * 180) / Math.PI + 360) % 360; } });
    return best;
  }
  // ---------- presets (spec 3; ratios checked by tests). Paper & Ink, Sakura and Sea Glass accents were nudged in lightness (same hue)
  // so text on accent panels reaches 4.5:1 ----------
  const PRESETS = [
    { name: 'Paper & Ink', bg: '#f5f1e9', ink: '#221811', acc: '#d45e32' }, { name: 'Night Teal', bg: '#001a20', ink: '#e4f2f2', acc: '#eeb154' },
    { name: 'Dusk Plum', bg: '#2f1622', ink: '#f6e8de', acc: '#73ce95' }, { name: 'Moss', bg: '#172c1c', ink: '#eff0e1', acc: '#ffa383' },
    { name: 'Sakura', bg: '#ffe8e9', ink: '#38212c', acc: '#037b50' }, { name: 'Sea Glass', bg: '#d3efe8', ink: '#092531', acc: '#bd3b2c' },
    { name: 'Ink Blue', bg: '#062142', ink: '#f4f2ea', acc: '#f4bf3f' }, { name: 'Terracotta', bg: '#c16d45', ink: '#150a07', acc: '#f6eed8' },
  ];
  // ---------- Surprise (spec 2): seeded, harmonious, always passes the thresholds ----------
  function surprise(seed, ctx = {}) {
    const rng = mulberry32(seed >>> 0);
    for (let tries = 0; tries < 24; tries++) {
      const mode = weighted(rng, { light: 0.45, dark: 0.45, mid: 0.1 }), harmony = weighted(rng, { analogous: 0.3, complementary: 0.25, split: 0.2, triadic: 0.15, mono: 0.1 });
      const dh = ctx.picture ? dominantHue(ctx.picture, rng) : null, baseHue = dh != null ? dh : rybToOk(rng() * 360);
      const bg = mode === 'dark' ? oklch(rand(rng, 0.16, 0.26), rand(rng, 0.02, 0.06), baseHue) : mode === 'light' ? oklch(rand(rng, 0.93, 0.97), rand(rng, 0.01, 0.035), baseHue) : oklch(rand(rng, 0.5, 0.66), rand(rng, 0.06, 0.12), baseHue);
      const Lbg = hexToOklch(bg).L, ink = solveL(oklch(Lbg > 0.6 ? 0.2 : 0.95, 0.02, baseHue), bg, 7);
      const offs = HARMONIES[harmony], accHue = rybToOk(okToRyb(baseHue) + offs[Math.floor(rng() * offs.length)]);
      const acc = solveL(oklch(Lbg > 0.6 ? 0.58 : 0.8, rand(rng, 0.13, 0.19), harmony === 'mono' ? baseHue : accHue), bg, 3);
      if (banned(bg, acc, ink) || (ctx.prev && ctx.prev.acc && okDist(acc, ctx.prev.acc) < 0.08)) continue;
      if (contrast(ink, bg) < 4.5 || contrast(acc, bg) < 3 || contrast(acc, ink) < 1.5 || textOnAcc({ bg, ink, acc }) < 4.5) continue; // templates put text on accent panels
      return { bg, ink, acc, harmony, mode, seed };
    }
    const want = rng() < 0.5 ? 0.2 : 0.95; return { ...PRESETS.slice().sort((a, b) => Math.abs(hexToOklch(a.bg).L - want) - Math.abs(hexToOklch(b.bg).L - want))[0], harmony: 'preset', seed };
  }
  // templates draw text on accent-coloured panels in the lines/text colour or, if that is too faint, the background colour
  const textOnAcc = ({ bg, ink, acc }) => Math.max(ink ? contrast(ink, acc) : 0, bg ? contrast(bg, acc) : 0);
  // ---------- guard: every role pair below its hard minimum, with a fix that keeps hue and chroma ----------
  function check({ bg, ink, acc }) {
    const out = [];
    if (bg && ink && contrast(ink, bg) < ROLES.text[0]) out.push({ pair: 'Lines and text on background', key: 'ink', ratio: contrast(ink, bg), need: ROLES.text[0], fix: () => solveL(ink, bg, contrast(solveL(ink, bg, ROLES.text[1]), bg) >= ROLES.text[1] ? ROLES.text[1] : ROLES.text[0]) });
    if (bg && acc && contrast(acc, bg) < ROLES.mark[0]) out.push({ pair: 'Accent on background', key: 'acc', ratio: contrast(acc, bg), need: ROLES.mark[0], fix: () => solveL(acc, bg, ROLES.mark[1]) });
    else if (acc && (ink || bg) && textOnAcc({ bg, ink, acc }) < ROLES.text[0]) out.push({ pair: 'Text on accent panels', key: 'acc', ratio: textOnAcc({ bg, ink, acc }), need: ROLES.text[0],
      fix: () => { for (const ref of [ink, bg]) { if (!ref) continue; const a = solveL(acc, ref, ROLES.text[0]); if (!bg || contrast(a, bg) >= ROLES.mark[0]) return a; } return acc; } });
    return out;
  }
  const api = { textOnAcc, hexToOklch, oklch, wcagLum, contrast, solveL, rybToOk, okToRyb, HARMONIES, HARMONY_NAMES, PRESETS, surprise, check, banned, dominantHue, mulberry32, ROLES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.GroklyColour = api;
})(typeof window !== 'undefined' ? window : globalThis);
