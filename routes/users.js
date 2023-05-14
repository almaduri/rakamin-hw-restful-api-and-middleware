const express = require('express')
const pool = require('../db')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')

router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await pool.query('select * from users')
    res.status(200).json(users.rows)
  } catch (err) {
    console.error(err)
  }
})

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const user = await pool.query('select * from users where id = $1', [id])
    res.status(200).json(user.rows)
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