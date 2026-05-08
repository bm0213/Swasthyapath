import React from "react";
import strings from "../utils/strings";

const FONT_SIZES = [
  { label: "Small", value: "14px", scale: 0.9 },
  { label: "Medium", value: "15px", scale: 1 },
  { label: "Large", value: "17px", scale: 1.13 },
  { label: "Extra Large", value: "19px", scale: 1.27 },
];

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "mr", label: "Marathi", native: "मराठी" },
];

function SettingRow({ icon, title, subtitle, children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: "1px solid var(--border)",
      gap: "16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "16px", flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <div style={{
            fontSize: "13px", fontWeight: "600",
            color: "var(--text-primary)", marginBottom: "2px",
          }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: "11px", color: "var(--text-tertiary)", lineHeight: "1.4" }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>
        {children}
      </div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: "44px", height: "24px", borderRadius: "12px",
        background: value ? "var(--teal)" : "var(--border)",
        border: "none", cursor: "pointer",
        position: "relative", transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div style={{
        width: "18px", height: "18px", borderRadius: "50%",
        background: "white",
        position: "absolute", top: "3px",
        left: value ? "23px" : "3px",
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: "10px", fontWeight: "700",
      color: "var(--text-tertiary)",
      textTransform: "uppercase", letterSpacing: "0.08em",
      marginBottom: "4px", marginTop: "24px",
      paddingBottom: "8px",
      borderBottom: "1px solid var(--border)",
    }}>
      {children}
    </div>
  );
}

export default function Settings({ lang, setLang, onClose }) {
  const s = strings[lang] || strings["en"];

  // Load saved settings
  const [fontSize, setFontSize] = React.useState(() =>
    localStorage.getItem("swasthya-fontsize") || "15px"
  );
  const [notifications, setNotifications] = React.useState(() =>
    JSON.parse(localStorage.getItem("swasthya-notifications") || JSON.stringify({
      emergencyAlerts: true,
      medicineReminders: false,
      hospitalUpdates: false,
      soundAlerts: true,
      vibration: true,
    }))
  );
  const [savedMsg, setSavedMsg] = React.useState(false);

  // Apply font size live
  React.useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
  }, [fontSize]);

  function handleFontSize(size) {
    setFontSize(size);
    localStorage.setItem("swasthya-fontsize", size);
  }

  function handleNotification(key, value) {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    localStorage.setItem("swasthya-notifications", JSON.stringify(updated));

    // Request browser notification permission if enabling
    if (key === "emergencyAlerts" && value) {
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }

  function handleLangChange(code) {
    setLang(code);
    localStorage.setItem("swasthya-lang", code);
  }

  function handleSave() {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  function handleReset() {
    localStorage.removeItem("swasthya-fontsize");
    localStorage.removeItem("swasthya-notifications");
    localStorage.removeItem("swasthya-lang");
    setFontSize("15px");
    setLang("en");
    setNotifications({
      emergencyAlerts: true,
      medicineReminders: false,
      hospitalUpdates: false,
      soundAlerts: true,
      vibration: true,
    });
    document.documentElement.style.fontSize = "15px";
  }

  return (
    <div style={{
      maxWidth: "900px", margin: "0 auto",
      padding: "1.5rem 1.25rem 4rem",
    }}>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
      }}>
        <div>
          <div style={{
            fontSize: "20px", fontWeight: "700",
            color: "var(--text-primary)", letterSpacing: "-0.3px",
          }}>
            Settings
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "2px" }}>
            Personalise your SwasthyaPath experience
          </div>
        </div>
        <button onClick={onClose} style={{
          width: "36px", height: "36px", borderRadius: "8px",
          border: "1px solid var(--border)",
          background: "var(--bg-secondary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "18px",
          color: "var(--text-secondary)",
        }}>
          ×
        </button>
      </div>

      {/* Language */}
      <SectionTitle>Language</SectionTitle>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "10px", padding: "0 14px",
        boxShadow: "var(--shadow-sm)",
      }}>
        <SettingRow
          icon="🌐"
          title="App language"
          subtitle="Changes all UI text and voice input language"
        >
          <select
            value={lang}
            onChange={(e) => handleLangChange(e.target.value)}
            style={{
              padding: "6px 10px",
              border: "1px solid var(--border)",
              borderRadius: "7px",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              fontSize: "13px", fontWeight: "500",
              outline: "none", cursor: "pointer",
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.native} ({l.label})
              </option>
            ))}
          </select>
        </SettingRow>
      </div>

      {/* Font size */}
      <SectionTitle>Accessibility</SectionTitle>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "10px", padding: "14px",
        boxShadow: "var(--shadow-sm)",
        marginBottom: "10px",
      }}>
        <div style={{
          fontSize: "13px", fontWeight: "600",
          color: "var(--text-primary)", marginBottom: "4px",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span>🔤</span> Text size
        </div>
        <div style={{
          fontSize: "11px", color: "var(--text-tertiary)",
          marginBottom: "14px",
        }}>
          Adjust for better readability on your device
        </div>

        {/* Font size options */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px" }}>
          {FONT_SIZES.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFontSize(f.value)}
              style={{
                padding: "10px 8px",
                border: `1.5px solid ${fontSize === f.value ? "var(--teal)" : "var(--border)"}`,
                borderRadius: "8px",
                background: fontSize === f.value ? "var(--teal-light)" : "var(--bg-secondary)",
                color: fontSize === f.value ? "var(--teal)" : "var(--text-secondary)",
                cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: "4px",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: `${f.scale * 16}px`, fontWeight: "700", lineHeight: 1 }}>
                Aa
              </span>
              <span style={{ fontSize: "10px", fontWeight: "600" }}>
                {f.label}
              </span>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div style={{
          marginTop: "12px", padding: "10px 12px",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "7px",
        }}>
          <div style={{
            fontSize: "10px", fontWeight: "600",
            color: "var(--text-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.06em",
            marginBottom: "4px",
          }}>
            Preview
          </div>
          <p style={{ fontSize, color: "var(--text-primary)", margin: 0, lineHeight: "1.5" }}>
            Severe chest pain and breathlessness for 20 minutes.
          </p>
        </div>
      </div>

      {/* Notifications */}
      <SectionTitle>Notifications</SectionTitle>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "10px", padding: "0 14px",
        boxShadow: "var(--shadow-sm)",
      }}>
        {[
          {
            key: "emergencyAlerts",
            icon: "🚨",
            title: "Emergency alerts",
            subtitle: "Browser notifications for critical triage results",
          },
          {
            key: "medicineReminders",
            icon: "💊",
            title: "Medicine reminders",
            subtitle: "Daily reminders for regular medications",
          },
          {
            key: "hospitalUpdates",
            icon: "🏥",
            title: "Hospital updates",
            subtitle: "Notify when nearby hospital data refreshes",
          },
          {
            key: "soundAlerts",
            icon: "🔔",
            title: "Sound alerts",
            subtitle: "Play audio when triage result is ready",
          },
          {
            key: "vibration",
            icon: "📳",
            title: "Vibration",
            subtitle: "Vibrate on critical emergency results (mobile)",
          },
        ].map((item, i, arr) => (
          <div key={item.key} style={{
            borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <SettingRow icon={item.icon} title={item.title} subtitle={item.subtitle}>
              <Toggle
                value={notifications[item.key]}
                onChange={(val) => handleNotification(item.key, val)}
              />
            </SettingRow>
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleSave}
          style={{
            flex: 1, padding: "11px",
            background: savedMsg ? "var(--teal)" : "#2563EB",
            color: "white", border: "none",
            borderRadius: "9px", fontSize: "13px",
            fontWeight: "600", cursor: "pointer",
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: "6px",
            transition: "all 0.2s",
          }}
        >
          {savedMsg ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Saved!</>
          ) : (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save settings</>
          )}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: "11px 18px",
            background: "transparent",
            color: "var(--alert)",
            border: "1px solid var(--alert)40",
            borderRadius: "9px", fontSize: "13px",
            fontWeight: "600", cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}