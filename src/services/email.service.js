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
 * @param {object} user the user
 * @param {string} code the code
 * @returns {Promise}
 */
const sendPasswordResetCode = async (user, code) => {
  const {full_name, email} = user;
  const subject = 'Password Reset';
  const text = `Hi ${full_name},
  Use this code to reset your password:
  ${code}
  `;
  await sendEmail(email, subject, text);
};

module.exports = {
  sendEmail,
  sendPasswordResetCode,
};
