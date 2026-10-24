// Grokly "Voice polish" (team C): the app side. The DSP chain itself (spec qa/specs/voice-polish.md) lives in
// audio/polish-core.js and runs in a Web Worker (audio/polish-worker.js), streaming and in place, so the page never
// freezes and memory stays small (one polished copy of the sound, plus a transient copy while a job runs).
//   • process(full, raw, a): the polished window if it is ready for (this sound, these settings); otherwise the raw window,
//     and a polish job starts in the background. When it finishes, the host's sound is swapped (host.setPcm).
//     Sounds up to 10 minutes are polished whole, once: moving "Start at" only slices the cached result.
//   • settings changes are debounced; Cancel stops the job (and turns Polish off for now).
//   • master(pcm, sr, job): the export's final loudness + true-peak pass on voice + music, in a worker, cancellable.
(() => {
  const KEY = 'grokly.polish', WURL = new URL('polish-worker.js', document.currentScript.src).href, WHOLE_MAX_S = 600;
  const TARGETS = { social: { lufs: -14, tp: -2.0, label: 'Social video' }, podcast: { lufs: -16, tp: -2.0, label: 'Podcast' } }; // same as polish-core.js
  const CODEC_MARGIN = 0.6; // measured Opus / AAC + resampling overshoot over the limiter's true peak (shown as the stricter value)
  const store = { get() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } }, set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} } };
  const sv = store.get();
  const st = { on: sv.on !== false, target: TARGETS[sv.target] ? sv.target : 'social' }; // default ON, Social (−14 LUFS)
  const save = () => store.set({ on: st.on, target: st.target });
  let H = null, cache = null, job = null, worker = null, seq = 0, timer = 0;
  const last = { info: null, master: null };

  function getWorker() {
    if (worker) return worker;
    worker = new Worker(WURL);
    worker.onmessage = ({ data: d }) => {
      if (!job || d.id !== job.id) return;
      if (d.type === 'progress') { job.p = d.p; render(); return; }
      const j = job; job = null;
      if (d.type === 'done') {
        cache = { src: j.src, a0: j.a0, a1: j.a1, key: j.key, y: new Float32Array(d.buf), info: d.info };
        last.info = { ...d.info, ms: Math.round(performance.now() - j.t0) }; last.master = null;
        const S = H && H.S;
        if (S && S.full === j.src && st.on && st.target === j.key) { const a = Math.floor(S.trim * H.SR), raw = S.full.subarray(a, a + Math.round((H.selLen ? H.selLen() : H.MAXS) * H.SR)); H.setPcm(process(S.full, raw, a)); }
      } else { console.warn('Grokly polish:', d.message); last.info = { failed: true }; }
      j.waiters.forEach((r) => r()); render();
    };
    worker.onerror = (e) => { console.warn('Grokly polish worker', e.message); const j = job; job = null; last.info = { failed: true }; try { worker.terminate(); } catch {} worker = null; if (j) j.waiters.forEach((r) => r()); render(); };
    return worker;
  }
  function cancelJob() {
    if (!job) return; const j = job; job = null;
    try { worker.terminate(); } catch {} worker = null; // the transferred copy dies with the worker
    j.waiters.forEach((r) => r());
  }
  function startJob(full, a0, a1, key) {
    if (job && job.src === full && job.a0 === a0 && job.a1 === a1 && job.key === key) return;
    cancelJob(); if (cache && cache.src !== full) cache = null; // free the old sound's polished copy first
    const buf = full.slice(a0, a1); // the worker owns (and overwrites) this copy
    job = { id: ++seq, src: full, a0, a1, key, p: 0, t0: performance.now(), waiters: [] };
    try { getWorker().postMessage({ id: job.id, kind: 'polish', buf: buf.buffer, sr: H ? H.SR : 44100, opts: { target: key } }, [buf.buffer]); }
    catch (e) { console.warn('Grokly polish: no worker', e); job = null; last.info = { failed: true }; }
    render();
  }
  // the polished window when ready, else the raw window (and a background job)
  function process(full, raw, a = 0) {
    if (!st.on || !full || !raw || !raw.length) return raw;
    const sr = H ? H.SR : 44100, n = full.length, whole = n <= WHOLE_MAX_S * sr, a0 = whole ? 0 : a, a1 = whole ? n : a + raw.length, key = st.target;
    if (cache && cache.src === full && cache.key === key && cache.a0 <= a && a + raw.length <= cache.a1) {
      last.info = last.info && !last.info.failed ? last.info : { ...cache.info };
      return cache.info.silent ? raw : cache.y.subarray(a - cache.a0, a - cache.a0 + raw.length);
    }
    startJob(full, a0, a1, key); return raw;
  }
  const ready = () => (job ? new Promise((r) => job.waiters.push(r)) : Promise.resolve());
  // settings changed: apply after a short pause (no job per click)
  function refresh() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const S = H && H.S; if (!S || !S.full || S.full === S.pcm) return; // the sample beat is never polished
      const a = Math.floor(S.trim * H.SR), raw = S.full.subarray(a, a + Math.round((H.selLen ? H.selLen() : H.MAXS) * H.SR));
      if (!st.on) { cancelJob(); last.info = null; H.setPcm(raw); render(); } else H.setPcm(process(S.full, raw, a));
    }, 350);
  }
  // export: final loudness + true peak on voice + music, in its own worker; job.cancelled stops it
  // opt.force: run even when Polish is off (Music video: the song gets the same −14 LUFS + true-peak limiter), opt.target: target key
  function master(pcm, sr, ctl, opt = {}) {
    if (!st.on && !opt.force) return Promise.resolve(pcm);
    const music = !!(window.GroklyMusic && GroklyMusic.on), x = pcm.slice(), target = opt.target || st.target; // any polish-core target (e.g. 'music')
    return new Promise((res, rej) => {
      let w; try { w = new Worker(WURL); } catch { return res(pcm); }
      const end = () => { try { w.terminate(); } catch {} };
      w.onmessage = ({ data: d }) => {
        if (ctl && ctl.cancelled) { end(); return rej(new Error('cancelled')); }
        if (d.type === 'done') { end(); last.master = { ...d.info, music }; render(); res(new Float32Array(d.buf)); }
        else if (d.type === 'error') { end(); console.warn('Grokly polish master', d.message); res(pcm); }
      };
      w.onerror = () => { end(); res(pcm); };
      w.postMessage({ id: 1, kind: 'master', buf: x.buffer, sr, target }, [x.buffer]);
    });
  }

// ---------- UI (Sound section) ----------
  let ui = null;
  function mount(box, host) {
    if (!box) return; H = host;
    const el = document.createElement('div'); el.className = 'vp';
    el.innerHTML = `<div class="vp-row"><span class="vp-l">Polish my voice</span><div class="seg" id="vpOn" role="group" aria-label="Polish my voice"><button data-v="off">Off</button><button data-v="on">On</button></div>
      <div class="seg" id="vpTarget" role="group" aria-label="Loudness target"><button data-v="social" title="−14 LUFS, for X, Instagram, TikTok, YouTube">Social</button><button data-v="podcast" title="−16 LUFS, Apple Podcasts level">Podcast</button></div></div>
      <div class="vp-row"><span class="note" id="vpNote" role="status" aria-live="polite"></span><button class="btn small" id="vpCancel" type="button" hidden>Cancel</button></div>`;
    box.append(el);
    if (!document.getElementById('vpStyle')) { const s = document.createElement('style'); s.id = 'vpStyle'; s.textContent = '.vp{display:grid;gap:6px;margin-top:10px}.vp-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vp-l{font-weight:600;font-size:14px;margin-right:4px}.vp-off #vpTarget{opacity:.55}'; document.head.append(s); }
    ui = { el, on: el.querySelector('#vpOn'), tg: el.querySelector('#vpTarget'), note: el.querySelector('#vpNote'), cancel: el.querySelector('#vpCancel') };
    ui.cancel.onclick = () => { cancelJob(); set({ on: false }); ui.note.textContent = 'Polishing stopped: your original sound is used. Press On to try again.'; };
    // nothing in the audio tools acts while the microphone records (they would change the previous sound)
    const rec = document.getElementById('rec');
    if (rec && window.MutationObserver) new MutationObserver(() => { const on = rec.classList.contains('on'); document.querySelectorAll('#audioC button, #spkBox button').forEach((b) => { if (on) { if (!b.disabled) { b.disabled = true; b.dataset.recOff = '1'; } } else if (b.dataset.recOff) { b.disabled = false; delete b.dataset.recOff; } }); }).observe(rec, { attributes: true, attributeFilter: ['class'] });
    ui.on.onclick = (e) => { const b = e.target.closest('button'); if (b) set({ on: b.dataset.v === 'on' }); };
    ui.tg.onclick = (e) => { const b = e.target.closest('button'); if (b) set({ target: b.dataset.v, on: true }); };
    render();
  }
  function set(p) { const was = `${st.on}|${st.target}`; Object.assign(st, p); save(); render(); if (was !== `${st.on}|${st.target}`) refresh(); }
  const fmt = (v) => (isFinite(v) ? String(v.toFixed(1)).replace('-', '−') : '—');
  function render() {
    if (!ui) return;
    [...ui.on.children].forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.v === 'on') === st.on)));
    [...ui.tg.children].forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === st.target)));
    ui.el.classList.toggle('vp-off', !st.on);
    const i = last.info, m = last.master; ui.cancel.hidden = !job;
    if (job) ui.note.textContent = `Polishing your voice… ${Math.round(job.p * 100)}% (you can keep editing)`;
    else if (!st.on) ui.note.textContent = 'Off: your recording is used as it is.';
    else if (i && i.failed) ui.note.textContent = 'Polish could not run in this browser, so your original sound is used.';
    else if (!i) ui.note.textContent = `Cleans rumble, evens out loud and quiet words, softens harsh “s” sounds and sets the loudness for ${TARGETS[st.target].label.toLowerCase()} (${fmt(TARGETS[st.target].lufs)} LUFS). Nothing leaves your device.`;
    else if (i.silent) ui.note.textContent = 'This sound is silent, so there is nothing to polish.';
    else {
      const L = m ? m.lufs : i.lufs, P = m ? m.tp : i.tp;
      let t = `Loudness ${fmt(L)} LUFS · Peak ≤ ${fmt(P + CODEC_MARGIN)} dBTP${m ? (m.music ? ' (video, with music)' : ' (video)') : ''}`; // peak: the stricter value, with the codec's overshoot
      if (i.analysis.lufsIn < -40) t += ` · Very quiet recording: we raised it by ${Math.round(i.gain)} dB, so background noise came up too.`;
      else if (i.analysis.clip > 0.001) t += ' · This recording is distorted (it was too loud). Record a bit further from the mic or a little quieter.';
      else if (i.analysis.snr < 15 && !(i.analysis.floor < -70)) t += ' · Noisy recording: a quieter room will sound better.'; // floor < −70 dB: silent background (pauses), not noise
      ui.note.textContent = t;
    }
  }

  window.GroklyPolish = { get on() { return st.on; }, get target() { return st.target; }, TARGETS, CH: 2, set, process, ready, master, mount, cancel: cancelJob, get busy() { return !!job; }, get info() { return last; } };
})();
