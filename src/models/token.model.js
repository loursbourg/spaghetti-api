const mongoose = require('mongoose');

const TokenType = {
  REFRESH: 'refresh',
  PASSWORD_RESET: 'password_reset',
  EMAIL_VERIFICATION: 'email_verification',
};

const TOKEN_TYPES = Object.values(TokenType);

const tokenSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: TOKEN_TYPES,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

/**
 *
 * @typedef Token
 * @property {String} body
 */
const Token = mongoose.model('Token', tokenSchema);

module.exports = {
  Token,
  TokenType,
};
