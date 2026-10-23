// Grokly exact beat sync (team C), after spec qa/specs/audio-analysis.md §4: when Grokly's own music is on, the note
// times are KNOWN (the offline render steps music3's scheduler), so the art's beat / pulse / onset / tempo come from the
// notes instead of being detected from the mix. Zero detection error, deterministic (same seed ⇒ same notes).
// How: Music3.prototype._piano is wrapped to record (time, midi, velocity) for OFFLINE instances only (the live preview
// players are untouched); GroklyMusic.feats (preview) is wrapped and apply() is called on the export's features.
// Must load after music/music3.js and music/bg-music.js.
(() => {
  if (!window.Music3 || !window.GroklyMusic) return;
  const rec = new Map(); // `${seed}|${energy}` → note list of the longest offline render
  const P = Music3.prototype, orig = P._piano;
  P._piano = function (when, midi, vel, pan) {
    if (this.opts && this.opts.offline && this.music && this.music.ctx) {
      const key = `${this.opts.seed}|${this.opts.energy}`;
      if (!this.__notes) { this.__notes = []; const cur = rec.get(key); if (!cur || cur.done) rec.set(key, { notes: this.__notes, owner: this }); }
      this.__notes.push({ t: Math.max(this.music.ctx.currentTime, when), midi, vel });
      const cur = rec.get(key); if (cur.owner !== this && this.__notes.length > cur.notes.length) rec.set(key, { notes: this.__notes, owner: this });
    }
    return orig.call(this, when, midi, vel, pan);
  };
  const notesNow = () => { const r = rec.get(`${GroklyMusic.seed}|${GroklyMusic.energy}`); return r ? r.notes : null; };

  // note events: notes closer than 60 ms are one event (chords, grace notes); a beat needs ≥ 220 ms since the last one
  function events(notes) {
    const ns = notes.slice().sort((a, b) => a.t - b.t || a.midi - b.midi), ev = [];
    for (const n of ns) { const e = ev[ev.length - 1]; if (e && n.t - e.t < 0.06) e.vel = Math.max(e.vel, n.vel); else ev.push({ t: n.t, vel: n.vel }); }
    return ev;
  }
  const done = new WeakMap();
  function apply(feats, fps = 30, notes = notesNow()) {
    if (!feats || !notes || !notes.length) return feats;
    const c = done.get(feats); if (c && c.n === notes.length) return c.out;
    const ev = events(notes), byFrame = new Map(); for (const e of ev) { const i = Math.round(e.t * fps); if (i >= 0 && i < feats.length) byFrame.set(i, Math.max(byFrame.get(i) || 0, e.vel)); }
    const out = new Array(feats.length); let pulse = 0, beats = 0, lastBeat = -1e9, on = 0; const bt = [];
    for (let i = 0; i < feats.length; i++) {
      const f = feats[i], o = { ...f }, v = byFrame.get(i), t = i / fps;
      if (v) on = Math.max(on * 0.8, Math.min(1, 0.45 + v / 127)); else on *= 0.8;
      o.onset = +Math.max(f.onset || 0, on).toFixed(4);
      const beat = !!v && i - lastBeat >= fps * 0.22;
      if (beat) { lastBeat = i; beats++; pulse = 1; bt.push(t); if (bt.length > 12) bt.shift(); } else pulse *= 0.86;
      o.beat = beat; o.pulse = +pulse.toFixed(4); o.beats = beats;
      if (bt.length >= 3) { const iv = []; for (let k = 1; k < bt.length; k++) iv.push(bt[k] - bt[k - 1]); iv.sort((a, b) => a - b); const per = Math.max(0.3, Math.min(1.5, iv[iv.length >> 1]));
        o.tempo = +Math.max(0, Math.min(1, (60 / per - 60) / 120)).toFixed(4); o.tempoPhase = +(((t - bt[bt.length - 1]) / per) % 1).toFixed(4); }
      out[i] = o;
    }
    done.set(feats, { n: notes.length, out });
    return out;
  }
  const of = GroklyMusic.feats; // preview: the mixed features, with the exact note beats
  GroklyMusic.feats = function (pcm, fps) { const f = of.call(this, pcm, fps); return f ? apply(f, fps || 30) : f; };
  window.GroklyBeat = { apply, events, notesNow, _rec: rec };
})();
