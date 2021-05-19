class BrushManager {
  constructor () {
    this.brushes = [
      {
        name: 'none',
        draw: function (p, x1, y1, x2, y2) {
          p.line(x1, y1, x2, y2)
        }
      },
      {
        name: 'ellipse',
        draw: function (p, x1, y1, x2, y2) {
          const radius = p.sin(p.frameCount * 0.1) * 40
          p.ellipse(x1, y1, radius, radius)
        }
      },
      {
        name: 'wordbrush',
        draw: function (p, x1, y1, x2, y2) {
          const radius = p.sin(p.frameCount * 0.1) * 40
          const words = ['Collaborative', 'Art', 'Ware', '2021']
          const word = p.random(words)
          p.text(word, x1, y1, radius, radius)
        }
      },
      {
        name: 'rectangle',
        draw: function (p, x1, y1, x2, y2) {
          const radius = p.sin(p.frameCount * 0.1) * 40
          p.rect(x1, y1, radius, radius)
        }
      },
      {
        name: 'linework',
        draw: function (p, x1, y1, x2, y2) {
          const radius = p.sin(p.frameCount * 0.1) * 40
          p.line(x1, y1, x1 + radius, y1 + radius)
        }
      }]
  }

  addBrush (brushName, brushStamp) {
    this.brushes.push({
      name: brushName,
      draw: function (p, x1, y1, x2, y2) {
        p.loadImage(brushStamp, brushImg => {
          p.image(brushImg, x1, y1, 50, 50)
        })
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
}
