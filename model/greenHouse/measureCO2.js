const mongoose = require("mongoose");

const measureCO2Schema = mongoose.Schema;

const measureCO2 = new measureCO2Schema({
  Measures: String,
  emission: Number,
});

module.exports = mongoose.model("measureCO2", measureCO2);
