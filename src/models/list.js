const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book',
      },
    },
  ],
  type: {
    type: String,
    required: true,
  },
});

export const List = mongoose.model('List', listSchema);
