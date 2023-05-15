/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerformat: JWT
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        - email
 *        - gender
 *        - password
 *        - role
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        gender:
 *          type: string
 *          description: The gender of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *        role:
 *          type: string
 *          description: The role of the user
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users managing API
 * /users:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: string
 *        description: Page
 *      - in: query
 *        name: limit
 *        schema:
 *          type: string
 *        description: Limit
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users managing API
 * /users/{id}:
 *  get:
 *    summary: Get user by id
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: ID of the movie to get
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users managing API
 * /users:
 *  post:
 *    summary: Add new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              gender:
 *                type: string
 *              password:
 *                type: string
 *              role:
 *                type: string
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users managing API
 * /users/{id}:
 *  put:
 *    summary: Edit user by id
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              gender:
 *                type: string
 *              password:
 *                type: string
 *              role:
 *                type: string
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: ID of the user to get
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users managing API
 * /users/{id}:
 *  delete:
 *    summary: Delete user by id
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: ID of the user to get
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 */

const express = require('express')
const pool = require('../db')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page, limit } = req.query
    let users
    if (page && limit) {
      const offset = (page - 1) * limit
      users = await pool.query('select * from users limit $1 offset $2', [limit, offset])
    } else if (limit) {
      users = await pool.query('select * from users limit $1', [limit])
    } else {
      users = await pool.query('select * from users')
    }
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
  try {
    const { id } = req.params
    await pool.query('delete from movies where id = $1', [id])
    res.status(200).json({ message: 'Deleted Successfully' })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router