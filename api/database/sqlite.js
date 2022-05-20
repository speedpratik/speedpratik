const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sqlite.db')

const users = require('./sqlite/users')(db)
const subjects = require('./sqlite/subjects')(db)

module.exports = {
  users,
  subjects,
  initialize: () => {
    users.initialize()
    subjects.initialize()
  }
}
