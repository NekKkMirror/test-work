const { register, newToken, logout, login } = require('../controllers/auth.controller')
const { authenticateUser } = require('../middleware/authentication.middleware')
const { asyncMiddleware } = require('../middleware/async.middleware')
const { validate } = require('../validate')
const { registerSchema } = require('../validate/auth/register.schema')
const { loginSchema } = require('../validate/auth/login.schema')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    next()
  })

  app.post('/api/auth/register', validate.body(registerSchema), asyncMiddleware(register))

  app.post('/api/auth/login', validate.body(loginSchema), asyncMiddleware(login))

  app.get('/api/auth/logout', [authenticateUser], asyncMiddleware(logout))

  app.get('/api/auth/new_token', [authenticateUser], asyncMiddleware(newToken))
}
