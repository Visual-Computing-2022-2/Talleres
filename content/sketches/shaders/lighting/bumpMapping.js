let easycam;
let objects;
let bumpShader;
let density, size, specularFactor;

function preload() {
  colorShader = readShader("/Talleres/sketches/shaders/lighting/bump.frag", {
    varyings: Tree.NONE,
  });
}

function setup() {
  createCanvas(600, 600, WEBGL);
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
  colorMode(RGB, 1);
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

  density = createSlider(10.0, 20.0, 16.0, 0.05);
  density.position(20, 10);
  density.input(() => {
    colorShader.setUniform("BumpDensity", density.value());
  });
  shader(colorShader);
  colorShader.setUniform("BumpDensity", density.value());
  size = createSlider(0, 1, 0.15, 0.005);
  size.position(20, 45);
  size.input(() => {
    colorShader.setUniform("BumpSize", size.value());
  });
  colorShader.setUniform("BumpSize", 0, 15);
  specularFactor = createSlider(0, 1, 0.5, 0.05);
  specularFactor.position(20, 80);
  specularFactor.input(() => {
    colorShader.setUniform("SpecularFactor", specularFactor.value());
  });
  colorShader.setUniform("SpecularFactor", 0, 15);
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
  shader(colorShader);
  colorShader.setUniform(
    "uLightPosition",
    treeLocation(pointLight.position, {
      from: Tree.WORLD,
      to: Tree.EYE,
    }).array()
  );
  for (let i = 0; i < objects.length; i++) {
    push();
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
