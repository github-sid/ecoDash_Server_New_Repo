const mongoose = require("mongoose");

const contractorSchema = mongoose.Schema;

const contractorD = new contractorSchema({
  region: String,
  employees: Number,
  contractors: Number,
});

module.exports = mongoose.model("contractor", contractorD);
