module.exports = (db) => {
  const module = {}

  module.initialize = () => {
    db.run('CREATE TABLE IF NOT EXISTS submissions (' +
      'id INTEGER PRIMARY KEY,' +
      'user INTEGER NOT NULL,' +
      'subject INTEGER,' +
      'exercise INTEGER,' +
      'number INTEGER NOT NULL,' +
      'start_date INTEGER NOT NULL,' +
      'submit_date INTEGER NOT NULL,' +
      'xp_award INT NOT NULL,' +
      'programs TEXT NOT NULL' +
      ')')
  }

  module.getByUser = (user) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM submissions WHERE user=?', [user], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  }

  module.getByUserOnSubject = (user, subject) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM submissions WHERE user=? AND subject=?', [user, subject], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  }

  module.getByUserOnExercise = (user, exercise) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM submissions WHERE user=? AND exercise=?', [user, exercise], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  }

  module.getBySubject = (subject) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM submissions WHERE subject=?', [subject], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  }

  module.getByExercise = (exercise) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM submissions WHERE exercise=?', [exercise], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  }

  module.getByID = (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM submissions WHERE id=?', [id], (err, row) => {
        if (err) {
          return reject(err)
        }
        if (row === undefined) {
          return resolve(null)
        }
        resolve(row)
      })
    })
  }

  module.countSubmissionsByUserOnSubject = (user, subject) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) FROM submissions WHERE user=? AND subject=?', [user, subject], (err, count) => {
        if (err) {
          return reject(err)
        }
        resolve(count['COUNT(*)'])
      })
    })
  }

  module.countSubmissionsByUserOnExercise = (user, exercise) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) FROM submissions WHERE user=? AND subject=?', [user, exercise], (err, count) => {
        if (err) {
          return reject(err)
        }
        resolve(count['COUNT(*)'])
      })
    })
  }

  module.create = (submission) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO submissions(user, subject, exercise, number, start_date, submit_date, xp_award, programs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [submission.user, submission.subject, submission.exercise, submission.number, submission.start_date, submission.submit_date, submission.xp_award, submission.programs],
        async function (err) {
          if (err) {
            return reject(err)
          }
          resolve(await module.getByID(this.lastID))
        })
    })
  }

  module.delete = (id) => {
    db.run('DELETE FROM submissions WHERE id=?', [id])
  }

  return module
}
