



const hl = (function () {
    let searchParams = new URLSearchParams(window.location.search);
  
    const generateRandomHash = () => {
      const alphabet = "0123456789abcdef";
      return (
        "0x" +
        Array(64)
          .fill(0)
          .map((_) => alphabet[(Math.random() * alphabet.length) | 0])
          .join("")
      );
    };
  
    const generateRandomAddress = () => {
      const alphabet = "0123456789abcdef";
      return (
        "0x" +
        Array(40)
          .fill(0)
          .map((_) => alphabet[(Math.random() * alphabet.length) | 0])
          .join("")
      );
    };
  
    function xmur3(str) {
      for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)),
          (h = (h << 13) | (h >>> 19));
      return function () {
        (h = Math.imul(h ^ (h >>> 16), 2246822507)),
          (h = Math.imul(h ^ (h >>> 13), 3266489909));
        return (h ^= h >>> 16) >>> 0;
      };
    }
  
    function sfc32(a, b, c, d) {
      return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        var t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    }
  
    const contractAddress = searchParams.get("a") || generateRandomAddress();
    const chainId =
      searchParams.get("c") ||
      [1, 5, 137, 80001][Math.floor(Math.random() * 4)].toString();
    const editionSize =
      searchParams.get("s") || Math.floor(100 * Math.random()).toString();
    const mintSize =
      searchParams.get("ms") ||
      Math.floor(Number(editionSize) * Math.random() + 1).toString();
    const mintIteration =
      searchParams.get("mi") ||
      Math.floor((Number(mintSize) - 1) * Math.random() + 1).toString();
    const hash = searchParams.get("h") || generateRandomHash();
    const blockHash = searchParams.get("bh") || generateRandomHash();
    const blockNumber =
      searchParams.get("bn") || Math.floor(1000000 * Math.random()).toString();
    const tokenId =
      searchParams.get("tid") ||
      Math.floor(Number(editionSize) * Math.random()).toString();
    const walletAddress = searchParams.get("wa") || generateRandomAddress();
    const timestamp =
      searchParams.get("t") || Math.floor(Date.now() / 1000).toString();
    const gasPrice =
      searchParams.get("gp") ||
      Math.floor(Math.random() * (200 - 10 + 1) + 10).toString();
    const gasUsed =
      searchParams.get("gu") ||
      Math.floor(Math.random() * (100 - 10 + 1) + 10).toString();
    const isCurated = searchParams.get("ic") || "0";
    const seed = isCurated === "1" ? xmur3(hash) : xmur3(hash + tokenId);
  
    const hl = {
      tx: {
        contractAddress,
        chainId,
        hash,
        blockHash,
        blockNumber,
        timestamp,
        walletAddress,
        tokenId,
        mintSize,
        mintIteration,
        editionSize,
        gasPrice,
        gasUsed,
      },
      random: (...args) => {
        let min = 0,
          max = 1;
        if (args.length === 1) max = args[0];
        if (args.length === 2) {
          max = args[1];
          min = args[0];
        }
        const rand = sfc32(seed(), seed(), seed(), seed())();
        return min + (max - min) * rand;
      },
      randomInt: (...args) => {
        if (args.length === 0) args.push(100); //If not upper limit provided then set to [0,100) as safe assumption
        if (args.length === 1) args[0]++;
        if (args.length === 2) args[1]++;
        return Math.floor(hl.random(...args));
      },
      randomBool: (p) => {
        return hl.random() < p;
      },
      randomElement: (array) => {
        return array[hl.randomInt(0, array.length - 1)];
      },
      token: {
        id: tokenId,
        traits: {},
        name: "",
        description: "",
        capturePreview: function () {
          window.dispatchEvent(new Event("CAPTURE_PREVIEW"));
          setTimeout(() => this.capturePreview(), 500);
        },
        setTraits: function (traits) {
          this.traits = traits;
        },
        getTraits: function () {
          return this.traits;
        },
        setName: function (name) {
          this.name = name;
        },
        getName: function () {
          return this.name;
        },
        setDescription: function (description) {
          this.description = description;
        },
        getDescription: function () {
          return this.description;
        },
      },
      context: {
        previewMode: searchParams.get("pr") === "1",
        scriptInfo: () => {
          return {
            name: "Highlight Generative Art Script",
            version: "0.1.2",
            framework: "js",
          };
        },
      },
    };
  
    return hl;
  })();
  
  window.$hl = hl;



function mouseClicked(){
   saveCanvas('Winter Morning / Reza Milani','png')
}
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
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 38) ** 2 + (g - 70) ** 2 + (b - 83) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color2() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 42) ** 2 + (g - 157) ** 2 + (b - 143) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color3() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 233) ** 2 + (g - 196) ** 2 + (b - 106) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color4() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 244) ** 2 + (g - 162) ** 2 + (b - 97) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color5() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 231) ** 2 + (g - 111) ** 2 + (b - 81) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color6() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 142) ** 2 + (g - 202) ** 2 + (b - 230) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color7() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 33) ** 2 + (g - 158) ** 2 + (b - 188) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color8() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 2) ** 2 + (g - 48) ** 2 + (b - 71) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color9() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 255) ** 2 + (g - 183) ** 2 + (b - 3) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color10() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 251) ** 2 + (g - 133) ** 2 + (b - 0) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}




function color11() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 230) ** 2 + (g - 57) ** 2 + (b - 70) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color12() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 241) ** 2 + (g - 250) ** 2 + (b - 238) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color13() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 168) ** 2 + (g - 218) ** 2 + (b - 220) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color14() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 69) ** 2 + (g - 123) ** 2 + (b - 157) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color15() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 29) ** 2 + (g - 53) ** 2 + (b - 87) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color16() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 244) ** 2 + (g - 241) ** 2 + (b - 222) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color17() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 224) ** 2 + (g - 122) ** 2 + (b - 95) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color18() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 61) ** 2 + (g - 64) ** 2 + (b - 91) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color19() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 129) ** 2 + (g - 178) ** 2 + (b - 154) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color20() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 242) ** 2 + (g - 204) ** 2 + (b - 143) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color21() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 255) ** 2 + (g - 190) ** 2 + (b - 11) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color22() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 251) ** 2 + (g - 86) ** 2 + (b - 7) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}




function color23() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 255) ** 2 + (g - 0) ** 2 + (b - 110) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color24() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 131) ** 2 + (g - 178) ** 2 + (b - 56) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color25() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 58) ** 2 + (g - 134) ** 2 + (b - 255) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color26() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 255) ** 2 + (g - 205) ** 2 + (b - 162) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color27() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 255) ** 2 + (g - 180) ** 2 + (b - 7) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}




function color28() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 229) ** 2 + (g - 152) ** 2 + (b - 155) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color29() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 181) ** 2 + (g - 131) ** 2 + (b - 141) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color30() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 109) ** 2 + (g - 104) ** 2 + (b - 117) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color31() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 0) ** 2 + (g - 109) ** 2 + (b - 119) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color32() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 131) ** 2 + (g - 197) ** 2 + (b - 190) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}



function color33() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 237) ** 2 + (g - 246) ** 2 + (b - 249) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color34() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 255) ** 2 + (g - 221) ** 2 + (b - 210) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color35() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 226) ** 2 + (g - 149) ** 2 + (b - 120) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}



function color36() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 239) ** 2 + (g - 71) ** 2 + (b - 111) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color37() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 255) ** 2 + (g - 209) ** 2 + (b - 102) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}



function color38() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 6) ** 2 + (g - 214) ** 2 + (b - 160) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color39() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 17) ** 2 + (g - 138) ** 2 + (b - 178) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color40() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 7) ** 2 + (g - 59) ** 2 + (b - 76) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color41() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 13) ** 2 + (g - 65) ** 2 + (b - 225) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color42() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 12) ** 2 + (g - 99) ** 2 + (b - 231) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color43() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 10) ** 2 + (g - 133) ** 2 + (b - 237) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color44() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 9) ** 2 + (g - 166) ** 2 + (b - 243) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color45() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 7) ** 2 + (g - 200) ** 2 + (b - 249) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color46() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 247) ** 2 + (g - 178) ** 2 + (b - 103) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color47() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 247) ** 2 + (g - 157) ** 2 + (b - 101) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}


function color48() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 244) ** 2 + (g - 132) ** 2 + (b - 95) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color49() {
  let r, g, b, d;
  do {
    r = hl.random۹;
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 242) ** 2 + (g - 112) ** 2 + (b - 89) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
}

function color50() {
  let r, g, b, d;
  do {
    r = hl.random(0,255);
    g = hl.random(0,255);
    b = hl.random(0,255);
    d = sqrt((r - 242) ** 2 + (g - 92) ** 2 + (b - 84) ** 2);
  } while (d > 10);
  return color(r, g, b,hl.random(1,10));
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
      const randomIndex = hl.randomInt(0, colors.length - 1);
      const chosenColor = colors[randomIndex];
      let randomColors = [];
      for (let i = 0; i < 90; i++) {
        randomColors.push(chosenColor.func());
      }
      currentColor = { name: chosenColor.name, colors: randomColors };
    }
    return currentColor;
  }

let randomColor;

let parandehs = [];
let canvasp2;
let canvas3;


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

let numBirds = 50;

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

let r2 = 100;
var lastrandomsX=0;
var lastrandomsY=0;
 function A2(t) {
   if(t=='k'){
   if(lastrandomsX==0){
   lastrandomsX=hl.random(1, 5);
   }
   return lastrandomsX;
   }else{
     
   if(lastrandomsY==0){
   lastrandomsY=hl.random(1, 5);
   }
   return lastrandomsY;
   }
   
 }
var x = 0;
let kapas = [];

let grassABwg = [];

var num = 1000;
var noiseScale=850, noiseStrength=350;
var partifcles = [num];
let shapegraphic2; // متغیری برای ذخیره کد شیپ
 function setup() {
   
  createCanvas(800, 800);
  shipGraphic = createGraphics(800, 800); // ایجاد یک متغیر گرافیک برای نگهداری تصاویر شیپ ها
 shapegraphic2 = createGraphics(800, 800);
//  pixelDensity(2);
 // shipGraphic.pixelDensity(2);
 // shapegraphic2.pixelDensity(2);
   




 physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  let spacinga2 = 30;
  let totala2 = 30;
  for (let i = 0; i < totala2; i++) {
    //{!1} فاصله‌بندی ذرات را در امتداد محور x انجام می‌دهیم
    let lakht = new Shelal(800 / 2 + i * spacinga2, 0, 16);
    //{!1} ذره را به جهان فیزیکی اضافه می‌کنیم.
    physics.addParticle(lakht);
    //{!1} ذره را به آرایه اضافه می‌کنیم.
    shelal.push(lakht);
  }

  for (let i = 0; i < totala2 - 1; i++) {
    let spring = new VerletSpring2D(
      shelal[i],
      shelal[i + 1],
      spacinga2,
      0.2
    );
    physics.addSpring(spring);
  }

  shelal[0].lock();


   for (let i = 0; i < hl.random(10,50); i++) {
    let yotod = new Yotod();
    yoto.push(yotod);
  }

   for (let i = 0; i < hl.random(5,900); i++) {
let behkeh = new Behkeh();
  
behkehs.push(behkeh);
   

}
   
      for (let i=0; i<num; i++) {
    //x value start slightly outside the right of canvas, z value how close to viewer
        
    var loc = createVector(hl.random(0,width*1.2), hl.random(0,height), 2);
    var angle = 0; //any value to initialize
    var dir = createVector(cos(angle), sin(angle));
    var speed = hl.random(0.5,1);
        
    // var speed = random(5,map(mouseX,0,width,5,20));   // faster
    partifcles[i]= new Particle(loc, dir, speed);
  }   
    colors2 = hl.randomElement([colors_tone1,colors_tone2,colors_tone3,colors_tone4,colors_tone5,colors_tone6,colors_tone7,colors_tone8,colors_tonea1,colors_tonea2,colors_tonea3,colors_tonea4,colors_tonea5,colors_tonea6,colors_tonea7,colors_tonea8,colors_tonea9,colors_tonea10,colors_tonea11,colors_tonea12,colors_tonea13,colors_tonea14,colors_tonea15,colors_tonea16,colors_tonea17,colors_tonea18,colors_tonea19,colors_tonea20,colors_tonea21,colors_tonea22,colors_tonea23,colors_tonea24,colors_tonea25,colors_tonea26,colors_tonea27,colors_tonea28,colors_tonea29,colors_tone9, colors_tone10, colors_tone11, colors_tone12, colors_tone13,colors_tone14,colors_tone15,colors_tone16,colors_tone17,colors_tone18,colors_tone19,colors_tone20,colors_tone21,colors_tone22,colors_tone23,colors_tone24,colors_tone25,colors_tone26,colors_tone27,colors_tone28,colors_tone29 ,colors_b1,colors_b2,colors_b3,colors_b4,colors_b5,colors_b6,colors_b7,colors_b8,colors_b9,colors_b10,colors_b11,colors_b12,colors_b13,colors_b14,colors_b15,colors_b16,colors_b17,colors_b18,colors_b19,colors_b20,colors_b21,colors_b22,colors_b23 ]);
    colors3 = hl.randomElement([colors_tone9, colors_tone10, colors_tone11, colors_tone12, colors_tone13,colors_tone14,colors_tone15,colors_tone16,colors_tone17,colors_tone18,colors_tone19,colors_tone20,colors_tone21,colors_tone22,colors_tone23,colors_tone24,colors_tone25,colors_tone26,colors_tone27,colors_tone28,colors_tone29 ]);
    colors4 = hl.randomElement([ colors_b1,colors_b2,colors_b3,colors_b4,colors_b5,colors_b6,colors_b7,colors_b8,colors_b9,colors_b10,colors_b11,colors_b12,colors_b13,colors_b14,colors_b15,colors_b16,colors_b17,colors_b18,colors_b19,colors_b20,colors_b21,colors_b22,colors_b23]);
 
    colorset3[0] = hl.randomElement(colors4);
    colorset3[1] = hl.randomElement(colors4);
    colorset3[2] = hl.randomElement(colors4);
    colorset3[3] = hl.randomElement(colors4);
    colorset3[4] = hl.randomElement(colors4);
    colorset3[5] = hl.randomElement(colors4);
    colorset3[6] = hl.randomElement(colors4);
    colorset3[7] = hl.randomElement(colors4);
    colorset3[8] = hl.randomElement(colors4);
    colorset3[9] = hl.randomElement(colors4);
    colorset3[10] = hl.randomElement(colors4);
    colorset3[11] = hl.randomElement(colors4);
    colorset3[12] = hl.randomElement(colors4);
    colorset3[13] = hl.randomElement(colors4);
    colorset3[14] = hl.randomElement(colors4);
    colorset3[15] = hl.randomElement(colors4);
    colorset3[16] = hl.randomElement(colors4);
    colorset3[17] = hl.randomElement(colors4);
    colorset3[18] = hl.randomElement(colors4);
    colorset3[19] = hl.randomElement(colors4);
    colorset3[20] = hl.randomElement(colors4);
    colorset3[21] = hl.randomElement(colors4);
    
    
    
    colorset[0] = hl.randomElement(colors2);
    colorset[1] = hl.randomElement(colors2);
    colorset[2] = hl.randomElement(colors2);
    colorset[3] = hl.randomElement(colors2);
    colorset[4] = hl.randomElement(colors2);
    colorset[5] = hl.randomElement(colors2);
    colorset[6] = hl.randomElement(colors2);
    colorset[7] = hl.randomElement(colors2);

    colorset2[0] = hl.randomElement(colors2);
    colorset2[1] = hl.randomElement(colors2);
    colorset2[2] = hl.randomElement(colors2);
    colorset2[3] = hl.randomElement(colors2);
    colorset2[4] = hl.randomElement(colors2);
    colorset2[5] = hl.randomElement(colors2);
    colorset2[6] = hl.randomElement(colors2);
    colorset2[7] = hl.randomElement(colors2);
   
  
  colorbg = hl.randomElement(colors4);
  
  
  fill(colorset[8 % colorset.length]); 
  
      colors2 = hl.randomElement([c1,c2,c3,c4,c5,c6,c7,c8,c9,c10]);
      
    adad1 = hl.random(1600, 1800)
    adad2 = hl.random(100, 1800)
  adad3 = hl.random(1600, 1800)
   adad4= hl.random(60, 110)
   
   
   stroke(0)
   


  
  


   
   
   
  let xoff = 0.0;

  shipGraphic.noStroke();
  shipGraphic.noFill()
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
  vertex(x, y);
  xoff += 0.001;
}
  shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
   let staticBirdsCount = 2; // تعداد پرنده‌های ثابت در مرکز
  createStaticBirds(staticBirdsCount); // تولید پرنده‌های ثابت
  let randomBirdsCount = floor(hl.random(20, 170)); // تعداد پرنده‌های تصادفی
  for (let i = 0; i < randomBirdsCount; i++) {
    flock.push(new Bird(3, createVector(hl.random(0,800), hl.random(0,800)), createVector(hl.random(-1, 1), hl.random(-1, 1))));
  }

     

  
// ایجاد نخ‌های مختلف
for (let i = 0; i < hl.random(1,2); i++) {
let thread = new Thread();
threads.push(thread);
  
}
  for (let i = 0; i < hl.random(1,2); i++) {
let parandeh = new Parandeh();
parandehs.push(parandeh);



  }

    for (let i = 0; i < hl.random(20,500); i++) {
let kapa = new Kapa();
kapas.push(kapa);
}


    rectMode(CENTER);
  //background(255);
  frameRate(60);
  noStroke();
  fill(0);
  // ایجاد پرنده های مختلف
  for (let i = 0; i < hl.random(10, 240); i++) {
    let sito = new Sito();
    sitos.push(sito);
  }
   for (let i = 0; i < 100; i++) {
    let zito = new Zito();
    zitos.push(zito);
  }

  // ایجاد کانواس دوم برای نمایشگر جدید
  canvasp2 = createCanvas(800, 800);
  canvasp2.position(0, 0);
    
 for (let i = 0; i < hl.random(100,160); i++) {
    let x = hl.random(0,800);
    let y = hl.random(0,800);
    let colorIndex = colorset3[Math.floor(hl.random(0, colorset3.length))];
    let shapeIndex = floor(hl.randomBool(2));
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
  let pos = createVector(800 / 3, 800 / 3); // مکان اولیه پرنده‌های ثابت در مرکز صفحه
  let vel = createVector(0,0.002); // سرعت ثابت به سمت بالا
  for (let i = 0; i < count; i++) {
    flock.push(new Bird(5, pos, vel));
  }
   for (let i = 0; i < hl.random(1, 2); i++) {
    let jiko = new Jiko();
    jikos.push(jiko);
  }
      for (let i = 0; i < hl.random(1,500); i++) {
let tipa = new Tipa();
tipas.push(tipa);
}
 
}

let prevEgg;
let currentFunction;

  function randomColorhk(colorset) {
    return hl.randomElement(colorset);
  }
//Reflection,  BirdـandـTreeـConversation, Observation, TheـMoonـandـtheـBird,TheـMoonـandـtheـBird2, TakeـFlightـAlone,TakeـFlightـAlone2,Flyingـaboveـtheـclouds,Flyingـaboveـtheـclouds_2,Ab1,Ab2,Ab4,Ab5,Ab7,Ab8,Ab9,A12
  let CoK = [
 BirdـandـTreeـConversation
  ];
function barfi() {
  // رسم پرنده ها در نمایشگر اول

  //scale(0.5)
 background(colorbg);
 Flyingـaboveـtheـclouds()

 //TheـMoonـandـtheـBird()
    for (let i = 0; i < jikos.length; i++) {
    jikos[i].updates();
    jikos[i].displays();
  }

  strokeWeight(150)
  stroke(255)
  noFill()
  rect(400, 400, 800, 800); 
 
QW2q()
  fill(0, 60);
  noStroke();


  for (let i=0; i<partifcles.length; i++) {
    if (i > partifcles.length * ((window.__snow||{count:1}).count)) { partifcles[i].move(); partifcles[i].checkEdges(); continue; }
    partifcles[i].run();
  }
// filter(THRESHOLD)
 //  filter(ERODE);
   // filter(DILATE);
}



let numTreesQW2 =1;
let treeCounterQW2 = 0;
let drawTreeQW2 = true;


function QW2q() {

  QW2(shapegraphic2);
  image(shapegraphic2, 0, 0);
  

}

function QW2() {

   if (treeCounterQW2 >= numTreesQW2) {
 
      return;
 }




  let chosen = chooseRandomColor();
shapegraphic2.fill(chosen.colors[1])
 const dim = Math.max(width, height);
  shapegraphic2.strokeWeight(dim * 0.05);
 const r = dim * 0.3;

    // shapegraphic2.strokeWeight(generateNumbersAd2())//(200 );
     
     
    // shapegraphic2.noFill();
    
shapegraphic2.scale(0.5)

shapegraphic2.strokeWeight(dim * 0.00015);


 shapegraphic2.translate(800 / 2, 800 /0.98);
const QW2os = 40;
shapegraphic2.translate(800 / 2, 800 * 0.75);
let QW2bs = adad4;
let QW2v = getDir(0.5);
let QW2l = QW2v.x;
let QW2r = QW2v.y;
let QW2ts = 60;
let QW2nb = hl.random(2, 4);


  shapegraphic2.strokeWeight(QW2ts);
   shapegraphic2.stroke(0)
shapegraphic2.line(0, 0, 0, -QW2os);
shapegraphic2.translate(0, -QW2os);
multibranchQW2(QW2bs, QW2l, QW2r, QW2ts, QW2nb);
  
  
shapegraphic2.fill(240)
shapegraphic2.noStroke()
shapegraphic2.circle(0,adad1,3600)


shapegraphic2.fill(255)
shapegraphic2.circle(adad2-130,adad3,3600)
  
  shapegraphic2.fill(245)
shapegraphic2.circle(adad2,adad3,3600)

drawTreeQW2 = false;

 treeCounterQW2++;
 drawTreeQW2 = true;
}
function getDir(QW2p = 0.1) {
let QW2r = hl.random(0, 1);
let QW2lp = 1 - QW2p;
let QW2l = false;
let QW2ri = false;
if (QW2r >= QW2lp) {
QW2l = true;
} else if (QW2r <= QW2p) {
QW2l = true;
} else {
QW2l = true;
QW2ri = true;
 
}
return createVector(QW2l, QW2ri);
}
function drawbranchQW2(QW2th, QW2h, QW2thres, QW2ts, QW2bp) {
QW2ts *= hl.random(0.6, 0.9);
shapegraphic2.strokeWeight(QW2ts);
  let chosen = chooseRandomColor();
shapegraphic2.push();
shapegraphic2.rotate(-QW2th);
  shapegraphic2.strokeWeight(QW2ts/4);
  shapegraphic2.stroke(255,random(0,255))
  // shipGraphic.stroke(chosen.colors[6]);
  shapegraphic2.line(0+3, 0+3, 0+3, -QW2h*2);
   shapegraphic2.stroke(0)
  shapegraphic2.strokeWeight(QW2ts);
shapegraphic2.line(0, 0, 0, -QW2h);
shapegraphic2.translate(0, -QW2h);
shapegraphic2.push(); // شاخه دوم
shapegraphic2.rotate(radians(30));
const dim = Math.min(width, height);
//shapegraphic2.strokeWeight(dim * 0.010);
const r = dim * hl.random(3,8);

shapegraphic2.stroke(chosen.colors[1]);
     // // تنظیم حالت مخلوط کردن برای رنگ‌ها
      // shapegraphic2.line(hl.random(0,r), hl.random(0,r), hl.random(0,r), hl.random(0,r))
shapegraphic2.stroke(200);
      // shapegraphic2.line(hl.random(0,r), hl.random(0,r), hl.random(0,r), hl.random(0,r))

   //  shapegraphic2.noStroke();
    shapegraphic2.stroke(0);
  //shapegraphic2.line(hl.random(0,r), hl.random(0,r), hl.random(0,r), hl.random(0,r))
shapegraphic2.stroke(0);
 // shapegraphic2.line(hl.random(0,r), hl.random(0,r), hl.random(0,r), hl.random(0,r))
shapegraphic2.pop();
let QW2v = getDir();
let QW2l = QW2v.x;
let QW2r = QW2v.y;
branchQW2(QW2h, QW2l, QW2r, QW2thres, QW2ts, QW2bp);
shapegraphic2.pop();
}
function branchQW2(QW2h, QW2l, QW2r, QW2thres = 6, QW2ts = 3, QW2bp = []) {
let QW2a = hl.random(-30, 3);
let QW2s = 6;
let QW2t = radians(QW2a);
QW2h *= hl.random(0.7, 1);
let QW2i = QW2bp.length;
QW2bp[QW2i] = createVector(QW2bp[QW2i - 1].x + QW2h * cos(QW2t), QW2bp[QW2i - 1].y - QW2h * sin(QW2t));
 
if (QW2bp[QW2i].x > 0 && QW2bp[QW2i].y > 0) {
if (QW2h > QW2thres) {
if (QW2r) {
drawbranchQW2(QW2t, QW2h, QW2thres, QW2ts, QW2bp);
}
if (QW2l) {
drawbranchQW2(-QW2t, QW2h, QW2thres, QW2ts, QW2bp);
}
} else {

  let chosen = chooseRandomColor();
 
       // // تنظیم حالت مخلوط کردن برای رنگ‌ها
       
       shapegraphic2.noStroke();
      shapegraphic2.fill(255); // تنظیم رنگ پر
       shapegraphic2.circle(10, 0,  hl.random(1,2));
  shapegraphic2.stroke(255)
   shapegraphic2.strokeWeight(2)
         shapegraphic2.line(0, 0, hl.random(0, 20), hl.random(0, 50));
       // // تنظیم حالت مخلوط کردن برای دایره دوم
      shapegraphic2.fill(chosen.colors[4]); // تنظیم رنگ پر دایره دوم
     //  shapegraphic2.circle(0, 20, hl.random(1,10));
shapegraphic2.translate(0, -QW2h);
}
}
}
function multibranchQW2(QW2bs, QW2l, QW2r, QW2ts = hl.random(100, 600), QW2nb = hl.random(30, 200)) {
for (let i = 0; i <= QW2nb; i++) {
const QW2os = (20, 200);
let QW2bp = [];
QW2bp[0] = createVector(2000 / 2, 1000 - QW2os);
branchQW2(QW2bs, QW2l, QW2r, QW2thres = hl.random (10, 20), QW2ts = QW2ts, QW2bp);
}
}




class Particle{
  constructor(loc,dir,speed){
    this.loc = loc;
    this.dir = dir;
    this.speed = speed;
  	// var col;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }
  move(){
    let angle=PI 
    this.dir.x = cos(angle);
    this.dir.y = sin(angle)/2;
    var vel = this.dir.copy();
    var d =10;  //direction change 
    var S_ = window.__snow || { speed: 1, gust: 0, fall: 0 };
    vel.mult(this.speed*d*S_.speed); //vel = vel * (speed*d) — scaled by the sound
    vel.x += S_.gust * this.speed; vel.y += S_.fall * this.speed * 4;
    this.loc.add(vel); //loc = loc + vel
  }
  checkEdges(){
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (this.loc.x<0 || this.loc.x>800 || this.loc.y<0 || this.loc.y>800) {    
      this.loc.x = hl.random(0,800*1.2);
      this.loc.y = hl.random(0,800);
    }
  }
  update(){
    fill(255,random(100,245)*((window.__snow||{bright:1}).bright));
   // strokeWeight(hl.random(1,15))
    ellipse(this.loc.x, this.loc.y, this.loc.z*hl.random(1,3));
  }
}

 function draw() {
   
       

    const sizeCanvas = () => {
        const smallerEdge = Math.min(window.innerHeight, window.innerWidth);
        canvas.style.width = smallerEdge + 'px';
        canvas.style.height = smallerEdge + 'px';
    };
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);
 //pixelDensity(5);
    // تنظیمات نمایش والد بوم
    const parent = canvas.parentElement;
    parent.style.height = '100vh';
    parent.style.width = '100vw';
    parent.style.display = 'flex';
    parent.style.justifyContent = 'center';
    parent.style.alignItems = 'center';

  //access the pixel informationn of the image
//drawui()

barfi()


//QW1q()
    noStroke();
   //draw2qa()
//drawpar()
 }
 function drawui() {
   
    
  // berkeh()
   noStroke();
  
  
    if (!selectedFunction3) {
      selectedFunction3 = hl.randomElement(CoK);
    }
  
    selectedFunction3();
  
  
 
    noStroke();
  
  // تنظیم اندازه مستطیل با توجه به صفحه نمایش
  const rectWidth = Math.min(800) * 1;
  const rectHeight = Math.min( 800) * 1;

  // تنظیم رنگ پس زمینه
  //background(220);

  // تنظیم حالت مستطیل به مرکز
  rectMode(CENTER);

  // مختصات مرکز کانواس
  const centerX = 800 / 2;
  const centerY = 800 / 2;

  // مختصات بالا و چپ مستطیل
  const rectX = centerX - rectWidth / 1;
  const rectY = centerY - rectHeight / 1;

  // رسم مستطیل در مرکز کانواس
  stroke(255);
  strokeWeight(50);
  noFill();
  rect(centerX, centerY, rectWidth, rectHeight);
  noStroke();
  }
    let selectedFunction3 = null;



function Reflection() {
  //background(255); // پاک کردن فریم قبلی
 
  // رسم خطوط
  shipGraphic.stroke(1);
  shipGraphic.strokeWeight(hl.random(0.1, 2));
  //line(0, 120, windowWidth, 120);
 // line(0, 220, windowWidth, 220);

  // رسم پرنده ها در نمایشگر اول
  for (let i = 0; i < sitos.length; i++) {
    sitos[i].updates();
    sitos[i].displays();
  }

  // استفاده از کانواس دوم برای نمایشگر جدید
  shipGraphic.push();
  shipGraphic.drawingContext.setTransform(1, 0, 0, 1, 0, 0);
  shipGraphic.drawingContext.globalCompositeOperation = "source-over";
  shipGraphic.drawingContext.filter = "none";
  shipGraphic.pop();
  shipGraphic.image(canvasp2, 0, 0);
   let xoff = 0.0;

  shipGraphic.minDimension = min(width, height)
  shipGraphic.stroke(255);
  shipGraphic.sw = map(minDimension, 300, 1000, 200, 217)

  shipGraphic.fill(255)
  shipGraphic.noStroke();
//rect(windowWidth/4,windowHeight/3,300,300)
  shipGraphic.stroke(1)
  // رسم پرنده ها در نمایشگر جدید
  for (let i = 0; i < sitos.length; i++) {
    sitos[i].updates();
    sitos[i].displays();
  }
  
   
  shipGraphic.noStroke()
  rectMode(CENTER);
  
   //shipGraphic.stroke(randomColorhk(colorset));
   for (let i = 0; i < lines.length; i++) {
    let lineY = lines[i].y + lines[i].bend * zitos.length;
   // stroke(1);

//line(0, lineY, windowWidth, lineY);
    
    shipGraphic.strokeWeight(0.2)
    
    shipGraphic.line(0,120,800,120)
  shipGraphic.line(0,220,800,220)
    shipGraphic.noStroke()
//fill(colorset[3 % colorset.length]);
  shipGraphic.fill(255)
     

     //circle(windowWidth/2, windowHeight/2, 200);
 shipGraphic.fill(randomColorhk(colorset));
  shipGraphic.noFill()
     //fill(1)
     shipGraphic.stroke(colorset[2 % colorset.length]);
     shipGraphic.strokeWeight(0.2)

  
  
    
     // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, height, -PI / 6, PI / 6);

  // Draw the box
  shipGraphic.push();
  shipGraphic.translate(width / 2, boxY);
  shipGraphic.rotate(boxAngle);
  // fill(colorset2);

shipGraphic.noStroke();
  let isFalling = boxY + boxHeight / 2 > height;
  if (isFalling) {
    boxY = height - boxHeight / 3;
    boxY += (height - boxY) * gravity/0.1;
  }
   
  

  

  
 
 

shipGraphic.fill(255,255,255,255)

  
 
  

       



  shipGraphic.pop();
  
  shipGraphic.noStroke()
    
    
   yoff += 0.03;
  
  
 
  }
  for (let i = 0; i < zitos.length; i++) {
    zitos[i].update();
    zitos[i].display();
  }



  
  copy(shipGraphic, 0, 0, 800, 800, 0, 0, 800, 800);
  for (let i = 0; i < jikos.length; i++) {
    jikos[i].updates();
    jikos[i].displays();
  }

  QW1q()
  
}


function Freedom() {
 
 // background(255);
     rectMode(CENTER)

     //  fill(colorset[1 % colorset.length]); 



   
 // Draw the box
 

  
  push();
  translate(800 / 9, boxY/5);
  rotate(boxAngle);
  fill(0)
  //noFill(0,0,0,17)
 
  
 
  

  //stroke(1);
 // strokeWeight(random(0.1, 2));

  // Add new birds if there are less than 1200
  if (kito.length < 5) {
    let kita = new Kita();
    kito.push(kita);
  }

  
   noStroke()
  rectMode(CENTER)
  
    fill(colorset3[1 % colorset3.length]); 
  rect(800/2, 800/2, 800/2, 800/2);
       fill(colorset[2 % colorset.length]); 

 // rect(windowWidth / 2, windowHeight / 2, 400, 400);
  
    fill(colorset[1 % colorset.length]); 
  rectMode(CENTER)
  noStroke();
  stroke(0)
 // strokeWeight(15)
//rect(windowWidth/2,windowHeight/2,385,385) 
  
  
   let xoff = 0.0; 

//stroke(1,1,1,random(1,12))
  noStroke()
  let x2 = 800/2;
  let y2 = 800/2;
  
  // جابجایی بیضی با وزش باد
  let wind = (map(noise(xoff), 0, 1, -1, 1)) * __vizWind();
  xoff += frequency*10;
  x2 += wind;
  
    fill(colorset3[2 % colorset3.length]); 

  
  //fill(255,255,255,random(250,255)); 
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle);
    let yr = (r2 + distortion) * sin(angle);
    vertex(x2 + xr, y2 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  
  

  endShape(CLOSE);
  
  
  for (let i = 0; i < kito.length; i++) {
    kito[i].updates2();
    kito[i].displays2();
  fill(colors3[i % colors3.length]);


 
  // fill(colorbg);
noStroke();
 


  
    // keep inside the rectangle and bounce off the edges
    kito[i].bounceOffEdges();

    // If the bird is outside of the rectangle, move it inside the rectangle
    if (kito[i].pos.x < 800 / 2 - 200 - kito[i].size / 2) {
      kito[i].pos.x = 800 / 2 - 200 - kito[i].size / 2;
    }
    if (kito[i].pos.x > 800 / 2 + 200 + kito[i].size / 2) {
      kito[i].pos.x = 800 / 2 + 200 + kito[i].size / 2;
    }
    if (kito[i].pos.y < 800 / 2 - 200 - kito[i].size / 2) {
      kito[i].pos.y = 800 / 2 - 200 - kito[i].size / 2;
    }
    if (kito[i].pos.y > 800 / 2 + 200 + kito[i].size / 2) {
      kito[i].pos.y = 800 / 2 + 200 + kito[i].size / 2;
    }
     // rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);

  }
 

  
  
  
  
  
  
  
  
  
  
  
  
  strokeWeight(0.7)
 // stroke(0, 700);
  stroke(255, 255,255,hl.random(1,200));
 //noStroke();

noFill();
beginShape();
    //stroke(colors2[2 % colors2.length]);

vertex(controlPoints[0].x, controlPoints[0].y);
for (let i = 0; i < fitos.length; i++) {
let point = fitos[i].pos;
vertex(point.x, point.y);
}
vertex(controlPoints[5].x, controlPoints[5].y);
endShape();
  
for (let i = 0; i < fitos.length; i++) {
fitos[i].updates();
fitos[i].displays();
    //stroke(colors2[i % colors2.length]);
stroke(colors2[2 % colors2.length]);
  
}

    
  // Moving the fabric
  

  
  
  
}



function BirdـandـTreeـConversation() {
  //background(255);
  
   
   circlePos = createVector(800/2, 800/2.5);
    circleVel = createVector(0, 0);
    circleAcc = createVector(0, 0);
 let chosen = chooseRandomColor();
    fill(colorset[1 % colorset.length]); 
  rectMode(CENTER)
  noStroke();
  stroke(0)
 // strokeWeight(15)
//rect(windowWidth/2,windowHeight/2,385,385) 
  
  
   let xoff = 0.0; 

//stroke(1,1,1,random(1,12))
  noStroke()
  let x2 = 800/A2('k')+A2('k');
  let y2 = 800/A2('k'+A2('k'));
  
  // جابجایی بیضی با وزش باد
  let wind = (map(noise(xoff), 0, 1, -1, 1)) * __vizWind();
  xoff += frequency*2;
  x2 += wind;
  
    fill(colorset[3 % colorset.length]); 

  
  //fill(255,255,255,random(250,255)); 
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle);
    let yr = (r2 + distortion) * sin(angle);
    vertex(x2 + xr, y2 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  endShape(CLOSE);
  
  
  var x3 = 800/A2('k');
  var y3 = 800/A2('k');
  
  // جابجایی بیضی با وزش باد
  let wind2 = map(noise(xoff), 0, 1, -1, 1);
  xoff += frequency*2;
  x2 += wind;
  
  endShape(CLOSE);
  
  // رسم بیضی ژله‌ای
  //noStroke();
fill(colorset[6 % colorset.length]);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise)*2, 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle);
    let yr = (r2 + distortion) * sin(angle)/6;
    vertex(x3 + xr, y3 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  endShape(CLOSE);
  noStroke()
              
  // رسم خطوط
  stroke(1);
  strokeWeight( hl.random(0.1, 2));
  

  
  
  //line(0, 120, windowWidth, 120);
 // line(0, 220, windowWidth, 220);

  // رسم پرنده ها در نمایشگر اول
  for (let i = 0; i < jikos.length; i++) {
    jikos[i].updates();
    jikos[i].displays();
  }

  
   for (let i = 0; i < jikos.length; i++) {
    jikos[i].updates();
    jikos[i].displays();

  }
  
  



  stroke(chosen.colors[4]);
  
   noStroke()
  rectMode(CENTER);
  for(let i=0; i<2; i++){
    let rectX = circlePos.x-100; // تعیین موقعیت X تصادفی برای مستطیل
    let rectY =  circlePos.y; // تعیین موقعیت Y تصادفی برای مستطیل
    let rectW =  hl.random(1, 15); // تعیین عرض تصادفی برای مستطیل
    let rectH =  hl.random(1, 25); // تعیین ارتفاع تصادفی برای مستطیل
    fill(255)
    push(); // ذخیره موقعیت و زاویه قبلی
    translate(rectX, rectY-10); // منتقل کردن مبدا به مرکز مستطیل
    rotate(radians(45)); // تنظیم زاویه به ۴۵ درجه
    rect(0, 0, rectW, rectH); // رسم مستطیل
    pop(); // بازگشت به موقعیت و زاویه قبلی
  }
   fill(colorset[4 % colorset.length]); 
stroke(0)
  strokeWeight(1)
 // fill(255)
    beginShape();
vertex(-300, 800);
for (let x = 0; x <= 800+200; x += 3) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 1.8, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800+100);
endShape(CLOSE);
   //fill(chosen.colors[18]);
  // رسم پرنده ها در نمایشگر جدید
   yoff += 0.03;
QW2q()
}












function Observation() {
 
//background(random(colors));
 let chosen = chooseRandomColor();
  randomColor = chosen.name;
  
  
  
  
  
stroke(1,1,1,hl.random(1,12))
  
 
  
  
  
  
  
// background(chosen.colors[2]);
         fill(colorset[2 % colorset.length]); 
 rectMode(CENTER)
  
  noStroke()
 // fill(1,1,1,8)
 rect(0,0,800*2, 800*2);
    let x2 = 800/3;
  let y2 = 800/2;
  
  // جابجایی بیضی با وزش باد
  let wind = (map(noise(xoff), 0, 1, -1, 1)) * __vizWind();
  xoff += frequency;
  x2 += wind;
  
//fill(chosen.colors[8]);
  // رسم بیضی ژله‌ای
  //noStroke();
fill(colorset3[3 % colorset3.length]);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle)/2;
    let yr = (r2 + distortion) * sin(angle)/2;
    vertex(x2 + xr, y2 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  endShape(CLOSE);
 
  for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
       fill(colorset[i % colorset.length]); 

}
  
// نمایش هر نخ به صورت جداگانه
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
    
fill(colorset[i % colorset.length]); 
 let xoff = 0.0;
// line(xoff,yoff,windowWidth,220)
  

 // pop();

    noStroke();
    
beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
 
    
fill(255);
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
 
    
   
    
    
       // پخش فایل های صوتی به صورت لوپ


  // Draw the fabric
  fill(colorset[3 % colorset.length]); 

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);

 
fill(200)
    fill(colorset3[3 % colorset3.length]); 

   rect(boxWidth*9, boxHeight*10, boxWidth, 8*boxHeight);
  
    fill(colorset3[4 % colorset3.length]); 
     rect(boxWidth*9+5, boxHeight*10, boxWidth, 8*boxHeight);
     fill(255)  //  fill(colorset[3 % colorset.length]); 
 
    rect(boxWidth*9, boxHeight*6 , boxWidth/4,hl.random(10,45))
  noStroke();

    
    
    
      fill(255)  //  fill(colorset[3 % colorset.length]); 
rect(boxWidth*9, boxHeight*6 ,boxWidth/4,hl.random(10,20))
     fill(colorset3[3 % colorset3.length]); 
    rect(boxWidth*9-8, boxHeight*6 ,5,hl.random(10,40))
//  minDimension = min(width, height)
 // stroke(255);
//  sw = map(minDimension, 300, 1000, 2, 7)
    
    //  strokeWeight(random(sw, 5)); // changed from 2
     // for (let j = 0; j < yoff.length; j++) {
        // stroke( 255, 255,255, 14.03);


  // strokeWeight(sw); // changed from 2
 //let chosen = chooseRandomColor();
       fill(colorset[2 % colorset.length]); 
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800*2; x += 3) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 2.5, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);

  

}
  // Moving the fabric
  yoff += 0.03;


  
} 



function TheـMoonـandـtheـBird() {
 
  
  background(colorset);
 

   // Draw the lines

     for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
    shapes[i].display();
noStroke();
 }
  // fill(255,255,255,random(250,255)); 
 // circle(width / 3.4, height/ 2, boxWidth*random(1.01,1.1));

   let xoff = 0.0; 

     let chosen = chooseRandomColor();
//stroke(1,1,1,random(1,12))
  noStroke()
  let x2 = 800/2;
  let y2 = 800/2;
  
  // جابجایی بیضی با وزش باد
  let wind = (map(noise(xoff), 0, 1, -30, 30)) * __vizWind();
  xoff += frequency*2;
  x2 += wind;
  

  
  fill(255,255,255,hl.random(250,255)); 
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle)/3;
    let yr = (r2 + distortion) * sin(angle)/3;
    vertex(x2 + xr, y2 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  var x3 = 800/A2('k');
  var y3 = 800/A2('l');
  
  // جابجایی بیضی با وزش باد
  let wind2 = map(noise(xoff), 0, 1, -21, 21);
  xoff += frequency;
  x2 += wind;
  
  endShape(CLOSE);
  
  // رسم بیضی ژله‌ای
  //noStroke();
fill(colorset[1 % colorset.length]);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise)*2, 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle);
    let yr = (r2 + distortion) * sin(angle)/6;
    vertex(x3 + xr, y3 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  endShape(CLOSE);
  noStroke()
  
  
  
 
  
  
  fill(255,255,255,random(250,255)); 
  circle(-boxWidth / 2, -boxHeight * 2, boxWidth);
  
  
  
  
  
   
stroke(255, 255, 255);


   // Draw the fabric
  fill(colorset[4 % colorset.length]); 
strokeWeight(random(0.1,1.9));
 
  
beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  
  
  // Draw the fabric
  fill(colorset[3 % colorset.length]); 
    //stroke(colorset3[1 % colorset3.length]); 

strokeWeight(random(0.1,2.9));

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);


  
 
  
  
  

  
  
  fill(colorset[2 % colorset.length]); 
      stroke(255,255,255); 

strokeWeight(random(0.1,0.9));

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, height / 1.9, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
 strokeWeight(random(0.1,3.9));

 
  fill(colorset[8 % colorset.length]); 
  
strokeWeight(random(0.1,0.9));

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, height / 1.8, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  strokeWeight(random(0.1,3.9));
  

   // stroke(255, 255, 255,228);
 
noStroke();
   // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, height, -PI / 6, PI / 6);

  // Draw the box
 push();
translate(width / 2, boxY);
rotate(boxAngle);
fill(colorset3[1 % colorset3.length]); 
noStroke();
let isFalling = boxY + boxHeight / 2 > height;
if (isFalling) {
  boxY = height - boxHeight / 4;
  boxY += (height - boxY) * gravity*2; // doubled gravity
 
  }

  fill("#fff");
  circle(random(0,width),random(boxY/1,boxY/100),random(1,2))
 
  
   // fill(1,1,1,hl.random(1,10)); 

 // rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight+28);
  
 
for(let i=0; i<2; i++){
    let rectX = -boxWidth / 4.7; // تعیین موقعیت X تصادفی برای مستطیل
    let rectY =  -boxHeight * 4; // تعیین موقعیت Y تصادفی برای مستطیل
    let rectW = random(10, 35); // تعیین عرض تصادفی برای مستطیل
    let rectH = random(10, 45); // تعیین ارتفاع تصادفی برای مستطیل
//fill(colorset[2 % colorset.length]);
   fill(255)
    push(); // ذخیره موقعیت و زاویه قبلی
    translate(rectX, rectY-10); // منتقل کردن مبدا به مرکز مستطیل
    rotate(radians(45)); // تنظیم زاویه به ۴۵ درجه
    rect(0, 0, rectW, rectH); // رسم مستطیل
    pop(); // بازگشت به موقعیت و زاویه قبلی
  }

  pop();
  
  
  
  // Moving the fabric
  yoff += 0.005;
  noStroke();
}
function TakeـFlightـAlone() {
 // background(0);

  
      let xoff = 0.0;

  
  
   
      //df = map(mouseX, 0,255, 255, 255, 9);
      //cf = map(mouseX, 0,255, 255, 255, 255);
  
  
  
   rf = map(mouseX, 0, 600, 0, 255);
  bf = map(mouseX, 0, 600, 255, 0);
   let chosen = chooseRandomColor();
  shipGraphic.fill(chosen.colors[8]);
 fill(0,119,182,random(1,3));
  
         // fill(chosen.colors[10]);

//  rect(0, 0,windowWidth,windowHeight)
   minDimension = min(800, 800)
 // stroke(255);
  sw = map(minDimension, 300, 1000, 2, 217)
    
  
  
  
               let r9, g9, b9, d9;
do {
  r9 = hl.random(0,255);
  g9 = hl.random(0,255);
  b9 = hl.random(0,255);
  d9 = sqrt((r9 - 0) ** 2 + (g9 - 119) ** 2 + (b9 - 189) ** 2);
} while (d9 > 130);
noStroke()

  
    shipGraphic.stroke(255,255,255,12);
  shipGraphic.fill(r9, g9, b9, 3);
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 800/200);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 0.5, 800);
  vertex(x, y);
  xoff += 0.003;
}
  shipGraphic.vertex(0, 800/200);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  
  
  
  
  
    shipGraphic.noStroke();
  shipGraphic.fill(255,255,255,3)
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 800/100);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 2, 800);
  vertex(x, y);
  xoff += 0.003;


}
  shipGraphic.vertex(0, 800/100);
  shipGraphic.endShape(CLOSE);
  
  
  shipGraphic.noStroke();
  shipGraphic.fill(rf, 0, bf,5);
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 800/200);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 3, 800);
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, 800/200);
  shipGraphic.endShape(CLOSE);
  
  
 
  
  
  
    shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 4, 800);
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, 0);
  shipGraphic.endShape(CLOSE);
  
  let r2, g2, b2, d2;
do {
  r2 = hl.random(0,255);
  g2 = hl.random(0,255);
  b2 = hl.random(0,255);
  d2 = sqrt((r2 - 239) ** 2 + (g2 - 35) ** 2 + (b2 - 60) ** 2);
} while (d2 > 10);
noStroke()

    shipGraphic.stroke(1,1,1,12);
  shipGraphic.fill(r2, g2, b2, 5);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
  
  
    shipGraphic.stroke(1,1,1,14);
  shipGraphic.fill(255,255,255,2);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
   shipGraphic.stroke(1,1,1,16);
  shipGraphic.fill(chosen.colors[10]);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 2.1, 800);
  vertex(x, y);
  xoff += 0.0054;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
   shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 2.1, 800);
  vertex(x, y);
  xoff += 0.0043;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
   shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1.4, -height , 800);
  vertex(x, y);
  xoff += 0.0005;

}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  let r4, g4, b4, d4;
  do {
    r4 = hl.random(0,255);
    g4 = hl.random(0,255);
    b4 = hl.random(0,255);
    d4 = sqrt((r4 - 56) ** 2 + (g4 - 176) ** 2 + (b4 - 0) ** 2);
  } while (d4 > 10);
  noStroke()
  
    // ذخیره تصویر جدید شیپ
     shipGraphic.stroke(1, 1, 1, 20);
    shipGraphic. fill(colorset[2 % colorset.length]); 
    shipGraphic.beginShape();
    shipGraphic.vertex(0, 800);
  for (let x = 0; x <= 800; x += 3) {
    let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
    vertex(x, y);
    xoff += 0.0045;
  }
    shipGraphic.vertex(800, 800);
    shipGraphic.endShape(CLOSE);
  
  
  
  
  
  
  
              let r3, g3, b3, d3;
do {
  r3 = hl.random(0,255);
  g3 = hl.random(0,255);
  b3 = hl.random(0,255);
  d3 = sqrt((r3 - 204) ** 2 + (g3 - 255) ** 2 + (b3 - 51) ** 2);
} while (d3 > 20);
noStroke()
//fill(r3, g3, b3, 15);
  
 shipGraphic.stroke(1, 1, 1, 25);
  shipGraphic. fill(colorset[3 % colorset.length]); 
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
  vertex(x, y);
  xoff += 0.0045;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
 // fill(colorset3[1 % colorset3.length]);
  
 shipGraphic.stroke(1, 1, 1, 30);
 shipGraphic. fill(colorset[4 % colorset.length]); 
 shipGraphic.beginShape();
 shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
 let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
 vertex(x, y);
 xoff += 0.0045;
}
shipGraphic.vertex(800, 800);
 shipGraphic.endShape(CLOSE);
  
  
 
  
  
  

  
  
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // نمایش تصویر جدید شیپ در بکگراند
  copy(shipGraphic, 0, 0, 800, 800, 0, 0, 800, 800);
  
  
  
  
  
  

  
  
  yoff += 0.0129;
 
  
  
  
  
  for (let bird of flock) {
    bird.flock(flock);
    bird.update();
    bird.show();
  }
  
     boxY = map(noise(xoff, yoff), 0, 1, 800 / 3, 800)/1.7;
  // Calculate the box's angle based on its position
  boxAngle = 45;

  // Draw the box
  push();
  translate(800 / 2, boxY);
  rotate(boxAngle);
  // fill(colorset2);

noStroke();
  let isFalling = boxY + boxHeight / 2 > 800;
  if (isFalling) {
    boxY = 800 - boxHeight / 3;
    boxY += (800 - boxY) - gravity/1.8;
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
 // stroke(chosen.colors[8]);
//  fill(1)
stroke(colorset3[1 % colorset3.length]);
strokeWeight(this.size);
  
//stroke(255);
point(this.pos.x, this.pos.y);
}

update() {
this.vel.add(this.acc);
this.vel.limit(this.maxSpeed);
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
    this.size = size/hl.random(0.1,0.8);
    this.color = color;
    this.speed = hl.random(-4, 4);
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
strokeWeight(hl.random(0.001,0.009));
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
    this.size = size/hl.random(0.1,0.8);
    this.color = color;
    this.speed = hl.random(-2, 2);
  }
  
  

  
  
  
  move() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }
  
  display() {
    noStroke();
      let randomColor = colorset3[Math.floor(hl.random(0, colorset3.length))];
if (!this.previousColor) {
  this.previousColor = randomColor;
}
fill(this.previousColor);
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
this.pos = createVector(800/2, 800);
this.vel = createVector(hl.random(-2, 2), hl.random(-2, 2));
this.acc = createVector(0, 0);
this.size = hl.random(2, 2);
this.angle = hl.random(0,TWO_PI);
this.target = createVector(0, 0);
this.dist = hl.random(-5, 15);
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
    line(0, lineY, 800, lineY + curve * 800 / 10);

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
  if (this.pos.x < -this.size || this.pos.x > 800 + this.size ||
        this.pos.y < -this.size || this.pos.y > 800 + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = random(0, 800);
        this.pos.y = 800 / 1;
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
    let randomColor = colorset3[Math.floor(hl.random(0, colorset3.length))];
if (!this.previousColor) {
  this.previousColor = randomColor;
}
fill(this.previousColor);
rect(0, -5, this.size, hl.random(1,8));
  noStroke();
rect(0, -5, this.size, hl.random(1,8));
  pop();
}
}

 
  
let sw;
let minDimension;


class Thread {
  constructor() {
    // موقعیت اولیه و تنظیمات نخ
    this.pos = createVector( hl.random(0,800), hl.random(0,800));
    this.vel = createVector(hl.random(-2, 2), hl.random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = hl.random(3, 15);
    this.angle = hl.random(0,TWO_PI);
    this.target = createVector(0, 0);
    this.dist = hl.random(5, 50);
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
this.spring += hl.random(-0.001, 0.001);
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
    let randomColor = colorset3[Math.floor(hl.random(0, colorset3.length))];
if (!this.previousColor) {
  this.previousColor = randomColor;
}

  
  fill(0);

rect(1, -5, this.size, hl.random(1,10));
fill(this.previousColor);

rect(0, -5, this.size, hl.random(1,10));
  noStroke();
  fill(this.previousColor);
 // fill(255)  //  fill(colorset[3 % colorset.length]); 
rect(0, -5, this.size, hl.random(1,10));



 


pop();
}
}



class Jiko {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector( hl.random(0, width), hl.random(0, width));
    this.vel = createVector( hl.random(-2, 2),  hl.random(-2, 2));
    this.acc = createVector(0, 0);
    this.size =  hl.random(5, 15);
    this.angle =  hl.random(0,TWO_PI);
    this.target = createVector(0, 0);
    this.dist =  hl.random(0,5);
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
    rect(0, lineY, 800, lineY + curve * 800 / 8);

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

  this.spring +=  hl.random(-0.01, 0.01);
  this.spring = constrain(this.spring, 0.005, 0.03);
  if (this.pos.x < -this.size || this.pos.x > 800 + this.size ||
        this.pos.y < -this.size || this.pos.y > 800 + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x =  hl.random(0, 800);
        this.pos.y =  hl.random(0,800);
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

 rect(0, -75, this.size,  hl.random(1,10));
  noStroke();
   //  fill(colorset[3 % colorset.length]); 
    fill(colorset[2 % colorset.length]); 

rect(0, -5, this.size, hl.random(1,10));
  fill(255)
   rect(100, -150, this.size,  hl.random(1,30));
  noStroke();
   //  fill(colorset[3 % colorset.length]); 
  fill(1)
rect(150, -250, this.size,  hl.random(1,50));
  
  
  
  
  pop();
}
}



class Kita {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector(hl.random(0,800), hl.random(0,800)*2);
    this.vel = createVector(hl.random(-2, 2), hl.random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = hl.random(3, 15);
    this.angle = hl.randomBool(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = hl.random(10, 20);
    this.spring = 0.01;
    this.damping = 0.95;
    this.maxSpeed = 4;
             this.leftImage = false; 

  }
  keepInsideRect() {
    if (this.pos.x < 800/2 - 200) {
      this.pos.x = 800/2 - 200;
      this.vel.x *= -1;
    }
    if (this.pos.x > 800/2 + 200) {
      this.pos.x = 800/2 + 200;
      this.vel.x *= -1;
    }
    if (this.pos.y < 800/2 - 200) {
      this.pos.y = 800/2 - 200;
      this.vel.y *= -1;
    }
    if (this.pos.y > 800/2 + 200) {
      this.pos.y = 800/2 + 200;
      this.vel.y *= -1;
    }
  }
  bounceOffEdges() {
    if (this.pos.x < 800 + this.size/2 || this.pos.x > 800/2  - this.size/2) {
      this.vel.x *= 300;
    }
    if (this.pos.y < 800+ this.size/2 || this.pos.y > 800/2  - this.size/2) {
      this.vel.y *= 300;
   
    }
  }

newPosition() {
  let position;
  let edge = floor(hl.random(0,4));
  switch (edge) {
    case 0:
      position = createVector(hl.random(0,800), -this.size);
      break;
    case 1:
      position = createVector(hl.random(0,800), 800 + this.size);
      break;
    case 2:
      position = createVector(-this.size, hl.random(0,800));
      break;
    case 3:
      position = createVector(windowWidth + this.size, hl.random(0,800));
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
  
  

       this.spring += hl.random(-0.01, 0.01);
  this.spring = constrain(this.spring, 0.005, 0.03);
  if (this.pos.x < -this.size || this.pos.x > 800 + this.size ||
        this.pos.y < -this.size || this.pos.y > 800 + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = hl.random(0, 800);
        this.pos.y = hl.random(0,800);
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

 rect(0, -5, hl.random(1,10), hl.random(1,10));
  noStroke();
   //  fill(colorset[3 % colorset.length]); 
rect(0, -5, hl.random(1,10), hl.random(1,10));
  pop();
}
}

class Fito {
constructor() {
this.pos = createVector(hl.random(0, width), height /1);
this.vel = createVector(hl.random(-2, 2), hl.random(-2, 2));
this.acc = createVector(0, 0);
this.size = hl.random(1, 4);
this.angle = hl.random(0, TWO_PI);
this.target = createVector(0, 0);
this.dist = hl.random(1, 50);
this.spring = 0.01;
this.damping = 0.95;
this.maxSpeed = 4;
this.controlPoints = [this.pos];
for (let i = 0; i < 1; i++) {
this.controlPoints.push(
createVector(hl.random(0, width), hl.random(0, height))
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
controlPoint.y = constrain(controlPoint.y, 0, 800);
}
}
displayBezierCurve() {
noFill();
  let randomColor = colorset3[Math.floor(hl.random(0, colorset3.length))];
if (!this.previousColor) {
  this.previousColor = randomColor;
}
fill(this.previousColor);
strokeWeight(0.2);
stroke(this.previousColor);
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
  let randomColor = colorset3[Math.floor(hl.random(0, colorset3.length))];
if (!this.previousColor) {
  this.previousColor = randomColor;
}
fill(this.previousColor);
rect(0,-10, A2('k')*4,A2('k')*4);
  //fill(1,1,1,255)
 // noStroke();
fill(this.previousColor);
rect(0,-10, A2('k')*2,A2('k')*2);
//rect(0, -5, this.size, random(20, 20));
pop();
}
}
// helper function to calculate Bezier curve

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
    this.pos = createVector(random(0, 800),random(0, 800));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = random(3, 15);
    this.angle = random(HALF_PI);
    this.target = createVector(0, 0);
    this.dist = random(0.1, 100);
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
    this.angle += 0;
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
  if (this.pos.x < -this.size || this.pos.x > 800 + this.size ||
        this.pos.y < -this.size || this.pos.y > 800 + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = random(0, 800);
        this.pos.y = random(0, 800);
        this.leftImage = false;
      }, 3);
    }
}

displays() {
 // this.sitOnLine(120);
 // this.sitOnLine(220);
   let chosen = chooseRandomColor();

 
  shipGraphic.push();
  shipGraphic.translate(this.pos.x, this.pos.y);
  shipGraphic.rotate(this.vel.heading());
   shipGraphic.noStroke();
 
  
//fill(chosen.colors[8]);
  shipGraphic.fill(chosen.colors[1]);
  shipGraphic.noStroke();

  shipGraphic.rect(0, 0, this.size, random(1800,2440));
shipGraphic.fill(chosen.colors[6]);
    shipGraphic.noStroke();

  //shipGraphic.rect(100, -225, this.size, random(10,400));
 //shipGraphic.rect(0, -5, this.size, random(1,100));
  shipGraphic.fill(chosen.colors[5]);
  shipGraphic.fill(255,10);
  shipGraphic.noStroke();

shipGraphic.rect(0, 0, this.size/10, random(1800,2440));
   //  fill(colorset[3 % colorset.length]); 
  shipGraphic.fill(chosen.colors[4]);
  shipGraphic.noStroke();

shipGraphic.rect(-50, -150, this.size/10, random(1800,2440));


  shipGraphic.pop();
}
}

class Zito {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector(random(0,800), random(0, 800));
    this.vel = createVector(random(-2, 2), 0);
    this.acc = createVector(0, 0);
    this.size = random(3, 15);
    this.angle = random(TWO_PI);
    this.target = createVector(0, 0);
    this.dist = random(1, 4);
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
   // let curve = 0.1 * (1 - distance / (this.size * 2));
   // line(0, lineY, windowWidth, lineY + curve * windowHeight / 2);

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
  
  // this.sitOnLine(120);
 /// this.sitOnLine(220);
  
shipGraphic.push();
shipGraphic.translate(this.pos.x, this.pos.y);
shipGraphic.rotate(this.vel.heading());

noStroke();
let randomColor = colorset3[Math.floor(hl.random(0, colorset3.length))];
if (!this.previousColor) {
  this.previousColor = randomColor;
}
//shipGraphic.fill(this.previousColor);
  let chosen = chooseRandomColor();
  shipGraphic.fill(chosen.colors[8]);
 shipGraphic.fill(chosen.colors[1]);
  shipGraphic.noStroke();

  shipGraphic.rect(10, 0, this.size/10, random(1800,2440));
shipGraphic.fill(chosen.colors[2]);
    shipGraphic.noStroke();

  //shipGraphic.rect(100, -225, this.size, random(10,400));
 //shipGraphic.rect(0, -5, this.size, random(1,100));
  shipGraphic.fill(chosen.colors[3]);
  shipGraphic.fill(255,10);
  shipGraphic.noStroke();

shipGraphic.rect(10, 0, this.size/10, random(1800,2440));
   //  fill(colorset[3 % colorset.length]); 
  shipGraphic.fill(chosen.colors[4]);
  shipGraphic.noStroke();

shipGraphic.rect(-50, -150, this.size/10, random(1800,2440));

shipGraphic.pop();
}
}


function TheـMoonـandـtheـBird2() {
   
  background(colorset);
    let xoff = 0.0; 


   // Draw the lines

     for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
    shapes[i].display();
noStroke();
 }
  // fill(255,255,255,random(250,255)); 
 // circle(width / 3.4, height/ 2, boxWidth*random(1.01,1.1));


     let chosen = chooseRandomColor();
//stroke(1,1,1,random(1,12))
  noStroke()
  let x2 = 800/2;
  let y2 = 800/2;
  
  // جابجایی بیضی با وزش باد
  let wind = (map(noise(xoff), 0, 1, -30, 30)) * __vizWind();
  xoff += frequency*2;
  x2 += wind;
  

  
  fill(255,255,255,hl.random(250,255)); 
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle)/3;
    let yr = (r2 + distortion) * sin(angle)/3;
    vertex(x2 + xr, y2 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  var x3 = 800/A2('k');
  var y3 = 800/A2('l');
  
  // جابجایی بیضی با وزش باد
  let wind2 = map(noise(xoff), 0, 1, -21, 21);
  xoff += frequency;
  x2 += wind;
  
  endShape(CLOSE);
  
  // رسم بیضی ژله‌ای
  //noStroke();
fill(colorset[1 % colorset.length]);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise)*2, 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle);
    let yr = (r2 + distortion) * sin(angle)/6;
    vertex(x3 + xr, y3 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  endShape(CLOSE);
  noStroke()
  
  
  
 
  
  
  fill(255,255,255,random(250,255)); 
  circle(-boxWidth / 2, -boxHeight * 2, boxWidth);
  
  
  
  
  
   
stroke(255, 255, 255);


   // Draw the fabric
  fill(colorset3[4 % colorset3.length]); 
strokeWeight(random(0.1,1.9));
 
  
beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 2, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  
  
  // Draw the fabric
  fill(colorset[3 % colorset.length]); 
    //stroke(colorset3[1 % colorset3.length]); 

strokeWeight(random(0.1,2.9));

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 2, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);


  
 
  
  
  

  
  
  fill(colorset[2 % colorset.length]); 
      stroke(255,255,255); 

strokeWeight(random(0.1,0.9));

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 1.9, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
 strokeWeight(random(0.1,3.9));

 
  fill(colorset[8 % colorset.length]); 
  
strokeWeight(random(0.1,0.9));

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 1.8, 8);00
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  strokeWeight(random(0.1,3.9));
  

   // stroke(255, 255, 255,228);

  
  
stroke(0); 
  
beginShape();
vertex(0, 800);
for (let x = 0; x <= 800*2; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 2.5, 800);
  vertex(x, y);
  xoff += 0.003;

  // تولید ۱۰۰ نقطه رندم بر روی لبه شیپ
  for (let i = 0; i < 5; i++) {
    let pointX = hl.random(x-3, x);
    let pointY = map(noise(pointX, yoff), 0, 1, 800 / 1.5, 800);

    // تنظیم ضخامت خطوط
    if (i < 0.1) {
      strokeWeight(0.1);
    } else if (i < 10) {
      strokeWeight(0.2);
    } else {
     
      strokeWeight(0.3);
    }

    // چرخش خطوط مماس
    let angle = hl.random(-PI/2, PI/3);
    push();
    translate(pointX, pointY);
    rotate(angle);
    line(-10, 0, 800/5, 0);
    pop();
  }
}
vertex(800, 800);
endShape(CLOSE);
  
  stroke(colorset2[4 % colorset2.length]); 
  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800*2; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 2.5, 800);
  vertex(x, y);
  xoff += 0.003;

  // تولید ۱۰۰ نقطه رندم بر روی لبه شیپ
  for (let i = 0; i < 5; i++) {
    let pointX = hl.random(x-3, x);
    let pointY = map(noise(pointX, yoff), 0, 1, 800 / 1.5, 800);

    // تنظیم ضخامت خطوط
    if (i < 0.1) {
      strokeWeight(1);
    } else if (i < 10) {
      strokeWeight(0.2);
    } else {
     
      strokeWeight(0.3);
    }

    // چرخش خطوط مماس
    let angle = hl.random(-PI/2, PI/3);
    push();
    translate(pointX, pointY);
    rotate(angle);
    line(-10, 0, 800/5, 0);
    pop();
  }
}
vertex(800, 800);
endShape(CLOSE);

   
noStroke();
   // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, height, -PI / 6, PI / 6);

  // Draw the box
 push();
translate(width / 2, boxY);
rotate(boxAngle);
fill(colorset3[1 % colorset3.length]); 
noStroke();
let isFalling = boxY + boxHeight / 2 > height;
if (isFalling) {
  boxY = height - boxHeight / 4;
  boxY += (height - boxY) * gravity*2; // doubled gravity
 
  }

  fill("#fff");
  circle(random(0,width),random(boxY/1,boxY/100),random(1,2))
 
  
   // fill(1,1,1,hl.random(1,10)); 

 // rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight+28);
  
 
for(let i=0; i<2; i++){
    let rectX = -boxWidth / 4.7; // تعیین موقعیت X تصادفی برای مستطیل
    let rectY =  -boxHeight * 4; // تعیین موقعیت Y تصادفی برای مستطیل
    let rectW = random(10, 35); // تعیین عرض تصادفی برای مستطیل
    let rectH = random(10, 45); // تعیین ارتفاع تصادفی برای مستطیل
//fill(colorset[2 % colorset.length]);
   fill(0)
    push(); // ذخیره موقعیت و زاویه قبلی
    translate(rectX, rectY-10); // منتقل کردن مبدا به مرکز مستطیل
    rotate(radians(45)); // تنظیم زاویه به ۴۵ درجه
    rect(0, 0, rectW, rectH); // رسم مستطیل
    fill(255)
      rect(0+1, 0, rectW, rectH); // رسم مستطیل

  pop(); // بازگشت به موقعیت و زاویه قبلی
  }

  pop();
  // Moving the fabric
  yoff += 0.005;
  noStroke();
}
function TakeـFlightـAlone2() {
 // background(0);

 
      let xoff = 0.0;

  
  background(colorset);
   
      //df = map(mouseX, 0,255, 255, 255, 9);
      //cf = map(mouseX, 0,255, 255, 255, 255);
  
  
  
   rf = map(mouseX, 0, 600, 0, 255);
  bf = map(mouseX, 0, 600, 255, 0);
   let chosen = chooseRandomColor();
 fill(0,119,182,random(1,3));
  
         // fill(chosen.colors[10]);

//  rect(0, 0,windowWidth,windowHeight)
   minDimension = min(800, 800)
 // stroke(255);
  sw = map(minDimension, 300, 1000, 2, 217)
    
  
  
  
               let r9, g9, b9, d9;
do {
  r9 = hl.random(0,255);
  g9 = hl.random(0,255);
  b9 = hl.random(0,255);
  d9 = sqrt((r9 - 0) ** 2 + (g9 - 119) ** 2 + (b9 - 189) ** 2);
} while (d9 > 130);
noStroke()

  
    shipGraphic.stroke(255,255,255,12);
  shipGraphic.fill(r9, g9, b9, 3);
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 800/200);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 0.5, 800);
  vertex(x, y);
  xoff += 0.003;
}
  shipGraphic.vertex(0, 800/200);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  
  
  
  
  
    shipGraphic.noStroke();
  shipGraphic.fill(255,255,255,3)
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 800/100);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 2, 800);
  vertex(x, y);
  xoff += 0.003;


}
  shipGraphic.vertex(0, 800/100);
  shipGraphic.endShape(CLOSE);
  
  
  shipGraphic.noStroke();
  shipGraphic.fill(rf, 0, bf,5);
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 800/200);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 3, 800);
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, 800/200);
  shipGraphic.endShape(CLOSE);
  
  
 
  
  
  
    shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 4, 800);
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, 0);
  shipGraphic.endShape(CLOSE);
  
  let r2, g2, b2, d2;
do {
  r2 = hl.random(0,255);
  g2 = hl.random(0,255);
  b2 = hl.random(0,255);
  d2 = sqrt((r2 - 239) ** 2 + (g2 - 35) ** 2 + (b2 - 60) ** 2);
} while (d2 > 10);
noStroke()

    shipGraphic.stroke(1,1,1,12);
  shipGraphic.fill(r2, g2, b2, 5);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
  
  
    shipGraphic.stroke(1,1,1,14);
  shipGraphic.fill(255,255,255,2);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
   shipGraphic.stroke(1,1,1,16);
  shipGraphic.fill(chosen.colors[10]);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 2.1, 800);
  vertex(x, y);
  xoff += 0.0054;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
   shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 2.1, 800);
  vertex(x, y);
  xoff += 0.0043;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
   shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1.4, -800 , 800);
  vertex(x, y);
  xoff += 0.0005;

}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  let r4, g4, b4, d4;
  do {
    r4 = hl.random(0,255);
    g4 = hl.random(0,255);
    b4 = hl.random(0,255);
    d4 = sqrt((r4 - 56) ** 2 + (g4 - 176) ** 2 + (b4 - 0) ** 2);
  } while (d4 > 10);
  noStroke()
  
    // ذخیره تصویر جدید شیپ
     shipGraphic.stroke(1, 1, 1, 20);
    shipGraphic. fill(colorset[2 % colorset.length]); 
    shipGraphic.beginShape();
    shipGraphic.vertex(0, 800);
  for (let x = 0; x <= 800; x += 3) {
    let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
    vertex(x, y);
    xoff += 0.0045;
  }
    shipGraphic.vertex(800, 800);
    shipGraphic.endShape(CLOSE);
  
   shipGraphic.stroke(colorset3[8 % colorset3.length]);
shipGraphic.beginShape();
shipGraphic.vertex(0, 800);

// تعداد نقاط رندم
const numPoints = 2;

// اندازه ضخامت خطوط رندم
const minWeight = 0.1;
const maxWeight = 0.9;

for (let x = 0; x <= 800*3; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 1.1, 800);
 shipGraphic.vertex(x, y);
  xoff += 0.3;

  // انتخاب نقاط رندم بر روی لبه شیپ
  for (let i = 0; i < numPoints; i++) {
    const px = x + random(-1, 1) * 3;
    const py = y + random(-1, 1) * 10;

    // محاسبه زاویه خط مماس با استفاده از تابع noise()
    const angle = noise(px, py) * TWO_PI;

    // محاسبه مختصات نقطه پایانی خط مماس
    const len = random(1, 230);
    const tx = px + len * cos(angle);
    const ty = py + len * sin(angle);

    // تنظیم ضخامت خطوط رندم
    const weight = random(minWeight, maxWeight);
   shipGraphic.strokeWeight(weight);

    // رسم خط مماس
    shipGraphic.line(px, py, tx, ty);
  }
}
shipGraphic.vertex(800, 800);
shipGraphic.endShape(CLOSE);
  
  
  
  
  
              let r3, g3, b3, d3;
do {
  r3 = hl.random(0,255);
  g3 = hl.random(0,255);
  b3 = hl.random(0,255);
  d3 = sqrt((r3 - 204) ** 2 + (g3 - 255) ** 2 + (b3 - 51) ** 2);
} while (d3 > 20);
noStroke()
//fill(r3, g3, b3, 15);
 
  
  
 shipGraphic.stroke(1, 1, 1, 25);
  shipGraphic. fill(colorset[3 % colorset.length]); 
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
  vertex(x, y);
  xoff += 0.0045;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
 // fill(colorset3[1 % colorset3.length]);
  
 shipGraphic.stroke(1, 1, 1, 30);
 shipGraphic. fill(colorset[4 % colorset.length]); 
 shipGraphic.beginShape();
 shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
 let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
 vertex(x, y);
 xoff += 0.0045;
}
shipGraphic.vertex(800, 800);
 shipGraphic.endShape(CLOSE);
  
  
 
  
  
  

  
  
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // نمایش تصویر جدید شیپ در بکگراند
  copy(shipGraphic, 0, 0, 800, 800, 0, 0, 800, 800);
  
  
  
  //stroke(255);
  //stroke(0,0,0,30)
  

  


  
  
  yoff += 0.0129;
 
  
  
  
  
  for (let bird of flock) {
    bird.flock(flock);
    bird.update();
    bird.show();
  }
  
     boxY = map(noise(xoff, yoff), 0, 1, 800 / 3, 800)/1.7;
  // Calculate the box's angle based on its position
  boxAngle = 45;

  // Draw the box
  push();
  translate(800 / 2, boxY);
  rotate(boxAngle);
  // fill(colorset2);

noStroke();
  let isFalling = boxY + boxHeight / 2 > 800;
  if (isFalling) {
    boxY = 800 - boxHeight / 3;
    boxY += (800 - boxY) - gravity/1.8;
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


function Flyingـaboveـtheـclouds1() {
 // background(0);
   
  
      let xoff = 0.0;

  
  
   
      //df = map(mouseX, 0,255, 255, 255, 9);
      //cf = map(mouseX, 0,255, 255, 255, 255);
  
  
  
   rf = map(mouseX, 0, 600, 0, 255);
  bf = map(mouseX, 0, 600, 255, 0);
   let chosen = chooseRandomColor();

  
  
  fill(0,119,182,random(1,3));
  
         // fill(chosen.colors[10]);

  rect(0, 0,800,800)
   minDimension = min(800, 800)
 // stroke(255);
  sw = map(minDimension, 300, 1000, 2, 217)
    
  
  
  
               let r9, g9, b9, d9;
do {
  r9 = hl.random(0,255);
  g9 = hl.random(0,255);
  b9 = hl.random(0,255);
  d9 = sqrt((r9 - 0) ** 2 + (g9 - 119) ** 2 + (b9 - 189) ** 2);
} while (d9 > 130);
noStroke()

  
    shipGraphic.stroke(255,255,255,30); 
  shipGraphic.fill(r9, g9, b9, 3);
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 800/200);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 0.5, 800);
  vertex(x, y);
  xoff += 0.003;
}
  shipGraphic.vertex(0, 800/200);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  
  
  
  
  
    shipGraphic.noStroke();
  shipGraphic.fill(255,255,255,30); 
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 800/100);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 2, 800);
  vertex(x, y);
  xoff += 0.003;


}
  shipGraphic.vertex(0, 800/100);
  shipGraphic.endShape(CLOSE);
  
  
  shipGraphic.noStroke();
  shipGraphic.fill(rf, 0, bf,5);
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 800/200);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 3, 800);
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, 800/200);
  shipGraphic.endShape(CLOSE);
  
  
 
  
  
  
    shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape();
  shipGraphic.vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 4, 800);
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, 0);
  shipGraphic.endShape(CLOSE);
  
  let r2, g2, b2, d2;
do {
  r2 = hl.random(0,255);
  g2 = hl.random(0,255);
  b2 = hl.random(0,255);
  d2 = sqrt((r2 - 239) ** 2 + (g2 - 35) ** 2 + (b2 - 60) ** 2);
} while (d2 > 10);
noStroke()

    shipGraphic.stroke(255,255,255,30); 
  shipGraphic.fill(r2, g2, b2, 5);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
  
  
    shipGraphic.stroke(255,255,255,30); 
 shipGraphic. fill(255,255,255,30); 
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
   shipGraphic.stroke(255,255,255,30); 
 shipGraphic. fill(255,255,255,80); 
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.0054;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
   shipGraphic.noStroke();
 shipGraphic. fill(255,255,255,50); 
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.0043;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
   shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1.4, -height , 800);
  vertex(x, y);
  xoff += 0.0005;

}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  let r4, g4, b4, d4;
  do {
    r4 = hl.random(0,255);
    g4 = hl.random(0,255);
    b4 = hl.random(0,255);
    d4 = sqrt((r4 - 56) ** 2 + (g4 - 176) ** 2 + (b4 - 0) ** 2);
  } while (d4 > 10);
  noStroke()
  
    // ذخیره تصویر جدید شیپ
     shipGraphic.stroke(255,255,255,30); 
 shipGraphic. fill(255,255,255,30); 
    shipGraphic.beginShape();
    shipGraphic.vertex(0, 800);
  for (let x = 0; x <= 800; x += 3) {
    let y = map(noise(xoff, yoff), 0, 1, height / 1.4, 800);
    vertex(x, y);
    xoff += 0.0045;
  }
    shipGraphic.vertex(800, 800);
    shipGraphic.endShape(CLOSE);
  
  
  

  
  
  
              let r3, g3, b3, d3;
do {
  r3 = hl.random(0,255);
  g3 = hl.random(0,255);
  b3 = hl.random(0,255);
  d3 = sqrt((r3 - 204) ** 2 + (g3 - 255) ** 2 + (b3 - 51) ** 2);
} while (d3 > 20);
noStroke()
//fill(r3, g3, b3, 15);
  
 shipGraphic.stroke(255,255,255,30); 
 shipGraphic. fill(255,255,255,20); 
  shipGraphic.beginShape();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.4, 800);
  vertex(x, y);
  xoff += 0.0045;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
 // fill(colorset3[1 % colorset3.length]);
  
 shipGraphic.stroke(255,255,255,30); 
 shipGraphic. fill(255,255,255,10); 
 shipGraphic.beginShape();
 shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
 let y = map(noise(xoff, yoff), 0, 1, height / 1.4, 800);
 vertex(x, y);
 xoff += 0.0045;
}
shipGraphic.vertex(800, 800);
 shipGraphic.endShape(CLOSE);
  
  
 
  
  

  
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // نمایش تصویر جدید شیپ در بکگراند
  copy(shipGraphic, 0, 0, 800, 800, 0, 0, 800, 800);
  
 
  

  
  
  yoff += 0.0129;
 
  
  
  
  
 let mouse = createVector(mouseX, mouseY);
  for (let i = 0; i < kapas.length; i++) {
    let distFromMouse = p5.Vector.dist(mouse, kapas[i].pos);
    let mouseForce = createVector(0, 0);
    if (distFromMouse < 60) {
      mouseForce = p5.Vector.sub(mouse, kapas[i].pos);
      mouseForce.mult(-20);
    }
    kapas[i].applyForce(mouseForce);
    kapas[i].update();
    kapas[i].display();
      fill(colors2[i % colors2.length]);

  }
   
  

  

  
 
 

  //fill(colorset3[1 % colorset3.length]);
  //fill(255,255,255,238)




  



  
      noFill()
  stroke(255)
  strokeWeight(50)
  noStroke()
  
  
  rectMode(CENTER)
  
  noStroke()
 // fill(1,1,1,8)
 rect(0,0,windowWidth*2, windowHeight*2);
  
  
   new Image()
}



function Flyingـaboveـtheـclouds() { __waveFrame();
 // background(0);
   
  
      let xoff = 0.0;

  
  
   
      //df = map(mouseX, 0,255, 255, 255, 9);
      //cf = map(mouseX, 0,255, 255, 255, 255);
  
  
  
   rf = map(mouseX, 0, 600, 0, 255);
  bf = map(mouseX, 0, 600, 255, 0);
   let chosen = chooseRandomColor();

  
  
  fill(0,119,182,random(1,3));
  
         // fill(chosen.colors[10]);

  rect(0, 0,800,800)
   minDimension = min(800, 800)
 // stroke(255);
  sw = map(minDimension, 300, 1000, 2, 217)
    
  
  
  
               let r9, g9, b9, d9;
do {
  r9 = hl.random(0,255);
  g9 = hl.random(0,255);
  b9 = hl.random(0,255);
  d9 = sqrt((r9 - 0) ** 2 + (g9 - 119) ** 2 + (b9 - 189) ** 2);
} while (d9 > 130);
noStroke()

  
    shipGraphic.stroke(255,255,255,30); 
  shipGraphic.fill(r9, g9, b9, 3);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(800, 800/200);
for (let x = 800; x >= 0; x -= 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 0.5, 800));
  vertex(x, y);
  xoff += 0.003;
}
  shipGraphic.vertex(0, 800/200);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  
  
  
  
  
    shipGraphic.noStroke();
  shipGraphic.fill(255,255,255,30); 
    shipGraphic.fill(chosen.colors[2]);

  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(800, 800/100);
for (let x = 800; x >= 0; x -= 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 2, 800));
  vertex(x, y);
  xoff += 0.003;


}
  shipGraphic.vertex(0, 800/100);
  shipGraphic.endShape(CLOSE);
  
  
  shipGraphic.noStroke();
  shipGraphic.fill(rf, 0, bf,5);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(800, 800/200);
for (let x = 800; x >= 0; x -= 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 3, 800));
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, 800/200);
  shipGraphic.endShape(CLOSE);
  
  
 
  
  
  
    shipGraphic.noStroke();
  shipGraphic.stroke(chosen.colors[6]);
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 4, 800));
  vertex(x, y);
  xoff += 0.003;

}
 shipGraphic.vertex(0, 0);
  shipGraphic.endShape(CLOSE);
  
  let r2, g2, b2, d2;
do {
  r2 = hl.random(0,255);
  g2 = hl.random(0,255);
  b2 = hl.random(0,255);
  d2 = sqrt((r2 - 239) ** 2 + (g2 - 35) ** 2 + (b2 - 60) ** 2);
} while (d2 > 10);
noStroke()

    shipGraphic.stroke(255,255,255,30); 
  shipGraphic.stroke(chosen.colors[6]);
  shipGraphic.fill(r2, g2, b2, 5);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 800/4 , 800));
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  //  shipGraphic.stroke(255,255,255,30); 
 shipGraphic. fill(255,255,255,30); 
  shipGraphic.stroke(chosen.colors[8]);
    shipGraphic.fill(chosen.colors[4]);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, 800/4 , 800));
  vertex(x, y);
  xoff += 0.0033;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
   shipGraphic.stroke(0,70); 
 shipGraphic. fill(255,255,255,10); 
//  pGraphic. fill(255,255,255,50); 
       shipGraphic.stroke(chosen.colors[2]);
   shipGraphic.fill(chosen.colors[5]);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1,800/2.1, 800));
  vertex(x, y);
  xoff += 0.0054;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
   shipGraphic.noStroke();
 shipGraphic. fill(255,255,255,50); 
       shipGraphic.stroke(chosen.colors[9]);
     shipGraphic.fill(chosen.colors[6]);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1,800/2.1, 800));
  vertex(x, y);
  xoff += 0.0043;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
   shipGraphic.noStroke();
  shipGraphic.fill(chosen.colors[8]);
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1.4, -height , 800));
  vertex(x, y);
  xoff += 0.0005;

}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
  
  
  let r4, g4, b4, d4;
  do {
    r4 = hl.random(0,255);
    g4 = hl.random(0,255);
    b4 = hl.random(0,255);
    d4 = sqrt((r4 - 56) ** 2 + (g4 - 176) ** 2 + (b4 - 0) ** 2);
  } while (d4 > 10);
  noStroke()
  
    // ذخیره تصویر جدید شیپ
     shipGraphic.stroke(255,255,255,30); 
 shipGraphic. fill(255,255,255,30); 
    shipGraphic.beginShape(); __waveNext();
    shipGraphic.vertex(0, 800);
  for (let x = 0; x <= 800; x += 3) {
    let y = __wave(x, map(noise(xoff, yoff), 0, 1, height / 1.4, 800));
    vertex(x, y);
    xoff += 0.0045;
  }
    shipGraphic.vertex(800, 800);
    shipGraphic.endShape(CLOSE);
  
  
  
  
  
  
  
              let r3, g3, b3, d3;
do {
  r3 = hl.random(0,255);
  g3 = hl.random(0,255);
  b3 = hl.random(0,255);
  d3 = sqrt((r3 - 204) ** 2 + (g3 - 255) ** 2 + (b3 - 51) ** 2);
} while (d3 > 20);
noStroke()
//fill(r3, g3, b3, 15);
  
 shipGraphic.stroke(255,255,255,30); 
 shipGraphic. fill(255,255,255,20); 
  shipGraphic.beginShape(); __waveNext();
  shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = __wave(x, map(noise(xoff, yoff), 0, 1, height / 1.4, 800));
  vertex(x, y);
  xoff += 0.0045;
}
 shipGraphic.vertex(800, 800);
  shipGraphic.endShape(CLOSE);
  
  
 // fill(colorset3[1 % colorset3.length]);
  
 shipGraphic.stroke(255,255,255,30); 
 shipGraphic. fill(255,255,255,10); 
 shipGraphic.beginShape(); __waveNext();
 shipGraphic.vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
 let y = __wave(x, map(noise(xoff, yoff), 0, 1, height / 1.4, 800));
 vertex(x, y);
 xoff += 0.0045;
}
shipGraphic.vertex(800, 800);
 shipGraphic.endShape(CLOSE);
  
  
 
  
  

  
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // نمایش تصویر جدید شیپ در بکگراند
  copy(shipGraphic, 0, 0, 800, 800, 0, 0, 800, 800);
  
 
  

  
  
  yoff += 0.00429;
 
  
  
  
  

  

  

  
 
 

  //fill(colorset3[1 % colorset3.length]);
  //fill(255,255,255,238)




  



  
      noFill()
  stroke(255)
  strokeWeight(50)
  noStroke()
  
  
  rectMode(CENTER)
  
  noStroke()
 // fill(1,1,1,8)
 rect(0,0,windowWidth*2, windowHeight*2);
  
  
   new Image()
}

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
    this.pos = createVector(hl.random(0,width ), hl.random(0,height ));
    this.vel = createVector(hl.random(-2, 2), hl.random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = hl.random(3, 15);
    this.angle = hl.random(0,TWO_PI);
    this.target = createVector(0, 0);
    this.dist = hl.random(10, 50);
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
this.spring += hl.random(-0.001, 0.001);
this.spring = constrain(this.spring, 0.005, 0.05);
}

display() {

// نمایش نخ
  push();
translate(this.pos.x, this.pos.y);
rotate(this.vel.heading());
rect(0, -5, this.size, hl.random(1,10));
 //rect(width/2,height/2, this.size, random(0.1,5.5));
    line(0, 0, this.size, hl.random(1,15));
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

function Flyingـaboveـtheـclouds_2() {
 // background(0);

   background(colorbg);
     let chosen = chooseRandomColor();
  
      let xoff = 0.0;

  strokeWeight(1)
fill(255,hl.random(230,255))
circle(400, 200, 200);
   
      //df = map(mouseX, 0,255, 255, 255, 9);
      //cf = map(mouseX, 0,255, 255, 255, 255);
  
  
  
   rf = map(mouseX, 0, 600, 0, 255);
  bf = map(mouseX, 0, 600, 255, 0);

  
  
  fill(0,119,182,random(1,3));
  
         // fill(chosen.colors[10]);

  rect(0, 0,800,800)
   minDimension = min(800, 800)
 // stroke(255);
  sw = map(minDimension, 300, 1000, 2, 217)
    
  
  fill(255,hl.random(0,5))
circle(400, 200, 200);
  
               let r9, g9, b9, d9;
do {
  r9 = hl.random(0,255);
  g9 = hl.random(0,255);
  b9 = hl.random(0,255);
  d9 = sqrt((r9 - 0) ** 2 + (g9 - 119) ** 2 + (b9 - 189) ** 2);
} while (d9 > 130);
noStroke()

  
   fill(255,255,255,30); 

  
  
  
  
  

  
 
  
  let r2, g2, b2, d2;
do {
  r2 = hl.random(0,255);
  g2 = hl.random(0,255);
  b2 = hl.random(0,255);
  d2 = sqrt((r2 - 239) ** 2 + (g2 - 35) ** 2 + (b2 - 60) ** 2);
} while (d2 > 10);
noStroke()
strokeWeight(1)
  // stroke(255,255,255,30); 
 //fill(r2, g2, b2, 5);

  fill(255,hl.random(0,5))
circle(400, 200, 200);
  
  strokeWeight(1)
  
   // stroke(255,255,255,30); 
fill(255,255,255,30); 
 beginShape();
  vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.0033;
}
 vertex(800, 800);
 endShape(CLOSE);
  
  strokeWeight(1)
  // stroke(255,255,255,30); 
 fill(255,255,255,80); 
 beginShape();
 vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.0054;
}
 vertex(800, 800);
 endShape(CLOSE);
   noStroke();
 fill(255,255,255,50); 
beginShape();
  vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.0043;
}
 vertex(800, 800);
  endShape(CLOSE);
 fill(255,hl.random(0,5))
circle(400, 200, 200);
   noStroke();
  
  fill(chosen.colors[8]);
 beginShape();
 vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1.4, -800 , 800);
  vertex(x, y);
  xoff += 0.0005;

}
 vertex(800, 800);
  endShape(CLOSE);
  
 fill(255,hl.random(0,255))
circle(400, 200, 200);
  
  
  let r4, g4, b4, d4;
  do {
    r4 = hl.random(0,255);
    g4 = hl.random(0,255);
    b4 = hl.random(0,255);
    d4 = sqrt((r4 - 56) ** 2 + (g4 - 176) ** 2 + (b4 - 0) ** 2);
  } while (d4 > 10);
  noStroke()
  strokeWeight(1)
    // ذخیره تصویر جدید شیپ
   //  stroke(255,255,255,30); 
 fill(255,255,255,30); 
    beginShape();
   vertex(0, 800);
  for (let x = 0; x <= 800; x += 3) {
    let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
    vertex(x, y);
    xoff += 0.0045;
  }
   vertex(800, 800);
    endShape(CLOSE);
  
  
  
  
  
  
  
              let r3, g3, b3, d3;
do {
  r3 = hl.random(0,255);
  g3 = hl.random(0,255);
  b3 = hl.random(0,255);
  d3 = sqrt((r3 - 204) ** 2 + (g3 - 255) ** 2 + (b3 - 51) ** 2);
} while (d3 > 20);
noStroke()
//fill(r3, g3, b3, 15);
  strokeWeight(1)
// stroke(255,255,255,30); 
fill(255,255,255,20); 
 beginShape();
  vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
  vertex(x, y);
  xoff += 0.0045;
}
vertex(800, 800);
  endShape(CLOSE);
  
  strokeWeight(1)
 // fill(colorset3[1 % colorset3.length]);
  
// stroke(255,255,255,30); 
 fill(255,255,255,10); 
 beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
 let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
 vertex(x, y);
 xoff += 0.0045;
}
vertex(800, 800);
endShape(CLOSE);
  
  
 
  
  

  
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


  
  
  
  // نمایش تصویر جدید شیپ در بکگراند
 // copy(shipGraphic, 0, 0, 800, 800, 0, 0, 800, 800);
  
 
  

  
  
  yoff += 0.009;

stroke(255, 120);


  // ترسیم دایره ای در نقطه مماس
 strokeWeight(random(0.1, 0.5));

strokeWeight(1)



 

strokeWeight(1)
  
  noStroke()
  
 let mouse = createVector(mouseX, mouseY);
  for (let i = 0; i < tipas.length; i++) {
    let distFromMouse = p5.Vector.dist(mouse, tipas[i].pos);
    let mouseForce = createVector(0, 0);
    if (distFromMouse < 60) {
      mouseForce = p5.Vector.sub(mouse, tipas[i].pos);
      mouseForce.mult(-20);
    }
    tipas[i].applyForce(mouseForce);
    tipas[i].update();
    tipas[i].display();
      fill(colors2[i % colors2.length]);

  }
   
  

  

  
 
 

  //fill(colorset3[1 % colorset3.length]);
  //fill(255,255,255,238)




  
      noFill()
  stroke(255)
  strokeWeight(50)
  noStroke()
  
  
  rectMode(CENTER)
  
  noStroke()
 // fill(1,1,1,8)
 rect(0,0,windowWidth*2, windowHeight*2);
  
  
 
  
  
 strokeWeight(1)
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

 

function A12() {
//background(random(colors));
  background(colorbg);
  
  
  
 // fill(1,1,1,8)
 // rect(0,0,windowWidth, windowHeight);
   
 
  for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
}
  
// نمایش هر نخ به صورت جداگانه
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
    
fill(colorset[i % colorset.length]); 
 let xoff = 0.0;
// line(xoff,yoff,windowWidth,220)
  

 // pop();

   // Draw the fabric
//  fill(colors);

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
 
    
fill(255);
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
 
    
   
    
    
       // پخش فایل های صوتی به صورت لوپ


  // Draw the fabric
  fill(colorset[3 % colorset.length]); 

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);

 

      fill(colorset[8 % colorset.length]); 

  // Moving the box
  // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, height, -PI / 6, PI / 6);

  // Draw the box
  push();
  translate(width / 2, boxY);
  rotate(boxAngle);
noStroke();
 fill(colorset[9 % colorset.length]); 
   // rect(-boxWidth / 2, -boxHeight / 2, boxWidth*1.1, boxHeight);

    
         stroke(colorset[8 % colorset.length]); 

   // rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
    
    
   

    
  pop();
  minDimension = min(width, height)
 // stroke(255);
  sw = map(minDimension, 300, 1000, 2, 7)
    
      strokeWeight(random(sw, 5)); // changed from 2
     // for (let j = 0; j < yoff.length; j++) {
         stroke( 255, 255,255, 14.03);


  // strokeWeight(sw); // changed from 2
fill(colorbg);
   beginShape();
vertex(0, 800);
for (let x = 0; x <= width*2; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);

  

}
  // Moving the fabric
  yoff += 0.03;


  
} 
 


function A10() {
//background(random(colors));
 let chosen = chooseRandomColor();
  randomColor = chosen.name;
// background(chosen.colors[2]);
         fill(colorset[2 % colorset.length]); 
 rectMode(CENTER)
  
  
 // fill(1,1,1,8)
 rect(0,0,windowWidth*2, windowHeight*2);
   
 
  for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
       fill(colorset[i % colorset.length]); 

}
  
// نمایش هر نخ به صورت جداگانه
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
    
fill(colorset[i % colorset.length]); 
 let xoff = 0.0;
// line(xoff,yoff,windowWidth,220)
  

 // pop();

    rectMode(CENTER);
   // Draw the fabric
//  fill(colors);
    if (isRectVisible) {
    noFill();
  stroke(color(255, 255, 255));

 
}
    noStroke();
    
beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
 
    
fill(255);
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
 
    
   
    
    
       // پخش فایل های صوتی به صورت لوپ


  // Draw the fabric
  fill(colorset[3 % colorset.length]); 

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);

 

      fill(colorset[8 % colorset.length]); 

  // Moving the box
  // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, height, -PI / 4, PI / 4);

  // Draw the box
  push();
  translate(width / 2, boxY);
  rotate(boxAngle);
noStroke();
 fill(colorset[9 % colorset.length]); 
   // rect(-boxWidth / 2, -boxHeight / 2, boxWidth*1.1, boxHeight);

    
         //stroke(colorset[8 % colorset.length]); 
fill(0)
    rect(width/4 , -boxHeight/3.5 , boxWidth, boxHeight);
  
     fill(255)  //  fill(colorset[3 % colorset.length]); 
 
    rect(width/4 ,  -boxHeight+20 , random(7, 14),random(10,45))
  noStroke();
  fill(255)  //  fill(colorset[3 % colorset.length]); 
rect(width/4,  -boxHeight+20 ,random(7, 14),random(10,20))
    
   

    
  pop();
//  minDimension = min(width, height)
 // stroke(255);
//  sw = map(minDimension, 300, 1000, 2, 7)
    
    //  strokeWeight(random(sw, 5)); // changed from 2
     // for (let j = 0; j < yoff.length; j++) {
        // stroke( 255, 255,255, 14.03);


  // strokeWeight(sw); // changed from 2
 //let chosen = chooseRandomColor();
       fill(colorset[2 % colorset.length]); 
   beginShape();
vertex(0, 800);
for (let x = 0; x <= width*2; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2.5, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);

  

}
  // Moving the fabric
  yoff += 0.03;


  
} 
  
  let isRectVisible = true;




function Ab9() {
//background(random(colors));
 let chosen = chooseRandomColor();

customStroke(0,boxHeight*4,width,boxHeight*4,1)

  
  
  
 

 let xoff = 0.0;
  
  

            let r, g, b, d;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 239) ** 2 + (g - 35) ** 2 + (b - 60) ** 2);
} while (d > 10);
noStroke()
fill(r, g, b, 5);
  
            //fill(chosen.colors[15]);
stroke(0, (W - t) / 3, W, 4)
  strokeWeight(5)
  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.000033;
}
vertex(800, 800);
endShape(CLOSE);
  strokeWeight(2)
 

            fill(chosen.colors[12]);


 fill(255,255,255,random(1,6))
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.000054;
}
vertex(800, 800);
endShape(CLOSE);
  
              fill(chosen.colors[10]);

  customStroke(0,boxHeight*3,width,boxHeight*3,1)

 minDimension = min(width, height)
 stroke(255,255,255,28);
  sw = map(minDimension, 255, 255, 2, 17)
stroke(0, (W - t) / 3, W, 4)
  strokeWeight(2.10)
  

    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.000043;
}
vertex(800, 800);
endShape(CLOSE);
   

  
             // fill(chosen.colors[8]);

   
            let r3, g3, b3, d3;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 204) ** 2 + (g - 255) ** 2 + (b - 51) ** 2);
} while (d > 20);
  stroke(255,255,255,20)
fill(r, g, b, 6);
  
  
 ///customStroke(0,boxHeight*3,width,boxHeight*3,1)
noStroke()

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.4, 800);
  vertex(x, y);
  xoff += 0.0000045;
}
vertex(800, 800);
endShape(CLOSE);
  noStroke()
              let r4, g4, b4, d4;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 56) ** 2 + (g - 176) ** 2 + (b - 0) ** 2);
} while (d > 10);
noStroke()
fill(r, g, b, 2);
 
noStroke()
  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.4, 800);
  vertex(x, y);
  xoff += 0.000001;
}
vertex(800, 800);
endShape(CLOSE);
  
  noStroke()
   
 ///////// 
  
 
  
             // fill(chosen.colors[6]);
              let r2, g2, b2, d2;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 0) ** 2 + (g - 40) ** 2 + (b - 85) ** 2);
} while (d > 30);
//fill(r, g, b, 3);
  
 fill(chosen.colors[12]);

   beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, -650.5, 800);
  vertex(x, y);
  xoff += 0.00003;
}
vertex(0, 0);
endShape(CLOSE); 
  
noStroke()
             fill(chosen.colors[4]);


    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/29.1, 800);
  vertex(x, y);
  xoff += 0.00003;
}
vertex(0, 0);
endShape(CLOSE);
  
  
  
  
             fill(chosen.colors[2]);

  
 
  

    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 32.8, 800);
  vertex(x, y);
  xoff += 0;
}
vertex(0, 0);
endShape(CLOSE);
  
  
  
              fill(chosen.colors[20]);
//customStroke(0,yoff,xoff,yoff,10000)
   // fill(255,255,255,random(1,2))
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 12.4, 800);
  vertex(x, y);
  xoff += 0;
  

}
vertex(0, 0);
endShape(CLOSE);
 
 
  
  
  
  

   
beginShape();
vertex(0, 800);
for (let x = 0; x <= width*2; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 0.8, 800);
  vertex(x, y);
  xoff += 0.0003;
stroke(0,0,0,random(0,120))
  // تولید ۱۰۰ نقطه رندم بر روی لبه شیپ
  for (let i = 0; i < 1; i++) {
    let pointX = random(x-3, x);
    let pointY = map(noise(pointX, yoff), 0, 1, height / random(0.8,2.1), 800);

    // تنظیم ضخامت خطوط
    if (i < 0.1) {
      strokeWeight(1);
    } else if (i < 400) {
      strokeWeight(0.2);
    } else {
      strokeWeight(0.3);
    }
    // چرخش خطوط مماس
    let angle = random(-PI/2, PI/3);
    push();
    translate(pointX, pointY);
    rotate(angle);
    line(-10, 0, height/random(100,5.5), 0);
noStroke()

    pop();
  }
}
vertex(800, 800);
endShape(CLOSE);
  
  
  

  
  
  
  
  
fill(255,255,255,random(4,30))
      //fill(colorset[8 % colorset.length]); 
  stroke(255,255,255,random(4,30))
  strokeWeight(0.6)
   rect(0, boxHeight*3, width*2, 0.1);
  noStroke();

  fill(255)  //  fill(colorset[3 % colorset.length]); 
 
    rect(boxWidth*6, boxHeight*2.9 , boxWidth/4,random(10,45))
  
  noStroke();
  fill(255)  //  fill(colorset[3 % colorset.length]); 
rect(boxWidth*6, boxHeight*2.9 ,boxWidth/4,random(10,20))
  
   
  
  // new Image()

 
   yoff += 0.0009;
  //customStroke(0,boxHeight*3,width,boxHeight*3,1)


}
 let re=[]
const W = 800
const t= 0
const WHalf = W / 2

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




let behkehs = [];


function Ab8() {
  
  
 // background(colorbg);
  
  /////
  
  
 let chosen = chooseRandomColor();
    fill(colorset[1 % colorset.length]); 
  rectMode(CENTER)
  noStroke();
  stroke(0)
 // strokeWeight(15)
//rect(windowWidth/2,windowHeight/2,385,385) 
  
  
   let xoff = 0.0; 

//stroke(1,1,1,random(1,12))
  noStroke()
  let x2 = 800/A2('k')+A2('k');
  let y2 = 800/A2('k'+A2('k'));
  
  // جابجایی بیضی با وزش باد
  let wind = (map(noise(xoff), 0, 1, -1, 1)) * __vizWind();
  xoff += frequency*2;
  x2 += wind;
  
    fill(colorset[3 % colorset.length]); 

  
  //fill(255,255,255,random(250,255)); 
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle);
    let yr = (r2 + distortion) * sin(angle)/4;
    vertex(x2 + xr, y2 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  endShape(CLOSE);
  
  
  var x3 = 800/A2('k');
  var y3 = 800/A2('k');
  
  // جابجایی بیضی با وزش باد
  let wind2 = map(noise(xoff), 0, 1, -1, 1);
  xoff += frequency*2;
  x2 += wind;
  
  endShape(CLOSE);
  
  // رسم بیضی ژله‌ای
  //noStroke();
fill(colorset[6 % colorset.length]);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise)*2, 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle);
    let yr = (r2 + distortion) * sin(angle)/6;
    vertex(x3 + xr, y3 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  endShape(CLOSE);
  noStroke()
              
  // رسم خطوط
  stroke(1);
  strokeWeight( hl.random(0.1, 2));
  

  
  
  //line(0, 120, windowWidth, 120);
 // line(0, 220, windowWidth, 220);

  // رسم پرنده ها در نمایشگر اول
 
  
  



  stroke(chosen.colors[4]);
  
   noStroke()
  rectMode(CENTER);

   fill(colorset[4 % colorset.length]); 
stroke(0)
  strokeWeight(1)
 // fill(255)

   //fill(chosen.colors[18]);
  // رسم پرنده ها در نمایشگر جدید
   yoff += 0.03;
  
  /////
//background(random(colors));

 circlePos = createVector(800/2, 800/2.5);
    circleVel = createVector(0, 0);
    circleAcc = createVector(0, 0);
  
 



  

    
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
    
fill(colorset[i % colorset.length]); 
  }
 
  

  


  
  
  
  
   
 ///////// 
  
  
             // fill(chosen.colors[6]);

  

     

  
  
berkeh()
  noStroke()
  

  

  fill(colorset3[3 % colorset3.length]);
  
//fill(0)
      //fill(colorset[8 % colorset.length]); 
//fill(0)
  stroke(0)
  strokeWeight(1)
   rect(0, boxHeight*3, width*2, 0.1);
  noStroke()
  
  
  fill(colorset[3 % colorset.length]);
  
    //fill(0)  //  fill(colorset[3 % colorset.length]); 
 
    rect(boxWidth*3, boxHeight*2.9 , boxWidth/4,random(10,45))
  noStroke();
 // fill(0)  //  fill(colorset[3 % colorset.length]); 
fill(colorset[2 % colorset.length]);
  rect(boxWidth*3, boxHeight*2.9 ,boxWidth/4,random(10,20))
  
  
  // fill(0)  //  fill(colorset[3 % colorset.length]); 
 fill(colorset[2 % colorset.length]);
    rect(boxWidth*3.4, boxHeight*2.9 , boxWidth/4,random(10,45))
  noStroke();
  fill(0)  //  fill(colorset[3 % colorset.length]); 

   fill(colorset[2 % colorset.length]);
  rect(boxWidth*3.4, boxHeight*2.9 ,boxWidth/4,random(10,20))
  
  
  
     fill(255)  //  fill(colorset[3 % colorset.length]); 
 
    rect(boxWidth*9, boxHeight*2.9 , boxWidth/4,random(10,45))
  noStroke();
  fill(255)  //  fill(colorset[3 % colorset.length]); 
rect(boxWidth*9, boxHeight*2.9 ,boxWidth/4,random(10,20))
  
  minDimension = min(width, height)
 // //stroke(255);
  sw = map(minDimension, 300, 1000, 2, 7)
 //drawAB1g()

   yoff += 0.001;

}
function Ab18() {
//background(random(colors));
 let chosen = chooseRandomColor();
  randomColor = chosen.name;
background(colorbg);
 let xoff = 0.0;

  
            let r, g, b, d;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 239) ** 2 + (g - 35) ** 2 + (b - 60) ** 2);
} while (d > 10);
noStroke()
fill(r, g, b, 1);
  fill(colorset3[3 % colorset3.length]);
            //fill(chosen.colors[15]);

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/1.5 , 800);
  vertex(x, y);
  xoff += 0.0009;
}
vertex(800, 800);
endShape(CLOSE);


            fill(chosen.colors[12]);

  
 // fill(255,255,255,56)
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 3.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
              fill(chosen.colors[10]);

  

  


  
   for (let i = 0; i < jikos.length; i++) {
    jikos[i].updates();
    jikos[i].displays();

  }
  
  noStroke();
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
  
  
             // fill(chosen.colors[8]);

   
            let r3, g3, b3, d3;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 204) ** 2 + (g - 255) ** 2 + (b - 51) ** 2);
} while (d > 20);
noStroke()
fill(r, g, b, 255);
  fill(colorset3[5 % colorset3.length]);
  
  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.4, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
              let r4, g4, b4, d4;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 56) ** 2 + (g - 176) ** 2 + (b - 0) ** 2);
} while (d > 10);
noStroke()
fill(r, g, b, 255);
  
  fill(colorset3[3 % colorset3.length]);
  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.4, 800);
  vertex(x, y);
  xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  
  
  
   
 ///////// 
  
  
             // fill(chosen.colors[6]);
              let r2, g2, b2, d2;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 0) ** 2 + (g - 40) ** 2 + (b - 85) ** 2);
} while (d > 30);
noStroke()
//fill(r, g, b, 3);
  
 fill(chosen.colors[12]);
  
   beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, -650.5, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE); 
  

             fill(chosen.colors[4]);

  
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/29.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE);
  
  
  
  
             fill(chosen.colors[2]);

  
  

  
  
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 32.8, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE);
  
  
  
              //fill(chosen.colors[20]);

    fill(255,255,255,random(1,2))

  
  
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 12.4, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE);
  fill(colorset3[3 % colorset3.length]);
  
//fill(0)
      //fill(colorset[8 % colorset.length]); 

   rect(0, boxHeight*3, width*2, 0.1);
  
  
  
  fill(colorset3[3 % colorset3.length]);
  
    //fill(0)  //  fill(colorset[3 % colorset.length]); 
 
    rect(boxWidth*4, boxHeight*2.9 , boxWidth/4,random(10,45))
  noStroke();
 // fill(0)  //  fill(colorset[3 % colorset.length]); 
fill(colorset3[3 % colorset3.length]);
  rect(boxWidth*4, boxHeight*2.9 ,boxWidth/4,random(10,20))
  
  
  // fill(0)  //  fill(colorset[3 % colorset.length]); 
 fill(colorset3[3 % colorset3.length]);
    rect(boxWidth*4.4, boxHeight*2.9 , boxWidth/4,random(10,45))
  noStroke();
  fill(0)  //  fill(colorset[3 % colorset.length]); 

   fill(colorset3[3 % colorset3.length]);
  rect(boxWidth*4.4, boxHeight*2.9 ,boxWidth/4,random(10,20))
  
  
  
     fill(255)  //  fill(colorset[3 % colorset.length]); 
 
    rect(boxWidth*6, boxHeight*2.9 , boxWidth/4,random(10,45))
  noStroke();
  fill(255)  //  fill(colorset[3 % colorset.length]); 
rect(boxWidth*6, boxHeight*2.9 ,boxWidth/4,random(10,20))
  
  minDimension = min(width, height)
 // //stroke(255);
  sw = map(minDimension, 300, 1000, 2, 7)
 drawAB1g()
   yoff += 0.001;
}



let yoto = [];

function Ab7() {

  
 let chosen = chooseRandomColor();
  randomColor = chosen.name;
 mouseClicked() 
 let xoff = 0.0;
   background(colorbg);
//fill(colorset[2 % colorset.length]); 

  
             // fill(chosen.colors[8]);
    let x2 = 800/A2('k'*0.25);
  let y2 = 800/A2('k'*15);
  
  // جابجایی بیضی با وزش باد
  let wind = (map(noise(xoff), 0, 1, -1, 1)) * __vizWind();
  xoff += frequency;
  x2 += wind;
  
//fill(chosen.colors[8]);
  // رسم بیضی ژله‌ای
  //noStroke();
fill(colorset3[3 % colorset3.length]);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xnoise = map(cos(angle), -1, 1, 0, 3);
    let ynoise = map(sin(angle), -1, 1, 0, 3);
    let distortion = map(noise(xoff + xnoise, yoff + ynoise), 0, 1, -amplitude, amplitude);
    let xr = (r2 + distortion) * cos(angle)/2;
    let yr = (r2 + distortion) * sin(angle)/2;
    vertex(x2 + xr, y2 + yr);
   // clear(x2 - r2 - amplitude, y2 - r2 - amplitude, r2 * 2 + amplitude * 2, r2 * 2 + amplitude * 2);
     //clear();
  }
  

  endShape(CLOSE);
  

fill(0)
      //fill(colorset[8 % colorset.length]); 
fill(colorset[3 % colorset.length]); 
   rect(0, boxHeight*3, 800*2, 0.1);
  
     //fill(255)  //  fill(colorset[3 % colorset.length]); 
 
    rect(boxWidth*3, boxHeight*3.1 , boxWidth/4,random(10,45))
  noStroke();
 // fill(255)  //  fill(colorset[3 % colorset.length]); 
rect(boxWidth*3, boxHeight*3.1 ,boxWidth/4,random(10,20))
  
  minDimension = min(800, 800)
 // //stroke(255);
  sw = map(minDimension, 300, 1000, 2, 7)
 
   yoff += 0.03;
  for (let i = 0; i < lines.length; i++) {
    let lineY = lines[i].y + lines[i].bend * yoto.length;
   // stroke(1);
stroke(0)
    strokeWeight(1)
  line(0,120,800,120)
 line(0,220,800,220)
//line(0, lineY, 800, lineY);
  
 //line(0, lineY-220, 800, lineY-220);   
    
    
   stroke(0) 

 let xoff = 0.0;

  noFill()
    beginShape();
vertex(-100, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 1.4, 800);
  vertex(x, y);
  xoff += 0.00001;
}
vertex(800+100, 800);
endShape(CLOSE);
  fill(0); 
  
  
  
     // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1, 800 / 2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY, 800 / 2, 800, -PI / 6, PI / 6);

  // Draw the box
  push();
  translate(800 / 2, boxY);
  rotate(boxAngle);
  // fill(colorset2);

noStroke();
  let isFalling = boxY + boxHeight / 2 > 800;
  if (isFalling) {
    boxY = 800 - boxHeight / 3;
    boxY += (800 - boxY) * gravity/0.1;
  }
   
  

  

  
 
 

fill(255)
//fill(colorset[3 % colorset.length]); 
  rect(boxWidth-10 , boxHeight/2 , boxWidth/random(1,5), boxHeight/2);
  
  
 
  

       



  pop();
  
  
    
    
   yoff += 0.03;
  
  
 
  }
  for (let i = 0; i < yoto.length; i++) {
    yoto[i].update();
    yoto[i].display();
  }
}

class Yotod {
  constructor() {
    // موقعیت اولیه و تنظیمات پرنده
    this.pos = createVector(hl.random(-10, 850), hl.random(120, 220));
    this.vel = createVector(hl.random(-2, 2), 0);
    this.acc = createVector(0, 0);
    this.size = hl.random(3, 15);
    this.angle = hl.random(0,TWO_PI);
    this.target = createVector(0, 0);
    this.dist = hl.random(-30, 35);
    this.spring = 0.01;
    this.damping = 0.95;
    this.maxSpeed = 4;
  }
    sitOnLine(lineY) {
  // calculate distance from line
  let distance = abs(this.pos.y - 0);

  // if close enough to line, sit on it
  if (distance < this.size * 2) {
    this.vel.mult(0);
    this.acc.mult(0);

    // curve line towards ground based on number of birds sitting on it
    let curve = 0.1 * (1 - distance / (this.size * 2));
    line(0, lineY+ curve * 800 / 10, 800, lineY + curve * 800 / 10);

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

  this.spring += hl.random(-0.01, 0.01);
  this.spring = constrain(this.spring, 0.005, 0.03);
  if (this.pos.x < -this.size || this.pos.x > width + this.size ||
        this.pos.y < -this.size || this.pos.y > height + this.size) {
      this.leftImage = true;
    }
   if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = hl.random(0, width);
        this.pos.y = hl.random(0,height);
        this.leftImage = false;
      }, 3);
    }
  
}
display() {
  stroke(0)
  strokeWeight(1)
   this.sitOnLine(120);
  this.sitOnLine(220);
  
push();
translate(this.pos.x, this.pos.y);
rotate(this.vel.heading());
//let lineY = this.pos.y < 170 ? 120 : 220;
//strokeWeight(this.size / 2);
//line(0, 0, 0, lineY - this.pos.y);
noStroke();

   let randomColor = colorset3[Math.floor(hl.random(0, colorset3.length))];
if (!this.previousColor) {
  this.previousColor = randomColor;
}
fill(this.previousColor);
//rect(0, lineY - this.pos.y, this.size, this.size);
  rect(0, 0, this.size, this.size);
    rect(0, 10, this.size, this.size);


pop();
}
}

function Ab7c() {
//background(random(colors));
    pixelDensity(2);
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
 let chosen = chooseRandomColor();
  randomColor = chosen.name;
 mouseClicked() 
 let xoff = 0.0;
   background(colorbg);
fill(colorset[2 % colorset.length]); 

  
             // fill(chosen.colors[8]);

   
            let r3, g3, b3, d3;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 204) ** 2 + (g - 255) ** 2 + (b - 51) ** 2);
} while (d > 20);
noStroke()
fill(r, g, b, 2);
  
  
  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.4, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
              let r4, g4, b4, d4;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 56) ** 2 + (g - 176) ** 2 + (b - 0) ** 2);
} while (d > 10);
noStroke()
fill(r, g, b, 8);
  
  
  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.4, 800);
  vertex(x, y);
  xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  
  
  
   
 ///////// 
  
  
             // fill(chosen.colors[6]);
              let r2, g2, b2, d2;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 0) ** 2 + (g - 40) ** 2 + (b - 85) ** 2);
} while (d > 30);
noStroke()
//fill(r, g, b, 3);
  
  fill(chosen.colors[2]);
  
   beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, -650.5, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE); 
  

             fill(chosen.colors[4]);

  
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/29.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE);
  
  
  
  
             fill(chosen.colors[2]);

  
  


  
  
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800 / 32.8, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE);
  
  
  
              //fill(chosen.colors[20]);

    fill(255,255,255,random(1,2))

  
  
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 12.4, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE);
  

//fill(0)
      //fill(colorset[8 % colorset.length]); 
fill(colorset[2 % colorset.length]); 
   rect(0, boxHeight*3, width*2, 0.1);
  
    // fill(255)  //  fill(colorset[3 % colorset.length]); 
 fill(colorset[2 % colorset.length]); 
    rect(boxWidth*6, boxHeight*2.9 , boxWidth/4,hl.random(10,45))
  noStroke();
 // fill(255)  //  fill(colorset[3 % colorset.length]); 
  fill(colorset[2 % colorset.length]); 
rect(boxWidth*6, boxHeight*2.9 ,boxWidth/4,hl.random(10,20))
  
  minDimension = min(width, height)
 // //stroke(255);
  sw = map(minDimension, 300, 1000, 2, 7)
 
   yoff += 0.03;
} 
 

let toRemove = null; // متغیر برای نگهداری شیپی که باید حذف شود

function ship1() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
           let r, g, b, d;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 239) ** 2 + (g - 35) ** 2 + (b - 60) ** 2);
} while (d > 10);
noStroke()
fill(r, g, b, 5);
  
            //fill(chosen.colors[15]);

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
}

function ship2() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
  fill(chosen.colors[12]);

  
 // fill(255,255,255,56)
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 3.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  }

// ...

function ship3() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
            fill(chosen.colors[10]);

  

  
  
  noStroke();
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
  
  }
function ship4() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
        
 fill(chosen.colors[10]);
  noStroke();
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
  }
function ship5() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
 fill(chosen.colors[10]);

  noStroke();
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
   
  }
function ship6() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
  fill(chosen.colors[10]);

  noStroke();
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
  
   
  }

function ship7() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
  fill(chosen.colors[10]);

  noStroke();
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
  }
function ship8() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
  fill(chosen.colors[10]);

  noStroke();
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
   
  }
function ship9() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
  fill(chosen.colors[10]);

  noStroke();
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
   
  }
function ship10() {
   let chosen = chooseRandomColor();
  randomColor = chosen.name;

 let xoff = 0.0;
        let r3, g3, b3, d3;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 204) ** 2 + (g - 255) ** 2 + (b - 51) ** 2);
} while (d > 20);
noStroke()
fill(r, g, b, 15);
  
  
  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.4, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  }



function Ab6() {
//background(random(colors));
 let chosen = chooseRandomColor();
  randomColor = chosen.name;
noStroke()
  fill(0);
   rect(0,0,windowWidth*2, windowHeight*2);

 let xoff = 0.0;

  
            let r, g, b, d;
do {
  r = hl.random(0,255);
  g = hl.random(0,255);
  b = hl.random(0,255);
  d = sqrt((r - 239) ** 2 + (g - 35) ** 2 + (b - 60) ** 2);
} while (d > 10);
noStroke()
fill(255, 255, 255, 50);
            //fill(chosen.colors[15]);

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, 800/4 , 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);


              fill(255, 255, 255, 5);

  
  
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 3.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
              fill(chosen.colors[10]);

  
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/2.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
  
  
             fill(255, 255, 255, 5);

   
    beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 1.7, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
   
 ///////// 
  
  
              fill(255, 255, 255, 5);

  
  
   beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/28.5, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE); 
  

             fill(255, 255, 255, 5);

  
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1,800/29.1, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE);
  
  
  
  
             fill(255, 255, 255, 5);

  
  
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 32.8, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE);
  
  
  
              fill(255, 255, 255, 5);

  
  
  
    beginShape();
vertex(800, 0);
for (let x = 800; x >= 0; x -= 3) {
  let y = map(noise(xoff, yoff), 0, 1, height / 35.4, 800);
  vertex(x, y);
  xoff += 0.003;
}
vertex(0, 0);
endShape(CLOSE);
  
 
  for (let bird of flock) {
    bird.flock(flock);
    bird.update();
    bird.show();
  }
  
  
  minDimension = min(width, height)
 // //stroke(255);
  sw = map(minDimension, 300, 1000, 2, 7)
 
   yoff += 0.03;
} 
 
function Ab5() {
//background(random(colors));
  
  background(colorbg);
   for (let i = 0; i < parandehs.length; i++) {
parandehs[i].updates();
parandehs[i].displays();
       fill(colorset[i % colorset.length]); 

} 
 // fill(1,1,1,8)
 // rect(0,0,windowWidth, windowHeight);

  
// نمایش هر نخ به صورت جداگانه
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
fill(colorset[2 % colorset.length]); 
 let xoff = 0.0;

  

 // pop();

   // Draw the fabric
//  fill(colors);

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
  
  // Draw the fabric
  fill(colorset[3 % colorset.length]); 

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);

 

      fill(colorset[8 % colorset.length]); 

  // Moving the box
  // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, height, -PI / 6, PI / 6);

  // Draw the box
  push();
  translate(width / 2, boxY);
  rotate(boxAngle);
noStroke();
 fill(colorset[9 % colorset.length]); 
   // rect(-boxWidth / 3, -boxHeight / 2, boxWidth, boxHeight*1.1);

    
       //   fill(colorset[8 % colorset.length]); 

 //   rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
    
    
   
    
  pop();
    fill(colorbg); 

   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
  

  
  
  // Moving the fabric
  yoff += 0.002;
}

  
  
  
  

}



function Ab4() {

//background(random(colors));
 background(colorbg);
  noFill();
// نمایش هر نخ به صورت جداگانه
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
//fill(colorset[2 % colorset.length]); 
 let xoff = 0.0;

  

 // pop();

   // Draw the fabric
//  //fill(colors);
stroke(colorset[2 % colorset.length]); 
strokeWeight(0.9)
beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
  
  // Draw the fabric
  //fill(colorset[3 % colorset.length]); 
stroke(colorset[3 % colorset.length]); 
strokeWeight(0.9)

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);

 

      //fill(colorset[8 % colorset.length]); 

  // Moving the box
  // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, 800, -PI / 6, PI / 6);

  // Draw the box
  push();
  translate(800 / 2, boxY);
  rotate(boxAngle);
noStroke();
 //fill(colorset[9 % colorset.length]); 
   // rect(-boxWidth / 3, -boxHeight / 2, boxWidth, boxHeight*1.1);

    
       //   //fill(colorset[8 % colorset.length]); 

 //   rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
    
    
   
    
  pop();
    //fill(colorbg); 
stroke(colorset[4 % colorset.length]); 
strokeWeight(0.9)
fill(colorbg)
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
  

  
  
  // Moving the fabric
  yoff += 0.002;
}

  
  
  
  

}


function Ab3() {
//background(random(colors));
  background(colorbg);
// نمایش هر نخ به صورت جداگانه
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
fill(colorset3[1 % colorset3.length]); 
 let xoff = 0.0;

  

 // pop();

   // Draw the fabric
//  fill(colors);

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
  
  // Draw the fabric
  fill(colors);

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);

 fill("#fff");
  circle(random(0,width),random(boxY/0.6,boxY/1),hl.random(1,10))
  
  // Moving the box
  // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, height, -PI / 6, PI / 6);

  // Draw the box
  push();
  translate(width / 2, boxY);
  rotate(boxAngle);
  fill(colors);
noStroke();
  let isFalling = boxY + boxHeight / 2 > height;
  if (isFalling) {
    boxY = height - boxHeight / 3;
    boxY += (height - boxY) * gravity/0.02;
  }
fill(0)
  rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
  pop();
  
   beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 3) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.003;
}
vertex(800, 800);
endShape(CLOSE);
  
  

  
  
  // Moving the fabric
  yoff += 0.002;
}

  
  
  
  

}


function Ab2() {
  
    
  background(colorset);

   // Draw the lines

     for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
    shapes[i].display();
noStroke();
 }
  
  
  let xoff = 0.0; 
   // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, height, -PI / 6, PI / 6);

  // Draw the box
 push();
translate(800 / 2, boxY);
rotate(boxAngle);
fill(colorset3[1 % colorset3.length]); 
noStroke();
let isFalling = boxY + boxHeight / 2 > 800;
if (isFalling) {
  boxY = 800 - boxHeight / 4;
  boxY += (800 - boxY) * gravity*2; // doubled gravity
 
  }

  fill("#fff");
  circle(hl.random(0,800),hl.random(boxY/1,boxY/100),hl.random(1,2))
 
  
   // fill(1,1,1,hl.random(1,10)); 

 // rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight+28);
  
  fill(255,255,255,hl.random(8,80)); 
  circle(-boxWidth / 2, -boxHeight * 2, boxWidth*hl.random(1.01,1.1));
  fill(colorset3[1 % colorset3.length]); 

  //rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
circle(-boxWidth / 2, -boxHeight * 2, boxWidth);
  
  
  fill(255,255,255,hl.random(250,255)); 
  circle(-boxWidth / 2, -boxHeight * 2, boxWidth);


  pop();
  
  
  
  
  
  
   
stroke(255, 255, 255);


   // Draw the fabric
  fill(colorset[4 % colorset.length]); 
strokeWeight(hl.random(0.1,1.9));
 
  
beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  
  
  // Draw the fabric
  fill(colorset[3 % colorset.length]); 
    //stroke(colorset3[1 % colorset3.length]); 

strokeWeight(hl.random(0.1,2.9));

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);


  
 
  
  
  

  
  
  fill(colorset[2 % colorset.length]); 
      stroke(255,255,255); 

strokeWeight(hl.random(0.1,0.9));

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, height / 1.9, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
 strokeWeight(random(0.1,3.9));

 
  fill(colorset[8 % colorset.length]); 
  
strokeWeight(hl.random(0.1,0.9));

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, height / 1.8, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  strokeWeight(hl.random(0.1,3.9));
  

   // stroke(255, 255, 255,228);
 
noStroke();
  
  // Moving the fabric
  yoff += 0.005;
  noStroke();
  
  
  
  
  
  boxY = map(noise(xoff, yoff), 0, 1, height / 3, height)/1.7;
  // Calculate the box's angle based on its position
  boxAngle = 45;

  // Draw the box
  push();
  translate(width / 2, boxY);
  rotate(boxAngle);
  // fill(colorset2);

noStroke();
  
  

  

  
 fill(0)
  rect(2, 0, hl.random(10,16), hl.random(20,24));
  fill(255,255,255,10)

 rect(2,0, hl.random(10,16), hl.random(20,24));  
 
 rect(2, 0, hl.random(10,16), hl.random(20,24)); 
rect(2, 0, hl.random(10,16), hl.random(20,24));
 

  //fill(colorset3[1 % colorset3.length]);
  //fill(255,255,255,238)
fill(255)
  rect(0, 0, hl.random(10,16), hl.random(20,24));
  fill(255,255,255,10)

 rect(0,0, hl.random(10,16), hl.random(20,24));  
 
 rect(0, 0, hl.random(10,16), hl.random(20,24)); 
rect(0, 0, hl.random(10,16), hl.random(20,24));
 //rect(width/2,height/2, this.size, random(0.1,5.5));
   // line(random(0,10), -10, random(1,14), random(1,14));
  

  
  fill(255)

  


  pop();
  

  
  
  boxY = map(noise(xoff, yoff), 0, 3, height / 5, height)/1.7;
  // Calculate the box's angle based on its position
  boxAngle = 45;

  // Draw the box
  push();
  translate(width/3 , boxY);
  rotate(boxAngle);
  // fill(colorset2);

noStroke();
  
  fill(255)
   rect(281, 0, hl.random(10,16), hl.random(19,23));
  fill(255,255,255,10)

 rect(281,0, hl.random(10,16), hl.random(19,23));  
 
 rect(281, 0, hl.random(10,16), hl.random(19,23)); 
rect(281, 0, hl.random(10,16), hl.random(19,23));
  
  
  fill(0)
   rect(280, 0, hl.random(10,16), hl.random(20,24));
  fill(255,255,255,10)

 rect(280,0, hl.random(10,16), hl.random(20,24));  
 
 rect(280, 0, hl.random(10,16), hl.random(20,24)); 
rect(280, 0, hl.random(10,16), hl.random(20,24));

    pop();

  
  
  
    
}


function Ab1() {
   
  background(colorset);

  let xoff = 0.0;
   // Draw the lines

  
  
  
   // Moving the box
  boxY = map(noise(xoff, yoff), 0, 1,800/2, 800);
  // Calculate the box's angle based on its position
  boxAngle = map(boxY,800/2, height, -PI / 6, PI / 6);

  // Draw the box
 push();
translate(width / 2, boxY);
rotate(boxAngle);
fill(colorset3[1 % colorset3.length]); 
noStroke();
let isFalling = boxY + boxHeight / 2 > 800;
if (isFalling) {
  boxY = 800 - boxHeight / 4;
  boxY += (800 - boxY) * gravity*2; // doubled gravity
  }

  
 
  
   // fill(1,1,1,hl.random(1,10)); 

 // rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight+28);
  
  fill(255,255,255,random(8,80)); 
  circle(-boxWidth / 2, -boxHeight * 2, boxWidth*hl.random(1.01,1.1));
  fill(colorset3[1 % colorset3.length]); 

  //rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
circle(-boxWidth / 2, -boxHeight * 2, boxWidth);

  pop();
  
  
  
  
  
  
   
stroke(255, 255, 255);


   // Draw the fabric
  fill(colorset[4 % colorset.length]); 
strokeWeight(random(0.1,1.9));
 
  
beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  
  
  // Draw the fabric
  fill(colorset[3 % colorset.length]); 
    //stroke(colorset3[1 % colorset3.length]); 

strokeWeight(random(0.1,2.9));

beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1,800/2, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);

 fill("#fff");
  circle(random(0,800),random(boxY/0.6,boxY/1),hl.random(1,10))
  
 
  
  
  

  
  
  fill(colorset[2 % colorset.length]); 
      stroke(255,255,255); 

strokeWeight(random(0.1,0.9));

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 1.9, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  strokeWeight(random(0.1,3.9));

 
  fill(colorset[8 % colorset.length]); 
  
strokeWeight(random(0.1,0.9));

  beginShape();
vertex(0, 800);
for (let x = 0; x <= 800; x += 1) {
let y = map(noise(xoff, yoff), 0, 1, 800 / 1.8, 800);
vertex(x, y);
xoff += 0.001;
}
vertex(800, 800);
endShape(CLOSE);
  strokeWeight(random(0.1,3.9));
  

  stroke(255, 255, 255,12);
strokeWeight(2.9);
for (let i = 0; i < 1; i++) {
let x = random(800);
let y = random(800 /1);

line(x, y, x + 1000, y - 0);
}

   stroke(2, 2, 2,10);
strokeWeight(5.9);
for (let i = 0; i < 1; i++) {
let x = random(800);
let y = random(800 /1);

line(x, y, x + 1000, y - 0);
}
   // stroke(255, 255, 255,228);
 

  
  // Moving the fabric
  yoff += 0.005;
  
  
  boxY = map(noise(xoff, yoff), 0, 1, 800 / 3, 800)/1.7;
  // Calculate the box's angle based on its position
  boxAngle = 45;

  // Draw the box
  push();
  translate(800 / 2, boxY);
  rotate(boxAngle);
  // fill(colorset2);

noStroke();
  
  

  

  fill(0)
  rect(2, 0, hl.random(10,16), hl.random(20,24));
  fill(0,10)

 rect(2,0, hl.random(10,16), hl.random(20,24));  
 
 rect(2, 0, hl.random(10,16), hl.random(20,24)); 
rect(2, 0, hl.random(10,16), hl.random(20,24));
 
 

  //fill(colorset3[1 % colorset3.length]);
  //fill(255,255,255,238)
fill(255)
  rect(0, 0, hl.random(10,16), hl.random(20,24));
  fill(255,255,255,10)

 rect(0,0, hl.random(10,16), hl.random(20,24));  
 
 rect(0, 0, hl.random(10,16), hl.random(20,24)); 
rect(0, 0, hl.random(10,16), hl.random(20,24));
 //rect(width/2,height/2, this.size, random(0.1,5.5));
   // line(random(0,10), -10, random(1,14), random(1,14));
       



  pop();
  

    


}

//////


let numTreesQW1 =2;
let treeCounterQW1 = 0;
let drawTreeQW1 = true;





function QW1q() {
  
  let xOffset = random(-0.6, 0.9);
    QW1(shapegraphic2);

    image(shapegraphic2, xOffset, 0);
    
    // به‌روز‌رسانی xOff برای لرزش متوالی
    xOff += 1;
   
   //hk3()
  }

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
     
     


shapegraphic2.strokeWeight(dim * 0.00015);

const QW1os = 120
shapegraphic2.translate(800 / hl.random(1,4), 1220 );
let QW1bs = 150;
let QW1v = getDir(0.5);
let QW1l = QW1v.x;
let QW1r = QW1v.y;
let QW1ts = 20;
let QW1nb = hl.random(2, 4);
shapegraphic2.strokeWeight(QW1ts);
shapegraphic2.line(0, 0, 0, -QW1os);
shapegraphic2.translate(0, -QW1os);
multibranchQW1(QW1bs, QW1l, QW1r, QW1ts, QW1nb);
drawTreeQW1 = false;

 treeCounterQW1++;
 drawTreeQW1 = true;
}
function getDir(QW1p = 0.1) {
let QW1r = hl.random(0, 1);
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
QW1ts *= hl.random(0.6, 0.9);
shapegraphic2.strokeWeight(QW1ts);
shapegraphic2.push();
shapegraphic2.rotate(-QW1th);
shapegraphic2.line(0, 0, 0, -QW1h);
shapegraphic2.translate(0, -QW1h);

shapegraphic2.push(); // شاخه دوم
shapegraphic2.rotate(radians(30));
const dim = Math.min(width, height);
//shapegraphic2.strokeWeight(dim * 0.010);
const r = 10;
let chosen = chooseRandomColor();
shapegraphic2.stroke(chosen.colors[1]);
     // // تنظیم حالت مخلوط کردن برای رنگ‌ها
       shapegraphic2.line(hl.random(0,r), hl.random(0,r), hl.random(0,r), hl.random(0,r))

   //  shapegraphic2.noStroke();
    shapegraphic2.stroke(0);
  shapegraphic2.line(hl.random(0,r), hl.random(0,r), hl.random(0,r), hl.random(0,r))
shapegraphic2.stroke(0);
  shapegraphic2.line(hl.random(0,r), hl.random(0,r), hl.random(0,r), hl.random(0,r))
      shapegraphic2.stroke(0);
  shapegraphic2.line(hl.random(0,r), hl.random(0,r), hl.random(0,r), hl.random(0,r))
shapegraphic2.stroke(0);
  shapegraphic2.line(hl.random(0,r), hl.random(0,r), hl.random(0,r), hl.random(0,r))

shapegraphic2.pop();
let QW1v = getDir();
let QW1l = QW1v.x;
let QW1r = QW1v.y;
branchQW1(QW1h, QW1l, QW1r, QW1thres, QW1ts, QW1bp);
shapegraphic2.pop();
}
function branchQW1(QW1h, QW1l, QW1r, QW1thres = 6, QW1ts = 3, QW1bp = []) {
let QW1a = hl.random(-5, 30);
let QW1s = 6;
let QW1t = radians(QW1a);
QW1h *= hl.random(0.7, 1);
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
      shapegraphic2.fill(randomColorhk(colorset));
       //shapegraphic2.fill(color(random(colorset))); // تنظیم رنگ پر
       shapegraphic2.ellipse(0, 0, hl.random(1,4), hl.random(1,40));
       
      shapegraphic2.fill(color(255, 255, 255, hl.random(5, 20))); // تنظیم رنگ پر دایره دوم
       shapegraphic2.ellipse(0, 0, hl.random(1,10), hl.random(1,40));
 
      shapegraphic2.stroke(randomColorhk(colorset)); // تنظیم رنگ خط
       shapegraphic2.strokeWeight(hl.random(0.1, 0.6));
 
       shapegraphic2.arc(0, 0, hl.random(5, 7), hl.random(35, 57), HALF_PI, PI);
       shapegraphic2.arc(0, 0, hl.random(6, 7), hl.random(46, 57), HALF_PI, PI);
       shapegraphic2.arc(0, 0, hl.random(7, 8), hl.random(57, 57), HALF_PI, PI);
       shapegraphic2.arc(0, 0, hl.random(5, 7), hl.random(-35, -57), HALF_PI, PI);
       shapegraphic2.arc(0, 0, hl.random(6, 7), hl.random(-46, -57), HALF_PI, PI);
       shapegraphic2.arc(0, 0, hl.random(7, 8), hl.random(-57, -57), HALF_PI, PI);
       
shapegraphic2.translate(0, -QW1h);
}
}
}
function multibranchQW1(QW1bs, QW1l, QW1r, QW1ts = hl.random(100, 600), QW1nb = hl.random(30, 200)) {
for (let i = 0; i <= QW1nb; i++) {
const QW1os = (20, 200);
let QW1bp = [];
QW1bp[0] = createVector(2000 / 2, 1000 - QW1os);
branchQW1(QW1bs, QW1l, QW1r, QW1thres = hl.random (10, 20), QW1ts = QW1ts, QW1bp);
}
}
let xOff = 0; // متغیر برای ایجاد لرزش به سمت چپ و راست


function draw2qa() {
  
    
    // ایجاد لرزش با افزودن مقدار تصادفی به x مختصات
    let xOffset = random(-1, 1);
    
    drawq2(shipGraphic);
    image(shipGraphic, xOffset, 0);
    
    // به‌روز‌رسانی xOff برای لرزش متوالی
    xOff += 0.1;
}


function drawq2() {
     if (treeCounterQW1 >= numTreesQW1) {
 
      return;
 }
shipGraphic.scale(0.5)
  shipGraphic.translate(500,500)
 const originalq1_size = hl.random(1000/680, 1000/280);
  const first_branchq1_size = hl.random(1000/4, 1000/2);
  const first_thicknessq1_size = hl.random(1000/180, 1000/140);
  const number_of_branchq1es = hl.random(2, 4);

  

  shipGraphic.translate(1000/2, 1000/0.4);
 
  shipGraphic.strokeWeight(first_thicknessq1_size);
  shipGraphic.line(0, 0, 0, -originalq1_size);

  shipGraphic.translate(0, -originalq1_size);
  multiple_branchq1es(first_branchq1_size, first_thicknessq1_size, number_of_branchq1es);
drawTreeQW1 = false;

 treeCounterQW1++;
 drawTreeQW1 = true;

}

function branchq1(h, thicknessq1, branchq1_positions) {
  const threshold = hl.random(0,1) * 5 + 1;
const numbers = [];

for (let i = 1; i <= 5; i++) {
  numbers.push(i);
}
  const a = hl.random(-15, 30);
  const steps = 2;
  const theta = radians(a);

  h *= hl.random(0.7, 1);
  let i = branchq1_positions.length;
  branchq1_positions[i] = createVector(branchq1_positions[i - 1].x + h * cos(theta), branchq1_positions[i - 1].y - h * sin(theta));

  if (branchq1_positions[i].x > 0 && branchq1_positions[i].y > 0) {
    if (h > threshold && !stop_branchq1ing) { // only draw branchq1es if stop_branchq1ing is false
      let vector = get_directionq1();
      let left = vector.x;
      let right = vector.y;

      if (right) {
        draw_branchq1(theta, h, threshold, thicknessq1, branchq1_positions);
      }
      if (left) {
        draw_branchq1(-theta, h, threshold, thicknessq1, branchq1_positions);
      }
    } else {
      shipGraphic.push();
      shipGraphic.noStroke();
       let r, g, b, d;
do {
  r = hl.random(0,256);
  g = hl.random(0,256);
  b = hl.random(0,256);
  d = sqrt((r - 239) ** 2 + (g - 35) ** 2 + (b - 60) ** 2);
} while (d > 10);

shipGraphic.fill(r, g, b, hl.random(5,156));
       shipGraphic.stroke(r, g, b, hl.random(5,98));    
  shipGraphic.strokeWeight (hl.random(0.1, 2.9));
      
      
      shipGraphic.ellipse(0, 0, hl.random(1, 10), hl.random(1, 100));
       shipGraphic.fill(255);
      
            shipGraphic.ellipse(0, 0, hl.random(1,4), hl.random(1,40));
       
      shipGraphic.fill(color(255, 255, 255, hl.random(5, 20))); // تنظیم رنگ پر دایره دوم
       
      shipGraphic.fill(r, g, b, hl.random(5,156));
      shipGraphic.ellipse(0, 0, hl.random(1,10), hl.random(1,40));
 
      //shipGraphic.stroke(randomColorhk(colorset)); // تنظیم رنگ خط
       shipGraphic.strokeWeight(hl.random(0.1, 0.6));
 
       shipGraphic.arc(0, 0, hl.random(5, 7), hl.random(35, 57), HALF_PI, PI);
       shipGraphic.arc(0, 0, hl.random(6, 7), hl.random(46, 57), HALF_PI, PI);
       shipGraphic.arc(0, 0, hl.random(7, 8), hl.random(57, 57), HALF_PI, PI);
       shipGraphic.arc(0, 0, hl.random(5, 7), hl.random(-35, -57), HALF_PI, PI);
       shipGraphic.arc(0, 0, hl.random(6, 7), hl.random(-46, -57), HALF_PI, PI);
       shipGraphic.arc(0, 0, hl.random(7, 8), hl.random(-57, -57), HALF_PI, PI);
      
      
      
      
      
      
     // ellipse(0, 50, random(1, 10), random(1, 100));
      shipGraphic.num_leaves++;
      

      shipGraphic.translate(0, -h);
      shipGraphic.pop();
    }
  }
}

function draw_branchq1(theta, h, threshold, thicknessq1, branchq1_positions) {
  shipGraphic.thicknessq1 *= hl.random(0.6, 0.9);
  shipGraphic.strokeWeight(thicknessq1);
  shipGraphic.push();

  let vector = get_directionq1();
  let left = vector.x;
  let right = vector.y;

  shipGraphic.rotate(-theta);
   shipGraphic.stroke(1)
 
  



  
  shipGraphic.strokeWeight (hl.random(1.1, 3.9));
 shipGraphic.stroke(1,1,1,hl.random(1,100))
  shipGraphic.line(0, 0, 0, -2 * h);
  shipGraphic.translate(0, -h);

  branchq1(h, thicknessq1, branchq1_positions);

  shipGraphic.pop();
  
}
function get_directionq1(probability = 0.1) {
  //let random_int = hl.random(0, 1);
  let left_probability = 1 - probability;

  let left = false;
  let right = false;
  if (hl.randomInt >= left_probability) {
    left = true;
  } else if (hl.randomInt <= probability) {
    right = true;
  } else {
    left = true;
    right = true;
     shipGraphic.noStroke()

  }
  return createVector(left, right);
}


let num_branchq1es = 10;
let stop_branchq1ing = false;

function multiple_branchq1es(branchq1_size, thicknessq1_size, number_of_branchq1es) {
  for (let i = 0; i <= number_of_branchq1es; i++) {
    let branchq1_positions = [];
    branchq1_positions[0] = createVector(1000/2, 1000);

    branchq1(branchq1_size, thicknessq1_size, branchq1_positions);
    
    num_branchq1es++;
    if (num_branchq1es >= 60) {
      stop_branchq1ing = true;
    }
  }
}
let grassABWq1 = [];

function drawABWq1g() {
 // background(100)
 // background(0, 150, 0); // پس زمینه سبز
  for (let i = 0; i < grassABWq1.length; i++) {
    if (grassABWq1[i]) {
      grassABWq1[i].display();
      grassABWq1[i].applyForce(windABWq1);
    }
  }
}

class GrassABWq1 {
  constructor(x, y, len, thick) {
    this.bottom = createVector(x, y);
    this.len = len;
    this.thick = thick;
    this.top = createVector(x, y - this.len);
    this.angle = PI / 4;
    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.mass = this.len / 8;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.aAcceleration = f.x; // زاویه تسریع براساس نیروی باد
  }

  display() {
    //stroke(34,139,34, 150); // رنگ علف
   
     let chosen = chooseRandomColor();
 //stroke(0);
     let randomColor = colorset3[Math.floor(hl.random(0, colorset3.length))];
if (!this.previousColor) {
  this.previousColor = randomColor;
}
stroke(this.previousColor);
    strokeWeight(this.thick/2);
    line(this.bottom.x, this.bottom.y, this.top.x, this.top.y);
    
    
   // stroke(34,139,34, 150); // رنگ علف
    
    //stroke(chosen.colors[2]);
    strokeWeight(this.thick);
    line(this.bottom.x, this.bottom.y, this.top.x, this.top.y);
    
     //stroke(chosen.colors[4]);
   // stroke(34,139,34, 150); // رنگ علف
    strokeWeight(this.thick);
    line(this.bottom.x+2, this.bottom.y-2, this.top.x, this.top.y);
    this.angle += this.aVelocity;
    this.aVelocity += this.aAcceleration;
    this.top.x = this.bottom.x - this.len * sin(this.angle);
    this.aAcceleration = 0;
  }
}












 let grassAB1 = [];

function setupab1() {
  createCanvas(800, 800);
  for (let i = 0; i < width; i += 3) {
    grassAB1[i] = new GrassAB1(i, random(height - 50, height), random(10, 220), random(1, 5));
  }
  windAB1 = createVector(0.01, 0);
}

function drawAB1g() {
 // background(100)
 // background(0, 150, 0); // پس زمینه سبز
  for (let i = 0; i < grassAB1.length; i++) {
    if (grassAB1[i]) {
      grassAB1[i].display();
      grassAB1[i].applyForce(windAB1);
    }
  }
}

class GrassAB1 {
  constructor(x, y, len, thick) {
    this.bottom = createVector(x, y);
    this.len = len;
    this.thick = thick;
    this.top = createVector(x, y - this.len);
    this.angle = PI / 4;
    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.mass = this.len / 5;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.aAcceleration = f.x; // زاویه تسریع براساس نیروی باد
  }

  display() {
    stroke(34,139,34, 150); // رنگ علف
   
     let chosen = chooseRandomColor();
 //stroke(0);
     let randomColor = colorset3[Math.floor(hl.random(0, colorset3.length))];
if (!this.previousColor) {
  this.previousColor = randomColor;
}
stroke(this.previousColor);
    strokeWeight(this.thick/2);
    line(this.bottom.x, this.bottom.y, this.top.x, this.top.y);
    
    
    //stroke(34,139,34, 150); // رنگ علف
    
    stroke(chosen.colors[2]);
    strokeWeight(this.thick);
    line(this.bottom.x+20, this.bottom.y-20, this.top.x, this.top.y);
    
     stroke(chosen.colors[4]);
   // stroke(34,139,34, 150); // رنگ علف
    strokeWeight(this.thick);
    line(this.bottom.x+2, this.bottom.y-2, this.top.x, this.top.y);
    this.angle += this.aVelocity;
    this.aVelocity += this.aAcceleration;
    this.top.x = this.bottom.x - this.len * sin(this.angle);
    this.aAcceleration = 0;
  }
}
/////

function berkeh() {
 
  for (let i = 0; i < behkehs.length; i++) {
    behkehs[i].updates();
behkehs[i].displays();
 noStroke();
  //strokeWeight(random(0.01,0.02));
/////
  } 
    

    
    
    
    
    
    
    
    
    
    
    
    
    
  let chosen = chooseRandomColor();
  fill(chosen.colors[1]);

  // line(width/2,220,windowWidth,0)
  
// نمایش هر پرنده به صورت جداگانه

  
 rectMode(CENTER);
    noFill();
  stroke("#fff");

//strokeWeight(100);
 //rect(1000/2,1000/2,1000,1000)
 
    



}
class Behkeh {
constructor() {
// موقعیت اولیه و تنظیمات پرنده
this.pos = createVector(hl.random(0,width*1.2), hl.random(0,height));
this.vel = createVector(hl.random(-2, 2), hl.random(-2, 2));
this.acc = createVector(0, 0);
this.size = hl.random(3, 100);
this.angle = hl.randomBool(PI);
this.target = createVector(0, 0);
this.dist = hl.random(1, 2);
this.spring = 0.01;
this.damping = 0.95;
this.maxSpeed = 4;
  this.leftImage = false; 
}
sitOnLine(lineY) {
  // calculate distance from line
  let distance = abs(this.pos.y - lineY)/100;

  // if close enough to line, sit on it
  if (distance < this.size/2 ) {
    this.vel.mult(0);
    this.acc.mult(0);

    // curve line towards ground based on number of birds sitting on it
   let curve = 0.1 * (1 - distance / (this.size * 10));
    //line(0, lineY, 800, lineY + curve * 800 / 10);

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

    // کاهش سرعت حرکت با استفاده از میرایی
    this.vel.add(this.acc);
    this.vel.mult(this.damping);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);

    // تنظیم مجدد شتاب به صفر
    this.acc.mult(0);

    // به‌روزرسانی ثابت انعطاف‌پذیری
    this.spring += random(-0.01, 0.01);
    this.spring = constrain(this.spring, 0.005, 0.03);

    if (this.leftImage) {
      setTimeout(() => {
        this.pos.x = random(0, 800);
        this.pos.y = 800 / 1;
        this.leftImage = false;
      }, 2);
    }
}

displays() {
  // check if bird is close to any lines and sit on them
  
  
  
    
  
  
  
        noStroke();
  
 this.sitOnLine (-height)
  this.sitOnLine(120);
  this.sitOnLine(220);

 this.sitOnLine(320)
  this.sitOnLine(420)
    this.sitOnLine(520)
      this.sitOnLine(620)
      this.sitOnLine(720)

 let chosen = chooseRandomColor();

 this.sitOnLine (height)
  
  // displays bird
  push();
  translate(this.pos.x, this.pos.y);

  rotate(this.vel.heading());
   noStroke(); 
fill(1,1,1,hl.random(1,30))
 rect(10, -5, this.size*hl.random(1,4), hl.random(0.1,2.2));

   //  fill(colorset[3 % colorset.length]);
 //  stroke(1)
//  strokeWeight (random(1.1, 3.9));
//  stroke(1,1,1,random(1,174))
//rect(0, -5, this.size, random(0.1,0.2));
    noStroke()
 // fill(255,255,266,random(1,8))
//blendMode(MULTIPLY)
   fill(chosen.colors[10]);
  
rect(20, -5, this.size*hl.random(1,100), hl.random(0.1,1.9));
   
  
          fill(chosen.colors[20]);
 rect(30, -35, this.size*hl.random(1,2), hl.random(2.01,1.2)); 
fill(chosen.colors[19]);
//fill(r, g, b, random(5,156));
 rect(40, -35, this.size*hl.random(1,3), hl.random(6.01,3.2)); 
 //fill(r, g, b, random(5,156));
  fill(chosen.colors[18]);

 rect(50, -35, this.size*hl.random(1,4), hl.random(3.01,2.2));  
  
      fill(chosen.colors[17]);

 rect(60, -35, this.size*hl.random(1,5), hl.random(2.01,0.2)); 
  
   
    fill(chosen.colors[16]);

 rect(70, -35, this.size*hl.random(1,6), hl.random(1.01,0.2)); 
  
  
 //blendMode(DARKEST)
  
   
          fill(chosen.colors[15]);
 rect(-10, -35, this.size*hl.random(1,2), hl.random(1.01,6.2)); 
  
    

 
fill(chosen.colors[14]);
//fill(r, g, b, random(5,156));
 rect(-20, -35, this.size*hl.random(1,2), hl.random(5.01,4.2)); 
 //fill(r, g, b, random(5,156));
  
//  fill(chosen.colors[13]);
blendMode(ADD)
  
  fill(chosen.colors[13]);
 rect(-30, -35, this.size*hl.random(1,2), hl.random(4.01,2.2));  


      fill(chosen.colors[12]);

 rect(-40, -35, this.size*hl.random(1,2), hl.random(3.01,0.2)); 
  
  
    fill(chosen.colors[11]);
//fill(255,255,255,random(1,162))
 rect(-50, -35, windowHeight, hl.random(0.01,0.2)); 
  


  
 
  pop();
 

}
   
}



let num_branches = 10;
let stop_branching = false;
let num_leaves = 0;




let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
let { GravityBehavior } = toxi.physics2d.behaviors;

let physics;

let shelal = [];
function drawpar() {
  //{!1} باید فیزیک را بروزرسانی کنیم
  physics.update();
  noFill();
//  background(255);
  strokeWeight(2);
  stroke(255,70);
  strokeWeight(5);
  for (let i = 0; i <= 1200; i += 2) {
    beginShape();
    for (let lakht of shelal) {
      //{!1} هر ذره یک نقطه در خط است.
      vertex(lakht.x + i, lakht.y);
    }
    endShape();

  }

  //{!1} ذره آخر را به صورت یک دایره رسم می‌کنیم.
  shelal[shelal.length - 1].show();

  //{!4} حرکت ذره بر اساس موقعیت ماوس
  if (mouseIsPressed) {
    shelal[shelal.length - 1].lock();
    shelal[shelal.length - 1].x = mouseX;
    shelal[shelal.length - 1].y = mouseY;
    shelal[shelal.length - 1].unlock();
  }
      strokeWeight(0)
}

// چقدر کلاس Shelal ساده و جالب است؟!
class Shelal extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
  }

  show() {
    fill(127);
    stroke(255);
   // circle(this.x, this.y, this.r * 2);
  }
}