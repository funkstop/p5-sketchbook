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
let maxSize = 50;
let wall;
let crumbleBricks = [];
let debrisHeights = [];
let debrisBins = 50; // number of columns across the width
let debrisMax = 140;  // max pile height in pixels (cap)
let floorBase = 20; // base floor thickness (pixels)
let wallCleared = false;
let endBloom;


  
function setup() {
  createCanvas(400, 400);
  endReveal = new Reveal2026(width / 2, height / 2);

  let wallX = width * .8; // 10% away from right edge
  
  let wallW = width - wallX; // full thickness to right edge
  
  // brickW=10, brickH=8
  wall = new Wall(wallX, wallW, 10, 8); 

  debrisHeights = new Array(debrisBins).fill(0);

  for (let i=0;i<numberofBalls;i++) {
    bouncyBalls[i] = new Ball(
      random(wall.x - maxSize/2), 
      0, 
      random(maxSize), 
      random(maxXspeed), 
      random(maxYspeed)
    );
  }
}

function draw() {
  background(130,110,210);
  endReveal.updateAndDraw();

  wall.draw();
  
  // balls float away when wall is cleared
  if (!wallCleared && wall.isGone()) {
    wallCleared = true;
    endReveal.start();

    // give every ball a gentle “float away” velocity
    for (let i = 0; i < bouncyBalls.length; i++) {
      bouncyBalls[i].xspeed = random(-1.0, 1.0);
      bouncyBalls[i].yspeed = random(-2.5, -0.8); // upward
    }
  }

  for (let i = crumbleBricks.length - 1; i >= 0; i--) {
    crumbleBricks[i].update();
    crumbleBricks[i].draw();
    let floorY = pileSurfaceYAtX(crumbleBricks[i].x);

    // if bricks has reached the debris surface, deposit and remove it
    if (crumbleBricks[i].y >= floorY) {
      depositToPile(crumbleBricks[i].x, .1);
      crumbleBricks.splice(i, 1);
      continue;
    }

    // still allow cleanup if it lives too long
    if (crumbleBricks[i].isDead()) crumbleBricks.splice(i, 1);
  }

  
  drawFloor();

  for (let i=0; i<numberofBalls; i++) {
    moveBall(bouncyBalls[i]);
  }
       
  /*if (wall.isGone()) {
    noStroke();
    fill(0);           // translucent dark backing
    rect(0, 0, width, 50);

    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("WALL GONE", width / 2, 25);
  }*/
}

function spawnCrumble(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    crumbleBricks.push(new Brick(x, y));
  }
}

function pileSurfaceYAtX(x) {
  let i = constrain(Math.floor(map(x, 0, width, 0, debrisBins)), 0, debrisBins - 1);
  return height - floorBase - debrisHeights[i];
}

function depositToPile(x, amount = 0.06) {
  let i = constrain(Math.floor(map(x, 0, width, 0, debrisBins)), 0, debrisBins - 1);

  // tune these two numbers
  const leftRadius = 100;   // spreads farther left
  const rightRadius = 3;   // spreads a little right
  const leftFalloff = .95;  // 0.7..0.9 (higher = more spread)
  const rightFalloff = 1; // 0.6..0.85

  // center deposit (most mass)
  debrisHeights[i] = min(debrisMax, debrisHeights[i] + amount);

  // spread left
  for (let d = 1; d <= leftRadius; d++) {
    let j = i - d;
    if (j < 0) break;
    let add = amount * Math.pow(leftFalloff, d) * 0.35; // scale factor keeps it subtle
    debrisHeights[j] = min(debrisMax, debrisHeights[j] + add);
  }

  // spread right
  for (let d = 1; d <= rightRadius; d++) {
    let j = i + d;
    if (j >= debrisBins) break;
    let add = amount * Math.pow(rightFalloff, d) * 0.25;
    debrisHeights[j] = min(debrisMax, debrisHeights[j] + add);
  }
}


function drawFloor() {
  // Draw a base floor + mound on top
  noStroke();
  fill(190, 90, 290);
 // adjust if you want

  beginShape();
  vertex(0, height);
  vertex(0, height - floorBase - debrisHeights[0]);

  for (let i = 0; i < debrisBins; i++) {
    let x = map(i, 0, debrisBins - 1, 0, width);
    let y = height - floorBase - debrisHeights[i];
    vertex(x, y);
  }

  vertex(width, height - floorBase - debrisHeights[debrisBins - 1]);
  vertex(width, height);
  endShape(CLOSE);
}


function moveBall(ball) {
  ball.displayBall();
  ball.moveBall();

  if (!wallCleared) {
    ball.tunnelThroughWall(wall);
    ball.bounceBall();
  } else {

    ball.yspeed -= 0.01;
  }
  

}

