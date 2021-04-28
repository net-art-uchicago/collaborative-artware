const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const ROUTES = require('./private/rest-api.js')
const SOCKETS = require('./private/socket-api.js')
const port = 8000

// serve static files (public directory)
app.use(express.static(`${__dirname}/public`))

// setup REST API
app.use(ROUTES)

// setup Web Sockets API
io.on('connection', (socket) => SOCKETS(socket, io))

// run the server (ie. start listening for requests)
http.listen(port, () => console.log(`listening on: http://localhost:${port}; CTRL-C to quit`))
