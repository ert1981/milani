// Grokly background music: the founder's generative piano engine (music3.js) under the user's voice.
//
// Preview: a live Music3 on the app's AudioContext, faded in at the start of playback and out after the voice ends;
//          Generate while playing crossfades to the new piece.
// Export:  the music is rendered OFFLINE and deterministically: an OfflineAudioContext is suspended every TICK_MS of
//          render time and the engine's scheduler is stepped by hand (m.tick()), exactly as its timer would in real time.
//          No wall clock is involved, so the same seed + energy + length always gives the same samples. The music is then
//          mixed under the voice (same sample rate, sample-accurate) with a fade-in and a fade-out tail of TAIL seconds.
// Level:   the music sits `db` dB (default −16) below the voice's speech level (RMS of the active frames), so the voice
//          stays clearly on top whatever the recording level.
// Art:     the export's sound features (E.analyze) are taken from the MIX, so the artwork moves with the music too;
//          subtitles are timed text and are not affected. GroklyMusic.feats() gives the same mixed features to the preview.
(() => {
  const KEY = 'grokly.music', TAIL = 2, FADE_IN = 1, XFADE = 1.2, DEF_DB = -16, DEF_EN = 0.35, MIN_DB = -30, MAX_DB = -6;
  // RMS of the engine's mono render at volume 1 (measured: 0.0041–0.0063 over seeds, 60 s, energy 0.35): the level
  // reference. Live preview is stereo, whose channels are ~1 dB louder than the mono down-mix, hence LIVE_TRIM.
  const MUSIC_RMS = 0.0052, LIVE_TRIM = 0.89;
  const rndSeed = () => (Math.random() * 1e6) | 0;
  const store = { get() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } }, set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} } };

  const sv = store.get(), num = (x, a, b, d) => (typeof x === 'number' && x >= a && x <= b ? x : d);
  const st = { on: false /* founder: music is always Off when the app opens */, seed: num(sv.seed, 0, 999999, rndSeed()), hist: Array.isArray(sv.hist) ? sv.hist.filter((x) => num(x, 0, 999999, -1) >= 0).slice(-20) : [],
    db: num(sv.db, MIN_DB, MAX_DB, DEF_DB), energy: num(sv.energy, 0, 1, DEF_EN) };
  const save = () => store.set(st);

  // ---------- levels ----------
  const lvlCache = new WeakMap();
  function voiceLevel(pcm) { // RMS of the louder half of the frames that hold sound (speech level, not diluted by pauses)
    if (lvlCache.has(pcm)) return lvlCache.get(pcm);
    const N = 2048, r = [];
    for (let a = 0; a + N <= pcm.length; a += N) { let s = 0; for (let i = a; i < a + N; i++) s += pcm[i] * pcm[i]; r.push(s / N); }
    const act = r.filter((x) => x > 1e-5).sort((a, b) => b - a), top = act.slice(0, Math.max(1, Math.ceil(act.length / 2)));
    const v = act.length ? Math.sqrt(top.reduce((s, x) => s + x, 0) / top.length) : 0.1;
    lvlCache.set(pcm, v); return v;
  }
  // Audio C: the piece's own level (RMS over the voice section of the rendered music, unit gain) once it has been rendered;
  // MUSIC_RMS (the average over seeds, ±2 dB) only until then (live preview before the first render)
  const pieceRms = new Map(); // `${seed}|${energy}` → measured RMS
  function rmsOf(mus, n, fin) { let s = 0; const m = Math.min(n, mus.length); for (let i = 0; i < m; i++) { const v = i < fin ? (mus[i] * i) / fin : mus[i]; s += v * v; } return m ? Math.sqrt(s / m) : 0; } // as heard: with the fade-in
  const musicGain = (pcm, rms = pieceRms.get(`${st.seed}|${st.energy}`) || MUSIC_RMS) => (voiceLevel(pcm) * Math.pow(10, st.db / 20)) / Math.max(1e-5, rms);

  // ---------- offline render (deterministic) ----------
  // The engine's sound has no content above ~10 kHz (felt-piano lowpass ≤ 9 kHz, reverb lowpass 3.6 kHz, pad/wind
  // lowpassed lower; measured: energy above 10 kHz ≈ −95 dB), so it is rendered at half the rate and upsampled ×2 with a
  // windowed-sinc half-band filter: ~4× faster (about 10× real time on a slow 2-core machine), same music.
  async function renderRaw(len, sr, seed, energy) {
    const off = new OfflineAudioContext(1, len, sr); // mono, like the app's audio: the stereo engine is down-mixed
    const m = new Music3({ seed, energy, volume: 1, wind: 0.3, autoNext: false, ctx: off, destination: off.destination, offline: true });
    await m.start();
    // the engine's own scheduler step, driven on render time: suspend → tick → resume, every TICK_MS
    const step = Music3.TICK_MS / 1000, dur = len / sr;
    for (let k = 1; k * step < dur - 0.01; k++) off.suspend(k * step).then(() => { m.tick(); off.resume(); });
    return (await off.startRendering()).getChannelData(0);
  }
  const HB = 32, hb = new Float32Array(HB); // half-band taps (one side), Blackman-windowed sinc
  for (let k = 0; k < HB; k++) { const x = k + 0.5, n = (x + HB) / (2 * HB); hb[k] = (Math.sin(Math.PI * x) / (Math.PI * x)) * (0.42 - 0.5 * Math.cos(2 * Math.PI * n) + 0.08 * Math.cos(4 * Math.PI * n)); }
  function up2(x, len) {
    const y = new Float32Array(len), n = x.length;
    for (let i = 0; 2 * i < len; i++) {
      y[2 * i] = x[i]; if (2 * i + 1 >= len) break;
      let s = 0; for (let k = 0; k < HB; k++) { const a = i - k, b = i + 1 + k; s += hb[k] * ((a >= 0 ? x[a] : 0) + (b < n ? x[b] : 0)); }
      y[2 * i + 1] = s;
    }
    return y;
  }
  async function renderMusic(len, sr, seed, energy) {
    if (sr % 2 || sr < 32000) return renderRaw(len, sr, seed, energy);
    return up2(await renderRaw(Math.ceil(len / 2) + HB, sr / 2, seed, energy), len);
  }
  let musicCache = null; // { key, p }: the last render (or the one in progress, so export and preview share it)
  function musicFor(len, sr, seed, energy) {
    const key = `${seed}|${energy}|${len}|${sr}`;
    if (!musicCache || musicCache.key !== key) { const c = { key, p: renderMusic(len, sr, seed, energy) }; musicCache = c; c.p.catch(() => { if (musicCache === c) musicCache = null; }); }
    return musicCache.p;
  }
  const mixKey = (pcm, sr) => `${st.seed}|${st.energy}|${st.db}|${pcm.length}|${sr}`;
  let mixCache = null; // { pcm, key, mix, feats }
  // voice (Float32Array at sr) → voice + music, TAIL seconds longer, fades in over FADE_IN s and out over the tail
  async function mix(pcm, sr, signal) { // signal (team A): { cancelled } — an export's Cancel stops the mix before its own work
    const key = mixKey(pcm, sr);
    if (mixCache && mixCache.pcm === pcm && mixCache.key === key) return mixCache.mix;
    const n = pcm.length, tail = Math.round(TAIL * sr), total = n + tail, fin = Math.round(FADE_IN * sr);
    if (signal && signal.cancelled) throw new Error('cancelled'); // team A: abort
    const mus = await musicFor(total, sr, st.seed, st.energy), rms = rmsOf(mus, n, fin); if (signal && signal.cancelled) throw new Error('cancelled'); /* team A: abort */ if (rms > 1e-5) pieceRms.set(`${st.seed}|${st.energy}`, rms); // Audio C: measured level
    const g = musicGain(pcm, rms > 1e-5 ? rms : MUSIC_RMS), out = new Float32Array(total);
    let peak = 0;
    for (let i = 0; i < total; i++) {
      const env = i < fin ? i / fin : i < n ? 1 : 0.5 + 0.5 * Math.cos((Math.PI * (i - n)) / tail);
      const v = (i < n ? pcm[i] : 0) + mus[i] * g * env; out[i] = v; const a = v < 0 ? -v : v; if (a > peak) peak = a;
    }
    if (peak > 0.98) { const k = 0.98 / peak; for (let i = 0; i < total; i++) out[i] *= k; } // never clip; only when the voice is already near full scale
    mixCache = { pcm, key, mix: out, feats: null };
    return out;
  }
  // Mixed sound features for the preview, when ready for the current settings; null meanwhile (the caller keeps the voice's).
  // Computed in the background (debounced), never while the preview plays.
  let featsTimer = 0, featsBusy = false, featsWant = null;
  function feats(pcm, fps = 30) {
    if (!st.on || !pcm) return null;
    const sr = window.GroklyEngine.SR, key = mixKey(pcm, sr);
    if (mixCache && mixCache.pcm === pcm && mixCache.key === key && mixCache.feats) return mixCache.feats;
    featsWant = { pcm, fps };
    if (!featsBusy && !featsTimer) featsTimer = setTimeout(computeFeats, 700);
    return null;
  }
  async function computeFeats() {
    featsTimer = 0;
    if (cur || !featsWant || !st.on) { if (cur && featsWant) featsTimer = setTimeout(computeFeats, 1500); return; }
    const { pcm, fps } = featsWant; featsBusy = true;
    try {
      const sr = window.GroklyEngine.SR, key = mixKey(pcm, sr), m = await mix(pcm, sr);
      if (mixCache && mixCache.mix === m && mixKey(pcm, sr) === key) mixCache.feats = window.GroklyEngine.analyze(m, fps);
    } catch (e) { console.warn('Grokly music: preview analysis failed', e); }
    finally { featsBusy = false; }
  }

  // ---------- live preview ----------
  let cur = null;  // the playback in progress: { ac, t0, pcm } (also while music is off, so turning it on joins in)
  let live = null; // { ac, bus, pcm, end, players: [{ m, env }] }
  function addPlayer(when, fadeIn) {
    const { ac } = live, env = ac.createGain(); env.connect(live.bus);
    const m = new Music3({ seed: st.seed, energy: st.energy, volume: 1, wind: 0.3, autoNext: false, ctx: ac, destination: env });
    const g = env.gain; g.setValueAtTime(0, when); g.linearRampToValueAtTime(1, when + fadeIn);
    if (live.end > when + fadeIn) { g.setValueAtTime(1, live.end); g.linearRampToValueAtTime(0, live.end + TAIL); }
    m.start().catch((e) => console.warn('Grokly music: preview could not start', e));
    live.players.push({ m, env });
  }
  function retire(p, fade) {
    const now = p.env.context.currentTime, g = p.env.gain;
    if (g.cancelAndHoldAtTime) g.cancelAndHoldAtTime(now); else { g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); }
    g.linearRampToValueAtTime(0, now + fade);
    setTimeout(() => { try { p.m.stop(); } catch {} }, fade * 1000 + 50);
    setTimeout(() => { try { p.env.disconnect(); } catch {} }, fade * 1000 + 2600);
  }
  function goLive(when, fadeIn) {
    const { ac, t0, pcm } = cur, end = t0 + pcm.length / window.GroklyEngine.SR;
    if (!st.on || !window.Music3 || when > end + TAIL - 0.3) return;
    const bus = ac.createGain(); bus.gain.value = musicGain(pcm) * LIVE_TRIM; bus.connect(ac.destination);
    live = { ac, bus, pcm, end, players: [] };
    addPlayer(when, fadeIn);
  }
  function endLive(fade) {
    if (!live) return;
    const l = live; live = null;
    for (const p of l.players) retire(p, fade);
    setTimeout(() => { try { l.bus.disconnect(); } catch {} }, fade * 1000 + 2800);
  }
  // ac: the app's AudioContext; t0: when the voice starts; pcm: the voice being played (music starts with it, at the trim start)
  function startPreview(ac, t0, pcm) {
    stopPreview();
    if (!ac || !pcm) return;
    cur = { ac, t0, pcm };
    goLive(t0, FADE_IN);
  }
  function stopPreview() { cur = null; endLive(0.08); }
  function crossfade() { // the current piece fades out while the new one fades in
    if (!cur) return;
    const now = cur.ac.currentTime;
    if (!live) return goLive(now, XFADE);
    if (now > live.end + TAIL) return;
    live.players.splice(0).forEach((p) => retire(p, XFADE));
    addPlayer(now, XFADE);
  }

  // ---------- controls ----------
  function setOn(on) {
    st.on = !!on; save();
    if (!st.on) endLive(0.4); else if (cur && !live) goLive(cur.ac.currentTime, FADE_IN);
    render();
  }
  function generate() { st.hist.push(st.seed); st.hist = st.hist.slice(-20); st.seed = rndSeed(); st.on = true; save(); crossfade(); render(); }
  function back() { if (!st.hist.length) return; st.seed = st.hist.pop(); save(); crossfade(); render(); }
  function setDb(db) { st.db = Math.max(MIN_DB, Math.min(MAX_DB, Math.round(db))); save(); if (live) live.bus.gain.setTargetAtTime(musicGain(live.pcm) * LIVE_TRIM, live.ac.currentTime, 0.08); render(); }
  function setEnergy(e) { st.energy = Math.max(0, Math.min(1, e)); save(); if (live) live.players.forEach((p) => p.m.setEnergy(st.energy)); }

  let ui = null;
  function mount(box) {
    if (!box) return;
    box.innerHTML = `
      <div class="note">Put calm, generative piano music under your voice: for a poem, a recitation or words from the heart. Each piece is new. Don't like it? Press Generate.</div>
      <div class="seg" id="bgmOn" role="group" aria-label="Background music"><button data-v="off">Off</button><button data-v="on">On</button></div>
      <div class="row bgm-row"><button class="btn small" id="bgmGen" type="button">Generate</button><button class="btn small" id="bgmBack" type="button">Back</button><span class="bgm-piece" id="bgmPiece"></span></div>
      <label class="slider" for="bgmVol">Music level <b id="bgmVolVal"></b><input type="range" id="bgmVol" min="${MIN_DB}" max="${MAX_DB}" step="1"></label>
      <label class="slider" for="bgmEnergy">Energy <b>calm ↔ flowing</b><input type="range" id="bgmEnergy" min="0" max="100" step="1"></label>`;
    if (!document.getElementById('bgmStyle')) {
      const s = document.createElement('style'); s.id = 'bgmStyle';
      s.textContent = '.bgm-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.bgm-piece{font:500 13px/1.2 var(--body);color:var(--soft);font-variant-numeric:tabular-nums}.bgm-off .bgm-dim{opacity:.55}';
      document.head.append(s);
    }
    const q = (id) => box.querySelector('#' + id);
    ui = { box, on: q('bgmOn'), gen: q('bgmGen'), back: q('bgmBack'), piece: q('bgmPiece'), vol: q('bgmVol'), volVal: q('bgmVolVal'), en: q('bgmEnergy') };
    [ui.vol.parentElement, ui.en.parentElement, ui.back.parentElement].forEach((x) => x.classList.add('bgm-dim'));
    ui.on.onclick = (e) => { const b = e.target.closest('button'); if (b) setOn(b.dataset.v === 'on'); };
    ui.gen.onclick = generate; ui.back.onclick = back;
    ui.vol.oninput = (e) => setDb(+e.target.value);
    ui.en.oninput = (e) => setEnergy(e.target.value / 100);
    render();
  }
  function render() {
    if (!ui) return;
    [...ui.on.children].forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.v === 'on') === st.on)));
    ui.box.classList.toggle('bgm-off', !st.on);
    ui.piece.textContent = `Piece #${st.seed}`; ui.back.disabled = !st.hist.length;
    ui.vol.value = st.db; ui.volVal.textContent = `${String(st.db).replace('-', '−')} dB under the voice`;
    ui.en.value = Math.round(st.energy * 100);
  }

  window.GroklyMusic = {
    get on() { return st.on; }, get seed() { return st.seed; }, get db() { return st.db; }, get energy() { return st.energy; }, TAIL,
    mount, setOn, generate, back, setDb, setEnergy, startPreview, stopPreview, mix, feats, renderMusic, voiceLevel,
    tailSamples: (sr) => (st.on ? Math.round(TAIL * sr) : 0),
    get playing() { return live ? live.players.length : 0; }, // tests / debugging
    _setSeed(s) { st.seed = s | 0; save(); render(); } // tests
  };
  const box = document.getElementById('musicBox');
  if (box) mount(box); else document.addEventListener('DOMContentLoaded', () => mount(document.getElementById('musicBox')));
})();
