import PredictionForm from "../components/PredictionForm";

function Prediction() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 md:py-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 rounded-full bg-primary-400/20 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Placement Predictor
          </h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Enter your academic performance, project details, and skill scores
            below to get an AI-powered prediction of your placement chances.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PredictionForm />
        </div>
      </section>
    </>
  );
}

export default Prediction;