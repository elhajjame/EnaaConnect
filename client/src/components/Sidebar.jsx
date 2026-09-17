import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MapPinned,
  MessagesSquare,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const workspaceLinks = [
  {
    label: "Campus feed",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Events",
    path: "/events",
    icon: CalendarDays,
    badge: "3",
    badgeStyle: "bg-brand-lime text-brand-navy-dark",
  },
  {
    label: "Clubs",
    path: "/clubs",
    icon: UsersRound,
  },
  {
    label: "Trips",
    path: "/trips",
    icon: MapPinned,
  },
  {
    label: "Messages",
    path: "/messages",
    icon: MessagesSquare,
    badge: "5",
    badgeStyle: "bg-white/15 text-white",
  },
];

const personalLinks = [
  {
    label: "My profile",
    path: "/profile",
    icon: UserRound,
  },
  {
    label: "Admin preview",
    path: "/admin",
    icon: ShieldCheck,
  },
];

function SidebarLink({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />

      <span>{item.label}</span>

      {item.badge && (
        <span
          className={`ml-auto grid min-w-5 place-items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ${item.badgeStyle}`}
        >
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}

function Sidebar() {
  return (
    <aside
      className="code-grid fixed inset-y-0 left-0 z-50 hidden w-[17rem] flex-col overflow-hidden bg-brand-navy text-white lg:flex"
      aria-label="Main navigation"
    >
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-green/25 blur-3xl" />
      <div className="absolute -right-24 top-20 h-52 w-52 rounded-full bg-brand-lime/10 blur-3xl" />

      <div className="relative z-10 flex h-20 items-center border-b border-white/10 px-5">
        <Logo />
      </div>

      <nav className="relative z-10 flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-2 px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
          Workspace
        </p>

        <div className="space-y-1">
          {workspaceLinks.map((item) => (
            <SidebarLink key={item.path} item={item} />
          ))}
        </div>

        <p className="mb-2 mt-7 px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
          Personal
        </p>

        <div className="space-y-1">
          {personalLinks.map((item) => (
            <SidebarLink key={item.path} item={item} />
          ))}
        </div>
      </nav>

      <div className="relative z-10 m-4 rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-lime to-brand-green text-sm font-bold text-brand-navy-dark">
            ME
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">Mehdi El Hajjame</p>
            <p className="truncate text-xs text-white/45">MERN class</p>
          </div>

          <button
            type="button"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
