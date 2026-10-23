// Grokly voice polish worker (team C): runs audio/polish-core.js off the main thread, so the page never freezes.
// Messages in:  { id, kind: 'polish' | 'master', buf (ArrayBuffer of Float32 samples, transferred), sr, opts | target }
// Messages out: { id, type: 'progress', p } … then { id, type: 'done', buf (transferred back, processed in place), info }
self.window = self;
importScripts('dsp.js', 'polish-core.js');
self.onmessage = ({ data: d }) => {
  try {
    const x = new Float32Array(d.buf); let last = -1;
    const prog = (p) => { const q = Math.floor(p * 50); if (q !== last) { last = q; self.postMessage({ id: d.id, type: 'progress', p }); } };
    const info = d.kind === 'master' ? GroklyPolishCore.master(x, d.sr, d.target, prog) : GroklyPolishCore.polish(x, d.sr, d.opts || {}, prog);
    self.postMessage({ id: d.id, type: 'done', buf: x.buffer, info }, [x.buffer]);
  } catch (e) { self.postMessage({ id: d.id, type: 'error', message: String((e && e.message) || e) }); }
};
