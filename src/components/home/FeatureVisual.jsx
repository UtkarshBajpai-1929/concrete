import React from "react";

const FeatureVisual = ({ image, alt }) => {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border h-[520px] flex items-center justify-center"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "34px 34px",
        }}
      />

      {/* Blue Glow */}
      <div
        className="absolute left-1/2 top-1/2
                   -translate-x-1/2 -translate-y-1/2
                   w-[420px] h-[420px]
                   rounded-full blur-[110px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,.7) 0%, rgba(56,189,248,.35) 45%, transparent 80%)",
        }}
      />

      {/* Image */}
      <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.02]"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default FeatureVisual;