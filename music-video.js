// Grokly "Music video": cut between several artworks in time with the music. No AI: classic beat tracking on the features
// lib/analyze.mjs already computes, a seeded rule-based edit, and a compositor that keeps at most two artworks alive.
// Editing ideas (not code) from browser-use/video-use (MIT): an edit decision list as plain data, every cut snapped to a candidate
// point in the audio, hold the last shot ≥ 1 s, few deliberate effects, and checking the result at every cut boundary.
(function (root) {
  'use strict';
  // ---------- seeded randomness ----------
  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const hashStr = (t) => { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const hex64 = (rng) => '0x' + Array.from({ length: 64 }, () => Math.floor(rng() * 16).toString(16)).join('');

  // ---------- beat grid ----------
  // onset strength per frame: rises in spectral flux plus rises in the low bands (kicks), from the analysis features
  function onsetEnv(feats) {
    const n = feats.length, env = new Float32Array(n), bass = new Float32Array(n);
    for (let i = 1; i < n; i++) {
      const f = feats[i], p = feats[i - 1], fb = f.bands || [], pb = p.bands || [];
      let lo = 0; for (let b = 0; b < 6; b++) lo += Math.max(0, (fb[b] || 0) - (pb[b] || 0));
      let all = 0; for (let b = 0; b < fb.length; b++) all += Math.max(0, (fb[b] || 0) - (pb[b] || 0));
      bass[i] = lo; env[i] = Math.max(0, (f.flux || 0) - (p.flux || 0)) + all / 8 + lo / 3;
    }
    const norm = (a) => { let m = 0; for (const v of a) m = Math.max(m, v); if (m > 0) for (let i = 0; i < a.length; i++) a[i] /= m; return a; };
    return { env: norm(env), bass: norm(bass) };
  }
  const lerpAt = (a, x) => { const i = Math.floor(x); if (i < 0 || i >= a.length - 1) return 0; const k = x - i; return a[i] * (1 - k) + a[i + 1] * k; };
  // tempo: autocorrelation of the onset curve over 60–180 BPM with a log-Gaussian preference around 110 BPM, then a fine
  // search of period (0.01 frame) and phase (0.1 frame) that best lines a comb up with the onsets; downbeat: the strongest bass
  // accent pattern every 4 beats. Returns frame-based numbers plus seconds.
  function beatGrid(feats, fps = 30) {
    const { env, bass } = onsetEnv(feats), n = env.length; if (n < fps * 3) return null;
    const start = musicStart(feats, fps);
    const minL = Math.floor((60 * fps) / 180), maxL = Math.ceil((60 * fps) / 60); let best = 0, bestL = 0, mean = 0; for (let i = start; i < n; i++) mean += env[i]; mean /= Math.max(1, n - start);
    const ac = [];
    for (let L = minL; L <= maxL; L++) { let s = 0; for (let i = start + L; i < n; i++) s += (env[i] - mean) * (env[i - L] - mean); s /= Math.max(1, n - start - L); const bpm = (60 * fps) / L, w = Math.exp(-0.5 * (Math.log2(bpm / 110) / 0.9) ** 2); ac[L] = s; if (s * w > best) { best = s * w; bestL = L; } }
    if (!bestL) return null;
    let P = bestL, phase = 0, score = -1;
    const comb = (P, ph, a = start, b = n - 1) => { let s = 0, c = 0; let x = ph + Math.ceil((a - ph) / P) * P; for (; x < b; x += P) { s += lerpAt(env, x); c++; } return c ? s / c : 0; };
    for (let p = bestL - 1; p <= bestL + 1; p += 0.01) for (let ph = 0; ph < p; ph += 0.1) { const s = comb(p, ph); if (s > score) { score = s; P = p; phase = ph; } }
    // confidence: how much the comb beats the average onset (1 = no better than random)
    const conf = mean > 0 ? score / mean : 0;
    // ...and two checks that a noisy or beat-free piece cannot pass by luck: the best phase must stand well above the other
    // phases of the same period (contrast), and the grid must hold in every quarter of the piece (steady), not only on average
    let pm = 0, pc = 0; for (let ph = 0; ph < P; ph += 0.5) { pm += comb(P, ph); pc++; } const contrast = pm > 0 ? score / (pm / pc) : 0;
    let steady = Infinity; const q = (n - start) / 4;
    if (q >= P * 4) for (let k = 0; k < 4; k++) { const a = start + k * q, b = a + q; let m = 0; for (let i = Math.floor(a); i < b && i < n; i++) m += env[i]; m /= q; steady = Math.min(steady, m > 0 ? comb(P, phase, a, b) / m : 0); }
    else steady = conf;
    const beats = []; for (let x = phase; x < n; x += P) beats.push(x);
    // downbeat: the beat of the bar with the strongest accent. Peaks are taken over a small window around each beat (a
    // fractional beat position, e.g. 11.25 frames per beat at 160 BPM, must not sample the onset half-way down its slope)
    const peak = (x) => { let m = 0; for (let i = Math.max(0, Math.floor(x) - 1); i <= Math.min(n - 1, Math.ceil(x) + 2); i++) { const f = feats[i]; m = Math.max(m, (f.level || 0) + (f.bass || 0) + (f.flux || 0) + bass[i] + env[i]); } return m; };
    let down = 0, dBest = -1; for (let d = 0; d < 4; d++) { let s = 0, c = 0; for (let k = d; k < beats.length; k += 4) if (beats[k] >= start) { s += peak(beats[k]); c++; } s = c ? s / c : 0; if (s > dBest) { dBest = s; down = d; } }
    // hits: the share of beats with a real onset on them (a slow pad change every few seconds lines up with a fast comb now
    // and then, but leaves most of its beats empty)
    let hit = 0, hc = 0; for (const x of beats) { if (x < start) continue; let m = 0; for (let i = Math.max(0, Math.floor(x) - 1); i <= Math.min(n - 1, Math.ceil(x) + 1); i++) m = Math.max(m, env[i]); hc++; if (m > 2 * mean) hit++; }
    const hits = hc ? hit / hc : 0;
    const isBeat = conf > 1.6 && contrast > 1.5 && steady > 1.3 && hits > 0.65;
    return { fps, bpm: (60 * fps) / P, period: P, phase, conf, contrast, steady, hits, isBeat, start, beats, beatTimes: beats.map((b) => b / fps), downbeat: down, downbeats: beats.filter((_, k) => k % 4 === down) };
  }
  // where the music starts: the first frame from which the level stays above a quarter of the piece's loud level for 0.3 s
  // (a near-silent intro gets no cuts and does not count for the beat statistics)
  function musicStart(feats, fps) {
    const lv = feats.map((f) => f.level || 0), s = lv.slice().sort((a, b) => a - b), loud = s[Math.floor(s.length * 0.9)] || 0, thr = loud * 0.25, w = Math.round(fps * 0.3);
    if (!(loud > 0)) return 0;
    for (let i = 0, run = 0; i < lv.length; i++) { run = lv[i] >= thr ? run + 1 : 0; if (run >= w) return Math.max(0, i - w + 1); }
    return 0;
  }

  // ---------- the edit ----------
  const STYLES = { calm: { label: 'Calm', bars: [2, 3, 4] }, pulse: { label: 'Pulse', bars: [1] }, fast: { label: 'Fast', beats: 2 } };
  // energy rise around frame x: louder after than before (and an onset right there) → a good place for a big cut
  function rise(feats, x, fps) {
    const w = Math.round(fps * 0.5), i = Math.round(x); let a = 0, b = 0, na = 0, nb = 0;
    for (let k = Math.max(0, i - w); k < i; k++) { a += feats[k].level || 0; na++; } for (let k = i; k < Math.min(feats.length, i + w); k++) { b += feats[k].level || 0; nb++; }
    return (nb ? b / nb : 0) - (na ? a / na : 0) + 0.5 * ((feats[i] && (feats[i].onset || 0)) || 0);
  }
  // plan → { seed, style, trans, bpm, conf, shots: [{ start, end (frames), art, seed, xfade (frames) }] }
  function plan(feats, { arts, style = 'calm', trans = 'cut', seed = 1, fps = 30, minGap = 0.5, grid = null, pulse = false } = {}) {
    const N = feats.length, rng = mulberry32(seed >>> 0), g = grid || beatGrid(feats, fps), cuts = [], minF = Math.round(minGap * fps), lastHold = fps; // ≥ 1 s last shot
    const S = STYLES[style] || STYLES.calm;
    const beat = !!(g && (g.isBeat !== undefined ? g.isBeat : g.conf > 1.25)), start = g && g.start != null ? g.start : musicStart(feats, fps);
    const from = start - 2; // a near-silent intro is one held shot: no cut before the music starts (2 frames of slack for the onset)
    if (beat) { // a real beat: cut on downbeats (Calm / Pulse) or every 2 beats (Fast)
      if (S.beats) { let k0 = g.downbeat % S.beats; while (k0 < g.beats.length && g.beats[k0] < from) k0 += S.beats; for (let k = k0; k < g.beats.length; k += S.beats) cuts.push(g.beats[k]); }
      else {
        const db = g.downbeats; let k = 0; while (k < db.length && db[k] < from) k++;
        if (k < db.length && start >= fps) cuts.push(db[k]); // the first bar of the music is a cut when there was an intro
        while (k < db.length) { // choose the next cut among the allowed bar lengths; energy rises win, the seed breaks ties
          let pick = null, ps = -1e9; for (const bars of S.bars) { const j = k + bars; if (j >= db.length) continue; const sc = rise(feats, db[j], fps) * 2 + rng() * 0.6; if (sc > ps) { ps = sc; pick = j; } }
          if (pick == null) break; cuts.push(db[pick]); k = pick;
        }
      }
    } else { // no steady beat (speech, ambient, rubato): slower cuts on the strongest onsets and energy rises (phrases), spaced by the style
      const span = { calm: [8, 12], pulse: [4, 7], fast: [2.5, 4] }[style] || [8, 12]; let t = start / fps;
      if (start >= fps) cuts.push(start); // the music starts after a quiet intro: cut there
      for (;;) { const lo = Math.round((t + span[0]) * fps), hi = Math.round((t + span[1]) * fps); if (lo >= N) break; let bi = lo, bs = -1; for (let i = lo; i <= Math.min(hi, N - 1); i++) { const s = (feats[i].onset || 0) + 2 * rise(feats, i, fps) + rng() * 0.05; if (s > bs) { bs = s; bi = i; } } cuts.push(bi); t = bi / fps; }
    }
    // frame-exact, at least minGap apart, none in the first 0.5 s or in a quiet intro, the last shot ≥ 1 s
    const fr = []; let prev = 0;
    for (const c of cuts) { const f = Math.round(c); if (f - prev >= minF && f >= minF && f >= from && N - f >= lastHold) { fr.push(f); prev = f; } }
    // artworks: a shuffled cycle with no immediate repeat; each shot gets its own fresh seed. The order and the seeds come from
    // their own random streams (edit seed + artwork + how many times it has been on screen), not from the cut picking, so
    // changing only the cut style or the transition keeps the same artworks and seeds: the preview keeps its loaded pieces
    const pool = (arts && arts.length ? arts : ['night-river']).slice(), ro = mulberry32((seed ^ 0x9e3779b9) >>> 0); for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(ro() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    const occ = {}, shotSeed = (art) => { occ[art] = (occ[art] || 0) + 1; return hex64(mulberry32(hashStr(`${seed}|${art}|${occ[art]}`))); };
    const shots = []; const bounds = [0, ...fr, N];
    for (let s = 0; s < bounds.length - 1; s++) {
      let art = pool[s % pool.length]; if (shots.length && art === shots[shots.length - 1].art && pool.length > 1) art = pool[(s + 1) % pool.length];
      const len = bounds[s + 1] - bounds[s];
      const sh = { start: bounds[s], end: bounds[s + 1], art, seed: shotSeed(art), xfade: trans === 'xfade' && s > 0 ? Math.max(2, Math.min(8, Math.round(fps * 0.2), Math.floor(len / 3))) : 0 };
      if (trans === 'mix' && s > 0) Object.assign(sh, beatTransition(feats, sh.start, len, g, fps, beat, seed, s, shots[s - 1] && shots[s - 1].tr && shots[s - 1].tr.type));
      shots.push(sh);
    }
    // beat pulse camera: frame numbers of the beats (and which are downbeats), so the zoom is a pure function of the frame
    const pb = pulse && beat && g ? { beats: g.beats.map((x) => Math.round(x)), down: new Set((g.downbeats || []).map((x) => Math.round(x))) } : null;
    return { seed, style, trans, pulse: !!pb, pulseBeats: pb, fps, bpm: g ? +g.bpm.toFixed(1) : 0, conf: g ? +g.conf.toFixed(2) : 0, beat, start, shots, beatTimes: g ? g.beatTimes : [] };
  }
  // ---------- Beat mix: a transition per cut, chosen from the sound at the cut ----------
  // Length: half a beat (a quarter of a bar on slow songs), 4–12 frames, never more than a third of the shot. Kind: a big energy rise
  // gets a hit (zoom punch, flash, glitch); a gentle cut gets a movement (wipe, push, iris, crossfade). Its own random stream
  // (seed + shot number), so changing only the transition keeps the same cuts, artworks and seeds.
  const TR_HIT = ['zoom', 'flash', 'glitch', 'zoom'], TR_MOVE = ['wipe', 'push', 'iris', 'xfade', 'wipe', 'push'];
  function beatTransition(feats, at, len, g, fps, beat, seed, k, prev) {
    const r = mulberry32(hashStr(`${seed}|tr|${k}`)), per = beat && g && g.bpm ? (60 / g.bpm) * fps : fps * 0.5;
    const n = Math.max(4, Math.min(12, Math.round(per * 0.5), Math.floor(len / 3))), f = feats[Math.round(at)] || {}, up = rise(feats, at, fps) - 0.5 * (f.onset || 0); // the loudness change alone (almost every downbeat has an onset)
    const pool = up > 0.12 || r() < 0.25 ? TR_HIT : TR_MOVE; let type = pool[Math.floor(r() * pool.length)];
    if (type === prev) type = pool[(pool.indexOf(type) + 1 + Math.floor(r() * (pool.length - 1))) % pool.length]; // never the same one twice in a row
    return { xfade: n, tr: { type, dir: Math.floor(r() * 4), x: 0.3 + r() * 0.4, y: 0.3 + r() * 0.4 } }; // dir: from the left, right, top, bottom; x, y: the iris centre
  }
  const shotAt = (p, i) => { const sh = p.shots; let lo = 0, hi = sh.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (sh[m].start <= i) lo = m; else hi = m - 1; } return lo; };

  // ---------- compositor: draws the current shot's artwork into one stable canvas ----------
  // Normally two artworks run at once: the shot on screen and the next one, which starts loading as soon as the current shot
  // shows (shots 0 and 1 right away), when the browser is idle. A source counts as ready only once ITS artwork has loaded
  // (its canvas keeps the previous piece while a new one loads). Preview: if a slow artwork is not ready at its cut, the
  // previous artwork keeps moving and the new one fades in when ready; only then does a third artwork run for a while, so the
  // shot after the late one still loads in time (with two slots it could not start until the late one was ready, every later
  // cut missed too, and the new shot's still thumbnail, e.g. Hart's, sat frozen on screen while it loaded). If nothing is
  // ready, the new shot's thumbnail is shown, never a frozen frame of another artwork. Sources that no shot in view needs are
  // closed at once. Export: ready(i) waits, so cuts stay frame-exact.
  function makeMixer(makeSource) {
    const cv = document.createElement('canvas'), g = cv.getContext('2d'); cv.width = cv.height = 2;
    const pool = [makeSource(), makeSource(), makeSource()], slot = new Map(); // shot index → source
    const thumbs = new Map(), thumb = (id) => { if (!thumbs.has(id)) { const nyc = root.GroklyArt && GroklyArt.nycNum(id); if (nyc) { thumbs.set(id, GroklyArt.thumbCanvas(id, () => (dirty = true))); return thumbs.get(id); } const im = new Image(); im.onload = () => (dirty = true); im.src = `art/_thumbs/${id}.jpg`; thumbs.set(id, im); } return thumbs.get(id); }; // NYC pack: a canvas cut from its sprite sheet (complete once drawn)
    const idle = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 300 }) : setTimeout(fn, 0));
    let P = null, W = 540, H = 675, gen = 0, hold = null, exporting = false, dirty = false; // hold: { k: shot that was late, fade: frames into its fade-in }
    // dirty: something new to show (a new edit, or an artwork finished loading). A paused preview redraws only then.
    const isReady = (s, k) => s && s.__ready === `${P.shots[k].art}|${P.shots[k].seed}` && s.canvas.width > 4;
    function start(s, k, now) {
      const x = P.shots[k], key = `${x.art}|${x.seed}`, my = gen; if (s.__want === key) return s.__p; s.__want = key; s.__ready = '';
      const go = () => (my !== gen || s.__want !== key ? Promise.resolve() : s.setup({ id: x.art, seed: x.seed, w: W, h: H }).then(() => { if (s.__want === key) { s.__ready = key; dirty = true; } }).catch(() => {}));
      s.__p = now ? go() : new Promise((r) => idle(() => go().then(r)));
      return s.__p;
    }
    const close = (s) => { s.destroy(); s.__want = s.__ready = ''; s.canvas.width = s.canvas.height = 2; };
    // close the sources of shots that are no longer needed (their iframes are removed, so normally only two stay alive)
    function release(keep) { for (const [kk, s] of [...slot]) if (!keep.has(kk)) { slot.delete(kk); close(s); } }
    function sourceFor(k, keep, now) { // the source for shot k; frees the ones not in `keep` first
      if (k < 0 || k >= P.shots.length) return null;
      release(keep);
      if (slot.has(k)) { const s = slot.get(k); start(s, k, now); return s; }
      const used = new Set(slot.values()), s = pool.find((x) => !used.has(x)); if (!s) return null;
      slot.set(k, s); start(s, k, now); return s;
    }
    // cover: object-fit cover, times the camera zoom (beat pulse) and an optional extra scale / offset (transitions), about the centre
    let zoom = 1;
    const cover = (c, a, k = 1, dx = 0, dy = 0) => { const w = c.naturalWidth || c.width, h = c.naturalHeight || c.height; if (!w || w < 4) return false; const sc = Math.max(cv.width / w, cv.height / h) * zoom * k; g.globalAlpha = a; g.drawImage(c, (cv.width - w * sc) / 2 + dx, (cv.height - h * sc) / 2 + dy, w * sc, h * sc); g.globalAlpha = 1; return true; };
    const io = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), out3 = (x) => 1 - Math.pow(1 - x, 3);
    // one transition frame, p in (0, 1]: a from the previous shot, b the new one. Always drawn from the two pictures (never through black)
    function transition(a, b, p, tr, i) {
      const W = cv.width, H = cv.height, t = tr.type, e = io(p);
      if (t === 'wipe' || t === 'push') {
        const hz = tr.dir < 2, sg = tr.dir % 2 ? -1 : 1, D = hz ? W : H, m = e * D; // the new picture comes in from one side
        if (t === 'push') { const o = sg * m; cover(a, 1, 1, hz ? o : 0, hz ? 0 : o); cover(b, 1, 1, hz ? o - sg * D : 0, hz ? 0 : o - sg * D); return; }
        cover(a, 1); g.save(); g.beginPath(); if (hz) g.rect(sg > 0 ? 0 : W - m, 0, m, H); else g.rect(0, sg > 0 ? 0 : H - m, W, m); g.clip(); cover(b, 1); g.restore();
        g.save(); g.globalAlpha = 0.85 * Math.sin(Math.PI * p); g.fillStyle = '#fff'; const lw = Math.max(2, D * 0.006); if (hz) g.fillRect(sg > 0 ? m - lw / 2 : W - m - lw / 2, 0, lw, H); else g.fillRect(0, sg > 0 ? m - lw / 2 : H - m - lw / 2, W, lw); g.restore(); return;
      }
      if (t === 'iris') { const cx = tr.x * W, cy = tr.y * H, R = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) * out3(p); cover(a, 1, 1 + 0.04 * p); g.save(); g.beginPath(); g.arc(cx, cy, Math.max(0.5, R), 0, 7); g.clip(); cover(b, 1, 1.06 - 0.06 * p); g.restore(); return; }
      if (t === 'zoom') { // punch in: the old picture rushes forward and fades, the new one lands from slightly bigger, a short flash on the hit
        cover(a, 1, 1 + 0.35 * e); cover(b, Math.min(1, p * 1.8), 1.18 - 0.18 * out3(p));
        g.save(); g.globalAlpha = 0.55 * Math.pow(1 - p, 2.5); g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); g.restore(); return;
      }
      if (t === 'flash') { const f = p < 0.5 ? p * 2 : (1 - p) * 2; cover(p < 0.5 ? a : b, 1, 1 + 0.03 * f); g.save(); g.globalAlpha = Math.min(1, f * 1.15); g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); g.restore(); return; }
      if (t === 'glitch') { // horizontal slices switch to the new picture one by one, displaced while they switch (a pure function of the frame)
        const N = 14, hh = H / N, amp = W * 0.06 * Math.sin(Math.PI * p);
        cover(a, 1);
        for (let k = 0; k < N; k++) { const hsh = ((Math.imul(k + 1, 2654435761) ^ Math.imul(i + 7, 40503)) >>> 0) / 4294967296, on = hsh < p * 1.25 - 0.1; const sh = (hsh - 0.5) * 2 * amp;
          g.save(); g.beginPath(); g.rect(0, k * hh, W, hh + 1); g.clip(); if (on) cover(b, 1, 1, sh, 0); else if (Math.abs(sh) > amp * 0.6) cover(a, 1, 1, sh, 0); g.restore(); }
        if (p < 0.85) { g.save(); g.globalCompositeOperation = 'screen'; g.globalAlpha = 0.25 * Math.sin(Math.PI * p); cover(b, 1, 1, amp * 0.35, 0); g.restore(); }
        return;
      }
      cover(a, 1); cover(b, p); // xfade
    }
    // beat pulse: a small zoom on each beat (bigger on the downbeat) that settles in ~0.3 s
    function pulseAt(i) { const B = P && P.pulseBeats; if (!B || !B.beats.length) return 1; let lo = 0, hi = B.beats.length - 1; if (B.beats[0] > i) return 1;
      while (lo < hi) { const m = (lo + hi + 1) >> 1; if (B.beats[m] <= i) lo = m; else hi = m - 1; } const b0 = B.beats[lo], dt = (i - b0) / (P.fps || 30);
      return 1 + (B.down.has(b0) ? 0.045 : 0.022) * Math.exp(-dt * 9); }
    return {
      canvas: cv,
      // a new edit. Sources already running the new edit's first two shots (same artwork and seed, e.g. after a change of cut
      // style or transition) are kept instead of being closed and reloaded; the last picture stays until the new one is ready
      setPlan(p, w, h) {
        const sameSize = w === W && h === H && cv.width === w && cv.height === h;
        P = p; W = w; H = h; gen++; hold = null; exporting = false; dirty = true; if (!sameSize) { cv.width = w; cv.height = h; }
        const keepS = new Map(); slot.clear();
        if (sameSize && P && P.shots.length) for (const k of [0, 1]) { if (k >= P.shots.length) break; const key = `${P.shots[k].art}|${P.shots[k].seed}`, s = pool.find((x) => x.__want === key && ![...keepS.values()].includes(x)); if (s) { keepS.set(k, s); if (s.__ready !== key) s.__want = ''; } }
        for (const s of pool) if (![...keepS.values()].includes(s)) close(s);
        for (const [k, s] of keepS) slot.set(k, s);
        if (!keepS.has(0)) g.clearRect(0, 0, cv.width, cv.height); // a new edit never shows the previous edit's picture of another artwork
        if (P && P.shots.length) { sourceFor(0, new Set([0, 1]), true); for (const x of P.shots) thumb(x.art); } // the next shot loads at Play (warm) or in the export
      },
      get plan() { return P; },
      // export: shot k's artwork is fully loaded before its first frame; the next one loads meanwhile (and keeps stepping is not needed:
      // each shot starts from its own warmed-up first frame)
      async ready(i) {
        if (!P || !P.shots.length) return; exporting = true; const k = shotAt(P, i), x = P.shots[k], fading = x.xfade && k > 0 && i < x.start + x.xfade;
        const keep = new Set(fading ? [k - 1, k, k + 1] : [k, k + 1]); const s = sourceFor(k, keep, true); if (s) await start(s, k, true);
        sourceFor(k + 1, keep, true); // same set as frame() keeps, so a source is never closed and reopened between the two
      },
      // one frame: step the visible artwork(s) and compose
      // still: a paused preview. Nothing is stepped (an artwork costs main-thread time on every step); the artworks' last frames
      // are composed again, which is cheap. Call it only when `dirty` says there is something new to show.
      frame(i, f, t, still = false) {
        if (!P || !P.shots.length) return; const k = shotAt(P, i), x = P.shots[k];
        const fading = x.xfade && k > 0 && i < x.start + x.xfade; zoom = pulseAt(i);
        const curReady0 = slot.has(k) && isReady(slot.get(k), k), late = !still && hold && hold.k === k && hold.fade < 8;
        // keep the previous shot alive while the current one is not ready (preview), during a crossfade, or while a late
        // artwork fades in over it; the next shot always loads meanwhile, so one late artwork never delays the cuts after it
        // the next shot: in the preview the last shot is followed by shot 0, because playback starts over from the top (without
        // this, shot 0 was closed and reloaded on every replay, showing its still thumbnail, e.g. Hart's, for ~0.6 s)
        const n = P.shots.length, next = k + 1 < n ? k + 1 : exporting ? -1 : 0;
        const needPrev = k > 0 && !still && (fading || !curReady0 || late);
        const keep = new Set(needPrev ? [k - 1, k, next] : [k, next]);
        const cur = sourceFor(k, keep, true), prev = needPrev ? slot.get(k - 1) : null; // the shot on screen loads now
        if (next >= 0 && next !== k && !still) sourceFor(next, keep); // the next shot loads when the browser is idle (not while paused: editing stays light)
        const curReady = isReady(cur, k), prevReady = prev && isReady(prev, k - 1);
        if (still) hold = null; else { if (curReady) cur.step(f, t); if (prevReady) prev.step(f, t); }
        if (curReady) dirty = false;
        if (!curReady) { // not loaded yet: keep the previous artwork moving, or show this shot's thumbnail
          hold = { k, fade: 0 };
          if (prevReady) cover(prev.canvas, 1); else { const im = thumb(x.art); if (im.complete) { cover(im, 1); if (still) dirty = false; } }
          return;
        }
        if (fading && prevReady) { const a = (i - x.start + 1) / (x.xfade + 1); if (x.tr) transition(prev.canvas, cur.canvas, a, x.tr, i); else { cover(prev.canvas, 1); cover(cur.canvas, a); } return; } // crossfade / Beat mix, never through black
        if (late) { hold.fade++; if (prevReady) cover(prev.canvas, 1); else { const im = thumb(x.art); if (im.complete) cover(im, 1); } cover(cur.canvas, hold.fade / 8); return; } // late artwork: soft fade-in
        hold = null; if (zoom !== 1) g.clearRect(0, 0, cv.width, cv.height); cover(cur.canvas, 1);
      },
      shotAt: (i) => (P ? shotAt(P, i) : 0),
      get dirty() { return dirty; },
      // preview: is the artwork of the shot at frame i loaded? warm(i) loads it now (and the next one when idle), so Play can wait
      // for the first shot instead of starting on its still thumbnail
      readyAt(i) { if (!P || !P.shots.length) return true; const k = shotAt(P, i); return slot.has(k) && isReady(slot.get(k), k); },
      warm(i) { if (!P || !P.shots.length) return Promise.resolve(); const k = shotAt(P, i), n = P.shots.length, nx = k + 1 < n ? k + 1 : 0, keep = new Set([k, nx]); const s = sourceFor(k, keep, true); if (nx !== k) sourceFor(nx, keep); return s ? start(s, k, true) : Promise.resolve(); },
      alive: () => pool.filter((s) => s.key).length,
      destroy() { gen++; for (const s of pool) close(s); slot.clear(); g.clearRect(0, 0, cv.width, cv.height); },
    };
  }
  const TRANS = { cut: 'Hard cut', xfade: 'Short crossfade', mix: 'Beat mix' };
  const api = { beatGrid, plan, shotAt, makeMixer, STYLES, TRANS, mulberry32 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.GroklyMV = api;
})(typeof window !== 'undefined' ? window : globalThis);
