function FormSlider({ label, id, name, value, onChange, min = 0, max = 100, error }) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col group">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id || name} className="text-sm font-semibold text-slate-700 tracking-wide">
          {label}
        </label>
        <span className={`text-sm font-bold px-3 py-1 rounded-lg tabular-nums transition-colors duration-300 ${error ? 'bg-red-100 text-red-700' : 'bg-primary-50 text-primary-700'}`}>
          {value}
        </span>
      </div>

      {/* Track container */}
      <div className="relative mt-2 mb-1">
        {/* Custom track background */}
        <div className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2.5 rounded-full pointer-events-none transition-colors duration-300 ${error ? 'bg-red-100' : 'bg-slate-100'}`} />
        {/* Filled track */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-0 h-2.5 rounded-full pointer-events-none transition-all duration-300 ease-out ${error ? 'bg-red-500' : 'bg-gradient-to-r from-primary-500 to-accent-500'}`}
          style={{ width: `${percentage}%` }}
        />

        {/* Native range input */}
        <input
          id={id || name}
          name={name || id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className={`relative w-full h-2.5 appearance-none bg-transparent cursor-pointer z-10 focus:outline-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-[3px]
            ${error ? '[&::-webkit-slider-thumb]:border-red-500' : '[&::-webkit-slider-thumb]:border-primary-500'}
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-300
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-webkit-slider-thumb]:hover:shadow-lg
            focus:[&::-webkit-slider-thumb]:ring-4
            ${error ? 'focus:[&::-webkit-slider-thumb]:ring-red-500/30' : 'focus:[&::-webkit-slider-thumb]:ring-primary-500/30'}
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-[3px]
            ${error ? '[&::-moz-range-thumb]:border-red-500' : '[&::-moz-range-thumb]:border-primary-500'}
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:duration-300
            [&::-moz-range-thumb]:hover:scale-125
            [&::-moz-range-thumb]:hover:shadow-lg
            [&::-moz-range-track]:bg-transparent
            [&::-moz-range-track]:h-2.5
          `}
        />
      </div>

      {/* Min/Max labels & Error */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs font-medium text-slate-400">{min}</span>
        <div className={`overflow-hidden transition-all duration-300 ${error ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'}`}>
           <span className="text-xs text-red-500 font-bold">{error}</span>
        </div>
        <span className="text-xs font-medium text-slate-400">{max}</span>
      </div>
    </div>
  );
}

export default FormSlider;
