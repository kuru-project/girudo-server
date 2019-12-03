const Mongoose  = require('mongoose')
const Schema    = Mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isArtist: {
    type: Boolean,
    default: false
  },
  skill: {
    type: String
  },
  coverPhoto: {
    type: String
  },
  profilePhoto: {
    type: String,
    default: 'https://i.imgur.com/iwh1de9.jpg'
  },
  contactNumber: {
    type: Number,
    default: null
  }
})

module.exports = Mongoose.model('User', UserSchema)
