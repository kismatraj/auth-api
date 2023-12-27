const createError = require("http-errors");
const CandidateModel = require("../schemas/database/candidate");

module.exports = {
  postSingle: async (inputObject) => {
    const candidate = inputObject;

    const savedData = await CandidateModel.create(candidate);
    return savedData;
  },
};
