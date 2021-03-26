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

userSchema.methods.matchOldPassword = async function (password) {
  const matched = await bcrypt.compare(password, this.password);
  return matched;
};

userSchema.virtual('full_name').get(function getFullNameAttribute() {
  return `${this.first_name} ${this.last_name}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
