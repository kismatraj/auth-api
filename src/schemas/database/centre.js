const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: { type: String },
    centreCode: {
      type: String,
      required: [true, "Centre Code is required field"],
      uppercase: true,
      unique: true,
    },
    centreName: {
      type: String,
      required: [true, "Centre name is required field"],
    },
    address: {
      address1: {
        type: String,
        required: [true, "Centre address1 is required field"],
      },
      address2: {
        type: String,
      },
      address3: {
        type: String,
      },
      city: { type: String },
      district: { type: String },
      state: { type: String },
      zipCode: { type: String },
      longitude: { type: String },
      latitude: { type: String },
    },
    coordinator: {
      _id: mongoose.Schema.ObjectId,
      name: {
        fname: { type: String, required: true },
        mname: { type: String },
        lname: { type: String },
      },
      mobileNo: { type: [String] },
      email: { type: [String] },
    },
    es: {
      _id: mongoose.Schema.ObjectId,
      name: {
        fname: { type: String, required: true },
        mname: { type: String },
        lname: { type: String },
      },
      mobileNo: { type: [String] },
      email: { type: [String] },
    },
    createdBy: { type: String },
  },
  // { timestamps: true:- this option adds creation and update time in each document , strict: false: will make enable save unspecified keys in schema definition into db }
  { timestamps: true }
);

schema.pre("save", async function (next) {
  //console.log("create", this);
  this.createdBy = "System";
});

module.exports = mongoose.model("centre", schema);
