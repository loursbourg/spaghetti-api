const httpStatus = require('http-status');
const User = require('../models/user.model');
const {Role} = require('../config/roles');
const ApiError = require('../utils/ApiError');
const cryptoService = require('./crypto.service');

/**
 * Create a new user
 *
 * @param {Object} userInformations
 * @returns {Promise<User>} the newly created user
 */
const createUser = async userInformations => {
  // eslint-disable-next-line camelcase
  const {first_name, last_name, email, password} = userInformations;
  const alreadyRegistered = await User.findOne({email});
  if (alreadyRegistered) {
    throw new ApiError(httpStatus.IM_USED, 'User already registered.');
  }
  const hashedPassword = await cryptoService.computeHash(password);
  const user = await new User({
    first_name,
    last_name,
    email,
    role: Role.USER,
    password: hashedPassword,
  }).save();
  return user;
};

/**
 * Update the password of a given user
 *
 * @param {String} userId
 * @param {String} newPassword
 * @returns
 */
const updateUserPasswordById = async (userId, newPassword) => {
  const hashedPassword = await cryptoService.computeHash(newPassword);
  await User.updateOne({_id: userId}, {$set: {password: hashedPassword}});
  return true;
};

/**
 *
 * @param {String} email
 * @returns {Promise<any>} User
 */
const findByEmail = async email => {
  const user = await User.findOne({email});
  return user || null;
};

module.exports = {
  findByEmail,
  createUser,
  updateUserPasswordById,
};
