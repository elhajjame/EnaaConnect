import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MapPinned,
  MessagesSquare,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import getInitials from "../utils/getInitials";

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
    badge: "Soon",
    badgeStyle: "bg-white/10 text-white/60",
  },
  {
    label: "Trips",
    path: "/trips",
    icon: MapPinned,
    badge: "Soon",
    badgeStyle: "bg-white/10 text-white/60",
  },
  {
    label: "Messages",
    path: "/messages",
    icon: MessagesSquare,
    badge: "Soon",
    badgeStyle: "bg-white/10 text-white/60",
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
    adminOnly: true,
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
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const visiblePersonalLinks = personalLinks.filter(
    (item) => !item.adminOnly || user?.role === "admin",
  );

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logout();
    } catch {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <aside
        id="mobile-sidebar"
        className="code-grid invisible fixed inset-y-0 left-0 z-50 flex w-[17rem] -translate-x-full flex-col overflow-hidden bg-brand-navy text-white transition-transform duration-300 lg:visible lg:translate-x-0"
        aria-label="Main navigation"
      >
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-green/25 blur-3xl" />
        <div className="absolute -right-24 top-20 h-52 w-52 rounded-full bg-brand-lime/10 blur-3xl" />

        <div className="relative z-10 flex h-20 items-center justify-between border-b border-white/10 px-5">
          <Logo />

          <a
            href="#"
            className="grid h-9 w-9 place-items-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <nav className="sidebar-scrollbar-hidden relative z-10 flex-1 overflow-y-auto px-4 py-5">
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
            {visiblePersonalLinks.map((item) => (
              <SidebarLink key={item.path} item={item} />
            ))}
          </div>
        </nav>

        <div className="relative z-10 m-4 rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 backdrop-blur">
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-lime to-brand-green text-sm font-bold text-brand-navy-dark"
            >
              {getInitials(user?.fullName)}
            </Link>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {user?.fullName || "ENAA student"}
              </p>
              <p className="truncate text-xs text-white/45">
                {user?.fieldOfStudy || "ENAA student"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-label={isLoggingOut ? "Signing out" : "Sign out"}
              title={isLoggingOut ? "Signing out" : "Sign out"}
              type="button"
              className="cursor-pointer grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>

      <a
        href="#"
        className="sidebar-backdrop pointer-events-none fixed inset-0 z-[45] bg-brand-navy-dark/55 opacity-0 backdrop-blur-sm transition-opacity lg:hidden"
        aria-label="Close navigation menu"
        tabIndex={-1}
      />
    </>
  );
}

export default Sidebar;
