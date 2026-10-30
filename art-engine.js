// Grokly art: Reza Milani's generative pieces as the PICTURE of any template.
// makeSource() runs one piece in a hidden same-origin frame on a virtual clock and copies each new frame into
// one stable canvas (source.canvas) that the templates draw wherever they would draw a photo.
// makeFull(cv) is the "Full" template: the picture fills the frame, with photo badge, title, name and watermark.
(function () {
  window.__groklyHost = true;
  const ART = [
    ['night-river', 'Night River'], ['spring-behind-the-river-v', 'Spring Behind the River V'], ['dusk-hills', 'Dusk Hills'], // Sakura lives on inside Night River
    ['poppy-map', 'Poppy Map'], ['garden-lights', 'Garden Lights'], ['the-last-flower', 'The Last Flower'], ['emotions', 'Emotions'],
    ['old-tree', 'Old Tree'], ['a-field-in-the-wind', 'A Field in the Wind'], ['fern', 'Fern'],
    ['imago', 'Imago'], ['hart', 'Hart'], 
    
    ['muz-ii', 'Muz II'], ['paris', 'Paris'],
  ];
  // the NYC Generative Cover Studio pack (art/nyc): 320 templates by number. As an artwork ("nyc-001"…) only the generative code
  // runs, filling the video's shape; as a template ("cover:1"…, see index.html) the whole cover design with the visitor's text.
  const NYC_NAMES = ["Kinetic Slices · Headline","Dot Type · Headline","Letter Field · Lower Third","Wave Rows · Panel","Word Rings · Guest","Flow · Panel","Halftone Sun · Lower Third","Spectrum · Guest","Ridgelines · Headline","Contours · Guest","Truchet · Lower Third","Street Grid · Headline","Echo Headline · Minimal","Ticker · Lower Third","Breaking Rays · Panel","Orbits · Guest","Interference · Headline","Skyline · Panel","Blocks · Lower Third","Drip Type · Headline","Kinetic Slices · Headline","Dot Type · Episode","Letter Field · Bulletin","Wave Rows · Disc","Word Rings · Guest","Flow · Episode","Halftone Sun · Bulletin","Spectrum · Episode","Ridgelines · Headline","Contours · Guest","Truchet · Disc","Street Grid · Disc","Echo Headline · Minimal","Ticker · Minimal","Breaking Rays · Bulletin","Orbits · Guest","Interference · Headline","Skyline · Disc","Blocks · Episode","Drip Type · Headline","Letter Grid · Frame","Spiral Type · Quote","Accordion · Headline","Swarm · Big Episode","Signal Bars · Tape","Target · Panel","Wave Mesh · Quote","Circle Pack · Headline","Transit Lines · Lower Third","Word Rain · Tape","Blinds · Headline","LED Board · Frame","Blob · Guest","Street Grid · Tape","Skyline · Big Episode","Dot Type · Quote","Kinetic Slices · Tape","Flow · Frame","Echo Headline · Frame","Halftone Sun · Big Episode","Contours · Quote","Orbits · Frame","Letter Grid · Lower Third","Swarm · Headline","Transit Lines · Guest","Letter Grid · Frame","Spiral Type · Guest","Accordion · Headline","Swarm · Episode","Signal Bars · Tape","Target · Disc","Wave Mesh · Quote","Circle Pack · Headline","Transit Lines · Bulletin","Word Rain · Tape","Blinds · Episode","LED Board · Frame","Blob · Guest","Street Grid · Tape","Skyline · Frame","Dot Type · Quote","Ridgelines · Frame","Spectrum · Tape","Letter Field · Headline","Halftone Sun · Quote","Truchet · Frame","Interference · Episode","Blocks · Tape","Letter Grid · Bulletin","Breaking Rays · Quote","Split-Flap · Minimal","Type Wave · Headline","Type Tunnel · Panel","Cylinder · Quote","Needles · Frame","Liquid Type · Headline","Spotlight · Big Episode","Carousel · Panel","Droste Frames · Tape","Echo Trails · Headline","Bounce · Frame","Ribbons · Lower Third","Statement · Minimal","Ripple Type · Quote","Letter Globe · Big Episode","Scanner · Headline","Split-Flap · Lower Third","Type Tunnel · Tape","Type Wave · Panel","Cylinder · Frame","Spotlight · Frame","Echo Trails · Lower Third","Liquid Type · Big Episode","Ribbons · Guest","Dot Type · Headline","Split-Flap · Minimal","Type Wave · Headline","Type Tunnel · Disc","Cylinder · Episode","Needles · Quote","Liquid Type · Headline","Spotlight · Frame","Carousel · Episode","Droste Frames · Tape","Echo Trails · Disc","Bounce · Headline","Ribbons · Bulletin","Statement · Minimal","Ripple Type · Quote","Letter Globe · Episode","Scanner · Episode","Split-Flap · Bulletin","Bounce · Frame","Type Wave · Disc","Cylinder · Headline","Needles · Guest","Droste Frames · Frame","Carousel · Tape","Halftone Sun · Headline","Word Rain · Guest","Ridgelines · Album","Droste Frames · Album","Blob · Album","Letter Globe · Album","Liquid Type · Album","Ripple Type · Album","Spectrum · Disc","Halftone Sun · Album","Type Wave · Headline","Spotlight · Album","Spectrum · Music Video","Type Tunnel · Music Video","Statement · Minimal","Echo Trails · Music Video","Liquid Type · Music Video","Carousel · Music Video","Ribbons · Music Video","Flow · Guest","Contours · Music Video","Droste Frames · Tape","Flow × Letter Grid Blend · Headline","Street Grid × Flow Text Mask · Lower Third","Ridgelines × Letter Globe Split Wipe · Panel","Skyline × Type Tunnel Iris · Headline","Truchet × Ripple Type Swap Tiles · Frame","Flow → Contours → Orbits · Guest","Voice: Contours ⇄ Needles · Guest","Audiogram · Headline","Radial Spectrum · Guest","Speaker Split · Minimal","Voice Type · Headline","Flow Kaleidoscope · Panel","Letter Grid Kaleidoscope · Music Video","Skyline Pixelate · Music Video","Liquid Type Misregister · Headline","Blob Halftone Filter · Quote","Type Tunnel ASCII Filter · Frame","Skyline ASCII Filter · Lower Third","Breaking Rays × Echo Headline Blend · Tape","Ridgelines × Spectrum Text Mask · Music Video","Voice: Liquid Type ⇄ Echo Trails · Headline","Dot Type → Letter Field → Scanner · Headline","Transit Lines × Street Grid Iris · Lower Third","Halftone Sun × Wave Mesh Swap Tiles · Big Episode","Voice Blob · Big Episode","Split-Flap × LED Board Split Wipe · Minimal","Letter Globe Pixelate · Quote","Audiogram Misregister · Music Video","Skyline Halftone Filter · Panel","Voice: Statement ⇄ Ripple Type · Minimal","Contours × Letter Grid Blend · Headline","Flow × Halftone Sun Text Mask · Episode","Skyline × Street Grid Split Wipe · Disc","Ridgelines × Letter Globe Iris · Album","Truchet × Letter Grid Swap Tiles · Frame","Blob → Target → Spiral Type · Album","Voice: Orbits ⇄ Contours · Guest","Audiogram · Headline","Radial Spectrum · Guest","Speaker Split · Minimal","Voice Type · Album","Contours Kaleidoscope · Album","Skyline Kaleidoscope · Disc","Blob Pixelate · Album","Spiral Type Misregister · Episode","Type Tunnel Halftone Filter · Quote","Blob ASCII Filter · Bulletin","Letter Globe ASCII Filter · Album","Breaking Rays × Word Rain Blend · Tape","Skyline × Spectrum Text Mask · Album","Voice: Liquid Type ⇄ Droste Frames · Headline","Dot Type → Swarm → Scanner · Episode","Transit Lines × Skyline Iris · Bulletin","Halftone Sun × Wave Mesh Swap Tiles · Quote","Voice Blob · Guest","Split-Flap × LED Board Split Wipe · Minimal","Carousel Pixelate · Episode","Audiogram Misregister · Album","Blob Halftone Filter · Disc","Voice: Statement ⇄ Ripple Type · Minimal","Domain Warp · Headline","Liquid Glass Type · Headline","Neon Sign · Lower Third","Liquid Chrome · Music Video","Voronoi Cells · Frame","LED Board → CRT · Minimal","Skyline → Fluted Glass · Quote","3D Extrude · Headline","Plasma · Tape","Metaballs · Guest","Letter Globe → Bayer Dither · Big Episode","Aurora Gradient · Music Video","Melting Type · Headline","Op-Art Stripes · Panel","Checker Tunnel · Music Video","Flow → Bloom and Grain · Panel","Water Type · Quote","Contours → Gradient Map · Headline","Letter Grid → Chroma Glitch · Lower Third","Domain Warp · Guest","Neon Sign · Music Video","Liquid Glass Type · Music Video","Split-Flap → CRT · Frame","Voronoi Cells · Big Episode","Liquid Chrome · Big Episode","Domain Warp · Album","Liquid Glass Type · Headline","Neon Sign · Bulletin","Liquid Chrome · Album","Voronoi Cells · Frame","Letter Field → CRT · Minimal","Breaking Rays → Fluted Glass · Album","3D Extrude · Episode","Plasma · Tape","Metaballs · Guest","Blob → Bayer Dither · Album","Aurora Gradient · Disc","Melting Type · Album","Op-Art Stripes · Album","Checker Tunnel · Quote","Skyline → Bloom and Grain · Disc","Water Type · Episode","Spiral Type → Gradient Map · Headline","Letter Globe → Chroma Glitch · Episode","Domain Warp · Guest","Neon Sign · Album","Liquid Glass Type · Album","Audiogram → CRT · Headline","Voronoi Cells · Disc","3D Extrude · Bulletin","Roguelike Dungeon · Game HUD","Platformer Run · Title Screen","Raycaster Corridor · Game HUD","Boids Flock · Headline","A* Search · Lower Third","Tower Defense · Game HUD","Match-3 · Title Screen","Card Hand · Visual Novel","Physics Letters · Minimal","Fireworks · Music Video","Pixel Invaders · Title Screen","Voxel City · Headline","Parallax Run · Visual Novel","Cellular Caves · Game HUD","Island Terrain · Lower Third","Breakout Type · Title Screen","Roguelike Dungeon → CRT · Frame","Platformer Run → Bayer Dither · Title Screen","Voxel City Pixelate · Big Episode","Parallax Run × Fireworks Text Mask · Headline","Voice: Raycaster Corridor ⇄ Roguelike Dungeon · Game HUD","Fireworks → Bloom and Grain · Music Video","Match-3 · Game HUD","Boids Flock · Visual Novel","Island Terrain · Title Screen","Roguelike Dungeon · Trading Card","Platformer Run · Game Box","Raycaster Corridor · Game HUD","Boids Flock · Album","A* Search · Bulletin","Tower Defense · Game Box","Match-3 · Album","Card Hand · Trading Card","Physics Letters · Minimal","Fireworks · Album","Pixel Invaders · Game Box","Voxel City · Disc","Parallax Run · Headline","Cellular Caves · Album","Island Terrain · Game HUD","Breakout Type · Game Box","Cellular Caves → CRT · Trading Card","Voxel City → Bayer Dither · Episode","Island Terrain Pixelate · Album","Parallax Run × Fireworks Text Mask · Episode","Voice: Match-3 ⇄ Breakout Type · Game HUD","Pixel Invaders → Bloom and Grain · Album","Tower Defense · Game HUD","Card Hand · Album","A* Search · Trading Card"];
  const NYC_FMT = 'yyyyyyyyyyyyyyyyyyyyssssssssssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyysssssssssssssssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyysssssssssssssssssssssssssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyssssssssssssssssssssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyysssssssssssssssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyysssssssssssssssssssssssss'; // y: 16:9, s: square (the cover design's own shape)
  const NYC_SETS = [['a', 'Kinetic type', 0, 40], ['b', 'Bold layouts', 40, 90], ['c', 'Motion-first', 90, 140], ['d', 'Music', 140, 160], ['e', 'Mixed codes & voice', 160, 220], ['f', 'WebGL shaders', 220, 270], ['g', 'Game-dev', 270, 320]];
  const nycId = (n) => 'nyc-' + String(n).padStart(3, '0');
  const nycNum = (id) => { const m = /^(?:nyc-|cover:)(\d+)$/.exec(id || ''); return m ? +m[1] : 0; };
  const NYC = NYC_NAMES.map((name, i) => ({ n: i + 1, id: nycId(i + 1), name, fmt: NYC_FMT[i] === 'y' ? 'wide' : 'square', set: (NYC_SETS.find((x) => i >= x[2] && i < x[3]) || NYC_SETS[0])[0] }));
  const ORIGINAL = ART.slice();
  for (const x of NYC) ART.push([x.id, x.name.split(' · ')[0] + ' ' + String(x.n).padStart(3, '0')]);
  // thumbnails of the pack: two sprite sheets, 20 per row. art: 160×200 (4:5, the generative code alone); cover: 192×108 (the design)
  const SPR = { art: { src: 'art/nyc/thumbs-art.jpg', w: 160, h: 200 }, cover: { src: 'art/nyc/thumbs-cover.jpg', w: 192, h: 108 } }, COLS = 20, ROWS = 16, sprImg = {};
  const sprite = (k) => (sprImg[k] = sprImg[k] || new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = SPR[k].src; }));
  // CSS for an element showing thumbnail n (any size with the cell's shape)
  const thumbCSS = (n, k = 'art') => { const c = (n - 1) % COLS, r = Math.floor((n - 1) / COLS); return `background:url(${SPR[k].src}) ${(c / (COLS - 1)) * 100}% ${(r / (ROWS - 1)) * 100}% / ${COLS * 100}% ${ROWS * 100}% no-repeat`; };
  // a thumbnail as a canvas (complete: true once drawn), for code that draws thumbnails (the music video's placeholders)
  const thumbCache = new Map();
  function thumbCanvas(id, onload) {
    const n = nycNum(id), k = id.startsWith('cover:') ? 'cover' : 'art'; if (!n) return null; const key = k + n;
    if (thumbCache.has(key)) { const c = thumbCache.get(key); if (onload) { if (c.complete) Promise.resolve().then(() => onload(c)); else c.__cb.push(onload); } return c; }
    const S0 = SPR[k], c = document.createElement('canvas'); c.width = S0.w; c.height = S0.h; c.complete = false; c.__cb = onload ? [onload] : []; thumbCache.set(key, c);
    sprite(k).then((im) => { if (!im) return; c.getContext('2d').drawImage(im, ((n - 1) % COLS) * S0.w, Math.floor((n - 1) / COLS) * S0.h, S0.w, S0.h, 0, 0, S0.w, S0.h); c.complete = true; c.naturalWidth = S0.w; c.naturalHeight = S0.h; c.__cb.splice(0).forEach((f) => f(c)); });
    return c;
  }
  const WARM = { 'spring-behind-the-river-v': 64, 'spring-behind-the-river-iii': 64, 'dusk-hills': 30 };
  const DEFAULT_SEED = '0x6d696c616e69617274652d6772' + '0'.repeat(38);
  const loadImg = (s) => new Promise((r) => { if (!s) return r(null); const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = s; });
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  // The art frames are same-origin, so each piece runs on the page's own main thread: one long call into a piece (its
  // setup, or a heavy first draw) blocks the preview for as long as it runs, and the host cannot cut a single call short.
  // So the host never chains several such calls in one task: warm-up steps run in slices of at most SLICE_MS, and between
  // slices the page gets to paint (the preview keeps playing the previous picture or the thumbnail meanwhile).
  // The number of warm-up steps and their clock never depend on timing, so the exported video stays frame-exact.
  const SLICE_MS = 12;
  const BUILD_MAX = 600; // at most this many extra steps (20 s of piece time) while a piece reports __groklyReady === false
  const nextTask = () => new Promise((r) => { const ch = new MessageChannel(); ch.port1.onmessage = () => r(); ch.port2.postMessage(0); });
  // after the next paint (visible page), or right away in a new task (hidden page: no paints, and timers are throttled there)
  const yieldToHost = () => (document.hidden ? nextTask() : new Promise((r) => { let done = false; const go = () => { if (!done) { done = true; nextTask().then(r); } }; requestAnimationFrame(go); setTimeout(go, 100); }));
  const randomSeed = () => '0x' + Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) => b.toString(16).padStart(2, '0')).join('');
  // warm-up frames: silence, with every feature lib/analyze.mjs measures (so no piece ever reads undefined → NaN)
  const QUIET = { level: 0, bass: 0, lowMid: 0, mid: 0, high: 0, beat: false, pulse: 0, beats: 0, bands: new Array(32).fill(0),
    sub: 0, presence: 0, air: 0, centroid: 0, rolloff: 0, flatness: 0, flux: 0, zcr: 0, onset: 0, voiced: 0, pitch: 0, pitchHz: 0,
    pitchDelta: 0, vibrato: 0, trend: 0, dynamics: 0, attack: 0, silence: 0, tempo: 0, tempoPhase: 0 };

  function makeSource() {
    const src = { canvas: document.createElement('canvas'), key: '' };
    src.canvas.width = src.canvas.height = 2;
    const pg = src.canvas.getContext('2d');
    // ready: the frame finished loading and warming up. Until then step() does nothing: the preview's idle loop
    // must not run the new piece on the previous piece's clock (setup then rewinds it to 0 and p5 freezes until it
    // catches up), and an older setup() that is still waiting must never touch a newer frame (gen).
    let fr = null, last = -1, vclock = 0, ready = false, gen = 0, pending = null;
    // the piece's canvas is looked up once and kept (the lookup reads computed styles, which costs a style pass every frame);
    // it is looked up again if it leaves the page, is emptied, or every 90 frames in case the piece made a bigger one
    let cc = null, ccN = 0, fresh = false;
    function copy() {
      const w = fr && fr.contentWindow; if (!w || !w.__groklyCanvas) return;
      if (!cc || !cc.isConnected || cc.width <= 20 || ++ccN % 90 === 0) cc = w.__groklyCanvas();
      const c = cc; if (!c) return;
      if (src.canvas.width !== c.width || src.canvas.height !== c.height) { src.canvas.width = c.width; src.canvas.height = c.height; }
      else if (fresh) pg.clearRect(0, 0, c.width, c.height); // the first real frame never shows the placeholder through its transparent pixels
      fresh = false;
      pg.drawImage(c, 0, 0);
    }
    // id, seed, and the size the piece should think its window is (pieces that fill the window follow it)
    // NYC pack: id "nyc-<n>" (mode 'art', the default) or the cover design (mode 'cover') with the visitor's text { title, name, guest }
    src.setup = function ({ id, seed = DEFAULT_SEED, w = 540, h = 675, mode = 'art', text = null }) {
      const nn = nycNum(id), tq = nn && text ? ['title', 'name', 'guest'].map((x) => (text[x] ? `&${x}=${encodeURIComponent(text[x])}` : '')).join('') : '';
      const k = `${id}|${seed}|${w}x${h}${nn ? '|' + mode + tq : ''}`;
      if (k === src.key && fr && fr.isConnected) return pending || Promise.resolve(src);
      src.destroy(); src.key = k;
      const my = gen, f = (fr = document.createElement('iframe'));
      const stale = () => my !== gen || fr !== f;
      fresh = true;
      // placeholder while the piece loads: its thumbnail (made from the original seed), else the previous frame stays.
      // The preview keeps drawing this canvas every frame, so the text, subtitles and waveform keep moving over it.
      if (seed === DEFAULT_SEED || nn) (nn ? new Promise((r) => thumbCanvas(mode === 'cover' ? 'cover:' + nn : id, r)) : loadImg(`art/_thumbs/${id}.jpg`)).then((im) => {
        if (!im || stale() || ready || !fresh) return;
        if (src.canvas.width !== w || src.canvas.height !== h) { src.canvas.width = w; src.canvas.height = h; }
        const s = Math.max(w / im.width, h / im.height); pg.drawImage(im, (w - im.width * s) / 2, (h - im.height * s) / 2, im.width * s, im.height * s);
      });
      pending = (async () => {
        f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1; f.title = '';
        Object.assign(f.style, { position: 'fixed', left: '-30000px', top: '0', width: w + 'px', height: h + 'px', border: '0', pointerEvents: 'none' });
        const loaded = new Promise((r) => (f.onload = r));
        f.src = nn ? `art/nyc/index.html?t=${nn}&m=${mode}&h=${seed}${tq}` : `art/${id}/index.html?h=${seed}`;
        document.body.appendChild(f);
        await loaded;
        if (stale()) throw new Error('replaced');
        const win = f.contentWindow;
        // wait for the piece's setup() to make its canvas (real timers; the piece's own clock is frozen)
        for (let n = 0; n < 300 && !(win.__groklyCanvas && win.__groklyCanvas()); n++) { await wait(50); if (stale()) throw new Error('replaced'); }
        if (!win.__groklyStep || !win.__groklyCanvas()) { src.destroy(); throw new Error('this artwork could not start'); }
        // pieces that load their own fonts redraw when the font arrives: wait for it, so every run starts the same way
        try { await Promise.race([win.document.fonts.ready, wait(4000)]); await wait(30); } catch (e) {}
        if (stale()) throw new Error('replaced');
        vclock = 0; last = -1;
        // pieces with an intro screen are fast-forwarded so the video starts on the artwork. Always the same steps on the same
        // clock (export stays frame-exact), but spread over several tasks so a heavy first draw never adds up with the next ones
        await yieldToHost(); if (stale()) throw new Error('replaced');
        for (let n = 0, N = WARM[id] || 3, t0 = performance.now(); n < N; n++) {
          if (n && performance.now() - t0 > SLICE_MS) { await yieldToHost(); if (stale()) throw new Error('replaced'); t0 = performance.now(); }
          vclock += 1000 / 30; win.__groklyStep(QUIET, vclock);
        }
        // pieces that build their picture over many frames say so with window.__groklyReady (false while building):
        // keep stepping, sliced the same way, until it is true, so neither the preview nor frame 0 of a video ever shows a
        // half-built picture. The flag follows the piece's own frame count, so the number of steps is the same on every run.
        // Pieces without the flag skip this entirely.
        if (win.__groklyReady === false) {
          let n = 0;
          for (let t0 = performance.now(); win.__groklyReady === false && n < BUILD_MAX; n++) {
            if (performance.now() - t0 > SLICE_MS) { await yieldToHost(); if (stale()) throw new Error('replaced'); t0 = performance.now(); }
            vclock += 1000 / 30; win.__groklyStep(QUIET, vclock);
          }
          if (win.__groklyReady === false) console.warn(`art: ${id} was still building after ${BUILD_MAX} steps; starting anyway`);
        }
        await yieldToHost(); if (stale()) throw new Error('replaced');
        copy(); ready = true; pending = null;
        return src;
      })();
      return pending;
    };
    // one video frame: the piece's clock only moves forward (a replay just continues)
    src.step = function (f, t) {
      const win = ready && fr && fr.contentWindow; if (!win || !win.__groklyStep) return;
      const ms = t * 1000; vclock += last < 0 || ms <= last ? 1000 / 30 : Math.min(250, ms - last); last = ms;
      win.__groklyStep(f, vclock); copy();
    };
    src.destroy = function () { gen++; ready = false; pending = null; cc = null; ccN = 0; fresh = false; if (fr) fr.remove(); fr = null; src.key = ''; };
    return src;
  }

  // "Full" template: the picture (artwork or photo) fills the frame
  function makeFull(cv) {
    const g = cv.getContext('2d'), api = { items: [] };
    let O = {}, W = 0, H = 0, pic = null, badge = null;
    // free-tier watermark (founder): the signature ABOVE "Made with Milani". It is drawn LAST, over everything: with O.markLast the
    // app draws it after the subtitles through g.canvas._wm(); g.canvas._wmRect is its area, which movable items and subtitles keep out of.
    // Readability: near-black or white ink with a soft halo, on a feathered backing of the other colour whose opacity is the least that
    // gives >= 4.5:1 for 98 % of the pixels under the mark (re-sampled every 10 frames). Text 27 px and signature 46 px tall at 1080 (18 / 31 px at 720p).
    let markN = 0, wmC = null;
    const wmLin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4), wmL = (r, gg, b) => 0.2126 * wmLin(r) + 0.7152 * wmLin(gg) + 0.0722 * wmLin(b);
    function wmInk(r) {
      const key = r.map((v) => v | 0).join(); if (wmC && wmC.key === key && markN - wmC.n < 10) return wmC;
      const px = []; try { const X = Math.max(0, r[0] | 0), Y = Math.max(0, r[1] | 0), d = g.getImageData(X, Y, Math.max(1, Math.min(W - X, r[2]) | 0), Math.max(1, Math.min(H - Y, r[3]) | 0)).data; for (let i = 0; i < d.length; i += 4 * 5) px.push([d[i], d[i + 1], d[i + 2]]); } catch (e) { /* tainted: full backing */ }
      let best = null;
      for (const [c, v, bk] of [['#ffffff', 255, 0], ['#111111', 17, 255]]) for (const a of [0, 0.12, 0.2, 0.28, 0.36, 0.44, 0.52, 0.6, 0.68, 0.76]) {
        if (best && a >= best.a) break; if (!px.length && a < 0.6) continue;
        const rs = px.map(([pr, pg, pb]) => { const m = (x) => bk * a + x * (1 - a), R = m(pr), G = m(pg), B = m(pb), lb = wmL(R, G, B), lc = wmL(v * 0.95 + R * 0.05, v * 0.95 + G * 0.05, v * 0.95 + B * 0.05); return (Math.max(lb, lc) + 0.05) / (Math.min(lb, lc) + 0.05); }).sort((x, y) => x - y);
        if (!rs.length || rs[Math.floor(rs.length * 0.02)] >= 5) { best = { c, a, bk }; break; }
      }
      wmC = Object.assign({ key, n: markN }, best || { c: '#ffffff', a: 0.76, bk: 0 }); return wmC;
    }
    function wmPlan(ax, ty, align) { // ax: the mark's right edge / left edge / centre; ty: the text baseline
      const u = Math.min(W, H) / 1080, fs = 27 * u, sh = O.wmSig ? 46 * u : 0, sw = (sh * 504) / 132, pad = 11 * u, font = `500 ${fs.toFixed(1)}px Inter, "Helvetica Neue", Helvetica, system-ui, sans-serif`;
      g.save(); g.font = font; const tw = g.measureText(O.watermark).width; g.restore();
      const bw = Math.max(tw, sw); ty = Math.min(ty, H - fs * 0.3 - pad - 2);
      const sy = ty - fs * 0.8 - sh * 0.18 - 4 * u, top = sh ? sy - sh * 0.82 : ty - fs * 0.85, x0 = align === 'right' ? ax - bw : align === 'left' ? ax : ax - bw / 2;
      return { fs, font, sh, sw, ax, ty, sy, align, pad, rect: [x0 - pad, top - pad, bw + 2 * pad, ty + fs * 0.3 - top + 2 * pad] };
    }
    function wmDraw(p) {
      const k = wmInk(p.rect), bk = k.bk ? '255,255,255' : '0,0,0', R = p.rect;
      g.save(); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
      if (k.a) { g.fillStyle = g.shadowColor = `rgba(${bk},${k.a})`; g.shadowBlur = p.pad * 1.6; g.beginPath(); g.roundRect(R[0], R[1], R[2], R[3], Math.min(R[3] / 2, p.pad * 1.8)); g.fill(); }
      g.shadowColor = `rgba(${bk},.5)`; g.shadowBlur = Math.max(3, p.fs * 0.2); g.fillStyle = k.c; g.globalAlpha = 0.95;
      if (O.wmSig) sig(p.align === 'right' ? p.ax - p.sw : p.align === 'left' ? p.ax : p.ax - p.sw / 2, p.sy, p.sh);
      g.font = p.font; g.textAlign = p.align; g.textBaseline = 'alphabetic'; g.direction = 'ltr'; g.fillText(O.watermark, p.ax, p.ty); g.restore();
    }
    function wmOut(ax, ty, align) { if (!O.watermark) return; const p = wmPlan(ax, ty, align); g.canvas._wmRect = p.rect; if (O.markLast) g.canvas._wm = () => wmDraw(p); else wmDraw(p); }
    // signature watermark (optional): the founder's signature (O.wmSig.d, viewBox 504×132) + a small "Milani", same automatic colour
    let sigPath = null, sigD = '';
    function sig(x0, yBase, h) { if (!O.wmSig) return; if (sigD !== O.wmSig.d) { sigD = O.wmSig.d; sigPath = new Path2D(sigD); } g.save(); g.translate(x0, yBase - h * 0.82); g.scale(h / 132, h / 132); g.fill(sigPath, 'evenodd'); g.restore(); }
    api.setup = async function (opts) {
      O = Object.assign({ title: '', sub: '', watermark: 'Made with Milani' }, opts);
      W = cv.width = O.W; H = cv.height = O.H;
      pic = O.picture || (await loadImg(O.avatar));
      badge = O.badge ? await loadImg(O.badge) : null; // the user's own photo, when the picture is an artwork
      return { W, H };
    };
    function cover(img, zoom) { const s = Math.max(W / img.width, H / img.height) * zoom, dw = img.width * s, dh = img.height * s; g.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh); }
    function fit(text, px, maxW, weight) {
      const fam = (O.font ? (O.font.includes(',') ? O.font + ', ' : `"${O.font}", `) : '') + 'Inter, system-ui, -apple-system, "SF Pro Display", "Helvetica Neue", sans-serif'; // only bundled OFL fonts + system fonts
      g.font = `${weight} ${px}px ${fam}`;
      while (g.measureText(text).width > maxW && px > 10) { px *= 0.94; g.font = `${weight} ${px}px ${fam}`; }
    }
    // right-to-left titles/names (Persian, Arabic, Hebrew…)
    const RTL = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;
    // one movable item, as in engine.js: O.layout[id] = { x, y: offset as a fraction of W / H, s: scale around its centre, hide }
    let items = [];
    const CTX_P = ['font', 'textAlign', 'textBaseline', 'direction', 'globalAlpha', 'fillStyle', 'strokeStyle', 'lineWidth', 'lineCap', 'lineJoin', 'shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'globalCompositeOperation', 'filter', 'imageSmoothingEnabled'];
    let copies = []; const flushCopies = () => { const q = copies; copies = []; q.forEach((d) => d()); };
    function item(id, box, fn, shape) { // shape: the item's own outline (a path), for a photo put in this box with its camera control
      const L = O.layout || {}, one = (k, o, done) => { const dx = o && o.x ? o.x * W : 0, dy = o && o.y ? o.y * H : 0, k2 = o && o.s ? o.s : 1, cx = box[0] + box[2] / 2, cy = box[1] + box[3] / 2;
        g.save(); if (done) done(); if (dx || dy || k2 !== 1) { g.translate(cx + dx, cy + dy); if (k2 !== 1) g.scale(k2, k2); g.translate(-cx, -cy); } const bp = O.boxPics && O.boxPics[k]; if (bp && bp.width) boxPic(bp, box, shape); else fn(); g.restore();
        items.push({ id: k, x: cx + dx - (box[2] * k2) / 2, y: cy + dy - (box[3] * k2) / 2, w: box[2] * k2, h: box[3] * k2 }); };
      const o0 = L[id] || null; if (!(o0 && o0.hide)) one(id, o0);
      // the user's copies ("<id>~<n>", made with its + control): drawn over everything at the end of the frame, with the canvas state of this moment
      for (const k of Object.keys(L)) if (k.startsWith(id + '~') && L[k] && !L[k].hide) { const st = ctxState(); copies.push(() => one(k, L[k], () => ctxSet(st))); }
    }
    function ctxState() { const s = { m: g.getTransform() }; for (const p of CTX_P) s[p] = g[p]; return s; }
    function ctxSet(s) { g.setTransform(s.m); for (const p of CTX_P) g[p] = s[p]; }
    // the user's own photo in a box (its camera control): it fills the box, cut to the item's outline (else its rectangle), like object-fit: cover
    function boxPic(im, b, shape) { g.save(); g.globalAlpha = 1; g.filter = 'none'; g.shadowBlur = 0; g.beginPath(); if (shape) shape(); else g.rect(b[0], b[1], b[2], b[3]); g.clip(); const s = Math.max(b[2] / im.width, b[3] / im.height); g.drawImage(im, b[0] + (b[2] - im.width * s) / 2, b[1] + (b[3] - im.height * s) / 2, im.width * s, im.height * s); g.restore(); }
    const hexA = (c, a) => { if (!/^#[0-9a-f]{6}$/i.test(c || '')) return `rgba(0,0,0,${a})`; const n = parseInt(c.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
    function overlay(f) {
      const u = Math.min(W, H) / 1080, ts = O.textScale || 1;
      // colours follow the Colour tool: text ← ink, bars and badge ring ← accent (else ink), shade ← background colour
      const ink = O.ink || '#ffffff', acc = O.accent || ink, shade = O.paper || '#000000';
      const grd = g.createLinearGradient(0, H * 0.72, 0, H); grd.addColorStop(0, hexA(shade, 0)); grd.addColorStop(1, hexA(shade, 0.6));
      g.fillStyle = grd; g.fillRect(0, H * 0.72, W, H * 0.28);
      const rtl = RTL.test(O.title || '') || (!O.title && RTL.test(O.sub || '')); // Persian/Arabic: the row is mirrored (badge on the right, text right-aligned)
      const r = 56 * u, side = 64 * u + r, cx = rtl ? W - side : side, cy = H - 74 * u - r, rr = r * (1 + 0.06 * f.pulse);
      let tx = rtl ? W - 64 * u : 64 * u;
      if (badge) {
        item('photo', [cx - r * 1.1, cy - r * 1.1, r * 2.2, r * 2.2], () => {
          g.save(); g.beginPath(); g.arc(cx, cy, rr, 0, 7); g.clip();
          const s = Math.max((2 * rr) / badge.width, (2 * rr) / badge.height); g.drawImage(badge, cx - (badge.width * s) / 2, cy - (badge.height * s) / 2, badge.width * s, badge.height * s); g.restore();
          g.strokeStyle = O.accent || 'rgba(255,255,255,.92)'; g.lineWidth = 3.5 * u; g.beginPath(); g.arc(cx, cy, rr + 1.75 * u, 0, 7); g.stroke();
        }, () => g.arc(cx, cy, rr, 0, 7));
        tx = rtl ? cx - r - 26 * u : cx + r + 26 * u;
      }
      const maxW = (rtl ? tx : W - tx) - 60 * u;
      g.textBaseline = 'alphabetic';
      const line = (id, text, px, weight, y, alpha) => {
        fit(text, px, maxW, weight); const w = Math.min(maxW, g.measureText(text).width), asc = px * 0.8;
        item(id, [rtl ? tx - w : tx, y - asc, w, asc + px * 0.25], () => {
          g.globalAlpha = alpha; g.fillStyle = ink; g.direction = RTL.test(text) ? 'rtl' : 'ltr'; g.textAlign = rtl ? 'right' : 'left';
          g.fillText(text, tx, y); g.globalAlpha = 1;
        });
      };
      if (O.title) line('title', O.title, 46 * u * ts, 700, cy - 6 * u, 1);
      if (O.sub) line('name', O.sub, 30 * u * ts, 400, cy + 34 * u * ts, 0.85);
      g.direction = 'ltr';
      const by = cy + 50 * u * ts + 6 * u, bw = 22 * 10 * u;
      item('wave2', [rtl ? tx - bw : tx, by, bw, 36 * u], () => {
        g.globalAlpha = 0.9; g.fillStyle = acc;
        for (let i = 0; i < 22; i++) { const h = 5 * u + (f.bands[i] || 0) * 34 * u, x = rtl ? tx - i * 10 * u - 5.5 * u : tx + i * 10 * u; g.fillRect(x, by + 36 * u - h, 5.5 * u, h); }
        g.globalAlpha = 1;
      });
      // the watermark is not a movable item (the Grokly Pass decides whether it shows); in a right-to-left row it moves to the left corner
      if (O.watermark) wmOut(rtl ? 56 * u : W - 56 * u, H - 40 * u, rtl ? 'left' : 'right');
    }
    api.drawFrame = function (f) { markN++; cv._wm = cv._wmRect = null;
      g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
      if (pic && pic.width > 2) cover(pic, 1); // the picture keeps its size; only its own content moves with the sound
      items = []; copies = [];
      if (O.noOverlay) { if (O.watermark) { const u = Math.min(W, H) / 1080; wmOut(W - 56 * u, H - 40 * u, 'right'); } } // a cover design carries its own title and name
      else overlay(f);
      flushCopies(); api.items = items;
    };
    return api;
  }
  window.GroklyArt = { ART, ORIGINAL, NYC, NYC_SETS, nycId, nycNum, thumbCSS, thumbCanvas, makeSource, makeFull, randomSeed, defaultSeed: DEFAULT_SEED };
})();
