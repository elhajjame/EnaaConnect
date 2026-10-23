import { ArrowRight, CalendarDays, Clock3, Hash, MapPin } from "lucide-react";

function FeedSidebar({ events, topics }) {
  return (
    <aside className="space-y-5 xl:sticky xl:top-28">
      <section
        className="rounded-3xl border border-line bg-white p-5 shadow-sm"
        aria-labelledby="upcoming-events-title"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brand-green">
              On campus
            </p>

            <h2
              id="upcoming-events-title"
              className="mt-1 font-bold text-brand-navy-dark"
            >
              Upcoming events
            </h2>
          </div>

          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-lime/25 text-brand-green">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="flex gap-3 rounded-2xl border border-line p-3 transition hover:border-brand-green/25 hover:bg-page"
            >
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand-navy text-center text-white">
                <div>
                  <p className="font-mono text-[9px] font-bold tracking-wider text-brand-lime">
                    {event.month}
                  </p>
                  <p className="text-lg font-bold leading-5">{event.day}</p>
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-brand-navy-dark">
                  {event.title}
                </h3>

                <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                  <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                  {event.time}
                </p>

                <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {event.location}
                </p>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-page text-sm font-bold text-brand-navy transition hover:bg-brand-lime/20 hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          View all events
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>

      <section
        className="rounded-3xl border border-line bg-white p-5 shadow-sm"
        aria-labelledby="topics-title"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-navy/10 text-brand-navy">
            <Hash className="h-5 w-5" aria-hidden="true" />
          </span>

          <div>
            <h2 id="topics-title" className="font-bold text-brand-navy-dark">
              Active topics
            </h2>
            <p className="text-xs text-muted">Popular around campus</p>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          {topics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className="flex w-full items-center rounded-xl px-3 py-2.5 text-left transition hover:bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              <span className="font-mono text-sm font-bold text-brand-green">
                #{topic.name}
              </span>

              <span className="ml-auto text-xs text-muted">
                {topic.postsCount} posts
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="code-grid overflow-hidden rounded-3xl bg-brand-navy p-5 text-white shadow-sm">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brand-lime">
          Campus community
        </p>

        <h2 className="mt-2 text-lg font-bold">
          Keep your classmates connected.
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/65">
          Share useful resources, ask questions, and celebrate campus moments.
        </p>
      </section>
    </aside>
  );
}

export default FeedSidebar;
