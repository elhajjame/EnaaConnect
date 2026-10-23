import api from "./api";
export async function createEvent(eventData) {
  const response = await api.post("/events", eventData);

  return response.data.data;
}

export async function getEvents() {
  const response = await api.get("/events");

  return response.data.data;
}

export async function getPendingEvents() {
  const response = await api.get("/events/pending");

  return response.data.data;
}

export async function reviewEvent(eventId, status) {
  const response = await api.patch(`/events/${eventId}/review`, {
    status,
  });

  return response.data.data;
}

export async function joinEvent(eventId) {
  const response = await api.post(`/events/${eventId}/join`);

  return response.data.data;
}

export async function leaveEvent(eventId) {
  const response = await api.delete(`/events/${eventId}/join`);

  return response.data.data;
}
