/* global p5, Brush, io */
const de = document.documentElement

window.p5Obj = new p5((p) => {
  let brush
  let cnv
  let colorPicker
  let sizeSlider
  let saveButton
  let socket
  let user
  let users = {}
  const brushes = {}

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
    // Currently have a dummy id and image but we will be receiving this from the backend
    user = {
      id: 1, // replace with Number(window.prompt()), for testing muliple users
      brushes: ['https://img.icons8.com/emoji/452/-emoji-sparkles.png']
    }

    users[user.id] = user
    const link = user.brushes[0]

    brush = new Brush(p.loadImage(link), link, p)
    brushes[link] = brush.img
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

    // connecting to socket
    socket = io.connect('http://localhost:8000')

    // on connect, send your user to server
    socket.on('connect', () => {
      socket.emit('whiteboardConnection', user)
    })

    // receive info for a new user
    socket.on('whiteboardConnection', (newUser) => {
      users[newUser.id] = newUser
    })

    // disconnect user
    socket.on('whiteboardDisconnect', (data) => {
      delete users[data.id]
    })
    // send existing info to a new user
    socket.on('sendExistingWhiteboardInfo', ({ socketId }) => {
      // copy other users and add yourself
      const existingUsers = { ...users, [user.id]: user }

      // send data as well as socketId
      socket.emit('getExistingWhiteboardInfo', { socketId, existingUsers })
    })

    // receive info for existing users, which you will only do if you just joined
    socket.on('getExistingWhiteboardInfo', ({ existingUsers }) => {
      users = { ...users, ...existingUsers }
    })

    // receive event of someone else drawing
    socket.on('whiteboardMouse', async (data) => {
      if (data.brush in brushes) {
        // if brush path has been seen, use the corresponding image
        const otherBrush = new Brush(brushes[data.brush], data.brush, p)
        otherBrush.updateColor(p.color(data.color))
        otherBrush.updateSize(data.size)
        otherBrush.draw(data.pos.x, data.pos.y)
      } else {
        // otherwise, load image and add to object
        p.loadImage(data.brush, (otherImg) => {
          const otherBrush = new Brush(otherImg, data.brush, p)
          otherBrush.updateColor(p.color(data.color))
          otherBrush.updateSize(data.size)
          otherBrush.draw(data.pos.x, data.pos.y)
          brushes[data.brush] = otherImg
        })
      }
    })
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
      // emits brush information to all other users
      socket.emit('whiteboardMouse', {
        id: user.id,
        pos: { x: p.mouseX, y: p.mouseY },
        brush: brush.link,
        size: sizeSlider.value(),
        color: colorPicker.color().toString()
      })
    }
  }
})
