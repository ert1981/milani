// ---------------------------------------------------------------
// Art Blocks PRNG.
//
// The Random class is the canonical Art Blocks one: two sfc32 streams
// seeded from the two halves of the token hash, warmed up, then drawn
// from alternately. Every random value in the piece comes from it, so a
// token always reproduces exactly the same artwork, wind, storms and
// music.
//
// One addition: reset(), which rewinds a stream to the state it had
// after warm-up. The tree is drawn in two passes — heavy branches on one
// layer, fine branches and blossom on another — and both passes have to
// replay the identical stream to be two halves of one tree.
//
// The block below only runs when the piece is opened outside the
// platform (local preview): it invents a hash so the work still renders.
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// Failure report. A generative script that throws at load time leaves a
// white frame and, on some hosts, no console. This paints the error over
// the page instead, and says so if setup() is never reached at all.
// ---------------------------------------------------------------
(function () {
  if (typeof window === "undefined") return;
  let shown = false;
  function report(title, detail) {
    if (shown) return;
    shown = true;
    try {
      const box = document.createElement("pre");
      box.style.cssText =
        "position:fixed;inset:0;z-index:99999;margin:0;padding:18px;" +
        "background:#080604;color:#ffb02e;font:11px/1.5 monospace;" +
        "white-space:pre-wrap;overflow:auto";
      box.textContent = "SPRING BEHIND THE RIVER\nHALTED\n\n" + title + "\n\n" + detail;
      (document.body || document.documentElement).appendChild(box);
    } catch (e) {}
  }
  window.__abReport = report;
  window.addEventListener("error", function (e) {
    report(
      String((e.error && e.error.message) || e.message || "error"),
      (e.filename || "?") + " line " + (e.lineno || "?") + "\n\n" +
        ((e.error && e.error.stack) || "")
    );
  });
  // if the first frame never arrives, say where it stopped
  setTimeout(function () {
    if (typeof window.__abFirstFrame === "undefined") {
      report(
        "NO FRAME DRAWN AFTER 6 SECONDS",
        "setup reached: " + (window.__abSetup ? "yes" : "NO") +
          "\ndraw reached: " + (window.__abDraw ? "yes" : "NO") +
          "\nbuild stage: " + (typeof buildStep === "undefined" ? "n/a" : buildStep) +
          "\np5 loaded: " + (typeof window.createCanvas === "function" ? "yes" : "NO") +
          "\ntokenData: " + (typeof tokenData === "undefined" ? "MISSING" : "ok")
      );
    }
  }, 6000);
})();

if (typeof tokenData === "undefined") {
  window.tokenData = {
    hash:
      "0x" +
      Array.from({ length: 64 }, () => "0123456789abcdef"[(Math.random() * 16) | 0]).join(""),
    tokenId: "0",
  };
}

function sfc32(uint128Hex, skip) {
  let a = parseInt(uint128Hex.substring(0, 8), 16);
  let b = parseInt(uint128Hex.substring(8, 16), 16);
  let c = parseInt(uint128Hex.substring(16, 24), 16);
  let d = parseInt(uint128Hex.substring(24, 32), 16);
  // warm-up: the same `skip` steps as calling the generator `skip` times, run on plain locals (no call per step).
  // The old warm-up loop called the closure a million times per stream and was the top cost of the startup.
  {
    let A = a, B = b, C = c, D = d;
    for (let i = 0; i < (skip || 0); i++) {
      A |= 0; B |= 0; C |= 0; D |= 0;
      const t = (((A + B) | 0) + D) | 0;
      D = (D + 1) | 0;
      A = B ^ (B >>> 9);
      B = (C + (C << 3)) | 0;
      C = (C << 21) | (C >>> 11);
      C = (C + t) | 0;
    }
    a = A; b = B; c = C; d = D;
  }
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    let t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

class Random {
  constructor(hash) {
    this.hash = hash || tokenData.hash;
    this.reset();
  }
  reset() {
    this.useA = false;
    // seed prngA with the first half of the hash, prngB with the second
    // each stream warmed up by 500000 steps, exactly as the old loop (1e6 / 2 calls on each)
    this.prngA = sfc32(this.hash.substring(2, 34), 5e5);
    this.prngB = sfc32(this.hash.substring(34, 66), 5e5);
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}

let R;
try {
  R = new Random(tokenData.hash);
} catch (e) {
  if (window.__abReport) window.__abReport("PRNG could not be seeded: " + e.message, String(tokenData && tokenData.hash));
  throw e;
}

// an independent stream off any hash, callable like a plain function
function createRandom(hash) {
  const r = new Random(hash);
  const fn = () => r.random_dec();
  fn.reset = () => r.reset();
  return fn;
}

// ---------------------------------------------------------------
// PostParams. Collectors may set these over time; every one of them
// falls back to the hash-derived value when it is not configured, so an
// unconfigured token renders exactly as it always did.
// ---------------------------------------------------------------
function postParams() {
  try {
    if (!tokenData || !tokenData.externalAssetDependencies) return {};
    const dep = tokenData.externalAssetDependencies[0];
    return dep && dep.data ? dep.data : {};
  } catch (e) {
    return {};
  }
}

const AB = {
  hash: tokenData.hash,
  tokenId: tokenData.tokenId,
  rand: (() => {
    const fn = () => R.random_dec();
    fn.reset = () => R.reset();
    return fn;
  })(),
  createRandom,
  params: postParams(),
  // a configured PostParam, or undefined
  param(name) {
    const v = this.params[name];
    return v === "" || v === undefined || v === null ? undefined : String(v);
  },
  _features: null,
  features(f) {
    this._features = f;
    window.features = f;
  },
  getFeatures() {
    return this._features;
  },
};
