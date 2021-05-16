/* global */
let stamp = null
let lines = []
const defaultBrushes = [
  {
    name: 'none',
    draw: function (p) {
      for (const line of lines) {
        line.show()
      }
    }
  },
  {
    name: 'ellipse',
    draw: function (p) {
      if (p.mouseIsPressed) {
        const radius = p.sin(p.frameCount * 0.1) * 40
        p.ellipse(p.mouseX, p.mouseY, radius, radius)
      }
    }
  },
  {
    name: 'wordbrush',
    draw: function (p) {
      if (p.mouseIsPressed) {
        const radius = p.sin(p.frameCount * 0.1) * 40
        const words = ['Collaborative', 'Art', 'Ware', '2021']
        const word = p.random(words)
        p.text(word, p.mouseX, p.mouseY, radius, radius)
      }
    }
  },
  {
    name: 'rectangle',
    draw: function (p) {
      if (p.mouseIsPressed) {
        const radius = p.sin(p.frameCount * 0.1) * 40
        p.rect(p.mouseX, p.mouseY, radius, radius)
      }
    }
  },
  {
    name: 'linework',
    draw: function (p) {
      if (p.mouseIsPressed) {
        const radius = p.sin(p.frameCount * 0.1) * 40
        p.line(p.mouseX, p.mouseY, p.mouseX + radius, p.mouseY + radius)
      }
    }
  }
]
let currBrush = defaultBrushes[0]

const create = function (p) {
  /* local global */
  let pad, clearBut, saveBut

  p.setup = () => {
    pad = p.select('#create')
    clearBut = p.select('#clear')
    saveBut = p.select('#save')
    p.cnvs = p.createCanvas(p.windowHeight / 2, p.windowHeight / 2)
    p.cnvs.parent(pad)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowHeight / 2, p.windowHeight / 2)
  }

  p.draw = () => {
    clearBut.mousePressed(() => {
      p.clear()
      lines = []
    })

    saveBut.mousePressed(() => {
      const brushName = p.select('#bname').value()
      const brushStamp = p.get().canvas.toDataURL() // base64 encoding
      const newBrushButton = p.createImg(brushStamp).addClass('brushImg').id(brushName).parent(p.select('.brushesContainer'))
      defaultBrushes.push({
        name: brushName,
        draw: function (p) {
          p.loadImage(brushStamp, brushImg => {
            if (p.mouseIsPressed) {
              p.image(brushImg, p.mouseX, p.mouseY, 50, 50)
            }
          })
        }
      })

      newBrushButton.mousePressed(() => {
        const name = newBrushButton.id()
        for (const b of defaultBrushes) {
          if (b.name === name) {
            currBrush = b
            return
          }
        }
      })
    })

    if (p.mouseIsPressed) {
      const line = new MyLine(p)
      lines.push(line)
    }

    // change / adjust code here to take in pre-define or differing shape?
    if (p.mouseIsPressed) {
      currBrush.draw(p)
      stamp = p.get().canvas.toDataURL();
    }
  }
}

const test = function (p) {
  /* local global */
  let pad
  let clearBut

  p.setup = () => {
    p.pad = p.select('#test')
    p.clearBut = p.select('#clear')
    p.cnvs = p.createCanvas(p.windowHeight / 2, p.windowHeight / 2)
    p.cnvs.parent(pad)
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

p5(create)
p5(test)
