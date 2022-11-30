# Coloring

The following samples had the purpose to experiment color and lighting in the shaders. This principles are going to be used later on more sofisticated lighting tequniques.

## Problem statement

Comprehend properly the color and lighting concepts in the shaders. And to use gragment shaders properly.

## Background

Observing the behavior of the color effects, we can rapidly see that the colors are rastered and remapped to the screen. This is because the colors are represented in the range [0,1] and the screen is represented in the range [0,255]. This is the reason why we need to remap the colors to the screen. We also observe every value is normalized on shaders. This is because the values are represented in the range [0,1] and the screen is represented in the range [0,255]. This is the reason why we need to remap the colors to the screen.

In addition, we saw that the shader is applyed through the fragment shader. This is because the fragment shader is the one that is executed for each pixel of the screen. This is the reason why we need to remap the colors to the screen. The vertex shader needed in the process is given by the actual API, and can be seen throught the console log.

## COLOR MODE CODE

Fisrstable, we test randomizing a triangle with it's vertexes, and apply a mask to it. This mask transforms each color shown in RGB, it's equivalent on CMYK.

{{< details title="Color mode app code" open="false" >}}
{{< highlight js >}}

let colorShader;
let cmy;
let v1, v2, v3;

function preload() {
    // The vertex shader defines how vertices are projected onto clip space.
    // Most of the times a projection and modelview matrix are needed for it:
    // <https://visualcomputing.github.io/docs/shaders/programming_paradigm/>
    // Here, however, we are going to:
    // 1. Define the triangle vertices directly in clip space, thus bypassing
    // both of these matrices (matrices: Tree.NONE). The p5 mandelbrot vertex
    // shader does just the same: <https://p5js.org/reference/#/p5/loadShader>
    // 2. Interpolate vertex color data (varyings: Tree.color4). Note that
    // color data is defined in a per vertex basis with the p5 fill command.
    // Have a look at the generated vertex shader in the console!
    // readShader: <https://github.com/VisualComputing/p5.treegl#handling>
    colorShader = readShader('/Talleres/sketches/shaders/coloring/color_mode/change_colormode.frag',
        { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
    // shaders require WEBGL mode to work
    let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    cnv.position(0, 0, 'fixed');
    // <https://p5js.org/reference/#/p5/shader>
    shader(colorShader);
    randomizeTriangle();
}

function draw() {
    background(0);
    // the fill command is used to define the colors
    // (to be interpolated) in a per-vertex basis
    beginShape(TRIANGLES);
    fill('red');
    vertex(v1.x, v1.y);
    fill('green');
    vertex(v2.x, v2.y);
    fill('blue');
    vertex(v3.x, v3.y);
    endShape();
}

// vertices are given directly in clip-space,
// i.e., both x and y vertex coordinates ∈ [-1..1]
function randomizeTriangle() {
    v1 = p5.Vector.random2D();
    v2 = p5.Vector.random2D();
    v3 = p5.Vector.random2D();
}

function keyPressed() {
    if (key == 'c') {
        cmy = !cmy;
        // <https://p5js.org/reference/#/p5.Shader/setUniform>
        colorShader.setUniform('cmy', cmy);
    }
    if (key == 'r') {
        randomizeTriangle();
    }
}

{{< /highlight >}}
{{< /details >}}

{{< details title="Color binding code" open="false" >}}
{{< highlight frag >}}
// welcome to your first ever shader :)
// in glsl it is mandatory to define a precision!
precision mediump float;

// define color model: rgb (default) or cmy (its complementary)
uniform bool cmy;

// interpolated color is emitted from the vertex shader
// where the variable is defined in the same exact way
// see your console!
varying vec4 color4;

void main() {
  // Observe:
  // 1. All colors are normalized thus vec3(1.0, 1.0, 1.0) gives white
  // which is the same as vec3(1.0). See:
  // <https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Vector_constructors>
  // 2. Use always the decimal digit as in vec3(1.0). Doing it otherwise
  // could lead to errors.
  // 3. color4.rgb builds a vec3 with the first three components of color4
  // (which is a vec4) this is refer to as 'swizzling'
  // see: <https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling>
  gl_FragColor = cmy ? vec4((vec3(1.0) - color4.rgb), color4.a) : color4;
}
{{< /highlight >}}
{{< /details >}}

Fragment Shader Taken from Course Notes.

## Color Mode Demo

| Key | Action |
| --- | --- |
| c | Change color mode |
| r | Randomize triangle |

{{< p5-iframe sketch="/Talleres/sketches/shaders/coloring/color_mode/color.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="525" height="525" >}}

## Color Binding Code

{{< details title="Color binding code" open="false" >}}
{{< highlight js >}}

let same_color_shader;
let color_binding_shader;
let color_picker1;
let color_picker2;

class square_geometry {
    constructor(x, y, side, color) {
        this.x = x;
        this.y = y;
        this.side = side;
        this.color = color;
    }
    display() {
        // fill(this.color);
        rect(this.x, this.y, this.side, this.side);
    }
}

function preload() {
    same_color_shader = readShader('/Talleres/sketches/shaders/coloring/color_binding/same_color.frag',
        { varyings: Tree.texcoords2 });
    color_binding_shader = readShader('/Talleres/sketches/shaders/coloring/color_binding/color_binding.frag',
        { varyings: Tree.texcoords2 });
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    cnv.position(0, 0, 'fixed');
    color_picker1 = createColorPicker("#009087");
    color_picker1.position(0, 0);
    color_picker2 = createColorPicker("#ff8928");
    color_picker2.position(0, 30);
    noStroke();

}

function draw() {
    background("black");
    let squares_sep = 25;
    let square1 = new square_geometry(
        (-windowWidth / 3) - squares_sep,
        (- windowHeight / 3) - squares_sep,
        (windowWidth / 3),
        color_picker1.color()
    );
    let square2 = new square_geometry(
        squares_sep,
        (-windowHeight / 3) - squares_sep,
        windowWidth / 3,
        color_picker2.color()
    );
    let square3 = new square_geometry(
        \-windowWidth / 6,
        squares_sep,
        windowWidth / 3,
        color_picker1.color()
    );
    same_color_shader.setUniform('color1',
        \[(square1.color.levels[0] / 255),
        (square1.color.levels[1] / 255),
        (square1.color.levels[2] / 255)]
    );

    shader(same_color_shader);
    square1.display();
    same_color_shader.setUniform('color1',
        [(square2.color.levels[0] / 255),
        (square2.color.levels[1] / 255),
        (square2.color.levels[2] / 255)]
    );
    shader(same_color_shader);
    square2.display();
    color_binding_shader.setUniform(
        'color1',
        [
            (square1.color.levels[0] / 255),
            (square1.color.levels[1] / 255),
            (square1.color.levels[2] / 255)
        ]);
    color_binding_shader.setUniform(
        'color2',
        [
            (square2.color.levels[0] / 255),
            (square2.color.levels[1] / 255),
            (square2.color.levels[2] / 255)
        ]
    );
    shader(color_binding_shader);
    square3.display();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

{{< /highlight >}}
{{< /details >}}

{{< details title="Color binding fragment shader" open="false" >}}
{{< highlight frag >}}

precision mediump float;

// uniforms are emitted from the sketch
// <https://p5js.org/reference/#/p5.Shader/setUniform>
uniform vec4 color1;
uniform vec4 color2;

void main() {
  gl_FragColor = vec4(color1 * color2);
}

{{< /highlight >}}
{{< /details >}}

{{< details title="Color binding code (shows original color)" open="false" >}}
{{< highlight frag >}}
precision mediump float;

// uniforms are emitted from the sketch
// <https://p5js.org/reference/#/p5.Shader/setUniform>
uniform vec4 color1;

void main() {
  gl_FragColor = color1;
}
{{< /highlight >}}
{{< /details >}}

Fragment Shader Taken from Course Notes.

## Color binding App

{{< p5-iframe sketch="/Talleres/sketches/shaders/coloring/color_binding/color.js" width="525" height="525" >}}

## Results

After doing each exercise, we were able to understand the shaders principles. How them are remapped, and it's application. It was a challenging exercise, but it was very interesting to see how the shaders work.

## Conclusions and Future Work

We were motivated by the overall exercises to continue exploring this area, and other areas of the course. For example ray-tracing, and other research areas.
