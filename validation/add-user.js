var Joi = require('joi');

module.exports = {
  body: {
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!"#$%&'\\()*+,.\/:;<=>?@\[\] ^_`{|}~-]{15,50}$/).required(),
    email: Joi.string().email().required()
  }
 };
