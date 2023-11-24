const mongoose = require("mongoose");

// Define the schema
const wInputTypeSchema = mongoose.Schema;

const wInputType = new wInputTypeSchema({
  type: String,
  data: [
    {
      x: Number,
      y: Number,
    },
  ],
});

module.exports = mongoose.model("wInputType", wInputType);
