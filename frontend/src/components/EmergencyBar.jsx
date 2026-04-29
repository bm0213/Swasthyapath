import strings from "../utils/strings";

export default function EmergencyBar({ lang }) {
  const s = strings[lang];
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderLeft: "3px solid var(--alert)",
      borderRadius: "10px",
      padding: "10px 14px",
      marginBottom: "1rem",
      boxShadow: "var(--shadow-sm)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: "var(--alert)",
          animation: "fabPulse 2s infinite",
        }} />
        <span style={{
          fontSize: "12px", fontWeight: "600",
          color: "var(--text-primary)", letterSpacing: "0.02em",
        }}>
          {s.emergencyLabel}
        </span>
      </div>
      <a href="tel:112" style={{
        display: "flex", alignItems: "center", gap: "6px",
        textDecoration: "none",
        background: "var(--alert)",
        color: "white",
        padding: "4px 12px", borderRadius: "20px",
        fontSize: "13px", fontWeight: "700",
        letterSpacing: "0.05em",
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
        </svg>
        112
      </a>
    </div>
  );
}