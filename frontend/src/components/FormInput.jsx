function FormInput({ label, id, type = "text", step, min, value, onChange }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        step={step}
        min={min}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 hover:border-slate-300"
      />
    </div>
  );
}

export default FormInput;
