const mongoose = require("mongoose");

const newHireGenderSchema = mongoose.Schema;

const newHireGender = new newHireGenderSchema({
  region: String,
  new_hires_female: Number,
  new_hires_male: Number,
});

module.exports = mongoose.model("newHireGender", newHireGender);
