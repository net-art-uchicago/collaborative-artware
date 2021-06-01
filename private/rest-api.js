const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
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

/* Function to hash passwords */
async function hash (pwd) {
  const salt = await bcrypt.genSalt(10)
  const hashedPwd = await bcrypt.hash(pwd, salt)
  return hashedPwd
}

/* Create a new user */
async function createUser (id, displayName, user, pass, head, eyes, hair) {
  // Create dictionary object for user data
  const userDict = await {
    id: id,
    display_name: displayName,
    username: user,
    password: await hash(pass),
    avatar: { head: head, eyes: eyes, hair: hair }
  }
  const userJson = await JSON.stringify(userDict)
  const userDir = await './user_data/' + id
  // Create new directory
  fs.mkdir(userDir, (err) => {
    if (err) throw err
  })
  // Write the new user.json to user_data/id/id.json
  const userPath = await userDir + '/' + id + '.json'
  fs.writeFile(userPath, userJson, function (err, result) {
    if (err) console.log('error', err)
  })
}

module.exports = router
