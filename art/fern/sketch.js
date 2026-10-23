


let colors = ['#52489c', '#4062bb', '#59c3c3', '#ebebeb', '#f45b69', '#454545',"#F1FAEE","#A8DADC","#457B9D","#1D3557","#03045E","#023E8A","#0077B6","#0096C7","#00B4D8","#48CAE4","#90E0EF","#ADE8F4","#CAF0F8","#FFBE0B","#FB5607","#FF006E","#3A86FF","#F72585","#3A0CA3","#4361EE","#4CC9F0", "#817c77", "#403b3f", "#cd4446", "#f2bc45", "#e9e0d6", "#2fa494", "#87a4aa", "#bbd7c9", "#c8958b", "#e2c48c", "#efb4a5", "#396c68", "#89e3b7", "#f59647", "#d63644", "#893f49", "#4d3240", "#fd3741", "#fe4f11", "#ff6800", "#ffa61a", "#ffc219", "#ffd114", "#fcd82e", "#f4d730", "#ced562", "#8ac38f", "#79b7a0", "#72b5b1", "#5b9bae", "#6ba1b7", "#49619d", "#604791", "#721e7f", "#9b2b77", "#ab2562", "#ca2847", "#fd3741", "#fe4f11", "#ff6800", "#ffa61a", "#ffc219", "#ffd114", "#fcd82e", "#f4d730", "#ced562", "#8ac38f", "#79b7a0", "#72b5b1", "#5b9bae", "#6ba1b7", "#49619d", "#604791", "#721e7f", "#9b2b77", "#ab2562", "#403b3f", "#cd4446", "#f2bc45", "#e9e0d6", "#2fa494", "#87a4aa", "#bbd7c9", "#c8958b", "#e2c48c", "#efb4a5", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8", "#1c344a", "#325e86", "#c4d7e9", "#fdfeff", "#cee7f3", "#2c89b5", "#689aa2", "#d4d5c7", "#bac3b7", "#a0b3ab", "#87a3a0", "#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#f55200", "#ff6d00", "#ff8500", "#ff9100", "#ff9e00", "#403b3f", "#cd4446", "#f2bc45", "#e9e0d6", "#2fa494", "#87a4aa", "#bbd7c9", "#c8958b", "#e2c48c", "#efb4a5", "#590d22", "#800f2f", "#a4133c", "#c9184a", "#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1", "#ffccd5", "#fff0f3", "#fadde1", "#ffc4d6", "#ffa6c1", "#ff87ab", "#ff5d8f", "#ff97b7", "#ffacc5", "#ffcad4", "#f4acb7", "#ffe0e9", "#ffc2d4", "#ff9ebb", "#ff7aa2", "#e05780", "#b9375e", "#8a2846", "#602437", "#522e38", "#ff0a54", "#ff477e", "#ff5c8a", "#ff7096", "#ff85a1", "#ff99ac", "#fbb1bd", "#f9bec7", "#f7cad0", "#fae0e4", "#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8", "#1c344a", "#325e86", "#2c89b5", "#689aa2", "#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8"];
// قلاب پالت (fern-hafez.js): کد پیش‌فرض همین رنگ‌ها را نگه می‌دارد؛ کدهای دیگر از روی هش پالت حافظ یا زیرپالت خود اثر را می‌گیرند
if (window.FERN_PALETTE) colors = FERN_PALETTE.apply(colors);
// قلاب صدا (fern-sound.js): بی‌صدا همهٔ ضریب‌ها خنثی‌اند و حرکت همان حرکت اصلی است
const FS = window.FERN_SOUND;

const particles = [];
let scale, theme, graphics;

function setup() {
  createCanvas(800, 800);
  pixelDensity(window.__GROKLY_FEED ? 1080 / 800 : 3); // در گروکلی ۱۰۸۰ پیکسل بس است (به جای ۲۴۰۰)؛ همان نقش، سبک‌تر
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
  noStroke();
  
  scale = hl.random(1, 500);
  theme = { background: "#f0f0f0" };
  
  graphics = createGraphics(width, height);
  graphics.background(theme.background);
  
  for (let i = 0; i < 1200; i++) particles.push(new Particle());
}

function draw() {
  FS.frame(); // صدا: یک بار در هر فریم همهٔ ویژگی‌ها نرم و جهت به‌روز می‌شود
  particles.forEach(p => {
    p.update();
    p.addTrailEffect();
    p.draw();
    p.draw();
  });
  
  image(graphics, 0, 0);
}

class Particle {
  constructor() {
    this.pos = createVector(hl.random(width), hl.random(height));
    this.prevPos = this.pos.copy();
    this.color = hl.randomElement(colors);
    this.baseSize = hl.random(0.5, 4);
    this.alpha = hl.randomInt(20, 60);
    this.inkVariation = hl.random(0.1, 0.5);
    this.i = particles.length; // شمارهٔ ذره: باند طیفی و گروه ضربش از این است (بدون مصرف عدد تصادفی)
    this.ph = 0;               // فاز نفس کشیدن نقطه (بی‌صدا = frameCount × inkVariation)
  }

  update() {
    this.prevPos = this.pos.copy();
    
    let angleX = this.pos.x / scale;
    let angleY = this.pos.y / scale;
    let noiseVal = (sin(angleX) + cos(angleY) + 2) / 4;
    let angle = noiseVal * TWO_PI * scale + FS.turn(this); // صدا: خمیدگی، تاب و چرخش جهت (با هر تنش صدا برمی‌گردد)
    
    const st = FS.step(this, angle); // صدا: گام و رشد (بی‌صدا = cos/sin × ۲)
    this.pos.add(st[0], st[1]);
    this.ph += this.inkVariation * FS.breathRate(); // صدا: سرعت نفس کشیدن نقطه
    
    if (this.pos.x < -100 || this.pos.x > width + 100 || 
        this.pos.y < -100 || this.pos.y > height + 100) {
      this.pos.set(hl.random(width), hl.random(height));
      this.prevPos = this.pos.copy();
    }
  }

  addTrailEffect() {
    if (frameCount % FS.trailEvery() === 0) { // صدا: تراکم ردّ خط
      graphics.stroke(this.cs || (this.cs = color(this.color))); // parsed once (same colour; the hex parse cost ~2,400 calls a frame)
      graphics.strokeWeight(hl.random(0.5, 1.5) * FS.trailW()); // صدا: ضخامت خط
      graphics.line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    }
  }

  draw() {
    let inkSize = this.baseSize * (1 + sin(this.ph) * FS.breathDepth()) * FS.size(this); // صدا: نفس، ضربه و باند
    
    // one p5.Color per particle, parsed once; setAlpha below overwrites its alpha every frame, so it is the same colour
    let c = this.cf || (this.cf = color(this.color));
    c.setAlpha(this.alpha * map(inkSize, 0.5, 4, 0.7, 1) * FS.ink()); // صدا: غلظت جوهر
    
    graphics.noStroke();
    graphics.fill(c);
    graphics.circle(
      this.pos.x + hl.random(-0.3, 0.3) * FS.jitter(), // صدا: لرزش ریز
      this.pos.y + hl.random(-0.3, 0.3) * FS.jitter(), 
      inkSize * hl.random(1.2, 1.8)
    );
  }
}

function mousePressed() {
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

mouseDragged = mousePressed;

function granulateRedShift(amount) {
  loadPixels();
  const d = pixelDensity();
  const pixelsCount = 4 * (width * d) * (height * d);
  for (let i = 0; i < pixelsCount; i += 4) {
    pixels[i] = pixels[i] + amount;
    pixels[i + 1] = pixels[i + 1] + hl.random(-amount, amount);
    pixels[i + 2] = pixels[i + 2] + hl.random(-amount * 2, amount * 2);
    pixels[i + 3] = pixels[i + 3] + hl.random(-amount * 2, amount * 2);
  }
  updatePixels();
}
