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
              margin: 5px 0px;  
          }
          .yt-sampler input {
            box-sizing: border-box;
            width: 100% 
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
      this._emit('videoLoaded', url.value)
      this.loadVideo(url.value)
    })
  }

  _videoReady () {
    const url = this.querySelector('input')
    url.placeholder = 'YouTube URL'
    url.value = ''
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
        this._emit('videoPlayed')
        this.play()
      } else {
        this._emit('videoPaused')
        this.pause()
      }
    })
    sec.appendChild(btn)
  }

  _changeToggle (text) {
    const toggle = this.querySelector('.yt-toggle-button')
    toggle.textContent = text
  }

  _playerLoaded (e) {
    this._videoReady()
  }

  _stateChange (e) {
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
    let videoId = url.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition)
    }
    return videoId
  }

  _emit (name, data) {
    const eveObj = { detail: data }
    const eve = new window.CustomEvent(name, eveObj)
    this.dispatchEvent(eve)
  }

  loadVideo (url) {
    if (url === '') return window.alert('missing Youtube Url')
    const vidId = this._idFromUrl(url)
    const urlField = this.querySelector('input')
    urlField.placeholder = '...loading...'
    urlField.value = ''
    const toggle = this.querySelector('.yt-toggle-button')
    if (toggle) toggle.remove()
    if (!this.player) this._newPlayer(vidId)
    else this._updatePlayer(vidId)
  }

  play () {
    this.player.playVideo()
    this._changeToggle('pause')
  }

  pause () {
    this.player.pauseVideo()
    this._changeToggle('play')
  }

  stop () {
    this.player.stopVideo()
  }
}
window.customElements.define('yt-sampler', YTSampler)
