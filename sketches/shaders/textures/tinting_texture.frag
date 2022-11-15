precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
uniform vec3 tintColor;
uniform sampler2D texture;
varying vec2 texcoords2;

void main() {
  vec4 texel = texture2D(texture, texcoords2);  
  gl_FragColor = vec4((tintColor*texel.rgb),1.0);
}