const emailTransporter = require('../config/email');

/**
 * Send an email
 *
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  await emailTransporter.sendMail({
    to,
    subject,
    text,
  });
};

/**
 * Send reset password email
 *
 * @param {string} name the name of the user
 * @param {string} code the code
 * @param {string} to the email address to which the code will be sent
 * @returns {Promise}
 */
const sendPasswordResetCode = async (name, code, to) => {
  const subject = 'Password Reset';
  const text = `Hi ${name},
  Use this code to reset your password:
  ${code}
  `;
  await sendEmail(to, subject, text);
};

module.exports = {
  sendEmail,
  sendPasswordResetCode,
};
