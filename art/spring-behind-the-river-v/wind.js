// ---------------------------------------------------------------
// Wind layer: sway, drifting seeds, slow wave ripple, and a
// synthesized ambience (sea, birds, rustling leaves, wind).
// The still artwork is rendered once by sketch.js; everything here
// runs on top of it so the piece stays cheap to animate.
// ---------------------------------------------------------------

const WIND = {
  swayAmp: 1.5,    // max horizontal shear of the tree, in px (owner: 4–5× calmer than the original 7)
  swaySpeed: 1.15,
  seedCount: 46,
  waveTop: 0.45,   // fraction of the canvas where the water starts
  waveAmp: 5.2,
  flow: 1.0,       // how strongly the current runs
  slice: 20,       // px per redrawn strip
};

// a storm sweeps through every 30 seconds and bends only the small
// branches — one direction per storm, drawn from the hash
const STORM = {
  period: 30,      // seconds between storms
  attack: 2.4,
  hold: 2.2,
  release: 4.0,
  bend: 5.5,       // extra horizontal bend of the fine branches, in px (owner: 4–5× calmer than the original 26)
};
let storm = 0;     // 0..1 envelope
let windDir = 1;   // +1 blowing right, -1 blowing left
let wavePhase = 0; // integrated, so the river never stops or backs up
let waveSpeed = 1; // smoothed, so gusts and storms ease in and out
let stormDir = 1;
let stormIndex = -1;
let stormRnd = null;

let seeds = [];

// the seeds come and go: they drift for 5 seconds, sweep out of the
// frame, and the air stays empty for 3 seconds before the next flight
// the flight thins out and fills up again on an eight second breath,
// but the frame is never left empty
const SEED_CYCLE = { period: 8, min: 0.22, max: 1 };
let windT = 0;
let gust = 0;      // the wind of the piece itself (no sound in it): moves the tree
let sGust = 0;     // the same wind plus the sound: moves the water and the seeds

// ── Sound → moving waves (Grokly) ───────────────────────────────────────────────────────────────
// صدا فقط روی موج‌های رودخانه و دانه‌های شناور اثر دارد؛ اندازه و جای درخت، شکوفه‌ها و قاب ثابت می‌مانند.
// The river is drawn in horizontal strips; each third of it answers to its own part of the sound:
// شکل‌دهی صدا (sndFrame، یک بار در هر فریم): پوش «حملهٔ تند، رهایی آرام» برای هر ویژگی، زانوی نرم برای اوج‌ها،
// فازهای انباشته (تغییر سرعت لرزش هرگز پرش فاز نمی‌سازد)، و وزن آرام گفتار ↔ موسیقی از flatness و vibrato:
// tempo و tempoPhase فقط در موسیقی اثر دارند (در گفتار هجاها ضرب گرفته می‌شوند و tempo همیشه پر است). در سکوت آب و دانه‌ها نرم آرام می‌گیرند.
//   موج‌های دور (افق)   far third   ← level (بلندی، پوش نرم) ارتفاع موج · trend (میانگین ۳ ثانیه) بالا آمدن · air (نفس، «س») لرزش ریز · centroid (روشنی صدا) سرعت لرزش
//   موج‌های میانی       middle third ← voiced (صدای آهنگین) پیدا شدن موج · pitch نسبی (زیر و بمی نسبت به میانگین خود صدا) طول موج ·
//                                       pitchDelta (بالا/پایین رفتن نت) سرعت جریان · vibrato (فقط تحریر واقعی) لرزش ملایم تاج
//   موج‌های نزدیک       near third  ← bass + sub (صدای بم) پف کردن · onset (هر حمله) موج‌هایی که از بالا به پایین می‌روند، تا ۴ تا با هم ·
//                                       tempoPhase (ریتم، فقط موسیقی) نفس کشیدن · dynamics (اوج/فرود، هموار) کشیدگی
//   سرعت جریان آب                     ← tempo (فقط موسیقی) + flux (سرعت تغییر صدا، بیشتر در گفتار)
//   دانه‌های شناور                     ← tempo (فقط موسیقی) + level سرعت · attack (حملهٔ ناگهانی، پوشی که حدود یک ثانیه می‌خوابد) وزش باد ·
//                                       presence (وضوح حروف) درخشش · rolloff (خیلی آرام) تعداد · silence (سکوت) آرام گرفتن
// درخت و تاب خوردنش (gust، storm) هیچ صدایی ندارند.
const SND = () => (window.SONIC && SONIC.active ? SONIC : {});
const SN = { mus: 0.5, en: 0, lv: 0, tr: 0, air: 0, vo: 0, pr: 0.5, vib: 0, low: 0, dyn: 0, att: 0, tp: 0, fx: 0, pd: 0, pre: 0.5, ro: 1, fl: 0, vb: 0 };
let midPh = 0, airPh = 0, vibPh = 0, beatPh = 0, pAvg = 0.2, crests = [], lastOnset = 0;
const sCl = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const sSoft = (x, t) => { const s = sCl((x - t) / (1 - t)); return 1 - (1 - s) * (1 - s); };   // زانوی نرم
// پوش: tu ثابت زمانی حمله، td ثابت زمانی رهایی (ثانیه)
const sEnv = (k, x, tu, td, dt) => { const c = SN[k]; SN[k] = c + (x - c) * (1 - Math.exp(-dt / (x > c ? tu : td))); return SN[k]; };
function sndFrame(dt) {
  const sv = SND();
  const fl = sEnv("fl", sv.flatness || 0, 0.7, 0.7, dt), vb = sEnv("vb", sv.vibrato || 0, 0.7, 0.7, dt);
  sEnv("mus", 0.6 * sCl((fl - 0.07) / 0.12) + 0.4 * sCl((0.45 - vb) / 0.35), 1.2, 1.2, dt);
  sEnv("en", sv.level || 0, 0.12, 0.9, dt);
  sEnv("lv", sv.level || 0, 0.08, 0.6, dt);
  sEnv("tr", sv.trend || 0, 1.0, 2.0, dt);
  sEnv("air", sSoft(sv.air || 0, 0.1), 0.1, 0.5, dt);
  airPh += dt * (6 + 8 * (sv.centroid || 0));
  const vo = sv.voiced || 0;
  sEnv("vo", sSoft(vo, 0.2), 0.3, 0.9, dt);
  if (vo > 0.3) pAvg += ((sv.pitch || 0) - pAvg) * 0.01;
  sEnv("pr", sCl(0.5 + 4 * ((sv.pitch || 0) - pAvg)), 0.8, 0.8, dt);
  sEnv("vib", sSoft(sv.vibrato || 0, 0.5) * SN.vo, 0.3, 0.5, dt);
  vibPh += dt * 14;
  sEnv("pd", sv.pitchDelta || 0, 0.25, 0.4, dt);
  midPh += dt * (0.6 + 6 * Math.tanh(SN.pd / 0.3) * 0.3);
  sEnv("low", 0.7 * (sv.bass || 0) + 0.3 * (sv.sub || 0), 0.07, 0.5, dt);
  sEnv("dyn", sv.dynamics || 0, 0.35, 0.8, dt);
  sEnv("att", sSoft(sv.attack || 0, 0.25), 0.08, 0.9, dt);
  sEnv("tp", (sv.tempo || 0) * SN.mus, 1.0, 1.5, dt);
  sEnv("fx", sv.flux || 0, 0.3, 0.8, dt);
  sEnv("pre", sv.presence || 0, 0.15, 0.6, dt);
  sEnv("ro", sv.rolloff ?? 1, 1.5, 3.0, dt);
  // onset: لبهٔ بالارونده، دست‌کم ۰٫۲۵ ثانیه فاصله، تا ۴ موج رونده
  const on = sv.onset || 0;
  if (on >= 0.75 && on > lastOnset + 0.05 && (!crests.length || crests[crests.length - 1].age > 0.25)) {
    crests.push({ y: WAVE_TOP, a: 0.35 + 0.65 * sSoft(sv.level || 0, 0.1), age: 0 }); if (crests.length > 4) crests.shift();
  }
  lastOnset = on;
  for (let i = crests.length - 1; i >= 0; i--) { const c = crests[i]; c.y += 270 * dt; c.a *= Math.exp(-dt / 1.1); c.age += dt; if (c.a < 0.02 || c.y > height + 60) crests.splice(i, 1); }
  // ریتم: فازی آرام که به tempoPhase قفل می‌شود
  const bpm = 60 + 120 * (sv.tempo || 0); let e = (sv.tempoPhase || 0) - beatPh; e -= Math.round(e);
  beatPh += dt * bpm / 60 + 0.08 * e; beatPh -= Math.floor(beatPh);
}

function windBegin() {
  initWind();
  return true;
}

function initWind() {
  // dedicated hash-derived stream, so storms and music are the same
  // for a given token every time it is opened
  stormRnd = AB.createRandom(AB.hash);

  // the weather can be turned up or down after minting
  const weather = { calm: 0.55, normal: 1, strong: 1.7 }[(AB.param("wind") || "").toLowerCase()];
  if (weather) {
    WIND.swayAmp *= weather;
    WIND.flow *= 0.7 + weather * 0.3;
    STORM.bend *= weather;
    STORM.period = round(STORM.period / weather);
  }
  seeds = [];
  for (let i = 0; i < WIND.seedCount; i++) seeds.push(makeSeed(true));
  document.addEventListener("pointerdown", startAmbience);
  document.addEventListener("keydown", startAmbience);
}

function makeSeed(spread) {
  const fromLeft = windDir >= 0;
  return {
    x: spread ? rnd.num(-40, width) : fromLeft ? rnd.num(-60, -10) : rnd.num(width + 10, width + 60),
    y: rnd.num(height * 0.08, height * 0.95),
    r: rnd.num(0.8, 2.6),
    sp: rnd.num(0.35, 1.4),
    bob: rnd.num(0.6, 2.2),
    phase: rnd.num(0, TWO_PI),
    a: rnd.num(120, 255),
  };
}

// ---------------------------------------------------------------
// Film grain: a set of fine noise fields exposed from the token hash,
// cut at projection speed and re-registered slightly every frame, the
// way a print never sits perfectly still in the gate.
// ---------------------------------------------------------------
const GRAIN = {
  frames: 12,     // how many grain fields to cut between
  fps: 24,        // projection speed
  scale: 1.4,     // px per grain — film grain is fine, not blocky
  alpha: 0.1,     // how present the grain is
  weave: 0.8,     // px of gate weave
};
let grainFields = [];

// the fields are exposed a strip at a time, one frame after another, so
// the build never blocks; the noise stream is unchanged
let grainRnd = null;
let grainField = 0;
let grainImg = null;
let grainAt = 0;
const GRAIN_CHUNK = 40000;

function buildGrainSlice() {
  if (!grainRnd) {
    grainRnd = AB.createRandom(AB.hash);
    grainFields = [];
    grainField = 0;
    grainAt = 0;
  }
  if (grainField >= GRAIN.frames) return true;

  if (!grainImg) {
    grainImg = createImage(ceil(width / GRAIN.scale) + 4, ceil(height / GRAIN.scale) + 4);
    grainImg.loadPixels();
    grainAt = 0;
  }

  const px = grainImg.pixels;
  const end = min(px.length, grainAt + GRAIN_CHUNK);
  for (let i = grainAt; i < end; i += 4) {
    // gaussian-ish, so most grains are quiet and a few are bright
    const n = (grainRnd() + grainRnd() + grainRnd() - 1.5) / 1.5;
    const v = 128 + n * 96;
    px[i] = px[i + 1] = px[i + 2] = v;
    px[i + 3] = 255;
  }
  grainAt = end;

  if (grainAt >= px.length) {
    grainImg.updatePixels();
    grainFields.push(grainImg);
    grainImg = null;
    grainField++;
  }
  return grainField >= GRAIN.frames;
}

function drawGrain() {
  if (!grainFields.length) return;
  const tick = floor(windT * GRAIN.fps);
  const f = grainFields[tick % grainFields.length];
  // the grain sits in a different place on every exposure
  const ox = ((tick * 7919) % 17) - 8;
  const oy = ((tick * 104729) % 17) - 8;
  const wx = sin(tick * 1.7) * GRAIN.weave;
  const wy = cos(tick * 2.3) * GRAIN.weave;

  push();
  blendMode(OVERLAY);
  drawingContext.save();
  drawingContext.globalAlpha = GRAIN.alpha;
  image(f, ox + wx, oy + wy, f.width * GRAIN.scale, f.height * GRAIN.scale);
  drawingContext.restore();
  pop();
  blendMode(BLEND);
}

function windFrame() {
  windT = vms() / 1000; // the piece's clock (stands still while it builds in Grokly)
  updateStorm();
  // one shared gust value drives the visuals and the wind sound
  gust = 0.25 + 0.75 * noise(windT * 0.22) + storm * 0.9;                       // the tree's own wind — no sound
  const sv = SND();
  sndFrame(min(deltaTime, 60) / 1000);
  // باد دانه‌ها و آب: باد خود اثر + tempo (فقط موسیقی) + level (پوش نرم)؛ در سکوت آرام
  sGust = gust + 1.2 * (0.45 * SN.tp + 0.55 * sSoft(SN.en, 0.05)) * (1 - 0.8 * (sv.silence || 0));
  if (AMBIENCE.ready) {
    AMBIENCE.setGust(min(gust, 1.8));
    AMBIENCE.readLevel();
  }
  if (typeof MUSIC !== "undefined" && MUSIC.ready) MUSIC.setWorld(gust, storm);

  if (baseAnim) image(baseAnim, 0, 0, width, height);
  drawWater();
  swayTree();
  driftSeeds();
  drawGrain();
  if (!AMBIENCE.ready && !window.__GROKLY_FEED) soundHint(); // در گروکلی هیچ متنی روی اثر نمی‌آید
}

function updateStorm() {
  const idx = floor(windT / STORM.period);
  if (idx !== stormIndex) {
    stormIndex = idx;
    stormDir = stormRnd() < 0.5 ? -1 : 1;
  }

  // outside a storm the air moves to the right; a storm can turn it
  const target = storm > 0.15 ? stormDir : 1;
  windDir += (target - windDir) * 0.02;

  const local = windT % STORM.period;
  const { attack, hold, release } = STORM;
  if (local < attack) storm = pow(local / attack, 1.6);
  else if (local < attack + hold) storm = 1;
  else if (local < attack + hold + release) storm = pow(1 - (local - attack - hold) / release, 2);
  else storm = 0;
}

// only the water sheet moves: it runs like a river, faster near the
// bottom of the frame and completely still at the horizon
function drawWater() {
  if (!WG) return;
  const dt = min(deltaTime, 60) / 1000;
  // the wind sets the pace, but slowly — no jumps when a storm arrives
  // سرعت جریان آب: tempo (فقط موسیقی) + flux (سرعت تغییر صدا، بیشتر در گفتار)
  const targetSpeed = 0.75 + gust * 0.55 + storm * 0.35 + 1.0 * SN.tp + 0.8 * SN.fx * (1 - 0.5 * SN.mus);
  const lvS = sSoft(SN.lv, 0.05), lowS = Math.tanh(SN.low / 0.9) * 0.9, dynS = Math.tanh(SN.dyn / 0.8) * 0.8;
  const breath = SN.mus * sSoft(SN.en, 0.05);
  waveSpeed += (targetSpeed - waveSpeed) * 0.02;
  wavePhase += WIND.flow * 26 * waveSpeed * dt;

  const top = WAVE_TOP;
  const bottom = WAVE_BOTTOM;
  const span = max(1, bottom - top);
  const m = 35; // the painted border of the piece

  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(m, m, width - m * 2, height - m * 2);
  drawingContext.clip();

  // anything painted outside the water stays exactly where it was
  if (top > 0) image(WG, 0, 0, width, top, 0, 0, width, top);
  if (bottom < height) image(WG, 0, bottom, width, height - bottom, 0, bottom, width, height - bottom);

  for (let y = top; y < bottom; y += WIND.slice) {
    const h = min(WIND.slice, bottom - y);
    const depth = (y - top) / span;
    const grow = pow(depth, 0.85);
    const swell =
      sin(windT * 1.05 + y * 0.034) +
      sin(windT * 0.66 - y * 0.016) * 0.75 +
      sin(windT * 1.7 + y * 0.052) * 0.35;
    let stretch = sin(windT * 0.8 - y * 0.03) * 6 * grow;
    let dy = sin(windT * 0.9 + y * 0.055) * 2.6 * grow;
    let extra = 0, amp = 1;
    if (depth < 1 / 3) {
      // موج‌های دور: level ارتفاع · trend بالا آمدن · air لرزش ریز · centroid سرعت لرزش
      amp = 1 + 1.2 * lvS;
      dy += 5 * SN.tr;
      extra += 4 * SN.air * sin(airPh + y * 0.21);
    } else if (depth < 2 / 3) {
      // موج‌های میانی: pitch طول موج · pitchDelta جهت جریان · voiced پیدا شدن · vibrato لرزش
      extra += 16 * SN.vo * sin(y * (0.02 + 0.05 * SN.pr) + midPh) + 2.5 * SN.vib * sin(vibPh + y * 0.4);
    } else {
      // موج‌های نزدیک: bass+sub پف کردن · onset موج رونده · tempoPhase نفس · dynamics کشیدگی
      amp = 1 + 1.5 * lowS;
      let cr = 0; for (const c of crests) { const dc = (y - c.y) / 26; cr += c.a * Math.exp(-dc * dc); }
      extra += 22 * Math.tanh(cr / 1.2) * 1.2;
      stretch += 8 * breath * sin(2 * Math.PI * beatPh) + 9 * dynS;
    }
    const sy = constrain(y - dy, top, bottom - h);

    // the current only ever runs to the right: the phase is integrated,
    // so a change of wind speeds it up or eases it off without ever
    // stopping the water or pulling it backwards
    const scroll = (wavePhase * (0.3 + grow)) % width;
    const wobble = swell * WIND.waveAmp * grow * 0.9 * amp + extra * grow;
    const dx = scroll + wobble - stretch * 0.5;

    image(WG, dx - width, y, width + stretch, h, 0, sy, width, h);
    image(WG, dx, y, width + stretch, h, 0, sy, width, h);
  }

  drawingContext.restore();
  pop();
}

// the sway of a branch at height `up` (0 at the ground, 1 at the crown):
// a slow bend, a faster second harmonic, and a little noise on top
function swayAt(up, speed) {
  return (
    sin(windT * speed * 0.8 + up * 2.4) +
    sin(windT * speed * 1.9 + up * 5.1) * 0.35 +
    (noise(up * 2.2, windT * 0.55) - 0.5) * 1.6
  );
}

// The whole tree is bent by a single shear: branches, leaves and
// flowers stay attached to each other, the crown travels furthest and
// the foot of the trunk stays put.
function swayTree() {
  const baseBend = WIND.swayAmp * (0.35 + gust);
  const amount = lerp(0.5 + 0.5 * swayAt(1, WIND.swaySpeed), 1, storm);
  const bend = windDir * (baseBend * 1.6 * amount + storm * STORM.bend);

  push();
  // x' = x + bend * (1 - y / height)
  applyMatrix(1, 0, -bend / height, 1, bend, 0);
  const m = TREE_MARGIN;
  if (TG_THICK) image(TG_THICK, -m, -m, width + m * 2, height + m * 2);
  if (TG_FINE) image(TG_FINE, -m, -m, width + m * 2, height + m * 2);
  drawBlooms();
  pop();
}

// the blossoms answer the music: they swell on a loud phrase and
// settle back into their own size in the silences
function drawBlooms() {
  // owner: the tree (and its blossoms) never changes size with the sound
  const grow = 1;
  const alpha = 0.85;
  const ctx = drawingContext;
  // one path per opacity bucket: a thousand separate circle() calls is
  // far too slow, a handful of batched fills is not
  for (let b = 0; b < BLOOM_BUCKETS.length; b++) {
    const list = BLOOM_BUCKETS[b];
    if (!list || !list.length) continue;
    ctx.beginPath();
    for (let i = 0; i < list.length; i++) {
      const f = list[i];
      const r = f.d * grow * 0.5;
      ctx.moveTo(f.x + r, f.y);
      ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
    }
    ctx.fillStyle = "rgba(255,255,255," + (((b + 0.5) / BLOOM_BUCKETS.length) * alpha).toFixed(3) + ")";
    ctx.fill();
  }
}

function driftSeeds() {
  const breath = 0.5 - 0.5 * cos((TWO_PI * windT) / SEED_CYCLE.period);
  const target = round(
    WIND.seedCount * (SEED_CYCLE.min + (SEED_CYCLE.max - SEED_CYCLE.min) * breath)
  );
  if (seeds.length < target) seeds.push(makeSeed(false));

  const dt = min(deltaTime, 60) / 16.7; // keep the drift frame-rate independent

  noStroke();
  for (let i = seeds.length - 1; i >= 0; i--) {
    const s = seeds[i];
    // دانه‌ها: tempo (موسیقی) + level سرعت · attack وزش ناگهانی (پوش نرم) · silence آرام گرفتن
    s.x += windDir * s.sp * (0.5 + sGust * 2.1 + 4.5 * SN.att) * dt;
    s.y += (sin(windT * 1.7 + s.phase) * 0.5 + (sGust - 0.6) * 0.25) * dt;

    if (s.x > width + 12 || s.x < -12 || s.y < -12 || s.y > height + 12) {
      // seeds that leave come back, unless the flight is thinning out
      if (seeds.length > target) seeds.splice(i, 1);
      else seeds[i] = makeSeed(false);
      continue;
    }

    const live = !!(window.SONIC && SONIC.active);
    if (live && i > seeds.length * (0.35 + 0.65 * SN.ro)) continue;   // rolloff (خیلی آرام): how many seeds show
    fill(255, s.a * (0.55 + gust * 0.45) * (live ? 0.5 + 0.5 * SN.pre : 1));  // presence: brightness
    circle(s.x, s.y, s.r * 2);
    fill(255, s.a * 0.18);
    circle(s.x, s.y, s.r * 4.5);
  }
}

function soundHint() {
  push();
  noStroke();
  fill(255, 150);
  textSize(8);
  textAlign(CENTER, BOTTOM);
  text("click for sound", width / 2, height - 10);
  pop();
}

// ---------------------------------------------------------------
// Ambience — synthesized with the Web Audio API, no audio files.
// sea: filtered brown noise, breathing slowly
// wind: band-passed noise, gain follows the same gust as the seeds
// leaves: high-passed noise flutter, loudest in a gust
// birds: occasional short chirps
// ---------------------------------------------------------------
const AMBIENCE = {
  ready: false,
  level: 0,
  analyser: null,
  _buf: null,
  ctx: null,
  windGain: null,
  leafGain: null,
  master: null,

  readLevel() {
    if (!this.analyser) return 0;
    this.analyser.getByteTimeDomainData(this._buf);
    let sum = 0;
    for (let i = 0; i < this._buf.length; i++) {
      const v = (this._buf[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / this._buf.length);
    // slow attack out of silence, slower release, so it breathes
    const target = Math.min(1, rms * 5.5);
    this.level += (target - this.level) * (target > this.level ? 0.35 : 0.08);
    return this.level;
  },

  setGust(g) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.windGain.gain.setTargetAtTime(0.006 + g * 0.038, t, 0.5);
    this.leafGain.gain.setTargetAtTime(g * g * 0.03, t, 0.5);
  },
};

function noiseBuffer(ctx, seconds, brown) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) {
    const w = Math.random() * 2 - 1;
    if (brown) {
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.2;
    } else {
      d[i] = w;
    }
  }
  return buf;
}

function noiseSource(ctx, buf, node) {
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  src.connect(node);
  src.start();
  return src;
}

function startAmbience() {
  if (AMBIENCE.ready) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  const ctx = new AC();
  ctx.resume();

  const master = ctx.createGain();
  master.gain.value = 0.0;
  master.connect(ctx.destination);
  master.gain.setTargetAtTime(0.85, ctx.currentTime, 2.5);

  const brown = noiseBuffer(ctx, 1.5, true);
  const white = noiseBuffer(ctx, 1.5, false);

  // sea
  const seaFilter = ctx.createBiquadFilter();
  seaFilter.type = "lowpass";
  seaFilter.frequency.value = 480;
  const seaGain = ctx.createGain();
  seaGain.gain.value = 0.16;
  seaFilter.connect(seaGain).connect(master);
  noiseSource(ctx, brown, seaFilter);

  // swell of the waves
  const swell = ctx.createOscillator();
  swell.frequency.value = 0.07;
  const swellDepth = ctx.createGain();
  swellDepth.gain.value = 0.09;
  swell.connect(swellDepth).connect(seaGain.gain);
  swell.start();

  // wind
  const windFilter = ctx.createBiquadFilter();
  windFilter.type = "bandpass";
  windFilter.frequency.value = 620;
  windFilter.Q.value = 0.8;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.008;
  windFilter.connect(windGain).connect(master);
  noiseSource(ctx, white, windFilter);

  // rustling leaves
  const leafFilter = ctx.createBiquadFilter();
  leafFilter.type = "highpass";
  leafFilter.frequency.value = 3800;
  const leafGain = ctx.createGain();
  leafGain.gain.value = 0.0;
  leafFilter.connect(leafGain).connect(master);
  noiseSource(ctx, white, leafFilter);

  AMBIENCE.ctx = ctx;
  AMBIENCE.master = master;
  AMBIENCE.windGain = windGain;
  AMBIENCE.leafGain = leafGain;
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 1024;
  master.connect(analyser);
  AMBIENCE.analyser = analyser;
  AMBIENCE._buf = new Uint8Array(analyser.fftSize);

  AMBIENCE.ready = true;

  scheduleBird();
  if (typeof initMusic === "function") initMusic(ctx, master);
}

function chirp(ctx, at, f0, f1, dur, vol) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  const g = ctx.createGain();
  osc.frequency.setValueAtTime(f0, at);
  osc.frequency.exponentialRampToValueAtTime(f1, at + dur);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(vol, at + dur * 0.25);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(g).connect(AMBIENCE.master);
  osc.start(at);
  osc.stop(at + dur + 0.05);
}

function scheduleBird() {
  const ctx = AMBIENCE.ctx;
  if (!ctx) return;
  const wait = 2.5 + Math.random() * 7;
  const at = ctx.currentTime + wait;
  const notes = 2 + Math.floor(Math.random() * 3);
  const base = 1900 + Math.random() * 1500;
  const vol = 0.035 + Math.random() * 0.04;
  for (let i = 0; i < notes; i++) {
    const t = at + i * (0.09 + Math.random() * 0.07);
    chirp(ctx, t, base * (0.9 + Math.random() * 0.3), base * (1.15 + Math.random() * 0.5), 0.07 + Math.random() * 0.05, vol);
  }
  setTimeout(scheduleBird, (wait + 1) * 1000);
}
