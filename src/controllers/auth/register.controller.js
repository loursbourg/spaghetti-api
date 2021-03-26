const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const User = require('../../models/user.model');
const authService = require('../../services/auth.service');
const {Role} = require('../../config/roles');

const register = async (req, res) => {
  // eslint-disable-next-line camelcase
  const {first_name, last_name, email, password} = req.body;
  const alreadyRegistered = await User.findOne({email});
  if (alreadyRegistered) {
    return res.status(httpStatus.IM_USED).json({
      message: 'User already registered.',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await new User({
    first_name,
    last_name,
    email,
    role: Role.USER,
    password: hashedPassword,
  }).save();

  const accessToken = await authService.generateJwt(user);
  return res.status(httpStatus.OK).json({
    user,
    access_token: accessToken,
  });
};

module.exports = {
  register,
};
