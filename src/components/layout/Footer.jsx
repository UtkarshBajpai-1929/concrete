const Footer = () => {
  return (
    <footer
      className="mt-24 border-t"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* About */}
          <div>
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Civil LAB
            </h2>

            <p
              className="mt-5 text-sm leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              An AI-assisted research platform for concrete mix optimization
              using Modified Andreasen & Andersen particle packing theory,
              intelligent material selection, and data-driven engineering
              workflows.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              <span>Research</span>
              <span>•</span>
              <span>Optimization</span>
              <span>•</span>
              <span>Artificial Intelligence</span>
            </div>
          </div>

          {/* Research Guidance */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-6"
              style={{ color: "var(--text)" }}
            >
              Research Guidance
            </h3>

            <div className="space-y-5">
              <a
                href="https://www.linkedin.com/in/chandrashekhar-lakavath-833b9b85/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex justify-between items-center border-b pb-3"
                style={{ borderColor: "var(--border)" }}
              >
                <span style={{ color: "var(--text)" }}>
                  Dr. Chandrashekhar Lakavath
                </span>

                <span
                  className="text-lg group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--accent)" }}
                >
                  ↗
                </span>
              </a>

              <a
                href="https://linkedin.com/in/SENIOR1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex justify-between items-center border-b pb-3"
                style={{ borderColor: "var(--border)" }}
              >
                <span style={{ color: "var(--text)" }}>
                  Senior Name
                </span>

                <span
                  className="text-lg group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--accent)" }}
                >
                  ↗
                </span>
              </a>

              <a
                href="https://linkedin.com/in/SENIOR2"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex justify-between items-center"
              >
                <span style={{ color: "var(--text)" }}>
                  Senior Name
                </span>

                <span
                  className="text-lg group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--accent)" }}
                >
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Team */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-6"
              style={{ color: "var(--text)" }}
            >
              Development Team
            </h3>

            <div className="space-y-5">
              
              <a
                href="https://www.linkedin.com/in/siddharth-maurya-0388bb320/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex justify-between items-center"
              >
                <span style={{ color: "var(--text)" }}>
                  Siddharth Maurya
                </span>

                <span
                  className="text-lg group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--accent)" }}
                >
                  ↗
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/utkarsh-bajpai-b76549320"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex justify-between items-center border-b pb-3"
                style={{ borderColor: "var(--border)" }}
              >
                <span style={{ color: "var(--text)" }}>
                  Utkarsh Bajpai
                </span>

                <span
                  className="text-lg group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--accent)" }}
                >
                  ↗
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/mahadev-kumar-15b2ba320/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex justify-between items-center border-b pb-3"
                style={{ borderColor: "var(--border)" }}
              >
                <span style={{ color: "var(--text)" }}>
                  Mahadev Kumar
                </span>

                <span
                  className="text-lg group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--accent)" }}
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-14 mb-6"
          style={{
            height: "1px",
            background: "var(--border)",
          }}
        />

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>Version 1.0.0</span>

          <span className="text-center">
            Developed at the Indian Institute of Technology (ISM) Dhanbad for
            AI-assisted concrete mix design research.
          </span>

          <span>
            © {new Date().getFullYear()} CivilAI
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;