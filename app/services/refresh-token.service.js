const db = require('../models')

const { refreshToken: RefreshToken } = db

exports.findOne = async (findOptions) => {
  return await RefreshToken.findOne(findOptions)
}

exports.verifyExpiration = (existingToken) => {
  return RefreshToken.verifyExpiration(existingToken)
}

exports.createToken = async (createTokenData) => {
  return await RefreshToken.createToken(createTokenData)
}
