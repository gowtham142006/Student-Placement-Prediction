import { Link } from "react-router-dom";
import { GraduationCap, Mail, ArrowRight } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/prediction", label: "Prediction" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Project Info */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/20">
                <GraduationCap className="w-5 h-5" strokeWidth={2.2} />
              </span>
              <span className="text-xl font-bold text-white tracking-tight">
                Placement<span className="text-primary-400">Predictor</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              An AI-powered system that predicts student placement outcomes using
              machine learning and academic data analysis.
            </p>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              Quick Links
              <div className="h-px bg-slate-800 flex-grow ml-2"></div>
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group text-slate-400 hover:text-primary-400 text-sm transition-all duration-300 inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
                  >
                    <ArrowRight className="w-4 h-4 text-primary-500/0 group-hover:text-primary-500/100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="-translate-x-6 group-hover:translate-x-0 transition-all duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              Connect
              <div className="h-px bg-slate-800 flex-grow ml-2"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md p-1 -ml-1 w-fit"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </span>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@placementpredictor.com"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md p-1 -ml-1 w-fit"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </span>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Student Placement Prediction System.
          </p>
          <p className="text-slate-600 text-sm">
            Designed for modern students.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;