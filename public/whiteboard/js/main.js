/* global */
const de = document.documentElement

window.p5Obj = new p5((p) => {
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

  function positionCanvas () {
    const x = 150
    const y = 0
    cnv.position(x, y)
  }

  // function windowResized () {
  //   positionCanvas()
  // }

  function save () {
    p.saveCanvas(cnv, 'artware', 'jpg')
  }

  // function brushSize (brushSizeVal) {
  //   var slider = document.getElementById("sizeSlider");
  //   //max brush size * percent based on slider val
  //   bSize = 100 * brushSizeVal * 0.01
  //   slider.innerHTML = brushSizeVal + "px"
  // }

  p.preload = () => {
    img = p.loadImage('https://img.icons8.com/emoji/452/-emoji-sparkles.png')
    // Currently have a dummy image but we will be recieving images from the backend
    // img = loadImage('https://media.istockphoto.com/vectors/cute-cartoon-cockatiel-couple-vector-id1160619330?b=1&k=6&m=1160619330&s=612x612&w=0&h=V6NM2xCwQ16AyIEK0prZKqm6NNjMfgZN7VUyL6HaELs=')
  }

  p.setup = () => {
    // cnv = createCanvas(window.innerWidth * 0.8, window.innerHeight)
    cnv = p.createCanvas(1000, 1000)
    p.preload()
    brush = new Brush(img, p)
    p.background('white')
    positionCanvas()
    colorPicker = p.createColorPicker('#ff0000')
    colorPicker.position(0, de.scrollTop + 80)
    // default image (full white tint)

    // create size slider
    sizeSlider = p.createSlider(0, 100, 50)
    sizeSlider.position(0, de.scrollTop)
    sizeSlider.style('width', '120px')

    // create save button
    saveButton = p.createButton('save canvas')
    saveButton.position(0, de.scrollTop + 40)
    saveButton.mousePressed(save)
  }

  p.draw = () => {
    sizeSlider.position(de.scrollLeft + 10, de.scrollTop + 10)
    saveButton.position(de.scrollLeft + 10, de.scrollTop + 40)
    colorPicker.position(de.scrollLeft + 10, de.scrollTop + 80)
    if (!brush) return
    if (brush.color !== colorPicker.color()) {
      brush.updateColor(colorPicker.color())
    }
    if (brush.size !== sizeSlider.value()) {
      brush.updateSize(sizeSlider.value())
    }
    if (p.mouseIsPressed) {
      // sets brush to bSize and centered at mouse
      brush.draw(p.mouseX, p.mouseY)
    }
  }
})
