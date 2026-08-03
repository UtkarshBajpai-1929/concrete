const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  options = [],
  textarea = false,
  unit = "",
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-semibold tracking-wide"
        style={{ color: "var(--text)" }}
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {/* Select */}
      {options.length > 0 ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border px-4 py-3 outline-none transition-all duration-200 focus:ring-2"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      ) : textarea ? (
        /* Textarea */
        <textarea
          id={name}
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border px-4 py-3 resize-none outline-none transition-all duration-200 focus:ring-2"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
      ) : (
        /* Input */
        <div className="relative">
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-xl border px-4 py-3 pr-14 outline-none transition-all duration-200 focus:ring-2"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />

          {unit && (
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium"
              style={{ color: "var(--text-2)" }}
            >
              {unit}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;