import React from "react";

export default function AmbulanceButton({ lang, userLocation }) {
  const [showModal, setShowModal] = React.useState(false);
  const [calling, setCalling] = React.useState(false);
  const [smsSent, setSmsSent] = React.useState(false);

  const enStrings = {
    btnLabel: "Ambulance",
    modalTitle: "Call Ambulance",
    modalDesc: "This will call 108 (National Ambulance Service) and share your GPS location via SMS to help them find you faster.",
    locationReady: "GPS location ready to share",
    locationWaiting: "Submit symptoms first to get GPS location",
    callBtn: "Call 108 now",
    smsBtn: "Also send location via SMS",
    cancelBtn: "Cancel",
    callingText: "Calling 108...",
    smsSentText: "Location SMS sent!",
    tip: "Keep the line open and stay calm. Tell them your nearest landmark.",
    stateAmbulance: "State ambulance",
    free: "Free service",
  };

  const hiStrings = {
    btnLabel: "एम्बुलेंस",
    modalTitle: "एम्बुलेंस बुलाएं",
    modalDesc: "यह 108 (राष्ट्रीय एम्बुलेंस सेवा) को कॉल करेगा और आपकी GPS लोकेशन SMS से भेजेगा।",
    locationReady: "GPS लोकेशन भेजने के लिए तैयार है",
    locationWaiting: "लोकेशन पाने के लिए पहले लक्षण बताएं",
    callBtn: "अभी 108 कॉल करें",
    smsBtn: "SMS से लोकेशन भी भेजें",
    cancelBtn: "रद्द करें",
    callingText: "108 को कॉल हो रहा है...",
    smsSentText: "लोकेशन SMS भेजा गया!",
    tip: "लाइन खुली रखें और शांत रहें। पास का कोई मील का पत्थर बताएं।",
    stateAmbulance: "राज्य एम्बुलेंस",
    free: "मुफ्त सेवा",
  };

  // Falls back to English for Tamil, Telugu, Bengali, Marathi
  const s = lang === "hi" ? hiStrings : enStrings;

  function handleCall() {
    setCalling(true);
    window.open("tel:108", "_self");
    setTimeout(() => setCalling(false), 3000);
  }

  function handleSendLocation() {
    if (!userLocation) return;
    const { lat, lng } = userLocation;
    const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
    const message = lang === "hi"
      ? `🚑 एम्बुलेंस के लिए मेरी लोकेशन: ${mapsLink}`
      : `🚑 My location for ambulance: ${mapsLink}`;
    window.open(`sms:108?body=${encodeURIComponent(message)}`, "_blank");
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 3000);
  }

  return (
    <>
      {/* Ambulance button — fixed bottom left */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "80px",
          left: "20px",
          zIndex: 200,
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "#0D7A5F",
          border: "none",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 0 0 4px rgba(24,95,165,0.2)",
          transition: "all 0.2s",
        }}
      >
        <span style={{ fontSize: "20px", lineHeight: 1 }}>🚑</span>
        <span style={{ fontSize: "9px", marginTop: "2px", fontWeight: "500" }}>
          {s.btnLabel}
        </span>
      </button>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(0,0,0,0.55)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{
            background: "var(--bg-card)",
            borderRadius: "20px 20px 0 0",
            padding: "1.5rem 1.25rem 2.5rem",
            width: "100%",
            maxWidth: "480px",
          }}>

            {/* Header */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "1rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "#E6F1FB", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: "20px",
                }}>
                  🚑
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "500", color: "var(--text-primary)" }}>
                    {s.modalTitle}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                    108 · {s.stateAmbulance} · {s.free}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none", border: "none", fontSize: "22px",
                  color: "var(--text-secondary)", cursor: "pointer", lineHeight: 1,
                }}
              >×</button>
            </div>

            {/* Description */}
            <p style={{
              fontSize: "13px", color: "var(--text-secondary)",
              marginBottom: "1.25rem", lineHeight: "1.6",
            }}>
              {s.modalDesc}
            </p>

            {/* Location status */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 12px", borderRadius: "10px", marginBottom: "1.25rem",
              background: userLocation ? "var(--green-light)" : "var(--amber-light)",
            }}>
              <span style={{ fontSize: "16px" }}>{userLocation ? "📍" : "⏳"}</span>
              <span style={{
                fontSize: "13px",
                color: userLocation ? "#085041" : "#633806",
              }}>
                {userLocation
                  ? `${s.locationReady} (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})`
                  : s.locationWaiting}
              </span>
            </div>

            {/* Tip box */}
            <div style={{
              background: "var(--bg-secondary)",
              borderRadius: "10px", padding: "10px 12px",
              marginBottom: "1.25rem",
              borderLeft: "3px solid #185FA5",
            }}>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0 }}>
                💡 {s.tip}
              </p>
            </div>

            {/* Call button */}
            <button
              onClick={handleCall}
              style={{
                width: "100%", padding: "14px",
                background: calling ? "#0C447C" : "#185FA5",
                color: "white", border: "none",
                borderRadius: "12px", fontSize: "16px",
                fontWeight: "500", cursor: "pointer",
                marginBottom: "10px",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: "8px",
                transition: "background 0.15s",
              }}
            >
              <span>📞</span>
              <span>{calling ? s.callingText : s.callBtn}</span>
            </button>

            {/* Send location via SMS button */}
            <button
              onClick={handleSendLocation}
              disabled={!userLocation}
              style={{
                width: "100%", padding: "12px",
                background: smsSent ? "var(--green-light)" : "transparent",
                color: smsSent ? "#085041" : userLocation ? "var(--text-primary)" : "var(--text-tertiary)",
                border: "0.5px solid var(--border)",
                borderRadius: "12px", fontSize: "14px",
                fontWeight: "500", cursor: userLocation ? "pointer" : "not-allowed",
                marginBottom: "10px",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: "8px",
                transition: "all 0.15s",
              }}
            >
              <span>{smsSent ? "✓" : "📩"}</span>
              <span>{smsSent ? s.smsSentText : s.smsBtn}</span>
            </button>

            {/* Cancel */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                width: "100%", padding: "12px",
                background: "transparent", color: "var(--text-secondary)",
                border: "none", borderRadius: "12px",
                fontSize: "14px", cursor: "pointer",
              }}
            >
              {s.cancelBtn}
            </button>
          </div>
        </div>
      )}
    </>
  );
}