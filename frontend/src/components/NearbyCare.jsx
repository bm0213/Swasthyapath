import React from "react";
import CarePlaceCard from "./CarePlaceCard";
import HospitalMap from "./HospitalMap";
import { fetchNearbyCare, searchLocationByQuery } from "../utils/nearbyCare";

export default function NearbyCare({
  userLocation,
  locationName,
  recommendedCategory = "hospitals",
  lang = "en",
  onLocationRequested,
  isLocationLoading = false,
  locationError = null,
}) {
  const isHi = lang === "hi";
  const [activeCategory, setActiveCategory] = React.useState(recommendedCategory);
  const [places, setPlaces] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [radiusKm, setRadiusKm] = React.useState(5);
  const [showMap, setShowMap] = React.useState(false);
  const [manualQuery, setManualQuery] = React.useState("");
  const [isSearchingManual, setIsSearchingManual] = React.useState(false);
  const [customLocation, setCustomLocation] = React.useState(null);

  // Sync with recommended category when it changes
  React.useEffect(() => {
    if (recommendedCategory) {
      setActiveCategory(recommendedCategory);
    }
  }, [recommendedCategory]);

  const effectiveLocation = customLocation || userLocation;

  // Load nearby care whenever category, location, or radius changes
  const loadCare = React.useCallback(async () => {
    if (!effectiveLocation?.lat || !effectiveLocation?.lng) return;

    setIsLoading(true);
    setError(null);

    try {
      const radiusMeters = radiusKm * 1000;
      const data = await fetchNearbyCare(
        activeCategory,
        effectiveLocation.lat,
        effectiveLocation.lng,
        radiusMeters
      );
      setPlaces(data);
    } catch (err) {
      console.error("[NearbyCare] Load error:", err);
      setError(err.message || "Failed to load nearby care.");
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, effectiveLocation, radiusKm]);

  React.useEffect(() => {
    if (effectiveLocation?.lat && effectiveLocation?.lng) {
      loadCare();
    }
  }, [loadCare, effectiveLocation]);

  async function handleManualSearch(e) {
    e?.preventDefault();
    if (!manualQuery.trim()) return;

    setIsSearchingManual(true);
    setError(null);
    try {
      const loc = await searchLocationByQuery(manualQuery.trim());
      if (loc) {
        setCustomLocation({ lat: loc.lat, lng: loc.lng, name: loc.name });
      } else {
        setError(isHi ? "स्थान नहीं मिला। कृपया दूसरा नाम दर्ज करें।" : "Location not found. Please try another area name.");
      }
    } catch {
      setError(isHi ? "स्थान खोजने में त्रुटि हुई।" : "Failed to search location.");
    } finally {
      setIsSearchingManual(false);
    }
  }

  function handleExpandRadius() {
    setRadiusKm((prev) => (prev < 15 ? prev + 5 : 25));
  }

  const categories = [
    { id: "hospitals", icon: "🏥", label: isHi ? "अस्पताल" : "Hospitals" },
    { id: "clinics", icon: "🩺", label: isHi ? "क्लिनिक" : "Clinics" },
    { id: "pharmacies", icon: "💊", label: isHi ? "फार्मेसी" : "Pharmacies" },
  ];

  return (
    <section
      className="fade-up"
      style={{
        marginTop: "1.5rem",
        marginBottom: "2rem",
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div
            style={{
              width: "4px",
              height: "16px",
              background: "var(--teal)",
              borderRadius: "2px",
            }}
          />
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "var(--text-primary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              margin: 0,
            }}
          >
            {isHi ? "पास की स्वास्थ्य सेवाएं" : "NEARBY CARE"}
          </h3>
        </div>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            margin: "0 0 12px 12px",
            lineHeight: "1.5",
          }}
        >
          {isHi
            ? "आपके चिकित्सीय आकलन और वर्तमान स्थान के आधार पर।"
            : "Based on your assessment and current location."}
        </p>

        {/* Category Tabs & Controls Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "4px",
              overflowX: "auto",
              maxWidth: "100%",
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const isRecommended = recommendedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (!effectiveLocation && onLocationRequested) {
                      onLocationRequested();
                    }
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 14px",
                    background: isActive ? "var(--bg-card)" : "transparent",
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "12px",
                    fontWeight: isActive ? "700" : "600",
                    cursor: "pointer",
                    transition: "all var(--transition)",
                    boxShadow: isActive ? "var(--shadow-xs)" : "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{cat.icon}</span>
                  <span>{cat.label}</span>
                  {isRecommended && (
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--teal)",
                        marginLeft: "2px",
                      }}
                      title={isHi ? "AI अनुशंसित" : "AI Recommended"}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Radius & Map Toggle */}
          {effectiveLocation && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* Search Radius Pill — shrink / grow */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: "600",
                }}
              >
                {/* Shrink */}
                <button
                  onClick={() => setRadiusKm((prev) => Math.max(1, prev - 5))}
                  disabled={radiusKm <= 1}
                  title={isHi ? "खोज दायरा घटाएं" : "Shrink search area"}
                  style={{
                    padding: "6px 10px",
                    background: "transparent",
                    border: "none",
                    borderRight: "1px solid var(--border)",
                    color: radiusKm <= 1 ? "var(--text-tertiary)" : "var(--alert)",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: radiusKm <= 1 ? "not-allowed" : "pointer",
                    lineHeight: 1,
                  }}
                >
                  −
                </button>

                {/* Current Radius Label */}
                <span
                  style={{
                    padding: "6px 10px",
                    color: "var(--text-secondary)",
                    userSelect: "none",
                  }}
                >
                  📍 {radiusKm} km
                </span>

                {/* Expand */}
                <button
                  onClick={() => setRadiusKm((prev) => Math.min(25, prev + 5))}
                  disabled={radiusKm >= 25}
                  title={isHi ? "खोज दायरा बढ़ाएं" : "Expand search area"}
                  style={{
                    padding: "6px 10px",
                    background: "transparent",
                    border: "none",
                    borderLeft: "1px solid var(--border)",
                    color: radiusKm >= 25 ? "var(--text-tertiary)" : "var(--teal)",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: radiusKm >= 25 ? "not-allowed" : "pointer",
                    lineHeight: 1,
                  }}
                >
                  +
                </button>
              </div>

              {/* Map Toggle */}
              {places.length > 0 && (
                <button
                  onClick={() => setShowMap((p) => !p)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    background: showMap ? "var(--teal)" : "var(--bg-secondary)",
                    color: showMap ? "white" : "var(--text-secondary)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all var(--transition)",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <span>{showMap ? (isHi ? "नक्शा छुपाएं" : "Hide map") : (isHi ? "नक्शा दिखाएं" : "Show map")}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map View */}
      {showMap && effectiveLocation && places.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <HospitalMap
            hospitals={places}
            userLocation={effectiveLocation}
            lang={lang}
          />
        </div>
      )}

      {/* STATE 1: Location Required / Denied */}
      {!effectiveLocation && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem 1.5rem",
            textAlign: "center",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "10px" }}>📍</div>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "var(--text-primary)",
              marginBottom: "6px",
            }}
          >
            {locationError
              ? (isHi ? "लोकेशन की अनुमति आवश्यक है" : "Location access is needed to find care near you.")
              : (isHi ? "पास की स्वास्थ्य सेवाओं के लिए लोकेशन सक्षम करें" : "Enable location access to find care near you.")}
          </h4>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              maxWidth: "460px",
              margin: "0 auto 16px",
              lineHeight: "1.5",
            }}
          >
            {isHi
              ? "आपके नजदीकी अस्पताल, क्लिनिक और फार्मेसियों की सटीक दूरी देखने के लिए ब्राउज़र में लोकेशन की अनुमति दें।"
              : "Allow your browser to detect your current location to calculate distances to nearby emergency care and clinics."}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={onLocationRequested}
              disabled={isLocationLoading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 20px",
                background: "var(--teal)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontSize: "13px",
                fontWeight: "700",
                cursor: isLocationLoading ? "wait" : "pointer",
                boxShadow: "0 2px 8px rgba(22, 165, 121, 0.25)",
              }}
            >
              {isLocationLoading ? (
                <>
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span>{isHi ? "लोकेशन खोजी जा रही है..." : "Detecting location..."}</span>
                </>
              ) : (
                <>
                  <span>📍</span>
                  <span>{isHi ? "लोकेशन सक्षम करें" : "Enable Location"}</span>
                </>
              )}
            </button>
          </div>

          {/* Fallback manual area search */}
          <form
            onSubmit={handleManualSearch}
            style={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              maxWidth: "380px",
              margin: "20px auto 0",
            }}
          >
            <input
              type="text"
              placeholder={isHi ? "या शहर / क्षेत्र का नाम लिखें..." : "Or enter your city / area..."}
              value={manualQuery}
              onChange={(e) => setManualQuery(e.target.value)}
              style={{
                flex: 1,
                padding: "8px 12px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontSize: "12px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isSearchingManual || !manualQuery.trim()}
              style={{
                padding: "8px 14px",
                background: "var(--surface-raised)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {isSearchingManual ? "..." : (isHi ? "खोजें" : "Search")}
            </button>
          </form>
        </div>
      )}

      {/* STATE 2: Loading Care Places */}
      {effectiveLocation && isLoading && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "2.5px solid var(--border)",
              borderTopColor: "var(--teal)",
              animation: "spin 0.7s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              fontWeight: "600",
              margin: 0,
            }}
          >
            {isHi ? "आपके पास स्वास्थ्य सेवाएं खोजी जा रही हैं..." : "Finding care near you..."}
          </p>
        </div>
      )}

      {/* STATE 3: API Error */}
      {effectiveLocation && !isLoading && error && (
        <div
          style={{
            background: "var(--alert-light)",
            border: "1px solid rgba(225, 29, 72, 0.25)",
            borderLeft: "3px solid var(--alert)",
            borderRadius: "var(--radius-md)",
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--alert)", marginBottom: "2px" }}>
              {isHi ? "स्वास्थ्य सेवाएं लोड नहीं हो सकीं" : "Unable to load nearby care right now."}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-primary)" }}>
              {error}
            </div>
          </div>
          <button
            onClick={loadCare}
            style={{
              padding: "7px 14px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--text-primary)",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {isHi ? "पुनः प्रयास करें" : "Retry"}
          </button>
        </div>
      )}

      {/* STATE 4: No Results / Empty State */}
      {effectiveLocation && !isLoading && !error && places.length === 0 && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "10px" }}>
            {activeCategory === "pharmacies" ? "💊" : activeCategory === "clinics" ? "🩺" : "🏥"}
          </div>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "var(--text-primary)",
              marginBottom: "4px",
            }}
          >
            {isHi
              ? `इस क्षेत्र (${radiusKm} किमी) में कोई ${activeCategory === "pharmacies" ? "फार्मेसी" : activeCategory === "clinics" ? "क्लिनिक" : "अस्पताल"} नहीं मिला।`
              : `No nearby ${activeCategory} found within ${radiusKm} km.`}
          </h4>
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-tertiary)",
              marginBottom: "16px",
            }}
          >
            {isHi
              ? "आप खोज दायरा बढ़ा सकते हैं या दूसरी श्रेणी का प्रयास कर सकते हैं।"
              : "Try expanding the search area or selecting another category."}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={handleExpandRadius}
              style={{
                padding: "8px 16px",
                background: "var(--teal)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {isHi ? `खोज दायरा बढ़ाएं (${radiusKm < 15 ? radiusKm + 5 : 25} किमी)` : `Expand search area (${radiusKm < 15 ? radiusKm + 5 : 25} km)`}
            </button>

            <button
              onClick={() => {
                const next = activeCategory === "hospitals" ? "clinics" : activeCategory === "clinics" ? "pharmacies" : "hospitals";
                setActiveCategory(next);
              }}
              style={{
                padding: "8px 16px",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {isHi ? "अन्य श्रेणी देखें" : "Try another category"}
            </button>
          </div>
        </div>
      )}

      {/* STATE 5: Results List */}
      {effectiveLocation && !isLoading && !error && places.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Data Notice */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "11px",
              color: "var(--text-tertiary)",
              marginBottom: "10px",
              padding: "0 4px",
            }}
          >
            <span>
              {isHi
                ? `${places.length} स्थान मिले (निकटतम पहले)`
                : `${places.length} locations found (sorted nearest first)`}
            </span>
            <span>Mappls · India POI Data</span>
          </div>

          {places.map((place, idx) => (
            <CarePlaceCard
              key={place.id || idx}
              place={place}
              lang={lang}
              isRecommended={idx === 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}
