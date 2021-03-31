/* global mouseIsPressed, colorMode, RGB, fill, noStroke, ellipse,
mouseX, mouseY */
window.brushes.eraser = {
  name: 'eraser',
  draw: function () {
    if (mouseIsPressed && !window.dragging) {
      colorMode(RGB)
      fill(255, 255, 255)
      noStroke()
      const radius = 80
      ellipse(mouseX, mouseY, radius, radius)
    }
  }
}
