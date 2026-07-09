import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="section grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-lg font-bold gradient-text mb-3">Genoid Tech</h3>
          <p className="text-white/60 text-sm">
            Premium software, websites, and AI solutions for ambitious businesses.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/about" className="hover:text-cyan-400">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-cyan-400">Careers</Link></li>
            <li><Link to="/blog" className="hover:text-cyan-400">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/services" className="hover:text-cyan-400">Web Development</Link></li>
            <li><Link to="/services" className="hover:text-cyan-400">AI Automation</Link></li>
            <li><Link to="/services" className="hover:text-cyan-400">ERP Solutions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm flex-1 outline-none focus:border-cyan-400"
            />
            <button className="btn-primary text-sm px-4">Join</button>
          </form>
        </div>
      </div>
      <div className="text-center text-white/40 text-xs py-6 border-t border-white/5">
        © {new Date().getFullYear()} Genoid Tech. All rights reserved.
      </div>
    </footer>
  );
}
