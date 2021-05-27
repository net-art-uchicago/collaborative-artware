/* global User */
class OwnUser extends User {
  // on connect, send your user to server
  broadcast () {
    this.socket.emit('broadcastWhiteboardUser', this.toObject())
  }

  draw (x, y) {
    super.draw(x, y)
    this.socket.emit('broadcastWhiteboardMouse', {
      id: this.id,
      pos: { x, y },
      brushPath: this.brushPath,
      size: this.brush.size,
      color: this.brush.color.toString()
    })
  }
}

window.OwnUser = OwnUser
