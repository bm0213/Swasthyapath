import React from "react";
import strings from "../utils/strings";

export default function LoadingSpinner({ lang }) {
  const messages = strings[lang]?.loadingMessages || strings["en"].loadingMessages;
  const [msgIndex, setMsgIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", padding: "2.5rem 1rem", gap: "16px",
    }}>
      {/* Medical cross spinner */}
      <div style={{ position: "relative", width: "48px", height: "48px" }}>
        <div style={{
          position: "absolute", inset: 0,
          border: "3px solid var(--border)",
          borderTopColor: "var(--medical-red)",
          borderRadius: "50%",
          animation: "spin 0.85s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--medical-red)">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c.55 0 1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V7c0-.55.45-1 1-1z"/>
          </svg>
        </div>
      </div>
      <p style={{
        fontSize: "13px", fontWeight: "500",
        color: "var(--text-secondary)", textAlign: "center",
        letterSpacing: "0.01em",
      }}>
        {messages[msgIndex]}
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}