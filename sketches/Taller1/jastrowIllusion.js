let img;
let xcord;
let ycord;

function preload() {
  img = loadImage('/Talleres/sketches/Taller1/track1.png'); 
}

function setup() {
  createCanvas(500, 500);
  noStroke();
  xcord = 0;
  ycord = 0;
}

function draw() {
  background(150);
  image(img, 50+xcord, 50+ycord, 300, 100);
  image(img, 90-xcord, 150-ycord, 300, 100);
  if (xcord >= 40) {
    sleep(2000).then(
      () => {
        xcord = 0;
        ycord = 0;
      }
    )
  }else{
    xcord = xcord + 1/5;
    ycord = ycord + (100/40)/5;
  }
}

function sleep(millisecondsDuration){
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}
