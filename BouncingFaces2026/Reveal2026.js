class Reveal2026 {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;

    this.active = false;
    this.startFrame = 0;

    // Visual / layout
    this.boxW = 340;     // area we render into (centered)
    this.boxH = 180;
    this.lineH = 8;     // line spacing
    this.charW = 5;      // approximate monospace char width (works fine visually)
    this.textSize = 9;

    // Palette tuned for your purple background
    this.fg = [50, 0, 20];
    // this.shadow = [0, 0, 0];

    // Code-ish source material (repeats; reads as "code" not symbols)
    this.codeSource =
      "(()=>{" +
      "const key=26;" +
      "const data=[" +
      "119,99,58,110,127,121,114,58,115,105,58,119,99,58,123,104,110,52" +
      "];" +
      "const msg=data.map(n=>String.fromCharCode(n^key)).join('');" +
      "console.log(msg);" +
      "return msg;" +
      "})();";

    // Precompute mask once
    this.maskPg = this._buildMask("2026");

    // Prebuild line strings so draw is cheap + consistent
    this.lines = this._buildLines();
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.startFrame = frameCount;
  }

  updateAndDraw() {
    if (!this.active) return;

    const t = frameCount - this.startFrame;

    // gentle "settle in" (no particle chaos)
    const g = constrain(t / 120, 0, 1);
    const ease = this._easeOut(g);

    const alpha = lerp(0, 210, ease);
    const yOffset = lerp(10, 0, ease); // slight rise into place

    const left = this.cx - this.boxW / 2;
    const top = this.cy - this.boxH / 2 + yOffset;

    textAlign(LEFT, TOP);
    textSize(this.textSize);
    noStroke();

    // We'll sample the mask at each character position.
    // If mask pixel is "on", draw the character; otherwise skip it.
    // That creates crisp "2026" silhouette filled with code text.
    const pg = this.maskPg;
    pg.loadPixels();

    for (let row = 0; row < this.lines.length; row++) {
      const y = top + row * this.lineH;
      const line = this.lines[row];

      // number of characters that fit across the box
      const cols = Math.floor(this.boxW / this.charW);

      for (let col = 0; col < cols; col++) {
        const x = left + col * this.charW;

        // Map this (x,y) in canvas-space to mask buffer space
        const mx = Math.floor(map(x - left, 0, this.boxW, 0, pg.width - 1));
        const my = Math.floor(map(y - top, 0, this.boxH, 0, pg.height - 1));

        const idx = 4 * (my * pg.width + mx);
        const v = pg.pixels[idx]; // red channel

        if (v > 10) {
          const ch = line.charAt(col % line.length);

          // subtle shadow for legibility
        //  fill(this.shadow[0], this.shadow[1], this.shadow[2], alpha * 0.25);
          text(ch, x + 1, y + 1);

          fill(this.fg[0], this.fg[1], this.fg[2], alpha);
          text(ch, x, y);
        }
      }
    }
  }

  _buildMask(str) {
    // Offscreen buffer: render big "2026" in white on black
    const pg = createGraphics(this.boxW, this.boxH);
    pg.pixelDensity(1);
    pg.background(0);
    pg.fill(255);
    pg.noStroke();
    pg.textAlign(CENTER, CENTER);

    // Big, bold-ish text (default font is ok; we rely on silhouette)
    pg.textSize(159.5);
    pg.text(str, pg.width / 2, pg.height / 2 -20);

    return pg;
  }

  _buildLines() {
    // Build enough repeated code to fill each line, with per-line offset so it feels “real”
    const rows = Math.floor(this.boxH / this.lineH);
    const cols = Math.floor(this.boxW / this.charW);

    const src = this.codeSource.replace(/\s+/g, " "); // normalize spaces
    const lines = [];

    for (let r = 0; r < rows; r++) {
      // Offset each line so it's not identical stripes
      const offset = (r * 17) % src.length;
      const line = (src.slice(offset) + " " + src).slice(0, cols + 20); // extra for safety
      lines.push(line);
    }
    return lines;
  }

  _easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}


