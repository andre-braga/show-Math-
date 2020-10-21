let points = [];
let run = false;
let time = 0;
let currentpoint;
let co;
let controlBuffer;
let curveBuffer;
let pointsBuffer;
let showLines = true;
let graphButton;
let showGraph = true;
let timeText;

function setup() {

  let width = windowWidth;
  let height = windowHeight;
  let canvas = createCanvas(width, height);

  canvas.parent('bez');

  clearButton = createButton('clear');
  clearButton.parent('bez');
  clearButton.id('clearButton');
  clearButton.position(0, -height, 'relative');
  clearButton.size(90, 50);
  clearButton.mousePressed(clearFunc);
  clearButton.touchStarted(clearFunc);

  startButton = createButton('start');
  startButton.parent('bez');
  startButton.id('startButton');
  startButton.position(-90, -height + 50, 'relative');
  startButton.size(90, 50);
  startButton.mousePressed(startFunc);
  startButton.touchStarted(startFunc);

  linesButton = createButton('disable control lines');
  linesButton.parent('bez');
  linesButton.id('linesButton');
  linesButton.position(-180, -height + 110, 'relative');
  linesButton.size(90, 50);
  linesButton.mousePressed(linesFunc);
  linesButton.touchStarted(linesFunc);

  graphButton = createButton('hide graph');
  graphButton.parent('bez');
  graphButton.id('graphButton');
  graphButton.position(-270, -height + 150, 'relative');
  graphButton.size(90, 50);
  graphButton.mousePressed(graphFunc);
  graphButton.touchStarted(graphFunc);

  graphButton.hide();

  controlBuffer = createGraphics(width, height);
  curveBuffer = createGraphics(width, height);
  pointsBuffer = createGraphics(width, height);

  curveBuffer.strokeJoin(ROUND);
  pointsBuffer.textFont('monospace');
  pointsBuffer.textSize(12);

  timeText = createDiv('');
  timeText.parent('bez');
  timeText.id('timeText');
  timeText.position(width/2, -height -60, 'relative');
}

function step(newpoints, t){

  if (newpoints.length == 1){
    controlBuffer.stroke('black');
    controlBuffer.strokeWeight(10);
    controlBuffer.point(newpoints[0].x, newpoints[0].y);
    return newpoints[0]
  }
  else{

    let nextpoints = [];

    for(i = 0; i < newpoints.length - 1; i++){
      let nextx = newpoints[i].x + (newpoints[i + 1].x - newpoints[i].x) * t;
      let nexty = newpoints[i].y + (newpoints[i + 1].y - newpoints[i].y) * t;
      let nextpoint = {x: nextx, y: nexty}
      nextpoints.push(nextpoint)
    }

    if (showLines){
      for(i = 0; i < nextpoints.length - 1; i++)
      {
        controlBuffer.stroke('rgba(160,160,160,0.5)');
        controlBuffer.strokeWeight(1);
        controlBuffer.line(nextpoints[i].x, nextpoints[i].y, nextpoints[i+1].x, nextpoints[i+1].y)

        controlBuffer.stroke('rgba(160,160,160,0.7)');
        controlBuffer.strokeWeight(5);
        controlBuffer.point(nextpoints[i].x, nextpoints[i].y);
        controlBuffer.point(nextpoints[i+1].x, nextpoints[i+1].y);
      }
    }

    return step(nextpoints, t);
  }
}

function draw() {

  if (run){

    let co = map(time, 0, 1, 230, 0);

      if (time >= 1) {

        clear();

        timeText.html('t = ' + time.toPrecision(3));

        image(pointsBuffer, 0, 0);

        temp = step(points, time);

        curveBuffer.stroke(255, co, co);
        curveBuffer.strokeWeight(5);
        curveBuffer.line(currentpoint.x, currentpoint.y, temp.x, temp.y);
        image(curveBuffer, 0, 0);

        graphButton.style('display', 'inline-block');

        run = false;
        return false;
      }
      else if (time == 0) {
        currentpoint = points[0];
      }

      clear();

      timeText.html('t = ' + time.toPrecision(3));

      image(pointsBuffer,0,0);

      temp = step(points, time);

      image(controlBuffer, 0, 0);
      controlBuffer.clear();

      curveBuffer.stroke(255, co, co);
      curveBuffer.strokeWeight(5);
      curveBuffer.line(currentpoint.x, currentpoint.y, temp.x, temp.y);
      image(curveBuffer, 0, 0);

      currentpoint = temp;

      time += .005;
    }
}

function clearFunc(){

    run = false;

    graphButton.hide();
    showGraph = true;
    graphButton.html('hide graph');

    time = 0;
    timeText.html('');

    clear();
    controlBuffer.clear();
    pointsBuffer.clear();
    curveBuffer.clear();
    points = [];
}

function startFunc(){

    if (points.length) {

    run = true;
   }
}

function linesFunc(){

  if (showLines) {

    showLines = false;
    linesButton.html('enable control lines');
  }
  else {

    showLines = true;
    linesButton.html('disable control lines');
  }
}

function graphFunc(){

  if (showGraph) {

  clear();

  image(curveBuffer, 0, 0);

  showGraph = false;
  graphButton.html('show graph');
  }
  else{
    clear();

    image(pointsBuffer, 0, 0);
    image(curveBuffer, 0, 0);

    showGraph = true;
    graphButton.html('hide graph');
  }
}

function mousePressed() {

  if ((mouseX >= 0 && mouseX <= 90 && mouseY >= 0 && mouseY <= 150) || mouseX < 0 || mouseY < 0 || time > 0.05 || points.length > 49) {

    return false;
  }
  else{

    if(points.length){

      pointsBuffer.strokeWeight(1);
      pointsBuffer.stroke('#060606');
      pointsBuffer.line(points[points.length-1].x,points[points.length-1].y, mouseX, mouseY)
    }

    pointsBuffer.stroke('black');
    pointsBuffer.strokeWeight(7);
    pointsBuffer.point(mouseX, mouseY);

    let newpoint = {x:mouseX, y:mouseY};
    points.push(newpoint);

    pointsBuffer.strokeWeight(.5);
    pointsBuffer.text(points.length, mouseX, mouseY+20);

    clear();

    image(pointsBuffer, 0, 0);

  }

  return false;
}

function touchStarted(){
  mousePressed();
}

function windowResized() {

  let width = windowWidth;
  let height = windowHeight;

  resizeCanvas(width, height);

  clearButton.position(0,-height, 'relative');
  startButton.position(-90,-height + 50, 'relative');
  linesButton.position(-180,-height + 110, 'relative');
  graphButton.position(-270, -height + 150, 'relative');
  timeText.position(width/2, -height - 60, 'relative');
  
  clearFunc();

  controlBuffer = createGraphics(width, height);
  pointsBuffer = createGraphics(width, height);
  curveBuffer = createGraphics(width, height);
}
