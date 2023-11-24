const mongoose = require("mongoose");
const cO2Schema = mongoose.Schema;

const cO2 = new cO2Schema({
  group: String,
  CO2et: Number,
});

module.exports = mongoose.model("cO2Schema", cO2);
