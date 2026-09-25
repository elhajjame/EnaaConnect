import { useEffect, useState } from "react";
import CreateEventForm from "../components/events/CreateEventForm";
import EventsGrid from "../components/events/EventsGrid";
import EventsHeader from "../components/events/EventsHeader";
import { getApiErrorMessage } from "../services/api";
import { getEvents, joinEvent, leaveEvent } from "../services/eventsService";

function EventsPage() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [joiningEventId, setJoiningEventId] = useState(null);
  const [joinErrorMessage, setJoinErrorMessage] = useState("");
  const [leavingEventId, setLeavingEventId] = useState(null);

  async function handleJoin(eventId) {
    if (joiningEventId) {
      return;
    }

    try {
      setJoiningEventId(eventId);
      setJoinErrorMessage("");

      const joinedEvent = await joinEvent(eventId);

      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                joined: joinedEvent.joined,
                isFull: joinedEvent.isFull,
                participantsCount: joinedEvent.participantsCount,
              }
            : event,
        ),
      );
    } catch (error) {
      setJoinErrorMessage(getApiErrorMessage(error));
    } finally {
      setJoiningEventId(null);
    }
  }

  async function handleLeave(eventId) {
    if (joiningEventId || leavingEventId) {
      return;
    }

    try {
      setLeavingEventId(eventId);
      setJoinErrorMessage("");

      const leftEvent = await leaveEvent(eventId);

      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === eventId ? { ...event, ...leftEvent } : event,
        ),
      );
    } catch (error) {
      setJoinErrorMessage(getApiErrorMessage(error));
    } finally {
      setLeavingEventId(null);
    }
  }

  useEffect(() => {
    async function loadEvents() {
      try {
        setErrorMessage("");

        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, []);

  function openCreateForm() {
    setIsCreateFormOpen(true);
    setSuccessMessage("");
  }

  function closeCreateForm() {
    setIsCreateFormOpen(false);
  }

  function handleEventCreated() {
    setSuccessMessage("Event submitted for approval.");
    setIsCreateFormOpen(false);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  return (
    <>
      <EventsHeader onCreateEvent={openCreateForm} />
      {successMessage && (
        <p
          role="status"
          className="mb-6 rounded-xl border border-green-200 bg-green-50
            px-4 py-3 text-sm font-semibold text-brand-green"
        >
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4
            py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}
      {isLoading && (
        <p className="py-10 text-center text-sm text-muted">
          Loading events...
        </p>
      )}

      {joinErrorMessage && (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3
      text-sm text-red-700"
        >
          {joinErrorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && (
        <EventsGrid
          events={events}
          onJoin={handleJoin}
          onLeave={handleLeave}
          leavingEventId={leavingEventId}
          joiningEventId={joiningEventId}
        />
      )}

      <CreateEventForm
        onEventCreated={handleEventCreated}
        isOpen={isCreateFormOpen}
        onClose={closeCreateForm}
      />
    </>
  );
}

export default EventsPage;
