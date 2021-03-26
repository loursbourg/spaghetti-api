const httpStatus = require('http-status');

const me = (req, res) => {
  res.status(httpStatus.OK).json({
    data: req.user,
  });
};

module.exports = {
  me,
};
