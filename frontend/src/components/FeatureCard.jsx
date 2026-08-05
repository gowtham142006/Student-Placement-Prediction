function FeatureCard({ icon: Icon, title, description, colorClass = "text-primary-600", bgClass = "bg-primary-50" }) {
  return (
    <div className="group relative bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-500 hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 overflow-hidden">
      {/* Gradient accent reveal */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-500 transform origin-left" />

      <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${bgClass} ${colorClass} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out shadow-sm`}>
        {Icon ? <Icon className="w-6 h-6" strokeWidth={2.2} /> : null}
      </div>

      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-primary-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-500 leading-relaxed text-sm md:text-base relative z-10">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
