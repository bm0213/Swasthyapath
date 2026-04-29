const CACHE_NAME = "swasthyapath-v1";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Files to cache immediately when app loads
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/src/main.jsx",
];

// Install — cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.log("[SW] Static cache failed (ok in dev):", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache when offline
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip browser extension requests
  if (!url.protocol.startsWith("http")) return;

  // Skip Anthropic API calls — never cache these
  if (url.hostname.includes("anthropic.com")) return;

  // Skip backend triage calls — never cache these
  if (url.pathname.includes("/api/triage")) return;

  // For OpenStreetMap hospital data — cache with expiry
  if (url.hostname.includes("overpass-api.de")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) {
          const cachedTime = cached.headers.get("sw-cached-time");
          const isExpired = cachedTime && Date.now() - parseInt(cachedTime) > CACHE_DURATION;
          if (!isExpired) {
            console.log("[SW] Serving hospital data from cache");
            return cached;
          }
        }

        try {
          const response = await fetch(event.request);
          if (response.ok) {
            const cloned = response.clone();
            const body = await cloned.text();
            const headers = new Headers(response.headers);
            headers.set("sw-cached-time", Date.now().toString());
            const cachedResponse = new Response(body, {
              status: response.status,
              statusText: response.statusText,
              headers,
            });
            cache.put(event.request, cachedResponse);
          }
          return response;
        } catch {
          if (cached) {
            console.log("[SW] Offline — serving stale hospital cache");
            return cached;
          }
          return new Response(JSON.stringify({ elements: [] }), {
            headers: { "Content-Type": "application/json" },
          });
        }
      })
    );
    return;
  }

  // For OpenStreetMap map tiles — cache aggressively
  if (url.hostname.includes("tile.openstreetmap.org")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;

        try {
          const response = await fetch(event.request);
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        } catch {
          return cached || new Response("", { status: 404 });
        }
      })
    );
    return;
  }

  // For app shell (HTML, JS, CSS) — network first, cache fallback
  event.respondWith(
  fetch(event.request)
    .then((response) => {
      if (response.ok) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    })
    .catch(() => caches.match(event.request))
  );
});

// Listen for messages from app
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
  if (event.data === "CLEAR_CACHE") {
    caches.delete(CACHE_NAME).then(() => {
      console.log("[SW] Cache cleared");
    });
  }
});