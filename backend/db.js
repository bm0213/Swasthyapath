import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected ✓");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
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