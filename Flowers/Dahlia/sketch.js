// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
 
v = [];
// HTML button object:
let portButton;
let inData;                            // for incoming serial data
let outByte = 0;   
let defaultFont;
let rows=100;
let r_D=1/100;
/*
function preload() {
  defaultFont = loadFont(); // You can leave this empty to use the default browser font
}*/
function setup(){
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    setupMuse();
    textFont(); // Set the default font


  canvas.id('canvas');

  colorMode(HSB);
  angleMode(DEGREES);
  stroke(205, 50, 100);
  //noStroke();
  strokeWeight(4);
  
  opening_ = createDiv();
  opening_.class('valueDisplay');
  opening = createSlider(1, 10, 1.75, 0.1);
  opening.class('Slider');

  vDensity_ = createDiv();
  vDensity_.class('valueDisplay');
  vDensity = createSlider(1, 20, 11, 0.1);
  vDensity.class('Slider');

  pAlign_ = createDiv();
  pAlign_.class('valueDisplay');
  pAlign = createSlider(0, 6, 3.6, 0.05);
  pAlign.class('Slider');

  curve1_ = createDiv();
  curve1_.class('valueDisplay');
  curve1 = createSlider(-6, 6, 2, 0.1);
  curve1.class('Slider');

  curve2_ = createDiv();
  curve2_.class('valueDisplay');
  curve2 = createSlider(0.5, 1.5, 1.3, 0.1);
  curve2.class('Slider');
  
    if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
  
  // angleMode(DEGREES);
  /*canvas.drop(gotFile);

  song.play();
  playPauseButton = createButton('Play')
  playPauseButton.mousePressed(togglePlay);
  amp = new p5.Amplitude();
  amp.toggleNormalize(true);
  fft = new p5.FFT();*/
  defaultPAlign=6;
  defaultOpening = 5;
  defaultVDensity = 8;
}

function draw(){
  // Create a graphic element for drawing the text
  //background(230, 50, 15);
  clear();
  orbitControl(4, 4);//3D mouse control

  rotateX(-90);
  console.log(eeg.delta);
  if (eeg.delta*100 > 800) {
    //pAlign.value(map(eeg.delta,0,150,1,6));
    opening.value(
map(eeg.delta,0,120,3,10));
    vDensity.value(map(eeg.delta,0,120,3,20));
  }

  // zinnia();
  // camellia();
  // lotus();
  dahliaOriginal();
  //dahlia();
  
  
  opening_.html("Flower opening: " + opening.value());
  vDensity_.html("Vertical density: " + vDensity.value());
  pAlign_.html("Petal align: " + pAlign.value());
  curve1_.html("Curvature 1: " + curve1.value());
  curve2_.html("Curvature 2: " + curve2.value());
  
}

function rose(){
  for(let r = 0; r <= 1; r += 0.02){
    beginShape(POINTS);
    stroke(205, -r*50+100, r*50+50);
    for(let theta = -2*180; theta <= 180*15; theta += 2){
      let phi = (180/2)*Math.exp(-theta/(8*180));
      let petalCut = 1 - (1/2) * pow((5/4)*pow(1-((3.6*theta%360)/180), 2)-1/4, 2);
      let hangDown = 2*pow(r, 2)*pow(1.3*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        let pX = 300 * petalCut * (r * sin(phi)+hangDown*cos(phi)) * sin(theta);
        let pY = -300 * petalCut * (r * cos(phi)-hangDown*sin(phi));
        let pZ = 300 * petalCut * (r * sin(phi)+hangDown*cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
}

function zinnia(){
  for(let r = 0; r <= 1; r += 0.02){
    beginShape(POINTS);
    stroke(335, -r*40+100, r*50+50);
    for(let theta = -2*180; theta <= 180*15; theta += 1.5){
      let phi = (180/2)*Math.exp(-theta/(16*180));
      let petalCut = 1 - (1/2) * pow((5/4)*pow(1-((10.4*theta%360)/180), 2)-1/12, 2);
      let hangDown = 1.3*pow(r, 2)*pow(1.25*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        let pX = 300 * (1-theta/6500) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * sin(theta);
        let pY = -300 * (1-theta/6500) * petalCut * (r * cos(phi)-hangDown*sin(phi));
        let pZ = 300 * (1-theta/6500) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
}

function camellia(){
  for(let r = 0; r <= 1; r += 0.02){
    beginShape(POINTS);
    stroke(335, -r*5+10, r*50+50);
    for(let theta = 0; theta <= 180*20; theta += 1.5){
      let phi = (180/2.5)*Math.exp(-theta/(16*180));
      let petalCut = 0.75+abs(asin(sin(2.75*theta))+80*sin(2.75*theta))/480;
      let hangDown = 1.4*pow(r, 2)*pow(1.0*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        let pX = 300 * (1-theta/6000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * sin(theta);
        let pY = -300 * (1-theta/6000) * petalCut * (r * cos(phi)-hangDown*sin(phi));
        let pZ = 300 * (1-theta/6000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
}

function lotus(){
  for(let r = 0; r <= 1; r += 0.02){
    beginShape(POINTS);
    stroke(310, (r*50-30)*3+5, 100);
    for(let theta = 0; theta <= 180*8; theta += 1.5){
      let phi = (180/2.5)*Math.exp(-theta/(6.5*180));
      let petalCut = 0.5+abs(asin(sin(2.25*theta))+120*sin(2.25*theta))/360;
      let hangDown = 2.3*pow(r, 2)*pow(0.8*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        let pX = 300 * (1-theta/10000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * sin(theta);
        let pY = -300 * (1-theta/10000) * petalCut * (r * cos(phi)-hangDown*sin(phi));
        let pZ = 300 * (1-theta/10000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
}

function dahliaOriginal () {
  for(let r = 0; r <= 1; r += 0.03){
    beginShape(POINTS);
    stroke(20-r*20, 80-r*40, 60+r*40);
    for(let theta = 0; theta <= 180*30; theta += 1.5){
      let phi = (180/opening.value())*Math.exp(-theta/(vDensity.value()*180));
      let petalCut = 0.6+abs(asin(sin(4.75*theta))+420*sin(4.75*theta))/2000;
      let hangDown = 2.3*pow(r, 2)*pow(0.9*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        let pX = 300 * (1-theta/20000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * sin(theta);
        let pY = -300 * (1-theta/20000) * petalCut * (r * cos(phi)-hangDown*sin(phi));
        let pZ = 300 * (1-theta/20000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
}

function dahlia() {
  for(let r = 0; r <= rows; r += 1) {
   // beginShape(POINTS);
    //stroke(20-r*r_D*20, 80-r*r_D*40, 60+r*r_D*40);
   //let phi =0;
    // let petalCut =0;
    //let hangDown =0
  for(let r = 0; r <= rows; r += 1){
   // beginShape(POINTS);
   // stroke(20-r*r_D*20, 80-r*r_D*40, 60+r*r_D*40);

    v.push([]);
    for(let theta = 0; theta <= 180*30; theta += 1.5){
       let phi = (180/1.75)*Math.exp(-theta/(11*180)); //(180/opening.value())*Math.exp(-theta/(vDensity.value()*180));
       let petalCut = 0.6+abs(asin(sin(4.75*theta))+420*sin(4.75*theta))/2000; //0.6+abs(asin(sin(4.75*theta))+420*sin(4.75*theta))/2000;
       let hangDown = 2.3*pow(r, 2)*pow(0.9*r-1, 2)*sin(phi); //2.3*pow(r*r_D, 2)*pow(0.9*r*r_D-1, 2)*sin(phi);
      let pos = createVector(phi, petalCut, hangDown);
      v[r].push(pos);
    }
  }

  for(let r = 0; r < v.length; r++) {
            beginShape();

    for (let theta = 0; theta < v[r].length; theta++) {
      fill(140, 100, -20+r*r_D*120);
      if(0 < v[r][theta].y * (r*r_D * sin(v[r][theta].x)+v[r][theta].z*cos(v[r][theta].x))){
        beginShape();
        let pX = 300 * (1-theta/20000) * v[r][theta].y * (r*r_D * sin(v[r][theta].x)+v[r][theta].z*cos(v[r][theta].x)) * sin(theta);
        let pY = -300 * (1-theta/20000) * v[r][theta].y * (r*r_D * cos(v[r][theta].x)-v[r][theta].z*sin(v[r][theta].x));
        let pZ = 300 * (1-theta/20000) * v[r][theta].y * (r*r_D * sin(v[r][theta].x)+v[r][theta].z*cos(v[r][theta].x)) * cos(theta);
        vertex(pX, pY, pZ);
        //endShape(CLOSE);
      }

    }
          endShape(CLOSE);


  }
  v=[];
 // endShape();
  
}
}


// if there's no port selected, 
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}
 
// make the port selector window appear:
function choosePort() {
  serial.requestPort();
}
 
// open the selected port, and make the port 
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);
 
  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}
 
// read any incoming data as a byte:
function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
}
 
// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}
 
// try to connect if a new serial port 
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}
 
// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}
 
function closePort() {
  serial.close();
}
