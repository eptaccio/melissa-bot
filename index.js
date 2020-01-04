const { db } = require('./db')
const { getUpdates } = require('./getUpdates')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/getUpdates', async (req, res) => {
  try {
    await db.connect()
    await getUpdates()
    res.send({ message: 'building' })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'see the logs :(' })
  }
})

app.listen(3000, () =>
  console.log('app running on 3000'))
