function SectionHeading({ title, subtitle, light = false }) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
            light ? "text-indigo-100/90" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 mx-auto h-1.5 w-16 rounded-full ${
          light ? "bg-white/30" : "bg-gradient-to-r from-primary-500 to-accent-500"
        }`}
      />
    </div>
  );
}

export default SectionHeading;
