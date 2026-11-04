import { useEffect } from "react";
import { UsersRound, X } from "lucide-react";
import getInitials from "../../utils/getInitials";
import { Link } from "react-router-dom";

const avatarColors = ["bg-brand-lime", "bg-[#86c48f]", "bg-[#b8d3e6]"];

function EventParticipantsModal({
  event,
  participants,
  loading,
  error,
  onRetry,
  onClose,
}) {
  useEffect(() => {
    function handleEscape(keyEvent) {
      if (keyEvent.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-navy-dark/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-participants-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0"
        aria-label="Close participants"
      />

      <div className="relative flex max-h-[min(88vh,42rem)] w-full max-w-lg flex-col overflow-hidden rounded-[1.8rem] bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-green">
              Campus event
            </p>
            <h2
              id="event-participants-title"
              className="mt-1 font-display text-2xl font-bold text-brand-navy-dark"
            >
              Participants
            </h2>
            <p className="mt-1 truncate text-sm text-slate-500">
              {event.title}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-page text-slate-500 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            aria-label="Close participants"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="flex items-center justify-between gap-3 bg-green-50 px-5 py-3 sm:px-6">
          <p className="text-xs font-bold text-brand-green">
            {loading
              ? "Loading participants..."
              : `${error ? event.participantsCount : participants.length} students joined`}
          </p>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-green">
            Joined students
          </span>
        </div>

        <div className="min-h-0 overflow-y-auto px-5 py-1 sm:px-6">
          {loading && (
            <p role="status" className="py-8 text-center text-sm text-slate-500">
              Loading participants...
            </p>
          )}

          {!loading && error && (
            <div className="py-8 text-center">
              <p role="alert" className="text-sm text-red-700">{error}</p>
              <button
                type="button"
                onClick={onRetry}
                className="mt-4 rounded-xl border border-brand-green px-4 py-2.5 text-sm font-bold text-brand-green"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && participants.length === 0 && (
            <div className="py-8 text-center">
              <UsersRound className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-brand-navy-dark">
                No participants yet
              </p>
            </div>
          )}

          {!loading && !error && participants.length > 0 && (
            <ul>
              {participants.map((participant, index) => (
                <li
                  key={participant.id}
                  className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0"
                >
                  {participant.profilePicture ? (
                    <img
                      src={participant.profilePicture}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-2xl object-cover"
                    />
                  ) : (
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-sm font-bold text-brand-navy-dark ${avatarColors[index % avatarColors.length]}`}
                      aria-hidden="true"
                    >
                      {getInitials(participant.fullName)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <Link to={`/profile/${participant.id}`} className="block truncate text-sm font-bold text-brand-navy-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">
                      {participant.fullName}
                    </Link>
                    {participant.fieldOfStudy && (
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {participant.fieldOfStudy}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventParticipantsModal;
