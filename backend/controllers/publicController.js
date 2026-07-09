const Service = require("../models/Service");
const Project = require("../models/Project");
const Testimonial = require("../models/Testimonial");

exports.getServices = async (req, res) => {
  res.json(await Service.find());
};

exports.getProjects = async (req, res) => {
  res.json(await Project.find());
};

exports.getTestimonials = async (req, res) => {
  res.json(await Testimonial.find());
};
