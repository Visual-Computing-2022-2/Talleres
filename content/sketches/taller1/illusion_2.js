let xPosition = 900 ; 
let blue_rect;
let yellow_rect;
let sum = -1

function setup() {
  createCanvas(900, 300);
  bg = loadImage('/Talleres/sketches/taller1/assets/pacman.png');
}

function draw() {
  image(bg, 0, 0);
  if ( xPosition > width ){
    sum = -1
   let ms = millis() + 5000
    while ( millis ( ) <  ms ){

    }
  }
  
  if ( xPosition  < 0 ){
    let ms = millis() + 5000
    while ( millis ( ) <  ms ){

    }
    sum = 1 
  }
 
  xPosition = xPosition+ sum 
  for (let i = xPosition; i < width ; i+=17) {
    let c = color(0, 0, 0);
    fill(c);
    noStroke();
    rect(i, 0, 15, 247);
  }
  let ms = millis() + 40
  while ( millis ( ) <  ms ){

  }

 
 
}