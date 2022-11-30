"use strict";

let easycam;
let objects;
let specularShader;
let ambient;

function preload() {
  specularShader = readShader(
    "/Talleres/sketches/shaders/lighting/specular.frag",
    {
      varyings: Tree.normal3 | Tree.position4,
    }
  );
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noLights();
  colorMode(RGB, 1);
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
      size: random() * 30 + 10,
      color: color(random(), random(), random()),
    });
  }
  ambient = createSlider(0, 1, 0.2, 0.05);
  ambient.position(20, 10);
  ambient.input(() => {
    specularShader.setUniform("ambient", ambient.value());
  });
  shader(specularShader);
  specularShader.setUniform("ambient", ambient.value());
}

function draw() {
  background(0);
  let pointLight = getPointLight();
  resetShader();
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
  shader(specularShader);
  specularShader.setUniform(
    "uLightPosition",
    treeLocation(pointLight.position, {
      from: Tree.WORLD,
      to: Tree.EYE,
    }).array()
  );
  for (let i = 0; i < objects.length; i++) {
    push();
    noStroke();
    fill(objects[i].color);
    translate(objects[i].position);
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
