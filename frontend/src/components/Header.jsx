import React from "react";
import strings from "../utils/strings";

const languages = [
  { code: "en", label: "EN", fullName: "English" },
  { code: "hi", label: "हि", fullName: "हिंदी" },
  { code: "ta", label: "த", fullName: "தமிழ்" },
  { code: "te", label: "తె", fullName: "తెలుగు" },
  { code: "bn", label: "ব", fullName: "বাংলা" },
  { code: "mr", label: "म", fullName: "मराठी" },
];

function useDarkMode() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem("swasthya-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("swasthya-theme", isDark ? "dark" : "light");
  }, [isDark]);
  return [isDark, setIsDark];
}

export default function Header({ lang, setLang, currentPage, setPage, isAdmin }) {
  const [isDark, setIsDark] = useDarkMode();
  const [showLangMenu, setShowLangMenu] = React.useState(false);
  const currentLang = languages.find((l) => l.code === lang);

  const navItems = [
    { id: "home", label: "Triage", icon: "🏥" },
    { id: "firstaid", label: "First Aid", icon: "🩹" },
    { id: "medicalid", label: "Medical ID", icon: "🪪" },
    { id: "history", label: "My History", icon: "📋" },
    ...(isAdmin ? [{ id: "admin", label: "Dashboard", icon: "📊" }] : []),
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const pageSubtitles = {
    home: "Emergency Response System",
    firstaid: "First Aid Guide",
    medicalid: "Medical ID",
    history: "My Triage History",
    admin: "Admin Dashboard",
    settings: "Settings",
  };

  return (
    <header style={{
      background: "var(--navy)",
      position: "sticky", top: 0, zIndex: 50,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Top bar */}
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "0 2rem",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
      }}>
        {/* Logo */}
        <div
          onClick={() => setPage("home")}
          onDoubleClick={() => setPage("admin")}
          style={{
            display: "flex", alignItems: "center",
            gap: "12px", cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #0E9B77 0%, #0B7A5E 100%)",
            display: "flex", alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(14,155,119,0.4)",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontSize: "16px", fontWeight: "700",
              color: "white", letterSpacing: "-0.4px",
              fontFamily: "var(--font-display)",
            }}>
              SwasthyaPath
            </div>
            <div style={{
              fontSize: "10px", color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.04em", fontWeight: "500",
              marginTop: "-1px",
            }}>
              {pageSubtitles[currentPage] || "Emergency Response System"}
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {/* Settings */}
          <button
            onClick={() => setPage("settings")}
            title="Settings"
            style={{
              width: "34px", height: "34px", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: currentPage === "settings"
                ? "rgba(255,255,255,0.15)"
                : "rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              transition: "all var(--transition)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>

          {/* Dark mode */}
          <button
            onClick={() => setIsDark((d) => !d)}
            style={{
              width: "34px", height: "34px", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "15px",
              cursor: "pointer", transition: "all var(--transition)",
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Language */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowLangMenu((p) => !p)}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "6px 10px",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.85)",
                fontSize: "12px", fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {currentLang.label}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {showLangMenu && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 50 }}
                  onClick={() => setShowLangMenu(false)}
                />
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden", zIndex: 100,
                  minWidth: "160px",
                  boxShadow: "var(--shadow-lg)",
                  animation: "slideDown 0.18s ease",
                }}>
                  {languages.map((l, i, arr) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                      style={{
                        width: "100%", padding: "9px 14px",
                        display: "flex", alignItems: "center", gap: "10px",
                        background: lang === l.code ? "var(--teal-light)" : "transparent",
                        border: "none", cursor: "pointer",
                        borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                        textAlign: "left", transition: "background var(--transition)",
                      }}
                    >
                      <span style={{
                        width: "28px", height: "28px", borderRadius: "7px",
                        background: lang === l.code ? "var(--teal)" : "var(--bg-secondary)",
                        color: lang === l.code ? "white" : "var(--text-secondary)",
                        display: "flex", alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px", fontWeight: "600", flexShrink: 0,
                      }}>
                        {l.label}
                      </span>
                      <span style={{
                        fontSize: "13px",
                        color: lang === l.code ? "var(--teal)" : "var(--text-secondary)",
                        fontWeight: lang === l.code ? "600" : "400",
                      }}>
                        {l.fullName}
                      </span>
                      {lang === l.code && (
                        <svg style={{ marginLeft: "auto" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "0 2rem",
        display: "flex", alignItems: "center",
        gap: "2px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        overflowX: "auto",
      }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              padding: "10px 14px",
              background: "transparent",
              border: "none",
              borderBottom: currentPage === item.id
                ? "2px solid var(--teal-mid)"
                : "2px solid transparent",
              color: currentPage === item.id
                ? "white"
                : "rgba(255,255,255,0.45)",
              fontSize: "12px", fontWeight: currentPage === item.id ? "600" : "400",
              cursor: "pointer",
              transition: "all var(--transition)",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
              display: "flex", alignItems: "center", gap: "5px",
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}