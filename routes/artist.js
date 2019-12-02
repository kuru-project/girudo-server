const Express     = require('express')
const UserRouter  = Express.Router()
const UserModel   = require('../models/User')

// Show all admins
UserRouter.get('/', async(req, res) => {
  try {
    const users = await UserModel.find({ isArtist: true })
    res.send(users)
  } catch(e) {
    res.status(400)
       .send("Something went wrong")
  }
})

module.exports = UserRouter
