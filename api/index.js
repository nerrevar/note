import express from 'express'
import cookieParser from 'cookie-parser'
import history from 'connect-history-api-fallback'

import dbFunctions from './db.functions'

const app = express()
app.use(history())
app.use(express.static('dist'))
app.use(express.json())
app.use(cookieParser())

app.post('/login', async (req, res) => {
  const result = await dbFunctions.signIn(req.body.login, req.body.password)
  if (result.status) {
    res.cookie('login', req.body.login, { sameSite: true })
    res.cookie('name', result.user.name, { sameSite: true })
  }
  if (result.status)
    res.send({
      status: true,
      notes: result.user.notes,
    })
  else
    res.send(result)
})

app.post('/note_list', async (req, res) => {
  const result = await dbFunctions.fetchNotes(req.body.login)
  res.send(result)
})

app.post('/add_note', async (req, res) => {
  const result = await dbFunctions.addNote(req.body.login, req.body.title, req.body.text)
  res.send(result)
})

app.use((req,res) => {
  res.status(200).end()
})

app.listen(3000)
