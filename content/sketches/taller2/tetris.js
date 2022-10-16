/*
  Game's logic:
  We mantain a 2D matrix holding the game's state 18x18
  This matrix will hold the current box placed in a cell (save the color), or 0 if the cell is empty.
  
 */

let gameMatrix = Array()
const WIDTH_GAME_MATRIX = 18
const HEIGHT_GAME_MATRIX = 18
const width = 800;
const height = 900;
let camX = 0
let camY = 100
let camZ = -20
let centerX = 0;
let centerY = camY;
let centerZ = 0
let cameraDistance = 400
let cameraAngleRotation = 0;
var colors;
function setup() {
  createCanvas(width, height, WEBGL);
  angleMode(DEGREES);
  frameRate(10);
  //First row creates the line base in the game shape
  gameMatrix.push([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
  gameMatrix.push([2, 2, 2, 2, 1, 1, 2, 1, 6, 6, 2, 3, 6, 6, 7, 7, 7, 3]);
  gameMatrix.push([0, 0, 2, 2, 1, 1, 4, 7, 7, 7, 7, 2, 0, 0, 0, 0, 0, 0]);
  gameMatrix.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0]);
  colors = {
    1: color("#F9DC5C"),
    2: color("#ED254E"),
    3: color("#F4FFFD"),
    4: color("#011936"),
    5: color("#F39A9D"),
    6: color("#C6ECAE"),
    7: color("#FE5F55"),
    8: color("#9f9f9f"),
  }
}

function checkKeys() {
  //To rotate the camera
  if (keyIsDown(65)) {
    cameraAngleRotation += 20;
  }
  if (keyIsDown(68)) {
    cameraAngleRotation -= 20;
  }
  cameraAngleRotation %= 360;
  camX = cos(cameraAngleRotation) * cameraDistance;
  camZ = sin(cameraAngleRotation) * cameraDistance;
};

function draw() {
  // create a classic plane -> h positive to go up ad
  translate(0, -1, 0);
  checkKeys();
  camera(camX, camY, camZ, centerX, centerY, centerZ, 0, -1, 0);

  background(240);
  strokeWeight(20)
  strokeWeight(1)

  let tetrisRadius = 100;
  let ringHeight = 0
  for (let h = 0; h < gameMatrix.length; h += 1) {
    let step = 360 / WIDTH_GAME_MATRIX;
    let height_step = 400 / HEIGHT_GAME_MATRIX;
    ringHeight += height_step + 1;
    for (let i = 0; i < gameMatrix[h].length; i += 1) {
      let angle = step * (i + 1);
      if (gameMatrix[h][i] == 0)
        continue;
      let x = cos(angle) * tetrisRadius;
      let z = sin(angle) * tetrisRadius;
      push();
      fill(colors[gameMatrix[h][i]]);
      translate(x, ringHeight, z);
      box(20);
      pop();
    }
  }
}
function mouseWheel(event) {
  cameraDistance += (event.delta / 10);
}