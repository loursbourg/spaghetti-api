const winston = require('winston');
const {storagePath} = require('../utils/paths');
const application = require('./application');

const consoleTransport = new winston.transports.Console({
  format: winston.format.simple(),
});

const fileTransport = new winston.transports.File({
  handleExceptions: true,
  filename: storagePath('logs/app.log'),
});

const transports = [];
transports.push(fileTransport);

if (application.env !== 'production') {
  transports.push(consoleTransport);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports,
});

process.on('uncaughtException', exception => {
  logger.error(exception);
});

module.exports = logger;
