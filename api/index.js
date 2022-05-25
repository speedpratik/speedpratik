import express from 'express'
const app = express()

// Database initialization
let db

switch (process.env.DB_TYPE) {
  default:
    db = require('./database/sqlite')
}

db.initialize()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

console.log(process.env.DISCORD_CLIENT_ID, process.env.API_AUTHORIZATION_TOKEN)

app.use((req, res, next) => {
  switch (req.get('authorization_token')) {
    case undefined:
      res.sendStatus(401)
      break
    case process.env.API_AUTHORIZATION_TOKEN:
      next()
      break
    default:
      res.sendStatus(403)
  }
})

require('./users')(app, db)
require('./subjects')(app, db)
require('./exercises')(app, db)
require('./submissions')(app, db)

// Allow for 404 errors
app.use((req, res) => {
  res.sendStatus(404)
})

export default {
  path: '/api',
  handler: app
}
