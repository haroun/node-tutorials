const {Schema, model} = require('mongoose')

const Gadget = new Schema({
  name: String,
  releaseDate: Date,
  byCompany: String,
  price: Number
})

module.exports = model('Gadget', Gadget)
