/*
  Game's logic:
  We mantain a 2D matrix holding the game's state 18x18
  This matrix will hold the current box placed in a cell (save the color), or 0 if the cell is empty.
  
 */

  function mod(n, m) {
    return ((n % m) + m) % m;
}

// mod = (n, m) => ((n % m) + m) % m;

let gameMatrix = Array();
const WIDTH_GAME_MATRIX = 18
const HEIGHT_GAME_MATRIX = 18
const width = 600; //Put 800 here
const height = 900;
let camX = 0
let camY = 100
let camZ = -20
let centerX = 0;
let centerY = camY;
let centerZ = 0
let cameraDistance = 800
let cameraAngleRotation = 0;
var colors;
let tokens = [
    [
        [0, 8, 0, 0],
        [0, 8, 0, 0],
        [0, 8, 0, 0],
        [0, 8, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 2, 0],
        [2, 2, 2]
    ],
    [
        [3, 3,],
        [3, 3,]
    ],
    [
        [0, 0, 4],
        [0, 0, 4],
        [0, 4, 4]
    ],
    [
        [5, 0, 0],
        [5, 0, 0],
        [5, 5, 0]
    ],
    [
        [0, 0, 0],
        [0, 6, 6],
        [6, 6, 0],
    ],
    [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7],

    ]
];
let step = 360 / WIDTH_GAME_MATRIX;
let height_step = 400 / HEIGHT_GAME_MATRIX;
let tetrisRadius = 100;
let interval;

let current_order = [...tokens];
let h_token = 17;
let i_token = -1;
let current_token;

function setup() {

    createCanvas(width, height, WEBGL);
    angleMode(DEGREES);
    frameRate(10);
    // normalMaterial();
    for (let i = 0; i < 18 + 1 + 4; i++)
        gameMatrix.push([...Array(18).fill(0)]);
    interval = setInterval('move_down()', 1000)
    gameMatrix[0] = [...Array(18).fill(9)];
    gameMatrix[18] = [...Array(18).fill(1)];
    colors = {
        1: color("#E0DDDD"),
        2: color("#F9DC5C"),
        3: color("#98F3F6"),
        4: color("#F4FFFD"),
        5: color("#C08AE9"),
        6: color("#F39A9D"),
        7: color("#C6ECAE"),
        8: color("#FE55E4"),
        9: color("#9f9f9f"),
        10: color("#FF0034")
    }
    next_token();
}


function checkKeys() {

    //To rotate the camera
    if (keyIsDown(68) && try_move(3)) { //Derecha
        i_token++;
        cameraAngleRotation += 20;
    }
    if (keyIsDown(65) && try_move(2)) { //Izquierda
        i_token--;
        cameraAngleRotation -= 20;
    }
    if (keyIsDown(83)) {
        move_down();
    }
    cameraAngleRotation %= 360;
    camX = cos(cameraAngleRotation) * cameraDistance;
    camZ = sin(cameraAngleRotation) * cameraDistance;
};


function rotate_token(clockwise) {
    let new_token = Array();
    let side = current_token[0].length
    if (clockwise) {
        for (let j = 0; j < side; j++) {
            let new_token_row = Array();
            for (let i = side - 1; i >= 0; i--) {
                new_token_row.push(current_token[i][j]);
            }
            new_token.push(new_token_row);
        }
    }
    else {
        for (let j = side - 1; j >= 0; j--) {
            let new_token_row = Array();
            for (let i = 0; i < side; i++) {
                new_token_row.push(current_token[i][j]);
            }
            new_token.push(new_token_row);
        }
    }

    for (let i = 0; i < current_token.length; i++) {
        for (let j = 0; j < current_token.length; j++) {
            if (new_token[i][j] && gameMatrix[mod(h_token - i, 24)][mod(i_token + j, 18)] > 1)
                return;
        }
    }
    current_token = new_token;
}


function move_down() {
    if (try_move(1))
        h_token--;
    else {
        for (let i = 0; i < current_token.length; i++) {
            for (let j = 0; j < current_token.length; j++) {
                if (current_token[i][j])
                    gameMatrix[mod(h_token - i, 24)][mod(i_token + j, 18)] = current_token[i][j];
            }
        }
        if (check_status()) return;
        check_lines();
        next_token();
    }
}

function check_status() {
    for (let i = 0; i < 18; i++) {
        if (gameMatrix[18][i] > 1) {
            lose()
            return 1;
        }
    }
}
function lose() {
    clearInterval(interval)
    for (let i = 0; i < 18; i++) {
        if (gameMatrix[18][i] > 1) {
            // gameMatrix[18][i] = 10;
            display(18, i, 10);
        }
    }
    noLoop()
}

function check_lines() {
    let lines = Array();

    for (let i = 1; i < gameMatrix.length; i++) {
        let cur_line = 0;
        for (let j = 0; j < gameMatrix[0].length; j++) {
            if (gameMatrix[i][j] != 0)
                cur_line++;
        }
        if (cur_line == gameMatrix.length)
            lines.push(i);
    }
    for (let i = 0; i < lines.length; i++) {
        let idx = lines[i];
        for (let j = idx; j + 1 < gameMatrix.length; j++) {
            gameMatrix[j] = [...gameMatrix[j + 1]];
        }
        gameMatrix[gameMatrix.length - 1] = [...Array(18).fill(0)]
    }
}


function draw() {
    // create a classic plane -> h positive to go up ad
    translate(0, -1, 0);
    checkKeys();
    orbitControl();

    camera(camX, camY, camZ, centerX, centerY, centerZ, 0, -1, 0);

    background(240);
    // strokeWeight(20)
    // strokeWeight(1)

    for (let h = 0; h < gameMatrix.length; h += 1) {
        for (let i = 0; i < gameMatrix[h].length; i += 1) {
            display(h, i, gameMatrix[h][i]);
        }
    }

    for (let i = 0; i < current_token.length; i++) {
        for (let j = 0; j < current_token.length; j++) {
            // print(h_token)
            display(mod(h_token - i, 24), mod(i_token + j, 18), current_token[i][j]);
        }
    }
}

function try_move(direction) {
    // 1 down
    // 2 left
    // 3 right

    let sum = 0;

    if (direction == 1) {
        for (let i = 0; i < current_token.length; i++) {
            for (let j = 0; j < current_token.length; j++) {
                if (current_token[i][j] != 0 && gameMatrix[mod(h_token - i - 1, 24)][mod(i_token + j, 18)] > 1) {
                    sum++;
                }
            }
        }
    } else if (direction == 2) {
        for (let i = 0; i < current_token.length; i++) {
            for (let j = 0; j < current_token.length; j++) {
                if (current_token[i][j] != 0 && gameMatrix[mod(h_token - i, 24)][mod(i_token + j - 1, 18)] > 1) {
                    sum++;
                }
            }
        }
    } else if (direction == 3) {
        for (let i = 0; i < current_token.length; i++) {
            for (let j = 0; j < current_token.length; j++) {
                if (gameMatrix[mod(h_token - i, 24)][mod(i_token + j + 1, 18)] > 1 && current_token[i][j] != 0) {
                    sum++;
                }
            }
        }
    }
    return sum == 0;
}

function display(h, i, color) {
    if (color == 0) return;
    push();
    fill(colors[color]);
    translate(cos(step * (i + 0)) * tetrisRadius, (h + 1) * (height_step + 1), sin(step * (i + 0)) * tetrisRadius);
    box(20);
    pop();
}


function next_token() {
    if (current_order.length == 0) {
        current_order = shuffle(tokens);
    }
    current_token = current_order.pop()
    h_token = 17 + current_token.length;
}


function mouseWheel(event) {
    cameraDistance += (event.delta / 10);
}

function keyPressed() {
    if (keyCode == 81) {
        rotate_token(true);
    }
    if (keyCode == 69) {
        rotate_token(false);
    }
}
