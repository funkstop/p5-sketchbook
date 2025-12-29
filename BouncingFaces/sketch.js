/*
What's the same?
They share these same properties:
x
y
size
speed

They all share these same behaviors:
displaying
moving
bouncing
*/

let bouncyBalls = [];
let maxXspeed = 4;
let maxYspeed = 4;
let numberofBalls = 200;
let maxSize = 100;

function setup() {
  createCanvas(400, 400);
  for (let i=0;i<numberofBalls;i++) {
    bouncyBalls[i] = new Ball(random(width),0,random(maxSize),random(maxXspeed),random(maxYspeed));
  }
}

function draw() {
  background(130,110,210);
  for (let i=0; i<numberofBalls; i++) {
    moveBall(bouncyBalls[i]);
  }
}

function moveBall(ball) {
  ball.displayBall();
  ball.moveBall();
  ball.bounceBall();
}

class Ball {
  constructor(x,y,size,xspeed,yspeed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.colorR = 255; //random(255);
    this.colorG = 224; //random(255);
    this.colorB = 48; //random(255);
  }
  
  displayBall() {
    let ratio = 15/100 * this.size;
    fill(this.colorR,this.colorG, this.colorB, 120);
    stroke('grey');
    circle(this.x,this.y,this.size);
    stroke('black')
    circle(this.x, this.y+(this.size/7),ratio*.8)
    fill ('white')
    circle (this.x+(this.size/5),this.y-ratio*.1, ratio)
    circle (this.x-(this.size/5),this.y-ratio*.1, ratio)
    curve((this.x - ratio*6), (this.y - ratio*2),  // Control point 1
        (this.x - ratio*1.2), (this.y + ratio*2),     // Visible start
        (this.x + ratio*1.2), (this.y + ratio*2),     // Visible end
        (this.x + ratio*6), (this.y - ratio*2)      // Control point 2
    );
  }
  
  moveBall() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  
  bounceBall() {
    if (this.x > width || this.x < 0) {
      this.xspeed *= -1;
    }

    if (this.y > height || this.y < 0) {
      this.yspeed *= -1;
    }
  }
    
}
