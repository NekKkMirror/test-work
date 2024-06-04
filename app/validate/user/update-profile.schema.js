const Joi = require('joi')

exports.updateProfileSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).optional(),
  surname: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  gender: Joi.string().valid('male', 'female').optional(),
})
