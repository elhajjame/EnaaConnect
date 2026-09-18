import axios from "axios";
import { getStoredToken } from "./authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export function getApiErrorMessage(error) {
  if (!error.response) {
    return "Unable to connect to the server. Check that the API is running.";
  }

  return error.response.data?.message || "The request could not be completed.";
}

export default api;
