/*
  Game's logic:
  We mantain a 2D matrix holding the game's state 18x18
  This matrix will hold the current box placed in a cell (save the color), or 0 if the cell is empty.
  
 */

  function mod(n, m) {
    return ((n % m) + m) % m;
  }
  
  let gameMatrix = Array(18).fill(Array(18).fill(0));
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
  let cameraDistance = 400
  let cameraAngleRotation = 0;
  var colors;
  let tokens = [
    [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]
    ],
    [
      [0,0,0],
      [0,2,0],
      [2,2,2]
    ],
    [
      [0,0,0],
      [3,3,0],
      [3,3,0]
    ],
    [
      [0,0,4],
      [0,0,4],
      [0,4,4]
    ],
    [
      [5,0,0],
      [5,0,0],
      [5,5,0]
    ],
    [
      [0,0,0],
      [0,6,6],
      [6,6,0],
    ],
    [
      [0,0,0],
      [7,7,0],
      [0,7,7],
      
    ]
  ];
  let step = 360 / WIDTH_GAME_MATRIX;
  let height_step = 400 / HEIGHT_GAME_MATRIX;
  let tetrisRadius = 100;
  let interval;
  
  let current_order = [...tokens];
  
  function setup() {
    // print(gameMatrix)
    createCanvas(width, height, WEBGL);
    angleMode(DEGREES);
    frameRate(10);
    // console.log('Hola');
    interval = setInterval('move_down()',1000)
    //First row creates the line base in the game shape
    // gameMatrix.push([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
    // gameMatrix[1] = [2, 2, 2, 2, 1, 1, 2, 1, 6, 6, 2, 3, 6, 6, 7, 7, 7, 3];
    // gameMatrix.push([0, 0, 2, 2, 1, 1, 4, 7, 7, 7, 7, 2, 0, 0, 0, 0, 0, 0]);
    // gameMatrix.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0]);
    gameMatrix[0] = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
    colors = {
      1: color("#F9DC5C"),
      2: color("#ED254E"),
      3: color("#F4FFFD"),
      4: color("#011936"),
      5: color("#F39A9D"),
      6: color("#C6ECAE"),
      7: color("#FE5F55"),
      8: color("#9f9f9f"),
    }
  }
  let h_token = 17;
  let i_token = -1;
  
  function checkKeys() {
    
    //To rotate the camera
    if (keyIsDown(65)){ // && try_move(2)) {
      i_token++;
      cameraAngleRotation += 20;
    }
    if (keyIsDown(68)){ //} && try_move(3)) {
      i_token--;
      cameraAngleRotation -= 20;
    }
    if(keyIsDown(83)){
      move_down();
    }
    cameraAngleRotation %= 360;
    camX = cos(cameraAngleRotation) * cameraDistance;
    camZ = sin(cameraAngleRotation) * cameraDistance;
    // draw();
  };
  
  let current_token = current_order[2];
  
  
  function move_down(){
    if(try_move(1))
      h_token--;
    else{
      // clearInterval(interval);
      for(let i = 0;i<current_token.length;i++){
        for(let j = 0;j<current_token.length;j++){
          gameMatrix[mod(h_token - i, 18)][mod(i_token + j, 18)] = current_token[i][j];
          // print(mod(h_token - i, 18),mod(i_token - j, 18));
        }
      }
      // interval = setInterval('move_down()',1000);
      h_token = 17;
      next_token();
    }
  }
  
  
  function draw() {
    // create a classic plane -> h positive to go up ad
    translate(0, -1, 0);
    checkKeys();
    
    
    camera(camX, camY, camZ, centerX, centerY, centerZ, 0, -1, 0);
  
    background(240);
    strokeWeight(20)
    strokeWeight(1)
  
    
    // let ringHeight = 0
    for (let h = 0; h < gameMatrix.length; h += 1) {
      // ringHeight += height_step + 1;
      for (let i = 0; i < gameMatrix[h].length; i += 1) {
        // let angle = step * (i + 1);
        // if (gameMatrix[h][i] == 0)
        //   continue;
        // let x = cos(angle) * tetrisRadius;
        // let z = sin(angle) * tetrisRadius;
        // push();
        // fill(colors[gameMatrix[h][i]]);
        // translate(x, ringHeight, z);
        // box(20);
        // pop();
        display(h,i,gameMatrix[h][i]);
      }
    }
    // print(i,j);
    // print(current_token.length)
    
    for(let i = 0;i < current_token.length;i++){
      for(let j = 0;j < current_token.length;j++){
        display(mod(h_token - i,18), mod(i_token + j, 18), current_token[i][j]);
      }
    }
    
  }
  
  function try_move(direction){
    // 1 down
    // 2 left
    // 3 right
    
    let sum = 0;
    
    if(direction == 1){
      for(let i = 0;i<current_token.length;i++){
        for(let j = 0;j<current_token.length;j++){
          // print(mod(h_token - i - 1, 18),j)
          if(gameMatrix[mod(h_token - i - 1, 18)][j] != 0 && current_token[i][j] != 0){
            sum++;
          }
        }
      }
    }else if(direction == 2){
      for(let i = 0;i<current_token.length;i++){
        for(let j = 0;j<current_token.length;j++){
          if(gameMatrix[i][mod(i_token + j - 1, 18)] != 0 && current_token[i][j] != 0)
            sum++;
        }
      }
    }else if(direction == 3){
      for(let i = 0;i<current_token.length;i++){
        for(let j = 0;j<current_token.length;j++){
          if(gameMatrix[i][mod(i_token + j + 1, 18)] != 0 && current_token[i][j] != 0)
            sum++;
        }
      }
    }
    // print(sum);
    return sum == 0;
  }
  
  function display(h, i, color){
      // console.log('display')
      if (color == 0) return;
      push();
      fill(colors[color]);
      translate(cos(step * (i + 0)) * tetrisRadius, (h + 1) * (height_step + 1), sin(step * (i + 0)) * tetrisRadius);
      box(20);
      pop();
  }
  
  
  function next_token(){
    if(current_order.length == 0){
      current_order = shuffle(tokens);
    }
  
    current_token = current_order.pop()
  }
  
  
  function mouseWheel(event) {
    cameraDistance += (event.delta / 10);
  }