const httpStatus = require('http-status');
const userService = require('../../services/user.service');
const tokenService = require('../../services/token.service');

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  const authTokens = await tokenService.generateAuthTokens(user);
  return res.status(httpStatus.CREATED).json({
    user,
    access_token: authTokens.access.token,
    refresh_token: authTokens.refresh.token,
  });
};

module.exports = {
  register,
};
