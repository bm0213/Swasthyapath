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

export default function Header({ lang, setLang, currentPage, setPage }) {
  const s = strings[lang];
  const [isDark, setIsDark] = useDarkMode();
  const [showLangMenu, setShowLangMenu] = React.useState(false);
  const currentLang = languages.find((l) => l.code === lang);

  return (
    <header style={{
      background: "var(--navy)",
      position: "sticky", top: 0, zIndex: 50,
      boxShadow: "0 1px 0 rgba(255,255,255,0.08)",
    }}>
      <div style={{
        maxWidth: "1140px", margin: "0 auto",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        height: "56px",
      }}>

        {/* Logo */}
        <div onClick={() => setPage("home")} style={{
          display: "flex", alignItems: "center", gap: "10px", cursor: "pointer",
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "var(--teal)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "600", color: "white", letterSpacing: "-0.3px" }}>
              SwasthyaPath
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
              {currentPage === "admin" ? "Admin Dashboard" : "Emergency Response System"}
            </div>
          </div>
        </div>

        {/* Center nav */}
        <div style={{ display: "flex", gap: "2px" }}>
          {[
            { id: "home", label: "Triage" },
            { id: "admin", label: "Dashboard" },
            { id: "settings", label: "Settings" },  
          ].map((item) => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              padding: "6px 14px",
              background: currentPage === item.id ? "rgba(255,255,255,0.12)" : "transparent",
              border: "none",
              borderRadius: "6px",
              color: currentPage === item.id ? "white" : "rgba(255,255,255,0.5)",
              fontSize: "13px", fontWeight: "500",
              cursor: "pointer", transition: "all 0.15s",
              letterSpacing: "0.01em",
            }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
{/* Settings button */}
<button
  onClick={() => setPage("settings")}
  title="Settings"
  style={{
    width: "32px", height: "32px", borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: currentPage === "settings"
      ? "rgba(255,255,255,0.2)"
      : "rgba(255,255,255,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
  }}
>
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
</button>
          {/* Dark mode */}
          <button onClick={() => setIsDark((d) => !d)} style={{
            width: "32px", height: "32px", borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", cursor: "pointer",
          }}>
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Language */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowLangMenu((p) => !p)} style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 10px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.08)",
              color: "white", fontSize: "12px", fontWeight: "600",
              cursor: "pointer", letterSpacing: "0.03em",
            }}>
              {currentLang.label}
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px" }}>▾</span>
            </button>

            {showLangMenu && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={() => setShowLangMenu(false)} />
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px", overflow: "hidden",
                  zIndex: 100, minWidth: "160px",
                  boxShadow: "var(--shadow-md)",
                }}>
                  {languages.map((l, i, arr) => (
                    <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false); }} style={{
                      width: "100%", padding: "9px 14px",
                      display: "flex", alignItems: "center", gap: "10px",
                      background: lang === l.code ? "var(--navy-light)" : "transparent",
                      border: "none", cursor: "pointer",
                      borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                      textAlign: "left",
                    }}>
                      <span style={{
                        width: "26px", height: "26px", borderRadius: "6px",
                        background: lang === l.code ? "var(--navy)" : "var(--bg-secondary)",
                        color: lang === l.code ? "white" : "var(--text-secondary)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", fontWeight: "600", flexShrink: 0,
                      }}>
                        {l.label}
                      </span>
                      <span style={{
                        fontSize: "13px",
                        color: lang === l.code ? "var(--navy)" : "var(--text-secondary)",
                        fontWeight: lang === l.code ? "600" : "400",
                      }}>
                        {l.fullName}
                      </span>
                      {lang === l.code && (
                        <span style={{ marginLeft: "auto", color: "var(--teal)", fontSize: "12px" }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}