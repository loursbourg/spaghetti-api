const httpStatus = require('http-status');
const emailService = require('../../services/email.service');
const tokenService = require('../../services/token.service');

const forgotPassword = async (req, res) => {
  const {email} = req.body;
  const {user, resetToken} = await tokenService.generatePasswordResetToken(email);
  await emailService.sendPasswordResetCode(user, resetToken);
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    success: true,
  });
};

module.exports = {
  forgotPassword,
};
