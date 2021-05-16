/* global */
let img
let brush
let cnv
let colorPicker
let sizeSlider
let saveButton

/* Socket info to send;
    mouse position
    current canvas (as png? encoded 64bit?)
     */

function preload () {
  img = loadImage('https://img.icons8.com/emoji/452/-emoji-sparkles.png')
  brush = new Brush(img)
  // Currently have a dummy image but we will be recieving images from the backend
  // img = loadImage('https://media.istockphoto.com/vectors/cute-cartoon-cockatiel-couple-vector-id1160619330?b=1&k=6&m=1160619330&s=612x612&w=0&h=V6NM2xCwQ16AyIEK0prZKqm6NNjMfgZN7VUyL6HaELs=')
}

function positionCanvas () {
  const x = 150
  const y = 0
  cnv.position(x, y)
}

function setup () {
  preload()
  // cnv = createCanvas(window.innerWidth * 0.8, window.innerHeight)
  cnv = createCanvas(1000, 1000)
  background('white')
  positionCanvas()
  colorPicker = createColorPicker('#ff0000')
  colorPicker.position(0, document.documentElement.scrollTop + 80)
  // default image (full white tint)

  // create size slider
  sizeSlider = createSlider(0, 100, 50)
  sizeSlider.position(0, document.documentElement.scrollTop)
  sizeSlider.style('width', '120px')

  // create save button
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
  sizeSlider.position(document.documentElement.scrollLeft + 10, document.documentElement.scrollTop + 10)
  saveButton.position(document.documentElement.scrollLeft + 10, document.documentElement.scrollTop + 40)
  colorPicker.position(document.documentElement.scrollLeft + 10, document.documentElement.scrollTop + 80)
  if (brush.color !== colorPicker.color()) {
    brush.updateColor(colorPicker.color())
  }
  if (brush.size !== sizeSlider.value()) {
    brush.updateSize(sizeSlider.value())
  }
  if (mouseIsPressed) {
    // sets brush to bSize and centered at mouse
    brush.draw(mouseX, mouseY)
  }
}
