import express from "express";
import dotenv from "dotenv";
import { Request, Counter } from "../db.js";

dotenv.config();

const router = express.Router();

const SYSTEM_PROMPT = `You are an emergency medical triage assistant for rural India.
A patient or bystander will describe symptoms in English or Hindi.
Respond ONLY with a JSON object — no markdown, no backticks, no extra text.

Return exactly this structure:
{
  "severity": "critical" | "urgent" | "moderate",
  "severityLabel": "short label in same language as input",
  "summary": "1-2 sentence plain-language summary in same language as input",
  "facilities": ["ICU", "Blood Bank"],
  "doNow": "1-2 sentence immediate first-aid instruction in same language as input"
}

facilities must only contain values from this list:
ICU, Blood Bank, Ventilator, Surgery, Cardiology, Maternity,
Paediatrics, CT Scan, X-Ray, Emergency, Basic Lab`;

function getMockTriage(symptoms) {
  const text = symptoms.toLowerCase();

  if (text.includes("chest") || text.includes("heart") || text.includes("breathing") || text.includes("सीने")) {
    return { severity: "critical", severityLabel: "Critical Emergency", summary: "The symptoms suggest a possible cardiac event or severe respiratory distress. This requires immediate medical attention.", facilities: ["ICU", "Cardiology", "Ventilator"], doNow: "Keep the patient calm and seated upright. Do not let them walk. Call 112 immediately." };
  }
  if (text.includes("accident") || text.includes("bleeding") || text.includes("injury") || text.includes("दुर्घटना")) {
    return { severity: "critical", severityLabel: "Critical Emergency", summary: "Major trauma with possible head injury and heavy bleeding detected. Immediate surgical care needed.", facilities: ["Surgery", "Blood Bank", "ICU", "CT Scan"], doNow: "Do not move the patient's head or neck. Apply firm pressure on bleeding wounds. Call 112 now." };
  }
  if (text.includes("snake") || text.includes("bite") || text.includes("सांप")) {
    return { severity: "urgent", severityLabel: "Urgent", summary: "Snake bite with spreading swelling and numbness is a medical emergency requiring antivenom.", facilities: ["Emergency", "ICU", "Blood Bank"], doNow: "Keep the bitten limb still and below heart level. Remove any tight clothing or jewellery. Rush to hospital immediately." };
  }
  if (text.includes("labour") || text.includes("pregnant") || text.includes("baby") || text.includes("प्रसव") || text.includes("गर्भ")) {
    return { severity: "urgent", severityLabel: "Urgent", summary: "Active labour detected. Immediate maternity care and delivery support required.", facilities: ["Maternity", "Paediatrics", "Blood Bank"], doNow: "Keep the mother calm and lying down. Do not let her push unless instructed. Rush to nearest maternity hospital." };
  }
  if (text.includes("seizure") || text.includes("convulsion") || text.includes("unconscious") || text.includes("दौरे")) {
    return { severity: "critical", severityLabel: "Critical Emergency", summary: "Seizure with loss of consciousness in a child requires immediate neurological evaluation.", facilities: ["Paediatrics", "ICU", "CT Scan"], doNow: "Lay the child on their side on a soft surface. Do not put anything in their mouth. Time the seizure and call 112." };
  }
  if (text.includes("fever") || text.includes("vomit") || text.includes("diarrhea") || text.includes("बुखार")) {
    return { severity: "moderate", severityLabel: "Moderate", summary: "Symptoms suggest a moderate illness that needs medical evaluation but is not immediately life-threatening.", facilities: ["Emergency", "Basic Lab"], doNow: "Keep the patient hydrated with water or ORS. Avoid self-medication. Visit the nearest clinic soon." };
  }
  return { severity: "moderate", severityLabel: "Moderate", summary: "Symptoms have been noted. A medical professional should evaluate this condition as soon as possible.", facilities: ["Emergency", "Basic Lab"], doNow: "Keep the patient comfortable and hydrated. Avoid any strenuous activity and visit a nearby hospital." };
}

router.post("/", async (req, res) => {
  const { symptoms, location } = req.body;

  if (!symptoms || symptoms.trim() === "") {
    return res.status(400).json({ error: "Symptoms are required." });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  console.log("API key loaded:", apiKey ? "YES ✓" : "NO — using mock");

  await new Promise((resolve) => setTimeout(resolve, 1500));
  const result = getMockTriage(symptoms);

  // Log to database
 try {
    let counter = await Counter.findOne({ name: "total" });
    if (!counter) {
      counter = new Counter({ name: "total", value: 0 });
    }
    counter.value += 1;
    await counter.save();

    await Request.create({
      id: Date.now(),
      symptoms: symptoms.slice(0, 200),
      severity: result.severity,
      facilities: result.facilities,
      location: location || null,
      timestamp: new Date().toISOString(),
    });

    console.log("Triage logged. Total:", counter.value);
  } catch (err) {
    console.error("DB write error:", err);
  }

  res.json(result);
});

export default router;