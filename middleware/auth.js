const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) =>{
	const token = req.header('x-auth-token');

	if(!token) return res.status(401).send('Access Denied. No token provided');

 	try{
 		let payload = jwt.verify(token, config.secret);
 		req.user = payload;
 		next();
 	}catch(e){
 		res.status(400).send("Invalid Token");
 	}
}