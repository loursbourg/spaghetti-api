const {createTransport} = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const application = require('./application');

const {smtpHost, smtpPort, smtpUsername, smtpPassword, useTLS, from} = application.email;

const smtpTransport = new SMTPTransport({
  host: smtpHost,
  port: smtpPort,
  secure: useTLS,
  from,
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});

const transport = createTransport(smtpTransport);

module.exports = transport;
