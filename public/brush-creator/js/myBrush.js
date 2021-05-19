class MyBrush {
  constructor (p, shape) {
    this.p = p
    this.x1 = null
    this.y2 = null
    this.x2 = null
    this.y2 = null
    this.shape = shape
  }

  updateShape (newShape) {
    this.shape = newShape
  }

  up () {
    this.x1 = null
    this.y1 = null
    this.x2 = null
    this.y2 = null
  }

  down (x, y) {
    this.x1 = x
    this.y1 = y
    this.x2 = x
    this.y2 = y
  }

  move (x, y) {
    if (!this.x1) return
    this.x2 = x
    this.y2 = y
    this.shape(this.p, this.x1, this.y1, this.x2, this.y2)
    this.x1 = x
    this.y1 = y
  }
}
