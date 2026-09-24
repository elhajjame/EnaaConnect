import api from "./api";
export async function createEvent(eventData) {
  const response = await api.post("/events", eventData);

  return response.data.data;
}

export async function getEvents() {
  const response = await api.get("/events");

  return response.data.data;
}
