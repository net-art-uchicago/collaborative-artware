class Brush {
  constructor (img, p5) {
    // list brush properties here
    this.img = img
    this.size = 50
    this.color = '#000'
    this.p5 = p5
  }

  updateColor (c) {
    this.color = c
  }

  updateSize (s) {
    this.size = s
  }

  draw (x, y) {
    x = x - this.size / 2
    y = y - this.size / 2
    this.p5.tint(this.color)
    this.p5.image(this.img, x, y, this.size, this.size)
    this.p5.noTint()
  }
}

window.Brush = Brush
