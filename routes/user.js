const Express     = require('express')
const UserRouter  = Express.Router()
const UserModel   = require('../models/User')
const bcrypt      = require('bcryptjs')
const Auth        = require('../middleware/auth');

// Show all users
UserRouter.get('/', async(req, res) => {
  try {
    const users = await UserModel.find()
    res.send(users)
  } catch(e) {
    res.status(400).send("Something went wrong")
  }
})

// Create a new user
UserRouter.post('/new', async(req, res) => {
  // Validate Email
  if(!req.body.email) {
    return res.status(400)
              .send('Email is required')
  }

  // Validate Password
  if(!req.body.password) {
    return res.status(400)
              .sent('Password is required')
  }

  // Instantiate User
  let user = UserModel({
    name: req.body.name,
    email: req.body.email
  })

  // Encrypt Password
  let salt      = bcrypt.genSaltSync(10)
  let hashed    = bcrypt.hashSync(req.body.password, salt)
  user.password = hashed

  // Save User
  try {
    user = await user.save()
    res.send(user)
  } catch(e) {
    res.status(400).send("Invalid Data")
  }
})

// UserRouter.patch('/updateadminstatus/:id', Auth, async (req, res)=>{
	// try {
		// let condition   = { _id:req.params.id }
		// let update      = { isAdmin: req.body.isAdmin }
		// let updatedUser = await UserModel.findOneAndUpdate(condition, update, {new:true})
		// res.send(updatedUser)
	// } catch(e) {
    // res.status(400)
       // .send('error')
	// }
// })


module.exports = UserRouter
