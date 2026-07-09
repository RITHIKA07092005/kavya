import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass mx-4 mt-4 md:mx-8 md:mt-6 px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold gradient-text">
          Genoid Tech
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `hover:text-cyan-400 transition-colors ${isActive ? "text-cyan-400" : "text-white/80"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/request-project" className="btn-primary text-sm">
            Request a Project
          </Link>
        </div>

        <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-4 mt-2 p-4 flex flex-col gap-3 lg:hidden"
        >
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-white/90">
              {l.label}
            </NavLink>
          ))}
          <Link to="/request-project" onClick={() => setOpen(false)} className="btn-primary text-center text-sm">
            Request a Project
          </Link>
        </motion.div>
      )}
    </header>
  );
}
