const FeatureContent = ({
  badge,
  title,
  subtitle,
  description,
  features,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="flex flex-col justify-center h-full">
      <p
        className="text-xs font-semibold uppercase tracking-[0.3em]"
        style={{ color: "var(--accent)" }}
      >
        {badge}
      </p>

      <h2
        className="mt-4 text-2xl lg:text-3xl font-bold tracking-tight"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h2>

      <p
        className="mt-3 text-lg font-medium"
        style={{ color: "var(--text-2)" }}
      >
        {subtitle}
      </p>

      <p
        className="mt-6 text-base leading-8 max-w-xl"
        style={{ color: "var(--text-2)" }}
      >
        {description}
      </p>

      <div className="mt-8 space-y-3">
        {features.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />

            <span
              className="text-base"
              style={{ color: "var(--text)" }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      <a
        href={buttonLink}
        className="btn-primary mt-10 w-fit"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default FeatureContent;