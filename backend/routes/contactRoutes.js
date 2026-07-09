const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.post("/", createContact);
router.get("/", protect, getContacts);
router.patch("/:id", protect, updateContact);
router.delete("/:id", protect, deleteContact);

module.exports = router;
