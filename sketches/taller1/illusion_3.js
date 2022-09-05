let img;
let w, h;
let sum = -1
let xPosition; 
function preload() {
  img = loadImage("/Talleres/sketches/taller1/assets/circle.png")
  w = img.width;
  h = img.height;
  angleMode(DEGREES);
}

function setup() {
  w = img.width;
  h = img.height;
  xPosition =  w ; 

  createCanvas(w, h);
}
function rotateImage ( change_image , d ,deg ){
  rotate ( deg ) ; 
  let change_img = img.get();
  change_img.loadPixels();
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let pix = (i + j * change_img.width) * 4;
      if ( (i % 3) == 1 ){
          if ( change_img.pixels[pix + 0] > 200  &&   change_img.pixels[pix + 1] > 200){
            continue;
          }
          if ( change_img.pixels[pix + 0] > 200){
            change_img.pixels[pix + 0] = 255;
            change_img.pixels[pix + 1] = 0;
            change_img.pixels[pix + 2] = 0;
            change_img.pixels[pix + 3] = 255;
            pix = ( ( i + 1 ) + j * change_img.width) * 4;
            change_img.pixels[pix + 0] = 0;
            change_img.pixels[pix + 1] = 255;
            change_img.pixels[pix + 2] = 0;
            change_img.pixels[pix + 3] = 255;
            pix = ( ( i + 2 ) + j * change_img.width) * 4;
            change_img.pixels[pix + 0] = 0;
            change_img.pixels[pix + 1] = 0;
            change_img.pixels[pix + 2] = 255;
            change_img.pixels[pix + 3] = 255;
          }
          else if ( change_img.pixels[pix + 1] > 200){
              change_img.pixels[pix + 0] = 0;
              change_img.pixels[pix + 1] = 255;
              change_img.pixels[pix + 2] = 0;
              change_img.pixels[pix + 3] = 255;
              pix = ( ( i + 1 ) + j * change_img.width) * 4;
              change_img.pixels[pix + 0] = 0;
              change_img.pixels[pix + 1] = 0;
              change_img.pixels[pix + 2] = 255;
              change_img.pixels[pix + 3] = 255;
              pix = ( ( i + 2 ) + j * change_img.width) * 4;
              change_img.pixels[pix + 0] = 255;
              change_img.pixels[pix + 1] = 0;
              change_img.pixels[pix + 2] = 0;
              change_img.pixels[pix + 3] = 255;
          }
        else if ( change_img.pixels[pix + 2] > 200){
              change_img.pixels[pix + 0] = 0;
              change_img.pixels[pix + 1] = 0;
              change_img.pixels[pix + 2] = 255;
              change_img.pixels[pix + 3] = 255;
              pix = ( ( i + 1 ) + j * change_img.width) * 4;
              change_img.pixels[pix + 0] = 255;
              change_img.pixels[pix + 1] = 0;
              change_img.pixels[pix + 2] = 0;
              change_img.pixels[pix + 3] = 255;
              pix = ( ( i + 2 ) + j * change_img.width) * 4;
              change_img.pixels[pix + 0] = 0;
              change_img.pixels[pix + 1] = 255;
              change_img.pixels[pix + 2] = 0;
              change_img.pixels[pix + 3] = 255;
          }
          
          
      }
    }
  }
  change_img.updatePixels();
  image(change_img , 0, 0);
  
}
function draw() {
  img.loadPixels();
  let change_img = img.get ( )
  rotateImage ( change_img , 0 , 0) ;
  if ( xPosition > img.width ){
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
  for (let i = xPosition; i < width ; i+=6 )  {
    let c = color(0, 0, 0);
    fill(c);
    noStroke();
    rect(i, 0, 5, h);
  }
  let ms = millis() + 250
  while ( millis ( ) <  ms ){

  }
  
  
}