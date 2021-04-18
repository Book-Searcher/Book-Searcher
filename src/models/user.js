const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid.');
      }
    },
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
  },
});

userSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'owner',
});

export const User = mongoose.model('User', userSchema);
