import React from "react";

export default function FAB({ lang, userLocation, onSOS, onChat }) {
  const [open, setOpen] = React.useState(false);

  const actions = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
        </svg>
      ),
      label: lang === "hi" ? "एम्बुलेंस 108" : "Ambulance 108",
      color: "#0D7A5F",
      action: () => window.open("tel:108", "_self"),
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      ),
      label: lang === "hi" ? "डॉक्टर चैट" : "Doctor chat",
      color: "#1B4F8A",
      action: () => { setOpen(false); onChat?.(); },
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      label: lang === "hi" ? "SOS अलर्ट" : "SOS alert",
      color: "#E84040",
      action: () => { setOpen(false); onSOS?.(); },
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 190,
            background: "rgba(0,0,0,0.3)",
          }}
        />
      )}

      {/* Action items */}
      <div style={{
        position: "fixed", bottom: "90px", right: "20px",
        zIndex: 200, display: "flex", flexDirection: "column",
        gap: "10px", alignItems: "flex-end",
        pointerEvents: open ? "all" : "none",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.2s",
      }}>
        {actions.map((a, i) => (
          <button
            key={i}
            onClick={() => { a.action(); setOpen(false); }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "8px 14px 8px 10px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              boxShadow: "var(--shadow-md)",
              cursor: "pointer",
              transition: `transform 0.2s ${i * 0.04}s`,
            }}
          >
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: a.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {a.icon}
            </div>
            <span style={{
              fontSize: "13px", fontWeight: "600",
              color: "var(--text-primary)", whiteSpace: "nowrap",
            }}>
              {a.label}
            </span>
          </button>
        ))}
      </div>

      {/* Main FAB SOS Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Emergency SOS trigger"
        style={{
          position: "fixed", bottom: "24px", right: "20px",
          zIndex: 200,
          height: "50px", padding: "0 18px", borderRadius: "25px",
          background: open ? "#1B4F8A" : "var(--alert)",
          border: "none", color: "white",
          display: "flex", alignItems: "center", gap: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 18px rgba(225,29,72,0.4)",
          animation: open ? "none" : "fabPulse 3s infinite",
          transition: "background 0.2s, transform 0.2s",
        }}
      >
        <span style={{ fontSize: "16px" }}>🚨</span>
        <span style={{ fontSize: "14px", fontWeight: "800", letterSpacing: "0.06em" }}>
          {open ? "CLOSE" : "SOS"}
        </span>
      </button>
    </>
  );
}