// Gets the user's GPS coordinates using the browser
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy, // accuracy in metres
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Location permission denied. Please allow location access and try again."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location unavailable. Please check your GPS."));
            break;
          case error.TIMEOUT:
            reject(new Error("Location request timed out. Please try again."));
            break;
          default:
            reject(new Error("Could not get your location."));
        }
      },
      {
        enableHighAccuracy: true, // uses GPS chip not just WiFi
        timeout: 15000,
        maximumAge: 0, // always get fresh location
      }
    );
  });
}

// Calculates straight-line distance between two GPS points in km
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

// Reverse geocode GPS coordinates to a human-readable location name
export async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&zoom=16`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await response.json();
    const addr = data.address;

    // Priority order — most specific to least specific
    const area =
      addr.neighbourhood ||
      addr.quarter ||
      addr.suburb ||
      addr.residential ||
      addr.hamlet ||
      addr.village ||
      addr.town ||
      "";

    const city =
      addr.city ||
      addr.municipality ||
      addr.town ||
      addr.village ||
      addr.district ||
      addr.county ||
      addr.state_district ||
      "";

    const state = addr.state || "";

    // Build the most accurate short name possible
    if (area && city && area !== city) {
      return `${area}, ${city}`;
    }
    if (city && state && city !== state) {
      return `${city}, ${state}`;
    }
    if (area && state) {
      return `${area}, ${state}`;
    }

    return city || area || state || "Location detected";
  } catch {
    return null;
  }
}