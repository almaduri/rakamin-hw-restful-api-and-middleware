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

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const movie = await pool.query("select * from movies where id = $1", [id])
    res.status(200).json(movie.rows)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', async (req, res) => {

})

router.put('/:id', async (req, res) => {

})

router.delete('/:id', async (req, res) => {

})

module.exports = router