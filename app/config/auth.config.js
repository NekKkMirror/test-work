module.exports = {
  jwtRefreshTokenExpiration: Number(process.env.JWT_REFRESH_TOKEN_EXPIRY),
  jwtAccessTokenExpiration: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY), // 10 minutes
}
