const Joi = require("joi");

const candidateSchema = Joi.object({
  name: Joi.string().required().min(2).max(500),
  fatherName: Joi.string().required().min(2).max(500),
  motherName: Joi.string().required().min(2).max(500),
  courseName: Joi.string().required().min(2).max(1000),
});

module.exports = candidateSchema;
