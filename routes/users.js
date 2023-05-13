const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const users = await pool.query("select * from users")
    res.status(200).json(users.rows)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router