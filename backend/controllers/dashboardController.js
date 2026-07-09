const Contact = require("../models/Contact");
const ProjectRequest = require("../models/ProjectRequest");
const CareerApplication = require("../models/CareerApplication");
const Blog = require("../models/Blog");
const Notification = require("../models/Notification");

// GET /api/dashboard
exports.getDashboardStats = async (req, res) => {
  const [totalContacts, totalProjectRequests, unreadMessages, completedProjects, totalBlogs, totalApplications, unreadNotifications] =
    await Promise.all([
      Contact.countDocuments(),
      ProjectRequest.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      ProjectRequest.countDocuments({ status: "Completed" }),
      Blog.countDocuments(),
      CareerApplication.countDocuments(),
      Notification.countDocuments({ isRead: false }),
    ]);

  res.json({
    totalContacts,
    totalProjectRequests,
    unreadMessages,
    completedProjects,
    totalBlogs,
    totalApplications,
    unreadNotifications,
  });
};
