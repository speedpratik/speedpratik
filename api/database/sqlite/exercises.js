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
        resolve(rows)
      })
    })
  }

  module.getByQuestionAndTopic = (question, topic) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM exercises WHERE question=? AND topic=?', [question, topic], (err, row) => {
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

  module.create = async (exercise) => {
    const dbExercise = await module.getByQuestionAndTopic(exercise.question, exercise.topic)

    // Prevents the creation of duplicated exercises
    if (dbExercise) {
      return dbExercise
    }

    db.run('INSERT INTO exercises(type, subject, number, topic, question, asserts, program) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [exercise.type, exercise.subject, exercise.number, exercise.topic, exercise.question, exercise.asserts, exercise.program])

    return await module.getByQuestionAndTopic(exercise.question, exercise.topic) // Returns the newly created exercise object
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
