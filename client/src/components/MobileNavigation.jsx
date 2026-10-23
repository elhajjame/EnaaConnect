import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function MobileNavigation() {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    <nav
      className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-2xl border border-white/70 bg-brand-navy/95 p-2 text-white shadow-2xl backdrop-blur lg:hidden"
      aria-label="Mobile navigation"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 ${
            isActive ? "bg-white/10 text-white" : "text-white/65"
          }`
        }
      >
        <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
        <span className="text-[9px] font-semibold">Home</span>
      </NavLink>

      <NavLink
        to="/events"
        className={({ isActive }) =>
          `flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 ${
            isActive ? "bg-white/10 text-white" : "text-white/65"
          }`
        }
      >
        <CalendarDays className="h-5 w-5" aria-hidden="true" />
        <span className="text-[9px] font-semibold">Events</span>
      </NavLink>

      <NavLink
        to="/clubs"
        className={({ isActive }) =>
          `flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 ${
            isActive ? "bg-white/10 text-white" : "text-white/65"
          }`
        }
      >
        <UsersRound className="h-5 w-5" aria-hidden="true" />
        <span className="text-[9px] font-semibold">Clubs</span>
      </NavLink>

      <NavLink
        to="/messages"
        className={({ isActive }) =>
          `flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 ${
            isActive ? "bg-white/10 text-white" : "text-white/65"
          }`
        }
      >
        <MessagesSquare className="h-5 w-5" aria-hidden="true" />
        <span className="text-[9px] font-semibold">Messages</span>
      </NavLink>

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-white/65 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={isLoggingOut ? "Signing out" : "Log out"}
      >
        <LogOut className="h-5 w-5" aria-hidden="true" />

        <span className="text-[9px] font-semibold">
          {isLoggingOut ? "Leaving..." : "Logout"}
        </span>
      </button>
    </nav>
  );
}

export default MobileNavigation;
