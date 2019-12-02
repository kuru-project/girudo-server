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
  // Validate Timestamp
  if(!req.body.timestamp) {
    return res.status(400)
              .send('Timestamp is required')
  }

  // Validate User ID
  if(!req.body.user_id) {
    return res.status(400)
              .send('User ID is required')
  }

  // Validate Location
  if(!req.body.location) {
    return res.status(400)
              .send('Location is required')
  }

  // Instantiate Book
  let book = BookModel({
    timestamp: req.body.timestamp,
    user_id: req.body.user_id,
    location: req.body.location
  })

  // Save Booking
  try {
    book = await book.save()
    res.send(book)
  } catch(e) {
    res.status(400)
       .send("Something went wrong")
  }
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
