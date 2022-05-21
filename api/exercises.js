module.exports = (app, db) => {
  app.get('/subjects/id/:subjectId/exercises', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.exercises.getAllFromSubjectID(req.params.subjectId)))
  })

  app.get('/subjects/id/:subjectId/exercises/:exerciseNumber', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.exercises.getAllFromSubjectIDAndExerciseNumber(req.params.subjectId, req.params.exerciseNumber)))
  })

  app.get('/exercises', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.exercises.get()))
  })

  app.get('/exercises/id/:exerciseId', async (req, res) => {
    const exercise = await db.exercises.getByID(req.params.exerciseId)

    if (exercise === null) {
      res.send(404)
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(exercise))
    }
  })

  app.get('/exercises/type/:exerciseType', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.exercises.getByType(req.params.exerciseType)))
  })

  app.post('/exercises', async (req, res) => {
    // Checks that all required user fields are filled by first getting necessary fields
    const exercises = {
      type: req.body.type,
      topic: req.body.topic,
      question: req.body.question,
      asserts: req.body.asserts,
      program: req.body.program
    }

    if (!Object.values(exercises).every(element => element !== undefined)) {
      return res.sendStatus(400)
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.exercises.create({
      ...exercises,
      subject: req.body.subject,
      number: req.body.number
    })))
  })

  app.put('/exercises/id/:exerciseId', async (req, res) => {
    const exercise = await db.exercises.getByID(req.params.exerciseId)

    if (!exercise) {
      return res.sendStatus(404)
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.exercises.modify({ ...exercise, ...req.body })))
  })

  app.delete('/exercises/id/:exerciseId', (req, res) => {
    db.exercises.delete(req.params.exerciseId)
    res.sendStatus(204)
  })
}
