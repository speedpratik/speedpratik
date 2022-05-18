const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sqlite.db')

module.exports = {
  initialize: () => {
    db.run('CREATE TABLE IF NOT EXISTS users (' +
      'id INTEGER PRIMARY KEY,' +
      'username TEXT NOT NULL,' +
      'email TEXT NOT NULL,' +
      'avatar TEXT,' +
      'flags INTEGER,' +
      'oauth2 TEXT NOT NULL,' +
      'account_creation INTEGER NOT NULL,' +
      'completed_subjects INTEGER DEFAULT 0,' +
      'accumulated_time INTEGER DEFAULT 0,' +
      'achievements TEXT,' +
      'trophies TEXT,' +
      'xp INTEGER DEFAULT 0,' +
      'level INTEGER DEFAULT 0)'
    )
  },

  getUser: (id) => {
    return new Promise(function (resolve, reject) {
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
  },

  getUserByEmail: (email) => {
    return new Promise(function (resolve, reject) {
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
  },

  createUser: async (params) => {
    const user = await module.exports.getUserByEmail(params.email)

    // Only creates the user if they don't already exist in the database
    if (user !== null) {
      return user
    }

    db.run('INSERT INTO users(username, email, oauth2, avatar, account_creation) VALUES (?, ?, ?, ?, ?)',
      [params.username, params.email, params.oauth2, params.avatar, Date.now()])

    return await module.exports.getUserByEmail(params.email) // Returns the newly created user object
  },

  deleteUser: (id) => {
    db.run('DELETE FROM users WHERE id=?', id)
  }
}
