// Offline speech-to-text for Milani (Whisper, multilingual), runs in a worker on the user's own device.
// Model files: from ./models/ when this site hosts them (listed in models/index.json; see models/README.md), and then
// ONLY from there (no third-party request). If a model is not hosted, it falls back to Hugging Face, and the browser
// then caches it. The ONNX Runtime wasm always loads from ./vendor/ (never a CDN).
import { pipeline, env } from './vendor/transformers.min.js';

const base = new URL('./', self.location.href).href;
env.backends.onnx.wasm.wasmPaths = base + 'vendor/';
env.localModelPath = base + 'models/';
env.allowLocalModels = false;
env.allowRemoteModels = true;

let asr = null, loadedId = null, hosted = null;
// models/index.json lists the model ids this site hosts: {"hosted": ["onnx-community/whisper-base", ...]}.
// (A manifest instead of probing models/<id>/config.json: no 404 when nothing is hosted, and hosts that answer
// every path with index.html cannot fool it.)
async function hostsModel(id) {
  if (!hosted) {
    try { const r = await fetch(`${base}models/index.json`, { cache: 'no-store' }); hosted = r.ok ? (JSON.parse(await r.text()).hosted || []) : []; }
    catch { hosted = []; }
  }
  return hosted.includes(id);
}
async function load(id, onProgress) {
  if (asr && loadedId === id) return asr;
  const local = await hostsModel(id);
  env.allowLocalModels = local;
  env.allowRemoteModels = !local; // hosted here → never contact huggingface.co
  const gpu = !!(self.navigator && navigator.gpu && (await navigator.gpu.requestAdapter().catch(() => null)));
  const opts = { progress_callback: onProgress, device: gpu ? 'webgpu' : 'wasm', dtype: gpu ? { encoder_model: 'fp32', decoder_model_merged: 'q4' } : 'q8' };
  try { asr = await pipeline('automatic-speech-recognition', id, opts); }
  catch (e) { if (!gpu) throw e; asr = await pipeline('automatic-speech-recognition', id, { progress_callback: onProgress, device: 'wasm', dtype: 'q8' }); }
  loadedId = id; return asr;
}

self.onmessage = async ({ data }) => {
  if (data.type !== 'run') return;
  try {
    const files = {};
    const p = await load(data.model, (e) => {
      if (e.status === 'progress' && e.total) { files[e.file] = [e.loaded, e.total]; let a = 0, b = 0; for (const [x, y] of Object.values(files)) { a += x; b += y; } self.postMessage({ type: 'download', loaded: a, total: b }); }
    });
    self.postMessage({ type: 'working' });
    const out = await p(data.audio, {
      language: data.language || 'english', task: 'transcribe', return_timestamps: true, chunk_length_s: 30, stride_length_s: 5,
    });
    const segs = (out.chunks || [{ timestamp: [0, data.audio.length / 16000], text: out.text }])
      .map((c) => ({ start: c.timestamp[0] ?? 0, end: c.timestamp[1] ?? (c.timestamp[0] ?? 0) + 3, text: (c.text || '').trim() }))
      .filter((c) => c.text);
    self.postMessage({ type: 'done', segs, text: out.text });
  } catch (e) { self.postMessage({ type: 'error', message: String(e && e.message || e) }); }
};
