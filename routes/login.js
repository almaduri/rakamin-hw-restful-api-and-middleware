const express = require('express')
const jwt = require('jsonwebtoken')
const pool = require('../db')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await pool.query('select id, email, gender, role from users where email = $1 and password = $2', [email, password])
    if (user.rows.length === 1) {
      const accessToken = jwt.sign(user.rows[0], '74c521c7f3eea22d26fb661b88693d72a1ab6aafe3e2304b560cdefb09379d302ed7a7b2bc90e87bbf001fb126e6237461c8f674c79a160fa24bb561b76e1b95')
      res.json({ accessToken })
    } else {
      res.status(401).json({ message: 'User not found' })
    }
  } catch (err) {
    console.error(err)
  }
})

module.exports = router