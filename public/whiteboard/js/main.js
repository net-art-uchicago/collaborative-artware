/* global */
let board
let img
let brush
let cnv
let bSize
let colorPicker
let currColor
let sizeSlider
let saveButton

/* Socket info to send;
    mouse position
    current canvas (as png? encoded 64bit?)
     */

function createBrush(hex){
  // loadPixels()
  // img.loadPixels()
  // for (let i=0; i< img.width; i++){
  //   for (let j=0; j< img.height; j++){
  //     // let loc = i+j*width
  //     // img.pixels[loc] = color(hex)
  //     setup(i, j, hex)
  //     print("i: " + i + " j: " + j)
  //   }
  // }
  // print(img.width)
  // updatePixels()
  // return img
  tint(hex)
  return img
}

function preload(){
  img = loadImage('https://img.icons8.com/emoji/452/-emoji-sparkles.png')
  // Currently have a dummy image but we will be recieving images from the backend
  // img = loadImage('https://media.istockphoto.com/vectors/cute-cartoon-cockatiel-couple-vector-id1160619330?b=1&k=6&m=1160619330&s=612x612&w=0&h=V6NM2xCwQ16AyIEK0prZKqm6NNjMfgZN7VUyL6HaELs=')
}

function positionCanvas(){
  var x = 150;
  var y = 0;
  cnv.position(x, y);
}

function setup () {
  preload()
  // cnv = createCanvas(window.innerWidth * 0.8, window.innerHeight)
  cnv = createCanvas(1000, 1000)
  background("white")
  positionCanvas()
  colorPicker = createColorPicker('#ff0000')
  colorPicker.position(0, document.documentElement.scrollTop + 80)
  bSize = 50
  //default image (full white tint)
  currColor = colorPicker.color()
  brush = createBrush(colorPicker.color())
  print("image.width: " + img.width)

  //create size slider
  sizeSlider = createSlider(0, 100, 50)
  sizeSlider.position(0, document.documentElement.scrollTop)
  sizeSlider.style('width', '120px')

  //create save button
  saveButton = createButton('save canvas')
  saveButton.position(0, document.documentElement.scrollTop + 40)
  saveButton.mousePressed(save)
}

function windowResized () {
  positionCanvas()
}

function save () {
  saveCanvas(cnv, 'artware','jpg')
}

// function brushSize (brushSizeVal) {
//   var slider = document.getElementById("sizeSlider");
//   //max brush size * percent based on slider val
//   bSize = 100 * brushSizeVal * 0.01
//   slider.innerHTML = brushSizeVal + "px"
// }

function draw () {
  bSize = sizeSlider.value()
  sizeSlider.position(document.documentElement.scrollLeft + 10, document.documentElement.scrollTop + 10)
  saveButton.position(document.documentElement.scrollLeft + 10, document.documentElement.scrollTop + 40)
  colorPicker.position(document.documentElement.scrollLeft + 10, document.documentElement.scrollTop + 80)
  if (currColor != colorPicker.color()){
    currColor = colorPicker.color()
    brush = createBrush(currColor)
  }
  if (mouseIsPressed) {
    //sets brush to bSize and centered at mouse
      image(brush, mouseX - bSize/2, mouseY - bSize/2, bSize, bSize)
  }
}



