



let border = 75;
let steps = 4;
let seed, total = 100;
let sw = 2;
let canvas1, canvas2;

function setup() {
  createCanvas(500, 500);
  //colorMode(HSB, 360, 100, 100, 1); // Use HSB for easier color manipulation

  // تعریف دو لایه گرافیکی
  canvas1 = createGraphics(width, height);
  canvas2 = createGraphics(width, height);

const PM_PD = window.__GROKLY_FEED ? 1080 / 500 : 3; // در گروکلی ۱۰۸۰ پیکسل بس است (به جای ۱۵۰۰)؛ همان نقش، سبک‌تر
pixelDensity(PM_PD);
  canvas2.pixelDensity(PM_PD);
 canvas1.pixelDensity(PM_PD);
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
    canvas1.background(PM('paper'));
  // canvas1.background(PM('paper'));
 canvas2.clear(); // لایه دوم شفاف است

  seed = Date.now();
  ps1 = hl.random(440, 490);
  ps2 = hl.random(410, 490);
  ps3 = hl.random(0, 490);    
  qps1 = hl.random(0, 250);
  qps2 = hl.random(0, 250);
  qps3 = hl.random(0, 250);
  
  qps3a = hl.random(0, 150);
  qps3b = hl.random(0, 150);
  qps4 = hl.random(0, 250);

  gq1 = hl.random(50, 120);
  gq2 = hl.random(140, 200);
  gq3 = hl.random(180, 255);
  gq4 = hl.random(0, 250);
  gqa = hl.random(0, 250);
  gq5 = hl.random(5, 35);
  gq6= hl.random(5, 35);
  gq7= hl.random(5, 35);
  gq8= hl.random(30, 260);
  gq9= hl.random(30, 260);
  gq10= hl.random(20, 260);
  pw1 = hl.random(-150, 200);
  pw2 = hl.random(-100, 150);
  
  pw1a = hl.random(-150, 200);
  pw2a = hl.random(-100, 150);
  
  pw1b = hl.random(-350, -100);
  pw2b = hl.random(-350, -100);
  
  
 // fill(qw1, qw2, qw3, qw4);
  
   qw1 = hl.random(50, 120);
   qw2 = hl.random(140, 200);
   qw3 = hl.random(180, 255);
   qw4 = hl.random(200, 250);
   if (HAFEZ.palette.line) { qw1 = HAFEZ.palette.line[0]; qw2 = HAFEZ.palette.line[1]; qw3 = HAFEZ.palette.line[2]; }
  
  //fill(qw1b, qw2b, qw3b, qw4b);
  
  
  
  qw1b = hl.random(220, 255);
   qw2b = hl.random(0, 230);
   qw3b = hl.random(50, 100);
   qw4b = hl.random(10, 150);
   if (HAFEZ.palette.line) { qw1b = HAFEZ.palette.poppy[0]; qw2b = HAFEZ.palette.poppy[1]; qw3b = HAFEZ.palette.poppy[2]; }
  
   tu = hl.random(10, 350);
  tu2 = hl.random(5, 30);
  tup = hl.random(0.2, 3);
  
  
  // ایجاد 100 خط با موقعیت x تصادفی و ارتفاع ثابت
  for (let i = 0; i < tu2; i++) {
    let x = random(width);
    let h = random(100, 700);         // ارتفاع منحصر به‌فرد
    let w = random(0.1, 3);           // ضخامت منحصر به‌فرد
    lines.push({ x: x, offset: random(1000), h: h, weight: w });
  }

  
 // drawTree(canvas2); // رسم درخت در لایه دوم
}
let lines = [];

function draw() {
  // استفاده از لایه اول برای منحنی‌ها
  curvedLine(canvas1);
curvedLine2(canvas1);
curvedLine3(canvas1);
curvedLine4(canvas1);

  noFill()
  // نمایش هر دو لایه
  image(canvas1, 0, 0);
  image(canvas2, 0, 0);
  
  
 // translate(0, 250 );
    drawq()
  //translate(0, -250 );
  
  
  
  translate(0, 400 ); // خط افقی در وسط صفحه
   let spacing = width / 5;

  for (let i = 0; i < 200; i++) {
    let x = i * spacing + spacing / 2;
    let w = random(5, 40);              // عرض مستطیل‌ها
    let h = random(-150, 250) * __band(i); // ستون‌ها: هر ستون یک باند طیف + onset
    let angle = random(-PI / 3, -PI / 10);

    push();
    translate(x, 0);
    rotate(angle);
    fill(PM('paper'));
    stroke(PM('paper'));
    noStroke()
        fill(PM('paper'));
  rect(10, 70, w/random(4, 5), h);
   // fill(random(colBack));
    rect(0, 60, w/random(6, 5), h);
      fill(PM('paper'));
  rect(10, 50, w/random(5, 5), h);
    
    fill(PM('paper'))
   // fill(random(color2));
    circle(0, random(-100, 0),random(1, 10))
    // fill(random(colFront));
      //ellipse(0, 0, random(30,30), random(-30,30))
noStroke()

    //  ellipse(0, random(-200, 0), random(0,5), random(0,20))
    pop();
  }
   translate(0, -400 ); 

  noFill()
strokeWeight(hl.random(3, 4));
 // strokeWeight(1);
 //   stroke(PM('ink', 250)); // رنگ مشکی با شفافیت برای زیبایی بیشتر
 stroke(PM('paper'))
//stroke(PM('ink', 100));

 for (let i = 0; i < lines.length; i++) {
    if (!__grassShown(i, lines.length)) continue; // rolloff: تعداد علف‌ها
    let baseX = lines[i].x;
    let timeOffset = lines[i].offset;
    let h = lines[i].h;
    let w = lines[i].weight;

    let wind = (map(noise(timeOffset + frameCount * 0.01), 0, 1, -50, 50)) * __grassWind(); // علف‌ها: bass + sub + attack
  // fill(PM('paper', qps2))
  // fill(PM('ink', qps2-50))
    strokeWeight(w); // تنظیم ضخامت برای این خط

    bezier(
      baseX, height,
      baseX - 50 + wind, height - h / 2,
      baseX + 50 + wind, height - h / 2,
      baseX, height - h
    );
         
   noFill()

  }
 // stroke(PM('paper'))
drawk()
  
  //scale(0.8)

  
//drawk()
// scale(0.6) 
   translate(pw1a,pw2a)
   // تنه
 stroke(PM('ink'))
   strokeWeight(hl.random(1, 2));
  stroke(PM('paper'))
   line(width/2, height, width/2, height - 200); // تنه
//bezier(width/2, height, width/2 - 50, height - 100, width/2 + 50, height - 100, width/2, height - 200);
  drawg2()
  translate(-pw1a,-pw2a)
  
  
  
  
  steps += __growth() - 1; // lowMid: خط‌ها کمی تندتر رشد می‌کنند
  if (steps++ >= total) {
    total = floor(hl.random(10, 220));
    steps = 4;
    sw = hl.random(1.5, 3);
    seed = Date.now();
  }
  //scale(0.6)
 // drawg2()
//  xyz789()
  translate(pw1,pw2)
   // تنه
 stroke(PM('ink'))
   strokeWeight(hl.random(1, 2));
  stroke(PM('paper'))
  //line(width/2, height, width/2, height - 200); // تنه
bezier(width/2, height, width/2 - 50, height - 100, width/2 + 50, height - 100, width/2, height - 200);
 drawg()
  translate(-pw1,-pw2)
  

    translate(pw1b,pw2b)
   // تنه
 stroke(PM('ink'))
  stroke(PM('paper'))
   strokeWeight(hl.random(1, 2));
  // line(width/2, height, width/2, height - 200); // تنه
bezier(width/2, height, width/2 - 50, height - 100, width/2 + 50, height - 100, width/2, height - 200);
  xyz789()
  translate(pw1b,pw2b)
     
}
let f = 0;
const W = 500;

function curvedLine4(pg) {
  
   pg.noFill();
  pg.stroke(PM('ink', __inkAlpha(gq4 + 5)));
  pg.fill(PM('ink'))
  pg.strokeWeight(__inkWeight(sw / tup));
 // pg.rect(85,85,320,320)
  pg.noFill();
  pg.stroke(PM('ink', __inkAlpha(gq4 + 5)));
  pg.strokeWeight(__inkWeight(sw / tup));
  pg.beginShape();
//pg.fill(PM('ink'));
//  pg.noStroke();
  let lastX, lastY;

  for (let i = 0; i < steps; i++) {
    let edge = int(hl.random(0,4)); // انتخاب تصادفی یکی از چهار ضلع
    let x, y;

    if (edge === 0) { // بالا
      x = hl.random(border, width - border);
      y = border;
    } else if (edge === 1) { // راست
      x = width - border;
      y = hl.random(border, height - border);
    } else if (edge === 2) { // پایین
      x = hl.random(border, width - border);
      y = height - border;
    } else { // چپ
      x = border;
      y = hl.random(border, height - border);
    }

    // اطمینان از اینکه فاصله با نقطه قبلی زیاد نباشد
    if (i > 0 && dist(x, y, lastX, lastY) > 3) {
      i--;
      continue;
    }

    pg.curveVertex(x, y);
    lastX = x;
    lastY = y;
  }

  pg.endShape();
  
  
}
function curvedLine6() {
  noFill();
  stroke(PM('ink', gq4 + 5));
  strokeWeight(sw / 5);
  beginShape();

  let lastX, lastY;

  for (let i = 0; i < steps; i++) {
    let edge = int(hl.random(4)); // انتخاب تصادفی یکی از چهار ضلع
    let x, y;

    if (edge === 0) { // بالا
      x = hl.random(border, width - border);
      y = border;
    } else if (edge === 1) { // راست
      x = width - border;
      y = hl.random(border, height - border);
    } else if (edge === 2) { // پایین
      x = hl.random(border, width - border);
      y = height - border;
    } else { // چپ
      x = border;
      y = hl.random(border, height - border);
    }

    if (i > 0 && dist(x, y, lastX, lastY) > gq8) {
      i--;
      continue;
    }

    curveVertex(x, y);
    lastX = x;
    lastY = y;
  }

  endShape();
}
function curvedLine(pg) {
  pg.noFill();
// pg.stroke(gq1, gq2, gq3, 255);
  pg.stroke(PM('ink', __inkAlpha(gq4+5)));
  pg.strokeWeight(__wInk(sw / 5));
  pg.beginShape();
  let x = 0, y = 0;
  let lastX = hl.random(border, width - border);
  let lastY = hl.random(border, height - border);
  for (let i = 0; i < steps; i++) {
    do {
      x = hl.random(border, width - border);
      y = hl.random(border, height - border);
    } while (dist(x, y, lastX, lastY) > gq8);
    pg.curveVertex(x, y);
    lastX = x;
    lastY = y;
  }
  pg.endShape();
}

function curvedLine2(pg) {
  pg.noFill();
  pg.stroke(gq1 , gq2 , gq3 , hl.random(0,255));
 // pg.stroke(qps2, 0, qps1, qps2+190);
  pg.stroke(PM('paper', __creamAlpha(gq4)))
  pg.strokeWeight(__wCream(sw / 5));
  pg.beginShape();
  let x = 0, y = 0;
  let lastX = hl.random(border, width - border);
  let lastY = hl.random(border, height - border);
  for (let i = 0; i < steps; i++) {
    do {
      x = hl.random(border, width - border);
      y = hl.random(border, height - border);
    } while (dist(x, y, lastX, lastY) > gq9);
    pg.curveVertex(x, y);
    lastX = x;
    lastY = y;
  }
  pg.endShape();
}

function curvedLine3(pg) {
  pg.noFill();
//  pg.stroke(gq1 - 23, gq2 - 34, gq3 - 12, hl.random(0,255));
  pg.stroke(PM('paper'))
  pg.stroke(qw1b+30, qw2b+40, qw3b+15, qw4b);
  pg.stroke(qw1, qw2, qw3, __lineAlpha(qw4)); // خط رنگی: voiced
  
//  pg.stroke(qps1, r, qps2, qps1+190);
  pg.strokeWeight(__wColour(sw / 2));
  pg.beginShape();
  let x = 0, y = 0;
  let lastX = hl.random(border, width - border);
  let lastY = hl.random(border, height - border);
  for (let i = 0; i < steps; i++) {
    do {
      x = hl.random(border, width - border);
      y = hl.random(border, height - border);
    } while (dist(x, y, lastX, lastY) > gq10);
    pg.curveVertex(x, y);
    lastX = x;
    lastY = y;
  }
  pg.endShape();
}

// رسم درخت ساده در لایه دوم


let noiseMax = 3; // مقدار ثابت به جای اسلایدر
let zoff = 0; //Z offset


function drawg() {
//  background(0); // black background
  translate(width / 2, height / 2); //Translate to Center of Canvas
  rotate(__breath()); // tempoPhase: چرخش نفس‌وار
  stroke(PM('ink'))
     strokeWeight(hl.random(1, 3));
  
 // line(width/2, height, width/2, height - 200);
  
  stroke(255); //White Stroke Value
  noFill(); //Do not Fill
 beginShape(); //Begin drawing a shape
  for (let a = 0; a < TWO_PI; a += 0.3) { //Looping around a circle
    let xoff = map(cos(a), -1, 1, 0, 1)*4;
    let yoff = map(sin(a), -1, 1, 0, 1)*4;
    let r = map(noise(xoff * __petalFreq(), yoff * __petalFreq(), zoff), 0, 1, 25, noiseMax * 25) + __tremble(a, zoff);
    let x = r * cos(a);
    let y = r * sin(a);
   // stroke(map(r, 100, 200, 0, 255), 0, map(r, 100, 200, 255, 0));
    stroke(PM('ink'))
 //   stroke(PM('paper'));
    strokeWeight(0.3)
   stroke(map(r, 100, 200, 100, 255), 0, 0);
      
     //   stroke(map(r, 100, 200, 200, 235), 0, 0);
     //stroke(qps2, r, qps1, qps2+190);
strokeWeight(2)
    
    stroke(map(r, 100, 200, 205, hl.random(10, 255)), 0, 0);
  // stroke(PM('ink'))
   // stroke(PM('paper'))
   // line(1 * cos(a), 1 * sin(a), x, y);
//stroke(qps1, r, qps2, qps1+190);
    stroke(qw1b, qw2b, qw3b, qw4b);
    stroke(PM('paper'))
    stroke(qw1, qw2, qw3, qw4);
     stroke(PM('ink', qps3a))
    line(60 * cos(a), 60 * sin(a), x, y);
   // vertex(x, y);
  }
  endShape(CLOSE);
  beginShape(); //Begin drawing a shape
  for (let a = 0; a < TWO_PI; a += 0.09) { //Looping around a circle
    let xoff = map(cos(a), -1, 1, 0, 1)*2;
    let yoff = map(sin(a), -1, 1, 0, 1)*2;
    let r = map(noise(xoff * __petalFreq(), yoff * __petalFreq(), zoff), 0, 1, 25, noiseMax * 25) + __tremble(a, zoff);
    let x = r * cos(a);
    let y = r * sin(a);
   // stroke(map(r, 100, 200, 0, 255), 0, map(r, 100, 200, 255, 0));
    stroke(PM('ink'))
 //   stroke(PM('paper'));
    strokeWeight(0.3)
  //  stroke(map(r, 100, 200, 100, 255), 0, 0);
      
     //   stroke(map(r, 100, 200, 200, 235), 0, 0);
     //stroke(qps2, r, qps1, qps2+190);
strokeWeight(1)
    
    stroke(map(r, 100, 200, 205, hl.random(10, 255)), 0, 0);
   //stroke(PM('ink'))
  // stroke(PM('paper'))
   // line(1 * cos(a), 1 * sin(a), x, y);
///stroke(qps1, r, qps2, qps1+190);
   // stroke(qw1b+30, qw2b+40, qw3b+15, qw4b);
    stroke(PM('paper'))
    stroke(PM('paper'))
    line(1 * cos(a), 1 * sin(a), x, y);
    //vertex(x, y);
  }
  endShape(CLOSE);
  
    beginShape(); //Begin drawing a shape
  for (let a = 0; a < TWO_PI; a += 0.3) { //Looping around a circle
    let xoff = map(cos(a), -1, 1, 0, 1)*3;
    let yoff = map(sin(a), -1, 1, 0, 1)*3;
    let r = map(noise(xoff * __petalFreq(), yoff * __petalFreq(), zoff), 0, 1, 25, noiseMax * 25) + __tremble(a, zoff);
    let x = r * cos(a);
    let y = r * sin(a);
   // stroke(map(r, 100, 200, 0, 255), 0, map(r, 100, 200, 255, 0));
   // stroke(PM('paper'))
  //  stroke(hl.random(220, 255), hl.random(0, 230), hl.random(50, 100), 255);
    strokeWeight(0.1)
     stroke(map(r, 100, 200, 235, hl.random(10, 255)), 0, 0);
   // stroke(qps1, r, qps2, qps1+190);
   //stroke(255)
    
  stroke(PM('paper', hl.random(10, 255)))
    line(hl.random(10, 20) * cos(a), hl.random(10, 20) * sin(a), x, y);
   // vertex(x, y);
  }
  endShape(CLOSE);
  
    beginShape(); //Begin drawing a shape
  for (let a = 0; a < TWO_PI; a += 0.3) { //Looping around a circle
    let xoff = map(cos(a), -1, 2, 0, 1)*4;
    let yoff = map(sin(a), -1, 2, 0, 1)*4;
    let r = map(noise(xoff * __petalFreq(), yoff * __petalFreq(), zoff), 0, 1, 10, noiseMax * 10) + __tremble(a, zoff);
    let x = r * cos(a);
    let y = r * sin(a);
   // stroke(map(r, 100, 200, 0, 255), 0, map(r, 100, 200, 255, 0));
   stroke(PM('ink', 150))
    strokeWeight(0.5)
  //  stroke(hl.random(220, 255), hl.random(0, 230), hl.random(50, 100), 255);
    // stroke(map(r, 100, 200, 100, 255), 0, 0);
       //stroke(qps2, r, qps1, qps2+190);
    stroke(PM('ink'))
    stroke(
  map(r, 100, 200, 205, gq4), // قرمز
  map(r, 100, 200, 205, gqa), // سبز
  0 // آبی
);
   stroke(255)
    
    stroke(qw1, qw2, qw3, qw4);
     stroke(PM('ink', qps4))
    //strokeWeight(0.05)
   // stroke(qw1b-40, qw2b-68, qw3b-43, qw4b);
    //stroke(qps2, r, qps1, qps2+190);
line(1 * cos(a), 1 * sin(a), x, y);
    //fill(PM('ink'))
   // circle(1 * cos(a), 1 * sin(a), 80)
    
  // vertex(x, y);
    
  }
  endShape(CLOSE);
  
stroke(PM('ink'))
   // تنه

  zoff += 0.01 * __morph(); // شقایق: voiced + flux، در سکوت آرام
}

function drawg2() {
//  background(0); // black background
  translate(width / 2, height / 2); //Translate to Center of Canvas
  rotate(__breath()); // tempoPhase: چرخش نفس‌وار
  stroke(255); //White Stroke Value
  noFill(); //Do not Fill
 beginShape(); //Begin drawing a shape
  for (let a = 0; a < TWO_PI; a += 0.6) { //Looping around a circle
    let xoff = map(cos(a), -1, 1, 0, 1)*4;
    let yoff = map(sin(a), -1, 1, 0, 1)*4;
    let r = map(noise(xoff * __petalFreq(), yoff * __petalFreq(), zoff), 0, 1, 25, noiseMax * 25) + __tremble(a, zoff);
    let x = r * cos(a);
    let y = r * sin(a);
   // stroke(map(r, 100, 200, 0, 255), 0, map(r, 100, 200, 255, 0));
    stroke(PM('ink'))
 //   stroke(PM('paper'));
    strokeWeight(0.3)
   stroke(map(r, 100, 200, 100, 255), 0, 0);
      
     //   stroke(map(r, 100, 200, 200, 235), 0, 0);
     //stroke(qps2, r, qps1, qps2+190);
strokeWeight(2)
    
    stroke(map(r, 100, 200, 205, hl.random(10, 255)), 0, 0);
  // stroke(PM('ink'))
   // stroke(PM('paper'))
   // line(1 * cos(a), 1 * sin(a), x, y);
//stroke(qps1, r, qps2, qps1+190);
     stroke(qw1, qw2, qw3, qw4);
    
    stroke(qw1b+30, qw2b+40, qw3b+15, qw4b);
    stroke(PM('paper'))
     stroke(PM('ink', qps3b))
    line(60 * cos(a), 60 * sin(a), x, y);
   // vertex(x, y);
  }
  endShape(CLOSE);
  beginShape(); //Begin drawing a shape
  for (let a = 0; a < TWO_PI; a += 0.2) { //Looping around a circle
    let xoff = map(cos(a), -1, 1, 0, 1)*2;
    let yoff = map(sin(a), -1, 1, 0, 1)*2;
    let r = map(noise(xoff * __petalFreq(), yoff * __petalFreq(), zoff), 0, 1, 25, noiseMax * 25) + __tremble(a, zoff);
    let x = r * cos(a);
    let y = r * sin(a);
   // stroke(map(r, 100, 200, 0, 255), 0, map(r, 100, 200, 255, 0));
    stroke(PM('ink'))
 //   stroke(PM('paper'));
    strokeWeight(hl.random(0.1, 0.9))
  //  stroke(map(r, 100, 200, 100, 255), 0, 0);
      
     //   stroke(map(r, 100, 200, 200, 235), 0, 0);
     //stroke(qps2, r, qps1, qps2+190);
strokeWeight(1)
    
    stroke(map(r, 100, 200, 205, hl.random(10, 255)), 0, 0);
   //stroke(PM('ink'))
  // stroke(PM('paper'))
   // line(1 * cos(a), 1 * sin(a), x, y);
///stroke(qps1, r, qps2, qps1+190);
    //stroke(qw1-30, qw2+30, qw3+23, qw4);
  //  stroke(qw1b+30, qw2b+40, qw3b+15, qw4b);
    stroke(PM('paper'))
    line(1 * cos(a), 1 * sin(a), x, y);
    //vertex(x, y);
  }
  endShape(CLOSE);
  
    beginShape(); //Begin drawing a shape
  for (let a = 0; a < TWO_PI; a += 0.03) { //Looping around a circle
    let xoff = map(cos(a), -1, 1, 0, 1)*3;
    let yoff = map(sin(a), -1, 1, 0, 1)*3;
    let r = map(noise(xoff * __petalFreq(), yoff * __petalFreq(), zoff), 0, 1, 25, noiseMax * 25) + __tremble(a, zoff);
    let x = r * cos(a);
    let y = r * sin(a);
   // stroke(map(r, 100, 200, 0, 255), 0, map(r, 100, 200, 255, 0));
   // stroke(PM('paper'))
  //  stroke(hl.random(220, 255), hl.random(0, 230), hl.random(50, 100), 255);
    strokeWeight(0.1)
     stroke(map(r, 100, 200, 235, hl.random(10, 255)), 0, 0);
   // stroke(qps1, r, qps2, qps1+190);
   // stroke(PM('ink'))
   // stroke(qw1+40, qw2+12, qw3+56, qw4);
 // stroke(PM('paper', hl.random(10, 255)))
    stroke(PM('paper'))
    line(hl.random(10, 20) * cos(a), hl.random(10, 20) * sin(a), x, y);
   // vertex(x, y);
  }
  endShape(CLOSE);
  
    beginShape(); //Begin drawing a shape
  for (let a = 0; a < TWO_PI; a += 0.3) { //Looping around a circle
    let xoff = map(cos(a), -1, 2, 0, 1)*1;
    let yoff = map(sin(a), -1, 2, 0, 1)*1;
    let r = map(noise(xoff * __petalFreq(), yoff * __petalFreq(), zoff), 0, 1, 10, noiseMax * 10) + __tremble(a, zoff);
    let x = r * cos(a);
    let y = r * sin(a);
   // stroke(map(r, 100, 200, 0, 255), 0, map(r, 100, 200, 255, 0));
   stroke(PM('ink', 150))
    strokeWeight(1)
  //  stroke(hl.random(220, 255), hl.random(0, 230), hl.random(50, 100), 255);
    // stroke(map(r, 100, 200, 100, 255), 0, 0);
       //stroke(qps2, r, qps1, qps2+190);
    stroke(PM('ink'))
    stroke(
  map(r, 100, 200, 205, gq4), // قرمز
  map(r, 100, 200, 205, gqa), // سبز
  0 // آبی
);
   stroke(PM('ink'))
     stroke(PM('ink', qps3b))
 //   stroke(qw1, qw2, qw3, qw4);
  // stroke(255)
    //stroke(qps2, r, qps1, qps2+190);
 line(10 * cos(a), 10 * sin(a), x, y);
    //fill(PM('ink'))
   // circle(1 * cos(a), 1 * sin(a), 80)
    
   // vertex(x-60, y);
    
  }
  endShape(CLOSE);
  
stroke(PM('ink'))
   // تنه

  zoff += 0.01 * __morph(); // شقایق: voiced + flux، در سکوت آرام
  translate(-width / 2, -height / 2);
}
let abc123 = 3; // مقدار ثابت به جای اسلایدر
let def456 = 0; // Z offset

function xyz789() {
  translate(width / 2, height / 2);
  stroke(255);
  noFill();
  beginShape();
  for (let jkl = 0; jkl < TWO_PI; jkl += 0.3) {
    let mno = map(cos(jkl), -1, 1, 0, 1) * 4;
    let pqr = map(sin(jkl), -1, 1, 0, 1) * 4;
    let stu = map(noise(mno * __petalFreq(), pqr * __petalFreq(), def456), 0, 1, 25, abc123 * 25) + __tremble(jkl, def456);
    let vwx = stu * cos(jkl);
    let yz0 = stu * sin(jkl);
    stroke(PM('ink'));
    strokeWeight(0.3);
    stroke(map(stu, 100, 200, 100, 255), 0, 0);
    strokeWeight(2);
    stroke(map(stu, 100, 200, 205, hl.random(10, 255)), 0, 0);
    stroke(PM('paper'))
    stroke(qw1b, qw2b, qw3b, qw4b);
      stroke(PM('poppy'))
    stroke(PM('poppy'))
    line(60 * cos(jkl), 60 * sin(jkl), vwx, yz0);
  }
  endShape(CLOSE);

  beginShape();
  for (let jkl = 0; jkl < TWO_PI; jkl += 0.03) {
    let mno = map(cos(jkl), -1, 1, 0, 1) * 2;
    let pqr = map(sin(jkl), -1, 1, 0, 1) * 2;
    let stu = map(noise(mno * __petalFreq(), pqr * __petalFreq(), def456), 0, 1, 25, abc123 * 25) + __tremble(jkl, def456);
    let vwx = stu * cos(jkl);
    let yz0 = stu * sin(jkl);
    stroke(PM('ink'));
    strokeWeight(10.3);
   // strokeWeight(1);
    stroke(qw1b, qw2b, qw3b, qw4b+200);
    
    stroke(PM('poppy'))
    stroke(PM('poppy'))
    stroke(PM('poppy'))
 /// stroke(map(stu, 100, 200, 205, hl.random(10, 255)), 0, 0);
   // stroke(PM('paper'))
    line(1 * cos(jkl), 1 * sin(jkl), vwx, yz0);
  }
  endShape(CLOSE);

  beginShape();
  for (let jkl = 0; jkl < TWO_PI; jkl += 0.03) {
    let mno = map(cos(jkl), -1, 1, 0, 1) * 3;
    let pqr = map(sin(jkl), -1, 1, 0, 1) * 3;
    let stu = map(noise(mno * __petalFreq(), pqr * __petalFreq(), def456), 0, 1, 25, abc123 * 25) + __tremble(jkl, def456);
    let vwx = stu * cos(jkl);
    let yz0 = stu * sin(jkl);
    strokeWeight(0.1);
    stroke(map(stu, 100, 200, 235, hl.random(10, 255)), 0, 0);
    stroke(PM('paper'))
     stroke(qw1b, qw2b, qw3b, qw4b+200);
   // stroke(PM('poppy'))
  // stroke(PM('ink'))
   //  stroke(PM('poppy'))
    line(hl.random(10, 20) * cos(jkl), hl.random(10, 20) * sin(jkl), vwx, yz0);
  }
  endShape(CLOSE);

  beginShape();
  for (let jkl = 0; jkl < TWO_PI; jkl += 0.2) {
    let mno = map(cos(jkl), -1, 2, 0, 1) * 4;
    let pqr = map(sin(jkl), -1, 2, 0, 1) * 4;
    let stu = map(noise(mno * __petalFreq(), pqr * __petalFreq(), def456), 0, 1, 5, abc123 * 5) + __tremble(jkl, def456);
    let vwx = stu * cos(jkl);
    let yz0 = stu * sin(jkl);
    stroke(PM('ink', 150));
    strokeWeight(6);
    stroke(PM('ink'));
    stroke(
      map(stu, 100, 200, 205, gq4),
      map(stu, 100, 200, 205, gqa),
      0
    );
    stroke(PM('ink'));
   // stroke(qw1b, qw2b, qw3b, qw4b);
    line(1 * cos(jkl), 1 * sin(jkl), vwx, yz0);
  }
  endShape(CLOSE);

  stroke(PM('ink'));
  def456 += 0.01 * __morph();
  translate(-width / 2, -height / 2);
}
//CONTROLS


function drawk() {
 // background(0);

    stroke(PM('paper', 180)); // معادل stroke(W) در Processing، که رنگ سفید را نشان می‌دهد
 //stroke(PM('ink', 80))
  strokeWeight(__spiralW(2));

  for (let n = 0; n < TAU / 3; n += 0.4) {
    let r = 500 * cos(n / 3.7 + f / 85);
    let x = qps1 + r * cos(n);
    let y = qps2 + r * sin(n);
    let i = n * sin(f / qps2) + f / qps2;
  // stroke(qps1, r, qps2, qps1+190);
    stroke(PM('paper'))
    stroke(qps2, r, qps1, qps2+190);
    stroke(PM('paper'))
    line(x + hl.random(1, 13) * __jit() * cos(i)+5, y + hl.random(1, 13) * __jit() * sin(i)+5, x - 2 * cos(i), y - 2 * sin(i)); // air: لرزش
    
     strokeWeight(1);
   // strokeWeight(7+50);
   line(x + hl.random(1, 3) * cos(i)+5, y + hl.random(1, 13) * sin(i)+5, x - hl.random(1, 3) * cos(i), y - hl.random(1, 13) * sin(i));
     strokeWeight(0.5);
     line(x + hl.random(1, 8) * cos(i)+5, y + hl.random(1, 8) * sin(i)+5, x - hl.random(1, 8) * cos(i), y - hl.random(1, 8) * sin(i));
    
    
  }

  f += __spin(); // مارپیچ: tempo، pitchDelta جهت، سکوت آرام
}

let hueOffset = 0; // To animate the color
function drawq() {
  // Create a subtle, evolving background
//  background(0, 0.05); // Adjust the transparency for desired fade

  // --- Calculate Ball Position First ---
  let ballRadius = hl.random (2,4); // Size of the ball
  let ballDistance = 50; // How far from the center the ball moves
  let ballSpeedFactor = 0.0002; // Controls how fast the ball moves around its path

  let ballX = W / 2 + ballDistance * cos(f * ballSpeedFactor);
  let ballY = W / 2 + ballDistance * sin(f * ballSpeedFactor);

  // --- Add the moving ball ---
  let ballHue = (f * 0.5 + hueOffset + 180) % 360;
  fill(ballHue, 90, 100, 1);
  noStroke();
  fill(255)
  ellipse(ballX, ballY, ballRadius * 2);

  // --- Layer 1: Thicker, darker points ---
  let baseHue1 = (f * 0.5 + hueOffset) % 360;
  stroke(baseHue1, 80, 70, 0.5);
  strokeWeight(3); // Increased weight for visibility as points
stroke(PM('ink'))
  for (let n = 0; n < TAU * 2; n += 0.05) {
    let r = 5 * cos(n / 3.7 + f / 90) * (1 + sin(f / 150) * 0.15);

    // Calculate x and y relative to the ball's position
    let x = ballX + r * cos(n);
    let y = ballY + r * sin(n);

    // We only need one point, so we'll use the first set of coordinates
   // point(x + 2220 * cos(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5), y + 2220 * sin(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5));
   
    
  }

  // --- Layer 2: Thinner, brighter points ---
  let baseHue2 = (f * 0.5 + hueOffset + 60) % 360;
  stroke(baseHue2, 60, 90, 0.3);
  strokeWeight(2); // Adjusted weight
stroke(255)
  for (let n = 0; n < TAU * 2; n += 0.05) {
    let r = 5 * cos(n / 3.7 + f / 90) * (1 + sin(f / 150) * 0.15);

    let x = ballX + r * cos(n);
    let y = ballY + r * sin(n);

  //  point(x + 20 * cos(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 5, y + 20 * sin(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 5);
  }

  // --- Layer 3: Very thin, very bright highlights (points) ---
  let baseHue3 = (f * 0.5 + hueOffset + 120) % 360;
  stroke(baseHue3, 40, 100, 0.15);
  strokeWeight(0.1); // Adjusted weight
stroke(PM('ink', 0))
  for (let n = 0; n < TAU * 2; n += 0.05) {
    let r = 9 * cos(n / 3.7 + f / 90) * (1 + sin(f / 150) * 0.15);

    let x = ballX + r * cos(n);
    let y = ballY + r * sin(n);

    point(x + 20 * cos(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 10,
          y + 20 * sin(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 10);
    // rect((x + 20 * cos(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 10,y + 20 * sin(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 10),x + 20 * cos(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 10,10,10)
    fill(PM('sun', __sunAlpha()))
    //fill(PM('paper'))
    circle((x + 20 * cos(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 10,y + 20 * sin(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 10),x + 20 * cos(n * sin(f / 50) + f / 200 + cos(n * 5 + f / 30) * 0.5) + 10,__sunSize(50)) // خورشید: mid
    
    ;
  }

  f += 1 + sin(f / 60) * 0.5;
  hueOffset = (hueOffset + 0.1) % 360;
}
