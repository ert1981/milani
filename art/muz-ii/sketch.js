

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
let currentColors = null;

function chooseRandomAColor() {
  if (currentColors == null) {
    let randomIndex = Math.floor(Math.random() * Acolors.length);
    let chosenAColor = Acolors[randomIndex];
    let randomColors = [];
    for (let i = 0; i < 90; i++) {
      randomColors.push(chosenAColor.func());
    }
    currentColors = {name: chosenAColor.name, Acolors: randomColors};
  }
  return currentColors;
}
function Acolor1() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 38) ** 2 + (g - 70) ** 2 + (b - 83) ** 2);
  } while (d > 90);
  return color(r, g, b,random(220, 255));
}

function Acolor2() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 42) ** 2 + (g - 157) ** 2 + (b - 143) ** 2);
  } while (d > 90);
  return color(r, g, b,random(220, 255));
}

function Acolor3() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 233) ** 2 + (g - 196) ** 2 + (b - 106) ** 2);
  } while (d > 90);
  return color(r, g, b,random(220, 255));
}

function Acolor4() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 244) ** 2 + (g - 162) ** 2 + (b - 97) ** 2);
  } while (d > 90);
  return color(r, g, b,random(220, 255));
}

function Acolor5() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 231) ** 2 + (g - 111) ** 2 + (b - 81) ** 2);
  } while (d > 90);
  return color(r, g, b,random(220, 255));
}

let Acolors = [
  {name: 'color1', func: Acolor1},
  {name: 'color2', func: Acolor2},
  {name: 'color3', func: Acolor3},
  {name: 'color4', func: Acolor4},
  {name: 'color5', func: Acolor5},
  
 

];






function getRandomColor() {
  let r, g, b, d, chosenColor;
   const colorsl  = [
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
    const randomIndex = Math.floor(Math.random() * colors.length);
    const { r: rVal, g: gVal, b: bVal } = colors[randomIndex];
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - rVal) ** 2 + (g - gVal) ** 2 + (b - bVal) ** 2);
    chosenColor = color(r, g, b, random(100, 255));
  } while (d > 50);
  
  return chosenColor;

}



let colorset3 = [];
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



let colorset = [];
//let colorbg = "1C2611-2B4016-261416-031740".split("-").map((a) => "#" + a); // dark

let originalGraphics;
let lineGraphics;

//let b = ["#000"];



        let colorbg;



let angle = 0;





//////


let mySong;
let amp;
let fft;
let numBins = 128;
let palette = [];

let shouldAnimate = true;




let myFont;


let mySongs = [
  "a/b1.mp3"
];

function preload() {
   
  // [MuzSound] به‌جای loadSound (بارگذاری ۳ مگابایت mp3 که شروع را کند می‌کرد) یک آهنگ تنبل؛
  // فقط بیرون از Grokly و پس از کلیک پخش می‌شود (muz-sound.js)
  for (let i = 0; i < mySongs.length; i++) {
    songs[i] = MuzSound.song;
  }

  mySong = songs[0]; // موزیک پیش‌فرض
}


function gk() {
  createCanvas(800, 800);
  mySong.play();
  // [MuzSound] تحلیل‌گر ساکت و بی‌هزینه؛ صدا فقط از راه هوک‌های MuzSound به لایه‌های مجاز می‌رسد
  fft = MuzSound.fft;
  amp = MuzSound.amp;

  for (let i = 0; i < 6; i++) {
    palette.push(getRandomColor());
  }
}

function DB1() {
  let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 10, 150);
  let bg = map(level, 0, 0.8, 50, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[1]);
    noStroke();
    rect(i * width / palette.length, 0, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    rect(x, height, width / bins.length, h);
  }
}

function getRandomColor() {
 
   const colorValues = [
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
  const randomIndex = Math.floor(Math.random() * colorValues.length);
  const { r: rVal, g: gVal, b: bVal } = colorValues[randomIndex];
  const r = random(rVal - 30, rVal + 30);
  const g = random(gVal - 30, gVal + 30);
  const b = random(bVal - 30, bVal + 30);
  const alpha = random(0, 50);
  return color(r, g, b, alpha);
}


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
let currentColor = null;


function color1() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 38) ** 2 + (g - 70) ** 2 + (b - 83) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color2() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 42) ** 2 + (g - 157) ** 2 + (b - 143) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color3() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 233) ** 2 + (g - 196) ** 2 + (b - 106) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color4() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 244) ** 2 + (g - 162) ** 2 + (b - 97) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color5() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 231) ** 2 + (g - 111) ** 2 + (b - 81) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color6() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 142) ** 2 + (g - 202) ** 2 + (b - 230) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color7() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 33) ** 2 + (g - 158) ** 2 + (b - 188) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color8() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 2) ** 2 + (g - 48) ** 2 + (b - 71) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color9() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 255) ** 2 + (g - 183) ** 2 + (b - 3) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color10() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 251) ** 2 + (g - 133) ** 2 + (b - 0) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}




function color11() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 230) ** 2 + (g - 57) ** 2 + (b - 70) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color12() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 241) ** 2 + (g - 250) ** 2 + (b - 238) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color13() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 168) ** 2 + (g - 218) ** 2 + (b - 220) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color14() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 69) ** 2 + (g - 123) ** 2 + (b - 157) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color15() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 29) ** 2 + (g - 53) ** 2 + (b - 87) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color16() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 244) ** 2 + (g - 241) ** 2 + (b - 222) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color17() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 224) ** 2 + (g - 122) ** 2 + (b - 95) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color18() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 61) ** 2 + (g - 64) ** 2 + (b - 91) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color19() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 129) ** 2 + (g - 178) ** 2 + (b - 154) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color20() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 242) ** 2 + (g - 204) ** 2 + (b - 143) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color21() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 255) ** 2 + (g - 190) ** 2 + (b - 11) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color22() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 251) ** 2 + (g - 86) ** 2 + (b - 7) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}




function color23() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 255) ** 2 + (g - 0) ** 2 + (b - 110) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color24() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 131) ** 2 + (g - 178) ** 2 + (b - 56) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color25() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 58) ** 2 + (g - 134) ** 2 + (b - 255) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color26() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 255) ** 2 + (g - 205) ** 2 + (b - 162) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color27() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 255) ** 2 + (g - 180) ** 2 + (b - 7) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}




function color28() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 229) ** 2 + (g - 152) ** 2 + (b - 155) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color29() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 181) ** 2 + (g - 131) ** 2 + (b - 141) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color30() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 109) ** 2 + (g - 104) ** 2 + (b - 117) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color31() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 0) ** 2 + (g - 109) ** 2 + (b - 119) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color32() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 131) ** 2 + (g - 197) ** 2 + (b - 190) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}



function color33() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 237) ** 2 + (g - 246) ** 2 + (b - 249) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color34() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 255) ** 2 + (g - 221) ** 2 + (b - 210) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color35() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 226) ** 2 + (g - 149) ** 2 + (b - 120) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}



function color36() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 239) ** 2 + (g - 71) ** 2 + (b - 111) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color37() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 255) ** 2 + (g - 209) ** 2 + (b - 102) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}



function color38() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 6) ** 2 + (g - 214) ** 2 + (b - 160) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color39() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 17) ** 2 + (g - 138) ** 2 + (b - 178) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color40() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 7) ** 2 + (g - 59) ** 2 + (b - 76) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color41() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 13) ** 2 + (g - 65) ** 2 + (b - 225) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color42() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 12) ** 2 + (g - 99) ** 2 + (b - 231) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color43() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 10) ** 2 + (g - 133) ** 2 + (b - 237) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color44() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 9) ** 2 + (g - 166) ** 2 + (b - 243) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color45() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 7) ** 2 + (g - 200) ** 2 + (b - 249) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color46() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 247) ** 2 + (g - 178) ** 2 + (b - 103) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color47() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 247) ** 2 + (g - 157) ** 2 + (b - 101) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}


function color48() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 244) ** 2 + (g - 132) ** 2 + (b - 95) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color49() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 242) ** 2 + (g - 112) ** 2 + (b - 89) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}

function color50() {
  let r, g, b, d;
  do {
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - 242) ** 2 + (g - 92) ** 2 + (b - 84) ** 2);
  } while (d > 90);
  return color(r, g, b,random(100, 255));
}
let colors = [
  {name: 'color1', func: color1},
  {name: 'color2', func: color2},
  {name: 'color3', func: color3},
  {name: 'color4', func: color4},
  {name: 'color5', func: color5},
  
  {name: 'color6', func: color6},
  {name: 'color7', func: color7},
  {name: 'color8', func: color8},
  {name: 'color9', func: color9},
  {name: 'color10',func: color10},

 {name: 'color11', func: color11},
  {name: 'color12', func: color12},
  {name: 'color13', func: color13},
  {name: 'color14', func: color14},
  {name: 'color15', func: color15},

 {name: 'color16', func: color16},
  {name: 'color17', func: color17},
  {name: 'color18', func: color18},
  {name: 'color19', func: color19},
  {name: 'color20', func: color20},

 {name: 'color21', func: color21},
  {name: 'color22', func: color22},
  {name: 'color23', func: color23},
  {name: 'color24', func: color24},
  {name: 'color25', func: color25},

 {name: 'color26', func: color26},
  {name: 'color27', func: color27},
  {name: 'color28', func: color28},
  {name: 'color29', func: color29},
  {name: 'color30', func: color30},

 {name: 'color31', func: color31},
  {name: 'color32', func: color32},
  {name: 'color33', func: color33},
  {name: 'color34', func: color34},
  {name: 'color35', func: color35},

 {name: 'color36', func: color36},
  {name: 'color37', func: color37},
  {name: 'color38', func: color38},
  {name: 'color39', func: color39},
  {name: 'color40', func: color40},


 {name: 'color41', func: color41},
  {name: 'color42', func: color42},
  {name: 'color43', func: color43},
  {name: 'color44', func: color44},
  {name: 'color45', func: color45},


 {name: 'color46', func: color46},
  {name: 'color47', func: color47},
  {name: 'color48', func: color48},
  {name: 'color49', func: color49},
  {name: 'color50', func: color50}

];

let randomNumber;

function generateRandomNumber3() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}


function generateRandomNumber2() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber2 = Math.floor(Math.random() * 50) + 12; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber2;
}
let songs = [];
let W; 
let WHalf;
let t = 0;
let PD = [];
let PD2 = [];
let PD3 = [];
let PDg = [];
let PDe = [];
let PD02 = [];
const P4 = [];
let PD08 = [];
let PD208 = [];
let PD308 = [];
let PDg08 = [];
let PDe08 = [];
let size = 100; // اندازه استراک
let thickness = 5; // زخامت استراک

function setup() {
  createCanvas(windowWidth, windowHeight);
  W = min(windowWidth, windowHeight);
  WHalf = W / 2;
  
      colors2 = random([colors_tone1,colors_tone2,colors_tone3,colors_tone4,colors_tone5,colors_tone6,colors_tone7,colors_tone8,colors_tonea1,colors_tonea2,colors_tonea3,colors_tonea4,colors_tonea5,colors_tonea6,colors_tonea7,colors_tonea8,colors_tonea9,colors_tonea10,colors_tonea11,colors_tonea12,colors_tonea13,colors_tonea14,colors_tonea15,colors_tonea16,colors_tonea17,colors_tonea18,colors_tonea19,colors_tonea20,colors_tonea21,colors_tonea22,colors_tonea23,colors_tonea24,colors_tonea25,colors_tonea26,colors_tonea27,colors_tonea28,colors_tonea29,colors_tone9, colors_tone10, colors_tone11, colors_tone12, colors_tone13,colors_tone14,colors_tone15,colors_tone16,colors_tone17,colors_tone18,colors_tone19,colors_tone20,colors_tone21,colors_tone22,colors_tone23,colors_tone24,colors_tone25,colors_tone26,colors_tone27,colors_tone28,colors_tone29 ,colors_b1,colors_b2,colors_b3,colors_b4,colors_b5,colors_b6,colors_b7,colors_b8,colors_b9,colors_b10,colors_b11,colors_b12,colors_b13,colors_b14,colors_b15,colors_b16,colors_b17,colors_b18,colors_b19,colors_b20,colors_b21,colors_b22,colors_b23 ]);
       colors3 = random([colors_tone9, colors_tone10, colors_tone11, colors_tone12, colors_tone13,colors_tone14,colors_tone15,colors_tone16,colors_tone17,colors_tone18,colors_tone19,colors_tone20,colors_tone21,colors_tone22,colors_tone23,colors_tone24,colors_tone25,colors_tone26,colors_tone27,colors_tone28,colors_tone29 ]);
       colors4 = random([ colors_b1,colors_b2,colors_b3,colors_b4,colors_b5,colors_b6,colors_b7,colors_b8,colors_b9,colors_b10,colors_b11,colors_b12,colors_b13,colors_b14,colors_b15,colors_b16,colors_b17,colors_b18,colors_b19,colors_b20,colors_b21,colors_b22,colors_b23]);
   
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
     colorset[10] = random(colors2);
     colorset[11] = random(colors2);
     colorset[12] = random(colors2);
     colorset[13] = random(colors2);
     colorset[14] = random(colors2);
     colorset[15] = random(colors2);
     colorset[16] = random(colors2);
     colorset[17] = random(colors2);
     colorset[18] = random(colors2);
     colorset[19] = random(colors2);
     colorset[20] = random(colors2);
     colorset[21] = random(colors2);
     colorset[22] = random(colors2);
     colorset[23] = random(colors2);
     colorset[24] = random(colors2);
     colorset[25] = random(colors2);
     colorset[26] = random(colors2);
     colorset[27] = random(colors2);
     colorset[28] = random(colors2);
     colorset[29] = random(colors2);
     colorset[30] = random(colors2);
     colorset[31] = random(colors2);
     colorset[32] = random(colors2);
     colorset[33] = random(colors2);
     colorset[34] = random(colors2);
     colorset[35] = random(colors2);
     colorset[36] = random(colors2);
     colorset[37] = random(colors2);
     colorset[38] = random(colors2);
     colorset[39] = random(colors2);
     colorset[40] = random(colors2);
     colorset[41] = random(colors2);
     colorset[42] = random(colors2);
     colorset[43] = random(colors2);
     colorset[44] = random(colors2);
     colorset[45] = random(colors2);
     colorset[46] = random(colors2);
     colorset[47] = random(colors2);
     colorset[48] = random(colors2);
     colorset[49] = random(colors2);
     colorset[50] = random(colors2);
     colorset[51] = random(colors2);
     colorset[52] = random(colors2);
     colorset[53] = random(colors2);
     colorset[54] = random(colors2);
     colorset[55] = random(colors2);
     colorset[56] = random(colors2);
     colorset[57] = random(colors2);
     colorset[58] = random(colors2);
     colorset[59] = random(colors2);
     colorset[60] = random(colors2);
     colorset[61] = random(colors2);
     colorset[62] = random(colors2);
     colorset[63] = random(colors2);
     colorset[64] = random(colors2);
     colorset[65] = random(colors2);
     colorset[66] = random(colors2);
     colorset[67] = random(colors2);
     colorset[68] = random(colors2);
     colorset[69] = random(colors2);
     colorset[70] = random(colors2);
     colorset[71] = random(colors2);
     colorset[72] = random(colors2);
     colorset[73] = random(colors2);
     colorset[74] = random(colors2);
     colorset[75] = random(colors2);
     colorset[76] = random(colors2);
     colorset[77] = random(colors2);
     colorset[78] = random(colors2);
     colorset[79] = random(colors2);
     colorset[80] = random(colors2);
//colorbg = random(colorset);
(colorbg);
  
  
   //
     // ////////background(colorbg)
  //
//colorbg = random(colorset);
(colorbg); 

 for (let i = 0; i < 50; i++) {
    colorsl.push(getRandomColor(i));
  }
  

  
  
  PD02 = new Array(12).fill().map((_, i) => {
    const v = random(0, 250);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  PD = new Array(10).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD2 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD3 = new Array(12).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  PDg = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
         x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  PDk = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
    x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
PDe = new Array(5).fill().map((_, i) => {
    const v = random(1, 10);
    return {
      i,
        x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  PD01 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD201 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD301 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  PDg01 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  PDk01 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
PDe01 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  PD07 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD207 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD307 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  PDk07 = new Array(50).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  PDk07 = new Array(50).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
PDe07 = new Array(5).fill().map((_, i) => {
    const v = random(1, 10);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   PD08 = new Array(60).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD208 = new Array(60).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD308 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  PDg08 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  PDk08 = new Array(50).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
PDe08 = new Array(50).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   PD12 = new Array(10).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD212 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD312 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  // [fix] قطعیت در هر اندازه: تعداد عددهای تصادفی مصرف‌شده دیگر به پهنای بوم بستگی ندارد (مرجع ۵۴۰px)؛
  // پیش‌تر همین بذر در پیش‌نمایش ۵۴۰ و خروجی ۱۰۸۰ یا افقی، اثر دیگری می‌ساخت
  PDg12 = MuzSound.stableArray(width * 3, 540 * 3, (i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0,windowWidth),
      y: 0,
      size: v / 2
    };
  });
  PD13 = new Array(19).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   PD213 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD313 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  PD14 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   PD214 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD314 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  PD15 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   PD215 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD315 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD16 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   PD216 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD3 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  PD17 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
  for (let i = 0; i < 50; i++) {
    rang20.push(getRandomBColorCq());
  }
   PD217 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD317 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
    PDe17 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(windowWidth/2, windowWidth/3),
      y: random(windowHeight/1, windowHeight/3),
      size: v / 2
    };
  });
   PD18 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   PD218 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD318 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD22 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   PD222 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD322 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  PD23 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   PD223 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD323 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  PD24 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   PD224 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD324 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  MJ3 = new Array(50).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   MJ32 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JM4 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JM42 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM43 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   MJ33 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(2, 5);
    let l = random(1, 100);
    let ang = random(TWO_PI);
    let rnd = int(random(3));
    let m = new Jlod(x,y, d, l, ang, rnd);
    Jlos.push(m);
  }
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(20, 100);
    let l = random(50, 500);
    let ang = random(TWO_PI);
    let rnd = int(random(3));
    let m = new Mover(x,y, d, l, ang, rnd);
    movers.push(m);
  }
   for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(1, 20);
    let l = random(50, 500);
    let ang = random(TWO_PI);
    let rnd = int(random(3));
    let m = new ritoD(x,y, d, l, ang, rnd);
    rito.push(m);
  }
  for (let i = 0; i < 50; i++) {
    rangiDB.push(getRandomBColorA());
  }
   for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(1, 120);
    let l = random(2, 20);
    let ang = random(TWO_PI);
    let rnd = int(random(13));
    let m = new titoE(x,y, d, l, ang, rnd);
    tito.push(m);
  }
  for (let i = 0; i < 50; i++) {
    rangiDBC.push(getRandomBColorA());
  }
 



  
    
  
  // [MuzSound] تحلیل‌گر ساکت و بی‌هزینه؛ صدا فقط از راه هوک‌های MuzSound به لایه‌های مجاز می‌رسد
  fft = MuzSound.fft;
  amp = MuzSound.amp;

  for (let i = 0; i < 10; i++) {
    palette.push(getRandomColor());
 
  }
  

  // create sand grains
  for (let i = 0; i < 15; i++) {
    let x = random(width);
    let y = random(height);
    sandGrains.push(new SandGrain(x, y));
  }
  
  // create air bubbles
  for (let i = 0; i < 15; i++) {
    let x = random(width);
    let y = random(height);
    airBubbles.push(new AirBubble(x, y));
  }
   PD30 = new Array(10).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD230 = new Array(60).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   PD330 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  PDg30 = new Array(50).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  PDk = new Array(50).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
PDe30 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  QR10 = new Array(10).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   QR102 = new Array(60).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   QR103 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  QR10g = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  QR10k = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
QR10e = new Array(300).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   QR11 = new Array(10).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   QR112 = new Array(60).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   QR113 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  QR11g = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  QR11k = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
QR11e = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  QP1 = new Array(60).fill().map((_, i) => {
    const v = random(20, 950);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   QP12 = new Array(60).fill().map((_, i) => {
    const v = random(20, 950);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   QP13 = new Array(30).fill().map((_, i) => {
    const v = random(20, 950);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  QP1g = new Array(300).fill().map((_, i) => {
    const v = random(20, 950);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  QP1k = new Array(500).fill().map((_, i) => {
    const v = random(20, 950);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
QP1e = new Array(300).fill().map((_, i) => {
    const v = random(20, 950);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  JM1 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JM12 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM13 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JM2 = new Array(15).fill().map((_, i) => {
    const v = random(1, 50);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JM22 = new Array(8).fill().map((_, i) => {
    const v = random(1, 50);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM23 = new Array(8).fill().map((_, i) => {
    const v = random(1, 50);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JM5 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JM52 = new Array(18).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM53 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JM6 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JM62 = new Array(18).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
         x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM63 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
        x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM7 = new Array(40).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JM72 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM73 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM8 = new Array(10).fill().map((_, i) => {
    const v = random(20,55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  
   JM82 = new Array(20).fill().map((_, i) => {
    const v = random(20,55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM83 = new Array(30).fill().map((_, i) => {
    const v = random(20,55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  // [fix] قطعیت در هر اندازه: تعداد عددهای تصادفی مصرف‌شده دیگر به پهنای بوم بستگی ندارد (مرجع ۵۴۰px)؛
  // پیش‌تر همین بذر در پیش‌نمایش ۵۴۰ و خروجی ۱۰۸۰ یا افقی، اثر دیگری می‌ساخت
  JM8g = MuzSound.stableArray(width * 3, 540 * 3, (i) => {
    const v = random(20,55);
    return {
      i,
      x: random(0,windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JM10 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM102 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM103 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  JM10g = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
    x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JM10k = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
   JM11 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM112 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM113 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  JM11g = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
    x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JM11k = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
   JM12 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM122 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM123 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  JM12g = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
    x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JM12k = new Array(2400).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JM13A = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM13A2 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM13A3 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  JM13Ag = new Array(300).fill().map((_, i) => {
    const v = random(99, 900);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  JM13Ak = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JM14B = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM14B2 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM14B3 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  JM14Bg = new Array(300).fill().map((_, i) => {
    const v = random(99, 900);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  JM15C = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM15C2 = new Array(60).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM15C3 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });

   
  JM15Cg = new Array(300).fill().map((_, i) => {
    const v = random(99, 900);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  JM15Ck = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JM14Bk = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JM16X = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM16X2 = new Array(60).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JM16X3 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  JM16Xg = new Array(300).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  JM16Xk = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
  
  JMxex1 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JMxex12 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex13 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JMxex2 = new Array(15).fill().map((_, i) => {
    const v = random(1, 50);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JMxex22 = new Array(8).fill().map((_, i) => {
    const v = random(1, 50);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex23 = new Array(8).fill().map((_, i) => {
    const v = random(1, 50);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JMxex5 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JMxex52 = new Array(18).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex53 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JMxex6 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JMxex62 = new Array(18).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
         x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex63 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
        x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex7 = new Array(40).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 1
    };
  });
   JMxex72 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex73 = new Array(8).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex8 = new Array(10).fill().map((_, i) => {
    const v = random(20,55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  
   JMxex82 = new Array(20).fill().map((_, i) => {
    const v = random(20,55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex83 = new Array(30).fill().map((_, i) => {
    const v = random(20,55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  // [fix] قطعیت در هر اندازه: تعداد عددهای تصادفی مصرف‌شده دیگر به پهنای بوم بستگی ندارد (مرجع ۵۴۰px)؛
  // پیش‌تر همین بذر در پیش‌نمایش ۵۴۰ و خروجی ۱۰۸۰ یا افقی، اثر دیگری می‌ساخت
  JMxex8g = MuzSound.stableArray(width * 3, 540 * 3, (i) => {
    const v = random(20,55);
    return {
      i,
      x: random(0,windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JMxex10 = new Array(15).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex102 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex103 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  JMxex10g = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
    x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JMxex10k = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
   JMxex11 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex112 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex113 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  JMxex11g = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
    x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JMxex11k = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
   JMxex12 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex122 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex123 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   
  JMxex12g = new Array(100).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
    x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
  JMxex12k = new Array(2400).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JMxex13A = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex13A2 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex13A3 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  JMxex13Ag = new Array(300).fill().map((_, i) => {
    const v = random(99, 900);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  JMxex13Ak = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JMxex14B = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex14B2 = new Array(20).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex14B3 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  JMxex14Bg = new Array(300).fill().map((_, i) => {
    const v = random(99, 900);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  JMxex15C = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex15C2 = new Array(60).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex15C3 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  JMxex15Cg = new Array(300).fill().map((_, i) => {
    const v = random(99, 900);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  JMxex15Ck = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JMxex14Bk = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
  JMxex16X = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex16X2 = new Array(60).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      size: v / 2
    };
  });
   JMxex16X3 = new Array(30).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
   
  JMxex16Xg = new Array(300).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
      x: random(-windowWidth, windowWidth*2),
      y: random(-windowHeight, windowHeight*2),
      size: v / 2
    };
  });
  JMxex16Xk = new Array(500).fill().map((_, i) => {
    const v = random(10, 55);
    return {
      i,
     x: random(0, windowWidth),
      y: 0,
      size: v / 2
    };
  });
   rectMode(CENTER);  
    circlePos = createVector(windowWidth/2.6, windowHeight/3);
    circleVel = createVector(0, 0);
    circleAcc = createVector(0, 0);
     
// تعریف نقاط کنترلی برای منحنی بیضی
let x1 = width / 3;
let y1 = height;
let x2 = width / 3 * 2;
let y2 = height;
let x3 = width;
let y3 = height / 3;
let x4 = width;
let y4 = height / 3 * 2;
let x5 = width / 3 * 2;
let y5 = 0;
let x6 = width / 3;
let y6 = 0;
controlPoints = [createVector(x1, y1), createVector(x2, y2), createVector(x3, y3), createVector(x4, y4), createVector(x5, y5), createVector(x6, y6)];
for (let i = 0; i < random(2, 20); i++) {
let parandeh = new Parandeh();
parandehs.push(parandeh);
     let galin = new Galin();
    galins.push(galin);
}

  let chosen = chooseRandomColor();
  randomColor = chosen.name;
// //background(chosen.colors[12]);
 //background(255,255,255,2);
  noStroke();
 // fill(255,255,255,200);
  stroke(1)
  strokeWeight(random(1,20));
  // rect(0,0,windowWidth, windowHeight);
  noStroke();
  

     for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let colorIndex = floor(random(colorsq.length));
    let shapeIndex = floor(random(2));
    let shape = createShape(shapeIndex, x, y, colorsq[colorIndex]);
    shapes.push(shape);
  }


 
 
   for (let i = 0; i < numCircles; i++) {
    let circled = new Circled(random(0, windowWidth), random(0, windowHeight), random(10, 20));
    circles.push(circled);
  }
  
  // ایجاد پرنده های مختلف
 

threadSpacing = width / (numThreads - random(-100,100)); // محاسبه فاصله بین نخ‌ها
for (let i = 0; i < numThreads; i++) {
let thread = new Thread(i * threadSpacing); // ایجاد نخ با موقعیت مشخص
threads.push(thread);
}
   // [fix] قطعیت در هر اندازه (مانند بالا): مصرف تصادفی همیشه به اندازهٔ پهنای مرجع ۵۴۰px
   threadsw = MuzSound.stableArray(Math.ceil(width / spacing), Math.ceil(540 / spacing), (i) => new Threadd(i * spacing));
  
  //colorMode(HSB, 20);
cols = floor(width / scl);
rows = floor(height / scl);
flowfield = new Array(cols * rows);
for (let i = 0; i < 300; i++) {
particles[i] = new Particle();
}
  

}
let PD01 = [];
let PD201 = [];
let PD301 = [];
let PDg01 = [];
let PDe01 = [];

function generateRandomNumber3() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}


function generateRandomNumber2() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber2 = Math.floor(Math.random() * 50) + 12; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber2;
}
//stroke(str(random(colorset)))
function OD() {

   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
 
  for (let i = 0; i < palette.length; i++) {

    strokeWeight(lightColor/2);
    
  }
// رسم دانه‌های شن با رنگ‌های متفاوت
for (let i = 0; i < sandGrains.length; i++) {
//strokeWeight(random(1,15));
fill(colorset[i % colorset.length]);
stroke(colorset[i % colorset.length]);
sandGrains[i].draw();
}
// رسم حباب‌های هوا با رنگ 2
noStroke();
for (let i = 0; i < airBubbles.length; i++) {
  fill(colorset[i % colorset.length]);

airBubbles[i].draw();
}
// حرکت دادن دانه‌های شن
for (let i = 0; i < sandGrains.length; i++) {
sandGrains[i].move(airBubbles);
}
}

class SandGrain {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.maxForce = 0.01;
  }
  
  draw() {
    point(this.pos.x, this.pos.y);
  }
  
  move(airBubbles) {
    // apply attraction to nearest air bubble
    let nearestAirBubble = this.getNearestAirBubble(airBubbles);
    let attraction = this.getAttraction(nearestAirBubble);
    this.applyForce(attraction);
    
    // apply random movement
    let randomMovement = createVector(random(-1, 1), random(-1, 1));
    this.applyForce(randomMovement);
    
    // limit speed and apply movement
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    
    // reset acceleration
    this.acc.mult(0);
    
    // wrAap around edges
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  
  getNearestAirBubble(airBubbles) {
    let nearestAirBubble = null;
    let nearestDistance = Infinity;
    for (let i = 0; i < airBubbles.length; i++) {
      let distance = this.pos.dist(airBubbles[i].pos);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestAirBubble = airBubbles[i];
      }
    }
    return nearestAirBubble;
  }
  
  getAttraction(airBubble) {
    let direction = p5.Vector.sub(airBubble.pos, this.pos);
    let distance = direction.mag();
    direction.normalize();
    let strength = map(distance, 0, airBubble.size, 0, this.maxForce);
    direction.mult(strength);
    return direction;
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
 
}

class AirBubble {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = airBubbleSize;
  }
  
  draw() {
    wind(); // call the wind() function
    //modify the position of the air bubble based on the wind
    const gravity = 0.4; // additional gravity
    const windSpeed = 55; // increase wind speed
    const windDirection = createVector(1, 0); // set wind direction to the right
    const n = noise(this.pos.x / 39, this.pos.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    this.pos.x += windX;
    this.pos.y += windY;
    this.pos.y += gravity; // apply additional gravity

    line(this.pos.x, this.pos.y, this.size, this.size);
  }
}

let sandLineWidth = 200;
let sandLineColor = [139, 69, 19];

let airBubbleSize = 25;
let airBubbleColor = [255, 255, 255];

let sandGrains = [];
let airBubbles = [];

function paper() {
  push();
  strokeWeight(1);
  noStroke();
  for (var i = 0; i<width-1; i+=2) {
    for (var j = 0; j<height-1; j+=2) {
    fill(random(205-40, 205+30), 25);
      rect(i, j, 2, 2);
    }
  }

  for (var i = 0; i<30; i++) {
    fill(random(130, 215), random(100, 170));
    rect(random(0, width-2), random(0, height-2), random(1, 3), random(1, 3));
  }
}

let colorsl = [];
let amount = 400;
function gt1() {
 
//fill(0)
  noFill()
  
 stroke(255)
  strokeWeight(250)
  // let chosen = chooseRandomColor();
 // stroke(chosen.colors[16])
  rect(0,0,windowWidth,windowHeight)
  stroke(0)
  strokeWeight(1)
  
}

let isClicked = false;

let wordd = 'いま';
function g1() {

   
      const canvasCenterX = width / 2;
  const canvasCenterY = height / 2;
   
   noFill();
    let bins = fft.analyze();
let energy = fft.getEnergy("mid");
strokeWeight(map(energy, 0, 255, 0.5, 8)*40);
   // strokeWeight(50);
    stroke(255);
  rect(canvasCenterX, canvasCenterY, width, height)
      fill(255)
     textSize(180);
  noStroke()
    
  textAlign(CENTER, CENTER);
   
 // text(wordd , width/2, height/2);
    const functions = [A1,A2,A4,A5,A8,A9,A10,A12,A15,A16,A17,A18,A19,A20,A21,A23,A24,A25,A30,A31,A32,A33,A34,A35,A36,A41,A42,A43,A44,A45,A47,A48,A49,A50,A51,A52,A53,A54,A55];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction30 = currentFunction30 || MuzSound.pick(30, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction30();
       
   
   noFill();

strokeWeight(map(energy, 0, 255, 0.5, 8)*60);
   // strokeWeight(50);
    stroke(255);
  rect(canvasCenterX, canvasCenterY, width, height)
 //  filter(THRESHOLD)
  // [MuzSound] filter(OPAQUE) هر فریم ~۲۸۰ms می‌گرفت؛ یک بار کافی است (بعد از آن همه‌چیز مات است)
  MuzSound.opaqueOnce();
    textSize(2);
    noFill()
   
 
}

function g1b() {
  if (isClicked) {
   
      const canvasCenterX = width / 2;
  const canvasCenterY = height / 2;
   
   noFill();
    let bins = fft.analyze();
let energy = fft.getEnergy("mid");
strokeWeight(map(energy, 0, 255, 0.5, 8)*40);
   // strokeWeight(50);
    stroke(255);
  rect(canvasCenterX, canvasCenterY, width, height)
      fill(255)
     textSize(180);
  noStroke()
    
  textAlign(CENTER, CENTER);
   
 // text(wordd , width/2, height/2);
    const functions = [A1,A2,A4,A5,A8,A9,A10,A12,A15,A16,A17,A18,A19,A20,A21,A23,A24,A25,A30,A31,A32,A33,A34,A35,A36,A41,A42,A43,A44,A45,A47,A48,A49,A50,A51,A52,A53,A54,A55];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction30 = currentFunction30 || MuzSound.pick(30, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction30();
       
   
   noFill();

strokeWeight(map(energy, 0, 255, 0.5, 8)*60);
   // strokeWeight(50);
    stroke(255);
  rect(canvasCenterX, canvasCenterY, width, height)
   filter(THRESHOLD)
    //filter(OPAQUE)
    textSize(2);
    noFill()
   
  } else {
  
 stroke(255)
        let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
     strokeWeight(200+(lightColor/3))
    const canvasCenterX = width / 2;
  const canvasCenterY = height / 2;
  // let chosen = chooseRandomColor();
 // stroke(chosen.colors[16])
    noFill()
   
let energy = fft.getEnergy("mid");
    strokeWeight(map(energy, 0, 255, 0.5, 8)*70);
  rect(canvasCenterX, canvasCenterY, width, height)
 
  // let chosen = chooseRandomColor();
 // stroke(chosen.colors[16])
   
 // rect(canvasCenterX, canvasCenterY, width, height)
    noFill()
  textSize(0.1);
  }
}




function mouseClicked() {
 
  // [MuzSound] پخش آهنگ از راه viz-audio (فقط بیرون از Grokly)
  MuzSound.song.play();
  
  if (mouseX >= 0 && mouseX <= windowWidth && mouseY >= 0 && mouseY <= windowHeight) {
    isClicked = !isClicked;
    
     isGrayFilterActive = !isGrayFilterActive;
    //g1();
  }
}

function g4r() {
//fill(0)

  let chosen = chooseRandomColor();
stroke(chosen.colors[6]);
  rect(0,0,windowWidth,windowHeight)
   stroke(0)
  strokeWeight(1)
}



//fill(0)
  
function g2() {
  const canvasCenterX = width / 2;
  const canvasCenterY = height / 2;
  noFill()
  strokeWeight(50)
  stroke(255)
  rect(canvasCenterX, canvasCenterY, width, height)
  stroke(0)
  strokeWeight(1)
}


function g3() {
//fill(0)
  noFill()
  strokeWeight(230)
  stroke(255)
  
  rect(0,0,windowWidth,windowHeight)
   stroke(0)
  strokeWeight(1)
}

function Ab4A(x,y, r1, r2, xoff, yoff, amplitude, frequency, colorIndex2, scale) {
 
let xCoord = x * scale;
let yCoord = y * scale;
const { r: rVal, g: gVal, b: bVal } = colorsX[colorIndex2];
const chosenColor = color(rVal, gVal, bVal, random(0, 40));
stroke(0)
strokeWeight(random(0.1, 0.4));
fill(chosenColor);
let wind = (map(noise(xoff), 0, 1, -1, 1)) * __vizWind();
xoff += frequency;
xCoord += wind;

beginShape();
for (let angle = 0; angle < TWO_PI; angle += 0.1) {
let xnoise = map(cos(angle), -1, 1, 0, 3);
let ynoise = map(sin(angle), -1, 1, 0, 3);
let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
let xr = (r2 * scale + distortion) * cos(angle) / 23;
let yr = (r2 * scale + distortion) * sin(angle) / 23;
let xr1 = (r1 * scale + distortion) * cos(angle) / 17;
let yr1 = (r1 * scale + distortion) * sin(angle) / 5;
vertex(xCoord + xr, yCoord + yr);
}
endShape(CLOSE);
noStroke()
strokeWeight(0.1);
fill(chosenColor);
let y3 = yCoord + 60 * scale;
beginShape();
for (let angle = 0; angle < TWO_PI; angle += 0.1) {
let xnoise = map(cos(angle), -1, 1, 0, 3);
let ynoise = map(sin(angle), -1, 1, 0, 3);
let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
let xr = (r1 * scale + distortion) * cos(angle) / 17;
let yr = (r1 * scale + distortion) * sin(angle) / 5;
vertex(xCoord + xr, y3 + yr);
}
xCoord += wind;
endShape(CLOSE);

let y4 = yCoord + 130 * scale;
beginShape();
for (let angle = 0; angle < TWO_PI; angle += 0.1) {
let xnoise = map(cos(angle), -1, 1, 0, 3);
let ynoise = map(sin(angle), -1, 1, 0, 3);
let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
let xr = (r1 * scale + distortion) * cos(angle) / 26;
let yr = (r1 * scale + distortion) * sin(angle) / 4;
vertex(xCoord + xr, y4 + yr);
}
xCoord += wind;
endShape(CLOSE);

yoff += 0.002;

strokeWeight(0.1);
}



function draw10() {
drawo2()
 // noFill(); // we don't want to fill the main shape
  beginShape();
 
  
  
  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
 // strokeWeight(bg);
  for (let i = 0; i < palette.length; i++) {
//   fill(palette[1]);
   // noStroke(palette[1]);
   //rect(i * width / palette.length,  cy, width / palette.length/10, height/20);
    strokeWeight(lightColor);
    
  }
   noFill()
    
      if (i === 5) {
      const r1 = 150 //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = 50  //random(50, 200);
           // strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, 100,10 ,PI - QUARTER_PI, -2*TWO_PI);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight(10.5)
  stroke(0)
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();

  t++;
    
    for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
     
   noFill()
   curveVertex(cx, cy);
  }
       
 
      // strokeWeight(1.5)
  stroke(0)
  //stroke(colors[26])
  
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();
 
  noFill()
   
  //g1()

}

function draw11() {

     
  beginShape();
  

  
  
  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber3()/2 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber3()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber3(),10 ,PI - QUARTER_PI, -2*TWO_PI);
 } 
  
  
              strokeWeight(10.5)
  stroke(0)
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();

  t++;
    
    for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
                
     
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
 // strokeWeight(bg);
  for (let i = 0; i < palette.length; i++) {
  // fill(palette[1]);
    noStroke(palette[1]);
   //rect(i * width / palette.length,  cy, width / palette.length/10, height/20);
    strokeWeight(lightColor);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    //fill(palette[colorIndex % palette.length]);
    noStroke();
    //stroke(0,0,0,random(1,150))
    
    //rect(cx, cy, width / bins.length/random(1,1.5), h/10);
    //line(cx, cy, width / bins.length/random(1,1.5), h/10);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
   
   // stroke(chosen.colors[6])
    //rect(cx, cy, width / bins.length/random(10,20), h/20);
  }
    if (i === 5) {
      const r1 = 70 //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = 200  //random(50, 200);
            //strokeWeight(12)
   stroke(255, 10, 0);
      
      
arc(cx, cy, 200,10 ,PI - QUARTER_PI, -2*TWO_PI);
    }
  


   
      
    noFill()
   curveVertex(cx, cy);
  }
     
 
      // strokeWeight(1.5)
  stroke(0)
  //stroke(colors[26])
  
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();
  
 
   
//o2()
 //g1()

}
}




function wrA() {


    var amount = 4;
    var spacing = 10;
    var radius = 30;
  
    for (var i = 0; i < amount; i++) {
        createNumberRing2(radius + spacing * i, 30 + 10 * i, i);
    }

   // drawTitleText();
   // drawSubtitleText();
    // drawWebsite();
}

function createNumberRing2(radius, amount, seed) {
    randomSeed(seed);
    var randomNumbers = [];
    for (var i = 0; i <= amount; i++) {
        randomNumbers.push(parseInt(random(2), 2));
    }
    var spacing = 360 / amount;

    push();
    translate(width / 2, height / 2);
    var rotSpeed = 0.2;
    rotate(frameCount * random(-rotSpeed, rotSpeed));
    
    for (var i = 0; i < amount; i++) {
        push();
        rotate(i * spacing);
        var num2 = new Num2(randomNumbers[i], 0 + radius, 0, 90, random(100, 255));
        num2.render();
        pop();
    }

    pop();
}

function Num2(msg2, x, y, rot2, clr) {
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
 // strokeWeight(bg);
  for (let i = 0; i < palette.length; i++) {

    strokeWeight(lightColor);
    
  } 
  
  
  this.x = x;
    this.y = y;
    this.rot2 = rot2;
    this.msg2 = msg2;
    this.color = clr;
    this.render = function() {
       
        push();
        //fill(0,0,0,random(0,30));
      noStroke()
     // strokeWeight(10.9)
       stroke(0)
    
      arc(this.x, this.y, generateRandomNumber3()*10,10 ,PI - QUARTER_PI, -2*TWO_PI);
      noFill()
      
      arc(this.x, this.y, generateRandomNumber3()/2,generateRandomNumber3()*10 ,PI - QUARTER_PI, -2*TWO_PI);
        translate(this.x, this.y);
        rotate(this.rot);
        beginShape();
 
 //OD() 
 
 
        pop();
      noStroke()
       push();
        
      

        translate(this.x, this.y);
        rotate(this.rot);

   
      
      arc(this.x, this.y, generateRandomNumber3()*10,10 ,PI - QUARTER_PI, -2*TWO_PI);

  
        pop();
      noStroke()
 
noFill()
      
    }
}

function draw12() {

     noStroke()
PDki();
    
 
    
    for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
     WW1(cx, cy, random(1,50))           
     
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
 // strokeWeight(bg);
  for (let i = 0; i < palette.length; i++) {
  // fill(palette[1]);
   // noStroke(palette[1]);
   //rect(i * width / palette.length,  cy, width / palette.length/10, height/20);
    strokeWeight(lightColor);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));

  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 

  }
    if (i === 5) {
      const r1 = 70 //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = 200  //random(50, 200);
            //strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, 200,10 ,PI - QUARTER_PI, -2*TWO_PI);
    }
  

 
     strokeWeight(lightColor);
     stroke(0)  
    noFill()
   curveVertex(cx, cy);
  }
  
 
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();
   
 
  noFill()




t++;
}
function draw13() {

  strokeWeight(random(0.01,1.6));

  PDki();
  let chosen = chooseRandomColor();



  noFill(); // we don't want to fill the main shape
  beginShape();
 
  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
 
  for (let i = 0; i < palette.length; i++) {
   fill(palette[1]);
    noStroke(palette[1]);
   rect(i * width / palette.length,  cy, width / palette.length/10, height/20);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    stroke(0,0,0,random(1,150))
    rect(cx, cy, width / bins.length/random(1,1.5), h/30);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
   noFill()
    stroke(chosen.colors[6])
    rect(cx, cy, width / bins.length/random(10,20), h/20);
  }
   
  
    noFill()
   curveVertex(cx, cy);
  }
noFill()
  strokeWeight(random(10,25));
  stroke(0, 0, 0, random(200, 240));
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  
  endShape();

  t++;
 //G3() 
//g1()
  //G3()
 


}



function drawPattern() {
  let rows = height / tileSize + 1;
  let cols = width / tileSize + 1;
  
  for (let i = -1; i < rows; i++) {
    for (let j = -1; j < cols; j++) {
      let x = j * tileSize + margin + tileSize / 2;
      let y = i * tileSize + margin + tileSize / 2;
      
      // رسم شکل‌های هندسی
      push();
      translate(x, y);
      rotate(random(TWO_PI));
      let size = tileSize * random(0.5, 1.5);
      let color = getRandomColorg1();
      noFill()
      stroke(color.r, color.g, color.b, 250);
      drawTile(size);
      pop();
    }
  }
}

function drawTile(size) {
  // رسم شکل‌های هندسی پیچیده‌تر
  let r = size / 3;
  let a = r * sqrt(3);
  let b = r / sqrt(3);
  let c = r * sin(30 * PI / 180);
  let d = 2 * r - c;
  
  // رسم دایره‌های متفاوت اندازه
  let goldenRatio = 1.61803398875;
  let circle1Radius = size * fibonacci[1] / fibonacci[2];
  let circle2Radius = size * fibonacci[3] / fibonacci[4];
  let circle3Radius = size * fibonacci[4] / fibonacci[5];
  let circle4Radius = size * fibonacci[6] / fibonacci[7];
  
  // رسم الگو
  beginShape();
  vertex(-d, -r);
  vertex(-c, -a);
  vertex(0, -circle1Radius);
  vertex(c, -a);
  vertex(d, -r);
  vertex(circle2Radius * sin(60 * PI / 180), -circle2Radius * cos(60 * PI / 180));
  vertex(circle3Radius * sin(30 * PI / 180), circle3Radius * cos(30 * PI / 180));
  vertex(0, circle4Radius);
  vertex(-circle3Radius * sin(30 * PI / 180), circle3Radius * cos(30 * PI / 180));
  vertex(-circle2Radius * sin(60 * PI / 180), -circle2Radius * cos(60 * PI / 180));
  endShape(CLOSE);
}

function getRandomColorg1() {
  // تولید رنگ تصادفی
  let r = Math.floor(Math.random() * 2);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return { r, g, b };
}
function drawPattern2() {
  stroke(0)
  let rows = height / tileSize + 1/2;
  let cols = width / tileSize + 1/2;
  
  for (let i = -1; i < rows; i++) {
    for (let j = -1; j < cols; j++) {
      let x = j * tileSize + margin + tileSize / 2;
      let y = i * tileSize + margin + tileSize / 2;
      
      // رسم شکل‌های هندسی
      push();
      translate(x, y);
      rotate(random(TWO_PI));
      let size = tileSize * random(0.02, 0.5);
      let color = getRandomColorg();
      fill(color.r, color.g, color.b, 21);
      drawTile2(size);
      pop();
    }
  }
}

function drawTile2(size) {
  // رسم شکل‌های هندسی پیچیده‌تر
  let r = size / random(3,10);
  let a = r * sqrt(3);
  let b = r / sqrt(3);
  let c = r * sin(30 * PI / 180);
  let d = 2 * r - c;
  
  // رسم دایره‌های متفاوت اندازه
  let goldenRatio = 1.61803398875;
  let circle1Radius = size * fibonacci[1] / fibonacci[2];
  let circle2Radius = size * fibonacci[3] / fibonacci[4];
  let circle3Radius = size * fibonacci[4] / fibonacci[5];
  let circle4Radius = size * fibonacci[6] / fibonacci[7];
  
  // رسم الگو
  beginShape();
  vertex(-d, -r);
  vertex(-c, -a);
  vertex(0, -circle1Radius);
  vertex(c, -a);
  vertex(d, -r);
  vertex(circle2Radius * sin(60 * PI / 180), -circle2Radius * cos(60 * PI / 180));
  vertex(circle3Radius * sin(30 * PI / 180), circle3Radius * cos(30 * PI / 180));
  vertex(0, circle4Radius);
  vertex(-circle3Radius * sin(30 * PI / 180), circle3Radius * cos(30 * PI / 180));
  vertex(-circle2Radius * sin(60 * PI / 180), -circle2Radius * cos(60 * PI / 180));
  endShape(CLOSE);
}
function getRandomColorg() {
// تولید رنگ تصادفی
let r = Math.floor(Math.random() * 256);
let g = Math.floor(Math.random() * 256);
let b = Math.floor(Math.random() * 256);
// تولید مقدار alpha تصادفی
let alpha = 2;
return { r, g, b, alpha };
}
let xoff5 = 0.1;
let yoff5 = 10.0;


let xoff6 = 0.1;
let yoff6 = 10.0;

function ww5() {
 
  A4s(random(-width,width), colorsl[1]);

  A4s(random(-width,width), colorsl[1]);

  A4s(random(-width,width), colorsl[1]);
 
  A4s(random(-width,width), colorsl[3]);

  A4s(random(-width,width), colorsl[4]);

   A5s(random(-width,height), colorsl[5]);

  A5s(random(-width,height), colorsl[6]);

  A5s(random(-100,height+200), colorsl[7]);


}

function A4s(randomNumber,  color) {
  
noStroke()
  beginShape();
  curveVertex(windowWidth, windowHeight);

  for (let i = 0; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];

    let x = map(noise(xoff5), 0, 1, 0, generateRandomNumber3(randomNumber));
    let y = map(noise(yoff5), 0, 1, 0, generateRandomNumber3(randomNumber));
  stroke(color);
    strokeWeight(random(0.01, 0.09));

    arc(x + 5, y, 5, 2000, PI - QUARTER_PI, -6 * TWO_PI);
     stroke(color);
    strokeWeight(random(0.01, 0.09));

    arc(x + 5, y, 5000, 2, PI - QUARTER_PI, -6 * TWO_PI);
    stroke(color);
    strokeWeight(random(0.01, 0.09));

    arc(x, y, generateRandomNumber3(randomNumber), generateRandomNumber3(randomNumber)/100, PI - QUARTER_PI, -6 * TWO_PI);
    xoff6 += 0.0001;
    yoff6 += 0.0001;
  }
  endShape();

  t++;
}


function generateRandomNumber3(randomNumber) {
return random(randomNumber - 1, randomNumber + 200);
}

function A5s(randomNumber,  color) {
 
noStroke()
  beginShape();
  curveVertex(windowWidth, windowHeight);

  for (let i = 0; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];

    let x = map(noise(xoff6), 0, 1, 0, generateRandomNumber3(randomNumber));
    let y = map(noise(yoff6), 0, 1, 0, height);

    
     stroke(0);
    strokeWeight(random(0.01, 0.09));
point(x+50,y+50)
    
    noFill()
     stroke(color);
    strokeWeight(random(0.01, 0.09));
point(x,y)
   // arc(x + 5, y, 5, 2, PI - QUARTER_PI, -6 * TWO_PI);
    stroke(color);
    strokeWeight(random(0.01, 0.09));

    arc(x, y, 20, random(1,700), PI - QUARTER_PI, -6 * TWO_PI);
    xoff6 += 0.0001;
    yoff6 += 0.0001;
  }
  endShape();

  t++;
}






function hk2() {
 for(let col = 0; col< width; col+=240){     
   for(let row = 0; row <height; row+=random(40,260)){ 
     let xPos = col; 
    let yPos = row;
      let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   //fill(palette[3]);
  
    strokeWeight(lightColor/random(5,300))
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    stroke(0)
 


     //let c = img.get(xPos,yPos);
     push();
     translate(xPos, yPos);
     rotate(radians(random(360)))
     noFill();
   
  
     point(xPos,yPos);
  
     curve(xPos,yPos,sin(xPos)* random (100) ,random(200), random(200),cos(xPos)*sin(xPos)* random (100)  ,cos(yPos)*sin(yPos)*random(2), cos(xPos)*sin(xPos)*140)
    
     pop();
    // rect(col,row,8,40);
    
    }
 }
}
}
function WW4(x, y, scale) {
  push();
  translate(x, y); // حرکت به مکان جدید
  //scale(100); // تغییر اندازه با استفاده از تابع scale
  (220);
  fill(255, 204, 0);
beginShape();
  vertex(60, 60);
  vertex(120, 20);
  vertex(180, 20);
  vertex(240, 60);
  vertex(240, 120);
  vertex(120, 200);
  vertex(60, 200);
  endShape(CLOSE);
  
  noStroke();
  fill(0, 102, 153);
  beginShape();
  vertex(60, 200);
  vertex(120, 200);
  vertex(120, 280);
  vertex(60, 320);
  endShape(CLOSE);
  
  beginShape();
  vertex(180, 200);
  vertex(240, 200);
  vertex(240, 280);
  vertex(180, 320);
  endShape(CLOSE);
  
  noFill();
  stroke(0);
  strokeWeight(4);
  beginShape();
  curveVertex(60, 60);
  curveVertex(60, 60);
  curveVertex(120, 20);
  curveVertex(180, 20);
  curveVertex(240, 60);
  curveVertex(240, 120);
  curveVertex(120, 200);
  curveVertex(60, 200);
  curveVertex(60, 200);
  endShape();
  
  beginShape();
  curveVertex(180, 200);
  curveVertex(180, 200);
  curveVertex(240, 200);
  curveVertex(240, 280);
  curveVertex(180, 320);
  curveVertex(180, 320);
  endShape();
  pop();
}
function hk3() {
 for(let col = 0; col< width; col+=140){     
   for(let row = 0; row <height; row+=200){ 
     let xPos = col; 
    let yPos = row;
     stroke(0)
     //let c = img.get(xPos,yPos);
     push();
     translate(xPos, yPos);
     rotate(radians(random(360)))
     noFill();
    
     strokeWeight(random(0.02,0.3));
     point(xPos,yPos);
     strokeWeight(random(0.02,0.9));
    // curve(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
     curve(xPos-random(10,100),yPos-random(10,100),sin(xPos)* random (100)-random(10,100) ,random(200)-random(10,100), random(200),cos(xPos)*sin(xPos)* random (100)-random(10,100)  ,cos(yPos)*sin(yPos)*random(2), cos(xPos)*sin(xPos)*140)
     pop();
    // rect(col,row,8,40);
    
    }
 }
}

function hk3b() {
   

let widthSection = width / 3;
let heightSection = height * 0.125;

let sections = [
{x: 0, y: 0, w: widthSection * 1.5, h: heightSection * 4},
{x: widthSection * 1.5, y: 0, w: widthSection * 2, h: heightSection * 2},
{x: widthSection * 1.5, y: heightSection * 2, w: widthSection * 2, h: heightSection * 2},
{x: widthSection * 3.5, y: 0, w: widthSection * 2.5, h: heightSection * 4},
{x: widthSection * 6, y: 0, w: widthSection * 1, h: heightSection * 4},
{x: widthSection * 6, y: heightSection * 4, w: widthSection * 1, h: heightSection * 2},
{x: widthSection * 6, y: heightSection * 6, w: widthSection * 1, h: heightSection * 1.5},
{x: widthSection * 6, y: heightSection * 7.5, w: widthSection * 1, h: heightSection * 0.5}
];

for(let section of sections){
for(let col = section.x; col < section.x + section.w; col += widthSection * 0.1){     
      for(let row = section.y; row < section.y + section.h; row += heightSection * 0.1){ 
       
        let xPos = col + random(-5, 5); 
        let yPos = row + random(-5, 5);
        stroke(0,random(0,85))
        push();
        translate(xPos, yPos);
        rotate(radians(random(360)))
        noFill();
        
        strokeWeight(random(0.02, 0.3));
        point(0, 0);
        strokeWeight(random(0.02, 0.9));
        curve(
          random(-10, -100), random(-10, -100), sin(xPos) * random(100) - random(10, 100),
          random(200) - random(10, 100), random(200),
          cos(xPos) * sin(xPos) * random(100) - random(10, 100),
          cos(yPos) * sin(yPos) * random(2), cos(xPos) * sin(xPos) * widthSection * 0.5
        );
        pop();
      }
    }
 } 
}

function WW2(x, y, scale) {
  

  // بدنهاسب
  noStroke();
  //fill(255, 204, 0);
   let chosen = chooseRandomColor();
//fill(chosen.colors[16])
  rect(x + 50 * scale, y + 100 * scale, 100 * scale, 50 * scale);

  // سر اسب
  //    fill(255,random(100,255));
  (chosen.colors[18])
  ellipse(x + 100 * scale, y + 75 * scale, 75 * scale, 75 * scale);

  // گوش اسب
  fill(255, 204, 0);
  triangle(
    x + 75 * scale,
    y + 40 * scale,
    x + 100 * scale,
    y + 0 * scale,
    x + 125 * scale,
    y + 40 * scale
  );

  // چشم اسب
  fill(0);
  ellipse(x + 85 * scale, y + 65 * scale, 10 * scale, 10 * scale);

  // دوگانه‌های خطی برای پوست اسب
  stroke(0);
  strokeWeight(2 * scale);
  line(x + 50 * scale, y + 100 * scale, x + 75 * scale, y + 50 * scale);
  line(x + 75 * scale, y + 50 * scale, x + 100 * scale, y + 100 * scale);
  line(x + 100 * scale, y + 100 * scale, x + 125 * scale, y + 50 * scale);
  line(x + 125 * scale, y + 50 * scale, x + 150 * scale, y + 100 * scale);
  line(x + 150 * scale, y + 100 * scale, x + 150 * scale, y + 150 * scale);
  strokeWeight(5)
}
let xoff = 0.0;
let yoff = 10000.0;
function CIL() {
  beginShape();

curveVertex(windowWidth/2, windowHeight/random(4,5.1));
 // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 0; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = map(noise(xoff)) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = map(noise(yoff)) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
   
   stroke(0);
strokeWeight(random(0.1,5))
  let x = map(noise(xoff), 0, 1, 0,width);
  let y = map(noise(yoff), 0, 1, 0, height);
  point(x, y);
    stroke(255)
    strokeWeight(random(0.1,0.9))
     point(x+10, y+10);
   
       // stroke(255)
    noStroke()
 let chosen = chooseRandomColor();
   fill(255,random(1,220))
   circle(x+8,y+8,20)
  fill(255,random(1,2))
    
    //circle(x+random(1,200),y+random(1,200),random(0.1,20))
   
   
//arc(x, cy, 100,10 ,PI - QUARTER_PI, -6*TWO_PI);
  xoff += 0.01;
  yoff += 0.01;
   
  }

  endShape();


  t++;
    
}

let tileSize = 40;
let margin = 40;
let fibonacci = [1, 1, 2, 3, 5, 8, 13, 21];




const colorsX = [
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
  { r: 251, g: 86, b: 7 }


];



function d3() {
  // پس زمینه سفید رنگ شود
  

  for (let i = 0; i < 10; i++) {
    // تغییر اندازه کیپ با توجه به اندازه i
    let scale = map(i, 0, 9, 20, 100);

    // محاسبه مکان تصادفی کیپ برای x و y
    let x = random(width);
    let y = random(height);

    // رسم کیپ با تناسب درست اندازه
    SS1(x, y, scale);
  }
}

function SS1(x, y, scale) {
  // خطوط بیرونی و داخلی اسب را رسم می‌کنیم با توجه به اندازه scale
  stroke(0);
  strokeWeight(scale / 100); // حفظ تناسب درست اندازه
  fill(255, 204, 0);
  beginShape();
  vertex(x + scale * 0.25, y + scale * 0.5);
  vertex(x + scale * 0.75, y + scale * 0.25);
  vertex(x + scale * 1.25, y + scale * 0.5);
  vertex(x + scale * 1.25, y + scale * 1.25);
  vertex(x + scale * 0.75, y + scale * 1.25);
  vertex(x + scale * 0.5, y + scale * 1);
  vertex(x + scale *0.25, y + scale * 1.25);
  endShape(CLOSE);

      fill(255,random(100,255));
  beginShape();
  vertex(x + scale * 0.35, y + scale * 0.85);
  vertex(x + scale * 0.45, y + scale * 0.75);
  vertex(x + scale * 0.65, y + scale * 0.75);
  vertex(x + scale * 0.75, y + scale * 0.85);
  vertex(x + scale * 0.65, y + scale * 0.95);
  vertex(x + scale * 0.45, y + scale * 0.95);
  endShape(CLOSE);

  // رسم چشم‌ها با توجه به اندازه scale
  fill(0);
  ellipse(x + scale * 0.825, y + scale * 0.65, scale * 0.2, scale * 0.2);
  ellipse(x + scale * 1.025, y + scale * 0.65, scale * 0.2, scale * 0.2);

}




function gt() {
  for (let i = 0; i < 10; i++) {
    let x = random(width-300);
    let y = random(height-350);
    let scale = map(i, 0, 9, 20, 200);
    WW1(x, y, scale);
  }
}

function WW1(x, y, scale) {
 // ////////background(220);
  strokeWeight(0.2);
  stroke(0);

 // گردن اسب
  line(x + 50 * scale / 100, y + 50 * scale / 100, x + 100 * scale / 100, y);
  line(x + 100 * scale / 100, y, x + 150 * scale / 100, y + 50 * scale / 100);

  // سر اسب
  line(x + 150 * scale / 100, y + 50 * scale / 100, x + 200 * scale / 100, y);
  line(x + 200 * scale / 100, y, x + 250 * scale / 100, y + 50 * scale / 100);
  line(x + 250 * scale / 100, y + 50 * scale / 100, x + 175 * scale / 100, y + 75 * scale / 100);
  line(x + 175 * scale / 100, y + 75 * scale / 100, x + 150 * scale / 100, y + 50 * scale / 100);

  // بدن اسب
  line(x + 50 * scale / 100, y + 50 * scale / 100, x + 50 * scale / 100, y + 150 * scale / 100);
  line(x + 50 * scale / 100, y + 150 * scale / 100, x + 100 * scale / 100, y + 200 * scale / 100);
  line(x + 100 * scale / 100, y + 200 * scale / 100, x + 200 * scale / 100, y + 250 * scale / 100);
  line(x + 200 * scale / 100, y + 250 * scale / 100, x + 300 * scale / 100, y + 200 * scale / 100);
  line(x + 300 * scale / 100, y + 200 * scale / 100, x + 300 * scale / 100, y + 100 * scale / 100);

  // پاهای اسب
  line(x + 200 * scale / 100, y + 250 * scale / 100, x + 200 * scale / 100, y + 350 * scale / 100);
  line(x + 300 * scale / 100, y + 200 * scale / 100, x + 300 * scale / 100, y + 300 * scale / 100);
  line(x + 100 * scale / 100, y + 200 * scale / 100, x + 100 * scale / 100, y + 300 * scale / 100);
  line(x + 175 *scale / 100, y + 75 * scale / 100, x + 175 * scale / 100, y + 175 * scale / 100);
}
let xPos = [];
let yPos = [];
//let scale;
function Fik() {

  strokeWeight(3);
  
  // سر
  fill(255, 204, 0);
  ellipse(150, 100, 100, 100);
  
  // بدن
      fill(255,random(100,255));
  rect(100, 100, 100, 50);
  
  // دم
  fill(255, 204, 0);
  triangle(200, 125, 225, 150, 200, 175);
  
  // پاها
      fill(255,random(100,255));
  rect(110, 150, 20, 50);
  rect(170, 150, 20, 50);
  
  // الگوی پیکاسو
  noFill();
  stroke(0);
  strokeWeight(1);
  bezier(110, 150, 110, 100, 170, 100, 170, 150);
  bezier(110, 500, 110, 250, 170, 250, 170, 200);
}
function picasso(x, y, w, h, d) {
  noStroke();
  let chosen = chooseRandomColor();
  //fill(chosen.colors[16])
  rect(110, 150, 20, 50);
      fill(255,random(100,255));
  //rect(x + w/5, y + h/5, w/5, h/5);
  //rect(x + 3*w/5, y + h/5, w/5, h/5);
  fill(0);
  //rect(x + w/5, y + h/5, w/10, h/10);
  //rect(x + 3*w/5, y + h/5, w/10, h/10);
  arc(x + w/2, y + 4*h/5, w/2, h/2, 0, PI, CHORD);
  triangle(x + w/2, y + 2*h/5, x + 2*w/5, y + 3*h/5, x + 3*w/5, y + 3*h/5);
}

function KIP() {
  (220);
  
  // تعداد کیپ‌ها
  const numSquares = random(1,5);
  
  // حجم هر کیپ برای هر اندازه
  const squareSize = width / numSquares;
  
  //رسم عناصر اسب با الگوی پیکاسو با استفاده از حلقه for
  noStroke();
  fill(255, 204, 0,random(1,20));

  for (let i = 0; i < 0; i++) {
    for (let j = 0; j < numSquares; j++) {
      rect(i * squareSize + squareSize / 40, j * squareSize + squareSize / 40, squareSize / 20, squareSize / 20);
    }
  }

  stroke(0,random(1,20));
  strokeWeight(random(0.1,0.5));

  for (let i = 0; i < numSquares; i++) {
    for (let j = 0; j < numSquares; j++) {
      let x = i * squareSize + squareSize / 2;
      let y = j * squareSize + squareSize / 2;
      line(x - squareSize / 4, y - squareSize / 4, x - squareSize / 4, y - squareSize / 2);
      line(x - squareSize / 4, y - squareSize / 4, x + squareSize / 4, y - squareSize / 4);
      line(x + squareSize / 4, y - squareSize / 4, x + squareSize / 4, y + squareSize / 4);
      line(x + squareSize / 4, y + squareSize / 4, x - squareSize / 4, y + squareSize / 4);
      line(x - squareSize / 4, y + squareSize / 4, x - squareSize / 4, y + squareSize / 2);
      line(x - squareSize / 4, y + squareSize / 2, x + squareSize / 4, y + squareSize / 2);
      line(x + squareSize / 4, y + squareSize / 2, x + squareSize / 4, y + squareSize / 4 * 3);
      line(x + squareSize / 4, y + squareSize / 4 * 3, x - squareSize / 4, y + squareSize / 4 * 3);
      line(x - squareSize / 4, y + squareSize / 4 * 3, x - squareSize / 4, y + squareSize / 2);
      line(x - squareSize / 4, y + squareSize / 2, x + squareSize / 4, y + squareSize / 2);
    }
  }
}





function  LIK(){
  (220);
  
  // تعریف لیست از اندازه‌های مختلف کیپ‌ها
  var sizes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  
  // حلقه برای تکرار کردن رسم کیپ‌ها
  for (var i = 0; i < 2.5; i++) {
    var size = sizes[i]; // برداشتن یکی از اندازه‌های لیست
    var x = random(width); // مختصات تصادفی در افقی
    var y = random(height); // مختصات تصادفی در عمودی
      let chosen = chooseRandomColor();
  //fill(chosen.colors[16])
    // گوش
   // fill(252, 232, 174);
    noStroke();
    beginShape();
    vertex(x - size - 5, y + size + 5);
    vertex(x - size - 5, y - size - 5);
    vertex(x + size + 5, y - size - 5);
    vertex(x + size + 5, y + size + 5);
    endShape(CLOSE);
    
    // سر
    //fill(252, 232, 174);
    //fill(chosen.colors[14])
   //stroke(0);
    //strokeWeight(2);
    beginShape();
    vertex(x - size, y - size);
    vertex(x + size, y - size);
    vertex(x + size + 10, y);
    vertex(x + size, y + size);
    vertex(x - size, y + size);
    vertex(x - size - 10, y);
    endShape(CLOSE);
    
    // چشم
    fill(0);
    noStroke();
    ellipse(x, y, size/2, size/2);
    //fill(chosen.colors[12])
    // دم
    //fill(252, 232, 174);
     //fill(chosen.colors[7])
    //stroke(0);
    //strokeWeight(2);
    beginShape();
    vertex(x - size - 5, y + size + 5);
    vertex(x - size - 15, y + size + 15);
    vertex(x - size - 5, y + size + 25);
    vertex(x + size + 5, y + size + 15);
    endShape(CLOSE);
    
    // بدن
    //fill(252, 232, 174);
    //fill(chosen.colors[10])
    stroke(0);
    strokeWeight(0.2);
    beginShape();
    vertex(x - size, y + size);
    vertex(x + size, y + size);
    vertex(x + size + 10, y + size + 10);
    vertex(x + size, y + size*2);
    vertex(x- size, y + size*2 - 10);
    endShape(CLOSE);
    
    // پاها
    //fill(252, 232, 174);
    //fill(chosen.colors[9])
    //stroke(0);
    //strokeWeight(2);
    beginShape();
    vertex(x + size/2, y + size*2 - 10);
    vertex(x + size*3/4, y + size*2 + 10);
    vertex(x + size/2, y + size*2 + 20);
    vertex(x + size/4, y + size*2 + 10);
    endShape(CLOSE);
    
    beginShape();
    vertex(x - size/2, y + size*2 - 10);
    vertex(x - size*3/4, y + size*2 + 10);
    vertex(x - size/2, y + size*2 + 20);
    vertex(x - size/4, y + size*2 + 10);
    endShape(CLOSE);
    
    // گلو
    noFill();
    //stroke(0);
    //strokeWeight(2);
    beginShape();
    vertex(x, y + size);
    vertex(x + size/2, y + size - size/4);
    vertex(x + size, y + size);
    endShape();
  }
}


function WW3(x, y, scale) {
  (220);
  
  //تنظیمات سب زمینه
  fill(255, 204, 0);
  noStroke();
  
  // رسم مربع اول
  push();
  translate(x + 75 * scale, y + 75 * scale);
  rotate(45);
  rectMode(CENTER);
  rect(0, 0, 150 * scale, 150 * scale);
  pop();
  
  // رسم مربع دوم
  push();
  translate(x + 75 * scale, y + 75 * scale);
  rotate(-45);
  rectMode(CENTER);
  rect(0, 0, 150 * scale, 150 * scale);
  pop();
}

function NB() {
(200);
wrc(2, 5, 5, 4, random(1,15), width/random(3,18), height/random(3,18));

for (let i = 0; i < 3; i++) {
const amount = random(1, 5);
const spacing = random(2, 5);
const radius = random(1, 5);
const colorindex2 = floor(random(colorsX.length));
const scale = i + 1;
const xPos = random(0,width);
const yPos = random(0,height);
wrc(amount, spacing, radius, colorindex2, scale, xPos, yPos);
}
}
function wrc(amount, spacing, radius, colorindex2, scale, xPos, yPos) {
for (let i = 0; i < amount; i++) {
createNumberRingc(radius + spacing * i, 30 + 10 * i, colorindex2, 20 * scale, xPos, yPos, scale);
}
}

function createNumberRingc(radius, amount, colorindex2, numSize, xPos, yPos, scale) {
const randomNumbers = [];
for (let i = 0; i <= amount; i++) {
randomNumbers.push(parseInt(random(2), 2));
}
const spacing = 360 / amount;

push();
translate(width / random(1,3), height / random(1,3));
const rotSpeed = 0.02;
rotate(frameCount * random(-rotSpeed, rotSpeed));

for (let i = 0; i < amount; i++) {
push();
rotate(i * spacing);
const numc = new Numc(randomNumbers[i], 0 + radius, 0, 90, colorsX[colorindex2], numSize, scale);
numc.render(xPos, yPos);
pop();
}

pop();
}

function Numc(msg, x, y, rot, clr, size, scale) {
this.x = x;
this.y = y;
this.rot = rot;
this.msg = msg;
this.color = clr;
this.size = size;
this.scale = scale;
//fill(0);
fill(random(colorsX));
this.render = function(xPos, yPos) {
push();
noStroke();
translate(this.x + xPos, this.y + yPos);
rotate(this.rot);
fill(colorsX);
// colorsX[colorindex2]
rect(this.x + xPos, this.y + yPos, 1.2 * this.scale, random(1, 1.2) * this.scale);
pop();
  
  push();
noStroke();
translate(this.x + xPos, this.y + yPos);
rotate(this.rot);
 rect(this.x + xPos, this.y + yPos, 1.2 * this.scale, random(1, 1.2) * this.scale);
  noFill()
pop();
  }
}

function NBg() {
  noFill()
(200);
wrc(5, 2, 50, random(colorsX),random(1,45), width/2, height/2);

for (let i = 0; i < 3; i++) {
const amount = random(1, 4);
const spacing = random(1, 5);
const radius = random(1, 120);
const colorindex2 = floor(random(colorsX.length));
const scale = i + 1;
const xPos = random(0,width);
const yPos = random(0,height);
wrc(amount, spacing, radius, colorindex2, scale, xPos, yPos);
}
}

function wrc(amount, spacing, radius, colorindex2, scale, xPos, yPos) {
for (let i = 0; i < amount; i++) {
createNumberRingc(radius + spacing * i, 30 + 10 * i, colorindex2, 20 * scale, xPos, yPos, scale);
}
}

function createNumberRingc(radius, amount, colorindex2, numSize, xPos, yPos, scale) {
const randomNumbers = [];
for (let i = 0; i <= amount; i++) {
randomNumbers.push(parseInt(random(2), 2));
}
const spacing = 360 / amount;

push();
translate(width / random(1,3), height / random(1,3));
const rotSpeed = 0.2;
rotate(frameCount * random(-rotSpeed, rotSpeed));

for (let i = 0; i < amount; i++) {
push();
rotate(i * spacing);
const numc = new Numc(randomNumbers[i], 0 + radius, 0, 90, colorsX[colorindex2], numSize, scale);
numc.render(xPos, yPos);
pop();
}

pop();
}

function Numc(msg, x, y, rot, colorindex2, size, scale) {
this.x = x;
this.y = y;
this.rot = rot;
this.msg = msg;
//this.color = clr;
this.size = size;
this.scale = scale;
//fill(random(colorsX)); // تغییر رنگ با استفاده از تابع random و آرایه colorsX
this.render = function(xPos, yPos) {
push();
noStroke();
translate(this.x + xPos, this.y + yPos);
rotate(this.rot);
 fill(str(random(colorset)))
   let chosen = chooseRandomColor();
//fill(chosen.colors[16])
//rect(0, 0, 2 * this.scale, random(1, 2),random(10, 50)* this.scale);
   rect(this.x + xPos, this.y + yPos,  this.scale, this.scale/random(1,15));
  fill(str(random(colorset)))
//rect(0, 0, 2 * this.scale, random(1, 2),random(10, 50)* this.scale);
   rect(this.x + xPos, this.y + yPos, this.scale, this.scale*random(1,2));
  pop();
push();
noStroke();
translate(this.x + xPos, this.y + yPos);
rotate(this.rot);
  fill(str(random(colorset)))
//rect(0, 0, 2 * this.scale, random(1, 2),random(10, 50)* this.scale);
   rect(this.x + xPos, this.y + yPos, this.scale, this.scale*random(1,2));
  
  
  //fill(0)
//rect(0, 0, 2 * this.scale, random(1, 2),random(10, 50)* this.scale);
   rect( this.x + xPos, this.y + yPos,  this.scale*random(1,1.5), this.scale);
  noFill()
pop();
}
}
////////////////



function o11() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < PD02.length - 1; i++) {
    const p1 = PD02[i];
    const p2 = PD02[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
 // strokeWeight(bg);
  for (let i = 0; i < palette.length; i++) {
  // fill(palette[1]);
    //noStroke(palette[1]);
   //rect(i * width / palette.length,  cy, width / palette.length/10, height/20);
    strokeWeight(lightColor);
    
  }
  //WW3(cx, cy, random(0.01,0.05))
       for (let i = 0; i < lightColor; i++) {
    const colorIndex2 = floor(random(0, colorsX.length));
    Ab4A(cx+level+random(0,width), cy+bg+random(0,height) , 230+level, 200+level, 0+level, 0+level, 45+level, 0.01+level, colorIndex2,random(0.01,12.2));
       
       }
   curveVertex(cx+10, cy-10);
  }
       

  

  curveVertex(PD02[PD02.length - 1].x, PD02[PD02.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}
//////////
function drawl1() {
     
      
   

  //drawG3()
  textA()
 // drawG2()
  
 // drawG1()
 
 // drawo3()
 
 // drawo2()
  
 // drawo4()
 
 // drawo5()
  
  drawo6()
 
  drawo7()

   drawo8()
  textA()
  textA()
    textA()
   //drawG3()
      for (let i = 0; i < 10; i++) {
    const colorIndex2 = floor(random(0, colorsX.length));
    Ab4A(random(0,width),random(0,height) , 230, 200, 0, 0, 45, 0.01, colorIndex2,random(0.01,0.9));
       
       }
  //g1() 

}

function drawl2() {
     
      
   

 // drawG3()
 // textA()
 // drawG2()
  
 // drawG1()
 
 // drawo3()
 
 // drawo2()
  
 // drawo4()
 
 // drawo5()
  
 // drawo6()
 
  drawo7()

   drawo8()
  textA()
  //textA()
  //  textA()
   //drawG3()
    
       
       
  //g1() 

}


function drawl3() {
     
      
   

 // drawG3()
 // textA()
 // drawG2()
 OD() 
 // drawG1()
 
  drawo3()
 
 drawo2()
  
 drawo4()
 
 // drawo5()
  
 // drawo6()
 
  //drawo7()

   //drawo8()
  textA()
  //textA()
  //  textA()
  // drawG3()
    
       
       
  //g1() 

}


function drawl7() {
     
      
   

 // drawG3()
 // textA()
 // drawG2()
// OD() 
  hk3()
 // drawG1()
 
 // drawo3()
 
 //drawo2()
  
 drawo4()
 
 // drawo5()
  
 // drawo6()
 
  //drawo7()

   //drawo8()
  textA()
  //textA()
  //  textA()
   //drawG3()
    
       
       
 // g1() 

}

function drawl4() {
     
      
   

 // drawG3()
 // textA()
 // drawG2()
// OD() 
  hk3()
  drawG1()
 
  drawo3()
 
 //drawo2()
  
 //drawo4()
 
 // drawo5()
  
 // drawo6()
 
  //drawo7()

   //drawo8()
  textA()
  //textA()
  //  textA()
  // drawG3()
    
       
       
  //g1() 

}

function drawl5() {
     
      
   

 // drawG3()
 // textA()
 // drawG2()
// OD() 
  hk2()
 // drawG1()
 
 // drawo3()
 
 //drawo2()
  
 //drawo4()
 
 // drawo5()
  
 // drawo6()
 
  drawo7()

   //drawo8()
  textA()
  //textA()
  //  textA()
  // drawG3()
    
       
       
  //g1() 

}

function drawl6() {
     
      
   

  drawG3()
 // textA()
  //drawG2()
// OD() 
  hk2()
 // drawG1()
 LIK()
  drawo3()
 
 drawo2()
  
 //drawo4()
 
 // drawo5()
  
 // drawo6()
 
  drawo7()

   //drawo8()
  textA()
  //textA()
  //  textA()
  // drawG3()
    
       
       
  //g1() 

}


function drawl8() {
     
      
   

  //drawG3()
 // textA()
 // drawG2()
// OD() 
  hk2()
 // drawG1()
 LIK()
  drawo3()
 
 drawo2()
  
 drawo4()
 
  drawo5()
  
 // drawo6()
 
  drawo7()

   //drawo8()
  textA()
  //textA()
  //  textA()
  // drawG3()
    
       
       
  //g1() 

}

function drawl10() {
     
      
   

  //drawG3()
 // textA()
 // drawG2()
// OD() 
  hk2()
 // drawG1()
 //LIK()
  drawo3()
 
 //drawo2()
  
// drawo4()
 
 // drawo5()
  
 drawo6()
 
  //drawo7()

  drawo8()
  textA()
  //textA()
  //  textA()
  // drawG3()
    
       
       
  //g1() 

}

function drawl11() {
     
      
   

  //drawG3()
 // textA()
  drawG2()
// OD() 
  //hk2()
 // drawG1()
 //LIK()
 // drawo3()
  SS1()
picasso()
  // hk3()
OD()
 CIL()
 //hk2()
//NB()
 //LIK() 
  // KIP()
 //wrc()
   NB()   
 
//hk3()
//OD()
 //CIL()
// hk2()
// ww5()
 //LIK() 
  // KIP()
 // hk3()
  WW3()
WW2()
WW1()
drawo2()
  
 drawo4()
 
 // drawo5()
  
 drawo6()
 
  //drawo7()

 // drawo8()
 // textA()
  //textA()
  //  textA()
  // drawG3()
    
       
       
  //g1() 

}


function drawl12() {
     
      
   

  
  G4()
   noFill()
  strokeWeight(1)
  
 // G3()
  //drawG3()
   noFill()
  strokeWeight(1)
 // textA()
 // drawG2()
   noFill()
  strokeWeight(1)
// OD() 
  //hk2()
 // drawG1()
 //LIK()
 // drawo3()
  //SS1()
picasso()
  noFill()
  strokeWeight(1)
  // hk3()
//OD()
 //CIL()
 //hk2()
//NB()
 //LIK() 
   //KIP()
 //wrc()
   //NB()   
 
//hk3()
//OD()
 //CIL()
 hk3()
ww5()
 //LIK() 
  // KIP()
 // hk3()
  //WW3()
//WW2()
//WW1()
//drawo2()
  
 //drawo4()
 
 // drawo5()
  
 //drawo6()
 
  //drawo7()

  drawo8()
   noFill()
  strokeWeight(1)
 // textA()
  //textA()
  //  textA()
 // drawG3()
   noFill()
  strokeWeight(1)
    
       
       
  //g1() 

}


function drawl13() {
     
      
   


  G4()
   noFill()
  strokeWeight(1)
  
 // G3()
 // drawG3()
   noFill()
  strokeWeight(1)
  textA()
 // drawG2()
   noFill()
  strokeWeight(1)
// OD() 
  //hk2()
 // drawG1()
 //LIK()
 // drawo3()
  //SS1()
picasso()
  noFill()
  strokeWeight(1)
  // hk3()
//OD()
 //CIL()
 //hk2()
//NB()
 //LIK() 
   //KIP()
 //wrc()
   //NB()   
 
//hk3()
//OD()
 //CIL()
 hk3()
ww5()
 //LIK() 
  // KIP()
 // hk3()
  //WW3()
//WW2()
//WW1()
drawo2()
  
 //drawo4()
 
 drawo5()
  
 drawo6()
 
  //drawo7()

  drawo8()
   noFill()
  strokeWeight(1)
 // textA()
  //textA()
  //  textA()
 // drawG3()
   noFill()
  strokeWeight(1)
    
       
       
  //g1() 

}



/////////////////



let QP1 = [];
let QP12 = [];
let QP13 = [];
let QP1g = [];
let QP1e = [];
function QD() {
  ////////background(255);
        let chosen = chooseRandomColor();


  noFill(); // we don't want to fill the main shape
  // [MuzSound] موج پس‌زمینه ← بم (bass, sub, pulse): دامنهٔ انحنا و سرعت حرکت موج
  const muzA = MuzSound.lines.waveAmp(), muzT = (t + MuzSound.lines.waveT()) / 50;
  beginShape();
  for (let i = 1; i < QP12.length - 1; i++) {
    const p1 = QP12[i];
    const p2 = QP12[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, muzT) - 0.5) * p1.size * 2 * muzA;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, muzT) - 0.5) * p1.size * 4 * muzA;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(chosen.colors[16])

  curveVertex(QP12[QP12.length - 1].x, QP12[QP12.length - 1].y);
  endShape();


o6QD()
o6QD2()
 o6QD()
  //o7QD()

  t++;
}


function o6QD() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  // [MuzSound] خط‌های رنگی ← میانه (lowMid, mid, centroid): انحنا و رانش
  const muzA = MuzSound.lines.driftAmp(), muzT = (t + MuzSound.lines.driftT()) / 50;
  beginShape();
  
  for (let i = 2; i < QP1g.length - 1; i++) {
    const p1 = QP1g[i];
    const p2 = QP1g[i + 1];
      const cx = (p1.x + p2.x) / 4 + (noise(p1.x / 125, p1.y / 25, muzT) - 0.5) *2* p1.size * muzA ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 4 + (noise(p1.x / 34, p1.y / 134, muzT) - 0.5) *2* p1.size * muzA ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
 
 stroke(rang20[5])
  //stroke(0)
  curveVertex(QP1g[QP1g.length - 1].x, QP1g[QP1g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}

function o6QD2() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < QP1g.length - 1; i++) {
    const p1 = QP1g[i];
    const p2 = QP1g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
 
 stroke(rang20[5])
  
  curveVertex(QP1g[QP1g.length - 1].x, QP1g[QP1g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function o7QD() {
      let chosen = chooseRandomColor();


  beginShape();
  
  for (let i = 2; i < QP1g.length - 1; i++) {
    const p1 = QP1g[i];
    const p2 = QP1g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
stroke(rang20[5])
  //stroke(0)
  curveVertex(QP1g[QP1g.length - 1].x, QP1g[QP1g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
  t++;
}
////////

function QD2() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 1; i < QP12.length - 1; i++) {
    const p1 = QP12[i];
    const p2 = QP12[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  
//stroke(rang20[5])
  stroke(0)
  curveVertex(QP12[QP12.length - 1].x, QP12[QP12.length - 1].y);
  endShape();




 o6QD2()
  o7QD2()

  t++;
}


function o6QD2() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  // [MuzSound] خط‌های سیاه ظریف ← زیر (high, air, flux): لرزش تند و ریز
  const muzA = MuzSound.lines.shiverAmp(), muzT = (t + MuzSound.lines.shiverT()) / 50;
  beginShape();
  
  for (let i = 2; i < QP1g.length - 1; i++) {
    const p1 = QP1g[i];
    const p2 = QP1g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, muzT) - 0.5) * p1.size * muzA ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, muzT) - 0.5) * p1.size * muzA ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
 //stroke(rang20[18])
stroke(0)
  curveVertex(QP1g[QP1g.length - 1].x, QP1g[QP1g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function o7QD2() {
      let chosen = chooseRandomColor();


  beginShape();
  
  for (let i = 2; i < QP1g.length - 1; i++) {
    const p1 = QP1g[i];
    const p2 = QP1g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
      
  //stroke(rang20[5])
  strokeWeight(10)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(133,225))
  curveVertex(QP1g[QP1g.length - 1].x, QP1g[QP1g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
  t++;
}

//////////////////







function drawdf() {

   
  const functions = [drawF1,drawF2,drawF3];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction15 = currentFunction15 || MuzSound.pick(15, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction15();



 
 
 QD() 
  noStroke();
}

//////////


function drawJM19() {
 // //////background(255);
  JM15Cki()
  let chosen = chooseRandomColor();
 
    o2()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
 curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1)); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < JM15C.length - 1; i++) {
    const p1 = JM15C[i];
    const p2 = JM15C[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/2 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,40));
//fill(255,255,255,random(0,8))
  curveVertex(JM15C[JM15C.length - 1].x, JM15C[JM15C.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//fountainPen()
//hatching()
sprayPaint()  
  t++;
    
   // g1()

}

///////
function drawJM18() {
 // //////background(255);
  JM15Cki()
  let chosen = chooseRandomColor();
 
    //o2JM15C()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
 
  curveVertex(windowWidth/random(3,3.2), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(0,3.2), windowHeight/random(4,5.1));
curveVertex(windowWidth/random(0,3.2), windowHeight/random(4,5.1));
curveVertex(windowWidth/random(0,3.2), windowHeight/random(4,5.1));
curveVertex(windowWidth/random(3,3.2), windowHeight/random(4,5.1));
curveVertex(windowWidth/random(3,3.2), windowHeight/random(4,5.1));
 curveVertex(windowWidth/random(3,3.2), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(3,2), windowHeight/random(4,5.1)); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/random(3,2), windowHeight/random(4,5.1)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/random(3,2), windowHeight/random(4,5.1)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < JM15C.length - 1; i++) {
    const p1 = JM15C[i];
    const p2 = JM15C[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/5 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,40));
//fill(255,255,255,random(0,8))
  curveVertex(JM15C[JM15C.length - 1].x, JM15C[JM15C.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//fountainPen()
//hatching()
//sprayPaint()  
  t++;
    
  

}


////////
function drawJM17() {
 // //////background(255);
  JM16Xki()
  let chosen = chooseRandomColor();
 


  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8));
 curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.5));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8)); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < JM16X.length - 1; i++) {
    const p1 = JM16X[i];
    const p2 = JM16X[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/7 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,40));
//fill(255,255,255,random(0,8))
  curveVertex(JM16X[JM16X.length - 1].x, JM16X[JM16X.length - 1].y);
  endShape();


  
  t++;
    


}
//////////
let JM16X = [];
let JM16X2 = [];
let JM16X3 = [];
let JM16Xg = [];

function drawJM16() {
 // //////background(255);
  JM16Xki()
  let chosen = chooseRandomColor();
 
    o2JM16X()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8));
 curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.5));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8)); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < JM16X.length - 1; i++) {
    const p1 = JM16X[i];
    const p2 = JM16X[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/7 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,0));
//fill(255,255,255,random(0,8))
  curveVertex(JM16X[JM16X.length - 1].x, JM16X[JM16X.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//fountainPen()
//
  
  t++;
    
    //g1()

}
function o2JM16X() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM16X2.length - 1; i++) {
    const p1 = JM16X2[i];
    const p2 = JM16X2[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(8.4)
  stroke(chosen.colors[16])

  curveVertex(JM16X2[JM16X2.length - 1].x, JM16X2[JM16X2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JM16X()
 o4JM16X()
  o5JM16X()
  o6JM16X()
  o7JM16X()
  t++;
}


function o3JM16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JM16X.length - 1; i++) {
    const p1 = JM16X[i];
    const p2 = JM16X[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(JM16X3[JM16X3.length - 1].x, JM16X3[JM16X3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JM16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM16X2.length - 1; i++) {
    const p1 = JM16X2[i];
    const p2 = JM16X2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(0,0,0,random(100,150))
  curveVertex(JM16X2[JM16X2.length - 1].x, JM16X2[JM16X2.length - 1].y);
  endShape();

  
  t++;
  
}
function o5JM16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM16Xg.length - 1; i++) {
    const p1 = JM16Xg[i];
    const p2 = JM16Xg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(JM16Xg[JM16Xg.length - 1].x, JM16Xg[JM16Xg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o6JM16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM16Xg.length - 1; i++) {
    const p1 = JM16Xg[i];
    const p2 = JM16Xg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JM16Xg[JM16Xg.length - 1].x, JM16Xg[JM16Xg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function o7JM16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM16Xg.length - 1; i++) {
    const p1 = JM16Xg[i];
    const p2 = JM16Xg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(JM16Xg[JM16Xg.length - 1].x, JM16Xg[JM16Xg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function JM16Xki() {
  
     let chosen = chooseRandomColor();
  for (let p of JM16Xk) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let JM16Xk = [];
function fountainPen() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JM16X.length - 1; i++) {
    const p1 = JM16X[i];
    const p2 = JM16X[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}






///////////
let JM15C = [];
let JM15C2 = [];
let JM15C3 = [];
let JM15Cg = [];

function drawJM15() {
 // //////background(255);
  JM15Cki()
  let chosen = chooseRandomColor();
 
    o2JM15C()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
 
  curveVertex(windowWidth/random(0,2), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(0,2.2), windowHeight/random(0,5.8));
curveVertex(windowWidth/random(0,1.8), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,2.1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,2.1), windowHeight/random(0,2.8));
curveVertex(windowWidth/random(0,2.1), windowHeight/random(0,2.8));
 curveVertex(windowWidth/random(0,2), windowHeight/random(0,5.5));
curveVertex(windowWidth/2.1, windowHeight/3.8); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/2.1, windowHeight/2.8); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/2.1, windowHeight/2.8); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار 
  for (let i = 2; i < JM15C.length - 1; i++) {
    const p1 = JM15C[i];
    const p2 = JM15C[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/8 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,40));
//fill(255,255,255,random(0,8))
  curveVertex(JM15C[JM15C.length - 1].x, JM15C[JM15C.length - 1].y);
  endShape();


sprayPaintJM15C()  
  t++;
    
    //g1()

}
function o2JM15C() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM15C2.length - 1; i++) {
    const p1 = JM15C2[i];
    const p2 = JM15C2[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(8.4)
  stroke(chosen.colors[16])

  curveVertex(JM15C2[JM15C2.length - 1].x, JM15C2[JM15C2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JM15C()
 o4JM15C()
  o5JM15C()
  o6JM15C()
  o7JM15C()
  t++;
}


function o3JM15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JM15C.length - 1; i++) {
    const p1 = JM15C[i];
    const p2 = JM15C[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(JM15C3[JM15C3.length - 1].x, JM15C3[JM15C3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JM15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM15C2.length - 1; i++) {
    const p1 = JM15C2[i];
    const p2 = JM15C2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(0,0,0,random(100,150))
  curveVertex(JM15C2[JM15C2.length - 1].x, JM15C2[JM15C2.length - 1].y);
  endShape();

  
  t++;
  
}
function o5JM15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM15Cg.length - 1; i++) {
    const p1 = JM15Cg[i];
    const p2 = JM15Cg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(JM15Cg[JM15Cg.length - 1].x, JM15Cg[JM15Cg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJM15C()
  t++;
}

function o6JM15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM15Cg.length - 1; i++) {
    const p1 = JM15Cg[i];
    const p2 = JM15Cg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JM15Cg[JM15Cg.length - 1].x, JM15Cg[JM15Cg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJM15C()
  t++;
}


function o7JM15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM15Cg.length - 1; i++) {
    const p1 = JM15Cg[i];
    const p2 = JM15Cg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(JM15Cg[JM15Cg.length - 1].x, JM15Cg[JM15Cg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJM15C()
  t++;
}


function JM15Cki() {
  windJM15C() 
     let chosen = chooseRandomColor();
  for (let p of JM15Ck) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function windJM15C() {
  const gravity = 1.3; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...JM15Ck]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let JM15Ck = [];
function fountainPenJM15C() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JM15C.length - 1; i++) {
    const p1 = JM15C[i];
    const p2 = JM15C[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatchingJM15C() {
  windJM15C()
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(chosen.colors[50])
//fill(chosen.colors[55])
  let speed = 3; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 5; i < JM15C.length - 1; i++) {
    const p1 = JM15C[i];
    const p2 = JM15C[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
      
      //noStroke()
     // circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}

function sprayPaintJM15C() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(255)
  strokeWeight(1);

  const speed = 200;

  // set minimum radius and spray density of sprayPaintJM15C brush
  const minRadius = 130;
  const sprayDensity = 44;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 5;

  for (let i = 27; i < JM15C.length - 1; i++) {
    const p1 = JM15C[i];
    const p2 = JM15C[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
strokeWeight(1)
      stroke(0,0,0,1)  
        point(lerpX + randX, lerpY + randY);
       // stroke(255,255,255,random(0,230)) 
       //arc(lerpX + randX, lerpY + randY, 2,6 ,PI , -2*TWO_PI);

      }
    }
  }
}






/////////
let JM14B = [];
let JM14B2 = [];
let JM14B3 = [];
let JM14Bg = [];

function drawJM14() {
 // //////background(255);
  JM14Bki()
  let chosen = chooseRandomColor();
 
    o2JM14B()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
  for (let i = 2; i < JM14B.length - 1; i++) {
    const p1 = JM14B[i];
    const p2 = JM14B[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/9 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,10));
fill(255,255,255,random(0,8))
  curveVertex(JM14B[JM14B.length - 1].x, JM14B[JM14B.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPenJM14B()
//hatching()
sprayPaintJM14B()  
  t++;
    
   // g1()

}
function o2JM14B() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM14B2.length - 1; i++) {
    const p1 = JM14B2[i];
    const p2 = JM14B2[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(4.4)
  stroke(chosen.colors[16])

  curveVertex(JM14B2[JM14B2.length - 1].x, JM14B2[JM14B2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JM14B()
 o4JM14B()
  o5JM14B()
  o6JM14B()
  o7JM14B()
  t++;
}


function o3JM14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JM14B.length - 1; i++) {
    const p1 = JM14B[i];
    const p2 = JM14B[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2.2)
  stroke(chosen.colors[6])
  
  curveVertex(JM14B3[JM14B3.length - 1].x, JM14B3[JM14B3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JM14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM14B2.length - 1; i++) {
    const p1 = JM14B2[i];
    const p2 = JM14B2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))
  curveVertex(JM14B2[JM14B2.length - 1].x, JM14B2[JM14B2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o5JM14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM14Bg.length - 1; i++) {
    const p1 = JM14Bg[i];
    const p2 = JM14Bg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(0,0,0,14)
  //fill(0,0,0,1)

  curveVertex(JM14Bg[JM14Bg.length - 1].x, JM14Bg[JM14Bg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o6JM14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM14Bg.length - 1; i++) {
    const p1 = JM14Bg[i];
    const p2 = JM14Bg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JM14Bg[JM14Bg.length - 1].x, JM14Bg[JM14Bg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function o7JM14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM14Bg.length - 1; i++) {
    const p1 = JM14Bg[i];
    const p2 = JM14Bg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(JM14Bg[JM14Bg.length - 1].x, JM14Bg[JM14Bg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function JM14Bki() {
   
     let chosen = chooseRandomColor();
  for (let p of JM14Bk) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let JM14Bk = [];
function fountainPenJM14B() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JM14B.length - 1; i++) {
    const p1 = JM14B[i];
    const p2 = JM14B[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}

function sprayPaintJM14B() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(chosen.colors[28])
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of sprayPaintJM14B brush
  const minRadius = 30;
  const sprayDensity = 80;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 13; i < JM14B.length - 1; i++) {
    const p1 = JM14B[i];
    const p2 = JM14B[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
stroke(chosen.colors[28])
        // draw the random point
        point(lerpX + randX, lerpY + randY);
      }
    }
  }
}


///////
let JM13A = [];
let JM13A2 = [];
let JM13A3 = [];
let JM13Ag = [];


function drawJM13() {
 // //////background(255);
  JM13Aki()
  let chosen = chooseRandomColor();
 
    o2JM13A()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  for (let i = 2; i < JM13A.length - 1; i++) {
    const p1 = JM13A[i];
    const p2 = JM13A[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/10 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,160));

  curveVertex(JM13A[JM13A.length - 1].x, JM13A[JM13A.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPenJM13A()
//hatchingJM13A()
sprayPaint()  
  t++;
    
   

}
function o2JM13A() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM13A2.length - 1; i++) {
    const p1 = JM13A2[i];
    const p2 = JM13A2[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(chosen.colors[16])

  curveVertex(JM13A2[JM13A2.length - 1].x, JM13A2[JM13A2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JM13A()
 o4JM13A()
  o5JM13A()
  o6JM13A()
  o7JM13A()
  t++;
}


function o3JM13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JM13A.length - 1; i++) {
    const p1 = JM13A[i];
    const p2 = JM13A[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2.2)
  stroke(chosen.colors[6])
  
  curveVertex(JM13A3[JM13A3.length - 1].x, JM13A3[JM13A3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JM13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM13A2.length - 1; i++) {
    const p1 = JM13A2[i];
    const p2 = JM13A2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))

  curveVertex(JM13A2[JM13A2.length - 1].x, JM13A2[JM13A2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o5JM13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM13Ag.length - 1; i++) {
    const p1 = JM13Ag[i];
    const p2 = JM13Ag[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(0,0,0,14)
  curveVertex(JM13Ag[JM13Ag.length - 1].x, JM13Ag[JM13Ag.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJM13A()
  t++;
}

function o6JM13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM13Ag.length - 1; i++) {
    const p1 = JM13Ag[i];
    const p2 = JM13Ag[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JM13Ag[JM13Ag.length - 1].x, JM13Ag[JM13Ag.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJM13A()
  t++;
}


function o7JM13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM13Ag.length - 1; i++) {
    const p1 = JM13Ag[i];
    const p2 = JM13Ag[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(JM13Ag[JM13Ag.length - 1].x, JM13Ag[JM13Ag.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJM13A()
  t++;
}


function JM13Aki() {
  windJM13A() 
     let chosen = chooseRandomColor();
  for (let p of JM13Ak) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function windJM13A() {
  const gravity = 1.3; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...JM13Ak]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let JM13Ak = [];
function fountainPenJM13A() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JM13A.length - 1; i++) {
    const p1 = JM13A[i];
    const p2 = JM13A[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatchingJM13A() {
  windJM13A()
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(chosen.colors[50])
//fill(chosen.colors[55])
  let speed = 3; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 5; i < JM13A.length - 1; i++) {
    const p1 = JM13A[i];
    const p2 = JM13A[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
      
      //noStroke()
     // circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}

function sprayPaint() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(chosen.colors[28])
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of spraypaint brush
  const minRadius = 30;
  const sprayDensity = 80;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 13; i < JM13A.length - 1; i++) {
    const p1 = JM13A[i];
    const p2 = JM13A[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
stroke(chosen.colors[28])
        // draw the random point
        point(lerpX + randX, lerpY + randY);
      }
    }
  }
}



//////////
//bad



let JM122 = [];
let JM123 = [];
let JM12g = [];


function drawJM12() {
 // //////background(255);
 
  let chosen = chooseRandomColor();
 
    o2JM12()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  for (let i = 2; i < JM12.length - 1; i++) {
    const p1 = JM12[i];
    const p2 = JM12[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/11 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  

    stroke(0,0,0,random(0,160));
  curveVertex(JM12[JM12.length - 1].x, JM12[JM12.length - 1].y);
  endShape();

noFill()
//hatching()
  
  t++;

}
function o2JM12() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM122.length - 1; i++) {
    const p1 = JM122[i];
    const p2 = JM122[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  
  stroke(chosen.colors[16])

  curveVertex(JM122[JM122.length - 1].x, JM122[JM122.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JM12()
 o4JM12()
  o5JM12()
  o6JM12()
  noFill()
  t++;
}


function o3JM12() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JM12.length - 1; i++) {
    const p1 = JM12[i];
    const p2 = JM12[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2.2)
  stroke(chosen.colors[6])
  
  curveVertex(JM123[JM123.length - 1].x, JM123[JM123.length - 1].y);
  endShape();
noFill()
  // draw the eyes with Picasso style

  t++;
}

function o4JM12() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM122.length - 1; i++) {
    const p1 = JM122[i];
    const p2 = JM122[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))

  curveVertex(JM122[JM122.length - 1].x, JM122[JM122.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
noFill()
  t++;
}

function o5JM12() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM12g.length - 1; i++) {
    const p1 = JM12g[i];
    const p2 = JM12g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[30])
  curveVertex(JM12g[JM12g.length - 1].x, JM12g[JM12g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
noFill()
  t++;
}

function o6JM12() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM12g.length - 1; i++) {
    const p1 = JM12g[i];
    const p2 = JM12g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JM12g[JM12g.length - 1].x, JM12g[JM12g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
noFill()
  t++;
}


function bad() {
  windJM12() 
     let chosen = chooseRandomColor();
  for (let p of JM12k) {
 //stroke(0,0,0,random(10,215))
    stroke(chosen.colors[30])
    strokeWeight(random(0.1,1))
    const N = (z) => noise(p.x / 45, p.y / 45, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width ) {
    //noLoop();
  }
}

function bad2() {
  windJM12() 
     let chosen = chooseRandomColor();
  for (let p of JM12k) {
 stroke(0,0,0,random(10,50))
    stroke(chosen.colors[40])
    strokeWeight(random(0.1,1))
    const N = (z) => noise(p.x / 5, p.y / 5, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width ) {
    //noLoop();
  }
}

function windJM12() {
  const gravity = 0.9; // additional gravity
  const windSpeed = 54; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...JM12k]) {
    const n = noise(p.x / 539, p.y / 539, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let JM12k = [];




//////////


let JM11 = [];
let JM112 = [];
let JM113 = [];
let JM11g = [];

function drawJM11() {
 // //////background(255);
  JM11ki()
  let chosen = chooseRandomColor();
 
    o2JM11()

  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM11.length - 1; i++) {
    const p1 = JM11[i];
    const p2 = JM11[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/12 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(1.8)
  stroke(0,0,0,random(0,160));

  curveVertex(JM11[JM11.length - 1].x, JM11[JM11.length - 1].y);
  endShape();

  // draw the eyes with Picasso style


  
  t++;
}

function o2JM11() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM112.length - 1; i++) {
    const p1 = JM112[i];
    const p2 = JM112[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(chosen.colors[16])

  curveVertex(JM112[JM112.length - 1].x, JM112[JM112.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JM11()
 o4JM11()
  o5JM11()
  o6JM11()
  t++;
}


function o3JM11() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JM11.length - 1; i++) {
    const p1 = JM11[i];
    const p2 = JM11[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2.2)
  stroke(chosen.colors[6])
  
  curveVertex(JM113[JM113.length - 1].x, JM113[JM113.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JM11() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM112.length - 1; i++) {
    const p1 = JM112[i];
    const p2 = JM112[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))

  curveVertex(JM112[JM112.length - 1].x, JM112[JM112.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o5JM11() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM11g.length - 1; i++) {
    const p1 = JM11g[i];
    const p2 = JM11g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[30])
  curveVertex(JM11g[JM11g.length - 1].x, JM11g[JM11g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o6JM11() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM11g.length - 1; i++) {
    const p1 = JM11g[i];
    const p2 = JM11g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JM11g[JM11g.length - 1].x, JM11g[JM11g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function JM11ki() {
   
     let chosen = chooseRandomColor();
  for (let p of JM11k) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.8))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let JM11k = [];






//////////
let JM10 = [];
let JM102 = [];
let JM103 = [];
let JM10g = [];
function drawJM9() {
 // //////background(255);
  JM10ki()
  let chosen = chooseRandomColor();
 
    o2JM10()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  //stroke(0)
  for (let i = 10; i < JM10.length/1; i++) {
    
    
    const p = JM10[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    strokeWeight(1.2);
    point(p.x, p.y);
    noStroke()

   fill(255, 204, 0);
    //stroke(111)
    circle(p.x, p.y,p.size/random(20,40) )
    noFill()
        //stroke(0)
    
    
  
  for (let i = 4; i < JM10.length - 1; i++) {
    const p1 = JM10[i];
    const p2 = JM10[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
    
    
    if (i === 5) {
      const r1 = generateRandomNumberjm9()/13 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = generateRandomNumberjm9()/2 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, generateRandomNumberjm9(), 1.9, 1.9, 1.5);

  }
    strokeWeight(1.2) 
    noFill()
   curveVertex(cx, cy);
  }
  stroke(0, 0, 0,random(0,40));
  curveVertex(JM10[JM10.length - 1].x, JM10[JM10.length - 1].y);
  endShape();

 
  }




  noStroke();

  // draw the eyes with Picasso style
fountainPenMJ9()
hatchingMJ9()
  
  t++;
}

function o2JM10() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM102.length - 1; i++) {
    const p1 = JM102[i];
    const p2 = JM102[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(chosen.colors[16])

  curveVertex(JM102[JM102.length - 1].x, JM102[JM102.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JM10()
 o4JM10()
  o5JM10()
  o6JM10()
  t++;
}


function o3JM10() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JM10.length - 1; i++) {
    const p1 = JM10[i];
    const p2 = JM10[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2.2)
  stroke(chosen.colors[6])
  
  curveVertex(JM103[JM103.length - 1].x, JM103[JM103.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JM10() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM102.length - 1; i++) {
    const p1 = JM102[i];
    const p2 = JM102[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))

  curveVertex(JM102[JM102.length - 1].x, JM102[JM102.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function generateRandomNumberjm9() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}

function o5JM10() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM10g.length - 1; i++) {
    const p1 = JM10g[i];
    const p2 = JM10g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[30])
  curveVertex(JM10g[JM10g.length - 1].x, JM10g[JM10g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o6JM10() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM10g.length - 1; i++) {
    const p1 = JM10g[i];
    const p2 = JM10g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.9)
  //stroke(255,255,255,random(1,150))
 stroke(0,0,0,20)
  curveVertex(JM10g[JM10g.length - 1].x, JM10g[JM10g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function JM10ki() {
   
     let chosen = chooseRandomColor();
  for (let p of JM10k) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.8))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let JM10k = [];
function fountainPenMJ9() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JM10.length - 1; i++) {
    const p1 = JM10[i];
    const p2 = JM10[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatchingMJ9() {
  
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(chosen.colors[50])
//fill(chosen.colors[55])
  let speed = 3; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 5; i < JM10.length - 1; i++) {
    const p1 = JM10[i];
    const p2 = JM10[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
      
      //noStroke()
     // circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}








////////
//rangi


let JM8 = [];
let JM82 = [];
let JM83 = [];
let JM8g = [];



function drawJM8() {
 // //////background(255);
  
  let chosen = chooseRandomColor();
 
    o2JM8()
o3JM8()
 
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM8.length - 1; i++) {
    const p1 = JM8[i];
    const p2 = JM8[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
    stroke(chosen.colors[50])

    if (i === 5) {
      const r1 = 120 //random(10, 100);
stroke(chosen.colors[20])
      
      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = 30 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
stroke(chosen.colors[40])

arc(cx, cy+1, cx/2, 1.9, 1.9, 1.5);
      } else if (i === 4) {
      const r9 = 125 //random(50, 200);
            strokeWeight(10.8)
stroke(0)
      ellipse(cx, cy, r9);
    }
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2)
  stroke(0,0,0,random(0,160));

  curveVertex(JM8[JM8.length - 1].x, JM8[JM8.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  
  
  t++;
}

function o2JM8() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM82.length - 1; i++) {
    const p1 = JM82[i];
    const p2 = JM82[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(chosen.colors[16])

  curveVertex(JM82[JM82.length - 1].x, JM82[JM82.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function o3JM8() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JM8.length - 1; i++) {
    const p1 = JM8[i];
    const p2 = JM8[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -5; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -5; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(10.2)
  stroke(chosen.colors[6])
  
  curveVertex(JM83[JM83.length - 1].x, JM83[JM83.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JM8() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JM82.length - 1; i++) {
    const p1 = JM82[i];
    const p2 = JM82[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(0,0,0,random(1,100))

  curveVertex(JM82[JM82.length - 1].x, JM82[JM82.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}




////////

let JM7 = [];
let JM72 = [];
let JM73 = [];
let xoffJM7 = 0;
let yoffJM7 = 0;

function drawJM7() {
 
  
     o2JM7()
o3JM7()

 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
   /* [fix] متن روی بوم حذف شد */ // text(String.fromCharCode(9608), JM7[1].x, JM7[1].y);

 for (let i = 4; i < JM7.length - 1; i++) {
    const p1 = JM7[i];
    const p2 = JM7[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 10);
     stroke(0)
    
 
    if (i === 5) {
      const r1 = generateRandomNumber1JM7()/14 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber1JM7(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
      noFill()
      //ellipse(cx, cy, r2);
    generateRandomNumber1JM7()/4 
    noFill()
   curveVertex(cx, cy);
  }
    stroke(0, 0, 0,random(200,255));

  curveVertex(JM7[JM7.length - 1].x, JM7[JM7.length - 1].y);
  endShape();


 
  

//hatching() 

  noStroke();

  //sprayPaint()
  
  t++;

}


function generateRandomNumber1JM7() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}



function o2JM7() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM7.length - 1; i++) {
    const p1 = JM7[i];
    const p2 = JM7[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 125 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
    } 
    noFill()
    generateRandomNumber1JM7()/3 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,random(1,200));
   strokeWeight(0.2)

  curveVertex(JM7[JM7.length - 1].x, JM7[JM7.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPenJM7()

  t++;
}


function o3JM7() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < JM7.length - 1; i++) {
    const p1 = JM7[i];
    const p2 = JM7[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,32)
  stroke(0, 0, 0,random(1,200));
   generateRandomNumber1JM7()/5 
  curveVertex(JM73[JM73.length - 1].x, JM73[JM73.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPenJM7() {
  stroke(30, 30, 0, 255);
  strokeWeight(random(0.1,0.9));
  const width = random(1,45);
  const lerps = 6;

  for (let i = 12; i < JM7.length - 1; i++) {
    const p1 = JM7[i];
    const p2 = JM7[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}




////////

let JM6 = [];
let JM62 = [];
let JM63 = [];


function drawJM6() {


 
  strokeWeight(2);
  stroke(0);

noFill()



    
     beginShape();
  curveVertex(JM6[1].x, JM6[1].y);

  for (let i = 2; i < JM6.length - 1; i++) {
    const p1 = JM6[i];
    const p2 = JM6[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;

     
    
    
      if (i === 5) {
      const r1 = generateRandomNumber1JM6()/15 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = generateRandomNumber1JM6()  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1JM6(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
    
    stroke(0)
     strokeWeight(0.3)
    noFill()
   curveVertex(cx, cy);
   fill(255, 204, 0);

fill(255,10)
  }
curveVertex(JM6[JM6.length - 1].x, JM6[JM6.length - 1].y); 
  endShape();

  


  noStroke();

  //prayPaint()
    
     o2JM6()
 o3JM6()


  t++;

}


function generateRandomNumber1JM6() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}


function o2JM6() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
    curveVertex(JM6[1].x, JM6[1].y);

  
  for (let i = 2; i < JM6.length - 1; i++) {
    const p1 = JM6[i];
    const p2 = JM6[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);

 
    if (i === 5) {
      const ra = generateRandomNumber1JM6()/2  //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
    } 
    noFill()
    strokeWeight(0.1) 
     stroke(0)
    noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(7)

fill(255,50)


  curveVertex(JM6[JM6.length - 1].x, JM6[JM6.length - 1].y);
  endShape();

  // draw the eyes with Picasso style


  t++;
}


function o3JM6() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
      curveVertex(JM6[1].x, JM6[1].y, JM6[1].z);

   for (let i = 2; i < JM6.length - 1; i++) {
    const p1 = JM6[i];
    const p2 = JM6[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
     
 
    strokeWeight(p1.size / 35);
     stroke(0)
    noFill()
   curveVertex(cx, cy);
  }
                //strokeWeight(2)
  //stroke(0);
fill(200,200,200,10)
  stroke(0, 0, 0,50);
   strokeWeight(0.2)

  curveVertex(JM6[JM6.length - 1].x, JM6[JM6.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


//////////

let JM5 = [];
let JM52 = [];
let JM53 = [];
let xoffJM5 = 0;
let yoffJM5 = 0;

function drawJM5() {

  
    // o2JM5()
 o3JM5()

 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
     beginShape();
  curveVertex(JM5[1].x, JM5[1].y);

  for (let i = 2; i < JM5.length - 1; i++) {
    const p1 = JM5[i];
    const p2 = JM5[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    const asciiValue = map(cx, 0, windowWidth, 33, 226); // تبدیل مختصات x به ASCII
    const asciiChar = String.fromCharCode(asciiValue); // تبدیل عدد ASCII به کاراکتر ASCII
    
    
    
    
      if (i === 5) {
      const r1 = generateRandomNumber1JM5()/16 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      noFill()
arc(cx, cy, generateRandomNumber1JM5(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
    
    
     strokeWeight(0.12)
        noFill()
   curveVertex(cx, cy);
    fill(0)
textSize(random(12,14));

    /* [fix] متن روی بوم حذف شد */ // text(asciiChar, cx, cy); // نمایش کاراکتر ASCII
    noFill()
  }
 curveVertex(JM5[JM5.length - 1].x, JM5[JM5.length - 1].y);
  endShape();

  



  noStroke();

  //sprayPaint()
  
  t++;

}

function generateRandomNumber1JM5() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}



function o2JM5() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM5.length - 1; i++) {
    const p1 = JM5[i];
    const p2 = JM5[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 125 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
    } 
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(JM5[JM5.length - 1].x, JM5[JM5.length - 1].y);
  endShape();

  // draw the eyes with Picasso style


  t++;
}


function o3JM5() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < JM52.length - 1; i++) {
    const p1 = JM52[i];
    const p2 = JM52[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,32)
  stroke(0, 0, 0,255);
   strokeWeight(22)
  curveVertex(JM53[JM53.length - 1].x, JM53[JM53.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

///////
let JM4 = [];
let JM42 = [];
let JM43 = [];
let xoffJM4 = 0;
let yoffJM4 = 0;

function drawJM4() {
 
  
     o2JM4()
 o3JM4()

 
  strokeWeight(2);
  stroke(0);

  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
  for (let i = 4; i < JM4.length - 1; i++) {
    const p1 = JM4[i];
    const p2 = JM4[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 10);
     stroke(0)
    
 
    if (i === 5) {
      const r1 = generateRandomNumber1JM4()/17 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber1JM4(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
      noFill()
      //ellipse(cx, cy, r2);
    strokeWeight(2.1) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(JM4[JM4.length - 1].x, JM4[JM4.length - 1].y);
  endShape();

 
  



  noStroke();


  
  t++;

}


function generateRandomNumber1JM4() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}



function o2JM4() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM4.length - 1; i++) {
    const p1 = JM4[i];
    const p2 = JM4[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 125 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
    } 
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(JM4[JM4.length - 1].x, JM4[JM4.length - 1].y);
  endShape();

  // draw the eyes with Picasso style


  t++;
}


function o3JM4() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < JM4.length - 1; i++) {
    const p1 = JM4[i];
    const p2 = JM4[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,32)
  stroke(0, 0, 0,255);
   strokeWeight(22)
  curveVertex(JM43[JM43.length - 1].x, JM43[JM43.length - 1].y);
  endShape();
noFill()
  // draw the eyes with Picasso style

  t++;
}



////////

let MJ3 = [];
let MJ32 = [];
let MJ33 = [];
let linesMJ3= [];

function drawMJ3() {
  
  
    // o2()
 //o3()

 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
  
  for (let i = 2; i < MJ3.length - 1; i++) {
    const p1 = MJ3[i];
    const p2 = MJ3[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    const asciiValue = map(cx, 0, windowWidth, 33, 126); // تبدیل مختصات x به ASCII
    const asciiChar = String.fromCharCode(asciiValue); // تبدیل عدد ASCII به کاراکتر ASCII
    /* [fix] متن روی بوم حذف شد */ // text(asciiChar, cx, cy); // نمایش کاراکتر ASCII
    
    if (i === 5) {
      const r1 = generateRandomNumber1MJ3()/18 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber1MJ3(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
  }  else if (i === 10) {
      const r4 = 80 //random(50, 200);
            strokeWeight(12)
   stroke(0);
  // stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }    

   stroke(0);
            strokeWeight(1.2)
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(MJ3[MJ3.length - 1].x, MJ3[MJ3.length - 1].y);
  endShape();

 fill(255,random(0,255));
	
	
		
		
  



  noStroke();

  //sprayPaint()
  
  t++;
        
    
}


function generateRandomNumber1MJ3() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}

//////////

let JM2 = [];
let JM22 = [];
let JM23 = [];
let xoffJM2 = 0;
let yoffJM2 = 0;
function drawJM2() {

  
     o2JM2()
 o3JM2()

 
  strokeWeight(2);
  stroke(0);

  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
  for (let i = 4; i < JM2.length - 1; i++) {
    const p1 = JM2[i];
    const p2 = JM2[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 10);
     stroke(0)
    
 
    if (i === 5) {
      const r1 = generateRandomNumber1JM2()/19 //random(10, 100);
   stroke(255, 204, 0);
fill(255,50)
      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      noFill()
arc(cx, cy, generateRandomNumber1JM2(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
      noFill()
      //ellipse(cx, cy, r2);
    strokeWeight(2.1) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(JM2[JM2.length - 1].x, JM2[JM2.length - 1].y);
  endShape();

 


  noStroke();

  //sprayPaint()
  
  t++;

}


function generateRandomNumber1JM2() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}




function o2JM2() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM2.length - 1; i++) {
    const p1 = JM2[i];
    const p2 = JM2[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 125 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
    } 
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(JM2[JM2.length - 1].x, JM2[JM2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style


  t++;
}


function o3JM2() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < JM2.length - 1; i++) {
    const p1 = JM2[i];
    const p2 = JM2[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,32)
  stroke(0, 0, 0,255);
   strokeWeight(22)
  curveVertex(JM23[JM23.length - 1].x, JM23[JM23.length - 1].y);
  endShape();
noFill()
  // draw the eyes with Picasso style

  t++;
}




///////
let JM1 = [];
let JM12 = [];
let JM13 = [];
let xoffJM1 = 0;
let yoffJM1 = 0;

function drawJM1() {

  
     o2JM1()
 o3JM1()

 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
  for (let i = 0; i < JM1.length - 1; i++) {
    
    
    const p1 = JM1[i];
    const p2 = JM1[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
 
     stroke(0)
     const asciiValue = map(cx, 0, windowWidth, 33, 126); // تبدیل مختصات x به ASCII
    const asciiChar = String.fromCharCode(asciiValue); // تبدیل عدد ASCII به کاراکتر ASCII
    /* [fix] متن روی بوم حذف شد */ // text(asciiChar, cx, cy); // نمایش کاراکتر ASCII
 
    if (i === 5) {
      const r1 = generateRandomNumber1JM1()/20 //random(10, 100);
   stroke(255, 204, 0);
fill(255,50)
      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber1JM1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
  }  else if (i === 10) {
      const r4 = 80 //random(50, 200);
            strokeWeight(12)
   stroke(0);
  // stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }    
noFill()

      noFill()
    strokeWeight(0.1) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(JM1[JM1.length - 1].x, JM1[JM1.length - 1].y);
  endShape();

 fill(255,random(0,255));
	
	
		
		
  



  noStroke();

  //sprayPaint()
  
  t++;
        
    
}


function generateRandomNumber1JM1() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 800) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}


function generateRandomNumber21JM1() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber2 = Math.floor(Math.random() * 700) + 12; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber2;
}


function o2JM1() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JM1.length - 1; i++) {
    const p1 = JM1[i];
    const p2 = JM1[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 60 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      //fill(0)
         fill(255, 204, 0);
         stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, ra);
     }  else if (i === 10) {
      const r4 = 30 //random(50, 200);
            strokeWeight(12)
   stroke(0);
         fill(255, 204, 0);

   //stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }   
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(JM1[JM1.length - 1].x, JM1[JM1.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPenJM1()

  t++;
}


function o3JM1() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < JM1.length - 1; i++) {
    const p1 = JM1[i];
    const p2 = JM1[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,30)
  stroke(0, 0, 0,255);
   strokeWeight(16.2)
  curveVertex(JM13[JM13.length - 1].x, JM13[JM13.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPenJM1() {
  stroke(30, 30, 0, 255);
  strokeWeight(random(0.1,0.9));
  const width = random(1,45);
  const lerps = 6;

  for (let i = 12; i < JM1.length - 1; i++) {
    const p1 = JM1[i];
    const p2 = JM1[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function getAsciiChar(x, y) {
  const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];
  const brightness = Brightness(get(x, y));
  const index = floor(map(brightness, 0, 255, 0, asciiChars.length));
  return asciiChars[index];
}

//////////

let shapes11 = [
  [drawl1],[drawl2],[drawl3],[drawl2],[drawl3],[drawl4],[drawl5],[drawl6],[drawl8],[drawl10],[drawl11],[drawl12],[drawl13],[hk3],[hk3],[ENT3],[WW1],[kha2],[Mo1],[WW2],[wr04],[kha2],[WW3],[KIP],[LIK],[ww5],[CIL],[OD],[NB],[wrc],[wr],[picasso],[SS1],[drawPointb],[o8],[o8QR11],[o801],[o802],[o804],[o808],[o8QR10],[o830],[o7],[o7QR11],[o701],[o702],[o704],[o705],[o708],[o7QR10],[o730],[o6],[o6QR11],[o601],[o602],[o604],[o605],[o608],[o6QR10],[o630],[o5],[o5QR11],[o501],[o502],[o504],[o505],[o508],[o5QR10],[o530],[o4],[o4QR11],[o401],[o402],[o404],[o405],[o408],[o4QR10],[o430],[o3],[o3QR11],[o301],[o302],[o304],[o305],[o308],[o312],[o313],[o314],[o315],[o316],[o317],[o3QR10],[o330],[o324],[o323],[o322],[o318],[o2],[o2QR11],[o201],[o202],[o204],[o205],[o208],[o212],[o213],[o214],[o215],[o216],[o217],[o2QR10],[o230],[o224],[o223],[o222],[o218],[draw1],[draw2],[draw3],[draw4],[draw5],[draw6],[draw7],[draw8],[draw9],[draw10],[draw11],[draw12],[draw13],[draw14],[draw15],[draw16],[draw17],[draw18],[draw19],[draw20],[draw21],[draw22],[draw23],[draw24],[draw25],[draw26],[draw27],[draw28],[draw29],[draw30],[draw31],[draw32],[draw33],[draw34],[draw35],[draw36],[ENT3],[OD],[ENT2],[Mo1],[kha2]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes11.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx11() {
   bad()
   bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes11.length) {
        let shape11Functions = shapes11[shapeIndex];
        for (let k = 0; k < shape11Functions.length; k++) {
          shape11Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}




////////////
let shapes10 = [
  [o2],[o2QR11],[o201],[o202],[o204],[o205],[o208],[o212],[o213],[o214],[o215],[o216],[o217],[o2QR10],[o230],[o224],[o223],[o222],[o218]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes10.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx10() {
   bad()
   bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes10.length) {
        let shape10Functions = shapes10[shapeIndex];
        for (let k = 0; k < shape10Functions.length; k++) {
          shape10Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}






///////////
let shapes9 = [
  [o4],[o4QR11],[o401],[o402],[o404],[o405],[o408],[o4QR10],[o430]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes9.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx9() {
   bad()
   bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes9.length) {
        let shape9Functions = shapes9[shapeIndex];
        for (let k = 0; k < shape9Functions.length; k++) {
          shape9Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}

////////
let shapes8 = [
  [o5],[o5QR11],[o501],[o502],[o504],[o505],[o508],[o5QR10],[o530
]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes8.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx8() {
   bad()
   bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes8.length) {
        let shape8Functions = shapes8[shapeIndex];
        for (let k = 0; k < shape8Functions.length; k++) {
          shape8Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}


/////////

let shapes7 = [
  [o6],[o6QR11],[o601],[o602],[o604],[o605],[o608],[o6QR10],[o630]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes7.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx7() {
   bad()
   bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes7.length) {
        let shape7Functions = shapes7[shapeIndex];
        for (let k = 0; k < shape7Functions.length; k++) {
          shape7Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}


////////
let shapes6 = [
  [o7],[o7QR11],[o701],[o702],[o704],[o705],[o708],[o7QR10],[o730]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes6.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx6() {
   bad()
   bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes6.length) {
        let shape6Functions = shapes6[shapeIndex];
        for (let k = 0; k < shape6Functions.length; k++) {
          shape6Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}






///////////////

///// khat kahti rangi

let shapes5 = [
  [o8],[o8QR11],[o801],[o802],[o804],[o808],[o8QR10],[o830],[o8],[o8QR11],[o801],[o802],[o804],[o808],[o8QR10],[o830],[o8],[o8QR11],[o801],[o802],[o804],[o808],[o8QR10],[o830]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes5.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx5() {
   bad()
   bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes5.length) {
        let shape5Functions = shapes5[shapeIndex];
        for (let k = 0; k < shape5Functions.length; k++) {
          shape5Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}





///[hk3],[hk2],[ENT3],[WW1],[kha2],[Mo1],[OD],[hk2],[ENT3],[WW1],[kha2],[Mo1],[OD],[hk2],[ENT3],[WW1],[kha2],[Mo1],[OD]
////////
let shapes4 = [
  [ENT3],[WW1],[kha2],[Mo1],[OD],[hk2],[ENT3],[WW1],[kha2],[Mo1],[OD],[ENT3],[WW1],[kha2],[Mo1],[OD],[WW1],[kha2],[Mo1],[OD],[hk2],[ENT3],[WW1],[kha2],[Mo1],[OD],[ENT3],[WW1],[kha2],[Mo1],[OD]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes4.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx4() {
   bad()
   bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes4.length) {
        let shape4Functions = shapes4[shapeIndex];
        for (let k = 0; k < shape4Functions.length; k++) {
          shape4Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}







/////////////////

let shapes3 = [
  [drawo8],[drawo7],[drawo6],[drawo4],[drawo5],[drawo3],[drawo2]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes3.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx3() {
   bad()
   bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes3.length) {
        let shape3Functions = shapes3[shapeIndex];
        for (let k = 0; k < shape3Functions.length; k++) {
          shape3Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}
let spacing = 15;
let threadsw = [];

let colorsq=[]
let threads = [];
let numThreads = 50; // تعداد نخ‌ها
let threadSpacing; // 
/////////////
let shapes2 = [
  [drawl1],[drawl2],[drawl3],[drawl2],[drawl3],[drawl4],[drawl5],[drawl6],[drawl8],[drawl10],[drawl11],[drawl12],[drawl13],[hk3],[hk3],[ENT3],[WW1],[kha2],[Mo1],[WW2],[wr04],[kha2],[WW3],[KIP],[LIK],[ww5],[CIL],[OD],[NB],[wrc],[wr],[picasso],[SS1],[drawPointb],[o8],[o8QR11],[o801],[o802],[o804],[o808],[o8QR10],[o830],[o7],[o7QR11],[o701],[o702],[o704],[o705],[o708],[o7QR10],[o730],[o6],[o6QR11],[o601],[o602],[o604],[o605],[o608],[o6QR10],[o630],[o5],[o5QR11],[o501],[o502],[o504],[o505],[o508],[o5QR10],[o530],[o4],[o4QR11],[o401],[o402],[o404],[o405],[o408],[o4QR10],[o430],[o3],[o3QR11],[o301],[o302],[o304],[o305],[o308],[o312],[o313],[o314],[o315],[o316],[o317],[o3QR10],[o330],[o324],[o323],[o322],[o318],[o2],[o2QR11],[o201],[o202],[o204],[o205],[o208],[o212],[o213],[o214],[o215],[o216],[o217],[o2QR10],[o230],[o224],[o223],[o222],[o218],[draw1],[draw2],[draw3],[draw4],[draw5],[draw6],[draw7],[draw8],[draw9],[draw10],[draw11],[draw12],[draw13],[draw14],[draw15],[draw16],[draw17],[draw18],[draw19],[draw20],[draw21],[draw22],[draw23],[draw24],[draw25],[draw26],[draw27],[draw28],[draw29],[draw30],[draw31],[draw32],[draw33],[draw34],[draw35],[draw36],[ENT3],[OD],[ENT2],[Mo1],[kha2]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes2.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx2() {
  
  // bad()
   //bad2()
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes2.length) {
        let shape2Functions = shapes2[shapeIndex];
        for (let k = 0; k < shape2Functions.length; k++) {
          shape2Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}
////////
let shapes1 = [
  [drawl1],[drawl2],[drawl3],[drawl2],[drawl3],[drawl4],[drawl5],[drawl6],[drawl8],[drawl10],[drawl11],[drawl12],[drawl13],[hk3],[hk3],[ENT3],[WW1],[kha2],[Mo1],[WW2],[wr04],[kha2],[WW3],[KIP],[LIK],[ww5],[CIL],[OD],[NB],[wrc],[wr],[picasso],[SS1],[drawPointb],[o8],[o8QR11],[o801],[o802],[o804],[o808],[o8QR10],[o830],[o7],[o7QR11],[o701],[o702],[o704],[o705],[o708],[o7QR10],[o730],[o6],[o6QR11],[o601],[o602],[o604],[o605],[o608],[o6QR10],[o630],[o5],[o5QR11],[o501],[o502],[o504],[o505],[o508],[o5QR10],[o530],[o4],[o4QR11],[o401],[o402],[o404],[o405],[o408],[o4QR10],[o430],[o3],[o3QR11],[o301],[o302],[o304],[o305],[o308],[o312],[o313],[o314],[o315],[o316],[o317],[o3QR10],[o330],[o324],[o323],[o322],[o318],[o2],[o2QR11],[o201],[o202],[o204],[o205],[o208],[o212],[o213],[o214],[o215],[o216],[o217],[o2QR10],[o230],[o224],[o223],[o222],[o218],[draw1],[draw2],[draw3],[draw4],[draw5],[draw6],[draw7],[draw8],[draw9],[draw10],[draw11],[draw12],[draw13],[draw14],[draw15],[draw16],[draw17],[draw18],[draw19],[draw20],[draw21],[draw22],[draw23],[draw24],[draw25],[draw26],[draw27],[draw28],[draw29],[draw30],[draw31],[draw32],[draw33],[draw34],[draw35],[draw36],[ENT3],[OD],[ENT2],[Mo1],[kha2]
]; // لیست شکل‌ها برای رسم در هر مربع

shapes1.sort(() => Math.random() - 0.5); // ترتیب دادن لیست شکل‌ها به صورت رندم

function drawx() {
  
  let step = width / 3; // تعداد و اندازه مربع‌های کوچک
  let margin = step / 10; // حاشیه بین مربع‌ها

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push(); // شروع تنظیمات جدید برای هر مربع
      translate(i * step + margin, j * step + margin); // تغییر مختصات به محل شروع مربع
      scale(1 / 3); // تنظیم اندازه مربع به 1/3 از اندازه کلی صفحه
noFill()
      let shapeIndex= i * 3 + j;
      if (shapeIndex < shapes1.length) {
        let shape1Functions = shapes1[shapeIndex];
        for (let k = 0; k < shape1Functions.length; k++) {
          shape1Functions[k]();
        }
      }

      pop(); // پایان تنظیمات جدید برای هر مربع
    }
  }
}





function drawg() {  


  

//drawx()
 //bad()
   //bad2()
//drawx11()

  // drawx5()
  g1() 
 Cov()
  QD() 
  g2() 

}


function drawyu() {
  noStroke();

  const functions = [drawJMxex1,drawJMxex2,drawMJ3,drawJMxex5,drawJMxex6,drawJMxex7,drawJMxex8,drawJMxex9,drawJMxex11,drawJMxex12,drawJMxex13,drawJMxex14];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction16 = currentFunction16 || MuzSound.pick(16, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction16();


//let chosen = chooseRandomColor();
 //stroke(chosen.colors[16])

//stroke(chosen.colors[6]);
  //rect(0,0,windowWidth,windowHeight)



 

  noStroke();
}

function A50() {
  
   let chosen = chooseRandomColor();
 
    fill(0);

  let numLines = width;
  let lineSpacing = height / (numLines + 1);

  for (let i = 0; i < numLines; i++) {
    let y = lineSpacing * (i + 1);

    let startX = 0;
    let endX = width * 3.25;

    let startNoise = noise(t, y * 0.01);
    let endNoise = noise(t + 100, y * 0.01);

    let curveStartX = lerp(startX, endX, startNoise);
    let curveEndX = lerp(startX, endX, endNoise);

    let curveStartY = y + lineSpacing * 0.2 * noise(t * 12, y * 0.02);
    let curveEndY = y + lineSpacing * 0.2 * noise(t * 2 + 10, y * 0.02);

    let curveControlX1 = curveStartX + lineSpacing * 10.5 * noise(t * 3, y * 0.03);
    let curveControlX2 = curveEndX + lineSpacing * 10.5 * noise(t * 3 + 1000, y * 0.03);

    let curveControlY1 = y + lineSpacing * 1.1 * noise(t * 4, y * 0.04);
    let curveControlY2 = y + lineSpacing * 0.1 * noise(t * 4 + 1000, y * 0.04);

    bezier(
      curveStartX, curveStartY,
      curveControlX1, curveControlY1,
      curveControlX2, curveControlY2,
      curveEndX, curveEndY
    );
  fill(0);
    for (let j = 0; j < 10; j++) {
      let startX = curveStartX + lineSpacing * 10.1 * j;
      let startY = curveStartY + lineSpacing * 10.1 * j;
      let endX = curveEndX + lineSpacing * 10.1 * j;
      let endY = curveEndY + lineSpacing * 10.1 * j;
//stroke(chosen.colors[12]);

      if (j % 2 == 0) {
        line(startX, startY, endX, endY);
      }
    }
  }

  t += 0.02;

}
 
function A49() {
  noStroke()
    //fill(255, 255, 255, 100)
    
   let chosen = chooseRandomColor();
  
   fill(0);

  let numLines = width*2;
  let lineSpacing = height / (numLines + 1);

  for (let i = 0; i < numLines; i++) {
    let y = lineSpacing * (i + 1);

    let startX = 0;
    let endX = width * 0.75;

    let startNoise = noise(t, y * 0.01);
    let endNoise = noise(t + 100, y * 0.01);

    let curveStartX = lerp(startX, endX, startNoise);
    let curveEndX = lerp(startX, endX, endNoise);

    let curveStartY = y + lineSpacing * 0.2 * noise(t * 12, y * 0.02);
    let curveEndY = y + lineSpacing * 0.2 * noise(t * 2 + 1000, y * 0.02);

    let curveControlX1 = curveStartX + lineSpacing * 10.5 * noise(t * 3, y * 0.03);
    let curveControlX2 = curveEndX + lineSpacing * 10.5 * noise(t * 3 + 1000, y * 0.03);

    let curveControlY1 = y + lineSpacing * 1.1 * noise(t * 4, y * 0.04);
    let curveControlY2 = y + lineSpacing * 0.1 * noise(t * 4 + 1000, y * 0.04);

    bezier(
      curveStartX, curveStartY,
      curveControlX1, curveControlY1,
      curveControlX2, curveControlY2,
      curveEndX, curveEndY
    );

    for (let j = 0; j < 10; j++) {
      let startX = curveStartX + lineSpacing * 10.1 * j;
      let startY = curveStartY + lineSpacing * 10.1 * j;
      let endX = curveEndX + lineSpacing * 10.1 * j;
      let endY = curveEndY + lineSpacing * 10.1 * j;
//stroke(chosen.colors[12]);

      if (j % 2 == 0) {
        line(startX, startY, endX, endY);
      }
    }
  }

  t += 0.02;

}
function A48() {
  noStroke()
    //fill(255, 255, 255, 100)
    
   let chosen = chooseRandomColor();
  
   fill(0);

  let numLines = width*2;
  let lineSpacing = height / (numLines + 1);

  for (let i = 0; i < numLines; i++) {
    let y = lineSpacing * (i + 1);

    let startX = 0;
    let endX = width * 0.75;

    let startNoise = noise(t, y * 10.01);
    let endNoise = noise(t + 100, y * 0.01);

    let curveStartX = lerp(startX, endX, startNoise);
    let curveEndX = lerp(startX, endX, endNoise);

    let curveStartY = y + lineSpacing * 0.2 * noise(t * 2, y * 0.02);
    let curveEndY = y + lineSpacing * 0.2 * noise(t * 2 + 100, y * 0.02);

    let curveControlX1 = curveStartX + lineSpacing * 0.5 * noise(t * 3, y * 0.03);
    let curveControlX2 = curveEndX + lineSpacing * 0.5 * noise(t * 3 + 100, y * 0.03);

    let curveControlY1 = y + lineSpacing * 0.1 * noise(t * 4, y * 0.04);
    let curveControlY2 = y + lineSpacing * 0.1 * noise(t * 4 + 100, y * 0.04);

    bezier(
      curveStartX, curveStartY,
      curveControlX1, curveControlY1,
      curveControlX2, curveControlY2,
      curveEndX, curveEndY
    );

    for (let j = 0; j < 10; j++) {
      let startX = curveStartX + lineSpacing * 0.1 * j;
      let startY = curveStartY + lineSpacing * 0.1 * j;
      let endX = curveEndX + lineSpacing * 0.1 * j;
      let endY = curveEndY + lineSpacing * 0.1 * j;
//stroke(chosen.colors[12]);

      if (j % 2 == 0) {
        line(startX, startY, endX, endY);
      }
    }
  }

  t += 0.02;
}


function A47() {
 let chosen = chooseRandomColor();
//fill(chosen.colors[12]);

  
  
   for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      let x = i + random(-15, 15);
      let y = j + random(-15, 15);
      let size = random(5, 15);
      let curve = random(TWO_PI);
      let vertex1 = createVector(size * cos(curve), size * sin(curve));
      let vertex2 = createVector(size * cos(curve + PI), size * sin(curve + PI));
      let vertex3 = createVector(size * cos(curve + HALF_PI), size * sin(curve + HALF_PI));
      let vertex4 = createVector(size * cos(curve + PI + HALF_PI), size * sin(curve + PI + HALF_PI));
      beginShape();
      vertex(x + vertex1.x, y + vertex1.y);
      bezierVertex(x + vertex3.x, y + vertex3.y, x + vertex4.x, y + vertex4.y, x + vertex2.x, y + vertex2.y);
      endShape(CLOSE);
    }
   }
    
  
  //


}

function drawQw() {
  frameRate(60)
  noFill()
//drawx2()
   //bad()
   //bad2()

//drawxp()
  noFill()
//drawQ2()
  //Cov()
 noFill()
  // Cov2()
noFill()
  //drawx()
  //drawx4()
   //Cov2()
  
  //A50()
  noFill()
   // drawx5()
   noFill()
//drawx6()
  
   noFill()
  g1()
   noFill()
   //drawG2()
   noFill()

  noFill()
   QD() 
   noFill()
  // g3()
  
 Cov()
   noFill()
  
  g2() 
  
}


function drawhy() {
  frameRate(60)
  noFill()

   //bad()
   //bad2()

//drawxp()
  noFill()
//drawQ2()
  //Cov()
 noFill()
  // Cov2()
noFill()
  //drawx6()
  //drawx4()
   Cov2()
  noFill()
    //drawx5()
   noFill()
//drawx6()
  //drawx6()
   noFill()
  g1() 
   noFill()
  //drawG2()
  noFill()
   QD() 
   noFill()
  // g3()
 // drawx5()
 Cov()
   noFill()
  g2() 
  
}


function paper() {
  push();
  strokeWeight(1);
  noStroke();
  for (var i = 0; i<width-1; i+=2) {
    for (var j = 0; j<height-1; j+=2) {
    fill(random(205-40, 205+30), 25);
      rect(i, j, 2, 2);
    }
  }

  for (var i = 0; i<30; i++) {
    fill(random(130, 215), random(100, 170));
    rect(random(0, width-2), random(0, height-2), random(1, 3), random(1, 3));
  }
}


function drawg4() {  

  noFill()
 //drawx5()
//drawx6()
   //bad()
   //bad2()
//drawx5()

  noFill()
//drawQ2()
  Cov()
 noFill()
   Cov2()
noFill()
  //drawx()
  g1() 
   Cov2()
  noFill()
  
   QD() 
 
 Cov()
  g2() 

}

/////////
function drawu() {  
  
//frameRate(30)
  
  drawo6() 

 drawo4() 
//QD() 

//  drawQ1()
   //bad()
  // bad2()
 

  noFill()
//drawQ2()
  Cov()
 
  //QD() 
  
  
  //drawline()
//drawJM1()
  //drawJM2()
//  drawH1()
    
//drawMJ3()
 // drawJM4()
 //drawJM5()
    //drawJM6()
      //drawJM7()
//drawJM8()
 // drawJM9()
  // drawJM11()
//drawJM12()
 // drawJM13()
   // drawJM14()
//drawJM15()
//drawJM16()
  //drawJM17()
   // drawJM18()
//drawJM19()
   Cov2()
  //drawx5()
   //drawo5() 
  //g1() 
   Cov2()
   QD() 
 Cov()
   g1() 
QD()
  
   g2()
  

}
let currentFunction1;
let currentFunction2;
let currentFunction3;
let currentFunction4;
let currentFunction5;
let currentFunction6;
let currentFunction7;
let currentFunction8;
let currentFunction9;
let currentFunction10;
let currentFunction11;
let currentFunction12;
let currentFunction13;
let currentFunction14;
let currentFunction15;
let currentFunction16;
let currentFunction17;
let currentFunction18;
let currentFunction19;
let currentFunction20;
let currentFunction21;
let currentFunction30;

function drawpo() {
//drawG3()
// drawG2()
  //drawG1()
   g1() 
  //drawx5()
QD()
  
   g2()
 Cov()
  
  
}
function drawpo4() {
//drawG3()
// drawG2()
  //drawG1()

  //drawx5()
   g1() 
//QD()
   Cov2()
  Cov2()
    QD() 
   g2()
// Cov2()
 
  
}

function drawpo2() {
drawG3()
// drawG2()
  //drawG1()
   g1() 
QD()
  //drawx5()
   g2()
 Cov()
  Cov2()
  
}
function drawpo3() {
//drawG3()
 drawG2()
  //drawG1()
   g1() 
  //drawx5()
QD()
  
   g2()
 Cov()
  Cov2()
  
}

function drawpo5() {
drawG3()
// drawG2()
  //drawG1()
  textA()
   g1() 
QD()
 // drawx5()
  
   g2()
 Cov2()
  Cov2()
  
}

function ol() {
  
 o1lo()

  
}


function QDr() {
  
QD()
     g2()

  
}



function generateBrianEnoRhythm() {
// تولید یک عدد تصادفی بین 0 و 1
let randomValue = Math.random();

// تعیین مدت زمان به ثانیه برای توقف در هر ریتم
let stopDuration = 10000; // 10 seconds

// ریتم آهسته با توقف‌های طولانی
if (randomValue < 0.005) {
setTimeout(() => {
songs[currentIndex].stop();
}, stopDuration);
return random(19000, 112000);
}
// ریتم متوسط با توقف‌های متوسط
else if (randomValue < 0.015) {
setTimeout(() => {
songs[currentIndex].stop();
}, stopDuration);
return random(15000, 17000);
}
// ریتم سریع با توقف‌های کوتاه
else {
setTimeout(() => {
songs[currentIndex].stop();
}, stopDuration);
return random(11000, 13000);
}
}

let isRecordingFinished=[]
let isGrayFilterActive = false;
let framesRecorded = 0;



function draw() {
  MuzSound.frame(); // [MuzSound] یک بار در هر فریم: ویژگی‌های صدا را نرم می‌کند
  //Cov2()
  //QD()
   //drawline1()
 drawQ2j()
 // o1lo()
   

 // drawo8()
  noStroke();
  //drawx5()\
 
 // drawF()
  

   QDr()

//bad();
//bad2();

//drawQ1()
  noFill();
 
//drawline1()
  Cov()
// ol()
 




  //g2();

  noStroke();
}


function Cov2() {
  noStroke();
    g1() 

 
 


  const functions = [drawJM1,drawJM2,drawMJ3,drawJM4,drawJM5,drawJM6,drawJM7,drawJM8,drawJM9,drawJM11,drawJM12,drawJM13,drawJM14,drawJM15,drawJM17,drawJM18,drawJM19,textA];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction17 = currentFunction17 || MuzSound.pick(17, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction17();



 
 
  g2()
  noStroke();
}

function drawxp() {
  noStroke();

  noFill()
  const functions = [drawx,drawx2,drawx3,drawx4,drawx5,drawx6,drawx7,drawx8,drawx9,drawx10];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction19 = currentFunction19 || MuzSound.pick(19, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction19();
noFill()


 
 

  noStroke();
}




function Cov() {
  noStroke();


  const functions = [drawJM1,drawJM2,drawMJ3,drawJM4,drawJM5,drawJM6,drawJM7,drawJM8,drawJM9,drawJM11,drawJM12,drawJM13,drawJM14,drawJM15,drawJM17,drawJM18,drawJM19];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction16 = currentFunction16 || MuzSound.pick(16, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction16();



 
 

  noStroke();
}



function generateRandomNumber1() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}


function drawF2() {  

  textA()
QD()
noFill()
  noStroke() 
drawQ1()
drawQ2()
     g1() 
QD()
  
   g2()
  //g1() 

}


function drawF3() {  

 drawL()
QD()
noFill()
  noStroke() 
drawQ1()
drawQ2()
  drawH1()
   g1() 
QD()
   g2()
  //g1() 

}

function drawline() {  

drawline1()
   g1() 
QD()
   g2()
  //g1() 

}

function drawQ2() {  
  

drawQ2j()
   g1() 
QD()
   g2()
  //g1() 

}

function drawline1() {
  noStroke();


  const functions = [drawJM1,drawJM2,drawMJ3,drawJM4,drawJM5,drawJM6,drawJM7,drawJM8,drawJM9,drawJM11,drawJM12,drawJM13,drawJM14,drawJM15,drawJM17,drawJM18,drawJM19,textA,drawo8,drawo7,drawo6,drawo4,drawo5,drawo3,drawo2];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction12 = currentFunction12 || MuzSound.pick(12, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction12();



 


  noStroke();
}




function drawQ2j() {
  noStroke();
 
      
   
  const functions = [drawl1,drawl2,drawl3,drawl2,drawl3,drawl4,drawl5,drawl6,drawl8,drawl10,drawl11,drawl12,drawl13,hk3,hk3,ENT3,WW1,kha2,Mo1,WW2,wr04,kha2,WW3,KIP,LIK,ww5,CIL,OD,NB,wrc,wr,picasso,SS1,drawPointb,o8,o8QR11,o801,o802,o804,o808,o8QR10,o830,o7,o7QR11,o701,o702,o704,o705,o708,o7QR10,o730,o6,o6QR11,o601,o602,o604,o605,o608,o6QR10,o630,o5,o5QR11,o501,o502,o504,o505,o508,o5QR10,o530,o4,o4QR11,o401,o402,o404,o405,o408,o4QR10,o430,o3,o3QR11,o301,o302,o304,o305,o308,o312,o313,o314,o315,o316,o317,o3QR10,o330,o324,o323,o322,o318,o2,o2QR11,o201,o202,o204,o205,o208,o212,o213,o214,o215,o216,o217,o2QR10,o230,o224,o223,o222,o218,draw1,draw2,draw3,draw4,draw5,draw6,draw7,draw8,draw9,draw10,draw11,draw12,draw13,draw14,draw15,draw16,draw17,draw18,draw19,draw20,draw21,draw22,draw23,draw24,draw25,draw26,draw27,draw28,draw29,draw30,draw31,draw32,draw33,draw34,draw35,draw36,ENT3,OD,ENT2,Mo1,kha2,o1lo];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction14 = currentFunction14 || MuzSound.pick(14, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction14();


 
g1()

  noStroke();
}


function drawQ1() {
  noStroke();
 
      
   
  const functions = [drawpo,
    textA,
    drawpo2,
    drawu,
    drawg4,
    drawQ2,
   Cov2,
   drawF2,
   
    drawF3,
    drawQw,
   drawpo4,
    drawline,
    drawG2,
  drawL,
    
   drawH1,
    drawpo3,
    drawpo5];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction13 = currentFunction13 || MuzSound.pick(13, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction13();



 
 

  noStroke();
}







function drawL() {
  noStroke();

  const functions = [drawl1,drawl2,drawl3,drawl2,drawl3,drawl4,drawl5,drawl6,drawl8,drawl10,drawl11,drawl12,drawl13];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction12 = currentFunction12 || MuzSound.pick(12, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction12();
noFill()

  g1() 
QD()
  
 
 

  noStroke();
}


function textA() {
  noStroke();

  const functions = [hk3,hk2,ENT3,WW1,kha2,Mo1,WW2,wr04,kha2,WW3,KIP,LIK,ww5,CIL,OD,NB,wrc,wr,picasso,SS1,drawPointb];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction11 = currentFunction11 || MuzSound.pick(11, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction11();


     g1() 
QD()
  
   g2()
 
 

  noStroke();
}


//hk3,hk2,ENT3,WW1,kha2,Mo1,WW2,wr04,kha2,WW3,KIP,LIK,ww5,CIL,OD,NB,wrc,wr,picasso,SS1,drawPointb

function drawo8() {
  noStroke();

  const functions = [o8,o8QR11,o801,o802,o804,o808,o8QR10,o830];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction10 = currentFunction10 || MuzSound.pick(10, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction10();



 
 

  noStroke();
}


function drawo7() {
  noStroke();

  const functions = [o7,o7QR11,o701,o702,o704,o705,o708,o7QR10,o730];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction9 = currentFunction9 || MuzSound.pick(9, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction9();



 
 

  noStroke();
}
function drawo6() {
  noStroke();

  const functions = [o6,o6QR11,o601,o602,o604,o605,o608,o6QR10,o630];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction8 = currentFunction8 || MuzSound.pick(8, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction8();



 
 

  noStroke();
}
function drawo5() {
  noStroke();

  const functions = [o5,o5QR11,o501,o502,o504,o505,o508,o5QR10,o530];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction7 = currentFunction7 || MuzSound.pick(7, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction7();



 
 

  noStroke();
}

function drawo4() {
  noStroke();

  const functions = [o4,o4QR11,o401,o402,o404,o405,o408,o4QR10,o430];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction6 = currentFunction6 || MuzSound.pick(6, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction6();

  noStroke();
}

function drawo3() {
  noStroke();

  const functions = [o3,o3QR11,o301,o302,o304,o305,o308,o312,o313,o314,o315,o316,o317,o3QR10,o330,o324,o323,o322,o318];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction5 = currentFunction5 || MuzSound.pick(5, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction5();



 
 

  noStroke();
}


function drawo2() {
  noStroke();

  const functions = [o2,o2QR11,o201,o202,o204,o205,o208,o212,o213,o214,o215,o216,o217,o2QR10,o230,o224,o223,o222,o218];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction4 = currentFunction4 || MuzSound.pick(4, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction4();



 
 

  noStroke();
}



function drawG2() {
  noStroke();

  const functions = [draw1,draw2,draw3,draw4,draw5,draw6,draw7,draw8,draw9,draw10,draw11,draw12,draw13,draw14,draw15,draw16,draw17,draw18,draw19,draw20,draw21,draw22,draw23,draw24,draw25,draw26,draw27,draw28,draw29,draw30,draw31,draw32,draw33,draw34,draw35,draw36,ENT3,OD,ENT2,Mo1,kha2];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction1 = currentFunction1 || MuzSound.pick(1, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction1();

 

 
 

  noStroke();
}

function drawG1() {
  noStroke();

  const functions = [draw1,draw2,draw3,draw4,draw5,draw6,draw7,draw8,draw9,draw10,draw11,draw12,draw13,draw14,draw15,draw16,draw17,draw18,draw19,draw20,draw21,draw22,draw23,draw24,draw25,draw26,draw27,draw28,draw29,draw30,draw31,draw32,draw33,draw34,draw35,draw36,ENT3,OD,ENT2,Mo1,kha2];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction2 = currentFunction2 || MuzSound.pick(2, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction2();

 
}


function drawH1() {
  noStroke();

  const functions = [draw1,draw2,draw3,draw4,draw5,draw6,draw7,draw8,draw9,draw10,draw11,draw12,draw13,draw14,draw15,draw16,draw17,draw18,draw19,draw20,draw21,draw22,draw23,draw24,draw25,draw26,draw27,draw28,draw29,draw30,draw31,draw32,draw33,draw34,draw35,draw36];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction2 = currentFunction2 || MuzSound.pick(2, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction2();
  g1() 
QD()
   g2()

}

function drawG3() {
  noStroke();

  const functions = [draw1,draw2,draw3,draw4,draw5,draw6,draw7,draw8,draw9,draw10,draw11,draw12,draw13,draw14,draw15,draw16,draw17,draw18,draw19,draw20,draw21,draw22,draw23,draw24,draw25,draw26,draw27,draw28,draw29,draw30,draw31,draw32,draw33,draw34,draw35,draw36,ENT3,OD,ENT2,Mo1,kha2];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction3 = currentFunction3 || MuzSound.pick(3, functions); // [fix] انتخاب پایدار در هر اندازهٔ بوم (randomIndex همچنان مصرف می‌شود)
  currentFunction3();
 
}


function drawF() {
  
  const structures = [o804,o808,o830];
  const randomStructure = structures[Math.floor(Math.random() * structures.length)];
  
  const img = createGraphics(width, height); // create an off-screen graphics buffer
  randomStructure(img); // draw a randomly selected structure onto the buffer

  for (let x = 0; x < width; x += 1000) { // draw the abstract paint strokes over the buffer
    for (let y = 0; y < height; y += 1000) {
      img.stroke(random(255), random(255), random(255));
      img.strokeWeight(random(0.005));
      img.point(x + random(-0.5, 0.5), y + random(-0.5, 0.5));
    }
  }

  //image(img, 0, 0); // draw the off-screen buffer onto the canvas
}

let _amount = 10;

 let img;
/////////
function drawf() {
  
  

 drawF()
  
  

  //ENT3()
  ENT2()
 // OD()
 // Mo1()
//kha2()

//draw33()
 // draw32()
  //draw31()
  //draw30()
   //draw29()
 //draw28()
  //draw27()

  //draw26()
   // draw25()
//o2()
  //draw24()
 // draw23()
//back2()
  //back() 
  // draw22()
 // draw21()
 // draw20()
    // draw19()

  //draw18()

  //draw17()
  
  // draw16()
 
  //draw15()
  
 //draw14()
  //draw13()
  //draw12()
   //draw11()
   //draw10()
 //draw9()
 //draw8()
   //draw7()
//draw6()
 //draw5()
 //draw4()
// draw3()
//draw2()
  g1() 
QD()
   g2()
  // draw1()
  //g1() 
}
////////


function G4() {
 // //////background(255);
 // DB1()
  
  PDki()
  let chosen = chooseRandomColor();
 
    //o2()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
 

   fill(255, 204, 0);
    //stroke(111)
   
    noFill()
     strokeWeight(0.2);
 stroke(chosen.colors[6])
curveVertex(windowWidth/2, windowHeight/random(4,5.1));
 // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 10, 150);
  let bg = map(level, 0, 0.8, 250, 255);
  ////////background(bg);

  for (let i = 0; i < palette.length; i++) {
   //fill(palette[1]);
    noStroke();
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    rect(cx, cy, width / bins.length, h/30);
  }
    
      if (i === 5) {
      const r1 = generateRandomNumber3()/2 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber3()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber3(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
   stroke(255);
strokeWeight(random(0.1,20))
  let x = map(noise(xoff), 0, 1, 0, width);
  let y = map(noise(yoff), 0, 1, 0, height);
  point(x, y);
       stroke(255, 10, 0);

    strokeWeight(random(0.1,2))
arc(x, cy, generateRandomNumber3(),10 ,PI - QUARTER_PI, -6*TWO_PI);
  xoff += 0.001;
  yoff += 0.001;
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(1.5)
  stroke(0,0,0,random(0,140));
//fill(255,255,255,random(0,8))
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//fountainPen()
hatching()
sprayPaint()  
  t++;
    
    //g1()

}
//////////

function drawJMxex19() {
 // //////background(255);
  JMxex15Cki()
  let chosen = chooseRandomColor();
 
    o2()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
 curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1));
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1)); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/random(1,2), windowHeight/random(2,3.1)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < JMxex15C.length - 1; i++) {
    const p1 = JMxex15C[i];
    const p2 = JMxex15C[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/2 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,40));
//fill(255,255,255,random(0,8))
  curveVertex(JMxex15C[JMxex15C.length - 1].x, JMxex15C[JMxex15C.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//fountainPen()
//hatching()
sprayPaint()  
  t++;
    
   // g1()

}

///////
function drawJMxex18() {
 // //////background(255);
  JMxex15Cki()
  let chosen = chooseRandomColor();
 
    //o2JMxex15C()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
 
  curveVertex(windowWidth/random(3,3.2), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(0,3.2), windowHeight/random(4,5.1));
curveVertex(windowWidth/random(0,3.2), windowHeight/random(4,5.1));
curveVertex(windowWidth/random(0,3.2), windowHeight/random(4,5.1));
curveVertex(windowWidth/random(3,3.2), windowHeight/random(4,5.1));
curveVertex(windowWidth/random(3,3.2), windowHeight/random(4,5.1));
 curveVertex(windowWidth/random(3,3.2), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(3,2), windowHeight/random(4,5.1)); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/random(3,2), windowHeight/random(4,5.1)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/random(3,2), windowHeight/random(4,5.1)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < JMxex15C.length - 1; i++) {
    const p1 = JMxex15C[i];
    const p2 = JMxex15C[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/5 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,40));

  //fill(chosen.colors[6])
//fill(255,255,255,random(0,8))
  curveVertex(JMxex15C[JMxex15C.length - 1].x, JMxex15C[JMxex15C.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//fountainPen()
//hatching()
//sprayPaint()  
  t++;
    
  

}


////////
function drawJMxex17() {
 // //////background(255);
  JMxex16Xki()
  let chosen = chooseRandomColor();
 


  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8));
 curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.5));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8)); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < JMxex16X.length - 1; i++) {
    const p1 = JMxex16X[i];
    const p2 = JMxex16X[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/7 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,40));
//fill(255,255,255,random(0,8))
  curveVertex(JMxex16X[JMxex16X.length - 1].x, JMxex16X[JMxex16X.length - 1].y);
  endShape();


  
  t++;
    


}
//////////
let JMxex16X = [];
let JMxex16X2 = [];
let JMxex16X3 = [];
let JMxex16Xg = [];

function drawJMxex16() {
 // //////background(255);
  JMxex16Xki()
  let chosen = chooseRandomColor();
 
    o2JMxex16X()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8));
 curveVertex(windowWidth/random(0,1), windowHeight/random(0,5.5));
curveVertex(windowWidth/random(0,1), windowHeight/random(0,3.8)); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/random(0,1), windowHeight/random(0,2.8)); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < JMxex16X.length - 1; i++) {
    const p1 = JMxex16X[i];
    const p2 = JMxex16X[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/7 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
       

  //fill(chosen.colors[6])
  strokeWeight(0.3)
  stroke(0,0,0,random(0,0));
//fill(255,255,255,random(0,8))
  curveVertex(JMxex16X[JMxex16X.length - 1].x, JMxex16X[JMxex16X.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//fountainPen()
//
  
  t++;
    
    //g1()

}
function o2JMxex16X() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex16X2.length - 1; i++) {
    const p1 = JMxex16X2[i];
    const p2 = JMxex16X2[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(8.4)
  stroke(chosen.colors[16])

  curveVertex(JMxex16X2[JMxex16X2.length - 1].x, JMxex16X2[JMxex16X2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JMxex16X()
 o4JMxex16X()
  o5JMxex16X()
  o6JMxex16X()
  o7JMxex16X()
  t++;
}


function o3JMxex16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JMxex16X.length - 1; i++) {
    const p1 = JMxex16X[i];
    const p2 = JMxex16X[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(JMxex16X3[JMxex16X3.length - 1].x, JMxex16X3[JMxex16X3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JMxex16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex16X2.length - 1; i++) {
    const p1 = JMxex16X2[i];
    const p2 = JMxex16X2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(0,0,0,random(100,150))
  curveVertex(JMxex16X2[JMxex16X2.length - 1].x, JMxex16X2[JMxex16X2.length - 1].y);
  endShape();

  
  t++;
  
}
function o5JMxex16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex16Xg.length - 1; i++) {
    const p1 = JMxex16Xg[i];
    const p2 = JMxex16Xg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(JMxex16Xg[JMxex16Xg.length - 1].x, JMxex16Xg[JMxex16Xg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o6JMxex16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex16Xg.length - 1; i++) {
    const p1 = JMxex16Xg[i];
    const p2 = JMxex16Xg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
 
  //fill(chosen.colors[6])
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JMxex16Xg[JMxex16Xg.length - 1].x, JMxex16Xg[JMxex16Xg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function o7JMxex16X() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex16Xg.length - 1; i++) {
    const p1 = JMxex16Xg[i];
    const p2 = JMxex16Xg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(JMxex16Xg[JMxex16Xg.length - 1].x, JMxex16Xg[JMxex16Xg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function JMxex16Xki() {
  
     let chosen = chooseRandomColor();
  for (let p of JMxex16Xk) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let JMxex16Xk = [];
function fountainPen() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JMxex16X.length - 1; i++) {
    const p1 = JMxex16X[i];
    const p2 = JMxex16X[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}






///////////
let JMxex15C = [];
let JMxex15C2 = [];
let JMxex15C3 = [];
let JMxex15Cg = [];

function drawJMxex15() {
 // //////background(255);
  JMxex15Cki()
  let chosen = chooseRandomColor();
 
    o2JMxex15C()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
 
  curveVertex(windowWidth/random(0,2), windowHeight/random(0,5.1));
curveVertex(windowWidth/random(0,2.2), windowHeight/random(0,5.8));
curveVertex(windowWidth/random(0,1.8), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,2.1), windowHeight/random(0,3.8));
curveVertex(windowWidth/random(0,2.1), windowHeight/random(0,2.8));
curveVertex(windowWidth/random(0,2.1), windowHeight/random(0,2.8));
 curveVertex(windowWidth/random(0,2), windowHeight/random(0,5.5));
curveVertex(windowWidth/2.1, windowHeight/3.8); // خط اضافی برای اطمینان از رد شدن حداقل یک بار

curveVertex(windowWidth/2.1, windowHeight/2.8); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
curveVertex(windowWidth/2.1, windowHeight/2.8); // خط اضافی برای اطمینان از رد شدن حداکثر یک بار 
  for (let i = 2; i < JMxex15C.length - 1; i++) {
    const p1 = JMxex15C[i];
    const p2 = JMxex15C[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/8 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,40));
//fill(255,255,255,random(0,8))
  curveVertex(JMxex15C[JMxex15C.length - 1].x, JMxex15C[JMxex15C.length - 1].y);
  endShape();


sprayPaintJMxex15C()  
  t++;
    
    //g1()

}
function o2JMxex15C() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex15C2.length - 1; i++) {
    const p1 = JMxex15C2[i];
    const p2 = JMxex15C2[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(8.4)
  stroke(chosen.colors[16])

  curveVertex(JMxex15C2[JMxex15C2.length - 1].x, JMxex15C2[JMxex15C2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JMxex15C()
 o4JMxex15C()
  o5JMxex15C()
  o6JMxex15C()
  o7JMxex15C()
  t++;
}


function o3JMxex15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JMxex15C.length - 1; i++) {
    const p1 = JMxex15C[i];
    const p2 = JMxex15C[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

  //fill(chosen.colors[6])
       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(JMxex15C3[JMxex15C3.length - 1].x, JMxex15C3[JMxex15C3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JMxex15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex15C2.length - 1; i++) {
    const p1 = JMxex15C2[i];
    const p2 = JMxex15C2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(0,0,0,random(100,150))
  curveVertex(JMxex15C2[JMxex15C2.length - 1].x, JMxex15C2[JMxex15C2.length - 1].y);
  endShape();

  
  t++;
  
}
function o5JMxex15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex15Cg.length - 1; i++) {
    const p1 = JMxex15Cg[i];
    const p2 = JMxex15Cg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)

  //fill(chosen.colors[6])
  curveVertex(JMxex15Cg[JMxex15Cg.length - 1].x, JMxex15Cg[JMxex15Cg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJMxex15C()
  t++;
}

function o6JMxex15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex15Cg.length - 1; i++) {
    const p1 = JMxex15Cg[i];
    const p2 = JMxex15Cg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JMxex15Cg[JMxex15Cg.length - 1].x, JMxex15Cg[JMxex15Cg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJMxex15C()
  t++;
}


function o7JMxex15C() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex15Cg.length - 1; i++) {
    const p1 = JMxex15Cg[i];
    const p2 = JMxex15Cg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))

  //fill(chosen.colors[6])
  curveVertex(JMxex15Cg[JMxex15Cg.length - 1].x, JMxex15Cg[JMxex15Cg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJMxex15C()
  t++;
}


function JMxex15Cki() {
  windJMxex15C() 
     let chosen = chooseRandomColor();
  for (let p of JMxex15Ck) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function windJMxex15C() {
  const gravity = 1.3; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...JMxex15Ck]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let JMxex15Ck = [];
function fountainPenJMxex15C() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JMxex15C.length - 1; i++) {
    const p1 = JMxex15C[i];
    const p2 = JMxex15C[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatchingJMxex15C() {
  windJMxex15C()
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(chosen.colors[50])
//fill(chosen.colors[55])
  let speed = 3; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 5; i < JMxex15C.length - 1; i++) {
    const p1 = JMxex15C[i];
    const p2 = JMxex15C[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
      
      //noStroke()
     // circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}

function sprayPaintJMxex15C() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(255)
  strokeWeight(1);

  const speed = 200;

  // set minimum radius and spray density of sprayPaintJMxex15C brush
  const minRadius = 130;
  const sprayDensity = 44;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 5;

  for (let i = 27; i < JMxex15C.length - 1; i++) {
    const p1 = JMxex15C[i];
    const p2 = JMxex15C[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
strokeWeight(1)
      stroke(0,0,0,1)  
        point(lerpX + randX, lerpY + randY);
       // stroke(255,255,255,random(0,230)) 
       //arc(lerpX + randX, lerpY + randY, 2,6 ,PI , -2*TWO_PI);

      }
    }
  }
}






/////////
let JMxex14B = [];
let JMxex14B2 = [];
let JMxex14B3 = [];
let JMxex14Bg = [];

function drawJMxex14() {
 // //////background(255);
  JMxex14Bki()
  let chosen = chooseRandomColor();
 
    o2JMxex14B()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
  for (let i = 2; i < JMxex14B.length - 1; i++) {
    const p1 = JMxex14B[i];
    const p2 = JMxex14B[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/9 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,10));

  //fill(chosen.colors[6])
  curveVertex(JMxex14B[JMxex14B.length - 1].x, JMxex14B[JMxex14B.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPenJMxex14B()
//hatching()
sprayPaintJMxex14B()  
  t++;
    
   // g1()

}
function o2JMxex14B() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex14B2.length - 1; i++) {
    const p1 = JMxex14B2[i];
    const p2 = JMxex14B2[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(4.4)
  stroke(chosen.colors[16])

  curveVertex(JMxex14B2[JMxex14B2.length - 1].x, JMxex14B2[JMxex14B2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JMxex14B()
 o4JMxex14B()
  o5JMxex14B()
  o6JMxex14B()
  o7JMxex14B()
  t++;
}


function o3JMxex14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JMxex14B.length - 1; i++) {
    const p1 = JMxex14B[i];
    const p2 = JMxex14B[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2.2)
  stroke(chosen.colors[6])

  //fill(chosen.colors[6])
  curveVertex(JMxex14B3[JMxex14B3.length - 1].x, JMxex14B3[JMxex14B3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JMxex14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex14B2.length - 1; i++) {
    const p1 = JMxex14B2[i];
    const p2 = JMxex14B2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))
  curveVertex(JMxex14B2[JMxex14B2.length - 1].x, JMxex14B2[JMxex14B2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o5JMxex14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex14Bg.length - 1; i++) {
    const p1 = JMxex14Bg[i];
    const p2 = JMxex14Bg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(0,0,0,14)
  //fill(0,0,0,1)

  curveVertex(JMxex14Bg[JMxex14Bg.length - 1].x, JMxex14Bg[JMxex14Bg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o6JMxex14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex14Bg.length - 1; i++) {
    const p1 = JMxex14Bg[i];
    const p2 = JMxex14Bg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JMxex14Bg[JMxex14Bg.length - 1].x, JMxex14Bg[JMxex14Bg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function o7JMxex14B() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex14Bg.length - 1; i++) {
    const p1 = JMxex14Bg[i];
    const p2 = JMxex14Bg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))

  //fill(chosen.colors[6])
  curveVertex(JMxex14Bg[JMxex14Bg.length - 1].x, JMxex14Bg[JMxex14Bg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function JMxex14Bki() {
   
     let chosen = chooseRandomColor();
  for (let p of JMxex14Bk) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let JMxex14Bk = [];
function fountainPenJMxex14B() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JMxex14B.length - 1; i++) {
    const p1 = JMxex14B[i];
    const p2 = JMxex14B[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}

function sprayPaintJMxex14B() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(chosen.colors[28])
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of sprayPaintJMxex14B brush
  const minRadius = 30;
  const sprayDensity = 80;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 13; i < JMxex14B.length - 1; i++) {
    const p1 = JMxex14B[i];
    const p2 = JMxex14B[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
stroke(chosen.colors[28])
        // draw the random point
        point(lerpX + randX, lerpY + randY);
      }
    }
  }
}


///////
let JMxex13A = [];
let JMxex13A2 = [];
let JMxex13A3 = [];
let JMxex13Ag = [];


function drawJMxex13() {
 // //////background(255);
  JMxex13Aki()
  let chosen = chooseRandomColor();
 
    o2JMxex13A()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  for (let i = 2; i < JMxex13A.length - 1; i++) {
    const p1 = JMxex13A[i];
    const p2 = JMxex13A[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/10 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()/2  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  stroke(0,0,0,random(0,160));

  curveVertex(JMxex13A[JMxex13A.length - 1].x, JMxex13A[JMxex13A.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPenJMxex13A()
//hatchingJMxex13A()
sprayPaint()  
  t++;
    
   

}
function o2JMxex13A() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex13A2.length - 1; i++) {
    const p1 = JMxex13A2[i];
    const p2 = JMxex13A2[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(chosen.colors[16])

  //fill(chosen.colors[6])
  curveVertex(JMxex13A2[JMxex13A2.length - 1].x, JMxex13A2[JMxex13A2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JMxex13A()
 o4JMxex13A()
  o5JMxex13A()
  o6JMxex13A()
  o7JMxex13A()
  t++;
}


function o3JMxex13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JMxex13A.length - 1; i++) {
    const p1 = JMxex13A[i];
    const p2 = JMxex13A[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2.2)
  stroke(chosen.colors[6])
  
  curveVertex(JMxex13A3[JMxex13A3.length - 1].x, JMxex13A3[JMxex13A3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JMxex13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex13A2.length - 1; i++) {
    const p1 = JMxex13A2[i];
    const p2 = JMxex13A2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))

  //fill(chosen.colors[6])
  curveVertex(JMxex13A2[JMxex13A2.length - 1].x, JMxex13A2[JMxex13A2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o5JMxex13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex13Ag.length - 1; i++) {
    const p1 = JMxex13Ag[i];
    const p2 = JMxex13Ag[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(0,0,0,14)
  curveVertex(JMxex13Ag[JMxex13Ag.length - 1].x, JMxex13Ag[JMxex13Ag.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJMxex13A()
  t++;
}

function o6JMxex13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex13Ag.length - 1; i++) {
    const p1 = JMxex13Ag[i];
    const p2 = JMxex13Ag[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])

  //fill(chosen.colors[6])
  curveVertex(JMxex13Ag[JMxex13Ag.length - 1].x, JMxex13Ag[JMxex13Ag.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJMxex13A()
  t++;
}


function o7JMxex13A() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex13Ag.length - 1; i++) {
    const p1 = JMxex13Ag[i];
    const p2 = JMxex13Ag[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(JMxex13Ag[JMxex13Ag.length - 1].x, JMxex13Ag[JMxex13Ag.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
windJMxex13A()
  t++;
}


function JMxex13Aki() {
  windJMxex13A() 
     let chosen = chooseRandomColor();
  for (let p of JMxex13Ak) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function windJMxex13A() {
  const gravity = 1.3; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...JMxex13Ak]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let JMxex13Ak = [];
function fountainPenJMxex13A() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JMxex13A.length - 1; i++) {
    const p1 = JMxex13A[i];
    const p2 = JMxex13A[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatchingJMxex13A() {
  windJMxex13A()
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(chosen.colors[50])
//fill(chosen.colors[55])
  let speed = 3; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 5; i < JMxex13A.length - 1; i++) {
    const p1 = JMxex13A[i];
    const p2 = JMxex13A[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
      
      //noStroke()
     // circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}

function sprayPaint() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(chosen.colors[28])
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of spraypaint brush
  const minRadius = 30;
  const sprayDensity = 80;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 13; i < JMxex13A.length - 1; i++) {
    const p1 = JMxex13A[i];
    const p2 = JMxex13A[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
stroke(chosen.colors[28])
        // draw the random point
        point(lerpX + randX, lerpY + randY);
      }
    }
  }
}



//////////
//bad



let JMxex122 = [];
let JMxex123 = [];
let JMxex12g = [];


function drawJMxex12() {
 // //////background(255);
 
  let chosen = chooseRandomColor();
 
    o2JMxex12()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  for (let i = 2; i < JMxex12.length - 1; i++) {
    const p1 = JMxex12[i];
    const p2 = JMxex12[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/11 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.3)
  

    stroke(0,0,0,random(0,160));
  curveVertex(JMxex12[JMxex12.length - 1].x, JMxex12[JMxex12.length - 1].y);
  endShape();

noFill()
//hatching()
  
  t++;

}
function o2JMxex12() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex122.length - 1; i++) {
    const p1 = JMxex122[i];
    const p2 = JMxex122[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  
  stroke(chosen.colors[16])

  //fill(chosen.colors[6])
  curveVertex(JMxex122[JMxex122.length - 1].x, JMxex122[JMxex122.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JMxex12()
 o4JMxex12()
  o5JMxex12()
  o6JMxex12()
  noFill()
  t++;
}


function o3JMxex12() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JMxex12.length - 1; i++) {
    const p1 = JMxex12[i];
    const p2 = JMxex12[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2.2)
  stroke(chosen.colors[6])
  
  curveVertex(JMxex123[JMxex123.length - 1].x, JMxex123[JMxex123.length - 1].y);
  endShape();
noFill()
  // draw the eyes with Picasso style

  t++;
}

function o4JMxex12() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex122.length - 1; i++) {
    const p1 = JMxex122[i];
    const p2 = JMxex122[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))

  //fill(chosen.colors[6])
  curveVertex(JMxex122[JMxex122.length - 1].x, JMxex122[JMxex122.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
noFill()
  t++;
}

function o5JMxex12() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex12g.length - 1; i++) {
    const p1 = JMxex12g[i];
    const p2 = JMxex12g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[30])
  curveVertex(JMxex12g[JMxex12g.length - 1].x, JMxex12g[JMxex12g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
noFill()
  t++;
}

function o6JMxex12() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex12g.length - 1; i++) {
    const p1 = JMxex12g[i];
    const p2 = JMxex12g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JMxex12g[JMxex12g.length - 1].x, JMxex12g[JMxex12g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
noFill()
  t++;
}


function bad() {
  windJMxex12() 
     let chosen = chooseRandomColor();
  for (let p of JMxex12k) {
 //stroke(0,0,0,random(10,215))
    stroke(chosen.colors[30])
    strokeWeight(random(0.1,1))
    const N = (z) => noise(p.x / 45, p.y / 45, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width ) {
    //noLoop();
  }
}

function bad2() {
  windJMxex12() 
     let chosen = chooseRandomColor();
  for (let p of JMxex12k) {
 stroke(0,0,0,random(10,50))
    stroke(chosen.colors[40])
    strokeWeight(random(0.1,1))
    const N = (z) => noise(p.x / 5, p.y / 5, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width ) {
    //noLoop();
  }
}

function windJMxex12() {
  const gravity = 0.9; // additional gravity
  const windSpeed = 54; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...JMxex12k]) {
    const n = noise(p.x / 539, p.y / 539, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let JMxex12k = [];




//////////


let JMxex11 = [];
let JMxex112 = [];
let JMxex113 = [];
let JMxex11g = [];

function drawJMxex11() {
 // //////background(255);
  JMxex11ki()
  let chosen = chooseRandomColor();
 
    o2JMxex11()

  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex11.length - 1; i++) {
    const p1 = JMxex11[i];
    const p2 = JMxex11[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = generateRandomNumber1()/12 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = generateRandomNumber1()  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(1.8)
  stroke(0,0,0,random(0,160));

  //fill(chosen.colors[6])
  curveVertex(JMxex11[JMxex11.length - 1].x, JMxex11[JMxex11.length - 1].y);
  endShape();

  // draw the eyes with Picasso style


  
  t++;
}

function o2JMxex11() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex112.length - 1; i++) {
    const p1 = JMxex112[i];
    const p2 = JMxex112[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(chosen.colors[16])

  //fill(chosen.colors[6])
  curveVertex(JMxex112[JMxex112.length - 1].x, JMxex112[JMxex112.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JMxex11()
 o4JMxex11()
  o5JMxex11()
  o6JMxex11()
  t++;
}


function o3JMxex11() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JMxex11.length - 1; i++) {
    const p1 = JMxex11[i];
    const p2 = JMxex11[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2.2)
  stroke(chosen.colors[6])
  
  curveVertex(JMxex113[JMxex113.length - 1].x, JMxex113[JMxex113.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JMxex11() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex112.length - 1; i++) {
    const p1 = JMxex112[i];
    const p2 = JMxex112[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))

  curveVertex(JMxex112[JMxex112.length - 1].x, JMxex112[JMxex112.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o5JMxex11() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex11g.length - 1; i++) {
    const p1 = JMxex11g[i];
    const p2 = JMxex11g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[30])
  curveVertex(JMxex11g[JMxex11g.length - 1].x, JMxex11g[JMxex11g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o6JMxex11() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex11g.length - 1; i++) {
    const p1 = JMxex11g[i];
    const p2 = JMxex11g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[86])
  curveVertex(JMxex11g[JMxex11g.length - 1].x, JMxex11g[JMxex11g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function JMxex11ki() {
   
     let chosen = chooseRandomColor();
  for (let p of JMxex11k) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.8))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let JMxex11k = [];






//////////
let JMxex10 = [];
let JMxex102 = [];
let JMxex103 = [];
let JMxex10g = [];
function drawJMxex9() {
 // //////background(255);
  JMxex10ki()
  let chosen = chooseRandomColor();
 
    o2JMxex10()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
  //stroke(0)
  for (let i = 10; i < JMxex10.length/1; i++) {
    
    
    const p = JMxex10[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    strokeWeight(1.2);
    point(p.x, p.y);
    noStroke()

   fill(255, 204, 0);
    //stroke(111)
    circle(p.x, p.y,p.size/random(20,40) )
    noFill()
        //stroke(0)
    
    
  
  for (let i = 4; i < JMxex10.length - 1; i++) {
    const p1 = JMxex10[i];
    const p2 = JMxex10[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
    
    
    if (i === 5) {
      const r1 = generateRandomNumberJMxex9()/13 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = generateRandomNumberJMxex9()/2 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, generateRandomNumberJMxex9(), 1.9, 1.9, 1.5);

  }
    strokeWeight(1.2) 
    noFill()
   curveVertex(cx, cy);
  }
  stroke(0, 0, 0,random(0,40));
  curveVertex(JMxex10[JMxex10.length - 1].x, JMxex10[JMxex10.length - 1].y);
  endShape();

 
  }


  //fill(chosen.colors[6])


  noStroke();

  // draw the eyes with Picasso style
fountainPenMJ9()
hatchingMJ9()
  
  t++;
}

function o2JMxex10() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex102.length - 1; i++) {
    const p1 = JMxex102[i];
    const p2 = JMxex102[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(chosen.colors[16])

  curveVertex(JMxex102[JMxex102.length - 1].x, JMxex102[JMxex102.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
o3JMxex10()
 o4JMxex10()
  o5JMxex10()
  o6JMxex10()
  t++;
}


function o3JMxex10() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JMxex10.length - 1; i++) {
    const p1 = JMxex10[i];
    const p2 = JMxex10[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       
  //fill(chosen.colors[6])

       strokeWeight(2.2)
  stroke(chosen.colors[6])
  
  curveVertex(JMxex103[JMxex103.length - 1].x, JMxex103[JMxex103.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JMxex10() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex102.length - 1; i++) {
    const p1 = JMxex102[i];
    const p2 = JMxex102[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))

  curveVertex(JMxex102[JMxex102.length - 1].x, JMxex102[JMxex102.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function generateRandomNumberJMxex9() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}

function o5JMxex10() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex10g.length - 1; i++) {
    const p1 = JMxex10g[i];
    const p2 = JMxex10g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  //stroke(255,255,255,random(1,150))
 stroke(chosen.colors[30])
  curveVertex(JMxex10g[JMxex10g.length - 1].x, JMxex10g[JMxex10g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o6JMxex10() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex10g.length - 1; i++) {
    const p1 = JMxex10g[i];
    const p2 = JMxex10g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.9)
  //stroke(255,255,255,random(1,150))
 stroke(0,0,0,20)
  curveVertex(JMxex10g[JMxex10g.length - 1].x, JMxex10g[JMxex10g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function JMxex10ki() {
   
     let chosen = chooseRandomColor();
  for (let p of JMxex10k) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.8))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let JMxex10k = [];
function fountainPenMJ9() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < JMxex10.length - 1; i++) {
    const p1 = JMxex10[i];
    const p2 = JMxex10[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatchingMJ9() {
  
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(chosen.colors[50])
//fill(chosen.colors[55])
  let speed = 3; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 5; i < JMxex10.length - 1; i++) {
    const p1 = JMxex10[i];
    const p2 = JMxex10[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
      
      //noStroke()
     // circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}








////////
//rangi


let JMxex8 = [];
let JMxex82 = [];
let JMxex83 = [];
let JMxex8g = [];



function drawJMxex8() {
 // //////background(255);
  
  let chosen = chooseRandomColor();
 
    o2JMxex8()
o3JMxex8()
 
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex8.length - 1; i++) {
    const p1 = JMxex8[i];
    const p2 = JMxex8[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
    stroke(chosen.colors[50])

    if (i === 5) {
      const r1 = 120 //random(10, 100);
stroke(chosen.colors[20])
      
      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = 30 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
stroke(chosen.colors[40])

arc(cx, cy+1, cx/2, 1.9, 1.9, 1.5);
      } else if (i === 4) {
      const r9 = 125 //random(50, 200);
            strokeWeight(10.8)
stroke(0)
      ellipse(cx, cy, r9);
    }
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2)
  stroke(0,0,0,random(0,160));

  //fill(chosen.colors[6])
  curveVertex(JMxex8[JMxex8.length - 1].x, JMxex8[JMxex8.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  
  
  t++;
}

function o2JMxex8() {
  ////////background(255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex82.length - 1; i++) {
    const p1 = JMxex82[i];
    const p2 = JMxex82[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(chosen.colors[16])

  //fill(chosen.colors[6])
  curveVertex(JMxex82[JMxex82.length - 1].x, JMxex82[JMxex82.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function o3JMxex8() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < JMxex8.length - 1; i++) {
    const p1 = JMxex8[i];
    const p2 = JMxex8[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -5; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -5; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(10.2)
  stroke(chosen.colors[6])
  
  curveVertex(JMxex83[JMxex83.length - 1].x, JMxex83[JMxex83.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4JMxex8() {
  ////////background(0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < JMxex82.length - 1; i++) {
    const p1 = JMxex82[i];
    const p2 = JMxex82[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(2.4)
  stroke(0,0,0,random(1,100))

  //fill(chosen.colors[6])
  curveVertex(JMxex82[JMxex82.length - 1].x, JMxex82[JMxex82.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}




////////

let JMxex7 = [];
let JMxex72 = [];
let JMxex73 = [];
let xoffJMxex7 = 0;
let yoffJMxex7 = 0;

function drawJMxex7() {
 
  
     o2JMxex7()
o3JMxex7()

 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
   /* [fix] متن روی بوم حذف شد */ // text(String.fromCharCode(9608), JMxex7[1].x, JMxex7[1].y);

 for (let i = 4; i < JMxex7.length - 1; i++) {
    const p1 = JMxex7[i];
    const p2 = JMxex7[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 10);
     stroke(0)
    
 
    if (i === 5) {
      const r1 = generateRandomNumber1JMxex7()/14 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber1JMxex7(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
      noFill()
      //ellipse(cx, cy, r2);
    generateRandomNumber1JMxex7()/4 
    noFill()
   curveVertex(cx, cy);
  }
    stroke(0, 0, 0,random(200,255));

  curveVertex(JMxex7[JMxex7.length - 1].x, JMxex7[JMxex7.length - 1].y);
  endShape();


 
  

//hatching() 

  noStroke();

  //sprayPaint()
  
  t++;

}


function generateRandomNumber1JMxex7() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}



function o2JMxex7() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex7.length - 1; i++) {
    const p1 = JMxex7[i];
    const p2 = JMxex7[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 125 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
    } 
    noFill()
    generateRandomNumber1JMxex7()/3 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,random(1,200));
   strokeWeight(0.2)

  curveVertex(JMxex7[JMxex7.length - 1].x, JMxex7[JMxex7.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPenJMxex7()

  t++;
}


function o3JMxex7() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < JMxex7.length - 1; i++) {
    const p1 = JMxex7[i];
    const p2 = JMxex7[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
  stroke(0, 0, 0,random(1,200));
   generateRandomNumber1JMxex7()/5 
  curveVertex(JMxex73[JMxex73.length - 1].x, JMxex73[JMxex73.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPenJMxex7() {
  stroke(30, 30, 0, 255);
  strokeWeight(random(0.1,0.9));
  const width = random(1,45);
  const lerps = 6;

  for (let i = 12; i < JMxex7.length - 1; i++) {
    const p1 = JMxex7[i];
    const p2 = JMxex7[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}




////////

let JMxex6 = [];
let JMxex62 = [];
let JMxex63 = [];


function drawJMxex6() {


 
  strokeWeight(2);
  stroke(0);

noFill()



    
     beginShape();
  curveVertex(JMxex6[1].x, JMxex6[1].y);

  for (let i = 2; i < JMxex6.length - 1; i++) {
    const p1 = JMxex6[i];
    const p2 = JMxex6[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;

     
    
    
      if (i === 5) {
      const r1 = generateRandomNumber1JMxex6()/15 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = generateRandomNumber1JMxex6()  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, generateRandomNumber1JMxex6(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
    
    stroke(0)
     strokeWeight(0.3)
    noFill()
   curveVertex(cx, cy);
 let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
  }
curveVertex(JMxex6[JMxex6.length - 1].x, JMxex6[JMxex6.length - 1].y); 
  endShape();

  


  noStroke();

  //prayPaint()
    
     o2JMxex6()
 o3JMxex6()


  t++;

}


function generateRandomNumber1JMxex6() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}


function o2JMxex6() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
    curveVertex(JMxex6[1].x, JMxex6[1].y);

  
  for (let i = 2; i < JMxex6.length - 1; i++) {
    const p1 = JMxex6[i];
    const p2 = JMxex6[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);

 
    if (i === 5) {
      const ra = generateRandomNumber1JMxex6()/2  //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
    } 
    noFill()
    strokeWeight(0.1) 
     stroke(0)
    noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(7)

let chosen = chooseRandomColor();
  //fill(chosen.colors[6])


  curveVertex(JMxex6[JMxex6.length - 1].x, JMxex6[JMxex6.length - 1].y);
  endShape();

  // draw the eyes with Picasso style


  t++;
}


function o3JMxex6() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
      curveVertex(JMxex6[1].x, JMxex6[1].y, JMxex6[1].z);

   for (let i = 2; i < JMxex6.length - 1; i++) {
    const p1 = JMxex6[i];
    const p2 = JMxex6[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
     
 
    strokeWeight(p1.size / 35);
     stroke(0)
    noFill()
   curveVertex(cx, cy);
  }
                //strokeWeight(2)
  //stroke(0);
let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
  stroke(0, 0, 0,50);
   strokeWeight(0.2)

  curveVertex(JMxex6[JMxex6.length - 1].x, JMxex6[JMxex6.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


//////////

let JMxex5 = [];
let JMxex52 = [];
let JMxex53 = [];
let xoffJMxex5 = 0;
let yoffJMxex5 = 0;

function drawJMxex5() {

  
    // o2JMxex5()
 o3JMxex5()

 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
     beginShape();
  curveVertex(JMxex5[1].x, JMxex5[1].y);

  for (let i = 2; i < JMxex5.length - 1; i++) {
    const p1 = JMxex5[i];
    const p2 = JMxex5[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    const asciiValue = map(cx, 0, windowWidth, 33, 226); // تبدیل مختصات x به ASCII
    const asciiChar = String.fromCharCode(asciiValue); // تبدیل عدد ASCII به کاراکتر ASCII
    
    
    
    
      if (i === 5) {
      const r1 = generateRandomNumber1JMxex5()/16 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      noFill()
arc(cx, cy, generateRandomNumber1JMxex5(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
    
    
     strokeWeight(0.12)
        noFill()
   curveVertex(cx, cy);
    fill(0)
textSize(random(12,14));

    /* [fix] متن روی بوم حذف شد */ // text(asciiChar, cx, cy); // نمایش کاراکتر ASCII
    let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
  }
 curveVertex(JMxex5[JMxex5.length - 1].x, JMxex5[JMxex5.length - 1].y);
  endShape();

  



  noStroke();

  //sprayPaint()
  
  t++;

}

function generateRandomNumber1JMxex5() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}



function o2JMxex5() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex5.length - 1; i++) {
    const p1 = JMxex5[i];
    const p2 = JMxex5[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 125 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
    } 
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(JMxex5[JMxex5.length - 1].x, JMxex5[JMxex5.length - 1].y);
  endShape();

  // draw the eyes with Picasso style


  t++;
}


function o3JMxex5() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < JMxex52.length - 1; i++) {
    const p1 = JMxex52[i];
    const p2 = JMxex52[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
  stroke(0, 0, 0,255);
   strokeWeight(22)
  curveVertex(JMxex53[JMxex53.length - 1].x, JMxex53[JMxex53.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

///////



////////


function drawMJ3() {
  
  
    // o2()
 //o3()

 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
  
  for (let i = 2; i < MJ3.length - 1; i++) {
    const p1 = MJ3[i];
    const p2 = MJ3[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    const asciiValue = map(cx, 0, windowWidth, 33, 126); // تبدیل مختصات x به ASCII
    const asciiChar = String.fromCharCode(asciiValue); // تبدیل عدد ASCII به کاراکتر ASCII
    /* [fix] متن روی بوم حذف شد */ // text(asciiChar, cx, cy); // نمایش کاراکتر ASCII
    
    if (i === 5) {
      const r1 = generateRandomNumber1MJ3()/18 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber1MJ3(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
  }  else if (i === 10) {
      const r4 = 80 //random(50, 200);
            strokeWeight(12)
   stroke(0);
  // stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }    

   stroke(0);
            strokeWeight(1.2)
    noFill()
   curveVertex(cx, cy);
  }
  let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
  curveVertex(MJ3[MJ3.length - 1].x, MJ3[MJ3.length - 1].y);
  endShape();

 fill(255,random(0,255));
	
	
		
		
  



  noStroke();

  //sprayPaint()
  
  t++;
        
    
}


function generateRandomNumber1MJ3() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}

//////////

let JMxex2 = [];
let JMxex22 = [];
let JMxex23 = [];
let xoffJMxex2 = 0;
let yoffJMxex2 = 0;
function drawJMxex2() {

  
     o2JMxex2()
 o3JMxex2()

 
  strokeWeight(2);
  stroke(0);

  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
  for (let i = 4; i < JMxex2.length - 1; i++) {
    const p1 = JMxex2[i];
    const p2 = JMxex2[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 10);
     stroke(0)
    
 
    if (i === 5) {
      const r1 = generateRandomNumber1JMxex2()/19 //random(10, 100);
   stroke(255, 204, 0);
fill(255,50)
      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      noFill()
arc(cx, cy, generateRandomNumber1JMxex2(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
      noFill()
      //ellipse(cx, cy, r2);
    strokeWeight(2.1) 
    noFill()
   curveVertex(cx, cy);
  }
  let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
  curveVertex(JMxex2[JMxex2.length - 1].x, JMxex2[JMxex2.length - 1].y);
  endShape();

 


  noStroke();

  //sprayPaint()
  
  t++;

}


function generateRandomNumber1JMxex2() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}




function o2JMxex2() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex2.length - 1; i++) {
    const p1 = JMxex2[i];
    const p2 = JMxex2[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 125 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
    } 
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(JMxex2[JMxex2.length - 1].x, JMxex2[JMxex2.length - 1].y);
  endShape();

  // draw the eyes with Picasso style


  t++;
}


function o3JMxex2() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < JMxex2.length - 1; i++) {
    const p1 = JMxex2[i];
    const p2 = JMxex2[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
let chosen = chooseRandomColor();
  //fill(chosen.colors[6])
  stroke(0, 0, 0,255);
   strokeWeight(22)
  curveVertex(JMxex23[JMxex23.length - 1].x, JMxex23[JMxex23.length - 1].y);
  endShape();
noFill()
  // draw the eyes with Picasso style

  t++;
}




///////
let JMxex1 = [];
let JMxex12 = [];
let JMxex13 = [];
let xoffJMxex1 = 0;
let yoffJMxex1 = 0;

function drawJMxex1() {

  
     o2JMxex1()
 o3JMxex1()

 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
  for (let i = 0; i < JMxex1.length - 1; i++) {
    
    
    const p1 = JMxex1[i];
    const p2 = JMxex1[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
 
     stroke(0)
     const asciiValue = map(cx, 0, windowWidth, 33, 126); // تبدیل مختصات x به ASCII
    const asciiChar = String.fromCharCode(asciiValue); // تبدیل عدد ASCII به کاراکتر ASCII
    /* [fix] متن روی بوم حذف شد */ // text(asciiChar, cx, cy); // نمایش کاراکتر ASCII
 
    if (i === 5) {
      const r1 = generateRandomNumber1JMxex1()/20 //random(10, 100);
   stroke(255, 204, 0);
fill(255,50)
      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber1JMxex1(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
  }  else if (i === 10) {
      const r4 = 80 //random(50, 200);
            strokeWeight(12)
   stroke(0);
  // stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }    
noFill()

      noFill()
    strokeWeight(0.1) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(JMxex1[JMxex1.length - 1].x, JMxex1[JMxex1.length - 1].y);
  endShape();

 fill(255,random(0,255));
	
	
		
		
  



  noStroke();

  //sprayPaint()
  
  t++;
        
    
}


function generateRandomNumber1JMxex1() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 800) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}


function generateRandomNumber21JMxex1() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber2 = Math.floor(Math.random() * 700) + 12; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber2;
}


function o2JMxex1() {
  ////////background(255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < JMxex1.length - 1; i++) {
    const p1 = JMxex1[i];
    const p2 = JMxex1[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 60 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      //fill(0)
         fill(255, 204, 0);
         stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, ra);
     }  else if (i === 10) {
      const r4 = 30 //random(50, 200);
            strokeWeight(12)
   stroke(0);
         fill(255, 204, 0);

   //stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }   
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(JMxex1[JMxex1.length - 1].x, JMxex1[JMxex1.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPenJMxex1()

  t++;
}


function o3JMxex1() {
  ////////background(0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < JMxex1.length - 1; i++) {
    const p1 = JMxex1[i];
    const p2 = JMxex1[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,30)
  stroke(0, 0, 0,255);
   strokeWeight(16.2)
  curveVertex(JMxex13[JMxex13.length - 1].x, JMxex13[JMxex13.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPenJMxex1() {
  stroke(30, 30, 0, 255);
  strokeWeight(random(0.1,0.9));
  const width = random(1,45);
  const lerps = 6;

  for (let i = 12; i < JMxex1.length - 1; i++) {
    const p1 = JMxex1[i];
    const p2 = JMxex1[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}
////////
function G3() {
  // //////background(255);
   // stroke(0);
  //strokeWeight(random(0.1,16));
  // noStroke();
//rectMode(CENTER)
 // translate(width/2 , height/2 );
 let chosen = chooseRandomColor();
  for (let i = 0; i < random(10,232); i++) {
    let r = i * random(2,200);
    let x = r * cos(angle + i);
    let y = r * sin(angle + i);

     let c = str(random(colorset))
   colorbg = colorset;
       strokeWeight(random(0.1,16));
    

    
 //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


rect(random(1,width), random(1,height/27), random(1,20), 20);
               fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
//fill(chosen.colors[6])
       //fill(str(random(colorset)))

    circle(x/random(0,229), random(1,height/26), -random(1,20));
          //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


       circle(random(1,width), random(1,height/24), -random(1,20));
          //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,4));


    point( y, -x);
               fill(str(random(colorset)))
     //strokeWeight(random(0.1,5));
        point( random(1,width), random(1,2000));
stroke(chosen.colors[1])
    point( random(1,width), random(1,2000));
     stroke(chosen.colors[2])
        point( random(1,width), random(1,2000));
     stroke(chosen.colors[3])
        point( random(1,width), random(1,2000));
     stroke(str(random(colorset)))
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));

        point( random(1,width), random(1,2000));
              //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
noStroke()

   //  point( random(1,2000), -random(1,width));
        point( random(1,width), random(1,2000));
              //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


     point( -y/4, x/7);
              //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


rect(x/4,random(1,height/2), random(1,20), random(1,20));
               fill(str(random(colorset)))
    //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/24), random(1,20), -random(1,20));
     //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/23), random(1,20), -random(1,20));
     //fill(chosen.colors[9])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/22), random(1,20), -random(1,20));
     //fill(chosen.colors[8])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/21), random(1,20), -random(1,20));
    //fill(chosen.colors[7])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,width/20), random(1,20), -random(1,20));
     //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/8), random(1,20), -random(1,20));


 rect(x*1.5, random(1,height/18), random(1,20), -random(1,width));
   //fill(chosen.colors[5])
       //fill(str(random(colorset)))
     rect(random(1,width), random(1,height/7), random(1,20), -random(1,20));
    //fill(chosen.colors[4])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/6), random(1,20), -random(1,20));
    //fill(chosen.colors[3])
       //fill(str(random(colorset)))
    
    
    
    
    
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/5), random(1,20), -random(1,20));
      fill(255,random(1,255))
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,2), -random(1,2));
  fill(0,random(1,255))
    //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/3), random(1,20), -random(1,20));


 rect(x*1.5, random(1,height/2), random(1,2), -random(1,20));
               //fill(str(random(colorset)))
    fill(0,random(1,255))
      strokeWeight(random(0.1,16));


   circle(random(1,width), random(1,height/1), -random(1,20));
 //noFill();


  

  }
}

///////////
let QR11 = [];
let QR112 = [];
let QR113 = [];
let QR11g = [];
let QR11e = [];

function draw36() {
  // ////////background(255);
    stroke(0);
  strokeWeight(random(0.1,16));

  QR11ki();
  let chosen = chooseRandomColor();



  noFill(); // we don't want to fill the main shape
  beginShape();

  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < QR11.length - 1; i++) {
    const p1 = QR11[i];
    const p2 = QR11[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[1]);
    noStroke(palette[1]);
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    stroke(0,0,0,random(1,150))
    rect(cx, cy, width / bins.length/random(1,1.5), h/30);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
    
    stroke(chosen.colors[6])
    rect(cx, cy, width / bins.length/random(10,20), h/20);
  }
    noFill()
   curveVertex(cx, cy);
  }

  strokeWeight(31.5);
  stroke(0, 0, 0, random(0, 240));
  curveVertex(QR11[QR11.length - 1].x, QR11[QR11.length - 1].y);
  endShape();


  t++;
 //G3QR11() 
//g1()

}


let rang20 = [];

function getRandomBColorCq() {
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
    const randomIndex = Math.floor(Math.random() * rangiD2.length);
    const { r: rVal, g: gVal, b: bVal } = rangiD2[randomIndex];
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - rVal) ** 2 + (g - gVal) ** 2 + (b - bVal) ** 2);
    chosenColor = color(r, g, b, random(100, 255));
  } while (d > 30);
  
  return chosenColor;

}

function G3QR11() {
  // ////////background(255);
   // stroke(0);
  //strokeWeight(random(0.1,16));
  // noStroke();
//rectMode(CENTER)
 // translate(width/2 , height/2 );

  for (let i = 0; i < random(10,20); i++) {
    let r = i * random(2,200);
    let x = r * cos(angle + i);
    let y = r * sin(angle + i);

     let c = str(random(rang20))
   colorbg = rang20;
       strokeWeight(random(0.1,16));
    
      let chosen = chooseRandomColor();

    fill(rang20[1]);
 ////fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));

fill(rang20[2]);
rect(random(1,width), random(1,height/27), random(1,20), 20);
               fill(rang20[3]);
      strokeWeight(random(0.1,16));
fill(rang20[4]);
       //fill(str(random(colorset)))

    circle(x/random(0,229), random(1,height/26), -random(1,20));
        fill(rang20[6]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


       circle(random(1,width), random(1,height/24), -random(1,20));
          fill(rang20[7]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


    point( y, -x);
               fill(rang20[8]);
      strokeWeight(random(0.1,16));

        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));

        point( random(1,width), random(1,2000));
              //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


   //  point( random(1,2000), -random(1,width));
        point( random(1,width), random(1,2000));
            fill(rang20[9]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


     point( -y/4, x/7);
              //fill(chosen.colors[6])
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


rect(x/4,random(1,height/2), random(1,20), random(1,20));
               fill(str(random(colorset)))
    fill(rang20[12]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/24), random(1,20), -random(1,20));
     fill(rang20[13]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/23), random(1,20), -random(1,20));
     fill(rang20[14]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/22), random(1,20), -random(1,20));
     
    fill(rang20[15]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/21), random(1,20), -random(1,20));
    fill(rang20[16]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,width/20), random(1,20), -random(1,20));
     fill(rang20[17]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height/8), random(1,20), -random(1,20));


 rect(x*1.5, random(1,height/18), random(1,20), -random(1,width));
   fill(rang20[18]);
       //fill(str(random(colorset)))
     rect(random(1,width), random(1,height/7), random(1,20), -random(1,20));
    fill(rang20[19]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,20), -random(1,20));
    fill(rang20[20]);
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,20), -random(1,20));
      fill(255,random(1,255))
       //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,2), -random(1,2));
  fill(rang20[21]);
    //fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,20), -random(1,20));


 rect(x*1.5, random(1,height), random(1,2), -random(1,20));
               //fill(str(random(colorset)))
    fill(rang20[22]);
      strokeWeight(random(0.1,16));


   circle(random(1,width), random(1,height), -random(1,20));
 //noFill();


  

  }
}

function o2QR11() {
  (255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
 beginShape();
for (let i = 2; i < QR112.length - 1; i++) {
const p1 = QR112[i];
const p2 = QR112[i + 1];
const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا

noFill()
   curveVertex(cx, cy);
curveVertex(p1.x, p1.y);
curveVertex(p2.x, p2.y);
}
strokeWeight(0.4)
stroke(chosen.colors[16])

curveVertex(QR112[QR112.length - 1].x, QR112[QR112.length - 1].y);
endShape();
  // draw the eyes with Picasso style

 
  t++;

  }
function o3QR11() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < QR11.length - 1; i++) {
    const p1 = QR11[i];
    const p2 = QR11[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(QR113[QR113.length - 1].x, QR113[QR113.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4QR11() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < QR112.length - 1; i++) {
    const p1 = QR112[i];
    const p2 = QR112[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[3]);
    noFill()
    noStroke();
   
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill()
    fill(palette[colorIndex % palette.length]);
    //noStroke(palette[colorIndex % palette.length]);
   // stroke(255,255,255,random(1,5));
    rect(cx, cy, width / bins.length/10, h/30);
  }
    
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))
  curveVertex(QR112[QR112.length - 1].x, QR112[QR112.length - 1].y);
  endShape();

  t++;
  
}
function o5QR11() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
   for (let i = 60; i < QR11.length/1; i++) {
    
    
    const p = QR11[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
 stroke(0,0,0,random(1,80))
    strokeWeight(22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < QR11g.length - 1; i++) {
    const p1 = QR11g[i];
    const p2 = QR11g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(QR11g[QR11g.length - 1].x, QR11g[QR11g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
  
 
}

function o6QR11() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < QR11g.length - 1; i++) {
    const p1 = QR11g[i];
    const p2 = QR11g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(0)
  curveVertex(QR11g[QR11g.length - 1].x, QR11g[QR11g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function o7QR11() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < QR11g.length - 1; i++) {
    const p1 = QR11g[i];
    const p2 = QR11g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(QR11g[QR11g.length - 1].x, QR11g[QR11g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}
function o8QR11() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < QR11e.length - 1; i++) {
    const p1 = QR11e[i];
    const p2 = QR11e[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(QR11e[QR11e.length - 1].x, QR11e[QR11e.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}


function QR11ki() {
  wind() 
     let chosen = chooseRandomColor();
  for (let p of QR11k) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function wind() {
  const gravity = 0.4; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...QR11e]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let QR11k = [];
function fountainPen() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < QR11.length - 1; i++) {
    const p1 = QR11[i];
    const p2 = QR11[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}





///////
let QR10 = [];
let QR102 = [];
let QR103 = [];
let QR10g = [];
let QR10e = [];
function draw35() {
  // ////////background(255);
    stroke(0);
  strokeWeight(random(0.1,16));

  QR10ki();
  let chosen = chooseRandomColor();



  noFill(); // we don't want to fill the main shape
  beginShape();

  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < QR10.length - 1; i++) {
    const p1 = QR10[i];
    const p2 = QR10[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[1]);
    noStroke(palette[1]);
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    stroke(0,0,0,random(1,150))
    rect(cx, cy, width / bins.length/random(1,1.5), h/30);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
    
    stroke(chosen.colors[6])
    rect(cx, cy, width / bins.length/random(10,20), h/20);
  }
    noFill()
   curveVertex(cx, cy);
  }

  strokeWeight(31.5);
  stroke(0, 0, 0, random(0, 240));
  curveVertex(QR10[QR10.length - 1].x, QR10[QR10.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
  //fountainPen()
  hatchingQR10();
  sprayPaintQR10();
  t++;
 //G3QR10() 
//g1()

}




function G3QR10() {
  // ////////background(255);
   // stroke(0);
  //strokeWeight(random(0.1,16));
  // noStroke();
//rectMode(CENTER)
 // translate(width/2 , height/2 );

  for (let i = 0; i < random(1,200); i++) {
    let r = i * random(2,50);
    let x = r * cos(angle + i);
    let y = r * sin(angle + i);

     let c = str(random(colorset))
   colorbg = colorset;
       strokeWeight(random(0.1,16));

       fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


rect(random(1,width), random(1,2000), -random(1,20), 20);
               fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


    circle(x/random(0,229), random(1,2000), -random(1,20));
           fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


       circle(random(1,width), random(1,20), -random(1,20));
           fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


    point( y, -x);
               fill(str(random(colorset)))
      strokeWeight(random(0.1,16));

        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));
        point( random(1,width), random(1,2000));

        point( random(1,width), random(1,2000));
               fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


   //  point( random(1,2000), -random(1,width));
        point( random(1,width), random(1,2000));
               fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


     point( -y/4, x/7);
               fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


rect(x/4,random(1,height), random(1,20), -random(1,20));
               fill(str(random(colorset)))
    
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,20), -random(1,20));
     fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,20), -random(1,20));
     fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,20), -random(1,20));
     fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,20), -random(1,20));
     fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,width), random(1,20), -random(1,20));
     fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,height), random(1,20), -random(1,20));


 rect(x*1.5, random(1,width), random(1,20), -random(1,width));
               fill(str(random(colorset)))
     rect(random(1,width), random(1,width), random(1,20), -random(1,20));
     fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,width), random(1,20), -random(1,20));
     fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,width), random(1,20), -random(1,20));
     fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,width), random(1,20), -random(1,20));
     fill(str(random(colorset)))
      strokeWeight(random(0.1,16));
 rect(random(1,width), random(1,width), random(1,20), -random(1,20));


 rect(x*1.5, random(1,width), random(1,2000), -random(1,20));
               fill(str(random(colorset)))
      strokeWeight(random(0.1,16));


   circle(random(1,width), random(1,2000), -random(1,20));
 //noFill();


  

  }
}

function o2QR10() {
  (255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
 beginShape();
for (let i = 2; i < QR102.length - 1; i++) {
const p1 = QR102[i];
const p2 = QR102[i + 1];
const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا

noFill()
   curveVertex(cx, cy);
curveVertex(p1.x, p1.y);
curveVertex(p2.x, p2.y);
}
strokeWeight(0.4)
stroke(chosen.colors[16])

curveVertex(QR102[QR102.length - 1].x, QR102[QR102.length - 1].y);
endShape();
  // draw the eyes with Picasso style


  t++;

  }
function o3QR10() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < QR10.length - 1; i++) {
    const p1 = QR10[i];
    const p2 = QR10[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(QR103[QR103.length - 1].x, QR103[QR103.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o4QR10() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < QR102.length - 1; i++) {
    const p1 = QR102[i];
    const p2 = QR102[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[3]);
    noFill()
    noStroke();
   
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill()
    fill(palette[colorIndex % palette.length]);
    //noStroke(palette[colorIndex % palette.length]);
   // stroke(255,255,255,random(1,5));
    rect(cx, cy, width / bins.length/10, h/30);
  }
    
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))
  curveVertex(QR102[QR102.length - 1].x, QR102[QR102.length - 1].y);
  endShape();

  t++;
  
}
function o5QR10() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
   for (let i = 60; i < QR10.length/1; i++) {
    
    
    const p = QR10[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
 stroke(0,0,0,random(1,80))
    strokeWeight(22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < QR10g.length - 1; i++) {
    const p1 = QR10g[i];
    const p2 = QR10g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(QR10g[QR10g.length - 1].x, QR10g[QR10g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//
  t++;
  
 
}

function o6QR10() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < QR10g.length - 1; i++) {
    const p1 = QR10g[i];
    const p2 = QR10g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(0)
  curveVertex(QR10g[QR10g.length - 1].x, QR10g[QR10g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//
  t++;
}


function o7QR10() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < QR10g.length - 1; i++) {
    const p1 = QR10g[i];
    const p2 = QR10g[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(QR10g[QR10g.length - 1].x, QR10g[QR10g.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}
function o8QR10() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < QR10e.length - 1; i++) {
    const p1 = QR10e[i];
    const p2 = QR10e[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(QR10e[QR10e.length - 1].x, QR10e[QR10e.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function QR10ki() {
   
     let chosen = chooseRandomColor();
  for (let p of QR10k) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

let QR10k = [];
function fountainPen() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < QR10.length - 1; i++) {
    const p1 = QR10[i];
    const p2 = QR10[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatchingQR10() {
  
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(0,0,0,12)
fill(0,0,0,12)
  let speed = random(1,4); // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 100; i < QR10e.length - 1; i++) {
    const p1 = QR10e[i];
    const p2 = QR10e[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 1; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed * 2, y + speed * 2);
      
      //noStroke()
      //circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}

function sprayPaintQR10() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(255)
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of sprayPaintQR10 brush
  const minRadius = 130;
  const sprayDensity = 44;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 8; i < QR10.length - 1; i++) {
    const p1 = QR10[i];
    const p2 = QR10[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
strokeWeight(1)
      stroke(0,0,0,1)  
        point(lerpX + randX, lerpY + randY);
       // stroke(255,255,255,random(0,230)) 
       //arc(lerpX + randX, lerpY + randY, 2,6 ,PI , -2*TWO_PI);

      }
    }
  }
}


///////
let PD30 = [];
let PD230 = [];
let PD330 = [];
let PDg30 = [];
let PDe30 = [];

const P430 = [];
function draw34() {
  // ////////background(255);
  PDki30();
  let chosen = chooseRandomColor();



  noFill(); // we don't want to fill the main shape
  beginShape();

  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < PD30.length - 1; i++) {
    const p1 = PD30[i];
    const p2 = PD30[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[1]);
    noStroke(palette[1]);
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    stroke(0,0,0,random(1,150))
    rect(cx, cy, width / bins.length/random(1,1.5), h/30);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
    
    stroke(chosen.colors[6])
    rect(cx, cy, width / bins.length/random(10,20), h/20);
  }
    noFill()
   curveVertex(cx, cy);
  }

  strokeWeight(11.5);
  stroke(0, 0, 0, random(0, 140));
  curveVertex(PD30[PD30.length - 1].x, PD30[PD30.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
  //fountainPen()
  hatching30();
  sprayPaint30();
  t++;

//g1()
}
function o230() {
  (255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
 beginShape();
for (let i = 2; i < PD230.length - 1; i++) {
const p1 = PD230[i];
const p2 = PD230[i + 1];
const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا

noFill()
   curveVertex(cx, cy);
curveVertex(p1.x, p1.y);
curveVertex(p2.x, p2.y);
}
strokeWeight(0.4)
stroke(chosen.colors[16])

curveVertex(PD230[PD230.length - 1].x, PD230[PD230.length - 1].y);
endShape();
 
  t++;
}


function o330() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < PD30.length - 1; i++) {
    const p1 = PD30[i];
    const p2 = PD30[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(PD330[PD330.length - 1].x, PD330[PD330.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o430() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PD230.length - 1; i++) {
    const p1 = PD230[i];
    const p2 = PD230[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[3]);
    noFill()
    noStroke();
   
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill()
    fill(palette[colorIndex % palette.length]);
    //noStroke(palette[colorIndex % palette.length]);
   // stroke(255,255,255,random(1,5));
    rect(cx, cy, width / bins.length/10, h/30);
  }
    
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))
  curveVertex(PD230[PD230.length - 1].x, PD230[PD230.length - 1].y);
  endShape();

  
  t++;
  
}
function  o530() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
   for (let i = 60; i < PD30.length/1; i++) {
    
    
    const p = PD30[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
 stroke(0,0,0,random(1,80))
    strokeWeight(22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < PDg30.length - 1; i++) {
    const p1 = PDg30[i];
    const p2 = PDg30[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(PDg30[PDg30.length - 1].x, PDg30[PDg30.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
  
 
}

function o630() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDg30.length - 1; i++) {
    const p1 = PDg30[i];
    const p2 = PDg30[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(0)
  curveVertex(PDg30[PDg30.length - 1].x, PDg30[PDg30.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function  o730() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDg30.length - 1; i++) {
    const p1 = PDg30[i];
    const p2 = PDg30[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(PDg30[PDg30.length - 1].x, PDg30[PDg30.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}
function o830() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDe30.length - 1; i++) {
    const p1 = PDe30[i];
    const p2 = PDe30[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(PDe30[PDe30.length - 1].x, PDe30[PDe30.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}


function PDki30() {

     let chosen = chooseRandomColor();
  for (let p of PDk) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let PDk30 = [];
function fountainPen() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < PD30.length - 1; i++) {
    const p1 = PD30[i];
    const p2 = PD30[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatching30() {
  
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(0,0,0,12)
fill(0,0,0,12)
  let speed = random(1,4); // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 100; i < PDe30.length - 1; i++) {
    const p1 = PDe30[i];
    const p2 = PDe30[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 1; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed * 2, y + speed * 2);
      
      //noStroke()
      //circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}

function sprayPaint30() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(255)
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of sprayPaint30 brush
  const minRadius = 130;
  const sprayDensity = 44;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 8; i < PD30.length - 1; i++) {
    const p1 = PD30[i];
    const p2 = PD30[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
strokeWeight(1)
      stroke(0,0,0,1)  
        point(lerpX + randX, lerpY + randY);
       // stroke(255,255,255,random(0,230)) 
       //arc(lerpX + randX, lerpY + randY, 2,6 ,PI , -2*TWO_PI);

      }
    }
  }
}


///////
let tito = [];
let rangiDBC = [];
function ko12() {
  createCanvas(800, 800);
  
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(1, 120);
    let l = random(2, 20);
    let ang = random(TWO_PI);
    let rnd = int(random(13));
    let m = new titoE(x,y, d, l, ang, rnd);
    tito.push(m);
  }
  for (let i = 0; i < 50; i++) {
    rangiDBC.push(getRandomBColorA());
  }
}

function ENT3() {
  (255);
  for (let i = 0; i < tito.length; i++) {
    tito[i].update();
    tito[i].display();
  }
}

class titoE {
  constructor(x, y, d, l, ang, rnd) {
        this.color = colorsQ[int(random(colorsQ.length))];

    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.diameter = d;
    this.lineLength = l;
    this.angle = ang;
    this.type = rnd;
    this.mass = this.diameter;
    
  }

  update() {
    let center = createVector(width / 2, height / 2);
    let dir = center.sub(this.position);
    dir.setMag(0.1);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    stroke(this.color.r, this.color.g, this.color.b);
    noFill();
    //fill(0);
        fill(this.color.r, this.color.g, this.color.b);

    if (this.type == 0) {
      strokeWeight(random(0.5, 2));
      stroke(this.color.r, this.color.g, this.color.b);
      stroke(rangiDBC[6]);
      line(0, 0, 0, this.lineLength);
    } else if (this.type == 1) {
      //fill(this.color.r, this.color.g, this.color.b);
      fill(rangiDBC[4]);
      titoE.circ(0, 0, this.diameter);
    } else {
      titoE.walkertitoE(0, 0);
    }
    pop();
  }

  static circ(x, y, d) {
    let rnd = int(random(3));
    push();
    translate(x, y);
    rotate(PI * 0.5 * int(random(124)));
    strokeWeight(random(0.5, 2));
    if (rnd == 0) {
      noStroke()
     // circle(0, 0, d);
     fill(rangiDBC[4]);
      
      //fill(this.color.r, this.color.g, this.color.b);
      rect(0, 110, d*random(1,10),d*random(0.01,0.1))
    }
    if (rnd == 1) {
      let num = int(random(5, 118));
      strokeWeight(random(1.5, 5));
      for (let a = 0; a < TWO_PI; a += TWO_PI / num) {
        point(d * 0.5 * cos(a), d * 0.5 * sin(a));
      }
    }
    if (rnd == 2) {
      let num = int(random(3, 9));
      let l = d * random(0.4, 0.6);
      for (let a = 0; a < TWO_PI; a += TWO_PI / num) {
        push();
        
        translate(d * 0.5 * cos(a), d * 0.5 * sin(a));
        rotate(a);
        //circle(0, 0, l);
        fill(rangiDBC[0]);
        // rect(0, 0, 1,d)
       
       // circle(0, 0, l);
        pop();
      }
    }
    pop();
  }

  static walkertitoE(x, y) {
   let c = int(random(50, 200));
  let stepX = random(-5, 5);
  let stepY = random(-5, 5);
  let a = 0;
  let stepA = random(-1, 1) * 2.2;
  let r = random(5, 30);
  let stepR = random(-1, 1) * 2.01;
  while (c > 0) {
    strokeWeight(random(0.5, 5));
    push();
    translate(x, y);
    rotate(a);
    point(r, 0);
    pop();
    c--;
    x += stepX;
    y += stepY;
    a += stepA;
    r += stepR;
    }
  }
}
function walkertitoE(x, y) {
  let c = int(random(50, 200));
  let stepX = random(-5, 5);
  let stepY = random(-5, 5);
  let a = 0;
  let stepA = random(-1, 1) * 0.2;
  let r = random(5, 30);
  let stepR = random(-1, 1) * 0.01;
  while (c > 0) {
    strokeWeight(random(0.5, 1));
    push();
    translate(x, y);
    rotate(a);
    point(r, 0);
    pop();
    c--;
    x += stepX;
    y += stepY;
    a += stepA;
    r += stepR;
  }
}

function getRandomBColorA() {
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
    const randomIndex = Math.floor(Math.random() * rangiD2.length);
    const { r: rVal, g: gVal, b: bVal } = rangiD2[randomIndex];
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - rVal) ** 2 + (g - gVal) ** 2 + (b - bVal) ** 2);
    chosenColor = color(r, g, b, random(100, 255));
  } while (d > 30);
  
  return chosenColor;

}






//////
let rangiDB = [];

let rito = [];

function KO3() {
  createCanvas(800, 800);
  
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(1, 20);
    let l = random(50, 500);
    let ang = random(TWO_PI);
    let rnd = int(random(3));
    let m = new ritoD(x,y, d, l, ang, rnd);
    rito.push(m);
  }
  for (let i = 0; i < 50; i++) {
    rangiDB.push(getRandomBColorA());
  }
}

function ENT2() {
  (255);
  for (let i = 0; i < rito.length; i++) {
    rito[i].update();
    rito[i].display();
  }
}

class ritoD {
  constructor(x, y, d, l, ang, rnd) {
        this.color = colorsQ[int(random(colorsQ.length))];

    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.diameter = d;
    this.lineLength = l;
    this.angle = ang;
    this.type = rnd;
    this.mass = this.diameter;
    
  }

  update() {
    let center = createVector(width / 2, height / 2);
    let dir = center.sub(this.position);
    dir.setMag(0.1);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    stroke(this.color.r, this.color.g, this.color.b);
    noFill();
    //fill(0);
        fill(this.color.r, this.color.g, this.color.b);

    if (this.type == 0) {
      strokeWeight(random(0.5, 2));
      stroke(this.color.r, this.color.g, this.color.b);
      stroke(rangiDB[6]);
      line(0, 0, 0, this.lineLength);
    } else if (this.type == 1) {
      //fill(this.color.r, this.color.g, this.color.b);
      fill(rangiDB[4]);
      ritoD.circ(0, 0, this.diameter);
    } else {
      ritoD.walkerritoD(0, 0);
    }
    pop();
  }

  static circ(x, y, d) {
    let rnd = int(random(3));
    push();
    translate(x, y);
    rotate(PI * 0.5 * int(random(4)));
    strokeWeight(random(0.5, 2));
    if (rnd == 0) {
      noStroke()
     // circle(0, 0, d);
     fill(rangiDB[4]);
      //fill(this.color.r, this.color.g, this.color.b);
      rect(0, 110, d*random(1,10),d*random(0.1,1))
    }
    if (rnd == 1) {
      let num = int(random(5, 18));
      strokeWeight(random(1.5, 3));
      for (let a = 0; a < TWO_PI; a += TWO_PI / num) {
        point(d * 0.5 * cos(a), d * 0.5 * sin(a));
      }
    }
    if (rnd == 2) {
      let num = int(random(3, 9));
      let l = d * random(0.4, 0.6);
      for (let a = 0; a < TWO_PI; a += TWO_PI / num) {
        push();
        
        translate(d * 0.5 * cos(a), d * 0.5 * sin(a));
        rotate(a);
        //circle(0, 0, l);
        fill(rangiDB[0]);
         rect(0, 0, 1,d)
        circle(0, 0, l);
        pop();
      }
    }
    pop();
  }

  static walkerritoD(x, y) {
   let c = int(random(50, 200));
  let stepX = random(-5, 5);
  let stepY = random(-5, 5);
  let a = 0;
  let stepA = random(-1, 1) * 0.2;
  let r = random(5, 30);
  let stepR = random(-1, 1) * 0.01;
  while (c > 0) {
    strokeWeight(random(0.5, 5));
    push();
    translate(x, y);
    rotate(a);
    point(r, 0);
    pop();
    c--;
    x += stepX;
    y += stepY;
    a += stepA;
    r += stepR;
    }
  }
}
function walkerritoD(x, y) {
  let c = int(random(50, 200));
  let stepX = random(-5, 5);
  let stepY = random(-5, 5);
  let a = 0;
  let stepA = random(-1, 1) * 0.2;
  let r = random(5, 30);
  let stepR = random(-1, 1) * 0.01;
  while (c > 0) {
    strokeWeight(random(0.5, 1));
    push();
    translate(x, y);
    rotate(a);
    point(r, 0);
    pop();
    c--;
    x += stepX;
    y += stepY;
    a += stepA;
    r += stepR;
  }
}

function getRandomBColorA() {
  let r, g, b, d, chosenColor;
   const rangiD23 = [
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
    const randomIndex = Math.floor(Math.random() * rangiD23.length);
    const { r: rVal, g: gVal, b: bVal } = rangiD23[randomIndex];
    r = random(256);
    g = random(256);
    b = random(256);
    d = sqrt((r - rVal) ** 2 + (g - gVal) ** 2 + (b - bVal) ** 2);
    chosenColor = color(r, g, b, random(100, 255));
  } while (d > 30);
  
  return chosenColor;

}

//////
const colorsQ = [
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
  { r: 251, g: 86, b: 7 }


];


let movers = [];

function ko3() {
  createCanvas(800, 800);
  
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(20, 100);
    let l = random(50, 500);
    let ang = random(TWO_PI);
    let rnd = int(random(3));
    let m = new Mover(x,y, d, l, ang, rnd);
    movers.push(m);
  }
}

function Mo1() {
  (255);
  for (let i = 0; i < movers.length; i++) {
    movers[i].update();
    movers[i].display();
  }
}

class Mover {
  constructor(x, y, d, l, ang, rnd) {
        this.color = colorsQ[int(random(colorsQ.length))];

    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.diameter = d;
    this.lineLength = l;
    this.angle = ang;
    this.type = rnd;
    this.mass = this.diameter;
    
  }

  update() {
    let center = createVector(width / 2, height / 2);
    let dir = center.sub(this.position);
    dir.setMag(0.1);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    stroke(this.color.r, this.color.g, this.color.b);
    noFill();
    //fill(0);
        fill(this.color.r, this.color.g, this.color.b);

    if (this.type == 0) {
      strokeWeight(random(0.5, 2));
      stroke(this.color.r, this.color.g, this.color.b);
      line(0, 0, 0, this.lineLength);
    } else if (this.type == 1) {
      fill(this.color.r, this.color.g, this.color.b);
      Mover.circ(0, 0, this.diameter);
    } else {
      Mover.walker(0, 0);
    }
    pop();
  }

  static circ(x, y, d) {
    let rnd = int(random(3));
    push();
    translate(x, y);
    rotate(PI * 0.5 * int(random(4)));
    strokeWeight(random(0.5, 2));
    if (rnd == 0) {
      //circle(0, 0, d);
      rect(0, 0, d,d)
    }
    if (rnd == 1) {
      let num = int(random(5, 18));
      strokeWeight(random(1.5, 3));
      for (let a = 0; a < TWO_PI; a += TWO_PI / num) {
        point(d * 0.5 * cos(a), d * 0.5 * sin(a));
      }
    }
    if (rnd == 2) {
      let num = int(random(3, 9));
      let l = d * random(0.4, 0.6);
      for (let a = 0; a < TWO_PI; a += TWO_PI / num) {
        push();
        
        translate(d * 0.5 * cos(a), d * 0.5 * sin(a));
        rotate(a);
        //circle(0, 0, l);
         rect(0, 0, 1,d)
        pop();
      }
    }
    pop();
  }

  static walker(x, y) {
   let c = int(random(50, 200));
  let stepX = random(-5, 5);
  let stepY = random(-5, 5);
  let a = 0;
  let stepA = random(-1, 1) * 0.2;
  let r = random(5, 30);
  let stepR = random(-1, 1) * 0.01;
  while (c > 0) {
    strokeWeight(random(0.5, 5));
    push();
    translate(x, y);
    rotate(a);
    point(r, 0);
    pop();
    c--;
    x += stepX;
    y += stepY;
    a += stepA;
    r += stepR;
    }
  }
}
function walker(x, y) {
  let c = int(random(50, 200));
  let stepX = random(-5, 5);
  let stepY = random(-5, 5);
  let a = 0;
  let stepA = random(-1, 1) * 0.2;
  let r = random(5, 30);
  let stepR = random(-1, 1) * 0.01;
  while (c > 0) {
    strokeWeight(random(0.5, 1));
    push();
    translate(x, y);
    rotate(a);
    point(r, 0);
    pop();
    c--;
    x += stepX;
    y += stepY;
    a += stepA;
    r += stepR;
  }
}

/////////

const rangi3 = [
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
  { r: 251, g: 86, b: 7 }
];
function randomizeColor(){
  const selectedColor = rangi3[int(random(0, rangi3.length))];
  return {
    r: selectedColor.r,
    g: selectedColor.g,
    b: selectedColor.b,
    a: int(random(1, 200)),
  };
}
function ko12() {
  createCanvas(800, 800);
  
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(2, 5);
    let l = random(1, 100);
    let ang = random(TWO_PI);
    let rnd = int(random(3));
    let m = new Jlod(x,y, d, l, ang, rnd);
    Jlos.push(m);
  }
}
let Jlos = [];

function kha2() {
  (255);
  for (let i = 0; i < Jlos.length; i++) {
    Jlos[i].update();
    Jlos[i].display();
  }
}

class Jlod {
  constructor(x, y, d, l, ang, rnd) {
    this.color = randomizeColor();
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.diameter = d;
    this.lineLength = l;
    this.angle = ang;
    this.type = rnd;
    this.mass = this.diameter;
    
  }

  update() {
    let center = createVector(width / 2, height / 2);
    let dir = center.sub(this.position);
    dir.setMag(0.1);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    stroke(this.color.r, this.color.g, this.color.b);
    noFill();
    fill(this.color.r, this.color.g, this.color.b);

    if (this.type == 0) {
      strokeWeight(random(0.5, 2));
      stroke(this.color.r, this.color.g, this.color.b);
      line(0, 0, 0, this.lineLength);
    } else if (this.type == 1) {
      fill(this.color.r, this.color.g, this.color.b);
      Jlod.circ(0, 0, this.diameter);
    } else {
      Jlod.walker(0, 0);
    }
    pop();
  }

  static circ(x, y, d) {
    let rnd = int(random(3));
    push();
    translate(x, y);
    rotate(PI * 0.5 * int(random(4)));
    strokeWeight(random(0.5, 2));
    if (rnd == 0) {
      circle(0, 0, d);
    }
    if (rnd == 1) {
      let num = int(random(5, 18));
      strokeWeight(random(1.5, 3));
      for (let a = 0; a < TWO_PI; a += TWO_PI / num) {
        point(d * 0.5 * cos(a), d * 0.5 * sin(a));
      }
    }
    if (rnd == 2) {
      let num = int(random(3, 9));
      let l = d * random(0.4, 0.6);
      for (let a = 0; a < TWO_PI; a += TWO_PI / num) {
        push();
        translate(d * 0.5 * cos(a), d * 0.5 * sin(a));
        rotate(a);
        circle(0, 0, l);
        pop();
      }
    }
    pop();
  }

  static walker(x, y) {
    let c = int(random(50, 200));
    let stepX = random(-5, 5);
    let stepY = random(-5, 5);
    let a = 0;
    let stepA = random(-1, 1) * 0.2;
    let r = random(5, 30);
    let stepR = random(-1, 1) * 0.01;
    while (c > 0) {
      strokeWeight(random(0.5, 1));
      push();
      translate(x, y);
      rotate(a);
      point(r, 0);
      pop();
      c--;
      x += stepX;
      y += stepY;
      a += stepA;
      r += stepR;
    }
  }
}

////////
let PD2244 = [];
let PD224 = [];
let PD324 = [];
let lines= [];


function draw33() {

  
 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  
  fill(255,random(0,255))
  for (let i = 2; i < PD24.length - 1; i++) {
    const p1 = PD24[i];
    const p2 = PD24[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
      strokeWeight(1)

    const asciiValue = map(cx, 0, windowWidth, 133, 226); // تبدیل مختصات x به ASCII
    const asciiChar = String.fromCharCode(asciiValue); // تبدیل عدد ASCII به کاراکتر ASCII
    /* [fix] متن روی بوم حذف شد */ // text(asciiChar, cx, cy); // نمایش کاراکتر ASCII
noFill()
    if (i === 5) {
      const r1 = generateRandomNumber3() //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber3(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
  }  else if (i === 10) {
      const r4 = generateRandomNumber3()/2 //random(50, 200);
            strokeWeight(12)
   stroke(0);
  // stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }    

   stroke(0);
            strokeWeight(10.2)
    curveVertex(cx-10, cy);
  }
  
  curveVertex(PD24[PD24.length - 1].x, PD24[PD24.length - 1].y);
  endShape();


	
	
		
		
  

hatching24() 

  noStroke();

  //sprayPaint()
  
  t++;
        
    
}


function o224() {
  (255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD24.length - 1; i++) {
    const p1 = PD24[i];
    const p2 = PD24[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 60 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      //fill(0)
         fill(255, 204, 0);
         stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, ra);
     }  else if (i === 10) {
      const r4 = 30 //random(50, 200);
            strokeWeight(12)
   stroke(0);
         fill(255, 204, 0);

   //stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }   
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(PD24[PD24.length - 1].x, PD24[PD24.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPen()

  t++;
}


function o324() {
  (0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < PD24.length - 1; i++) {
    const p1 = PD24[i];
    const p2 = PD24[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
//fill(255,32)
  stroke(0, 0, 0,255);
   strokeWeight(16.2)
  curveVertex(PD324[PD324.length - 1].x, PD324[PD324.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPen24() {
  stroke(30, 30, 0, 255);
  strokeWeight(random(0.1,0.9));
  const width = random(1,45);
  const lerps = 6;

  for (let i = 12; i < PD24.length - 1; i++) {
    const p1 = PD24[i];
    const p2 = PD24[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatching24() {
  // set the color and brush style
// stroke(15, 15, 255, 220);
  strokeWeight(0.3);
//fill(15, 15, 255, 220);
  stroke(0)
fill(0,0,0,30)
  let speed = 1; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید
  const lerps = 63;

  for (let i = 1; i < PD24.length - 1; i++) {
    const p1 = PD24[i];
    const p2 = PD24[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 150) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      
    const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
     

    }
  }
}
function getAsciiChar24(x, y) {
  const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];
  const brightness = Brightness(get(x, y));
  const index = floor(map(brightness, 0, 255, 0, asciiChars.length));
  return asciiChars[index];
}


////////

let PD2233 = [];
let PD223 = [];
let PD323 = [];
let lines23= [];
function draw32() {
  ////////background(255);
  
  
 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
  for (let i = 0; i < PD23.length - 1; i++) {
    
    
    const p1 = PD23[i];
    const p2 = PD23[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    //strokeWeight(p1.size / 10);
     //stroke(0)
     const asciiValue = map(cx, 0, windowWidth, 133, 326); // تبدیل مختصات x به ASCII
    const asciiChar = String.fromCharCode(asciiValue); // تبدیل عدد ASCII به کاراکتر ASCII
    /* [fix] متن روی بوم حذف شد */ // text(asciiChar, cx, cy); // نمایش کاراکتر ASCII
 
    if (i === 5) {
      const r1 = generateRandomNumber3() //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber3(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
  }  else if (i === 10) {
      const r4 = 80 //random(50, 200);
            strokeWeight(12)
   stroke(0);
  // stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }    


      noFill()
    strokeWeight(0.1) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(PD23[PD23.length - 1].x, PD23[PD23.length - 1].y);
  endShape();

 fill(255,random(0,255));
	
	
		
		
  

hatching23() 

  noStroke();

  //sprayPaint()
  
  t++;
        
    
}


function o223() {
  (255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD23.length - 1; i++) {
    const p1 = PD23[i];
    const p2 = PD23[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 60 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      //fill(0)
         fill(255, 204, 0);
         stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, ra);
     }  else if (i === 10) {
      const r4 = 30 //random(50, 200);
            strokeWeight(12)
   stroke(0);
         fill(255, 204, 0);

   //stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }   
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(PD23[PD23.length - 1].x, PD23[PD23.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPen23()

  t++;
}


function o323() {
  (0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < PD23.length - 1; i++) {
    const p1 = PD23[i];
    const p2 = PD23[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,32)
  stroke(0, 0, 0,255);
   strokeWeight(16.2)
  curveVertex(PD323[PD323.length - 1].x, PD323[PD323.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPen23() {
  stroke(30, 30, 0, 255);
  strokeWeight(random(0.1,0.9));
  const width = random(1,45);
  const lerps = 6;

  for (let i = 12; i < PD23.length - 1; i++) {
    const p1 = PD23[i];
    const p2 = PD23[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatching23() {
  // set the color and brush style
// stroke(15, 15, 255, 220);
  strokeWeight(generateRandomNumber3()/150);
//fill(15, 15, 255, 220);
  stroke(0)
fill(0,0,0,30)
  let speed = 1; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید
  const lerps = 63;

  for (let i = 1; i < PD23.length - 1; i++) {
    const p1 = PD23[i];
    const p2 = PD23[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 150) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      
    const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
     

    }
  }
}
function getAsciiChar23(x, y) {

  const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];
  const brightness = Brightness(get(x, y));
  const index = floor(map(brightness, 0, 255, 0, asciiChars.length));
  return asciiChars[index];
}



////////

let PD2222 = [];
let PD222 = [];
let PD322 = [];

function draw31() {
 
  

 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



    
      beginShape();
 
  noFill()
  for (let i = 4; i < PD22.length - 1; i++) {
    const p1 = PD22[i];
    const p2 = PD22[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 10);
     stroke(0)
    
 
    if (i === 5) {
      const r1 = generateRandomNumber3() //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 12) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
arc(cx, cy, generateRandomNumber3(),10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
  }  else if (i === 10) {
      const r4 = 80 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
   stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }  
    
      noFill()
    strokeWeight(2.1) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(PD22[PD22.length - 1].x, PD22[PD22.length - 1].y);
  endShape();

 
  

hatching22() 

  noStroke();

  //sprayPaint()
  
  t++;

}

function o222() {
  (255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD22.length - 1; i++) {
    const p1 = PD22[i];
    const p2 = PD22[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
       
 
    if (i === 5) {
      const ra = 125 //random(10, 100);
   //stroke(255, 204, 0);
noStroke()
      fill(0)
      //strokeWeight(12)
      ellipse(cx, cy, ra);
     }  else if (i === 10) {
      const r4 = 180 //random(50, 200);
            strokeWeight(12)
   stroke(0);
             fill(0)

   //stroke(255, 204, 0);
      ellipse(cx, cy, r4);
 }   
    noFill()
    strokeWeight(2.1) 
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
 
  stroke(0, 0, 0,255);
   strokeWeight(0.2)

  curveVertex(PD22[PD22.length - 1].x, PD22[PD22.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPen22()

  t++;
}


function o322() {
  (0);
  strokeWeight(22); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 0,255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < PD22.length - 1; i++) {
    const p1 = PD22[i];
    const p2 = PD22[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,32)
  stroke(0, 0, 0,255);
   strokeWeight(0.2)
  curveVertex(PD322[PD322.length - 1].x, PD322[PD322.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPen22() {
  stroke(30, 30, 0, 255);
  strokeWeight(random(0.1,0.9));
  const width = random(1,45);
  const lerps = 6;

  for (let i = 12; i < PD22.length - 1; i++) {
    const p1 = PD22[i];
    const p2 = PD22[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatching22() {
  // set the color and brush style
// stroke(15, 15, 255, 220);
  strokeWeight(0.3);
//fill(15, 15, 255, 220);
  stroke(0)
fill(0,0,0,30)
  let speed = 2; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 2; i < PD22.length - 1; i++) {
    const p1 = PD22[i];
    const p2 = PD22[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 2 + (width / 2) * j;
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
      noStroke()
      circle(x - speed / 2, y - speed / 2,5)
    }
  }
}



//////
function draw30() {
  (255);
  
  //o2()
  let x = windowWidth/2;
let y = windowHeight/2;
let r = 100;
 
  strokeWeight(2);
  stroke(0);
  frameRate(30)
  //fill(255, 0, 0);
noFill()



  beginShape();
  curveVertex(PD18[5].x, PD18[5].y); // اولین نقطه از آرایه مختصات

  let wind = (map(noise(xoff18), 0, 1, -1, 1)) * __vizWind();
  xoff18 += frequency;
  x += wind;

  // محدود کردن x بیضی در محدوده صفحه نمایش
  x = constrain(x, r, width - r);
  //noStroke();
  fill(240);
  beginShape();
    strokeWeight(5.2);
  for (let angle = 0; angle < PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 2);
    let ynoise = map(sin(angle), -1, 1, 0, 2);
    let distortion = map(noise(xoff18 + xnoise, yoff18 + ynoise), 0, 1, -amplitude, amplitude);
    let xr = (r + distortion) * cos(angle) * 2;
    let yr = (r + distortion) * sin(angle) *1;
  
    vertex(x + xr, y + yr);
  }
  
  //stroke(0)
  for (let i = 10; i < PD18.length/1; i++) {
    
    
    const p = PD18[i];
    const x = noise(p.x * 0.01, p.y * 0.01,10 ) * 500
    const y = noise(p.x * 0.01, p.y * 0.01, 10 + 2500) * 500;
    p.x = x;
    p.y = y;
    strokeWeight(10.2);
    point(p.x, p.y);
    noStroke()

   fill(255, 204, 0);
    //stroke(111)
    circle(p.x, p.y,p.size/random(20,40) )
    noFill()
        //stroke(0)
    
    
  
  for (let i = 4; i < PD18.length - 1; i++) {
    const p1 = PD18[i];
    const p2 = PD18[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
    
    
    if (i === 5) {
      const r1 = generateRandomNumber3() //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = generateRandomNumber3()/2 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, generateRandomNumber3(), 1.9, 1.9, 1.5);

  }
    
    strokeWeight(0.2) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(PD18[PD18.length - 1].x, PD18[PD18.length - 1].y);
  endShape();

 
  

hatching5() 

  noStroke();

  sprayPaint5()
  
  t++;
}
}






//////////

let PD18 = [];
let PD218 = [];
let PD318 = [];
let xoff18 = 0;
let yoff18 = 0;
let amplitude = 40;
let frequency = 0.01;

function draw29() {
  (255);
  

  let x = windowWidth/2;
let y = windowHeight/2;
let r = 100;
 
  strokeWeight(2);
  stroke(0);
 
  //fill(255, 0, 0);


  beginShape();
  curveVertex(PD18[5].x, PD18[5].y); // اولین نقطه از آرایه مختصات

  let wind = (map(noise(xoff18), 0, 1, -1, 1)) * __vizWind();
  xoff18 += frequency;
  x += wind;

  // محدود کردن x بیضی در محدوده صفحه نمایش
  x = constrain(x, r, width - r);
  //noStroke();
  fill(240);
  beginShape();
    strokeWeight(5.2);
  for (let angle = 0; angle < PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 2);
    let ynoise = map(sin(angle), -1, 1, 0, 2);
    let distortion = map(noise(xoff18 + xnoise, yoff18 + ynoise), 0, 1, -amplitude, amplitude);
    let xr = (r + distortion) * cos(angle) * 2;
    let yr = (r + distortion) * sin(angle) *1;
   //WW3(x + xr, y + yr, random(0.01,0.5))

    vertex(x + xr, y + yr);
  }
  
  //stroke(0)
  for (let i = 10; i < PD18.length/1; i++) {
    
    
    const p = PD18[i];
    const x = noise(p.x * 0.01, p.y * 0.01,10 ) * 500
    const y = noise(p.x * 0.01, p.y * 0.01, 10 + 2500) * 500;
    p.x = x;
    p.y = y;
    strokeWeight(10.2);
    point(p.x, p.y);
    noStroke()

   fill(255, 204, 0);
    //stroke(111)
    circle(p.x, p.y,p.size/random(20,40) )
    noFill()
        //stroke(0)
    
    
  
  for (let i = 4; i < PD18.length - 1; i++) {
    const p1 = PD18[i];
    const p2 = PD18[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
    
    
    if (i === 5) {
      const r1 = generateRandomNumber3() //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = generateRandomNumber3()/2 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, generateRandomNumber3(), 1.9, 1.9, 1.5);

  }
    strokeWeight(10.2) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(PD18[PD18.length - 1].x, PD18[PD18.length - 1].y);
  endShape();

 
  

hatching5() 

  noStroke();

  sprayPaint5()
  
  t++;
}
}





function o218() {
  (255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD18.length - 1; i++) {
    const p1 = PD18[i];
    const p2 = PD18[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
  noStroke();
strokeWeight(4);
  curveVertex(PD18[PD18.length - 1].x, PD18[PD18.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPen5()

  t++;
}


function o318() {
  (0);
  strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < PD18.length - 1; i++) {
    const p1 = PD18[i];
    const p2 = PD18[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
//fill(255,32)

  strokeWeight(4);
  curveVertex(PD318[PD318.length - 1].x, PD318[PD318.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPen5() {
  stroke(0, 0, 0, 255);
  strokeWeight(random(1,3));
  const width = random(1,5);
  const lerps = 16;

  for (let i = 12; i < PD18.length - 1; i++) {
    const p1 = PD18[i];
    const p2 = PD18[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}

function sprayPaint5() {
  // set the color and brush style
  stroke(0, 0, 0, 255);
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of spraypaint brush
  const minRadius = 30;
  const sprayDensity = 80;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 13; i < PD18.length - 1; i++) {
    const p1 = PD18[i];
    const p2 = PD18[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   stroke(0,100);

        // draw the random point
        point(lerpX + randX, lerpY + randY);
      }
    }
  }
}

function hatching5() {
  // set the color and brush style
 stroke(15, 15, 255, 220);
  strokeWeight(0.45);
noFill()
  let speed = 2; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 13; i < PD18.length - 1; i++) {
    const p1 = PD18[i];
    const p2 = PD18[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 2 + (width / 2) * j;
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
      circle(x - speed / 2, y - speed / 2,30)
    }
  }
}


/////////
function draw28() {

 


  beginShape();
  
  //stroke(0)
  for (let i = 10; i < PD17.length/1; i++) {
    
    
    const p = PD17[i];
    const x = noise(p.x * 0.01, p.y * 0.01,10 ) * 500
    const y = noise(p.x * 0.01, p.y * 0.01, 10 + 2500) * 500;
    p.x = x;
    p.y = y;
    strokeWeight(1.2);
    point(p.x, p.y);
    noStroke()

   fill(255, 204, 0);
    //stroke(111)
    circle(p.x, p.y,p.size/random(20,40) )
    noFill()
        //stroke(0)
    
    
  
  for (let i = 4; i < PD17.length - 1; i++) {
    const p1 = PD17[i];
    const p2 = PD17[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
    
    
    if (i === 5) {
      const r1 = generateRandomNumber3() //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = generateRandomNumber3()/2 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, generateRandomNumber3(), 1.9, 1.9, 1.5);

  }
    strokeWeight(0.2) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(PD17[PD17.length - 1].x, PD17[PD17.length - 1].y);
  endShape();

 
  wind()

hatching3() 
hatching4() 

  noStroke();

  sprayPaint2()
  
  t++;
}
}






function o217() {
  (255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD17.length - 1; i++) {
    const p1 = PD17[i];
    const p2 = PD17[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
  noStroke();
strokeWeight(4);
  curveVertex(PD17[PD17.length - 1].x, PD17[PD17.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPen()

  t++;
}


function o317() {
  (0);
  strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < PD17.length - 1; i++) {
    const p1 = PD17[i];
    const p2 = PD17[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,32)
 noStroke() 
  curveVertex(PD317[PD317.length - 1].x, PD317[PD317.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPen4() {
  stroke(0, 0, 0, 255);
  strokeWeight(random(1,3));
  const width = random(1,5);
  const lerps = 16;

  for (let i = 12; i < PD17.length - 1; i++) {
    const p1 = PD17[i];
    const p2 = PD17[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}

function sprayPaint2() {
  // set the color and brush style
  stroke(0, 0, 0, 255);
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of spraypaint brush
  const minRadius = 30;
  const sprayDensity = 80;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 13; i < PD17.length - 1; i++) {
    const p1 = PD17[i];
    const p2 = PD17[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   stroke(0,100);

        // draw the random point
        point(lerpX + randX, lerpY + randY);
      }
    }
  }
}

function hatching3() {
  // set the color and brush style
 stroke(15, 15, 255, 220);
  strokeWeight(0.45);
noFill()
  let speed = 2; // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 13; i < PD17.length - 1; i++) {
    const p1 = PD17[i];
    const p2 = PD17[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 3; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 2 + (width / 2) * j;
      line(x - speed / 2, y - speed / 2, x + speed / 2, y + speed / 2);
      circle(x - speed / 2, y - speed / 2,30)
    }
  }
}



function hatching4() {
  
  // set the color and brush style
// stroke(15, 15, 255, 220);
  //let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(0,0,0,12)
fill(0,0,0,12)
  let speed = random(1,40); // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 0; i < PDe17.length - 1; i++) {
    const p1 = PDe17[i];
    const p2 = PDe17[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 1; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed * 2, y + speed * 2);
      
      //noStroke()
      //circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}




//////////

let PD16 = [];
let PD216 = [];
let PD316 = [];

function draw27() {
  


  beginShape();
  
  //stroke(0)
  for (let i = 10; i < PD16.length/1; i++) {
    
    
    const p = PD16[i];
    const x = noise(p.x * 0.01, p.y * 0.01,10 ) * 500
    const y = noise(p.x * 0.01, p.y * 0.01, 10 + 2500) * 500;
    p.x = x;
    p.y = y;
    strokeWeight(1.2);
    point(p.x, p.y);
    noStroke()

   fill(255, 204, 0);
    //stroke(111)
    circle(p.x, p.y,p.size/random(20,40) )
    noFill()
        //stroke(0)
    
    
  
  for (let i = 4; i < PD16.length - 1; i++) {
    const p1 = PD16[i];
    const p2 = PD16[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
    
    
    if (i === 5) {
      const r1 = generateRandomNumber3() //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = generateRandomNumber3()/2 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, generateRandomNumber3(), 1.9, 1.9, 1.5);

  }
    strokeWeight(0.2) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(PD16[PD16.length - 1].x, PD16[PD16.length - 1].y);
  endShape();

 
  



  noStroke();

  
  
  t++;
}
}


function generateRandomNumber3() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber = Math.floor(Math.random() * 300) + 1; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber;
}


function generateRandomNumber4() {
  if (!randomNumber) {
    // در صورتی که عدد تصادفی قبلا تولید نشده باشد، آن را تولید می‌کنیم
    randomNumber2 = Math.floor(Math.random() * 50) + 12; // عدد تصادفی بین 1 تا 200
  }
  return randomNumber2;
}




function o216() {
  (255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD16.length - 1; i++) {
    const p1 = PD16[i];
    const p2 = PD16[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
strokeWeight(4);

  curveVertex(PD16[PD16.length - 1].x, PD16[PD16.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPen3()

  t++;
}


function o316() {
  (0);
  strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < PD16.length - 1; i++) {
    const p1 = PD16[i];
    const p2 = PD16[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
fill(255,32)
 noStroke() 
  curveVertex(PD3[PD3.length - 1].x, PD3[PD3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPen3() {
  stroke(0, 0, 0, 255);
  strokeWeight(random(1,3));
  const width = random(1,150);
  const lerps = 16;

  for (let i = 12; i < PD16.length - 1; i++) {
    const p1 = PD16[i];
    const p2 = PD16[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}








////////
let PD15 = [];
let PD215 = [];
let PD315 = [];
function draw26() {
 
 
noFill()



  beginShape();
  
  //stroke(0)
  for (let i = 10; i < PD15.length/1; i++) {
    
    
    const p = PD15[i];
    const x = noise(p.x * 0.01, p.y * 0.01,10 ) * 500
    const y = noise(p.x * 0.01, p.y * 0.01, 10 + 2500) * 500;
    p.x = x;
    p.y = y;
    strokeWeight(1.2);
    point(p.x, p.y);
    noStroke()

   fill(255, 204, 0);
    //stroke(111)
    circle(p.x, p.y,p.size/random(20,40) )
    noFill()
        //stroke(0)
    
    
  
  for (let i = 4; i < PD15.length - 1; i++) {
    const p1 = PD15[i];
    const p2 = PD15[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
    
    
    if (i === 5) {
      const r1 = 100 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = 50 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, 100, 1.9, 1.9, 1.5);

  }
    
    strokeWeight(0.2) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(PD15[PD15.length - 1].x, PD15[PD15.length - 1].y);
  endShape();

 
  



  noStroke();

  
  
  t++;
}
}


function o215() {
  (255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD15.length - 1; i++) {
    const p1 = PD15[i];
    const p2 = PD15[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight( 0.03)
  noStroke();

  curveVertex(PD15[PD15.length - 1].x, PD15[PD15.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
fountainPen2()

  t++;
}


function o315() {
  (0);
  strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < PD15.length - 1; i++) {
    const p1 = PD15[i];
    const p2 = PD15[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                //strokeWeight(2)
  //stroke(0);
//fill(0,232)
 noStroke() 
  curveVertex(PD315[PD315.length - 1].x, PD315[PD315.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function fountainPen2() {
  stroke(0, 0, 0, 255);
  strokeWeight(1);
  const width = 50;
  const lerps = 16;

  for (let i = 2; i < PD15.length - 1; i++) {
    const p1 = PD15[i];
    const p2 = PD15[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


/////////
function draw25() {

  //fill(255, 0, 0);
noFill()



  beginShape();
  
  //stroke(0)
  for (let i = 10; i < PD14.length/1; i++) {
    
    
    const p = PD14[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    strokeWeight(1.2);
    point(p.x, p.y);
    noStroke()

   fill(255, 204, 0);
    //stroke(111)
    circle(p.x, p.y,p.size/random(20,40) )
    noFill()
        //stroke(0)
    
    
  
  for (let i = 4; i < PD.length - 1; i++) {
    const p1 = PD14[i];
    const p2 = PD14[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
    
    
    if (i === 5) {
      const r1 = 100 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = 50//random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, 100, 1.9, 1.9, 1.5);

  }
    strokeWeight(0.2) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(PD14[PD14.length - 1].x, PD14[PD14.length - 1].y);
  endShape();

 
  




  noStroke();

  
  
  t++;
}
}

function o214() {
  
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD14.length - 1; i++) {
    const p1 = PD14[i];
    const p2 = PD14[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight( 3)
  stroke(0,255);

  curveVertex(PD14[PD14.length - 1].x, PD14[PD14.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function o314() {
  (0);
  strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < PD14.length - 1; i++) {
    const p1 = PD14[i];
    const p2 = PD14[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                strokeWeight(1)
  stroke(0);
fill(255,random(0,255))
  
  curveVertex(PD314[PD314.length - 1].x, PD314[PD314.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


///////
let PD13 = [];
let PD213 = [];
let PD313 = [];

function draw24() {

  strokeWeight(2);
  stroke(0);

  //fill(255, 0, 0);
noFill()

//o2()

  beginShape();
  

  stroke(0)
  for (let i = 14; i < PD13.length/1; i++) {
    
    
    const p = PD13[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    strokeWeight(1.2);
    point(p.x, p.y);
        fill(255,random(100,255))
    stroke(255)
    circle(p.x, p.y,p.size / 35)
    noFill()
        stroke(0)
    
    
  
  for (let i = 2; i < PD13.length - 1; i++) {
    const p1 = PD13[i];
    const p2 = PD13[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
    
    
    if (i === 5) {
      const r1 = 120 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = 30 //random(50, 200);
            strokeWeight(12)

      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, cx/2, 1.9, 1.9, 1.5);

  }
        fill(255,random(100,255))
    strokeWeight(0.2) 
    noFill()
   curveVertex(cx, cy);
  }
  
  curveVertex(PD13[PD13.length - 1].x, PD13[PD13.length - 1].y);
  endShape();

 
  




  noStroke();

  
  
  t++;
}
}
            


function o213() {
  (255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD13.length - 1; i++) {
    const p1 = PD13[i];
    const p2 = PD13[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(255)
   noFill()
   curveVertex(cx, cy);
  }
       fill(255,random(1,255))     
  strokeWeight(0.4)
  stroke(0);

  curveVertex(PD13[PD13.length - 1].x, PD13[PD13.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function o313() {
  (0);
  strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(255);
  noFill(); // we don't want to fill the main shape
  beginShape();
   for (let i = 2; i < PD13.length - 1; i++) {
    const p1 = PD13[i];
    const p2 = PD13[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    strokeWeight(p1.size / 35);
     stroke(0)
   curveVertex(cx+10, cy-10);
  }
                strokeWeight(0.01)
  stroke(0);
    fill(255,random(1,255))
  
  curveVertex(PD313[PD313.length - 1].x, PD313[PD313.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}




////////////

function draw23() {

   let thickness = map(mouseX, 0, width, 1, 3); // تجمیع ضخامت خط بر اساس موقعیت ماوس
  strokeWeight(thickness);

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -3; //افزودن مضرب برای افزایش شدت انحنا
    
    
    if (i === 5) {
      const r1 = 120 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    } else if (i === 4) {
      const r2 = 30 //random(50, 200);
            strokeWeight(12)
stroke(255)
      ellipse(cx, cy, r2);
    } else if (i === 6) {
      const r3 = 15 //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);

arc(cx, cy+1, cx/2, 1.9, 1.9, 1.5);
    }
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10)
  stroke(0);
noFill()
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  
  //g1()
  t++;
}

function o212() {
  (255);
  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 2; i < PD212.length - 1; i++) {
    const p1 = PD212[i];
    const p2 = PD212[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(0);

  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


function o312() {
  (0);
  strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  
   for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * -5; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * -5; //افزودن مضرب برای افزایش شدت انحنا
  
   curveVertex(cx+10, cy-10);
  }
                strokeWeight(0.01)
  stroke(0);
//fill(255,32)
  
  curveVertex(PD312[PD312.length - 1].x, PD312[PD312.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

let PD12 = [];
let PD212 = [];
let PD312 = [];
let PDg12 = [];

///////////
function back2() {
  
  ;
  rect(0, 0, width, height);

  const margin = 50;
  const w = (width - margin * 2) / 2 ;
  const h = (height - margin * 2) / 2;

  // Set noise detail level and seed
  noiseDetail(4, 0.5);

  // Draw PDF 1
  drawFunctionInRect(margin, margin, w, h, PD08);

  // Draw PDF 2
  drawFunctionInRect(margin + w, margin, w, h, PD2);

  // Draw PDF 3
  drawFunctionInRect(margin, margin + h, w, h, PD3);

  // Draw PDF 4
  drawFunctionInRect(margin + w, margin + h, w, h, PD01);
}

function drawFunctionInRect(x, y, w, h, PD) {
  const t = frameCount * 0.1;
  const noiseScale = 0.01;


  //Draw curve
  noFill();
  strokeWeight(2);
  stroke(0);
  beginShape();

  for (let i = 0; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    // Use only one coordinate for the noise function
    const cx1 = x + map(noise(p1.x * noiseScale + t), 0, 1, 0, w);
    const cy1 = y + map(noise(p1.x * noiseScale + t), 0, 1, 0, h);
    const cx2 = x + map(noise(p2.x * noiseScale + t), 0, 1, 0, w);
    const cy2 = y + map(noise(p2.x * noiseScale + t), 0, 1, 0, h);
    curveVertex(cx1, cy1);
    curveVertex(cx2, cy2);
  }

  endShape();
}
////////
function back() {
 

  const margin = 50;
  const w = (width - margin * 2) / 2 ;
  const h = (height - margin * 2) / 2;

  // Draw PDF 1
  drawFunctionInRect(margin, margin, w, h, PD);

  // Draw PDF 2
  drawFunctionInRect(margin + w, margin, w, h, PD2);

  // Draw PDF 3
  drawFunctionInRect(margin, margin + h, w, h,PD3);

  // Draw PDF 4
  drawFunctionInRect(margin + w, margin + h, w, h, PD01);
}

function drawFunctionInRect(x, y, w, h, PD) {
  const t = frameCount * 0.1;
  const noiseScaleX = w / 100;
  const noiseScaleY = h / 100;



  // Draw curve
  noFill();
  strokeWeight(random(0.1,15.2));
  //stroke(random(palette));
  stroke(0)
  beginShape();
  curveVertex(x + w / 2, y + h / random(4, 5.1));

  for (let i = 1; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx = x + (p1.x + p2.x) / 2 + (noise(p1.x / noiseScaleX, p1.y / noiseScaleY, t / 50) - 0.5) * p1.size ;
    const cy = y + (p1.y + p2.y) / 2 + (noise(p1.x / noiseScaleX, p1.y / noiseScaleY, t / 50) - 0.5) * p1.size ;
    noFill()
   curveVertex(cx, cy);
  }

  curveVertex(x + PD[PD.length - 1].x, y + PD[PD.length - 1].y);
  endShape();
}
/////////
function draw22() {



  PDki08()
  
   

// استفاده از رنگ‌های تصادفی ایجاد شده

 
   // o408()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
 

   fill(255, 204, 0);
    //stroke(111)
   
    noFill()
     strokeWeight(0.2);
  curveVertex(windowWidth/2, windowHeight/random(4,5.1));
 // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 1; i < PD08.length - 1; i++) {
    const p1 = PD08[i];
    const p2 = PD08[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
  
    
      if (i === 5) {
      const r1 = 100 //random(10, 100);
   stroke(255, 204, 0);
 strokeWeight(random(0,5))
  stroke(255,random(1,140));
    circle(cx, cy, random(1,400))
          stroke(255, 204, 0);
      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = 100  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, 100,10 ,PI - QUARTER_PI, -2*TWO_PI);
      
       strokeWeight(random(0,5))
  stroke(255,random(1,140));
    circle(cx, cy, random(1,250))
   //stroke(255, 20, 10);
 } 
     
    noFill()
   curveVertex(cx, cy);
  }
   stroke(0);        
//fill(255,255,255,random(0,8))
  curveVertex(PD08[PD08.length - 1].x, PD08[PD08.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//fountainPen()
//hatching()
//sprayPaint()  
  t++;
    
    //g1()
 back() 

}






/////////
function draw21() {


 
   
  PDki08()
  
  

// استفاده از رنگ‌های تصادفی ایجاد شده

 
   // o408()

  noFill(); // we don't want to fill the main shape
  beginShape();
  
 

   fill(255, 204, 0);
    //stroke(111)
   
    noFill()
     strokeWeight(0.2);
  curveVertex(windowWidth/2, windowHeight/random(4,5.1));
 // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 55; i < PD08.length - 1; i++) {
    const p1 = PD08[i];
    const p2 = PD08[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
    
    
      if (i === 5) {
      const r1 = 100 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = 100  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, 100,10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
      strokeWeight(random(0,12))
  stroke(255,random(1,110));
    circle(cx, cy, random(1,300))
    noFill()
   curveVertex(cx, cy);
  }
   stroke(0);        
//fill(255,255,255,random(0,8))
  curveVertex(PD08[PD08.length - 1].x, PD08[PD08.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//fountainPen()
//hatching()
//sprayPaint()  
  t++;
    
   // g1()


}








///////
function draw20() {

   
  PDki08()
  
  

// استفاده از رنگ‌های تصادفی ایجاد شده

 
 

  noFill(); // we don't want to fill the main shape
  beginShape();
  
 

   fill(255, 204, 0);
    //stroke(111)
   
    noFill()
     strokeWeight(0.2);
  curveVertex(windowWidth/2, windowHeight/random(4,5.1));
 // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < PD08.length - 1; i++) {
    const p1 = PD08[i];
    const p2 = PD08[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = 100 //random(10, 100);
   stroke(255, 204, 0);

      strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = 100  //random(50, 200);
            strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, 100,10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
  
    noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(20.5)
  stroke(0);
//fill(255,255,255,random(0,8))
  curveVertex(PD08[PD08.length - 1].x, PD08[PD08.length - 1].y);
  endShape();


  t++;
    
    //g1()


}
function o208() {
  (255);


// استفاده از رنگ‌های تصادفی ایجاد شده
stroke(str(random(colorset)))

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 1; i < PD208.length - 1; i++) {
    const p1 = PD208[i];
    const p2 = PD208[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
    
    
   noFill()
   curveVertex(cx, cy);
  }
           
  strokeWeight(0.4)
  stroke(str(random(colorset)))

  curveVertex(PD208[PD208.length - 1].x, PD208[PD208.length - 1].y);
  endShape();


  t++;
}


function o308() {

  beginShape();
  
  
  
  
   for (let i = 2; i < PD08.length - 1; i++) {
    const p1 = PD08[i];
    const p2 = PD08[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(1.2)
  stroke(str(random(colorset)))
  //fill(0,0,0,2)
  curveVertex(PD308[PD308.length - 1].x, PD308[PD308.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o408() {

  beginShape();
  
  for (let i = 2; i < PD208.length - 1; i++) {
    const p1 = PD208[i];
    const p2 = PD208[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))
  curveVertex(PD208[PD208.length - 1].x, PD208[PD208.length - 1].y);
  endShape();

  
  t++;
  
}
function o508() {
  (0);
 
  beginShape();
  
  
   for (let i = 60; i < PD08.length/1; i++) {
    
    
    const p = PD08[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
 stroke(0,0,0,random(1,80))
    strokeWeight(22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < PDg08.length - 1; i++) {
    const p1 = PDg08[i];
    const p2 = PDg08[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(PDg08[PDg08.length - 1].x, PDg08[PDg08.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}

function o608() {
  (0);

  beginShape();
  
  for (let i = 2; i < PDg08.length - 1; i++) {
    const p1 = PDg08[i];
    const p2 = PDg08[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(0)
  curveVertex(PDg08[PDg08.length - 1].x, PDg08[PDg08.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function o708() {
  (0);

  beginShape();
  
  for (let i = 2; i < PDg08.length - 1; i++) {
    const p1 = PDg08[i];
    const p2 = PDg08[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(PDg08[PDg08.length - 1].x, PDg08[PDg08.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}
function o808() {
  (0);
  
  beginShape();
  
  for (let i = 2; i < PDe08.length - 1; i++) {
    const p1 = PDe08[i];
    const p2 = PDe08[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(PDe08[PDe08.length - 1].x, PDe08[PDe08.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}


function PDki08() {
  wind() 

  for (let p of PDk08) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function wind() {
  const gravity = 0.4; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...PDe08]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let PDk08 = [];
function fountainPen() {
  
stroke(str(random(colorset)))
  fill(str(random(colorset)))
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatching() {
  
  // set the color and brush style
// stroke(15, 15, 255, 220);
   let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(0,0,0,12)
fill(0,0,0,12)
  let speed = random(1,4); // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 100; i < PDe08.length - 1; i++) {
    const p1 = PDe08[i];
    const p2 = PDe08[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 1; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed * 2, y + speed * 2);
      
      //noStroke()
      //circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}

function sprayPaint() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(255)
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of spraypaint brush
  const minRadius = 130;
  const sprayDensity = 44;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 8; i < PD08.length - 1; i++) {
    const p1 = PD08[i];
    const p2 = PD08[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
strokeWeight(1)
      stroke(0,0,0,1)  
        point(lerpX + randX, lerpY + randY);
       // stroke(255,255,255,random(0,230)) 
       //arc(lerpX + randX, lerpY + randY, 2,6 ,PI , -2*TWO_PI);

      }
    }
  }
}

////////////
function draw19() {
 
    stroke(0);
 // stroke(palette[2]);
  strokeWeight(random(0.01,1.6));

  PDki07();
  let chosen = chooseRandomColor();

 

  noFill(); // we don't want to fill the main shape
  beginShape();
 
  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < PD07.length - 1; i++) {
    const p1 = PD07[i];
    const p2 = PD07[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
 
  for (let i = 0; i < palette.length; i++) {
   fill(palette[1]);
    noStroke(palette[1]);
   //rect(i * width / palette.length,  cy, width / palette.length/10, height/20);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    stroke(0,0,0,random(1,150))
    rect(cx, cy, width / bins.length/random(1,1.5), h/30);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
   
    stroke(chosen.colors[6])
    rect(cx, cy, width / bins.length/random(10,20), h/30);
  }
   
  
    noFill()
   curveVertex(cx, cy);
  }
noFill()
  strokeWeight(random(10,25));
  stroke(0, 0, 0, random(200, 240));
  curveVertex(PD07[PD07.length - 1].x, PD07[PD07.length - 1].y);
  
  endShape();

  t++;
 //G3() 
//g1()
  //G3()
 

function o207() {
  (255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
 beginShape();
 curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));
for (let i = 2; i < PD207.length - 1; i++) {
const p1 = PD207[i];
const p2 = PD207[i + 1];
const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا

  
  
  noStroke()


noFill()
   curveVertex(cx, cy);

 
}

strokeWeight(10.4)
stroke(chosen.colors[16])
NB()
  //strokeWeight(0.5)
  noFill()
//curveVertex(PD207[PD207.length - 1].x, PD207[PD207.length - 1].y);
endShape();

  t++;

  
}


}



function o307() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < PD07.length - 1; i++) {
    const p1 = PD07[i];
    const p2 = PD07[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
      
     noFill()
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2)
  stroke(str(random(colorset)))
  //fill(0,0,0,2)
  curveVertex(PD307[PD307.length - 1].x, PD307[PD307.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o407() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PD207.length - 1; i++) {
    const p1 = PD207[i];
    const p2 = PD207[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[3]);
    noFill()
    noStroke();
   
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill()
    fill(palette[colorIndex % palette.length]);
    //noStroke(palette[colorIndex % palette.length]);
   // stroke(255,255,255,random(1,5));
    rect(cx, cy, width / bins.length/10, h/30);
  }
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))
  curveVertex(PD207[PD207.length - 1].x, PD207[PD207.length - 1].y);
  endShape();

  t++;
  
}
function o507() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
   for (let i = 10; i < PD.length/1; i++) {
    
    
    const p = PD07[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
 stroke(0,0,0,random(1,80))
    strokeWeight(0.22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < PDk07.length - 1; i++) {
    const p1 = PDk07[i];
    const p2 = PDk07[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(PDk07[PDk07.length - 1].x, PDk07[PDk07.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
  
 
}

function o607() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
   
  for (let i = 2; i < PDk07.length - 1; i++) {
    const p1 = PDk07[i];
    const p2 = PDk07[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
     
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(0)
  stroke(str(random(colorset)))
  curveVertex(PDk07[PDk07.length - 1].x, PDk07[PDk07.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function o707() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDk07.length - 1; i++) {
    const p1 = PDk07[i];
    const p2 = PDk07[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
   
  
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  stroke(str(random(colorset)))
  curveVertex(PDk07[PDk07.length - 1].x, PDk07[PDk07.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}
function o807() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDe07.length - 1; i++) {
    const p1 = PDe07[i];
    const p2 = PDe07[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
    stroke(str(random(colorset)))
  curveVertex(PDe07[PDe07.length - 1].x, PDe07[PDe07.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}


function PDki07() {
  wind() 
     let chosen = chooseRandomColor();
  for (let p of PDk07) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}



////////

let colorsp = ["#004B8D", "#0088CC", "#00A1F1", "#00BFFF", "#00CED1", "#00FA9A", "#00FF7F", "#00FF00", "#228B22", "#2E8B57", "#FFFFFF"];
let weights = [20, 15, 10, 8, 6, 4, 2, 1.5, 1, 0.5, 0.1];
function draw18() {
 
  // ////////background(255);
  PDki();
   let chosen = chooseRandomColor();
stroke(chosen.colors[1]);

  noFill(); // we don't want to fill the main shape
  beginShape();

  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6])
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }

    noFill()
   curveVertex(cx, cy);
  }

  strokeWeight(11.5);
 stroke(0, 0, 0, random(0, 140));
   
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
  //fountainPen()

  t++;

 ////g1()
  

 stroke(chosen.colors[20])
  strokeWeight(weights[0]);
  for (let i = 0; i < PD.length; i++) {
    let point = PD[i];
    let x = noise(point.i * 0.03, frameCount * 0.01) * windowWidth;
    let y = noise(point.i * 0.03 + 1000, frameCount * 0.01) * windowHeight;
    drawPoint(x, y);
  }
  // حلقه‌های وسطی
  for (let j = 1; j < 7; j++) {
    stroke(chosen.colors[25])
    strokeWeight(weights[j]);
    for (let i = 0; i < PD.length; i++) {
      let point = PD[i];
      let x = noise(point.i * 0.03 + j * 50, frameCount * 0.01) * windowWidth;
      let y = noise(point.i * 0.03 + j * 500, frameCount * 0.01) * windowHeight;
      drawPoint(x, y);
    }
  }
  // حلقه‌های بیرونی
  for (let j = 7; j < 11; j++) {
    stroke(chosen.colors[30])
    strokeWeight(weights[j]);
    for (let i = 0; i < PD.length; i++) {
      let point = PD[i];
      let x = noise(point.i * 0.03 + (j - 6) * 100, frameCount * 0.01) * windowWidth;
      let y = noise(point.i * 0.03 + (j - 6) * 1000, frameCount * 0.01) * windowHeight;
      drawPoint(x, y);
    }
  }
}



function o205() {
  (255);
         let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
 beginShape();
for (let i = 2; i < PD2.length - 1; i++) {
const p1 = PD2[i];
const p2 = PD2[i + 1];
const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا

noFill()
   curveVertex(cx, cy);
curveVertex(p1.x, p1.y);
curveVertex(p2.x, p2.y);
}
strokeWeight(0.4)
stroke(chosen.colors[5])

curveVertex(PD2[PD2.length - 1].x, PD2[PD2.length - 1].y);
endShape();

  t++;
}


function o305() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(35.2)
  stroke(chosen.colors[15])
  //fill(0,0,0,2)
  curveVertex(PD3[PD3.length - 1].x, PD3[PD3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o405() {
  (0);
       let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PD2.length - 1; i++) {
    const p1 = PD2[i];
    const p2 = PD2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
    stroke(chosen.colors[8])

  curveVertex(PD2[PD2.length - 1].x, PD2[PD2.length - 1].y);
  endShape();

  
  t++;
  
}
function o505() {
  (0);
       let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
   for (let i = 60; i < PD.length/1; i++) {
    
    
    const p = PD[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
  stroke(chosen.colors[9])

    strokeWeight(22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
   stroke(chosen.colors[16])

  //fill(0,0,0,1)

  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}

function o605() {
  (0);
       let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
   stroke(chosen.colors[4])

  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function o705() {
  (0);
       let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
   stroke(chosen.colors[17])

  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}
function o8() {
  (0);
       let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDe.length - 1; i++) {
    const p1 = PDe[i];
    const p2 = PDe[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
  stroke(chosen.colors[19])

  curveVertex(PDe[PDe.length - 1].x, PDe[PDe.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}


function PDk05i() {
  wind() 
      let chosen = chooseRandomColor();
  for (let p of PDk05) {
   stroke(chosen.colors[21])

    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function wind() {
  const gravity = 0.4; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...PDe]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let PDk05 = [];
function fountainPen() {
     let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}



//////
function draw17() {
 

 beginShape();
    
    for (let i = 5; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
              
     
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
 
  for (let i = 0; i < palette.length; i++) {
 
    strokeWeight(lightColor);
  } 
  
  if (i === 5) {
      const r1 = lightColor //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = lightColor  //random(50, 200);
            //strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, lightColor,10 ,PI - QUARTER_PI, -2*TWO_PI);
  }
  
    
      
 

     strokeWeight(lightColor);
     //stroke(0)  
    noFill()
   curveVertex(cx, cy);
  }
  
 
 
    
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();
   PDki();
 
// g1()

//t+;

    }

 
/////
function draw16() {
 
 beginShape();
    
    for (let i = 5; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
              
     
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
 
  for (let i = 0; i < palette.length; i++) {
 
    strokeWeight(lightColor);
  } 
  
  if (i === 5) {
      const r1 = lightColor //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = lightColor  //random(50, 200);
            //strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, lightColor,10 ,PI - QUARTER_PI, -2*TWO_PI);
  }
  
    
      
    
     strokeWeight(lightColor);
     //stroke(0)  
    noFill()
   curveVertex(cx, cy);
  }
  
 
 
    
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();
   PDki();
 
  noFill()

// g1()

//t+;

    }

 

///////
function draw15() {

  PDki();
  let chosen = chooseRandomColor();



  noFill(); // we don't want to fill the main shape
  beginShape();

  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 strokeWeight(11.5);
  stroke(0);
    noFill()
   curveVertex(cx, cy);
  }

 
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();



 ////g1()
 
     strokeWeight(11.5);
  stroke(0);
  

}
function drawPoint(x, y) {
  point(x, y);
}

function drawPointb() {
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 650);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
let colorIndex = Math.floor(map(level, 0, 0.8, 0, colorset.length));
noFill() 
    strokeWeight(lightColor/2);
  for (let i = 0; i < colorset.length; i++) {
 
    stroke(str(random(colorset)))
  strokeWeight(lightColor/10);
  for (let i = 0; i < PD.length; i++) {
    let point = PD[i];
    let x = noise(point.i * 0.03, frameCount * 0.01) * windowWidth;
    let y = noise(point.i * 0.03 + 1000, frameCount * 0.01) * windowHeight;
    drawPoint(x, y);
  }
  // حلقه‌های وسطی
  for (let j = 1; j < 10; j++) {
   // stroke(255)
    //strokeWeight(5);
    for (let i = 0; i < PD.length; i++) {
      let point = PD[i];
      let x = noise(point.i * 0.03 + j * 50, frameCount * 0.01) * windowWidth;
      let y = noise(point.i * 0.03 + j * 500, frameCount * 0.01) * windowHeight;
      drawPoint(x, y);
    }
  }
    
  // حلقه‌های بیرونی
  for (let j = 7; j < 10; j++) {
    stroke(0)
   // stroke(str(random(colorset)))
    //strokeWeight(0,70);
    for (let i = 0; i < PD.length; i++) {
      let point = PD[i];
      let x = noise(point.i * 0.03 + (j - 6) * 100, frameCount * 0.01) * windowWidth;
      let y = noise(point.i * 0.03 + (j - 6) * 1000, frameCount * 0.01) * windowHeight;
    drawPoint(x, y);
    }
  }
  }
  }



function drawPointD() {
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 650);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
let colorIndex = Math.floor(map(level, 0, 0.8, 0, colorset.length));
noFill() 
    strokeWeight(lightColor+colorset.length);
  for (let i = 0; i < colorset.length; i++) {
 
    stroke(255,random(1,112))
  strokeWeight(lightColor/10);
  }


  for (let i = 0; i < PD.length; i++) {
    let point = PD[i];
    let x = noise(point.i * 0.03, frameCount * 0.01) * windowWidth;
    let y = noise(point.i * 0.03 + 1000, frameCount * 0.01) * windowHeight;
    drawPoint(x, y);
  }
  // حلقه‌های وسطی
  for (let j = 1; j < 10; j++) {
  
    //strokeWeight(5);
    for (let i = 0; i < PD.length; i++) {
      let point = PD[i];
      let x = noise(point.i * 0.03 + j * 50, frameCount * 0.01) * windowWidth;
      let y = noise(point.i * 0.03 + j * 500, frameCount * 0.01) * windowHeight;
      drawPoint(x, y);
      fill(255,random(0,255))
      //circle(x, y,326)
    }
  }
    
  // حلقه‌های بیرونی
  for (let j = 7; j < 10; j++) {
   // stroke(0)
   // stroke(str(random(colorset)))
    //strokeWeight(0,70);
    for (let i = 0; i < PD.length; i++) {
      let point = PD[i];
      let x = noise(point.i * 0.03 + (j - 6) * 100, frameCount * 0.01) * windowWidth;
      let y = noise(point.i * 0.03 + (j - 6) * 1000, frameCount * 0.01) * windowHeight;
    drawPoint(x, y);
    }
  }
  
  }
////////////
function drawf() {
 // ////////background(220);
  
  //let w = width / 14;  // Width of each section
  
  // Draw 14 shapes with different proportions
 draw9(); 
   OD()
 hk3()
   hk2()
     SS1()
picasso()
   
  hk2()
OD()
 CIL()
hk2()

 LIK() 
   KIP()
 wrc()            // Custom shape - use 6/14 of section
 // draw5();  
  // Custom shape - use 5/14 of section 
    //WW3(x, y, random(0.01,0.05))
  
 // draw4();               // Custom shape - use 4/14 of section 
 // draw3();               // Custom shape - use 3/14 of section
 // draw2();               // Custom shape - use 2/14 of section
 // draw1();               // Custom shape - use 1/14 of section 
  
 //g1();
}


 ///////////// 
  function draw14(){
 

  let chosen = chooseRandomColor();



  noFill(); // we don't want to fill the main shape
  beginShape();

  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[1]);
    noStroke(palette[1]);
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }
 
  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    stroke(0,0,0,random(1,150))
    rect(cx, cy, width / bins.length/random(1,1.5), h/30);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
    strokeWeight(lightColor/2);
    stroke(chosen.colors[6])
    rect(cx, cy, width / bins.length/random(10,20), h/20);
  }
    noFill()
   curveVertex(cx, cy);
  }

  
  stroke(0, 0, 0, random(200, 240));
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();


  t++;




  
}
function tr() {
//////////////
//o11()
   OD()
 hk3()
   hk2()
     SS1()
picasso()
   hk3()
OD()
 CIL()
 //hk2()

 LIK() 
   KIP()
 wrc()
     
 
hk3()
OD()
 CIL()
 hk2()
 ww5()
 LIK() 
   KIP()
  hk3()
  WW3()
WW2()
WW1()
  o4()
}
//////////
function draw8() {

drawo2()
  strokeWeight(random(0.01,1.6));

  PDki04();
  let chosen = chooseRandomColor();
stroke(chosen.colors[6]);


  noFill(); // we don't want to fill the main shape
  beginShape();

  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[1]);
    noStroke(palette[1]);
   // rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }
 
  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    stroke(0,0,0,random(1,150))
    rect(cx, cy, width / bins.length/random(1,1.5), h/30);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
    strokeWeight(lightColor/2);
    stroke(chosen.colors[6])
    rect(cx, cy, width / bins.length/random(10,20), h/20);
  }
    noFill()
   curveVertex(cx, cy);
  }

  
  stroke(0, 0, 0, random(200, 240));
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();


  t++;




}


function o204() {
  (255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
 beginShape();
for (let i = 2; i < PD2.length - 1; i++) {
const p1 = PD2[i];
const p2 = PD2[i + 1];
const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا

noFill()
   curveVertex(cx, cy);
curveVertex(p1.x, p1.y);
curveVertex(p2.x, p2.y);
}
strokeWeight(0.4)
stroke(chosen.colors[16])

curveVertex(PD2[PD2.length - 1].x, PD2[PD2.length - 1].y);
endShape();

  
  t++;

  }

let parandehs = [];

function o304() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
     
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(PD3[PD3.length - 1].x, PD3[PD3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o404() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PD2.length - 1; i++) {
    const p1 = PD2[i];
    const p2 = PD2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[3]);
    noFill()
    noStroke();
    strokeWeight(lightColor/20)
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill()
   // stroke(palette[colorIndex % palette.length]);
        fill(palette[colorIndex % palette.length]);
    fill(255,random(200,250))
    
//fill(chosen.colors[6]);
    //noStroke(palette[colorIndex % palette.length]);
   // stroke(255,255,255,random(1,5));
  // circle(width/2, height/2, lightColor+bg+palette.length/8);
  }
    
     noFill()
   noFill()
   curveVertex(cx, cy);
  }
             
  stroke(255,255,255,random(100,150))
  curveVertex(PD2[PD2.length - 1].x, PD2[PD2.length - 1].y);
  endShape();

  t++;
  
}
function o504() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
   for (let i = 60; i < PD.length/1; i++) {
    
    
    const p = PD[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
 stroke(0,0,0,random(1,80))
    strokeWeight(22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
  
 
}

function o604() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(0)
  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function o704() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}
function o804() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDe.length - 1; i++) {
    const p1 = PDe[i];
    const p2 = PDe[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(PDe[PDe.length - 1].x, PDe[PDe.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}


function PDki04() {
  wind() 
     let chosen = chooseRandomColor();
  for (let p of PDk) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function wind() {
  const gravity = 0.4; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...PDe]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let PDk04 = [];
function fountainPen() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}



function wr04() {


    var amount = 3;
    var spacing = 20;
    var radius = 130;
  
    for (var i = 0; i < amount; i++) {
        createNumberRing04(radius + spacing * i, 30 + 10 * i, i);
    }

   // drawTitleText();
   // drawSubtitleText();
    // drawWebsite();
}

function createNumberRing04(radius, amount, seed) {
    randomSeed(seed);
    var randomNumbers = [];
    for (var i = 0; i <= amount; i++) {
        randomNumbers.push(parseInt(random(2), 2));
    }
    var spacing = 360 / amount;

    push();
    translate(width / 2, height / 2);
    var rotSpeed = 0.2;
    rotate(frameCount * random(-rotSpeed, rotSpeed));
    
    for (var i = 0; i < amount; i++) {
        push();
        rotate(i * spacing);
        var num04 = new Num04(randomNumbers[i], 0 + radius, 0, 90, random(100, 255));
        num04.render();
        pop();
    }

    pop();
}

function Num04(msg, x, y, rot, clr) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.msg = msg;
    this.color = clr;
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
 
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, colorset.length));
noFill() 
    strokeWeight(lightColor/2);
          //stroke(colorset[colorIndex % palette.length]);
stroke(palette[7])
    //stroke(chosen.colors[6])
  
    this.render = function() {
        push();
    
        translate(this.x, this.y);
        rotate(this.rot);
      
 
       
        pop();
      //noStroke()
       push();
   
      
        translate(this.x, this.y);
        rotate(this.rot);
      
   
      stroke(0)
      strokeWeight(lightColor/10)
      point(this.x, this.y);
      strokeWeight(lightColor/15);
       point(this.x, this.y);
      strokeWeight(lightColor/18);
       point(this.x, this.y);
      strokeWeight(lightColor/22);
       point(this.x, this.y);
       // text(this.msg, 0, 0);
        pop();
      
    }
}
}


////////////
function draw7() {
 drawo2()
  // ////////background(255);
    stroke(0);
 // stroke(palette[2]);
  strokeWeight(random(0.01,1.6));

  PDki();
  let chosen = chooseRandomColor();

 // o2();

  noFill(); // we don't want to fill the main shape
  beginShape();
 // fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 2, t / 50) - 0.5) * p1.size * 4;
    
    
    

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
 // strokeWeight(bg);
  for (let i = 0; i < palette.length; i++) {
  // fill(palette[1]);
    noStroke(palette[1]);
   //rect(i * width / palette.length,  cy, width / palette.length/10, height/20);
    strokeWeight(lightColor);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    //fill(palette[colorIndex % palette.length]);
    noStroke();
    stroke(0,0,0,random(1,150))
    
    //rect(cx, cy, width / bins.length/random(1,1.5), h/10);
    //line(cx, cy, width / bins.length/random(1,1.5), h/10);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
   
    stroke(chosen.colors[6])
    //rect(cx, cy, width / bins.length/random(10,20), h/20);
  }
    
  
    noFill()
   curveVertex(cx, cy);
  }
noFill()
  
  stroke(0, 0, 0, random(200, 240));
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  
  endShape();

  t++;
 //G3() 

  //G3()
 


}


//////////
function draw6() {
 
drawo2()
    
 beginShape();
    
    for (let i = 5; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
              
     
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
 
  for (let i = 0; i < palette.length; i++) {
 
    strokeWeight(lightColor);
  } 
  
  if (i === 5) {
      const r1 = lightColor //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = lightColor  //random(50, 200);
            //strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, lightColor,10 ,PI - QUARTER_PI, -2*TWO_PI);
  }
  
    
      
  
     strokeWeight(lightColor);
     //stroke(0)  
    noFill()
   curveVertex(cx, cy);
  }
  
 
 
    
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();


t++;

    }

///////
function draw5() {
 
drawo2()
    
 beginShape();
    
    for (let i = 5; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
              
     
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
 
  for (let i = 0; i < palette.length; i++) {
 
    strokeWeight(lightColor);
  } 
  
  if (i === 5) {
      const r1 = lightColor //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = lightColor  //random(50, 200);
            //strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, lightColor,10 ,PI - QUARTER_PI, -2*TWO_PI);
  }
  
    
      
   
       
     
 
  
     strokeWeight(lightColor);
     //stroke(0)  
    noFill()
   curveVertex(cx, cy);
  }
  
 
 
    
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();
   PDki();


t++;

 
}
 

/////////
function draw4() {

drawo2()

     noStroke()

    
 beginShape();
    
    for (let i = 5; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
              
     
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
 
  for (let i = 0; i < palette.length; i++) {
 
    strokeWeight(lightColor);
  } 
  
  if (i === 5) {
      const r1 = lightColor //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = lightColor  //random(50, 200);
            //strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, lightColor,10 ,PI - QUARTER_PI, -2*TWO_PI);
  }
  
    
      
     
 
  
     strokeWeight(lightColor/5);
     //stroke(0)  
    noFill()
   curveVertex(cx, cy);
  }
  
 
 
    
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();
   PDki();

t++;

    }

 
function adam() {



     noStroke()

    
 beginShape();
    
    for (let i = 5; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
              
     
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
 
  for (let i = 0; i < palette.length; i++) {
 
  } 
  
 
  
    
      
    
       for (let i = 0; i < lightColor; i++) {
    const colorIndex2 = floor(random(0, colorsX.length));
    Ab4A(cx+level+random(0,width), cy+bg+random(0,height) , 230+level, 200+level, 0+level, 0+level, 45+level, 0.01+level, colorIndex2,random(0.01,2.2));
       
       }
 
  
    
    noFill()
   curveVertex(cx, cy);
  }
  
 
 
    
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();


t++;

    }


////////////////
function draw3() {
drawo2()
     noStroke()

    
 beginShape();
    
    for (let i = 5; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
      
            
    
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);
 
  for (let i = 0; i < palette.length; i++) {
 
  } 
    
  if (i === 5) {
      const r1 = lightColor //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = lightColor  //random(50, 200);
            //strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, lightColor,10 ,PI - QUARTER_PI, -2*TWO_PI);
  }
   stroke(0)
     strokeWeight(lightColor);
     noFill()
   curveVertex(cx, cy); 
    
      
     
 
  
     
    
  }
  
 // strokeWeight(20);
  stroke(0) 
     
 
    noFill()
 
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
 
t++;
noFill()

    }

  ///////////

function o302() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < PD02.length - 1; i++) {
    const p1 = PD02[i];
    const p2 = PD02[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
      
     noFill()
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(PD02[PD02.length - 1].x, PD02[PD02.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}


//////////////////
function draw2() {
 drawo2()
  // ////////background(255);
    stroke(0);
 // stroke(palette[2]);
  strokeWeight(random(0.01,1.6));

  PDki02();
  let chosen = chooseRandomColor();

 

  noFill(); // we don't want to fill the main shape
  beginShape();
 
  fill(255, 204, 10);
  //stroke(111)

  noFill();
  strokeWeight(0.2);
  stroke(chosen.colors[6]);
  curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));

  // keep track of previous point to calculate tangent line
  let prevP = null;

  for (let i = 2; i < PD02.length - 1; i++) {
    const p1 = PD02[i];
    const p2 = PD02[i + 1];
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4;

    // draw tangent line
    if (prevP !== null) {
      const angle = atan2(p1.y - prevP.y, p1.x - prevP.x) - HALF_PI;
      const h = random(1, 42); // height of the tangent line
      const lx1 = prevP.x + sin(angle) * h * 10; // calculate end point 1 of the tangent line
      const ly1 = prevP.y - cos(angle) * h * -10;
      const lx2 = p1.x + sin(angle) * h * 10; // calculate end point 2 of the tangent line
      const ly2 = p1.y - cos(angle) * h * -10;
      stroke(chosen.colors[3]); // set color of tangent line
      strokeWeight(0.2); // set thickness of tangent line
      line(lx1, ly1, lx2, ly2); // draw tangent line
    }
    prevP = p1;

    // draw mouth
    if (i === 2) {
      const radius = generateRandomNumber3() / 2; //random(10, 100);
      const startAngle = PI - QUARTER_PI; // starting angle of the arc
      const endAngle = TWO_PI; // ending angle of the arc
      stroke(chosen.colors[6]); // set color of the arc
      strokeWeight(0.2); // set thickness of the arc
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle); // draw arc
    }
 let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);
 
  for (let i = 0; i < palette.length; i++) {
   fill(palette[1]);
    noStroke(palette[1]);
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
    fill(palette[colorIndex % palette.length]);
    noStroke();
    stroke(0,0,0,random(1,150))
    rect(cx, cy, width / bins.length/random(1,1.5), h/30);
  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill() 
   
    stroke(chosen.colors[6])
    rect(cx, cy, width / bins.length/random(10,20), h/20);
  }
   
  
    noFill()
   curveVertex(cx, cy);
  }
noFill()
  strokeWeight(random(10,25));
  stroke(0, 0, 0, random(200, 240));
  curveVertex(PD02[PD02.length - 1].x, PD02[PD02.length - 1].y);
  
  endShape();

  // draw the eyes with Picasso style
  //fountainPen()

  t++;
 //G3() 
 
  //G3()
 


}

function o202() {
  (255);

        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
 beginShape();
 curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));
for (let i = 2; i < PD2.length - 1; i++) {
const p1 = PD2[i];
const p2 = PD2[i + 1];
const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا

  
  

  //WW4(cx, cy, 0.1)
noFill()
   curveVertex(cx, cy);

 
}

strokeWeight(10.4)
stroke(chosen.colors[16])

  strokeWeight(5)
  noFill()
//curveVertex(PD2[PD2.length - 1].x, PD2[PD2.length - 1].y);
endShape();

  t++;

  
}



function o302() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < PD02.length - 1; i++) {
    const p1 = PD02[i];
    const p2 = PD02[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
      
     noFill()
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(5.2)
  stroke(chosen.colors[6])
  //fill(0,0,0,2)
  curveVertex(PD02[PD02.length - 1].x, PD02[PD02.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o402() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PD2.length - 1; i++) {
    const p1 = PD2[i];
    const p2 = PD2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[3]);
    noFill()
    noStroke();
   
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill()
    fill(palette[colorIndex % palette.length]);
    //noStroke(palette[colorIndex % palette.length]);
   // stroke(255,255,255,random(1,5));
    rect(cx, cy, width / bins.length/10, h/30);
  }
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))
  curveVertex(PD2[PD2.length - 1].x, PD2[PD2.length - 1].y);
  endShape();

  t++;
  
}
function o502() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
   for (let i = 60; i < PD02.length/1; i++) {
    
    
    const p = PD02[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
 stroke(0,0,0,random(1,80))
    strokeWeight(22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
  
 
}

function o602() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
   
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
     
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(0)
  stroke(str(random(colorset)))
  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function o702() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
   
  
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  stroke(str(random(colorset)))
  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}
function o802() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDe.length - 1; i++) {
    const p1 = PDe[i];
    const p2 = PDe[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
      
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
    stroke(str(random(colorset)))
  curveVertex(PDe[PDe.length - 1].x, PDe[PDe.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}


function PDki02() {
  wind() 
     let chosen = chooseRandomColor();
  for (let p of PDk) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function wind() {
  const gravity = 0.4; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...PDe]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let PDk02 = [];
function fountainPen() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatching() {
  
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(0,0,0,12)
fill(0,0,0,12)
  let speed = random(1,4); // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 100; i < PDe.length - 1; i++) {
    const p1 = PDe[i];
    const p2 = PDe[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 1; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed * 2, y + speed * 2);
      
      //noStroke()
      //circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}

function sprayPaint() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(255)
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of spraypaint brush
  const minRadius = 130;
  const sprayDensity = 44;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 8; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
strokeWeight(1)
      stroke(0,0,0,1)  
        point(lerpX + randX, lerpY + randY);
       // stroke(255,255,255,random(0,230)) 
       //arc(lerpX + randX, lerpY + randY, 2,6 ,PI , -2*TWO_PI);

      }
    }
  }
}





////////////////
function draw1() {
 // ////////background(255);
    
  PDki01()

drawo2()

  beginShape();
  

curveVertex(windowWidth/2, windowHeight/random(4,5.1));
 // خط اضافی برای اطمینان از رد شدن حداکثر یک بار
  for (let i = 2; i < PD01.length - 1; i++) {
    const p1 = PD01[i];
    const p2 = PD01[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا
    
     let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
   for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, colorset.length));
noFill()
    strokeWeight(lightColor/4)
   }
      if (i === 5) {
      const r1 = lightColor //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = lightColor  //random(50, 200);
           // strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, lightColor,10 ,PI - QUARTER_PI, -2*TWO_PI);
   //stroke(255, 20, 10);
 } 
   


   for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, colorset.length));
noFill()
    stroke(colorset[colorIndex % colorset.length]);
strokeWeight(lightColor/50)
   
  }
  
    noFill()
   curveVertex(cx, cy);
  }
              //strokeWeight(1.5)
 // stroke(0,0,0,random(0,140));
//fill(255,255,255,random(0,8))
  curveVertex(PD01[PD01.length - 1].x, PD01[PD01.length - 1].y);
  endShape();

 
  t++;
    
    

}
function o201() {
  (255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
  beginShape();
  for (let i = 1; i < PD201.length - 1; i++) {
    const p1 = PD201[i];
    const p2 = PD201[i + 1];
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 250);
  let bg = map(level, 230, 0.8, 5, 255);
    const cx =
      (p1.x + p2.x) / 2 +
      (noise(p1.x / 2, p1.y / 25, t / 50) - 0.5) * p1.size * 2;
    const cy =
      (p1.y + p2.y) / 2 +
      (noise(p1.x / 2, p1.y / 134, t / 50) - 0.5) * p1.size * 4;
  
   for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, colorset.length));
noFill()
    stroke(0);
strokeWeight(lightColor/70)
   
  }
    
   noFill()
   curveVertex(cx, cy);
  }
             // strokeWeight(0.4)
 // stroke(chosen.colors[16])

  curveVertex(PD201[PD201.length - 1].x, PD201[PD201.length - 1].y);
  endShape();


  t++;
}


function o301() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < PD01.length - 1; i++) {
    const p1 = PD01[i];
    const p2 = PD01[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
        let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
   for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, colorset.length));
noFill()
    stroke(0);
strokeWeight(lightColor/4)
   curveVertex(cx+10, cy-10);
  }
   }   

     
  //fill(0,0,0,2)
  curveVertex(PD301[PD301.length - 1].x, PD301[PD301.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}

function o401() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PD201.length - 1; i++) {
    const p1 = PD201[i];
    const p2 = PD201[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
     
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,150))
  curveVertex(PD201[PD201.length - 1].x, PD201[PD201.length - 1].y);
  endShape();

  
  t++;
  
}
function o501() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
   for (let i = 60; i < PD01.length/1; i++) {
    
    
    const p = PD01[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
 stroke(0,0,0,random(1,80))
    strokeWeight(22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < PDg01.length - 1; i++) {
    const p1 = PDg01[i];
    const p2 = PDg01[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(PDg01[PDg01.length - 1].x, PDg01[PDg01.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//
  t++;
}

function o601() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDg01.length - 1; i++) {
    const p1 = PDg01[i];
    const p2 = PDg01[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              
  //stroke(255,255,255,random(1,150))
 stroke(0)
  curveVertex(PDg01[PDg01.length - 1].x, PDg01[PDg01.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//
  t++;
}


function o701() {
  (0);
      let chosen = chooseRandomColor();

 

 
  beginShape();
  
  for (let i = 2; i < PDg01.length - 1; i++) {
    const p1 = PDg01[i];
    const p2 = PDg01[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(10.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  curveVertex(PDg01[PDg01.length - 1].x, PDg01[PDg01.length - 1].y);
  endShape();

  // draw the eyes with Picasso style

  t++;
}
function o801() {
  (0);
      let chosen = chooseRandomColor();

 
  beginShape();
  
  for (let i = 2; i < PDe01.length - 1; i++) {
    const p1 = PDe01[i];
    const p2 = PDe01[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
  

  curveVertex(PDe01[PDe01.length - 1].x, PDe01[PDe01.length - 1].y);
  endShape();

  t++;
}


function PDki01() {
 
     let chosen = chooseRandomColor();
  for (let p of PDk01) {

    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}


let PDk01 = [];
function fountainPen() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}

////////////////
function draw9() {
 
    drawo2()
  beginShape();
 
   
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.2, 5, 40);
  let bg = map(level, 230, 0.8, 5, 255);

  for (let i = 0; i < colorset.length; i++) {

    
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, colorset.length));

  }
    for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, colorset.length));
noFill() 
   
strokeWeight(lightColor);
  }
  

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    
   
    
      if (i === 5) {
      const r1 = 100 //random(10, 100);
   stroke(255, 204, 0);

      //strokeWeight(12)
      ellipse(cx, cy, r1);
    }  else if (i === 6) {
      const r3 = 100  //random(50, 200);
           // strokeWeight(12)
   stroke(255, 10, 0);
      
arc(cx, cy, 100,10 ,PI - QUARTER_PI, -2*TWO_PI);
 } 
  
  
  
 stroke(0,random(0,250));
        

    noFill()
   curveVertex(cx, cy);
  }
  
 
 
  curveVertex(PD[PD.length - 1].x, PD[PD.length - 1].y);
  endShape();

 //g1()

t++;
}


function func() {

  //wind()
  o3()
 o4()
  o5()
 o6()
  o7()
  noStroke()
  hk3()
  //G3()
  //Wq()
  noStroke()
  noFill()
  

  o8()



  noStroke()
   for (let i = 0; i < 10; i++) {
    const colorIndex2 = floor(random(0, colorsX.length));
    Ab4A(random(width+cx), random(height+cy), 230, 200, 0, 0, 45, 0.01, colorIndex2,random(0.01,0.9));
  }

//////
 SS1(cx, cy, 0.20);

  WW1(cx, cy, random(0.5,1))
  WW2(cx, cy, random(0.01,0.8))

  //hk2()
  //ww5()
  picasso(cx, cy, 30, 30, 0.5);
//WW3(cx, cy, random(0.01,0.05))
  wrc(2, 5, 5, 400, random(0.1,4.5), random(width/(1,15)), random(height*(1,2)));
  //WW4(cx, cy, 0.01)

/////


   CIL()

 LIK() 
   
   LIK()
     KIP()
    wr()

  
  
  
  
}

function bild() {
  (0);
  
  // تعیین تعداد طبقات
  let floors = floor(random(2, 21));
  
  // رسم هر طبقه
  for (let i = 0; i < floors; i++) {
    // محاسبه ارتفاع طبقه
    let h = height / floors;
    // محاسبه اندازه پنجره ها 
    let w = width / 10; 
    
    // رسم طبقه
    fill(palette[3]);
    rect(width/2, i*h + h/2, width, h);
    
    // رسم پنجره ها
    for (let j = 0; j < 10; j++) {
      fill(palette[5]);
      rect(j*w + w/2, i*h + h/2, w/2, h/2);
    }
  } 
}
function bild2() {
  (0);
  
  // تعیین تعداد طبقات
  let floors = floor(random(1, 10));
  
  // رسم هر طبقه
  for (let i = 0; i < floors; i++) {
    // محاسبه ارتفاع طبقه
    let h = height / floors;
    // محاسبه اندازه پنجره ها 
    let w = width / 2; 
    
    // رسم طبقه
    //    fill(255,random(100,255));
    //fill(str(random(colorset)))
    fill(palette[3]);
    rect(width/2, i*h + h/100, width, h);
    
    // رسم پنجره ها
    for (let j = 0; j < 5; j++) {
      //fill(str(random(colorset)))
      fill(palette[5]);
      //stroke(str(random(colorset)))
      rect(j*w + w/2, i*h + h/2, w/2, h/2);
    }
  } 
}

function o9() {
 NB()
  beginShape();
 // hk3()

  
  
  for (let i = 0; i < PDk.length - 1; i++) {
    const p1 = PDk[i];
    const p2 = PDk[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    // OD()

  
     //wrc(2, 5, 5, 400, random(0.1,4.5), random(width/(1,150)), random(height*(1,200)));
    
    //WW3(cx, cy, random(0.01,0.09))
     for (let i = 0; i < 10; i++) {
    const colorIndex2 = floor(random(0, colorsX.length));
    Ab4A(random(width+cx), random(height+cy), 230, 200, 0, 0, 45, 0.01, colorIndex2,random(0.01,2));
  }
   
 //SS1()
//picasso()
    //hk3()
    //hk2()
    
    noFill()
   curveVertex(cx, cy);
  }

  curveVertex(PDk[PDk.length - 1].x, PDk[PDk.length - 1].y);
  endShape();
  SS1()
picasso()
   hk3()
OD()
 CIL()
 //hk2()
NB()
 LIK() 
   KIP()
 wrc()
   NB()   
 
hk3()
OD()
 CIL()
 hk2()
 ww5()
 LIK() 
   KIP()
  hk3()
  WW3()
WW2()
WW1()

  //wind()
  hk3()
  
}



function o2() {
  (255);
        let chosen = chooseRandomColor();

  strokeWeight(2); //تغییر زخامت خط
  stroke(0, 0, 255);
  noFill(); // we don't want to fill the main shape
 beginShape();
 curveVertex(windowWidth / 2, windowHeight / random(4, 5.1));
for (let i = 2; i < PD2.length - 1; i++) {
const p1 = PD2[i];
const p2 = PD2[i + 1];
const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size * 2; //افزودن مضرب برای افزایش شدت انحنا
const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size * 4; //افزودن مضرب برای افزایش شدت انحنا

  
  
  noStroke()
  
  //WW4(cx, cy, 0.01)
  noFill()
noFill()
   curveVertex(cx, cy);

 
}

strokeWeight(10.4)
stroke(chosen.colors[16])

  noFill()
//curveVertex(PD2[PD2.length - 1].x, PD2[PD2.length - 1].y);
endShape();
  // draw the eyes with Picasso style

  //wind()

  t++;

  
}

function o3() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
  
  
   for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
     const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  
////fill(chosen.colors[15])
      
     noFill()
   curveVertex(cx+10, cy-10);
  }
       

       strokeWeight(2)
  stroke(str(random(colorset)))
  //fill(0,0,0,2)
  curveVertex(PD3[PD3.length - 1].x, PD3[PD3.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
 noFill()

  t++;
}

function o4() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PD2.length - 1; i++) {
    const p1 = PD2[i];
    const p2 = PD2[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  (bg);

  for (let i = 0; i < palette.length; i++) {
   fill(palette[3]);
    noFill()
    noStroke();
   
    //rect(i * width / palette.length,  cy, width / palette.length, height);
    
  }

  for (let i = 0; i < bins.length; i++) {
    let x = map(i, 0, bins.length, 0, width);
    let h = -height + map(bins[i], 0, 255, height, 0);
    let colorIndex = Math.floor(map(level, 0, 0.8, 0, palette.length));
noFill()
    fill(palette[colorIndex % palette.length]);
    //noStroke(palette[colorIndex % palette.length]);
   // stroke(255,255,255,random(1,5));
    //rect(cx, cy, width / bins.length/10, h);
  }
    noFill()
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.4)
  stroke(255,255,255,random(100,255))
  curveVertex(PD2[PD2.length - 1].x, PD2[PD2.length - 1].y);
  endShape();

  t++;
  
}
function o5() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  
   for (let i = 10; i < PD.length/1; i++) {
    
    
    const p = PD[i];
    const x = noise(p.x * 0.01, p.y * 0.01,0 ) * 500;
    const y = noise(p.x * 0.01, p.y * 0.01, 0 + 2500) * 500;
    p.x = x;
    p.y = y;
    noFill()
 stroke(0,0,0,random(1,255))
    strokeWeight(0.22);
    point(p.x, p.y);
  
  
    noStroke()
   }
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.1)
  //stroke(255,255,255,random(1,150))
 stroke(255,255,255,34)
  //fill(0,0,0,1)

  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
  
 
}

function o6() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
   
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
     
    
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(0)
  stroke(str(random(colorset)))
  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
//wind()
  t++;
}


function o7() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDg.length - 1; i++) {
    const p1 = PDg[i];
    const p2 = PDg[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
   
  
   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
  stroke(str(random(colorset)))
  curveVertex(PDg[PDg.length - 1].x, PDg[PDg.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}
function o8() {
  (0);
      let chosen = chooseRandomColor();

  //strokeWeight(2); //تغییر زخامت خط
  // draw the main curve with random deviations
 

 // stroke(0, 0, 255);
 // noFill(); // we don't want to fill the main shape
  beginShape();
  
  for (let i = 2; i < PDe.length - 1; i++) {
    const p1 = PDe[i];
    const p2 = PDe[i + 1];
      const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size ; //افزودن مضرب برای افزایش شدت انحنا
  

   noFill()
   curveVertex(cx, cy);
  }
              strokeWeight(0.2)
  //stroke(255,255,255,random(1,150))
 stroke(255,random(1,5))
    stroke(str(random(colorset)))
  curveVertex(PDe[PDe.length - 1].x, PDe[PDe.length - 1].y);
  endShape();

  // draw the eyes with Picasso style
wind()
  t++;
}


function PDki() {
  wind() 
     let chosen = chooseRandomColor();
  for (let p of PDk) {
 stroke(0,0,0,random(10,15))
    strokeWeight(random(0.1,0.2))
    const N = (z) => noise(p.x / 539, p.y / 1, z * t * 3 / p.i) - 0.5;
    point(p.x += N(1), p.y += N(2));
  }

  t++;
  if (t > width * 3) {
    //noLoop();
  }
}

function wind() {
  const gravity = 0.4; // additional gravity
  const windSpeed = 55; // increase wind speed
  const windDirection = createVector(1, 0); // set wind direction to the right
  
  for (let p of [...PDe]) {
    const n = noise(p.x / 39, p.y / 39, t * windSpeed);
    const windX = map(n, 0, 1, -1, 1) * windDirection.x; // apply wind direction to x
    const windY = map(n, 0, 1, -1, 1) * windDirection.y; // apply wind direction to y
    p.x += windX;
    p.y += windY;
    p.y += gravity; // apply additional gravity
  }
  t++;
  loop();
}
let PDk = [];
function fountainPen() {
   let chosen = chooseRandomColor();
 stroke(chosen.colors[60])
   //fill(chosen.colors[70])
  strokeWeight(random(1.1,2.9));
  const width = random(1,45);
  const lerps = 16;

  for (let i = 2; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const x = cx - width / 2 + (width / lerps) * j;
      const y = cy - width / 2 + (width / lerps) * j;
      
      line(x, y, x + width / lerps, y + width / lerps);
    }
  }
}


function hatching() {
  
  // set the color and brush style
// stroke(15, 15, 255, 220);
  let chosen = chooseRandomColor();
  strokeWeight(random(1,10));
//fill(15, 15, 255, 220);
  stroke(0,0,0,12)
fill(0,0,0,12)
  let speed = random(1,4); // تغییر انجام شده: سرعت خطوط استراک را تغییر دهید

  for (let i = 100; i < PDe.length - 1; i++) {
    const p1 = PDe[i];
    const p2 = PDe[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 1, p1.y / 1, t / 50) - 0.5) * p1.size;
    for (let j = 0; j < 1; j++) { // تغییر انجام شده: تعداد خطوط استراک را تغییر دهید
      const x = cx - width / 4 + (width / 4) * j;
      const y = cy - width / 4 + (width / 4) * j;
      
      line(x - speed / 2, y - speed / 2, x + speed * 2, y + speed * 2);
      
      //noStroke()
      //circle(x - speed / 2, y - speed / 2,random(5,35))
    }
  }
}

function sprayPaint() {
  // set the color and brush style
   let chosen = chooseRandomColor();
  stroke(255)
  strokeWeight(1);

  const speed = 2;

  // set minimum radius and spray density of spraypaint brush
  const minRadius = 130;
  const sprayDensity = 44;

  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius;
  const rSquared = r * r;

  // set the number of times we lerp the points in the for loop
  const lerps = 2;

  for (let i = 8; i < PD.length - 1; i++) {
    const p1 = PD[i];
    const p2 = PD[i + 1];
    const cx = (p1.x + p2.x) / 2 + (noise(p1.x / 125, p1.y / 25, t / 50) - 0.5) * p1.size;
    const cy = (p1.y + p2.y) / 2 + (noise(p1.x / 34, p1.y / 134, t / 50) - 0.5) * p1.size;
    for (let j = 0; j <= lerps - 1; j++) {
      const lerpX = lerp(p1.x, p2.x, j / lerps);
      const lerpY = lerp(p1.y, p2.y, j / lerps);

      // draw a bunch of random points within a circle
      for (let k = 0; k < sprayDensity; k++) {
        // pick a random position within the circle
        const randX = random(-r, r);
        const randY = random(-1, 1) * sqrt(rSquared - randX * randX);
   //stroke(0,100);
strokeWeight(1)
      stroke(0,0,0,1)  
        point(lerpX + randX, lerpY + randY);
       // stroke(255,255,255,random(0,230)) 
       //arc(lerpX + randX, lerpY + randY, 2,6 ,PI , -2*TWO_PI);

      }
    }
  }
}


function wr() {


    var amount = random(1,4);
    var spacing = random(5,50);
    var radius = random(1,120);
  
    for (var i = 0; i < amount; i++) {
        createNumberRing(radius + spacing * i, 30 + 10 * i, i);
    }

   // drawTitleText();
   // drawSubtitleText();
    // drawWebsite();
}

function createNumberRing(radius, amount, seed) {
    randomSeed(seed);
    var randomNumbers = [];
    for (var i = 0; i <= amount; i++) {
        randomNumbers.push(parseInt(random(2), 2));
    }
    var spacing = 360 / amount;

    push();
    translate(width / 2, height / 2);
    var rotSpeed = 0.02;
    rotate(frameCount * random(-rotSpeed, rotSpeed));
    
    for (var i = 0; i < amount; i++) {
        push();
        rotate(i * spacing);
        var num = new Num(randomNumbers[i], 0 + radius, 0, 90, random(100, 255));
        num.render();
        pop();
    }

    pop();
}

function Num(msg, x, y, rot, clr) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.msg = msg;
    this.color = clr;

    this.render = function() {
        push();
        //fill(0,0,0,random(0,30));
      noStroke()
        translate(this.x, this.y);
        rotate(this.rot);
           fill(palette[7]);

     // rect(this.x+random(1,100), this.y+random(1,100),2,random(1,100))
     // point(this.x, this.y);
       // text(this.msg, 0, 0);
        pop();
      noStroke()
       push();
        fill(255,255,255,random(0,20));
      //fill(palette[3]);
        translate(this.x, this.y);
        rotate(this.rot);
      rect(this.x+random(1,100), this.y+random(1,100),random(1,10),random(1,750))
      //fill(palette[3]);
      stroke(0)
      strokeWeight(5)
       let chosen = chooseRandomColor();
stroke(chosen.colors[16])
      point(this.x+random(1,100), this.y+random(1,100));
           // point(this.x+180, this.y+180);
                 // point(this.x+160, this.y+160);
       stroke(255)
        fill(str(random(colorset)))
      stroke(str(random(colorset)))
      // point(this.x+140, this.y+140);
             point(this.x+random(1,100), this.y+random(1,100));
      
      
                  point(this.x+random(1,100), this.y+random(1,100));
  fill(str(random(colorset)))
      fill(255,255,255,random(0,20));
      
      //fill(palette[3]);
        translate(this.x, this.y);
        rotate(this.rot);
     // rect(this.x, this.y,random(1,220),random(1,350))
      //fill(palette[3]);
      //point(this.x, this.y);
    
          noFill()
      //stroke(0);
stroke(chosen.colors[16])
      //fill(str(random(colorset)))
      stroke(str(random(colorset)))
      strokeWeight(random(0.001,0.2))
     arc(this.x+random(1,100), this.y+random(1,100), 200,100 ,PI - QUARTER_PI, -6*TWO_PI);
      strokeWeight(random(0.01,0.2))
    
 fill(0)


      noStroke()
      fill(0)
        pop();
      
    }
}
////////////parandeh


let canvas2;



let generatedNums = [];
let currentIndex = 0;

function generateNumbers() {
  if (generatedNums.length === 0) {
    // گرفتن اعداد از 1 تا 10 و تقسیم بر 100
    generatedNums = Array.from(Array(10), (_, i) => (i + 1) / 20);
    // تصادفی کردن ترتیب اعداد
    shuffle(generatedNums, true);
  }
  // بازگرداندن عدد جدید و به روز کردن اندیس جاری
  let currentNum = generatedNums[currentIndex];
  currentIndex = (currentIndex + 1) % 10;
  return currentNum;
}


let circlePos;
let circleRadius = 50;
let circleVel;
let circleAcc;


let outputImg;


let galins = [];

let r = 100;






let currentFunction;


function o1lo() {
  rectMode(CENTER);

  
  const functions = [A1,A2,A3,A4,A5,A7,A8,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18,A19,A20,A21,A23,A24,A25,A30,A31,A32,A33,A34,A35,A36,A41,A42,A43,A44,A45,A47,A48,A49,A50,A51,A52,A53,A54,A55];
  const randomIndex = Math.floor(Math.random() * functions.length);
  currentFunction = currentFunction || functions[randomIndex];
  currentFunction();
     g1() 
//QD()
  
   g2()
 
}




function customStroke(x1, y1, x2, y2, noiseParam) {
   let chosen = chooseRandomColor();

const W = 800;
const WHalf = W / 2;
let t = 0;
let P = [];

for (let i = 0; i < W * 3; i++) {
const v = random(0, width*2);
const px = lerp(x1, x2, v / W);
const py = lerp(y1, y2, v / W);
P.push({ x: px, y: py, i: i });
}

for (let p of P) {
 N = z => noise(p.x / 59, p.y / 59, z * t * 3 / p.i) - .5,
    point(p.x += N(1), p.y += N(2))
    t++ > W * 3 
strokeWeight(random(0.01,1))
stroke(0,0,0,120);

let xNoise = N(1) * W * 2000;
let yNoise = N(2) * W * 0.001;

line(p.x + xNoise, 0, p.x + xNoise, W);
  
  
  
//line(0, p.y + yNoise, W, p.y + yNoise);

t++;
}
}



function drawparandeh() {
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
//A2()
  //A1()
 //A3()
   //A4()
//A5()
//A6()
 // A7()
    //A8()
     //A9()
       //A10()
//A11()
//A12()
//A13()
  //A14()
//A15() 
  //A16() 
//A17()
  //A18()
//A19() 
//A20()
 //A21() 
   //A22() 
 //A23()
   //A24() 
   //A25() 
     //A26() 
       //A27() 
//A28()
  //A29()
  //A30()
  //A31()
  //A32()
  //A33()
    //A34()
   //A35()
     //A36()
     //A37()
    // A38()
    //A39()
    //A40()
    //A41()
      //A42()
       //A43()
      //A44()
      //A45()
      //A46()
      //A47()
      //A48()
      //A49()
      //A50()
      //A51()
      //A52()
      //A53()
      //A54()
      //A55()
        A56()
strokeWeight(10)
customStroke(0,0,width,0,1)







}
let circles = [];
let numCircles = 10;
let canvasWidth = 800;
let canvasHeight = 600;
let bgColor = '#333333';
let circleColor = '#FFFFFF';
let circlest = [];

let isGrowing = true; // برای بزرگ شدن یا کوچک شدن دایره
let maxSize = 2.2; // حداکثر اندازه دایره
let minSize = 1.1; // حداقل اندازه دایره
let shapes = [];
let shapeSize = 10;

let x = 0;
let y = 0;
let stepSize = 20;


let scale = 1;


let isNewCircleNeeded = true; // آیا نیاز به دایره جدید هست؟




let boxWidth = 385;
let boxHeight = 385;



// تعریف متغیر برای پرنده جدید
let newParandeh;


let hasCollided = false; // متغیر برای نگهداری وضعیت برخورد پرنده ها با دایره


let maxRotations = 5; // تعداد بیشینه چرخش‌ها






let startX;
let startY;
let endX;
let endY;
let rectWidth;
let rectHeight;
let colorh1;
let colorh2;
let speed;

let scl = 30;
let cols, rows;
let particles = [];
let flowfield;


function A56() {
 let chosen = chooseRandomColor();
  randomColor = chosen.name;
fill(chosen.colors[1]);
  noStroke()

    let yoff = 0;
for (let y = 0; y < rows; y++) {
let xoff = 0;
for (let x = 0; x < cols; x++) {
let index = x + y * cols;
let angle = noise(xoff, yoff, frameCount * 0.01) * TWO_PI * 2;
let v = p5.Vector.fromAngle(angle);
v.setMag(1);
flowfield[index] = v;
xoff += 0.1;
}
yoff += 0.1;
}

for (let i = 0; i < particles.length; i++) {
particles[i].follow(flowfield);
particles[i].update();
particles[i].edges();
particles[i].show();

}
  

   

  

    // نمایش دایره
    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(340.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
  
}

function playRandomSong() {
  let randomIndex = Math.floor(Math.random() * songs.length);
  let song = songs[randomIndex] || MuzSound.song;
  song.play();
}

function A55() {
 let chosen = chooseRandomColor();
  randomColor = chosen.name;

    let yoff = 0;
for (let y = 0; y < rows; y++) {
let xoff = 0;
for (let x = 0; x < cols; x++) {
let index = x + y * cols;
let angle = noise(xoff, yoff, frameCount * 0.01) * TWO_PI * 2;
let v = p5.Vector.fromAngle(angle);
v.setMag(1);
flowfield[index] = v;
xoff += 0.1;
}
yoff += 0.1;
}

for (let i = 0; i < particles.length; i++) {
particles[i].follow(flowfield);
particles[i].update();
particles[i].edges();
particles[i].show();

}
  

   

    noFill();
    beginShape();
   stroke(0, 700);
  stroke(255, 255,255,118);

  // stroke(chosen.colors[16]);
noFill();
beginShape();
    stroke(255, 255,255,118);

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

    // نمایش دایره
    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(340.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
  
}


class Particle {
constructor() {
this.pos = createVector(random(width), random(height));
this.vel = createVector(0, 0);
this.acc = createVector(0, 0);
this.maxspeed = 2;
this.prevPos = this.pos.copy();
this.color = color(0, 0, random(30, 100));
this.brushSize = random(1, 5); // اضافه شده: اندازه براش قلم مو به صورت تصادفی تعیین می شود
}

update() {
this.vel.add(this.acc);
this.vel.limit(this.maxspeed);
this.pos.add(this.vel);
this.acc.mult(0);
}

follow(vectors) {
let x = floor(this.pos.x / scl);
let y = floor(this.pos.y / scl);
let index = x + y * cols;
let force = vectors[index];
this.applyForce(force);
}

applyForce(force) {
this.acc.add(force);
}

show() {
stroke(this.color);
strokeWeight(this.brushSize); // اضافه شده: اندازه براش قلم مو برای نمایش ذره تعیین می شود
line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
strokeWeight(1); // اضافه شده: اندازه براش خط برای نمایش خطوط تعیین می شود
line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
strokeWeight(1);
point(this.pos.x, this.pos.y);
    
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.prevPos.x = this.pos.x;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.prevPos.x = this.pos.x;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.prevPos.y = this.pos.y;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.prevPos.y = this.pos.y;
    }
  }
}
function A54() {
noStroke();
     for (let i = 0; i < threadsw.length; i++) {
    threadsw[i].display();
    threadsw[i].update();
  }
  let chosen = chooseRandomColor();
  randomColor = chosen.name;
  fill(chosen.colors[12]);
  ;

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255, 255, 118);

  noFill();
  beginShape();
    strokeWeight(0.7)

  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  let circleMaxRadius = 50;
  let circleGrowthRate = 1.1;
  let circleShrinkRate = 0.2;
  
  // نمایش دایره
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // افزایش اندازه دایره
      circleRadius *= circleGrowthRate;
      
      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
      
      // بازگشت دایره به اندازه اولیه
      if (circleRadius > circleMaxRadius) {
        circleRadius = circleMaxRadius;
        circleVel.mult(-circleShrinkRate);
      }
    }
  }
  
  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
}
}


function A53() {
 noStroke()
//fill(255, 255, 255, 100)
   for (let i = 0; i < threadsw.length; i++) {
    threadsw[i].display();
    threadsw[i].update();
  }

let chosen = chooseRandomColor();
randomColor = chosen.name;
fill(255);
//
  noFill();
beginShape();
stroke(0, 700);
stroke(255, 255,255,118);

// stroke(chosen.colors[16]);
noFill();
beginShape();
    strokeWeight(0.7)

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();
  // نمایش دایره
fill(1);
noStroke()
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);
  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
        // تغییر جهت حرکت پرنده
        parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

        // حرکت دایره
        circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
        circleAcc.setMag(10.5);
        circleVel.add(circleAcc);
        circleVel.limit(2);
        circlePos.add(circleVel);
        
        // سقوط پرنده به کف صفحه
        parandehs[i].vel.y = random(0.5, 20);
    }
}
// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
    
    // سقوط پرنده به کف صفحه
    if (parandehs[i].pos.y >= windowHeight) {
        parandehs[i].pos.y = windowHeight;
        parandehs[i].vel.y = 0;
    }
}
}
 


function A52() {
   let chosen = chooseRandomColor();
  for (let i = 0; i < threadsw.length; i++) {
    threadsw[i].display();
    threadsw[i].update();
  }
fill(chosen.colors[2]);
  // نمایش مربع و دایره
  //;
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  // بررسی برخورد هر پرنده با دایره
  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);

      // ایجاد پرنده جدید
      if (!newParandeh) {
        // محل قرار گیری پرنده جدید برابر با مکان پرنده ای است که برخورد کرده
        let newX = parandehs[i].pos.x;
        let newY = parandehs[i].pos.y;
        newParandeh = new Parandeh(newX, newY);
      }
    }
    // حرکت پرنده های قبلی
    else {
      parandehs[i].updates();
      parandehs[i].displays();
    }
  }

  // نمایش پرنده جدید و حرکت دایره
  if (newParandeh) {
    newParandeh.updates();
    newParandeh.displays();
    circleAcc = p5.Vector.sub(newParandeh.pos, circlePos);
    circleAcc.setMag(340.5);
    circleVel.add(circleAcc);
    circleVel.limit(2);
    circlePos.add(circleVel);
    let distance = dist(newParandeh.pos.x, newParandeh.pos.y, circlePos.x, circlePos.y);
    if (distance >= circleRadius) {
      // پرنده جدید دور دایره بچرخد
      let angle = atan2(newParandeh.pos.y - circlePos.y, newParandeh.pos.x - circlePos.x);
      let newX = circlePos.x + circleRadius * cos(angle);
      let newY = circlePos.y + circleRadius * sin(angle);
      newParandeh.pos.x = newX;
      newParandeh.pos.y = newY;
      // [fix] نشت حافظه: هر برخورد یک پرندهٔ تازه می‌افزود و آرایه بی‌پایان بزرگ می‌شد (و هر فریم کندتر)؛ سقف ۸۰
      if (parandehs.length < 80) parandehs.push(newParandeh);
      newParandeh = null;
    }
  }
}

class Threadd {
  constructor(_x) {
    this.x = _x;
    this.y = 0;
    this.dir = random( 5 * PI);
    this.speed = random(10, 55);
    this.threadLength = generateNumbers();
  }

  display() {
    stroke(0);
    for (let i = 0; i < this.threadLength; i++) {
      point(this.x, this.y + i);
     // line(random(1,1200),random(1,250),this.x, this.y + i);
    }
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = -this.threadLength;
      this.dir = random(0, 12 * PI);
      this.speed = random(1, 25);
      this.threadLength = generateNumbers();
    }
    this.x += sin(this.dir);
    if (this.x < 10 || this.x > width) {
      this.dir += PI;
    }
  }
}

function A51() {
noStroke();

let chosen = chooseRandomColor();
  
randomColor = chosen.name;
  
  let numLines = 40;
  let lineSpacing = height / (numLines + 1);

  for (let i = 0; i < numLines; i++) {
    let y = lineSpacing * (i + 1);

    let startX = 0;
    let endX = width * 0.75;

    let startNoise = noise(t, y * 0.01);
    let endNoise = noise(t + 100, y * 0.01);

    let curveStartX = lerp(startX, endX, startNoise);
    let curveEndX = lerp(startX, endX, endNoise);

    let curveStartY = y + lineSpacing * 0.2 * noise(t * 12, y * 0.02);
    let curveEndY = y + lineSpacing * 0.2 * noise(t * 2 + 100, y * 0.02);

    let curveControlX1 = curveStartX + lineSpacing * 0.5 * noise(t * 3, y * 0.03);
    let curveControlX2 = curveEndX + lineSpacing * 0.5 * noise(t * 3 + 1000, y * 0.03);

    let curveControlY1 = y + lineSpacing * 1.1 * noise(t * 4, y * 0.04);
    let curveControlY2 = y + lineSpacing * 0.1 * noise(t * 4 + 1000, y * 0.04);

    bezier(
      curveStartX, curveStartY,
      curveControlX1, curveControlY1,
      curveControlX2, curveControlY2,
      curveEndX, curveEndY
    );

    for (let j = 0; j < 10; j++) {
      let startX = curveStartX + lineSpacing * 0.1 * j;
      let startY = curveStartY + lineSpacing * 0.1 * j;
      let endX = curveEndX + lineSpacing * 0.1 * j;
      let endY = curveEndY + lineSpacing * 0.1 * j;
//stroke(chosen.colors[12]);

      if (j % 2 == 0) {
        line(startX, startY, endX, endY);
      }
    }
  }

  t += 0.02;
fill(chosen.colors[12]);
;

noFill();
beginShape();
stroke(0, 700);
stroke(255, 255, 255, 118);
noFill();
beginShape();
    strokeWeight(2.7)

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

// نمایش دایره
fill(1);
noStroke();
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

for (let i = 0; i < parandehs.length; i++) {
let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
if (distance < circleRadius) {
// تغییر جهت حرکت پرنده
parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
    // حرکت دایره
  circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
  circleAcc.setMag(340.5);
  circleVel.add(circleAcc);
  circleVel.limit(2);
  circlePos.add(circleVel);

  // سقوط دایره به کف صفحه
  if (circlePos.y + circleRadius >= height) {
    circleVel.y = 0;
  }
}
}

// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
}


function A50() {
  
   let chosen = chooseRandomColor();
  //background(255)
    fill(0);

  let numLines = 40;
  let lineSpacing = height / (numLines + 1);

  for (let i = 0; i < numLines; i++) {
    let y = lineSpacing * (i + 1);

    let startX = 0;
    let endX = width * 1.25;

    let startNoise = noise(t, y * 0.01);
    let endNoise = noise(t + 100, y * 0.01);

    let curveStartX = lerp(startX, endX, startNoise);
    let curveEndX = lerp(startX, endX, endNoise);

    let curveStartY = y + lineSpacing * 0.2 * noise(t * 12, y * 0.02);
    let curveEndY = y + lineSpacing * 0.2 * noise(t * 2 + 10, y * 0.02);

    let curveControlX1 = curveStartX + lineSpacing * 10.5 * noise(t * 3, y * 0.03);
    let curveControlX2 = curveEndX + lineSpacing * 10.5 * noise(t * 3 + 1000, y * 0.03);

    let curveControlY1 = y + lineSpacing * 1.1 * noise(t * 4, y * 0.04);
    let curveControlY2 = y + lineSpacing * 0.1 * noise(t * 4 + 1000, y * 0.04);

    bezier(
      curveStartX, curveStartY,
      curveControlX1, curveControlY1,
      curveControlX2, curveControlY2,
      curveEndX, curveEndY
    );

    for (let j = 0; j < 10; j++) {
      let startX = curveStartX + lineSpacing * 10.1 * j;
      let startY = curveStartY + lineSpacing * 10.1 * j;
      let endX = curveEndX + lineSpacing * 10.1 * j;
      let endY = curveEndY + lineSpacing * 10.1 * j;
//stroke(chosen.colors[12]);

      if (j % 2 == 0) {
        line(startX, startY, endX, endY);
      }
    }
  }

  t += 0.02;

noStroke()
randomColor = chosen.name;
fill(chosen.colors[2]);

    //
  fill(1);
  noStroke();
  circle(circlePos.x, circlePos.y, 60);
  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < 130) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
      // حرکت دایره
      let circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      if (circlePos.x < windowWidth / 2 - 192.5 || circlePos.x > windowWidth / 2 + 192.5 || circlePos.y < windowHeight / 2 - 192.5 || circlePos.y > windowHeight / 2 + 192.5) {
        circleAcc.mult(-1);
      }
      circleAcc.setMag(33);
      circleVel.add(circleAcc);
      circleVel.limit(5);
      circlePos.add(circleVel);
    }
    // نمایش پرنده ها
    parandehs[i].updates();
    parandehs[i].displays();
  }
}
 


function A49() {
  noStroke()
    //fill(255, 255, 255, 100)
    
   let chosen = chooseRandomColor();
  
   fill(0);

  let numLines = 30;
  let lineSpacing = height / (numLines + 1);

  for (let i = 0; i < numLines; i++) {
    let y = lineSpacing * (i + 1);

    let startX = 0;
    let endX = width * 0.75;

    let startNoise = noise(t, y * 0.01);
    let endNoise = noise(t + 100, y * 0.01);

    let curveStartX = lerp(startX, endX, startNoise);
    let curveEndX = lerp(startX, endX, endNoise);

    let curveStartY = y + lineSpacing * 0.2 * noise(t * 12, y * 0.02);
    let curveEndY = y + lineSpacing * 0.2 * noise(t * 2 + 1000, y * 0.02);

    let curveControlX1 = curveStartX + lineSpacing * 10.5 * noise(t * 3, y * 0.03);
    let curveControlX2 = curveEndX + lineSpacing * 10.5 * noise(t * 3 + 1000, y * 0.03);

    let curveControlY1 = y + lineSpacing * 1.1 * noise(t * 4, y * 0.04);
    let curveControlY2 = y + lineSpacing * 0.1 * noise(t * 4 + 1000, y * 0.04);

    bezier(
      curveStartX, curveStartY,
      curveControlX1, curveControlY1,
      curveControlX2, curveControlY2,
      curveEndX, curveEndY
    );

    for (let j = 0; j < 10; j++) {
      let startX = curveStartX + lineSpacing * 10.1 * j;
      let startY = curveStartY + lineSpacing * 10.1 * j;
      let endX = curveEndX + lineSpacing * 10.1 * j;
      let endY = curveEndY + lineSpacing * 10.1 * j;
//stroke(chosen.colors[12]);

      if (j % 2 == 0) {
        line(startX, startY, endX, endY);
      }
    }
  }

  t += 0.02;

noStroke()
  randomColor = chosen.name;
fill(chosen.colors[12]);
  
  
  //

   

 

    // نمایش دایره
    fill(1);
  noStroke()
  
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(340.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
 
}



function A48() {
  noStroke()
    //fill(255, 255, 255, 100)
    
   let chosen = chooseRandomColor();
  
   fill(0);

  let numLines = 60;
  let lineSpacing = height / (numLines + 1);

  for (let i = 0; i < numLines; i++) {
    let y = lineSpacing * (i + 1);

    let startX = 0;
    let endX = width * 0.75;

    let startNoise = noise(t, y * 10.01);
    let endNoise = noise(t + 100, y * 0.01);

    let curveStartX = lerp(startX, endX, startNoise);
    let curveEndX = lerp(startX, endX, endNoise);

    let curveStartY = y + lineSpacing * 0.2 * noise(t * 2, y * 0.02);
    let curveEndY = y + lineSpacing * 0.2 * noise(t * 2 + 100, y * 0.02);

    let curveControlX1 = curveStartX + lineSpacing * 0.5 * noise(t * 3, y * 0.03);
    let curveControlX2 = curveEndX + lineSpacing * 0.5 * noise(t * 3 + 100, y * 0.03);

    let curveControlY1 = y + lineSpacing * 0.1 * noise(t * 4, y * 0.04);
    let curveControlY2 = y + lineSpacing * 0.1 * noise(t * 4 + 100, y * 0.04);

    bezier(
      curveStartX, curveStartY,
      curveControlX1, curveControlY1,
      curveControlX2, curveControlY2,
      curveEndX, curveEndY
    );

    for (let j = 0; j < 10; j++) {
      let startX = curveStartX + lineSpacing * 0.1 * j;
      let startY = curveStartY + lineSpacing * 0.1 * j;
      let endX = curveEndX + lineSpacing * 0.1 * j;
      let endY = curveEndY + lineSpacing * 0.1 * j;
//stroke(chosen.colors[12]);

      if (j % 2 == 0) {
        line(startX, startY, endX, endY);
      }
    }
  }

  t += 0.02;

noStroke()
  randomColor = chosen.name;
fill(chosen.colors[12]);
  
  
  //

   

 

    // نمایش دایره
    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(340.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
 
}


function A47() {
  noStroke()
    //fill(255, 255, 255, 100)
    
   let chosen = chooseRandomColor();
  
   fill(0);

  let numLines = 100;
  let lineSpacing = height / (numLines + 1);

  for (let i = 0; i < numLines; i++) {
    let y = lineSpacing * (i + 1);

    let startX = -100;
    let endX = width * 2.75;

    let startNoise = noise(t, y * 10.01);
    let endNoise = noise(t + 100, y * 0.01);

    let curveStartX = lerp(startX, endX, startNoise);
    let curveEndX = lerp(startX, endX, endNoise);

    let curveStartY = y + lineSpacing * 0.2 * noise(t * 2, y * 0.02);
    let curveEndY = y + lineSpacing * 0.2 * noise(t * 2 + 100, y * 0.02);

    let curveControlX1 = curveStartX + lineSpacing * 0.5 * noise(t * 3, y * 0.03);
    let curveControlX2 = curveEndX + lineSpacing * 0.5 * noise(t * 3 + 100, y * 0.03);

    let curveControlY1 = y + lineSpacing * 0.1 * noise(t * 4, y * 0.04);
    let curveControlY2 = y + lineSpacing * 0.1 * noise(t * 4 + 100, y * 0.04);

    bezier(
      curveStartX, curveStartY,
      curveControlX1, curveControlY1,
      curveControlX2, curveControlY2,
      curveEndX, curveEndY
    );

    for (let j = 0; j < 10; j++) {
      let startX = curveStartX + lineSpacing * 0.1 * j;
      let startY = curveStartY + lineSpacing * 0.1 * j;
      let endX = curveEndX + lineSpacing * 0.1 * j;
      let endY = curveEndY + lineSpacing * 0.1 * j;
stroke(chosen.colors[12]);

      if (j % 2 == 0) {
        line(startX, startY, endX, endY);
      }
    }
  }

  t += 0.02;

noStroke()
  randomColor = chosen.name;
fill(chosen.colors[12]);
  
  
  //

   

 

    // نمایش دایره
    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(340.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
 
}


function A46() {
  noStroke()
    //fill(255, 255, 255, 100)
    
   let chosen = chooseRandomColor();
  
   fill(0);

  let numLines = 50;
  let lineSpacing = height / (numLines + 1);

  for (let i = 0; i < numLines; i++) {
    let y = lineSpacing * (i + 1);

    let startX = -100;
    let endX = width * 0.75;

    let startNoise = noise(t, y * 10.01);
    let endNoise = noise(t + 100, y * 0.01);

    let curveStartX = lerp(startX, endX, startNoise);
    let curveEndX = lerp(startX, endX, endNoise);

    let curveStartY = y + lineSpacing * 0.2 * noise(t * 2, y * 0.02);
    let curveEndY = y + lineSpacing * 0.2 * noise(t * 2 + 100, y * 0.02);

    let curveControlX1 = curveStartX + lineSpacing * 0.5 * noise(t * 3, y * 0.03);
    let curveControlX2 = curveEndX + lineSpacing * 0.5 * noise(t * 3 + 100, y * 0.03);

    let curveControlY1 = y + lineSpacing * 0.1 * noise(t * 4, y * 0.04);
    let curveControlY2 = y + lineSpacing * 0.1 * noise(t * 4 + 100, y * 0.04);

    bezier(
      curveStartX, curveStartY,
      curveControlX1, curveControlY1,
      curveControlX2, curveControlY2,
      curveEndX, curveEndY
    );

    for (let j = 0; j < 10; j++) {
      let startX = curveStartX + lineSpacing * 0.1 * j;
      let startY = curveStartY + lineSpacing * 0.1 * j;
      let endX = curveEndX + lineSpacing * 0.1 * j;
      let endY = curveEndY + lineSpacing * 0.1 * j;
stroke(0);

      if (j % 2 == 0) {
        line(startX, startY, endX, endY);
      }
    }
  }

  t += 0.02;

noStroke()
  randomColor = chosen.name;
fill(chosen.colors[12]);
  
  
   for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      let x = i + random(-15, 15);
      let y = j + random(-15, 15);
      let size = random(5, 15);
      let curve = random(TWO_PI);
      let vertex1 = createVector(size * cos(curve), size * sin(curve));
      let vertex2 = createVector(size * cos(curve + PI), size * sin(curve + PI));
      let vertex3 = createVector(size * cos(curve + HALF_PI), size * sin(curve + HALF_PI));
      let vertex4 = createVector(size * cos(curve + PI + HALF_PI), size * sin(curve + PI + HALF_PI));
      beginShape();
      vertex(x + vertex1.x, y + vertex1.y);
      bezierVertex(x + vertex3.x, y + vertex3.y, x + vertex4.x, y + vertex4.y, x + vertex2.x, y + vertex2.y);
      endShape(CLOSE);
    }
  }
  
  //

   

    noFill();
    beginShape();
   stroke(0, 700);
  stroke(255, 255,255,118);

  // stroke(chosen.colors[16]);
noFill();
beginShape();
vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

    // نمایش دایره
    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(340.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
 
}



function A45() {
noStroke();
  for (let i = 0; i < numThreads; i++) {
threads[i].display(); // نمایش نخ‌ها
}
  let chosen = chooseRandomColor();
  randomColor = chosen.name;
  fill(chosen.colors[12]);
  ;

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255, 255, 118);
  // stroke(chosen.colors[16]);
  noFill();
  beginShape();
    strokeWeight(0.7)

  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  // نمایش دایره
  let maxCircleRadius = 130;
  let minCircleRadius = 100;
  let circleGrowSpeed = 0.1;
  let circleShrinkSpeed = 0.2;

  if (circleRadius >= maxCircleRadius) {
    circleRadius = minCircleRadius;
  } else {
    circleRadius += circleGrowSpeed;
  }

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
      circleRadius += circleGrowSpeed;
    } else if (circleRadius > minCircleRadius) {
      circleRadius -= circleShrinkSpeed;
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
}

}

class Thread {
constructor(x) {
this.x = x; // موقعیت افقی نخ
this.top = random(height / 3); // موقعیت عمودی بالایی نخ
this.bottom = random(height / 3, 2 * height / 3); // موقعیت عمودی پایینی نخ
this.angle = random(TWO_PI*3); // زاویه پاره شدن نخ
}

display() {
let chosen = chooseRandomColor();
  randomColor = chosen.name;
  fill(chosen.colors[12]);beginShape(); // شروع بافتن نخ
vertex(this.x, 0);
for (let y = this.top; y <= this.bottom; y++) {
let xOffset = map(y, this.top, this.bottom, random(-20,-6), random(2,60)); // تغییرات افقی نخ برای ایجاد اثر پرتاب شده بودن
let x = this.x + xOffset + sin(y * 0.1 + this.angle) * random(2,100); // محاسبه موقعیت افقی نخ
vertex(x, y);
}
vertex(this.x, height);
endShape(CLOSE); // پایان بافتن نخ
}

}



function A44() {
    let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  

fill(1);
noStroke()
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

let collidedParandehs = [];
for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
        collidedParandehs.push(parandehs[i]);
    }
}

if (collidedParandehs.length > 0) {
    collidedParandehs.sort(function (a, b) {
        let distA = dist(a.pos.x, a.pos.y, circlePos.x, circlePos.y);
        let distB = dist(b.pos.x, b.pos.y, circlePos.x, circlePos.y);
        return distA - distB;
    });

    collidedParandehs[0].vel.rotate(random(-PI / 8, PI / 4));
    let nearestRadius = dist(collidedParandehs[0].pos.x, collidedParandehs[0].pos.y, circlePos.x, circlePos.y);

    for (let i = 0; i < collidedParandehs.length; i++) {
        let radius = dist(collidedParandehs[i].pos.x, collidedParandehs[i].pos.y, circlePos.x, circlePos.y);
        let size = 2 * (circleRadius - radius);
        collidedParandehs[i].pos.add(p5.Vector.mult(collidedParandehs[i].vel, -1));
        collidedParandehs[i].displays(size);
    }

    // حرکت دایره
    circleAcc = p5.Vector.sub(collidedParandehs[0].pos, circlePos);
    circleAcc.setMag(340.5);
    circleVel.add(circleAcc);
    circleVel.limit(2);
    circlePos.add(circleVel);
  
} else {
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }

}
}

function A43() {
    let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  

  fill(1);
  noStroke()
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      let angle = atan2(parandehs[i].pos.y - circlePos.y, parandehs[i].pos.x - circlePos.x);
      parandehs[i].vel = p5.Vector.fromAngle(angle + PI/2);

      // حرکت دایره
      
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
}

function A42() {
  let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
    
    fill(1);
    noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    // تعیین پرنده نزدیک ترین به دایره
    let closestParandehIndex = -1;
    let closestDistance = Infinity;
    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius && distance < closestDistance) {
            closestParandehIndex = i;
            closestDistance = distance;
        }
    }

    if (closestParandehIndex >= 0) {
        // تغییر جهت حرکت پرنده نزدیک ترین به دایره
        parandehs[closestParandehIndex].vel.rotate(random(-PI / 8, PI / 4));

        // حرکت دایره
        circleAcc = p5.Vector.sub(parandehs[closestParandehIndex].pos, circlePos);
        circleAcc.setMag(50.5);
        circleVel.add(circleAcc);
        circleVel.limit(2);
        circlePos.add(circleVel);
    }

    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        if (i !== closestParandehIndex) {
            // حرکت پرنده هایی که نزدیک دایره نیستند
            parandehs[i].updates();
        }
        parandehs[i].displays();
    }
}


function A41() {
      let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  
  ;

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(
      parandehs[i].pos.x,
      parandehs[i].pos.y,
      circlePos.x,
      circlePos.y
    );
    if (distance < circleRadius) {
      if (!hasCollided) {
        // تغییر جهت چرخش دایره به جهت پرنده ای که اولین بار با دایره برخورد می کند.
        let angle = p5.Vector.sub(parandehs[i].pos, circlePos).heading();
        circleVel.rotate(angle - circleVel.heading());

        hasCollided = true; // تغییر وضعیت برخورد
      }

      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      let circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);

      // محدود کردن حرکت دایره به مربع بیرونی
      circlePos.x = constrain(circlePos.x, 70, width - 385);
      circlePos.y = constrain(circlePos.y, 70, height - 385);
    } else {
      hasCollided = false; // با تغییر پرنده، وضعیت برخورد را صفر کن
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
}


function A40() {
    let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
;
fill(1);
noStroke();
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

// ایجاد پرنده جدید
let newParandeh = new Parandeh(random(width), random(height), random(-3, 3), random(-3, 3));
parandehs.push(newParandeh);

let closestDistance = circleRadius;
let closestParandehIndex = -1;

for (let i = 0; i < parandehs.length; i++) {
let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
if (distance < closestDistance) {
closestDistance = distance;
closestParandehIndex = i;
}
}

if (closestParandehIndex !== -1) {
let closestParandeh = parandehs[closestParandehIndex];
// تغییر جهت حرکت پرنده
closestParandeh.vel.rotate(random(-PI / 8, PI / 4));

// حرکت دایره
let circleAcc = p5.Vector.sub(closestParandeh.pos, circlePos);
circleAcc.setMag(10.5);
circleVel.add(circleAcc);
circleVel.limit(2);
circlePos.add(circleVel);
}

// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
}
  
function A39() {
   let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  // نمایش مربع و دایره
  
  
  ;
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  // بررسی برخورد هر پرنده با دایره
  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 4, PI / 4));

      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(5.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);

      // ایجاد پرنده جدید
      if (!newParandeh) {
        // محل قرار گیری پرنده جدید برابر با مکان پرنده ای است که برخورد کرده
        let newX = parandehs[i].pos.x;
        let newY = parandehs[i].pos.y;
        newParandeh = new Parandeh(newX, newY);
      }
    }
    // حرکت پرنده های قبلی
    else {
      parandehs[i].updates();
      parandehs[i].displays();
    }
  }

  // نمایش پرنده جدید و حرکت دایره
  if (newParandeh) {
    newParandeh.updates();
    newParandeh.displays();
    circleAcc = p5.Vector.sub(newParandeh.pos, circlePos);
    circleAcc.setMag(5.5);
    circleVel.add(circleAcc);
    circleVel.limit(5);
    circlePos.add(circleVel);
    let distance = dist(newParandeh.pos.x, newParandeh.pos.y, circlePos.x, circlePos.y);
    if (distance >= circleRadius) {
      // پرنده جدید دور دایره بچرخد
      let angle = atan2(newParandeh.pos.y - circlePos.y, newParandeh.pos.x - circlePos.x);
      let newX = circlePos.x + circleRadius * cos(angle);
      let newY = circlePos.y + circleRadius * sin(angle);
      newParandeh.pos.x = newX;
      newParandeh.pos.y = newY;
      // [fix] نشت حافظه: هر برخورد یک پرندهٔ تازه می‌افزود و آرایه بی‌پایان بزرگ می‌شد (و هر فریم کندتر)؛ سقف ۸۰
      if (parandehs.length < 80) parandehs.push(newParandeh);
      newParandeh = null;
    }
  }
}



function A38() {
   let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  // نمایش مربع و دایره
  //;
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  // بررسی برخورد هر پرنده با دایره
  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);

      // ایجاد پرنده جدید
      if (!newParandeh) {
        // محل قرار گیری پرنده جدید برابر با مکان پرنده ای است که برخورد کرده
        let newX = parandehs[i].pos.x;
        let newY = parandehs[i].pos.y;
        newParandeh = new Parandeh(newX, newY);
      }
    }
    // حرکت پرنده های قبلی
    else {
      parandehs[i].updates();
      parandehs[i].displays();
    }
  }

  // نمایش پرنده جدید و حرکت دایره
  if (newParandeh) {
    newParandeh.updates();
    newParandeh.displays();
    circleAcc = p5.Vector.sub(newParandeh.pos, circlePos);
    circleAcc.setMag(340.5);
    circleVel.add(circleAcc);
    circleVel.limit(2);
    circlePos.add(circleVel);
    let distance = dist(newParandeh.pos.x, newParandeh.pos.y, circlePos.x, circlePos.y);
    if (distance >= circleRadius) {
      // پرنده جدید دور دایره بچرخد
      let angle = atan2(newParandeh.pos.y - circlePos.y, newParandeh.pos.x - circlePos.x);
      let newX = circlePos.x + circleRadius * cos(angle);
      let newY = circlePos.y + circleRadius * sin(angle);
      newParandeh.pos.x = newX;
      newParandeh.pos.y = newY;
      // [fix] نشت حافظه: هر برخورد یک پرندهٔ تازه می‌افزود و آرایه بی‌پایان بزرگ می‌شد (و هر فریم کندتر)؛ سقف ۸۰
      if (parandehs.length < 80) parandehs.push(newParandeh);
      newParandeh = null;
    }
  }
}


function A37() {
   let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  ;
   
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);
  
  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
      
      // پرنده داخل دایره بچرخد
      let angle = p5.Vector.sub(parandehs[i].pos, circlePos).heading();
      angle += parandehs[i].vel.heading() - PI / 2;
      let r = circleRadius - parandehs[i].size / 2;
      let x = circlePos.x + r * cos(angle);
      let y = circlePos.y + r * sin(angle);
      parandehs[i].pos = createVector(x, y);
      
      // حرکت دایره و دنبال کردن پرنده‌های دیگر
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
    }
    else {
      // پرنده خارج از دایره بچرخد
      parandehs[i].pos.add(parandehs[i].vel);
      // اگر پرنده از مربع خارج شد، از چهت مخالف وارد کادر شود
      if (parandehs[i].pos.x < 0 || parandehs[i].pos.x > windowWidth ||
          parandehs[i].pos.y < 0 || parandehs[i].pos.y > windowHeight) {
        parandehs[i].vel.mult(-1);
      }
    }
    // نمایش پرنده ها
    parandehs[i].updates();
    parandehs[i].displays();
  }
}


function A36() {
   let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  ;

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    // بررسی برخورد با دایره
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
    } else {
      // برخورد با مربع
      if (parandehs[i].pos.x > windowWidth - parandehs[i].r) {
        parandehs[i].vel.x *= -1;
        parandehs[i].pos.x = windowWidth - parandehs[i].r;
      }
      if (parandehs[i].pos.x < parandehs[i].r) {
        parandehs[i].vel.x *= -1;
        parandehs[i].pos.x = parandehs[i].r;
      }
      if (parandehs[i].pos.y > windowHeight - parandehs[i].r) {
        parandehs[i].vel.y *= -1;
        parandehs[i].pos.y = windowHeight - parandehs[i].r;
      }
      if (parandehs[i].pos.y < parandehs[i].r) {
        parandehs[i].vel.y *= -1;
        parandehs[i].pos.y = parandehs[i].r;
      }
    }
  }
  
  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
}



const A35rgb = {}; // [fix] حافظهٔ رنگ‌های تجزیه‌شدهٔ A35
function A35() {
  ////background(255);
  
   let gridSize = 10; // adjust grid size to fit your preference
  let circleSize = gridSize * 0.7; // adjust circle size to fit your preference
  let colorOptions = ["#817c77",
       
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
        "#ca2847"]; // add or remove color options as desired
  
  for (let x = gridSize/2; x < width; x += gridSize) {
    for (let y = gridSize/2; y < height; y += gridSize) {
      // [fix] سرعت: رنگ‌های هگز یک بار تجزیه و نگه داشته می‌شوند (پیش‌تر ۳۶۰۰ بار در هر فریم color() و red/green/blue)؛
      // همان random()ها به همان ترتیب صدا زده می‌شوند، پس نتیجه یکسان است
      let colorChoice = random(colorOptions);
      let rgb = A35rgb[colorChoice] || (A35rgb[colorChoice] = (function (c) { return [red(c), green(c), blue(c)]; })(color(colorChoice)));
      let opacity = random(50, 255);
      fill(rgb[0], rgb[1], rgb[2], opacity);
      ellipse(x, y, circleSize, circleSize);
      //noLoop();
    }
  }
  let chosen = chooseRandomColor();
  

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(
      parandehs[i].pos.x,
      parandehs[i].pos.y,
      circlePos.x,
      circlePos.y
    );
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      let distanceToCenter = circlePos.dist(parandehs[i].pos);
      let moveDistance = circleRadius - distanceToCenter;
      let moveVector = p5.Vector.sub(circlePos, parandehs[i].pos);
      moveVector.setMag(moveDistance);
      parandehs[i].pos.add(moveVector);

      // نمایش پرنده ها
      parandehs[i].updates();
      parandehs[i].displays();
    } else if (
      // اگر پرنده از مربع خارج شده باشد و از دایره نیز خارج نشود
      parandehs[i].pos.x < windowWidth / 2 - boxWidth * 2 ||
      parandehs[i].pos.x > windowWidth / 2 + boxWidth * 2 ||
      parandehs[i].pos.y < windowHeight / 2 - boxHeight * 2 ||
      parandehs[i].pos.y > windowHeight / 2 + boxHeight * 2 &&
      // برخورد با دایره را بررسی کنید
      dist(
        parandehs[i].pos.x,
        parandehs[i].pos.y,
        circlePos.x,
        circlePos.y
      ) > circleRadius
    ) {
      // اگر پرنده از مربع خارج شده باشد، جای جدیدی برایش تعیین کن
      parandehs[i].pos = createVector(
        random(windowWidth / 2 - boxWidth / 2, windowWidth / 2 + boxWidth / 2),
        random(windowHeight / 2 - boxHeight / 2, windowHeight / 2 + boxHeight / 2)
      );
    } else {
      // نمایش پرنده ها
      parandehs[i].updates();
      parandehs[i].displays();
    }
  }
}



function A34() {
   let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  fill(255,0);
  rect(windowWidth / 2, windowHeight / 2, boxWidth, boxHeight);
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(
      parandehs[i].pos.x,
      parandehs[i].pos.y,
      circlePos.x,
      circlePos.y
    );
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      let distanceToCenter = circlePos.dist(parandehs[i].pos);
      let moveDistance = circleRadius - distanceToCenter;
      let moveVector = p5.Vector.sub(circlePos, parandehs[i].pos);
      moveVector.setMag(moveDistance);
      parandehs[i].pos.add(moveVector);

      // نمایش پرنده ها
      parandehs[i].updates();
      parandehs[i].displays();
    } else if (
      parandehs[i].pos.x < windowWidth / 2 - boxWidth / 2 ||
      parandehs[i].pos.x > windowWidth / 2 + boxWidth / 2 ||
      parandehs[i].pos.y < windowHeight / 2 - boxHeight / 2 ||
      parandehs[i].pos.y > windowHeight / 2 + boxHeight / 2
    ) {
      // اگر پرنده از مربع خارج شده باشد، جای جدیدی برایش تعیین کن
      parandehs[i].pos = createVector(
        random(windowWidth / 2 - boxWidth / 2, windowWidth / 2 + boxWidth / 2),
        random(windowHeight / 2 - boxHeight / 2, windowHeight / 2 + boxHeight / 2)
      );
    } else {
      // نمایش پرنده ها
      parandehs[i].updates();
      parandehs[i].displays();
    }
  }
}


function A33() {
   let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  ;
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
      
      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
      
      // بررسی خروج پرنده از دایره
      let birdToCenter = p5.Vector.sub(circlePos, parandehs[i].pos);
      if (birdToCenter.mag() > circleRadius - parandehs[i].size / 2) {
        // پرنده به دایره نزدیک شده است، باید در دایره نگه داشته شود
        birdToCenter.setMag(circleRadius - parandehs[i].size / 2);
        parandehs[i].pos = p5.Vector.add(circlePos, birdToCenter);
        
        // جهت حرکت پرنده را به سمت داخل دایره تغییر دهید
        birdToCenter.rotate(PI);
        parandehs[i].vel = birdToCenter;
      }
    }
    
    // نمایش پرنده ها
    parandehs[i].updates();
    parandehs[i].displays();
  }
}


function A32() {
     let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
;
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    let birdInCircle = distance < circleRadius;

    // حرکت دایره
    if (birdInCircle) {
      let angle = random(-PI / 8, PI / 4);
      parandehs[i].pos.add(p5.Vector.fromAngle(angle, 5)); // جابجایی پرنده درون دایره
      parandehs[i].vel.rotate(angle); // تغییر جهت حرکت پرنده
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
    }

    // جلوگیری از خروج پرنده از دایره
    if (birdInCircle && distance > circleRadius - parandehs[i].r) {
      let dir = p5.Vector.sub(parandehs[i].pos, circlePos);
      dir.setMag(circleRadius - parandehs[i].r);
      parandehs[i].pos = p5.Vector.add(circlePos, dir);
    }

    // نمایش پرنده ها
    parandehs[i].updates();
    parandehs[i].displays();
  }
}





function A31() {
     let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
;
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      let angle = p5.Vector.sub(parandehs[i].pos, circlePos).heading();
      let newAngle = angle + random(-PI / 8, PI / 4);
      parandehs[i].vel = p5.Vector.fromAngle(newAngle);
      parandehs[i].vel.setMag(parandehs[i].speed);

      // حرکت دایره
      let circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);

      // بررسی خروج دایره از مربع بیرون
      if (circlePos.x < windowWidth / 2 - 192.5 || circlePos.x > windowWidth / 2 + 192.5 || circlePos.y < windowHeight / 2 - 192.5 || circlePos.y > windowHeight / 2 + 192.5) {
        circlePos.sub(circleVel);
      }

      // ثابت نگه داشتن شعاع پرنده
      parandehs[i].radius = circleRadius;
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
}

function A30() {
   let chosen = chooseRandomColor();
  
fill(chosen.colors[2]);
  
  fill(1);
  noStroke()
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      let angle = p5.Vector.sub(parandehs[i].pos, circlePos).heading();
      let newAngle = angle + random(-PI / 8, PI / 4);
      let radius = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
      parandehs[i].vel = p5.Vector.fromAngle(newAngle);
      parandehs[i].vel.setMag(parandehs[i].speed);

      // حرکت دایره
      let circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);

      // تغییر شعاع پرنده برای چرخش دور دایره
      parandehs[i].radius = radius;
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
}


function A25() {
  



   let chosen = chooseRandomColor();
randomColor = chosen.name;
fill(chosen.colors[2]);
 

   

 

    fill(1);
  noStroke()
       fill(255, 204, 0);
    

    let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
             newCircle = createGraphics(circleRadius * 2, circleRadius * 2);
      newCircle.noStroke();
      newCircle.fill(random(255), random(255), random(255));
      newCircle.circle(circleRadius, circleRadius, circleRadius * 2);
      
      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
    }
  }
  
  // ...
  
  // نمایش دایره ها
     fill(255, 204, 0);
 
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
  
}
 

function A24() {
  
   let chosen = chooseRandomColor();
randomColor = chosen.name;
fill(chosen.colors[2]);
;
    
  fill(1);
  noStroke();
  circle(circlePos.x, circlePos.y, 60);
  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < 130) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
      // حرکت دایره
      let circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      if (circlePos.x < windowWidth / 2 - 192.5 || circlePos.x > windowWidth / 2 + 192.5 || circlePos.y < windowHeight / 2 - 192.5 || circlePos.y > windowHeight / 2 + 192.5) {
        circleAcc.mult(-1);
      }
      circleAcc.setMag(33);
      circleVel.add(circleAcc);
      circleVel.limit(5);
      circlePos.add(circleVel);
    }
    // نمایش پرنده ها
    parandehs[i].updates();
    parandehs[i].displays();
  }
}
  

function A23() {
  
   let chosen = chooseRandomColor();
randomColor = chosen.name;
fill(chosen.colors[2]);
// نمایش مربع وسط
 ;

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      let newPos = p5.Vector.add(parandehs[i].pos, p5.Vector.fromAngle(radians(frameCount)).setMag(30));
      if (newPos.x < windowWidth / 2 + 385 / 2 - circleRadius && newPos.x > windowWidth / 2 - 385 / 2 + circleRadius &&
        newPos.y < windowHeight / 2 + 385 / 2 - circleRadius && newPos.y > windowHeight / 2 - 385 / 2 + circleRadius) {
        circlePos = newPos;
      }
    }
  }
  
  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
}


function A22() {
noStroke();
  let chosen = chooseRandomColor();
randomColor = chosen.name;
//fill(chosen.colors[15]);

fill(chosen.colors[12]);
circle(windowWidth / 2, windowHeight / 2, 385);

noFill();
beginShape();
stroke(0, 700);
stroke(255, 255, 255, 118);
noFill();
beginShape();
    strokeWeight(0.7)

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

// نمایش دایره
fill(1);
noStroke();
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

for (let i = 0; i < parandehs.length; i++) {
let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
if (distance < circleRadius) {
// تغییر جهت حرکت پرنده
parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
    // حرکت دایره
  circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
  circleAcc.setMag(340.5);
  circleVel.add(circleAcc);
  circleVel.limit(2);
  circlePos.add(circleVel);

  // سقوط دایره به کف صفحه
  if (circlePos.y + circleRadius >= height) {
    circleVel.y = 0;
  }
}
}

// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
    translate(width / 2, height / 2);

  for (let i = 0; i < 30; i++) {
    let x = sin(angle + i * 0.5) * 200 * scale;
    let y = cos(angle + i * 0.5) * 200 * scale;

    let r = map(x, -200 * scale, 200 * scale, 0, 255);
    let g = map(y, -200 * scale, 200 * scale, 0, 255);
    let b = map(i, 0, 30, 255, 0);

    fill(chosen.colors[12]);
    rect(x, y, 20 * scale, 20 * scale);
  }

  angle += 0.01;
  scale = sin(angle) * 0.5 + 1;
}

function A21() {
noStroke();
//background(255,255,255,0)
let chosen = chooseRandomColor();
randomColor = chosen.name;
fill(chosen.colors[12]);
;
  
    noFill();
  strokeWeight(3);
  stroke(chosen.colors[12]);
 if (random(1) < 0.5) {
    line(x, y, x + stepSize, y + stepSize);
  } else {
    line(x, y + stepSize, x + stepSize, y);
  }
  x += stepSize;

  if (x > width) {
    x = 0;
    y += stepSize;
  }

  if (y > height) {
   // //background(0);
    x = 0;
    y = 0;
  }
     noFill();
  strokeWeight(3.2);
  stroke(0);
 if (random(1) < 0.5) {
    line(x, y, x + stepSize, y + stepSize);
  } else {
    line(x, y + stepSize, x + stepSize, y);
  }
  x += stepSize;

  if (x > width) {
    x = 0;
    y += stepSize;
  }

  if (y > height) {
   // //background(0);
    x = 0;
    y = 0;
  }
  
noFill();



// نمایش دایره
fill(1);
noStroke();
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

for (let i = 0; i < parandehs.length; i++) {
let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
if (distance < circleRadius) {
// تغییر جهت حرکت پرنده
parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
    // حرکت دایره
  circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
  circleAcc.setMag(340.5);
  circleVel.add(circleAcc);
  circleVel.limit(2);
  circlePos.add(circleVel);

  // سقوط دایره به کف صفحه
  if (circlePos.y + circleRadius >= height) {
    circleVel.y = 0;
  }
}
}
// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
}

function A20() {
noStroke();
 for (let i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].move();
    circles[i].checkEdges();
  }
  let chosen = chooseRandomColor();
  randomColor = chosen.name;
  //fill(chosen.colors[11]);
  //;

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255, 255, 118);
  // stroke(chosen.colors[16]);
  noFill();
  beginShape();
    strokeWeight(0.7)

  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  // نمایش دایره
  let maxCircleRadius = 130;
  let minCircleRadius = 100;
  let circleGrowSpeed = 0.1;
  let circleShrinkSpeed = 0.2;

  if (circleRadius >= maxCircleRadius) {
    circleRadius = minCircleRadius;
  } else {
    circleRadius += circleGrowSpeed;
  }

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
      circleRadius += circleGrowSpeed;
    } else if (circleRadius > minCircleRadius) {
      circleRadius -= circleShrinkSpeed;
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
}
    rectMode(CENTER)

  
}

// Circle class
class Circled {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
  }
  
  // Display the circle
  display() {
        rectMode(CENTER)
 let chosen = chooseRandomColor();
  randomColor = chosen.name;
  fill(chosen.colors[1]);
   
    circle(this.x, this.y, this.r);
     fill(chosen.colors[5]);
   
    circle(this.x, this.y, this.r);
     fill(chosen.colors[11]);
   
    circle(this.x, this.y, this.r);
     fill(chosen.colors[13]);
   
    circle(this.x, this.y, this.r);
     fill(chosen.colors[15]);
   
    circle(this.x, this.y, this.r);
  }
  
  // Move the circle
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  // Check if the circle has hit the edge of the canvas and bounce it back
  checkEdges() {
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

}




function A19() {
noStroke();

let chosen = chooseRandomColor();
randomColor = chosen.name;
   noFill();
  
  strokeWeight(1.2);
  for (var i = 0; i < 10; i++) {
    // Set the stroke color and weight
    stroke(chosen.colors[1]);

    // Draw a line or curve with random coordinates
    if (random() > 0.5) {
      // Draw a line
      line(random(width), random(height), random(width), random(height));
    } else {
      // Draw a curve
      bezier(random(width), random(height), random(width), random(height), random(width), random(height), random(width), random(height));
    }
  }
  
   strokeWeight(0.2);
  for (var i = 0; i < 10; i++) {
    // Set the stroke color and weight
    stroke(chosen.colors[10]);

    // Draw a line or curve with random coordinates
    if (random() > 0.5) {
      // Draw a line
      line(random(width), random(height), random(width), random(height));
    } else {
      // Draw a curve
      bezier(random(width), random(height), random(width), random(height), random(width), random(height), random(width), random(height));
    }
  }
  //fill(chosen.colors[12]);

//;

noFill();
beginShape();
stroke(0, 700);
stroke(255, 255, 255, 118);
noFill();
beginShape();
    strokeWeight(0.7)

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

// نمایش دایره
fill(1);
noStroke();
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

for (let i = 0; i < parandehs.length; i++) {
let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
if (distance < circleRadius) {
// تغییر جهت حرکت پرنده
parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
    // حرکت دایره
  circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
  circleAcc.setMag(340.5);
  circleVel.add(circleAcc);
  circleVel.limit(2);
  circlePos.add(circleVel);

  // سقوط دایره به کف صفحه
  if (circlePos.y + circleRadius >= height) {
    circleVel.y = 0;
  }
}
}

// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
}


function A18() {
noStroke();
  rectMode(CENTER);

 let chosen = chooseRandomColor();
fill(chosen.colors[1]);
  //noFill()
  for (let i = 0; i < width+100; i++) {
    for (let j = 0; j < 5; j++) {
      let x = i * 30 + 30;
      let y = j * 30 + 30;
    
      ellipse(x, y, 10, 10);
    }
  }

  randomColor = chosen.name;
  fill(chosen.colors[12]);
  ;

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255, 255, 118);
  // stroke(chosen.colors[16]);
  noFill();
  beginShape();
    strokeWeight(0.7)

  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  // نمایش دایره
  let maxCircleRadius = 130;
  let minCircleRadius = 100;
  let circleGrowSpeed = 0.1;
  let circleShrinkSpeed = 0.2;

  if (circleRadius >= maxCircleRadius) {
    circleRadius = minCircleRadius;
  } else {
    circleRadius += circleGrowSpeed;
  }

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
      circleRadius += circleGrowSpeed;
    } else if (circleRadius > minCircleRadius) {
      circleRadius -= circleShrinkSpeed;
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
}
}


function A17() {
noStroke();

  let chosen = chooseRandomColor();
stroke(chosen.colors[1]);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let angle = random(TWO_PI);
    let d = random(50, height);
    let dx = cos(angle) * d;
    let dy = sin(angle) * d;
    let t = random(50, width);
    let r = 255 * noise(x / t, y / t);
    strokeWeight(r / 255 * 1.0);
    line(x, y, x + dx, y + dy);
   
  }
  stroke(chosen.colors[4]);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let angle = random(TWO_PI);
    let d = random(50, height);
    let dx = cos(angle) * d;
    let dy = sin(angle) * d;
    let t = random(50, width);
    let r = 255 * noise(x / t, y / t);
    strokeWeight(r / 255 * 1.0);
    line(x, y, x + dx, y + dy);
   
  }
   stroke(chosen.colors[6]);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let angle = random(TWO_PI);
    let d = random(50, height);
    let dx = cos(angle) * d;
    let dy = sin(angle) * d;
    let t = random(50, width);
    let r = 255 * noise(x / t, y / t);
    strokeWeight(r / 255 * 1.0);
    line(x, y, x + dx, y + dy);
   
  }
noStroke()
fill(chosen.colors[12]);
//;

noFill();
beginShape();
stroke(0, 700);
stroke(255, 255, 255, 118);
noFill();
beginShape();
    strokeWeight(0.7)

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

// نمایش دایره
fill(1);
noStroke();
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

for (let i = 0; i < parandehs.length; i++) {
let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
if (distance < circleRadius) {
// تغییر جهت حرکت پرنده
parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
    // حرکت دایره
  circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
  circleAcc.setMag(340.5);
  circleVel.add(circleAcc);
  circleVel.limit(2);
  circlePos.add(circleVel);

  // سقوط دایره به کف صفحه
  if (circlePos.y + circleRadius >= height) {
    circleVel.y = 0;
  }
}
}

// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
}


function A16() {
noStroke();
     for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
    shapes[i].display();
  } 
  let chosen = chooseRandomColor();
  randomColor = chosen.name;
  fill(chosen.colors[12]);
  ;

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255, 255, 118);

  noFill();
  beginShape();
    strokeWeight(0.7)

  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  let circleMaxRadius = 100;
  let circleGrowthRate = 1.1;
  let circleShrinkRate = 0.2;
  
  // نمایش دایره
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // افزایش اندازه دایره
      circleRadius *= circleGrowthRate;
      
      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
      
      // بازگشت دایره به اندازه اولیه
      if (circleRadius > circleMaxRadius) {
        circleRadius = circleMaxRadius;
        circleVel.mult(-circleShrinkRate);
      }
    }
  }
  
  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
   
}

function createShape(index, x, y, rangiDBC) {
  if (index === 0) {
    return new Circle(x, y, shapeSize, rangiDBC);
  } else if (index === 1) {
    return new Line(x, y, shapeSize, rangiDBC);
  }
}

class Circle {
  constructor(x, y, size, rangiDBC) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rangiDBC = rangiDBC;
    this.speed = random(-1, 3);
  }
  
  move() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }
  
  display() {
    //fill(255)
    fill(0);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Line {
  constructor(x, y, size, rangiDBC) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rangiDBC = rangiDBC;
    this.speed = random(-3, 1);
  }
  
  move() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }
  
  display() {
    fill(255);
    rect(this.x, this.y, this.size, 2);
  }



}




function A15() {
  ////background(255);
 let chosen = chooseRandomColor();
  // رسم خطوط
  stroke(1);
  strokeWeight(random(0.1, 2));
  
  
   
 
  
  
  //line(0, 120, windowWidth, 120);
 // line(0, 220, windowWidth, 220);

  // رسم پرنده ها در نمایشگر اول
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }

  
   for (let i = -100; i < width + 10; i += 10) {
    stroke(0, 2);
    line(i, -10, i + 10, height + 10);
  }
  
  // Add texture
  for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      stroke(32, random(255));
      point(i + random(5), j + random(5));
     // noLoop();
    }
  }
 noStroke()
  
  
  
  
  fill(255,255,255,255)
//rect(windowWidth/2,windowHeight/2,385,385)
 //  stroke(1)
 // strokeWeight(random(0.1,5));
  stroke(0, 700);
  stroke(255, 255,255,118);

  // stroke(chosen.colors[16]);
noFill();
beginShape();
vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
  
  
  
//rect(windowWidth/2,windowHeight/2,385,385)

   // نمایش دایره
    fill(1);
  //strokeWeight(random(100,200))
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);
    fill(1);
  
   noStroke();
   
for (let i = 0; i < galins.length; i++) {
    galins[i].updates2();
    galins[i].displays2();
  for (let i = 0; i < galins.length; i++) {
    galins[i].updates2();
    galins[i].displays2();
  }
   for (let i = 0; i < galins.length; i++) {
    galins[i].updates2();
    galins[i].displays2();

    // keep inside the rectangle and bounce off the edges
    galins[i].bounceOffEdges();

    // If the bird is outside of the rectangle, move it inside the rectangle
    if (galins[i].pos.x < windowWidth / 2 - 200 - galins[i].size / 2) {
      galins[i].pos.x = windowWidth / 2 - 200 - galins[i].size / 2;
    }
    if (galins[i].pos.x > windowWidth / 2 + 200 + galins[i].size / 2) {
      galins[i].pos.x = windowWidth / 2 + 200 + galins[i].size / 2;
    }
    if (galins[i].pos.y < windowHeight / 2 - 200 - galins[i].size / 2) {
      galins[i].pos.y = windowHeight / 2 - 200 - galins[i].size / 2;
    }
    if (galins[i].pos.y > windowHeight / 2 + 200 + galins[i].size / 2) {
      galins[i].pos.y = windowHeight / 2 + 200 + galins[i].size / 2;
    }
  // رسم منحنی بیضی

}
}

  for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI/8, PI/4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos/2);
            circleAcc.setMag(150.5);
            circleVel.add(circleAcc);
            circleVel.limit(0.25);
            circlePos.add(circleVel);
        }
    }

   

    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
}




function A14() {
  
  
  noStroke()
    //fill(255, 255, 255, 100)
    
   let chosen = chooseRandomColor();
  randomColor = chosen.name;
fill(chosen.colors[12]);
  
  
   for (let i = 0; i < width; i += 12) {
    for (let j = 0; j < height; j += 12) {
      let x = i + random(-1, 1);
      let y = j + random(-1, 1);
      let size = random(0.5, 21.5);
      let curve = random(TWO_PI);
      let vertex1 = createVector(size * cos(curve), size * sin(curve));
      let vertex2 = createVector(size * cos(curve + PI), size * sin(curve + PI));
      let vertex3 = createVector(size * cos(curve + HALF_PI), size * sin(curve + HALF_PI));
      let vertex4 = createVector(size * cos(curve + PI + HALF_PI), size * sin(curve + PI + HALF_PI));
      beginShape();
      vertex(x + vertex1.x, y + vertex1.y);
      bezierVertex(x + vertex3.x, y + vertex3.y, x + vertex4.x, y + vertex4.y, x + vertex2.x, y + vertex2.y);
      endShape(CLOSE);
    }
  }
  
  //

   

    noFill();
    beginShape();
   stroke(0, 700);
  stroke(255, 255,255,118);

  // stroke(chosen.colors[16]);
noFill();
beginShape();
vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

    // نمایش دایره
    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(340.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
  
}


function A13() {
  noStroke()
    //fill(255, 255, 255, 100)
    
   let chosen = chooseRandomColor();
  randomColor = chosen.name;
fill(chosen.colors[12]);
  
  
   for (let i = 0; i < width; i += 30) {
    for (let j = 0; j < height; j += 30) {
      let x = i + random(-15, 15);
      let y = j + random(-15, 15);
      let size = random(5, 15);
      let curve = random(TWO_PI);
      let vertex1 = createVector(size * cos(curve), size * sin(curve));
      let vertex2 = createVector(size * cos(curve + PI), size * sin(curve + PI));
      let vertex3 = createVector(size * cos(curve + HALF_PI), size * sin(curve + HALF_PI));
      let vertex4 = createVector(size * cos(curve + PI + HALF_PI), size * sin(curve + PI + HALF_PI));
      beginShape();
      vertex(x + vertex1.x, y + vertex1.y);
      bezierVertex(x + vertex3.x, y + vertex3.y, x + vertex4.x, y + vertex4.y, x + vertex2.x, y + vertex2.y);
      endShape(CLOSE);
    }
  }
  
  //

   

    noFill();
    beginShape();
   stroke(0, 700);
  stroke(255, 255,255,118);

  // stroke(chosen.colors[16]);
noFill();
beginShape();
vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

    // نمایش دایره
    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(340.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
  
}



function A12() {
  noStroke()
    //fill(255, 255, 255, 100)
    
   let chosen = chooseRandomColor();
  randomColor = chosen.name;
fill(chosen.colors[12]);
  
  
   for (let i = 0; i < width; i += 30) {
    for (let j = 0; j < height; j += 30) {
      let x = i + random(-5, 5);
      let y = j + random(-5, 5);
      let size = random(5, 15);
      let curve = random(TWO_PI);
      let vertex1 = createVector(size * cos(curve), size * sin(curve));
      let vertex2 = createVector(size * cos(curve + PI), size * sin(curve + PI));
      let vertex3 = createVector(size * cos(curve + HALF_PI), size * sin(curve + HALF_PI));
      let vertex4 = createVector(size * cos(curve + PI + HALF_PI), size * sin(curve + PI + HALF_PI));
      beginShape();
      vertex(x + vertex1.x, y + vertex1.y);
      bezierVertex(x + vertex3.x, y + vertex3.y, x + vertex4.x, y + vertex4.y, x + vertex2.x, y + vertex2.y);
      endShape(CLOSE);
    }
  }
  
  

   

    noFill();
    beginShape();
   stroke(0, 700);
  stroke(255, 255,255,118);

  // stroke(chosen.colors[16]);
noFill();
beginShape();
vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

    // نمایش دایره
    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(340.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
  
}


function A11() {
noStroke();

let chosen = chooseRandomColor();
randomColor = chosen.name;
fill(chosen.colors[12]);
  
   for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      let x = i + random(-5, 5);
      let y = j + random(-5, 5);
      let size = random(5, 15);
      let curve = random(TWO_PI);
      let vertex1 = createVector(size * cos(curve), size * sin(curve));
      let vertex2 = createVector(size * cos(curve + PI), size * sin(curve + PI));
      let vertex3 = createVector(size * cos(curve + HALF_PI), size * sin(curve + HALF_PI));
      let vertex4 = createVector(size * cos(curve + PI + HALF_PI), size * sin(curve + PI + HALF_PI));
      beginShape();
      vertex(x + vertex1.x, y + vertex1.y);
      bezierVertex(x + vertex3.x, y + vertex3.y, x + vertex4.x, y + vertex4.y, x + vertex2.x, y + vertex2.y);
      endShape(CLOSE);
    }
  }
  fill(chosen.colors[12]);

;

noFill();
beginShape();
stroke(0, 700);
stroke(255, 255, 255, 118);
noFill();
beginShape();
    strokeWeight(0.7)

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

// نمایش دایره
fill(1);
noStroke();
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

for (let i = 0; i < parandehs.length; i++) {
let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
if (distance < circleRadius) {
// تغییر جهت حرکت پرنده
parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
    // حرکت دایره
  circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
  circleAcc.setMag(340.5);
  circleVel.add(circleAcc);
  circleVel.limit(2);
  circlePos.add(circleVel);

  // سقوط دایره به کف صفحه
  if (circlePos.y + circleRadius >= height) {
    circleVel.y = 0;
  }
}
}

// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
}

function A10() {
  
    
 
   let chosen = chooseRandomColor();

  fill(chosen.colors[3]);
  

  // تعیین جهت دایره در برابر پرنده
  let circleDir = p5.Vector.sub(circlePos, parandehs[0].pos).normalize();

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255,255,118);
  
  noFill();
  beginShape();
  strokeWeight(0.7)
  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 4, PI / 4));

      // حرکت دایره به سمت مخالف پرنده
      circleAcc = circleDir.copy().mult(50.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
}



function A9() {
  
  
     let chosen = chooseRandomColor();

  fill(chosen.colors[1]);
   //strokeWeight(2);
  //stroke(0);
  
  // Create random lines with different angles
  for (var i = 0; i < 1; i++) {
    var x1 = random(width);
    var y1 = random(height);
    var x2 = x1 + random(100) * cos(random(TWO_PI));
    var y2 = y1 + random(100) * sin(random(TWO_PI));
    line(x1, y1, x2, y2);
  }
  fill(chosen.colors[5]);
  // Create random circles
  for (var i = 0; i < 1; i++) {
    var x = random(width);
    var y = random(height);
    var r = random(50);
    ellipse(x, y, r, r);
  }
  fill(chosen.colors[10]);
  // Create random rectangles
  for (var i = 0; i < 1; i++) {
    var x = random(width);
    var y = random(height);
    var w = random(100);
    var h = random(100);
    rect(x, y, w, h);
  }
  
  noStroke();
  noStroke();
    
  randomColor = chosen.name;
  fill(chosen.colors[3]);
  ;

  // تعیین جهت دایره در برابر پرنده
  let circleDir = p5.Vector.sub(circlePos, parandehs[0].pos).normalize();

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255,255,118);
  
  noFill();
  beginShape();
  strokeWeight(0.7)
  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره به سمت مخالف پرنده
      circleAcc = circleDir.copy().mult(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
}


function A8() {
  noStroke()
    
   let chosen = chooseRandomColor();
  randomColor = chosen.name;
fill(chosen.colors[12]);
  

   

    noFill();
    beginShape();
   stroke(0, 700);
  stroke(255, 255,255,118);

noFill();
beginShape();
    strokeWeight(0.7)

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

    for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
            circleAcc.setMag(30.5);
            circleVel.add(circleAcc);
            circleVel.limit(2);
            circlePos.add(circleVel);
        }
    }
   if (isGrowing) {
    circleRadius += 0.5;
    if (circleRadius >= maxSize * 30) {
      isGrowing = false;
    }
  } else {
    circleRadius -= 0.5;
    if (circleRadius <= minSize * 50) {
      isGrowing = true;
    }
  }

    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
  
}

function A7() {
noStroke();
    
  let chosen = chooseRandomColor();
  randomColor = chosen.name;
  fill(chosen.colors[12]);
  ;

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255, 255, 118);

  noFill();
  beginShape();
    strokeWeight(0.7)

  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  let circleMaxRadius = 200;
  let circleGrowthRate = 1.1;
  let circleShrinkRate = 0.2;
  
  // نمایش دایره
  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // افزایش اندازه دایره
      circleRadius *= circleGrowthRate;
      
      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
      
      // بازگشت دایره به اندازه اولیه
      if (circleRadius > circleMaxRadius) {
        circleRadius = circleMaxRadius;
        circleVel.mult(-circleShrinkRate);
      }
    }
  }
  
  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
}
}




function A6() {
noStroke();

  let chosen = chooseRandomColor();
  randomColor = chosen.name;
  fill(chosen.colors[12]);
  ;

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255, 255, 118);
  // stroke(chosen.colors[16]);
  noFill();
  beginShape();
    strokeWeight(0.7)

  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  // نمایش دایره
  let maxCircleRadius = 130;
  let minCircleRadius = 100;
  let circleGrowSpeed = 0.1;
  let circleShrinkSpeed = 0.2;

  if (circleRadius >= maxCircleRadius) {
    circleRadius = minCircleRadius;
  } else {
    circleRadius += circleGrowSpeed;
  }

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // تغییر جهت حرکت پرنده
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

      // حرکت دایره
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(340.5);
      circleVel.add(circleAcc);
      circleVel.limit(2);
      circlePos.add(circleVel);
      circleRadius += circleGrowSpeed;
    } else if (circleRadius > minCircleRadius) {
      circleRadius -= circleShrinkSpeed;
    }
  }

  // نمایش پرنده ها
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
}
}




function A5() {
noStroke();

let chosen = chooseRandomColor();
randomColor = chosen.name;
fill(chosen.colors[12]);
;

noFill();
beginShape();
stroke(0, 700);
stroke(255, 255, 255, 118);
noFill();
beginShape();
    strokeWeight(0.7)

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

// نمایش دایره
fill(1);
noStroke();
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

for (let i = 0; i < parandehs.length; i++) {
let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
if (distance < circleRadius) {
// تغییر جهت حرکت پرنده
parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
    // حرکت دایره
  circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
  circleAcc.setMag(340.5);
  circleVel.add(circleAcc);
  circleVel.limit(2);
  circlePos.add(circleVel);

  // سقوط دایره به کف صفحه
  if (circlePos.y + circleRadius >= height) {
    circleVel.y = 0;
  }
}
}

// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
}

function A4() {
 noStroke()
//fill(255, 255, 255, 100)

let chosen = chooseRandomColor();
randomColor = chosen.name;
fill(255);

  noFill();
beginShape();
stroke(0, 700);
stroke(255, 255,255,118);

// stroke(chosen.colors[16]);
noFill();
beginShape();
    strokeWeight(0.7)

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();
  // نمایش دایره
fill(1);
noStroke()
   fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);
  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
        // تغییر جهت حرکت پرنده
        parandehs[i].vel.rotate(random(-PI / 8, PI / 4));

        // حرکت دایره
        circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
        circleAcc.setMag(10.5);
        circleVel.add(circleAcc);
        circleVel.limit(2);
        circlePos.add(circleVel);
        
        // سقوط پرنده به کف صفحه
        parandehs[i].vel.y = random(0.5, 20);
    }
}
// نمایش پرنده ها
for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
    
    // سقوط پرنده به کف صفحه
    if (parandehs[i].pos.y >= windowHeight) {
        parandehs[i].pos.y = windowHeight;
        parandehs[i].vel.y = 0;
    }
}
}
  
  
function A3() {
  noStroke();
  let chosen = chooseRandomColor();
  randomColor = chosen.name;
  fill(chosen.colors[12]);
  ;

  noFill();
  beginShape();
  stroke(0, 700);
  stroke(255, 255, 255, 118);
  noFill();
  beginShape();
    strokeWeight(0.7)

  vertex(controlPoints[0].x, controlPoints[0].y);
  for (let i = 0; i < parandehs.length; i++) {
    let point = parandehs[i].pos;
    vertex(point.x, point.y);
  }
  vertex(controlPoints[5].x, controlPoints[5].y);
  endShape();

  fill(1);
  noStroke();
     fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

  for (let i = 0; i < parandehs.length; i++) {
    let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance < circleRadius) {
      // پرنده به دایره برخورد کرده است

      // پرنده به دایره برخورد نکرده است
      parandehs[i].vel.rotate(random(-PI / 8, PI / 4));
      circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos);
      circleAcc.setMag(10.5);
      circleVel.add(circleAcc);
      circleVel.limit(5);
      circlePos.add(circleVel);
            if (circlePos.x < windowWidth / 2 - 192.5 || circlePos.x > windowWidth / 2 + 192.5 || circlePos.y < windowHeight / 2 - 192.5 || circlePos.y > windowHeight / 2 + 192.5) {
  // حرکت دایره به سمت مرکز تصویر
  let directionToCenter = p5.Vector.sub(createVector(windowWidth / 2, windowHeight / 2), circlePos);
  directionToCenter.setMag(5);
  circlePos.add(directionToCenter);
}
    }
  }

  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }
}



function A1() {
  noStroke()
    //fill(255, 255, 255, 100)
 //frameRate(۱۲)
  
   let chosen = chooseRandomColor();
  randomColor = chosen.name;
fill(chosen.colors[12]);
    //requestAnimationFrame(loop)

//requestAnimationFrame(A1)
   

    noFill();
    beginShape();
   stroke(0, 255);
 // stroke(255, 255,255,118);

 //stroke(chosen.colors[16]);
noFill();
beginShape();
vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();

    // نمایش دایره
    fill(1);
  noStroke()
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);

   // نمایش پرنده ها و محاسبه فاصله بین پرنده ها و دایره
for (let i = 0; i < parandehs.length; i++) {
    let parandeh = parandehs[i];
    parandeh.updates();
    parandeh.displays();

    // محاسبه فاصله بین پرنده ها و دایره
    let dx = parandeh.pos.x - circlePos.x;
    let dy = parandeh.pos.y - circlePos.y;
    let distance = sqrt(dx * dx + dy * dy);
    if (distance < circleRadius) {
        // تغییر جهت حرکت پرنده
        parandeh.vel.rotate(random(-PI / 8, PI / 4));

        // حرکت دایره
        circleAcc = p5.Vector.sub(parandeh.pos, circlePos);
        circleAcc.setMag(340.5);
        circleVel.add(circleAcc);
        circleVel.limit(10);
        circlePos.add(circleVel);

        if (circlePos.x < windowWidth / 2 - 192.5 || circlePos.x > windowWidth / 2 + 192.5 || circlePos.y <windowHeight / 2 - 192.5 || circlePos.y > windowHeight / 2 + 192.5) {
            // حرکت دایره به سمت مرکز تصویر
            let directionToCenter = p5.Vector.sub(createVector(windowWidth / 2, windowHeight / 2), circlePos);
            directionToCenter.setMag(5);
            circlePos.add(directionToCenter);
        }
    }
}
  
}




function A2() {
  ////background(255);
 let chosen = chooseRandomColor();
  // رسم خطوط
  stroke(1);
  strokeWeight(random(0.1, 2));
  
  
   
 
  
  
  //line(0, 120, windowWidth, 120);
 // line(0, 220, windowWidth, 220);

  // رسم پرنده ها در نمایشگر اول
  for (let i = 0; i < parandehs.length; i++) {
    parandehs[i].updates();
    parandehs[i].displays();
  }

  
  
 
  
  
  
  

 //  stroke(1)
 // strokeWeight(random(0.1,5));
  stroke(0, 700);
  stroke(255, 255,255,118);

  // stroke(chosen.colors[16]);
noFill();
beginShape();
vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < parandehs.length; i++) {
let point = parandehs[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();
for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
  
  
  
//rect(windowWidth/2,windowHeight/2,385,385)

   // نمایش دایره
    fill(1);
  //strokeWeight(random(100,200))
       fill(255, 204, 0);
   let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
  circle(circlePos.x, circlePos.y, circleRadius+lightColor/2);
    fill(1);
  
   noStroke();
   
for (let i = 0; i < galins.length; i++) {
    galins[i].updates2();
    galins[i].displays2();
  for (let i = 0; i < galins.length; i++) {
    galins[i].updates2();
    galins[i].displays2();
  }
   for (let i = 0; i < galins.length; i++) {
    galins[i].updates2();
    galins[i].displays2();

    // keep inside the rectangle and bounce off the edges
    galins[i].bounceOffEdges();

    // If the bird is outside of the rectangle, move it inside the rectangle
    if (galins[i].pos.x < windowWidth / 2 - 200 - galins[i].size / 2) {
      galins[i].pos.x = windowWidth / 2 - 200 - galins[i].size / 2;
    }
    if (galins[i].pos.x > windowWidth / 2 + 200 + galins[i].size / 2) {
      galins[i].pos.x = windowWidth / 2 + 200 + galins[i].size / 2;
    }
    if (galins[i].pos.y < windowHeight / 2 - 200 - galins[i].size / 2) {
      galins[i].pos.y = windowHeight / 2 - 200 - galins[i].size / 2;
    }
    if (galins[i].pos.y > windowHeight / 2 + 200 + galins[i].size / 2) {
      galins[i].pos.y = windowHeight / 2 + 200 + galins[i].size / 2;
    }
  // رسم منحنی بیضی

}
}

  for (let i = 0; i < parandehs.length; i++) {
        let distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
        if (distance < circleRadius) {
            // تغییر جهت حرکت پرنده
            parandehs[i].vel.rotate(random(-PI/8, PI/4));

            // حرکت دایره
            circleAcc = p5.Vector.sub(parandehs[i].pos, circlePos/2);
            circleAcc.setMag(10.5);
            circleVel.add(circleAcc);
            circleVel.limit(0.25);
            circlePos.add(circleVel);
          
      // بررسی خروج دایره از مربع بیرون
     // بررسی خروج دایره از مربع بیرون
if (circlePos.x < windowWidth / 2 - 192.5 || circlePos.x > windowWidth / 2 + 192.5 || circlePos.y < windowHeight / 2 - 192.5 || circlePos.y > windowHeight / 2 + 192.5) {
  // حرکت دایره به سمت مرکز تصویر
  let directionToCenter = p5.Vector.sub(createVector(windowWidth / 2, windowHeight / 2), circlePos);
  directionToCenter.setMag(5);
  circlePos.add(directionToCenter);
}
          }
}



   

    // نمایش پرنده ها
    for (let i = 0; i < parandehs.length; i++) {
        parandehs[i].updates();
        parandehs[i].displays();
    }
}






class Parandeh {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector(random(0, width),random(0, width));
this.vel = p5.Vector.random2D().mult(random(1, 3));

    this.acc = createVector(0, 0);
    this.size = random(5, 15);
    this.angle = random(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = random(4,5);
this.spring = 0.01;
this.damping = 0.95;
this.maxSpeed = 4;
  this.leftImage = false; 
    this.controlPoints = [this.pos];
for (let i = 0; i < 4; i++) {
this.controlPoints.push(
createVector(random(0, width), random(0, height))
);
}
  }
  keepInsideRect() {
    if (this.pos.x < windowWidth*2 - 1200) {
      this.pos.x = windowWidth*2 - 200;
      this.vel.x *= -1;
    }
    if (this.pos.x > windowWidth/2 + 1200) {
      this.pos.x = windowWidth/2 + 1200;
      this.vel.x *= -1;
    }
    if (this.pos.y < windowHeight/2 - 1200) {
      this.pos.y = windowHeight/2 - 1200;
      this.vel.y *= -1;
    }
    if (this.pos.y > windowHeight/2 + 1200) {
      this.pos.y = windowHeight/2 + 1200;
      this.vel.y *= -1;
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
  bounceOffEdges() {
    if (this.pos.x < windowWidth - 200 + this.size/2 || this.pos.x > windowWidth/2 + 200 - this.size/2) {
      this.vel.x *= -1;
    }
    if (this.pos.y < windowHeight - 200 + this.size/2 || this.pos.y > windowHeight/2 + 200 - this.size/2) {
      this.vel.y *= -1;
   
    }
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
    // [fix] setTimeout حذف شد (تایمر واقعی، ترتیب random را غیرقطعی می‌کرد)؛ پرواز دوباره در همین فریم
    this.vel = p5.Vector.random2D().mult(this.maxSpeed);
  }
}

updates() {
this.updateControlPoints();

  this.target.x = this.pos.x + cos(this.angle) * this.dist;
  this.target.y = this.pos.y + sin(this.angle) * this.dist;


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
  if (this.pos.x < -this.size || this.pos.x > width + this.size ||
        this.pos.y < -this.size || this.pos.y > height + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      // [fix] بدون setTimeout: جابه‌جایی همین‌جا و قطعی انجام می‌شود (تایمرها در Grokly با ساعت واقعی اجرا می‌شدند)
        this.pos.x = random(0, width);
        this.pos.y = random(0,height);
        this.leftImage = false;
       this.angle = this.vel.heading();

    }
  // [MuzSound] ذره‌ها/پرنده‌ها ← onset و attack: روی شروع هر نت یا هجا جهشی کوتاه در جهت پرواز؛
  // pitchDelta (فقط صدای آوازی): بالا رفتن زیروبمی مسیر را به یک سو، پایین آمدن به سوی دیگر می‌چرخاند
  const muzTurn = MuzSound.particles.turn(); if (muzTurn) this.vel.rotate(muzTurn);
  const muzB = MuzSound.particles.boost();
  if (muzB > 0.001) { const m = this.vel.mag() || 1; this.pos.x += (this.vel.x / m) * muzB * 3; this.pos.y += (this.vel.y / m) * muzB * 3; }
}

displays() {
 // this.sitOnLine(width,2);
 // this.sitOnLine(height/2);

 
  let chosen = chooseRandomColor();

noStroke()
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.vel.heading());
  
      let level = amp.getLevel();
  let bins = fft.analyze();
  let lightColor = map(level, 0, 0.8, 50, 0);
  let bg = map(level, 230, 0.8, 5, 255);
   
  
//textAlign(0, 0);
// [fix] متن‌ها (واژه‌ها و کد مورس) طبق قانون هنرمند حذف شدند؛ random() نگه داشته شد تا ترتیب اعداد تصادفی و ظاهر اصلی حفظ شود
random();
  // [MuzSound] اندازهٔ مربع‌ها ← presence
  const muzG = MuzSound.particles.grow();
 fill(chosen.colors[12]);
  fill(rang20[2])
 rect(0, -5, this.size+lightColor/4+muzG,random(10,20)+lightColor/8);
  //noStroke();
   //  fill(colorset[3 % colorset.length]); 
rect(0, -5, this.size+lightColor/4+muzG, random(10,20)+lightColor/8);
  fill(255)
  fill(rang20[1])
   rect(100, -150, this.size+lightColor/4+muzG, random(10,20)+lightColor/8);
  noStroke();
   //  fill(colorset[3 % colorset.length]); 
  fill(1)
  fill(rang20[6])
  
rect(150, -250, this.size+lightColor/4+muzG,random(10,20)+lightColor/8);

 

  pop();
}


}
class Galin {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector(random(windowWidth), random(windowHeight));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = random(3, 15);
    this.angle = random(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = random(10, 50);
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
    if (this.pos.x < windowWidth/2 - 200 + this.size/2 || this.pos.x > windowWidth/2 + 200 - this.size/2) {
      this.vel.x *= -1;
    }
    if (this.pos.y < windowHeight/2 - 200 + this.size/2 || this.pos.y > windowHeight/2 + 200 - this.size/2) {
      this.vel.y *= -1;
   
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
  this.target.x = this.pos.x + cos(this.angle) * this.dist;
  this.target.y = this.pos.y + sin(this.angle) * this.dist;

  let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

  if (distance < 1) {
    this.angle += TWO_PI;
    this.target.x = this.pos.x + cos(this.angle) * this.dist;
    this.target.y = this.pos.y + sin(this.angle) * this.dist;
  }

  // apply force to move towards target point
  let force = p5.Vector.sub(this.target, this.pos);
  force.mult(this.spring);
  this.acc.add(force);
  this.vel.add(this.acc);
  this.vel.mult(this.damping);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);


  this.acc.mult(0);

  // updates2 spring constant
  this.spring += random(-0.001, 0.001);
  this.spring = constrain(this.spring, 0.005, 10.03);
 //this.keepInsideRect();

    // bounce off the edges
  //  this.bounceOffEdges();
  
  
  


  this.spring += random(-0.01, 0.01);
  this.spring = constrain(this.spring, 0.005, 0.03);
  if (this.pos.x < -this.size || this.pos.x > width + this.size ||
        this.pos.y < -this.size || this.pos.y > height + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      // [fix] بدون setTimeout (غیرقطعی بود)
        this.pos.x = random(0, width);
        this.pos.y = random(0,height);
        this.leftImage = false;
    }
  // [MuzSound] همان جهش ذره‌ها ← onset و attack
  const muzB = MuzSound.particles.boost();
  if (muzB > 0.001) { const m = this.vel.mag() || 1; this.pos.x += (this.vel.x / m) * muzB * 3; this.pos.y += (this.vel.y / m) * muzB * 3; }
}

displays2() {
fill(1)
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.vel.heading());
  fill(255)
  fill(rang20[15])
 rect(0, -5,  generateNumbers(), generateNumbers());
  noStroke();
     
  let chosen = chooseRandomColor();
  randomColor = chosen.name;
  fill(chosen.colors[20]);
  fill(rang20[25])
   //  fill(colorset[3 % colorset.length]); 
rect(200, -45, generateNumbers(), generateNumbers());
  
  pop();
}
}
function MybezierPoint(points, t) {
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


const morseCodeDict = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w':'.--', 'x': '-..-', 'y': '-.--', 'z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};
function toMorseCode(word) {
  let morseCode = '';
  for (let i = 0; i < word.length; i++) {
    let c = word.charAt(i).toLowerCase();
    if (morseCodeDict[c]) {
      morseCode += morseCodeDict[c] + ' ';
    }
  }
  return morseCode.trim();
}

let words = [
'ACCEPTANCE','ADMIRATION','ADORATION','AFFECTION','AFRAID','AGITATION','AGONY','AGGRESSIVE','ALARM','ALARMED','ALIENATION','AMAZEMENT','AMBIVALENCE','AMUSEMENT','ANGER','ANGUISH','ANNOYED','ANTICIPATING','ANXIOUS','APATHY','APPREHENSION','ARROGANT','ASSERTIVE','ASTONISHED','ATTENTIVENESS','ATTRACTION','AVERSION','AWE','BAFFLED','BEWILDERED','BITTER','BITTER','SWEETNESS','BLISS','BORED','BRAZEN','BROODING','CALM','CAREFREE','CARELESS','CARING','CHARITY','CHEEKY','CHEERFULNESS','CLAUSTROPHOBIC','COERCIVE','COMFORTABLE','CONFIDENT','CONFUSION','CONTEMPT','CONTENT','COURAGE','COWARDLY','CRUELTY','CURIOSITY','CYNICISM','DAZED','DEJECTION','DELIGHTED','DEMORALIZED','DEPRESSED','DESIRE','DESPAIR','DETERMINED','DISAPPOINTMENT','DISBELIEF','DISCOMBOBULATED','DISCOMFORT','DISCONTENTMENT','DISGRUNTLED','DISGUST','DISHEARTENED','DISLIKE','DISMAY','DISORIENTED','DISPIRITED','DISPLEASURE','DISTRACTION','DISTRESS','DISTURBED','DOMINANT','DOUBT','DREAD','DRIVEN','DUMBSTRUCK','EAGERNESS','ECSTASY','ELATION','EMBARRASSMENT','EMPATHY','ENCHANTED','ENJOYMENT','ENLIGHTENED','ENNUI','ENTHUSIASM','ENVY','EPIPHANY','EUPHORIA','EXASPERATED','EXCITEMENT','EXPECTANCY','FASCINATION','FEAR','FLAKEY','FOCUSED','FONDNESS','FRIENDLINESS','FRIGHT','FRUSTRATED','FURY','GLEE','GLOOMY','GLUMNESS','GRATITUDE','GREED','GRIEF','GROUCHINESS','GRUMPINESS','GUILT','HAPPINESS','HATE','HATRED','HELPLESS','HOMESICKNESS','HOPE','HOPELESS','HORRIFIED','HOSPITABLE','HUMILIATION','HUMILITY','HURT','HYSTERIA','IDLENESS','IMPATIENT','INDIFFERENCE','INDIGNANT','INFATUATION','•','INFURIATED','INSECURITY','INSIGHTFUL','INSULTED','INTEREST','INTRIGUED','IRRITATED','ISOLATED','JEALOUSY','JOVIALITY','JOY','JUBILATION','KIND','LAZY','LIKING','LOATHING','LONELY','LONGING','LOOPY','LOVE','LUST','MAD','MELANCHOLY','MISERABLE','MISERLINESS','MIXED','UP','MODESTY','MOODY','MORTIFIED','MYSTIFIED','NASTY','NAUSEATED','NEGATIVE','NEGLECT','NERVOUS','NOSTALGIC','NUMB','OBSTINATE','OFFENDED','OPTIMISTIC','OUTRAGE','OVERWHELMED','PANICKED','PARANOID','PASSION','PATIENCE','PENSIVENESS','PERPLEXED','PERSEVERING','PESSIMISM','PITY','PLEASED','PLEASURE','POLITENESS','POSITIVE','POSSESSIVE','POWERLESS','PRIDE','PUZZLED','RAGE','RASH','RATTLED','REGRET','REJECTED','RELAXED','RELIEVED','RELUCTANT','REMORSE','RESENTMENT','RESIGNATION','RESTLESSNESS','REVULSION','RUTHLESS','SADNESS','SATISFACTION','SCARED','SCHADENFREUDE','SCORN','SELF-CARING','SELF-COMPASSIONATE','SELF-CONFIDENT','SELF-CONSCIOUS','SELF-CRITICAL','SELF-LOATHING','SELF-MOTIVATED','SELF-PITY','SELF-RESPECTING','SELF-UNDERSTANDING','SENTIMENTALITY','SERENITY','SHAME','SHAMELESS','SHOCKED','SMUG','SORROW','SPITE','STRESSED','STRONG','STUBBORN','STUCK','SUBMISSIVE','SUFFERING','SULLENNESS','SURPRISE','SUSPENSE','SUSPICIOUS','SYMPATHY','TENDERNESS','TENSION','TERROR','THANKFULNESS','THRILLED','TIRED','TOLERANCE','TORMENT','TRIUMPHANT','TROUBLED','TRUST','UNCERTAINTY','UNDERMINED','UNEASINESS','UNHAPPY','UNNERVED','UNSETTLED','UNSURE','UPSET','VENGEFUL','VICIOUS','VIGILANCE','VULNERABLE','WEAK','WOE','WORRIED','WORTHY','WRATH'

];

function toMorseCode(word) {
  word = word.toLowerCase();
  let morseCode = '';
  for (let i = 0; i < word.length; i++) {
    let char = word.charAt(i);
    if (morseCodeDict[char]) {
      morseCode += morseCodeDict[char] + ' ';
    }
  }
  return morseCode;
}
