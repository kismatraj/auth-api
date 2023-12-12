const joi = require("joi");

const schema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(2).max(20).required(),
});

module.exports = schema;
