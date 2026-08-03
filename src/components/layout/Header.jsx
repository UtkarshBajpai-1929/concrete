import React from "react";
import ThemeButton from "../ThemeButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-lg"
      style={{
        background: "color-mix(in srgb, var(--bg) 90%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white"
            style={{
              background: "linear-gradient(135deg,#2563EB,#38BDF8)",
            }}
          >
            C
          </div>
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: "var(--text)" }}
            >
              Civil LAB
            </h1>

            <p
              className="text-xs"
              style={{ color: "var(--text-2)" }}
            >
              Virtual Lab for Civil Engineering Research
            </p>
          </div>
        </div>
        </Link>
        <ThemeButton/>
      </div>
    </header>
  );
};

export default Header;