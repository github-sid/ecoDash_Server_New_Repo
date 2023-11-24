const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema;

const role = new rolesSchema({
  Role: String,
  Female: Number,
  Male: Number,
});

module.exports = mongoose.model("role", role);
