import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://swasthyapath-backend.onrender.com";

let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io(BACKEND_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

// Generate a short unique room ID
export function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}