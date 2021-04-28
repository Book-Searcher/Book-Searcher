const mongoose = require('mongoose');

const favListSchema = new mongoose.Schema({
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
});

export const FavList = mongoose.model('FavList', favListSchema);
