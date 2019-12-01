const Express     = require('express')
const BookRouter  = Express.Router()
const BookModel   = require('../models/Book')
const Auth        = require('../middleware/auth');

// Show all bookings
BookRouter.get('/', async(req, res) => {
  try {
    const books = await BookModel.find()
    res.send(books)
  } catch(e) {
    res.status(400)
       .send("Something went wrong")
  }
})

// Create a new booking
BookRouter.post('/new', Auth, async(req, res) => {

})

// Delete booking
BookRouter.delete('/:id/destroy', Auth, async(req, res) => {
  try {
    const deleteBook =  await BookModel.findByIdAndDelete(req.params.id)
    res.send(deleteBook)
  } catch(e) {
    res.status(400)
       .send("Something went wrong")
  }
})

// Update user
BookRouter.patch('/:id/update', Auth, async (req, res)=>{
  try {
    let book        = { _id: req.params.id }
    let updateBook  = await BookModel.findOneAndUpdate(book, req.body, { new: true })
    res.send(updateBook)
  } catch(e) {
    res.status(400)
       .send("Something went wrong")
  }
})

module.exports = BookRouter
