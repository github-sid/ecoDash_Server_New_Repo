const mongoose = require("mongoose");

const pOrTSchema = mongoose.Schema;

const pOrT = new pOrTSchema({
  Region: String,
  Permanent_employees_female: Number,
  Permanent_employees_male: Number,
  Temporary_employees_female: Number,
  Temporary_employees_male: Number,
});

module.exports = mongoose.model("permanentOrTemporary", pOrT);
