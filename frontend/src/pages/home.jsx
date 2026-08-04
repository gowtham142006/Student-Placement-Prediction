import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import FeatureCard from "../components/FeatureCard";

/* ── Data ── */
const features = [
  {
    icon: "🤖",
    title: "AI-Powered Predictions",
    description:
      "Leverage advanced machine learning algorithms trained on real-world placement data to deliver highly accurate predictions.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Get instant placement predictions in milliseconds. No waiting, no delays — results appear before you blink.",
  },
  {
    icon: "🎯",
    title: "Accurate Results",
    description:
      "Our model is trained and validated on comprehensive datasets ensuring reliable, data-driven placement insights.",
  },
  {
    icon: "📊",
    title: "Data-Driven Insights",
    description:
      "Understand which factors influence placement outcomes the most through clear, actionable data analysis.",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description:
      "Your academic data stays safe. We process predictions without storing any personal information.",
  },
  {
    icon: "📱",
    title: "Works Everywhere",
    description:
      "Fully responsive design that works seamlessly across desktop, tablet, and mobile devices.",
  },
];

const techStack = [
  { name: "React", icon: "⚛️", color: "from-sky-400 to-blue-500" },
  { name: "Vite", icon: "⚡", color: "from-violet-500 to-purple-600" },
  { name: "Tailwind CSS", icon: "🎨", color: "from-cyan-400 to-teal-500" },
  { name: "Python", icon: "🐍", color: "from-yellow-400 to-amber-500" },
  { name: "Scikit-learn", icon: "🧠", color: "from-orange-400 to-red-500" },
  { name: "Spring Boot", icon: "🍃", color: "from-emerald-400 to-green-600" },
];

const steps = [
  {
    step: "01",
    title: "Enter Your Details",
    description:
      "Fill in your academic scores, technical skills, and relevant information in our simple, intuitive form.",
    icon: "📝",
  },
  {
    step: "02",
    title: "AI Analyzes Data",
    description:
      "Our machine learning model processes your inputs against trained placement patterns to generate a prediction.",
    icon: "🔬",
  },
  {
    step: "03",
    title: "Get Your Result",
    description:
      "Receive a clear, instant prediction about your placement likelihood along with key influencing factors.",
    icon: "🏆",
  },
];

function Home() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary-400/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered Placement Prediction
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Predict Your Campus
            <br />
            <span className="bg-gradient-to-r from-primary-200 via-accent-400 to-primary-200 bg-clip-text text-transparent">
              Placement Success
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Leverage the power of machine learning to know your placement
            chances. Enter your academic details and get an instant, data-driven
            prediction.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/prediction"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-primary-700 font-semibold text-base shadow-xl shadow-primary-900/30 hover:shadow-2xl hover:shadow-primary-900/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Predict Placement
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "95%", label: "Accuracy" },
              { value: "<1s", label: "Response" },
              { value: "10+", label: "Features" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-indigo-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose PlacementPredictor?"
            subtitle="Built with cutting-edge technology to give you the most reliable placement predictions."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology Stack Section ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Built With Modern Tech"
            subtitle="A powerful combination of frontend, backend, and machine learning technologies."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} text-2xl shadow-md`}
                >
                  {tech.icon}
                </div>
                <span className="text-sm font-semibold text-slate-700 text-center">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-primary-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Three simple steps to predict your placement outcome."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gradient-to-r from-white/30 to-white/10" />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Step number circle */}
                  <div className="flex items-center justify-center w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 text-4xl mb-6 shadow-lg">
                    {item.icon}
                  </div>

                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white tracking-wider mb-3">
                    STEP {item.step}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-indigo-100/80 text-sm leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Ready to Predict Your Placement?
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Take the first step towards knowing your placement chances. It's
            quick, free, and completely data-driven.
          </p>
          <Link
            to="/prediction"
            className="group inline-flex items-center gap-2 mt-8 px-10 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold text-lg shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Prediction
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;