const { authenticateUser } = require('../middleware/authentication.middleware')
const { profile, profiles, updateProfile } = require('../controllers/user.controller')
const { asyncMiddleware } = require('../middleware/async.middleware')
const { validate } = require('../validate')
const { profilesSchema } = require('../validate/user/profiles.schema')
const { updateProfileSchema } = require('../validate/user/update-profile.schema')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    next()
  })

  app.get(
    '/api/users/profiles',
    validate.query(profilesSchema),
    [authenticateUser],
    asyncMiddleware(profiles),
  )
  app.get('/api/users/profile', [authenticateUser], asyncMiddleware(profile))

  app.put(
    '/api/users/profile',
    validate.body(updateProfileSchema),
    [authenticateUser],
    asyncMiddleware(updateProfile),
  )
}
