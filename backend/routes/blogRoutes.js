const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getBlogs, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");

router.get("/", getBlogs);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
