const express = require('express')
var fs = require('fs')

const router = express.Router()

router.get('/api/example', (req, res) => {
  const obj = {
    success: true,
    message: 'this is an example'
  }
  res.json(obj)
})

router.get('/api/listUsers', (req, res) => {
  fs.readFile('private/users_example.json', 'utf8', (err, data) => {
    console.log(data)
    res.end(data)
  })
})

module.exports = router
