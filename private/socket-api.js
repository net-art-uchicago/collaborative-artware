const allUsers = []

module.exports = (socket, io) => {
  console.log(`user ${socket.id} has connected!`)

  socket.on('newConnection', (user) => {
    // send all users back to the new user
    socket.to(io.sockets.sockets.keys().next().value).emit('sendExistingInfo', socket.id)

    // send new user to all exisitng users
    socket.broadcast.emit('newConnection', user)

    // add new user to object that olds all users
    socket.userId = user.id
  })
  
  socket.on('sendExistingInfo', ({ socketId, ...data }) => {
    socket.to(socketId).emit('getExistingInfo', data)
  })


  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('newDisconnect', socket.userId)
    delete allUsers[socket.userId]
    console.log('Client has disconnected')
  })
}
