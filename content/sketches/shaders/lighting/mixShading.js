"use strict";

let easycam;
let objects;
let toonShader;
let ambient, ambient4;

function preload() {
  toonShader = readShader("/Talleres/sketches/shaders/lighting/toon.frag", {
    varyings: Tree.normal3,
  });
}

function setup() {
  createCanvas(600, 600, WEBGL);
  colorMode(RGB, 1);
  textureMode(NORMAL);
  noStroke();
  setAttributes("antialias", true);
  let easyCamState = {
    distance: 325,
    center: [0, 0, 0],
    rotation: [0.25, 0.25, 0, 1],
  };
  easycam = new Dw.EasyCam(this._renderer);
  easycam.state_reset = easyCamState;
  easycam.setState(easyCamState, 2000);
  document.oncontextmenu = function () {
    return false;
  };
  let maxPos = 100;
  objects = [];
  for (let i = 0; i < 40; i++) {
    objects.push({
      position: createVector(
        (random() * 2 - 1) * maxPos,
        (random() * 2 - 1) * maxPos,
        (random() * 2 - 1) * maxPos
      ),
      angle: random(0, TWO_PI),
      axis: p5.Vector.random3D(),
      size: random() * 30 + 10,
      color: color(random(), random(), random()),
    });
  }
  ambient = createSlider(-1, 1, -0.4, 0.05);
  ambient.position(20, 10);
  shader(toonShader);
  toonShader.setUniform("ambient", ambient.value());
  ambient4 = createColorPicker("white");
  ambient4.style("width", "60px");
  ambient4.position(20, 45);
  ambient4.input(() => {
    let ambient4Color = ambient4.color();
    toonShader.setUniform("ambient4", [
      red(ambient4Color) / 255,
      green(ambient4Color) / 255,
      blue(ambient4Color) / 255,
      1,
    ]);
  });
  toonShader.setUniform("ambient4", [1, 1, 1, 1]);
}

function draw() {
  background(0);
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  toonShader.setUniform(
    "lightNormal",
    createVector(-dirX, -dirY, ambient.value()).array()
  );
  push();
  stroke("green");
  axes();
  grid();
  pop();
  for (let i = 0; i < objects.length; i++) {
    push();
    fill(objects[i].color);
    translate(objects[i].position);
    rotate(objects[i].angle, objects[i].axis);
    let size = objects[i].size / 2;
    if (i % 5 == 0) {
      box(size * 2);
    } else if (i % 5 == 1) {
      sphere(size);
    } else if (i % 5 == 2) {
      torus(size, size / 4);
    } else if (i % 5 == 3) {
      cylinder(size, size * 2);
    } else {
      cone(size, size * 2);
    }
    pop();
  }
}
