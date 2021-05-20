/* global createCanvas, createSelect, loadSound */
let sound
let dropdown
let tag
let hashmap

function setup () {
  createCanvas(window.innerWidth, window.innerHeight)
  dropdown = createSelect()
  hashmap.forEach((_, name) => {
    dropdown.option(name)
  })
  dropdown.changed(newSelection)
}

function newSelection () {
  hashmap.get(dropdown.value()).play()
}
function preload () {
  // if dropdown option is equal to the sound option then assign that value
  // create the hashmap that has the mp3 file name and then
  hashmap = ['./js/mp3s/gloomy.mp3', './js/mp3s/pig.mp3'].reduce((h, audio) => {
    const path = audio.split('/')
    const name = path[path.length - 1].split('.')[0]
    h.set(name, loadSound(audio))
    return h
  }, new Map())
}
function draw () {

  // if (mouseIsPressed) {
  //   image(tag, mouseX, mouseY, 50, 50)
  // }
}

