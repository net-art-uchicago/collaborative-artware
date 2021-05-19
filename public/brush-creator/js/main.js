/* global p5 MyLine brushManager */
const bm = brushManager
let stamp = null
let lines = []
let currBrush = bm.getBrush('none')

const createPad = p => {
  /* local global */
  let resetBut, saveBut

  p.setup = () => {
    resetBut = p.select('#reset')
    saveBut = p.select('#save')
    p.cnvs = p.createCanvas(p.windowHeight / 2, p.windowHeight / 2)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowHeight / 2, p.windowHeight / 2)
  }

  p.draw = () => {
    resetBut.mousePressed(() => {
      p.clear()
      lines = []
    })

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
        currBrush = bm.getBrush(newBrushButton.id())
      })
    })

    if (p.mouseIsPressed) {
      const line = new MyLine(p)
      lines.push(line)
    }

    // change / adjust code here to take in pre-define or differing shape?
    if (p.mouseIsPressed) {
      currBrush.draw(p)
      stamp = p.get().canvas.toDataURL()
    }
  }
}

const testPad = p => {
  /* local global */
  let clearBut

  p.setup = () => {
    clearBut = p.select('#clear')
    p.cnvs = p.createCanvas(p.windowHeight / 2, p.windowHeight / 2)
    // p.cnvs.parent(p.select('#test'))
    p.background(225)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowHeight / 2, p.windowHeight / 2)
    p.background(225)
  }

  p.draw = () => {
    clearBut.mousePressed(() => {
      p.background(225)
    })

    if (stamp) {
      p.loadImage(stamp, stampIMG => {
        if (p.mouseIsPressed) {
          p.image(stampIMG, p.mouseX, p.mouseY, 50, 50)
        }
      })
    }
  }
}

const create = new p5(createPad, 'create')
const test = new p5(testPad, 'test')
