const User = require('../models/user.model');
// const emailService = require('./email.service');
const userService = require('./user.service');
const tokenService = require('./token.service');

/**
 * Login with username and password
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User|null>}
 */
const attempt = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    return null;
  }
  const hasMatched = await user.matchOldPassword(password);
  return hasMatched ? user : null;
};

const resetPassword = async (userId, resetCode, password) => {
  const passwordResetToken = await tokenService.verifyPasswordResetToken(userId, resetCode);
  await userService.updateUserPasswordById(userId, password);
  await tokenService.destroyTokenById(passwordResetToken._id);
  return true;
};

module.exports = {
  attempt,
  resetPassword,
};
