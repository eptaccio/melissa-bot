const { Router } = require('express')
const { getUpdates } = require('./controller')
const routes = Router()

routes.get('/getUpdates', getUpdates)

module.exports = {
  routes
}
