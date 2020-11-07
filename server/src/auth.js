// @flow

const crypto = require('crypto');

// Returns salt of given length
function makeSalt(length: number) {
  if (length == null) {
    length = 12;
  } else if (typeof length !== 'number') {
    throw new Error('Length must be an integer');
  }
  return crypto.randomBytes(Math.ceil(length)).toString('hex').slice(0, length);
}

// Helper function that does the actualt hashing
function hasher(password: string, salt: string) {
  let hash = crypto.createHmac('sha512', salt);
  hash.update(password);

  let value = hash.digest('hex');
  return {
    salt: salt,
    hashedPassword: value,
  };
}

// Hashes a password with given salt
function hashPassword(password: string, salt: string) {
  if (password == null || salt == null) {
    throw new Error('Password and Salt must be provided');
  }
  if (typeof password !== 'string' || typeof salt !== 'string') {
    throw new Error('Password and Salt must be strings');
  }
  return hasher(password, salt);
}

export default { makeSalt, hashPassword };
