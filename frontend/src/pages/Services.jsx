import { useEffect, useState } from "react";
import api from "../api/axios";
import ServiceCard from "../components/ServiceCard";

const defaultServices = [
  { icon: "🌐", title: "Website Development", description: "Fast, modern, SEO-friendly sites.", startingPrice: "₹15,000" },
  { icon: "📱", title: "Mobile App Development", description: "iOS, Android & cross-platform apps.", startingPrice: "₹40,000" },
  { icon: "🤖", title: "AI Automation", description: "Chatbots, workflow automation, AI agents.", startingPrice: "₹25,000" },
  { icon: "🧩", title: "Custom Software", description: "Bespoke tools built around your process.", startingPrice: "₹50,000" },
  { icon: "📊", title: "Dashboard Development", description: "Real-time analytics and admin panels.", startingPrice: "₹20,000" },
  { icon: "🏢", title: "ERP Solutions", description: "End-to-end enterprise resource planning.", startingPrice: "₹1,00,000" },
  { icon: "🛒", title: "E-Commerce", description: "Storefronts with payments and inventory.", startingPrice: "₹35,000" },
  { icon: "☁️", title: "Cloud Solutions", description: "Scalable infra on AWS, GCP & Azure.", startingPrice: "₹30,000" },
  { icon: "🛠️", title: "Maintenance & Support", description: "Ongoing updates, monitoring, and fixes.", startingPrice: "₹5,000/mo" },
];

export default function Services() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    api.get("/services").then((r) => r.data.length && setServices(r.data)).catch(() => {});
  }, []);

  return (
    <div className="section pt-32">
      <h1 className="text-4xl font-bold text-center mb-2">Our Services</h1>
      <p className="text-white/60 text-center mb-12">Everything you need to launch and scale, in one place.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={i} icon={s.icon} title={s.title} description={s.description} price={s.startingPrice} />
        ))}
      </div>
    </div>
  );
}
