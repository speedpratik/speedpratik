module.exports = (db) => {
  const module = {}

  module.initialize = () => {
    db.run('CREATE TABLE IF NOT EXISTS users (' +
      'id INTEGER PRIMARY KEY,' +
      'username TEXT NOT NULL,' +
      'email TEXT NOT NULL,' +
      'avatar TEXT,' +
      'flags INTEGER,' +
      'oauth2 TEXT NOT NULL,' +
      'account_creation INTEGER NOT NULL,' +
      'completed_exercises INTEGER DEFAULT 0,' +
      'completed_subjects INTEGER DEFAULT 0,' +
      'accumulated_time INTEGER DEFAULT 0,' +
      'achievements TEXT,' +
      'trophies TEXT,' +
      'xp INTEGER DEFAULT 0,' +
      'level INTEGER DEFAULT 0)'
    )
  }

  module.get = (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id=?', id, (err, row) => {
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

  module.getByEmail = (email) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email=?', email, (err, row) => {
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

  module.create = async (user) => {
    const dbUser = await module.getByEmail(user.email)

    // Only creates the user if they don't already exist in the database
    if (dbUser !== null) {
      return dbUser
    }

    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users(username, email, oauth2, avatar, account_creation) VALUES (?, ?, ?, ?, ?)',
        [user.username, user.email, user.oauth2, user.avatar, Date.now()],
        async function (err) {
          if (err) {
            reject(err)
          }
          resolve(await module.get(this.lastID))
        })
    })
  }

  module.modify = async (user) => {
    db.run('UPDATE users SET username=?, avatar=?, flags=?, oauth2=?, completed_subjects=?, completed_exercises=?,' +
      'accumulated_time=?, achievements=?, trophies=?, xp=?, level=?',
    [user.username, user.avatar, user.flags, user.oauth2, user.completed_subjects, user.completed_exercises,
      user.accumulated_time, user.achievements, user.trophies, user.xp, user.level])

    return await module.get(user.id)
  }

  module.delete = (id) => {
    db.run('DELETE FROM users WHERE id=?', id)
  }

  return module
}
