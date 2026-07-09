const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: String,
    icon: String,
    description: String,
    startingPrice: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
