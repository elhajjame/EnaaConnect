import { CalendarDays } from "lucide-react";
import EventCard from "./EventCard";
import EventParticipantsModal from "./EventParticipantsModal";
import { useRef, useState } from "react";
import { getParticipants } from "../../services/eventsService";
import { getApiErrorMessage } from "../../services/api";

function EventsGrid({
  events,
  onJoin,
  onLeave,
  leavingEventId,
  joiningEventId,
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participantsByEvent, setParticipantsByEvent] = useState({});
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [participantsError, setParticipantsError] = useState("");
  const latestRequest = useRef(0);

  async function openParticipants(event) {
    const requestNumber = ++latestRequest.current;
    setSelectedEvent(event);
    clearParticipantPreview(event.id);
    setParticipantsError("");
    setParticipantsLoading(true);
    try {
      const result = await getParticipants(event.id);
      if (requestNumber === latestRequest.current) {
        setParticipantsByEvent((current) => ({
          ...current,
          [event.id]: result.participants,
        }));
      }
    } catch (error) {
      if (requestNumber === latestRequest.current) {
        setParticipantsError(getApiErrorMessage(error));
      }
    } finally {
      if (requestNumber === latestRequest.current) {
        setParticipantsLoading(false);
      }
    }
  }

  function closeParticipants() {
    latestRequest.current += 1;
    setSelectedEvent(null);
  }

  function clearParticipantPreview(eventId) {
    setParticipantsByEvent((current) => {
      const updated = { ...current };
      delete updated[eventId];
      return updated;
    });
  }

  function handleJoin(eventId) {
    clearParticipantPreview(eventId);
    onJoin(eventId);
  }

  function handleLeave(eventId) {
    clearParticipantPreview(eventId);
    onLeave(eventId);
  }
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
    <>
      <section
        id="events-list"
        className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3"
        aria-label="Campus events"
      >
        {events.map((event) => (
          <EventCard
            onViewParticipants={openParticipants}
            key={event.id}
            event={event}
            participants={participantsByEvent[event.id]}
            onJoin={handleJoin}
            onLeave={handleLeave}
            isJoining={joiningEventId === event.id}
            isLeaving={leavingEventId === event.id}
          />
        ))}
      </section>

      {selectedEvent && (
        <EventParticipantsModal
          event={selectedEvent}
          participants={participantsByEvent[selectedEvent.id] || []}
          loading={participantsLoading}
          error={participantsError}
          onRetry={() => openParticipants(selectedEvent)}
          onClose={closeParticipants}
        />
      )}
    </>
  );
}

export default EventsGrid;
