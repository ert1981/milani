// music-3 — generative ambient piano engine extracted from «بیس ۸» (In the Embrace of the Wind).
// Felt piano + breathing stereo pad + soft wind + restrained sub + convolution reverb, D minor.
//
// The music follows a slow, seeded "gust" field: in gusts the phrases rise, quicken and brighten
// like branches lifting; in lulls they thin out into long breaths where only pad and wind remain.
// Melodies are shaped phrases (rise, fall, resolve to a chord tone) separated by rests, and a
// remembered motif returns now and then so the ear has something to hold on to.
//
// Usage:
//   const m = new Music3({ seed: 1234, volume: 0.85 });
//   await m.start();       // call from a user gesture (click/tap) so the AudioContext may start
//   m.next();              // crossfade into a new piece
//   m.setVolume(0.5);      // 0..1
//   m.setEnergy(0.7);      // 0..1 (default 0.35): denser, louder, brighter playing
//   m.setWind(0.4);        // 0..1 (default 0.3): level of the wind texture
//   m.accent();            // one soft rolled chord + reverb swell
//   m.stop();              // fade out; start() may be called again afterwards
//   m.analyser             // AnalyserNode for visuals, stays the same across next()
//   m.gust                 // 0..1, current wind strength, for visuals
//   m.onNote = (v) => {};  // fires in time with each melody note, v ≈ 0.2..0.7
//
// Each piece ends after its form cycle (8–14 min): the last phrases thin out, then the engine
// crossfades into the next piece by itself. Pass autoNext: false to loop the form instead.
//
// Options: seed, volume, energy, wind, autoNext, onNote, ctx (shared AudioContext), destination (AudioNode).
//
// Grokly hook (added, sound unchanged): offline: true lets the engine run inside an OfflineAudioContext.
// No timers are used then; the host calls m.tick() at each simulated scheduler step (every TICK_MS of
// render time, e.g. from ctx.suspend(t) callbacks), so the same seed always renders the same audio.

const CHORDS = {
  Dm: { root: 50, pad: [0, 3, 7, 14], next: [['Bb', 0.36], ['F', 0.2], ['Gm', 0.18], ['Am', 0.1], ['C', 0.06], ['Dm', 0.1]] },
  Bb: { root: 46, pad: [0, 4, 7, 11], next: [['Dm', 0.35], ['F', 0.3], ['Gm', 0.2], ['C', 0.1], ['Am', 0.05]] },
  F:  { root: 41, pad: [0, 4, 7, 14], next: [['Dm', 0.3], ['C', 0.25], ['Bb', 0.25], ['Am', 0.1], ['Gm', 0.1]] },
  C:  { root: 48, pad: [0, 4, 7, 11], next: [['Dm', 0.45], ['Bb', 0.2], ['Am', 0.15], ['F', 0.15], ['Gm', 0.05]] },
  Gm: { root: 43, pad: [0, 3, 7, 10], next: [['Dm', 0.4], ['Bb', 0.3], ['F', 0.1], ['C', 0.1], ['Am', 0.1]] },
  Am: { root: 45, pad: [0, 3, 7, 10], next: [['Dm', 0.4], ['F', 0.3], ['Bb', 0.2], ['Gm', 0.1]] }
};

// D natural minor, the melody's pitch set (A3..D6).
const SCALE_PC = new Set([2, 4, 5, 7, 9, 10, 0]);
const SCALE = [];
for (let m = 57; m <= 86; m++) if (SCALE_PC.has(m % 12)) SCALE.push(m);
const MEL_LO = 0, MEL_HI = SCALE.indexOf(81); // keep melody ≤ A5; higher gets piercing

// Song form. The cycle length varies per piece (8–14 min) so the arc never becomes predictable.
//   ioi: seconds between notes · rest: breath between phrases · chord: seconds per chord
//   reg: register offset (semitones) · vel: velocity offset
const FORMS = {
  intro:  { name: 'intro',  ioi: 0.95, rest: 1.6, chord: 12,  reg: -2, vel: -2, pad: 0.05, padHz: 760,  sub: 0.004 },
  dev:    { name: 'dev',    ioi: 0.78, rest: 1.1, chord: 9,   reg: 0,  vel: 0,  pad: 0.09, padHz: 1050, sub: 0.006 },
  climax: { name: 'climax', ioi: 0.62, rest: 0.8, chord: 7.5, reg: 3,  vel: 4,  pad: 0.13, padHz: 1350, sub: 0.014 },
  decay:  { name: 'decay',  ioi: 0.9,  rest: 1.8, chord: 12,  reg: -3, vel: -3, pad: 0.07, padHz: 900,  sub: 0.005 }
};
const formAt = (t, cycle) => {
  const c = (t % cycle) / cycle;
  return c < 0.2 ? FORMS.intro : c < 0.5 ? FORMS.dev : c < 0.7 ? FORMS.climax : FORMS.decay;
};

// [frequency multiple, level] — slightly stretched upper partials for a felt-piano colour.
const PARTIALS = [[1, 1], [2, 0.2], [3, 0.08], [4.02, 0.03], [5.4, 0.01]];

const LOOKAHEAD = 1.5;   // seconds of audio scheduled ahead
const TICK_MS = 180;     // scheduler interval
const ENDING = 18;       // no new phrases this close to the end, leaving ~10 s of pad-only close

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const clamp01 = (v, fallback) => {
  const n = Number(v);
  return v == null || !Number.isFinite(n) ? fallback : clamp(n, 0, 1);
};

// mulberry32
function makeRng(seed) {
  let s = seed | 0;
  return () => {
    s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function pickWeighted(list, rnd) {
  const r = rnd();
  let acc = 0;
  for (const [k, p] of list) { acc += p; if (r <= acc) return k; }
  return list[list.length - 1][0];
}

// Smooth 1-D value noise, seeded.
function makeNoise(seed) {
  const fr = (v) => v - Math.floor(v);
  const h = (x) => fr(Math.sin((x + seed * 0.0013) * 127.1) * 43758.5453);
  return (x) => {
    const i = Math.floor(x), t = x - i, u = t * t * (3 - 2 * t);
    return h(i) * (1 - u) + h(i + 1) * u;
  };
}

// Wind strength 0..1: a 28 s sway over a 95 s swell, so gusts arrive slowly and lulls last.
function gustAt(M, el) {
  const raw = 0.6 * M.noise(el / 28) + 0.4 * M.noise(el / 95 + 50);
  const g = clamp((raw - 0.2) / 0.62, 0, 1);
  return g * g * (3 - 2 * g);
}

const nearestIdx = (midi) => {
  let best = 0;
  for (let i = 1; i < SCALE.length; i++) if (Math.abs(SCALE[i] - midi) < Math.abs(SCALE[best] - midi)) best = i;
  return best;
};

// Nearest scale index (within the melody range) whose pitch belongs to the chord.
function snapToChord(idx, ch) {
  const pcs = new Set(ch.pad.map((iv) => (ch.root + iv) % 12));
  for (let d = 0; d <= 3; d++) {
    for (const j of [idx - d, idx + d]) {
      if (j >= MEL_LO && j <= MEL_HI && pcs.has(SCALE[j] % 12)) return j;
    }
  }
  return clamp(idx, MEL_LO, MEL_HI);
}

// Reverb impulse, hammer-noise burst and a seamless pink-ish noise loop for the wind.
// Uses its own RNG so it does not shift the note sequence of the piece being generated.
function buildBuffers(ctx, seed) {
  const rnd = makeRng(seed ^ 0x5bd1e995);
  const sr = ctx.sampleRate;
  const buf = ctx.createBuffer(2, Math.floor(sr * 3.4), sr);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < d.length; i++) {
      const u = i / d.length;
      d[i] = (rnd() * 2 - 1) * Math.pow(1 - u, 2.6) * (1 - u * 0.2);
    }
  }
  const hammer = ctx.createBuffer(1, Math.floor(sr * 0.05), sr);
  const hd = hammer.getChannelData(0);
  for (let i = 0; i < hd.length; i++) hd[i] = (rnd() * 2 - 1) * (1 - i / hd.length);

  const N = Math.floor(sr * 8), F = Math.floor(sr * 0.5);
  const x = new Float32Array(N + F);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < x.length; i++) {
    const w = rnd() * 2 - 1;
    b0 = 0.99765 * b0 + w * 0.099046; b1 = 0.963 * b1 + w * 0.2965164; b2 = 0.57 * b2 + w * 1.0526913;
    x[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2;
  }
  const noise = ctx.createBuffer(1, N, sr);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < N; i++) nd[i] = i < F ? x[i] * (i / F) + x[N + i] * (1 - i / F) : x[i];

  return { ctx, buf, hammer, noise };
}

const safeStop = (node, when) => { try { node.stop(when); } catch (e) { /* already stopped */ } };
const safeDisconnect = (node) => { try { node.disconnect(); } catch (e) { /* already disconnected */ } };

class Music3 {
  constructor(opts = {}) {
    this.opts = { ...opts };
    this.seed = Number.isFinite(Number(opts.seed)) ? Number(opts.seed) | 0 : 0;
    this.volume = clamp01(opts.volume, 0.85);
    this.energy = clamp01(opts.energy, 0.35);
    this.wind = clamp01(opts.wind, 0.3);
    this.autoNext = opts.autoNext !== false;
    this.onNote = typeof opts.onNote === 'function' ? opts.onNote : null;
    this.gust = 0;
    this.ctx = null;
    this.bus = null;
    this.music = null;
    this.running = false;
    this.pieceN = 0;
    this._analyser = null;
    this._accent = false;
    this._startP = null;
    this._tick = () => this._schedule();
  }

  get analyser() { return this._analyser; }

  start() {
    if (!this._startP) this._startP = this._start().finally(() => { this._startP = null; });
    return this._startP;
  }

  async _start() {
    if (this.running) return this;
    if (!this.ctx || this.ctx.state === 'closed') {
      const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
      this.ctx = this.opts.ctx || (AC ? new AC() : null);
      if (!this.ctx) throw new Error('Music3: Web Audio API is not available');
      this._ownsCtx = !this.opts.ctx;
    }
    const ctx = this.ctx;
    if (ctx.state !== 'running' && !this.opts.offline) await ctx.resume(); // Grokly hook: an offline context is started by its host

    this.bus = ctx.createGain();
    this.bus.connect(this.opts.destination || ctx.destination);
    this._analyser = ctx.createAnalyser();
    this._analyser.fftSize = 128;
    this._analyser.smoothingTimeConstant = 0.72;
    this.bus.connect(this._analyser);

    if (!this.bufs || this.bufs.ctx !== ctx) this.bufs = buildBuffers(ctx, this.seed);
    this.running = true;
    this._spawn();
    return this;
  }

  next() {
    const M = this.music;
    if (!this.running || !M || M.retiring) return;
    this._retire(M, { pad: 1.8, out: 1.6, stopAfter: 5, cleanupMs: 5200 });
    setTimeout(() => {
      // Skip if stop() was called, or start() already made a fresh piece meanwhile.
      if (this.running && this.music === M) this._spawn();
    }, 1200);
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    this._accent = false;
    const M = this.music, bus = this.bus, ctx = this.ctx;
    if (M && !M.retiring) this._retire(M, { pad: 0.5, out: 0.5, stopAfter: 1.8, cleanupMs: 2200 });
    this.music = null;
    setTimeout(() => {
      safeDisconnect(bus);
      // Close a context we created ourselves, unless start() was called again meanwhile.
      if (this._ownsCtx && !this.running && this.ctx === ctx && ctx.state !== 'closed') {
        ctx.close().catch(() => {});
        this.ctx = null;
      }
    }, 2200);
  }

  setVolume(v) {
    this.volume = clamp01(v, 0.85);
    const M = this.music;
    if (M && !M.retiring) M.out.gain.setTargetAtTime(this.volume, M.ctx.currentTime, 0.6);
  }

  setEnergy(e) { this.energy = clamp01(e, 0.35); }

  setWind(w) { this.wind = clamp01(w, 0.3); }

  accent() { if (this.running) this._accent = true; }

  // Grokly hook: one scheduler step, driven by the host in offline mode (same work as the timer tick).
  tick() { this._schedule(); }

  // Fade a piece out, stop its sustained voices and free its graph.
  _retire(M, { pad, out, stopAfter, cleanupMs }) {
    M.retiring = true;
    clearInterval(M.timer);
    const now = M.ctx.currentTime;
    M.padGain.gain.setTargetAtTime(0, now, pad);
    M.subGain.gain.setTargetAtTime(0, now, pad);
    M.windGain.gain.setTargetAtTime(0, now, pad);
    M.out.gain.setTargetAtTime(0, now, out);
    M.padOscs.forEach((o) => safeStop(o, now + stopAfter));
    [M.sub, M.lfo, M.windSrc].forEach((n) => safeStop(n, now + stopAfter));
    setTimeout(() => {
      safeDisconnect(M.out);
      safeDisconnect(M.busIn);
      safeDisconnect(M.comp);
    }, cleanupMs);
  }

  _panner(pan) {
    const ctx = this.ctx;
    if (!ctx.createStereoPanner) return ctx.createGain();
    const p = ctx.createStereoPanner();
    p.pan.value = clamp(pan, -1, 1);
    return p;
  }

  _spawn() {
    const ctx = this.ctx;
    const seed = ((this.seed + 7919 * ++this.pieceN) % 1000000) | 0;
    const rnd = makeRng(seed);
    const R = (a, b) => a + (b - a) * rnd();

    // busIn → dry ─────────────────────────────────┐
    //       → pre-delay → convolver → lowpass → wet ┴→ out → compressor → master bus
    const busIn = ctx.createGain();
    const out = ctx.createGain();
    out.gain.value = this.volume;
    const dry = ctx.createGain(); dry.gain.value = 0.36;
    const wet = ctx.createGain(); wet.gain.value = 0.64;
    const preDelay = ctx.createDelay(0.1); preDelay.delayTime.value = 0.028;
    const conv = ctx.createConvolver(); conv.buffer = this.bufs.buf;
    const reverbFilt = ctx.createBiquadFilter();
    reverbFilt.type = 'lowpass'; reverbFilt.frequency.value = 3600; reverbFilt.Q.value = 0.25;
    busIn.connect(dry); dry.connect(out);
    busIn.connect(preDelay); preDelay.connect(conv); conv.connect(reverbFilt); reverbFilt.connect(wet); wet.connect(out);

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -22; comp.knee.value = 24; comp.ratio.value = 2.2;
    comp.attack.value = 0.02; comp.release.value = 0.5;
    out.connect(comp); comp.connect(this.bus);

    // Pad, with a very slow filter "breath".
    const padGain = ctx.createGain(); padGain.gain.value = 0;
    const padFilt = ctx.createBiquadFilter();
    padFilt.type = 'lowpass'; padFilt.frequency.value = 900; padFilt.Q.value = 0.35;
    padGain.connect(padFilt); padFilt.connect(busIn);
    const lfo = ctx.createOscillator(); lfo.frequency.value = R(0.035, 0.07);
    const lfoDepth = ctx.createGain(); lfoDepth.gain.value = 160;
    lfo.connect(lfoDepth); lfoDepth.connect(padFilt.frequency); lfo.start();

    const subGain = ctx.createGain(); subGain.gain.value = 0;
    subGain.connect(out);
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = mtof(CHORDS.Dm.root - 19);
    sub.connect(subGain);
    sub.start();

    // Wind: looped pink noise through a moving band-pass, swaying across the stereo field.
    const windSrc = ctx.createBufferSource();
    windSrc.buffer = this.bufs.noise; windSrc.loop = true;
    const windFilt = ctx.createBiquadFilter(); windFilt.type = 'bandpass'; windFilt.frequency.value = 260; windFilt.Q.value = 0.5;
    const windSoft = ctx.createBiquadFilter(); windSoft.type = 'lowpass'; windSoft.frequency.value = 1300;
    const windGain = ctx.createGain(); windGain.gain.value = 0;
    const windPan = this._panner(0);
    windSrc.connect(windFilt); windFilt.connect(windSoft); windSoft.connect(windGain); windGain.connect(windPan); windPan.connect(busIn);
    windSrc.start(ctx.currentTime, R(0, 8));

    const now = ctx.currentTime;
    const cycle = R(480, 840);
    this.music = {
      ctx, seed, rnd, R, noise: makeNoise(seed), cycle,
      out, busIn, comp, wet, padGain, padFilt, padOscs: [], lfo, subGain, sub,
      windSrc, windFilt, windGain, windPan,
      analyser: this._analyser, // kept for backward compatibility (m.music.analyser)
      chord: 'Dm', chordEnd: now + 1.6 + FORMS.intro.chord, pedal: true,
      t0: now, next: now + 1.6, // the opening chord rings a moment before the first phrase
      mel: { phrase: null, i: 0, idx: 0 }, motif: null,
      formName: 'intro', timer: null, retiring: false
    };
    this._padTo(CHORDS.Dm, 1);
    padGain.gain.setTargetAtTime(0.055, now, 0.8);
    // Sound right away: a soft rolled D minor chord opens every piece.
    [38, 57, 62, 65].forEach((midi, k) => this._piano(now + 0.03 + k * 0.11, midi, k ? 38 - k * 2 : 30, (k - 1.5) * 0.25));
    this._emitNote(now + 0.03, 0.5);
    if (!this.opts.offline) this.music.timer = setInterval(this._tick, TICK_MS); // Grokly hook: offline ⇒ host calls tick()
    this._schedule();
  }

  _emitNote(when, v) {
    if (!this.onNote) return;
    const ms = Math.max(0, when - this.ctx.currentTime) * 1000;
    setTimeout(() => { if (this.running && this.onNote) this.onNote(v); }, ms);
  }

  _piano(when, midi, vel, pan = 0) {
    const M = this.music, ctx = M.ctx, f0 = mtof(midi);
    when = Math.max(ctx.currentTime, when);
    // Upper notes are played more gently, as a pianist would, so they never sting.
    const amp = Math.pow(vel / 127, 1.6) * 0.3 * (midi > 76 ? 1 - (midi - 76) * 0.035 : 1);
    const dur = 4.8 * (midi < 52 ? 1.45 : 1);

    const g = ctx.createGain();
    const p = this._panner(pan);
    g.connect(p); p.connect(M.busIn);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(amp, when + 0.03);
    g.gain.exponentialRampToValueAtTime(amp * 0.28, when + 0.42);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);

    // Felt: brightness follows velocity, soft notes are darker.
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass'; tone.Q.value = 0.5;
    tone.frequency.value = Math.min(9000, f0 * (2 + (vel / 127) * 7));
    tone.connect(g);

    for (const [mul, lev] of PARTIALS) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f0 * mul * (1 + (M.rnd() - 0.5) * 0.0012);
      const og = ctx.createGain();
      og.gain.value = lev;
      o.connect(og); og.connect(tone);
      o.start(when);
      o.stop(when + dur + 0.05);
    }

    // Felt-hammer thump.
    const ns = ctx.createBufferSource(); ns.buffer = this.bufs.hammer;
    const nf = ctx.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = f0 * 4; nf.Q.value = 0.8;
    const ng = ctx.createGain(); ng.gain.value = amp * 0.055;
    ns.connect(nf); nf.connect(ng); ng.connect(g);
    ns.start(when);

    // Free the voice's graph once it has rung out.
    // Grokly hook: offline, a wall-clock timer could cut a voice before it is rendered; the graph is freed with the context.
    if (!this.opts.offline) setTimeout(() => { safeDisconnect(g); safeDisconnect(p); }, (when - ctx.currentTime + dur + 0.2) * 1000);
  }

  _schedule() {
    const M = this.music;
    if (!this.running || !M || M.retiring) return;
    const ctx = M.ctx, now = ctx.currentTime;
    if (M.next < now) M.next = now + 0.05;
    if (ctx.state !== 'running' && !this.opts.offline) return; // Grokly hook: offline contexts are suspended while ticking
    if (this.autoNext && now - M.t0 >= M.cycle) { this.next(); return; }
    const E = this.energy;

    this._updateAir(M, now);

    if (this._accent) {
      this._accent = false;
      const ch = CHORDS[M.chord], t = now + 0.02;
      ch.pad.slice(0, 3).forEach((iv, k) => this._piano(t + k * 0.09, ch.root + iv + 12, 52 - k * 5, (k - 1) * 0.35));
      M.wet.gain.setTargetAtTime(0.76, now, 0.8);
      this._emitNote(t, 0.8);
    }

    const ahead = now + LOOKAHEAD;
    while (M.next < ahead) {
      const t = M.next, el = t - M.t0;
      const form = formAt(el, M.cycle), g = gustAt(M, el);
      if (t >= M.chordEnd) this._changeChord(M, form, E, t);
      M.next += this._step(M, t, el, form, g, E);
    }
  }

  // Continuous layers that follow the wind: wind noise, pad brightness, stereo sway.
  _updateAir(M, now) {
    const el = now - M.t0, g = gustAt(M, el), form = formAt(el, M.cycle);
    this.gust = g;
    M.formName = form.name;
    // Soft and dark: a breath of air behind the piano, never a storm in front of it.
    M.windGain.gain.setTargetAtTime(this.wind * 0.022 * (0.25 + 0.75 * g * g), now, 3);
    M.windFilt.frequency.setTargetAtTime(200 + 500 * g, now, 4);
    if (M.windPan.pan) M.windPan.pan.setTargetAtTime(Math.sin(el * 0.02) * 0.45, now, 4);
    M.padFilt.frequency.setTargetAtTime(form.padHz * (0.85 + 0.3 * g), now, 3);
  }

  _makePhrase(M, form, g, E) {
    const { rnd, R } = M;
    let steps, durs;
    if (M.motif && rnd() < 0.4) {
      // The remembered motif returns, sometimes upside down: familiar but not repeated.
      steps = M.motif.steps.slice();
      durs = M.motif.durs.slice();
      if (rnd() < 0.3) steps = steps.map((s) => -s);
    } else {
      // A branch sway: rise to a peak, fall back, settle on a long note.
      const len = Math.round(R(3, 6) + g * 1.5 + E);
      const peak = Math.floor(len * R(0.35, 0.65));
      steps = []; durs = [];
      for (let i = 0; i < len; i++) {
        const dir = i < peak ? 1 : -1, r = rnd();
        steps.push(i === 0 ? 0 : r < 0.12 ? 0 : r < 0.8 ? dir : r < 0.95 ? 2 * dir : -dir);
        durs.push(rnd() < 0.25 ? 0.5 : rnd() < 0.2 ? 1.5 : 1);
      }
      durs[len - 1] = 2;
      M.motif = { steps, durs };
    }
    const center = 66 + form.reg + (g - 0.5) * 8;
    M.mel.idx = snapToChord(nearestIdx(center + R(-3, 3)), CHORDS[M.chord]);
    return { steps, durs };
  }

  // Plays one melody note and returns the time until the next event.
  _step(M, t, el, form, g, E) {
    const { rnd, R, mel } = M;
    const ch = CHORDS[M.chord];
    // The piece's last seconds: no new phrases, only pad and wind ringing out.
    if (!mel.phrase && this.autoNext && el > M.cycle - ENDING) return 1;
    if (!mel.phrase) { mel.phrase = this._makePhrase(M, form, g, E); mel.i = 0; }
    const { steps, durs } = mel.phrase, i = mel.i, last = i === steps.length - 1;

    if (i > 0) {
      let idx = mel.idx + steps[i];
      if (idx < MEL_LO || idx > MEL_HI) idx = mel.idx - steps[i]; // bounce off the range edge
      mel.idx = clamp(idx, MEL_LO, MEL_HI);
    }
    if (i === 0 || last || durs[i] >= 1.5) mel.idx = snapToChord(mel.idx, ch); // rest on chord tones
    const midi = SCALE[mel.idx];

    const arc = Math.sin(Math.PI * (i + 0.5) / steps.length);
    const vel = clamp(26 + 15 * E + form.vel + (g - 0.5) * 10 + arc * 7 + (rnd() - 0.5) * 5, 20, 66);
    const pan = clamp((midi - 66) / 30 + Math.sin(el * 0.045) * 0.25, -0.6, 0.6);
    const when = t + (rnd() - 0.5) * 0.04;
    this._piano(when, midi, vel, pan);
    this._emitNote(when, vel / 100);

    // In a gust, an occasional quick upper neighbour, like a leaf flicking.
    if (g > 0.5 && i > 0 && rnd() < 0.12 * g && mel.idx < MEL_HI) {
      this._piano(when - 0.07, SCALE[mel.idx + 1], vel * 0.5, pan);
    }
    // Rarely, a soft echo a fourth or sixth below, on the other side.
    if (rnd() < 0.06) this._piano(when + R(0.08, 0.18), midi - (rnd() < 0.5 ? 5 : 9), vel * 0.45, -pan);

    const base = form.ioi * (0.9 + M.noise(el * 0.31) * 0.3) * (1.2 - 0.28 * E) * (1.1 - 0.25 * g);
    const ioi = base * durs[i] * (0.92 + rnd() * 0.16);
    mel.i++;
    if (!last) return ioi;

    // Breath between phrases; in a lull, sometimes a long clearing with only pad and wind.
    mel.phrase = null;
    let rest = R(1.2, 3.4) * form.rest * (1.3 - 0.5 * E) * (1.5 - g);
    if (g < 0.15 && rnd() < 0.5) rest += R(5, 12);
    return ioi + rest;
  }

  _changeChord(M, form, E, t) {
    const { rnd, R } = M, now = M.ctx.currentTime;
    M.chord = pickWeighted(CHORDS[M.chord].next, rnd);
    const ch = CHORDS[M.chord];
    // Harmonic rhythm breathes too: longer chords in intro and decay.
    M.chordEnd = t + form.chord * R(0.8, 1.25) * (1.1 - 0.2 * E);
    M.pedal = !M.pedal || rnd() < 0.7;
    M.wet.gain.setTargetAtTime((M.pedal ? 0.64 : 0.52) + 0.06 * E, now, 1.4);
    M.padGain.gain.setTargetAtTime(form.pad, now, 3);
    M.subGain.gain.setTargetAtTime(form.sub, now, 5);
    M.sub.frequency.setTargetAtTime(mtof(ch.root - 19), now, 2.5);
    this._padTo(ch);
    // A soft low root anchors the new harmony.
    const ending = this.autoNext && t - M.t0 > M.cycle - ENDING;
    if (rnd() < 0.55 && !ending) this._piano(t + R(0, 0.1), ch.root >= 46 ? ch.root - 12 : ch.root, R(24, 34), 0);
  }

  // Crossfade the pad to a new chord: old voices ring out, new ones swell in.
  // Each voice is two slightly detuned oscillators spread left and right for a slow, living shimmer.
  _padTo(ch, attack = 3.5) {
    const M = this.music, ctx = M.ctx, now = ctx.currentTime;
    M.padOscs.forEach((o) => safeStop(o, now + 4.5));
    M.padOscs = [];
    let ivs = ch.pad.slice();
    if (M.rnd() < 0.35) ivs = [...ivs.slice(1), ivs[0] + 12]; // inversion for colour
    ivs.forEach((iv, k) => {
      const f = mtof(ch.root + iv);
      const g = ctx.createGain();
      g.gain.value = 0.0001;
      g.gain.setTargetAtTime(0.2 / (k + 1), now, attack + k * 0.4);
      g.connect(M.padGain);
      for (const side of [-1, 1]) {
        const o = ctx.createOscillator();
        o.type = k === 0 ? 'triangle' : 'sine';
        o.frequency.value = f;
        o.detune.value = side * (3 + M.rnd() * 3);
        const og = ctx.createGain(); og.gain.value = 0.5;
        const p = this._panner(side * (0.25 + k * 0.1));
        o.connect(og); og.connect(p); p.connect(g);
        o.onended = () => { safeDisconnect(p); safeDisconnect(g); };
        o.start();
        M.padOscs.push(o);
      }
    });
  }
}

Music3.TICK_MS = TICK_MS; // Grokly hook: the offline host steps at the engine's own tick
if (typeof window !== 'undefined') window.Music3 = Music3;
if (typeof module !== 'undefined') module.exports = { Music3 };
