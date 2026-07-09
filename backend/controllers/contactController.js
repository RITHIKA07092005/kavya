const Contact = require("../models/Contact");
const Notification = require("../models/Notification");

// POST /api/contact
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    await Notification.create({
      type: "contact",
      message: `New contact message from ${contact.name}`,
      refId: contact._id,
    });
    res.status(201).json({ message: "Message sent successfully", contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/contact  (admin)
exports.getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

// PATCH /api/contact/:id
exports.updateContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(contact);
};

// DELETE /api/contact/:id
exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
