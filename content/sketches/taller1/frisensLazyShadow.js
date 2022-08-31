let angulo;
let speed;
let rot;
let stopButton;
let startButton;
let speedSlider;
let rotSlider;

function stop() {
    speedSlider.value(0);
    angulo = 0;
}

function start() {
    speedSlider.value(0.05);
}

function setup() {
  createCanvas(500, 500);
  noStroke();
  startButton = createButton('Start');
  startButton.position(0, 0);
  startButton.size(100, 30);
  startButton.mousePressed(start);
  stopButton = createButton('Stop');
  stopButton.position(0, 35);
  stopButton.size(100, 30);
  stopButton.mousePressed(stop);
  speedSlider = createSlider(0, 0.1, 0.05, 0.01);
  speedSlider.position(0, 85);
  speedSlider.size(100, 30);
  rotSlider = createSlider(-0.1, 0.1, 0, 0.01);
  rotSlider.position(0, 130);
  rotSlider.size(100, 30);
  angulo = 0;
  rectMode(CENTER);
}

function draw() {
  background(0);
  speed = speedSlider.value();
  rot = rotSlider.value();
  angulo = angulo + speed % TWO_PI;
  translate(width / 2, height / 2);
  rotate(angulo);
  fill(0,0,255);
  rect(0, 0, 180, 180);
  rotate(rot);
  fill(255);
  rect(0, 0, 150, 150);
  fill(200,200,200);
  rotate(-angulo-rot);
  text("Speed", -225, -170);
  text("Compensate", -240, -125);
}
