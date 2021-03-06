module.exports = (db) => {
  const module = {}

  module.initialize = () => {
    db.run('CREATE TABLE IF NOT EXISTS exercises (' +
      'id INTEGER PRIMARY KEY,' +
      'type INTEGER NOT NULL,' +
      'subject INTEGER,' +
      'number INTEGER,' +
      'topic TEXT,' +
      'question TEXT NOT NULL,' +
      'asserts TEXT,' +
      'program TEXT' +
      ')')
  }

  module.getAllFromSubjectID = (subjectId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM exercises WHERE subject=? LIMIT 100', [subjectId], (err, rows) => {
        if (err) {
          return reject(err)
        }
        rows.forEach((row) => {
          row.asserts = JSON.parse(row.asserts || '[]')
        })
        resolve(rows)
      })
    })
  }

  module.getAllFromSubjectIDAndExerciseNumber = (subjectId, exerciseNumber) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM exercises WHERE subject=? AND number=? LIMIT 100', [subjectId, exerciseNumber], (err, rows) => {
        if (err) {
          return reject(err)
        }
        rows.forEach((row) => {
          row.asserts = JSON.parse(row.asserts || '[]')
        })
        resolve(rows)
      })
    })
  }

  module.get = () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM exercises LIMIT 100', [], (err, rows) => {
        if (err) {
          return reject(err)
        }
        rows.forEach((row) => {
          row.asserts = JSON.parse(row.asserts || '[]')
        })
        resolve(rows)
      })
    })
  }

  module.getByID = (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM exercises WHERE id=?', [id], (err, row) => {
        if (err) {
          return reject(err)
        }
        if (row === undefined) {
          return resolve(null)
        }
        row.asserts = JSON.parse(row.asserts || '[]')
        resolve(row)
      })
    })
  }

  module.getByType = (type) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM exercises WHERE type=? LIMIT 100', [type], (err, rows) => {
        if (err) {
          return reject(err)
        }
        rows.forEach((row) => {
          row.asserts = JSON.parse(row.asserts || '[]')
        })
        resolve(rows)
      })
    })
  }

  module.create = (exercise) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO exercises(type, subject, number, topic, question, asserts, program) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [exercise.type, exercise.subject, exercise.number, exercise.topic, exercise.question, exercise.asserts, exercise.program],
        async function (err) {
          if (err) {
            reject(err)
          }
          resolve(await module.getByID(this.lastID))
        })
    })
  }

  module.modify = async (exercise) => {
    db.run('UPDATE exercises SET type=?, subject=?, number=?, topic=?, question=?, asserts=?, program=? WHERE id=?',
      [exercise.type, exercise.subject, exercise.number, exercise.topic, exercise.question, exercise.asserts, exercise.program, exercise.id])

    return await module.getByID(exercise.id)
  }

  module.delete = (id) => {
    db.run('DELETE FROM exercises WHERE id=?', [id])
  }

  return module
}
