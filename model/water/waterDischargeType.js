const mongoose = require("mongoose");

// Define the schema
const wDischargeTypeSchema = mongoose.Schema;

const wDischargeType = new wDischargeTypeSchema({
  type: String,
  data: [
    {
      x: Number,
      y: Number,
    },
  ],
});

module.exports = mongoose.model("wDischargeType", wDischargeType);
