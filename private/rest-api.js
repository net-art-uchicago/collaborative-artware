const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var fs = require('fs')
const router = express.Router()

router.use(bodyParser.json())

/* Login POST/GET */
router.post('/api/login', (req, res) => {
  const dbPath = path.join(__dirname, 'user_data')
  let foundUser
  (async () => {
    try {
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
          if (user.username === req.body.username) {
            foundUser = user
            break
          }
        }
      } // End for...of
      if (!foundUser) return res.json({ error: 'user not found' })

      const valid = req.body.password === foundUser.password
      if (!valid) return res.json({ error: 'wrong password' })

      res.json(foundUser)
    } catch (e) {
      console.error('Error reading directory', e)
      res.json({ error: 'Error reading directory' })
    }
  })()
})

module.exports = router
