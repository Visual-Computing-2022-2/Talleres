* ### Here we invert the respective uv mapping for each vertex of the square.

{{< details title="frag" >}}
{{< highlight js >}}
  precision mediump float;

  // the texture coordinates varying was defined in 
  // the vertex shader by treegl readShader()
  // open your console and & see!
  varying vec2 texcoords2;

  void main() {
    // glsl swizzling is both handy and elegant
    // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling+
    // r g b a
    gl_FragColor = vec4(texcoords2.xy, 0.0, 1.0);
  }
{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/Talleres/sketches/shaders/textures/uv1.js" width="325" height="325" >}}

* ### Include the blue channel in the uv visualization (e.g., use blue with red or green channels).

{{< details title="frag">}}
{{< highlight js >}}
precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;
uniform float opacity;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling+
  // r g b a
  gl_FragColor = vec4(0.0, texcoords2.xy, opacity);
}
{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/Talleres/sketches/shaders/textures/uv_opacity.js" width="325" height="325" >}}

* ### Implement texture tinting by mixing color and texel interpolated data.

{{< details title="frag">}}
{{< highlight js >}}
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
{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/Talleres/sketches/shaders/textures/tinting_texture.js" width="700" height="860" >}}

## Conclusions

Mapping textures might be one of the most important topics viewed in this section as it empowers the creation of complex scenes and rendering almost any project. It's also worth to mention and remark the importance ofmaking use of barycentric coordinates to correctly interpolate space data. 