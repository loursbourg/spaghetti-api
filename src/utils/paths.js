const path = require('path');

const storagePath = subDirectory => path.join(__dirname, '../storage', subDirectory);

module.exports = {
  storagePath,
};
