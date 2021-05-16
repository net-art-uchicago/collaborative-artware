class Brush {
  constructor (img) {
    // list brush properties here
    this.img = img
    this.size = 50
    this.color = '#000'
    tint(this.color)
  }

  updateColor (c) {
    this.color = c
    tint(this.color)
  }

  updateSize (s) {
    this.size = s
  }

  draw (x, y) {
    x = x - this.size / 2
    y = y - this.size / 2
    image(this.img, x, y, this.size, this.size)
  }
}
