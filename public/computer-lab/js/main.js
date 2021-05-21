const LAB_WIDTH = 800
const LAB_HEIGHT = 450

const Lab = {
  init () {
    // initialize canvas
    Lab.canvas = document.getElementById('canvas')
    Lab.ctx = Lab.canvas.getContext('2d')

    // load  image
    Lab.image = new Image()
    Lab.image.src = './computer-lab.png'

    // request first frame
    Lab.image.onload = () => {
      window.requestAnimationFrame(() => Lab.update())
    }
  },

  update () {
    // resize
    Lab.resize()

    // fill extra area with blue
    Lab.ctx.fillStyle = 'rgba(124, 195, 201)'
    Lab.ctx.fillRect(0, 0, Lab.sizeInfo.lab[0], Lab.sizeInfo.lab[1])

    // center image using translate
    Lab.ctx.translate(Lab.sizeInfo.lab[0] / 2 - LAB_WIDTH / 2, Lab.sizeInfo.lab[1] / 2 - LAB_HEIGHT / 2)
    Lab.ctx.drawImage(Lab.image, 0, 0)

    window.requestAnimationFrame(() => Lab.update())
  },

  resize () {
    let dpr = window.devicePixelRatio
    Lab.sizeInfo = {
      ratio: dpr,
      client: [Lab.canvas.clientWidth * dpr, Lab.canvas.clientHeight * dpr],
      lab: [LAB_WIDTH, LAB_HEIGHT],
      scale: [
        ((Lab.canvas.clientWidth * dpr / LAB_WIDTH * 100) | 0) / 100,
        ((Lab.canvas.clientHeight * dpr / LAB_HEIGHT * 100) | 0) / 100
      ]
    }

    // calculate scale
    let desiredScale = Math.min(Lab.sizeInfo.scale[0], Lab.sizeInfo.scale[1])

    // update info based on calculation above
    Lab.sizeInfo.scale = [desiredScale, desiredScale]
    Lab.sizeInfo.lab = [
      (Lab.canvas.clientWidth * dpr / desiredScale) | 0,
      (Lab.canvas.clientHeight * dpr / desiredScale) | 0
    ]

    // set canvas to scale
    Lab.canvas.width = Lab.canvas.clientWidth * dpr
    Lab.canvas.height = Lab.canvas.clientHeight * dpr
    Lab.ctx.setTransform(desiredScale, 0, 0, desiredScale, 0, 0)

    Lab.ctx.imageSmoothingEnabled = false
  }
}

Lab.init()
