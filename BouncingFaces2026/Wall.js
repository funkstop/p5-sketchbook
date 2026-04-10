class Wall {
  constructor(x, w, brickW, brickH) {
    this.x = x;           // left edge
    this.w = w;           // thickness
    this.brickW = brickW;
    this.brickH = brickH;

    this.cols = Math.ceil(w / brickW);
    this.rows = Math.ceil(height / brickH);

    // 2D grid stored as 1D array
    this.bricks = new Array(this.cols * this.rows).fill(true);
    this.remaining = this.bricks.length;
  }

  idx(c, r) {
    return r * this.cols + c;
  }

  draw() {
    if (this.remaining <= 0) return;

    noStroke();
    fill(70, 20, 170); // adjust if you want


    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (!this.bricks[this.idx(c, r)]) continue;

        let px = this.x + c * this.brickW;
        let py = r * this.brickH;
        rect(px, py, this.brickW, this.brickH);
      }
    }
  }

  cellForPoint(px, py) {
    // inside wall?
    if (px < this.x || px > this.x + this.w) return null;
    if (py < 0 || py > height) return null;

    let c = Math.floor((px - this.x) / this.brickW);
    let r = Math.floor(py / this.brickH);

    c = constrain(c, 0, this.cols - 1);
    r = constrain(r, 0, this.rows - 1);
    return { c, r };
  }
  cellIndexForPoint(px, py) {
    let cell = this.cellForPoint(px, py);
    if (!cell) return -1;
    return this.idx(cell.c, cell.r);
  }

  crumbleAtPoint(px, py) {
    if (this.remaining <= 0) return false;

    let cell = this.cellForPoint(px, py);
    if (!cell) return false;

    let i = this.idx(cell.c, cell.r);
    if (this.bricks[i]) {
      this.bricks[i] = false;
      this.remaining--;
      return true;
    }
    return false;
  }

  isGone() {
    return this.remaining <= 0;
  }
  hasBrickAtPoint(px, py) {
    let cell = this.cellForPoint(px, py);
    if (!cell) return false;
    return this.bricks[this.idx(cell.c, cell.r)];
  }

}

class LayeredWall {
  constructor(xLeft, xRight, cellW, cellH) {
    this.x = xLeft;
    this.right = xRight;
    this.cellW = cellW;
    this.cellH = cellH;

    this.cols = Math.ceil((this.right - this.x) / this.cellW);   // “layers” into the wall
    this.rows = Math.ceil(height / this.cellH);                  // vertical bricks

    // grid[row][col] = true means that brick cell exists
    this.grid = Array.from({ length: this.rows }, () =>
      new Array(this.cols).fill(true)
    );

    this.remaining = this.rows * this.cols;
  }

  draw() {
    if (this.remaining <= 0) return;

    noStroke();
    fill(90, 90, 90);

    for (let r = 0; r < this.rows; r++) {
      let y = r * this.cellH;
      for (let c = 0; c < this.cols; c++) {
        if (!this.grid[r][c]) continue;
        let x = this.x + c * this.cellW;
        rect(x, y, this.cellW, this.cellH);
      }
    }
  }

  rowForY(y) {
    return constrain(Math.floor(y / this.cellH), 0, this.rows - 1);
  }

  colForX(x) {
    return constrain(Math.floor((x - this.x) / this.cellW), 0, this.cols - 1);
  }

  hasCell(r, c) {
    if (this.remaining <= 0) return false;
    return this.grid[r][c];
  }

  crumbleCell(r, c) {
    if (this.remaining <= 0) return false;
    if (this.grid[r][c]) {
      this.grid[r][c] = false;
      this.remaining--;
      return true;
    }
    return false;
  }

  isGone() {
    return this.remaining <= 0;
  }
}