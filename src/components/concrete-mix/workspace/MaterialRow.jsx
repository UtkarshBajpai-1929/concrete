const MaterialRow = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}) => {
  const minId = `${label.toLowerCase().replace(/\s+/g, "-")}-min`;
  const maxId = `${label.toLowerCase().replace(/\s+/g, "-")}-max`;

  return (
    <div className="grid gap-3 rounded-xl p-3 md:grid-cols-[1fr_120px_120px] md:items-center">
      <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
        {label}
      </p>

      <div>
        <label className="sr-only" htmlFor={minId}>
          {label} minimum kg
        </label>
        <input
          id={minId}
          className="input"
          type="number"
          min="0"
          inputMode="decimal"
          placeholder="Min"
          value={minValue}
          onChange={(event) => onMinChange(event.target.value)}
        />
      </div>

      <div>
        <label className="sr-only" htmlFor={maxId}>
          {label} maximum kg
        </label>
        <input
          id={maxId}
          className="input"
          type="number"
          min="0"
          inputMode="decimal"
          placeholder="Max"
          value={maxValue}
          onChange={(event) => onMaxChange(event.target.value)}
        />
      </div>
    </div>
  );
};

export default MaterialRow;
