const mongoose = require("mongoose");

const greenHouseSchema = mongoose.Schema;

const greenHouse = new greenHouseSchema({
  type: String,
  data: [
    {
      x: String,
      y: Number,
    },
  ],
});

module.exports = mongoose.model("greenHouse", greenHouse);
