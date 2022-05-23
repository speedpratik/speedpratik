const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sqlite.db')

const users = require('./sqlite/users')(db)
const subjects = require('./sqlite/subjects')(db)
const exercises = require('./sqlite/exercises')(db)
const submissions = require('./sqlite/submissions')(db)

module.exports = {
  users,
  subjects,
  exercises,
  submissions,
  initialize: () => {
    users.initialize()
    subjects.initialize()
    exercises.initialize()
    submissions.initialize()
  }
}
