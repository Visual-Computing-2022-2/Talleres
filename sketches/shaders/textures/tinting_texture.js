let tintingShader;
let img;
let inputColor;

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  tintingShader = readShader('/Talleres/sketches/shaders/textures/tinting_texture.frag',
    { varyings: Tree.texcoords2 });
  img = loadImage('https://images.pexels.com/photos/10718876/pexels-photo-10718876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  inp1 = createColorPicker('#ff0000');

}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(650, 800, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(tintingShader);
  tintingShader.setUniform("texture", img);

}

function hexToRgb(hex) {
  hex = hex.replace('#', '');

  var bigint = parseInt(hex, 16);

  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r / 255, g / 255, b / 255];
}

function draw() {
  background(0);
  let arr = hexToRgb(inp1.value());
  console.log(arr)
  tintingShader.setUniform("tintColor", arr);
  orbitControl();
  rotateX(-54);
  rotateY(-95)
  box(300);
}