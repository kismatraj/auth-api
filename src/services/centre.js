const createError = require("http-errors");
const CentreModel = require("../schemas/database/centre");

module.exports = {
  import: async (inputObject) => {
    const centresList = inputObject;

    // const Model = await CentreModel({ ...centresList });
    // if (!Model) throw createError.InternalServerError(isValid.errors.message);
    // const savedCentre = await Model.save();
    // return savedCentre;
    const savedData = await CentreModel.create(centresList);
    return savedData;
    // centreModel
    //   .create(centresList)
    //   .then((res) => {
    //     console.log(res);
    //     return res;
    //   })
    //   .then((err) => {
    //     console.log(err.message);
    //   });

    // throw createError.InternalServerError(isValid.errors.message);
  },
};
