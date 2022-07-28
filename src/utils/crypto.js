const crypto = require('crypto');
const { promisify } = require('util');

const pbkdf2 = promisify(crypto.pbkdf2);

const hashPassword = async (password) => {
  const salt = process.env.SALT_KEY;
  const iterations = 10000;

  const hashBuffer = await pbkdf2(password, salt, iterations, 128, 'sha512');

  return hashBuffer.toString('hex');
};

module.exports = { hashPassword };
