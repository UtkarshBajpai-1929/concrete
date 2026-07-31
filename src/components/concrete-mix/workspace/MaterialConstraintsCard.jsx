import MaterialRow from "./MaterialRow";

const materialRows = [
  { key: "cement", label: "Cement" },
  { key: "flyAsh", label: "Fly Ash" },
  { key: "ggbs", label: "GGBS" },
  { key: "underMicroSilica", label: "UndenMicro Silica" },
  { key: "microSilica", label: "Micro Silica" },
  { key: "sand", label: "Sand" },
  { key: "steelFibers", label: "Steel Fibers" },
];

const MaterialConstraintsCard = ({ materials, onMaterialChange }) => {
  return (
    <div className="card p-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
          Material Constraints
        </h2>

        <div
          className="hidden grid-cols-2 gap-3 text-xs font-semibold uppercase md:grid md:w-[252px]"
          style={{ color: "var(--text-2)" }}
        >
          <span>Minimum (kg)</span>
          <span>Maximum (kg)</span>
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        {materialRows.map((material) => (
          <MaterialRow
            key={material.key}
            label={material.label}
            minValue={materials[material.key].min}
            maxValue={materials[material.key].max}
            onMinChange={(value) =>
              onMaterialChange(material.key, "min", value)
            }
            onMaxChange={(value) =>
              onMaterialChange(material.key, "max", value)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MaterialConstraintsCard;
