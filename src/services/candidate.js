const createError = require("http-errors");
const candidateModel = require("../schemas/database/candidate");

module.exports = {
  getAll: async () => {
    const candidates = await candidateModel.find();
    return candidates;
  },

  postSingle: async (inputObject) => {
    const candidate = inputObject;
    const savedData = await candidateModel.create(candidate);
    return savedData;
  },

  deleteAll: async () => {
    const candidates = await candidateModel.deleteMany({});
    return candidates;
  },
};
