import { Plus } from "lucide-react";

function EventsHeader({ onCreateEvent }) {
  return (
    <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green">
          Campus calendar
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-brand-navy-dark">
          Learn beyond the classroom.
        </h1>
      </div>

      <button
        type="button"
        onClick={onCreateEvent}
        className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-green/10 transition hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Create event
      </button>
    </header>
  );
}

export default EventsHeader;
