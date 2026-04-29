export function matchHospitals(hospitals, neededFacilities) {
  if (!hospitals || hospitals.length === 0) return [];

  const needed = neededFacilities.map((f) => f.toLowerCase());

  const scored = hospitals.map((hospital) => {
    let score = 0;

    hospital.facilities.forEach((f) => {
      if (needed.some((n) => f.toLowerCase().includes(n.split(" ")[0]))) {
        score += 3;
      }
    });

    // Closer hospitals score higher
    score -= hospital.distanceKm * 0.3;

    return { ...hospital, score };
  });

  return scored.sort((a, b) => b.score - a.score);
}