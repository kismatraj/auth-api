const service = require("../services/centre");
const centreSchema = require("../schemas/validation/centre");

module.exports = {
  get: async (req, res, next) => {
    res.status(201).json({ message: "CENTRE GET service is running" });
  },

  import: async (req, res, next) => {
    const valid = await centreSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    // console.log("Valid", valid);

    const result = await service.import(valid);
    res
      .status(201)
      .json({ message: "CENTRE POST service is running", val: result });
  },

  put: async (req, res, next) => {
    res.status(201).json({ message: "CENTRE PUT service is running" });
  },

  patch: async (req, res, next) => {
    res.status(201).json({ message: "CENTRE PATCH service is running" });
  },

  delete: async (req, res, next) => {
    res.status(201).json({ message: "CENTRE DELETE service is running" });
  },
};
