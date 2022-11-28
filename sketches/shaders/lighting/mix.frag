precision mediump float;

uniform vec4 ambient4;
uniform vec4 uMaterialColor;
uniform vec3 lightNormal;

varying vec3 normal3;

void main() {
  float intensity = max(0.0, dot(normalize(-lightNormal), normalize(normal3)));
  float k = intensity > 0.95 ? 1.0 : intensity > 0.5 ? 0.6 : intensity > 0.25 ? 0.4 : 0.2;
  gl_FragColor = k * ambient4 * uMaterialColor;
}