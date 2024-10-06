const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
  },
  bookPrice: {
    type: String,
  },

  isbnNumber: {
    type: Number,
  },

  authorName: {
    type: String,
  },

  publishDate: {
    type: Date,
  },
  publication: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
