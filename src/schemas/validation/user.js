const joi = require("joi");

const schema = joi.object({
  email: joi.string().email().lowercase().required(),
  username: joi.string().required(),
  password: joi.string().min(2).max(20).required(),
  mobile: joi.number().min(10).required(),
});

module.exports = schema;
