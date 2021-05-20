class Brush {
  constructor (img, link, p5) {
    // list brush properties here
    this.img = img
    this.link = link
    this.size = 50
    this.color = '#000'
    this.p5 = p5
    // this.p5.tint(this.color)
  }

  updateColor (c) {
    this.color = c
    this.p5.tint(this.color)
  }

  updateSize (s) {
    this.size = s
  }

  draw (x, y) {
    x = x - this.size / 2
    y = y - this.size / 2
    this.p5.image(this.img, x, y, this.size, this.size)
  }
}

window.Brush = Brush
