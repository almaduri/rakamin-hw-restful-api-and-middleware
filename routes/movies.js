const express = require('express')
const router = express.Router()
const pool = require('../db')
const authenticateToken = require('../middleware/authenticateToken')

router.get('/', authenticateToken, async (req, res) => {
  try {
    const movies = await pool.query('select * from movies')
    res.status(200).json(movies.rows)
  } catch (err) {
    console.error(err)
  }
})

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const movie = await pool.query('select * from movies where id = $1', [id])
    res.status(200).json(movie.rows)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, genres, year } = req.body
    await pool.query('insert into movies (title, genres, year) values ($1, $2, $3)', [title, genres, year])
    res.status(200).json({ message: 'Added Successfully' })
  } catch (err) {
    console.error(err)
  }
})

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { title, genres, year } = req.body
    await pool.query('update movies set title = $1, genres = $2, year = $3 where id = $4', [title, genres, year, id])
    res.status(200).json({ message: 'Updated Successfully' })
  } catch {
    console.error(err)
  }
})

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const movie = await pool.query('delete from movies where id = $1', [id])
    console.log(movie)
    res.status(200).json({ message: 'Deleted Successfully' })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router