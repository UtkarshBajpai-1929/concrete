import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToWorkspace = () => {
    document
      .getElementById("workspace")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at top,
          rgba(37,99,235,.18),
          transparent 55%),
          var(--bg)
        `,
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg,var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      />

      {/* Glow */}
      <div
        className="absolute left-1/2 top-0 h-105 w-105 -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background: "rgba(37,99,235,.20)",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-12 text-center">
        <span
          className="rounded-full px-4 py-2 text-sm font-semibold"
          style={{
            background: "var(--accent-light)",
            color: "var(--accent)",
            border: "1px solid var(--border)",
          }}
        >
          AI Powered Concrete Mix Design
        </span>

        <h1
          className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl"
          style={{
            color: "var(--text)",
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          Virtual
          <br />

          <span
            style={{
              background:
                "linear-gradient(90deg,#2563EB,#38BDF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Civil Engineering Lab
          </span>
        </h1>

        <p
          className="mt-8 max-w-3xl text-lg leading-8"
          style={{
            color: "var(--text-2)",
          }}
        >
          Design optimized concrete mixtures using particle packing
          models, artificial intelligence and predictive analytics.
          Compare different mixes, evaluate performance and generate
          engineering insights from a single workspace.
        </p>
        <Link to="/concrete-mix/">
        <button
         onClick={scrollToWorkspace}
          className="mt-12 flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white transition hover:scale-105 cursor-pointer"
          style={{
            background: "var(--accent)",
          }}
        >
          Start Designing

          <ArrowRight size={18} />
        </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;