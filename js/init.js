window.brushes = {} // dictionary of brushes
window.filters = {} // dictionary of filters
window.settings = { // general app settings
  selectedBrush: null
}

window.setupMenuLogic = function () {
  // setup event listeners so that sub menus open when options are clicked
  const options = document.querySelectorAll('#menu > .option')
  options.forEach(option => {
    const sub = option.dataset.submenu
    option.addEventListener('click', () => {
      // open the window that matches the data-submenu of the clicked option
      const win = document.querySelector('#' + sub)
      win.style.display = 'block'
      // make sure this window is above the others
      document.querySelectorAll('.draggable')
        .forEach(de => { de.style.zIndex = 1000 })
      win.style.zIndex = 10001
    })
  })

  // setup event listeres for all of the X (close) buttons
  const closeButtons = document.querySelectorAll('.close')
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentNode.parentNode.style.display = 'none'
    })
  })

  // setup brushes submenu
  const brushesMenu = document.querySelector('#brushes')
  for (const keyname in window.brushes) {
    const brush = window.brushes[keyname]
    const div = document.createElement('div')
    div.textContent = brush.name
    div.className = 'submenu-option'
    div.addEventListener('click', () => {
      window.settings.selectedBrush = keyname
      const otherOpts = document.querySelectorAll('#brushes .submenu-option')
      otherOpts.forEach(opt => { opt.classList.remove('selected') })
      div.classList.add('selected')
    })
    brushesMenu.appendChild(div)
  }

  // setup filters submenu
  const filtersMenu = document.querySelector('#filters')
  for (const keyname in window.filters) {
    const filter = window.filters[keyname]
    const div = document.createElement('div')
    div.textContent = filter.name
    div.className = 'submenu-option'
    div.addEventListener('click', () => filter.run())
    filtersMenu.appendChild(div)
  }
}
