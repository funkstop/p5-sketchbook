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
    this.wallCooldown = 0;
    this.hasBrokenWall = false;
    this.lastWallCell = -1;


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
    
    if (this.wallCooldown > 0) this.wallCooldown--;

  }
  
  bounceBall() {
    if (this.x > width || this.x < 0) {
      this.xspeed *= -1;
    }

    if (this.y > height || this.y < 0) {
      this.yspeed *= -1;
    }
  }
  
  hitLayeredWall(wall) {
    if (!wall || wall.isGone()) return;
    if (this.wallCooldown > 0) return;

    let r = this.size / 2;

    // only when moving right into the wall band
    if (this.xspeed <= 0) return;

    let leadX = this.x + r;

    // are we in the wall’s x-range?
    if (leadX < wall.x || leadX >= wall.right) return;

    let row = wall.rowForY(this.y);
    let col = wall.colForX(leadX);

    if (wall.hasCell(row, col)) {
      // remove that cell
      wall.crumbleCell(row, col);

      // BLOCK: undo this frame's x-move so the ball doesn't enter solid space
      this.x -= this.xspeed;

      // small cooldown so one impact doesn't erase a bunch of cells instantly
      this.wallCooldown = 2;
    }
  }
  
  tunnelThroughWall(wall) {
    if (!wall || wall.isGone()) return;
    if (this.wallCooldown > 0) return;

    let r = this.size / 2;

    // Probe the leading edge in the direction of motion
    let probeX = this.x + Math.sign(this.xspeed) * r;
    let probeY = this.y;

    // Are we probing inside the wall volume?
    if (probeX < wall.x || probeX > wall.x + wall.w) return;

    // If there's solid brick where we're trying to go:
    if (wall.hasBrickAtPoint(probeX, probeY)) {
      // crumble that brick cell
      wall.crumbleAtPoint(probeX, probeY);
      spawnCrumble(probeX, probeY, 12);


      // BLOCK movement into the solid area by undoing the x move this frame
      this.x -= this.xspeed;

      // bounce off it (so it "hits" and reacts)
      this.xspeed *= -1;

      // small cooldown so one impact doesn't erase multiple cells instantly
      this.wallCooldown = 2;
    }
  }


    
}