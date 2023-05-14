const express = require('express')
const app = express()

// const jwt = require('jsonwebtoken')
app.use(express.json())

const moviesRouter = require('./routes/movies')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')

app.use('/movies', moviesRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

app.listen(3000)