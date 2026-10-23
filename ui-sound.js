// Grokly UI sounds: 7 tiny files in app/sounds/ (rendered at build time by tools/build-ui-sounds.sh from earshot's code-made sound bank,
// MIT © 2026 Leon Lin, https://github.com/Leonxlnx/earshot — earshot itself is not shipped). Spec: qa/specs/ui-sound.md.
// Off by default ("UI sounds" in the Quality tab). Never plays while the microphone records; never part of an exported video
// (it has its own AudioContext, which no export path records).
(function () {
  const NAMES = ['rec-start', 'rec-stop', 'surprise', 'toggle-on', 'toggle-off', 'done', 'error'];
  const KEY = 'grokly.uiSounds';
  let ctx = null, bufs = null, loading = null, blocked = () => false;
  const get = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };
  const set = (on) => { try { localStorage.setItem(KEY, on ? '1' : '0'); } catch {} };
  function load() {
    if (loading) return loading;
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    loading = Promise.all(NAMES.map((n) => fetch(`sounds/${n}.mp3`).then((r) => r.arrayBuffer()).then((a) => ctx.decodeAudioData(a)).then((b) => [n, b]).catch(() => [n, null])))
      .then((list) => (bufs = Object.fromEntries(list)));
    return loading;
  }
  async function play(name) {
    if (!get() || blocked()) return; // off, or the microphone is recording
    try { await load(); if (ctx.state !== 'running') await ctx.resume(); const b = bufs && bufs[name]; if (!b || blocked()) return;
      const s = ctx.createBufferSource(), g = ctx.createGain(); g.gain.value = 0.9; s.buffer = b; s.connect(g).connect(ctx.destination); s.start(); } catch {}
  }
  window.GroklyUISound = { play, enabled: get, setEnabled(on) { set(on); if (on) load(); }, setBlocked(fn) { blocked = fn; } };
})();
