const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST ||'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'coder'
  },
  pool: { min: 0, max: 7 }
})

module.exports = {
  knex
}