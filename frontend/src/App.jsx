import React from "react";
import Header from "./components/Header";
import EmergencyBar from "./components/EmergencyBar";
import SymptomInput from "./components/SymptomInput";
import TriageResult from "./components/TriageResult";
import HospitalMap from "./components/HospitalMap";
import HospitalList from "./components/HospitalList";
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
import { matchHospitals } from "./utils/matchHospitals";
import { getUserLocation, reverseGeocode } from "./utils/location";
import { fetchNearbyHospitals } from "./utils/fetchHospitals";
import {
  useOnlineStatus,
  cacheHospitalsLocally,
  loadCachedHospitals,
} from "./utils/serviceWorker";

function StatusPill({ icon, label, value, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "10px 12px",
        display: "flex", alignItems: "center", gap: "10px",
        boxShadow: "var(--shadow-xs)",
        cursor: onClick ? "pointer" : "default",
        transition: "all var(--transition)",
      }}
    >
      <div style={{
        width: "30px", height: "30px", borderRadius: "8px",
        background: "var(--bg-secondary)",
        display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "14px", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontSize: "9px", fontWeight: "700",
          color: "var(--text-tertiary)",
          textTransform: "uppercase", letterSpacing: "0.1em",
          marginBottom: "2px",
        }}>
          {label}
        </div>
        <div style={{
          fontSize: "12px", fontWeight: "600",
          color: color || "var(--text-primary)",
          whiteSpace: "nowrap", overflow: "hidden",
          textOverflow: "ellipsis", letterSpacing: "-0.01em",
        }}>
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
  const [hospitals, setHospitals] = React.useState([]);
  const [error, setError] = React.useState("");
  const [userLocation, setUserLocation] = React.useState(null);
  const [locationName, setLocationName] = React.useState(null);
  const [showMap, setShowMap] = React.useState(true);
  const [usingCache, setUsingCache] = React.useState(false);
  const [showSOS, setShowSOS] = React.useState(false);
  const [showChat, setShowChat] = React.useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = React.useState(
    () => sessionStorage.getItem("admin-auth") === "true"
  );
  const [ambulanceLocation, setAmbulanceLocation] = React.useState(null);
  const resultRef = React.useRef(null);
  const isOnline = useOnlineStatus();

  React.useEffect(() => {
    // Font size zoom map — scales entire page including all px-based values
    const zoomMap = { small: 0.85, medium: 1.0, large: 1.15, xlarge: 1.30 };
    const legacyMap = { "14px": "small", "15px": "medium", "17px": "large", "19px": "xlarge" };
    const savedFont = localStorage.getItem("swasthya-fontsize");
    if (savedFont) {
      const key = legacyMap[savedFont] || savedFont;
      document.documentElement.style.zoom = zoomMap[key] ?? 1.0;
      // Normalize legacy px values to keys in storage
      if (legacyMap[savedFont]) localStorage.setItem("swasthya-fontsize", key);
    } else {
      document.documentElement.style.zoom = 1.0;
    }
    const savedLang = localStorage.getItem("swasthya-lang");
    if (savedLang) setLang(savedLang);
  }, []);

  async function handleTriage(symptoms) {
    setIsLoading(true);
    setTriageResult(null);
    setHospitals([]);
    setError("");
    setUsingCache(false);

    try {
      setLoadingMessage(lang === "hi" ? "आपकी लोकेशन मिल रही है..." : "Getting your location...");
      let location = userLocation;
      if (!location) {
        location = await getUserLocation();
        setUserLocation(location);
        reverseGeocode(location.lat, location.lng).then((name) => {
          if (name) setLocationName(name);
        });
      }

      setLoadingMessage(lang === "hi" ? "लक्षणों का विश्लेषण हो रहा है..." : "Analyzing symptoms...");
      const result = await callTriage(symptoms, location);

      setLoadingMessage(lang === "hi" ? "पास के अस्पताल खोजे जा रहे हैं..." : "Finding nearby hospitals...");
      let nearbyHospitals = [];

      if (isOnline) {
        try {
          nearbyHospitals = await fetchNearbyHospitals(location.lat, location.lng);
          cacheHospitalsLocally(location.lat, location.lng, nearbyHospitals);
          setUsingCache(false);
        } catch {
          const cached = loadCachedHospitals(location.lat, location.lng);
          if (cached) { nearbyHospitals = cached; setUsingCache(true); }
        }
      } else {
        const cached = loadCachedHospitals(location.lat, location.lng);
        if (cached) { nearbyHospitals = cached; setUsingCache(true); }
      }

      const matched = matchHospitals(nearbyHospitals, result.facilities);
      setTriageResult(result);

      const historyItem = {
        symptoms: symptoms.slice(0, 200),
        severity: result.severity,
        summary: result.summary,
        facilities: result.facilities,
        timestamp: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("swasthya-triage-history") || "[]");
      existing.push(historyItem);
      if (existing.length > 20) existing.splice(0, existing.length - 20);
      localStorage.setItem("swasthya-triage-history", JSON.stringify(existing));

      setHospitals(matched);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  }

  const isUnauthenticatedAdminPage = page === "admin" && !isAdminAuthenticated;

  return (
    <>
      {!isUnauthenticatedAdminPage && (
        <Header
          lang={lang} setLang={setLang}
          currentPage={page} setPage={setPage}
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
                  fontSize: "13px", fontWeight: "600", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "6px",
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
        <div className="app-shell triage-layout" style={{
          maxWidth: "1140px", margin: "0 auto",
          padding: "1.5rem 1.5rem 6rem",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "1.75rem",
          alignItems: "start",
        }}>
          {/* Live Emergency Command Sidebar */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* System Status Panel */}
            <div className="status-panel-card">
              <div className="status-panel-header">
                <span className="status-panel-title">SYSTEM STATUS</span>
              </div>
              <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <StatusPill
                  icon="🌐" label="Network"
                  value={isOnline ? "Online" : "Offline"}
                  color={isOnline ? "var(--teal)" : "var(--alert)"}
                />
                <StatusPill
                  icon="📍" label="Location"
                  value={userLocation
                    ? (locationName || `${userLocation.lat.toFixed(3)}, ${userLocation.lng.toFixed(3)}`)
                    : "Not detected"}
                  color={userLocation ? "var(--teal)" : "var(--text-tertiary)"}
                />
                <StatusPill
                  icon="🏥" label="Hospital Search"
                  value={hospitals.length > 0 ? `${hospitals.length} care centers` : "Ready"}
                  color={hospitals.length > 0 ? "var(--teal)" : "var(--text-tertiary)"}
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
                  { step: "01", text: "Describe symptoms in your words" },
                  { step: "02", text: "Enable GPS location access" },
                  { step: "03", text: "Find nearest care center match" },
                  { step: "04", text: "Call 112 or get instant directions" },
                ].map((s, i, arr) => (
                  <div key={s.step} style={{
                    display: "flex", gap: "12px",
                    alignItems: "flex-start",
                    paddingBottom: i < arr.length - 1 ? "12px" : "0",
                    marginBottom: i < arr.length - 1 ? "12px" : "0",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "800",
                      color: "var(--teal-mid)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.05em",
                      flexShrink: 0,
                      paddingTop: "1px",
                    }}>
                      {s.step}
                    </span>
                    <span style={{
                      fontSize: "12px", color: "var(--text-secondary)",
                      lineHeight: "1.5", fontWeight: "500",
                    }}>
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
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", padding: "10px 0",
                      borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "500" }}>
                      {e.label}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{
                        fontSize: "14px",
                        fontWeight: "800",
                        color: e.isCritical ? "var(--alert)" : "var(--text-primary)",
                        fontFamily: "var(--font-mono)",
                      }}>
                        {e.num}
                      </span>
                      <span style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: e.isCritical ? "var(--alert)" : "var(--teal-mid)",
                      }}>
                        Call →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Tip */}
            <div style={{
              background: "var(--teal-light)",
              border: "1px solid rgba(22, 165, 121, 0.25)",
              borderRadius: "12px",
              padding: "14px",
            }}>
              <div style={{
                fontSize: "10px", fontWeight: "800", color: "var(--teal-mid)",
                textTransform: "uppercase", letterSpacing: "0.1em",
                marginBottom: "4px",
              }}>
                💡 STABILIZATION TIP
              </div>
              <p style={{
                fontSize: "12px", color: "var(--text-secondary)",
                lineHeight: "1.55", margin: 0,
              }}>
                Keep the patient calm and warm. Do not administer food or water until medical personnel evaluate.
              </p>
            </div>
          </aside>

          {/* Main Hero Command Content */}
          <main>
            <EmergencyBar lang={lang} />
            <OfflineBanner
              isOnline={isOnline} lang={lang}
              usingCache={usingCache} hasResults={hospitals.length > 0}
            />

            {userLocation && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "11px", fontWeight: "700",
                color: "var(--teal-mid)", background: "var(--teal-light)",
                border: "1px solid rgba(22, 165, 121, 0.25)",
                padding: "6px 14px", borderRadius: "20px",
                marginBottom: "16px", letterSpacing: "0.02em",
              }}>
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "var(--teal)",
                }} />
                {locationName
                  ? `📍 GPS · ${locationName}${userLocation.accuracy ? ` (±${Math.round(userLocation.accuracy)}m)` : ""}`
                  : `GPS · ${userLocation.lat.toFixed(3)}, ${userLocation.lng.toFixed(3)}`}
              </div>
            )}

            {!triageResult && !isLoading && (
              <div className="hero-tool-card">
                <div style={{
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}>
                  FIND THE NEAREST HOSPITAL
                </div>
                <p style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                  margin: "0 0 16px",
                  maxWidth: "600px",
                }}>
                  Describe what's happening. We'll assess the situation and help identify appropriate care centers in seconds.
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

            <SymptomInput lang={lang} onSubmit={handleTriage} isLoading={isLoading} />

            {isLoading && (
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "2.5rem 2rem",
                textAlign: "center",
                boxShadow: "var(--shadow-sm)",
                marginTop: "1rem",
              }}>
                <LoadingSpinner lang={lang} />
                {loadingMessage && (
                  <p style={{
                    fontSize: "13px", color: "var(--text-secondary)",
                    marginTop: "10px", fontWeight: "500",
                    letterSpacing: "-0.01em",
                  }}>
                    {loadingMessage}
                  </p>
                )}
              </div>
            )}

            {error && (
              <div style={{
                background: "var(--alert-light)",
                border: "1px solid var(--alert)30",
                borderLeft: "3px solid var(--alert)",
                borderRadius: "var(--radius-md)",
                padding: "1rem 1.25rem", marginTop: "1rem",
                display: "flex", gap: "12px", alignItems: "flex-start",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="var(--alert)" strokeWidth="2"
                  style={{ flexShrink: 0, marginTop: "2px" }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div>
                  <div style={{
                    fontSize: "13px", fontWeight: "700",
                    color: "var(--alert)", marginBottom: "3px",
                  }}>
                    Something went wrong
                  </div>
                  <p style={{ color: "var(--text-primary)", fontSize: "13px", margin: 0 }}>
                    {error}
                  </p>
                </div>
              </div>
            )}

            {triageResult && !isLoading && (
              <div ref={resultRef}>
                <TriageResult result={triageResult} lang={lang} />

                {hospitals.length > 0 && (
                  <button
                    onClick={() => setShowMap((prev) => !prev)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      padding: "7px 14px", marginBottom: "12px",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      background: showMap ? "var(--navy)" : "var(--bg-card)",
                      color: showMap ? "white" : "var(--text-secondary)",
                      fontSize: "12px", fontWeight: "600",
                      transition: "all var(--transition)", cursor: "pointer",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5">
                      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                    </svg>
                    {showMap
                      ? (lang === "hi" ? "नक्शा छुपाएं" : "Hide map")
                      : (lang === "hi" ? "नक्शा दिखाएं" : "Show map")}
                  </button>
                )}

                {showMap && hospitals.length > 0 && (
                  <HospitalMap
                    hospitals={hospitals}
                    userLocation={userLocation}
                    lang={lang}
                    ambulanceLocation={ambulanceLocation}
                  />
                )}

                {hospitals.length > 0
                  ? <HospitalList hospitals={hospitals} lang={lang} />
                  : (
                    <div style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "3rem 2rem",
                      textAlign: "center",
                      boxShadow: "var(--shadow-sm)",
                    }}>
                      <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏥</div>
                      <p style={{
                        fontSize: "14px", color: "var(--text-secondary)",
                        fontWeight: "600", marginBottom: "4px",
                        letterSpacing: "-0.01em",
                      }}>
                        {lang === "hi" ? "पास में कोई अस्पताल नहीं मिला।" : "No hospitals found nearby"}
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                        {lang === "hi" ? "किसी दूसरे क्षेत्र में दोबारा कोशिश करें।" : "Try again in a different area"}
                      </p>
                    </div>
                  )
                }
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

          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            zIndex: 100, display: "none",
            paddingBottom: "env(safe-area-inset-bottom)",
            background: "var(--alert)",
          }} className="emergency-bottom">
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "10px 16px",
              color: "white", fontSize: "13px", fontWeight: "600",
            }}>
              <span>{lang === "hi" ? "राष्ट्रीय आपातकालीन" : "National Emergency"}</span>
              <a href="tel:112" style={{
                fontSize: "17px", fontWeight: "700", color: "white",
                textDecoration: "none", padding: "4px 16px",
                background: "rgba(255,255,255,0.2)", borderRadius: "20px",
              }}>112</a>
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
