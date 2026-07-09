import { motion } from "framer-motion";

export default function ServiceCard({ icon, title, description, price }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass p-6 flex flex-col gap-3 hover:border-cyan-400/40 transition-colors"
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-white/60 text-sm flex-1">{description}</p>
      <div className="text-cyan-400 text-sm font-medium">From {price}</div>
      <button className="text-sm text-left text-white/80 hover:text-cyan-400 mt-1">
        Learn More →
      </button>
    </motion.div>
  );
}
