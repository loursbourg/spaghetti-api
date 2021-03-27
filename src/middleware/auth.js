const httpStatus = require('http-status');
const passport = require('passport');
const ApiError = require('../utils/ApiError');

const auth = (req, res, next) =>
  passport.authenticate('jwt', {session: false}, (error, user, info) => {
    if (error || info) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthenticated');
    } else {
      req.user = user;
      next();
    }
  })(req, res);

module.exports = auth;
