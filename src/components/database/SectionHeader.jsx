const SectionHeader = ({
  badge,
  title,
  description,
}) => {
  return (
    <div className="mb-10">
      {/* Badge */}
      <span
        className="inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em]"
        style={{
          background: "rgba(37,99,235,.08)",
          color: "var(--accent)",
          border: "1px solid var(--border)",
        }}
      >
        {badge}
      </span>

      {/* Title */}
      <h2
        className="mt-5 text-4xl md:text-5xl font-bold tracking-tight"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h2>

      {/* Description */}
      <p
        className="mt-4 max-w-3xl text-lg leading-8"
        style={{ color: "var(--text-2)" }}
      >
        {description}
      </p>

      {/* Divider */}
      <div
        className="mt-8 h-px w-full"
        style={{
          background:
            "linear-gradient(to right, var(--accent), transparent)",
        }}
      />
    </div>
  );
};

export default SectionHeader;