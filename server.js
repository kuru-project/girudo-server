const Express   = require("express")
const App       = Express()
const Mongoose  = require("mongoose")
const Config    = require("./config")
const cors      = require("cors")
const Stripe    = require('stripe')('sk_test_OuulK18SmBVkvBMb5qji5Gl5006cS2W9S1')
const PORT      = process.env.PORT || Config.port


App.use(cors())

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
App.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`)
})

//Router
const user    = require("./routes/user")
const admin   = require("./routes/admin")
const artist  = require("./routes/artist")
const book    = require("./routes/book")
const auth    = require("./routes/auth")

App.use('/user', user)
App.use('/admin', admin)
App.use('/artist', artist)
App.use('/book', book)
App.use('/', auth)

App.post('/charge', (req, res) => {
  try {
    Stripe.customers.create({
      email: "aj.sabandal@gmail.com",
      description: "some payments",
      source: "tok_visa"
    }).then(customers => {
      Stripe.charges.create({
        amount: "25000",
        currency: "php",
        source: "tok_visa",
        description: "some charge"
      })
    })
  } catch(e) {

  }
})
