const Blog = require("../models/Blog");

// GET /api/blogs
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
  res.json(blogs);
};

// POST /api/blogs (admin)
exports.createBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
};

// PUT /api/blogs/:id (admin)
exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
};

// DELETE /api/blogs/:id (admin)
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
