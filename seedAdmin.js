// Run once: node seedAdmin.js
// Creates the first admin account so you can log in to /admin-login
require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const exists = await Admin.findOne({ email: "admin@genoidtech.com" });
  if (exists) {
    console.log("Admin already exists");
  } else {
    await Admin.create({
      name: "Genoid Admin",
      email: "admin@genoidtech.com",
      password: "Admin@123", // change after first login
    });
    console.log("Admin created: admin@genoidtech.com / Admin@123");
  }
  process.exit();
})();
