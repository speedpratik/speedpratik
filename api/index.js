import express from 'express'
const cors = require('cors')
const app = express()

app.use(cors())

// Database initialization
let db

switch (process.env.DB_TYPE) {
  default:
    db = require('./database/sqlite')
}

db.initialize()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded]

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
