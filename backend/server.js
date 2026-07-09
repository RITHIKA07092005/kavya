require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const careerRoutes = require("./routes/careerRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const blogRoutes = require("./routes/blogRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/login", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", publicRoutes); // /api/services, /api/projects, /api/testimonials

app.get("/", (req, res) => res.send("Genoid Tech API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
