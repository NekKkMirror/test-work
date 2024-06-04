const { attachCookieToResponse, createJwt } = require('../utils/jwt.util')
const authConfig = require('../config/auth.config')
const UserService = require('../services/user.service')
const RefreshTokenService = require('../services/refresh-token.service')
const { hash, compare } = require('../utils/hash.util')

exports.register = async (req, res) => {
  const { password, ...userData } = req.body
  const hashedPassword = await hash(password)
  const registerDto = { ...userData, password: hashedPassword }

  await UserService.create(registerDto)

  return res.status(201).json({
    message: 'User successfully created',
  })
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  const { dataValues: user } = await UserService.findOne({ where: { email } })

  if (!user) {
    return res.status(401).json({
      message: 'Invalid Credentials',
    })
  }

  const { password: hashedPassword } = user
  const isPasswordCorrect = await compare(password, hashedPassword)

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: 'Wrong password',
    })
  }

  const { id } = user
  let refreshToken = ''

  const existingToken = await RefreshTokenService.findOne({
    where: {
      userId: id,
    },
  })

  if (existingToken) {
    const isTokenDead = RefreshTokenService.verifyExpiration(existingToken)

    if (isTokenDead) {
      return res.status(403).json({
        message: 'Invalid Credentials',
      })
    }

    refreshToken = existingToken

    attachCookieToResponse({
      res,
      user: {
        id,
      },
      refreshToken: {
        token: refreshToken.token,
        expiryDate: refreshToken.expiryDate,
      },
    })

    return res.status(200).json({
      id,
    })
  }

  refreshToken = await RefreshTokenService.createToken({
    id,
  })

  attachCookieToResponse({
    res,
    user: {
      id,
    },
    refreshToken: {
      token: refreshToken.token,
      expiryDate: refreshToken.expiryDate,
    },
  })

  return res.status(200).json({
    user: id,
  })
}

exports.logout = async (req, res) => {
  const { id } = req.user

  const token = await RefreshTokenService.findOne({
    where: {
      userId: id,
    },
  })

  if (!token) {
    return res.status(404).json({
      message: 'Token not found',
    })
  }

  res.cookie('accessToken', 'logout', {
    httpOnly: false,
    secure: true,
    signed: true,
    expires: new Date(Date.now()),
    sameSite: 'none',
  })

  res.cookie('refreshToken', 'logout', {
    httpOnly: false,
    secure: true,
    signed: true,
    expires: new Date(Date.now()),
    sameSite: 'none',
  })

  return res.status(200).json({
    msg: 'user logged out!',
  })
}

exports.newToken = async (req, res) => {
  const { id } = req.user

  const accessTokenJWT = createJwt({ payload: { user: { id } } })

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: false,
    secure: true,
    signed: true,
    expires: new Date(Date.now() + authConfig.jwtAccessTokenExpiration),
    sameSite: 'none',
  })

  return res.status(201).json({
    message: 'Access token successful created',
  })
}
