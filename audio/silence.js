// Grokly "Trim silences" (team C), after spec qa/specs/audio-analysis.md §2. Our own code, non-AI, deterministic.
// VAD: 20 ms hop / 40 ms window energy against an adaptive noise floor (10th percentile over ±1.5 s, capped near the
// recording's global floor), hangover 3 frames to open / 15 to close (idea from voxRadar, MIT). Trim rules:
//   ends  → leading / trailing silence kept at 0.25 s
//   poem  → + pauses > 2.0 s shortened to 1.2 s (pauses are part of a poem)
//   tight → + pauses > 0.8 s shortened to 0.45 s (podcast, voice note)
// Cuts land on zero crossings (±10 ms) and every join gets a 10 ms equal-power crossfade. A monotonic time map
// (old → new seconds) moves the subtitles (and the lines kept outside the window) with the sound. Multi-level undo + Original.
(() => {
  const MODES = { ends: null, poem: [2.0, 1.2], tight: [0.8, 0.45] }, EDGE = 0.25, PRE = 0.12, POST = 0.2, XF_S = 0.01;
  const KEY = 'grokly.trimMode';

  // speech regions [[startS, endS], …]
  function detect(x, sr, thr = 9) {
    const hop = Math.round(0.02 * sr), win = 2 * hop, nf = Math.max(1, Math.floor((x.length - win) / hop) + 1), E = new Float32Array(nf);
    for (let k = 0; k < nf; k++) { let s = 0; const a = k * hop; for (let i = a; i < a + win && i < x.length; i++) s += x[i] * x[i]; E[k] = Math.max(-100, 10 * Math.log10(s / win + 1e-20)); }
    const live = []; for (let k = 0; k < nf; k++) if (E[k] > -90) live.push(E[k]);
    const sorted = Float32Array.from(live).sort(), G = sorted.length ? sorted[Math.floor(0.1 * (sorted.length - 1))] : -90;
    // local floor every 10 frames over ±75 frames (±1.5 s), interpolated
    const step = 10, Nl = [];
    for (let c = 0; c < nf + step; c += step) { const a = Math.max(0, c - 75), b = Math.min(nf, c + 75), w = Float32Array.from(E.subarray(a, b)).sort(); Nl.push(w.length ? w[Math.floor(0.1 * (w.length - 1))] : G); }
    const regs = []; let run = 0, quiet = 0, open = false, s0 = 0, last = 0;
    for (let k = 0; k < nf; k++) {
      const j = k / step, i0 = Math.floor(j), f = j - i0, nl = Nl[i0] * (1 - f) + (Nl[i0 + 1] ?? Nl[i0]) * f;
      const N = Math.min(nl, G + 6), sp = E[k] - N > thr && E[k] > -60;
      if (!open) { run = sp ? run + 1 : 0; if (run >= 3) { open = true; s0 = k - 2; last = k; quiet = 0; } }
      else if (sp) { last = k; quiet = 0; } else if (++quiet >= 15) { open = false; run = 0; regs.push([(s0 * hop) / sr, (last * hop + win) / sr]); }
    }
    if (open) regs.push([(s0 * hop) / sr, Math.min(x.length, last * hop + win) / sr]);
    return regs;
  }

  const zeroX = (x, i, r) => { // nearest zero crossing to sample i within ±r
    for (let d = 0; d <= r; d++) for (const j of [i - d, i + d]) if (j > 0 && j < x.length && (x[j - 1] <= 0) !== (x[j] <= 0)) return j;
    return i;
  };
  // removed ranges in samples [[a, b), …]
  function plan(x, sr, mode = 'poem') {
    const dur = x.length / sr, regs = detect(x, sr), cuts = [];
    if (!regs.length) return { cuts, regs, removed: 0 };
    const lead = regs[0][0] - EDGE; if (lead > 0.05) cuts.push([0, lead]);
    const P = MODES[mode];
    if (P) for (let k = 0; k + 1 < regs.length; k++) {
      const gap = regs[k + 1][0] - regs[k][1]; if (gap <= P[0]) continue;
      const b = Math.max(PRE, P[1] * 0.4), a = P[1] - b; cuts.push([regs[k][1] + a, regs[k + 1][0] - b]);
    }
    const tail = regs[regs.length - 1][1] + EDGE; if (dur - tail > 0.05) cuts.push([tail, dur]);
    const r = Math.round(0.01 * sr), out = cuts.map(([a, b]) => [a <= 0 ? 0 : zeroX(x, Math.round(a * sr), r), b >= dur ? x.length : zeroX(x, Math.round(b * sr), r)]).filter(([a, b]) => b - a > 0.05 * sr);
    return { cuts: out, regs, removed: out.reduce((s, [a, b]) => s + b - a, 0) / sr };
  }

  // apply the cuts → { pcm, map(tOld) → tNew }
  function apply(x, sr, p) {
    const n = x.length, xf = Math.round(XF_S * sr), keep = []; let a = 0;
    for (const [c0, c1] of p.cuts) { if (c0 > a) keep.push([a, c0]); a = Math.max(a, c1); }
    if (a < n) keep.push([a, n]);
    const segs = keep.filter(([s, e]) => e - s > 2 * xf); if (!segs.length) return { pcm: x, map: (t) => t };
    let total = 0; segs.forEach(([s, e], k) => (total += e - s - (k ? xf : 0)));
    const out = new Float32Array(total), off = []; let pos = 0;
    segs.forEach(([s, e], k) => {
      if (k) { pos -= xf; for (let i = 0; i < xf; i++) { const w = ((i + 0.5) / xf) * (Math.PI / 2); out[pos + i] = out[pos + i] * Math.cos(w) + x[s + i] * Math.sin(w); } out.set(x.subarray(s + xf, e), pos + xf); }
      else out.set(x.subarray(s, e), pos);
      off.push(pos); pos += e - s;
    });
    // time map: inside a kept piece, linear; inside a removed piece, the middle of the join's crossfade (monotonic)
    const joins = segs.map((_, k) => (k ? off[k] + xf / 2 : 0));
    function map(t) {
      const i = t * sr;
      if (i <= segs[0][0]) return 0;
      for (let k = 0; k < segs.length; k++) {
        const [s, e] = segs[k], lo = joins[k], hi = k + 1 < segs.length ? joins[k + 1] : total;
        if (i < s) return lo / sr;
        if (i <= e) return Math.max(lo, Math.min(hi, off[k] + (i - s))) / sr;
      }
      return total / sr;
    }
    return { pcm: out, map };
  }

  // ---------- UI + app wiring (H = window.GroklyAudioHost, the bridge in index.html) ----------
  // Undo is multi-level without keeping a copy of the sound per step: hist keeps the ORIGINAL sound and, per trim,
  // the cuts (as planned on the sound of that moment) and the subtitle state before it. Undo replays the remaining cuts
  // on the original; "Original" goes straight back. Memory: the original + the current sound.
  let ui = null, hist = null, H = null;
  const getMode = () => { try { const m = localStorage.getItem(KEY); return m in MODES ? m : 'poem'; } catch { return 'poem'; } };
  let mode = getMode();
  function mount(box, host) {
    if (!box) return; H = host;
    const el = document.createElement('div'); el.className = 'vp';
    el.innerHTML = `<div class="vp-row"><button class="btn small" id="trimSil" type="button">Trim silences</button><button class="btn small" id="trimUndo" type="button" hidden>Undo trim</button><button class="btn small" id="trimOrig" type="button" hidden>Original</button>
      <div class="seg" id="trimMode" role="group" aria-label="How much to trim"><button data-v="ends" title="Only the silence before and after you speak">Ends</button><button data-v="poem" title="Ends, and pauses longer than 2 s become 1.2 s">Poem</button><button data-v="tight" title="Ends, and pauses longer than 0.8 s become 0.45 s">Tight</button></div></div>
      <div class="note" id="trimNote" role="status" aria-live="polite"></div>`;
    box.append(el);
    ui = { btn: el.querySelector('#trimSil'), undo: el.querySelector('#trimUndo'), orig: el.querySelector('#trimOrig'), mode: el.querySelector('#trimMode'), note: el.querySelector('#trimNote') };
    ui.btn.onclick = run; ui.undo.onclick = back; ui.orig.onclick = original;
    ui.mode.onclick = (e) => { const b = e.target.closest('button'); if (!b) return; mode = b.dataset.v; try { localStorage.setItem(KEY, mode); } catch {} render(); };
    render();
  }
  const live = () => hist && H && H.S.full === hist.cur && hist.steps.length;
  function render() {
    if (!ui) return; [...ui.mode.children].forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === mode)));
    if (hist && !live()) hist = null; // a new sound was loaded: the trim history belongs to the old one
    const n = hist ? hist.steps.length : 0; ui.undo.hidden = !n; ui.orig.hidden = n < 2; ui.undo.textContent = n > 1 ? `Undo trim (${n})` : 'Undo trim';
  }
  // every subtitle line in file time → window lines + lines outside (same rule as the "Start at" slider)
  function place(all) {
    const S = H.S, dur = Math.min(H.MAXS, S.full.length / H.SR - S.trim), inWin = (x) => x.end - S.trim > 0.2 && x.start - S.trim < dur - 0.2;
    H.subsOut = all.filter((x) => !inWin(x));
    S.subs = all.filter(inWin).map((x) => ({ ...x, start: Math.max(0, x.start - S.trim), end: Math.min(dur, x.end - S.trim) })).sort((a, b) => a.start - b.start);
  }
  function trimBox() { // as setSound() does for a new file
    const S = H.S, dur = S.full.length / H.SR, box = document.getElementById('trimBox'), r = document.getElementById('trim');
    if (!box || !r) return; box.hidden = dur <= H.MAXS + 0.05;
    if (dur > H.MAXS) { r.max = Math.floor((dur - H.MAXS) * 10) / 10; r.step = 0.1; S.trim = Math.min(S.trim, +r.max); r.value = S.trim; } else S.trim = 0;
    const v = document.getElementById('trimVal'); if (v) v.textContent = `${Math.floor(S.trim / 60)}:${String(Math.floor(S.trim % 60)).padStart(2, '0')}`;
    H.trimWas = S.trim;
  }
  function run() {
    const S = H.S; if (!S.full) return; H.stop(); render();
    const p = plan(S.full, H.SR, mode);
    if (!p.cuts.length) { ui.note.textContent = p.regs.length ? 'No long silences to trim with this setting.' : 'No speech found to keep, so nothing was trimmed.'; return; }
    const r = apply(S.full, H.SR, p), tw = H.trimWas;
    const before = { cuts: p.cuts, trim: S.trim, trimWas: tw, subs: S.subs.map((x) => ({ ...x })), subsOut: H.subsOut.map((x) => ({ ...x })) };
    const all = [...H.subsOut, ...S.subs.map((x) => ({ ...x, start: x.start + tw, end: x.end + tw }))].map((x) => ({ ...x, start: r.map(x.start), end: r.map(x.end) })).filter((x) => x.end - x.start > 0.05);
    if (!hist) hist = { orig: S.full, steps: [] };
    hist.steps.push(before);
    S.full = r.pcm; hist.cur = S.full; S.trim = Math.round(r.map(S.trim) * 10) / 10; trimBox(); place(all);
    H.renderLines(); H.cut();
    ui.note.textContent = `Removed ${p.removed.toFixed(1)} s of silence (${p.cuts.length} place${p.cuts.length > 1 ? 's' : ''}). Subtitles moved with the sound.`;
    render();
  }
  function restore(step, full) {
    const S = H.S; S.full = full; S.trim = step.trim; trimBox(); H.trimWas = step.trimWas; S.subs = step.subs; H.subsOut = step.subsOut;
    H.renderLines(); H.cut();
  }
  function back() {
    if (!live()) return render(); H.stop();
    const step = hist.steps.pop(); let full = hist.orig;
    for (const st of hist.steps) full = apply(full, H.SR, { cuts: st.cuts }).pcm; // replay the trims that stay
    hist.cur = full; restore(step, full);
    ui.note.textContent = hist.steps.length ? `One trim undone (${hist.steps.length} left).` : 'Trim undone: the sound and subtitles are back as they were.';
    if (!hist.steps.length) hist = null; render();
  }
  function original() {
    if (!live()) return render(); H.stop();
    const step = hist.steps[0], full = hist.orig; hist = null; restore(step, full);
    ui.note.textContent = 'Back to the original sound and subtitles.'; render();
  }

  window.GroklySilence = { detect, plan, apply, mount, run, back, original, render, get steps() { return hist ? hist.steps.length : 0; }, get mode() { return mode; }, set mode(m) { if (m in MODES) { mode = m; render(); } } };
})();
