function setup() {
  createCanvas(400, 400);
  x = -200;
}

function draw() {
  background(130,110,210);
  fill (255,224,48)
  circle (x+200,100,100)
  circle (x+200,115, 12)
  fill ('white')
  circle (x+220,100, 15)
  circle (x+180,100, 15)
  curve (19, 13, x+180, 130, x+220, 130, 220, 130);
  fill ('purple')
  rect (150, 50, 100, 20)
  rect (165, 25, 70, 25)
  fill ('white')
  line(x+200,150, x+200, 250)
  line(x+200,250, x+250,300)
  line(x+200,250, x+150,300)
  if (x<0) {
    line(x+200,200, x+250, 200)
    line(x+200,200, x+150, 200)
  } else {
    line(x+200,200, x+240, 150)
    line(x+200,200, x+160, 150)
  }
  x = x +1
  print(x)
}
