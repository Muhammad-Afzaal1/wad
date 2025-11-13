const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
  bookID: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: ["Fiction", "Science", "History", "Technology", "Biography", "Comics"]
  },
  publishedYear: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 1900;
      },
      message: props => `${props.value} is not valid. Year must be 1900 or later.`
    }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Book = mongoose.model('Book', bookSchema, 'Book');
module.exports = Book;
