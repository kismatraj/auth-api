const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "User ID is required field"] },
    email: {
      type: String,
      required: [true, "Email id required field"],
      lowercase: true,
      unique: true,
    },
    name: {
      fName: { type: String, required: [true, "First name is required field"] },
      mName: { type: String },
      lName: { type: String },
    },
    mobile: { type: String, required: [true, "Mobile is required field"] },
    password: { type: String, required: [true, "Password is required field"] },
  },
  { timestamp: true }
);

// Middleware executed before saving a document
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(this.password, salt);
    this.password = hashedPwd;
    next();
  } catch (error) {
    next(error.message);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", UserSchema);
