const ConcreteHero = () => {
  return (
    <section
      className="border-b pb-6"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          {/* Left */}
          <div>
            <h1
              className="text-xl md:text-3xl font-extrabold uppercase tracking-[-0.03em] leading-none"
              style={{ color: "var(--text)" }}
            >
              CONCRETE MIX{" "}
              <span style={{ color: "#FF6B3D" }}>/</span>{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#2563EB,#38BDF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                OPTIMIZATION
              </span>
            </h1>

            <p
              className="mt-3 text-xs uppercase tracking-[0.08em]"
              style={{ color: "var(--text-2)" }}
            >
              MAA MODEL • PSD ANALYSIS • RMS FITTING • AI OPTIMIZATION
            </p>
          </div>

          {/* Right */}
          <div className="grid grid-cols-3 gap-10 lg:gap-14">

            <div>
              <p
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: "var(--text)" }}
              >
                MATERIALS
              </p>

              <h3
                className="mt-2 text-3xl font-semibold"
                style={{ color: "var(--accent)" }}
              >
                7
              </h3>
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: "var(--text)" }}
              >
                MODEL
              </p>

              <h3
                className="mt-2 text-3xl font-semibold"
                style={{ color: "var(--accent)" }}
              >
                MAA
              </h3>
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: "var(--text)" }}
              >
                FITNESS
              </p>

              <h3
                className="mt-2 text-3xl font-semibold"
                style={{ color: "var(--accent)" }}
              >
                RMS
              </h3>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcreteHero;