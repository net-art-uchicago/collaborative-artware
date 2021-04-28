/* global */
function setup () {
  createCanvas(window.innerWidth, window.innerHeight)
}

function windowResized () {
  resizeCanvas(window.innerWidth, window.innerHeight)
}

function draw () {
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, 50)
  }
}
