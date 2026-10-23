


class Random {
    constructor() {
      this.useA = false;
      let sfc32 = function (uint128Hex) {
        let a = parseInt(uint128Hex.substring(0, 8), 16);
        let b = parseInt(uint128Hex.substring(8, 16), 16);
        let c = parseInt(uint128Hex.substring(16, 24), 16);
        let d = parseInt(uint128Hex.substring(24, 32), 16);
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
      this.prngA = new sfc32(tokenData.hash.substring(2, 34));
      // seed prngB with second half of tokenData.hash
      this.prngB = new sfc32(tokenData.hash.substring(34, 66));
      for (let i = 0; i < 1e6; i += 2) {
        this.prngA();
        this.prngB();
      }
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

let yellowPalette = [
  "#FFF9C4",
  "#FFF59D",
  "#FFF176",
  "#FFEE58",
  "#FFEB3B",
  "#FDD835",
  "#FBC02D",
  "#F9A825",
  "#F57F17",
  "#FFD600",
  "#FFC107",
  "#FFB300",
  "#FFA000",
  "#FF8F00",
  "#FF6F00",
  "#FFE082",
  "#FFD54F",
  "#FFCA28",
  "#FFC107",
  "#FFB300",
  "#FFA000",
  "#FF8F00",
  "#FF6F00",
  "#FFB74D",
  "#FFA726",
  "#FF9800",
  "#FB8C00",
  "#F57C00",
  "#EF6C00",
  "#E65100",
  "#FFCC80",
  "#FFB74D",
  "#FFA726",
  "#FF9800",
  "#FB8C00",
  "#F57C00",
  "#EF6C00",
  "#E65100",
  "#FFA07A",
  "#FF8A65",
  "#FF7043",
  "#FF5722",
  "#F4511E",
  "#E64A19",
  "#D84315",
  "#BF360C"
];



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

function color1() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 38) ** 2 + (g - 70) ** 2 + (b - 83) ** 2);
  } while (d > 90);
  return color(r, g, b,random(1,20));
}

function color2() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 42) ** 2 + (g - 157) ** 2 + (b - 143) ** 2);
  } while (d > 90);
  return color(r, g, b,random(1,20));
}

function color3() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 233) ** 2 + (g - 196) ** 2 + (b - 106) ** 2);
  } while (d > 90);
  return color(r, g, b,random(1,20));
}

function color4() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 244) ** 2 + (g - 162) ** 2 + (b - 97) ** 2);
  } while (d > 90);
  return color(r, g, b,random(1,20));
}

function color5() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 231) ** 2 + (g - 111) ** 2 + (b - 81) ** 2);
  } while (d > 90);
  return color(r, g, b,random(1,20));
}



let colors = [
  {name: 'color1', func: color1},
  {name: 'color2', func: color2},
  {name: 'color3', func: color3},
  {name: 'color4', func: color4},
  {name: 'color5', func: color5},
 

];











let c1 = "f6bd60,f7ede2,f5cac3,84a59d,f28482".split(",").map((a) => "#" + a);
let c2 = "8ecae6,219ebc,023047,ffb703,fb8500".split(",").map((a) => "#" + a);
let c3 = "000000,14213d,fca311,e5e5e5,ffffff".split(",").map((a) => "#" + a);
let c4 = "e63946,f1faee,a8dadc,457b9d,1d3557".split(",").map((a) => "#" + a);
let c5 = "dad7cd,a3b18a,588157,3a5a40,344e41".split(",").map((a) => "#" + a);
let c6 = "386641,6a994e,a7c957,f2e8cf,bc4749".split(",").map((a) => "#" + a);
let c7 = "edeec9,dde7c7,bfd8bd,98c9a3,77bfa3".split(",").map((a) => "#" + a);
let c8 = "3ab795,a0e8af,86baa1,edead0,ffcf56".split(",").map((a) => "#" + a);
let c9 = "ffb5a7,fcd5ce,f8edeb,f9dcc4,fec89a".split(",").map((a) => "#" + a);
let c10 = "f4f1de,e07a5f,3d405b,81b29a,f2cc8f".split(",").map((a) => "#" + a);








function mouseClicked() {
  let kita = new Kita();
  kito.push(kita);
}
 






let colorset = [];
//let colorbg = "1C2611-2B4016-261416-031740".split("-").map((a) => "#" + a); // dark

let originalGraphics;
let lineGraphics;

//let b = ["#000"];


        let colorbg;


let currentColor = null;
let randomColor2;
let boxCenter, boxSize, left, right, topEdge, bottom;
function chooseRandomColor() {
  if (currentColor == null) {
    let randomIndex = Math.floor(Math.random() * colors.length);
    let chosenColor = colors[randomIndex];
    let randomColors = [];
    for (let i = 0; i < 90; i++) {
      randomColors.push(chosenColor.func());
    }
    currentColor = {name: chosenColor.name, colors: randomColors};
  }
  return currentColor;
}

let randomColor;

let parandehs = [];
let canvas2;



let generatedNums = [];
let currentIndex = 0;

function generateNumbers() {
  if (generatedNums.length === 0) {
    // گرفتن اعداد از 1 تا 10 و تقسیم بر 100
    generatedNums = Array.from(Array(1), (_, i) => (i + 1) / 10);
    // تصادفی کردن ترتیب اعداد
    shuffle(generatedNums, true);
  }
  // بازگرداندن عدد جدید و به روز کردن اندیس جاری
  let currentNum = generatedNums[currentIndex];
  currentIndex = (currentIndex + 1) % 10;
  return currentNum;
}

let yoff = 0.0;
let galins = [];

let circlePos;
let circleRadius = 80;
let circleVel;
let circleAcc;

let butterflies= [];

let numOfButterflies = [];
let birds = [];

let numBirds = 150;

let flock = [];


let boxX = 0;
let boxY;
let boxAngle = 0;
let boxHeight = 70;
let boxWidth = 70;
let fabricColor;
let boxColor;
let bgColor;
let gravity = 5.01;
let sitos = [];

let jikos = [];

let Jikos = [];
let colorset3 = [];

let threads = [];
let fitos = [];
let kito = [];
let lines = [
  { y: 120, bend: 0 },
  { y: 220, bend: 0 }
];
 let xoff = 0.0;


let zitos = [];


let amplitude = 45;
let frequency = 0.01;

let r2 = 200;
var lastrandomsX=0;
var lastrandomsY=0;
 function A2(t) {
   if(t=='k'){
   if(lastrandomsX==0){
   lastrandomsX=Math.floor(Math.random() * 10) + 1;
   }
   return lastrandomsX;
   }else{
     
   if(lastrandomsY==0){
   lastrandomsY=Math.floor(Math.random() * 10) + 1;
   }
   return lastrandomsY;
   }
   
 }
var x = 0;
let kapas = [];

 function setup() {
   
  createCanvas(windowWidth, windowHeight);
  shipGraphic = createGraphics(width, height); // ایجاد یک متغیر گرافیک برای نگهداری تصاویر شیپ ها
  
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
    colors2 = random([yellowPalette,colors_tone1,colors_tone2,colors_tone3,colors_tone4,colors_tone5,colors_tone6,colors_tone7,colors_tone8,colors_tonea1,colors_tonea2,colors_tonea3,colors_tonea4,colors_tonea5,colors_tonea6,colors_tonea7,colors_tonea8,colors_tonea9,colors_tonea10,colors_tonea11,colors_tonea12,colors_tonea13,colors_tonea14,colors_tonea15,colors_tonea16,colors_tonea17,colors_tonea18,colors_tonea19,colors_tonea20,colors_tonea21,colors_tonea22,colors_tonea23,colors_tonea24,colors_tonea25,colors_tonea26,colors_tonea27,colors_tonea28,colors_tonea29,colors_tone9, colors_tone10, colors_tone11, colors_tone12, colors_tone13,colors_tone14,colors_tone15,colors_tone16,colors_tone17,colors_tone18,colors_tone19,colors_tone20,colors_tone21,colors_tone22,colors_tone23,colors_tone24,colors_tone25,colors_tone26,colors_tone27,colors_tone28,colors_tone29 ,colors_b1,colors_b2,colors_b3,colors_b4,colors_b5,colors_b6,colors_b7,colors_b8,colors_b9,colors_b10,colors_b11,colors_b12,colors_b13,colors_b14,colors_b15,colors_b16,colors_b17,colors_b18,colors_b19,colors_b20,colors_b21,colors_b22,colors_b23   ]);
  colors3 = random([colors_tone9, colors_tone10, colors_tone11, colors_tone12, colors_tone13,colors_tone14,colors_tone15,colors_tone16,colors_tone17,colors_tone18,colors_tone19,colors_tone20,colors_tone21,colors_tone22,colors_tone23,colors_tone24,colors_tone25,colors_tone26,colors_tone27,colors_tone28,colors_tone29 ]);
  colors4 = random([yellowPalette, colors_b1,colors_b2,colors_b3,colors_b4,colors_b5,colors_b6,colors_b7,colors_b8,colors_b9,colors_b10,colors_b11,colors_b12,colors_b13,colors_b14,colors_b15,colors_b16,colors_b17,colors_b18,colors_b19,colors_b20,colors_b21,colors_b22,colors_b23]);

  colorset3[0] = random(colors4);
  colorset3[1] = random(colors4);
  colorset3[2] = random(colors4);
  colorset3[3] = random(colors4);
  colorset3[4] = random(colors4);
  colorset3[5] = random(colors4);
  colorset3[6] = random(colors4);
  colorset3[7] = random(colors4);
  colorset3[8] = random(colors4);
  colorset3[9] = random(colors4);
  colorset3[10] = random(colors4);
  colorset3[11] = random(colors4);
  colorset3[12] = random(colors4);
  colorset3[13] = random(colors4);
  colorset3[14] = random(colors4);
  colorset3[15] = random(colors4);
  colorset3[16] = random(colors4);
  colorset3[17] = random(colors4);
  colorset3[18] = random(colors4);
  colorset3[19] = random(colors4);
  colorset3[20] = random(colors4);
  colorset3[21] = random(colors4);
  
  
  
  colorset[0] = random(colors2);
  colorset[1] = random(colors2);
  colorset[2] = random(colors2);
  colorset[3] = random(colors2);
  colorset[4] = random(colors2);
  colorset[5] = random(colors2);
  colorset[6] = random(colors2);
  colorset[7] = random(colors2);
  colorset[8] = random(colors2);



 
colorset[1] = random(colors2);
colorset[2] = random(colors2);
colorset[3] = random(colors2);
colorset[4] = random(colors2);
colorset[5] = random(colors2);
colorset[6] = random(colors2);
colorset[7] = random(colors2);
colorset[8] = random(colors2);
colorset[9] = random(colors2);
  
  colorbg = random(colors4);
  
  
  fill(colorset[8 % colorset.length]); 
  
      colors2 = random([c1,c2,c3,c4,c5,c6,c7,c8,c9,c10]);
      
       
       
       
       colorset[0] = random(colors2);
       colorset[1] = random(colors2);
       colorset[2] = random(colors2);
       colorset[3] = random(colors2);
    
   
   
      
  
     


     fill(colorset[8 % colorset.length]); 
     colorbg = random(colorset);
   
   
   
  let xoff = 0.0;

  shipGraphic.noStroke();
  shipGraphic.noFill()
  shipGraphic.beginShape();
  shipGraphic.vertex(0, height);
for (let x = 0; x <= width; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.4, height);
  vertex(x, y);
  xoff += 0.001;
}
  shipGraphic.vertex(width, height);
  shipGraphic.endShape(CLOSE);
  
   let staticBirdsCount = 2; // تعداد پرنده‌های ثابت در مرکز
  createStaticBirds(staticBirdsCount); // تولید پرنده‌های ثابت
  let randomBirdsCount = floor(random(20, 170)); // تعداد پرنده‌های تصادفی
  for (let i = 0; i < randomBirdsCount; i++) {
    flock.push(new Bird(3, createVector(random(width), random(height)), createVector(random(-1, 1), random(-1, 1))));
  }

     
   let isFalling = boxY + boxHeight / 2 > height;
  if (isFalling) {
    boxY = height - boxHeight / 3;
    boxY += (height - boxY) * gravity*7;
    fill(colors);
  }
  
  
// ایجاد نخ‌های مختلف
for (let i = 0; i < random(4,20); i++) {
let thread = new Thread();
threads.push(thread);
  
}
  for (let i = 0; i < random(100,400); i++) {
let parandeh = new Parandeh();
parandehs.push(parandeh);



  }

    for (let i = 0; i < random(20,500); i++) {
let kapa = new Kapa();
kapas.push(kapa);
}
 let x1 = width / random(1,9);
let y1 = height;
let x2 = width / 3 * random(1,9);
let y2 = height;
let x3 = width;
let y3 = height /random(1,9);
let x4 = width;
let y4 = height * random(1,9);
let x5 = width / random(1,9);
let y5 = 0;
let x6 = width / random(1,9);
let y6 = 0;
  
 controlPoints = [createVector(x1, y1), createVector(x2, y2), createVector(x3, y3), createVector(x4, y4), createVector(x5, y5), createVector(x6, y6)];
 for (let i = 0; i < 5; i++) {
    let fito = new Fito();
    fitos.push(fito);
 }

    rectMode(CENTER);
  //background(255);
  frameRate(60);
  noStroke();
  fill(0);
  // ایجاد پرنده های مختلف
  for (let i = 0; i < random(10, 240); i++) {
    let sito = new Sito();
    sitos.push(sito);
  }
   for (let i = 0; i < 100; i++) {
    let zito = new Zito();
    zitos.push(zito);
  }

  // ایجاد کانواس دوم برای نمایشگر جدید
  canvas2 = createCanvas(windowWidth, windowHeight);
  canvas2.position(0, 0);
    
 for (let i = 0; i < random(100,160); i++) {
    let x = random(width);
    let y = random(height);
    let colorIndex = floor(random(colorset.length));
    let shapeIndex = floor(random(2));
    let shape = createShape(shapeIndex, x, y, colorset[colorIndex]);
    shapes.push(shape);
 }

}
function randomNumbers() {
  let arr = [];
  for (let i = 1; i <= 200; i++) {
    arr.push(Math.floor(Math.random() * 20) + 1);
  }
  return arr;
}



function createStaticBirds(count) {
  let pos = createVector(width / 3, height / 3); // مکان اولیه پرنده‌های ثابت در مرکز صفحه
  let vel = createVector(0,0.002); // سرعت ثابت به سمت بالا
  for (let i = 0; i < count; i++) {
    flock.push(new Bird(5, pos, vel));
  }
   for (let i = 0; i < random(2, 100); i++) {
    let jiko = new Jiko();
    jikos.push(jiko);
  }
      for (let i = 0; i < random(1,500); i++) {
let tipa = new Tipa();
tipas.push(tipa);
}
 
}

let prevEgg;
let currentFunction;

function calculateFeatures() {
  const featureValues = {};

  // محاسبه ویژگی Reflection
  const reflectionValue = Reflection();
  featureValues.Reflection = reflectionValue;

  // محاسبه ویژگی Freedom
  const freedomValue = Freedom();
  featureValues.Freedom = freedomValue;

  // محاسبه ویژگی Bird_and_Tree_Conversation
  const birdAndTreeConversationValue = Bird_and_Tree_Conversation();
  featureValues.Bird_and_Tree_Conversation = birdAndTreeConversationValue;

  // محاسبه ویژگی Observation
  const observationValue = Observation();
  featureValues.Observation = observationValue;

  // محاسبه ویژگی The_Moon_and_the_Bird
  const theMoonAndTheBirdValue = The_Moon_and_the_Bird();
  featureValues.The_Moon_and_the_Bird = theMoonAndTheBirdValue;

  // محاسبه ویژگی Take_Flight_Alone
  const takeFlightAloneValue = Take_Flight_Alone();
  featureValues.Take_Flight_Alone = takeFlightAloneValue;

  return featureValues;
}


function draw() {
  noStroke();

  const functions = [TakeـFlightـAlone2];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction = currentFunction || functions[randomIndex];
  currentFunction();

  // تنظیم اندازه مستطیل با توجه به صفحه نمایش
  const rectWidth = Math.min(windowWidth) * 1;
  const rectHeight = Math.min( windowHeight) * 1;

  // تنظیم رنگ پس زمینه
  //background(220);

  // تنظیم حالت مستطیل به مرکز
  rectMode(CENTER);

  // مختصات مرکز کانواس
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;

  // مختصات بالا و چپ مستطیل
  const rectX = centerX - rectWidth / 1;
  const rectY = centerY - rectHeight / 1;

  // رسم مستطیل در مرکز کانواس
  // owner: no white passe-partout around the artwork in Grokly
  noStroke();
}



class Bird {
  constructor(size, pos, vel) {
    this.size = size;
    this.pos = pos;
    this.vel = vel;
    this.acc = createVector();
    this.maxSpeed = random(2, 3);
    this.maxForce = 0.1;
  }
edges() {
if (this.pos.x < -this.size) this.pos.x = width + this.size;
if (this.pos.y < -this.size) this.pos.y = height + this.size;
if (this.pos.x > width + this.size) this.pos.x = -this.size;
if (this.pos.y > height + this.size) this.pos.y = -this.size;
}

align(birds) {
let perceptionRadius = 43;
let steering = createVector();
let total = 0;
for (let other of birds) {
let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
if (other != this && d < perceptionRadius) {
steering.add(other.vel);
total++;
}
}
if (total > 0) {
steering.div(total);
steering.setMag(this.maxSpeed);
steering.sub(this.vel);
steering.limit(this.maxForce);
}
return steering;
}

flock(birds) {
let alignment = this.align(birds);
this.acc.add(alignment);
this.edges();
}

show() {
  let chosen = chooseRandomColor();
  //stroke(chosen.colors[8]);
//  fill(1)

strokeWeight(this.size);
stroke(255);
point(this.pos.x, this.pos.y);
}

update() {
this.vel.add(this.acc);
this.vel.limit(this.maxSpeed);
// پرنده‌های کوچک: جهت افقی پرواز با بلندی صدا عوض می‌شود؛ حرکت بالا و پایین دست نمی‌خورد
if (this.size <= 3 && window.__birdDir) { const want = window.__birdDir * Math.max(0.6, Math.abs(this.vel.x)); this.vel.x += (want - this.vel.x) * 0.06; }
this.pos.add(this.vel);
this.acc.set(0, 0);
}
}

let shipGraphic; // متغیری برای ذخیره کد شیپ
let shapes = [];
let shapeSize = 250;

function createShape(index, x, y, color) {
  if (index === 0) {
    return new Circle(x, y, shapeSize, color);
  } else if (index === 1) {
    return new Line(x, y, shapeSize, color);

    
  }
}

class Circle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size/random(0.1,0.8);
    this.color = color;
    this.speed = random(-4, 4);
       // noStroke();

  }
  
  move() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }
  
  display() {
    
    
     
    
    
    fill(this.color);
        noStroke();
strokeWeight(random(0.001,0.009));
    stroke(255, 255, 255,2);


   // noFill()
   // ellipse(this.x, this.y, this.size, this.size);
  //  arc(this.x, this.y, this.size, this.size,this.size, HALF_PI);
       // rect(this.x, this.y, this.size/5, this.size*70);
    ellipse(this.x, this.y/1, this.size/300, this.size/300);
    ellipse(this.x, this.y/1, this.size/500, this.size/500);

  }
}

class Line {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size/random(0.1,0.8);
    this.color = color;
    this.speed = random(-2, 2);
  }
  
  

  
  
  
  move() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }
  
  display() {
    noStroke();
   fill(this.color);
    //strokeWeight(random(0.001,0.009));

        ellipse(this.x/2, this.y/2, this.size/500, this.size/500);

    //fill(str(random(colorset)))
   // rect(this.x, this.y, this.size, 1);
   // rect(this.x, this.y, this.size/5, this.size*12);
    ellipse(this.x, this.y/1, this.size/200, this.size/200);
    //fill(255,255,255,98)
        ellipse(this.x, this.y, this.size/400, this.size/400);

  }
}

 
class Parandeh {
constructor() {
// موقعیت اولیه و تنظیمات پرنده
this.pos = createVector(windowWidth/2, windowHeight);
this.vel = createVector(random(-2, 2), random(-2, 2));
this.acc = createVector(0, 0);
this.size = random(2, 2);
this.angle = random(TWO_PI);
this.target = createVector(0, 0);
this.dist = random(-5, 15);
this.spring = 0.01;
this.damping = 0.95;
this.maxSpeed = 4;
  this.leftImage = false; 
}
sitOnLine(lineY) {
  // calculate distance from line
  let distance = abs(this.pos.y - lineY);

  // if close enough to line, sit on it
  if (distance < this.size/2 ) {
    this.vel.mult(0);
    this.acc.mult(0);

    // curve line towards ground based on number of birds sitting on it
    let curve = 0.1 * (1 - distance / (this.size * 10));
    line(0, lineY, windowWidth, lineY + curve * windowHeight / 10);

    // sit on line for half a second before flying again
    setTimeout(() => {
      this.vel = p5.Vector.random2D().mult(this.maxSpeed);
    }, 1);
  }
}

updates() {
  // calculate target point based on angle and distance
  this.target.x = this.pos.x + cos(this.angle) * this.dist;
  this.target.y = this.pos.y + sin(this.angle) * this.dist;

  // calculate distance to target point
  let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

  // if close enough to target point, turn twice and find new target point
  if (distance < 1) {
    this.angle += 0.05;
    this.target.x = this.pos.x + cos(this.angle) * this.dist;
    this.target.y = this.pos.y + sin(this.angle) * this.dist;
    
    this.spring += random(-0.001, 0.001);
this.spring = constrain(this.spring, 0.005, 0.05)* this.dist;
    
  }

  // apply force to move towards target point
  let force = p5.Vector.sub(this.target, this.pos);
  force.mult(this.spring);
  this.acc.add(force);

  // apply damping to slow down movement
  this.vel.add(this.acc);
  this.vel.mult(this.damping);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);

  // reset acceleration
  this.acc.mult(0);

  // updates spring constant
  this.spring += random(-0.01, 0.01);
  this.spring = constrain(this.spring, 0.005, 0.03);
  if (this.pos.x < -this.size || this.pos.x > width + this.size ||
        this.pos.y < -this.size || this.pos.y > height + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = random(0, width);
        this.pos.y = height / 1;
        this.leftImage = false;
      }, 3);
    }
}
displays() {
  // check if bird is close to any lines and sit on them
 // this.sitOnLine(120);
 // this.sitOnLine(220);

  // displays bird
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.vel.heading());
 // fill(255);
    fill(colorset[3 % colorset.length]); 
  noStroke();

rect(0, -5, this.size, random(1,8));
  noStroke();
rect(0, -5, this.size, random(1,8));
  pop();
}
}

 
  
let sw;
let minDimension;


class Thread {
  constructor() {
    // موقعیت اولیه و تنظیمات نخ
    this.pos = createVector( random(0,width), random(0,height));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = random(3, 15);
    this.angle = random(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = random(5, 50);
    this.spring = 0.01;
    this.damping = 0.95;
    this.maxSpeed = 4;
    this.colorIndex = 0;
}

   applyForce(force) {
    // اعمال نیرو به نخ
    this.acc.add(force);
  }
 
update() {
// محاسبه نقطه هدف نخ
this.target.x = this.pos.x + cos(this.angle) * this.dist;
this.target.y = this.pos.y + sin(this.angle) * this.dist;
  // محاسبه فاصله از نقطه هدف
let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

// اعمال نیروی به نخ برای رسیدن به نقطه هدف
let force = p5.Vector.sub(this.target, this.pos);
force.mult(this.spring);
this.acc.add(force);
this.vel.add(this.acc);
this.vel.limit(this.maxSpeed);
this.pos.add(this.vel);
this.acc.mult(0);

// اعمال اصلاحات برای به حرکت درآوردن نخ
this.angle += 0.05;
this.spring += random(-0.001, 0.001);
this.spring = constrain(this.spring, 0.005, 0.05);
}

display() {

  // نمایش نخ
noStroke()
  push();
translate(this.pos.x, this.pos.y);
rotate(this.vel.heading());
  
  // minDimension = min(width, height)
 // stroke(255);
 // sw = map(minDimension, 300, 1000, 2, 7)
  //    strokeWeight(random(sw, 2)); // changed from 2
     // for (let j = 0; j < yoff.length; j++) {
         //stroke( 1, 1,1, 16.03);

//fill(c);
    noStroke();

rect(0, -5, this.size, random(1,10));
  noStroke();
  fill(255)  //  fill(colorset[3 % colorset.length]); 
rect(0, -5, this.size, random(1,10));



 


pop();
}
}



class Jiko {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector(random(0, width),random(0, width));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = random(5, 15);
    this.angle = random(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = random(0,5);
this.spring = 0.01;
this.damping = 0.95;
this.maxSpeed = 4;
  this.leftImage = false; 
}
sitOnLine(lineY) {
  // calculate distance from line
  let distance = abs(this.pos.y - lineY);

  // if close enough to line, sit on it
  if (distance < this.size * 20) {
    this.vel.mult(0);
    this.acc.mult(0);

    // curve line towards ground based on number of birds sitting on it
    let curve = 0.1 * (1 - distance / (this.size * 10));
    rect(0, lineY, windowWidth, lineY + curve * windowHeight / 8);

    // sit on line for half a second before flying again
    setTimeout(() => {
      this.vel = p5.Vector.random2D().mult(this.maxSpeed);
    }, 10);
  }
}

updates() {

  this.target.x = this.pos.x + cos(this.angle) * this.dist;
  this.target.y = this.pos.y + sin(this.angle) * this.dist;


  let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

  if (distance < 10) {
    this.angle += TWO_PI;
    this.target.x = this.pos.x + cos(this.angle) * this.dist;
    this.target.y = this.pos.y + sin(this.angle) * this.dist;
  }
  let force = p5.Vector.sub(this.target, this.pos);
  force.mult(this.spring);
  this.acc.add(force);
  this.vel.add(this.acc);
  this.vel.mult(this.damping);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);


  this.acc.mult(0);

  this.spring += random(-0.01, 0.01);
  this.spring = constrain(this.spring, 0.005, 0.03);
  if (this.pos.x < -this.size || this.pos.x > width + this.size ||
        this.pos.y < -this.size || this.pos.y > height + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = random(0, width);
        this.pos.y = random(0,height);
        this.leftImage = false;
      }, 3);
    }
}

displays() {
  //this.sitOnLine(-5);
  //this.sitOnLine(height+5);

 
noStroke()
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.vel.heading());
  fill(colorset[1 % colorset.length]); 
    noStroke();

 rect(0, -75, this.size, random(1,10));
  noStroke();
   //  fill(colorset[3 % colorset.length]); 
    fill(colorset[2 % colorset.length]); 

rect(0, -5, this.size, random(1,20));
  fill(255)
   rect(100, -150, this.size, random(1,30));
  noStroke();
   //  fill(colorset[3 % colorset.length]); 
  fill(1)
rect(150, -250, this.size, random(1,50));
  
  
  
  
  pop();
}
}


function drawPoints(points1, points2) {
//background(220);
stroke(0);

// define box
let boxX = windowWidth/1.8 - 192.5; // 385/2
let boxY = windowHeight/1.86 - 192.5; // 385/2
let boxWidth = 385;
let boxHeight = 385;

// draw box
noFill();
//strokeWeight(2);
//stroke(0);
//rect(boxX, boxY, boxWidth, boxHeight);




let fillRatio = 0.7;
let newPoints = addRandomPoints(points1, fillRatio);

let prevY = null;
for (let i = 0; i < points1.length; i++) {
let x = points1[i][0];
let y = points1[i][1];
  if (prevY !== null && y === prevY) {
  noStroke()
  fill(1,1,1,38)
  rect(points1[i-1][0] + boxX, points1[i-1][1] + boxY, random(1,15),random(1,5));    
}
prevY = y;
}

for (let i = 0; i < points1.length; i++) {
let x = points1[i][0];
let y = points1[i][1];
  if (prevY !== null && y === prevY) {
}
prevY = y;
}

for (var i = 0; i < points1.length; i++) {
var p = points1[i];
var angle = noise(p[0] * 0.01, p[1] * 0.01) * TWO_PI;
var dx = cos(angle) * 10;
var dy = sin(angle) * -10;
 
 
  stroke(1,1,1,50);
strokeWeight(random(0.1,2));

line(p[0] - dx + boxX, p[1] - dy + boxY, p[0] + dx + boxX, p[1] + dy + boxY);
}
}
  
  
  

function addRandomPoints(points, fillRatio = 0.7) {
  let newPoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    let current = points[i];
    let next = points[i + 1];
    newPoints.push(current);
    let dx = next[0] - current[0];
    let dy = next[1] - current[1];
    let midX = lerp(current[0], next[0], random((1-fillRatio)/2, (1+fillRatio)/2));
    let midY = lerp(current[1], next[1], random((1-fillRatio)/2, (1+fillRatio)/2));
    newPoints.push([midX, midY]);
  }
  newPoints.push(points[points.length - 1]);
  return newPoints;
}




class Kita {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector(random(windowWidth), random(windowHeight)*2);
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = random(3, 15);
    this.angle = random(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = random(10, 20);
    this.spring = 0.01;
    this.damping = 0.95;
    this.maxSpeed = 4;
             this.leftImage = false; 

  }
  keepInsideRect() {
    if (this.pos.x < windowWidth/2 - 200) {
      this.pos.x = windowWidth/2 - 200;
      this.vel.x *= -1;
    }
    if (this.pos.x > windowWidth/2 + 200) {
      this.pos.x = windowWidth/2 + 200;
      this.vel.x *= -1;
    }
    if (this.pos.y < windowHeight/2 - 200) {
      this.pos.y = windowHeight/2 - 200;
      this.vel.y *= -1;
    }
    if (this.pos.y > windowHeight/2 + 200) {
      this.pos.y = windowHeight/2 + 200;
      this.vel.y *= -1;
    }
  }
  bounceOffEdges() {
    if (this.pos.x < windowWidth + this.size/2 || this.pos.x > windowWidth/2  - this.size/2) {
      this.vel.x *= 300;
    }
    if (this.pos.y < windowHeight+ this.size/2 || this.pos.y > windowHeight/2  - this.size/2) {
      this.vel.y *= 300;
   
    }
  }

newPosition() {
  let position;
  let edge = floor(random(4));
  switch (edge) {
    case 0:
      position = createVector(random(windowWidth), -this.size);
      break;
    case 1:
      position = createVector(random(windowWidth), windowHeight + this.size);
      break;
    case 2:
      position = createVector(-this.size, random(windowHeight));
      break;
    case 3:
      position = createVector(windowWidth + this.size, random(windowHeight));
      break;
  }
  return position;
}

updates2() {
   // calculate distance to target point
      this.target.x = this.pos.x + cos(this.angle) * this.dist;
    this.target.y = this.pos.y + sin(this.angle) * this.dist;
  let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

  // if close enough to target point, turn twice and find new target point
  if (distance < 10) {
    this.angle += TWO_PI;
    this.target.x = this.pos.x + cos(this.angle) * this.dist;
    this.target.y = this.pos.y + sin(this.angle) * this.dist;
  }
 // apply force to move towards target point
  let force = p5.Vector.sub(this.target, this.pos);
  force.mult(this.spring);
  this.acc.add(force);

  // apply damping to slow down movement
  this.vel.add(this.acc);
  this.vel.mult(this.damping);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);

  // reset acceleration
  this.acc.mult(0);

  // updates2 spring constant

 this.keepInsideRect();

    // bounce off the edges
   this.bounceOffEdges();
  
  

       this.spring += random(-0.01, 0.01);
  this.spring = constrain(this.spring, 0.005, 0.03);
  if (this.pos.x < -this.size || this.pos.x > width + this.size ||
        this.pos.y < -this.size || this.pos.y > height + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = random(0, width);
        this.pos.y = random(0,height);
        this.leftImage = false;
      }, 3);
}
}

displays2() {
//fill(1)
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.vel.heading());
 // fill(255)
  noStroke();

 rect(0, -5, random(1,10), random(1,10));
  noStroke();
   //  fill(colorset[3 % colorset.length]); 
rect(0, -5, random(1,10), random(1,10));
  pop();
}
}

class Fito {
constructor() {
this.pos = createVector(random(0, width), height /1);
this.vel = createVector(random(-2, 2), random(-2, 2));
this.acc = createVector(0, 0);
this.size = random(1, 4);
this.angle = random(TWO_PI);
this.target = createVector(0, 0);
this.dist = random(1, 50);
this.spring = 0.01;
this.damping = 0.95;
this.maxSpeed = 4;
this.controlPoints = [this.pos];
for (let i = 0; i < 1; i++) {
this.controlPoints.push(
createVector(random(0, width), random(0, height))
);
}
this.controlPoints.push(createVector(0, height));
}
updateControlPoints() {
// Move control points based on velocity
for (let i = 1; i < this.controlPoints.length - 1; i++) {
let controlPoint = this.controlPoints[i];
controlPoint.add(this.vel);
// Keep control points within bounds
controlPoint.x = constrain(controlPoint.x, 0, width);
controlPoint.y = constrain(controlPoint.y, 0, height);
}
}
displayBezierCurve() {
noFill();
strokeWeight(0.2);
stroke(0);
beginShape();
for (let i = 0; i < 2; i++) {
let t = i / 2;
let point = this.bezierPoint(t);
vertex(point.x, point.y);
}
endShape();
}
bezierPoint(t) {
let n = this.controlPoints.length - 1;
let point = createVector(0, 0);
for (let i = 0; i <= n; i++) {
let b = this.bernstein(n, i, t);
let controlPoint = this.controlPoints[i];
point.x += b * controlPoint.x;
point.y += b * controlPoint.y;
}
return point;
}
bernstein(n, i, t) {
return (
this.binomialCoefficient(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i)
);
}
binomialCoefficient(n, k) {
let coeff = 1;
for (let i = n - k + 1; i <= n; i++) {
coeff *= i;
}
for (let i = 1; i <= k; i++) {
coeff /= i;
}
return coeff;
}
updates() {
this.updateControlPoints();
// calculate target point based on angle and distance
this.target.x = this.pos.x + cos(this.angle) * this.dist;
this.target.y = this.pos.y + sin(this.angle) * this.dist;

// calculate distance to target point
let distance = dist(
  this.pos.x,
  this.pos.y,
  this.target.x,
  this.target.y
);

// if close enough to target point, turn twice and find new target point
if (distance < 10) {
  this.angle += TWO_PI;
  this.target.x = this.pos.x + cos(this.angle) * this.dist;
  this.target.y = this.pos.y + sin(this.angle) * this.dist;
}

// apply force to move towards target point
let force = p5.Vector.sub(this.target, this.pos);
force.mult(this.spring);
this.acc.add(force);

// apply damping to slow down movement
// apply damping to slow down movement
this.vel.add(this.acc);
this.vel.mult(this.damping);
this.pos.add(this.vel);

// reset acceleration
this.acc.mult(0);

// reset spring constant if it goes below a certain value
if (this.spring < 0.005) {
    this.spring = random(0.005, 0.01);
}

// wrap around the screen edges
if (this.pos.x < -this.size) {
    this.pos.x = width + this.size;
}
if (this.pos.x > width + this.size) {
    this.pos.x = -this.size;
}
if (this.pos.y < -this.size) {
    this.pos.y = height + this.size;
}
if (this.pos.y > height + this.size) {
    this.pos.y = -this.size;
}
// reset spring constant if it goes below a certain value
if (this.spring < 0.005) {
this.spring = random(0.005, 0.01);
}
// wrap around the screen edges
if (this.pos.x < -this.size) {
this.pos.x = width + this.size;
} else if (this.pos.x > width + this.size) {
this.pos.x = -this.size;
}
if (this.pos.y < -this.size) {
this.pos.y = height + this.size;
} else if (this.pos.y > height + this.size) {
this.pos.y = -this.size;
}
}
displays() {
push();
translate(this.pos.x, this.pos.y);
 // blendMode(ADD);
rotate(this.vel.heading());
   fill(0)
  noStroke();

rect(0,-10, A2('k')*10,A2('k')*10);
  //fill(1,1,1,255)
  noStroke();

rect(0,-10, A2('k')*10,A2('k')*10);
//rect(0, -5, this.size, random(20, 20));
pop();
}
}
// helper function to calculate Bezier curve
function bezierPoint(points, t) {
let n = points.length - 1;
let result = createVector();
for (let i = 0; i <= n; i++) {
let coefficient = binomialCoefficient(n, i) * pow(t, i) * pow(1 - t, n - i);
result.add(p5.Vector.mult(points[i], coefficient));
}
return result;
}
// helper function to calculate binomial coefficient
function binomialCoefficient(n, k) {
let result = 1;
for (let i = 1; i <= k; i++) {
result *= (n - i + 1) / i;
}
return result;
}


class Sito {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector(random(0, width),random(0, width));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = random(3, 15);
    this.angle = random(HALF_PI);
    this.target = createVector(0, 0);
    this.dist = random(0.1, 5.4);
this.spring = 0.01;
this.damping = 0.95;
this.maxSpeed = 4;
  this.leftImage = false; 
}
sitOnLine(lineY) {
  // calculate distance from line
  let distance = abs(this.pos.y - lineY);

  // if close enough to line, sit on it
  if (distance < this.size * 2) {
    this.vel.mult(0);
    this.acc.mult(0);

    // curve line towards ground based on number of birds sitting on it
    let curve = 0.1 * (1 - distance / (this.size * 10));
    rect(0, lineY, windowWidth, lineY + curve * windowHeight / 8);

    // sit on line for half a second before flying again
    setTimeout(() => {
      this.vel = p5.Vector.random2D().mult(this.maxSpeed);
    }, 1);
  }
}

updates() {

  this.target.x = this.pos.x + cos(this.angle) * this.dist;
  this.target.y = this.pos.y + sin(this.angle) * this.dist;


  let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

  if (distance < 1) {
    this.angle += HALF_PI;
    this.target.x = this.pos.x + cos(this.angle) * this.dist;
    this.target.y = this.pos.y + sin(this.angle) * this.dist;
  }
  let force = p5.Vector.sub(this.target, this.pos);
  force.mult(this.spring);
  this.acc.add(force);
  this.vel.add(this.acc);
  this.vel.mult(this.damping);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);


  this.acc.mult(0);

  this.spring += random(-0.01, 0.01);
  this.spring = constrain(this.spring, 0.005, 0.03);
  if (this.pos.x < -this.size || this.pos.x > width + this.size ||
        this.pos.y < -this.size || this.pos.y > height + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = random(0, width);
        this.pos.y = random(0, width);
        this.leftImage = false;
      }, 3);
    }
}

displays() {
 // this.sitOnLine(120);
 // this.sitOnLine(220);
   let chosen = chooseRandomColor();

 
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.vel.heading());
   noStroke();
 
  
//fill(chosen.colors[8]);
  fill(chosen.colors[1]);
  noStroke();

  rect(50, 150, this.size, random(500,1440));
fill(chosen.colors[2]);
    noStroke();

  rect(100, -225, this.size, random(10,400));
 rect(0, -5, this.size, random(1,100));
  fill(chosen.colors[3]);
  noStroke();

rect(0, -5, this.size, random(1,200));
   //  fill(colorset[3 % colorset.length]); 
  fill(chosen.colors[4]);
  noStroke();

rect(0, -5, this.size, random(1,100));


  pop();
}
}

class Zito {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector(random(width), random(120, 220));
    this.vel = createVector(random(-2, 2), 0);
    this.acc = createVector(0, 0);
    this.size = random(3, 15);
    this.angle = random(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = random(10, 10);
    this.spring = 0.01;
    this.damping = 0.95;
    this.maxSpeed = 4;
  }
    sitOnLine(lineY) {
  // calculate distance from line
  let distance = abs(this.pos.y - lineY);

  // if close enough to line, sit on it
  if (distance < this.size * 2) {
    this.vel.mult(0);
    this.acc.mult(0);

    // curve line towards ground based on number of birds sitting on it
    let curve = 0.1 * (1 - distance / (this.size * 2));
    line(0, lineY, windowWidth, lineY + curve * windowHeight / 2);

    // sit on line for half a second before flying again
    setTimeout(() => {
      this.vel = p5.Vector.random2D().mult(this.maxSpeed);
    }, 500);
  }
}
update() {
    // calculate target point based on angle and distance
  this.target.x = this.pos.x + cos(this.angle) * this.dist;
  this.target.y = this.pos.y + sin(this.angle) * this.dist;

  // calculate distance to target point
  let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

  // if close enough to target point, turn twice and find new target point
  if (distance < 10) {
    this.angle += TWO_PI;
    this.target.x = this.pos.x + cos(this.angle) * this.dist;
    this.target.y = this.pos.y + sin(this.angle) * this.dist;
  }

  // apply force to move towards target point
  let force = p5.Vector.sub(this.target, this.pos);
  force.mult(this.spring);
  this.acc.add(force);

  // apply damping to slow down movement
  this.vel.add(this.acc);
  this.vel.mult(this.damping);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);

  // reset acceleration
  this.acc.mult(0);

  this.spring += random(-0.01, 0.01);
  this.spring = constrain(this.spring, 0.005, 0.03);
  if (this.pos.x < -this.size || this.pos.x > width + this.size ||
        this.pos.y < -this.size || this.pos.y > height + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = random(0, width);
        this.pos.y = random(0,height);
        this.leftImage = false;
      }, 3);
    }
  
}
display() {
  
   this.sitOnLine(120);
  this.sitOnLine(220);
  
push();
translate(this.pos.x, this.pos.y);
rotate(this.vel.heading());
//let lineY = this.pos.y < 170 ? 120 : 220;
  noStroke()
  fill(0)
  rect(0, 0, random(10,26), random(10,24));
 // fill(255,255,255,10)

 rect(0,-5, random(10,26), random(10,24));  
 
 rect(0, -10, random(10,26), random(10,24)); 
rect(0, -15, random(10,26), random(10,24));


pop();
}
}

function TakeـFlightـAlone2() { __waveFrame();
 // background(0);

  
      let xoff = 0.0;

  
  
   
      //df = map(mouseX, 0,255, 255, 255, 9);
      //cf = map(mouseX, 0,255, 255, 255, 255);
  
  
  
   rf = map(mouseX, 0, 600, 0, 255);
  bf = map(mouseX, 0, 600, 255, 0);
   let chosen = chooseRandomColor();
 fill(0,119,182,random(1,3));
  
         // fill(chosen.colors[10]);

//  rect(0, 0,windowWidth,windowHeight)
   minDimension = min(width, height)
 // stroke(255);
  sw = map(minDimension, 300, 1000, 2, 217)
    
  
  
  
               let r9, g9, b9, d9;
do {
  r9 = random(256);
  g9 = random(256);
  b9 = random(256);
  d9 = sqrt((r9 - 0) ** 2 + (g9 - 119) ** 2 + (b9 - 189) ** 2);
} while (d9 > 130);
noStroke()

  
    shipGraphic.stroke(255,255,255,12);
  shipGraphic.fill(r9, g9, b9, 3);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(width, height/200);
for (let x = width; x >= 0; x -= 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 0.5, height));
  vertex(x, y);
  xoff += 0.003;
}
  shipGraphic.vertex(0, height/200);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  
  
  
  
  
    shipGraphic.noStroke();
  shipGraphic.fill(255,255,255,3)
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(width, height/100);
for (let x = width; x >= 0; x -= 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 2, height));
  vertex(x, y);
  xoff += 0.003;


}
  shipGraphic.vertex(0, height/100);
  shipGraphic.endShape(CLOSE);
  
  
  shipGraphic.noStroke();
  shipGraphic.fill(rf, 0, bf,5);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(width, height/200);
for (let x = width; x >= 0; x -= 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 3, height));
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, height/200);
  shipGraphic.endShape(CLOSE);
  
  
 
  
  
  
    shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(width, 0);
for (let x = width; x >= 0; x -= 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 4, height));
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, 0);
  shipGraphic.endShape(CLOSE);
  
  let r2, g2, b2, d2;
do {
  r2 = random(256);
  g2 = random(256);
  b2 = random(256);
  d2 = sqrt((r2 - 239) ** 2 + (g2 - 35) ** 2 + (b2 - 60) ** 2);
} while (d2 > 10);
noStroke()

    shipGraphic.stroke(1,1,1,12);
  shipGraphic.fill(r2, g2, b2, 5);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, height);
for (let x = 0; x <= width; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, height/4 , height));
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(width, height);
  shipGraphic.endShape(CLOSE);
  
  
  
  
    shipGraphic.stroke(1,1,1,14);
  shipGraphic.fill(255,255,255,2);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, height);
for (let x = 0; x <= width; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, height/4 , height));
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(width, height);
  shipGraphic.endShape(CLOSE);
  
  
   shipGraphic.stroke(1,1,1,16);
  shipGraphic.fill(chosen.colors[10]);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, height);
for (let x = 0; x <= width; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, height / 2.1, height));
  vertex(x, y);
  xoff += 0.0054;
}
 shipGraphic.vertex(width, height);
  shipGraphic.endShape(CLOSE);
   shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, height);
for (let x = 0; x <= width; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, height / 2.1, height));
  vertex(x, y);
  xoff += 0.0043;
}
 shipGraphic.vertex(width, height);
  shipGraphic.endShape(CLOSE);
  
   shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, height);
for (let x = 0; x <= width; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1.4, -height , height));
  vertex(x, y);
  xoff += 0.0005;

}
 shipGraphic.vertex(width, height);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  let r4, g4, b4, d4;
  do {
    r4 = random(256);
    g4 = random(256);
    b4 = random(256);
    d4 = sqrt((r4 - 56) ** 2 + (g4 - 176) ** 2 + (b4 - 0) ** 2);
  } while (d4 > 10);
  noStroke()
  
    // ذخیره تصویر جدید شیپ
     shipGraphic.stroke(1, 1, 1, 20);
    shipGraphic. fill(colorset[2 % colorset.length]); 
    shipGraphic.beginShape(); __waveNext();
    shipGraphic.vertex(0, height);
  for (let x = 0; x <= width; x += 3) {
    let y = __wave(x, map(noise(xoff, yoff), 0, 1, height / 1.4, height));
    vertex(x, y);
    xoff += 0.0045;
  }
    shipGraphic.vertex(width, height);
    shipGraphic.endShape(CLOSE);
  
  
  
  
  
  
  
              let r3, g3, b3, d3;
do {
  r3 = random(256);
  g3 = random(256);
  b3 = random(256);
  d3 = sqrt((r3 - 204) ** 2 + (g3 - 255) ** 2 + (b3 - 51) ** 2);
} while (d3 > 20);
noStroke()
//fill(r3, g3, b3, 15);
 
  
  
 shipGraphic.stroke(1, 1, 1, 25);
  shipGraphic. fill(colorset[3 % colorset.length]); 
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, height);
for (let x = 0; x <= width; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, height / 1.4, height));
  vertex(x, y);
  xoff += 0.0045;
}
 shipGraphic.vertex(width, height);
  shipGraphic.endShape(CLOSE);
  
  
 // fill(colorset3[1 % colorset3.length]);
  
 shipGraphic.stroke(1, 1, 1, 30);
 shipGraphic. fill(colorset[4 % colorset.length]); 
 shipGraphic.beginShape(); __waveNext();
 shipGraphic.vertex(0, height);
for (let x = 0; x <= width; x += 3) {
 let y = __wave(x, map(noise(xoff, yoff), 0, 1, height / 1.4, height));
 vertex(x, y);
 xoff += 0.0045;
}
shipGraphic.vertex(width, height);
 shipGraphic.endShape(CLOSE);
  
  
 
  
  
  

  
  
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // نمایش تصویر جدید شیپ در بکگراند
  copy(shipGraphic, 0, 0, width, height, 0, 0, width, height);
  
  
  
  stroke(colorset[4 % colorset.length]);
  //stroke(0,0,0,30)
  
beginShape();
vertex(0, height);

// تعداد نقاط رندم
const numPoints = 2;

// اندازه ضخامت خطوط رندم
const minWeight = 0.1;
const maxWeight = 1;

for (let x = 0; x <= width*2; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.1, height); // foreground hill: fixed
  vertex(x, y);
  xoff += 0.3;

  // انتخاب نقاط رندم بر روی لبه شیپ
  for (let i = 0; i < numPoints; i++) {
    const px = x + random(-1, 1) * 3;
    const py = y + random(-1, 1) * 10;

    // محاسبه زاویه خط مماس با استفاده از تابع noise()
    const angle = noise(px, py) * TWO_PI;

    // محاسبه مختصات نقطه پایانی خط مماس
    const len = random(1, 130);
    const tx = px + len * cos(angle);
    const ty = py + len * sin(angle);

    // تنظیم ضخامت خطوط رندم
    const weight = random(minWeight, maxWeight);
    strokeWeight(weight);

    // رسم خط مماس
    line(px, py, tx, ty);
  }
}
vertex(width, height);
endShape(CLOSE);

  
  
  

  
  
  yoff += 0.0129;
 
  
  
  
  
  for (let bird of flock) {
    bird.flock(flock);
    bird.update();
    bird.show();
  }
  
     // پرندهٔ تکی: ارتفاعش یک‌بار تعیین می‌شود و دیگر بالا و پایین نمی‌رود (owner)
     if (window.__soloBirdY === undefined) window.__soloBirdY = map(noise(xoff, yoff), 0, 1, height / 3, height)/1.7;
     boxY = window.__soloBirdY;
  // Calculate the box's angle based on its position
  boxAngle = 45;

  // Draw the box
  push();
  // پرندهٔ تکی به‌آرامی به جلو می‌رود و دوباره به مرکز برمی‌گردد، انگار دوربین دنبالش می‌کند و به او می‌رسد:
  // a 10 s cycle — 7 s easing forward (up to 12% of the width), 3 s easing back to the centre as the "camera" catches up
  const __cyc = (millis() / 1000) % 10, __ease = (u) => u * u * (3 - 2 * u);
  const __ahead = __cyc < 7 ? __ease(__cyc / 7) : 1 - __ease((__cyc - 7) / 3);
  translate(width / 2 + width * 0.12 * __ahead, boxY);
  rotate(boxAngle);
  // fill(colorset2);

noStroke();
  let isFalling = boxY + boxHeight / 2 > height;
  if (isFalling) {
    boxY = height - boxHeight / 3;
    boxY += (height - boxY) - gravity/1.8;
  }
   
  

  

  
 
 

  //fill(colorset3[1 % colorset3.length]);
  //fill(255,255,255,238)
fill(255)
  rect(0, 0, random(1,6), random(1,14));
  fill(255,255,255,10)

 rect(0,0, random(1,6), random(1,14));  
 
 rect(0, 0, random(1,6), random(1,14)); 
rect(0, 0, random(1,6), random(1,14));
 //rect(width/2,height/2, this.size, random(0.1,5.5));
  stroke(chosen.colors[8]);
   // line(random(0,10), -10, random(1,14), random(1,14));
       



  pop();
  




  
   new Image()
}

 

  //fill(colorset3[1 % colorset3.length]);
  //fill(255,255,255,238)




  



  
function mousePressed() {
  // تغییر رنگ نخ با کلیک بر روی پالت
  for (let i = 0; i < colors.length; i++) {
    let x = 10 + i * 20;
    let y = height - 30;
    if (mouseX > x && mouseX < x + 20 && mouseY > y && mouseY < y + 20) {
      colorset.push(colorset.splice(i, 100)[0]);
      break;
    }
  }
}
class Kapa {
  constructor() {
    // موقعیت اولیه و تنظیمات نخ
    this.pos = createVector(random(0,width ), random(0,height ));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = random(3, 15);
    this.angle = random(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = random(10, 50);
    this.spring = 0.01;
    this.damping = 0.95;
    this.maxSpeed = 4;
    this.colorIndex = 0;
}

   applyForce(force) {
    // اعمال نیرو به نخ
    this.acc.add(force);
  }

  
  
update() {
// محاسبه نقطه هدف نخ
this.target.x = this.pos.x + cos(this.angle) * this.dist;
this.target.y = this.pos.y + sin(this.angle) * this.dist;
  // محاسبه فاصله از نقطه هدف
let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

// اعمال نیروی به نخ برای رسیدن به نقطه هدف
let force = p5.Vector.sub(this.target, this.pos);
force.mult(this.spring);
this.acc.add(force);
this.vel.add(this.acc);
this.vel.limit(this.maxSpeed);
this.pos.add(this.vel);
this.acc.mult(0);

// اعمال اصلاحات برای به حرکت درآوردن نخ
this.angle += 0.05;
this.spring += random(-0.001, 0.001);
this.spring = constrain(this.spring, 0.005, 0.05);
}

display() {

// نمایش نخ
  push();
translate(this.pos.x, this.pos.y);
rotate(this.vel.heading());
rect(0, -5, this.size, random(1,10));
 //rect(width/2,height/2, this.size, random(0.1,5.5));
    line(0, 0, this.size, random(1,15));
//  circle(width/2,height/2,random(2,34))
 	//textSize(10)
	//textStyle(BOLD)
	//fill(random(Atumn))
//text("WOMAN",0,0)
 // text("LIFE",20,20)
   // text("FREEDOM",40,40)

 // circle(0, 0, this.size*random (0.1,0.9));
 //circle(0, -10, this.size*random (0.1,0.9));
pop();
}
}


let tipas = [];



function mousePressed() {
  // تغییر رنگ نخ با کلیک بر روی پالت
  for (let i = 0; i < colors.length; i++) {
    let x = 10 + i * 20;
    let y = height - 30;
    if (mouseX > x && mouseX < x + 20 && mouseY > y && mouseY < y + 20) {
      colorset.push(colorset.splice(i, 100)[0]);
      break;
    }
  }
}

const w = 400; // یک مقدار ثابت برای عرض صفحه
const h = 400; // یک مقدار ثابت برای ارتفاع صفحه

class Tipa {
  constructor() {
    // موقعیت اولیه و تنظیمات نخ
    this.pos = createVector(random(0,width ), random(0,height ));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = random(3, 15);
    this.angle = random(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = random(10, 50);
    this.spring = 0.01;
    this.damping = 0.95;
    this.maxSpeed = 4;
    this.colorIndex = 0;
}

   applyForce(force) {
    // اعمال نیرو به نخ
    this.acc.add(force);
  }

  
  
update() {
// محاسبه نقطه هدف نخ
this.target.x = this.pos.x + cos(this.angle) * this.dist;
this.target.y = this.pos.y + sin(this.angle) * this.dist;
  // محاسبه فاصله از نقطه هدف
let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

// اعمال نیروی به نخ برای رسیدن به نقطه هدف
let force = p5.Vector.sub(this.target, this.pos);
force.mult(this.spring);
this.acc.add(force);
this.vel.add(this.acc);
this.vel.limit(this.maxSpeed);
this.pos.add(this.vel);
this.acc.mult(0);

// اعمال اصلاحات برای به حرکت درآوردن نخ
this.angle += 0.05;
this.spring += random(-0.001, 0.001);
this.spring = constrain(this.spring, 0.005, 0.05);
}

display() {

// نمایش نخ
  push();
translate(this.pos.x, this.pos.y);
rotate(this.vel.heading());
rect(0, -5, this.size, random(1,10));
 //rect(width/2,height/2, this.size, random(0.1,5.5));
    line(0, 0, this.size, random(1,15));
//  circle(width/2,height/2,random(2,34))
 	//textSize(10)
	//textStyle(BOLD)
	//fill(random(Atumn))
//text("WOMAN",0,0)
 // text("LIFE",20,20)
   // text("FREEDOM",40,40)

 // circle(0, 0, this.size*random (0.1,0.9));
 //circle(0, -10, this.size*random (0.1,0.9));
pop();
}
}

 




function adjustColors() {
  let image = document.getElementById("image");
  let canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  let context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = imageData.data;

  let currentColors = chooseRandomColor().colors;
  let darkestColor = currentColors[0];
  let lightestColor = currentColors[currentColors.length - 1];
  let colorRange = chroma.scale([darkestColor, lightestColor]);

  let numPixelsToAdjust = Math.floor(pixels.length * 0.1);
  let numPixelsAdjusted = 0;

  // Find the index of the bottom 50 pixels
  let bottomPixelIndex = canvas.width * (canvas.height - 50) * 4;

  // Blur the pixels in the top 50 pixels and bottom 50 pixels of the image
  for (let i = 0; i < pixels.length; i += 4) {
    let y = Math.floor((i / 4) / canvas.width);
    if (y < 100 || y > canvas.height - 100) {
      let r = Math.max(0, pixels[i] - 50);
      let g = Math.max(0, pixels[i + 1] - 300);
      let b = Math.max(0, pixels[i + 2] - 300);
      pixels[i] = r;
      pixels[i + 1] = g;
      pixels[i + 2] = b;
    }
  }

  let pixelColors = getPixelColors(pixels, canvas.width, canvas.height);
  let colorGroups = groupColors(pixelColors);
  for (let i = 0; i < colorGroups.length; i++) {
    let group = colorGroups[i];
    if (group.length > 1) {
      let baseColor = chroma(group[0]);
      for (let j = 0; j < group.length; j++) {
        let color = chroma(group[j]);
        let colorDistance = chroma.distance(baseColor, color, "lab");
        if (colorDistance < 2) {
          let newColor = colorRange(Math.random());
          pixels[group[j].index] = newColor.rgb()[0];
          pixels[group[j].index + 1] = newColor.rgb()[1];
          pixels[group[j].index + 2] = newColor.rgb()[2];
          numPixelsAdjusted++;
          if (numPixelsAdjusted >= numPixelsToAdjust) {
            break;
          }
        }
      }
      if (numPixelsAdjusted >= numPixelsToAdjust) {
        break;
      }
    }
  }

  
function isEdgeColorGroup(group, width, height) {
  return group.some(function(pixel) {
    let x = pixel.index / 4 % width;
    let y = Math.floor(pixel.index / 4 / width);
    return x == 0 || x == width - 1 || y == 0 || y == height - 1;
  });
}
  // Calculate dynamic range
let minLuminance = 255;
let maxLuminance = 0;
for (let i = 0; i < pixels.length; i += 4) {
let luminance = 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
if (luminance < minLuminance) {
minLuminance = luminance;
}
if (luminance > maxLuminance) {
maxLuminance = luminance;
}
}
let dynamicRange = maxLuminance - minLuminance;
  // Adjust brightness and contrast to maximize dynamic range
// Adjust brightness and contrast
for (let i = 0; i < pixels.length; i += 4) {
  let r = pixels[i];
  let g = pixels[i + 1];
  let b = pixels[i + 2];
  let a = pixels[i + 3];
  
  // Calculate luminance
  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
  // Adjust dynamic range
  let minLuminance = 0;
  let maxLuminance = 255;
  let range = maxLuminance - minLuminance;
  let normalizedLuminance = (luminance - minLuminance) / range;
  let adjustedLuminance = Math.pow(normalizedLuminance, 1.5) * range + minLuminance;
  let adjustmentFactor = adjustedLuminance / luminance;
  
  // Apply brightness and contrast adjustments
  r = Math.max(0, Math.min(255, (r - 128) * contrast + 128 + brightness) * adjustmentFactor);
  g = Math.max(0, Math.min(255, (g - 128) * contrast + 128 + brightness) * adjustmentFactor);
  b = Math.max(0, Math.min(255, (b - 128) * contrast + 128 + brightness) * adjustmentFactor);
  
  pixels[i] = r;
  pixels[i + 1] = g;
  pixels[i + 2] = b;
}

// Apply focus and blur effects
let blurRadius = 15;
let blurMatrix = [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ];
let blurDivisor = 9;
let blurBias = 0;
pixels = convolution(pixels, canvas.width, canvas.height, blurMatrix, blurDivisor, blurBias);

context.putImageData(imageData, 0, 0);
let newImage = new Image();
newImage.src = canvas.toDataURL();
newImage.id = "image";
image.parentNode.replaceChild(newImage, image);


}

function getPixelColors(pixels, width, height) {
  let pixelColors = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (y * width + x) * 4;
      pixelColors.push({
        r: pixels[index],
        g: pixels[index + 1],
        b: pixels[index + 2],
        index: index
      });
    }
  }
  return pixelColors;
}




// helper function for clamping value to 0

let secondCanvas;





function getPixelColors(pixels, width, height) {
  let pixelColors = [];
  for (let i = 0; i < pixels.length; i += 4) {
    let color = chroma(pixels[i], pixels[i + 1], pixels[i + 2]);
    pixelColors.push({
      color: color,
      index: i
    });
  }
  return pixelColors;
}


