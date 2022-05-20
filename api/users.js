module.exports = (app, db) => {
  app.get('/users/:userId', async (req, res) => {
    const user = await db.users.get(req.params.userId)

    if (user === null) {
      res.sendStatus(404)
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(user))
    }
  })

  app.post('/users', async (req, res) => {
    const user = {
      username: req.body.username,
      email: req.body.email,
      oauth2: req.body.oauth2,
      avatar: req.body.avatar
    }

    // Checks that all required user fields are filled
    if (!Object.values(user).every(element => element !== undefined)) {
      return res.sendStatus(400)
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.users.create(user)))
  })

  app.put('/users/:userId', async (req, res) => {
    const user = await db.users.get(req.params.userId)

    if (!user) {
      return res.sendStatus(404)
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.users.modify({ ...user, ...req.body })))
  })

  app.delete('/users/:userId', (req, res) => {
    db.users.delete(req.params.userId)
    res.sendStatus(204)
  })
}
