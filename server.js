const Express   = require("express")
const App       = Express()
const Mongoose  = require("mongoose")
const Config    = require("./config");

App.use(Express.urlencoded({ extended: false }))
App.use(Express.json())

// Mongoose
Mongoose.connect("mongodb+srv://admin:dgARDcW2LXxpw7BN@cluster0-hshx4.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser:    true, 
  useUnifiedTopology: true, 
  useFindAndModify:   false,
  useCreateIndex:     true
}).then(() => {
  console.log("Remote Database Connection Established")
})

// Config PORT
App.listen(Config.port, () => {
	console.log(`Listening on Port localhost:${Config.port}`)
})

//Router
const artists = require("./routes/artists")
const users   = require("./routes/users")
const books   = require("./routes/books")
const auth    = require("./routes/auth")

App.use('/artist', artists)
App.use('/user', users)
App.use('/book', books)
App.use('/', auth)
