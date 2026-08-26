import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// ---------------------------------------------------------------------------
// Mappls Nearby API proxy
// Keeps MAPPLS_REST_KEY in the backend — never exposed to the browser bundle.
// ---------------------------------------------------------------------------

const MAPPLS_NEARBY_URL = "https://search.mappls.com/search/places/nearby/json";

// Map SwasthyaPath categories to Mappls keyword strings
const CATEGORY_KEYWORDS = {
  hospitals: "hospital",
  clinics: "clinic",
  pharmacies: "pharmacy",
};

// Category metadata for normalization
const CATEGORY_META = {
  hospitals:  { typeLabel: "Hospital", icon: "🏥" },
  clinics:    { typeLabel: "Clinic",   icon: "🩺" },
  pharmacies: { typeLabel: "Pharmacy", icon: "💊" },
};

/**
 * Normalize a single Mappls suggestedLocation entry into a consistent schema.
 * The search.mappls.com Nearby API returns: distance, eLoc, placeName, placeAddress,
 * keywords, orderIndex, type — but NOT latitude/longitude.
 * Never invents phone, ratings, opening hours, or emergency availability.
 */
function normalizePlace(raw, category) {
  const meta = CATEGORY_META[category] || CATEGORY_META.hospitals;

  // Coordinates — Nearby API does NOT return lat/lng; use null
  // CarePlaceCard will fall back to eLoc → Mappls Maps URL for directions.
  const lat = raw.latitude != null ? parseFloat(raw.latitude) : null;
  const lng = raw.longitude != null ? parseFloat(raw.longitude) : null;

  // Distance — returned in metres by Mappls
  const distanceMeters = parseFloat(raw.distance);
  const distanceKm = !isNaN(distanceMeters)
    ? Math.round(distanceMeters / 100) / 10   // 1 decimal place
    : null;

  // Phone — only include if the API actually returned a number
  const rawPhone = raw.landlineNo || raw.mobileNo || null;
  const phone = rawPhone && String(rawPhone).trim() ? String(rawPhone).trim() : null;

  // Address
  const address = raw.placeAddress && raw.placeAddress.trim()
    ? raw.placeAddress.trim()
    : null;

  // Name
  const name = raw.placeName && raw.placeName.trim()
    ? raw.placeName.trim()
    : meta.typeLabel;

  // eLoc — the 6-char Mappls Pin, used for directions URL
  const eLoc = raw.eLoc && raw.eLoc.trim() ? raw.eLoc.trim() : null;

  return {
    id: eLoc || `${name}_${distanceMeters}`,
    name,
    nameHi: name,         // kept for HospitalMap compatibility
    category,
    typeLabel: meta.typeLabel,
    icon: meta.icon,
    address,
    lat: isNaN(lat) ? null : lat,
    lng: isNaN(lng) ? null : lng,
    eLoc,                 // forwarded so CarePlaceCard can build a Mappls Maps URL
    phone,
    distance: isNaN(distanceMeters) ? null : distanceMeters,
    distanceKm: distanceKm ?? "N/A",
  };
}

/**
 * Haversine fallback in case Mappls does not return a distance field.
 */
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * POST /api/nearby
 * Body: { category, lat, lng, radiusMeters }
 */
router.post("/", async (req, res) => {
  const { category = "hospitals", lat, lng, radiusMeters = 5000 } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ error: "lat and lng are required." });
  }

  const apiKey = process.env.MAPPLS_REST_KEY;
  if (!apiKey) {
    console.error("[Nearby] MAPPLS_REST_KEY is not set in backend .env");
    return res.status(503).json({
      error: "Nearby care service is not configured. Contact the administrator.",
    });
  }

  const keyword = CATEGORY_KEYWORDS[category] || "hospital";

  // Mappls radius: 500–10,000 m per call. Clamp large radii to the allowed max.
  const clampedRadius = Math.min(Math.max(Number(radiusMeters), 500), 10000);

  try {
    const params = new URLSearchParams({
      keywords: keyword,
      refLocation: `${lat},${lng}`,
      radius: String(clampedRadius),
      sortBy: "dist:asc",
      access_token: apiKey,
    });

    const url = `${MAPPLS_NEARBY_URL}?${params.toString()}`;
    console.log(
      `[Nearby] Requesting ${category} from Mappls (radius ${clampedRadius}m around ${lat},${lng})...`
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const mapplsRes = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!mapplsRes.ok) {
      const errText = await mapplsRes.text();
      console.error(`[Nearby] Mappls API error ${mapplsRes.status}:`, errText);
      return res.status(502).json({
        error: `Mappls API returned status ${mapplsRes.status}. Check your MAPPLS_REST_KEY and ensure Nearby API is enabled in the Mappls Console.`,
      });
    }

    const data = await mapplsRes.json();

    // Mappls returns { suggestedLocations: [...] } on success
    const rawLocations = data?.suggestedLocations;
    if (!Array.isArray(rawLocations)) {
      console.warn(
        "[Nearby] Unexpected Mappls response shape:",
        JSON.stringify(data).slice(0, 300)
      );
      return res.json({ results: [] });
    }

    const normalized = rawLocations
      .map((place) => normalizePlace(place, category))
      .filter(Boolean)
      .sort((a, b) => (Number(a.distanceKm) || 0) - (Number(b.distanceKm) || 0));

    console.log(
      `[Nearby] Returning ${normalized.length} ${category} within ${clampedRadius / 1000}km`
    );
    return res.json({ results: normalized });

  } catch (err) {
    if (err.name === "AbortError") {
      console.error("[Nearby] Mappls request timed out");
      return res
        .status(504)
        .json({ error: "Nearby care request timed out. Please try again." });
    }
    console.error("[Nearby] Unexpected error:", err.message);
    return res
      .status(500)
      .json({ error: "Unable to load nearby care right now." });
  }
});

export default router;
