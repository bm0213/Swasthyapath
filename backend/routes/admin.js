import express from "express";
import { Request, Counter } from "../db.js";

const router = express.Router();

// Simple admin key check — change this to something secret
const ADMIN_KEY = "swasthya-admin-2024";

function auth(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

router.get("/stats", auth, async (req, res) => {
 const requests = await Request.find();
  const counter = await Counter.findOne({ name: "total" });
  const totalCount = counter ? counter.value : 0;

  // Today's count
  const today = new Date().toDateString();
  const todayCount = requests.filter(
    (r) => new Date(r.timestamp).toDateString() === today
  ).length;

  // Severity breakdown
  const severityBreakdown = {
    critical: requests.filter((r) => r.severity === "critical").length,
    urgent: requests.filter((r) => r.severity === "urgent").length,
    moderate: requests.filter((r) => r.severity === "moderate").length,
  };

  // Most common symptoms (keyword frequency)
  const keywordMap = {};
  const keywords = [
    "chest pain", "heart", "breathing", "accident", "bleeding",
    "snake bite", "labour", "pregnant", "seizure", "convulsion",
    "fever", "vomit", "unconscious", "injury", "fracture",
  ];
  requests.forEach((r) => {
    const text = r.symptoms.toLowerCase();
    keywords.forEach((kw) => {
      if (text.includes(kw)) {
        keywordMap[kw] = (keywordMap[kw] || 0) + 1;
      }
    });
  });
  const topSymptoms = Object.entries(keywordMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  // Most common facilities requested
  const facilityMap = {};
  requests.forEach((r) => {
    (r.facilities || []).forEach((f) => {
      facilityMap[f] = (facilityMap[f] || 0) + 1;
    });
  });
  const topFacilities = Object.entries(facilityMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  // Requests per day (last 7 days)
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" });
    const count = requests.filter(
      (r) => new Date(r.timestamp).toDateString() === d.toDateString()
    ).length;
    last7Days.push({ label, count });
  }

  // Locations (for map)
  const locations = requests
    .filter((r) => r.location?.lat && r.location?.lng)
    .map((r) => ({
      lat: r.location.lat,
      lng: r.location.lng,
      severity: r.severity,
    }));

  // Recent 10 requests
  const recent = requests
    .slice(-10)
    .reverse()
    .map((r) => ({
      id: r.id,
      symptoms: r.symptoms.slice(0, 60) + (r.symptoms.length > 60 ? "..." : ""),
      severity: r.severity,
      facilities: r.facilities,
      timestamp: r.timestamp,
    }));

  res.json({
    totalCount,
    todayCount,
    severityBreakdown,
    topSymptoms,
    topFacilities,
    last7Days,
    locations,
    recent,
  });
});

export default router;