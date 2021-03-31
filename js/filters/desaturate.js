/* global loadPixels, pixels, colorMode, RGB, updatePixels */
window.filters.desaturate = {
  name: 'desaturate',
  run: function () {
    colorMode(RGB)
    loadPixels()
    // loop through all the pixels
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const grey = (r + g + b) / 3
      pixels[i] = grey
      pixels[i + 1] = grey
      pixels[i + 2] = grey
    }
    updatePixels()
  }
}
