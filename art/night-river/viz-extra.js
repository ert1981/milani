/* viz-extra.js — Night River v2: sound hooks (after the art review's proposal, /tmp/claude-0/team-art/art/viz-extra.js).
   Start and stay in the full view (b4, time 150–249) so frame 0 is the whole composition.
   Owner's rules: no ink painting at all (removed); the picture never zooms, stretches or drifts with the sound; the tree stays put. Sound drives only
   the background: the ink strokes (swell, sideways flow while speaking, breath in pauses — confined to the sky above
   the crown) and, inside Sakura's frame, the snow and the hills/sky bands. The paper/scanline/noise pass is constant. */
window.VIZ = { speed: 0, zoom: 0, light: 0, hue: 0 };             // no extra draws, no stage effects here
(function () {
  let lv = 0, sw = 0, hi = 0, drift = 0, br = 0, vo = 0, fx = 0;
  if (typeof time === 'number') time = 150;
  VIZ_BEFORE.push((m) => {
    if (time < 150 || time >= 249) time = 150;
    lv += (m.level - lv) * (m.level > lv ? 0.35 : 0.08);            // fast attack, slow release
    sw += ((0.6 * m.lowMid + 0.4 * m.mid) - sw) * 0.25;             // voice body 150–2000 Hz
    hi += (m.high - hi) * 0.3;
    // ink: voiced (a voice/melody) paints it — opacity and thickness; flux (how fast the sound changes) sets the flow;
    // flatness (noisy sound) makes it a dry brush that flickers; zcr (hiss, s/sh) shivers its edge; pauses breathe
    vo += ((m.voiced || 0) - vo) * 0.2; fx += ((m.flux || 0) - fx) * 0.2;
    drift += 0.12 + 2.2 * fx;
    br += 0.045;
    const quiet = Math.max(0, 1 - lv * 2.5), breath = Math.sin(br) * quiet;
    const dry = (m.flatness || 0) * Math.sin(drift * 0.9), shiver = (m.zcr || 0) * Math.sin(drift * 3.1) * 3;
    window.__nr = {
      ink: { sy: 1 + 0.18 * vo + 0.03 * breath, dx: Math.sin(drift * 0.02) * 22 + shiver, alpha: Math.max(0.35, Math.min(1, 0.5 + 0.45 * vo + 0.06 * breath - 0.12 * Math.abs(dry))) },
      veil: 12, scan: 30, split: false,                             // constant: no whole-frame reaction
    };
    NRS.refresh(window.__nr.ink);
  });
  window.renderDistort = function () {                              // Night River's algorithm, parameterised
    const P = window.__nr || { veil: 10, scan: 32, split: false };
    const src = img.pixels; if (!src || src.length < 4000000) return;
    const offR = P.split ? 4 : 0, offG = P.split ? 8 : 0;
    if (barY1 > h) { barY1 = -40; barY2 = R.random_num(40, 50) - 50; }
    barY1 += 2; barY2 += 2;
    const out = tvnoise.pixels; let i = 0;
    for (let y = 0; y < h; y++) {
      const colDiv = (y < barY2 && y > barY1 ? 12 : 0) + P.veil + R.random_num(0, 2);
      const strips = (y & 1) * P.scan + colDiv, nl = Math.floor(R.random_num(0, 999)) * 1000;
      for (let x = 0; x < w; x++, i += 4) {
        const e = -strips - ppx[nl + x] * 0.6;
        out[i] = src[i + offR] + e; out[i + 1] = src[i + 1 + offG] + e; out[i + 2] = src[i + 2] + e; out[i + 3] = 255;
      }
    }
    tvnoise.updatePixels();
    image(tvnoise, 0, 0, 1000, 1000);
  };
})();
