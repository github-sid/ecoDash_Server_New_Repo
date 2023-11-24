const mongoose = require("mongoose");

const groupCO2Schema = mongoose.Schema;

const groupCO2 = new groupCO2Schema({
  group: String,
  emission_metric_tons: Number,
});

module.exports = mongoose.model("groupCO2", groupCO2);
