import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // If MONGODB_URI is missing or still has the placeholder value, skip quietly.
  // Triage history and admin features will be unavailable, but the rest of the
  // server (AI triage, Mappls nearby proxy) will continue to work.
  if (!uri || uri.startsWith("your_mongodb")) {
    console.warn(
      "[DB] ⚠  MONGODB_URI is not configured — history and admin features disabled."
    );
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected ✓");
  } catch (err) {
    console.error("[DB] MongoDB connection error:", err.message);
    console.warn("[DB] ⚠  Continuing without MongoDB — history and admin features disabled.");
    // Do NOT call process.exit(1); let the server keep running.
  }
};

// Triage Request Schema
const requestSchema = new mongoose.Schema({
  id: Number,
  symptoms: String,
  severity: String,
  facilities: [String],
  location: {
    lat: Number,
    lng: Number,
  },
  timestamp: String,
});

// Counter Schema (for totalCount)
const counterSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

export const Request = mongoose.model("Request", requestSchema);
export const Counter = mongoose.model("Counter", counterSchema);
export default connectDB;