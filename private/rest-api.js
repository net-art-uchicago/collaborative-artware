const express = require('express')
const router = express.Router()

router.get('/api/example', (req, res) => {
  const obj = {
    success: true,
    message: 'this is an example'
  }
  res.json(obj)
})

module.exports = router
