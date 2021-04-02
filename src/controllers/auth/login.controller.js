const httpStatus = require('http-status');
const authService = require('../../services/auth.service');
const tokenService = require('../../services/token.service');

const login = async (req, res) => {
  const {email, password} = req.body;
  const user = await authService.attempt(email, password);
  if (user) {
    const authTokens = await tokenService.generateAuthTokens(user);

    res.status(httpStatus.OK).json({
      user,
      access_token: authTokens.access.token,
      refresh_token: authTokens.refresh.token,
    });
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Invalid credentials',
    });
  }
};

module.exports = {
  login,
};
