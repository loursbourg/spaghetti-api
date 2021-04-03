const httpStatus = require('http-status');
const tokenService = require('../../services/token.service');
const userService = require('../../services/user.service');

const resetPassword = async (req, res) => {
  const {password, code} = req.body;
  const {token} = await tokenService.verifyPasswordResetToken(code);
  const result = await userService.updateUserPasswordById(token.user._id, password);
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    success: result,
  });
};

module.exports = {
  resetPassword,
};
