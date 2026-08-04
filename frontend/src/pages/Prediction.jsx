import { Link } from "react-router-dom";

function Prediction() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-4xl shadow-lg shadow-primary-200 mb-8">
          🔮
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Prediction Engine
        </h1>

        <p className="mt-4 text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
          Our AI-powered prediction form is coming soon. You&apos;ll be able to
          enter your academic details and receive an instant placement
          prediction.
        </p>

        {/* Coming Soon Card */}
        <div className="mt-10 bg-white rounded-2xl p-8 border border-slate-100 shadow-md">
          <div className="flex items-center justify-center gap-2 text-primary-600 font-semibold text-sm mb-3">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Under Development
          </div>
          <p className="text-slate-500 text-sm">
            The prediction form with ML model integration will be available in
            Phase 2. Stay tuned for updates!
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold text-sm shadow-md shadow-primary-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}

export default Prediction;