/* global p5, io, Info, OwnUser */
const de = document.documentElement

window.p5Obj = new p5((p) => {
  let cnv
  let colorPicker
  let sizeSlider
  let brushPicker
  let saveButton
  let socket
  let user
  let info

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
    // Currently have a dummy id and images but we will be receiving this from the backend
    const userObj = {
      id: 1, // change to Number(window.prompt()), // for testing muliple users
      brushes: [
        'https://img.icons8.com/emoji/452/-emoji-sparkles.png',
        'https://img.icons8.com/doodle/344/dog.png'
      ]
    }
    // connecting to socket
    socket = io()
    user = new OwnUser(userObj.id, userObj.brushes, p, socket)
    info = new Info(user, p, socket)
    user.broadcast()
    info.listen()
  }

  p.setup = () => {
    cnv = p.createCanvas(1000, 1000)
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

    // bare bones brush picker
    brushPicker = p.createSelect()
    brushPicker.position(0, de.scrollTop + 120)
    user.brushes.forEach((_, path) => brushPicker.option(path.split('/').pop(), path))
    brushPicker.selected(user.brushPath)
  }

  p.draw = () => {
    sizeSlider.position(de.scrollLeft + 10, de.scrollTop + 10)
    saveButton.position(de.scrollLeft + 10, de.scrollTop + 40)
    colorPicker.position(de.scrollLeft + 10, de.scrollTop + 80)
    if (!user) return
    user.updateBrush(
      brushPicker.value(),
      colorPicker.color(),
      sizeSlider.value()
    )
    if (p.mouseIsPressed) {
      user.draw(p.mouseX, p.mouseY)
    }
  }
})
