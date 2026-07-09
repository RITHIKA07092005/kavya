const CareerApplication = require("../models/CareerApplication");
const Notification = require("../models/Notification");

// POST /api/career
exports.applyCareer = async (req, res) => {
  try {
    const resume = req.file ? req.file.filename : undefined;
    const application = await CareerApplication.create({ ...req.body, resume });
    await Notification.create({
      type: "career",
      message: `New career application from ${application.fullName}`,
      refId: application._id,
    });
    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/career (admin)
exports.getApplications = async (req, res) => {
  const applications = await CareerApplication.find().sort({ createdAt: -1 });
  res.json(applications);
};

exports.deleteApplication = async (req, res) => {
  await CareerApplication.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
