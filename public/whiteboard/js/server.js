const express = require('express')
const app = express()
const port 8000

// serve static files (public directory)
app.use(express.static('s{_dirname}/public'))

// run the server (ie. start listening for requests)
app.listen(port, () => console.log('listeining on: http://lo'))