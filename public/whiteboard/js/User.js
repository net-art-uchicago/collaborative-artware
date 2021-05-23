/* global Brush */
class User {
  constructor (id, brushPaths, p5, socket) {
    this.id = id
    this.brushes = new Map(brushPaths.map((link) => [link, new Brush(p5.loadImage(link), p5)]))
    this.brushPath = brushPaths[0]
    this.brush = this.brushes.get(this.brushPath)

    this.p5 = p5
    this.socket = socket
  }

  // on connect, send your user to server
  broadcast () {
    this.socket.on('connect', () => {
      this.socket.emit('broadcastWhiteboardUser', this.toObject())
    })
  }

  updateBrush (path, color, size) {
    // can switch brush here if path is different
    if (this.brushPath !== path) {
      this.brushPath = path
      this.brush = this.brushes.get(path)
    }
    if (this.brush.color !== color) {
      this.brush.updateColor(color)
    }
    if (this.brush.size !== size) {
      this.brush.updateSize(size)
    }
  }

  draw (x, y) {
    this.brush.draw(x, y)
  }

  toObject () {
    return {
      id: this.id,
      brushes: [...this.brushes.keys()]
    }
  }
}

window.User = User
