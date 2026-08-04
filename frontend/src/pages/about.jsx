import SectionHeading from "../components/SectionHeading";
import FeatureCard from "../components/FeatureCard";

/* ── Data ── */
const features = [
  {
    icon: "🤖",
    title: "Machine Learning Model",
    description:
      "Uses classification algorithms trained on historical placement data to deliver accurate predictions.",
  },
  {
    icon: "📋",
    title: "Comprehensive Input Form",
    description:
      "Collects academic scores, skill ratings, and relevant metrics through an intuitive, user-friendly interface.",
  },
  {
    icon: "📊",
    title: "Real-Time Results",
    description:
      "Instant predictions with clear outcomes — no wait times, no delays, fully responsive experience.",
  },
  {
    icon: "🌐",
    title: "Modern Web Stack",
    description:
      "Built with React, Spring Boot, and Python for a fast, scalable, and maintainable application.",
  },
  {
    icon: "📱",
    title: "Responsive Design",
    description:
      "Works seamlessly across all devices — desktop, tablet, and mobile — with a modern UI/UX.",
  },
  {
    icon: "🔄",
    title: "Extensible Architecture",
    description:
      "Modular design allows easy integration of new features, models, and data sources in the future.",
  },
];

const technologies = [
  { name: "React", category: "Frontend", color: "bg-sky-100 text-sky-700 border-sky-200" },
  { name: "Vite", category: "Build Tool", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { name: "Tailwind CSS", category: "Styling", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { name: "React Router", category: "Routing", color: "bg-rose-100 text-rose-700 border-rose-200" },
  { name: "Spring Boot", category: "Backend", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { name: "Python", category: "ML", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { name: "Scikit-learn", category: "ML Library", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { name: "Pandas", category: "Data Processing", color: "bg-blue-100 text-blue-700 border-blue-200" },
];

const workflowSteps = [
  {
    step: "1",
    title: "Data Collection",
    description: "Historical placement data is gathered and preprocessed from academic records.",
  },
  {
    step: "2",
    title: "Model Training",
    description: "Machine learning algorithms are trained on the cleaned dataset to learn placement patterns.",
  },
  {
    step: "3",
    title: "User Input",
    description: "Students enter their academic details and skill information through the web interface.",
  },
  {
    step: "4",
    title: "Prediction",
    description: "The trained model analyzes the input and generates a real-time placement prediction.",
  },
  {
    step: "5",
    title: "Result Display",
    description: "The prediction outcome is displayed clearly with confidence metrics and insights.",
  },
];

const futureScope = [
  "Integration with college databases for automated data fetching",
  "Multi-model ensemble for improved prediction accuracy",
  "Detailed analytics dashboard with placement trends",
  "Resume-based skill extraction using NLP",
  "Company recommendation engine based on student profiles",
  "Admin panel for model retraining with new data",
];

function About() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent-500/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary-300/15 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
            📖 About the Project
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Student Placement
            <br />
            <span className="bg-gradient-to-r from-primary-200 via-accent-400 to-primary-200 bg-clip-text text-transparent">
              Prediction System
            </span>
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            A smart, data-driven system designed to help students gauge their
            placement chances using the power of machine learning.
          </p>
        </div>
      </section>

      {/* ── Project Overview ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 to-primary-50/30 rounded-2xl p-8 md:p-10 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100 text-primary-600 text-xl">
                🔍
              </span>
              Project Overview
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The Student Placement Prediction System is a full-stack web
              application that leverages machine learning algorithms to predict
              whether a student is likely to be placed during campus recruitment.
              By analyzing academic performance, technical skills, and other
              relevant factors, the system provides reliable, data-driven
              predictions to help students prepare better for their placement
              journey.
            </p>
          </div>
        </div>
      </section>

      {/* ── Objective ── */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 text-xl">
                🎯
              </span>
              Objective
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The primary objective of this project is to build an intelligent
              system that can accurately predict student placement outcomes based
              on measurable academic and skill-based inputs. By providing early
              insights, the system empowers students to identify areas for
              improvement and take proactive steps to enhance their employability
              before placement season arrives.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Key Features"
            subtitle="Everything you need in a placement prediction platform."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Technologies Used ── */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Technologies Used"
            subtitle="A modern stack combining the best of web and ML technologies."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className={`flex flex-col items-center gap-2 p-5 rounded-xl border ${tech.color} transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
              >
                <span className="text-sm font-semibold">{tech.name}</span>
                <span className="text-xs opacity-70">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Workflow of the System"
            subtitle="The complete pipeline from data collection to prediction."
          />

          <div className="space-y-6">
            {workflowSteps.map((item, index) => (
              <div key={item.step} className="flex gap-5 items-start">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-sm shadow-md shrink-0">
                    {item.step}
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="w-px h-full min-h-[2rem] bg-gradient-to-b from-primary-300 to-primary-100 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Future Scope ── */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-60 h-60 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-primary-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Future Scope"
            subtitle="Planned enhancements and features on the roadmap."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {futureScope.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white/90"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;