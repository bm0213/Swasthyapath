import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./db.js";
import triageRoute from "./routes/triage.js";
import adminRoute from "./routes/admin.js";

dotenv.config();
await connectDB();

console.log("Starting server...");
console.log("API key found:", process.env.ANTHROPIC_API_KEY ? "YES ✓" : "NO ✗ — check your .env file");
console.log("Port:", process.env.PORT || 4000);

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/triage", triageRoute);
app.use("/api/admin", adminRoute);

// Store active rooms
const rooms = new Map();

io.on("connection", (socket) => {
  console.log("[Socket] Connected:", socket.id);

  socket.on("join_room", ({ roomId, userName, role }) => {
    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.userName = userName;
    socket.data.role = role;

    if (!rooms.has(roomId)) {
      rooms.set(roomId, { messages: [], members: [], createdAt: Date.now() });
    }

    const room = rooms.get(roomId);
    if (!room.members.find((m) => m.id === socket.id)) {
      room.members.push({ id: socket.id, userName, role });
    }

    socket.emit("room_history", room.messages);
    io.to(roomId).emit("user_joined", { userName, role, memberCount: room.members.length });
  });

  socket.on("send_message", ({ roomId, message, userName, role }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const msgObj = {
      id: Date.now() + Math.random(),
      message, userName, role,
      timestamp: new Date().toISOString(),
    };

    room.messages.push(msgObj);
    if (room.messages.length > 100) room.messages = room.messages.slice(-100);
    io.to(roomId).emit("receive_message", msgObj);
  });

  socket.on("typing", ({ roomId, userName, isTyping }) => {
    socket.to(roomId).emit("user_typing", { userName, isTyping });
  });

  // Video call signaling
  socket.on("call_request", ({ roomId, userName }) => {
    socket.to(roomId).emit("incoming_call", { from: userName });
  });

  socket.on("call_accepted", ({ roomId, userName }) => {
    socket.to(roomId).emit("call_accepted", { by: userName });
  });

  socket.on("call_declined", ({ roomId }) => {
    socket.to(roomId).emit("call_declined");
  });

  socket.on("call_ended", ({ roomId }) => {
    socket.to(roomId).emit("call_ended");
  });

  socket.on("webrtc_offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("webrtc_offer", { offer });
  });

  socket.on("webrtc_answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("webrtc_answer", { answer });
  });

  socket.on("webrtc_ice", ({ roomId, candidate }) => {
    socket.to(roomId).emit("webrtc_ice", { candidate });
  });
  
  socket.on("disconnect", () => {
    const { roomId, userName, role } = socket.data;
    if (roomId && rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.members = room.members.filter((m) => m.id !== socket.id);
      io.to(roomId).emit("user_left", { userName, role, memberCount: room.members.length });
      if (room.members.length === 0) {
        setTimeout(() => {
          if (rooms.has(roomId) && rooms.get(roomId).members.length === 0) {
            rooms.delete(roomId);
          }
        }, 60 * 60 * 1000);
      }
    }
    console.log("[Socket] Disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`SwasthyaPath backend running on http://localhost:${PORT}`);
});