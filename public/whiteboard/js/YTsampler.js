/* global YT */

class YTSampler extends window.HTMLElement {
  constructor () {
    super()
    this.player = null
  }

  connectedCallback () {
    this.innerHTML = `
      <style>
          .yt-sampler {
              padding: 10px;
              margin: 5px 0px;
          }
      </style>
      <section class="yt-sampler">
          <input type="text" placeholder="YouTube URL">
              <button>load</button>
      </section>
    `
    const btn = this.querySelector('button')
    const url = this.querySelector('input')
    btn.addEventListener('click', () => {
      this.loadVideo(url.value)
    })
  }

  _videoReady () {
    const url = this.querySelector('input')
    url.placeholder = 'YouTube URL'
    url.value = ''
    console.log(url)
    this._createToggle()
  }

  _createToggle () {
    // creates a play/pause button
    const toggle = this.querySelector('.yt-toggle-button')
    if (toggle) return
    // if element doesn't exist then we do the following
    const sec = this.querySelector('.yt-sampler')
    const btn = document.createElement('button')
    btn.className = 'yt-toggle-button'
    btn.textContent = 'play'
    btn.addEventListener('click', () => {
      if (btn.textContent === 'play') {
        this.play()
        btn.textContent = 'pause'
      } else {
        this.pause()
        btn.textContent = 'play'
      }
    })
    sec.appendChild(btn)
  }

  _playerLoaded (e) {
    console.log('ready', e)
    this._videoReady()
  }

  _stateChange (e) {
    console.log('state changed', e)
    if (e.data === 5) this._videoReady()
  }

  _newPlayer (vidId) {
    // const ele = this.createIframeDiv()
    const div = document.createElement('div')
    div.id = 'player' + Math.random()
    div.style.display = 'none'
    document.body.appendChild(div)
    this.player = new YT.Player(div.id, {
      videoId: vidId,
      events: {
        onReady: (e) => this._playerLoaded(e),
        onStateChange: (e) => this._stateChange(e)
      }
    })
  }

  _updatePlayer (vidId) {
    this.player.cueVideoById(vidId)
  }

  // Modified from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
  _idFromUrl (url) {
    console.log(url)
    let videoId = url.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition)
    }
    return videoId
  }

  loadVideo (url) {
    if (url === '') return window.alert('missing Youtube Url')
    const vidId = this._idFromUrl(url)
    const urlField = this.querySelector('input')
    console.log(urlField)
    urlField.placeholder = '...loading...'
    urlField.value = ''
    const toggle = this.querySelector('.yt-toggle-button')
    if (toggle) toggle.remove()
    if (!this.player) this._newPlayer(vidId)
    else this._updatePlayer(vidId)
  }

  play () {
    this.player.playVideo()
  }

  pause () {
    this.player.pauseVideo()
  }

  stop () {
    this.player.stopVideo()
  }
}
window.customElements.define('yt-sampler', YTSampler)
