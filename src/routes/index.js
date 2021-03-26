require('express-async-errors');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth.route');
const {errorMiddleware, errorHandler} = require('../middleware/errors');

const router = app => {
  app.use(cors());
  app.use(express.json({limit: '50mb'}));

  app.use('/api', authRoutes);
  app.use(errorMiddleware);
  app.use(errorHandler);
};

module.exports = router;
