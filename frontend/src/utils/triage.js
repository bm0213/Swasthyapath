const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://swasthyapath-backend.onrender.com";

/**
 * Client-side intelligent rule evaluator (fallback/offline engine)
 */
export function evaluateLocalTriage(symptoms, lang = "en") {
  const text = (symptoms || "").toLowerCase();

  // High Priority Emergency conditions
  const isHigh =
    text.includes("chest") ||
    text.includes("heart") ||
    text.includes("breath") ||
    text.includes("सीने") ||
    text.includes("सांस") ||
    text.includes("heart attack") ||
    text.includes("accident") ||
    text.includes("bleeding") ||
    text.includes("head injury") ||
    text.includes("fracture") ||
    text.includes("दुर्घटना") ||
    text.includes("खून") ||
    text.includes("choking") ||
    text.includes("stroke") ||
    text.includes("paralysis") ||
    text.includes("unconscious") ||
    text.includes("faint") ||
    text.includes("seizure") ||
    text.includes("convulsion") ||
    text.includes("दौरे") ||
    text.includes("behoshi") ||
    text.includes("snake") ||
    text.includes("poison") ||
    text.includes("सांप") ||
    text.includes("labour") ||
    text.includes("pregnant") ||
    text.includes("delivery") ||
    text.includes("प्रसव");

  // Low Priority / Self-Care conditions
  const isLow =
    (text.includes("scratch") ||
      text.includes("small cut") ||
      text.includes("minor cut") ||
      text.includes("mild headache") ||
      text.includes("headache") ||
      text.includes("bandage") ||
      text.includes("antiseptic") ||
      text.includes("ointment") ||
      text.includes("paracetamol") ||
      text.includes("cold") ||
      text.includes("runny nose") ||
      text.includes("mild cough") ||
      text.includes("sore throat") ||
      text.includes("acidity") ||
      text.includes("gas") ||
      text.includes("indigestion") ||
      text.includes("चोट") ||
      text.includes("हल्का दर्द") ||
      text.includes("सिरदर्द") ||
      text.includes("सर्दी") ||
      text.includes("खांसी") ||
      text.includes("पट्टी")) &&
    !isHigh;

  if (isHigh) {
    if (text.includes("chest") || text.includes("heart") || text.includes("breath") || text.includes("सीने")) {
      return {
        priority: "high",
        severity: "critical",
        severityLabel: lang === "hi" ? "गंभीर आपातकाल" : "HIGH PRIORITY",
        summary: lang === "hi"
          ? "सीने में दर्द या सांस लेने में तकलीफ एक गंभीर आपात स्थिति का संकेत हो सकती है। तुरंत आपातकालीन अस्पताल की आवश्यकता है।"
          : "Based on the symptoms described, immediate medical evaluation at an emergency hospital is required for potential cardiac or severe respiratory distress.",
        recommendedCareCategory: "hospitals",
        recommendedCareLabel: lang === "hi" ? "🏥 आपातकालीन अस्पताल" : "🏥 Emergency Hospital",
        primaryCta: lang === "hi" ? "पास के आपातकालीन अस्पताल खोजें" : "Find Nearby Emergency Care",
        doNow: lang === "hi"
          ? "मरीज को शांत और सीधा बैठाकर रखें। उन्हें चलने न दें। यदि आवश्यक हो तो तुरंत 112 डायल करें।"
          : "Keep the patient calm and seated upright. Do not let them walk or exert effort. Call 112 immediately if condition worsens.",
        facilities: ["ICU", "Cardiology", "Ventilator", "Emergency"],
      };
    }

    if (text.includes("accident") || text.includes("bleeding") || text.includes("injury") || text.includes("दुर्घटना")) {
      return {
        priority: "high",
        severity: "critical",
        severityLabel: lang === "hi" ? "गंभीर आपातकाल" : "HIGH PRIORITY",
        summary: lang === "hi"
          ? "गंभीर चोट या भारी रक्तस्राव का पता चला है। तत्काल आघात देखभाल और आपातकालीन अस्पताल की आवश्यकता है।"
          : "Major trauma and significant injury detected. Immediate emergency hospital evaluation and surgical/trauma care is needed.",
        recommendedCareCategory: "hospitals",
        recommendedCareLabel: lang === "hi" ? "🏥 आपातकालीन अस्पताल" : "🏥 Emergency Hospital",
        primaryCta: lang === "hi" ? "पास के आपातकालीन अस्पताल खोजें" : "Find Nearby Emergency Care",
        doNow: lang === "hi"
          ? "मरीज के सिर या गर्दन को न हिलाएं। बहते खून पर साफ कपड़े से सीधा दबाव डालें।"
          : "Do not move the patient's head or neck. Apply firm, direct pressure on bleeding wounds with a clean cloth.",
        facilities: ["Emergency", "Surgery", "Blood Bank", "CT Scan", "ICU"],
      };
    }

    return {
      priority: "high",
      severity: "critical",
      severityLabel: lang === "hi" ? "गंभीर आपातकाल" : "HIGH PRIORITY",
      summary: lang === "hi"
        ? "लक्षण तत्काल आपातकालीन चिकित्सा सहायता की आवश्यकता का संकेत दे रहे हैं।"
        : "Based on the symptoms described, immediate medical evaluation is required at an emergency medical center.",
      recommendedCareCategory: "hospitals",
      recommendedCareLabel: lang === "hi" ? "🏥 आपातकालीन अस्पताल" : "🏥 Emergency Hospital",
      primaryCta: lang === "hi" ? "पास के आपातकालीन अस्पताल खोजें" : "Find Nearby Emergency Care",
      doNow: lang === "hi"
        ? "मरीज को स्थिर और सहज रखें। तुरंत आपातकालीन सहायता लें।"
        : "Keep the patient stable, resting, and comfortable. Seek emergency medical attention immediately.",
      facilities: ["Emergency", "ICU", "Basic Lab"],
    };
  }

  if (isLow) {
    return {
      priority: "low",
      severity: "moderate",
      severityLabel: lang === "hi" ? "सामान्य प्राथमिकता (स्व-देखभाल)" : "LOW PRIORITY",
      summary: lang === "hi"
        ? "लक्षण मामूली या गैर-आपातकालीन लग रहे हैं। प्राथमिक उपचार और पास के फार्मेसी/केमिस्ट से दवाएं उपयुक्त हो सकती हैं।"
        : "Symptoms appear mild and non-emergency. Appropriate self-care, basic first aid, and medication from a nearby pharmacy are recommended.",
      recommendedCareCategory: "pharmacies",
      recommendedCareLabel: lang === "hi" ? "💊 पास की फार्मेसी / केमिस्ट" : "💊 Nearby Pharmacy & First Aid",
      primaryCta: lang === "hi" ? "पास की फार्मेसी खोजें" : "Find Nearby Pharmacy",
      doNow: lang === "hi"
        ? "घाव को साफ पानी से धोएं, जरूरत पड़ने पर पट्टी लगाएं और खूब पानी पिएं। यदि लक्षण बिगड़ें तो डॉक्टर से परामर्श करें।"
        : "Clean the affected area with clean water, keep hydrated, and rest. If symptoms persist or worsen, visit a clinic.",
      facilities: ["First Aid", "OTC Medication", "Basic Lab"],
      suggestFirstAid: true,
    };
  }

  // Medium Priority (Clinics / General Consultation)
  return {
    priority: "medium",
    severity: "urgent",
    severityLabel: lang === "hi" ? "मध्यम प्राथमिकता" : "MEDIUM PRIORITY",
    summary: lang === "hi"
      ? "इन लक्षणों के लिए पेशेवर चिकित्सकीय परामर्श की सलाह दी जाती है। पास के क्लिनिक या अस्पताल में डॉक्टर को दिखाएं।"
      : "Medical consultation is recommended for these symptoms. A timely visit to a nearby clinic or medical center is advised.",
    recommendedCareCategory: "clinics",
    recommendedCareLabel: lang === "hi" ? "🩺 पास का क्लिनिक या अस्पताल" : "🩺 Nearby Clinic or Hospital",
    primaryCta: lang === "hi" ? "पास में स्वास्थ्य केंद्र खोजें" : "Find Care Near Me",
    doNow: lang === "hi"
      ? "मरीज को आराम करने दें और ओआरएस या पानी से हाइड्रेटेड रखें। बिना डॉक्टर की सलाह के कोई भारी दवा न लें।"
      : "Keep the patient rested and well-hydrated. Avoid strenuous activity and consult a healthcare practitioner today.",
    facilities: ["Emergency", "Basic Lab", "X-Ray"],
  };
}

/**
 * Standardized triage caller that maps backend/AI response to the 3-tier priority care model
 */
export async function callTriage(symptoms, location = null, lang = "en") {
  console.log("[Triage] Assessing symptoms...");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${BACKEND_URL}/api/triage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms, location }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      console.log("[Triage] Backend response received:", data);

      // Normalize backend data into the 3-tier structure
      const sev = (data.severity || "").toLowerCase();
      let priority = "medium";
      let recommendedCareCategory = "clinics";
      let recommendedCareLabel = "🩺 Nearby Clinic or Hospital";
      let primaryCta = "Find Care Near Me";

      if (sev === "critical") {
        priority = "high";
        recommendedCareCategory = "hospitals";
        recommendedCareLabel = "🏥 Emergency Hospital";
        primaryCta = "Find Nearby Emergency Care";
      } else if (sev === "low" || data.priority === "low") {
        priority = "low";
        recommendedCareCategory = "pharmacies";
        recommendedCareLabel = "💊 Nearby Pharmacy & First Aid";
        primaryCta = "Find Nearby Pharmacy";
      } else {
        priority = "medium";
        recommendedCareCategory = "clinics";
        recommendedCareLabel = "🩺 Nearby Clinic or Hospital";
        primaryCta = "Find Care Near Me";
      }

      return {
        priority,
        severity: data.severity || (priority === "high" ? "critical" : priority === "low" ? "moderate" : "urgent"),
        severityLabel: priority === "high" ? "HIGH PRIORITY" : priority === "low" ? "LOW PRIORITY" : "MEDIUM PRIORITY",
        summary: data.summary || "Medical evaluation recommended based on described symptoms.",
        doNow: data.doNow || "Keep the patient comfortable and monitor symptoms.",
        facilities: data.facilities || ["Emergency", "Basic Lab"],
        recommendedCareCategory,
        recommendedCareLabel,
        primaryCta,
      };
    }
  } catch (err) {
    console.warn("[Triage] Backend request bypassed or timed out, using local medical intelligence:", err.message);
  }

  // Fallback to local medical evaluation
  return evaluateLocalTriage(symptoms, lang);
}