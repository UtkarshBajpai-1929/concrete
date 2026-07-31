const ConcreteHero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      />

      {/* Blue Radial Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-187.5 h-187.5 rounded-full blur-[120px] opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.65) 0%, rgba(56,189,248,0.35) 45%, transparent 80%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">

          {/* Heading */}
          <h1
            className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            style={{ color: "var(--text)" }}
          >
            Concrete
            <br />

            <span
              style={{
                background:
                  "linear-gradient(90deg,#2563EB 0%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mix Optimization
            </span>
          </h1>

          {/* Description */}
          <p
            className="mt-8 mx-auto max-w-3xl text-lg leading-9"
            style={{ color: "var(--text-2)" }}
          >
            Design and optimize high-performance concrete mixtures using the
            <strong style={{ color: "var(--text)" }}>
              {" "}
              Modified Andreasen & Andersen (MAA)
            </strong>{" "}
            particle packing model. Configure material constraints, generate
            optimized candidate mixes, and evaluate them using RMS-based
            fitness analysis.
          </p>

          {/* Statistics */}
          <div className="mt-16 flex flex-wrap justify-center gap-10 md:gap-20">
            <div>
              <h3
                className="text-4xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                7
              </h3>

              <p
                className="mt-2 text-sm uppercase tracking-[0.2em]"
                style={{ color: "var(--text-2)" }}
              >
                Materials
              </p>
            </div>

            <div>
              <h3
                className="text-4xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                AI
              </h3>

              <p
                className="mt-2 text-sm uppercase tracking-[0.2em]"
                style={{ color: "var(--text-2)" }}
              >
                Optimization
              </p>
            </div>

            <div>
              <h3
                className="text-4xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                RMS
              </h3>

              <p
                className="mt-2 text-sm uppercase tracking-[0.2em]"
                style={{ color: "var(--text-2)" }}
              >
                Evaluation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcreteHero;