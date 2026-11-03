import { io } from "socket.io-client";

function getSocketServerUrl() {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (apiUrl?.startsWith("http")) {
    return apiUrl.replace(/\/api\/?$/, "");
  }

  return import.meta.env.DEV
    ? "http://localhost:3000"
    : window.location.origin;
}

export const socket = io(getSocketServerUrl(), { autoConnect: false });
