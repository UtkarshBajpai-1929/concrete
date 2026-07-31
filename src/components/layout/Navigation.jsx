import { NavLink } from "react-router-dom";
import { House, Beaker, Building2, CarFront } from "lucide-react";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "Concrete Mix",
    path: "/concrete-mix",
    icon: Beaker,
  },
  {
    name: "Structural Design",
    path: "/structural-design",
    icon: Building2,
  },
  {
    name: "Traffic Analysis",
    path: "/traffic-analysis",
    icon: CarFront,
  },
];

const Navigation = () => {
  return (
    <section className="-mt-6 relative z-20">
      <div
        className="mx-auto flex w-fit flex-wrap items-center gap-2 rounded-2xl py-2 px-12 shadow-lg"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition-all duration-200 ${
                  isActive ? "shadow-md" : ""
                }`
              }
              style={({ isActive }) => ({
                background: isActive
                  ? "var(--accent)"
                  : "transparent",
                color: isActive ? "#fff" : "var(--text-2)",
              })}
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Navigation;