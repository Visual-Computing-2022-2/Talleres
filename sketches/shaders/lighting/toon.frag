precision mediump float;

uniform vec4 ambient4;
uniform vec4 uMaterialColor;
uniform vec3 lightNormal;

varying vec3 normal3;

void main() {
  float diffuse = max(0.0, dot(normalize(-lightNormal), normalize(normal3)));  
  float toon ;
  if ( diffuse > 0.85) {
    toon = 1.0;
  }
  else if ( diffuse > 0.55 ){
    toon = 0.7;
  }
  else if ( diffuse > 0.25 ){
    toon = 0.4;
  }
  else{
    toon = 0.1;
  }
  gl_FragColor = ( toon + ambient4 )  * uMaterialColor;
}