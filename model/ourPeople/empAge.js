const mongoose = require("mongoose");

const ageSchema = mongoose.Schema;

const age = new ageSchema({
  Region: String,
  Females_lt_30_years: Number,
  Males_lt_30_years: Number,
  Females_bt_30_50_years: Number,
  Males_bt_30_50_years: Number,
  Females_gt_50_years: Number,
  Males_gt_50_years: Number,
});

module.exports = mongoose.model("age", age);
