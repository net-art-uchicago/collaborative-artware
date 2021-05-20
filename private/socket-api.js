const userToSocketId = new Map()

module.exports = (socket, io) => {
  console.log(`user ${socket.id} has connected!`)

  socket.on('whiteboardConnection', (user) => {
    // send all users back to the new user
    const clientIds = [...userToSocketId.entries()]
      .filter(([uid, sid]) => sid !== socket.id && uid !== user.id)
      .map(([, sid]) => sid)
    const senderClientId = clientIds[Math.floor(Math.random() * clientIds.length)]
    socket.to(senderClientId).emit('sendExistingWhiteboardInfo', { socketId: socket.id })

    // send new user to all existing users
    socket.broadcast.emit('whiteboardConnection', user)

    // add new user to object that olds all users
    userToSocketId.set(user.id, socket.id)
    socket.userId = user.id
  })

  socket.on('getExistingWhiteboardInfo', (data) => {
    // console.log(socket.id, 'sending to', data.socketId)
    socket.to(data.socketId).emit('getExistingWhiteboardInfo', data)
  })

  socket.on('whiteboardMouse', (data) => {
    socket.broadcast.emit('whiteboardMouse', data)
  })

  socket.on('disconnect', () => {
    // console.log('deleting userId', socket.userId, 'socketId', socket.id)
    userToSocketId.delete(socket.userId)
    socket.broadcast.emit('whiteboardDisconnect', socket.userId)

    console.log(`Client ${socket.id} has disconnected`)
  })
}
