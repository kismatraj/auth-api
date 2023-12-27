const candidate = require("../services/candidate");
const service = require("../services/candidate");
module.exports = {
  get: async (req, res, next) => {
    res.status(201).json({ message: "CANDIDATE GET service is running" });
  },

  post: async (req, res, next) => {
    res.status(201).json({ message: "CANDIDATE GET service is running" });
  },

  postSingle: async (req, res, next) => {
    const input = req.body;
    console.log(input);
    const data = await service.postSingle(input);
    res.status(201).json({ message: "CANDIDATE GET service is running" });
  },

  put: async (req, res, next) => {
    res.status(201).json({ message: "CANDIDATE PUT service is running" });
  },

  patch: async (req, res, next) => {
    res.status(201).json({ message: "CANDIDATE PATCH service is running" });
  },

  delete: async (req, res, next) => {
    res.status(201).json({ message: "CANDIDATE DELETE service is running" });
  },
};
