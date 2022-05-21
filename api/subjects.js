module.exports = (app, db) => {
  app.get('/subjects', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.subjects.get()))
  })

  app.get('/subjects/id/:subjectId', async (req, res) => {
    const subject = await db.subjects.getByID(req.params.subjectId)

    if (subject === null) {
      res.sendStatus(404)
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(subject))
    }
  })

  app.get('/subjects/session/:session', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.subjects.getBySession(req.params.session)))
  })

  app.get('/subjects/difficulty/:difficulty', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.subjects.getByDifficulty(req.params.difficulty)))
  })

  app.post('/subjects', async (req, res) => {
    const subject = {
      session: req.body.session,
      number: req.body.number,
      link: req.body.link,
      difficulty: req.body.difficulty,
      flags: req.body.flags
    }

    // Checks that all required user fields are filled
    if (!Object.values(subject).every(element => element !== undefined)) {
      return res.sendStatus(400)
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.subjects.create(subject)))
  })

  app.put('/subjects/id/:subjectId', async (req, res) => {
    const subject = await db.subjects.getByID(req.params.subjectId)

    if (!subject) {
      return res.sendStatus(404)
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.subjects.modify({ ...subject, ...req.body })))
  })

  app.delete('/subjects/id/:subjectId', (req, res) => {
    db.subjects.delete(req.params.subjectId)
    res.sendStatus(204)
  })
}
