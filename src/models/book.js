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
    type: String,
  },
  img: {
    type: String,
  },
  link: {
    type: String,
  },
  buyLink: {
    type: String,
  },
  amount: {
    type: String,
  },
  currencyCode: {
    type: String,
  },
});

export const Book = mongoose.model('Book', bookSchema);
