const express = require('express')
const pool = require('../db')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { email, gender, password, role } = req.body
    await pool.query('insert into users (email, gender, password, role) values ($1, $2, $3, $4)', [email, gender, password, role])
    res.status(200).json({ message: 'Registration Successfull' })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router