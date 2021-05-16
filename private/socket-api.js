const userToSocketId = new Map()

module.exports = (socket, io) => {
  console.log(`user ${socket.id} has connected!`)

  socket.on('newConnection', (user) => {
    // send all users back to the new user
    const clientIds = [...userToSocketId.entries()]
      .filter(([uid, sid]) => sid !== socket.id && uid !== user.id)
      .map(([, sid]) => sid)
    const senderClientId = clientIds[0]// Math.floor(Math.random() * clientIds.length)]
    socket.to(senderClientId).emit('sendExistingInfo', { socketId: socket.id })

    // send new user to all existing users
    socket.broadcast.emit('newConnection', user)

    // add new user to object that olds all users
    userToSocketId.set(user.id, socket.id)
    socket.userId = user.id
  })

  socket.on('getExistingInfo', (data) => {
    socket.to(data.socketId).emit('getExistingInfo', data)
  })

  socket.on('mouse', (data) => {
    socket.broadcast.emit('mouse', data)
  })

  socket.on('disconnect', () => {
    // const potentialIds = [...userToSocketId.entries()].find(([uid, sid]) => sid === socket.id)
    // if (potentialIds !== undefined) socket.broadcast.emit('newDisconnect', potentialIds[0])
    userToSocketId.delete(socket.userId)
    socket.broadcast.emit('newDisconnect', socket.userId)

    console.log(`Client ${socket.id} has disconnected`)
  })
}
