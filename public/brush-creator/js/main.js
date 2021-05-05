/* global */
var lines = [];
var clearBut;
var saveBut;
var stampBut;
var stamp;
var stampOn = false;

function setup () {
  createCanvas(window.innerWidth / 2 , window.innerHeight / 2)
  // background(225)
  var options = createDiv().style('display: flex; border: red')
  clearBut = createButton('Clear').parent(options).style(`width: 50px; position: absolute; top:${(window.innerHeight / 2) + 10}px; border:red`)
  saveBut = createButton('Save').parent(options).style(`width: 50px; position: absolute; top:${(window.innerHeight / 2) + 30}px; border:red`)
  stampBut = createButton('Stamp').parent(options).style(`width: 50px; position: absolute; top:${(window.innerHeight / 2) + 50}px; border:red`)
}

function windowResized () { 
  resizeCanvas(window.innerWidth / 2, window.innerHeight / 2)
}

function draw () {
  // background(225)

  clearBut.mousePressed(() => {
    lines = []
  })

  saveBut.mousePressed(() => {
    stamp = get();
    stamp.save(frameCount, ".png")
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
