import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../api/axios";
import ServiceCard from "../components/ServiceCard";

const stats = [
  { label: "Projects Delivered", value: "120+" },
  { label: "Happy Clients", value: "80+" },
  { label: "Team Experts", value: "25+" },
  { label: "Years Experience", value: "5+" },
];

const defaultServices = [
  { icon: "🌐", title: "Website Development", description: "Modern, fast, SEO-friendly websites.", price: "₹15,000" },
  { icon: "📱", title: "Mobile App Development", description: "Native and cross-platform apps.", price: "₹40,000" },
  { icon: "🤖", title: "AI Automation", description: "Custom AI workflows and chatbots.", price: "₹25,000" },
  { icon: "🧩", title: "Custom Software", description: "Tailored software for your business.", price: "₹50,000" },
];

const faqs = [
  { q: "How long does a typical project take?", a: "Most websites take 2–4 weeks; complex platforms take 6–10 weeks depending on scope." },
  { q: "Do you offer post-launch support?", a: "Yes, all projects include a maintenance window with optional ongoing support plans." },
  { q: "Can I request a custom quote?", a: "Absolutely — use the Request a Project form and we'll get back within 24 hours." },
];

export default function Home() {
  const [services, setServices] = useState(defaultServices);
  const [testimonials, setTestimonials] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    api.get("/services").then((r) => r.data.length && setServices(r.data)).catch(() => {});
    api.get("/testimonials").then((r) => setTestimonials(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="section text-center pt-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            We Build <span className="gradient-text">Premium Software</span>
            <br /> That Grows Your Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/60 max-w-2xl mx-auto mt-6"
          >
            Genoid Tech designs and engineers websites, apps, and AI-powered platforms
            with the polish of a world-class product studio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-4 mt-8"
          >
            <Link to="/request-project" className="btn-primary">Start Your Project</Link>
            <Link to="/portfolio" className="px-6 py-3 rounded-full border border-white/20 hover:border-cyan-400 transition-colors">
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="section grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="glass text-center py-8">
            <div className="text-3xl font-bold gradient-text">{s.value}</div>
            <div className="text-white/60 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section className="section">
        <h2 className="text-3xl font-bold text-center">Our Services</h2>
        <p className="text-white/60 text-center mt-2 mb-10">End-to-end technology solutions under one roof</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 4).map((s, i) => (
            <ServiceCard key={i} icon={s.icon} title={s.title} description={s.description} price={s.startingPrice || s.price} />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="glass p-10 grid md:grid-cols-3 gap-8">
          {[
            { title: "Premium Design", desc: "Every product is crafted with startup-grade UI/UX." },
            { title: "Fast Delivery", desc: "Agile process gets you to launch quickly, without cut corners." },
            { title: "Ongoing Support", desc: "We stay with you post-launch with maintenance & scaling help." },
          ].map((f) => (
            <div key={f.title}>
              <h3 className="font-semibold text-lg mb-2 gradient-text">{f.title}</h3>
              <p className="text-white/60 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section">
          <h2 className="text-3xl font-bold text-center mb-10">What Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass p-6">
                <p className="text-white/70 text-sm italic">"{t.message}"</p>
                <div className="mt-4 font-semibold">{t.clientName}</div>
                <div className="text-white/50 text-xs">{t.company}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass p-5 cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="flex justify-between items-center font-medium">
                {f.q}
                <span>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && <p className="text-white/60 text-sm mt-3">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section className="section text-center">
        <div className="glass p-12">
          <h2 className="text-3xl font-bold mb-3">Let's Build Something Great</h2>
          <p className="text-white/60 mb-6">Tell us about your project and we'll respond within 24 hours.</p>
          <Link to="/contact" className="btn-primary">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
}
