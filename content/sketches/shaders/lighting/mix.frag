precision mediump float;

uniform vec4  ambient4;
uniform vec4 uMaterialColor;
uniform vec3 lightNormal;
uniform vec3 uLightPosition;
uniform float ambient;

varying vec3 normal3;
varying vec4 position4;

void main() {
  vec3 direction3 = uLightPosition - position4.xyz;
  float d = length( direction3 );
  float attenuation = clamp(10.0 / d, 0.0, 1.0);
  vec3 reflected3 = reflect(-direction3, normalize(normal3));
  vec3 camera3 = -position4.xyz;
  float specular = max(0.0, dot(normalize(reflected3), normalize(camera3))) * attenuation;
  float intensity = max(0.0, dot(normalize(-lightNormal), normalize(normal3))) ;
  float k = intensity > 0.95 ? 1.0 : intensity > 0.5 ? 0.6 : intensity > 0.25 ? 0.4 : 0.2    ;
  gl_FragColor = ( ambient4  * (ambient  + k  + specular )) * uMaterialColor;
}