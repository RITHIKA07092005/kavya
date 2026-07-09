const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getNotifications,
  markRead,
  deleteNotification,
} = require("../controllers/notificationController");

router.get("/", protect, getNotifications);
router.patch("/:id", protect, markRead);
router.delete("/:id", protect, deleteNotification);

module.exports = router;
