import React from "react";

export default function CarePlaceCard({ place, lang, isRecommended }) {
  const isHi = lang === "hi";
  const name = isHi ? place.nameHi || place.name : place.name;

  function openDirections() {
    if (place.lat && place.lng) {
      // Coordinates available → direct Google Maps destination
      const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (place.eLoc) {
      // Mappls Pin available → open on Mappls Maps
      const url = `https://maps.mappls.com/place/${place.eLoc}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (place.name || place.address) {
      // Fallback → Google Maps search by name + address
      const query = encodeURIComponent(`${place.name}${place.address ? ", " + place.address : ""}`);
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  const canOpenDirections = !!(place.lat && place.lng) || !!place.eLoc || !!(place.name || place.address);

  return (
    <div
      className="care-place-card"
      style={{
        background: "var(--bg-card)",
        border: isRecommended
          ? "1.5px solid var(--teal)"
          : "1px solid var(--border)",
        borderLeft: isRecommended
          ? "3.5px solid var(--teal)"
          : "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "14px 16px",
        marginBottom: "10px",
        boxShadow: "var(--shadow-xs)",
        transition: "all var(--transition)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Top Row: Icon, Name, Category Pill, Distance */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        {/* Medical Icon */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
          }}
        >
          {place.icon || (place.category === "pharmacies" ? "💊" : place.category === "clinics" ? "🩺" : "🏥")}
        </div>

        {/* Place Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "2px" }}>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: "1.35",
                letterSpacing: "-0.01em",
              }}
            >
              {name}
            </h4>

            {isRecommended && (
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "var(--teal)",
                  background: "var(--teal-light)",
                  border: "1px solid var(--teal)30",
                  padding: "1px 7px",
                  borderRadius: "4px",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                }}
              >
                {isHi ? "सर्वोत्तम विकल्प" : "Nearest Match"}
              </span>
            )}
          </div>

          {/* Subtitle Line: Category • Distance */}
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: "600", color: "var(--text-secondary)" }}>
              {place.typeLabel || "Care Facility"}
            </span>
            <span style={{ color: "var(--text-tertiary)" }}>•</span>
            <span
              style={{
                fontWeight: "700",
                color: "var(--teal)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "-0.01em",
              }}
            >
              {place.distanceKm} km {isHi ? "दूर" : "away"}
            </span>

            {/* Optional opening status if present */}
            {place.openingHours && (
              <>
                <span style={{ color: "var(--text-tertiary)" }}>•</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: place.openingHours === "24/7" ? "var(--teal)" : "var(--text-tertiary)",
                  }}
                >
                  {place.openingHours === "24/7" ? (isHi ? "24/7 खुला" : "24/7 Open") : place.openingHours}
                </span>
              </>
            )}
          </div>

          {/* Address */}
          {place.address && (
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-tertiary)",
                marginTop: "4px",
                lineHeight: "1.4",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={place.address}
            >
              📍 {place.address}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Row: Directions & Call */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingTop: "6px",
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Directions Button */}
        <button
          onClick={openDirections}
          style={{
            flex: 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "7px 12px",
            background: "var(--surface-raised)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-primary)",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all var(--transition)",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--teal)";
            e.currentTarget.style.color = "var(--teal)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          <span>{isHi ? "दिशा निर्देश" : "Directions"}</span>
        </button>

        {/* Call Button (if phone available) */}
        {place.phone ? (
          <a
            href={`tel:${place.phone}`}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "7px 12px",
              background: "var(--teal-light)",
              border: "1px solid var(--teal)30",
              borderRadius: "var(--radius-sm)",
              color: "var(--teal)",
              fontSize: "12px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all var(--transition)",
              letterSpacing: "-0.01em",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>{isHi ? "कॉल करें" : "Call"}</span>
          </a>
        ) : (
          <button
            disabled
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "7px 12px",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--text-tertiary)",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "not-allowed",
              opacity: 0.7,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>{isHi ? "फोन अनुपलब्ध" : "No Phone"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
