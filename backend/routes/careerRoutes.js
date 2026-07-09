const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const { applyCareer, getApplications, deleteApplication } = require("../controllers/careerController");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), applyCareer);
router.get("/", protect, getApplications);
router.delete("/:id", protect, deleteApplication);

module.exports = router;
