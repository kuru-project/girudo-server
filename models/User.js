const Mongoose  = require('mongoose')
const Schema    = Mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Array,
    default: []
  }
})

module.exports = Mongoose.model('User', UserSchema)
