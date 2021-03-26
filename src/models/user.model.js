const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {ALL_ROLES, Role} = require('../config/roles');

/**
 * User model schema
 *
 */
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  role: {
    type: String,
    enum: ALL_ROLES,
    default: Role.USER,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

userSchema.methods.matchOldPassword = async password => {
  const user = this;
  const matched = await bcrypt.compare(password, user.password);
  return matched;
};

module.exports = User;
