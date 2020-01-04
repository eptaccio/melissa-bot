const mongoose = require('mongoose')

const { Schema } = mongoose

const ProducSchema = new Schema({
  link: String,
  name: String,
  img: String,
  price: String
})

const Product = mongoose.model('Product', ProducSchema)

module.exports = {
  Product
}
