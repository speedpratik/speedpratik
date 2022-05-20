const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sqlite.db')

const users = require('./sqlite/users')(db)

module.exports = {
  users,
  initialize: () => {
    users.initialize()
  }
}
