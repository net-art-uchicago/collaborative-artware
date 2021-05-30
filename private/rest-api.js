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

/* Find User JSON File */
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
      if (user.username === username) {
        foundUser = user
        break
      }
    }
  }
  return foundUser
}

/* POST new brush endpoint */
router.get('/brush-creator/api/brushdata', async (req, res) => {
  const token = req.cookies.AccessToken
  if (!token) return res.json({ error: 'no access token, user not logged in' })

  const valid = await jwt.verify(token, JWT_SECRET)
  if (!valid) return res.json({ error: 'not a valid token' })

  const user = await getUser(valid.username)
  if (!user) return res.json({ error: 'user not found' })

  return res.json(user.brushes)
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

  if (brushName in user.brushes) {
    console.log('error: brush name taken')
    res.json({ message: 'error: brush name taken' })
  }

  const path = 'private/user_images/' + user.id + '/brushes/' + brushName + '.png'
  user.brushes.push({ name: brushName, brush: brushData, path: path })

  fs.writeFile('private/user_data/' + user.id + '/' + user.id + '.json', JSON.stringify(user), function (err) {
    if (err) {
      console.log(err)
      res.json({ message: 'error: updating user json' })
    }
  })

  // strip off the data: url prefix to get just the base64-encoded bytes
  const data = brushData.replace(/^data:image\/\w+;base64,/, '')
  const buf = Buffer.from(data, 'base64')

  fs.writeFile(path, buf, function (err) {
    if (err) {
      console.log(err)
      res.json({ message: 'error: could not save brush' })
    } else {
      console.log('saved brush')
      res.json({ message: 'saved brush' })
    }
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

module.exports = router
