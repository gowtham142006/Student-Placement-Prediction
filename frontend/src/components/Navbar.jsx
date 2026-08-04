import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/prediction", label: "Prediction" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-primary-600 bg-primary-50"
        : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
    }`;

  const mobileLinkClasses = ({ isActive }) =>
    `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
      isActive
        ? "text-primary-600 bg-primary-50"
        : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white text-lg shadow-md shadow-primary-200 group-hover:shadow-lg group-hover:shadow-primary-300 transition-shadow duration-300">
              🎓
            </span>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              Placement
              <span className="text-primary-600">Predictor</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === "/"}>
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/prediction"
              className="ml-3 px-5 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold shadow-md shadow-primary-200 hover:shadow-lg hover:shadow-primary-300 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-1 space-y-1 border-t border-slate-100 bg-white/95 backdrop-blur-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={mobileLinkClasses}
              end={link.to === "/"}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/prediction"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 px-4 py-3 rounded-xl text-center text-base font-semibold bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;