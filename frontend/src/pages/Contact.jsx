import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  businessType: "",
  budget: "",
  projectDescription: "",
  preferredContactMethod: "Email",
};

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/contact", form);
      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section pt-32 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-2">Get In Touch</h1>
      <p className="text-white/60 text-center mb-10">We usually respond within 24 hours.</p>

      <form onSubmit={handleSubmit} className="glass p-8 grid md:grid-cols-2 gap-5">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="input" />
        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="input" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
        <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" className="input" />
        <select name="businessType" value={form.businessType} onChange={handleChange} className="input">
          <option value="">Business Type</option>
          <option>Startup</option>
          <option>SME</option>
          <option>Enterprise</option>
          <option>Individual</option>
        </select>
        <select name="budget" value={form.budget} onChange={handleChange} className="input">
          <option value="">Budget Range</option>
          <option>Under ₹25,000</option>
          <option>₹25,000 – ₹1,00,000</option>
          <option>₹1,00,000 – ₹5,00,000</option>
          <option>₹5,00,000+</option>
        </select>
        <textarea
          name="projectDescription"
          value={form.projectDescription}
          onChange={handleChange}
          placeholder="Tell us about your project"
          rows={4}
          className="input md:col-span-2"
        />
        <select name="preferredContactMethod" value={form.preferredContactMethod} onChange={handleChange} className="input md:col-span-2">
          <option>Email</option>
          <option>Phone</option>
          <option>WhatsApp</option>
        </select>

        {error && <p className="text-red-400 text-sm md:col-span-2">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary md:col-span-2 disabled:opacity-50">
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSubmitted(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass p-10 text-center max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-white/60 text-sm mb-6">Thanks for reaching out — we'll be in touch soon.</p>
              <button onClick={() => setSubmitted(false)} className="btn-primary">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
