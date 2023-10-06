const crypto = require('crypto');

const generateSHA256 = (val) => {
  return crypto.createHash('sha256').update(val).digest('hex')
}

module.exports.hashValue = generateSHA256;
