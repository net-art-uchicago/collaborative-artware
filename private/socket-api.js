module.exports = (socket, io) => {
  console.log(`user ${socket.id} has connected!`)

  socket.on('newConnection', (user) => {
    // send all users back to the new user
    const clientIDs = [...io.sockets.sockets.keys()]
    const senderClientID = clientIDs[Math.floor(Math.random() * clientIDs.length)]
    socket.to(senderClientID).emit('sendExistingInfo', socket.id)

    // send new user to all exisitng users
    socket.broadcast.emit('newConnection', user)

    // add new user to object that olds all users
    socket.userId = user.id
  })

  socket.on('getExistingInfo', ({ socketId, ...data }) => {
    socket.to(socketId).emit('getExistingInfo', data)
  })

  socket.on('mouse', (data) => {
    socket.broadcast.emit('mouse', data)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('newDisconnect', socket.userId)
    console.log('Client has disconnected')
  })
}
