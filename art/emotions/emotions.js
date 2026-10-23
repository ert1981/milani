  const tokenData = generateTokenData();

function mouseClicked(){
   saveCanvas('Le Printemps / Reza Milani','png')
}

  
class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex, skip) {
      let a = parseInt(uint128Hex.substring(0, 8), 16);
      let b = parseInt(uint128Hex.substring(8, 16), 16);
      let c = parseInt(uint128Hex.substring(16, 24), 16);
      let d = parseInt(uint128Hex.substring(24, 32), 16);
      // warm-up: the same `skip` steps as calling the generator `skip` times, run on plain locals (no call per step).
      // The old warm-up loop called the closure a million times per Random and was a top cost of the startup.
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
    };
    // seed prngA with first half of tokenData.hash
    // each stream warmed up by 500000 steps, exactly as the old loop (1e6 / 2 calls on each)
    this.prngA = new sfc32(tokenData.hash.substring(2, 34), 5e5);
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substring(34, 66), 5e5);
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


 function randomColorx(Summer5) {
    return R.random_choice(Summer5);
  }
 
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
    chosenColor = color(r, g, b, randomGenerator.random_num(100, 255));
  } while (d > 30);

  return chosenColor;
}

let colx;

  let randomColor;
  let currentColor = null;


  function color1d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
      d = sqrt((r - 38) ** 2 + (g - 70) ** 2 + (b - 83) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color2d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
      d = sqrt((r - 42) ** 2 + (g - 157) ** 2 + (b - 143) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color3d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
      d = sqrt((r - 233) ** 2 + (g - 196) ** 2 + (b - 106) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color4d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
      d = sqrt((r - 244) ** 2 + (g - 162) ** 2 + (b - 97) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color5d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
      d = sqrt((r - 231) ** 2 + (g - 111) ** 2 + (b - 81) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  
  function color6d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
      d = sqrt((r - 142) ** 2 + (g - 202) ** 2 + (b - 230) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color7d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
      d = sqrt((r - 33) ** 2 + (g - 158) ** 2 + (b - 188) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color8d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
      d = sqrt((r - 2) ** 2 + (g - 48) ** 2 + (b - 71) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color9d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
      d = sqrt((r - 255) ** 2 + (g - 183) ** 2 + (b - 3) ** 2);
    } while (d > 80);
    return color(r, g, b,R.random_num(0,255));
  }
  
  function color10d() {
    let r, g, b, d;
    do {
      r = random(256);
      g = random(256);
      b = random(256);
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

let Summer5 = [ "#99E2B4" ,"#88D4AB" ,"#78C6A3" ,"#67B99A" ,"#56AB91" ,"#469D89" ,"#358F80" ,"#248277" ,"#14746F" ,"#036666" ,"#99e2b4", "#88d4ab", "#78c6a3", "#67b99a", " #56ab91", "#469d89", "#358f80", "#248277", "#14746f", "#036666" ];
 function randomColorx2(colorsfa) {
    return R.random_choice(colorsfa);
  }

let colorsfa = [ "#F1FAEE"   ,"#A8DADC"  ,"#457B9D","#1D3557","#03045E","#023E8A","#0077B6","#0096C7","#00B4D8","#48CAE4","#90E0EF","#ADE8F4","#CAF0F8","#FFBE0B","#FB5607","#FF006E","#3A86FF","#F72585","#3A0CA3","#4361EE","#4CC9F0", "#817c77",  "#403b3f", "#cd4446", "#f2bc45", "#e9e0d6", "#2fa494", "#87a4aa", "#bbd7c9", "#c8958b", "#e2c48c", "#efb4a5", "#396c68", "#89e3b7", "#f59647", "#d63644", "#893f49", "#4d3240", "#fd3741", "#fe4f11", "#ff6800", "#ffa61a", "#ffc219", "#ffd114", "#fcd82e", "#f4d730", "#ced562", "#8ac38f", "#79b7a0", "#72b5b1", "#5b9bae", "#6ba1b7", "#49619d", "#604791", "#721e7f", "#9b2b77", "#ab2562", "#ca2847", "#fd3741", "#fe4f11", "#ff6800", "#ffa61a", "#ffc219", "#ffd114", "#fcd82e", "#f4d730", "#ced562", "#8ac38f", "#79b7a0", "#72b5b1", "#5b9bae", "#6ba1b7", "#49619d", "#604791", "#721e7f", "#9b2b77", "#ab2562", "#403b3f", "#cd4446", "#f2bc45", "#e9e0d6", "#2fa494", "#87a4aa", "#bbd7c9", "#c8958b", "#e2c48c", "#efb4a5", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8", "#1c344a", "#325e86", "#c4d7e9", "#fdfeff", "#cee7f3", "#2c89b5", "#689aa2", "#d4d5c7", "#bac3b7", "#a0b3ab", "#87a3a0", "#03045e", "#023e8a", "#0077b6", "0096c7", "#00b4d8", "#f55200", "#ff6d00", "#ff8500", "##ff9100", "#ff9e00", "#403b3f", "#cd4446", "#f2bc45", "#e9e0d6", "#2fa494", "#87a4aa", "#bbd7c9", "#c8958b", "#e2c48c", "#efb4a5", "#590d22", "#800f2f", "#a4133c", "#c9184a", "#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1", "#ffccd5", "#fff0f3", "#fadde1", "#ffc4d6", "#ffa6c1", "#ff87ab", "#ff5d8f", "#ff97b7", "#ffacc5", "#ffcad4", "#f4acb7", "#ffe0e9", "#ffc2d4", "#ff9ebb", "#ff7aa2", "#e05780", "#b9375e", "#8a2846", "#602437", "#522e38", "#ff0a54", "#ff477e", "#ff5c8a", "#ff7096", "#ff85a1", "#ff99ac", "#fbb1bd", "#f9bec7", "#f7cad0", "#fae0e4", "#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8", "#1c344a", "#325e86", "#2c89b5", "#689aa2", "#03045e", "#023e8a", "#0077b6", "0096c7", "#00b4d8" ];
function windoMemoryesized () {
  resizeCanvas(WIDTH, HEIGHT);
}

let DepressivePressure = [];
let colors4;

let Displeasure=  "111d13,f8f9fa,e9ecef,dee2e6,ced4da,adb5bd,6c757d,495057,343a40,212529".split(",").map((a) => "#" + a);
let Contentment=  "111d13,edeec9,dde7c7,bfd8bd,98c9a3,77bfa3".split(",").map((a) => "#" + a);
let Glee=  "111d13,f6bd60,f7ede2,f5cac3,84a59d,f28482".split(",").map((a) => "#" + a);
let Envy=  "111d13,f92a82,ed7b84,f5dbcb,d6d5b3,7eb77f".split(",").map((a) => "#" + a);
let Pensiveness=  "595959,7f7f7f,a5a5a5,cccccc,f2f2f2".split(",").map((a) => "#" + a);
let Spite =  "111d13,b4b8ab,153243,284b63,f4f9e9,eef0eb".split(",").map((a) => "#" + a);
let Loathing=  "111d13,590d22,800f2f,a4133c,c9184a,ff4d6d,ff758f,ff8fa3,ffb3c1,ffccd5,fff0f3".split(",").map((a) => "#" + a);
let Confusion=  "111d13,f9dbbd,ffa5ab,da627d,a53860,450920".split(",").map((a) => "#" + a);
let Euphoria=  "111d13,ff0a54,ff477e,ff5c8a,ff7096,ff85a1,ff99ac,fbb1bd,f9bec7,f7cad0,fae0e4".split(",").map((a) => "#" + a);
let Cruelty=  "111d13,f7b267,f79d65,f4845f,f27059,f25c54".split(",").map((a) => "#" + a);
let Laziness=  "111d13,cc444b,da5552,df7373,e39695,e4b1ab".split(",").map((a) => "#" + a);
let Pity=  "111d13,03071e,370617,6a040f,9d0208,d00000,dc2f02,e85d04,f48c06,faa307,ffba08".split(",").map((a) => "#" + a);
let Cheerfulness =  "111d13,99e2b4,88d4ab,78c6a3,67b99a,56ab91,469d89,358f80,248277,14746f,036666".split(",").map((a) => "#" + a);
let Shamelessness=  "111d13,75dddd,508991,172a3a,004346,09bc8a".split(",").map((a) => "#" + a);
let Caring=  "111d13,119da4,0c7489,13505b,040404,d7d9ce".split(",").map((a) => "#" + a);
let Submission =  "111d13,05668d,028090,00a896,02c39a,f0f3bd".split(",").map((a) => "#" + a);
let Thankfulness=  "111d13,066839,0a5c36,0f5132,14452f,18392b,1d2e28,212224".split(",").map((a) => "#" + a);
let Nostalgia=  "111d13,0b2c24,0f392b,134632,185339,1c603f,206d46,247a4d".split(",").map((a) => "#" + a);
let Brazen=  "111d13,031911,042117,05291c,063122,073928,09422d,0a4a33,0b5239,0c5a3e,0d6244".split(",").map((a) => "#" + a);
let Despair=  "111d13,dad7cd,a3b18a,588157,3a5a40,344e41".split(",").map((a) => "#" + a);
let Eagerness=  "111d13,132a13,31572c,4f772d,90a955,ecf39e".split(",").map((a) => "#" + a);
let Bewildered =  "111d13,143601,1a4301,245501,538d22,73a942,aad576".split(",").map((a) => "#" + a);
let Surprise =  "111d13,020202,0d2818,04471c,058c42,16db65".split(",").map((a) => "#" + a);

let EmotionalStates2 = [];
let colors3;

let Numbness=  "606c38,283618,fefae0,dda15e,bc6c25".split(",").map((a) => "#" + a);
let Grouchiness =  "dad7cd,a3b18a,588157,3a5a40,344e41".split(",").map((a) => "#" + a);
let Perseverance=   "132a13,31572c,4f772d,90a955,ecf39e".split(",").map((a) => "#" + a);
let Sympathy = "e9f5db,cfe1b9,b5c99a,97a97c,87986a,718355".split(",").map((a) => "#" + a);
let Flakiness =  "d8f3dc,b7e4c7,95d5b2,74c69d,52b788,40916c,2d6a4f,1b4332,081c15".split("-").map((a) => "#" + a);
let Woe =  "386641,6a994e,a7c957,f2e8cf,bc4749".split(",").map((a) => "#" + a);
let Fascination =   "2c6e49,4c956c,fefee3,ffc9b9,d68c45".split(",").map((a) => "#" + a);
let Agony =   "1f2421,216869,49a078,9cc5a1,dce1de".split(",").map((a) => "#" + a);
let Sorrow =   "1f2421,216869,49a078,9cc5a1,dce1de".split(",").map((a) => "#" + a);
let Tenderness =   "03045e,023e8a,0077b6,0096c7,00b4d8,48cae4,90e0ef,ade8f4,caf0f8".split(",").map((a) => "#" + a);
let Depressed =   "f8f9fa,e9ecef,dee2e6,ced4da,adb5bd,6c757d,495057,343a40,212529".split(",").map((a) => "#" + a);
let Pleasure =   "edf2fb,e2eafc,d7e3fc,ccdbfd,c1d3fe,b6ccfe,abc4ff".split(",").map((a) => "#" + a);
let Sullenness =   "012a4a,013a63,01497c,014f86,2a6f97,2c7da0,468faf,61a5c2,89c2d9,a9d6e59".split(",").map((a) => "#" + a);
let Panic =   "edeec9,dde7c7,bfd8bd,98c9a3,77bfa3".split(",").map((a) => "#" + a);
let Ennui =   "f6bd60,f7ede2,f5cac3,84a59d,f28482".split(",").map((a) => "#" + a);
let Anticipation =   "ffb5a7,fcd5ce,f8edeb,f9dcc4,fec89a".split(",").map((a) => "#" + a);
let Disgust =   "d4c685,f7ef81,cfe795,a7d3a6,add2c2".split(",").map((a) => "#" + a);
let Exasperation =   "cb997e,ddbea9,ffe8d6,b7b7a4,a5a58d,6b705c".split(",").map((a) => "#" + a);
let Humility =   "ccd5ae,e9edc9,fefae0,faedcd,d4a373".split(",").map((a) => "#" + a);
let Hate =   "cb997e,eddcd2,fff1e6,f0efeb,ddbea9,a5a58d,b7b7a4".split(",").map((a) => "#" + a);
let Amusement =   "463f3a,8a817c,bcb8b1,f4f3ee,e0afa0".split(",").map((a) => "#" + a);

let colors1 = "fef9fb-fafdff-fcfbf4-f9f8f6".split("-").map((a) => "#" + a);
let colors2;

let Confidence = "fff23e,ffd12f,ffab3b,ff792e,191919".split(",").map((a) => "#" + a);
let Embarrassment = "fe6a86,fd969a,ffdce0,fee255,ffdd13".split(",").map((a) => "#" + a);
let Admiration = "ffe863,ffe150,ffd93d,facb2e,f5bd1f,722e9a,682a92,5d2689,522882,47297b".split(",").map((a) => "#" + a);
let Happiness = "00296b,003f88,00509d,fdc500,ffd500".split(",").map((a) => "#" + a);
let colors_tone6 = "ff0a54,ff477e,ff5c8a,ff7096,ff85a1,ff99ac,fbb1bd,f9bec7,f7cad0,fae0e4".split(",").map((a) => "#" + a);
let Shame = "880d1e,dd2d4a,f26a8d,f49cbb,cbeef3".split(",").map((a) => "#" + a);
let Desire =  "ffe5ec,ffc2d1,ffb3c6,ff8fab,fb6f92" .split(",").map((a) => "#" + a);
let Disbelief =  "000814,001d3d,003566,ffc300,ffd60a".split(",").map((a) => "#" + a);
let Fear =  "f9dc5c,fae588,fcefb4,fdf8e1,f9dc5c".split(",").map((a) => "#" + a);
let Stress =  "ff7b00,ff8800,ff9500,ffa200,ffaa00,ffb700,ffc300,ffd000,ffdd00,ffea00".split(",").map((a) => "#" + a);
let Hopelessness =  "6e44ff,b892ff,ffc2e2,ff90b3,ef7a85".split(",").map((a) => "#" + a);
let Amazement =  "ffcbf2,f3c4fb,ecbcfd,e5b3fe,e2afff,deaaff,d8bbff,d0d1ff,c8e7ff,c0fdff".split(",").map((a) => "#" + a);
let Agitation =  "ffd6ff,e7c6ff,c8b6ff,b8c0ff,bbd0ff".split(",").map((a) => "#" + a);
let Distraction =  "cdb4db,ffc8dd,ffafcc,bde0fe,a2d2ff".split(",").map((a) => "#" + a);
let Hope =  "390099,9e0059,ff0054,ff5400,ffbd00".split(",").map((a) => "#" + a);
let Aggressive =  "fec5bb,fcd5ce,fae1dd,f8edeb,e8e8e4,d8e2dc,ece4db,ffe5d9,ffd7ba,fec89a".split(",").map((a) => "#" + a);
let Loneliness =  "000000,14213d,fca311,e5e5e5,ffffff".split(",").map((a) => "#" + a);
let Offense =  "f8f9fa,e9ecef,dee2e6,ced4da,adb5bd,6c757d,495057,343a40,212529".split(",").map((a) => "#" + a);
let Enchantment =  "fffcf2,ccc5b9,403d39,252422,eb5e28".split(",").map((a) => "#" + a);
let Empathy =  "0b090a,161a1d,660708,a4161a,ba181b,e5383b,b1a7a6,d3d3d3,f5f3f4,ffffff".split(",").map((a) => "#" + a);
let Resentment =  "003049,d62828,f77f00,fcbf49,eae2b7".split(",").map((a) => "#" + a);
let Attraction =  "2b2d42,8d99ae,edf2f4,ef233c,d90429".split(",").map((a) => "#" + a);
let Revulsion =  "011627,fdfffc,2ec4b6,e71d36,ff9f1c".split(",").map((a) => "#" + a);
let Satisfaction =  "e63946,f1faee,a8dadc,457b9d,1d3557".split(",").map((a) => "#" + a);
let Calm =  "003049,d62828,f77f00,fcbf49,eae2b7".split(",").map((a) => "#" + a);
let Stubbornness =  "555b6e,89b0ae,bee3db,faf9f9,ffd6ba".split(",").map((a) => "#" + a);
let Terrified =  "ffadad,ffd6a5,fdffb6,caffbf,9bf6ff,a0c4ff,bdb2ff,ffc6ff,fffffc".split(",").map((a) => "#" + a);
let Indignation =  "264653,2a9d8f,e9c46a,f4a261,e76f51".split(",").map((a) => "#" + a);
let Concern =  "8ecae6,219ebc,023047,ffb703,fb8500".split(",").map((a) => "#" + a);
let Determination =  "5f0f40,9a031e,fb8b24,e36414,0f4c5c".split(",").map((a) => "#" + a);
let Cheeky =  "f7b267,f79d65,f4845f,f27059,f25c54".split(",").map((a) => "#" + a);
let Nausea =  "03045e,023e8a,0077b6,0096c7,00b4d8,48cae4,90e0ef,ade8f4,caf0f8".split(",").map((a) => "#" + a);
let Optimism =  "ef476f,ffd166,06d6a0,118ab2,073b4c".split(",").map((a) => "#" + a);
let Grief =  "797d62,9b9b7a,baa587,d9ae94,f1dca7,ffcb69,e8ac65,d08c60,b58463,997b66".split(",").map((a) => "#" + a);
let Dazed =  "202c39,283845,b8b08d,f2d492,f29559".split(",").map((a) => "#" + a);
let Apprehension =  "343330,45462a,7e5920,dc851f,ffa737".split(",").map((a) => "#" + a);

let Unknown =  "000,808080,5a5a5a,cccccc,a6a6a6,595959,5a5a5a,cccccc,a6a6a6,404040,808080,5a5a5a,cccccc,a6a6a6,".split(",").map((a) => "#" + a);

let colors_root = "f7b267,f79d65,f4845f,f27059,f25c54".split(",").map((a) => "#" + a);

let EmotionalStates = [];

let originalGraphics;
let lineGraphics;

        let colorbg;

let Summer4 = [ "#2fa494", "#87a4aa", "#bbd7c9", "#DAD7CD", "#A3B18A", "#588157", "#3A5A40", "#344E41", "#132A13", "#31572C", "#4F772D", "#90A955", "#ECF39E", "#99e2b4", "#88d4ab", "#78c6a3", "#67b99a", " #56ab91", "#469d89", "#358f80", "#248277", "#14746f", "#036666", "#073b3a", "#0b6e4f", "#08a045", "#6bbf59", "#DAD7CD", "#A3B18A", "#588157", "#3A5A40", "#344E41", "#132A13", "#31572C", "#4F772D", "#90A955", "#ECF39E", "#99e2b4", "#88d4ab", "#78c6a3", "#67b99a", " #56ab91", "#469d89", "#358f80", "#248277", "#14746f", "#036666", "#073b3a", "#0b6e4f", "#08a045", "#6bbf59", "#006466", "#065a60", "#0b525b", "#144552", "#1b3a4b", "#212f45", "#272640", "#689aa2", "#d4d5c7", "#bac3b7", "#a0b3ab", "#87a3a0" ];  
let Atumn3 = [ "#ffff","#e24646", "#e45848", "#e5644a", "#e7734d", "#e98952", "#eb9c5f", "#f0a762", "#f3af67", "#f8c271", "#fed27a" ];  

let red = [              "#641220","#6E1423","#85182A","#A11D33","#A71E34","#B21E35","#BD1F36","#C71F37","#DA1E37","#E01E37"];

let gr    = [  "#2fa494", "#87a4aa", "#bbd7c9", "#DAD7CD", "#A3B18A", "#588157", "#3A5A40", "#344E41", "#132A13", "#31572C", "#4F772D", "#90A955", "#ECF39E", "#99e2b4", "#88d4ab", "#78c6a3", "#67b99a", " #56ab91", "#469d89", "#358f80", "#248277", "#14746f", "#036666", "#073b3a", "#0b6e4f", "#08a045", "#6bbf59", "#DAD7CD", "#A3B18A", "#588157", "#3A5A40", "#344E41", "#132A13", "#31572C", "#4F772D", "#90A955", "#ECF39E", "#99e2b4", "#88d4ab", "#78c6a3", "#67b99a", " #56ab91", "#469d89", "#358f80", "#248277", "#14746f", "#036666", "#073b3a", "#0b6e4f", "#08a045", "#6bbf59", "#006466", "#065a60", "#0b525b", "#144552", "#1b3a4b", "#212f45", "#272640", "#689aa2", "#d4d5c7", "#bac3b7", "#a0b3ab", "#87a3a0" , "#007F5F","#2B9348","#55A630","#80B918","#AACC00","#BFD200","#D4D700","#DDDF00"];

let d = ["#000", "#ffff"];

let b = ["#000"];

let x = ["#ffff"];

let Sun =["#fffae5","#fff6cc","#fff2b2","#ffee99","#ffe97f","#ffe566","#ffe14c","#ffdd32","#ffd819","#ffd400","#fec5bb","#fcd5ce","#fae1dd","#f8edeb","#e8e8e4","#d8e2dc","#ece4db","#ffe5d9","#ffd7ba","#fec89a","#ff7b00","#ff8800","#ff9500","#ffa200","#ffaa00","#ffb700","#ffc300","#ffd000","#ffdd00","#ffea00"]

let Winter = [   
    "#000",
    "##808080",
    "##5a5a5a",
    "#cccccc",
    "#a6a6a6",
"##595959",
  "##5a5a5a",
    "#cccccc",
    "#a6a6a6",
"#404040",
  "#fff",
    "#fff",
  "#fff",
     "##808080",
    "##5a5a5a",
    "#cccccc",
    "#a6a6a6",

    ];

let colBack = [    "#2fa494",
        "#87a4aa",
        "#bbd7c9",]
let colFront = [      "#403b3f",
        "#e9e0d6",
        "#2fa494",
        "#87a4aa",
        "#bbd7c9",
       ]
let colBackground = 'rgb(211,84,37)'
let colSun = 'rgb(232,195,102)'
let colors = [     "#817c77",
       
              "#403b3f",
        "#cd4446",
        "#f2bc45",
        "#e9e0d6",
        "#2fa494",
        "#87a4aa",
        "#bbd7c9",
        "#c8958b",
        "#e2c48c",
        "#efb4a5",
         "#396c68",
        "#89e3b7",
        "#f59647",
        "#d63644",
        "#893f49",
        "#4d3240",
        "#fd3741",
        "#fe4f11",
        "#ff6800",
        "#ffa61a",
        "#ffc219",
        "#ffd114",
        "#fcd82e",
        "#f4d730",
        "#ced562",
        "#8ac38f",
        "#79b7a0",
        "#72b5b1",
        "#5b9bae",
        "#6ba1b7",
        "#49619d",
        "#604791",
        "#721e7f",
        "#9b2b77",
        "#ab2562",
        "#ca2847",
        "#fd3741",
        "#fe4f11",
        "#ff6800",
        "#ffa61a",
        "#ffc219",
        "#ffd114",
        "#fcd82e",
        "#f4d730",
        "#ced562",
        "#8ac38f",
        "#79b7a0",
        "#72b5b1",
        "#5b9bae",
        "#6ba1b7",
        "#49619d",
        "#604791",
        "#721e7f",
        "#9b2b77",
        "#ab2562",
        "#ca2847"];

let color5 = [     "#817c77",
       
              "#403b3f",
        "#cd4446",
        "#f2bc45",
        "#e9e0d6",
        "#2fa494",
        "#87a4aa",
        "#bbd7c9",
        "#c8958b",
        "#e2c48c",
        "#efb4a5",
         "#396c68",
        "#89e3b7",
        "#f59647",
        "#f4d730",
        "#ced562",
        "#8ac38f",
        "#79b7a0",
        "#72b5b1",
        "#5b9bae",
        "#6ba1b7",
      
        "#ced562",
        "#8ac38f",
        "#79b7a0",
        "#72b5b1",
        "#5b9bae",
        "#6ba1b7", ];
let color2 = [   
        "#cd4446",
        "#f2bc45",
        "#e9e0d6",
        "#c8958b",
        "#e2c48c",
    "#fd3741",
 
        ];

let shapegraphic; // متغیری برای ذخیره کد شیپ
let shapegraphic2;
 let scalePerc = 1.0;

 var DEFAULT_SIZE = 1000;
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  var DIM = Math.min(WIDTH, HEIGHT);
  var M = DIM / DEFAULT_SIZE;
const randomGenerator = new Random();

function generateTokenData() {

  return {

    hash: randomHash(),

    tokenId: String(Math.floor(Math.random() * 1000000000))

  };

}

function randomHash() {

  const chars = "0123456789abcdef";

  let hash = "0x";

  for (let i = 0; i < 64; i++) {

    hash += chars[Math.floor(Math.random() * 16)];

  }

  return hash;

}

function setup() {
  
 createCanvas(500, 500);
    shapegraphic = createGraphics(500, 500); // ایجاد یک متغیر گرافیک برای نگهداری تصاویر شیپ ها

shapegraphic2 = createGraphics(500, 500);

 pixelDensity(window.__GROKLY_FEED ? 2 : 4); // در گراکلی چگالی ۲ برای روانی (خروجی ۱۰۸۰ همچنان تیز است)
    const seed = parseInt(tokenData.hash.slice(2, 18), 16);

randomSeed(seed);
  // Center the canvas in the viewport
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


    
 for (let i = 0; i < 100; i++) {
    kijosk.push(gitacolork());
  }


  rectMode(CENTER);

       emotional = R.random_choice([Displeasure, Contentment, Glee, Envy, Pensiveness, Spite, Loathing, Confusion, Euphoria, Cruelty, Laziness, Pity, Cheerfulness, Shamelessness, Caring, Submission, Thankfulness, Nostalgia, Brazen, Despair, Eagerness, Bewildered, Surprise, Numbness, Grouchiness, Perseverance, Sympathy, Flakiness, Woe, Fascination, Agony, Sorrow, Tenderness, Pleasure, Depressed, Sullenness, Panic, Ennui, Anticipation, Disgust, Exasperation, Humility, Hate, Amusement, Confidence, Embarrassment, Admiration, Happiness, Shame, Desire, Disbelief, Fear, Stress, Hopelessness, Amazement, Agitation, Distraction, Hope, Aggressive, Loneliness, Offense, Enchantment, Empathy, Resentment, Attraction,Unknown]);
       emotional2 = R.random_choice([ Revulsion, Satisfaction, Calm, Stubbornness, Terrified, Indignation, Concern, Determination, Cheeky, Nausea, Optimism, Grief, Dazed, Apprehension,Unknown]);
       // پالت‌های حافظ: با Generate گاهی پالت اثر از گبه، جاجیم، گلیم یا ابریشمِ «نقش‌خط حافظ» می‌آید (emo-hafez.js)
       if (window.EMO_HAFEZ && window.EMO_HAFEZ.pick) emotional = window.EMO_HAFEZ.pick.cols;
   
       DepressivePressure[0] = R.random_choice(emotional2);
       DepressivePressure[1] = R.random_choice(emotional2);
       DepressivePressure[2] = R.random_choice(emotional2);
       DepressivePressure[3] = R.random_choice(emotional2);
       DepressivePressure[4] = R.random_choice(emotional2);
       DepressivePressure[5] = R.random_choice(emotional2);
       DepressivePressure[6] = R.random_choice(emotional2);
       DepressivePressure[7] = R.random_choice(emotional2);
       DepressivePressure[8] = R.random_choice(emotional2);
       DepressivePressure[9] = R.random_choice(emotional2);
       DepressivePressure[10] = R.random_choice(emotional2);
       DepressivePressure[11] = R.random_choice(emotional2);
       DepressivePressure[12] = R.random_choice(emotional2);
       DepressivePressure[13] = R.random_choice(emotional2);
       DepressivePressure[14] = R.random_choice(emotional2);
       DepressivePressure[15] = R.random_choice(emotional2);
       DepressivePressure[16] = R.random_choice(emotional2);
       DepressivePressure[17] = R.random_choice(emotional2);
       DepressivePressure[18] = R.random_choice(emotional2);
       DepressivePressure[19] = R.random_choice(emotional2);
       DepressivePressure[20] = R.random_choice(emotional2);
       DepressivePressure[21] = R.random_choice(emotional2);
       
       EmotionalStates[0] = R.random_choice(emotional);
       EmotionalStates[1] = R.random_choice(emotional);
       EmotionalStates[2] = R.random_choice(emotional);
       EmotionalStates[3] = R.random_choice(emotional);
       EmotionalStates[4] = R.random_choice(emotional);
       EmotionalStates[5] = R.random_choice(emotional);
       EmotionalStates[6] = R.random_choice(emotional);
       EmotionalStates[7] = R.random_choice(emotional);
       EmotionalStates[8] = R.random_choice(emotional);
   
     EmotionalStates[1] = R.random_choice(emotional);
     EmotionalStates[2] = R.random_choice(emotional);
     EmotionalStates[3] = R.random_choice(emotional);
     EmotionalStates[4] = R.random_choice(emotional);
     EmotionalStates[5] = R.random_choice(emotional);
     EmotionalStates[6] = R.random_choice(emotional);
     EmotionalStates[7] = R.random_choice(emotional);
     EmotionalStates[8] = R.random_choice(emotional);
     EmotionalStates[9] = R.random_choice(emotional);
     EmotionalStates[10] = R.random_choice(emotional);
     EmotionalStates[11] = R.random_choice(emotional);
     EmotionalStates[12] = R.random_choice(emotional);
     EmotionalStates[13] = R.random_choice(emotional);
     EmotionalStates[14] = R.random_choice(emotional);
     EmotionalStates[15] = R.random_choice(emotional);
     EmotionalStates[16] = R.random_choice(emotional);
     EmotionalStates[17] = R.random_choice(emotional);
     EmotionalStates[18] = R.random_choice(emotional);
     EmotionalStates[19] = R.random_choice(emotional);
     EmotionalStates[20] = R.random_choice(emotional);
     EmotionalStates[21] = R.random_choice(emotional);
     EmotionalStates[22] = R.random_choice(emotional);
     EmotionalStates[23] = R.random_choice(emotional);
     EmotionalStates[24] = R.random_choice(emotional);
     EmotionalStates[25] = R.random_choice(emotional);
     EmotionalStates[26] = R.random_choice(emotional);
     EmotionalStates[27] = R.random_choice(emotional);
     EmotionalStates[28] = R.random_choice(emotional);
     EmotionalStates[29] = R.random_choice(emotional);
     EmotionalStates[30] = R.random_choice(emotional);

     colorbg = R.random_choice(EmotionalStates);
     background(colorbg);

    fill(255);
    noStroke();

let d=  R.random_num(30, 80)
window.addEventListener('resize', sizeCanvas);
  for (var i = 0; i < height; i += d) {
    particles.push(new Particle({
      p: createVector(i, 500),
      v: createVector(0, -1.5),
      originalR: R.random_num(5, 250),
      color: colors[int(i / 250) % colors.length]
    }));
  }
  particles.sort((a, b) => 0.5 - R.random_bool());
   
  for (var i2 = 0; i2 < height; i2 += d) {
    particles1.push(new Particle1({
      p: createVector(i2, 500),
      v: createVector(0, -1.5),
      originalR: R.random_num(5, 10),
      color: colors[int(i2 / 10) % colors.length]
    }));
  }
  particles1.sort((a, b) => 0.05 - R.random_bool());
 stroke(str(R.random_choice(EmotionalStates)))  
  for (let i = 0; i < R.random_num(50,100); i++) {
let thread = new Thread();
threads.push(thread);
}  
    }

function SocialProblems() {
  noStroke();


  if (!selectedFunction4tb) {
    selectedFunction4tb = R.random_choice(social);
  }

  selectedFunction4tb();

  stroke(0)
}
function granulateRedShift(amount) {
    loadPixels();
    const d = pixelDensity();
    const pixelsCount = 4 * (width * d) * (height * d);
    for (let i = 0; i < pixelsCount; i += 4) {
        pixels[i] = pixels[i] + amount;
				pixels[i+1] = pixels[i+1] + random(-amount, amount);
				pixels[i+2] = pixels[i+2] + random(-amount*2, amount*2);
	  }
	  updatePixels();
}
 let selectedFunction4tb = null; 
function granulateChannels(amount) {
    loadPixels();
    const d = pixelDensity();
    const pixelsCount = 4 * (width * d) * (height * d);
    for (let i = 0; i < pixelsCount; i += 4) {
        pixels[i] = pixels[i] + random(-amount, amount);
			  pixels[i+1] = pixels[i+1] + random(-amount, amount);
			  pixels[i+2] = pixels[i+2] + random(-amount, amount);
	  }
	  updatePixels();
}
function granulateFuzzify(amount) {
    loadPixels();
    const d = pixelDensity();
    const fuzzyPixels = 12; // pixels
    const modC = 8 * fuzzyPixels; // channels * pixels
    const modW = 8 * width * d;
    const pixelsCount = modW * (height * d);
    for (let i = 0; i < pixelsCount; i += 4) {
        const f = modC + modW;
        // fuzzify
				if (pixels[i+f]) {
		        pixels[i] = round((pixels[i] + pixels[i+f])/8);
					  pixels[i+1] = round((pixels[i+1] + pixels[i+f+1])/8);
					  pixels[i+2] = round((pixels[i+2] + pixels[i+f+2])/8);
             pixels[i+3] = round((pixels[i+3] + pixels[i+f+3])/8);
				}
				// granulate
        pixels[i] = pixels[i] + random(-_amount, _amount);
        pixels[i+1] = pixels[i+1] + random(-_amount, _amount);
        pixels[i+2] = pixels[i+2] + random(-_amount, _amount);
        pixels[i+3] = pixels[i+3] + random(-_amount, _amount);
  }
	  updatePixels();
}

function granulateWithSet(amount) {
    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const pixel = get(x, y);
            const granulatedColor = color(
                pixel[0] + random(-amount, amount),
                pixel[1] + random(-amount, amount),
                pixel[2] + random(-amount, amount),
            );
            set(x, y, granulatedColor);
        }
    }
    updatePixels();
}


 let _amount = 10;
  let amount = 30;

let numTreesQW1 =1;
let treeCounterQW1 = 0;
let drawTreeQW1 = true;

 
// The tree (shapegraphic2) is drawn once, in the first frame: a deep recursive pass that took seconds and froze the
// whole Grokly app (the artworks share its main thread). It now runs as a resumable build (generator copies of the
// tree functions, below) of EMO_UNITS branch calls per frame. While it runs, the piece's frame stands still: draw()
// only continues the tree and gives the frame count back, so nothing else moves and no other random draw happens in
// between. The frame that finishes the tree then ends exactly like the old first frame (image of the tree), and every
// later frame is the same as before. In Grokly window.__groklyReady stays false until the piece reaches the frame
// Grokly showed first before (EMO_READY_FRAME, its default warm-up), so the first shown or exported frame is unchanged.
const EMO_UNITS = 450, EMO_READY_FRAME = 3;
let emoBuild = null, emoUnits = 0;
if (window.__GROKLY_FEED) window.__groklyReady = false;
function emoReady() {
  if (window.__GROKLY_FEED && !emoBuild && frameCount >= EMO_READY_FRAME) window.__groklyReady = true;
}

function draw() {
if (emoBuild) {
  p5.instance._setProperty('frameCount', frameCount - 1);
  emoUnits = 0;
  if (!emoBuild.next().done) return;
  emoBuild = null;
  image(shapegraphic2, 0, 0); // the end of the first frame (SHK1q)
  emoReady();
  return;
}
draw0();
emoReady();
}

function draw0() {
if (window.__emoTick) window.__emoTick(); // صدا: یک بار در هر فریم
{ // زمینه خیلی آرام محو می‌شود تا اثر بعد از رسم اول نایستد و رد تازه جا داشته باشد
  push(); noStroke(); const cb = color(colorbg); cb.setAlpha(2 + 6 * ((window.__EMO || {}).fade || 0)); fill(cb); rect(250, 250, width, height); pop();
}
QW2()
drawr()
drawr2()
drawp()
 push();
  strokeWeight(40*2);
  stroke(0);
  noFill();
    

  rect(250,250, width, height);
  pop();
  
SHK1q()

}


function drawtik() {
 
    drawtik1(shapegraphic2);
    image(shapegraphic2, 0, 0);
  }
 function drawtik1() {
       if (treeCounterQW1 >= numTreesQW1) {
 
      return;
 }
 const dim = Math.max(width, height);
    let sw = 30; //line width
    let minYchange = dim*0.0001; //these two ranges determine line overlap and width
    let maxYchange = dim*0.01;
    let layers = 1;
    let rotStripe = 0;

        shapegraphic2.stroke(str(R.random_choice(DepressivePressure)))
    shapegraphic2.strokeWeight(sw*R.random_num(0.0001,0.04));

    let end = height / 2 + 500; //where lines stop 
    for (let i = 0; i < layers; i++) {
      let y1;
      if (i == 0) {
        y1 = -height / 2 - 4300;
      } else {
        y1 = -height / 2 + (height / layers) * i;
      }
      let y2 = y1,
        y3 = y1,
        y4 = y1,
        y5 = y1,
        y6 = y1;
      let rotLayer = R.random_num(0,360); //layer rotation
      let rotThisStripe = 0;
      while (
        (y1 < end) &
        (y2 < end) &
        (y3 < end) &
        (y4 < end) &
        (y5 < end) &
        (y6 < end) &
        (-maxYchange < minYchange)
      ) {
        y1 += R.random_num(minYchange, maxYchange);
        y2 += R.random_num(minYchange, maxYchange);
        y3 += R.random_num(minYchange, maxYchange);
        y4 += R.random_num(minYchange, maxYchange);
        y5 += R.random_num(minYchange, maxYchange);
        y6 += R.random_num(minYchange, maxYchange);
        shapegraphic2.push();
        shapegraphic2.translate(width / 2, height / 2);
        rotThisStripe += rotStripe;
        shapegraphic2.rotate(rotThisStripe + rotLayer);
        let xStart = -width /2;
        shapegraphic2.line(xStart - 300, y1,xStart + (width / 5) * 1, y2);
        shapegraphic2.line(xStart + (width / 5) * 2, y3, xStart + (width / 5) * 3, y4);
        shapegraphic2.line(xStart + (width / 5) * 4, y5,width / 2 + 300, y6);
        shapegraphic2.line(xStart + (width / 5) * 4, y5,width / 2 + 300, y6);
        shapegraphic2.pop();
      }
    }
      drawTreeQW1 = false;

 treeCounterQW1++;
 drawTreeQW1 = true;
  }

function QW2(){
       if (treeCounterQW1 >= numTreesQW1) {
 
      return;
 }


 for(let col = 0; col< width; col+=width/50){     
  for(let row = 0; row <height; row+=height/50){ 
     let xPos = col; 
    let yPos = row;
        
  
 stroke(str(R.random_choice(EmotionalStates)))

      const dim = Math.max(width, height);
     push();
   translate(width*R.random_num(0.01,2.0), height*R.random_num(0.01,2.0));
 rotate((R.random_num(30,360)))

  fill(str(R.random_choice(EmotionalStates)))
     rotate(radians(R.random_num(30,35)))
  
     strokeWeight(R.random_num(1,4));

let chosen = chooseRandomColor();
  const r = R.random_num(1,4);
       strokeWeight(R.random_num(1,4));

 line(0, 0, R.random_num(0,r), R.random_num(0,r))
   stroke(0)
     strokeWeight(R.random_num(1,4));

 line(0, 0, R.random_num(0,r), R.random_num(0,r))
 stroke(str(R.random_choice(EmotionalStates)))


 line(0, 0, R.random_num(0,r), R.random_num(0,r))
 stroke(str(R.random_choice(EmotionalStates)))

 line(0, 0, R.random_num(0,r), R.random_num(0,r))
    stroke(0);
 line(0, 0, R.random_num(0,r), R.random_num(0,r))
stroke(0);

 line(0, 0, R.random_num(0,r), R.random_num(0,r))

  fill(str(R.random_choice(EmotionalStates)))
   const r1 =  R.random_num(1,4); 

  fill(str(R.random_choice(EmotionalStates)))
    stroke(255,20)
  noStroke()
 line(0, 0, R.random_num(0,r), R.random_num(0,r))
  fill(str(R.random_choice(EmotionalStates)))
noStroke()
 line(0, 0, R.random_num(0,r), R.random_num(0,r))
  fill(str(R.random_choice(EmotionalStates)))
    noStroke()
 line(0, 0, R.random_num(0,r), R.random_num(0,r))
   noStroke()
  fill(str(R.random_choice(EmotionalStates)))
 line(0, 0, R.random_num(0,r), R.random_num(0,r))
fill(str(R.random_choice(EmotionalStates)))
   noStroke()
 line(0, 0, R.random_num(0,r), R.random_num(0,r))

     pop();

    }
       drawTreeQW1 = false;

 treeCounterQW1++;
 drawTreeQW1 = true;
   }
}

let prevY = null;

let t=0

let particles1 = [];
let particles = [];

function drawr() {
  particles.forEach(p => {
    p.update();
    p.draw();
  });


}

class Particle {
  constructor(args) {
    let def = {
      p: createVector(0, 0),
      v: createVector(0, 0),
      a: createVector(0, 0),
      r: 10,
      originalR: 10,
      color: color(100),
 
      randomId: R.random_int(0,100000),
      barLen: R.random_choice([0, 20, 40, 80]),
      changeColorSpan: R.random_choice([10, 100, 200, 400]),
      angle: R.random_bool(TWO_PI)
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  update() {
    if (this.baseR === undefined) this.baseR = this.originalR;
    this.p.y += this.v.y * (0.6 + 1.6 * ((window.__EMO || {}).rise || 0)); this.p.x += this.v.x; // سرعت بالا رفتن ← بلندی صدا
    this.v.add(this.a);

    this.angle += 0.05;

    this.p.x += sin(this.angle) * (0.5 + 1.2 * ((window.__EMO || {}).sway || 0)); // تاب ← تمپو

    this.r = (sin((height - this.p.y) / (30 + 40 * noise(frameCount / 271)) * noise(frameCount / 728) + this.p.x / 50 + noise(frameCount / 413) / 200)) * this.originalR * (1 + 0.6 * ((window.__EMO || {}).swell || 0)); // اندازه ← بم
    this.originalR *= 0.9995;

    if ((this.randomId + frameCount) % (this.changeColorSpan) == 0) {
      this.color = R.random_choice(emotional);
    }

    if (this.p.y < -200) { // به‌جای خاموش شدن، از پایین دوباره بالا می‌آید
      this.p.y = height + 30;
      this.originalR = this.baseR;
    }
  }

  draw() {
    push();
    
    drawingContext.shadowColor = color(0, R.random_num(2,100));
    drawingContext.shadowBlur = 0;
  stroke(0);
      translate(this.p.x, this.p.y);
    translate(sin(this.angle) * 100, sin((height - this.p.y) / 50 + this.randomId) * 100);
    rotate(sin(this.randomId + frameCount / (1000 + noise(this.randomId) * 1000)) / 4);

    fill(this.color);
 let l = R.random_num(2,100)
  let l2 = R.random_num(2,20)
    for (let i = 0; i < l2; i++) {
      circle(R.random_num(-this.r / 2, this.r / 2), R.random_num(-this.r / 2, this.r / 2), random() * this.r * random() * 0.05);
    }
    noStroke();
    strokeWeight(0.6);
  
    for (let i = 0; i < l; i++) {
      circle(R.random_num(-this.r / 2, this.r / 2), R.random_num(-this.r / 2, this.r / 2), random() * this.r * random() * 0.05);
    }
     stroke(0);
line(0, 0, this.r, this.r);
  strokeWeight(1);
    stroke(255);
    stroke(this.color);
     strokeWeight(0.06);
    stroke(0,255);
 fill(0)
     line(0, 0, this.r, this.r);
    for (let i = 0; i < l2; i++) {
      circle(R.random_num(-this.r / 2, this.r / 2), R.random_num(-this.r / 2, this.r / 2), random() * this.r * random() * 0.05);
    }
    pop();
  }
}


function drawr2() {
  particles1.forEach(p => {
    p.update1();
    p.draw1();
  });

}

class Particle1 {
  constructor(args) {
    let def = {
      p: createVector(0, 0),
      v: createVector(0, 0),
      a: createVector(0, 0),
      r: 50,
      originalR: 50,
      color: color(255),
 
      randomId: R.random_int(0,100000),
      barLen: R.random_choice([0, 120, 140, 180]),
      changeColorSpan: R.random_choice([10, 100, 200, 400]),
      angle: R.random_bool(TWO_PI)
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  update1() {
    if (this.baseR === undefined) this.baseR = this.originalR;
    this.p.y += this.v.y * (0.6 + 1.8 * ((window.__EMO || {}).fine || 0)); this.p.x += this.v.x; // سرعت ذره‌های ریز ← صدای زیر
    this.v.add(this.a);

    this.angle += 0.05;

    this.p.x += sin(this.angle) * (0.5 + 1.2 * ((window.__EMO || {}).sway || 0));

    this.r = (sin((height - this.p.y) / (30 + 140 * noise(frameCount / 271)) * noise(frameCount / 728) + this.p.x / 50 + noise(frameCount / 413) / 2)) * this.originalR * (1 + 0.9 * ((window.__EMO || {}).spark || 0)); // اندازه ← شروع ضرب
    this.originalR *= 0.9995;

    if ((this.randomId + frameCount) % (this.changeColorSpan) == 0) {
      this.color = R.random_choice(emotional2);
    }

    if (this.p.y < -500) {
      this.p.y = height + 30;
      this.originalR = this.baseR;
    }
  }

  draw1() {
    push();
    
    drawingContext.shadowColor = color(0, 255);
    drawingContext.shadowBlur = 0;

   translate(this.p.x, this.p.y);
    translate(sin(this.angle) * 100, sin((height - this.p.y) / 500 + this.randomId) * 10);
    rotate(sin(this.randomId + frameCount / (1000 + noise(this.randomId) * 1000)) / 4);

    fill(this.color);

    noStroke();
    stroke(this.color)
    strokeWeight(0.02);
  
line(0, 0, this.r, this.r);
 line(0+10, 0+10, this.r, this.r);
    stroke(this.color);
    line(0, 0, -this.barLen, this.barLen);
     line(0, 0, this.r, this.r);
   for (let i = 0; i < 15; i++) {
    circle(R.random_num(-this.r / 2, this.r / 2), R.random_num(-this.r / 2, this.r / 2), 0.5 * this.r * 0.8 * 0.3);
 }
    pop();
  }
}

let xoff = 0.0; 
let KIJA2SHKTree = true;


function SHK1q() {
  // first frame: start the resumable tree build; the frame ends (image of the tree) when it is done
  if (KIJA2SHKTree) {
    emoBuild = SHK1G();
    emoUnits = 0;
    if (!emoBuild.next().done) return;
    emoBuild = null;
  }
  image(shapegraphic2, 0, 0);
}

// Generator copies of SHK1 / multiBranchKIJA2 / branchKIJA2 / SHKBranchKIJA2: the same calls, the same random draws in
// the same order, plus a pause check on entry to branchKIJA2 (never inside a leaf). The originals below are kept.
function* SHK1G() {
shapegraphic2.pixelDensity(window.__GROKLY_FEED ? 2 : 4);
const KIJA2os = 5
shapegraphic2.translate(R.random_num(-100,600), 550 );
let KIJA2bs = R.random_num(80, 140)
let KIJA2v = getDirKIJA2(0.5);
let KIJA2l = KIJA2v.x;
let KIJA2r = KIJA2v.y;
let KIJA2ts = R.random_num(15, 30)
let KIJA2nb = R.random_num(2, 4);
shapegraphic2.strokeWeight(KIJA2ts);
shapegraphic2.line(0, 0, 0, -KIJA2os);
shapegraphic2.translate(0, -KIJA2os);
yield* multiBranchKIJA2G(KIJA2bs, KIJA2l, KIJA2r, KIJA2ts, KIJA2nb);
KIJA2SHKTree = false;
}
function* multiBranchKIJA2G(KIJA2bs, KIJA2l, KIJA2r, KIJA2ts = R.random_num(10, 600), KIJA2nb = R.random_num(10, 30)) {
for (let i = 0; i <= KIJA2nb; i++) {
const KIJA2os = R.random_num(20, 200);
let KIJA2bp = [];
KIJA2bp[0] = createVector(2000 / 2, 1000 - KIJA2os);
yield* branchKIJA2G(KIJA2bs, KIJA2l, KIJA2r, KIJA2thres = R.random_num(10, 20), KIJA2ts = KIJA2ts, KIJA2bp);
}
}
function* SHKBranchKIJA2G(KIJA2th, KIJA2h, KIJA2thres, KIJA2ts, KIJA2bp) {
KIJA2ts *= 0.8;
shapegraphic2.strokeWeight(KIJA2ts);
shapegraphic2.push();
shapegraphic2.rotate(-KIJA2th);
shapegraphic2.line(0, 0, 0, -KIJA2h);
shapegraphic2.translate(0, -KIJA2h);
shapegraphic2.push();
shapegraphic2.rotate(radians(30));
shapegraphic2.pop();
let KIJA2v = getDirKIJA2();
let KIJA2l = KIJA2v.x;
let KIJA2r = KIJA2v.y;
yield* branchKIJA2G(KIJA2h, KIJA2l, KIJA2r, KIJA2thres, KIJA2ts, KIJA2bp);
shapegraphic2.pop();
}
function* branchKIJA2G(KIJA2h, KIJA2l, KIJA2r, KIJA2thres = 6, KIJA2ts = 3, KIJA2bp = []) {
if (emoUnits >= EMO_UNITS) yield;
emoUnits++;
let KIJA2a = R.random_num(-R.random_num(1, 30), R.random_num(1, 30));
let KIJA2s = 6;
let KIJA2t = radians(KIJA2a);
KIJA2h *= R.random_num(0.7, 1);
let KIJA2i = KIJA2bp.length;
KIJA2bp[KIJA2i] = createVector(KIJA2bp[KIJA2i - 1].x + KIJA2h * cos(KIJA2t), KIJA2bp[KIJA2i - 1].y - KIJA2h * sin(KIJA2t));
shapegraphic2.stroke(0)
if (KIJA2bp[KIJA2i].x > 0 && KIJA2bp[KIJA2i].y > 0) {
if (KIJA2h > KIJA2thres) {
if (KIJA2r) {
yield* SHKBranchKIJA2G(KIJA2t, KIJA2h, KIJA2thres, KIJA2ts, KIJA2bp);
}
if (KIJA2l) {
yield* SHKBranchKIJA2G(-KIJA2t, KIJA2h, KIJA2thres, KIJA2ts, KIJA2bp);
}
} else {
emoUnits += 4; // a leaf is about two dozen canvas calls
shapegraphic2.stroke(str(R.random_choice(EmotionalStates)))
shapegraphic2.strokeWeight(R.random_num(0.1,0.3));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
shapegraphic2.line(0, 10, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
shapegraphic2.line(0, 20, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
shapegraphic2.line(0, 30, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
shapegraphic2.strokeWeight(R.random_num(0, 0.5));
shapegraphic2.line(0, 0, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.line(0, 40, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
shapegraphic2.line(0, 50, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
noStroke();
shapegraphic2.fill(str(R.random_choice(EmotionalStates)))
shapegraphic2.noStroke();
shapegraphic2.circle(0,0, R.random_num(1,4));
shapegraphic2.strokeWeight(R.random_num(1.0,6));
noFill();
shapegraphic2.stroke(str(R.random_choice(EmotionalStates)))
shapegraphic2.strokeWeight(R.random_num(0.1,0.6));
shapegraphic2.arc(0,0, 5,35, HALF_PI, PI);
shapegraphic2.arc(0,0, 6,46, HALF_PI, PI);
shapegraphic2.arc(0,0, 7,57, HALF_PI, PI);
shapegraphic2.arc(0,0, 5,-35, HALF_PI, PI);
shapegraphic2.arc(0,0, 6,-46, HALF_PI, PI);
shapegraphic2.arc(0,0, 7,-57, HALF_PI, PI);
shapegraphic2.translate(0, -KIJA2h);
shapegraphic2.line(0, 60, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
shapegraphic2.line(0, 70, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
shapegraphic2.line(0, 80, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.translate(0, -KIJA2h);
}
}
}
let yoff = 0.0;

function SHK1() {
if (!KIJA2SHKTree) {
  return;
}

shapegraphic2.pixelDensity(window.__GROKLY_FEED ? 2 : 4);

const KIJA2os = 5
shapegraphic2.translate(R.random_num(-100,600), 550 );
let KIJA2bs = R.random_num(80, 140)
let KIJA2v = getDirKIJA2(0.5);
let KIJA2l = KIJA2v.x;
let KIJA2r = KIJA2v.y;
let KIJA2ts = R.random_num(15, 30)
let KIJA2nb = R.random_num(2, 4);

shapegraphic2.strokeWeight(KIJA2ts);
shapegraphic2.line(0, 0, 0, -KIJA2os);
shapegraphic2.translate(0, -KIJA2os);
multiBranchKIJA2(KIJA2bs, KIJA2l, KIJA2r, KIJA2ts, KIJA2nb);
KIJA2SHKTree = false;
}
function getDirKIJA2(KIJA2p = 0.1) {
let KIJA2r = R.random_num(0, 1);
let KIJA2lp = 1 - KIJA2p;
let KIJA2l = false;
let KIJA2ri = false;
if (KIJA2r >= KIJA2lp) {
KIJA2l = true;
} else if (KIJA2r <= KIJA2p) {
KIJA2l = true;
} else {
KIJA2l = true;
KIJA2ri = true;
}
return createVector(KIJA2l, KIJA2ri);
}
function SHKBranchKIJA2(KIJA2th, KIJA2h, KIJA2thres, KIJA2ts, KIJA2bp) {
KIJA2ts *= 0.8;
shapegraphic2.strokeWeight(KIJA2ts);
shapegraphic2.push();
shapegraphic2.rotate(-KIJA2th);
shapegraphic2.line(0, 0, 0, -KIJA2h);
shapegraphic2.translate(0, -KIJA2h);

shapegraphic2.push(); // شاخه دوم
shapegraphic2.rotate(radians(30));

shapegraphic2.pop();
let KIJA2v = getDirKIJA2();
let KIJA2l = KIJA2v.x;
let KIJA2r = KIJA2v.y;
branchKIJA2(KIJA2h, KIJA2l, KIJA2r, KIJA2thres, KIJA2ts, KIJA2bp);
shapegraphic2.pop();
}
function branchKIJA2(KIJA2h, KIJA2l, KIJA2r, KIJA2thres = 6, KIJA2ts = 3, KIJA2bp = []) {
 
let KIJA2a = R.random_num(-R.random_num(1, 30), R.random_num(1, 30));
let KIJA2s = 6;
let KIJA2t = radians(KIJA2a);
KIJA2h *= R.random_num(0.7, 1);
let KIJA2i = KIJA2bp.length;
KIJA2bp[KIJA2i] = createVector(KIJA2bp[KIJA2i - 1].x + KIJA2h * cos(KIJA2t), KIJA2bp[KIJA2i - 1].y - KIJA2h * sin(KIJA2t));
shapegraphic2.stroke(0)
if (KIJA2bp[KIJA2i].x > 0 && KIJA2bp[KIJA2i].y > 0) {
if (KIJA2h > KIJA2thres) {
if (KIJA2r) {
SHKBranchKIJA2(KIJA2t, KIJA2h, KIJA2thres, KIJA2ts, KIJA2bp);
}
if (KIJA2l) {
SHKBranchKIJA2(-KIJA2t, KIJA2h, KIJA2thres, KIJA2ts, KIJA2bp);
}
} else {
 
  shapegraphic2.stroke(str(R.random_choice(EmotionalStates)))

shapegraphic2.strokeWeight(R.random_num(0.1,0.3));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
  shapegraphic2.line(0, 10, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
  shapegraphic2.line(0, 20, R.random_num(0, 2), R.random_num(0, 5));
  shapegraphic2.strokeWeight(R.random_num(0, 0.4));
  shapegraphic2.line(0, 30, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
shapegraphic2.strokeWeight(R.random_num(0, 0.5));
  shapegraphic2.line(0, 0, R.random_num(0, 2), R.random_num(0, 5));
  shapegraphic2.line(0, 40, R.random_num(0, 2), R.random_num(0, 5));
  shapegraphic2.strokeWeight(R.random_num(0, 0.4));
  shapegraphic2.line(0, 50, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
  noStroke();
    shapegraphic2.fill(str(R.random_choice(EmotionalStates)))

 shapegraphic2.noStroke();
 
  shapegraphic2.circle(0,0, R.random_num(1,4));

     shapegraphic2.strokeWeight(R.random_num(1.0,6));

     noFill();
 shapegraphic2.stroke(str(R.random_choice(EmotionalStates)))

shapegraphic2.strokeWeight(R.random_num(0.1,0.6));
shapegraphic2.arc(0,0, 5,35, HALF_PI, PI);
shapegraphic2.arc(0,0, 6,46, HALF_PI, PI);
shapegraphic2.arc(0,0, 7,57, HALF_PI, PI);
shapegraphic2.arc(0,0, 5,-35, HALF_PI, PI);
shapegraphic2.arc(0,0, 6,-46, HALF_PI, PI);
shapegraphic2.arc(0,0, 7,-57, HALF_PI, PI);    
shapegraphic2.translate(0, -KIJA2h);
  shapegraphic2.line(0, 60, R.random_num(0, 2), R.random_num(0, 5));
  shapegraphic2.strokeWeight(R.random_num(0, 0.4));
  shapegraphic2.line(0, 70, R.random_num(0, 2), R.random_num(0, 5));
shapegraphic2.strokeWeight(R.random_num(0, 0.4));
  shapegraphic2.line(0, 80, R.random_num(0, 2), R.random_num(0, 5));   
shapegraphic2.translate(0, -KIJA2h);


}
}
}
function multiBranchKIJA2(KIJA2bs, KIJA2l, KIJA2r, KIJA2ts = R.random_num(10, 600), KIJA2nb = R.random_num(10, 30)) {
for (let i = 0; i <= KIJA2nb; i++) {
const KIJA2os = R.random_num(20, 200);
let KIJA2bp = [];
KIJA2bp[0] = createVector(2000 / 2, 1000 - KIJA2os);
branchKIJA2(KIJA2bs, KIJA2l, KIJA2r, KIJA2thres = R.random_num(10, 20), KIJA2ts = KIJA2ts, KIJA2bp);
}
}


let threads = [];

let numTreesQW2 = 7000;
let treeCounterQW2 = 0;
let drawTreeQW2 = true;
function drawp() {

  // نخ‌ها دیگر بعد از رسم اول نمی‌ایستند
  const __thr = 0.7 + 0.8 * ((window.__EMO || {}).thread || 0); window.__thr = __thr; // بلندی خط نخ‌ها ← میانه و روشنی صدا
let mouse = createVector(mouseX, mouseY);
  for (let i = 0; i < threads.length; i++) {
    let distFromMouse = p5.Vector.dist(mouse, threads[i].pos);
    let mouseForce = createVector(0, 0);
    if (distFromMouse < 60) {
      mouseForce = p5.Vector.sub(mouse, threads[i].pos);
      mouseForce.mult(-20);
    }
    threads[i].applyForce(mouseForce);
    threads[i].update();
    threads[i].display();
     fill(emotional[i % emotional.length]);
  if (random() < 0.35 + 0.65 * ((window.__EMO || {}).dots || 0)) circle (random(1,1500),random(1,1500),random(1,5),8) // دانه‌های پراکنده ← تغییر طیف
   drawTreeQW2 = false;
  treeCounterQW2++;
  drawTreeQW2 = true;

  }

}
function mousePressed() {
  for (let i = 0; i < colors.length; i++) {
    let x = 10 + i * 20;
    let y = height - 30;
    if (mouseX > x && mouseX < x + 20 && mouseY > y && mouseY < y + 20) {
      colorset.push(colorset.splice(i, 100)[0]);
      break;
    }
  }
}
class Thread {
  constructor() {
    this.pos = createVector(random(0, 500), R.random_num(500, 900));
    this.vel = createVector(R.random_num(-2, 2), 0);
    this.acc = createVector(0, 0);
    this.size = R.random_num(30, 150);
    this.angle = 0;
    this.target = createVector(0, 0);
    this.dist = R.random_num(0.1, 50);
    this.spring = 0.01;
    this.damping = 0.95;
    this.maxSpeed = 4;
    this.colorIndex = 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.target.x = this.pos.x + cos(this.angle) * this.dist;
    this.target.y = this.pos.y + sin(this.angle) * this.dist;
    let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

    let force = p5.Vector.sub(this.target, this.pos);
    force.mult(this.spring);
    this.acc.add(force);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.angle += 0.05 + 0.08 * ((window.__EMO || {}).turn || 0) + 0.04 * ((window.__EMO || {}).twist || 0); // چرخش ← آواز و جهت نُت
    this.spring += R.random_num(-0.001, 0.001);
    this.spring = constrain(this.spring, 0.005, 0.05);
  }

display() {

  push();
translate(this.pos.x, this.pos.y);
rotate(this.vel.heading());
noStroke()
rect(0, -5, this.size/10, R.random_num(1,5));
stroke(kijosk[2]);

strokeWeight(0.9)

    line(50, 50, this.size*3*(window.__thr || 1), R.random_num(1,4));

    stroke(str(R.random_choice(EmotionalStates)))
strokeWeight(0.8)
    line(70, 40, this.size*3*(window.__thr || 1), R.random_num(1,5));
stroke(0)
strokeWeight(0.8)

    line(170,180, this.size*3*(window.__thr || 1), R.random_num(1,10));
stroke(str(R.random_choice(DepressivePressure)))
strokeWeight(0.9)

    line(70, 80, this.size*3*(window.__thr || 1), R.random_num(1,10));


pop();
}
}
