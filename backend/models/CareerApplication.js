const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    position: String,
    resume: String,
    coverLetter: String,
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerApplication", careerApplicationSchema);
