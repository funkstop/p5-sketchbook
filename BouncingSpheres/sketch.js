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
  background(0);
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
    this.colorR = random(255);
    this.colorG = random(255);
    this.colorB = random(255);
  }
  
  displayBall() {
    fill(this.colorR,this.colorG, this.colorB, 100);
    noStroke();
    circle(this.x,this.y,this.size);
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
