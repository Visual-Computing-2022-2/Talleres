"use strict";

const ROWS = 20;
const COLS = 20;
let LEN;
let quadrille;
let row0, col0, row1, col1, row2, col2;
let pg2, pg1;
let img;
let u0, v0, u1, v1, u2, v2, u3, v3;
let button1, button2;

function preload() {
  img = loadImage("/Talleres/sketches/taller2/graphics.jpg");
}

function setup() {
  createCanvas(700, 350);
  pg1 = createGraphics(width / 2, height);
  pg2 = createGraphics(width / 2, height);
  LEN = width / (COLS * 2);
  quadrille = createQuadrille(20, 20);
  pg2.rectMode(CENTER);
  img.resize(pg2.width, pg2.height);
  randomize();
  button1 = createButton("Randomize");
  button1.position(10, height - 20);
  button1.mousePressed(() => randomize(false));
}

function draw() {
  pg1.background("black");
  drawQuadrille(quadrille, {
    graphics: pg1,
    cellLength: LEN,
    outlineWeight: 1,
    outline: "green",
    board: true,
  });
  pg1.push();
  pg1.stroke("cyan");
  pg1.strokeWeight(3);
  pg1.noFill();
  pg1.triangle(
    col0 * LEN + LEN / 2,
    row0 * LEN + LEN / 2,
    col1 * LEN + LEN / 2,
    row1 * LEN + LEN / 2,
    col2 * LEN + LEN / 2,
    row2 * LEN + LEN / 2
  );
  pg1.fill("red");
  pg1.rect(col0 * LEN, row0 * LEN, LEN);
  pg1.fill("green");
  pg1.rect(col1 * LEN, row1 * LEN, LEN);
  pg1.fill("blue");
  pg1.rect(col2 * LEN, row2 * LEN, LEN);
  pg1.pop();
  image(pg1, 0, 0);
  pg2.image(img, 0, 0);
  pg2.push();
  pg2.stroke("magenta");
  pg2.strokeWeight(3);
  pg2.noFill();
  pg2.triangle(u1, v1, u2, v2, u3, v3);
  pg2.fill("red");
  pg2.rect(u1, v1, LEN);
  pg2.fill("green");
  pg2.rect(u2, v2, LEN);
  pg2.fill("blue");
  pg2.rect(u3, v3, LEN);
  pg2.pop();
  image(pg2, width / 2, 0);
}

function randomize(sync = false) {
  u1 = int(random(0, img.width));
  v1 = int(random(0, img.height));
  u2 = int(random(0, img.width));
  v2 = int(random(0, img.height));
  u3 = int(random(0, img.width));
  v3 = int(random(0, img.height));
  row0 = round(map(v1, 0, img.height, 0, COLS));
  col0 = round(map(u1, 0, img.width, 0, ROWS));
  row1 = round(map(v2, 0, img.height, 0, COLS));
  col1 = round(map(u2, 0, img.width, 0, ROWS));
  row2 = round(map(v3, 0, img.height, 0, COLS));
  col2 = round(map(u3, 0, img.width, 0, ROWS));
  quadrille.clear();
  img.loadPixels();
  quadrille.rasterizeTriangle(
    row0,
    col0,
    row1,
    col1,
    row2,
    col2,
    texturize,
    [u1, v1],
    [u2, v2],
    [u3, v3]
  );
}

function texturize({ pattern: texcoords2 }) {
  let index = 4 * (int(texcoords2[1]) * img.width + int(texcoords2[0]));
  return color(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]);
}
