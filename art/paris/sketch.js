/* Paris — Reza Milani (p5.js, WEBGL). The artist's sketch as he wrote it; Milani changes, all marked "Milani":
   - no saveCanvas on click; inside Milani the canvas is scaled so the 800-px composition fits the frame
   - the sound (paris-sound.js) only speeds the ink lines and thickens the black ink a little; in silence it is the original
   - the Highlight hl block is kept as is: with seed-shim.js, ?h=0x… gives the same picture every time */
let __pk = 1;
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
  const kWQalletAddress = searchParams.get("kWQa") || generateRandomAddress();
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
      kWQalletAddress,
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

// Milani: the original saved a PNG on every click (saveCanvas("پاریس", "png")); removed so it never fires inside the editor.

let kijosk = [];
function gitacolork() {
  let r, g, b, d, chosenColor;
  const rangiD2 = ["#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8", // Blues

  ];

  do {
    const randomIndex = hl.randomInt(0, rangiD2.length - 1);
    const { r: rVal, g: gVal, b: bVal } = rangiD2[randomIndex];
    r = hl.random(100, 256);
    g = hl.random(100, 256);
    b = hl.random(100, 256);
    d = sqrt((r - rVal) ** 2 + (g - gVal) ** 2 + (b - bVal) ** 2);
    chosenColor = color(r, g, b, 255);
  } while (d > 1530);

  return chosenColor;
}
 const rangiD2i = ["#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8", // Blues
    "#1c344a", "#325e86", "#2c89b5", "#689aa2", // Blue to Aqua
    "#2fa494", "#79b7a0", "#72b5b1", "#5b9bae", "#6ba1b7", // Teal to Light Blue
    "#8ac38f", "#396c68", "#89e3b7", // Greenish shades
    "#f55200", "#ff6d00", "#ff8500", "#ff9100", "#ff9e00", // Orange to Amber
    "#f59647", "#ffbe0b", "#fb5607", "#ff006e", // Yellow to Reddish
    "#f72585", "#3a0ca3", "#4361ee", "#4cc9f0", // Magenta to Cyan
    "#fd3741", "#fe4f11", "#ff6800", "#ffa61a", "#ffc219", "#ffd114", "#fcd82e", "#f4d730", // Red to Yellow
    "#ced562", // Light Olive
    "#f2bc45", // Golden Yellow
    "#e9e0d6", "#fdfeff", "#cee7f3", "#c4d7e9", // Off-whites to Light Blue Whites
    "#d4d5c7", "#bac3b7", "#a0b3ab", "#87a3a0", // Light Grey Greens
    "#bbd7c9", "#c8958b", "#e2c48c", "#efb4a5", // Soft Pastels
    "#817c77", "#403b3f", // Dark Greys
    "#cd4446", // Reddish
    "#590d22", "#800f2f", "#a4133c", "#c9184a", "#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1", "#ffccd5", // Pink to Light Pink
    "#fff0f3", "#fadde1", "#ffc4d6", "#ffa6c1", "#ff87ab", "#ff5d8f", // Soft Pinks
    "#ff97b7", "#ffacc5", "#ffcad4", "#f4acb7", "#ffe0e9", "#ffc2d4", "#ff9ebb", "#ff7aa2", // Pink shades
    "#e05780", "#b9375e", "#8a2846", "#602437", "#522e38", // Deep Reds to Brownish Reds
    "#ff0a54", "#ff477e", "#ff5c8a", "#ff7096", "#ff85a1", "#ff99ac", "#fbb1bd", "#f9bec7", "#f7cad0", "#fae0e4" // Bright Pinks to Soft Pinks

  ];

let x = [],
  y = [],
  a = [];
let spd = [],
  sz = [],
  count = 200;

let radius = 5; // شعاع گوی کروی
let xkWQa, ykWQa, zkWQa, txkWQa, tykWQa, tzkWQa, pxkWQa, pykWQa, pzkWQa, strokeWidth;

let kxQa, kxyQa, kzyQa, tkxQa, tkxyQa, tkzyQa, pkxQa, pkxyQa, pkzyQa;
let kxQad, kxyQad, kzyQad, tkxQad, tkxyQad, tkzyQad, pkxQad, pkxyQad, pkzyQad;

function setup() {
 // createCanvas(800, 800, WEBGL);
  createCanvas(windowWidth, windowHeight,WEBGL);
  if (window.__GROKLY_FEED) pixelDensity(1);
  __pk = window.__GROKLY_FEED ? Math.min(width, height) / 800 : 1; // Milani: same composition at any frame size
  scale(__pk);

  adad2 =  hl.random(-100, 100)
  adad3 =  hl.random(-500 / 2, 500 / 2)
  // background(100)
  xkWQa = hl.random(-500 / 2, 500 / 2);
  ykWQa = hl.random(-500 / 2, 500 / 2);
  zkWQa = adad2;
  txkWQa = 0; // تغییر این خط
  tykWQa = 0; // تغییر این خط
  tzkWQa = adad2;
  pxkWQa = xkWQa;
  pykWQa = ykWQa;
  pzkWQa = zkWQa;
  kxQa = hl.random(-500 / 2, 500 / 2);
  kxyQa = hl.random(-500 / 2, 500 / 2);
  kzyQa = adad2;
  tkxQa = 0; // تغییر این خط
  tkxyQa = 0; // تغییر این خط
  tkzyQa = adad2;
  pkxQa = kxQa;
  pkxyQa = kxyQa;
  pkzyQa = kzyQa;
  
  
    kxQad = hl.random(-500 / 2, 500 / 2);
  kxyQad = hl.random(-500 / 2, 500 / 2);
  kzyQad = adad2;
  tkxQad = 0; // تغییر این خط
  tkxyQad = 0; // تغییر این خط
  tkzyQad = adad2;
  pkxQad = kxQa;
  pkxyQad = kxyQa;
  pkzyQad = kzyQa;
  
  strokeWidth = 0;
  noStroke();
adad1 = hl.random(-500 / 2, 500 / 2)
adad4 = hl.random(-800 / 2, 800 / 2)
  adad5 = hl.random(-800 / 2, 800 / 2)
  
   adp1 = hl.random(-250, 250)
   adp2 =   hl.random(-250, 250)
   adp3 =   hl.random(-250, 250
)
   adp4 =   hl.random(-250, 250
)
 adp5= hl.random(-620, 690)
  adp6= hl.random(-620, 690)
  adp7= hl.random(-620, 690)
  adp8= hl.random(-620, 690)
  adp9= hl.random(-620, 690)
  adp10= hl.random(-620, 690)
  adp11= hl.random(-620, 690)
  adp12= hl.random(-620, 690)
  adp13= hl.random(-620, 690)
  adp14= hl.random(-620, 690)
  adp15= hl.random(100, 255)
  adp16= hl.random(100, 255)
  adp17= hl.random(100, 255)
  adp18= hl.random(100, 255)
  adp19= hl.random(100, 255)
  adj = hl.random(10, 50)
  
  for (let i = 0; i < 1530; i++) {
    kijosk.push(gitacolork());
  }
  
  fabrik= hl.randomElement(rangiD2i);
   fabrik1= hl.randomElement(rangiD2i);
   fabrik= hl.randomElement(rangiD2i);
  background(fabrik);
 // background(255);
  fill(0);
  noStroke();
fill(kijosk[20]);
  fill(255);
  rect(
    hl.random(-200, 100),
    hl.random(-200, 100),
    hl.random(100, 500),
    hl.random(100, 500)
  );

  fill(0,0);

  circle(
    hl.random(-200, 100),
    hl.random(-200, 100),
    hl.random(10, 150),
   
    
  );

}

let numTreesQW5 = 6000;
let treeCounterQW5 = 0;
let drawTreeQW5 = true;
function draw() {
  scale(__pk); // Milani: WEBGL resets the transform every frame
  PARIS_SOUND.frame();
//drawm();
 // blendMode(MULTIPLY)
 drawbui() 
  drawtrD()
draw2QD()
     fill(255);
  noFill()
  stroke(255)
  strokeWeight(200)

  
  }

let isDrawing = true; // Flag to toggle drawing

function drawp() {
  // background(0);

  drawbui();
}

function drawbui() {
  // Set the color of the stroke to black
  stroke(0,adp15);
  
  // Lerp to smoothly transition between points
  xkWQa = lerp(xkWQa, txkWQa, 0.02 * PARIS_SOUND.k);
  ykWQa = lerp(ykWQa, tykWQa, 0.07 * PARIS_SOUND.k);
  zkWQa = lerp(zkWQa, tzkWQa, 0.05 * PARIS_SOUND.k);

  // Calculate stroke width based on the distance between current and previous points
  strokeWidth = lerp(strokeWidth, dist(xkWQa, ykWQa, zkWQa, pxkWQa, pykWQa, pzkWQa), 0.1);
  
  // Randomize the stroke weight for a more natural ink effect
  let inkFlow = noise(frameCount * 0.05) * 20 * PARIS_SOUND.ink; // Adding Perlin noise for organic flow variation
  strokeWeight(max(0.1, inkFlow - strokeWidth));

  // Draw a line from the previous point to the current point
  line(xkWQa, ykWQa, zkWQa, pxkWQa, pykWQa, pzkWQa);
   const circleRadius = 80; // Radius of the circle
  const circleX = adp1*1
  const circleY = adp3*1
  
  
    const circleX2 = adp2+200
  const circleY2 = adp4*1
  
 noFill();
  stroke(0);
  strokeWeight(max(0.1, 12 - strokeWidth)/1000);
// fill(255)
  ellipse(circleX, circleY, circleRadius * 2);
ellipse(circleX2, circleY2, circleRadius * 2);
  // Check collision with the circle
  if (dist(circleX, circleY, xkWQa, ykWQa) <= circleRadius) {
    // Calculate the angle of incidence
    const angle = atan2(kxyQa - circleY, kxQa - circleX);
    // Reflect the point
    txkWQa = circleX + cos(angle) * circleRadius * 1.5;
    tykWQa = circleY + sin(angle) * circleRadius * 1.5;
  }

    if (dist(circleX2, circleY2, xkWQa, ykWQa) <= circleRadius) {
    // Calculate the angle of incidence
    const angle = atan2(kxyQa - circleY2, kxQa - circleX2);
    // Reflect the point
    txkWQa = circleX2 + cos(angle) * circleRadius * 1.5;
    tykWQa = circleY2 + sin(angle) * circleRadius * 1.5;
  }
  // Update previous points
  pxkWQa = xkWQa;
  pykWQa = ykWQa;
  pzkWQa = zkWQa;

  // Randomly reset target points when close to them
  if (dist(xkWQa, ykWQa, zkWQa, txkWQa, tykWQa, tzkWQa) < 50) {
    txkWQa = random(-250, 250);
    tykWQa = random(-250, 250);
    tzkWQa = random(-1, 1);
  }
}

function drawtrD() {
  // Corrected stroke color setting using an assumed color array 'kijosk'
  stroke(fabrik);

  // Assuming 'fabrik' should set a global attribute like stroke opacity, added handling for that
  if (typeof fabrik === 'number') {
    strokeWeight(fabrik);
  }

  // Smoothly interpolate positions
  kxQa = lerp(kxQa, tkxQa, 0.02 * PARIS_SOUND.k);
  kxyQa = lerp(kxyQa, tkxyQa, 0.07 * PARIS_SOUND.k);
  kzyQa = lerp(kzyQa, tkzyQa, 0.05 * PARIS_SOUND.k);

  // Calculate stroke width dynamically based on distance between current and previous points
  strokeWidth = lerp(strokeWidth, dist(kxQa, kxyQa, kzyQa, pkxQa, pkxyQa, pkzyQa), 0.1);
  strokeWeight(max(0.1, 12 - strokeWidth)); // Adjusted to make the 'hl.random' fixed as it seemed out of context
// stroke(120);
  // Draw the line between the previous and current points
  line(kxQa, kxyQa, kzyQa, pkxQa, pkxyQa, pkzyQa);
  
  
  const circleRadius = 80; // Radius of the circle
  const circleX = adp1
  const circleY = adp3
 noFill();
  noStroke()
 // stroke(255);
 // fill(0)
  strokeWeight(max(0.1, 12 - strokeWidth)/1000);
// fill(0)
  ellipse(circleX, circleY, circleRadius * 2);
  fill(255)
  ellipse(circleX, circleY, circleRadius / 2);

  // Check collision with the circle
  if (dist(circleX, circleY, kxQa, kxyQa) <= circleRadius) {
    // Calculate the angle of incidence
    const angle = atan2(kxQa - circleY, kxQa - circleX);
    // Reflect the point
    tkxQa = circleX + cos(angle) * circleRadius * 1.5;
    tkxyQa = circleY + sin(angle) * circleRadius * 1.5;
  }

  // Update previous point coordinates
  pkxQa = kxQa;
  pkxyQa = kxyQa;
  pkzyQa = kzyQa;

  // Check if the current point is close to the target and reset target if true
  if (dist(kxQa, kxyQa, kzyQa, tkxQa, tkxyQa, tkzyQa) < 1) {
    tkxQa = random(-250, 250);
    tkxyQa = random(-250, 250);
    tkzyQa = random(-1, 1);
  }
}

function draw2QD() {
  // Set the stroke color to white
  stroke(255, adp15);

  // Interpolate the positions with different rates for each axis
  kxQad = lerp(kxQad, tkxQad, 0.02 * PARIS_SOUND.k); // Rapid change in the x-coordinate
  kxyQad = lerp(kxyQad, tkxyQad, 0.09 * PARIS_SOUND.k); // Slow change in the y-coordinate
  kzyQad = lerp(kzyQad, tkzyQad, 0.05 * PARIS_SOUND.k); // Moderate change in the z-coordinate

  // Dynamically adjust stroke width based on the distance between the current point and the previous point
  strokeWidth = lerp(strokeWidth, dist(kxQad, kxyQad, kzyQad, pkxQad, pkxyQad, pkzyQad), 0.1);
  strokeWeight(max(0.1, 12 - strokeWidth)); // Normalize stroke weight changes for visual stability

  // Draw a line from the previous point to the current point
  line(kxQad, kxyQad, kzyQad, pkxQad, pkxyQad, pkzyQad);

  // Define the circle

  const circleRadius = 80; // Radius of the circle
  const circleX = adp1
  const circleY = adp3
  
    // Define the second circle
  const circleX2 = adp2 + 200; // Positioned on the right
  const circleY2 = adp4;
  
  
  
 noFill();
  stroke(255);
  strokeWeight(max(0.1, 12 - strokeWidth)/1000);
 //fill(0)
 // fill(255)
  ellipse(circleX, circleY, circleRadius * 2);
// ellipse(circleX+200, circleY, circleRadius * 2);
    ellipse(circleX2, circleY2, circleRadius * 2);
  fill(0)
  ellipse(circleX2, circleY2, circleRadius / 2);

  // Check collision with the circle
  if (dist(circleX, circleY, kxQad, kxyQad) <= circleRadius) {
    // Calculate the angle of incidence
    const angle = atan2(kxyQad - circleY, kxQad - circleX);
    // Reflect the point
    tkxQad = circleX + cos(angle) * circleRadius * 1.5;
    tkxyQad = circleY + sin(angle) * circleRadius * 1.5;
  }
   // Check collision with the second circle
  if (dist(circleX2, circleY2, kxQad, kxyQad) <= circleRadius) {
    const angle = atan2(kxyQad - circleY2, kxQad - circleX2);
    tkxQad = circleX2 + cos(angle) * circleRadius * 2;
    tkxyQad = circleY2 + sin(angle) * circleRadius * 2;
  }

  // Update the previous points for the next frame
  pkxQad = kxQad;
  pkxyQad = kxyQad;
  pkzyQad = kzyQad;

  // Reset the target points if they are within a close range to introduce randomness and motion
  if (dist(kxQad, kxyQad, kzyQad, tkxQad, tkxyQad, tkzyQad) < 15) {
    tkxQad = random(-250, 250);
    tkxyQad = random(-250, 250);
    tkzyQad = random(-1, 1);
  }
}
