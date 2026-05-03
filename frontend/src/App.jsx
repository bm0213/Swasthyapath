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
import AdminLogin from "./components/AdminLogin";
import UserHistory from "./components/UserHistory";
import Settings from "./pages/Settings";
import SOSButton from "./components/SOSButton";
import DoctorChat from "./components/DoctorChat";
import { callTriage } from "./utils/triage";
import { matchHospitals } from "./utils/matchHospitals";
import { getUserLocation, reverseGeocode } from "./utils/location";
import { fetchNearbyHospitals } from "./utils/fetchHospitals";
import {
  useOnlineStatus,
  cacheHospitalsLocally,
  loadCachedHospitals,
} from "./utils/serviceWorker";

function QuickInfoCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "10px",
      padding: "12px 14px",
      display: "flex", alignItems: "center", gap: "12px",
      boxShadow: "var(--shadow-sm)",
    }}>
      <div style={{
        width: "38px", height: "38px", borderRadius: "8px",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "16px", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: "10px", fontWeight: "700",
          color: "var(--text-tertiary)",
          textTransform: "uppercase", letterSpacing: "0.08em",
          marginBottom: "3px",
        }}>
          {label}
        </div>
        <div style={{
          fontSize: "13px", fontWeight: "700",
          color: color || "var(--text-primary)",
          fontFamily: label === "Location" ? "'DM Sans', sans-serif" : "'DM Mono', monospace",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap", overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = React.useState("en");
  const [page, setPage] = React.useState("home");
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
    const savedFont = localStorage.getItem("swasthya-fontsize");
    if (savedFont) document.documentElement.style.fontSize = savedFont;
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

      // Save to local history
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

  const sidebarItems = [
    {
      icon: "🌐",
      label: "Network",
      value: isOnline ? "Online" : "Offline",
      color: isOnline ? "var(--teal)" : "var(--alert)",
    },
    {
      icon: "📍",
      label: "Location",
      value: userLocation
        ? (locationName || `${userLocation.lat.toFixed(2)}, ${userLocation.lng.toFixed(2)}`)
        : "Not detected",
      color: userLocation ? "var(--teal)" : "var(--text-tertiary)",
    },
    {
      icon: "🏥",
      label: "Hospitals found",
      value: hospitals.length > 0 ? `${hospitals.length} nearby` : "Search first",
      color: hospitals.length > 0 ? "var(--teal)" : "var(--text-tertiary)",
    },
  ];

  return (
    <>
      <Header lang={lang} setLang={setLang} currentPage={page} setPage={setPage} isAdmin={isAdminAuthenticated} />

      {page === "settings" && (
        <Settings lang={lang} setLang={setLang} onClose={() => setPage("home")} />
      )}

     {page === "admin" && (
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.5rem 1.25rem 4rem" }}>
          {isAdminAuthenticated ? (
            <>
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
                    border: "1px solid var(--alert)40",
                    borderRadius: "8px", fontSize: "13px",
                    fontWeight: "600", cursor: "pointer",
                  }}
                >
                  🔓 Sign out
                </button>
              </div>
              <AdminDashboard lang={lang} isAdmin={true} />
            </>
          ) : (
            <AdminLogin onSuccess={() => setIsAdminAuthenticated(true)} />
          )}
        </div>
      )}

      {page === "home" && (
        <div style={{
          maxWidth: "1140px", margin: "0 auto",
          padding: "1.5rem 1.25rem 6rem",
          display: "grid",
          gridTemplateColumns: "230px 1fr",
          gap: "1.5rem",
          alignItems: "start",
        }}>

          <aside style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "10px", padding: "14px", boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{
                fontSize: "10px", fontWeight: "700", color: "var(--text-tertiary)",
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px",
              }}>
                How to use
              </div>
              {[
                { step: "1", text: "Describe symptoms in your language" },
                { step: "2", text: "Allow location when prompted" },
                { step: "3", text: "Get nearest hospital match" },
                { step: "4", text: "Call or get directions" },
              ].map((s) => (
                <div key={s.step} style={{
                  display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px",
                }}>
                  <div style={{
                    width: "20px", height: "20px", borderRadius: "50%",
                    background: "#2563EB", color: "white",
                    fontSize: "10px", fontWeight: "700",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "1px",
                  }}>
                    {s.step}
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                    {s.text}
                  </span>
                </div>
              ))}
            </div>

            {sidebarItems.map((item) => (
              <QuickInfoCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
                color={item.color}
              />
            ))}

            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "10px", padding: "14px", boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{
                fontSize: "10px", fontWeight: "700", color: "var(--text-tertiary)",
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px",
              }}>
                Emergency numbers
              </div>
              {[
                { label: "National Emergency", num: "112", color: "var(--alert)" },
                { label: "Ambulance", num: "108", color: "var(--teal)" },
                { label: "Police", num: "100", color: "#2563EB" },
                { label: "Fire", num: "101", color: "#E07B39" },
                { label: "Women Helpline", num: "1091", color: "#7C3AED" },
              ].map((e, i, arr) => (
                <a key={e.num} href={`tel:${e.num}`} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "8px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  textDecoration: "none", transition: "opacity 0.15s",
                }}
                  onMouseEnter={(el) => el.currentTarget.style.opacity = "0.7"}
                  onMouseLeave={(el) => el.currentTarget.style.opacity = "1"}
                >
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                    {e.label}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{
                      fontSize: "16px", fontWeight: "700", color: e.color,
                      fontFamily: "'Rajdhani', 'DM Mono', monospace",
                      letterSpacing: "0.1em", lineHeight: 1,
                    }}>
                      {e.num}
                    </span>
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "50%",
                      background: e.color + "18",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill={e.color}>
                        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{
              background: "var(--teal-light)", border: "1px solid var(--teal)",
              borderLeft: "3px solid var(--teal)", borderRadius: "10px", padding: "12px 14px",
            }}>
              <div style={{
                fontSize: "10px", fontWeight: "700", color: "var(--teal)",
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px",
              }}>
                Quick tip
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: "1.65", margin: 0 }}>
                Keep the patient calm. Do not give water or food until a doctor advises.
                Stay on the line with emergency services.
              </p>
            </div>

          </aside>

          <main>
            <EmergencyBar lang={lang} />

            <OfflineBanner
              isOnline={isOnline} lang={lang}
              usingCache={usingCache} hasResults={hospitals.length > 0}
            />

            {userLocation && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "11px", fontWeight: "600",
                color: "var(--teal)", background: "var(--teal-light)",
                border: "1px solid var(--teal)30",
                padding: "5px 12px", borderRadius: "20px",
                marginBottom: "12px", letterSpacing: "0.02em",
              }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--teal)" }} />
                {lang === "hi"
                  ? "लोकेशन मिल गई"
                  : locationName
                    ? `📍 ${locationName}${userLocation.accuracy ? ` · ±${Math.round(userLocation.accuracy)}m` : ""}`
                    : `GPS · ${userLocation.lat.toFixed(3)}, ${userLocation.lng.toFixed(3)}`}
              </div>
            )}

            {!triageResult && !isLoading && (
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderLeft: "4px solid var(--teal)", borderRadius: "12px",
                padding: "1.25rem 1.5rem", marginBottom: "1.25rem",
                boxShadow: "var(--shadow-sm)", display: "flex",
                gap: "16px", alignItems: "flex-start",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "10px",
                  background: "#2563EB", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{
                    fontSize: "15px", fontWeight: "700",
                    color: "var(--text-primary)", marginBottom: "4px", letterSpacing: "-0.2px",
                  }}>
                    Emergency Hospital Finder
                  </div>
                  <p style={{
                    fontSize: "13px", color: "var(--text-secondary)",
                    lineHeight: "1.65", margin: "0 0 10px",
                  }}>
                    Describe the patient's symptoms in any language. AI will assess severity,
                    identify required facilities and find the nearest hospital in seconds.
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["AI triage", "Real GPS", "Live map", "Offline mode", "6 languages"].map((f) => (
                      <span key={f} style={{
                        fontSize: "11px", fontWeight: "600", color: "#2563EB",
                        background: "var(--navy-light)", border: "1px solid #2563EB20",
                        padding: "2px 9px", borderRadius: "4px", letterSpacing: "0.02em",
                      }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <SymptomInput lang={lang} onSubmit={handleTriage} isLoading={isLoading} />

            {isLoading && (
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "12px", padding: "2rem",
                textAlign: "center", boxShadow: "var(--shadow-sm)", marginTop: "1rem",
              }}>
                <LoadingSpinner lang={lang} />
                {loadingMessage && (
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", fontWeight: "500" }}>
                    {loadingMessage}
                  </p>
                )}
              </div>
            )}

            {error && (
              <div style={{
                background: "var(--alert-light)", border: "1px solid var(--alert)",
                borderLeft: "4px solid var(--alert)", borderRadius: "10px",
                padding: "1rem 1.25rem", marginTop: "1rem",
                display: "flex", gap: "10px", alignItems: "flex-start",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--alert)" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--alert)", marginBottom: "3px" }}>
                    Something went wrong
                  </div>
                  <p style={{ color: "var(--text-primary)", fontSize: "13px", margin: 0 }}>{error}</p>
                  {error.includes("permission") && (
                    <p style={{ color: "var(--text-secondary)", fontSize: "12px", marginTop: "4px" }}>
                      {lang === "hi"
                        ? "ब्राउज़र सेटिंग्स में जाकर लोकेशन की अनुमति दें।"
                        : "Allow location access in your browser settings and try again."}
                    </p>
                  )}
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
                      border: "1px solid var(--border)", borderRadius: "8px",
                      background: showMap ? "var(--teal)" : "var(--bg-card)",
                      color: showMap ? "white" : "var(--text-secondary)",
                      fontSize: "12px", fontWeight: "600",
                      transition: "all 0.15s", letterSpacing: "0.02em", cursor: "pointer",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                    </svg>
                    {showMap
                      ? (lang === "hi" ? "नक्शा छुपाएं" : "Hide map")
                      : (lang === "hi" ? "नक्शा दिखाएं" : "Show map")}
                  </button>
                )}

                {showMap && hospitals.length > 0 && (
                <HospitalMap hospitals={hospitals} userLocation={userLocation} lang={lang} ambulanceLocation={ambulanceLocation} />
                )}

                {hospitals.length > 0
                  ? <HospitalList hospitals={hospitals} lang={lang} />
                  : (
                    <div style={{
                      background: "var(--bg-card)", border: "1px solid var(--border)",
                      borderRadius: "12px", padding: "2.5rem",
                      textAlign: "center", boxShadow: "var(--shadow-sm)",
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" style={{ marginBottom: "12px" }}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: "600", marginBottom: "4px" }}>
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
        <UserHistory />
      )}

    {page === "firstaid" && (
        <FirstAid lang={lang} />
      )}  
     
      {/* FAB with callbacks */}
      <FAB
        lang={lang}
        userLocation={userLocation}
        onSOS={() => setShowSOS(true)}
        onChat={() => setShowChat(true)}
      />

      {/* SOS modal — triggered by FAB */}
      <SOSButton
        lang={lang}
        userLocation={userLocation}
        forceOpen={showSOS}
        onClose={() => setShowSOS(false)}
      />

      {/* Doctor chat modal — triggered by FAB */}
      <DoctorChat
        lang={lang}
        triageResult={triageResult}
        forceOpen={showChat}
        onClose={() => setShowChat(false)}
        onAmbulanceLocation={(loc) => setAmbulanceLocation(loc)}
        onPatientLocation={(loc) => setUserLocation(loc)}
      />

      {/* Sticky emergency bar — mobile only */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        zIndex: 100, display: "none",
        paddingBottom: "env(safe-area-inset-bottom)",
        background: "var(--alert)",
      }} className="emergency-bottom">
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 16px", color: "white", fontSize: "13px", fontWeight: "600",
        }}>
          <span>{lang === "hi" ? "राष्ट्रीय आपातकालीन" : "National Emergency"}</span>
          <a href="tel:112" style={{
            fontSize: "17px", fontWeight: "700", color: "white",
            textDecoration: "none", padding: "4px 16px",
            background: "rgba(255,255,255,0.2)", borderRadius: "20px",
          }}>112</a>
        </div>
      </div>

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