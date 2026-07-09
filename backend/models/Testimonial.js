const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    clientName: String,
    company: String,
    message: String,
    rating: { type: Number, default: 5 },
    avatar: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
