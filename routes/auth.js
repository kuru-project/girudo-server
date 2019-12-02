const Express     = require('express')
const AuthRouter  = Express.Router()
const bcrypt      = require('bcryptjs')
const UserModel   = require('../models/User')
const jwt         = require('jsonwebtoken')
const Config      = require('../config')

AuthRouter.post('/login', async(req,res)=>{
  let user = await UserModel.findOne({ email: req.body.email })

  if(!user) {
    return res.status(400).send('Email or password is incorrect')
  }

  let matched = await bcrypt.compare(req.body.password, user.password)

  if(!matched) {
    return res.status(400).send('Email or password is incorrect')
  }

  const token = jwt.sign({
    name: user.name,
    id: user._id,
    isAdmin: user.isAdmin
  }, Config.secret)

  let loggedInUser = {
    token: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isArtist: user.isArtist,
      skill: user.skill,
      contactNumber: user.contactNumber,
      name: user.name
    }
  }

  res.header('x-auth-token', token).send(loggedInUser)
})

module.exports = AuthRouter
