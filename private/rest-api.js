const express = require('express')
var fs = require('fs')

const router = express.Router()

/* Base Example */
router.get('/api/example', (req, res) => {
  const obj = {
    success: true,
    message: 'this is an example'
  }
  res.json(obj)
})

/* Example: Listing All Users
 *
 * URL: http://localhost:8000/api/listUsers
 */
router.get('/api/listUsers', (req, res) => {
  fs.readFile('private/users_example.json', 'utf8', (err, data) => {
    console.log(data)
    res.end(data)
  })
})

/* Example: Query Parameters
 *
 * URL: http://localhost:8000/api/users/1
 * URL: http://localhost:8000/api/users/2
 */
router.get('/api/users/:id', (req, res) => {
  res.send(req.params.id)
})

/* Example: Retrieve Username using ID
 *
 * URL: http://localhost:8000/api/users/1/username
 * URL: http://localhost:8000/api/users/2/username
 */
router.get('/api/users/:id/username', (req, res) => {
  fs.readFile('private/users_example.json', 'utf8', (err, data) => {
    var dataObj = JSON.parse(data)
    res.end(dataObj.users.find(x => x.id === req.params.id).username)
  })
})

module.exports = router
