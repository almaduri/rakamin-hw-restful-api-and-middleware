const Pool = require('pg').Pool

const pool = new Pool({
  user: 'ali',
  password: 'pstgrs',
  database: 'movies',
  host: 'localhost',
  port: 5432
})

module.exports = pool