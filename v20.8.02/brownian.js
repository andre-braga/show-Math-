/*
This isn't my favorite issue, but my Professor recommended it.

Adapted from p5js.org example of 2d brownian motion.
https://p5js.org/examples/simulate-brownian-motion.html
*/

let numLines = 700;
let length = 70;
let z = 1000;
let grid = true;

let ax = [];
let ay = [];
let az = [];

function toggle() {
  if (grid) {
    grid = false;
  }
  else grid = true;
}


function setup() {
  let canvas = createCanvas(1000, 1000, WEBGL);
  canvas.parent('brownian');
  colorMode(HSB, 255);
  for ( let i = 0; i < numLines; i++ ) {
    ax[i] = 0;
    ay[i] = 0;
    az[i] = 0;
  }

  togButton = createButton('toggle axis');
  togButton.parent('toggle');
  togButton.id('togButton');
  togButton.size(60, 40);
  togButton.mousePressed(toggle);
  togButton.touchStarted(toggle);

  frameRate(60);
}

function draw() {
  background("#f3f3f3");

  if (grid) {
    strokeWeight(4);
    stroke('black');
    line(-width/2+100, 0, 0, width/2-100, 0, 0);
    line(0, -height/2+100, 0, 0, height/2-100, 0);
    line(0, 0, -z/2+100, 0, 0, z/2-100);
  }

  // Shift all elements 1 place to the left
  for ( let i = 1; i < numLines; i++ ) {
    ax[i - 1] = ax[i];
    ay[i - 1] = ay[i];
    az[i - 1] = az[i];
  }

  // Put a new value at the end of the array
  ax[numLines - 1] += random(-length, length);
  ay[numLines - 1] += random(-length, length);
  az[numLines - 1] += random(-length, length);


  // Constrain all points to the screen
  ax[numLines - 1] = constrain(ax[numLines - 1], -width/2+100, width/2-100);
  ay[numLines - 1] = constrain(ay[numLines - 1], -height/2+100, height/2-100);
  az[numLines - 1] = constrain(az[numLines - 1], -z/2+100, z/2-100);

  // Draw a line connecting the points
  for ( let j = 1; j < numLines; j++ ) {
    strokeWeight(3);
    stroke(map(j, 1, numLines - 1, 0, 255), 255, 255);
    line(ax[j - 1], ay[j - 1], az[j - 1], ax[j], ay[j], az[j]);
  }
  orbitControl();
}
