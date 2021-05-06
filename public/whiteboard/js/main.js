/* global */
let img
let dumBrush
let cnv
let bSize
function dummyBrush(r, g, b, a){
  // let img = createImage(66, 66)
  // img.loadPixels()

  // for (let i = 0; i < img.width; i++) {
  //   for (let j = 0; j < img.height; j++) {
  //     // img.set(i, j, color(r, g, b, a))
      
  //     //img.set(i+1, j, color(0, 90, 102,( abs(img.width/ 2 - i)) * 2))

  //   }
  // }
  tint(r, g, b, a)
  // img.updatePixels()
  return img
}

function preload(){
  img = loadImage('https://img.icons8.com/emoji/452/-emoji-sparkles.png')
  // Currently have a dummy image but we will be recieving images from the backend
  // img = loadImage('https://media.istockphoto.com/vectors/cute-cartoon-cockatiel-couple-vector-id1160619330?b=1&k=6&m=1160619330&s=612x612&w=0&h=V6NM2xCwQ16AyIEK0prZKqm6NNjMfgZN7VUyL6HaELs=')
  print(img.width)
  print(img.height)
}

function positionCanvas(){
  var x = 150;
  var y = 0;
  cnv.position(x, y);
}

function setup () {
  cnv = createCanvas(window.innerWidth * 0.8, window.innerHeight)
  positionCanvas()
  bSize = 50
  preload()
  //default image (full white tint)
  dumBrush = dummyBrush(255, 255, 255, 255)
  a = 0
}

function windowResized () {
  positionCanvas()
}

function brushColor (colorSliderVal) {
  var slider = document.getElementById("colorSlider");

  //TODO: map slider values to actual RGB
  if (colorSliderVal < 33) {
    dumBrush = dummyBrush(255, 0, 0, 255)
    slider.innerHTML = "red"
  } else if (colorSliderVal < 66) {
    dumBrush = dummyBrush(0, 0, 255)
    slider.innerHTML = "blue"
  } else {
    dumBrush = dummyBrush(0, 255, 0)
    slider.innerHTML = "green"
  }
}

function brushSize (brushSizeVal) {
  var slider = document.getElementById("sizeSlider");
  //max brush size * percent based on slider val
  bSize = 100 * brushSizeVal * 0.01
  slider.innerHTML = brushSizeVal + "px"
}

function draw () {
  if (mouseIsPressed) {
    //ellipse(mouseX, mouseY, 50)
    //sets brush to bSize and centered at mouse
      image(dumBrush, mouseX - bSize/2, mouseY - bSize/2, bSize, bSize)
  }
}


