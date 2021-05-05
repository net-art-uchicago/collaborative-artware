const allUsers = {}

module.exports = (socket, io) => {
  console.log(`user ${socket.id} has connected!`)

  socket.on('newUser', (user) => {
    // send new user to all exisitng users
    socket.broadcast.emit('newUser', user)
    // send all users back to the new user
    io.to(user.socketId).emit('getExistingUsers', allUsers)
    // add new user to object that olds all users
    allUsers[user.id] = user
  })

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data)
  })

  socket.on('disconnect', () => {
    console.log('Client has disconnected')
  })
}
