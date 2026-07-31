const maaFields = [
  { key: "q", label: "q Value" },
  { key: "dmin", label: "Dmin (\u00b5m)" },
  { key: "dmax", label: "Dmax (\u00b5m)" },
];

const MAAParametersCard = ({ maa, onFieldChange }) => {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
        MAA Parameters
      </h2>

      <div className="mt-5 grid gap-4">
        {maaFields.map((field) => (
          <div key={field.key}>
            <label className="label" htmlFor={`maa-${field.key}`}>
              {field.label}
            </label>
            <input
              id={`maa-${field.key}`}
              className="input"
              type="number"
              inputMode="decimal"
              value={maa[field.key]}
              onChange={(event) =>
                onFieldChange(field.key, event.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MAAParametersCard;
