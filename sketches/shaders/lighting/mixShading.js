"use strict";

let easycam;
let objects;
let mixShader;
let ambient;
let ambient4;
let posicions = [];
let sizes = [];
let colors = [];
function preload() {
  mixShader = readShader("/Talleres/sketches/shaders/lighting/mix.frag", {
    varyings: Tree.normal3 | Tree.position4,
  });
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noLights();
  colorMode(RGB, 1);
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
  shader(mixShader);
  ambient = createSlider(0, 1, 0.2, 0.05);
  ambient.position(20, 10);
  ambient.input(() => {
    mixShader.setUniform("ambient", ambient.value());
  });
  ambient4 = createColorPicker("white");
  ambient4.style("width", "60px");
  ambient4.position(20, 45);
  ambient4.input(() => {
    let ambient4Color = ambient4.color();
    mixShader.setUniform("ambient4", [
      red(ambient4Color) / 255,
      green(ambient4Color) / 255,
      blue(ambient4Color) / 255,
      1,
    ]);
  });
  mixShader.setUniform("ambient4", [1, 1, 1, 1]);
  mixShader.setUniform("ambient", ambient.value());
  for (let i = 0; i < 40; i++) {
    posicions.push([random(-150, 150), random(-150, 150), random(-150, 150)]);
    sizes.push(random(10, 40));
    colors.push(color(random(), random(), random()));
  }
}

function draw() {
  background(0);
  let pointLight = getPointLight();
  resetShader();
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  mixShader.setUniform(
    "lightNormal",
    createVector(-dirX, -dirY, ambient.value()).array()
  );

  push();
  stroke("green");
  axes();
  grid();
  pop();
  push();
  translate(pointLight.position);
  noStroke();
  fill("white");
  sphere(3);
  pop();
  shader(mixShader);
  mixShader.setUniform(
    "uLightPosition",
    treeLocation(pointLight.position, {
      from: Tree.WORLD,
      to: Tree.EYE,
    }).array()
  );
  for (let i = 0; i < 40; i++) {
    push();
    fill(colors[i]);
    translate(posicions[i][0], posicions[i][1], posicions[i][2]);
    let size = sizes[i];
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

function getPointLight() {
  let angle = frameCount * 0.03;
  let rad = 30;
  let px = cos(angle) * rad;
  let py = sin(angle) * rad;
  let r = sin(angle) * 0.5 + 0.5;
  return {
    position: createVector(px, py, 0),
    color: color(1 - r, r / 2, r),
  };
}
