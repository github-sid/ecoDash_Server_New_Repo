const mongoose = require("mongoose");

// Define the schema
const partTimeCountrySchema = mongoose.Schema;

const partTimeCountry = new partTimeCountrySchema({
  gender: String,
  data: [
    {
      x: String,
      y: Number,
    },
  ],
});

module.exports = mongoose.model("partTimeCountry", partTimeCountry);
