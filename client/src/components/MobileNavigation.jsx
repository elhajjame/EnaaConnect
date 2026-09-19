import {
  CalendarDays,
  LayoutDashboard,
  MessagesSquare,
  Plus,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function MobileNavigation({ onCreateClick }) {
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

      <button
        type="button"
        onClick={onCreateClick}
        className="-mt-7 grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl border-4 border-brand-mist bg-brand-lime text-brand-navy-dark shadow-lg"
        aria-label="Create"
      >
        <Plus className="h-6 w-6" aria-hidden="true" />
      </button>

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
    </nav>
  );
}

export default MobileNavigation;
