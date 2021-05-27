class YTSampler {
    constructor () {
        this.player = null
       // this._newPlayer()
    }
    _creatIframeDIv () {
        const div = document.createElement('div')
        div.id = 'player'
        div.style,display = 'none'
        document.body.appendChild(div)
        return div
    }
    _createYTPlayer (eleId, vidId) {
      const player = new YT.Player('eleId', {
          videoId: vidId,
          events: {
            onReady: (e) => this._playerLoaded(e),
            onStateChange: (e) => this._stateChange(e),
      }
    })
    return player
  }

  _playerLoaded (e) {
      console.log('ready', e)
  }
  _stateChange (e) {
      console.log('state changed', e)
  }
  _newPlayer (vidId) {
      const ele = this.createIframeDiv()
      this.player = this._createYTPlayer(ele.id,vid) 
  }
  // Modified from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
  _idFromUrl (url) {
      let video_id = url.split('v=')[1]
      var ampersandPosition = video_id.indexOf('&')
      if(ampersandPosition != -1) {
          videoId = video_id.substring(0, ampersandPosition)
        }
      return videoId
  }
  loadVideo (url) {
      const vidId = this._idFromUrl(url)
      const vidId = this._idFromUrl(vidId)
      if (!this.player) this._newPlayer(vidId)
      else this._cueVideoById(vidId)
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
window.YTSampler = YTsampler
