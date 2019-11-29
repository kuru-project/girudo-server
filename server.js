//Express
const express = require("express");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


//Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:dgARDcW2LXxpw7BN@cluster0-hshx4.mongodb.net/test?retryWrites=true&w=majority",{
	useNewUrlParser:true, 
	useUnifiedTopology:true, 
	useFindAndModify:false,
	useCreateIndex: true
}).then(()=>{
	console.log("Remote Database Connection Established");
});

//config PORT
const config = require("./config");
app.listen(config.port, () => {
	console.log(`Listening on Port ${config.port}`);
});

//Router
const artists = require("./routes/artist_router");
app.use('/admin', artists);

const users = require("./routes/users_router");
app.use('/admin', users);

const auth = require("./routes/auth_router");
app.use('/', auth);
