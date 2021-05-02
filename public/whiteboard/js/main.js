/* global */
let img
let dumBrush
function dummyBrush(){
  let img = createImage(66, 66)
  img.loadPixels()
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {

      img.set(i, j, color(0, 90, 102,( abs(img.width/ 2 - i)) * 2))
      //img.set(i+1, j, color(0, 90, 102,( abs(img.width/ 2 - i)) * 2))

    }
  }
  img.updatePixels()
  return img
}
function preload(){
  // Currently have a dummy image but we will be recieving images from the backend
  img = loadImage('https://media.istockphoto.com/vectors/cute-cartoon-cockatiel-couple-vector-id1160619330?b=1&k=6&m=1160619330&s=612x612&w=0&h=V6NM2xCwQ16AyIEK0prZKqm6NNjMfgZN7VUyL6HaELs=')
}
function setup () {
  createCanvas(window.innerWidth, window.innerHeight)
  dumBrush = dummyBrush()
}

function windowResized () {
  resizeCanvas(window.innerWidth, window.innerHeight)
}

function draw () {
  if (mouseIsPressed) {
    //ellipse(mouseX, mouseY, 50)
      image(dumBrush, mouseX, mouseY, 50,50)
  }
}



  

