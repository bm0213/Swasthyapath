import React from "react";

export default function SOSButton({ lang, userLocation, forceOpen, onClose }) {
  const [showEmergency, setShowEmergency] = React.useState(false);
  const [showSetup, setShowSetup] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [contacts, setContacts] = React.useState(() => {
    const saved = localStorage.getItem("sos-contacts");
    return saved ? JSON.parse(saved) : [{ name: "", phone: "" }];
  });
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    if (forceOpen) setShowEmergency(true);
  }, [forceOpen]);

  React.useEffect(() => {
    if (!showEmergency && !showSetup && !showConfirm) onClose?.();
  }, [showEmergency, showSetup, showConfirm]);

  const enStrings = {
    sos: "SOS",
    sosLabel: "Emergency",
    setupTitle: "Save emergency contacts",
    setupDesc: "These people will receive your location via SMS when you press SOS.",
    namePlaceholder: "Contact name",
    phonePlaceholder: "Phone number (e.g. 9876543210)",
    addContact: "Add another contact",
    saveBtn: "Save contacts",
    confirmTitle: "Send SOS alert?",
    confirmDesc: "An SMS with your GPS location will be sent to your emergency contacts.",
    sendBtn: "Yes, send SOS",
    cancelBtn: "Cancel",
    sentTitle: "SOS sent!",
    sentDesc: "Your location has been shared with your emergency contacts.",
    editContacts: "Edit contacts",
    noLocation: "Getting your location first...",
    noContacts: "Please save at least one emergency contact first.",
    mapLink: "Google Maps link",
  };

  const hiStrings = {
    sos: "SOS",
    sosLabel: "आपातकाल",
    setupTitle: "आपातकालीन संपर्क सहेजें",
    setupDesc: "SOS दबाने पर इन लोगों को SMS पर आपकी लोकेशन भेजी जाएगी।",
    namePlaceholder: "संपर्क का नाम",
    phonePlaceholder: "फोन नंबर (जैसे 9876543210)",
    addContact: "और संपर्क जोड़ें",
    saveBtn: "संपर्क सहेजें",
    confirmTitle: "SOS अलर्ट भेजें?",
    confirmDesc: "आपकी GPS लोकेशन SMS द्वारा आपके आपातकालीन संपर्कों को भेजी जाएगी।",
    sendBtn: "हाँ, SOS भेजें",
    cancelBtn: "रद्द करें",
    sentTitle: "SOS भेजा गया!",
    sentDesc: "आपकी लोकेशन आपके आपातकालीन संपर्कों के साथ साझा की गई है।",
    editContacts: "संपर्क बदलें",
    noLocation: "पहले लोकेशन मिल रही है...",
    noContacts: "कृपया पहले कम से कम एक आपातकालीन संपर्क सहेजें।",
  };

  const s = lang === "hi" ? hiStrings : enStrings;
  const validContacts = contacts.filter((c) => c.phone.trim().length >= 10);
  const emergencyOptions = [
    "Chest pain",
    "Difficulty breathing",
    "Severe bleeding",
    "Unconsciousness",
    "Choking",
    "Stroke signs",
  ];

  function saveContacts() {
    localStorage.setItem("sos-contacts", JSON.stringify(contacts));
    setShowSetup(false);
  }

  function updateContact(index, field, value) {
    setContacts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function addContact() {
    if (contacts.length < 3) {
      setContacts((prev) => [...prev, { name: "", phone: "" }]);
    }
  }

  function removeContact(index) {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSOS() {
    if (validContacts.length === 0) {
      setShowSetup(true);
      return;
    }
    setShowConfirm(true);
  }

  function sendSOS() {
    const lat = userLocation?.lat;
    const lng = userLocation?.lng;
    const locationText = lat && lng
      ? `My location: https://maps.google.com/?q=${lat},${lng}`
      : "Location unavailable — please call me immediately.";
    const message = lang === "hi"
      ? `🆘 आपातकाल! मुझे तुरंत मदद चाहिए। ${locationText}`
      : `🆘 EMERGENCY! I need immediate help. ${locationText}`;

    validContacts.forEach((contact, index) => {
      setTimeout(() => {
        window.open(`sms:${contact.phone}?body=${encodeURIComponent(message)}`, "_blank");
      }, index * 800);
    });

    setShowConfirm(false);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(226,75,74,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(226,75,74,0); }
          100% { box-shadow: 0 0 0 0 rgba(226,75,74,0); }
        }
      `}</style>

      {showEmergency && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(7,17,31,0.84)",
            backdropFilter: "blur(14px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowEmergency(false); }}
        >
          <div className="premium-card fade-up" style={{
            width: "min(720px, 100%)",
            maxHeight: "92vh",
            overflowY: "auto",
            borderColor: "rgba(225,29,72,0.55)",
            padding: "24px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start", marginBottom: "18px" }}>
              <div>
                <div style={{
                  color: "var(--alert)",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}>
                  Emergency Mode
                </div>
                <h2 style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(28px, 6vw, 44px)",
                  lineHeight: 1.05,
                  fontWeight: 800,
                  margin: 0,
                }}>
                  What is happening right now?
                </h2>
              </div>
              <button
                onClick={() => setShowEmergency(false)}
                aria-label="Close emergency mode"
                className="icon-button"
              >
                ×
              </button>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "10px",
              marginBottom: "18px",
            }}>
              {emergencyOptions.map((option) => (
                <button
                  key={option}
                  style={{
                    minHeight: "58px",
                    padding: "12px 14px",
                    borderRadius: "14px",
                    border: "1px solid rgba(225,29,72,0.38)",
                    background: "rgba(225,29,72,0.10)",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    fontWeight: 800,
                    textAlign: "left",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <div style={{
              border: "1px solid var(--border)",
              borderLeft: "4px solid var(--alert)",
              borderRadius: "16px",
              background: "var(--bg-secondary)",
              padding: "16px",
              marginBottom: "18px",
            }}>
              <div style={{ color: "var(--text-tertiary)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>
                Recommended action
              </div>
              <p style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 700, lineHeight: 1.55, margin: 0 }}>
                Call emergency services now if there is severe pain, breathing trouble, heavy bleeding, loss of consciousness, stroke signs, or any immediate danger.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
              <a
                href="tel:112"
                style={{
                  minHeight: "58px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  borderRadius: "16px",
                  background: "var(--alert)",
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                CALL EMERGENCY SERVICES · 112
              </a>
              <button
                onClick={() => {
                  setShowEmergency(false);
                  handleSOS();
                }}
                style={{
                  minHeight: "48px",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  fontWeight: 800,
                }}
              >
                Send SOS to emergency contacts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Setup modal */}
      {showSetup && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(7,17,31,0.78)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowSetup(false); }}
        >
          <div className="premium-card" style={{
            borderRadius: "24px",
            padding: "1.5rem 1.25rem 2rem", width: "100%",
            maxWidth: "480px", maxHeight: "85vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <div style={{ fontSize: "16px", fontWeight: "500", color: "var(--text-primary)" }}>
                {s.setupTitle}
              </div>
              <button onClick={() => setShowSetup(false)} style={{
                background: "none", border: "none", fontSize: "20px",
                color: "var(--text-secondary)", cursor: "pointer",
              }}>×</button>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
              {s.setupDesc}
            </p>

            {contacts.map((contact, index) => (
              <div key={index} style={{
                background: "var(--bg-secondary)", borderRadius: "10px",
                padding: "12px", marginBottom: "10px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "500", color: "var(--text-secondary)" }}>
                    Contact {index + 1}
                  </span>
                  {contacts.length > 1 && (
                    <button onClick={() => removeContact(index)} style={{
                      background: "none", border: "none", fontSize: "14px",
                      color: "#E24B4A", cursor: "pointer",
                    }}>Remove</button>
                  )}
                </div>
                <input type="text" placeholder={s.namePlaceholder} value={contact.name}
                  onChange={(e) => updateContact(index, "name", e.target.value)}
                  style={{
                    width: "100%", padding: "8px 10px", marginBottom: "8px",
                    border: "0.5px solid var(--border)", borderRadius: "8px",
                    background: "var(--bg-card)", color: "var(--text-primary)",
                    fontSize: "14px", outline: "none",
                  }}
                />
                <input type="tel" placeholder={s.phonePlaceholder} value={contact.phone}
                  onChange={(e) => updateContact(index, "phone", e.target.value)}
                  style={{
                    width: "100%", padding: "8px 10px",
                    border: "0.5px solid var(--border)", borderRadius: "8px",
                    background: "var(--bg-card)", color: "var(--text-primary)",
                    fontSize: "14px", outline: "none",
                  }}
                />
              </div>
            ))}

            {contacts.length < 3 && (
              <button onClick={addContact} style={{
                width: "100%", padding: "10px",
                border: "0.5px dashed var(--border)", borderRadius: "10px",
                background: "transparent", color: "var(--text-secondary)",
                fontSize: "13px", marginBottom: "16px", cursor: "pointer",
              }}>
                + {s.addContact}
              </button>
            )}

            <button onClick={saveContacts} style={{
              width: "100%", padding: "12px", background: "var(--alert)",
              color: "white", border: "none", borderRadius: "10px",
              fontSize: "15px", fontWeight: "500", cursor: "pointer",
            }}>
              {s.saveBtn}
            </button>
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {showConfirm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(7,17,31,0.82)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}
        >
          <div className="premium-card" style={{
            borderRadius: "24px",
            padding: "1.5rem", width: "100%", maxWidth: "360px",
          }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "#E24B4A", margin: "0 auto 1rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", fontWeight: "700", color: "white",
            }}>
              SOS
            </div>
            <div style={{ fontSize: "16px", fontWeight: "500", color: "var(--text-primary)", textAlign: "center", marginBottom: "8px" }}>
              {s.confirmTitle}
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", textAlign: "center", marginBottom: "1rem" }}>
              {s.confirmDesc}
            </p>
            <div style={{ marginBottom: "1.25rem" }}>
              {validContacts.map((c, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 10px", background: "var(--bg-secondary)",
                  borderRadius: "8px", marginBottom: "6px",
                }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "var(--alert-light)", color: "var(--alert)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: "500", flexShrink: 0,
                  }}>
                    {c.name ? c.name[0].toUpperCase() : "?"}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>
                      {c.name || "Contact"}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{c.phone}</div>
                  </div>
                </div>
              ))}
            </div>
            {userLocation && (
              <div style={{
                padding: "8px 12px", background: "var(--teal-light)",
                borderRadius: "8px", marginBottom: "1.25rem",
                fontSize: "12px", color: "var(--text-secondary)",
              }}>
                📍 GPS location will be included in the SMS
              </div>
            )}
            <button onClick={sendSOS} style={{
              width: "100%", padding: "12px", background: "#E24B4A",
              color: "white", border: "none", borderRadius: "10px",
              fontSize: "15px", fontWeight: "500", cursor: "pointer", marginBottom: "8px",
            }}>
              {s.sendBtn}
            </button>
            <button onClick={() => setShowConfirm(false)} style={{
              width: "100%", padding: "12px", background: "transparent",
              color: "var(--text-secondary)", border: "0.5px solid var(--border)",
              borderRadius: "10px", fontSize: "14px", cursor: "pointer",
            }}>
              {s.cancelBtn}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
