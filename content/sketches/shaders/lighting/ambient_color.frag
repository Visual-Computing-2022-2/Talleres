precision mediump float;

uniform float ambient;
uniform vec4 ambient4;
uniform vec4 uMaterialColor;

void main() {
  gl_FragColor = ambient * ambient4 * uMaterialColor;
}
