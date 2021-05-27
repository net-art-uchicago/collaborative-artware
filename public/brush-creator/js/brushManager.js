class BrushManager {
  constructor () {
    this.brushes = [
      {
        name: 'TESTING',
        draw: function (p, x1, y1, x2, y2) {
        }
      },
      {
        name: 'none',
        draw: function (p, x1, y1, x2, y2) {
          p.stroke('white')
          p.line(x1, y1, x2, y2)
        }
      },
      {
        name: 'ellipse',
        draw: function (p, x1, y1, x2, y2) {
          const radius = p.sin(p.frameCount * 0.1) * 40
          p.stroke('white')
          p.ellipse(x1, y1, radius, radius)
        }
      },
      {
        name: 'wordbrush',
        draw: function (p, x1, y1, x2, y2) {
          const radius = p.sin(p.frameCount * 0.1) * 40
          const words = ['Collaborative', 'Art', 'Ware', '2021']
          const word = p.random(words)
          p.stroke('white')
          p.text(word, x1, y1, radius, radius)
        }
      },
      {
        name: 'rectangle',
        draw: function (p, x1, y1, x2, y2) {
          const radius = p.sin(p.frameCount * 0.1) * 40
          p.stroke('white')
          p.rect(x1, y1, radius, radius)
        }
      },
      {
        name: 'linework',
        draw: function (p, x1, y1, x2, y2) {
          const radius = p.sin(p.frameCount * 0.1) * 40
          p.stroke('white')
          p.line(x1, y1, x1 + radius, y1 + radius)
        }
      }]
  }

  addBrush (brushName, brushStamp) {
    this.brushes.push({
      name: brushName,
      img: null,
      draw: function (p, x1, y1, x2, y2) {
        if (this.img) p.image(this.img, x1, y1, 100, 100)
        else {
          p.loadImage(brushStamp, brushImg => {
            this.img = brushImg
            p.image(brushImg, x1, y1, 100, 100)
          })
        }
      }
    })
  }

  getBrushDraw (name) {
    for (const b of this.brushes) {
      if (b.name === name) {
        return b.draw
      }
    }
    return this.brushes[0].draw
  }

  updateBrush (name, newStamp) {
    for (const b of this.brushes) {
      if (b.name === name) {
        b.img = null
        b.draw = function (p, x1, y1, x2, y2) {
          if (this.img) p.image(this.img, x1, y1, 100, 100)
          else {
            p.loadImage(newStamp, brushImg => {
              p.image(brushImg, x1, y1, 100, 100)
            })
          }
        }
      }
    }
  }
}

window.BrushManager = BrushManager
