let depth = [ 200 , 140 , 0 , 70 ]
let z = true 
function setup() {
  createCanvas(400, 400, WEBGL);
  // Change 'depth' to false to turn off the depth buffer...
  // this let's you draw 3d shapes, but then 2d shapes on top,
  // without z-fighting. 3d space is basically flattened.
  // from: https://p5js.org/reference/#/p5/setAttributes
  // setAttributes('depth', true);
  
}

function randomDepth ( ) { 
  let aux_solution = depth [ 0 ]
  depth [ 0 ]  = depth [ 3 ]
  for ( let i = 1 ; i < 4 ; i += 1 ) { 
    let aux_solution_1 = depth [ i ]
    depth [ i ] = aux_solution 
    aux_solution = aux_solution_1
  }

}
function keyTyped() {
  if (key === 'z') {
    if ( z == true ){
        z = false
      }
      else { 
        z = true 
      }
  }
  else{
    randomDepth();
  }
}

function draw() {
  background(255);
  lights();
  
  push ( )
  
    translate ( -10 , 10 , depth [ 0 ] )
    if ( z ) { 
      fill(0, 255, 0);
    }
    else { 
      noStroke ( )
      fill ( depth [ 0 ] )
    }
    rotateY(120);
    box ( 50 )
  
  pop ( )
  
  push ( )
  
    translate ( -20 , -20 , depth [ 1 ] )
    if ( z ) { 
      fill(0, 0, 255);
    }
    else { 
      noStroke ( )

      fill ( depth [ 1 ] )
    }
    rotateY(120);
    sphere ( 50 )
  
  pop ( )

  push();
  
    translate ( -50 , -50 , depth [ 2 ]  )
    if ( z ) { 
      fill(255,0,0);
    }
    else { 
      noStroke ( )

      fill ( depth [ 2 ] )
    }
    rotateY(50);
    box(50);
  
  pop();
  
  push();
  
    translate ( 30 , 30 , depth [ 3 ] )
    if ( z == true ) { 
      fill(255,255,0);
    }
    else { 
      noStroke ( )

      fill ( depth [ 3 ] )
    }
    rotateY(200);
    sphere ( 45 )
  
  pop();
  
}