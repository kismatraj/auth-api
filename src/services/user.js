const createError = require("http-errors");
const userModel = require("../schemas/database/user");

module.exports = {
  registerSingle: async (inputObject) => {
    const { email } = inputObject;
    const doesExists = await userModel.findOne({ email: email });
    if (doesExists)
      throw createError.Conflict(`Email:${inputObject.email} already exists`);
    const user = await userModel({ ...inputObject });
    const savedUser = user.save();
    return savedUser;
  },

  registerMultiple: async (inputObject) => {
    const { email } = inputObject;
    const doesExists = await userModel.findOne({ email: email });
    if (doesExists)
      throw createError.Conflict(`Email:${inputObject.email} already exists`);
    const user = await userModel({ ...inputObject });
    const savedUser = user.save();
    return savedUser;
  },

  getUserById: async (id) => {
    const user = await userModel.findById(id);
    if (!user) throw createError.NotFound("User not registered");
    return user;
  },

  login: async (inputObject) => {
    const { email, password } = inputObject;
    const user = await userModel.findOne({ email: email });
    if (!user) throw createError.NotFound("User not registered");
    const isMatch = await user.isValidPassword(password);
    if (!isMatch)
      throw createError.Unauthorized("Invalid credentials provided.");
    return user;
  },

  deleteUserById: async (id) => {
    return await userModel.findByIdAndDelete(id);
  },

  deleteUser: async (inputObject) => {
    const { email } = inputObject;

    const user = await userModel.findOne({ email: email });
    if (!user) throw createError.NotFound("No user data found.");
    const deletedUser = await userModel.deleteOne({ id: user.id });
    return deletedUser;
  },
};
