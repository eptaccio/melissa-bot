const { db } = require('../../lib/db')
const { notifyNewProducts } = require('./notifyNewProducts')

async function getUpdates (req, res) {
  try {
    await db.connect()
    await notifyNewProducts()
    res.send({ message: 'building' })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'see the logs :(' })
  }
}

module.exports = {
  getUpdates
}
