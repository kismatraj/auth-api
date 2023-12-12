const Joi = require("joi");
const nameSchema = require("../validation/name");
const addressSchema = require("./address");

// Array of centre data
// const centreSchema = Joi.array().items(
//   Joi.object({
//     centreCode: Joi.string().min(2).uppercase().required(),
//     centreName: Joi.string().min(2).required(),
//     address: addressSchema.required(),
//     coordinatorName: nameSchema.required(),
//     coordinatorMobileNo: Joi.array().items(
//       Joi.string().pattern(new RegExp("^[1-9][0-9]{9}"))
//     ),
//     coordinatorEmail: Joi.array().items(Joi.string().email()),
//     esName: nameSchema,
//     esMobileNo: Joi.array().items(
//       Joi.string().pattern(new RegExp("^[1-9][0-9]{9}"))
//     ),
//     esEmail: Joi.array().items(Joi.string().email()),
//   }).unknown(true)
// );
const centreSchema = Joi.object({
  centreCode: Joi.string().min(2).uppercase().required(),
  centreName: Joi.string().min(2).required(),
  address: addressSchema.required(),
  coordinator: Joi.object({
    name: nameSchema.required(),
    mobileNo: Joi.array().items(
      Joi.string().pattern(new RegExp("^[1-9][0-9]{9}"))
    ),
    email: Joi.array().items(Joi.string().email()),
  }),
  es: Joi.object({
    name: nameSchema,
    mobileNo: Joi.array().items(
      Joi.string().pattern(new RegExp("^[1-9][0-9]{9}"))
    ),
    email: Joi.array().items(Joi.string().email()),
  }),
});

module.exports = Joi.array().items(centreSchema.unknown(true));
