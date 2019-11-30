const Express     = require('express')
const UserRouter  = Express.Router()
const UserModel   = require('../models/User')
const bcrypt      = require('bcryptjs')
const Auth        = require('../middleware/auth');

UserRouter.post('/new', async(req, res)=>{
  if(!req.body.email) {
    return res.status(400)
              .send('Email is required')
  }
  if(!req.body.password) {
    return res.status(400)
              .sent('Password is required')
  }

  let user = UserModel({
    name: req.body.name,
    email: req.body.email
  })

  let salt      = bcrypt.genSaltSync(10)
  let hashed    = bcrypt.hashSync(req.body.password, salt)
  user.password = hashed

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
