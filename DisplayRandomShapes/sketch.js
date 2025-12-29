let x = 400;
let y = 400;
let size = 100; //max size of shapes

function setup() {
  createCanvas(x, y);
  background('black');
}

//choice of colors to use
function randomColor() {
  return random(255);
}

//random selection of predefined shapes
function randomShape() {
  return random(['circle','triangle', 'square'])
}

function draw() {
   for (let i=0; i<10; i++) {
    fill(random(255),random(255),random(255),150);
    noStroke();
    let currentSize = random(size);
    let shape = randomShape();
    if (shape=="circle") {
      circle(random(currentSize, x-currentSize),random(currentSize,y-size),currentSize)
    } else if (shape=="square") {
      rect(random(x-currentSize),random(y-currentSize),currentSize);
    } else if (shape=="triangle") {
      triangle(random(x-currentSize),random(y-currentSize),random(x-currentSize), random(y-currentSize), random(x-currentSize), random(y-currentSize));

    }
    frameRate(10);
  }
}
