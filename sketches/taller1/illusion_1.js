let xPosition = 0 ; 
let blue_rect;
let yellow_rect;
let sum = 1 
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(230);
  if (keyIsPressed === false) {
    for (let i = 0; i < width ; i+=20) {
      let c = color(0, 0, 0);
      fill(c);
      noStroke();
      rect(i, 0, 10, 720);

    }
  }
  xPosition = xPosition+ sum 
  if ( xPosition + 40 > 600 ){
    sum = -1
  }
  if ( xPosition  < 0 ){
    sum = 1 
  }
  c = color(0, 0, 190);
  fill(c);
  noStroke();
  blue_rect=rect(xPosition, 170, 40, 30);
  c = color(255, 255, 0);
  fill(c);
  noStroke();
  yellow_rect=rect(xPosition, 230, 40, 30);
  let ms = millis() + 50 
  while ( millis ( ) <  ms ){
    
  }

}