import React from "react";
import { Beaker, Building2, CarFront } from "lucide-react";

const Navigation = () => {
  return (
    <section className="-mt-6 relative z-20">
      <div className="mx-auto flex w-fit items-center gap-8 rounded-2xl p-2 shadow-lg"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Active */}
        <button
          className="flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition"
          style={{
            background: "var(--accent)",
            color: "white",
          }}
        >
          <Beaker size={18} />
          Concrete Mix
        </button>

        {/* Coming Soon */}
        <button
          disabled
          className="flex cursor-not-allowed items-center gap-2 rounded-xl px-5 py-3"
          style={{
            color: "var(--text-2)",
          }}
        >
          <Building2 size={18} />
          Structural Design

          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              background: "var(--bg-2)",
              color: "var(--warning)",
            }}
          >
            Soon
          </span>
        </button>

        <button
          disabled
          className="flex cursor-not-allowed items-center gap-2 rounded-xl px-5 py-3"
          style={{
            color: "var(--text-2)",
          }}
        >
          <CarFront size={18} />
          Traffic Analysis

          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              background: "var(--bg-2)",
              color: "var(--warning)",
            }}
          >
            Soon
          </span>
        </button>
      </div>
    </section>
  );
};

export default Navigation;