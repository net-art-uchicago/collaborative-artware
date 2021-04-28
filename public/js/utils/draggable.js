/*
  this file creates event listeners which handle moving any of the menu elements
  that include the "draggable" class. see css/draggable.css for related styles
*/

function grab (event) {
  const ele = event.target
  if (!ele.className.includes('draggable')) return
  const left = parseInt(ele.style.left) || 0
  const top = parseInt(ele.style.top) || 0
  ele.dataset.offsetX = event.clientX - left
  ele.dataset.offsetY = event.clientY - top
  window.dragging = ele
  ele.style.cursor = 'move'
  document.querySelectorAll('.draggable')
    .forEach(de => { de.style.zIndex = 1000 })
  ele.style.zIndex = 10001
  document.body.style.userSelect = 'none'
}

function drag (event) {
  if (!window.dragging) return
  const ele = window.dragging
  const offX = parseInt(ele.dataset.offsetX)
  const offY = parseInt(ele.dataset.offsetY)
  const x = event.clientX - offX
  const y = event.clientY - offY
  ele.style.left = `${x}px`
  ele.style.top = `${y}px`
  ele.style.cursor = 'move'
}

function release (event) {
  const ele = window.dragging
  if (ele) {
    ele.style.cursor = 'grab'
    ele.dataset.offsetX = null
    ele.dataset.offsetY = null
    window.dragging = null
    document.body.style.userSelect = 'auto'
  }
}

// global refernce to element currently being dragged
window.dragging = null
window.addEventListener('mousedown', grab)
window.addEventListener('mousemove', drag)
window.addEventListener('mouseup', release)
