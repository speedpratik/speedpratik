module.exports = (db, exercises) => {
  const module = {}

  module.initialize = () => {
    db.run('CREATE TABLE IF NOT EXISTS subjects (' +
      'id INTEGER PRIMARY KEY,' +
      'session INTEGER NOT NULL,' +
      'number INTEGER NOT NULL,' +
      'link TEXT NOT NULL,' +
      'difficulty INT DEFAULT 1,' +
      'flags INT DEFAULT 0' +
      ')')
  }

  module.get = () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM subjects LIMIT 100', [], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  }

  module.getByID = (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM subjects WHERE id=?', id, (err, row) => {
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

  module.getBySession = (session) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM subjects WHERE session=? LIMIT 100', [session], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  }

  module.getByDifficulty = (difficulty) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM subjects WHERE difficulty=? LIMIT 100', [difficulty], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  }

  module.getBySessionAndNumber = (session, number) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM subjects WHERE session=? AND number=?', [session, number], (err, row) => {
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

  module.create = async (subject) => {
    const dbSubject = await module.getBySessionAndNumber(subject.session, subject.number)

    // Prevents the creation of duplicated subjects
    if (dbSubject) {
      return dbSubject
    }

    db.run('INSERT INTO subjects(session, number, link, difficulty, flags) VALUES (?, ?, ?, ?, ?)',
      [subject.session, subject.number, subject.link, subject.difficulty, subject.flags])

    return await module.getBySessionAndNumber(subject.session, subject.number) // Returns the newly created subject object
  }

  module.modify = async (subject) => {
    db.run('UPDATE subjects SET session=?, number=?, link=?, difficulty=?, flags=? WHERE id=?',
      [subject.session, subject.number, subject.link, subject.difficulty, subject.flags, subject.id])

    return await module.getByID(subject.id)
  }

  module.delete = (id) => {
    db.run('DELETE FROM subjects WHERE id=?', [id])
  }

  return module
}
