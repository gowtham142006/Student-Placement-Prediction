function SectionHeading({ title, subtitle, light = false }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2
        className={`text-3xl md:text-4xl font-bold tracking-tight ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-lg max-w-2xl mx-auto ${
            light ? "text-indigo-100" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 mx-auto h-1 w-16 rounded-full ${
          light ? "bg-white/40" : "bg-primary-500"
        }`}
      />
    </div>
  );
}

export default SectionHeading;
