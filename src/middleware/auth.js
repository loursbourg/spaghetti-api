const httpStatus = require('http-status');
const passport = require('passport');

const auth = (req, res, next) =>
  passport.authenticate('jwt', {session: false}, (error, user, info) => {
    if (error || info) {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Unauthenticated',
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res);

module.exports = auth;
