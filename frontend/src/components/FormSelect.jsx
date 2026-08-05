function FormSelect({ label, id, name, value, onChange, options, error }) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id || name}
        className="text-sm font-semibold text-slate-700 mb-1.5 tracking-wide"
      >
        {label}
      </label>
      <select
        id={id || name}
        name={name || id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-900 text-sm shadow-sm transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2394a3b8%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10"
            : "border-slate-200 focus:ring-primary-500 focus:border-primary-500 hover:border-slate-300 hover:bg-white focus:bg-white"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className={`overflow-hidden transition-all duration-300 ${error ? 'max-h-6 opacity-100 mt-1.5' : 'max-h-0 opacity-0 mt-0'}`}>
        <p className="text-xs text-red-500 font-medium">{error}</p>
      </div>
    </div>
  );
}

export default FormSelect;
