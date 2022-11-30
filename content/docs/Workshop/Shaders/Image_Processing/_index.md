
## Uv Visualization

Magnify tool

{{< details title="js code">}}
{{< highlight js >}}
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
{{< /highlight >}}
{{< /details >}}

{{< details title="Fragment Shader" >}}
{{< highlight js >}}
precision mediump float;
uniform vec2 iMouse;
uniform vec2 iResolution;
varying vec2 texcoords2;
uniform sampler2D texture;

void main()
{   
    //Convert to UV coordinates, accounting for aspect ratio
    vec2 uv = texcoords2.xy;
    
    //at the beginning of the sketch, center the magnifying glass.
    //Thanks to FabriceNeyret2 for the suggestion
    vec2 mouse = iMouse.xy;
    if (mouse == vec2(0.0))
        mouse = iResolution.xy / 2.0;
    
    //UV coordinates of mouse
    vec2 mouse_uv = mouse / iResolution;
    
    //Distance to mouse
    float mouse_dist = distance(uv, mouse_uv);
    
    //Draw the texture
	vec4 fragColor = texture2D(texture, texcoords2);
    
    //Draw the outline of the glass
    if (mouse_dist < 0.1)
        fragColor = vec4(0.1, 0.1, 0.1, 1.0);
    
    //Draw a zoomed-in version of the texture
    if (mouse_dist < 0.3)
        fragColor = texture2D(texture, (texcoords2.xy + mouse_uv)/2.0);
    gl_FragColor = fragColor;
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/Talleres/sketches/shaders/image_processing/magnify.js" width="600" height="700" >}}

## Conclusions:

Creating a magnify tool by using shaders is a simplet yet powerful task. As a future work it'd be an interesting challenge to integrate it with other effects and tasks in bigger projects