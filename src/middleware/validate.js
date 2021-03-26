const httpStatus = require('http-status');
const {serializeErrors} = require('../utils/errors');

const validate = validationSchema => (req, res, next) => {
  const {error} = validationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: 'The given data was invalid',
      errors: serializeErrors(error.details),
    });
  }
  return next();
};

module.exports = validate;
