function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1">
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 text-primary-600 text-2xl mb-5 group-hover:bg-primary-100 transition-colors duration-300">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

export default FeatureCard;
