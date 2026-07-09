const ProjectRequest = require("../models/ProjectRequest");
const Notification = require("../models/Notification");

const generateRequestId = async () => {
  const count = await ProjectRequest.countDocuments();
  return `GEN-${1001 + count}`;
};

// POST /api/project
exports.createProjectRequest = async (req, res) => {
  try {
    const requestId = await generateRequestId();
    const files = req.files || {};
    const data = {
      ...req.body,
      requestId,
      referenceImage: files.referenceImage ? files.referenceImage[0].filename : undefined,
      referenceDocument: files.referenceDocument ? files.referenceDocument[0].filename : undefined,
    };
    const projectRequest = await ProjectRequest.create(data);
    await Notification.create({
      type: "project",
      message: `New project request ${requestId} from ${projectRequest.fullName}`,
      refId: projectRequest._id,
    });
    res.status(201).json({ message: "Project request submitted", requestId, projectRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/project (admin)
exports.getProjectRequests = async (req, res) => {
  const requests = await ProjectRequest.find().sort({ createdAt: -1 });
  res.json(requests);
};

exports.updateProjectRequest = async (req, res) => {
  const request = await ProjectRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(request);
};

exports.deleteProjectRequest = async (req, res) => {
  await ProjectRequest.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
