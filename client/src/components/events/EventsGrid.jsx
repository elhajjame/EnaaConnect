import { CalendarDays } from "lucide-react";
import EventCard from "./EventCard";

function EventsGrid({ events, onJoin, joiningEventId }) {
  if (events.length === 0) {
    return (
      <div
        className="rounded-[1.7rem] border border-slate-200 bg-white
        px-4 py-12 text-center shadow-card sm:px-6 sm:py-14"
      >
        <CalendarDays
          className="mx-auto h-10 w-10 text-slate-300"
          aria-hidden="true"
        />

        <h2 className="mt-4 font-display text-lg font-bold text-brand-navy-dark sm:text-xl">
          No events available
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          New campus events will appear here.
        </p>
      </div>
    );
  }

  return (
    <section
      className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3"
      aria-label="Campus events"
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onJoin={onJoin}
          isJoining={joiningEventId === event.id}
        />
      ))}
    </section>
  );
}

export default EventsGrid;
