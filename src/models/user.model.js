const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {ALL_ROLES, Role} = require('../config/roles');

/**
 * User model schema
 *
 */
const userSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        Object.assign(ret, {
          _id: undefined,
          __v: undefined,
          password: undefined,
        });
      },
    },
  }
);

/**
 * Returns whether the password matches the user's current password
 *
 * @this User
 */
userSchema.methods.matchOldPassword = async function (password) {
  const matched = await bcrypt.compare(password, this.password);
  return matched;
};

userSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

/**
 * User model
 *
 * @typedef User
 * @property {string} password
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
