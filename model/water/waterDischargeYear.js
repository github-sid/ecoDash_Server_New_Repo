const mongoose = require("mongoose");

// Define the schema
const wDischargeYearSchema = mongoose.Schema;

const wDischargeYear = new wDischargeYearSchema({
  total: Number,
  year: Number,
});

module.exports = mongoose.model("wDischargeYear", wDischargeYear);
