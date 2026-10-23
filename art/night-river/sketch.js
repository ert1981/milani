



/* =========================================================================
   VERSE PAYLOAD HANDLING
   ========================================================================= */
const VERSE = (function () {
  const params = new URLSearchParams(window.location.search);
  const isMachine = params.get("machine") === "true" || params.get("machine") === "1";
  const DEV_FALLBACK_HASH =
    "0x5566778899aabbccddeeff001122334455667788990011223344556677889a";
  let payload = {};
  try {
    const q = params.get("payload");
    payload = q ? JSON.parse(atob(q)) : {};
  } catch (err) {
    console.warn("[verse] Malformed payload, falling back to dev hash.", err);
    payload = {};
  }
  // MERGE FIX: the Grokly app (and Verse/Highlight links) pass the seed as ?h=0x…; payload.hash still wins when present.
  let hash = payload && typeof payload.hash === "string" ? payload.hash : params.get("h");
  if (!hash || !/^0x[0-9a-fA-F]+$/.test(hash)) {
    if (hash) console.warn("[verse] Payload hash malformed, using dev fallback.");
    hash = DEV_FALLBACK_HASH;
  }
  return {
    hash,
    editionNumber: Number.isFinite(Number(payload.editionNumber)) ? Number(payload.editionNumber) : 0,
    totalEditions: Number.isFinite(Number(payload.totalEditions)) ? Number(payload.totalEditions) : 1,
    isMachine,
    previewMode: params.get("pr") === "1",
  };
})();

class Random {
    constructor() {
      this.useA = false;
      let sfc32 = function (uint128Hex) {
        let a = parseInt(uint128Hex.substring(0, 8), 16);
        let b = parseInt(uint128Hex.substring(8, 16), 16);
        let c = parseInt(uint128Hex.substring(16, 24), 16);
        let d = parseInt(uint128Hex.substring(24, 32), 16);
        const g = function () {
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
        // state access for Random.fillNoise (bulk generation with the same sequence)
        g.__st = function () { return [a, b, c, d]; };
        g.__set = function (s) { a = s[0]; b = s[1]; c = s[2]; d = s[3]; };
        return g;
      };
      // FIX: was tokenData.hash.substring(...) — tokenData was never
      // defined, so `new Random()` (called at the top level for `R` and
      // once more for `randomGenerator`) threw a ReferenceError immediately
      // on page load, before setup() ever ran. Now sourced from the Verse
      // payload hash.
      const hashBody = VERSE.hash.slice(2).padEnd(64, "0");
      this.prngA = new sfc32(hashBody.substring(0, 32));
      this.prngB = new sfc32(hashBody.substring(32, 64));
      // FIX: was 1e6. Two Random instances still means this ran twice;
      // 2000 is a generous warm-up without the 500,000-iteration cost.
      for (let i = 0; i < 2000; i += 2) {
        this.prngA();
        this.prngB();
      }
    }
    // n values of Math.floor(R.random_num(lo, hi)), exactly as n calls in a row would give them (same values, same
    // A/B alternation, same generator state afterwards), but with the sfc32 state in local variables: ~20x faster.
    fillNoise(n, lo, hi) {
      const st = [this.prngA.__st(), this.prngB.__st()], out = new Array(n);
      let useA = this.useA;
      for (let i = 0; i < n; i++) {
        useA = !useA;
        const s = useA ? st[0] : st[1];
        let a = s[0] | 0, b = s[1] | 0, c = s[2] | 0, d = s[3] | 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); c = (c + t) | 0;
        s[0] = a; s[1] = b; s[2] = c; s[3] = d;
        out[i] = Math.floor(lo + (hi - lo) * ((t >>> 0) / 4294967296));
      }
      this.useA = useA;
      this.prngA.__set(st[0]); this.prngB.__set(st[1]);
      return out;
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
  let R = new Random();
 

let colorset = [];
let kijosk = [];
function gitacolork() {
  let r, g, b, d, chosenColor;
  const rangiD2 = [
     { r: 0, g: 109, b: 119 },
  { r: 131, g: 197, b: 190 },
  { r: 237, g: 246, b: 249 },
  { r: 255, g: 221, b: 210 },
  { r: 226, g: 149, b: 120 },
  { r: 239, g: 71, b: 111 },
  { r: 255, g: 209, b: 102 },
  { r: 6, g: 214, b: 160 },
  { r: 17, g: 138, b: 178 },
  { r: 7, g: 59, b: 76 },
  { r: 13, g: 65, b: 225 },
  { r: 12, g: 99, b: 231 },
  { r: 10, g: 133, b: 237 },
  { r: 9, g: 166, b: 243 },
  { r: 7, g: 200, b: 249 },
  { r: 247, g: 178, b: 103 },
  { r: 247, g: 157, b: 101 },
  { r: 244, g: 132, b: 95 },
  { r: 242, g: 112, b: 89 },
  { r: 242, g: 92, b: 84 },
    { r: 38, g: 70, b: 83 },
    { r: 42, g: 157, b: 143 },
    { r: 233, g: 196, b: 106 },
    { r: 244, g: 162, b: 97 },
    { r: 231, g: 111, b: 81 },
    { r: 142, g: 202, b: 230 },
    { r: 33, g: 158, b: 188 },
    { r: 2, g: 48, b: 71 },
    { r: 255, g: 183, b: 3 },
    { r: 251, g: 133, b: 0 },
    { r: 230, g: 57, b: 70 },
{ r: 241, g: 250, b: 238 },
{ r: 168, g: 218, b: 220 },
{ r: 69, g: 123, b: 157 },
{ r: 29, g: 53, b: 87 },
{ r: 244, g: 241, b: 222 },
{ r: 224, g: 122, b: 95 },
{ r: 61, g: 64, b: 91 },
{ r: 129, g: 178, b: 154 },
{ r: 242, g: 204, b: 143 },
{ r: 255, g: 190, b: 11 },
{ r: 251, g: 86, b: 7 },
{ r: 255, g: 0, b: 110 },
{ r: 131, g: 178, b: 56 },
{ r: 58, g: 134, b: 255 },
{ r: 255, g: 205, b: 162 },
{ r: 255, g: 180, b: 7 },
{ r: 229, g: 152, b: 155 },
{ r: 181, g: 131, b: 141 },
{ r: 109, g: 104, b: 117 },
  ];
  
 do {
    const randomIndex = randomGenerator.random_int(0, rangiD2.length - 1);
    const { r: rVal, g: gVal, b: bVal } = rangiD2[randomIndex];
    r = randomGenerator.random_num(0, 256);
    g = randomGenerator.random_num(0, 256);
    b = randomGenerator.random_num(0, 256);
    d = sqrt((r - rVal) ** 2 + (g - gVal) ** 2 + (b - bVal) ** 2);
    chosenColor = color(r, g, b, randomGenerator.random_num(200, 255));
  } while (d > 30);

  return chosenColor;
}

let colors4;


 
  
  let colors_b1 =  "111d13,f8f9fa,e9ecef,dee2e6,ced4da,adb5bd,6c757d,495057,343a40,212529".split(",").map((a) => "#" + a);
  let colors_b2 =  "111d13,edeec9,dde7c7,bfd8bd,98c9a3,77bfa3".split(",").map((a) => "#" + a);
  let colors_b3 =  "111d13,f6bd60,f7ede2,f5cac3,84a59d,f28482".split(",").map((a) => "#" + a);
  let colors_b4 =  "111d13,f92a82,ed7b84,f5dbcb,d6d5b3,7eb77f".split(",").map((a) => "#" + a);
  let colors_b5 =  "595959,7f7f7f,a5a5a5,cccccc,f2f2f2".split(",").map((a) => "#" + a);
  let colors_b6 =  "111d13,b4b8ab,153243,284b63,f4f9e9,eef0eb".split(",").map((a) => "#" + a);
  let colors_b7 =  "111d13,590d22,800f2f,a4133c,c9184a,ff4d6d,ff758f,ff8fa3,ffb3c1,ffccd5,fff0f3".split(",").map((a) => "#" + a);
  let colors_b8 =  "111d13,f9dbbd,ffa5ab,da627d,a53860,450920".split(",").map((a) => "#" + a);
  let colors_b9 =  "111d13,ff0a54,ff477e,ff5c8a,ff7096,ff85a1,ff99ac,fbb1bd,f9bec7,f7cad0,fae0e4".split(",").map((a) => "#" + a);
  let colors_b10 =  "111d13,f7b267,f79d65,f4845f,f27059,f25c54".split(",").map((a) => "#" + a);
  let colors_b11 =  "111d13,cc444b,da5552,df7373,e39695,e4b1ab".split(",").map((a) => "#" + a);
  let colors_b12 =  "111d13,03071e,370617,6a040f,9d0208,d00000,dc2f02,e85d04,f48c06,faa307,ffba08".split(",").map((a) => "#" + a);
  let colors_b13 =  "111d13,99e2b4,88d4ab,78c6a3,67b99a,56ab91,469d89,358f80,248277,14746f,036666".split(",").map((a) => "#" + a);
  let colors_b14 =  "111d13,75dddd,508991,172a3a,004346,09bc8a".split(",").map((a) => "#" + a);
  let colors_b15 =  "111d13,119da4,0c7489,13505b,040404,d7d9ce".split(",").map((a) => "#" + a);
  let colors_b16 =  "111d13,05668d,028090,00a896,02c39a,f0f3bd".split(",").map((a) => "#" + a);
  let colors_b17 =  "111d13,066839,0a5c36,0f5132,14452f,18392b,1d2e28,212224".split(",").map((a) => "#" + a);
  let colors_b18 =  "111d13,0b2c24,0f392b,134632,185339,1c603f,206d46,247a4d".split(",").map((a) => "#" + a);
  let colors_b19 =  "111d13,031911,042117,05291c,063122,073928,09422d,0a4a33,0b5239,0c5a3e,0d6244".split(",").map((a) => "#" + a);
  let colors_b20 =  "111d13,dad7cd,a3b18a,588157,3a5a40,344e41".split(",").map((a) => "#" + a);
  let colors_b21 =  "111d13,132a13,31572c,4f772d,90a955,ecf39e".split(",").map((a) => "#" + a);
  let colors_b22 =  "111d13,143601,1a4301,245501,538d22,73a942,aad576".split(",").map((a) => "#" + a);
  let colors_b23 =  "111d13,020202,0d2818,04471c,058c42,16db65".split(",").map((a) => "#" + a);
  
  
  
  
  
  
  
  
  
  
  let colorset2 = [];
  let colors3;
  
  let colors_tone9 =  "606c38,283618,fefae0,dda15e,bc6c25".split(",").map((a) => "#" + a);
  let colors_tone10 =  "dad7cd,a3b18a,588157,3a5a40,344e41".split(",").map((a) => "#" + a);
  let colors_tone11 =   "132a13,31572c,4f772d,90a955,ecf39e".split(",").map((a) => "#" + a);
  let colors_tone12 = "e9f5db,cfe1b9,b5c99a,97a97c,87986a,718355".split(",").map((a) => "#" + a);
  let colors_tone13 =  "d8f3dc,b7e4c7,95d5b2,74c69d,52b788,40916c,2d6a4f,1b4332,081c15".split("-").map((a) => "#" + a);
  let colors_tone14 =  "386641,6a994e,a7c957,f2e8cf,bc4749".split(",").map((a) => "#" + a);
  let colors_tone15 =   "2c6e49,4c956c,fefee3,ffc9b9,d68c45".split(",").map((a) => "#" + a);
  let colors_tone16 =   "1f2421,216869,49a078,9cc5a1,dce1de".split(",").map((a) => "#" + a);
  let colors_tone17 =   "1f2421,216869,49a078,9cc5a1,dce1de".split(",").map((a) => "#" + a);
  let colors_tone18 =   "03045e,023e8a,0077b6,0096c7,00b4d8,48cae4,90e0ef,ade8f4,caf0f8".split(",").map((a) => "#" + a);
  let colors_tone29 =   "f8f9fa,e9ecef,dee2e6,ced4da,adb5bd,6c757d,495057,343a40,212529".split(",").map((a) => "#" + a);
  let colors_tone19 =   "edf2fb,e2eafc,d7e3fc,ccdbfd,c1d3fe,b6ccfe,abc4ff".split(",").map((a) => "#" + a);
  let colors_tone20 =   "012a4a,013a63,01497c,014f86,2a6f97,2c7da0,468faf,61a5c2,89c2d9,a9d6e59".split(",").map((a) => "#" + a);
  let colors_tone21 =   "edeec9,dde7c7,bfd8bd,98c9a3,77bfa3".split(",").map((a) => "#" + a);
  let colors_tone22 =   "f6bd60,f7ede2,f5cac3,84a59d,f28482".split(",").map((a) => "#" + a);
  let colors_tone23 =   "ffb5a7,fcd5ce,f8edeb,f9dcc4,fec89a".split(",").map((a) => "#" + a);
  let colors_tone24 =   "d4c685,f7ef81,cfe795,a7d3a6,add2c2".split(",").map((a) => "#" + a);
  let colors_tone25 =   "cb997e,ddbea9,ffe8d6,b7b7a4,a5a58d,6b705c".split(",").map((a) => "#" + a);
  let colors_tone26 =   "ccd5ae,e9edc9,fefae0,faedcd,d4a373".split(",").map((a) => "#" + a);
  let colors_tone27 =   "cb997e,eddcd2,fff1e6,f0efeb,ddbea9,a5a58d,b7b7a4".split(",").map((a) => "#" + a);
  let colors_tone28 =   "463f3a,8a817c,bcb8b1,f4f3ee,e0afa0".split(",").map((a) => "#" + a);
  
  
  
  
  
  
  
  let colors1 = "fef9fb-fafdff-fcfbf4-f9f8f6".split("-").map((a) => "#" + a);
  let colors2;
  let colors_tone1 = "641220,6E1423,85182A ,A11D33,A71E34,B21E35,BD1F36,C71F37,DA1E37,E01E37".split(",").map((a) => "#" + a);
  let colors_tone2 = "fff23e,ffd12f,ffab3b,ff792e,191919".split(",").map((a) => "#" + a);
  let colors_tone3 = "fe6a86,fd969a,ffdce0,fee255,ffdd13".split(",").map((a) => "#" + a);
  let colors_tone4 = "ffe863,ffe150,ffd93d,facb2e,f5bd1f,722e9a,682a92,5d2689,522882,47297b".split(",").map((a) => "#" + a);
  let colors_tone5 = "00296b,003f88,00509d,fdc500,ffd500".split(",").map((a) => "#" + a);
  let colors_tone6 = "ff0a54,ff477e,ff5c8a,ff7096,ff85a1,ff99ac,fbb1bd,f9bec7,f7cad0,fae0e4".split(",").map((a) => "#" + a);
  let colors_tone7 = "880d1e,dd2d4a,f26a8d,f49cbb,cbeef3".split(",").map((a) => "#" + a);
  let colors_tone8 =  "ffe5ec,ffc2d1,ffb3c6,ff8fab,fb6f92" .split(",").map((a) => "#" + a);
  let colors_tonea1 =  "000814,001d3d,003566,ffc300,ffd60a".split(",").map((a) => "#" + a);
  let colors_tonea2 =  "f9dc5c,fae588,fcefb4,fdf8e1,f9dc5c".split(",").map((a) => "#" + a);
  let colors_tonea3 =  "ff7b00,ff8800,ff9500,ffa200,ffaa00,ffb700,ffc300,ffd000,ffdd00,ffea00".split(",").map((a) => "#" + a);
  let colors_tonea4 =  "6e44ff,b892ff,ffc2e2,ff90b3,ef7a85".split(",").map((a) => "#" + a);
  let colors_tonea5 =  "ffcbf2,f3c4fb,ecbcfd,e5b3fe,e2afff,deaaff,d8bbff,d0d1ff,c8e7ff,c0fdff".split(",").map((a) => "#" + a);
  let colors_tonea6 =  "ffd6ff,e7c6ff,c8b6ff,b8c0ff,bbd0ff".split(",").map((a) => "#" + a);
  let colors_tonea7 =  "cdb4db,ffc8dd,ffafcc,bde0fe,a2d2ff".split(",").map((a) => "#" + a);
  let colors_tonea8 =  "390099,9e0059,ff0054,ff5400,ffbd00".split(",").map((a) => "#" + a);
  let colors_tonea9 =  "fec5bb,fcd5ce,fae1dd,f8edeb,e8e8e4,d8e2dc,ece4db,ffe5d9,ffd7ba,fec89a".split(",").map((a) => "#" + a);
  let colors_tonea10 =  "000000,14213d,fca311,e5e5e5,ffffff".split(",").map((a) => "#" + a);
  let colors_tonea11 =  "f8f9fa,e9ecef,dee2e6,ced4da,adb5bd,6c757d,495057,343a40,212529".split(",").map((a) => "#" + a);
  let colors_tonea12 =  "fffcf2,ccc5b9,403d39,252422,eb5e28".split(",").map((a) => "#" + a);
  let colors_tonea13 =  "0b090a,161a1d,660708,a4161a,ba181b,e5383b,b1a7a6,d3d3d3,f5f3f4,ffffff".split(",").map((a) => "#" + a);
  let colors_tonea14 =  "003049,d62828,f77f00,fcbf49,eae2b7".split(",").map((a) => "#" + a);
  let colors_tonea15 =  "2b2d42,8d99ae,edf2f4,ef233c,d90429".split(",").map((a) => "#" + a);
  let colors_tonea16 =  "011627,fdfffc,2ec4b6,e71d36,ff9f1c".split(",").map((a) => "#" + a);
  let colors_tonea17 =  "e63946,f1faee,a8dadc,457b9d,1d3557".split(",").map((a) => "#" + a);
  let colors_tonea18 =  "003049,d62828,f77f00,fcbf49,eae2b7".split(",").map((a) => "#" + a);
  let colors_tonea19 =  "555b6e,89b0ae,bee3db,faf9f9,ffd6ba".split(",").map((a) => "#" + a);
  let colors_tonea20 =  "ffadad,ffd6a5,fdffb6,caffbf,9bf6ff,a0c4ff,bdb2ff,ffc6ff,fffffc".split(",").map((a) => "#" + a);
  let colors_tonea21 =  "264653,2a9d8f,e9c46a,f4a261,e76f51".split(",").map((a) => "#" + a);
  let colors_tonea22 =  "8ecae6,219ebc,023047,ffb703,fb8500".split(",").map((a) => "#" + a);
  let colors_tonea23 =  "5f0f40,9a031e,fb8b24,e36414,0f4c5c".split(",").map((a) => "#" + a);
  let colors_tonea24 =  "f7b267,f79d65,f4845f,f27059,f25c54".split(",").map((a) => "#" + a);
  let colors_tonea25 =  "03045e,023e8a,0077b6,0096c7,00b4d8,48cae4,90e0ef,ade8f4,caf0f8".split(",").map((a) => "#" + a);
  let colors_tonea26 =  "ef476f,ffd166,06d6a0,118ab2,073b4c".split(",").map((a) => "#" + a);
  let colors_tonea27 =  "797d62,9b9b7a,baa587,d9ae94,f1dca7,ffcb69,e8ac65,d08c60,b58463,997b66".split(",").map((a) => "#" + a);
  let colors_tonea28 =  "202c39,283845,b8b08d,f2d492,f29559".split(",").map((a) => "#" + a);
  let colors_tonea29 =  "343330,45462a,7e5920,dc851f,ffa737".split(",").map((a) => "#" + a);
  
  
  
  
  
  
  
  
  
  
  let colors_root = "f7b267,f79d65,f4845f,f27059,f25c54".split(",").map((a) => "#" + a);
  
  
let colx;

  let randomColor;
  let currentColor = null;


  function color1d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 38) ** 2 + (g - 70) ** 2 + (b - 83) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color2d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 42) ** 2 + (g - 157) ** 2 + (b - 143) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color3d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 233) ** 2 + (g - 196) ** 2 + (b - 106) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color4d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 244) ** 2 + (g - 162) ** 2 + (b - 97) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color5d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 231) ** 2 + (g - 111) ** 2 + (b - 81) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  
  function color6d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 142) ** 2 + (g - 202) ** 2 + (b - 230) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color7d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 33) ** 2 + (g - 158) ** 2 + (b - 188) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color8d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 2) ** 2 + (g - 48) ** 2 + (b - 71) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color9d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 255) ** 2 + (g - 183) ** 2 + (b - 3) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color10d() {
    let r, g, b, d;
    do {
      r = R.random_num(0, 256);
      g = R.random_num(0, 256);
      b = R.random_num(0, 256);
      d = sqrt((r - 251) ** 2 + (g - 133) ** 2 + (b - 0) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
   let colorsf = [
    {name: 'color1d', func: color1d},
    {name: 'color2d', func: color2d},
    {name: 'color3d', func: color3d},
    {name: 'color4d', func: color4d},
    {name: 'color5d', func: color5d},
    
    {name: 'color6d', func: color6d},
    {name: 'color7d', func: color7d},
    {name: 'color8d', func: color8d},
    {name: 'color9d', func: color9d},
    {name: 'color10d',func: color10d},
   ]

// only run once
 let colorset3 = [];
let shapegraphic; // متغیری برای ذخیره کد شیپ
let shapegraphic2;
const canvasWidth = 1000;
const canvasHeight = 1400;
const rows = 12;
const cols = 80;
const cellWidth = canvasWidth / rows;
const cellHeight = canvasHeight / cols;
const cellDepth = 100;
const randomGenerator = new Random();
function chooseRandomColor() {
    if (currentColor == null) {
      const randomIndex = R.random_int(0, colorsf.length - 1);
      const chosenColor = colorsf[randomIndex];
      let randomColors = [];
      for (let i = 0; i < 90; i++) {
        randomColors.push(chosenColor.func());
      }
      currentColor = { name: chosenColor.name, colors: randomColors };
    }
    return currentColor;
  }

//var imgs="https://bafybeig42q2kaocyetkwar3jy5yq4mb4ezyip5qxv5bug4ai2shftlj24y.ipfs.nftstorage.link/";
//let images = {min: 1, max: 7200}
//let deltaimg = images.max - images.min
//const randImg = Math.round(images.min + R.random_int(0, deltaimg));



var points = [];
var EPSILON = 0.001;//0.001
var density = 40;
var hps = [];//horizontal particles
//Angle Bridage
var mult

//  nft number from ipfs server  1/7200

var imgs = "assets/";
let images = { min: 1, max: 8 };
let deltaimg = images.max - images.min;
const randImg = Math.round(images.min + R.random_int(0, deltaimg));

// MERGE v2: the scene is the live Sakura piece (sakura-source.js); the ink is the brush-wave painting assets/4.jpeg,
// turned into a transparent ink layer once (NRS.buildInk) and laid over the scene every frame. randImg (still drawn
// from R exactly as in the original) now only picks how the ink is placed: mirrored or not, and how high it sits.
let inkImg;
function preload() { } // owner: no ink painting — the picture is the live Sakura scene only


let w = 1000;
let h = 1000;
let img;
let TVOverlay;
let tvnoise;

let barY1;
let barY2;

//tv noise
let ppx;
let px = [];
px.length = w;

let tvstate = true;

let timeIndexInfo;
let firstCountInfo;

let lerpAmount = 0;
let lerpScale = 0;
let lerpShrink = 0;

let tvheight = 0;
let tvwidth = 0;

 var DEFAULT_SIZE = 1000;
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  var DIM = Math.min(WIDTH, HEIGHT);
  var M = DIM / DEFAULT_SIZE;
function setup() {
  createCanvas(1000, 1000);
  // FIX: no pixelDensity() call existed anywhere in the original. This
  // sketch does raw per-pixel array math (img.pixels, tvnoise.pixels,
  // ppx[]) sized to exactly width x height (1000x1000). Left at p5's
  // default, a high-DPI viewer (devicePixelRatio > 1) would silently get a
  // pixels array scaled by density^2 with different dimensions than the
  // code assumes — misaligning or breaking the TV-noise effect. This must
  // stay 1 for the pixel math to be correct; do not raise it like the
  // other files in this series (unlike a one-shot render, this sketch
  // recomputes the full pixel array every animation frame, so raising
  // density here would also be a severe, continuous performance cost, not
  // a one-time render cost).
  pixelDensity(1);
  shapegraphic2 = createGraphics(1000, 1000);
	img = createImage(1000, 1000);
	//img.filter(THRESHOLD, 0.24);
	//TVOverlay.resize(w, h);
  // precalculate tv noise
  tvnoise = createImage(1000, 1000);
 
  const parent = canvas.parentElement;
parent.style.height = '100vh';
parent.style.width = '100vw';
parent.style.display = 'flex';
parent.style.justifyContent = 'center';
parent.style.alignItems = 'center';

// Force canvas into square aspect ratio that fits in the smaller
// of width or height of document
const sizeCanvas = () => {
  const smallerEdge = Math.min(window.innerHeight, window.innerWidth);
  canvas.style.width = smallerEdge + 'px';
  canvas.style.height = smallerEdge + 'px';
}

// Make canvas fit in window
sizeCanvas();

// Optionally fit canvas on resize (does not resize art itself)
window.addEventListener('resize', sizeCanvas);
  
 
 
 

  tvnoise.loadPixels();
  // ppx: one TV-noise offset per pixel byte (4,000,000 values). Same values and the same R state afterwards as
  // `ppx.push(floor(R.random_num(-32, 32)))` in a loop, but generated by R.fillNoise() with local generator state
  // (the closure loop cost ~0.5 s of one blocking task).
  ppx = R.fillNoise(tvnoise.pixels.length, -32, 32);
  img.loadPixels();

  tvwidth = w;
  tvheight = h;
	
	barY1 = R.random_num(0, h);
	barY2 = barY1 + R.random_num(30, 40);

  timeIndexInfo = millis();
  firstCountInfo = millis();

  noSmooth();



       
    colors2 = R.random_choice([colors_tone1,colors_tone2,colors_tone3,colors_tone4,colors_tone5,colors_tone6,colors_tone7,colors_tone8,colors_tonea1,colors_tonea2,colors_tonea3,colors_tonea4,colors_tonea5,colors_tonea6,colors_tonea7,colors_tonea8,colors_tonea9,colors_tonea10,colors_tonea11,colors_tonea12,colors_tonea13,colors_tonea14,colors_tonea15,colors_tonea16,colors_tonea17,colors_tonea18,colors_tonea19,colors_tonea20,colors_tonea21,colors_tonea22,colors_tonea23,colors_tonea24,colors_tonea25,colors_tonea26,colors_tonea27,colors_tonea28,colors_tonea29,colors_tone9, colors_tone10, colors_tone11, colors_tone12, colors_tone13,colors_tone14,colors_tone15,colors_tone16,colors_tone17,colors_tone18,colors_tone19,colors_tone20,colors_tone21,colors_tone22,colors_tone23,colors_tone24,colors_tone25,colors_tone26,colors_tone27,colors_tone28,colors_tone29 ,colors_b1,colors_b2,colors_b3,colors_b4,colors_b5,colors_b6,colors_b7,colors_b8,colors_b9,colors_b10,colors_b11,colors_b12,colors_b13,colors_b14,colors_b15,colors_b16,colors_b17,colors_b18,colors_b19,colors_b20,colors_b21,colors_b22,colors_b23 ]);
    colors3 = R.random_choice([colors_tone9, colors_tone10, colors_tone11, colors_tone12, colors_tone13,colors_tone14,colors_tone15,colors_tone16,colors_tone17,colors_tone18,colors_tone19,colors_tone20,colors_tone21,colors_tone22,colors_tone23,colors_tone24,colors_tone25,colors_tone26,colors_tone27,colors_tone28,colors_tone29 ]);
    colors4 = R.random_choice([ colors_b1,colors_b2,colors_b3,colors_b4,colors_b5,colors_b6,colors_b7,colors_b8,colors_b9,colors_b10,colors_b11,colors_b12,colors_b13,colors_b14,colors_b15,colors_b16,colors_b17,colors_b18,colors_b19,colors_b20,colors_b21,colors_b22,colors_b23]);
 
    colorset3[0] = R.random_choice(colors4);
    colorset3[1] = R.random_choice(colors4);
    colorset3[2] = R.random_choice(colors4);
    colorset3[3] = R.random_choice(colors4);
    colorset3[4] = R.random_choice(colors4);
    colorset3[5] = R.random_choice(colors4);
    colorset3[6] = R.random_choice(colors4);
    colorset3[7] = R.random_choice(colors4);
    colorset3[8] = R.random_choice(colors4);
    colorset3[9] = R.random_choice(colors4);
    colorset3[10] = R.random_choice(colors4);
    colorset3[11] = R.random_choice(colors4);
    colorset3[12] = R.random_choice(colors4);
    colorset3[13] = R.random_choice(colors4);
    colorset3[14] = R.random_choice(colors4);
    colorset3[15] = R.random_choice(colors4);
    colorset3[16] = R.random_choice(colors4);
    colorset3[17] = R.random_choice(colors4);
    colorset3[18] = R.random_choice(colors4);
    colorset3[19] = R.random_choice(colors4);
    colorset3[20] = R.random_choice(colors4);
    colorset3[21] = R.random_choice(colors4);
    
    
    
    colorset[0] = R.random_choice(colors2);
    colorset[1] = R.random_choice(colors2);
    colorset[2] = R.random_choice(colors2);
    colorset[3] = R.random_choice(colors2);
    colorset[4] = R.random_choice(colors2);
    colorset[5] = R.random_choice(colors2);
    colorset[6] = R.random_choice(colors2);
    colorset[7] = R.random_choice(colors2);

    colorset2[0] = R.random_choice(colors2);
    colorset2[1] = R.random_choice(colors2);
    colorset2[2] = R.random_choice(colors2);
    colorset2[3] = R.random_choice(colors2);
    colorset2[4] = R.random_choice(colors2);
    colorset2[5] = R.random_choice(colors2);
    colorset2[6] = R.random_choice(colors2);
    colorset2[7] = R.random_choice(colors2);


	//background(0);//10
				//particle.pos = createVector(x + R.random_num(-1,1), y + R.random_num(-1,1));
          //  particle.vel = createVector(R.random_num(0, 1), R.random_num(-1, 1));
           // particle.speed = R.random_num(1, 2)>0?5:-1;//better result if move different direction.
           // particle.size = R.random_num(0.001, 5)*M;
            //particle.col = color(R.random_num(0, 255), R.random_num(0, 255), R.random_num(0, 255), R.random_num(0, 255));
           // particle.col = color(img.get(particle.pos.x, particle.pos.y));
           // particle.col= 255
	
      // blendMode(ADD)
      // stroke(255,60)
      // curve(xPos-R.random_num(10, 1000),yPos-R.random_num(10, 1000),sin(xPos)* random (1000)-R.random_num(10, 1000) ,R.random_num(0, 2000)-R.random_int(10,100), R.random_num(0, 2000),cos(xPos)*sin(xPos)* random (1000)-R.random_num(10, 1000)  ,cos(yPos)*sin(yPos)*R.random_num(0, 2), cos(xPos)*sin(xPos)*140)

		 frameRate(30); // تنظیم مقدار فریم‌ریت به 1 فریم در ثانیه
 time = 0; // زمان ابتدایی را صفر قرار می‌دهیم
 a= random(70,250)
    background(a);
 noStroke()
    b= random(120,150)
    d=random(80,90)
    fill(a+70)
    circle(random(90,500),random(90,500),a+20)
  
  noStroke()
	}
	
  function paper() {
  push();
  strokeWeight(1);
  noStroke();
  for (var i = 0; i<width-1; i+=2) {
    for (var j = 0; j<height-1; j+=2) {
    fill(R.random_num(205-40, 205+30), 25);
      rect(i, j, 2, 2);
    }
  }

  for (var i = 0; i<30; i++) {
    fill(R.random_num(130, 215), R.random_num(100, 170));
    rect(R.random_num(0, width-2), R.random_num(0, height-2), R.random_num(1, 3), R.random_num(1, 3));
  }

	mult = R.random_num(0.2, 0.1)


  

}

function curl(x, y){//vortex based on image gradient.
  //Find rate of change in X direction
  var n1 = brightness(color(img.get(x + 1, y)));
  var n2 = brightness(color(img.get(x - 1, y)));
  //n1 += noise(x*mult + EPSILON, y*mult);
  //n2 += noise(x*mult - EPSILON, y*mult);

  //Average to find approximate derivative
  var a = (n1 - n2)/(2 * EPSILON);

  //Find rate of change in Y direction
  n1 = brightness(color(img.get(x, y + 1)));
  n2 = brightness(color(img.get(x, y - 1)));
  //n1 += noise(x*mult, y + EPSILON*mult); 
  //n2 += noise(x*mult, y - EPSILON*mult); 

  //Average to find approximate derivative
  var b = (n1 - n2)/(2 * EPSILON);

  return new createVector(b, -a);
}

function gol() {
  //fill(0, 2);
  //rect(0, 0, WIDTH, HEIGHT);

	noStroke()
	//fill(255)
	
	for(var i=0; i<points.length; i++){
		
        var p = points[i];
		var c = color(img.get(p.pos.x, p.pos.y));
		
		var r = red(c);   //map(points[i].x, 0, width, r1, r2)
		var g = green(c); //map(points[i].y, 0, height, g1, g2)
		var b = blue(c);  //map(points[i].y, 0, width, b1, b2)
		var a = map(dist(width /2, height /2, p.pos.x, p.pos.y), 0, 380, 255, 0)
		//var alpha = (sin(i/318)*255)+100
        
        var pc = p.col;
        var pr = red(pc)/255.0;
        var pg = green(pc)/255.0;
        var pb = blue(pc)/255.0;
        var pa = alpha(pc)/255.0;
        
		
		//fill(fc);
		
        //curl noise version
        var cvec = curl(p.pos.x,p.pos.y);
        var cvecMag = cvec.mag();
        var vec = cvec.normalize();
      if(!mouseIsPressed){
        p.color = color(r,g,b, a*pa);
        p.col = c;
        if(cvecMag > 200){
          p.vel = (vec)
        }
        //perin noise version
        else{
        var angle = map(noise(p.pos.x * mult, p.pos.y * mult),0,1, 0, 1720)
        p.vel = (createVector(cos(angle)*p.speed, sin(angle)*p.speed))
        }
      }
        p.pos.add(p.vel);
		
		if (dist(width/2, height/2, p.pos.x, p.pos.y) < 800){ 
          //var radius = pow(1-brightness(c)/255.0 ,10)*10;
          fill(p.col);
			ellipse(p.pos.x, p.pos.y, p.size*brightness(c)/255.0*3);
		}
      if(R.random_num(200)<1){
      }
     
	}

}
 
  function b4() {
    //  hk3() 

 //  bad2()
 //  gol()

frameRate(20)
 renderDistort();
  // QW1q()
////drawj()
 
  }

function b1() {
    //  hk3() 

 //  bad2()
 //  gol()
frameRate(20)
scale(4.2)
translate(-200,-330)
 renderDistort();
  // QW1q()
//drawj()
 
  }


function b2() {
    //  hk3() 

 //  bad2()
 //  gol()
frameRate(30)
scale(4)
translate(-360,-200)
 renderDistort();
  // QW1q()
//drawj()
 
  }

  function b3() {
    //  hk3() 

 //  bad2()
 //  gol()
frameRate(30)
scale(3.5)
translate(-520,-360)
 renderDistort();
 //  QW1q()
//p1()
 //drawj()
  }

function draw() {
 // background(220);
  
  if (time >= 0 && time < 50) {
    b1();
  } else if (time >= 2 && time < 100) {
    b2();
  } else if (time >= 4 && time < 150) {
    b3();
  } else if (time >= 6 && time < 250) {
    b4();
  }
  
  time += 1;
  
  if (time >= 250) {
    time = 0;
  }

  // NOTE: this sketch's 250-frame b1->b2->b3->b4 cycle, looping forever
  // without ever calling noLoop(), is preserved as-is — it is clearly an
  // intentional continuous VHS/glitch animation, not an oversight (unlike
  // the missing noLoop() bugs fixed in other files in this series). Verse
  // preview capture is instead fired once the composition first reaches
  // its "complete" visual state (entering the b3 phase, where the branch
  // structure first appears via QW1q()), rather than stopping the loop.
  if (!hasCapturedPreview && time >= 100) {
    hasCapturedPreview = true;
    try {
      window.$artifact = window.$artifact || {};
      window.$artifact.aspectRatio = 1; // fixed 1000x1000 square canvas
      window.$artifact.features = {
        "Base Image": String(randImg),
      };
    } catch (err) {
      console.warn("[verse] Could not publish $artifact.features:", err);
    }
    console.info("###verse-preview-capture");
    dispatchEvent(new Event("capture-preview"));
  }
}
let hasCapturedPreview = false;






 let time;
  let JMxex12k = [];

  let t = 0;



   let numTreesA2B =10;
let treeCounterA2B = 0;
let drawTreeA2B = true;


 


let numTreesQW1 =1;
let treeCounterQW1 = 0;
let drawTreeQW1 = true;





function QW1q() {
  
 let xOffset = R.random_num(-0.6, 1.9);
    QW1(shapegraphic2);

    image(shapegraphic2, xOffset, 0);
 
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  
    // به‌روز‌رسانی xOff برای لرزش متوالی
xoff += 1;


   //hk3()
  }
   let xoff = 0.0;
let yoff = 0.0;
function QW1() {

   if (treeCounterQW1 >= numTreesQW1) {
 
      return;
 }

 


 let chosen = chooseRandomColor();
shapegraphic2.fill(chosen.colors[1])
 const dim = Math.max(width, height);
  shapegraphic2.strokeWeight(dim * 0.05);
 const r = dim * 0.3;

    // shapegraphic2.strokeWeight(generateNumbersAd2())//(200 );
     
     
    // shapegraphic2.noFill();
     
     
shapegraphic2.scale(0.2)
//shapegraphic2.rotate(0.5)
shapegraphic2.strokeWeight(dim * 0.00015);

const QW1os = R.random_num(30,174)
shapegraphic2.translate(3500, 2920 );
let QW1bs = R.random_num(120, 454);
let QW1v = getDir(0.5);
let QW1l = QW1v.x;
let QW1r = QW1v.y;
let QW1ts = 80;
let QW1nb = R.random_num(2, 4);
shapegraphic2.strokeWeight(QW1ts);
shapegraphic2.line(0, 0, 0, -QW1os);
shapegraphic2.translate(0, -QW1os);
multibranchQW1(QW1bs, QW1l, QW1r, QW1ts, QW1nb);
drawTreeQW1 = false;

 treeCounterQW1++;
 drawTreeQW1 = true;
}
function getDir(QW1p = 0.1) {
let QW1r = R.random_num(0, 1);
let QW1lp = 1 - QW1p;
let QW1l = false;
let QW1ri = false;
if (QW1r >= QW1lp) {
QW1l = true;
} else if (QW1r <= QW1p) {
QW1l = true;
} else {
QW1l = true;
QW1ri = true;
 
}
return createVector(QW1l, QW1ri);
}
function drawbranchQW1(QW1th, QW1h, QW1thres, QW1ts, QW1bp) {
QW1ts *= R.random_num(0.6, 0.9);
shapegraphic2.strokeWeight(QW1ts);
shapegraphic2.push();
shapegraphic2.rotate(-QW1th);
shapegraphic2.line(0, 0, 0, -QW1h);
shapegraphic2.translate(0, -QW1h);

shapegraphic2.push(); // شاخه دوم
shapegraphic2.rotate(radians(30));
const dim = Math.min(1000, 1000);
//shapegraphic2.strokeWeight(dim * 0.010);
const r = 10;


shapegraphic2.pop();
let QW1v = getDir();
let QW1l = QW1v.x;
let QW1r = QW1v.y;
branchQW1(QW1h, QW1l, QW1r, QW1thres, QW1ts, QW1bp);
shapegraphic2.pop();
}
function branchQW1(QW1h, QW1l, QW1r, QW1thres = 6, QW1ts = 3, QW1bp = []) {
let QW1a = R.random_num(-5, 30);
let QW1s = 6;
let QW1t = radians(QW1a);
QW1h *= R.random_num(0.7, 1);
let QW1i = QW1bp.length;
QW1bp[QW1i] = createVector(QW1bp[QW1i - 1].x + QW1h * cos(QW1t), QW1bp[QW1i - 1].y - QW1h * sin(QW1t));
 
if (QW1bp[QW1i].x > 0 && QW1bp[QW1i].y > 0) {
if (QW1h > QW1thres) {
if (QW1r) {
drawbranchQW1(QW1t, QW1h, QW1thres, QW1ts, QW1bp);
}
if (QW1l) {
drawbranchQW1(-QW1t, QW1h, QW1thres, QW1ts, QW1bp);
}
} else {
   shapegraphic2.noStroke();
     // shapegraphic2.fill(randomColorhk(colorset));
       //shapegraphic2.fill(color(R.random_num(0, colorset))); // تنظیم رنگ پر
       shapegraphic2.fill(colorset3[4 % colorset3.length]); 
  shapegraphic2.stroke(colorset3[5 % colorset3.length]); 
  
  shapegraphic2.ellipse(0, 0, R.random_num(1,4), R.random_num(1,40));
       
      shapegraphic2.fill(color(255, 255, 255, R.random_num(5, 20))); // تنظیم رنگ پر دایره دوم
       shapegraphic2.ellipse(0, 0, R.random_num(1,10), R.random_num(1,15));
 
      shapegraphic2.stroke(0); // تنظیم رنگ خط
       shapegraphic2.strokeWeight(R.random_num(0.1, 0.6));
 
       shapegraphic2.arc(0, 0, R.random_num(5, 7), R.random_num(35, 57), HALF_PI, PI);
         shapegraphic2.stroke(colorset3[5 % colorset3.length]); 

       shapegraphic2.arc(0, 0, R.random_num(6, 7), R.random_num(46, 57), HALF_PI, PI);
        shapegraphic2.stroke(colorset3[6 % colorset3.length]); 

       shapegraphic2.arc(0, 0, R.random_num(7, 8), R.random_num(57, 57), HALF_PI, PI);
       shapegraphic2.stroke(colorset3[7 % colorset3.length]); 

       shapegraphic2.arc(0, 0, R.random_num(5, 7), R.random_num(-35, -57), HALF_PI, PI);
     shapegraphic2.stroke(colorset3[8 % colorset3.length]); 

       shapegraphic2.arc(0, 0, R.random_num(6, 7), R.random_num(-46, -57), HALF_PI, PI);
    shapegraphic2.stroke(colorset3[1 % colorset3.length]); 

       shapegraphic2.arc(0, 0, R.random_num(7, 8), R.random_num(-57, -57), HALF_PI, PI);
        shapegraphic2.fill(255)   
  shapegraphic2.circle(0, 0,R.random_num(1,5));
shapegraphic2.translate(0, -QW1h);
}
}
}
function multibranchQW1(QW1bs, QW1l, QW1r, QW1ts = R.random_num(100, 600), QW1nb = R.random_num(30, 200)) {
for (let i = 0; i <= QW1nb; i++) {
const QW1os = (20, 200);
let QW1bp = [];
QW1bp[0] = createVector(2000 / 2, 1000 - QW1os);
branchQW1(QW1bs, QW1l, QW1r, QW1thres = R.random_num (10, 20), QW1ts = QW1ts, QW1bp);
}
}

let powerUpCounter = 2;

function scaleIt(amountA, amountB, valueA, valueB, valueC, valueD){
  if (lerpAmount < 10) {
    lerpAmount += amountA;
    powerUpCounter = floor(lerp(valueA, valueB, lerpAmount));
  }

  if (lerpScale < 1) {
    lerpScale += amountB;
    tvheight = floor(lerp(valueC, valueD, lerpScale));
  }  

  // final horiontal line shrink on power off
  if (!tvstate && tvheight < 100) {
    if (lerpShrink < 1) {
      tvwidth = floor(lerp(width, 1, lerpShrink));
      lerpShrink += 0.009;
    }
  }
}

// RGB Distort
function renderDistort() {
  let i = 0;

  let offRed = floor(R.random_num(0, 2)) * 4;
  let offGreen = floor(R.random_num(0, 2)) * 8;
  let offBlue = floor(R.random_num(0, 2)) * 8;

  if (barY1 > h) {
    barY1 = 10 - 50;
    barY2 = R.random_num(40, 50) - 50;
  }

  barY1 += 2;
  barY2 += 2;

  //if (tvstate)
  //  scaleIt(0.02, 0.2, 156, 0, 2, img.height); // turning on 
 // else
  //  scaleIt(0.1, 0.2, 0, -400, img.height, 1); // turning off

  // dark vs light flicker + gradual fade in
  let flicker = R.random_num(0, 2) + powerUpCounter; 

  for (let y = 1; y < h; y++) {

    // vertically moving horizonal strip + flicker
    let colDiv = (y < barY2 && y > barY1) ? 20 + flicker : flicker;

    // horizontal scanlines
    let strips = (y & 1) * 64 + colDiv;

    // grab a random line of precalculated TV noise
    let noiseLine = floor(R.random_num(0, 1000)) * 1000;
    for (let x = 0; x < w; x++) {
      let imagePixelR = img.pixels[i + 0 +offRed];
      let imagePixelG = img.pixels[i + 1 + offGreen];
      let imagePixelB = img.pixels[i + 2 + offBlue];
      let processEffect = -strips - ppx[noiseLine + x];
      tvnoise.pixels[i] = imagePixelR + processEffect;
			tvnoise.pixels[i + 1] = imagePixelG + processEffect;
			tvnoise.pixels[i + 2] = imagePixelB + processEffect;
			tvnoise.pixels[i + 3] = 255;
			i += 4;
		}
  }
  tvnoise.updatePixels();

  image(tvnoise, (img.width - tvwidth/2) - img.width/2, (img.height - tvheight/2) - img.height/2, tvwidth, tvheight);
}


let amplitude = 45;
let frequency = 0.01;

let r2 = 200;
var lastrandomsX=0;
var lastrandomsY=0;


function drawp() {
  
drawWheatField();
}
function drawj() {
 //  blendMode(MULTIPLY);
    let x2 = windowWidth/random(1,20);
  let y2 = windowHeight/1.1;
  
  // جابجایی بیضی با وزش باد
  let wind = (map(noise(xoff), 0, 1, -30, 30)) * __vizWind();
  xoff += frequency*2;
  x2 += wind;
  
 
  stroke(0)
   fill(0)
beginShape();
vertex(0, height);
for (let x = 0; x <= width*2; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.1, height);
  vertex(x, y);
  xoff += 0.009;

  // تولید ۱۰۰ نقطه رندم بر روی لبه شیپ
  for (let i = 0; i < 5; i++) {
    let pointX = random(x-3, x);
    let pointY = map(noise(pointX, yoff), 0, 1, height / 1.1, height);
   fill(0,0,0,random(200,255))

    // تنظیم ضخامت خطوط
    if (i < 0.1) {
      strokeWeight(1);
    } else if (i < 700) {
      
      strokeWeight(1.2);
    } else {
           
      strokeWeight(12.3);
    }

    // چرخش خطوط مماس
    let angle = random(-PI/3, 0);
    push();
    translate(pointX, pointY);
    rotate(angle);
    line(-100, 0, height/random(10,100), 0);
    pop();
  }
}
vertex(width, height);
endShape(CLOSE);
//noLoop()
  
    //fill(chosen.colors[1])
       drawGrass2(
  5000,
height + 500,
  random(0.3,1.2)
);
  scale(0.3)
 
  frameRate(1)
  const original_size = d
   translate(adip,2750)
  let first_branch_size = b
  let vector = get_direction(0.5)
	let left = vector.x
	let right = vector.y
  let first_thickness_size = random(50,80)
	let number_of_branches = random(2,4)
    stroke(0,200)
  strokeWeight(first_thickness_size)
  line(0,0,0,-original_size);
  translate(0,-original_size);
  // branch(first_branch_size, left, right, threshold = 10, first_thickness_size = first_thickness_size);
  multiple_branch(first_branch_size, left, right, first_thickness_size = first_thickness_size, number_of_branches = number_of_branches,)
	
   translate(adip,-2750)

 scale(4.3)
 
  translate(-600,100)

    drawGrass(
  1000,
  height + random(10,200),
  random(0.3,1.2)
);
  

  
        drawGrass3(
  1050,
 height + random(10,200),
  random(0.3,1.2)
);
 
 //drawWheatField();
//saveCanvas('Img', 'png');



  //noLoop()


 }
function granulateRedShift(amount) {
      loadPixels();
      const d = pixelDensity();
      const pixelsCount = 4 * (width * d) * (height * d);
      for (let i = 0; i < pixelsCount; i += 4) {
          pixels[i] = pixels[i] + amount;
                  pixels[i+1] = pixels[i+1] + random(-amount, amount);
                  pixels[i+2] = pixels[i+2] + random(-amount*2, amount*2);
          // comment in, if you want to granulate the alpha value
          pixels[i+3] = pixels[i+3] + random(-amount*2, amount*2);
        }
        updatePixels();
  }
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function get_direction(probability = 0.1) {
    let random_int = random(0,1)
    let left_probability = 1 - probability
    let left = false;
	  let right = false;
    if (random_int >= left_probability) {
        left = true
		}
    else if (random_int <= probability) {
        left = true
		}
	
		else {
			left = true
			right = true
          	
		}
    return createVector(left, right)
 
}

function draw_branch(theta, h, threshold, first_thickness_size, branch_positions) {
    first_thickness_size *= random(0.6, 0.9)
    strokeWeight(first_thickness_size)
		push()
    rotate(-theta);
  
    strokeCap(PROJECT);

  strokeWeight(first_thickness_size)
    stroke(a,80)
  line(4, 0, 0, -h);
  stroke(0)
  line(0, 0, 0, -h);
    translate(0, -h);
     fill(255,30);
  
  noStroke()

 // quad(0, random(0,120) , 0, 12, 12, 12, 12, random(0,120))
  stroke(random(0, 250))
   stroke(random(0,50),random(110,250));
  // stroke(random(0, 250))
  //stroke(a-130,random(0, 250))
	 line(random(220,3000), random(220,3000), random(220,3000), random(220,3000))
    stroke(0,random(0, 250))
 // stroke(random(0,50),random(110,250));
  // stroke(a-140,random(0, 250))
  stroke(a)
	 line(random(220,3000), random(220,3000), random(220,3000), random(220,3000))
      
    //fill(chosen.colors[1])
   // background(chosen.colors[1]);
   stroke(0)
  stroke(random(0,50),random(110,250));
  strokeWeight(first_thickness_size/1)
   stroke(0)
   line(random(220,3000), random(220,3000), random(220,3000), random(220,3000))
  
    stroke(0,random(0, 250))
   stroke(random(0,50),random(110,250));
  // stroke(a-160,random(0, 250))
  // stroke(a-150)
	 line(random(220,3000), random(220,3000), random(220,3000), random(220,3000))
  
    stroke(0)
   stroke(random(0,50),random(110,250));
   stroke(a-170,random(0, 250))
  stroke(a+70)
    stroke(0)
  strokeWeight(first_thickness_size/1)
   line(random(410,3000), random(410,3000), random(410,3000), random(410,3000))
  

  
  stroke(0)
  let vector = get_direction()
		let left = vector.x
		let right = vector.y
        			
        // if (branch_positions[i].x > 0 && branch_positions[i].y > 0) {
	//	print(branch_positions[i].x, branch_positions[i].y)
		branch(h, left, right, threshold, first_thickness_size, branch_positions);
 
		// }
    pop()
	    	 //    

	
}

function branch(h, left, right, threshold = 6, first_thickness_size = 3, branch_positions = []) {

  let a = random(-30, 30)
  let steps = 6
  let theta = radians(a)
    	      h *= random(0.7, 1);
	
	let i = branch_positions.length
	branch_positions[i] = createVector(branch_positions[i-1].x + h*cos((theta)), branch_positions[i-1].y - h*sin((theta)))

	
	
	if (branch_positions[i].x > 0 && branch_positions[i].y > 0) {
	
  if (h > threshold) {
    if (right) {
        draw_branch(theta, h, threshold, first_thickness_size, branch_positions)  
			//# Whenever we get back here, we "pop" in order to restore the previous matrix state
		}
		if (left) {
        draw_branch(-theta, h, threshold, first_thickness_size, branch_positions)
    // Repeat the same thing, only branch off to the "left" this time!
	}
		}
  else {

      push()
    //  fill(random(winter));
 // blendMode(SCREEN);
stroke(0,190)
     strokeCap(PROJECT);
 //line(random(0,windowWidth),random(0,windowWidth),random(0,windowWidth),random(0,windowWidth))
    strokeWeight(random(0.05,0.07)); 
   // line(0, 0, random(0,1000), random(0,1000))
    
    stroke(0)
     stroke(0)
     strokeWeight(random(0.01,0.03)); 
 	// line(random(0,500), random(0,500), random(0,500), random(0,500))
    
    // if (fill >= Spring4,Spring3,Spring2,Spring1){
    //blendMode(BLEND);
    noStroke();
    //  ellipse(10, 0, 10,10)
    //  ellipse(0, 0, 5,5)
   //  fill(randomElement(Summer));
   // stroke(randomElement(Sky));
     // ellipse(0, 0, random(1,5), random(1,20))
      //   stroke(randomElement(Atumn1));
    strokeWeight(random(0.5,0.9)); 
    stroke(255,random(100,255))
  //  stroke(0,random(100,255))
    fill(250, random(68, 168), random(100, 168), random(20, 230));
 
   stroke(255,random(220,255))
    line(8, 1, random(0, 15), random(0, 5));
    stroke(255,random(220,255))
    line(7, 2, random(0, 15), random(0, 5));
    stroke(0,random(0,155))
    line(8, 4, random(0, 15), random(0, 5));
    stroke(255,random(220,255))
    line(6, 3, random(0, 15), random(0, 5));
       stroke(0,random(0,155))
    line(7, 3, random(0, 15), random(0, 5));
    stroke(255,random(220,255))
    line(5, 4, random(0, 15), random(0, 5));


       
 
   


    
       stroke(255,random(220,255))
    line(4, 5, random(0, 15), random(0, 5));
   //  stroke(0,random(0,155))
    line(6, 2, random(0, 15), random(0, 5));
    stroke(255,random(220,255))
    line(3, 6, random(0, 15), random(0, 5));
    
   // stroke(0,random(0,155))
    line(5, 1, random(0, 15), random(0, 5));
    stroke(255,random(220,255))
    line(2, 7, random(0, 15), random(0, 5));
    stroke(255,random(220,255))
    line(1, 8, random(0, 15), random(0, 5));
       // fill(250, random(68, 168), random(100, 168), random(20, 230));

     //   circle(random(0, 20), random(0, 20), random(0, 20))
//blendMode(BLEND);
    noStroke()
   // fill(coli);
   // ellipse(0, 0, random(2,20), random(20,40))
      translate(0,-h)
      pop()
      	//blendMode(MULTIPLY);

	}
	}
	
}

function multiple_branch(first_branch_size, left, right, first_thickness_size = random(100,210), number_of_branches = random(3,200)) {
	for (let i = 0; i <= number_of_branches; i++) {
		const original_size = (20,200)
		let branch_positions = []
		branch_positions[0] = createVector(width/2, (height-original_size))
		branch(first_branch_size, left, right, threshold = random(10,20), first_thickness_size = first_thickness_size, branch_positions);
      	
    }
	//blendMode(SCREEN);

		
}

function drawGrass(
  count = 500,
  groundY = height,
  wind = 0.8
){

  push();

  for(let i=0;i<count;i++){
  

    let x = random(-300,width+300);

    let h = random(-15,550);

    let bend = random(10,380) * wind;
    

    strokeWeight(random(0.2,11.5)/random(4,5));

    stroke(random(0,125));
stroke(a);
    noFill();
strokeCap(PROJECT);
    beginShape();

    curveVertex(x,groundY);
    curveVertex(x,groundY);

    curveVertex(
      x + bend*0.2,
      groundY - h*0.3
    );

    curveVertex(
      x + bend*0.6,
      groundY - h*0.7
    );

    curveVertex(
      x + bend,
      groundY - h
    );

    curveVertex(
      x + bend,
      groundY - h
    );

    endShape();

  }

  pop();
   // noLoop()

}
function drawGrass2(
  count = 3500,
  groundY = height,
  wind = 0.8
){

  push();

  for(let i=0;i<count;i++){
  

    let x = random(-300,width+300);

    let h = random(15,400);

    let bend = random(10,360) * wind;
    

        strokeWeight(random(0.2,11.5)/random(1,2));


    stroke(0,random(0,250));
stroke(random(0,125));
    stroke(a+random(-100,125));
    stroke(0)
    //stroke(a);
    noFill();
strokeCap(PROJECT);
    beginShape();

    curveVertex(x,groundY);
    curveVertex(x,groundY);

    curveVertex(
      x + bend*0.2,
      groundY - h*0.3
    );

    curveVertex(
      x + bend*0.6,
      groundY - h*0.7
    );

    curveVertex(
      x + bend,
      groundY - h
    );

    curveVertex(
      x + bend,
      groundY - h
    );

    endShape();

  }

  pop();
   // noLoop()

}


function drawGrass3(
  count = 100,
  groundY = height,
  wind = 0.8
){

  push();

  for(let i=0;i<count;i++){
  

    let x = random(-300,width+300);

    let h = random(-15,550);

    let bend = random(10,380) * wind;
    

       strokeWeight(random(0.2,11.5)/random(6,11));


    stroke(random(0,50));
     stroke(0);
stroke(a+70,random(50,90));
    stroke(random(0,a-50));
    stroke(a);
     stroke(0);
    noFill();
 strokeCap(PROJECT);
    beginShape();

    curveVertex(x,groundY);
    curveVertex(x,groundY);

    curveVertex(
      x + bend*0.2,
      groundY - h*0.3
    );

    curveVertex(
      x + bend*0.6,
      groundY - h*0.7
    );

    curveVertex(
      x + bend,
      groundY - h
    );

    curveVertex(
      x + bend,
      groundY - h
    );

    endShape();

  }

  pop();
   // noLoop()

}
function drawWheatCluster(
  x,
  y,
  h,
  wind = 1
){

  push();

  strokeCap(PROJECT);

  let tipX = x + random(-20,20) * wind;
  let tipY = y - h*3.5;

  // ساقه اصلی
  stroke(0, 0);
  strokeWeight(random(0.8, 1.2));

  line(x, y, tipX, tipY);

  // خوشه گندم
  let grains = floor(random(6, 14));

  for(let i = 0; i < grains; i++){

    let t = i / grains;

    let gx = lerp(x, tipX, t);
    let gy = lerp(y, tipY, t);

    let side = random([-1,1]);

    // دانه‌ها
    noStroke();
    fill(255, random(0, 150));

    ellipse(
      gx + side * random(2, 6) * wind,
      gy,
      random(2, 5),
      random(3, 7)
    );

  }

  // نوک خوشه
  fill(0, random(0, 150));
  ellipse(tipX, tipY, 3, 6);

  pop();
     // noLoop()
}

function drawWheatField(){

  for(let i = 0; i < 400; i++){

    let x = random(width);
    let y = height + random(20, 80);
    let h = random(40, 160);

    drawWheatCluster(x, y, h, random(0.5, 1.5));

  }

}
////a


