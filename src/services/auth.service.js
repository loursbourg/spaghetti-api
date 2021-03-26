const jwt = require('jsonwebtoken');
const application = require('../config/application');
const User = require('../models/user.model');

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

/**
 * Generate a JWT for a given user
 *
 * @param {User} user
 */
const generateJwt = user => {
  const payload = {
    id: user._id,
    role: user.role,
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      application.jwt.secret,
      {
        expiresIn: application.jwt.accessTokenExpirationMinutes * 60,
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  attempt,
  generateJwt,
};
