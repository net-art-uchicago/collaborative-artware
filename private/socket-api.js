const userToSocketId = new Map()

module.exports = (socket, io) => {
  console.log(`user ${socket.id} has connected!`)

  socket.on('broadcastWhiteboardUser', (user) => {
    // select a random user that is neither
    const clientIds = [...userToSocketId.entries()]
      .filter(([uid, sid]) => sid !== socket.id && uid !== user.id)
      .map(([, sid]) => sid)
    const senderClientId = clientIds[Math.floor(Math.random() * clientIds.length)]
    socket.to(senderClientId).emit('requestToSendExistingWhiteboardInfo', { socketId: socket.id })

    // add new user to object that olds all users
    userToSocketId.set(user.id, socket.id)
    socket.userId = user.id

    // send new user to all existing users
    socket.broadcast.emit('receiveWhiteboardUser', user)
  })

  socket.on('sendExistingWhiteboardInfo', (data) => {
    socket.to(data.socketId).emit('receiveExistingWhiteboardInfo', data)
  })

  socket.on('broadcastWhiteboardMouse', (data) => {
    socket.broadcast.emit('receiveWhiteboardMouse', data)
  })

  socket.on('broadcastYTUpdate', (data) => {
    socket.broadcast.emit('receiveYTUpdate', data)
  })

  socket.on('disconnect', () => {
    userToSocketId.delete(socket.userId)
    socket.broadcast.emit('receiveDisconnectedWhiteboardUserId', { id: socket.userId })

    console.log(`Client ${socket.id} has disconnected`)
  })
}
