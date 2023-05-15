/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerformat: JWT
 *  schemas:
 *    Movies:
 *      type: object
 *      required:
 *        - title
 *        - genres
 *        - year
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the movie
 *        title:
 *          type: string
 *          description: The title of the movie
 *        genres:
 *          type: string
 *          description: The genres of the movie
 *        year:
 *          type: string
 *          description: The year of the movie
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: Movies managing API
 * /movies:
 *  get:
 *    summary: Get all movies
 *    tags: [Movies]
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
 *              $ref: '#/components/schemas/Movies'
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: Movies managing API
 * /movies/{id}:
 *  get:
 *    summary: Get movie by id
 *    tags: [Movies]
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
 *              $ref: '#/components/schemas/Movies'
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: Movies managing API
 * /movies:
 *  post:
 *    summary: Add new movie
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              genres:
 *                type: string
 *              year:
 *                type: string
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: Movies managing API
 * /movies/{id}:
 *  put:
 *    summary: Edit movie by id
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              genres:
 *                type: string
 *              year:
 *                type: string
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
 *              $ref: '#/components/schemas/Movies'
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: Movies managing API
 * /movies/{id}:
 *  delete:
 *    summary: Delete movie by id
 *    tags: [Movies]
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
 *              $ref: '#/components/schemas/Movies'
 */

const express = require('express')
const router = express.Router()
const pool = require('../db')
const authenticateToken = require('../middleware/authenticateToken')

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page, limit } = req.query
    let movies
    if (page && limit) {
      const offset = (page - 1) * limit
      movies = await pool.query('select * from movies limit $1 offset $2', [limit, offset])
    } else if (limit) {
      movies = await pool.query('select * from movies limit $1', [limit])
    } else {
      movies = await pool.query('select * from movies')
    }
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

router.post('/', authenticateToken, async (req, res) => {
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
    await pool.query('delete from movies where id = $1', [id])
    res.status(200).json({ message: 'Deleted Successfully' })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router