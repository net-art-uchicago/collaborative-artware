/* global Image */ 

// Run the code as soon as the window loads
window.onload = function () {
  // Add section of code for each body part to generate a random image file name

  // NECK
  const neck = new Image()
  const necknum = Math.floor(Math.random() * 10) + 1
  const neckname = 'images/necks/neck' + necknum + '.png'
  neck.src = neckname

  // HEAD
  const head = new Image()
  const headnum = Math.floor(Math.random() * 10) + 1
  const headname = 'images/heads/head' + headnum + '.png'
  head.src = headname

  // EYES
  const eyes = new Image()
  const eyesnum = Math.floor(Math.random() * 10) + 1
  const eyesname = 'images/eyes/eyes' + eyesnum + '.png'
  eyes.src = eyesname

  // MOUTH
  const mouth = new Image()
  const mouthnum = Math.floor(Math.random() * 10) + 1
  const mouthname = 'images/mouths/mouth' + mouthnum + '.png'
  mouth.src = mouthname

  // NOSE
  const nose = new Image()
  const nosenum = Math.floor(Math.random() * 10) + 1
  const nosename = 'images/noses/nose' + nosenum + '.png'
  nose.src = nosename

  // EARS
  const ears = new Image()
  const earsnum = Math.floor(Math.random() * 10) + 1
  const earsname = 'images/ears/ears' + earsnum + '.png'
  ears.src = earsname

  // ANTENNA
  const antenna = new Image()
  const antennanum = Math.floor(Math.random() * 10) + 1
  const antennaname = 'images/antennas/antenna' + antennanum + '.png'
  antenna.src = antennaname

  // Wait until body part is loaded and then call the function that displays all images

  // NECK
  neck.onload = function () {
    buildrobot()
  }

  // HEAD
  head.onload = function () {
    buildrobot()
  }

  // EYES
  eyes.onload = function () {
    buildrobot()
  }

  // MOUTH
  mouth.onload = function () {
    buildrobot()
  }

  // NOSE
  nose.onload = function () {
    buildrobot()
  }

  // EARS
  ears.onload = function () {
    buildrobot()
  }

  // ANTENNA
  antenna.onload = function () {
    buildrobot()
  }

  // This is the function that displays all images
  function buildrobot () {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 400

    // ADD RANDOM BACKGROUND COLOUR
    const r = Math.floor(Math.random() * (255 - 100 + 1) + 100)
    const g = Math.floor(Math.random() * (255 - 100 + 1) + 100)
    const b = Math.floor(Math.random() * (255 - 100 + 1) + 100)
    const bgcol = '#' + r.toString(16) + g.toString(16) + b.toString(16)
    ctx.fillStyle = bgcol
    ctx.fillRect(0, 0, 400, 400)

    // This is the list of all parts and where they should go (centered, and height)

    // NECK
    ctx.drawImage(neck, ((400 - neck.width) / 2), 320)
    // EARS
    ctx.drawImage(ears, ((400 - ears.width) / 2), 110)
    // ANTENNA
    ctx.drawImage(antenna, ((400 - antenna.width) / 2), 20)
    // HEAD
    ctx.drawImage(head, ((400 - head.width) / 2), 80)
    // EYES
    ctx.drawImage(eyes, ((400 - eyes.width) / 2), 150)
    // MOUTH
    ctx.drawImage(mouth, ((400 - mouth.width) / 2), 250)
    // NOSE
    ctx.drawImage(nose, ((400 - nose.width) / 2), 220)
  }
}
