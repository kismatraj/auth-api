const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  fatherName: String,
  motherName: String,
  courseName: String,
});

module.exports = mongoose.model("candidate", schema);
