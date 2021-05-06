/* global */
var lines = [];
var clearBut;
var saveBut;
var stampBut;
var stamp;
var stampOn = false;
var stampCanvas;
var testCanvas;
var drawingPads;

function setup () {
  drawingPads = select(".drawingPads")
  stampCanvas = createCanvas(window.innerWidth / 2 , window.innerHeight / 2).parent(drawingPads)
  testCanvas = createCanvas(window.innerWidth / 2 , window.innerHeight / 2).parent(drawingPads)
  // testCanvas.background(225)
}

function windowResized () { 
  resizeCanvas(window.innerWidth / 2, window.innerHeight / 2)
}

function draw () {

  clearBut.mousePressed(() => {
    background(255)
    lines = []
  })

  saveBut.mousePressed(() => {
    stamp = get();
    lines = []
  })

  stampBut.mousePressed(() => {
    stampOn = !stampOn
  })



  if (mouseIsPressed & !stampOn) {
    var line = new MyLine()
    lines.push(line)
  } else if(mouseIsPressed){
    image(stamp, mouseX, mouseY, 50, 50)
  }

  for(var line of lines){
    line.show()
  }
}