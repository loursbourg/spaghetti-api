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

module.exports = {
  loginRequest,
  registerRequest,
};
