const Joi = require("joi");

const nameSchema = Joi.object({
  fname: Joi.string().required().min(2).max(500),
  mname: Joi.string().optional().max(500),
  lname: Joi.string().required().min(2).max(500),
});

module.exports = nameSchema;
