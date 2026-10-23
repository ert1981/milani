// Grokly export worker: encodes and muxes off the main thread, so the editor stays smooth while a video is made.
// The page draws each frame (templates and artworks need the page) and transfers it here as a VideoFrame.
// Only the browser's own encoders are used (WebCodecs): H.264 + AAC → MP4, or VP9/VP8 + Opus → WebM.
importScripts('mp4-muxer.js', 'vendor/webm-muxer.js');
let ve = null, ae = null, muxer = null, err = null, mp4 = true;
// the same mono sound in every channel (the page decides the channel count)
const planes = (p, a, n, ch) => { const out = new Float32Array(n * ch); for (let c = 0; c < ch; c++) out.set(p.subarray(a, a + n), c * n); return out; };
const fail = (x) => { err = err || String((x && x.message) || x); };
self.onmessage = async ({ data: d }) => {
  try {
    if (d.type === 'probe') return postMessage({ type: 'probe', ok: 'VideoEncoder' in self && 'AudioEncoder' in self && 'VideoFrame' in self });
    if (d.type === 'init') {
      mp4 = d.kind === 'mp4';
      muxer = mp4
        ? new Mp4Muxer.Muxer({ target: new Mp4Muxer.ArrayBufferTarget(), video: { codec: 'avc', width: d.W, height: d.H, frameRate: d.fps }, audio: { codec: 'aac', numberOfChannels: d.ach, sampleRate: d.rate }, fastStart: 'in-memory', firstTimestampBehavior: 'offset' })
        : new WebMMuxer.Muxer({ target: new WebMMuxer.ArrayBufferTarget(), video: { codec: d.mux, width: d.W, height: d.H, frameRate: d.fps }, audio: { codec: 'A_OPUS', numberOfChannels: d.ach, sampleRate: d.rate }, firstTimestampBehavior: 'offset' });
      ve = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: fail }); ve.configure(d.vcfg);
      ae = new AudioEncoder({ output: (c, m) => muxer.addAudioChunk(c, m), error: fail }); ae.configure(d.acfg);
      const pcm = d.pcm;
      for (let off = 0; off < pcm.length; off += 4096) {
        const n = Math.min(4096, pcm.length - off), ad = new AudioData({ format: 'f32-planar', sampleRate: d.rate, numberOfFrames: n, numberOfChannels: d.ach, timestamp: Math.round((off / d.rate) * 1e6), data: planes(pcm, off, n, d.ach) });
        ae.encode(ad); ad.close();
      }
      return postMessage({ type: 'ready', err });
    }
    if (d.type === 'frame') {
      const vf = d.frame; if (!err) ve.encode(vf, { keyFrame: d.key }); vf.close();
      while (ve.encodeQueueSize > 4 && !err) await new Promise((r) => setTimeout(r, 2)); // acknowledge once the encoder has room
      return postMessage({ type: 'ack', i: d.i, q: ve.encodeQueueSize, err });
    }
    if (d.type === 'finish') {
      await ve.flush(); await ae.flush(); if (err) throw new Error(err);
      muxer.finalize(); const buf = muxer.target.buffer; close();
      return postMessage({ type: 'done', buf }, [buf]);
    }
    if (d.type === 'cancel') { close(); return postMessage({ type: 'cancelled' }); }
  } catch (x) { postMessage({ type: 'error', err: String((x && x.message) || x) }); }
  finally { if (d.type === 'finish' || d.type === 'cancel') { for (const x of [ve, ae]) { try { if (x && x.state !== 'closed') x.close(); } catch {} } } }
};
