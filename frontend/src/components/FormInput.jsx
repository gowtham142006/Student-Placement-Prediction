function FormInput({ label, id, name, type = "text", step, min, value, onChange, error }) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id || name}
        className="text-sm font-semibold text-slate-700 mb-1.5 tracking-wide"
      >
        {label}
      </label>
      <input
        id={id || name}
        name={name || id}
        type={type}
        step={step}
        min={min}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-900 text-sm placeholder-slate-400 shadow-sm transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10"
            : "border-slate-200 focus:ring-primary-500 focus:border-primary-500 hover:border-slate-300 hover:bg-white focus:bg-white"
        }`}
      />
      <div className={`overflow-hidden transition-all duration-300 ${error ? 'max-h-6 opacity-100 mt-1.5' : 'max-h-0 opacity-0 mt-0'}`}>
        <p className="text-xs text-red-500 font-medium">{error}</p>
      </div>
    </div>
  );
}

export default FormInput;
