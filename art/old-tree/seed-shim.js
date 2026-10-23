/* seed-shim.js — gives every sketch the same seeded randomness the platforms provide
   (Art Blocks tokenData, fxhash/$fx, highlight hl). The seed comes from ?h=0x… in the URL. */
(function () {
  var q = new URLSearchParams(location.search);
  var hash = q.get('h') || q.get('hash') || q.get('fxhash');
  if (!hash) { hash = '0x'; for (var i = 0; i < 64; i++) hash += '0123456789abcdef'[Math.floor(Math.random() * 16)]; }
  var s = []; for (var j = 0; j < 4; j++) s.push(parseInt(hash.slice(2 + j * 8, 10 + j * 8), 16) | 0);
  var a = s[0], b = s[1], c = s[2], d = s[3];
  function r() { a |= 0; b |= 0; c |= 0; d |= 0; var t = (((a + b) | 0) + d) | 0; d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); c = (c + t) | 0; return (t >>> 0) / 4294967296; }
  for (var k = 0; k < 12; k++) r();
  // read / restore the stream position (used by ot-build.js to give the tree build its own stream)
  r.getState = function () { return [a, b, c, d]; };
  r.setState = function (v) { a = v[0]; b = v[1]; c = v[2]; d = v[3]; };
  Math.random = r;
  var tid = q.get('tid') || '0';
  if (typeof window.tokenData === 'undefined') window.tokenData = { hash: hash, tokenId: tid, tid: Number(tid) };
  window.fxhash = window.fxhash || hash; window.fxrand = window.fxrand || r;
  if (typeof window.$fx === 'undefined') window.$fx = { hash: hash, rand: r, minter: '0x0', randminter: r, iteration: 1, context: 'standalone', isPreview: false,
    params: function () {}, getParam: function () {}, getParams: function () { return {}; }, features: function () {}, preview: function () {}, on: function () {}, emit: function () {} };
  if (typeof window.hl === 'undefined') window.hl = { tx: { hash: hash, tokenId: tid, editionSize: 1, mintSize: 1, mintIteration: 1, walletAddress: '0x0', timestamp: Date.now(), contractAddress: '0x0' },
    random: function (x, y) { if (x === undefined) return r(); if (y === undefined) { y = x; x = 0; } return x + r() * (y - x); },
    randomInt: function (x, y) { return Math.floor(x + r() * (y - x + 1)); }, randomBool: function (p) { return r() < (p === undefined ? 0.5 : p); },
    randomElement: function (arr) { return arr[Math.floor(r() * arr.length)]; },
    token: { setTraits: function () {}, getTraits: function () { return {}; }, setName: function () {}, setDescription: function () {}, capturePreview: function () {} } };
})();
