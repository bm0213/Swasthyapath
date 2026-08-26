import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons broken by Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Red icon — user location
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Green icon — best match hospital
const bestIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
// Ambulance icon — yellow
const ambulanceIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
export default function HospitalMap({ hospitals, userLocation, lang, ambulanceLocation }) {
  if (!userLocation) return null;

  const center = [userLocation.lat, userLocation.lng];
  const accuracyMetres = userLocation.accuracy || 100;
  const accuracyLabel = accuracyMetres < 50
    ? "High accuracy"
    : accuracyMetres < 150
    ? "Medium accuracy"
    : "Low accuracy";
  const accuracyColor = accuracyMetres < 50
    ? "#0D7A5F"
    : accuracyMetres < 150
    ? "#B45309"
    : "#E84040";

  return (
    <div style={{ marginBottom: "1.25rem" }}>

      {/* Header row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "10px",
      }}>
        <div style={{
          fontSize: "11px", fontWeight: "700",
          color: "var(--text-secondary)",
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}>
          {lang === "hi" ? "नक्शे पर अस्पताल" : "Hospitals on map"}
        </div>

        {/* GPS accuracy badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          fontSize: "11px", fontWeight: "600",
          color: accuracyColor,
          background: accuracyColor + "15",
          border: `1px solid ${accuracyColor}30`,
          padding: "3px 10px", borderRadius: "20px",
        }}>
          <div style={{
            width: "6px", height: "6px",
            borderRadius: "50%", background: accuracyColor,
          }} />
          {lang === "hi" ? `±${Math.round(accuracyMetres)}मी` : `±${Math.round(accuracyMetres)}m · ${accuracyLabel}`}
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: "flex", gap: "16px", marginBottom: "8px", flexWrap: "wrap",
      }}>
        {[
          { color: "#E84040", label: lang === "hi" ? "आपकी लोकेशन" : "Your location" },
          { color: "#0D7A5F", label: lang === "hi" ? "सबसे उपयुक्त" : "Best match" },
          { color: "#378ADD", label: lang === "hi" ? "अन्य अस्पताल" : "Other hospitals" },
        { color: "#E84040", label: lang === "hi" ? "GPS सटीकता क्षेत्र" : "GPS accuracy zone", dashed: true },
{ color: "#F6C90E", label: lang === "hi" ? "एम्बुलेंस" : "Ambulance" },
              ].map((item) => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center",
            gap: "6px", fontSize: "11px",
            color: "var(--text-secondary)",
          }}>
            {item.dashed ? (
              <div style={{
                width: "16px", height: "2px",
                borderTop: `2px dashed ${item.color}`,
              }} />
            ) : (
              <div style={{
                width: "8px", height: "8px",
                borderRadius: "50%", background: item.color,
              }} />
            )}
            {item.label}
          </div>
        ))}
      </div>

      {/* Map */}
      <div style={{
        borderRadius: "12px", overflow: "hidden",
        border: "1px solid var(--border)",
        height: "360px",
        boxShadow: "var(--shadow-sm)",
      }}>
        <MapContainer
          center={center}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User location marker */}
          <Marker position={center} icon={userIcon}>
            <Popup>
              <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                {lang === "hi" ? "आपकी लोकेशन" : "Your location"}
              </div>
              <div style={{
                fontSize: "11px", color: accuracyColor,
                fontWeight: "500",
              }}>
                {lang === "hi"
                  ? `GPS सटीकता: ±${Math.round(accuracyMetres)} मीटर`
                  : `GPS accuracy: ±${Math.round(accuracyMetres)} metres`}
              </div>
              <div style={{ fontSize: "10px", color: "#6b6b6b", marginTop: "2px" }}>
                {lang === "hi"
                  ? "वास्तविक स्थान इस क्षेत्र में कहीं भी हो सकता है"
                  : "Actual position may be anywhere within the circle"}
              </div>
            </Popup>
          </Marker>

          {/* GPS accuracy circle — dashed, shows real uncertainty */}
          <Circle
            center={center}
            radius={accuracyMetres}
            pathOptions={{
              color: "#E84040",
              fillColor: "#E84040",
              fillOpacity: 0.06,
              weight: 1.5,
              dashArray: "5 5",
            }}
          />

          {/* Hospital markers */}
          {hospitals.map((hospital, index) => {
            if (!hospital.lat || !hospital.lng) return null;
            const name = lang === "hi" ? hospital.nameHi : hospital.name;
            const isBest = index === 0;

            return (
              <Marker
                key={hospital.id}
                position={[hospital.lat, hospital.lng]}
                icon={isBest ? bestIcon : new L.Icon.Default()}
              >
                <Popup>
                  <div style={{ minWidth: "170px" }}>
                    {isBest && (
                      <div style={{
                        fontSize: "10px", fontWeight: "700",
                        color: "#0D7A5F",
                        background: "#EDFAF5",
                        border: "1px solid #0D7A5F30",
                        padding: "2px 8px", borderRadius: "4px",
                        display: "inline-block", marginBottom: "6px",
                        letterSpacing: "0.04em",
                      }}>
                        {lang === "hi" ? "✓ सबसे उपयुक्त" : "✓ Best match"}
                      </div>
                    )}
                    <div style={{
                      fontSize: "13px", fontWeight: "600",
                      marginBottom: "3px", lineHeight: "1.3",
                    }}>
                      {name}
                    </div>
                    <div style={{
                      fontSize: "12px", color: "#0D7A5F",
                      fontWeight: "600", marginBottom: "6px",
                    }}>
                      {hospital.distanceKm} km {lang === "hi" ? "दूर" : "away"}
                    </div>
                    {Array.isArray(hospital.facilities) && hospital.facilities.length > 0 && (
                      <div style={{
                        display: "flex", gap: "3px",
                        flexWrap: "wrap", marginBottom: "8px",
                      }}>
                        {hospital.facilities.slice(0, 3).map((f) => (
                          <span key={f} style={{
                            padding: "2px 6px",
                            background: "#EEF2F7",
                            color: "#4A5568",
                            borderRadius: "4px", fontSize: "10px",
                            fontWeight: "600",
                            fontFamily: "monospace",
                          }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                    {hospital.phone && (
                      <a href={`tel:${hospital.phone}`} style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "center", gap: "5px",
                        padding: "6px 8px",
                        background: "#0D7A5F", color: "white",
                        borderRadius: "6px", fontSize: "12px",
                        textDecoration: "none", fontWeight: "600",
                      }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                        </svg>
                        {lang === "hi" ? "अभी कॉल करें" : "Call now"}
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            ); 
          })}

          {/* Ambulance marker */}
          {ambulanceLocation && (
            <Marker
              position={[ambulanceLocation.lat, ambulanceLocation.lng]}
              icon={ambulanceIcon}
            >
              <Popup>
                <div style={{ fontSize: "13px", fontWeight: "600" }}>
                  🚑 Ambulance
                </div>
                <div style={{ fontSize: "11px", color: "#6b6b6b" }}>
                  Live location
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      {/* Footer note */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginTop: "6px",
      }}>
        <p style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
          {lang === "hi"
            ? "मार्कर पर टैप करें अस्पताल की जानकारी देखने के लिए"
            : "Tap any marker to see hospital details"}
        </p>
        <p style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
          {lang === "hi"
            ? "स्थान की सटीकता डिवाइस पर निर्भर करती है"
            : "Location accuracy depends on your device"}
        </p>
      </div>
    </div>
  );
}