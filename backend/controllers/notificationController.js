const Notification = require("../models/Notification");

// GET /api/notifications
exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
  const unreadCount = await Notification.countDocuments({ isRead: false });
  res.json({ notifications, unreadCount });
};

// PATCH /api/notifications/:id
exports.markRead = async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  res.json(notification);
};

// DELETE /api/notifications/:id
exports.deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
