const bcrypt = require('bcryptjs')

exports.hash = async (string) => {
  if (!string) {
    throw Error('hash.util[hash] error - empty string')
  }

  const salt = 10

  return await bcrypt.hash(string, salt)
}

exports.compare = (inputString, hash) => {
  return bcrypt.compare(inputString, hash)
}
