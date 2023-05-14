const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, '74c521c7f3eea22d26fb661b88693d72a1ab6aafe3e2304b560cdefb09379d302ed7a7b2bc90e87bbf001fb126e6237461c8f674c79a160fa24bb561b76e1b95', (err, user) => {
    if (err) res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = authenticateToken