const Mongoose  = require('mongoose')
const Schema    = Mongoose.Schema

const BookSchema = new Schema({
  status: {
    type: String,
    default: "Pending"
  },
  timestamp: {
    type: Number,
    required: true
  },
  artist_id: {
    type: String,
    required: true
  },
  booker_id: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
})

module.exports = Mongoose.model('Book', BookSchema)
