var mocSize;
var img;
var imgs = [];
var size = 600;
var lumaValues = [];
var modeSelect;
var mode;
let p = 0;

function preload() {
  for (i = 0; i < 30; i++) {
    let imgNew = loadImage(`/Talleres/sketches/sheders/assets/i${i + 1}.jpg`);
    imgs.push(imgNew);
  }
  img = loadImage(`/Talleres/sketches/sheders/assets/i${p + 1}.jpg`);
}

function setup() {
  createCanvas(size, size);
  img.loadPixels();
  img.resize(size, size);
  for (i = 0; i < 30; i++) {
    imgs[i].loadPixels();
    let sum = 0;
    for (j = 0; j < imgs[i].pixels.length; j += 4) {
      let r = imgs[i].pixels[j];
      let g = imgs[i].pixels[j + 1];
      let b = imgs[i].pixels[j + 2];
      let a = imgs[i].pixels[j + 3];
      sum += luma(r, g, b);
    }
    let avg = sum / (imgs[i].pixels.length / 4);
    lumaValues.push(avg);
    imgs[i].resize(size, size);
  }
  console.log(lumaValues);
  mocSize = createSlider(3, 100, 10, 1);
  mocSize.position(10, 10);
  mocSize.style("width", "80px");
  modeSelect = createSelect();
  modeSelect.position(10, 30);
  modeSelect.option("Original");
  modeSelect.option("Keys");
  modeSelect.option("Symbols");
  modeSelect.selected("Original");
}

function draw() {
  background(0);
  mode = modeSelect.value();
  if (mode == "Original") {
    image(img, 0, 0);
  } else {
    for (i = 0; i < size; i += mocSize.value()) {
      for (j = 0; j < size; j += mocSize.value()) {
        let index = (j * size + i) * 4;
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        let c = color(r, g, b);
        if (mode == "Symbols") {
          let bValue = luma(r, g, b);
          let diff = Math.abs(lumaValues[0] - bValue);
          let imgIndex = 0;
          for (k = 1; k < lumaValues.length; k++) {
            if (diff > Math.abs(lumaValues[k] - bValue)) {
              imgIndex = k;
              diff = Math.abs(lumaValues[k] - bValue);
            }
          }
          image(
            imgs[imgIndex],
            i,
            j,
            Math.min(mocSize.value(), size - i),
            Math.min(mocSize.value(), size - j)
          );
        } else {
          fill(c);
          noStroke();
          rect(i, j, mocSize.value(), mocSize.value());
        }
      }
    }
  }
}

function keyPressed() {
  if (key == "r") {
    p = (p + 1) % 30;
    img.copy(imgs[p], 0, 0, size, size, 0, 0, size, size);
    img.loadPixels();
  }
}

function luma(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}
