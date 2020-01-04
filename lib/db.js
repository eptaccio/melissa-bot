const mongoose = require('mongoose')
const { config } = require('../config')

async function connect () {
  return mongoose.connect(config.db_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}

module.exports = {
  db: { connect }
}
