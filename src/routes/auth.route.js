const express = require('express');
const {login} = require('../controllers/auth/login.controller');
const {register} = require('../controllers/auth/register.controller');
const {me} = require('../controllers/auth/account.controller');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const {forgotPassword} = require('../controllers/auth/forgotPassword.controller');
const {
  loginRequest,
  registerRequest,
  forgotPasswordRequest,
} = require('../validation/auth/auth.validator');

const router = express.Router();

router.post('/login', validate(loginRequest), login);
router.post('/register', validate(registerRequest), register);
router.post('/forgot-password', validate(forgotPasswordRequest), forgotPassword);
router.get('/me', auth, me);

module.exports = router;
