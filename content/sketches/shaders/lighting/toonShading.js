"use strict";

let easycam;
let models;
let modelsDisplayed;
let lightShader;
let depth, ambient4;

function preload() {
  lightShader = readShader("/Talleres/sketches/shaders/lighting/toon.frag", {
    varyings: Tree.normal3,
  });
}

function setup() {
  createCanvas(600, 600, WEBGL);
  colorMode(RGB, 1);
  textureMode(NORMAL);
  noStroke();
  setAttributes("antialias", true);
  // define initial state
  let state = {
    distance: 300,
    center: [0, 0, 0],
    rotation: [-0.285, -0.257, -0.619, 0.685],
  };
  console.log(Dw.EasyCam.INFO);
  easycam = new Dw.EasyCam(this._renderer);
  //easycam.attachMouseListeners(this._renderer);
  easycam.state_reset = state; // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  // suppress right-click context menu
  document.oncontextmenu = function () {
    return false;
  };
  let trange = 100;
  models = [];
  for (let i = 0; i < 100; i++) {
    models.push({
      position: createVector(
        (random() * 2 - 1) * trange,
        (random() * 2 - 1) * trange,
        (random() * 2 - 1) * trange
      ),
      angle: random(0, TWO_PI),
      axis: p5.Vector.random3D(),
      size: random() * 25 + 8,
      color: color(random(), random(), random()),
    });
  }
  // gui
  modelsDisplayed = createSlider(1, models.length, int(models.length / 4), 1);
  modelsDisplayed.position(10, 10);
  modelsDisplayed.style("width", "80px");
  depth = createSlider(-1, 1, -0.4, 0.05);
  depth.position(420, 10);
  depth.style("width", "80px");
  shader(lightShader);
  lightShader.setUniform("ambient", depth.value());
  ambient4 = createColorPicker("white");
  ambient4.position(420, 45);
  ambient4.input(() => {
    /*
    // Prefer to go like this (but seems ambient4.color() always returns values in [0..255]):
    push();
    colorMode(RGB, 1);
    let ambient4Color = ambient4.color();
    // print(ambient4Color);
    // print(red(ambient4Color), green(ambient4Color), blue(ambient4Color));
    lightShader.setUniform('ambient4', [red(ambient4Color), green(ambient4Color), blue(ambient4Color), 1.0]);
    pop();
    // */
    let ambient4Color = ambient4.color();
    lightShader.setUniform("ambient4", [
      red(ambient4Color) / 255,
      green(ambient4Color) / 255,
      blue(ambient4Color) / 255,
      1,
    ]);
  });
  lightShader.setUniform("ambient4", [1, 1, 1, 1]);
}

function draw() {
  background(0);
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  lightShader.setUniform(
    "lightNormal",
    createVector(-dirX, -dirY, depth.value()).array()
  );
  //lightShader.setUniform('lightNormal', createVector(-dirX, -dirY, depth.value()).normalize().array());
  //lightShader.setUniform('lightNormal', treeDisplacement([-1, 0, 0], { from: Tree.WORLD, to: Tree.EYE }).array());
  push();
  stroke("green");
  axes();
  grid();
  pop();
  for (let i = 0; i < modelsDisplayed.value(); i++) {
    push();
    fill(models[i].color);
    translate(models[i].position);
    rotate(models[i].angle, models[i].axis);
    let radius = models[i].size / 2;
    i % 3 === 0
      ? cone(radius)
      : i % 3 === 1
      ? sphere(radius)
      : torus(radius, radius / 4);
    pop();
  }
}
