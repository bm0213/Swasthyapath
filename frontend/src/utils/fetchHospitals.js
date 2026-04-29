import { calculateDistance } from "./location";

export async function fetchNearbyHospitals(lat, lng, radiusMeters = 10000) {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:${radiusMeters},${lat},${lng});
      way["amenity"="hospital"](around:${radiusMeters},${lat},${lng});
      node["amenity"="clinic"](around:${radiusMeters},${lat},${lng});
      node["healthcare"="hospital"](around:${radiusMeters},${lat},${lng});
    );
    out body;
    >;
    out skel qt;
  `;

  // Try multiple Overpass API mirrors in order
  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  ];

  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      console.log("[Hospitals] Trying endpoint:", endpoint);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch(endpoint, {
        method: "POST",
        body: query,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const hospitals = data.elements
        .filter((el) => el.tags && (el.tags.name || el.tags["name:en"]))
        .map((el) => {
          const name = el.tags["name:en"] || el.tags.name || "Unknown Hospital";
          const nameHi = el.tags["name:hi"] || el.tags.name || name;
          const elLat = el.lat || (el.center && el.center.lat);
          const elLng = el.lon || (el.center && el.center.lon);
          const distance = elLat && elLng
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
        .filter((h) => h.distanceKm <= 50)
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, 10);

      console.log("[Hospitals] Found:", hospitals.length, "via", endpoint);
      return hospitals;

    } catch (err) {
      console.warn("[Hospitals] Endpoint failed:", endpoint, err.message);
      lastError = err;
      // Try next endpoint
    }
  }

  // All endpoints failed
  console.error("[Hospitals] All endpoints failed:", lastError?.message);
  throw new Error("Could not fetch hospitals. Please check your connection.");
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