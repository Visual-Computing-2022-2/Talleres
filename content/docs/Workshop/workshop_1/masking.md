# Masking

## Image processing

#### Shortcuts

| Key | Action                                |
| --- | ------------------------------------- |
| t   | toggle kernel                         |
| s   | Lightness visualization (change mode) |

{{< p5-iframe sketch="/Talleres/sketches/taller1/histogram.js" width="780" height="1000" >}}

## Code

{{< details title="Image processing app's code" open="false" >}}
{{< highlight js >}}
var stateR;
var stateG;
var stateB;
var red_arr = new Array(256);
var green_arr = new Array(256);
var blue_arr = new Array(256);
var showFilter = false;
const filter = \[
  [-2, -1, 0],
  [-1, 1, 1],
  [0, 1, 2],
];
const filter2 = \[
  [-1, 0, 1],
  [-1, 0, 1],
  [-1, 0, 1],
];
var colors = new Array(3);

var leftM = 30;
var upM = 15;

function preload() {
  img = loadImage("/Talleres/sketches/taller1/assets/turquia.jpg");
}

function getIndex(x, y) {
  return (x + y _ img.width) _ 4;
}
function setup() {
  createCanvas(img.width + 2 _ leftM, img.height _ 2 + 2 \* upM);
  stateR = color('rgba(255,0,0,0.1)')
  stateG = color('rgba(0,255,0,0.1)')
  stateB = color('rgba(0,0,255,0.1)')

  for (let i = 0; i &lt; 256; i++) {
    red_arr[i] = green_arr[i] = blue_arr[i] = 0;
  }

  // img.filter(GRAY);
  loadPixels();
  img.loadPixels();
  filtered = createImage(img.width, img.height);
  filtered.loadPixels();

  for (let i = 0; i &lt; img.width; i++) {
    for (let j = 0; j &lt; img.height; j++) {
      let idx = getIndex(i, j);
      let r = img.pixels[idx + 0];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];
      let a = img.pixels[idx + 3];
      red_arr[r]++;
      green_arr[g]++;
      blue_arr[b]++;
      //kernel
      let filteredPixel = convolute(i, j);
      filtered.pixels[idx + 0] = red(filteredPixel);
      filtered.pixels[idx + 1] = green(filteredPixel);
      filtered.pixels[idx + 2] = blue(filteredPixel);
      filtered.pixels[idx + 3] = alpha(filteredPixel);
    }
  }

  colors[0] = red_arr;
  colors[1] = green_arr;
  colors[2] = blue_arr;

  img.updatePixels();
  filtered.updatePixels();
  updatePixels();
  strokeWeight(4);

}
function calculateHistogram(imagen) {
  stateR = color('rgba(255,0,0,0.1)')
  stateG = color('rgba(0,255,0,0.1)')
  stateB = color('rgba(0,0,255,0.1)')

  for (let i = 0; i &lt; 256; i++) {
    red_arr[i] = green_arr[i] = blue_arr[i] = 0;
  }

  // img.filter(GRAY);
  loadPixels();
  imagen.loadPixels();
  filtered.loadPixels();

  for (let i = 0; i &lt; imagen.width; i++) {
    for (let j = 0; j &lt; imagen.height; j++) {
      let idx = getIndex(i, j);
      let r = imagen.pixels[idx + 0];
      let g = imagen.pixels[idx + 1];
      let b = imagen.pixels[idx + 2];
      let a = imagen.pixels[idx + 3];
      red_arr[r]++;
      green_arr[g]++;
      blue_arr[b]++;
    }
  }

  colors[0] = red_arr;
  colors[1] = green_arr;
  colors[2] = blue_arr;

  imagen.updatePixels();
  updatePixels();
  strokeWeight(4);
}
function mousePressed() {
  if (mouseX &lt; leftM || mouseX > leftM + 70) return
  stateR = color('rgba(255,0,0,0.1)')
  stateG = color('rgba(0,255,0,0.1)')
  stateB = color('rgba(0,0,255,0.1)')
  if (mouseY >= 2 _ upM + img.height && mouseY &lt;= 2 _ upM + img.height + 40) {
    stateR = color('rgba(255,0,0,1)')
  } else if (mouseY >= 2 _ upM + img.height + 50 && mouseY &lt;= 2 _ upM + img.height + 40 + 50) {
    stateG = color('rgba(0,255,0,1)')
  } else if (mouseY >= 2 _ upM + img.height + 100 && mouseY &lt;= 2 _ upM + img.height + 40 + 100) {
    stateB = color('rgba(0,0,255,1)')
  }
}

function draw() {
  background(220);
  //image(img, leftM, upM);
  if (showFilter)
    image(filtered, leftM, upM);
  else
    image(img, leftM, upM);
  stroke(0);
  push();
  fill(255, 0, 0);
  rect(leftM + 10, 2 _ upM + img.height, 70, 40);
  fill(0, 255, 0);
  rect(leftM + 10, 2 _ upM + img.height + 50, 70, 40);
  fill(0, 0, 255);
  rect(leftM + 10, 2 \* upM + img.height + 100, 70, 40);
  pop();

  push();

  if (stateR.toString() == color('rgba(255,0,0,1)').toString()) {
    paint(stateG, colors[1]);
    paint(stateB, colors[2]);
    paint(stateR, colors[0]);
  } else if (stateG.toString() == color('rgba(0,255,0,1)').toString()) {
    paint(stateR, colors[0]);
    paint(stateB, colors[2]);
    paint(stateG, colors[1]);
  } else {
    paint(stateR, colors[0]);
    paint(stateG, colors[1]);
    paint(stateB, colors[2]);
  }
  pop();
  graph();
}

function graph() {
  push();
  stroke(0);
  strokeWeight(1);
  fill(0);
  drawArrow(createVector(leftM, 2 _ img.height), createVector(leftM + img.width, 2 _ img.height), 'x');
  drawArrow(createVector(leftM, 2 \* img.height), createVector(leftM, img.height + upM), 'y');
  textAlign(CENTER);
  textSize(20);

  text('Valores del color (0 - 255) ', leftM + img.width / 2, 2 _ img.height + 2 _ upM);
  let angle2 = radians(270);
  translate(leftM / 2, (3 / 2) \* img.height);
  rotate(angle2);
  // Draw the letter to the screen
  text("Frecuencias", 0, 0);
  pop();
}

function paint(state, array) {
  push();
  stroke(state);
  for (let i = 1; i &lt; 256; i++) {
    xPos = map(i, 0, 256, leftM, leftM + img.width)
    xPrev = map(i - 1, 0, 256, leftM, leftM + img.width)
    yPos = map(array[i], 0, max(array), 2 _ img.height, img.height + 25)
    yPrev = map(array[i - 1], 0, max(array), 2 _ img.height, img.height + 25)
    line(xPrev, yPrev, xPos, yPos)
    line(xPos, 2 \* img.height, xPos, yPos)
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
  if (axis == 'x') {
    vec.x -= 7;
    triangle(vec.x, vec.y + arrowSize / 2, vec.x, vec.y - arrowSize / 2, vec.x + arrowSize, vec.y);
  } else {
    vec.y += 7;
    triangle(vec.x + arrowSize / 2, vec.y, vec.x - arrowSize / 2, vec.y, vec.x, vec.y - arrowSize);
  }

  pop();
}
function convolute(x, y) {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  for (let i = -1; i &lt;= 1; i++) {
    for (let j = -1; j &lt;= 1; j++) {
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

function keyPressed() {
  if (keyCode === 84) {
    showFilter = !showFilter
    if (showFilter)
      calculateHistogram(filtered);
    else
      calculateHistogram(img);
  }
}
{{< /highlight >}}
{{< /details >}}

# Image Kernels

## Problem Statement

Implement an image processing web app supporting different [image kernels](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29).

## Background

The use of Kernels also known as convolution matrices or masks is invaluable to image processing. Techniques such as blurring, edge detection, and sharpening all rely on kernels - small matrices of numbers to be applied across an image in order to process the image as a whole.

They're also used in machine learning for 'feature extraction', a technique for determining the most important portions of an image. In this context the process is referred to more generally as "convolution" (see: [convolutional neural networks](https://en.wikipedia.org/wiki/Convolutional_neural_network).)

## Results

We implemented the convolutional layer by defining a 3x3 matrix in which the filter was defined, then we just iterated through each pixel in the image and calculated a new filtered pixel by adding each of its neighbors weighted with the kernel matrix. Edge pixels were ignored as they don't have the 8 corresponding neighbors.

## Conclusions & Future Work

This method may not be the most efficient to implement this kind of filtering process, using parallel computing may be faster. But as an educative example it's pretty effective and illustrative. We use this kind of filters in our daily lives wihtout even knowing it (until we learned about it), it's used in processing image software (such as photoshop or gimp) and the social media networks we often use. As a future work, it'd be interesting to know how to generate (or approximate) a kernel matrix to achieve a desired filter, also to learn how to implement this by using parallel computing and implement some video filtering.

# Image histogram

## Problem Statement

Implement [Image histogram](https://en.wikipedia.org/wiki/Image_histogram) visualization.

## Background

The histogram of a digital image depicts how the intensities of its pixels are distributed. It is the discrete function h such that

{{< katex display >}} h(x) = n_i {{< /katex >}}

where{{< katex >}}n_i {{< /katex >}} is the number of pixels with intensity {{< katex >}}i {{< /katex >}} .

Histograms are used to quickly analyze the composition of an image, it can be used in RGB composition, gray scale, brightness or the system that best suits our needs.

The pixel values are processed individually, an aggregate is made for each value and the searched histogram is plotted

## Results

As we can see, the histogram of an image is made from its RGB color scalar, for this we analyze each pixel and see how much it contains of each value, which is a value between 0 and 255, then we make the graph by mapping the respective values that allow highlighting the composition of the image.

On the x axis we have the represents the variations of the tone, and on the y axis the quantities that appear in the pixels of the image

## Conclusions & Future Work

Knowing how to create and read an image histogram is a very powerful tool that allows people who work with graphics and everything related to visual computing to quickly analyze an image, it is recommended to have a clear base with what type of color composition according to our objective, so that our graphs agree with the applications of the project. It's also very useful for photographers which use this histograms to know if a photo they took is well exposed or not, by checking if the vast amount of color is either in the left zone of the histogram (meaning the image is underexposed ) or to the right zone (meaning it's overexposed)

# Ligthness

## Problem Statement

Implement a web app that allows the user to change the lightness of an image.

## Background

The lightness of an image is the average of the RGB values of each pixel. The lightness of an image can be changed by adding a constant value to each pixel. This constant value can be positive or negative.

Thereś also other ways to modify the brightness of an image, by modifying some parameters depending on the image color space. For example, in the HSL color space, the lightness can be modified by changing the L parameter.

For this, we used a sample image, where we can reduce or increase the image brightness, and depending on whic color mode the image is, we can do a biyection to RGB and get the new image, modifying the parameters we need.

## code

{{< details title="Image brightness app's code" open="false" >}}
{{< highlight js >}}

let img;

function calculate_hue(r_prime, g_prime, b_prime) {
  // Geometric method
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let delta = c_max - c_min; // delta rgb
  let h = 0;
  let s = 0;
  if (delta == 0) {
    h = 0; // Can be any color
  } else if (c_max == r_prime) {
    h = 60 _ (((g_prime - b_prime) / delta) % 6);
  } else if (c_max == g_prime) {
    h = 60 _ ((b_prime - r_prime) / delta + 2);
  } else if (c_max == b_prime) {
    h = 60 \* ((r_prime - g_prime) / delta + 4);
  }

  if (c_max) {
    s = delta / c_max;
  }

  return h;
}

function calculate_saturation(r_prime, g_prime, b_prime) {
  // Distance from center to max
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let delta = c_max - c_min; // delta rgb
  let s = 0;
  if (c_max) {
    s = 1 - c_min / c_max;
  }

  return s \* 100;
}

function calculate_value(r_prime, g_prime, b_prime) {
  // Height of the cilinder
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let v = c_max;
  return v \* 100;
}

function calculate_hsl_saturation(r_prime, g_prime, b_prime) {
  // Distance from center to max
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let delta = c_max - c_min; // delta rgb
  let s = 0;
  if (calculate_lightness(r_prime, g_prime, b_prime) != 0 && calculate_lightness(r_prime, g_prime, b_prime) != 100) {
    s = delta / (1 - abs(2 \* c_max - 1));
  }

  return s \* 100;
}

function calculate_lightness(r_prime, g_prime, b_prime) {
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let l = (c_max + c_min) / 2;
  return l \* 100;
}

function get_pixel_position(x, y, width) {
  return (x + y _ width) _ 4;
}

function get_pixel_color(x, y, width) {
  let xy = get_pixel_position(x, y, width);
  return \[
    img.pixels[xy],
    img.pixels[xy + 1],
    img.pixels[xy + 2],
    img.pixels[xy + 3],
  ];
}

function set_hsb(colour) {
  let r_prime = colour[0] / 255;
  let g_prime = colour[1] / 255;
  let b_prime = colour[2] / 255;
  let h = calculate_hue(r_prime, g_prime, b_prime);
  let s = calculate_saturation(r_prime, g_prime, b_prime);
  let b = calculate_value(r_prime, g_prime, b_prime);
  return [h, s, b];
}

function set_hsl(colour) {
  let r_prime = colour[0] / 255;
  let g_prime = colour[1] / 255;
  let b_prime = colour[2] / 255;

  let h = calculate_hue(r_prime, g_prime, b_prime);
  let s = calculate_hsl_saturation(r_prime, g_prime, b_prime);
  let l = calculate_lightness(r_prime, g_prime, b_prime);
  let hsl = [h, s, l];
  return hsl;
}

function preload() {
  img = loadImage("<https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1bE-X0pmMMWQOaHNzX4mUDGHCgsESpHyqD8pYxizqaENqaemB")>;
  img.loadPixels();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(255);
  // put drawing code here  
  brightness_reduction = -15; // 0 to 100

  // Change the image brightness in RGB mode

  image(img, 0, 20);
  text("Original Image", img.width / 3, 10);
  img.loadPixels();
  let changed_img = img.get();
  changed_img.loadPixels();
  let rgb_brightness_reduction = (256 \* brightness_reduction) / 100;

  for (let i = 0; i &lt; img.width; i++) {
    for (let j = 0; j &lt; img.height; j++) {
      let new_color = get_pixel_color(i, j, img.width);
      for (let k = 0; k &lt; 3; k++) {
        new_color[k] = new_color[k] - rgb_brightness_reduction;
      }
      changed_img.set(i, j, color(new_color));
    }
  }
  changed_img.updatePixels();
  image(changed_img, 250, 20);
  text("Changed Image (RGB)", 250 + img.width / 4, 10);

  // Change image brightness with HSB color mode
  colorMode(HSB);
  changed_img1 = img.get();
  changed_img1.loadPixels();

  for (let i = 0; i &lt; img.width; i++) {
    for (let j = 0; j &lt; img.height; j++) {
      let new_hsb_color = set_hsb(get_pixel_color(i, j, img.width));
      new_hsb_color[2] = new_hsb_color[2] - (brightness_reduction );
      changed_img1.set(i, j, color(new_hsb_color));
    }
  }
  changed_img1.updatePixels();

  image(changed_img1, 250, 270);
  text("Changed Image (HSB)", 250 + img.width / 4, 260);

  // Change image brightness with HSL color mode

  colorMode(HSL);
  changed_img2 = img.get();
  changed_img2.loadPixels();

  for (let i = 0; i &lt; img.width; i++) {
    for (let j = 0; j &lt; img.height; j++) {
      let new_hsl_color = set_hsl(get_pixel_color(i, j, img.width));
      new_hsl_color[2] = new_hsl_color[2] - (brightness_reduction  );
      changed_img2.set(i, j, color(new_hsl_color));
    }
  }
  changed_img2.updatePixels();

  image(changed_img2, 0, 270);

  text("Changed Image (HSL)", img.width / 3, 260);

}

function draw() {

}

{{< /highlight >}}
{{< /details >}}


I am trying to change the brightness of an image using the HSB and HSL color modes. I am using the formula from here: <https://www.rapidtables.com/convert/color/rgb-to-hsl.html>

## Demo

{{< p5-iframe sketch="/Talleres/sketches/taller1/lightness.js" width="780" height="1000" >}}
