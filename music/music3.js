// music-3 v2 — generative ambient piano engine extracted from «بیس ۸» (In the Embrace of the Wind),
// upgraded along the lines of the ambient-composer / ambient-production / ambient-examiner skills.
// Felt piano + breathing pad + soft wind + restrained sub, D Aeolian, now joined by:
//
//   • airs     — 5 sung "ahh" loops with prime-number periods (17–43 s) that never realign,
//                each note followed by at least twice its length of silence (Eno, Music for Airports 2/1).
//   • ground   — a quiet D drone whose two voices drift in and out of unison, so it slowly beats
//                (melody over a drone without leaving it; Deuter-style beating resonance).
//   • meteors  — rare, very soft high tones that glide a few cents and cross the stereo field
//                (the "grounds / airs / meteors" roles of Eno & Chilvers' Scape).
//   • tape     — a long two-head tape-echo loop (4–7 s) with wow, flutter and darkening on every pass,
//                so phrases accumulate into a halo (Frippertronics / Discreet Music).
//   • halo     — only the piano's upper band goes into a short ping-pong delay, the lows stay dry
//                (multiband treatment of Budd's piano on The Plateaux of Mirror).
//   • hiss     — a breath of tape hiss under everything (On Land: hiss as sea / room tone).
//
// Composition changes:
//   • Pitch-subset rotation: the melody uses 5 of the 7 notes of D Aeolian, and every 70–140 s one note is
//     swapped, so each section takes on a new colour (Eno's Turin piece, 2012).
//   • Motifs return as "recurring approximations": inverted, retrograde, augmented, altered or truncated,
//     from a bank of up to three remembered motifs (chunking up).
//   • "Scalus interruptus": no more than three steps in a row the same way; phrases often end on a 3rd,
//     5th or 9th instead of the root, so the music does not cadence.
//   • Harmony sways as pendulums (i–VI, etc.) and pads take an added 9th/11th when the palette allows.
//   • Hidden rules: an air that would sound a b9 or tritone over the chord root stays silent; at most two
//     airs sound at once; while a meteor sounds, the piano plays more sparsely.
//   • By default a piece fades in on something already running, like an excerpt from a continuum
//     (opening: 'chord' restores the rolled opening chord).
//
// Fixes:
//   • The sub followed the chord root −19 semitones (a G under D minor); it now sits on the root, 33–44 MIDI.
//   • Offline mode is now fully deterministic: next(), stop(), onNote and voice clean-up no longer use
//     wall-clock timers there; they are queued on the context clock and run from tick().
//   • Lighter compression (ratio 1.6) so the shimmer survives; 28 Hz high-pass; optional speech-band dip.
//
// Usage (unchanged API, plus new options/setters):
//   const m = new Music3({ seed: 1234, volume: 0.85 });
//   await m.start();       // from a user gesture
//   m.next(); m.stop(); m.accent();
//   m.setVolume(v) · m.setEnergy(v) · m.setWind(v)          // 0..1
//   m.setTape(v) · m.setVoices(v) · m.setHiss(v)            // 0..1 (new)
//   m.analyser · m.gust · m.state  · m.onNote = (v) => {}
//
// Options: seed, volume, energy (0.35), wind (0.3), tape (0.35), voices (0.5), hiss (0.12),
//   opening ('fade' | 'chord'), clearSpeech (false: dip 2 kHz by 5 dB to leave room for announcements
//   or conversation), autoNext, onNote, ctx, destination, offline.
//
// Grokly hook: offline: true lets the engine run inside an OfflineAudioContext. No timers are used then;
// the host calls m.tick() every Music3.TICK_MS of render time (e.g. from ctx.suspend(t) callbacks),
// so the same seed always renders the same audio. (v2 renders different audio from v1 for a given seed.)

const CHORDS = {
  Dm: { root: 50, pad: [0, 3, 7, 14], next: [['Bb', 0.36], ['F', 0.2], ['Gm', 0.18], ['Am', 0.1], ['C', 0.06], ['Dm', 0.1]] },
  Bb: { root: 46, pad: [0, 4, 7, 11], next: [['Dm', 0.35], ['F', 0.3], ['Gm', 0.2], ['C', 0.1], ['Am', 0.05]] },
  F:  { root: 41, pad: [0, 4, 7, 14], next: [['Dm', 0.3], ['C', 0.25], ['Bb', 0.25], ['Am', 0.1], ['Gm', 0.1]] },
  C:  { root: 48, pad: [0, 4, 7, 11], next: [['Dm', 0.45], ['Bb', 0.2], ['Am', 0.15], ['F', 0.15], ['Gm', 0.05]] },
  Gm: { root: 43, pad: [0, 3, 7, 10], next: [['Dm', 0.4], ['Bb', 0.3], ['F', 0.1], ['C', 0.1], ['Am', 0.1]] },
  Am: { root: 45, pad: [0, 3, 7, 10], next: [['Dm', 0.4], ['F', 0.3], ['Bb', 0.2], ['Gm', 0.1]] }
};

// D Aeolian pitch classes: D E F G A Bb C. The melody uses a rotating 5-note subset of these.
const PALETTE = [2, 4, 5, 7, 9, 10, 0];
const FIRST_SUBSET = [2, 5, 9, 0, 4]; // D F A C E — a Dm9 colour to begin with
const MEL_MIN = 57, MEL_MAX = 81;     // A3..A5; higher gets piercing
const AIR_PITCHES = [50, 52, 53, 55, 57, 58, 60, 62, 64, 65, 67, 69, 70, 72, 74]; // D3..D5 in the mode
const METEOR_PITCHES = [84, 86, 88, 89, 91, 93]; // C6..A6, only as very soft gliding sines
const PRIMES = [17, 19, 23, 29, 31, 37, 41, 43];

const pcOf = (m) => ((m % 12) + 12) % 12;
const buildScale = (pcs) => {
  const s = [];
  for (let m = MEL_MIN; m <= MEL_MAX; m++) if (pcs.has(pcOf(m))) s.push(m);
  return s;
};
const nearestIn = (arr, midi) => {
  let best = 0;
  for (let i = 1; i < arr.length; i++) if (Math.abs(arr[i] - midi) < Math.abs(arr[best] - midi)) best = i;
  return best;
};

// Song form. The cycle length varies per piece (8–14 min) so the arc never becomes predictable.
//   ioi: seconds between notes · rest: breath between phrases · chord: seconds per chord
//   reg: register offset · vel: velocity offset · airs: sung-loop level · ground: drone level · fb: tape feedback
const FORMS = {
  intro:  { name: 'intro',  ioi: 0.95, rest: 1.6, chord: 12,  reg: -2, vel: -2, pad: 0.05, padHz: 760,  sub: 0.004, airs: 1.0,  ground: 0.011, fb: 0.55 },
  dev:    { name: 'dev',    ioi: 0.78, rest: 1.1, chord: 9,   reg: 0,  vel: 0,  pad: 0.09, padHz: 1050, sub: 0.006, airs: 0.8,  ground: 0.008, fb: 0.5 },
  climax: { name: 'climax', ioi: 0.62, rest: 0.8, chord: 7.5, reg: 3,  vel: 4,  pad: 0.13, padHz: 1350, sub: 0.014, airs: 0.55, ground: 0.005, fb: 0.42 },
  decay:  { name: 'decay',  ioi: 0.9,  rest: 1.8, chord: 12,  reg: -3, vel: -3, pad: 0.07, padHz: 900,  sub: 0.005, airs: 1.1,  ground: 0.012, fb: 0.58 }
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
const subMidi = (root) => { let m = root - 12; while (m > 44) m -= 12; while (m < 33) m += 12; return m; };

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

function shuffled(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
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

// Nearest index in scale S whose pitch belongs to the chord. With avoidRoot, the root is skipped
// when another chord tone is near, so phrases settle without cadencing on the tonic.
function snapToChord(S, idx, ch, avoidRoot = false) {
  const all = new Set(ch.pad.map((iv) => pcOf(ch.root + iv)));
  const tries = avoidRoot ? [new Set([...all].filter((p) => p !== pcOf(ch.root))), all] : [all];
  for (const pcs of tries) {
    for (let d = 0; d <= 3; d++) {
      for (const j of [idx - d, idx + d]) if (j >= 0 && j < S.length && pcs.has(pcOf(S[j]))) return j;
    }
  }
  return clamp(idx, 0, S.length - 1);
}

// Reverb impulse, hammer-noise burst, a seamless pink-ish noise loop, and a soft tape-saturation curve.
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

  const sat = new Float32Array(1024);
  // Unity gain for small signals (so the loop gain is just the feedback level), soft limit for loud ones.
  for (let i = 0; i < sat.length; i++) { const v = (i / (sat.length - 1)) * 2 - 1; sat[i] = Math.tanh(1.6 * v) / 1.6; }

  return { ctx, buf, hammer, noise, sat };
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
    this.tape = clamp01(opts.tape, 0.35);
    this.voices = clamp01(opts.voices, 0.5);
    this.hiss = clamp01(opts.hiss, 0.12);
    this.opening = opts.opening === 'chord' ? 'chord' : 'fade';
    this.clearSpeech = !!opts.clearSpeech;
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
    this._queue = [];
    this._tick = () => this._schedule();
  }

  get analyser() { return this._analyser; }

  get offline() { return !!this.opts.offline; }

  // A snapshot for visuals or debugging.
  get state() {
    const M = this.music;
    if (!M) return null;
    return { piece: this.pieceN, form: M.formName, gust: this.gust, chord: M.chord, palette: [...M.subset], elapsed: M.ctx.currentTime - M.t0, cycle: M.cycle };
  }

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
    if (ctx.state !== 'running' && !this.offline) await ctx.resume(); // an offline context is started by its host

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

  // Run fn after ms: a wall-clock timer online, the context clock offline (flushed from tick()).
  _later(fn, ms) {
    if (this.offline) {
      const at = (this.ctx ? this.ctx.currentTime : 0) + Math.max(0, ms) / 1000;
      this._queue.push({ at, fn });
    } else {
      setTimeout(fn, Math.max(0, ms));
    }
  }

  _flush() {
    if (!this._queue.length || !this.ctx) return;
    const now = this.ctx.currentTime + 1e-6;
    const due = this._queue.filter((q) => q.at <= now).sort((a, b) => a.at - b.at);
    if (!due.length) return;
    this._queue = this._queue.filter((q) => q.at > now);
    due.forEach((q) => q.fn());
  }

  next() {
    const M = this.music;
    if (!this.running || !M || M.retiring) return;
    this._retire(M, { pad: 1.8, out: 1.6, stopAfter: 5, cleanupMs: 5200 });
    this._later(() => {
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
    this._later(() => {
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

  setTape(v) { this.tape = clamp01(v, 0.35); }

  setVoices(v) { this.voices = clamp01(v, 0.5); }

  setHiss(v) {
    this.hiss = clamp01(v, 0.12);
    const M = this.music;
    if (M && !M.retiring) M.hissGain.gain.setTargetAtTime(this.hiss * 0.02, M.ctx.currentTime, 1);
  }

  accent() { if (this.running) this._accent = true; }

  // One scheduler step, driven by the host in offline mode (same work as the timer tick).
  tick() { this._flush(); this._schedule(); }

  // Fade a piece out, stop its sustained voices and free its graph.
  _retire(M, { pad, out, stopAfter, cleanupMs }) {
    M.retiring = true;
    clearInterval(M.timer);
    const now = M.ctx.currentTime;
    [M.padGain, M.subGain, M.windGain, M.groundGain, M.tapeSend].forEach((g) => g.gain.setTargetAtTime(0, now, pad));
    M.out.gain.setTargetAtTime(0, now, out);
    M.padOscs.forEach((o) => safeStop(o, now + stopAfter));
    M.sustain.forEach((n) => safeStop(n, now + stopAfter));
    this._later(() => M.cleanup.forEach(safeDisconnect), cleanupMs);
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
    const now = ctx.currentTime;

    // piano → pianoBus ┐                 ┌→ dry ─────────────────────────────────┐
    // airs  → airBus   ┼→ busIn ─────────┤                                        ├→ out → HP → speech dip → comp → bus
    // pad, wind, meteors┘                └→ pre-delay → convolver → lowpass → wet ┘
    // pianoBus, airBus, meteors → tape loop (delay ⟲ saturation, lowpass, highpass) → pre-delay + out
    // pianoBus → high band → ping-pong halo → pre-delay + out
    // ground, sub, hiss → out (no reverb on the lows)
    const busIn = ctx.createGain();
    const pianoBus = ctx.createGain(); pianoBus.connect(busIn);
    const airBus = ctx.createGain(); airBus.connect(busIn);
    const out = ctx.createGain();
    out.gain.value = this.opening === 'fade' ? 0.0001 : this.volume;
    const dry = ctx.createGain(); dry.gain.value = 0.36;
    const wet = ctx.createGain(); wet.gain.value = 0.64;
    const preDelay = ctx.createDelay(0.1); preDelay.delayTime.value = 0.028;
    const conv = ctx.createConvolver(); conv.buffer = this.bufs.buf;
    const reverbFilt = ctx.createBiquadFilter();
    reverbFilt.type = 'lowpass'; reverbFilt.frequency.value = 3600; reverbFilt.Q.value = 0.25;
    busIn.connect(dry); dry.connect(out);
    busIn.connect(preDelay); preDelay.connect(conv); conv.connect(reverbFilt); reverbFilt.connect(wet); wet.connect(out);

    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 28; hp.Q.value = 0.7;
    const speech = ctx.createBiquadFilter();
    speech.type = 'peaking'; speech.frequency.value = 2100; speech.Q.value = 0.8; speech.gain.value = this.clearSpeech ? -5 : 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20; comp.knee.value = 24; comp.ratio.value = 1.6;
    comp.attack.value = 0.03; comp.release.value = 0.6;
    out.connect(hp); hp.connect(speech); speech.connect(comp); comp.connect(this.bus);

    // Tape loop: a long echo whose repeats darken, saturate gently and waver with wow and flutter.
    const tapeSend = ctx.createGain(); tapeSend.gain.value = this.tape * 0.5;
    const tapeDelay = ctx.createDelay(10); tapeDelay.delayTime.value = R(4.3, 6.9);
    const tapeSat = ctx.createWaveShaper(); tapeSat.curve = this.bufs.sat;
    const tapeLP = ctx.createBiquadFilter(); tapeLP.type = 'lowpass'; tapeLP.frequency.value = 2400; tapeLP.Q.value = 0.3;
    const tapeHP = ctx.createBiquadFilter(); tapeHP.type = 'highpass'; tapeHP.frequency.value = 160; tapeHP.Q.value = 0.5;
    const tapeFB = ctx.createGain(); tapeFB.gain.value = FORMS.intro.fb;
    const tapeOut = ctx.createGain(); tapeOut.gain.value = 0.6;
    const tapePan = this._panner(0);
    pianoBus.connect(tapeSend); airBus.connect(tapeSend);
    tapeSend.connect(tapeDelay); tapeDelay.connect(tapeSat); tapeSat.connect(tapeLP); tapeLP.connect(tapeHP);
    tapeHP.connect(tapeFB); tapeFB.connect(tapeDelay);
    tapeHP.connect(tapeOut); tapeOut.connect(tapePan); tapePan.connect(preDelay); tapePan.connect(out);
    const wow = ctx.createOscillator(); wow.frequency.value = R(0.25, 0.4);
    const wowDepth = ctx.createGain(); wowDepth.gain.value = 0.0022;
    wow.connect(wowDepth); wowDepth.connect(tapeDelay.delayTime); wow.start();
    const flutter = ctx.createOscillator(); flutter.frequency.value = R(5.4, 6.6);
    const flutterDepth = ctx.createGain(); flutterDepth.gain.value = 0.00022;
    flutter.connect(flutterDepth); flutterDepth.connect(tapeDelay.delayTime); flutter.start();

    // Halo: only the piano's upper band goes into a short ping-pong delay; the low notes stay dry.
    const haloHP = ctx.createBiquadFilter(); haloHP.type = 'highpass'; haloHP.frequency.value = 1400; haloHP.Q.value = 0.5;
    const haloSend = ctx.createGain(); haloSend.gain.value = 0.3;
    const dL = ctx.createDelay(1); dL.delayTime.value = R(0.37, 0.45);
    const dR = ctx.createDelay(1); dR.delayTime.value = R(0.53, 0.61);
    const fbL = ctx.createGain(); fbL.gain.value = 0.34;
    const fbR = ctx.createGain(); fbR.gain.value = 0.34;
    const merger = ctx.createChannelMerger(2);
    const haloLP = ctx.createBiquadFilter(); haloLP.type = 'lowpass'; haloLP.frequency.value = 5200;
    const haloOut = ctx.createGain(); haloOut.gain.value = 0.5;
    pianoBus.connect(haloHP); haloHP.connect(haloSend); haloSend.connect(dL);
    dL.connect(fbL); fbL.connect(dR); dR.connect(fbR); fbR.connect(dL);
    dL.connect(merger, 0, 0); dR.connect(merger, 0, 1);
    merger.connect(haloLP); haloLP.connect(preDelay); haloLP.connect(haloOut); haloOut.connect(out);

    // Pad, with a very slow filter "breath".
    const padGain = ctx.createGain(); padGain.gain.value = 0;
    const padFilt = ctx.createBiquadFilter();
    padFilt.type = 'lowpass'; padFilt.frequency.value = 900; padFilt.Q.value = 0.35;
    padGain.connect(padFilt); padFilt.connect(busIn);
    const lfo = ctx.createOscillator(); lfo.frequency.value = R(0.035, 0.07);
    const lfoDepth = ctx.createGain(); lfoDepth.gain.value = 160;
    lfo.connect(lfoDepth); lfoDepth.connect(padFilt.frequency); lfo.start();

    // Sub on the chord root, low but within reach of ordinary speakers.
    const subGain = ctx.createGain(); subGain.gain.value = 0;
    subGain.connect(out);
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = mtof(subMidi(CHORDS.Dm.root));
    sub.connect(subGain);
    sub.start();

    // Ground: D2 plus two D3 voices, one drifting a few cents so the unison slowly beats and clears.
    const groundGain = ctx.createGain(); groundGain.gain.value = 0;
    const groundLP = ctx.createBiquadFilter(); groundLP.type = 'lowpass'; groundLP.frequency.value = 420;
    groundGain.connect(groundLP); groundLP.connect(out);
    const groundOscs = [[38, 0.55, 'sine'], [50, 0.3, 'triangle'], [50, 0.3, 'triangle']].map(([midi, lev, type]) => {
      const o = ctx.createOscillator(); o.type = type; o.frequency.value = mtof(midi);
      const og = ctx.createGain(); og.gain.value = lev;
      o.connect(og); og.connect(groundGain); o.start();
      return o;
    });
    const drift = ctx.createOscillator(); drift.frequency.value = R(0.009, 0.016);
    const driftDepth = ctx.createGain(); driftDepth.gain.value = 9; // cents
    drift.connect(driftDepth); driftDepth.connect(groundOscs[2].detune); drift.start();

    // Wind: looped pink noise through a moving band-pass, swaying across the stereo field.
    const windSrc = ctx.createBufferSource();
    windSrc.buffer = this.bufs.noise; windSrc.loop = true;
    const windFilt = ctx.createBiquadFilter(); windFilt.type = 'bandpass'; windFilt.frequency.value = 260; windFilt.Q.value = 0.5;
    const windSoft = ctx.createBiquadFilter(); windSoft.type = 'lowpass'; windSoft.frequency.value = 1300;
    const windGain = ctx.createGain(); windGain.gain.value = 0;
    const windPan = this._panner(0);
    windSrc.connect(windFilt); windFilt.connect(windSoft); windSoft.connect(windGain); windGain.connect(windPan); windPan.connect(busIn);
    windSrc.start(now, R(0, 8));

    // Hiss: the faintest tape/room air, never louder than a breath.
    const hissSrc = ctx.createBufferSource();
    hissSrc.buffer = this.bufs.noise; hissSrc.loop = true;
    const hissHP = ctx.createBiquadFilter(); hissHP.type = 'highpass'; hissHP.frequency.value = 2800;
    const hissLP = ctx.createBiquadFilter(); hissLP.type = 'lowpass'; hissLP.frequency.value = 8500;
    const hissGain = ctx.createGain(); hissGain.gain.value = this.hiss * 0.02;
    hissSrc.connect(hissHP); hissHP.connect(hissLP); hissLP.connect(hissGain); hissGain.connect(out);
    hissSrc.start(now, R(0, 8));

    // Airs: sung single-note loops with prime periods; each note is at most a third of its loop.
    const airPitches = shuffled(AIR_PITCHES, rnd);
    const airPans = shuffled([-0.6, -0.3, 0, 0.3, 0.6], rnd);
    const airs = shuffled(PRIMES, rnd).slice(0, 5).map((p, k) => {
      const period = p + R(-0.4, 0.4);
      return { period, midi: airPitches[k], pan: airPans[k], len: Math.min(period / 3, R(3.5, 6.5)), next: now + R(3, period * 0.9) };
    });

    const cycle = R(480, 840);
    const subset = new Set(FIRST_SUBSET);
    this.music = {
      ctx, seed, rnd, R, noise: makeNoise(seed), cycle,
      out, busIn, pianoBus, airBus, comp, wet, padGain, padFilt, padOscs: [], lfo, subGain, sub,
      windSrc, windFilt, windGain, windPan, hissGain, groundGain, tapeSend, tapeFB, tapePan,
      sustain: [sub, lfo, windSrc, hissSrc, wow, flutter, drift, ...groundOscs],
      cleanup: [out, busIn, comp, tapeFB, tapeDelay, fbL, fbR, dL, dR, pianoBus, airBus],
      analyser: this._analyser, // kept for backward compatibility (m.music.analyser)
      chord: 'Dm', prevChord: null, chordEnd: now + 1.6 + FORMS.intro.chord, pedal: true,
      t0: now, next: now + (this.opening === 'fade' ? 3.2 : 1.6),
      mel: { phrase: null, i: 0, midi: 62 }, motifs: [],
      subset, scale: buildScale(subset), subsetNext: now + R(70, 140),
      airs, airEnds: [], meteorNext: now + R(45, 110), meteorEnd: 0,
      formName: 'intro', timer: null, retiring: false
    };
    this._padTo(CHORDS.Dm, 1);
    padGain.gain.setTargetAtTime(0.055, now, 0.8);
    groundGain.gain.setTargetAtTime(FORMS.intro.ground, now, 2);
    if (this.opening === 'fade') {
      // Fade in on something already running: an excerpt from a continuum.
      out.gain.setTargetAtTime(this.volume, now, 1.6);
      this._emitNote(now + 0.5, 0.3);
    } else {
      // A soft rolled D minor chord opens the piece.
      [38, 57, 62, 65].forEach((midi, k) => this._piano(now + 0.03 + k * 0.11, midi, k ? 38 - k * 2 : 30, (k - 1.5) * 0.25));
      this._emitNote(now + 0.03, 0.5);
    }
    if (!this.offline) this.music.timer = setInterval(this._tick, TICK_MS); // offline ⇒ host calls tick()
    this._schedule();
  }

  _emitNote(when, v) {
    if (!this.onNote) return;
    const ms = Math.max(0, when - this.ctx.currentTime) * 1000;
    this._later(() => { if (this.running && this.onNote) this.onNote(v); }, ms);
  }

  _piano(when, midi, vel, pan = 0) {
    const M = this.music, ctx = M.ctx, f0 = mtof(midi);
    when = Math.max(ctx.currentTime, when);
    // Upper notes are played more gently, as a pianist would, so they never sting.
    const amp = Math.pow(vel / 127, 1.6) * 0.3 * (midi > 76 ? 1 - (midi - 76) * 0.035 : 1);
    const dur = 4.8 * (midi < 52 ? 1.45 : 1);

    const g = ctx.createGain();
    const p = this._panner(pan);
    g.connect(p); p.connect(M.pianoBus);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(amp, when + 0.03);
    g.gain.exponentialRampToValueAtTime(amp * 0.28, when + 0.42);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);

    // Felt: brightness follows velocity, soft notes are darker.
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass'; tone.Q.value = 0.5;
    tone.frequency.value = Math.min(9000, f0 * (2 + (vel / 127) * 7));
    tone.connect(g);

    let lastOsc = null;
    for (const [mul, lev] of PARTIALS) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f0 * mul * (1 + (M.rnd() - 0.5) * 0.0012);
      const og = ctx.createGain();
      og.gain.value = lev;
      o.connect(og); og.connect(tone);
      o.start(when);
      o.stop(when + dur + 0.05);
      lastOsc = o;
    }

    // Felt-hammer thump.
    const ns = ctx.createBufferSource(); ns.buffer = this.bufs.hammer;
    const nf = ctx.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = f0 * 4; nf.Q.value = 0.8;
    const ng = ctx.createGain(); ng.gain.value = amp * 0.055;
    ns.connect(nf); nf.connect(ng); ng.connect(g);
    ns.start(when);

    // Free the voice's graph once it has rung out (an audio-clock event, so it is safe offline too).
    lastOsc.onended = () => { safeDisconnect(g); safeDisconnect(p); };
  }

  // One sung "ahh": sawtooth + triangle through two vowel formants, a touch of breath, slow attack.
  _air(when, midi, dur, level, pan) {
    const M = this.music, ctx = M.ctx, f = mtof(midi), rnd = M.rnd;
    when = Math.max(ctx.currentTime, when);
    const atk = Math.min(dur * 0.4, 1.2 + rnd() * 1.3);
    const peak = 0.16 * level;
    const g = ctx.createGain();
    const p = this._panner(pan);
    g.connect(p); p.connect(M.airBus);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(peak, when + atk);
    g.gain.setValueAtTime(peak, when + Math.max(atk, dur * 0.55));
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);

    const body = ctx.createBiquadFilter(); body.type = 'lowpass'; body.frequency.value = 2600; body.Q.value = 0.3;
    body.connect(g);
    const f1 = ctx.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 700 * (0.92 + rnd() * 0.16); f1.Q.value = 5;
    const f2 = ctx.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.value = 1150 * (0.92 + rnd() * 0.16); f2.Q.value = 7;
    const f2g = ctx.createGain(); f2g.gain.value = 0.5;
    f1.connect(body); f2.connect(f2g); f2g.connect(body);

    const saw = ctx.createOscillator(); saw.type = 'sawtooth'; saw.frequency.value = f;
    const tri = ctx.createOscillator(); tri.type = 'triangle'; tri.frequency.value = f;
    const triG = ctx.createGain(); triG.gain.value = 0.35;
    // A singer's pitch is never quite still: a few cents of drift across the note.
    const d0 = (rnd() - 0.5) * 8;
    [saw, tri].forEach((o) => { o.detune.setValueAtTime(d0, when); o.detune.linearRampToValueAtTime(d0 + (rnd() - 0.5) * 8, when + dur); });
    saw.connect(f1); saw.connect(f2);
    tri.connect(triG); triG.connect(body);

    const breath = ctx.createBufferSource(); breath.buffer = this.bufs.noise;
    const bf = ctx.createBiquadFilter(); bf.type = 'bandpass'; bf.frequency.value = 1400; bf.Q.value = 1;
    const bg = ctx.createGain(); bg.gain.value = 0.12;
    breath.connect(bf); bf.connect(bg); bg.connect(body);

    const end = when + dur + 0.1;
    saw.start(when); tri.start(when); breath.start(when, rnd() * 7);
    saw.stop(end); tri.stop(end); breath.stop(end);
    saw.onended = () => { safeDisconnect(g); safeDisconnect(p); };
  }

  // A meteor: a very soft high tone gliding a few cents down while it crosses the stereo field.
  _meteor(when) {
    const M = this.music, ctx = M.ctx, { rnd, R } = M;
    const cands = METEOR_PITCHES.filter((m) => M.subset.has(pcOf(m)));
    const midi = (cands.length ? cands : METEOR_PITCHES)[Math.floor(rnd() * (cands.length || METEOR_PITCHES.length))];
    const f = mtof(midi), dur = R(8, 13), dir = rnd() < 0.5 ? -1 : 1;
    const g = ctx.createGain();
    const p = this._panner(-dir * 0.7);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 4000;
    g.connect(lp); lp.connect(p); p.connect(M.busIn); p.connect(M.tapeSend);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.011, when + dur * 0.45);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    if (p.pan) { p.pan.setValueAtTime(-dir * 0.7, when); p.pan.linearRampToValueAtTime(dir * 0.7, when + dur); }
    const o1 = ctx.createOscillator(); o1.type = 'sine';
    const o2 = ctx.createOscillator(); o2.type = 'sine';
    const o2g = ctx.createGain(); o2g.gain.value = 0.12;
    [[o1, 1], [o2, 2.003]].forEach(([o, mul]) => {
      o.frequency.setValueAtTime(f * mul * 1.004, when);
      o.frequency.linearRampToValueAtTime(f * mul * 0.996, when + dur);
      o.start(when); o.stop(when + dur + 0.1);
    });
    o1.connect(g); o2.connect(o2g); o2g.connect(g);
    o1.onended = () => { safeDisconnect(g); safeDisconnect(p); };
    M.meteorEnd = when + dur;
  }

  _schedule() {
    const M = this.music;
    if (!this.running || !M || M.retiring) return;
    const ctx = M.ctx, now = ctx.currentTime;
    if (M.next < now) M.next = now + 0.05;
    if (ctx.state !== 'running' && !this.offline) return; // offline contexts are suspended while ticking
    if (this.autoNext && now - M.t0 >= M.cycle) { this.next(); return; }
    const E = this.energy;

    this._updateAir(M, now);
    if (now >= M.subsetNext) { this._rotatePalette(M); M.subsetNext = now + M.R(70, 140); }

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
    for (const a of M.airs) {
      while (a.next < ahead) { this._fireAir(M, a, a.next); a.next += a.period; }
    }
    while (M.meteorNext < ahead) {
      const t = M.meteorNext, el = t - M.t0, g = gustAt(M, el);
      const ending = this.autoNext && el > M.cycle - ENDING;
      if (!ending && formAt(el, M.cycle) !== FORMS.intro && M.rnd() < 0.45 + 0.4 * g) this._meteor(t);
      M.meteorNext += M.R(60, 170) * (1.3 - 0.6 * g);
    }
  }

  // One cycle of a sung loop, unless a hidden rule silences it this time round.
  _fireAir(M, a, t) {
    const el = t - M.t0;
    if (this.autoNext && el > M.cycle - 8) return;
    if (!M.subset.has(pcOf(a.midi))) {
      // The palette moved on: the singer takes the nearest note that is still in it.
      const cands = AIR_PITCHES.filter((m) => M.subset.has(pcOf(m)));
      a.midi = cands[nearestIn(cands, a.midi)];
    }
    const ch = CHORDS[M.chord], rel = pcOf(a.midi - ch.root);
    if (rel === 1 || rel === 6) return;            // no b9 or tritone over the root
    M.airEnds = M.airEnds.filter((e) => e > t);
    if (M.airEnds.length >= 2) return;             // never more than two voices at once
    M.airEnds.push(t + a.len);
    const form = formAt(el, M.cycle), g = gustAt(M, el);
    const level = this.voices * form.airs * (1.15 - 0.45 * g) * M.R(0.8, 1);
    if (level > 0.001) this._air(t, a.midi, a.len, level, a.pan);
  }

  // Swap one note of the 5-note melody subset for one outside it; D or A always stays as an anchor.
  _rotatePalette(M) {
    const ins = PALETTE.filter((p) => M.subset.has(p)), outs = PALETTE.filter((p) => !M.subset.has(p));
    for (let k = 0; k < 8; k++) {
      const a = ins[Math.floor(M.rnd() * ins.length)], b = outs[Math.floor(M.rnd() * outs.length)];
      const next = new Set(PALETTE.filter((p) => (p === b || M.subset.has(p)) && p !== a));
      if (!next.has(2) && !next.has(9)) continue;
      M.subset = next;
      M.scale = buildScale(next);
      return;
    }
  }

  // Continuous layers that follow the wind: wind noise, pad brightness, stereo sway, tape echo.
  _updateAir(M, now) {
    const el = now - M.t0, g = gustAt(M, el), form = formAt(el, M.cycle);
    this.gust = g;
    M.formName = form.name;
    // Soft and dark: a breath of air behind the piano, never a storm in front of it.
    M.windGain.gain.setTargetAtTime(this.wind * 0.022 * (0.25 + 0.75 * g * g), now, 3);
    M.windFilt.frequency.setTargetAtTime(200 + 500 * g, now, 4);
    if (M.windPan.pan) M.windPan.pan.setTargetAtTime(Math.sin(el * 0.02) * 0.45, now, 4);
    M.padFilt.frequency.setTargetAtTime(form.padHz * (0.85 + 0.3 * g), now, 3);
    // In lulls the space opens: more tape echo, more drone; in gusts the echo steps back.
    M.tapeSend.gain.setTargetAtTime(this.tape * 0.5 * (1.25 - 0.5 * g), now, 3);
    M.tapeFB.gain.setTargetAtTime(form.fb, now, 6);
    if (M.tapePan.pan) M.tapePan.pan.setTargetAtTime(Math.sin(el * 0.013 + 1.7) * 0.5, now, 4);
    M.groundGain.gain.setTargetAtTime(form.ground * (1.2 - 0.4 * g), now, 6);
  }

  // A new phrase, or a remembered motif returning as an approximation of itself.
  _makePhrase(M, form, g, E) {
    const { rnd, R } = M;
    let steps, durs;
    if (M.motifs.length && rnd() < 0.4) {
      const m = M.motifs[Math.floor(rnd() * M.motifs.length)];
      steps = m.steps.slice(); durs = m.durs.slice();
      const v = rnd(), n = steps.length;
      if (v < 0.25) steps = steps.map((s) => -s);                                        // inversion
      else if (v < 0.4) { steps = [0, ...steps.slice(1).reverse().map((s) => -s)]; durs = durs.slice().reverse(); } // retrograde
      else if (v < 0.6) durs = durs.map((d) => d * 1.5);                                 // augmentation
      else if (v < 0.8 && n > 1) { const k = 1 + Math.floor(rnd() * (n - 1)); steps[k] += rnd() < 0.5 ? 1 : -1; } // one interval altered
      else if (n > 3) { const k = Math.ceil(n * 0.6); steps = steps.slice(0, k); durs = durs.slice(0, k); } // truncated
      durs[durs.length - 1] = Math.max(2, durs[durs.length - 1]);
    } else {
      // A branch sway: rise to a peak, fall back, settle on a long note.
      // Never more than three steps the same way: the scale is always interrupted.
      const len = Math.round(R(3, 6) + g * 1.5 + E);
      const peak = Math.floor(len * R(0.35, 0.65));
      steps = []; durs = [];
      let run = 0, lastDir = 0;
      for (let i = 0; i < len; i++) {
        const dir = i < peak ? 1 : -1, r = rnd();
        let s = i === 0 ? 0 : r < 0.12 ? 0 : r < 0.8 ? dir : r < 0.95 ? 2 * dir : -dir;
        const d = Math.sign(s);
        run = d !== 0 && d === lastDir ? run + 1 : d !== 0 ? 1 : run;
        if (run > 3 && Math.abs(s) === 1) { s = rnd() < 0.5 ? 0 : 2 * d; run = 0; }
        if (d !== 0) lastDir = d;
        steps.push(s);
        durs.push(rnd() < 0.25 ? 0.5 : rnd() < 0.2 ? 1.5 : 1);
      }
      durs[len - 1] = 2;
      M.motifs.push({ steps, durs });
      if (M.motifs.length > 3) M.motifs.shift();
    }
    const center = 66 + form.reg + (g - 0.5) * 8;
    const S = M.scale;
    M.mel.midi = S[snapToChord(S, nearestIn(S, center + R(-3, 3)), CHORDS[M.chord])];
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

    const S = M.scale, HI = S.length - 1;
    let idx = nearestIn(S, mel.midi);
    if (i > 0) {
      let j = idx + steps[i];
      if (j < 0 || j > HI) j = idx - steps[i]; // bounce off the range edge
      idx = clamp(j, 0, HI);
    }
    // Rest on chord tones; a phrase's last note often avoids the root, so nothing cadences.
    if (i === 0 || last || durs[i] >= 1.5) idx = snapToChord(S, idx, ch, last && rnd() < 0.6);
    const midi = S[idx];
    mel.midi = midi;

    const arc = Math.sin(Math.PI * (i + 0.5) / steps.length);
    const vel = clamp(26 + 15 * E + form.vel + (g - 0.5) * 10 + arc * 7 + (rnd() - 0.5) * 5, 20, 66);
    const pan = clamp((midi - 66) / 30 + Math.sin(el * 0.045) * 0.25, -0.6, 0.6);
    const when = t + (rnd() - 0.5) * 0.04;
    this._piano(when, midi, vel, pan);
    this._emitNote(when, vel / 100);

    const meteor = M.meteorEnd > t;
    // In a gust, an occasional quick upper neighbour, like a leaf flicking (not while a meteor passes).
    if (!meteor && g > 0.5 && i > 0 && rnd() < 0.12 * g && idx < HI) {
      this._piano(when - 0.07, S[idx + 1], vel * 0.5, pan);
    }
    // Rarely, a soft echo a fourth or sixth below, on the other side.
    if (rnd() < 0.06) this._piano(when + R(0.08, 0.18), midi - (rnd() < 0.5 ? 5 : 9), vel * 0.45, -pan);

    // Hidden rule: while a meteor sounds, the piano plays more sparsely.
    const base = form.ioi * (0.9 + M.noise(el * 0.31) * 0.3) * (1.2 - 0.28 * E) * (1.1 - 0.25 * g) * (meteor ? 1.35 : 1);
    const ioi = base * durs[i] * (0.92 + rnd() * 0.16);
    mel.i++;
    if (!last) return ioi;

    // Breath between phrases; in a lull, sometimes a long clearing with only pad, airs and wind.
    mel.phrase = null;
    let rest = R(1.2, 3.4) * form.rest * (1.3 - 0.5 * E) * (1.5 - g);
    if (g < 0.15 && rnd() < 0.5) rest += R(5, 12);
    return ioi + rest;
  }

  _changeChord(M, form, E, t) {
    const { rnd, R } = M, now = M.ctx.currentTime;
    // Pendulum: often sway back to the previous chord (i–VI–i–VI…) before moving on.
    const prev = M.chord;
    M.chord = M.prevChord && M.prevChord !== M.chord && rnd() < 0.35 ? M.prevChord : pickWeighted(CHORDS[M.chord].next, rnd);
    M.prevChord = prev;
    const ch = CHORDS[M.chord];
    // Harmonic rhythm breathes too: longer chords in intro and decay.
    M.chordEnd = t + form.chord * R(0.8, 1.25) * (1.1 - 0.2 * E);
    M.pedal = !M.pedal || rnd() < 0.7;
    M.wet.gain.setTargetAtTime((M.pedal ? 0.64 : 0.52) + 0.06 * E, now, 1.4);
    M.padGain.gain.setTargetAtTime(form.pad, now, 3);
    M.subGain.gain.setTargetAtTime(form.sub, now, 5);
    M.sub.frequency.setTargetAtTime(mtof(subMidi(ch.root)), now, 2.5);
    this._padTo(ch);
    // A soft low root anchors the new harmony.
    const ending = this.autoNext && t - M.t0 > M.cycle - ENDING;
    if (rnd() < 0.55 && !ending) this._piano(t + R(0, 0.1), ch.root >= 46 ? ch.root - 12 : ch.root, R(24, 34), 0);
  }

  // Crossfade the pad to a new chord: old voices ring out, new ones swell in.
  // Each voice is two slightly detuned oscillators spread left and right for a slow, living shimmer.
  // When the current palette holds it, an added 9th or 11th tints the chord.
  _padTo(ch, attack = 3.5) {
    const M = this.music, ctx = M.ctx, now = ctx.currentTime;
    M.padOscs.forEach((o) => safeStop(o, now + 4.5));
    M.padOscs = [];
    let ivs = ch.pad.slice();
    if (M.rnd() < 0.35) ivs = [...ivs.slice(1), ivs[0] + 12]; // inversion for colour
    const have = new Set(ivs.map((iv) => pcOf(ch.root + iv)));
    for (const ext of [14, 17]) {
      const pc = pcOf(ch.root + ext);
      if (!have.has(pc) && M.subset.has(pc) && M.rnd() < 0.45) { ivs.push(ext); have.add(pc); }
    }
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

Music3.TICK_MS = TICK_MS; // the offline host steps at the engine's own tick
if (typeof window !== 'undefined') window.Music3 = Music3;
if (typeof module !== 'undefined') module.exports = { Music3 };
