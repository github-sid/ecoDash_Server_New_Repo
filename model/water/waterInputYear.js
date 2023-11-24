const mongoose = require("mongoose");

// Define the schema
const wInputYearSchema = mongoose.Schema;

const wInputYear = new wInputYearSchema({
  total: Number,
  year: Number,
});

module.exports = mongoose.model("wInputYear", wInputYear);
