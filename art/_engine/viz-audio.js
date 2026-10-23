/*  viz-audio.js — Reza Milani · music-visualizer layer for p5.js sketches
    ---------------------------------------------------------------------
    Load it AFTER p5 and BEFORE the sketch. It adds:
      • audio input: 🎤 microphone, 🎵 any audio file (button or drag & drop)
      • analysis every frame → window.SONIC
            level  0..1   overall loudness (smoothed)
            bass   0..1   ~20–150 Hz        lowMid 0..1  ~150–400 Hz
            mid    0..1   ~400–2000 Hz      high   0..1  ~2–12 kHz
            beat   bool   true on the frame a kick is detected
            pulse  0..1   jumps to 1 on each beat, then decays
            beats  int    beat counter       active bool  audio is playing
            bands  Float32Array(32) log-spaced spectrum 0..1
      • "speed": extra draw() calls when the music is loud, so a sketch's own
        motion (wind, drift, growth…) runs faster with the music — no rewrite needed
      • a stage canvas that shows the sketch with gentle beat zoom, loudness
        brightness and treble colour shift — and is what gets recorded
      • ⏺ record the stage + audio to a video file (WebM, MP4 on Safari)
    Keys:  H hide/show controls · S spectrum line · F fullscreen · R record · Space play/pause
    A sketch can read SONIC directly, and can set window.VIZ = { speed, zoom, light, hue, spectrum }
    (0..1 strengths, or false) to tune the generic effects.                                   */
(function () {
  'use strict';
  const A = (window.SONIC = {
    level: 0, bass: 0, lowMid: 0, mid: 0, high: 0, beat: false, pulse: 0, beats: 0, active: false,
    bands: new Float32Array(32),
  });
  const cfg = () => Object.assign({ speed: 0.6, zoom: 0.5, light: 0.5, hue: 0.3, spectrum: false }, window.VIZ || {});

  let ctx = null, analyser = null, freq = null, wave = null, srcNode = null, mediaEl = null, micStream = null, dest = null;
  const sm = { level: 0, bass: 0, lowMid: 0, mid: 0, high: 0 };
  const hist = []; let lastBeat = 0;
  const peak = { level: 0.15, bass: 0.15, lowMid: 0.15, mid: 0.15, high: 0.1 };
  const floor = { level: 0, bass: 0, lowMid: 0, mid: 0, high: 0 };
  const flux = []; let prevBass = 0; let beatPending = false;

  function ensureCtx() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = ctx.createAnalyser(); analyser.fftSize = 2048; analyser.smoothingTimeConstant = 0.2;
    freq = new Uint8Array(analyser.frequencyBinCount); wave = new Uint8Array(analyser.fftSize);
    dest = ctx.createMediaStreamDestination();
  }
  function disconnect() {
    if (srcNode) { try { srcNode.disconnect(); } catch (e) {} srcNode = null; }
    if (mediaEl) { mediaEl.pause(); mediaEl = null; }
    if (micStream) { micStream.getTracks().forEach((t) => t.stop()); micStream = null; }
  }
  async function useMic() {
    ensureCtx(); await ctx.resume(); disconnect();
    micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    srcNode = ctx.createMediaStreamSource(micStream); srcNode.connect(analyser); // not to speakers (feedback)
    A.active = true; status('🎤 microphone');
  }
  async function useFile(file) {
    ensureCtx(); await ctx.resume(); disconnect();
    mediaEl = new Audio(); mediaEl.src = typeof file === 'string' ? file : URL.createObjectURL(file); mediaEl.loop = true; mediaEl.crossOrigin = 'anonymous';
    srcNode = ctx.createMediaElementSource(mediaEl); srcNode.connect(analyser); analyser.connect(ctx.destination); srcNode.connect(dest);
    await mediaEl.play(); A.active = true; status('🎵 ' + (file.name || String(file).split('/').pop()));
  }
  window.VIZ_AUDIO = { useMic, useFile };

  const binHz = () => ctx.sampleRate / analyser.fftSize;
  function bandAvg(lo, hi) {
    const a = Math.max(1, Math.floor(lo / binHz())), b = Math.min(freq.length - 1, Math.ceil(hi / binHz()));
    let s = 0; for (let i = a; i <= b; i++) s += freq[i]; return s / Math.max(1, b - a + 1) / 255;
  }
  function ease(cur, target, up, down) { return cur + (target - cur) * (target > cur ? up : down); }
  function analyse() { if (window.__GROKLY_FEED) return;
    if (!analyser || !A.active) {
      for (const k of ['level', 'bass', 'lowMid', 'mid', 'high']) A[k] *= 0.9;
      A.pulse *= 0.9; A.beat = false; return;
    }
    analyser.getByteFrequencyData(freq); analyser.getByteTimeDomainData(wave);
    let rms = 0; for (let i = 0; i < wave.length; i++) { const v = (wave[i] - 128) / 128; rms += v * v; } rms = Math.sqrt(rms / wave.length);
    const raw = { level: rms, bass: bandAvg(20, 150), lowMid: bandAvg(150, 400), mid: bandAvg(400, 2000), high: bandAvg(2000, 12000) };
    for (const k in raw) {
      // adaptive range: slow-falling peak and slow-rising floor, so values use the whole 0..1 for any track
      peak[k] = Math.max(raw[k], peak[k] * 0.999, floor[k] + 0.05);
      floor[k] = raw[k] < floor[k] ? raw[k] : floor[k] + (raw[k] - floor[k]) * 0.002;
      const v = (raw[k] - floor[k]) / Math.max(0.05, peak[k] - floor[k]);
      sm[k] = ease(sm[k], v, 0.55, 0.12); A[k] = Math.max(0, Math.min(1, sm[k]));
    }
    // beat: a jump in bass energy well above the recent jumps (spectral flux on the low end)
    const fx = Math.max(0, raw.bass - prevBass); prevBass = raw.bass;
    flux.push(fx); if (flux.length > 60) flux.shift();
    const mean = flux.reduce((x, y) => x + y, 0) / flux.length;
    const sd = Math.sqrt(flux.reduce((x, y) => x + (y - mean) * (y - mean), 0) / flux.length);
    const now = performance.now();
    A.beat = fx > mean + 1.6 * sd && fx > 0.02 && now - lastBeat > 220;
    if (A.beat) { lastBeat = now; A.beats++; A.pulse = 1; } else A.pulse *= 0.88;
    // 32 log-spaced bands
    const n = A.bands.length, lo = Math.log(30), hi = Math.log(14000);
    for (let i = 0; i < n; i++) {
      const f0 = Math.exp(lo + (hi - lo) * (i / n)), f1 = Math.exp(lo + (hi - lo) * ((i + 1) / n));
      A.bands[i] = ease(A.bands[i], bandAvg(f0, f1), 0.6, 0.15);
    }
  }

  // ── stage: copy of the sketch canvas with beat zoom / light / hue; this is what is recorded ──
  let stage = null, sg = null, srcCanvas = null, showSpectrum = false;
  function pickCanvas() {
    const cs = [...document.querySelectorAll('canvas')].filter((c) => c !== stage && c.width > 20 && getComputedStyle(c).display !== 'none');
    return cs.sort((a, b) => b.width * b.height - a.width * a.height)[0] || null;
  }
  function makeStage() {
    stage = document.createElement('canvas'); stage.id = 'viz-stage';
    Object.assign(stage.style, { position: 'fixed', inset: '0', width: '100vw', height: '100vh', zIndex: 9990, background: '#000' });
    document.body.appendChild(stage); sg = stage.getContext('2d');
    const fit = () => { const d = Math.min(2, window.devicePixelRatio || 1); stage.width = innerWidth * d; stage.height = innerHeight * d; };
    fit(); addEventListener('resize', fit);
  }
  let hueDrift = 0;
  function paint() {
    if (!srcCanvas || !srcCanvas.isConnected) srcCanvas = pickCanvas();
    if (!srcCanvas) return;
    if (!stage) makeStage();
    const c = cfg(); const W = stage.width, H = stage.height;
    const s = Math.min(W / srcCanvas.width, H / srcCanvas.height);
    const zoom = 1 + (c.zoom ? 0.035 * c.zoom * A.pulse + 0.02 * c.zoom * A.bass : 0);
    const dw = srcCanvas.width * s * zoom, dh = srcCanvas.height * s * zoom;
    hueDrift += c.hue ? (A.high * 2 - 0.5) * 0.15 * c.hue : 0; hueDrift *= 0.995;
    const light = c.light ? 0.9 + 0.35 * c.light * A.level : 1;
    sg.save(); sg.fillStyle = '#000'; sg.fillRect(0, 0, W, H);
    sg.filter = `brightness(${light.toFixed(3)}) saturate(${(1 + 0.4 * (c.light || 0) * A.mid).toFixed(3)}) hue-rotate(${hueDrift.toFixed(1)}deg)`;
    sg.drawImage(srcCanvas, (W - dw) / 2, (H - dh) / 2, dw, dh);
    sg.restore();
    if (showSpectrum || c.spectrum) drawSpectrum(W, H);
  }
  function drawSpectrum(W, H) {
    const n = A.bands.length, y0 = H * 0.92;
    sg.save(); sg.globalAlpha = 0.85; sg.lineWidth = Math.max(1, W / 900); sg.strokeStyle = 'rgba(255,255,255,0.8)';
    sg.beginPath();
    for (let i = 0; i < n; i++) { const x = W * (0.2 + 0.6 * (i / (n - 1))), y = y0 - A.bands[i] * H * 0.12; i ? sg.lineTo(x, y) : sg.moveTo(x, y); }
    sg.stroke(); sg.restore();
  }

  // ── speed: extra draw() calls while the music is loud ──
  function hookP5() {
    if (!window.p5 || window.p5.__vizHooked) return !!(window.p5 && window.p5.__vizHooked);
    const P = window.p5.prototype; const orig = P.redraw;
    P.redraw = function (n) {
      if (!window.__GROKLY_FEED) { A.beat = beatPending; beatPending = false; }
      const pre = window.VIZ_BEFORE || []; for (let i = 0; i < pre.length; i++) { try { pre[i](A); } catch (e) {} }
      const c = cfg();
      let extra = c.speed && A.active ? Math.floor((A.level * 1.5 + A.pulse) * 2 * c.speed) : 0;
      orig.call(this, n);
      while (extra-- > 0) { const pre = window.VIZ_BEFORE || []; for (let i = 0; i < pre.length; i++) { try { pre[i](A); } catch (e) {} } orig.call(this, 1); }
    };
    window.p5.__vizHooked = true; return true;
  }
  const iv = setInterval(() => { if (hookP5()) clearInterval(iv); }, 0);
  // sketches that are not p5 (plain canvas) still get analysis + stage
  (function loop() { if (window.__GROKLY_FEED) return; analyse(); if (A.beat) beatPending = true; paint(); requestAnimationFrame(loop); })();

  // ── recording ──
  let rec = null, chunks = [];
  function toggleRec() {
    if (!stage) return;
    if (rec) { rec.stop(); return; }
    const stream = stage.captureStream(60);
    if (dest && mediaEl) dest.stream.getAudioTracks().forEach((t) => stream.addTrack(t));
    const mime = ['video/mp4;codecs=avc1', 'video/webm;codecs=vp9,opus', 'video/webm'].find((m) => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || '';
    rec = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 16e6 } : undefined); chunks = [];
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: rec.mimeType }); const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = (document.title.split('—')[0].trim() || 'visualizer').replace(/\s+/g, '-') + (rec.mimeType.includes('mp4') ? '.mp4' : '.webm');
      a.click(); rec = null; btnRec.textContent = '⏺ Rec'; btnRec.classList.remove('on');
    };
    rec.start(1000); btnRec.textContent = '⏹ Stop'; btnRec.classList.add('on');
  }

  // ── controls ──
  let bar, btnRec, stat;
  function status(t) { if (stat) stat.textContent = t; }
  function ui() {
    const css = document.createElement('style');
    css.textContent = `#viz-bar{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;display:flex;gap:8px;align-items:center;
      font:500 13px/1 -apple-system,Segoe UI,Inter,sans-serif;color:#eee;background:rgba(15,15,15,.72);backdrop-filter:blur(8px);padding:8px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.12)}
      #viz-bar button,#viz-bar label{all:unset;cursor:pointer;padding:7px 12px;border-radius:999px;background:rgba(255,255,255,.08)}
      #viz-bar button:hover,#viz-bar label:hover{background:rgba(255,255,255,.18)} #viz-bar .on{background:#c0392b}
      #viz-bar span{opacity:.75;padding:0 6px;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      #viz-drop{position:fixed;inset:0;z-index:9998;display:none;align-items:center;justify-content:center;font:600 22px Inter,sans-serif;color:#fff;background:rgba(0,0,0,.55)}`;
    document.head.appendChild(css);
    bar = document.createElement('div'); bar.id = 'viz-bar';
    bar.innerHTML = `<button id="viz-mic">🎤 Mic</button><label>🎵 File<input id="viz-file" type="file" accept="audio/*" hidden></label><button id="viz-rec">⏺ Rec</button><span id="viz-stat">drop a song here</span>`;
    document.body.appendChild(bar);
    // keep clicks on the controls away from the sketch's own mousePressed / click handlers
    ['mousedown', 'mouseup', 'click', 'pointerdown', 'pointerup', 'touchstart', 'touchend'].forEach((t) => bar.addEventListener(t, (e) => e.stopPropagation()));
    const drop = document.createElement('div'); drop.id = 'viz-drop'; drop.textContent = 'Drop a song to play'; document.body.appendChild(drop);
    btnRec = bar.querySelector('#viz-rec'); stat = bar.querySelector('#viz-stat');
    bar.querySelector('#viz-mic').onclick = () => useMic().catch((e) => status('mic: ' + e.message));
    bar.querySelector('#viz-file').onchange = (e) => e.target.files[0] && useFile(e.target.files[0]).catch((er) => status(er.message));
    btnRec.onclick = toggleRec;
    addEventListener('dragover', (e) => { e.preventDefault(); drop.style.display = 'flex'; });
    addEventListener('dragleave', (e) => { if (e.target === drop) drop.style.display = 'none'; });
    addEventListener('drop', (e) => { e.preventDefault(); drop.style.display = 'none'; const f = e.dataTransfer.files[0]; if (f) useFile(f).catch((er) => status(er.message)); });
    addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;
      const k = e.key.toLowerCase();
      if (k === 'h') bar.style.display = bar.style.display === 'none' ? 'flex' : 'none';
      if (k === 's') showSpectrum = !showSpectrum;
      if (k === 'r') toggleRec();
      if (k === 'f') (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()).catch(() => {});
      if (k === ' ' && mediaEl) { e.preventDefault(); mediaEl.paused ? mediaEl.play() : mediaEl.pause(); }
    }, true);
    const q = new URLSearchParams(location.search);
    if (q.get('audio')) { status('click anywhere to start ' + q.get('audio')); addEventListener('pointerdown', () => useFile(q.get('audio')).catch((e) => status(e.message)), { once: true }); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ui); else ui();
})();
