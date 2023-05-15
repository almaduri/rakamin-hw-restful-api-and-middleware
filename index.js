const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const morgan = require('morgan')

const app = express()

app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const moviesRouter = require('./routes/movies')
const usersRouter = require('./routes/users')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')

app.use('/movies', moviesRouter)
app.use('/users', usersRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '0.1.0',
      description: 'This is a simple CRUD API Application made with express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/'
      },
    ],
  },
  apis: ['./routes/*.js']
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.listen(3000)