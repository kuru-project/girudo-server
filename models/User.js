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
  roles: {
    type: Array,
    default: []
  },
  skills: {
    type: Array,
    default: []
  }
})

module.exports = Mongoose.model('User', UserSchema)
