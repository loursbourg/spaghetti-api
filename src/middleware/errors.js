const httpStatus = require('http-status');
const application = require('../config/application');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

// it is important here to not remove the 'next'
// variable as doing so will express will not
// treat the middleware as an error handler
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  logger.info(error);
  let trace;
  if (application.env !== 'production') {
    trace = error.message;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      message: error.message,
      code: error.statusCode,
    });
    return;
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: 'Server error',
    error: trace,
  });
};

const errorMiddleware = (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    message: 'Resource not found',
  });
};

module.exports = {
  errorMiddleware,
  errorHandler,
};
