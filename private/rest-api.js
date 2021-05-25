const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.get('/api/example', (req, res) => {
  const obj = {
    success: true,
    message: 'this is an example'
  }
  res.json(obj)
})

/* Function to hash passwords */
async function main (pwd) {
    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(pwd, salt)
    return hashedPwd
}

module.exports = router
