const mongoose = require("mongoose");

const newHireSchema = mongoose.Schema;

const newHire = new newHireSchema({
  Region: String,
  lt_30: Number,
  bt_30_50: Number,
  gt_50: Number,
});

module.exports = mongoose.model("newHire", newHire);
