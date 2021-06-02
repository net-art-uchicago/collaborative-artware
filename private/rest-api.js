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

/* Create new user post */
router.post('/api/createuser', async (req, res) => {
  const reqcopy = await req
  const dbPath = await path.join(__dirname, 'user_data')
  const userDir = await dbPath + '/' + req.body.id
  // Create new user directory
  let success = await dirCheck(userDir)
  console.log(success)
  if (1) {
    return res.json({ error: 'unable to create user' })
  } else {
    createUser(reqcopy)
    return res.json({ success: 'user successfully created' })
  }
})

/* Check if directory can be created */
async function dirCheck (dir) {
  let flag = 0
  fs.mkdir(dir, (err) => {
    if (err) {
      console.log('not created')
      flag = 1
    }
    console.log(flag)
    return flag
  })
}

/* Create a new user */
async function createUser (req) {
  console.log('heeeee')
  // Create dictionary object for user data
  const userDict = {
    id: req.body.id,
    display_name: req.body.display_name,
    username: await hash(req.body.username),
    password: req.body.password,
    avatar: { head: req.body.head, eyes: req.body.eyes, hair: req.body.hair }
  }
  const userJson = await JSON.stringify(userDict)
  const dbPath = await path.join(__dirname, 'user_data')
  const userDir = await dbPath + '/' + req.body.id
  // Write the new user.json to user_data/id/id.json
  const userJsonPath = await userDir + '/' + req.body.id + '.json'
  await fs.writeFile(userJsonPath, userJson, function (err, result) {
    if (err) {
      console.log('error')
    }
  })
}

module.exports = router
