const httpStatus = require('http-status');
const authService = require('../../services/auth.service');

const login = async (req, res) => {
  const {email, password} = req.body;
  const user = await authService.attempt(email, password);
  if (user) {
    const accessToken = await authService.generateJwt(user);

    res.status(httpStatus.OK).json({
      user,
      accessToken,
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
