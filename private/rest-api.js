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

router.use(express.static(`${__dirname}/user_images`))

/* Find User JSON File */
async function getUser (username) {
  const dbPath = path.join(__dirname, 'user_data')
  let foundUser
  const files = await fs.promises.readdir(dbPath)
  for (const file of files) {
    const jsonPath = path.join(dbPath, file)
    const json = fs.readFileSync(jsonPath, 'utf8')
    const user = JSON.parse(json)
    if (user.username === username) {
      foundUser = user
      break
    }
  }
  return foundUser
}

/* GET new brush endpoint */
router.get('/brush-creator/api/brushdata', async (req, res) => {
  const token = req.cookies.AccessToken
  if (!token) return res.json({ error: 'no access token, user not logged in' })

  const valid = await jwt.verify(token, JWT_SECRET)
  if (!valid) return res.json({ error: 'not a valid token' })

  const user = await getUser(valid.username)
  if (!user) return res.json({ error: 'user not found' })

  const data = []
  for (const brush of user.brushes) {
    data.push({ name: brush.name, brush: brush.path })
  }
  return res.json(data)
})

/* POST new brush endpoint */
router.post('/brush-creator/api/newbrush', async (req, res) => {
  const token = req.cookies.AccessToken
  if (!token) return res.json({ error: 'no access token, user not logged in' })

  const valid = await jwt.verify(token, JWT_SECRET)
  if (!valid) return res.json({ error: 'not a valid token' })

  const user = await getUser(valid.username)
  if (!user) return res.json({ error: 'user not found' })

  const brushData = req.body.brush
  const brushName = req.body.name

  if (brushName in user.brushes) return res.json({ error: 'error: brush name taken' })

  const path = user.id + '/brushes/' + brushName + '.png'
  const pathImage = 'private/user_images/' + path
  const pathUser = 'private/user_data/' + user.id + '.json'
  user.brushes.push({ name: brushName, path: path })

  fs.writeFile(pathUser, JSON.stringify(user), function (err) {
    if (err) return res.json({ error: 'error: updating user brushes json' })
  })

  // strip off the data: url prefix to get just the base64-encoded bytes
  const data = brushData.replace(/^data:image\/\w+;base64,/, '')
  const buf = Buffer.from(data, 'base64')

  fs.writeFile(pathImage, buf, function (err) {
    if (err) return res.json({ error: 'error: could not save brush' })
    else return res.json({ message: 'saved brush' })
  })
})

/* POST login endpoint */
router.post('/api/login', async (req, res) => {
  const user = await getUser(req.body.username)
  if (!user) return res.json({ error: 'user not found' })

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
  const dbPath = path.join(__dirname, 'user_data')
  const userDir = dbPath + '/' + req.body.id
  /* Create new user directory */
  try {
    fs.mkdirSync(userDir)
    createUser(req)
    return res.json({ success: 'user successfully created' })
  } catch (err) {
    return res.json({ error: 'unable to create user' })
  }
})

/* Create a new user */
async function createUser (req) {
  /* Create dictionary object for user data */
  const userDict = {
    id: req.body.id,
    display_name: req.body.display_name,
    username: req.body.username,
    password: await hash(req.body.password),
    avatar: { head: req.body.head, eyes: req.body.eyes, hair: req.body.hair },
    brushes: []
  }
  const userJson = JSON.stringify(userDict)
  const userDataPath = path.join(__dirname, 'user_data')
  const userImagesPath = path.join(__dirname, 'user_images')
  const userDir = userDataPath + '/' + req.body.id
  const userImagesDir = userImagesPath + '/' + req.body.id
  const userImagesBrushDir = userImagesDir + '/brushes'
  const userImagesDesktopDir = userImagesDir + '/desktops'
  const userImagesIconDir = userImagesDir + '/images'
  /* Create folder in user_images folder and folders for brushes, desktops, and
  images in that folder */
  try {
    fs.mkdirSync(userImagesDir)
    fs.mkdirSync(userImagesBrushDir)
    fs.mkdirSync(userImagesDesktopDir)
    fs.mkdirSync(userImagesIconDir)
  } catch (err) {
    console.log('error')
  }
  /* Write the new user.json to user_data/id/id.json */
  const userJsonPath = userDir + '/' + req.body.id + '.json'
  fs.writeFile(userJsonPath, userJson, function (err, result) {
    if (err) {
      console.log('error')
    }
  })
}

module.exports = router
