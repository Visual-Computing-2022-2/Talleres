
let img;
let filtered;
let w, h;
let filter = [
  [-2, -1, 0],
  [-1, 1, 1],
  [0, 1, 2],
];

function preload() {
  img = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWlpPleutBIg0FJ2NFn2uPbFXpmCj2TIBp3w&usqp=CAU")
  w = img.width;
  h = img.height;
}
function setup() {
  w = img.width;
  h = img.height;
  createCanvas(800, 800);
}

//return 1D coordinate of 2D pixel
function getIndex(x, y) {
  return (x + y * img.width) * 4;
}

function draw() {
  image(img, 0, 0);
  filtered = createImage(w, h);
  img.loadPixels();
  filtered.loadPixels();
  for (let i = 1; i < img.width - 1; i++) {
    for (let j = 1; j < img.height - 1; j++) {
      let pix = getIndex(i, j);
      let filteredPixel = convolute(i, j);
      filtered.pixels[pix + 0] = red(filteredPixel);
      filtered.pixels[pix + 1] = green(filteredPixel);
      filtered.pixels[pix + 2] = blue(filteredPixel);
      filtered.pixels[pix + 3] = alpha(filteredPixel);
    }
  }
  filtered.updatePixels();
  image(filtered, w, 0);
}

//convolute the pixel located in x,y
function convolute(x, y) {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let pix = getIndex(x + i, y + j);
      let factor = filter[j + 1][i + 1];

      sumR += img.pixels[pix + 0] * factor;
      sumG += img.pixels[pix + 1] * factor;
      sumB += img.pixels[pix + 2] * factor;
    }
  }
  return color(
    sumR, sumG, sumB
  );
}