const httpStatus = require('http-status');

const forgotPassword = async (req, res) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json({});
};

module.exports = {
  forgotPassword,
};
