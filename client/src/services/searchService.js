import api from "./api";

export async function searchUsers({ q, field }) {
  const params = {};

  if (q?.trim()) {
    params.q = q.trim();
  }

  if (field?.trim()) {
    params.field = field.trim();
  }

  const response = await api.get("/search/users", { params });
  return response.data.data;
}
