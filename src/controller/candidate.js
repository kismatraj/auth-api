const createError = require("http-errors");
const service = require("../services/candidate");
const validateSchema = require("../schemas/validation/candidate");

module.exports = {
  get: async (req, res, next) => {
    const candidates = await service.getAll();
    res.status(201).json({ status: "success", data: { candidates } });
  },

  post: async (req, res, next) => {
    res.status(201).json({ message: "CANDIDATE GET service is running" });
  },

  postSingle: async (req, res, next) => {
    const valid = await validateSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    if (!valid.error) {
      const data = await service.postSingle(valid);
      res.status(201).json({ status: "success", data: data });
    }
    return createError.UnprocessableEntity(valid);
  },

  put: async (req, res, next) => {
    res.status(201).json({ message: "CANDIDATE PUT service is running" });
  },

  patch: async (req, res, next) => {
    res.status(201).json({ message: "CANDIDATE PATCH service is running" });
  },

  delete: async (req, res, next) => {
    const candidates = await service.deleteAll();
    res.status(201).json({ status: "success", data: candidates });
  },
};
