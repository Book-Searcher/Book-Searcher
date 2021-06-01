const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

userSchema.statics.checkCredentials = async (user) => {
  const email = user.email;
  const password = user.password;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw new Error('Wrong email');
  }
  // todo: salt?
  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    throw new Error('Wrong password');
  }
  return foundUser;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export const User = mongoose.model('User', userSchema);
