

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx = random(-0.8, 0.8);
    this.vy = random(0.5, 2.2);

    this.size = random(3.5, 7.5);
    this.life = random(40, 80); // frames
  }

  update() {
    // gravity
    this.vy += 0.08;

    // move
    this.x += this.vx;
    this.y += this.vy;

    // fade out over time
    this.life -= 1;
  }

  draw() {
    noStroke();
    // grey with alpha based on life
    let a = map(this.life, 0, 80, 0, 180);
    fill(190, 90, 290, a);
   // fill(90, 20, 250, a);
    circle(this.x, this.y, this.size);
  }

  isDead() {
    return this.life <= 0 || this.y > height + 10;
  }
}


