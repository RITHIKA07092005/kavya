const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const {
  createProjectRequest,
  getProjectRequests,
  updateProjectRequest,
  deleteProjectRequest,
} = require("../controllers/projectController");

const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  upload.fields([{ name: "referenceImage" }, { name: "referenceDocument" }]),
  createProjectRequest
);
router.get("/", protect, getProjectRequests);
router.patch("/:id", protect, updateProjectRequest);
router.delete("/:id", protect, deleteProjectRequest);

module.exports = router;
