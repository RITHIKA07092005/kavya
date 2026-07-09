import { useState } from "react";
import api from "../api/axios";

const openings = ["Frontend Developer", "Backend Developer", "UI/UX Designer", "AI/ML Intern"];

export default function Careers() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", position: openings[0], coverLetter: "" });
  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (resume) data.append("resume", resume);
    await api.post("/career", data, { headers: { "Content-Type": "multipart/form-data" } });
    setSubmitted(true);
  };

  return (
    <div className="section pt-32 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-2">Careers</h1>
      <p className="text-white/60 text-center mb-10">Join a team building premium software.</p>

      <div className="grid gap-3 mb-10">
        {openings.map((o) => (
          <div key={o} className="glass p-4 flex justify-between items-center">
            <span>{o}</span>
            <span className="text-xs text-cyan-400">Open</span>
          </div>
        ))}
      </div>

      {submitted ? (
        <div className="glass p-8 text-center">✅ Application submitted — we'll review and reach out soon.</div>
      ) : (
        <form onSubmit={handleSubmit} className="glass p-8 grid gap-4">
          <input required placeholder="Full Name" className="input" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <input required type="email" placeholder="Email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Phone" className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <select className="input" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}>
            {openings.map((o) => <option key={o}>{o}</option>)}
          </select>
          <textarea placeholder="Cover Letter" rows={3} className="input" value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} />
          <div>
            <label className="text-sm text-white/60 block mb-1">Resume (PDF)</label>
            <input type="file" accept="application/pdf" onChange={(e) => setResume(e.target.files[0])} />
          </div>
          <button className="btn-primary">Apply</button>
        </form>
      )}
    </div>
  );
}
