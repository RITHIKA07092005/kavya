const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    images: [String],
    technologies: [String],
    features: [String],
    liveDemoUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
