let easycam;
let objects;
let colorShader;
let ambient, ambient4;

function preload() {
  colorShader = readShader(
    "/Talleres/sketches/shaders/lighting/ambient_color.frag",
    {
      varyings: Tree.NONE,
    }
  );
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

  ambient = createSlider(0, 1, 0.5, 0.05);
  ambient.position(20, 10);
  ambient.input(() => {
    colorShader.setUniform("ambient", ambient.value());
  });
  shader(colorShader);
  colorShader.setUniform("ambient", ambient.value());
  ambient4 = createColorPicker("white");
  ambient4.position(20, 45);
  ambient4.style("width", "60px");
  ambient4.input(() => {
    let currColor = ambient4.color();
    colorShader.setUniform("ambient4", [
      red(currColor) / 255,
      green(currColor) / 255,
      blue(currColor) / 255,
      1,
    ]);
  });
  colorShader.setUniform("ambient4", [1, 1, 1, 1]);
}

function draw() {
  background(0);
  push();
  stroke("green");
  axes();
  grid();
  pop();
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