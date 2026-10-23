import { useEffect, useState } from "react";
import { CalendarDays, ShieldCheck } from "lucide-react";
import { getPendingEvents, reviewEvent } from "../services/eventsService";
import { getApiErrorMessage } from "../services/api";
import PageLoader from "../components/loading/PageLoader";

function formatEventDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewingEventId, setReviewingEventId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadPendingEvents() {
      try {
        setErrorMessage("");

        const pendingEvents = await getPendingEvents();
        setEvents(pendingEvents);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    loadPendingEvents();
  }, []);

  async function handleReview(eventId, status) {
    if (reviewingEventId) {
      return;
    }

    try {
      setReviewingEventId(eventId);
      setErrorMessage("");
      setSuccessMessage("");

      await reviewEvent(eventId, status);

      setEvents((currentEvents) =>
        currentEvents.filter((event) => event.id !== eventId),
      );

      const message =
        status === "approved"
          ? "Event approved successfully."
          : "Event rejected successfully.";

      setSuccessMessage(message);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setReviewingEventId(null);
    }
  }

  return (
    <>
      <section className="mb-7 rounded-[2rem] bg-brand-navy p-5 text-white shadow-card sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/70">
              <ShieldCheck
                className="h-4 w-4 text-brand-lime"
                aria-hidden="true"
              />
              Administrator workspace
            </div>

            <h1 className="font-display text-2xl font-bold sm:text-3xl">
              Keep the community healthy.
            </h1>

            <p className="mt-2 text-sm text-white/55">
              Review event requests submitted by students.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 sm:w-40">
            <strong className="font-display text-2xl text-brand-lime">
              {events.length}
            </strong>

            <span className="mt-1 block text-xs text-white/45">
              Pending events
            </span>
          </div>
        </div>
      </section>

      {successMessage && (
        <p
          role="status"
          className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-brand-green"
        >
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      <section className="rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-card sm:p-5">
        <header>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-green">
            Approval queue
          </p>

          <h2 className="mt-1 font-display text-xl font-bold text-brand-navy-dark">
            Pending events
          </h2>
        </header>

        {isLoading && (
          <div className="grid min-h-72 place-items-center">
            <PageLoader />
          </div>
        )}

        {!isLoading && !errorMessage && events.length === 0 && (
          <div className="py-12 text-center">
            <CalendarDays
              className="mx-auto h-10 w-10 text-slate-300"
              aria-hidden="true"
            />

            <h3 className="mt-4 font-display text-lg font-bold text-brand-navy-dark">
              No pending events
            </h3>

            <p className="mt-2 text-sm text-muted">
              New event requests will appear here.
            </p>
          </div>
        )}

        {!isLoading && events.length > 0 && (
          <div className="mt-5 divide-y divide-slate-100">
            {events.map((event) => {
              const isReviewing = reviewingEventId === event.id;

              return (
                <article
                  key={event.id}
                  className="flex flex-col gap-4 py-4 first:pt-0 sm:flex-row sm:items-center"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-page text-brand-navy">
                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-brand-navy-dark">
                      {event.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Submitted by{" "}
                      {event.organizer?.fullName || "Unknown student"}
                      {" · "}
                      {formatEventDate(event.date)}
                      {" · "}
                      {event.maximumParticipants} seats
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={isReviewing}
                      onClick={() => handleReview(event.id, "rejected")}
                      className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                    >
                      Reject
                    </button>

                    <button
                      type="button"
                      disabled={isReviewing}
                      onClick={() => handleReview(event.id, "approved")}
                      className="flex-1 rounded-lg bg-brand-green px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                    >
                      {isReviewing ? "Working..." : "Approve"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default AdminEventsPage;
