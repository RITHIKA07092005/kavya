const express = require("express");
const router = express.Router();
const { getServices, getProjects, getTestimonials } = require("../controllers/publicController");

router.get("/services", getServices);
router.get("/projects", getProjects);
router.get("/testimonials", getTestimonials);

module.exports = router;
