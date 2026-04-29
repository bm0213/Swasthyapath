import HospitalCard from "./HospitalCard";
import strings from "../utils/strings";

export default function HospitalList({ hospitals, lang }) {
  const s = strings[lang];
  if (!hospitals.length) return null;

  return (
    <div>
      {/* Section label */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        marginBottom: "12px",
      }}>
        <div style={{
          width: "3px", height: "16px",
          background: "var(--teal)", borderRadius: "2px",
        }} />
        <div style={{
          fontSize: "11px", fontWeight: "600",
          color: "var(--text-secondary)",
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}>
          {s.hospitalsFound}
        </div>
      </div>

      {/* Data notice */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: "8px",
        padding: "10px 12px",
        background: "var(--amber-light)",
        border: "1px solid #D97706",
        borderLeft: "3px solid #D97706",
        borderRadius: "8px",
        marginBottom: "12px",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#D97706" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <div style={{
            fontSize: "11px", fontWeight: "700",
            color: "#B45309", marginBottom: "2px",
            textTransform: "uppercase", letterSpacing: "0.04em",
          }}>
            Data notice
          </div>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: 0, lineHeight: "1.5" }}>
            {lang === "hi"
              ? "अस्पताल डेटा OpenStreetMap से लिया गया है। जाने से पहले विवरण सत्यापित करें। नेविगेशन के लिए प्रत्येक कार्ड पर Google Maps बटन का उपयोग करें।"
              : "Hospital data sourced from OpenStreetMap. Verify details before visiting. Use the Google Maps button on each card for navigation."}
          </p>
        </div>
      </div>

      {/* Hospital cards */}
      {hospitals.map((h, i) => (
        <HospitalCard key={h.id} hospital={h} lang={lang} isBest={i === 0} />
      ))}
    </div>
  );
}