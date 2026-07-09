const mongoose = require("mongoose");

const projectRequestSchema = new mongoose.Schema(
  {
    requestId: { type: String, unique: true },
    fullName: String,
    email: String,
    phone: String,
    companyName: String,
    businessType: String,
    projectType: {
      type: String,
      enum: ["Website", "Mobile App", "AI Solution", "CRM", "ERP", "Dashboard", "Other"],
    },
    budget: String,
    timeline: String,
    requirements: String,
    referenceImage: String,
    referenceDocument: String,
    additionalNotes: String,
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectRequest", projectRequestSchema);
