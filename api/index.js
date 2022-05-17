import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.redirect('/docs')
})

// Prise en charge des erreurs 404
app.use((req, res, next) => {
  res.sendStatus(404)
})

export default {
  path: '/api',
  handler: app
}
