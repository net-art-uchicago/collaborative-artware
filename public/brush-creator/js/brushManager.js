/* global lines */

class BrushManager {
  constructor () {
    this.brushes = [
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
      }]
  }

  addBrush (brushName, brushStamp) {
    this.brushes.push({
      name: brushName,
      draw: function (p) {
        p.loadImage(brushStamp, brushImg => {
          if (p.mouseIsPressed) {
            p.image(brushImg, p.mouseX, p.mouseY, 50, 50)
          }
        })
      }
    })
  }

  getBrush (name) {
    this.brushes.forEach((b) => {
      console.log(b.name + '\n')
      console.log(name + '\n')
      if (b.name === name) return b
    })
    return this.brushes[0]
  }

  getBrushbyIndex (index) {
    return this.brushes[index]
  }
}
