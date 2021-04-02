const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const computeHash = async clearText => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(clearText, salt);
};

const generateHash = () => crypto.randomBytes(32).toString('hex');

module.exports = {
  compare: bcrypt.compare,
  computeHash,
  generateHash,
};
