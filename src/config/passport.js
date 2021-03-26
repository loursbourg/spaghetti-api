const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const passport = require('passport');
const User = require('../models/user.model');
const application = require('./application');

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: application.jwt.secret,
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findOne({_id: jwtPayload.id});
      if (user) {
        return done(null, user);
      }
      return done('User not found', false);
    } catch (error) {
      return done(error, false);
    }
  }
);

passport.use('jwt', jwtStrategy);

module.exports = passport;
