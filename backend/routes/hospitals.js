import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/nearby", async (req, res) => {
  const { lat, lng, radius = 10000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "lat and lng are required" });
  }

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:${radius},${lat},${lng});
      way["amenity"="hospital"](around:${radius},${lat},${lng});
      node["amenity"="clinic"](around:${radius},${lat},${lng});
      node["healthcare"="hospital"](around:${radius},${lat},${lng});
    );
    out body;
    >;
    out skel qt;
  `;

  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: query,
        headers: { "Content-Type": "text/plain" },
        signal: AbortSignal.timeout(20000),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      return res.json(data);
    } catch (err) {
      console.warn("[Hospitals] Endpoint failed:", endpoint, err.message);
    }
  }

  res.status(503).json({ error: "Could not fetch hospitals" });
});

export default router;