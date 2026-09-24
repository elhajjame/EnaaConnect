import { useState } from "react";
import CreateEventForm from "../components/events/CreateEventForm";
import EventsGrid from "../components/events/EventsGrid";
import EventsHeader from "../components/events/EventsHeader";
import eventsData from "../data/eventsData";

function EventsPage() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      <EventsGrid events={eventsData} />

      <CreateEventForm
        onEventCreated={handleEventCreated}
        isOpen={isCreateFormOpen}
        onClose={closeCreateForm}
      />
    </>
  );
}

export default EventsPage;
