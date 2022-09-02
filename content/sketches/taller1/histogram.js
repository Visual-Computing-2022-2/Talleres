var stateR;
var stateG;
var stateB;
var red_arr = new Array(256);
var green_arr = new Array(256);
var blue_arr = new Array(256);

var colors = new Array(3);

var leftM = 30;
var upM = 15;


function preload(){
  img = loadImage("/Talleres/sketches/taller1/assets/turquia.jpg");
}

function setup() {
  createCanvas(img.width + 2 * leftM, img.height * 2 + 2* upM);
  // textFont('Monospace');
  // frameRate(30)
  stateR = color('rgba(255,0,0,0.1)')
  stateG = color('rgba(0,255,0,0.1)')
  stateB = color('rgba(0,0,255,0.1)')
  
  for(var i=0;i<256;i++){
    red_arr[i] = green_arr[i] = blue_arr[i] = 0;
  }
  
  // img.filter(GRAY);
  loadPixels();
  img.loadPixels();
 
  
  for(var i=0;i<img.width;i++){
    for(var j=0;j<img.height;j++){
      var idx = (i + j * img.width) * 4;
      var r = img.pixels[idx + 0] ;
      var g = img.pixels[idx + 1];
      var b = img.pixels[idx + 2];
      var a = img.pixels[idx + 3];
      red_arr[r]++;
      green_arr[g]++;
      blue_arr[b]++;
    }
  }
  
  colors[0] = red_arr;
  colors[1] = green_arr;
  colors[2] = blue_arr;
  
  img.updatePixels();
  updatePixels()
  
  strokeWeight(4);

}

function mousePressed(){
  if(mouseX < leftM || mouseX > leftM + 70) return
  stateR = color('rgba(255,0,0,0.1)')
  stateG = color('rgba(0,255,0,0.1)')
  stateB = color('rgba(0,0,255,0.1)')
  if(mouseY >= 2 * upM + img.height && mouseY <= 2 * upM + img.height + 40){
    stateR = color('rgba(255,0,0,1)')
  }else if(mouseY >= 2 * upM + img.height + 50 && mouseY <= 2 * upM + img.height + 40 + 50){
    stateG = color('rgba(0,255,0,1)')
  }else if(mouseY >= 2 * upM + img.height + 100&& mouseY <= 2 * upM + img.height + 40 + 100){
    stateB = color('rgba(0,0,255,1)')
  }
}


function draw() {
  background(220);
  image(img, leftM, upM);
  
  stroke(0);
  push();
  fill(255,0,0);
  rect(leftM + 10, 2 * upM + img.height, 70, 40);
  fill(0,255,0);
  rect(leftM + 10, 2 * upM + img.height + 50, 70, 40);
  fill(0,0,255);
  rect(leftM + 10, 2 * upM + img.height + 100, 70, 40);
  pop();
  
  push();

  if(stateR.toString() == color('rgba(255,0,0,1)').toString()){
    paint(stateG, colors[1]);
    paint(stateB, colors[2]);
    paint(stateR, colors[0]);
  }else if(stateG.toString() == color('rgba(0,255,0,1)').toString()){
    paint(stateR, colors[0]);
    paint(stateB, colors[2]);
    paint(stateG, colors[1]);
  }else{
    paint(stateR, colors[0]);
    paint(stateG, colors[1]);
    paint(stateB, colors[2]);
  }
  pop();
  graph();
}

function graph(){
  push();
  stroke(0);
  strokeWeight(1);
  fill(0);
  drawArrow(createVector(leftM, 2 * img.height), createVector(leftM + img.width, 2 * img.height), 'x');
  drawArrow(createVector(leftM, 2 * img.height), createVector(leftM, img.height + upM), 'y');
  textAlign(CENTER);
  textSize(20);
  
  text('Valores del color (0 - 255) ', leftM + img.width / 2, 2 * img.height + 2 * upM);
  let angle2 = radians(270);
  translate(leftM / 2, (3 / 2) * img.height);
  rotate(angle2);
  // Draw the letter to the screen
  text("Frecuencias", 0, 0);
  pop();
}

function paint(state, array){
  push();
  stroke(state);
  for(var i=1;i<256;i++){
    xPos = map(i, 0, 256, leftM, leftM + img.width)
    xPrev = map(i - 1,0, 256, leftM, leftM + img.width)
    yPos = map(array[i], 0, max(array), 2 * img.height, img.height + 25)
    yPrev = map(array[i - 1], 0, max(array), 2 * img.height, img.height + 25)
    line(xPrev, yPrev, xPos, yPos)
    line(xPos, 2 * img.height, xPos, yPos)
  }
  pop();
}

function drawArrow(base, vec, axis) {
  push();
  stroke(0);
  strokeWeight(3);
  fill(0);
  
  line(base.x, base.y, vec.x, vec.y);
  
  let arrowSize = 7;
  if(axis == 'x'){
  vec.x -= 7;
  triangle(vec.x, vec.y + arrowSize / 2, vec.x, vec.y -arrowSize / 2, vec.x + arrowSize, vec.y);
  }else{
    vec.y += 7;
    triangle(vec.x + arrowSize / 2, vec.y, vec.x -arrowSize / 2, vec.y, vec.x, vec.y - arrowSize);
  }
    
  pop();
}