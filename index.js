const express = require('express')
const app = express()

// const jwt = require('jsonwebtoken')
app.use(express.json())

const moviesRouter = require('./routes/movies')
const usersRouter = require('./routes/users')

app.use('/movies', moviesRouter)
app.use('/users', usersRouter)

app.listen(3000)