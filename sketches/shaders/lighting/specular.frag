precision mediump float;

uniform float ambient;
uniform vec4 uMaterialColor;
uniform vec3 uLightPosition;

varying vec3 normal3;
varying vec4 position4;

void main() {
  vec3 direction3 = uLightPosition - position4.xyz;
  vec3 reflected3 = reflect(-direction3, normalize(normal3));
  vec3 camera3 = -position4.xyz;
  float specular = max(0.0, dot(normalize(reflected3), normalize(camera3)));
  gl_FragColor = (ambient + specular) * uMaterialColor;
}