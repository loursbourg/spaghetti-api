const Joi = require('joi');

const loginRequest = Joi.object({
  email: Joi.string().required().min(1).max(512).email(),
  password: Joi.string().required().min(1).max(512),
});

const registerRequest = Joi.object({
  first_name: Joi.string().required().min(1).max(512),
  last_name: Joi.string().required().min(1).max(512),
  email: Joi.string().required().min(1).max(512).email(),
  password: Joi.string().required().min(1).max(512),
});

const forgotPasswordRequest = Joi.object({
  email: Joi.string().required().min(1).max(512).email(),
});

const resetPasswordRequest = Joi.object({
  code: Joi.string().required().min(1).max(512),
  password: Joi.string().required().min(1).max(512),
  password_confirmation: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({'any.only': '{{#label}} does not match'}),
});

module.exports = {
  loginRequest,
  registerRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
};
