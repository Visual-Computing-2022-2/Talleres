'use strict';

let images = [];
let image_src;
let image_src2;
let image_src3;
let video_src;
let mosaic;
let imageTex;
// ui
let resolution;
let mode;
let selected = 0;

function preload() {
  // paintings are stored locally in the /sketches/shaders/paintings dir
  // and named sequentially as: p1.jpg, p2.jpg, ... p30.jpg
  // so we pick up one randomly just for fun:
  images = [
    loadImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4yTDu_8Ju7u15_x2b-etSB0pBoPti0q3CAw&usqp=CAU`),
    loadImage(`https://cdn.dribbble.com/users/1338391/screenshots/17547297/media/87cde54877f594d7e40ff90094adc782.jpg?compress=1&resize=400x300`),
    loadImage(`https://i.scdn.co/image/ab6761610000e5eb19b90b8f48c82e34aa972464`)
  ];

  mosaic = readShader('/Talleres/sketches/shaders/spatial_coherence/spatial_coherence.frag',
    { matrices: Tree.NONE, varyings: Tree.texcoords2 });
  imageTex = readShader('/Talleres/sketches/shaders/spatial_coherence/image_texture.frag',
    { varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  resolution = createSlider(1, 80, 30, 1);
  resolution.position(10, 90);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  mosaic.setUniform('resolution', resolution.value());
  mosaic.setUniform('source', images[selected]);
  mode = createSelect();
  mode.position(10, 115);
  mode.option('original');
  mode.option('pixelator');
  mode.selected('pixelator');
  mode.changed(() => {
    mosaic.setUniform('original', mode.value() === 'original');
  });

  imageTex.setUniform("texture", images[selected]);

}

function draw() {
  // which previous exercise does this code actually solve?
  /*
        y                  v
        |                  |
  (-1,1)|     (1,1)        (0,1)     (1,1)
  *_____|_____*            *__________*   
  |     |     |            |          |        
  |_____|_____|__x         | texture  |        
  |     |     |            |  space   |
  *_____|_____*            *__________*___ u
  (-1,-1)    (1,-1)       (0,0)    (1,0) 
  */
  shader(mosaic);
  beginShape();
  vertex(-1, -1, -1, 0, 1);
  vertex(1, -1, -1, 1, 1);
  vertex(1, 0.7, -1, 1, 0);
  vertex(-1, 0.7, -1, 0, 0);
  endShape();
  shader(imageTex);
  imageTex.setUniform("texture", images[0]);
  quad(-300, -300,
    -100, -300,
    -100, -210,
    -300, -210);
  imageTex.setUniform("texture", images[1]);
  quad(-100, -300,
    100, -300,
    100, -210,
    -100, -210);
  imageTex.setUniform("texture", images[2]);
  quad(100, -300,
    300, -300,
    300, -210,
    100, -210);
}

function mouseClicked() {
  if (0 <= mouseY && mouseY <= 90) {
    let idx = int(mouseX / 200);
    selected = idx;
    mosaic.setUniform("source", images[selected]);
  }
}