const mongoose = require('mongoose')

const initialize = ({uri}) => {
  mongoose.connect(uri, {useNewUrlParser: true})
  mongoose.connection.once('open', () => {
    console.log('connected to database')
  })
}

module.exports.initialize = initialize
