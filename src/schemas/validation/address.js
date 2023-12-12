const Joi = require("joi");

const addressSchema = Joi.object({
  address1: Joi.string().required().min(2).max(500),
  address2: Joi.string().max(500),
  address3: Joi.string().max(500),
  city: Joi.string(),
  district: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  zipCode: Joi.string().pattern(new RegExp("^[1-9][0-9]*")),
  longitude: Joi.string().pattern(new RegExp("^[0-9]*.[0-9]*")),
  latitude: Joi.string().pattern(new RegExp("^[0-9]*.[0-9]*")),
});

module.exports = addressSchema;
