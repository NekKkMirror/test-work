const { isValidToken, attachCookieToResponse } = require('../utils/jwt.util')
const RefreshTokenService = require('../services/refresh-token.service')
const { asyncMiddleware } = require('./async.middleware')

exports.authenticateUser = asyncMiddleware(async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies

  if (accessToken) {
    const payload = isValidToken(accessToken)
    req.user = payload.user

    return next()
  }

  const payload = isValidToken(refreshToken)
  const existingToken = await RefreshTokenService.findOne({
    where: {
      userId: payload.user.id,
      token: payload.refreshToken,
    },
  })
  const isTokenDead = RefreshTokenService.verifyExpiration(existingToken)

  if (!existingToken || isTokenDead) {
    return res.status(401).json({
      message: 'Authentication Invalid',
    })
  }

  attachCookieToResponse({
    res,
    user: payload.user,
    refreshToken: {
      token: existingToken.token,
      expiryDate: existingToken.expiryDate,
    },
  })

  req.user = payload.user

  return next()
})
