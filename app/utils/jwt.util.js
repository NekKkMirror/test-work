const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.config')

const createJwt = ({ payload }) => jwt.sign(payload, String(process.env.JWT_SECRET))

const isValidToken = (token) => {
  return jwt.verify(token, String(process.env.JWT_SECRET))
}

const attachCookieToResponse = ({
  res,
  user,
  refreshToken: { token: refreshToken, expiryDate: refreshTokenExpiryDate },
}) => {
  const accessTokenJWT = createJwt({ payload: { user } })
  const refreshTokenJWT = createJwt({ payload: { user, refreshToken } })

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: false,
    secure: true,
    signed: true,
    expires: new Date(Date.now() + authConfig.jwtAccessTokenExpiration),
    sameSite: 'none',
  })
  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: false,
    secure: true,
    signed: true,
    expires: refreshTokenExpiryDate,
    sameSite: 'none',
  })
}

module.exports = {
  isValidToken,
  attachCookieToResponse,
  createJwt,
}
