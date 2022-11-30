precision mediump float;

// uniforms are emitted from the sketch
// https://p5js.org/reference/#/p5.Shader/setUniform
uniform vec3 color1;
uniform vec3 color2;
uniform float alpha

void main() {
  gl_FragColor = vec4(vec3(color1 * color2), alpha);
}