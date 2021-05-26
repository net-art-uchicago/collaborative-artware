const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
var fs = require('fs')
const router = express.Router()

const JWT_SECRET = 'hellothisisasecret'

router.use(bodyParser.json())
router.use(cookieParser())

async function getUser (username) {
  const dbPath = path.join(__dirname, 'user_data')
  let foundUser
  const files = await fs.promises.readdir(dbPath)
  for (const file of files) {
    const userPath = path.join(dbPath, file)
    // Stat the file to see if we have a file or dir
    const stat = await fs.promises.stat(userPath)
    if (stat.isDirectory()) {
      const jsonPath = path.join(userPath, file + '.json')
      const json = fs.readFileSync(jsonPath, 'utf8')
      const user = JSON.parse(json)
      console.log(user.username)
      if (user.username === username) {
        foundUser = user
        break
      }
    }
  }
  return foundUser
}

/* Login POST/GET */
router.post('/api/login', async (req, res) => {
  const user = await getUser(req.body.username)
  if (!user) return res.json({ error: 'user not found' })

  // const valid = req.body.password === foundUser.password
  const valid = await bcrypt.compare(req.body.password, user.password)
  if (!valid) return res.json({ error: 'wrong password' })

  const data = { username: user.username }
  const token = jwt.sign(data, JWT_SECRET)
  res.cookie('AccessToken', token, {
    maxAge: 1000 * 60 * 60 * 24, // one day
    httpOnly: true
  }).json({ message: 'access granted' })
})

module.exports = router
