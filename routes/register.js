/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerformat: JWT
 *  schemas:
 *    Register:
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
 *  name: Register
 *  description: Register managing API
 * /register:
 *  post:
 *    summary: Add new user
 *    tags: [Register]
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
 *              $ref: '#/components/schemas/Register'
 */

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