import { useEffect, useState } from "react";
import api from "../api/axios";

const fallback = [
  { title: "Gym Management System", technologies: ["React", "Node.js", "MongoDB"], features: ["Membership tracking", "Payments", "Analytics"] },
  { title: "Restaurant Website", technologies: ["Next.js", "Tailwind"], features: ["Online ordering", "Reservations"] },
  { title: "Inventory Management", technologies: ["React", "Express", "MySQL"], features: ["Stock alerts", "Reports"] },
  { title: "School Management", technologies: ["React", "Node.js", "MongoDB"], features: ["Attendance", "Grading", "Fees"] },
  { title: "AI Chatbot", technologies: ["Python", "OpenAI API"], features: ["Custom training", "Multi-channel"] },
  { title: "Appointment Booking", technologies: ["React", "Node.js"], features: ["Calendar sync", "Reminders"] },
];

export default function Portfolio() {
  const [projects, setProjects] = useState(fallback);

  useEffect(() => {
    api.get("/projects").then((r) => r.data.length && setProjects(r.data)).catch(() => {});
  }, []);

  return (
    <div className="section pt-32">
      <h1 className="text-4xl font-bold text-center mb-2">Our Work</h1>
      <p className="text-white/60 text-center mb-12">A selection of projects we've shipped for clients.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="glass p-6 flex flex-col gap-3">
            <div className="h-36 rounded-xl bg-brand-gradient opacity-70" />
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <div className="flex flex-wrap gap-2">
              {(p.technologies || []).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10">{t}</span>
              ))}
            </div>
            <ul className="text-white/60 text-sm list-disc list-inside">
              {(p.features || []).map((f) => <li key={f}>{f}</li>)}
            </ul>
            {p.liveDemoUrl && (
              <a href={p.liveDemoUrl} target="_blank" rel="noreferrer" className="text-cyan-400 text-sm mt-1">
                Live Demo →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
