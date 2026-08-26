import React from "react";
import Header from "./components/Header";
import EmergencyBar from "./components/EmergencyBar";
import SymptomInput from "./components/SymptomInput";
import TriageResult from "./components/TriageResult";
import NearbyCare from "./components/NearbyCare";
import LoadingSpinner from "./components/LoadingSpinner";
import FAB from "./components/FAB";
import OfflineBanner from "./components/OfflineBanner";
import AdminDashboard from "./pages/AdminDashboard";
import FirstAid from "./pages/FirstAid";
import MedicalID from "./pages/MedicalID";
import AdminLogin from "./components/AdminLogin";
import UserHistory from "./components/UserHistory";
import Settings from "./pages/Settings";
import SOSButton from "./components/SOSButton";
import DoctorChat from "./components/DoctorChat";
import LandingPage from "./pages/LandingPage";
import { callTriage } from "./utils/triage";
import { getUserLocation, reverseGeocode } from "./utils/location";
import { useOnlineStatus } from "./utils/serviceWorker";

function StatusPill({ icon, label, value, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "10px 12px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "var(--shadow-xs)",
        cursor: onClick ? "pointer" : "default",
        transition: "all var(--transition)",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "8px",
          background: "var(--bg-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontSize: "9px",
            fontWeight: "700",
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "2px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: color || "var(--text-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: "-0.01em",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = React.useState("en");
  const [page, setPage] = React.useState("landing");
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState("");
  const [triageResult, setTriageResult] = React.useState(null);
  const [targetCategory, setTargetCategory] = React.useState("hospitals");
  const [isFindingCare, setIsFindingCare] = React.useState(false);
  const [error, setError] = React.useState("");
  const [userLocation, setUserLocation] = React.useState(null);
  const [locationName, setLocationName] = React.useState(null);
  const [isLocationLoading, setIsLocationLoading] = React.useState(false);
  const [locationError, setLocationError] = React.useState(null);
  const [showSOS, setShowSOS] = React.useState(false);
  const [showChat, setShowChat] = React.useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = React.useState(
    () => sessionStorage.getItem("admin-auth") === "true"
  );
  const [ambulanceLocation, setAmbulanceLocation] = React.useState(null);
  const resultRef = React.useRef(null);
  const nearbyCareRef = React.useRef(null);
  const isOnline = useOnlineStatus();

  React.useEffect(() => {
    // Font size zoom map — scales entire page including all px-based values
    const zoomMap = { small: 0.85, medium: 1.0, large: 1.15, xlarge: 1.30 };
    const legacyMap = { "14px": "small", "15px": "medium", "17px": "large", "19px": "xlarge" };
    const savedFont = localStorage.getItem("swasthya-fontsize");
    if (savedFont) {
      const key = legacyMap[savedFont] || savedFont;
      document.documentElement.style.zoom = zoomMap[key] ?? 1.0;
      if (legacyMap[savedFont]) localStorage.setItem("swasthya-fontsize", key);
    } else {
      document.documentElement.style.zoom = 1.0;
    }
    const savedLang = localStorage.getItem("swasthya-lang");
    if (savedLang) setLang(savedLang);
  }, []);

  // Request browser location
  async function requestUserLocation() {
    setIsLocationLoading(true);
    setLocationError(null);
    try {
      const loc = await getUserLocation();
      setUserLocation(loc);
      reverseGeocode(loc.lat, loc.lng).then((name) => {
        if (name) setLocationName(name);
      });
      return loc;
    } catch (err) {
      console.warn("[App] Geolocation error:", err.message);
      setLocationError(err.message || "Location permission denied.");
      return null;
    } finally {
      setIsLocationLoading(false);
    }
  }

  // Step 1 & 2: User describes symptoms & AI assesses urgency
  async function handleTriage(symptoms) {
    setIsLoading(true);
    setTriageResult(null);
    setError("");
    setIsFindingCare(false);

    try {
      setLoadingMessage(lang === "hi" ? "लक्षणों का विश्लेषण हो रहा है..." : "Assessing symptoms...");
      const result = await callTriage(symptoms, userLocation, lang);
      setTriageResult(result);
      setTargetCategory(result.recommendedCareCategory || "hospitals");

      // Save history entry
      const historyItem = {
        symptoms: symptoms.slice(0, 200),
        severity: result.severity,
        priority: result.priority,
        summary: result.summary,
        facilities: result.facilities,
        timestamp: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("swasthya-triage-history") || "[]");
      existing.push(historyItem);
      if (existing.length > 20) existing.splice(0, existing.length - 20);
      localStorage.setItem("swasthya-triage-history", JSON.stringify(existing));

      // Scroll smoothly to triage assessment result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

    } catch (err) {
      console.error("[App] Triage error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  }

  // Step 3 & 4: User initiates finding nearby care for recommended or chosen category
  async function handleFindCare(category) {
    const chosenCat = category || triageResult?.recommendedCareCategory || "hospitals";
    setTargetCategory(chosenCat);
    setIsFindingCare(true);

    if (!userLocation) {
      await requestUserLocation();
    }

    setTimeout(() => {
      nearbyCareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  const isUnauthenticatedAdminPage = page === "admin" && !isAdminAuthenticated;

  return (
    <>
      {!isUnauthenticatedAdminPage && (
        <Header
          lang={lang}
          setLang={setLang}
          currentPage={page}
          setPage={setPage}
          isAdmin={isAdminAuthenticated}
        />
      )}

      {page === "settings" && (
        <Settings lang={lang} setLang={setLang} onClose={() => setPage("landing")} />
      )}

      {page === "landing" && (
        <LandingPage
          setPage={setPage}
          onSOS={() => setShowSOS(true)}
          onChat={() => setShowChat(true)}
        />
      )}

      {page === "admin" && (
        isAdminAuthenticated ? (
          <div className="app-shell">
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
              <button
                onClick={() => {
                  sessionStorage.removeItem("admin-auth");
                  setIsAdminAuthenticated(false);
                }}
                style={{
                  padding: "7px 16px",
                  background: "transparent",
                  color: "var(--alert)",
                  border: "1px solid var(--alert)30",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
                Sign out
              </button>
            </div>
            <AdminDashboard lang={lang} isAdmin={true} />
          </div>
        ) : (
          <AdminLogin
            onSuccess={() => setIsAdminAuthenticated(true)}
            onBack={() => setPage("landing")}
          />
        )
      )}

      {page === "home" && (
        <div
          className="app-shell triage-layout"
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "1.5rem 1.5rem 6rem",
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: "1.75rem",
            alignItems: "start",
          }}
        >
          {/* Live Emergency Command Sidebar */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* System Status Panel */}
            <div className="status-panel-card">
              <div className="status-panel-header">
                <span className="status-panel-title">SYSTEM STATUS</span>
              </div>
              <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <StatusPill
                  icon="🌐"
                  label="Network"
                  value={isOnline ? "Online" : "Offline"}
                  color={isOnline ? "var(--teal)" : "var(--alert)"}
                />
                <StatusPill
                  icon="📍"
                  label="Location"
                  value={
                    userLocation
                      ? (locationName || `${userLocation.lat.toFixed(3)}, ${userLocation.lng.toFixed(3)}`)
                      : isLocationLoading
                      ? "Detecting..."
                      : "Not detected"
                  }
                  color={userLocation ? "var(--teal)" : "var(--text-tertiary)"}
                  onClick={!userLocation ? requestUserLocation : undefined}
                />
                <StatusPill
                  icon="🏥"
                  label="CARE SEARCH"
                  value={userLocation ? "Location active" : "Ready"}
                  color={userLocation ? "var(--teal)" : "var(--text-tertiary)"}
                />
              </div>
            </div>

            {/* Quick Guide */}
            <div className="status-panel-card">
              <div className="status-panel-header">
                <span className="status-panel-title">QUICK GUIDE</span>
              </div>
              <div style={{ padding: "14px 16px" }}>
                {[
                  { step: "01", text: lang === "hi" ? "लक्षणों का विवरण दें" : "Describe your symptoms" },
                  { step: "02", text: lang === "hi" ? "AI गंभीरता का आकलन करेगा" : "AI assesses urgency" },
                  { step: "03", text: lang === "hi" ? "लोकेशन चालू करें और सहायता पाएं" : "Enable location & find nearby care" },
                  { step: "04", text: lang === "hi" ? "कॉल करें या दिशा निर्देश लें" : "Call or get directions" },
                ].map((s, i, arr) => (
                  <div
                    key={s.step}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                      paddingBottom: i < arr.length - 1 ? "12px" : "0",
                      marginBottom: i < arr.length - 1 ? "12px" : "0",
                      borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "800",
                        color: "var(--teal-mid)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.05em",
                        flexShrink: 0,
                        paddingTop: "1px",
                      }}
                    >
                      {s.step}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                        lineHeight: "1.5",
                        fontWeight: "500",
                      }}
                    >
                      {s.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Numbers */}
            <div className="status-panel-card">
              <div className="status-panel-header">
                <span className="status-panel-title">EMERGENCY NUMBERS</span>
              </div>
              <div style={{ padding: "6px 16px" }}>
                {[
                  { label: "National Emergency", num: "112", isCritical: true },
                  { label: "Ambulance", num: "108", isCritical: false },
                  { label: "Police", num: "100", isCritical: false },
                  { label: "Fire Services", num: "101", isCritical: false },
                  { label: "Women Helpline", num: "1091", isCritical: false },
                ].map((e, i, arr) => (
                  <a
                    key={e.num}
                    href={`tel:${e.num}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "500" }}>
                      {e.label}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "800",
                          color: e.isCritical ? "var(--alert)" : "var(--text-primary)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {e.num}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          color: e.isCritical ? "var(--alert)" : "var(--teal-mid)",
                        }}
                      >
                        Call →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Tip */}
            <div
              style={{
                background: "var(--teal-light)",
                border: "1px solid rgba(22, 165, 121, 0.25)",
                borderRadius: "12px",
                padding: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "800",
                  color: "var(--teal-mid)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                }}
              >
                💡 STABILIZATION TIP
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.55",
                  margin: 0,
                }}
              >
                Keep the patient calm and warm. Do not administer food or water until medical personnel evaluate.
              </p>
            </div>
          </aside>

          {/* Main Hero Command Content */}
          <main>
            <EmergencyBar lang={lang} />
            <OfflineBanner isOnline={isOnline} lang={lang} />

            {userLocation && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "var(--teal-mid)",
                  background: "var(--teal-light)",
                  border: "1px solid rgba(22, 165, 121, 0.25)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  marginBottom: "16px",
                  letterSpacing: "0.02em",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--teal)",
                  }}
                />
                {locationName
                  ? `📍 GPS · ${locationName}${userLocation.accuracy ? ` (±${Math.round(userLocation.accuracy)}m)` : ""}`
                  : `GPS · ${userLocation.lat.toFixed(3)}, ${userLocation.lng.toFixed(3)}`}
              </div>
            )}

            {/* STEP 1: Updated Hero Section */}
            {!triageResult && !isLoading && (
              <div className="hero-tool-card">
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    marginBottom: "8px",
                  }}
                >
                  {lang === "hi" ? "सही देखभाल, अपने पास पाएं" : "GET THE RIGHT CARE, NEARBY"}
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                    margin: "0 0 16px",
                    maxWidth: "600px",
                  }}
                >
                  {lang === "hi"
                    ? "बताएं कि क्या हो रहा है। हम स्थिति का आकलन करेंगे और पास में उचित देखभाल खोजने में आपकी मदद करेंगे।"
                    : "Describe what's happening. We'll assess the situation and help you find the appropriate care nearby."}
                </p>

                {/* Unified Capability Metadata Pills */}
                <div className="capability-pill-list">
                  {["AI TRIAGE", "REAL GPS", "LIVE MAP", "OFFLINE MODE", "6 LANGUAGES"].map((cap) => (
                    <span key={cap} className="capability-pill">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Symptom Input Form */}
            <SymptomInput lang={lang} onSubmit={handleTriage} isLoading={isLoading} />

            {/* Loading Indicator */}
            {isLoading && (
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2.5rem 2rem",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                  marginTop: "1rem",
                }}
              >
                <LoadingSpinner lang={lang} />
                {loadingMessage && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      marginTop: "10px",
                      fontWeight: "500",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {loadingMessage}
                  </p>
                )}
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div
                style={{
                  background: "var(--alert-light)",
                  border: "1px solid var(--alert)30",
                  borderLeft: "3px solid var(--alert)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem 1.25rem",
                  marginTop: "1rem",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--alert)"
                  strokeWidth="2"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "var(--alert)",
                      marginBottom: "3px",
                    }}
                  >
                    Something went wrong
                  </div>
                  <p style={{ color: "var(--text-primary)", fontSize: "13px", margin: 0 }}>
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3 & 4 & 5: AI Assessment Panel & Nearby Care Flow */}
            {triageResult && !isLoading && (
              <div ref={resultRef}>
                <TriageResult
                  result={triageResult}
                  lang={lang}
                  onFindCare={(cat) => handleFindCare(cat)}
                  onNavigateFirstAid={() => setPage("firstaid")}
                />

                {/* Nearby Care Section */}
                <div ref={nearbyCareRef}>
                  <NearbyCare
                    userLocation={userLocation}
                    locationName={locationName}
                    recommendedCategory={targetCategory}
                    lang={lang}
                    onLocationRequested={requestUserLocation}
                    isLocationLoading={isLocationLoading}
                    locationError={locationError}
                  />
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {page === "history" && (
        <div className="app-shell">
          <UserHistory onStartTriage={() => setPage("home")} />
        </div>
      )}

      {page === "firstaid" && (
        <div className="app-shell">
          <FirstAid lang={lang} />
        </div>
      )}

      {page === "medicalid" && (
        <div className="app-shell">
          <MedicalID />
        </div>
      )}

      {!isUnauthenticatedAdminPage && (
        <>
          <FAB
            lang={lang}
            userLocation={userLocation}
            onSOS={() => setShowSOS(true)}
            onChat={() => setShowChat(true)}
          />

          <SOSButton
            lang={lang}
            userLocation={userLocation}
            forceOpen={showSOS}
            onClose={() => setShowSOS(false)}
          />

          <DoctorChat
            lang={lang}
            triageResult={triageResult}
            forceOpen={showChat}
            onClose={() => setShowChat(false)}
            onAmbulanceLocation={(loc) => setAmbulanceLocation(loc)}
            onPatientLocation={(loc) => setUserLocation(loc)}
          />

          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              display: "none",
              paddingBottom: "env(safe-area-inset-bottom)",
              background: "var(--alert)",
            }}
            className="emergency-bottom"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 16px",
                color: "white",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              <span>{lang === "hi" ? "राष्ट्रीय आपातकालीन" : "National Emergency"}</span>
              <a
                href="tel:112"
                style={{
                  fontSize: "17px",
                  fontWeight: "700",
                  color: "white",
                  textDecoration: "none",
                  padding: "4px 16px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "20px",
                }}
              >
                112
              </a>
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .emergency-top { display: none; }
          .emergency-bottom { display: block !important; }
        }
        @media (max-width: 700px) {
          aside { display: none !important; }
        }
      `}</style>
    </>
  );
}
