const ROWS = 20;
const COLS = 20;
const LEN = 20;
let quadrille;
let v0y, v0x, v1y, v1x, v2y, v2x;
let cp0, cp1, cp2;
let p0 = [255, 0, 0, 7, 4],
  p1 = [0, 255, 0, -1, -10],
  p2 = [0, 0, 255, 5, 8];

function setup() {
  createCanvas(400, 440);
  quadrille = createQuadrille(20, 20);
  quadrille.colorize("black");
  keyPressed();
  cp0 = createColorPicker("red");
  cp0.position(20, 415);
  cp0.input(setColors);
  cp1 = createColorPicker("green");
  cp1.position(120, 415);
  cp1.input(setColors);
  cp2 = createColorPicker("blue");
  cp2.position(220, 415);
  cp2.input(setColors);
}

function draw() {
  background("black");
  drawQuadrille(quadrille, {
    cellLength: LEN,
    outline: "green",
    board: true,
  });
  drawTriangle();
}

function setColors() {
  p0[0] = red(cp0.color());
  p0[1] = green(cp0.color());
  p0[2] = blue(cp0.color());
  p1[0] = red(cp1.color());
  p1[1] = green(cp1.color());
  p1[2] = blue(cp1.color());
  p2[0] = red(cp2.color());
  p2[1] = green(cp2.color());
  p2[2] = blue(cp2.color());
  showTringle();
}

function drawTriangle() {
  push();
  stroke("cyan");
  strokeWeight(3);
  noFill();
  triangle(
    v0x * LEN + LEN / 2,
    v0y * LEN + LEN / 2,
    v1x * LEN + LEN / 2,
    v1y * LEN + LEN / 2,
    v2x * LEN + LEN / 2,
    v2y * LEN + LEN / 2
  );
  pop();
}

function keyPressed() {
  randomizeTriangle();
  showTringle();
}

function showTringle() {
  quadrille.clear();
  quadrille.rasterizeTriangle(
    v0y,
    v0x,
    v1y,
    v1x,
    v2y,
    v2x,
    colorize_shader,
    p0,
    p1,
    p2
  );
}

function colorize_shader({ pattern: mixin }) {
  let rgb = mixin.slice(0, 3);
  console.log(mixin.slice(3));
  return color(rgb);
}

function randomizeTriangle() {
  v0x = int(random(0, COLS));
  v0y = int(random(0, ROWS));
  v1x = int(random(0, COLS));
  v1y = int(random(0, ROWS));
  v2x = int(random(0, COLS));
  v2y = int(random(0, ROWS));
}
