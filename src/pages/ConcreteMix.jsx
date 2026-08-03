import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ConcreteHero from "../components/concrete-mix/workspace/ConcreteHero";
import Workspace from "../components/concrete-mix/workspace/Workspace";
import Navigation from "../components/layout/Navigation";
import PackingVisualization from "../components/concrete-mix/visualization/PackingVisualization";

import { fetchMaaCurve } from "../features/concreteMix/concreteThunk";

const ConcreteMix = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMaaCurve());
  }, [dispatch]);

  return (
    <>
    <Hero/>
         <Navigation />
      {/* Particle Packing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div
          className="grid lg:grid-cols-2 gap-20 items-center rounded-3xl border p-10"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {/* Left Side */}
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em]"
              style={{ color: "var(--accent)" }}
            >
              PARTICLE PACKING THEORY
            </p>

            <h2
              className="mt-4 text-5xl font-bold leading-tight"
              style={{ color: "var(--text)" }}
            >
              Modified Andreasen & Andersen Model
            </h2>

            <p
              className="mt-6 text-lg leading-8"
              style={{ color: "var(--text-2)" }}
            >
              A well-graded particle size distribution minimizes internal voids
              by allowing progressively smaller particles to fill the spaces
              between larger ones. The MAA model provides an optimized target
              curve that improves packing density while reducing binder demand
              and enhancing the overall performance of concrete.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Higher packing density",
                "Reduced internal voids",
                "Improved workability",
                "Lower cement consumption",
                "Better compressive strength",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
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
          </div>

          {/* Right Side */}
          <div className="flex justify-center">
            <div className="w-full max-w-[520px]">
              <PackingVisualization />
            </div>
          </div>
        </div>
      </section>

      <Workspace />
    </>
  );
};

export default ConcreteMix;