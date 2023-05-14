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

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { email, gender, password, role } = req.body
    await pool.query('insert into users (email, gender, password, role) values ($1, $2, $3, $4)', [email, gender, password, role])
    res.status(200).json({ message: 'Added Successfully' })
  } catch (err) {
    console.error(err)
  }
})

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { email, gender, password, role } = req.body
    await pool.query('update users set email = $1, gender = $2, password = $3, role = $4 where id = $5', [email, gender, password, role, id])
    res.status(200).json({ message: 'Updated Successfully' })
  } catch {
    console.error(err)
  }
})

router.delete('/:id', authenticateToken, async (req, res) => {

})

module.exports = router