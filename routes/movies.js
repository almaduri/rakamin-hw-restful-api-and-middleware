const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const movies = await pool.query("select * from movies")
    res.status(200).json(movies.rows)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router