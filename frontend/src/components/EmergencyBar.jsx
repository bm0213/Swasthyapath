import React from "react";
import strings from "../utils/strings";

export default function EmergencyBar({ lang }) {
  const s = strings[lang] || strings["en"];
  return (
    <div className="emergency-command-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: "var(--alert)",
          boxShadow: "0 0 10px rgba(225, 29, 72, 0.6)",
          animation: "fabPulse 2s infinite",
          flexShrink: 0,
        }} />
        <div>
          <div style={{
            fontSize: "11px", fontWeight: "800",
            color: "var(--alert)", letterSpacing: "0.1em",
            textTransform: "uppercase", lineHeight: 1.1,
          }}>
            {s.emergencyLabel || "NATIONAL EMERGENCY"}
          </div>
          <div style={{
            fontSize: "12px", fontWeight: "500",
            color: "var(--text-secondary)", marginTop: "2px",
          }}>
            {lang === "hi" ? "24/7 राष्ट्रीय आपातकालीन सेवा तुरंत उपलब्ध" : "Emergency services available 24/7 nationwide"}
          </div>
        </div>
      </div>

      <a href="tel:112" className="emergency-call-btn">
        <span style={{ fontSize: "16px", fontWeight: "800", letterSpacing: "0.04em" }}>112</span>
        <span style={{
          fontSize: "11px", fontWeight: "800",
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "4px 8px", background: "rgba(255,255,255,0.2)",
          borderRadius: "6px",
        }}>
          CALL NOW
        </span>
      </a>
    </div>
  );
}