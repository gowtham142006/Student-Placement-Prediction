import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GraduationCap, Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/prediction", label: "Prediction" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
      isActive
        ? "text-primary-600 bg-primary-50/80 shadow-sm"
        : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
    }`;

  const mobileLinkClasses = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ease-out ${
      isActive
        ? "text-primary-600 bg-primary-50/80 shadow-sm"
        : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-xl"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-md shadow-primary-200 group-hover:shadow-lg group-hover:shadow-primary-300 transition-all duration-300 ease-out group-hover:scale-105">
              <GraduationCap className="w-6 h-6" strokeWidth={2.2} />
            </span>
            <span className="text-xl font-bold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-primary-700">
              Placement<span className="text-primary-600">Predictor</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClasses}
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/prediction"
              className="ml-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold shadow-md shadow-primary-200 hover:shadow-lg hover:shadow-primary-300 hover:-translate-y-0.5 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Get Started
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-primary-600 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute inset-x-0 top-full overflow-hidden transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-xl ${
          mobileOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-4 space-y-1.5 flex flex-col">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={mobileLinkClasses}
              end={link.to === "/"}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
              <ChevronRight className="w-5 h-5 opacity-40" />
            </NavLink>
          ))}
          <Link
            to="/prediction"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 mt-4 px-4 py-3.5 rounded-xl text-base font-bold bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md active:scale-[0.98] transition-transform duration-200"
          >
            Get Started
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;