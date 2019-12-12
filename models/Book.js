const Mongoose  = require('mongoose')
const Schema    = Mongoose.Schema
const Moment    = require('moment')

const BookSchema = new Schema({
  date: {
    type: String,
    default: Moment(new Date()).format("MM/DD/YYYY")
  },
  artistId: {
    type: String,
    required: true
  },
  bookerId: {
    type: String,
    required: true
  },
  contactNumber: {
    type: Number,
    default: null
  },
  location: {
    type: String,
    required: true
  }
})

module.exports = Mongoose.model('Book', BookSchema)
