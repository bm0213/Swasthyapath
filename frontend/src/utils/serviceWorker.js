// Register the service worker
export async function registerSW() {
  if (!("serviceWorker" in navigator)) {
    console.log("Service workers not supported");
    return null;
  }

  try {
    const reg = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    console.log("[App] Service worker registered:", reg.scope);

    reg.addEventListener("updatefound", () => {
      console.log("[App] New service worker found");
    });

    return reg;
  } catch (err) {
    console.error("[App] Service worker registration failed:", err);
    return null;
  }
}

// Check if app is online
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      console.log("[App] Back online");
    }
    function handleOffline() {
      setIsOnline(false);
      console.log("[App] Gone offline");
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

// Save hospitals to localStorage as offline backup
export function cacheHospitalsLocally(lat, lng, hospitals) {
  try {
    const data = {
      lat,
      lng,
      hospitals,
      cachedAt: Date.now(),
    };
    localStorage.setItem("swasthya-hospitals-cache", JSON.stringify(data));
    console.log("[App] Hospitals cached locally:", hospitals.length);
  } catch (err) {
    console.error("[App] Failed to cache hospitals:", err);
  }
}

// Load cached hospitals from localStorage
export function loadCachedHospitals(lat, lng, radiusKm = 15) {
  try {
    const raw = localStorage.getItem("swasthya-hospitals-cache");
    if (!raw) return null;

    const data = JSON.parse(raw);
    const ageHours = (Date.now() - data.cachedAt) / (1000 * 60 * 60);

    // Reject if cache is older than 48 hours
    if (ageHours > 48) {
      console.log("[App] Local hospital cache expired");
      return null;
    }

    // Reject if cached location is too far from current location
    const dist = getDistanceKm(lat, lng, data.lat, data.lng);
    if (dist > radiusKm) {
      console.log("[App] Cached hospitals are too far from current location");
      return null;
    }

    console.log("[App] Loaded hospitals from local cache:", data.hospitals.length);
    return data.hospitals;
  } catch {
    return null;
  }
}

function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Missing React import for the hook
import React from "react";