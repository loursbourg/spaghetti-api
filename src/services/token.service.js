const JWT = require('jsonwebtoken');
const {addMinutes, addDays} = require('date-fns');
const {isPast} = require('date-fns');
const application = require('../config/application');
const {Token, TokenType} = require('../models/token.model');
const cryptoService = require('./crypto.service');

/**
 * Generate a JWT for a given user
 *
 * @param {String} userId
 */
const generateToken = userId => {
  const payload = {
    sub: userId,
  };
  const {accessTokenExpirationMinutes} = application.jwt;
  const expiresIn = accessTokenExpirationMinutes * 60;
  return JWT.sign(payload, application.jwt.secret, {
    expiresIn,
  });
};

const saveToken = (body, userId, expiresAt, type) => {
  const token = Token.create({
    body,
    expiresAt,
    type,
    user: userId,
  });
  return token;
};

const destroyTokenById = async tokenId => {
  await Token.deleteOne({_id: tokenId});
  return true;
};

const blackList = async tokenId => {
  await Token.findOneAndUpdate(
    {_id: tokenId},
    {
      $set: {
        blacklisted: true,
      },
    }
  );
  return true;
};

const destroyToken = async tokenBody => {
  await Token.deleteOne({body: tokenBody});
  return true;
};

/**
 * Generate auth tokens for a given user
 *
 * @param user
 * @returns {Promise<Object>} Auth tokens
 */
const generateAuthTokens = async user => {
  const {accessTokenExpirationMinutes, refreshTokenExpirationDays} = application.jwt;
  const accessToken = generateToken(user._id);
  const accessTokenExpiresAt = addMinutes(new Date(), accessTokenExpirationMinutes);

  const refreshToken = cryptoService.generateHash();
  const refreshTokenExpiresAt = addDays(new Date(), refreshTokenExpirationDays);
  await saveToken(refreshToken, user._id, refreshTokenExpiresAt, TokenType.REFRESH);
  return {
    access: {
      token: accessToken,
      expires_at: accessTokenExpiresAt,
    },
    refresh: {
      token: refreshToken,
      expires_at: refreshTokenExpiresAt,
    },
  };
};

const verifyPasswordResetToken = async (userId, passwordResetCode) => {
  const hashedResetCode = cryptoService.computeHash(passwordResetCode);
  const token = await Token.findOne({user: userId, body: hashedResetCode});
  if (!token) {
    throw new Error('Invalid password reset token');
  }
  const hasExpired = isPast(token.expiresAt);
  if (hasExpired) {
    throw new Error('Invalid or expired password reset token');
  }
  return token;
};

module.exports = {
  saveToken,
  generateToken,
  generateAuthTokens,
  verifyPasswordResetToken,
  destroyToken,
  destroyTokenById,
  blackList,
};
