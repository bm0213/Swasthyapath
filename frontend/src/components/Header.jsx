import React from "react";

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
    return saved ? saved === "dark" : true;
  });

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("swasthya-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return [isDark, setIsDark];
}

function BrandCrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5V19" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.03.03a2 2 0 1 1-2.83 2.83l-.03-.03a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.07a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.03.03a2 2 0 1 1-2.83-2.83l.03-.03A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.04A1.7 1.7 0 0 0 4.6 8.94a1.7 1.7 0 0 0-.34-1.88l-.03-.03a2 2 0 1 1 2.83-2.83l.03.03a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 10 3.01V3a2 2 0 1 1 4 0v.01a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.03-.03a2 2 0 1 1 2.83 2.83l-.03.03a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.04A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Header({ lang, setLang, currentPage, setPage, isAdmin }) {
  const [isDark, setIsDark] = useDarkMode();
  const [showLangMenu, setShowLangMenu] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  const navItems = [
    { id: "landing", label: "Home" },
    { id: "home", label: "Emergency Guide" },
    { id: "firstaid", label: "First Aid" },
    { id: "medicalid", label: "Medical ID" },
    { id: "history", label: "History" },
    ...(isAdmin ? [{ id: "admin", label: "Dashboard" }] : []),
    { id: "settings", label: "Settings" },
  ];

  const handleNavClick = (id) => {
    setPage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="medical-nav">
      <div className="medical-nav-inner">
        {/* Brand Area */}
        <button
          className="brand-mark"
          onClick={() => setPage("landing")}
          onDoubleClick={() => setPage("admin")}
          aria-label="Go to SwasthyaPath home"
        >
          <span className="brand-icon">
            <BrandCrossIcon />
          </span>
          <span className="brand-text-container">
            <span className="brand-name">SwasthyaPath</span>
            <span className="brand-subtitle">Medical command center</span>
          </span>
        </button>

        {/* Primary Desktop Navigation */}
        <nav className="nav-list nav-list-desktop" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right-Side Control Group */}
        <div className="nav-actions">
          {/* System Ready Status */}
          <div className="system-ready system-ready-desktop" aria-label="System status: Ready">
            <span className="system-ready-dot" />
            <span>System Ready</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            className="nav-control-btn"
            onClick={() => setIsDark((d) => !d)}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Light theme" : "Dark theme"}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Language Selector Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              className="nav-control-btn"
              onClick={() => setShowLangMenu((p) => !p)}
              aria-label="Choose language"
              aria-expanded={showLangMenu}
              title={`Current language: ${currentLang.fullName}`}
            >
              <GlobeIcon />
              <span>{currentLang.label}</span>
              <ChevronDownIcon />
            </button>

            {showLangMenu && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 110 }}
                  onClick={() => setShowLangMenu(false)}
                />
                <div
                  className="premium-card slide-down"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    zIndex: 120,
                    minWidth: "180px",
                    overflow: "hidden",
                    padding: "6px",
                    boxShadow: "var(--shadow-md)",
                    borderRadius: "12px",
                  }}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        localStorage.setItem("swasthya-lang", l.code);
                        setShowLangMenu(false);
                      }}
                      style={{
                        width: "100%",
                        minHeight: "40px",
                        padding: "6px 10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        border: "none",
                        borderRadius: "8px",
                        background: lang === l.code ? "var(--teal-light)" : "transparent",
                        color: lang === l.code ? "var(--text-primary)" : "var(--text-secondary)",
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: lang === l.code ? "700" : "500",
                        cursor: "pointer",
                        transition: "background-color 150ms ease",
                      }}
                    >
                      <span
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          display: "grid",
                          placeItems: "center",
                          background: lang === l.code ? "var(--teal)" : "var(--bg-secondary)",
                          color: lang === l.code ? "#FFFFFF" : "var(--text-secondary)",
                          fontSize: "11px",
                          fontWeight: "700",
                        }}
                      >
                        {l.label}
                      </span>
                      {l.fullName}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Settings Icon Button */}
          <button
            className="nav-control-btn"
            onClick={() => handleNavClick("settings")}
            aria-label="Open settings"
            title="Settings"
          >
            <SettingsIcon />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="nav-control-btn mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer slide-down">
          <div
            className="system-ready"
            style={{ width: "fit-content", marginBottom: "4px" }}
            aria-label="System status: Ready"
          >
            <span className="system-ready-dot" />
            <span>System Ready</span>
          </div>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

