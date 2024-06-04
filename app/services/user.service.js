const db = require('../models')

const { user: User } = db

exports.create = async (registerDto) => {
  await User.create(registerDto)
}

exports.findOne = async (findOptions) => {
  return await User.findOne(findOptions)
}

exports.findAndCountAll = async (findAndCountAllOptions) => {
  return await User.findAndCountAll(findAndCountAllOptions)
}

exports.findByPk = async (pk) => {
  return await User.findByPk(pk)
}

exports.update = async (...updateOptions) => {
  return await User.update(...updateOptions)
}
