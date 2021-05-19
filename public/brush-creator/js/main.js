/* global p5 MyBrush BrushManager */
const bm = new BrushManager()
let stamp = null

const createPad = p => {
  /* local global */
  let createBrush

  p.setup = () => {
    createBrush = new MyBrush(p, bm.getBrushDraw('none'))
    p.cnvs = p.createCanvas(p.windowHeight / 2, p.windowHeight / 2)

    const premadeButs = p.selectAll('.premade')
    premadeButs.forEach((premade) => {
      premade.mousePressed(() => {
        createBrush.updateShape(bm.getBrushDraw(premade.id()))
      })
    })

    const resetBut = p.select('#reset')
    resetBut.mousePressed(() => {
      p.clear()
    })

    const saveBut = p.select('#save')
    saveBut.mousePressed(() => {
      const brushName = p.select('#bname').value()
      if (brushName === '') {
        window.alert('Name the brush before you save!')
        return
      }
      const brushStamp = p.get().canvas.toDataURL() // base64 encoding
      const newBrushButton = p.createImg(brushStamp).addClass('brushImg').id(brushName).parent(p.select('.brushesContainer'))
      bm.addBrush(brushName, brushStamp)
      newBrushButton.mousePressed(() => {
        createBrush.updateBrush(bm.getBrushDraw(newBrushButton.id()))
      })
    })
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowHeight / 2, p.windowHeight / 2)
  }

  p.mousePressed = () => {
    createBrush.down(p.mouseX, p.mouseY)
  }

  p.mouseDragged = () => {
    createBrush.move(p.mouseX, p.mouseY)
    stamp = p.get().canvas.toDataURL()
  }

  p.mouseReleased = () => {
    createBrush.up(p.mouseX, p.mouseY)
  }

  p.draw = () => {}
}

const testPad = p => {
  /* local global */
  let testBrush

  function stampDraw (p, x1, y1, x2, y2) {
    if (stamp) {
      p.loadImage(stamp, stampImg => {
        p.image(stamp, x1, y1, 50, 50)
      })
    }
  }

  p.setup = () => {
    const clearBut = p.select('#clear')
    clearBut.mousePressed(() => {
      p.background(225)
    })
    p.cnvs = p.createCanvas(p.windowHeight / 2, p.windowHeight / 2)
    p.background(225)
    testBrush = new MyBrush(p, stampDraw)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowHeight / 2, p.windowHeight / 2)
    p.background(225)
  }

  p.mousePressed = () => {
    testBrush.down(p.mouseX, p.mouseY)
  }

  p.mouseDragged = () => {
    testBrush.move(p.mouseX, p.mouseY)
  }

  p.mouseReleased = () => {
    testBrush.up(p.mouseX, p.mouseY)
  }

  p.draw = () => {}
}

const create = new p5(createPad, 'create')
const test = new p5(testPad, 'test')
