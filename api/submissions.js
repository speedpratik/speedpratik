module.exports = (app, db) => {
  app.get('/users/:userId/submissions', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.submissions.getByUser(req.params.userId)))
  })

  app.get('/users/:userId/submissions/subject/:subjectId', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.submissions.getByUserOnSubject(req.params.userId, req.params.subjectId)))
  })

  app.get('/users/:userId/submissions/exercise/:exerciseId', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.submissions.getByUserOnExercise(req.params.userId, req.params.exerciseId)))
  })

  app.get('/subjects/:subjectId/submissions', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.submissions.getBySubject(req.params.subjectId)))
  })

  app.get('/exercises/:exerciseId/submissions', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.submissions.getByExercise(req.params.exerciseId)))
  })

  app.get('/submissions/id/:submissionId', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.submissions.getByID(req.params.submissionId)))
  })

  app.post('/submissions', async (req, res) => {
    const submission = {
      user: req.body.user,
      start_date: req.body.start_date,
      type: req.body.type,
      programs: JSON.stringify(req.body.programs)
    }

    // Checks that all required user fields are filled and that there is a subject or an exercise defined but not both
    if (Object.values(submission).includes(undefined) ||
      (req.body.subject === undefined && req.body.exercise === undefined) ||
      (req.body.subject !== undefined && req.body.exercise !== undefined)) {
      return res.sendStatus(400)
    }

    let submissionNumber
    if (req.body.subject) {
      submissionNumber = await db.submissions.countSubmissionsByUserOnSubject(req.body.user, req.body.subject) + 1
    } else {
      submissionNumber = await db.submissions.countSubmissionsByUserOnExercise(req.body.user, req.body.exercise) + 1
    }

    const submitDate = Date.now()
    const xpAward = 300 * Math.exp(((-2 * (submitDate - submission.start_date) / 60) / 60) / 1000)

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(await db.submissions.create({
      ...submission,
      subject: req.body.subject || null,
      exercise: req.body.exercise || null,
      submit_date: submitDate,
      number: submissionNumber,
      xp_award: xpAward
    })))
  })

  app.delete('/submissions/id/:submissionId', (req, res) => {
    db.subjects.delete(req.params.submissionId)
    res.sendStatus(204)
  })
}
