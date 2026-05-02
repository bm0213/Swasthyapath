import { calculateDistance } from "./location";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export async function fetchNearbyHospitals(lat, lng, radiusMeters = 10000) {
  try {
    console.log("[Hospitals] Fetching via backend proxy...");

    const response = await fetch(
      `${BACKEND_URL}/api/hospitals/nearby?lat=${lat}&lng=${lng}&radius=${radiusMeters}`
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    const hospitals = data.elements
      .filter((el) => el.tags && (el.tags.name || el.tags["name:en"]))
      .map((el) => {
        const name = el.tags["name:en"] || el.tags.name || "Unknown Hospital";
        const nameHi = el.tags["name:hi"] || el.tags.name || name;
        const elLat = el.lat || (el.center && el.center.lat);
        const elLng = el.lon || (el.center && el.center.lon);
        const distance =
          elLat && elLng
            ? calculateDistance(lat, lng, elLat, elLng)
            : 99;

        return {
          id: el.id,
          name,
          nameHi,
          type:
            el.tags.operator === "government" ||
            el.tags["operator:type"] === "government"
              ? "Government"
              : el.tags.operator || "Hospital",
          distanceKm: distance,
          phone: el.tags.phone || el.tags["contact:phone"] || null,
          lat: elLat,
          lng: elLng,
          facilities: guessFacilities(el.tags),
        };
      })
      .filter((h) => h.lat && h.lng && h.distanceKm <= 50)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 10);

    console.log("[Hospitals] Found:", hospitals.length);
    return hospitals;

  } catch (err) {
    console.error("[Hospitals] Failed:", err.message);
    throw new Error("Could not fetch hospitals. Please check your connection.");
  }
}

function guessFacilities(tags) {
  const facilities = ["Emergency"];
  const name = (tags.name || "").toLowerCase();

  if (tags.emergency === "yes") facilities.push("ICU");
  if (
    name.includes("district") ||
    name.includes("civil") ||
    name.includes("general")
  ) {
    facilities.push("ICU", "Blood Bank", "Surgery", "X-Ray");
  }
  if (name.includes("maternity") || name.includes("women") || name.includes("child")) {
    facilities.push("Maternity", "Paediatrics");
  }
  if (name.includes("cardiac") || name.includes("heart")) {
    facilities.push("Cardiology", "ICU");
  }
  if (name.includes("trauma") || name.includes("accident")) {
    facilities.push("Surgery", "Blood Bank", "CT Scan");
  }
  if (tags.beds && parseInt(tags.beds) > 100) {
    facilities.push("ICU", "Blood Bank", "Ventilator");
  }

  return [...new Set(facilities)];
}