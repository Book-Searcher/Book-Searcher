const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  categories: {
    type: String,
  },
  language: {
    type: String,
  },
  pageCount: {
    type: Number,
  },
  img: {
    type: String,
  },
  link: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const Book = mongoose.model('Book', bookSchema);
