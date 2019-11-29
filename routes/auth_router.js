const express = require('express');
const AuthRouter = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config')

AuthRouter.post('/login', async(req,res)=>{
	let user = await UserModel.findOne({email:req.body.email});

	if(!user) return res.status(400).send('Email or password is incorrect');

	let matched = await bcrypt.compare(req.body.password, user.password);

	if(!matched) return res.status(400).send('Email or password is incorrect');

	const token = jwt.sign({
		name: user.name,
		id: user._id,
		isAdmin: user.isAdmin
	}, config.secret);

	let loggedInUser = {
		token: token,
		user: {
			email: user.email,
			id: user._id,
			name: user.name,
			isAdmin: user.isAdmin
		}
	}

	res.header('x-auth-token', token).send(loggedInUser);
})

module.exports = AuthRouter;