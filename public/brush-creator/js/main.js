/* global p5 MyBrush BrushManager */
const bm = new BrushManager()
const P5 = p5
const TEST = 'TESTING'

function brushPostReq (brushStamp, brushname) {
  const opts = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      brush: brushStamp,
      name: brushname
    })
  }
  window.fetch('api/newbrush', opts)
    .then((res) => res.json())
    .then((json) => console.log(json))
}

const createPad = p => {
  /* local global */
  let createBrush

  p.fetchBrushes = () => {
    window.fetch('api/brushdata')
      .then((res) => res.json())
      .then((json) => {
        json.forEach((b) => {
          const newBrushButton = p.createButton(b.name).addClass('premade').id(b.name).parent(p.select('.brushesContainer'))
          bm.addBrush(b.name, b.brush)
          newBrushButton.mousePressed(() => {
            createBrush.updateShape(bm.getBrushDraw(newBrushButton.id()))
            console.log(newBrushButton.id())
          })
        })
      })
  }

  p.setup = () => {
    createBrush = new MyBrush(p, bm.getBrushDraw('none'))
    p.cnvs = p.createCanvas(p.windowHeight / 2, p.windowHeight / 2).id('createCanvas')
    p.fetchBrushes()
    const premadeButs = p.selectAll('.premade')
    premadeButs.forEach((premade) => {
      premade.mousePressed(() => {
        console.log(premade.id())
        createBrush.updateShape(bm.getBrushDraw(premade.id()))
      })
    })

    const resetBut = p.select('#reset')
    resetBut.mousePressed(() => {
      p.clear()
      bm.updateBrush(TEST, p.get().canvas.toDataURL())
    })

    const saveBut = p.select('#save')
    saveBut.mousePressed(() => {
      const brushName = p.select('#bname').value()
      if (brushName === '') {
        window.alert('Name the brush before you save!')
        return
      }
      const brushStamp = p.get().canvas.toDataURL() // base64 encoding
      const newBrushButton = p.createButton(brushName).addClass('premade').id(brushName).parent(p.select('.brushesContainer'))
      bm.addBrush(brushName, brushStamp)
      newBrushButton.mousePressed(() => {
        createBrush.updateShape(bm.getBrushDraw(newBrushButton.id()))
      })
      brushPostReq(brushStamp, brushName)
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
    bm.updateBrush(TEST, p.get().canvas.toDataURL())
  }

  p.mouseReleased = () => {
    createBrush.up(p.mouseX, p.mouseY)
  }

  p.draw = () => {}
}

const testPad = p => {
  /* local global */
  let testBrush

  p.setup = () => {
    const clearBut = p.select('#clear')
    clearBut.mousePressed(() => {
      p.background(100)
    })
    p.cnvs = p.createCanvas(p.windowHeight / 2, p.windowHeight / 2)
    p.background(100)
    testBrush = new MyBrush(p, bm.getBrushDraw(TEST))
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowHeight / 2, p.windowHeight / 2)
    p.background(100)
  }

  p.mousePressed = () => {
    testBrush.down(p.mouseX, p.mouseY)
    testBrush.updateShape(bm.getBrushDraw(TEST))
  }

  p.mouseDragged = () => {
    testBrush.move(p.mouseX, p.mouseY)
  }

  p.mouseReleased = () => {
    testBrush.up(p.mouseX, p.mouseY)
  }

  p.draw = () => {}
}

window.create = new P5(createPad, 'create')
window.test = new P5(testPad, 'test')
