import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import SectionHeader from "./SectionHeader";
import Navigation from "../layout/Navigation";

const initialState = {
  id: "",
  type: "",
  name: "",
  density: "",
  specificGravity: "",
  fineness: "",
  moistureContent: "",
  location: "",
  supplier: "",
  unit: "kg/m³",
  description: "",
};

const materialTypes = [
  "Cement",
  "FlyAsh",
  "GGBS",
  "UnderMicroSilica",
  "MicroSilica",
  "Sand",
  "SteelFibers",
  "CoarseAggregate",
  "FineAggregate",
  "Superplasticizer",
];

const DataForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-data",
        formData
      );
      console.log("Response:", response);
      setMessage(response.data.message || `Material added successfully by ${response.data.data.owner}.`);

      setFormData(initialState);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create material entry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <SectionHeader
        badge="DATABASE"
        title="Material Database Entry"
        description="Create and maintain a centralized repository of construction materials used for concrete mix optimization. Each material record stores its physical properties and metadata for future research and AI-assisted mix design."
      >
      </SectionHeader>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border p-10"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >

        <div className="grid lg:grid-cols-2 gap-8">

          <InputField
            label="User ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="enter your user ID"
            required
          />

          <InputField
            label="Material Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={materialTypes}
            required
          />

          <InputField
            label="Material Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="OPC 53 Grade"
            required
          />

          <InputField
            label="Density"
            name="density"
            type="number"
            value={formData.density}
            onChange={handleChange}
            placeholder="3150"
            unit="kg/m³"
            required
          />

          <InputField
            label="Specific Gravity"
            name="specificGravity"
            type="number"
            value={formData.specificGravity}
            onChange={handleChange}
            placeholder="3.15"
          />

          <InputField
            label="Fineness"
            name="fineness"
            type="number"
            value={formData.fineness}
            onChange={handleChange}
            placeholder="350"
            unit="m²/kg"
          />

          <InputField
            label="Moisture Content"
            name="moistureContent"
            type="number"
            value={formData.moistureContent}
            onChange={handleChange}
            placeholder="2.5"
            unit="%"
          />

          <InputField
            label="Source / Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Dhanbad, Jharkhand"
          />
                    <InputField
            label="Supplier / Manufacturer"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            placeholder="UltraTech Cement Ltd."
          />

          <InputField
            label="Default Unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="kg/m³"
          />
        </div>

        {/* Description */}
        <div className="mt-8">
          <InputField
            label="Description / Notes"
            name="description"
            value={formData.description}
            onChange={handleChange}
            textarea
            placeholder="Add any additional information about this material..."
          />
        </div>

        {/* Status Messages */}
        {message && (
          <div
            className="mt-8 rounded-xl border px-5 py-4"
            style={{
              background: "rgba(34,197,94,.08)",
              borderColor: "#22c55e",
              color: "#22c55e",
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            className="mt-8 rounded-xl border px-5 py-4"
            style={{
              background: "rgba(239,68,68,.08)",
              borderColor: "#ef4444",
              color: "#ef4444",
            }}
          >
            {error}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 flex flex-wrap justify-between items-center gap-5">

          <div>
            <h4
              className="font-semibold"
              style={{ color: "var(--text)" }}
            >
              Material Database
            </h4>

            <p
              className="mt-1 text-sm"
              style={{ color: "var(--text-2)" }}
            >
              Store verified material properties for future concrete mix
              optimization and research.
            </p>
          </div>

          <div className="flex gap-4">

            <button
              type="button"
              onClick={() => {
                setFormData(initialState);
                setError("");
                setMessage("");
              }}
              className="px-6 py-3 rounded-xl border transition-all duration-200 hover:opacity-90"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                background: "transparent",
              }}
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-60"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              {loading ? "Adding Entry..." : "Add Entry"}
            </button>

          </div>

        </div>

      </form>

    </section>
  );
};

export default DataForm;