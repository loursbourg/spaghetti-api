const express = require('express');
const mongoose = require('mongoose');
const application = require('./config/application');
const logger = require('./config/logger');
const composeRoutes = require('./routes');

const app = express();
composeRoutes(app);

mongoose
  .connect(application.database.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info(`Database connection established successfully.`);
  });

const server = app.listen(application.port, () => {
  logger.info(`Server is running on port: ${application.port}`);
});

module.exports = server;
