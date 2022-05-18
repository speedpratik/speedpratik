module.exports = (app, db) => {
  app.get('/users/:userId', async (req, res) => {
    const user = await db.getUser(req.params.userId)

    if (user === null) {
      res.sendStatus(404)
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(user))
    }
  })

  app.post('/users', async (req, res) => {
    const user = await db.createUser({
      username: req.body.username,
      email: req.body.email,
      oauth2: req.body.oauth2,
      avatar: req.body.discord
    })

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(user))
  })

  app.delete('/users/:userId', (req, res) => {
    db.deleteUser(req.params.userId)
    res.sendStatus(204)
  })
}
