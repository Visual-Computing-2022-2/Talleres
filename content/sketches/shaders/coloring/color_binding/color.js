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
        -windowWidth / 6,
        squares_sep,
        windowWidth / 3,
        color_picker1.color()
    );
    same_color_shader.setUniform('color1',
        [(square1.color.levels[0] / 255),
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