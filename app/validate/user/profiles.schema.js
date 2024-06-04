const Joi = require('joi')

exports.profilesSchema = Joi.object({
  page: Joi.number().optional(),
  list_size: Joi.number().optional(),
})
