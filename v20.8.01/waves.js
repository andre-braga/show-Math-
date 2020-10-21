/*
Adapted from p5.js example of a sine wave. Original by Daniel Shiffman.
https://p5js.org/examples/math-sine-wave.html
*/

let xspacing = 3; 
let w; 
let theta = 0.0; 
let amplitude = 75.0; 
let period = 670; 
let dx; 
let sinvalues = []; 
let drawsin = true;
let cosvalues = []; 
let drawcos = true;
let tanvalues = []; 
let drawtan = true;
let halfheight;

function setup() {
  let canvas = createCanvas(900, 400);
  canvas.parent('waves');
  colorMode(HSB);
  w = width + 16;
  halfheight = height/2;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

  togSin = createButton('toggle sin wave');
  togSin.parent('sin');
  togSin.id('togSin');
  togSin.size(100, 40);
  togSin.mousePressed(toggleSin);
  togSin.touchStarted(toggleSin);

  togCos = createButton('toggle cos wave');
  togCos.parent('cos');
  togCos.id('togCos');
  togCos.size(100, 40);
  togCos.mousePressed(toggleCos);
  togCos.touchStarted(toggleCos);

  togTan = createButton('toggle tan wave');
  togTan.parent('tan');
  togTan.id('togTan');
  togTan.size(100, 40);
  togTan.mousePressed(toggleTan);
  togTan.touchStarted(toggleTan);
}

function draw() {
  strokeJoin(ROUND);
  background(0);
  stroke('white');
  strokeWeight(1);
  line(0, height/2, width, height/2);
  calcWave();
  renderWave();
}

function calcWave() {
  theta += 0.04;

  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    sinvalues[i] = sin(x) * amplitude;
    cosvalues[i] = cos(x) * amplitude;
    tanvalues[i] = tan(x) * amplitude;
    x += dx;
  }
}

function renderWave() {

  for (let x = 0; x < yvalues.length - 1; x++) {

    let colorMap = map(x, 0, yvalues.length - 2, 30, 100);
    let jump1 = x * xspacing;
    let jump2 = (x + 1) * xspacing;

    if (drawsin) {

      let sinx = sinvalues[x];

      if (sinx >= 74.99) {
        strokeWeight(1);
        stroke('white');
        line(jump1, halfheight, jump1, halfheight + amplitude);
      }
      else if (sinx <= -74.99) {
        strokeWeight(1);
        stroke('white');
        line(jump1, halfheight, jump1, halfheight - amplitude);
      }
      strokeWeight(3);
      stroke(0, colorMap, colorMap);
      line(jump1, sinx + halfheight, jump2, sinvalues[x+1] + halfheight);
    }

    if (drawcos) {

      let cosx = cosvalues[x];

      if (cosx >= 74.99) {
        strokeWeight(1);
        stroke('white');
        line(jump1, halfheight, jump1, halfheight + amplitude);
      }
      else if (cosx <= -74.99) {
        strokeWeight(1);        
        stroke('white');
        line(jump1, halfheight, jump1, halfheight - amplitude);
      }
      strokeWeight(3);
      stroke(240, colorMap, colorMap);
      line(jump1, cosx + halfheight, jump2, cosvalues[x+1] + halfheight);
    }

    if (drawtan) {

      let tanx = tanvalues[x];

      if (tanx + halfheight >= height && tanvalues[x+1]+ halfheight <= 0) {
        ;
      }
      else{
        strokeWeight(3);
        stroke(120, colorMap, colorMap);
        line(jump1, tanx + halfheight, jump2, tanvalues[x+1] + halfheight);
      }
    }
  }
}

function toggleSin(){
  if (drawsin) {
    drawsin = false;
  }
  else drawsin = true;
}

function toggleCos(){
  if (drawcos) {
    drawcos = false;
  }
  else drawcos = true;
}

function toggleTan(){
  if (drawtan) {
    drawtan = false;
  }
  else drawtan = true;
}
