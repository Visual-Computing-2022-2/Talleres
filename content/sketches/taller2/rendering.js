let a1,a2,b1,b2,c1,c2
function randomLine ( ){
  a1 = int ( random(0, 17) ) * 25 ;
  a2 = int ( random(0, 17) ) * 25 ;
  b1 = int ( random(0, 17) ) * 25 ;
  b2 = int ( random(0, 17) ) * 25 ;
  c1 = int ( random(0, 17) ) * 25 ;
  c2 = int ( random(0, 17) ) * 25 ;
}

function setup() {
  createCanvas(400, 400);
  randomLine ( )
 
 
}
function keyPressed() {
  randomLine();
}
function draw() {
  background ( 0 )
 
  for ( let x = 12.5 ; x <= 400 ; x += 25 ){
    for ( let y = 12.5 ; y <= 400 ; y += 25 ){
      let aux1 = ( ( x - a1 ) * ( b2 - a2 ) ) - ( ( y - a2 ) * ( b1 - a1 ) )
      let aux2 = ( ( x - b1 ) * ( c2 - b2 ) ) - ( ( y - b2 ) * ( c1 - b1 ) )
      let aux3 = ( ( x - c1 ) * ( a2 - c2 ) ) - ( ( y - c2 ) * ( a1 - c1 ) )

      if ( ( aux1 <= 0 && aux2 <= 0 && aux3 <= 0 ) || ( aux1 >= 0 && aux2 >= 0 && aux3 >= 0 )  ){

        let c = color(255, 0 , 128);
        fill(c);
        stroke ( c )
        rect ( x - 12.5 , y - 12.5 , 25, 25 )
       
      }  
    }
   
  }
 
  for ( let i = 25 ; i <= 400 ; i += 25 ){
    let c = color(0, 255, 0);
    fill(c);
    stroke(c);
    line ( i , 0 , i , 400 )
    line ( 0 , i , 400 , i )
  }
 
  let c = color(0, 0 , 255);
  fill(c);
  stroke ( c )
 
  line( a1 , a2 , b1 , b2 );
  line( b1 , b2 , c1 , c2 );
  line( c1 , c2 , a1 , a2 );
 
 
 
}