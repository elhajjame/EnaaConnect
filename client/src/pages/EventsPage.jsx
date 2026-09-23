import { useState } from "react";
import CreateEventForm from "../components/events/CreateEventForm";
import EventsGrid from "../components/events/EventsGrid";
import EventsHeader from "../components/events/EventsHeader";

const events = [
  {
    id: 1,
    title: "React Component Clinic",
    description:
      "A practical session on state, composition, and reusable interface patterns.",
    date: "OCT 10",
    time: "16:30",
    location: "Lab 01",
    category: "workshops",
    participantsCount: 18,
    maximumParticipants: 24,
  },
  {
    id: 2,
    title: "Demo Day Rehearsal",
    description:
      "Practice your project pitch, receive feedback, and improve your final demo.",
    date: "OCT 12",
    time: "14:00",
    location: "Main hall",
    category: "education",
    participantsCount: 31,
    maximumParticipants: 50,
  },
  {
    id: 3,
    title: "Creative Coding Night",
    description:
      "Mix art and code in a relaxed evening of browser-based experiments.",
    date: "OCT 19",
    time: "17:00",
    location: "Open space",
    category: "culture",
    participantsCount: 12,
    maximumParticipants: 30,
  },
];

function EventsPage() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  function openCreateForm() {
    setIsCreateFormOpen(true);
  }

  function closeCreateForm() {
    setIsCreateFormOpen(false);
  }

  return (
    <>
      <EventsHeader onCreateEvent={openCreateForm} />

      <EventsGrid events={events} />

      <CreateEventForm isOpen={isCreateFormOpen} onClose={closeCreateForm} />
    </>
  );
}

export default EventsPage;
