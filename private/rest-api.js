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
    const dataUrl = 'data:image/png;base64,' + fs.readFileSync(brush.path, 'base64')
    data.push({ name: brush.name, brush: dataUrl })
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

  const pathImage = 'private/user_images/' + user.id + '/brushes/' + brushName + '.png'
  const pathUser = 'private/user_data/' + user.id + '.json'
  user.brushes.push({ name: brushName, path: pathImage })

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

module.exports = router
