const express = require('express')
const { routes } = require('./modules/products/routes')

const app = express()

app.use(routes)

app.get('/', (req, res) => {
  res.send('ok')
})

app.listen(3000, () =>
  console.log('app running on 3000'))
