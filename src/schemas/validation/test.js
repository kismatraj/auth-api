const Joi = require("joi");

const userDetailsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string(),
});

const userSchema = Joi.object({
  user: userDetailsSchema,
  address: addressSchema,
});

module.exports = userSchema;
