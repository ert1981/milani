// ---------------------------------------------------------------
// Convenience wrappers over the Art Blocks stream in random.js. Every
// random value in this sketch comes from AB.rand, so a given token hash
// always reproduces the same image.
// ---------------------------------------------------------------
const rnd = {
  dec: () => R.random_dec(),
  num: (a, b) => (b === undefined ? R.random_num(0, a === undefined ? 1 : a) : R.random_num(a, b)),
  int: (a, b) => (b === undefined ? R.random_int(0, a) : R.random_int(a, b)),
  bool: (p = 0.5) => R.random_bool(p),
  choice: (list) => R.random_choice(list),
};

// ---------------------------------------------------------------
// Colour palettes — one is chosen per token from the hash.
// ---------------------------------------------------------------
const PALETTES = {
  "Azure Drift": ["#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#caf0f8"],
  "Autumn Ember": ["#cd4446", "#fd3741", "#f2bc45", "#e2c48c", "#c8958b", "#e9e0d6", "#fe4f11"],
  "Verdant": ["#073b3a", "#0b6e4f", "#248277", "#56ab91", "#88d4ab", "#a3b18a", "#ecf39e"],
  "Ash & Ink": ["#111111", "#2f2f2f", "#585858", "#817c77", "#b7b3ad", "#dedbd4", "#f5f3ee"],
  "Violet Hour": ["#2b1b4d", "#49619d", "#604791", "#721e7f", "#9b2b77", "#ab2562", "#e7c6ff"],
  "Sunset Bloom": ["#ff6800", "#ffa61a", "#ffc219", "#e24646", "#e98952", "#efb4a5", "#fed27a"],
};

const PALETTE_WEIGHTS = {
  "Azure Drift": 26,
  "Autumn Ember": 20,
  "Verdant": 18,
  "Ash & Ink": 14,
  "Violet Hour": 12,
  "Sunset Bloom": 10,
};

const paletteName = (() => {
  const names = Object.keys(PALETTE_WEIGHTS);
  const total = names.reduce((t, n) => t + PALETTE_WEIGHTS[n], 0);
  let r = rnd.num(0, total);
  let drawn = names[0];
  for (const n of names) {
    r -= PALETTE_WEIGHTS[n];
    if (r <= 0) { drawn = n; break; }
  }
  // the draw always happens, so a set palette does not shift the rest
  // of the composition
  const chosen = AB.param("palette");
  return PALETTES[chosen] ? chosen : drawn;
})();

const PALETTE = PALETTES[paletteName];

// a palette colour with a random alpha in [aMin, aMax]
function pcol(aMin = 255, aMax) {
  const c = color(rnd.choice(PALETTE));
  c.setAlpha(aMax === undefined ? aMin : rnd.num(aMin, aMax));
  return c;
}



let randomColor;
  let currentColor = null;
  
  
  let colorset3 = [];
  let colors4;
  
 
  
  
  let colorset = [];
  //let colorbg = "1C2611-2B4016-261416-031740".split("-").map((a) => "#" + a); // dark
  
  let originalGraphics;
  let lineGraphics;
  
  //let b = ["#000"];
  
  
  
          let colorbg;
  
  // only run once
  
  let Atumn = [   
          "#cd4446",
          "#f2bc45",
          "#e9e0d6",
          "#c8958b",
          "#e2c48c",
      "#fd3741",
   
          ];
  

  
  // ترسیم مستطیل با ابعاد 100 در 100 و پر کردن آن با یک رنگ تصادفی
 
  let Atumn3 = [ "#ffff","#e24646", "#e45848", "#e5644a", "#e7734d", "#e98952", "#eb9c5f", "#f0a762", "#f3af67", "#f8c271", "#fed27a" ];  
  

 
  
  //  "#"  
  

  
  let b = ["#000"];
  
  let x = ["#ffff"];
  

  
  
 

let STAGE;   // the surface the still artwork is composed on
let adad, adad2, adad3, adad4, adadk;
let ps1, ps2, ps3, qps1, qps2, qps3, qps4;
  function setup() {
    window.__abSetup = true;
    createCanvas(400, 500);
 pixelDensity(2);
STAGE = createGraphics(400, 500);
STAGE.pixelDensity(3);
   // Center the canvas in the viewport
   // Center the canvas in the viewport
// some hosts do not expose p5's `canvas` global; find the element either way
const cnv =
  (typeof canvas !== "undefined" && canvas) || document.querySelector("canvas");
if (cnv && cnv.parentElement) {
  const parent = cnv.parentElement;
  parent.style.height = '100vh';
  parent.style.width = '100vw';
  parent.style.display = 'flex';
  parent.style.justifyContent = 'center';
  parent.style.alignItems = 'center';
  cnv.style.aspectRatio = '2/2.5';
}

// Force canvas to fit in the smaller
// of width or height of document
const sizeCanvas = () => {
  if (!cnv) return;
  const isVertical = window.innerHeight > window.innerWidth;
  if (isVertical) {
    cnv.style.width = '100vw';
    cnv.style.height = 'calc(100vw * 2.5/2)';
  } else {
    cnv.style.height = '100vh';
    cnv.style.width = 'calc(100vh * 2/2.5)';
  }
}

// Make canvas fit in window
sizeCanvas();

// Optionally fit canvas on resize (does not resize art itself)
window.addEventListener('resize', sizeCanvas);

  
    rectMode(CENTER);
  
  
       
   
  
  //setupColorsBlue()
//setupColors()
 //setupColors1p() 
    rectMode(CENTER);
    randomSeed(rnd.num(0, 1e9));
    noiseSeed(rnd.num(0, 1e9));
    frameRate(60);

   adad= rnd.num(1, 3)

  adad2= rnd.num(0.01, 3) 
  adad3= rnd.num(270, 900)
  adad4= rnd.num(0, 300)
  adadk= rnd.num(100, 500)
  



 
 ps1 = rnd.num(440, 490)
 ps2 = rnd.num(410, 490) 
  ps3 = rnd.num(0, 490)    
   qps1 = rnd.num(0, 250)
     qps2 = rnd.num(0, 250)
     qps3 = rnd.num(0, 250)
 qps4 = rnd.num(0, 250)
        stroke(0)

      }
    
  
  
  let yoff = 0.0;
  
   let xoff = 0.0;
  
  
   let img;
  
  
  
  let drawTree = true;
  
  let numTrees =4;
  let treeCounter = 0;
  //os

  
 
let baseImg = null; // background, veil and frame, rendered once
let baseAnim = null; // same frame at animation resolution
let WG = null;       // the water, on its own layer
const TREE_MARGIN = 200; // overhang of the tree layers, in px
let WAVE_TOP = 0;    // where the painted water begins and ends
let WAVE_BOTTOM = 0;
let TG = null;       // active tree render target
let TG_THICK = null; // trunk and main branches — barely move
let TG_FINE = null;  // small branches, leaves and flowers — the storm bends these
let TREE_PASS = "thick";
let TRASH = null;    // sink for draw calls the current pass does not own
const FINE_H = 45;   // branch length below which a branch counts as "small"

// where every blossom sits, so it can be drawn live instead of baked,
// grouped into opacity buckets so they can be filled in batches
let BLOOMS = [];
let BLOOM_BUCKETS = [];
const BLOOM_LEVELS = 6;

function recordBloom(d, a) {
  const m = TG.drawingContext.getTransform();
  const dens = TG.pixelDensity();
  const scl = Math.hypot(m.a, m.b) / dens;
  const bloom = { x: m.e / dens - TREE_MARGIN, y: m.f / dens - TREE_MARGIN, d: d * scl, a };
  BLOOMS.push(bloom);
  const bucket = constrain(floor((a / 255) * BLOOM_LEVELS), 0, BLOOM_LEVELS - 1);
  BLOOM_BUCKETS[bucket].push(bloom);
}

function passDraws(h) {
  return TREE_PASS === "fine" ? h <= FINE_H : h > FINE_H;
}

// ---------------------------------------------------------------
// The piece is expensive to render once and cheap to animate. The build
// is therefore cut into small slices, one per frame: no single loop runs
// long enough to look like a hang, on any platform. The result is
// identical — the same work in the same order, just spread out.
// ---------------------------------------------------------------
let buildStep = 0;
let bi = 0;        // progress inside the current step
let built = false;

const BUILD = [
  baseLay,
  pixelFxSlice,
  grainBaseSlice,
  waterColorWash,
  paperSlice,
  captureBase,
  wavesBegin,
  wavesSlice,
  wavesGrainSlice,
  measureWaterSlice,
  treeThickSlice,
  treeFineSlice,
  windBegin,
  buildGrainSlice,
];

// what the loader calls each stage, and roughly how much of the wait it
// accounts for — so the bar moves at a believable pace
const STAGE_INFO = [
  ["PRIMING CANVAS", 1],
  ["DIFFUSING PIGMENT", 14],
  ["APPLYING GRAIN", 14],
  ["WETTING PAPER", 2],
  ["RAISING PAPER TOOTH", 10],
  ["FIXING PLATE", 1],
  ["ALLOCATING WATER", 1],
  ["PAINTING RIVER", 33],
  ["GRAINING RIVER", 14],
  ["SOUNDING DEPTH", 5],
  ["GROWING TRUNK", 22],
  ["GROWING CROWN", 22],
  ["RAISING WIND", 1],
  ["EXPOSING FILM STOCK", 36],
];
const STAGE_TOTAL = STAGE_INFO.reduce((t, s) => t + s[1], 0);
const SPINNER = "|/-" + String.fromCharCode(92);

// The whole build runs before the first frame is shown, so a still
// capture of the piece is never caught half-painted. It is driven by
// recursion rather than a loop: every individual loop inside a slice
// stays short, which is what a runaway-loop guard watches for.
// finish everything still outstanding in one go. Recursion, not a loop:
// no single loop runs long enough to look like a hang.
function buildAll() {
  if (buildStep >= BUILD.length) {
    built = true;
    return;
  }
  buildStepOnce();
  buildAll();
}

let buildError = null;
let buildT0 = 0;
const FRAME_BUDGET = 12;    // ms of build work per frame
const LOADER_MAX = 1500;    // after this, finish the rest at once
const LOADER_HOLD = 1900;   // keep the boot screen up at least this long

// Inside Grokly the clock is virtual and stands still within a frame, so the wall-clock budget above never runs out
// and the whole build used to run in the first frame (seconds of frozen main thread for the whole app). There the build
// runs a fixed number of slices per frame instead, and the piece's own clock (vms, frameCount) stands still until it is
// done: the frame that finishes the build is, for the piece, the same first frame as before, so every frame after it is
// identical to the old one-shot build, whatever the number of build frames. window.__groklyReady stays false until the
// piece reaches the frame Grokly used to show first (READY_FRAME, its warm-up length for this piece), so the first shown
// or exported frame is the same picture as before.
const FEED_SLICES = 2;     // build slices per frame in Grokly (each slice is a few ms)
const READY_FRAME = 64;    // the frame Grokly showed first before (art-engine WARM for this piece)
let buildShift = 0, buildFrames = 0;
// millis() at every draw call in Grokly (index = draw call number, from 1). Grokly's warm-up clock is the same on every
// run, so until the first shown frame the piece's frame n reads exactly the time the old build read at frame n
// (bit for bit: the film grain picks its exposure by rounding the clock, so a 1e-13 ms difference could show).
const millisAt = [0];
// the piece's clock: millis() minus the time spent in build frames after the first
function vms() {
  if (window.__GROKLY_FEED && window.__groklyReady === false && frameCount < millisAt.length) return millisAt[frameCount];
  return millis() - buildShift;
}
if (window.__GROKLY_FEED) window.__groklyReady = false;

function feedDraw() {
  window.__abDraw = true;
  window.__abFirstFrame = true; // the boot-screen watchdog runs on the virtual clock: the build is known to be alive
  const now = millis();
  if (!buildT0) buildT0 = now;
  buildShift = now - buildT0;
  if (buildFrames++ > 0) p5.instance._setProperty("frameCount", frameCount - 1);
  try {
    for (let n = 0; !built && n < FEED_SLICES; n++) buildStepOnce();
  } catch (e) {
    buildError = "build step " + buildStep + ": " + (e && e.message ? e.message : e);
  }
}

function draw() {
  if (window.__GROKLY_FEED && window.__groklyReady === false) millisAt.push(millis());
  if (window.__GROKLY_FEED && !built && !buildError) {
    feedDraw();
    if (!built) return;
  }
  draw0();
  if (window.__GROKLY_FEED && built && frameCount >= READY_FRAME) window.__groklyReady = true;
}

function draw0() {
  window.__abDraw = true;
  if (buildError) {
    showError(buildError);
    if (window.__GROKLY_FEED) window.__groklyReady = true;
    return;
  }

  if (!built) {
    try {
      if (!buildT0) buildT0 = millis();
      const elapsed = millis() - buildT0;
      if (elapsed > LOADER_MAX) buildAll();
      else {
        const t0 = millis();
        while (!built && millis() - t0 < FRAME_BUDGET) buildStepOnce();
      }
    } catch (e) {
      buildError = "build step " + buildStep + ": " + (e && e.message ? e.message : e);
      return;
    }
    if (!built) {
      drawLoader();
      return;
    }
  }

  // the boot screen stays long enough to be read
  if (vms() - buildT0 < LOADER_HOLD) {
    drawLoader();
    return;
  }

  window.__abFirstFrame = true;
  try {
    windFrame();
  } catch (e) {
    buildError = "draw: " + (e && e.message ? e.message : e);
  }
}

function buildStepOnce() {
  if (buildStep >= BUILD.length) {
    built = true;
    return;
  }
  if (runStage()) {
    buildStep++;
    bi = 0;
    if (buildStep >= BUILD.length) built = true;
  }
}

// how far through the whole build we are, by weight
// a stage that throws is logged and skipped: better a piece missing one
// finish than a blank canvas
function runStage() {
  try {
    return BUILD[buildStep]();
  } catch (e) {
    if (typeof console !== "undefined") console.warn("stage failed", buildStep, e);
    return true;
  }
}

function buildProgress() {
  let done = 0;
  for (let i = 0; i < buildStep && i < STAGE_INFO.length; i++) done += STAGE_INFO[i][1];
  return constrain(done / STAGE_TOTAL, 0, 1);
}

function clock(ms) {
  const t = max(0, ms) / 1000;
  return nf(floor(t / 60), 2) + ":" + nf(floor(t % 60), 2) + "." + floor((t * 10) % 10);
}

// ---------------------------------------------------------------
// A loader in the manner of a DOS boot screen: amber phosphor on black,
// a block progress bar, and an honest clock.
// ---------------------------------------------------------------
function drawLoader() {
  window.__abFirstFrame = true;
  const AMBER = [255, 176, 46];
  const DIM = [150, 100, 24];
  const p = buildProgress();
  const elapsed = millis() - buildT0;
  const remain = p > 0.02 ? (elapsed / p) * (1 - p) : 0;

  background(8, 6, 4);
  noStroke();
  textFont("monospace");
  textAlign(LEFT, TOP);
  textSize(11);

  const x = 22;
  let y = 34;
  const line = 15;

  fill(AMBER[0], AMBER[1], AMBER[2]);
  text("SPRING BEHIND THE RIVER", x, y);
  y += line;
  fill(DIM[0], DIM[1], DIM[2]);
  text("GENERATIVE PLATE  REV 1.0", x, y);
  y += line * 2;

  const short = String(AB.hash).slice(0, 10) + ".." + String(AB.hash).slice(-6);
  text("TOKEN  " + AB.tokenId, x, y);
  y += line;
  text("SEED   " + short, x, y);
  y += line;
  text("PLATE  " + paletteName.toUpperCase(), x, y);
  y += line * 2;

  // the stages already finished, then the one running now
  const from = max(0, buildStep - 5);
  for (let i = from; i <= buildStep && i < STAGE_INFO.length; i++) {
    const name = STAGE_INFO[i][0];
    const dots = ".".repeat(max(1, 22 - name.length));
    if (i < buildStep) {
      fill(DIM[0], DIM[1], DIM[2]);
      text(name + " " + dots + " OK", x, y);
    } else {
      fill(AMBER[0], AMBER[1], AMBER[2]);
      const spin = SPINNER.charAt(floor(frameCount / 3) % 4);
      text(name + " " + dots + " " + spin, x, y);
    }
    y += line;
  }

  y = height - 96;
  const cells = 22;
  const on = round(p * cells);
  let bar = "[";
  for (let i = 0; i < cells; i++) bar += i < on ? "█" : "░";
  bar += "]";
  fill(AMBER[0], AMBER[1], AMBER[2]);
  text(bar + "  " + nf(floor(p * 100), 3) + "%", x, y);
  y += line * 2;

  fill(DIM[0], DIM[1], DIM[2]);
  text("ELAPSED   " + clock(elapsed), x, y);
  y += line;
  text("REMAINING " + clock(remain), x, y);
  y += line * 2;

  if (floor(frameCount / 18) % 2 === 0) {
    fill(AMBER[0], AMBER[1], AMBER[2]);
    rect(x, y + 2, 7, 11);
  }
}

function showError(msg) {
  noLoop();
  background(250);
  fill(140, 30, 30);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text(String(msg), 16, 16, width - 32, height - 32);
}

function baseLay() {
  STAGE.background(pcol(180, 255));
  STAGE.rectMode(CENTER);
  STAGE.fill(255, 255);
  STAGE.noStroke();
  STAGE.stroke(255);
  STAGE.strokeWeight(70);
  STAGE.rect(width / 2, height / 2, 400, 500);
  STAGE.loadPixels();
  return true;
}

function captureBase() {
  baseImg = STAGE.get();

  // a lighter copy of the still frame to blit from every frame:
  // the full-density capture is far too heavy to redraw in strips
  baseAnim = createGraphics(width, height);
  baseAnim.pixelDensity(2);
  baseAnim.image(baseImg, 0, 0, width, height);
  return true;
}

// soft washes and paper tooth: the pigment bleeds a little past its
// edges, the way watercolour does on damp paper
function waterColorWash() {
  const ctx = STAGE.drawingContext;
  if (typeof ctx.filter !== "string") return true; // no filter support
  const snap = STAGE.get();

  // pigment settling: a soft darker wash where colour pools
  STAGE.push();
  STAGE.blendMode(MULTIPLY);
  ctx.save();
  ctx.filter = "blur(9px)";
  ctx.globalAlpha = 0.16;
  STAGE.image(snap, 0, 0, width, height);
  ctx.restore();
  STAGE.pop();

  // bleed: colour creeping just past its edge
  STAGE.push();
  ctx.save();
  ctx.filter = "blur(4px)";
  ctx.globalAlpha = 0.2;
  STAGE.image(snap, 0, 0, width, height);
  ctx.restore();
  STAGE.pop();

  STAGE.blendMode(BLEND);
  return true;
}

// the water is painted on its own transparent sheet, so only the water
// moves and the sky, the frame and the paper stay where they are
let waveShape = null;

function wavesBegin() {
  WG = createGraphics(width, height);
  WG.pixelDensity(2);
  WG.noStroke();
  waveShape = [];
  for (let i = -10; i < ps2; i++) waveShape.push(createVector(i * 100, 0));
  return true;
}

const WAVE_PASSES = 3; // shapes drawn per slice

function wavesSlice() {
  const end = min(ps1, bi + WAVE_PASSES);
  for (let i = bi; i < end; i++) drawShape(waveShape);
  bi = end;
  return bi >= ps1;
}

// the painted water sits at a different height in every token, so find
// where it actually is instead of assuming a horizon
const MEASURE_ROWS = 240;

function measureWaterSlice() {
  const d = WG.pixelDensity();
  const w = WG.width * d;
  const rows = WG.height * d;
  if (bi === 0) {
    WG.loadPixels();
    WAVE_TOP = height;
    WAVE_BOTTOM = 0;
  }
  const end = min(rows, bi + MEASURE_ROWS * 2);
  for (let py = bi; py < end; py += 2) {
    let hit = false;
    for (let px = 0; px < w; px += 6) {
      if (WG.pixels[4 * (py * w + px) + 3] > 12) { hit = true; break; }
    }
    if (hit) {
      const y = py / d;
      if (y < WAVE_TOP) WAVE_TOP = y;
      if (y > WAVE_BOTTOM) WAVE_BOTTOM = y;
    }
  }

  bi = end;
  if (bi < rows) return false;
  if (WAVE_BOTTOM <= WAVE_TOP) { WAVE_TOP = height * 0.45; WAVE_BOTTOM = height; }
  return true;
}

function treeThickSlice() {
  const done = treeSlice("thick");
  if (done) TG_THICK = treeState.g;
  return done;
}

function treeFineSlice() {
  const done = treeSlice("fine");
  if (done) {
    TG_FINE = treeState.g;
    TG = TG_FINE;
  }
  return done;
}

// One branch of the crown per frame. Both passes replay the same random
// stream, so the two layers remain two halves of exactly one tree.
let treeState = null;

function treeSlice(pass) {
  if (!treeState || treeState.pass !== pass) {
    treeState = treeBegin(pass);
    return false;
  }
  const st = treeState;
  TG = st.g;
  // one branch of the crown, resumable: it runs TREE_UNITS branch calls per slice and goes on in the next slice
  if (!st.it) {
    const original_size3 = rnd.num(20, 100);
    const bp = [];
    bp[0] = createVector(3000 / 2, 3000 - original_size3);
    st.it = branch3G(st.fb, st.left, st.right, rnd.num(10, 20), st.th, bp);
  }
  treeUnits = 0;
  if (!st.it.next().done) return false;
  st.it = null;
  st.i++;
  if (st.i > st.n) {
    st.g.pop();
    return true;
  }
  return false;
}

function treeBegin(pass) {
  if (!TRASH) {
    TRASH = createGraphics(4, 4);
    TRASH.pixelDensity(1);
  }
  AB.rand.reset();
  TREE_PASS = pass;
  if (pass === "fine") {
    BLOOMS = [];
    BLOOM_BUCKETS = Array.from({ length: BLOOM_LEVELS }, () => []);
  }

  // the layer overhangs the canvas, so a branch bent by the wind is
  // never cut off at the edge
  const g = createGraphics(width + TREE_MARGIN * 2, height + TREE_MARGIN * 2);
  g.pixelDensity(2);
  TG = g;
  g.push();
  g.translate(TREE_MARGIN + width / 2, TREE_MARGIN + height / 2);
  g.scale(0.5);
  g.stroke(0);

  TG.scale(1.4);
  TG.translate(-80, height * 1.8);
  const fb = rnd.num(height * 0.3, height * 0.5);
  const v = get_direction3(0.5);
  const th = rnd.num(height * 0.09, height * 0.003);
  const n = rnd.num(10, 20);
  TG.strokeWeight(th);
  TG.line(0, 0, 0, -1);
  TG.translate(0, -1);

  return { pass, g, i: 0, n, fb, left: v.x, right: v.y, th };
}


const PX_CHUNK = 60000; // array entries per slice (small: each slice stays a few ms)

function pixelFxSlice() {
  const d = STAGE.pixelDensity();
  const modC = 4 * 8; // 4 channels * fuzzyPixels
  const modW = 4 * width * d;
  const pixelsCount = modW * (height * d);
  const end = min(pixelsCount, bi + PX_CHUNK);
  const pixels = STAGE.pixels;

  for (let i = bi; i < end; i += 4) {
    const f = modC + modW;
    if (pixels[i + f]) {
      pixels[i] = round((pixels[i] + pixels[i + f]) / 2);
      pixels[i + 2] = round((pixels[i + 2] + pixels[i + f + 2]) / 2);
      pixels[i + 3] = round((pixels[i + 3] + pixels[i + f + 3]) / 2);
    }
    
    pixels[i] += random(-40, 40);
    pixels[i + 1] += random(-40, 40);
    pixels[i + 2] += random(-40, 40);
    pixels[i + 3] += random(-80, 80);
  }

  bi = end;
  if (bi < pixelsCount) return false;
  STAGE.updatePixels();
  STAGE.loadPixels();
  return true;
}




function drawShape(shape) {
  WG.noStroke();
  WG.noFill();
  WG.stroke(pcol(0, qps1));
  WG.fill(255, rnd.num(0, 250));
  WG.translate(0, ps3);
  WG.beginShape();
  modifyShape(shape, -25, 125);
  WG.endShape();
   WG.fill(pcol(0, qps1));
  WG.beginShape();
  modifyShape(shape, -22, 25);
  WG.endShape();
    WG.fill(pcol(0, qps1));
  WG.beginShape();
  modifyShape(shape, -122, 125);
  WG.endShape();
  WG.translate(0, -ps3);
}

function modifyShape(shape, minX, maxX) {
  for (let vector of shape) {
    WG.curveVertex(vector.x, vector.y);
    const shift_x = rnd.num(minX, maxX);
    const drops_y = rnd.num(0, 8);
    WG.strokeWeight(rnd.num(0.01, 0.8) * drops_y);
    vector.add(createVector(shift_x, drops_y));
  }
}


function grainBaseSlice() {
  return granulateSlice(36, STAGE);
}

function wavesGrainSlice() {
  return granulateSlice(22, WG);
}

// the same red-shifted grain as before, a band of the buffer at a time
function granulateSlice(amount, g) {
  const d = g.pixelDensity();
  const w = g.width;
  const hgt = g.height;
  if (bi === 0) g.loadPixels();
  const px = g.pixels;
  const total = 4 * (w * d) * (hgt * d);
  const end = min(total, bi + PX_CHUNK);

  for (let i = bi; i < end; i += 4) {
    if (g !== STAGE && px[i + 3] === 0) continue; // leave the sheet clear
    px[i] = px[i] + amount;
    px[i + 1] = px[i + 1] + random(-amount, amount);
    px[i + 2] = px[i + 2] + random(-amount * 2, amount * 2);
    px[i + 3] = px[i + 3] + random(-amount * 2, amount * 2);
  }

  bi = end;
  if (bi < total) return false;
  g.updatePixels();
  return true;
}



  
  let _amount = 5;
  let amount = 10;
  
  let amplitude = 45;
  let frequency = 0.01;
  
  let r2 = 200;
  var lastrandomsX=0;
  var lastrandomsY=0;
 
  
  
  
  //drawStructure1


  
 
  function get_direction3(probability = rnd.num(0.1, 0.5)) {
    let random_int = rnd.num(0, 1);
    let left3_probability = 1 - probability;
    let left3 = false;
    let right3 = false;
    if (random_int >= left3_probability) {
        left3 = true;
    } else if (random_int <= probability) {
        left3 = true;
    } else {
      left3 = true;
      right3 = true;
    }
    return createVector(left3, right3);
  }
  
  
  
 
  
  
 

  
 
  
  
  
  /////////num

  
 
  
  
  
 
  function get_direction5(probability = rnd.num(0.1,0.6)) {
    let random_int = rnd.num(0,1);
    let left5_probability = 1 - probability;
    let left5 = false;
    let right5 = false;
    if (random_int >= left5_probability) {
      left5 = true;
    } else if (random_int <= probability) {
      left5 = true;
    } else {
      left5 = true;
      right5 = true;
    }
    return createVector(left5, right5);
  }
  function draw_branch3(theta, h, threshold, first_thickness_size5, branch_positions) {
    first_thickness_size5 *= rnd.num(0.6, 0.9);
    TG.strokeWeight(first_thickness_size5);
    TG.push();
    TG.rotate(-theta);
    TG.stroke(0,255)
    if (passDraws(h)) TG.line(0, 0, 0, -h);
    TG.translate(0, -h);
    let vector5 = get_direction5();
    let left5 = vector5.x;
    let right5 = vector5.y;
    branch3(h, left5, right5, threshold, first_thickness_size5, branch_positions);
    TG.fill(255,255,255,rnd.num(20,350));
    TG.pop();
  }
  
  function branch3(h, left5, right5, threshold = 6, first_thickness_size5 = 6, branch_positions = []) {
    TG.stroke(0);
    let a = rnd.num(-15, 30);
    let steps = rnd.num(1, 6);
    let theta = radians(a);
    h *= rnd.num(0.7, 1);
    let i = branch_positions.length;
    branch_positions[i] = createVector(branch_positions[i-1].x + h*cos((theta)), branch_positions[i-1].y - h*sin((theta)));
    if (branch_positions[i].x > 0 && branch_positions[i].y > 0) {
      if (h > threshold) {
        if (right5) {
          draw_branch3(theta, h, threshold, first_thickness_size5, branch_positions);  
        }
        if (left5) {
          draw_branch3(-theta, h, threshold, first_thickness_size5, branch_positions);
        }
      } else {
        const _target = TG;
        if (TREE_PASS !== "fine") TG = TRASH;
        TG.push();
        
        TG.noStroke();
        const bloomA1 = rnd.num(0, 255);
        const bloomD1 = rnd.num(1, 20);
        const bloomA2 = rnd.num(0, 255);
        const bloomD2 = rnd.num(1, 20);
        if (TREE_PASS === "fine") {
          recordBloom(max(bloomD1, bloomD2), max(bloomA1, bloomA2));
        }
        TG.stroke(255,rnd.num(0, 55));
        TG.strokeWeight(rnd.num(1.0,6));
       TG.noFill();
        
        
        
         // TG.fill(rnd.num(230, 255), rnd.num(200, 240), rnd.num(50, 100), rnd.num(220, 250));
        TG.circle(0, 50, rnd.num(1,14));
        TG.stroke(0,0);
       // TG.stroke(rnd.num(50, 120), rnd.num(160, 220), rnd.num(80, 150), rnd.num(0, 130));
        //TG.stroke(rnd.num(230, 255), rnd.num(200, 240), rnd.num(50, 100), rnd.num(0, 250));
          TG.stroke(rnd.num(50, 120), rnd.num(160, 220), rnd.num(80, 150), rnd.num(0, 230));
        TG.strokeWeight(rnd.num(0.1,0.6));
        TG.arc(0, 0, 5,35, HALF_PI, PI);
        TG.arc(0, 0, 6,46, HALF_PI, PI);
        TG.arc(0, 0, 7,57, HALF_PI, PI);
        TG.fill(rnd.num(50, 120), rnd.num(160, 220), rnd.num(80, 150), rnd.num(0, 70));
        TG.arc(0, 0, 5,-35, HALF_PI, PI);
        TG.arc(0, 0, 6,-46, HALF_PI, PI);
          //  TG.fill(rnd.num(50, 120), rnd.num(160, 220), rnd.num(80, 150), rnd.num(0, 130));
        TG.arc(0, 0, 7,-57, HALF_PI, PI);
        TG.translate(0,-h);
        TG.line(0, 0, 0, rnd.num(10, 20));
        TG.pop();
        TG = _target;
      }
    }
  }

  // The same two functions as generators, so a branch can pause between calls and resume in the next slice. The body
  // is unchanged (same calls, same random draws, same order); the only addition is the pause check on entry.
  // TG is only swapped inside a leaf, never across a pause.
  var TREE_UNITS = 220, treeUnits = 0;
  function* draw_branch3G(theta, h, threshold, first_thickness_size5, branch_positions) {
    first_thickness_size5 *= rnd.num(0.6, 0.9);
    TG.strokeWeight(first_thickness_size5);
    TG.push();
    TG.rotate(-theta);
    TG.stroke(0,255)
    if (passDraws(h)) TG.line(0, 0, 0, -h);
    TG.translate(0, -h);
    let vector5 = get_direction5();
    let left5 = vector5.x;
    let right5 = vector5.y;
    yield* branch3G(h, left5, right5, threshold, first_thickness_size5, branch_positions);
    TG.fill(255,255,255,rnd.num(20,350));
    TG.pop();
  }

  function* branch3G(h, left5, right5, threshold = 6, first_thickness_size5 = 6, branch_positions = []) {
    if (treeUnits >= TREE_UNITS) yield;
    treeUnits++;
    TG.stroke(0);
    let a = rnd.num(-15, 30);
    let steps = rnd.num(1, 6);
    let theta = radians(a);
    h *= rnd.num(0.7, 1);
    let i = branch_positions.length;
    branch_positions[i] = createVector(branch_positions[i-1].x + h*cos((theta)), branch_positions[i-1].y - h*sin((theta)));
    if (branch_positions[i].x > 0 && branch_positions[i].y > 0) {
      if (h > threshold) {
        if (right5) {
          yield* draw_branch3G(theta, h, threshold, first_thickness_size5, branch_positions);
        }
        if (left5) {
          yield* draw_branch3G(-theta, h, threshold, first_thickness_size5, branch_positions);
        }
      } else {
        treeUnits += 3; // a leaf is a dozen canvas calls
        const _target = TG;
        if (TREE_PASS !== "fine") TG = TRASH;
        TG.push();
        TG.noStroke();
        const bloomA1 = rnd.num(0, 255);
        const bloomD1 = rnd.num(1, 20);
        const bloomA2 = rnd.num(0, 255);
        const bloomD2 = rnd.num(1, 20);
        if (TREE_PASS === "fine") {
          recordBloom(max(bloomD1, bloomD2), max(bloomA1, bloomA2));
        }
        TG.stroke(255,rnd.num(0, 55));
        TG.strokeWeight(rnd.num(1.0,6));
        TG.noFill();
        TG.circle(0, 50, rnd.num(1,14));
        TG.stroke(0,0);
        TG.stroke(rnd.num(50, 120), rnd.num(160, 220), rnd.num(80, 150), rnd.num(0, 230));
        TG.strokeWeight(rnd.num(0.1,0.6));
        TG.arc(0, 0, 5,35, HALF_PI, PI);
        TG.arc(0, 0, 6,46, HALF_PI, PI);
        TG.arc(0, 0, 7,57, HALF_PI, PI);
        TG.fill(rnd.num(50, 120), rnd.num(160, 220), rnd.num(80, 150), rnd.num(0, 70));
        TG.arc(0, 0, 5,-35, HALF_PI, PI);
        TG.arc(0, 0, 6,-46, HALF_PI, PI);
        TG.arc(0, 0, 7,-57, HALF_PI, PI);
        TG.translate(0,-h);
        TG.line(0, 0, 0, rnd.num(10, 20));
        TG.pop();
        TG = _target;
      }
    }
  }

  // paper tooth, a strip of columns at a time
  const PAPER_COLS = 4;

  function paperSlice() {
    STAGE.push();
    STAGE.blendMode(OVERLAY);
    STAGE.drawingContext.save();
    STAGE.drawingContext.globalAlpha = 0.1;
    STAGE.rectMode(CORNER);
    STAGE.noStroke();

    const end = min(width - 1, bi + PAPER_COLS * 2);
    for (var i = bi; i < end; i += 2) {
      for (var j = 0; j < height - 1; j += 2) {
        STAGE.fill(random(165, 235), random(0, 50));
        STAGE.rect(i, j, 2, 2);
      }
    }
    bi = end;

    let done = false;
    if (bi >= width - 1) {
      for (var k = 0; k < 30; k++) {
        STAGE.fill(rnd.num(130, 215), rnd.num(100, 170));
        STAGE.rect(rnd.num(0, width - 2), rnd.num(0, height - 2), rnd.num(1, 3), rnd.num(1, 3));
      }
      done = true;
    }

    STAGE.drawingContext.restore();
    STAGE.pop();
    STAGE.rectMode(CENTER);
    return done;
  }