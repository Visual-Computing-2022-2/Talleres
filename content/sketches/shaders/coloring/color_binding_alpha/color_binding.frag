precision mediump float;

// uniforms are emitted from the sketch
// https://p5js.org/reference/#/p5.Shader/setUniform
uniform vec4 color1;
uniform vec4 color2;

void main() {
  gl_FragColor = vec4(color1 * color2);
}