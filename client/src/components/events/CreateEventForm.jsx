import { CalendarPlus, X } from "lucide-react";

const inputStyles =
  "mt-2 w-full rounded-xl border border-line bg-page px-4 py-3 text-sm text-brand-navy-dark outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";

function CreateEventForm({ isOpen, onClose }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-navy-dark/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-event-title"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.8rem] bg-white p-5 shadow-2xl sm:p-6 [scrollbar-width:thin] [scrollbar-color:var(--color-brand-green)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-green/30 [&::-webkit-scrollbar-thumb:hover]:bg-brand-green/50">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-green">
              Campus event
            </p>

            <h2
              id="create-event-title"
              className="mt-1 font-display text-2xl font-bold text-brand-navy-dark"
            >
              Create a new event
            </h2>

            <p className="mt-2 text-sm text-muted">
              Your event will be sent to an administrator for approval.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-page text-muted transition hover:bg-slate-200 hover:text-brand-navy-dark"
            aria-label="Close create event form"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="event-title"
              className="text-sm font-bold text-brand-navy-dark"
            >
              Event title
            </label>

            <input
              id="event-title"
              name="title"
              type="text"
              minLength={3}
              maxLength={100}
              placeholder="Example: React Component Clinic"
              className={inputStyles}
              required
            />
          </div>

          <div>
            <label
              htmlFor="event-description"
              className="text-sm font-bold text-brand-navy-dark"
            >
              Description
            </label>

            <textarea
              id="event-description"
              name="description"
              rows={4}
              minLength={10}
              maxLength={2000}
              placeholder="Describe what students will learn or do during the event."
              className={`${inputStyles} resize-none leading-6`}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="event-date"
                className="text-sm font-bold text-brand-navy-dark"
              >
                Date
              </label>

              <input
                id="event-date"
                name="date"
                type="date"
                className={inputStyles}
                required
              />
            </div>

            <div>
              <label
                htmlFor="event-time"
                className="text-sm font-bold text-brand-navy-dark"
              >
                Time
              </label>

              <input
                id="event-time"
                name="time"
                type="time"
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="event-location"
              className="text-sm font-bold text-brand-navy-dark"
            >
              Location
            </label>

            <input
              id="event-location"
              name="location"
              type="text"
              minLength={2}
              maxLength={200}
              placeholder="Example: Main hall"
              className={inputStyles}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="event-category"
                className="text-sm font-bold text-brand-navy-dark"
              >
                Category
              </label>

              <select
                id="event-category"
                name="category"
                defaultValue=""
                className={inputStyles}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="education">Education</option>
                <option value="sports">Sports</option>
                <option value="workshops">Workshops</option>
                <option value="culture">Culture</option>
                <option value="entertainment">Entertainment</option>
                <option value="trips">Trips</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="event-maximum-participants"
                className="text-sm font-bold text-brand-navy-dark"
              >
                Maximum participants
              </label>

              <input
                id="event-maximum-participants"
                name="maximumParticipants"
                type="number"
                min={1}
                max={1000}
                step={1}
                placeholder="Example: 30"
                className={inputStyles}
                required
              />
            </div>
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-line px-5 py-2.5 text-sm font-bold text-muted transition hover:bg-page"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-green-dark"
            >
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Create event
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default CreateEventForm;
