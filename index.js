const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const moviesRouter = require('./routes/movies')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')

app.use('/movies', moviesRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

app.listen(3000)