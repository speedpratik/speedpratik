const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sqlite.db')

const users = require('./sqlite/users')(db)
const subjects = require('./sqlite/subjects')(db)
const exercises = require('./sqlite/exercises')(db)

module.exports = {
  users,
  subjects,
  exercises,
  initialize: () => {
    users.initialize()
    subjects.initialize()
    exercises.initialize()
  }
}
