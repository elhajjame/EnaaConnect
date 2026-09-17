import { NavLink } from "react-router-dom";

const tabs = [
  {
    label: "Sign in",
    path: "/login",
  },
  {
    label: "Create account",
    path: "/register",
  },
];

function AuthTabs() {
  return (
    <nav
      className="mb-7 grid grid-cols-2 gap-1 rounded-2xl bg-slate-200/70 p-1.5"
      aria-label="Authentication options"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `rounded-xl px-4 py-2.5 text-center text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20 ${
              isActive
                ? "bg-white text-brand-navy shadow-[0_8px_22px_rgba(24,56,98,0.08)]"
                : "text-slate-500 hover:text-brand-navy"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default AuthTabs;
