// ---------------------------------------------------------------
// Generative piano, in the spirit of Nils Frahm.
//
// Everything — key, mode, register, phrasing, how much silence the
// piece keeps — is drawn from the token hash, so a given token always
// plays the same music. The world plays it: wind lengthens the
// release and darkens the tone, a storm pushes the performance, and
// silence is treated as a note rather than an absence of one.
//
// Each note is three layers: hammer (wood and felt), strings
// (inharmonic partials with sympathetic resonance), room (a generated
// impulse response). Timing and velocity are deliberately imperfect.
// ---------------------------------------------------------------

const MUSIC = {
  ready: false,
  ctx: null,
  out: null,
  wet: null,
  gust: 0.5,
  storm: 0,

  setWorld(gust, storm) {
    this.gust = gust;
    this.storm = storm;
  },
};

// hash-seeded stream, independent of the visual one
let mrnd = null;
const mnum = (a = 1, b) => (b === undefined ? mrnd() * a : a + (b - a) * mrnd());
const mpick = (list) => list[Math.floor(mrnd() * list.length)];

// modes kept small and open, the way Frahm tends to sit in one room
const MODES = {
  aeolian: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  pentatonic: [0, 3, 5, 7, 10],
  ionian: [0, 2, 4, 5, 7, 9, 11],
};

let SCORE = null;

// The score is decided at load, from the hash alone — so the token's
// features are known before a note is played or the audio is unlocked.
function buildScore() {
  // its own instance of the token's stream, so the score is fixed by the
  // hash and can be re-derived by the features script
  const M = new Random(AB.hash);
  mrnd = () => M.random_dec();

  SCORE = {
    root: 50 + Math.floor(mnum(0, 8)),          // D3 upward
    mode: mpick(["aeolian", "dorian", "phrygian", "pentatonic", "ionian"]),
    bpm: 48 + mnum(0, 14),                       // breathing, not clockwork
    _bpmDraw: 0,
    silence: mnum(0.25, 0.6),                    // silence as a parameter
    warmth: mnum(0.2, 0.9),
    register: mnum(-3, 5),
    spread: mnum(0.3, 1),
    bassEvery: 4 + Math.floor(mnum(0, 5)),
    tail: mnum(2.6, 4.4),
  };
  SCORE._bpmDraw = SCORE.bpm;

  // a collector may fix the mode and the pace of the performance
  const mode = (AB.param("mode") || "").toLowerCase();
  if (MODES[mode]) SCORE.mode = mode;

  const tempo = (AB.param("tempo") || "").toLowerCase();
  const bands = { held: [48, 52], walking: [52, 57], flowing: [57, 62] };
  if (bands[tempo]) {
    const [lo, hi] = bands[tempo];
    // keep the token's own position inside the band it was moved to
    const frac = (SCORE._bpmDraw - 48) / 14;
    SCORE.bpm = lo + (hi - lo) * frac;
  }
}

function initMusic(ctx, master) {
  const room = ctx.createConvolver();
  room.buffer = impulse(ctx, SCORE.tail, 2.2);
  const wet = ctx.createGain();
  wet.gain.value = 0.5 + SCORE.warmth * 0.35;
  const dry = ctx.createGain();
  dry.gain.value = 0.55;

  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 3200;
  tone.Q.value = 0.4;

  const bus = ctx.createGain();
  bus.gain.value = 0.9;
  bus.connect(tone);
  tone.connect(dry).connect(master);
  tone.connect(room).connect(wet).connect(master);

  MUSIC.ctx = ctx;
  MUSIC.out = bus;
  MUSIC.tone = tone;
  MUSIC.ready = true;

  startPerformance();
}


// a decaying noise tail — the room the piano sits in
function impulse(ctx, seconds, curve) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, curve);
    }
  }
  return buf;
}

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

function scaleNote(degree) {
  const steps = MODES[SCORE.mode];
  const oct = Math.floor(degree / steps.length);
  const idx = ((degree % steps.length) + steps.length) % steps.length;
  return SCORE.root + steps[idx] + oct * 12;
}

// ---- the instrument -------------------------------------------------
function pianoNote(at, midi, vel) {
  const ctx = MUSIC.ctx;
  const f = mtof(midi);
  const wind = MUSIC.gust;
  const dur = (SCORE.tail * 0.55 + wind * 1.6) * (0.7 + vel * 0.6);

  // hammer: a short felt-and-wood knock
  const nb = ctx.createBufferSource();
  nb.buffer = hammerBuffer(ctx);
  const nf = ctx.createBiquadFilter();
  nf.type = "bandpass";
  nf.frequency.value = Math.min(9000, f * 3.2);
  nf.Q.value = 0.9;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.0001, at);
  ng.gain.exponentialRampToValueAtTime(0.16 * vel, at + 0.004);
  ng.gain.exponentialRampToValueAtTime(0.0001, at + 0.09);
  nb.connect(nf).connect(ng).connect(MUSIC.out);
  nb.start(at);
  nb.stop(at + 0.12);

  // strings: slightly inharmonic partials, quietly detuned
  const partials = [
    [1, 1.0, dur],
    [2.003, 0.42, dur * 0.72],
    [3.011, 0.2, dur * 0.5],
    [4.02, 0.09, dur * 0.34],
  ];
  const drift = (wind - 0.5) * 3 + mnum(-1.2, 1.2);
  for (const [mult, amp, d] of partials) {
    const o = ctx.createOscillator();
    o.type = mult === 1 ? "triangle" : "sine";
    o.frequency.value = f * mult;
    o.detune.value = drift * mult;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.22 * amp * vel, at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, at + d);
    o.connect(g).connect(MUSIC.out);
    o.start(at);
    o.stop(at + d + 0.1);
  }

  // sympathetic resonance: a fifth above, barely there
  if (mrnd() < 0.35) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f * 1.4983;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at + 0.02);
    g.gain.exponentialRampToValueAtTime(0.03 * vel, at + 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur * 1.2);
    o.connect(g).connect(MUSIC.out);
    o.start(at);
    o.stop(at + dur * 1.3);
  }
}

let _hammerBuf = null;
function hammerBuffer(ctx) {
  if (_hammerBuf) return _hammerBuf;
  const len = Math.floor(ctx.sampleRate * 0.12);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  }
  _hammerBuf = buf;
  return buf;
}

// ---- the performance -------------------------------------------------
let nextBeat = 0;
let beat = 0;
let centre = 0;

function startPerformance() {
  centre = SCORE.register;
  nextBeat = MUSIC.ctx.currentTime + 1.2;
  setInterval(tick, 90);
}

function tick() {
  const ctx = MUSIC.ctx;
  if (!ctx) return;
  const horizon = ctx.currentTime + 0.5;
  while (nextBeat < horizon) {
    playBeat(nextBeat);
    // the pulse breathes: it drags in calm air, leans forward in wind
    const bpm = SCORE.bpm + MUSIC.gust * 6 + MUSIC.storm * 5;
    nextBeat += (60 / bpm) * (0.94 + mnum(0, 0.12));
    beat++;
  }
}

function playBeat(at) {
  const wind = MUSIC.gust;
  const storm = MUSIC.storm;

  // how full the bar is: wind and storm fill the room, calm empties it
  const life = 0.35 + wind * 0.35 + storm * 0.3;
  const rest = SCORE.silence * (1.25 - life);

  // the register drifts slowly over minutes, the piece never settles
  centre += mnum(-0.35, 0.35) + Math.sin(beat * 0.017) * 0.12;
  centre = Math.max(-4, Math.min(9, centre));

  if (beat % SCORE.bassEvery === 0) {
    const bass = scaleNote(Math.round(mnum(-1, 1))) - 24;
    pianoNote(at + mnum(-0.02, 0.02), bass, 0.5 + mnum(0, 0.2));
  }

  if (mrnd() < rest) return; // silence, played on purpose

  const voices = 1 + (mrnd() < 0.35 + storm * 0.25 ? 1 : 0) + (mrnd() < 0.12 ? 1 : 0);
  for (let v = 0; v < voices; v++) {
    const deg = Math.round(centre + mnum(-2.4, 2.4) * SCORE.spread + v * 2);
    const push = mnum(-0.028, 0.028) + v * mnum(0.01, 0.05); // human push and pull
    const vel = 0.32 + mnum(0, 0.3) + wind * 0.12 - v * 0.06;
    pianoNote(at + push, scaleNote(deg), Math.max(0.12, Math.min(0.95, vel)));
  }

  // the tone darkens as the wind rises
  MUSIC.tone.frequency.setTargetAtTime(3400 - wind * 900 - storm * 500, MUSIC.ctx.currentTime, 0.6);
}

// ---------------------------------------------------------------
// Token features — five traits, half palette and half performance.
// Declared at load so the platform can read them without waiting for
// the render or for the viewer to unlock the sound.
// ---------------------------------------------------------------
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const MODE_NAMES = {
  aeolian: "Aeolian",
  dorian: "Dorian",
  phrygian: "Phrygian",
  pentatonic: "Pentatonic",
  ionian: "Ionian",
};

// how dark the chosen palette sits overall
function paletteWeight() {
  let sum = 0;
  for (const hex of PALETTE) {
    const n = parseInt(hex.slice(1), 16);
    sum += (((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) / 255;
  }
  const l = sum / PALETTE.length;
  return l < 0.45 ? "Deep" : l < 0.62 ? "Soft" : "Bright";
}

try {
  buildScore();
} catch (e) {
  if (window.__abReport) window.__abReport("score could not be built: " + e.message, String(e.stack || ""));
}

// Art Blocks reads the traits off window.$features, set inside the art
// script itself. features.js holds the same calculation for the
// platform's features-script field.
try {
window.$features = {
  Palette: paletteName,
  Ink: paletteWeight(),
  Key: NOTE_NAMES[SCORE.root % 12],
  Mode: MODE_NAMES[SCORE.mode],
  Tempo: SCORE.bpm < 52 ? "Held" : SCORE.bpm < 57 ? "Walking" : "Flowing",
};
AB.features(window.$features);
} catch (e) {
  if (window.__abReport) window.__abReport("features could not be computed: " + e.message, String(e.stack || ""));
}

if (typeof window !== "undefined") {
  window.setup = setup;
  window.draw = draw;
}
