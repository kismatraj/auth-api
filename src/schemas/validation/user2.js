const Joi = require("joi");

const nameSchema = Joi.object({
  fname: Joi.string().required().min(1).max(500),
  mname: Joi.string().optional().max(500),
  lname: Joi.string().required().min(2).max(500),
});

const addressSchema = Joi.object().keys({
  address1: Joi.string().required().min(1).max(500),
  address2: Joi.string().max(500),
  address3: Joi.string().max(500),
  city: Joi.string(),
  district: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  pin: Joi.string().pattern(new RegExp("^[1-9][0-9]*")),
});

const userSchema = Joi.array().items(
  Joi.object({
    name: nameSchema,
    address: addressSchema,
    gender: Joi.string().required().valid("Male", "Female", "Others"),
    category: Joi.string()
      .valid("General", "Ex-service Man", "OBC", "ST", "ST", "Others")
      .required(),
    mobile: Joi.string().pattern(new RegExp("^[1-9][0-9]{9}")),
    email: Joi.string().email(),
    username: Joi.string().required().min(2).max(500),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    dob: Joi.date(),
    age: Joi.number()
      .required()
      .integer()
      .when("category", {
        is: "Ex-service Man",
        then: Joi.number().min(55),
        otherwise: Joi.number().min(14),
      }),
    limit: Joi.number().required(),
    secretQuestion: Joi.array()
      .items(Joi.string())
      .min(Joi.ref("limit"))
      .required(),
    custom: Joi.custom((val, msg) => {
      if (val === "test") return msg.message("Test value is invalid");
      return true;
    }),
  }).with("email", "mobile")
);

module.exports = userSchema;
