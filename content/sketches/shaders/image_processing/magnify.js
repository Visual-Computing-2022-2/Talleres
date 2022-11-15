let uvShader;
let img;
let inputColor; 

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/Talleres/sketches/shaders/image_processing/magnify.frag',
                        {varyings: Tree.texcoords2 });
  img = loadImage("https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/c8cb366d52fc2a67fb313c344efdbc9e.png");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(580,670, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(uvShader);
  uvShader.setUniform("texture",img);
  uvShader.setUniform("iResolution",[650,800]);
}

//uniform vec2 iMouse;
//uniform vec2 iResolution;
//uniform vec2 texcoords2;
//uniform sampler2D texture;

function draw() {
  background(0);
  uvShader.setUniform("iMouse",[mouseX,mouseY]);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
      width / 2, height / 2, -width / 2, height / 2);
}