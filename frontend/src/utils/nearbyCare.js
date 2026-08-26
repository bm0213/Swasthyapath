import { calculateDistance } from "./location";

// Backend base URL — set via VITE_BACKEND_URL in frontend/.env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// Session-level in-memory cache to avoid duplicate requests
const careCache = new Map();

/**
 * Fetches nearby care (hospitals, clinics, or pharmacies) around user coordinates.
 * Routes through the backend proxy to keep the Mappls API key server-side.
 *
 * @param {string} category    - "hospitals" | "clinics" | "pharmacies"
 * @param {number} lat         - User latitude
 * @param {number} lng         - User longitude
 * @param {number} radiusMeters - Search radius in metres (default 5000 = 5 km)
 * @returns {Promise<Array>}   - Normalized place array sorted by distance ascending
 */
export async function fetchNearbyCare(
  category = "hospitals",
  lat,
  lng,
  radiusMeters = 5000
) {
  if (!lat || !lng) {
    throw new Error("Latitude and longitude are required to find nearby care.");
  }

  // Round to ~100 m for cache grouping
  const cacheKey = `${category}_${lat.toFixed(3)}_${lng.toFixed(3)}_${radiusMeters}`;
  if (careCache.has(cacheKey)) {
    console.log(`[NearbyCare] Cache hit for ${cacheKey}`);
    return careCache.get(cacheKey);
  }

  console.log(
    `[NearbyCare] Fetching ${category} from Mappls via backend proxy (radius ${radiusMeters / 1000}km)...`
  );

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  let response;
  try {
    response = await fetch(`${BACKEND_URL}/api/nearby`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, lat, lng, radiusMeters }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error(
        "Request timed out. Please check your connection and try again."
      );
    }
    throw new Error(
      "Unable to reach the SwasthyaPath server. Please ensure the backend is running."
    );
  }

  clearTimeout(timeoutId);

  if (!response.ok) {
    let message = `Server error (${response.status}).`;
    try {
      const errData = await response.json();
      if (errData?.error) message = errData.error;
    } catch {
      // ignore JSON parse failure
    }
    throw new Error(message);
  }

  const data = await response.json();
  const results = Array.isArray(data?.results) ? data.results : [];

  // Secondary sort safety (backend already sorts, but guard against edge cases)
  results.sort((a, b) => a.distanceKm - b.distanceKm);

  // Evict oldest entry if cache grows too large
  if (careCache.size >= 30) {
    const firstKey = careCache.keys().next().value;
    careCache.delete(firstKey);
  }
  careCache.set(cacheKey, results);

  console.log(
    `[NearbyCare] Received ${results.length} ${category} within ${radiusMeters / 1000}km`
  );
  return results;
}

/**
 * Geocodes a manually entered area/city name using Nominatim.
 * Does not expose any API secrets — Nominatim is a public endpoint.
 */
export async function searchLocationByQuery(queryText) {
  if (!queryText || !queryText.trim()) return null;

  try {
    const encoded = encodeURIComponent(queryText.trim());
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1&addressdetails=1`,
      { headers: { "Accept-Language": "en" } }
    );
    if (!response.ok) return null;

    const results = await response.json();
    if (results && results.length > 0) {
      const match = results[0];
      return {
        lat: parseFloat(match.lat),
        lng: parseFloat(match.lon),
        displayName: match.display_name,
        name: match.name || queryText,
      };
    }
    return null;
  } catch (err) {
    console.error("[NearbyCare] Manual geocode error:", err);
    return null;
  }
}
