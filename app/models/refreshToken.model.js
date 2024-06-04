const config = require('../config/auth.config')
const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, SequelizeDeclaration) => {
  const RefreshToken = sequelize.define('refreshToken', {
    token: {
      type: SequelizeDeclaration.STRING,
    },
    expiryDate: {
      type: SequelizeDeclaration.DATE,
    },
  })

  RefreshToken.createToken = async function (user) {
    const expiredAt = new Date()

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshTokenExpiration)

    const token = uuidv4()

    let refreshToken = await this.create({
      token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    })

    return refreshToken.token
  }

  RefreshToken.verifyExpiration = (token) => {
    const expiryDate = new Date(token.expiryDate)

    return new Date().getTime() > expiryDate.getTime()
  }

  return RefreshToken
}
