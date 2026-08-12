import React, { useState, useEffect } from "react";
import strings from "../utils/strings";

// Clean SVG Icon Library (100% SVG line icons)
function GlobeIcon({ color = "currentColor", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function TextIcon({ color = "currentColor", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );
}

function SirenIcon({ color = "currentColor", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7v4a2 2 0 0 1-2 2h18a2 2 0 0 1-2-2V9a7 7 0 0 0-7-7z" />
      <path d="M12 18v3" />
      <path d="M8 21h8" />
    </svg>
  );
}

function PillIcon({ color = "currentColor", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

function HospitalIcon({ color = "currentColor", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6v4" />
      <path d="M10 8h4" />
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M10 14h4v6h-4z" />
    </svg>
  );
}

function VolumeIcon({ color = "currentColor", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VibrateIcon({ color = "currentColor", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="4" width="10" height="16" rx="2" />
      <path d="M2 8v8" />
      <path d="M22 8v8" />
    </svg>
  );
}

function CheckIcon({ color = "currentColor", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const FONT_SIZES = [
  { label: "Small",       key: "small",  zoom: 0.85 },
  { label: "Medium",      key: "medium", zoom: 1.0  },
  { label: "Large",       key: "large",  zoom: 1.15 },
  { label: "Extra Large", key: "xlarge", zoom: 1.30 },
];

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "mr", label: "Marathi", native: "मराठी" },
];

function SettingRow({ Icon, iconColor = "var(--text-secondary)", title, subtitle, children }) {
  return (
    <div className="st-row">
      <div className="st-row-info">
        <div className="st-icon-frame">
          <Icon color={iconColor} size={18} />
        </div>
        <div>
          <div className="st-row-title">{title}</div>
          {subtitle && <div className="st-row-sub">{subtitle}</div>}
        </div>
      </div>
      <div className="st-row-control">{children}</div>
    </div>
  );
}

function AccessibleToggle({ value, onChange, id, label }) {
  return (
    <div className="st-toggle-wrapper">
      <span className={`st-toggle-state ${value ? "state-on" : "state-off"}`}>
        {value ? "ON" : "OFF"}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={label}
        className={`st-toggle-btn ${value ? "active" : ""}`}
        onClick={() => onChange(!value)}
      >
        <span className="st-toggle-thumb" />
      </button>
    </div>
  );
}

export default function Settings({ lang, setLang, onClose }) {
  const s = strings[lang] || strings["en"];

  // Load saved font size key
  const [fontSize, setFontSize] = useState(() =>
    localStorage.getItem("swasthya-fontsize") || "medium"
  );
  const [notifications, setNotifications] = useState(() =>
    JSON.parse(
      localStorage.getItem("swasthya-notifications") ||
        JSON.stringify({
          emergencyAlerts: true,
          medicineReminders: false,
          hospitalUpdates: false,
          soundAlerts: true,
          vibration: true,
        })
    )
  );
  const [savedMsg, setSavedMsg] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  // Apply zoom to entire page — scales all px values across the whole app
  useEffect(() => {
    const f = FONT_SIZES.find((f) => f.key === fontSize) || FONT_SIZES[1];
    document.documentElement.style.zoom = f.zoom;
  }, [fontSize]);

  function handleFontSize(key) {
    setFontSize(key);
    localStorage.setItem("swasthya-fontsize", key);
  }

  function handleNotification(key, value) {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    localStorage.setItem("swasthya-notifications", JSON.stringify(updated));

    // Request browser notification permission if enabling emergency alerts
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
    setTimeout(() => setSavedMsg(false), 2500);
  }

  function handleReset() {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 4000);
      return;
    }
    localStorage.removeItem("swasthya-fontsize");
    localStorage.removeItem("swasthya-notifications");
    localStorage.removeItem("swasthya-lang");
    setFontSize("medium");
    setLang("en");
    setNotifications({
      emergencyAlerts: true,
      medicineReminders: false,
      hospitalUpdates: false,
      soundAlerts: true,
      vibration: true,
    });
    document.documentElement.style.zoom = 1.0;
    document.documentElement.removeAttribute("data-fontsize");
    setResetConfirm(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  return (
    <div className="st-page-wrapper fade-up">
      {/* Header */}
      <div className="st-header">
        <div>
          <div className="st-header-title-lockup">
            <h1 className="st-page-title">SETTINGS</h1>
            <span className={`st-status-pill ${savedMsg ? "pill-saved" : ""}`}>
              <span className="pill-dot" />
              {savedMsg ? "✓ CHANGES SAVED" : "● PREFERENCES SAVED"}
            </span>
          </div>
          <p className="st-page-subtitle">
            Personalize your SwasthyaPath healthcare command center.
          </p>
        </div>

        {onClose && (
          <button className="st-close-btn" onClick={onClose} aria-label="Close settings">
            Close Settings ✕
          </button>
        )}
      </div>

      {/* Language Section */}
      <div className="st-section-title">LANGUAGE</div>
      <div className="st-group-card">
        <SettingRow
          Icon={GlobeIcon}
          iconColor="#16A579"
          title="App language"
          subtitle="Changes all UI text and voice input language"
        >
          <div className="st-select-wrapper">
            <select
              id="app-language-select"
              className="st-select"
              value={lang}
              onChange={(e) => handleLangChange(e.target.value)}
              aria-label="App language"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.label})
                </option>
              ))}
            </select>
            <svg className="st-select-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </SettingRow>
      </div>

      {/* Accessibility Section */}
      <div className="st-section-title">ACCESSIBILITY</div>
      <div className="st-group-card st-card-padded">
        <div className="st-row-info mb-12">
          <div className="st-icon-frame accessibility-icon">
            <TextIcon color="#0EA5E9" size={18} />
          </div>
          <div>
            <div className="st-row-title">Text size</div>
            <div className="st-row-sub">
              Adjust font size for easier reading across the application
            </div>
          </div>
        </div>

        {/* 4-Column Font Size Selector */}
        <div className="st-font-grid">
        {FONT_SIZES.map((f) => {
            const isSelected = fontSize === f.key;
            return (
              <button
                key={f.key}
                type="button"
                className={`st-font-btn ${isSelected ? "selected" : ""}`}
                onClick={() => handleFontSize(f.key)}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="font-check-mark">
                    <CheckIcon color="#16A579" size={12} />
                  </span>
                )}
                <span className="font-sample" style={{ fontSize: `${f.zoom * 15}px` }}>
                  Aa
                </span>
                <span className="font-label">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Text Preview Box */}
        <div className="st-preview-box">
          <div className="st-preview-label">LIVE PREVIEW</div>
          <p className="st-preview-text" style={{ fontSize: { small: "13px", medium: "15px", large: "17.5px", xlarge: "19.5px" }[fontSize] || "15px" }}>
            Severe chest pain and breathlessness for 20 minutes.
          </p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="st-section-title">NOTIFICATIONS</div>
      <div className="st-group-card">
        {/* Critical Emergency Alerts */}
        <div className="st-subgroup-header critical-subgroup">
          <span className="subgroup-dot red-dot" />
          <span>CRITICAL ALERTS</span>
        </div>

        <SettingRow
          Icon={SirenIcon}
          iconColor="#E11D48"
          title="Emergency alerts"
          subtitle="Browser notifications for critical triage results"
        >
          <AccessibleToggle
            id="toggle-emergency-alerts"
            label="Emergency alerts"
            value={notifications.emergencyAlerts}
            onChange={(val) => handleNotification("emergencyAlerts", val)}
          />
        </SettingRow>

        {/* General Notifications */}
        <div className="st-subgroup-header">
          <span>GENERAL NOTIFICATIONS</span>
        </div>

        <SettingRow
          Icon={PillIcon}
          iconColor="#0EA5E9"
          title="Medicine reminders"
          subtitle="Daily reminders for regular medications"
        >
          <AccessibleToggle
            id="toggle-medicine-reminders"
            label="Medicine reminders"
            value={notifications.medicineReminders}
            onChange={(val) => handleNotification("medicineReminders", val)}
          />
        </SettingRow>

        <SettingRow
          Icon={HospitalIcon}
          iconColor="#16A579"
          title="Hospital updates"
          subtitle="Notify when nearby hospital data refreshes"
        >
          <AccessibleToggle
            id="toggle-hospital-updates"
            label="Hospital updates"
            value={notifications.hospitalUpdates}
            onChange={(val) => handleNotification("hospitalUpdates", val)}
          />
        </SettingRow>
      </div>

      {/* Alert Behavior Section */}
      <div className="st-section-title">ALERT BEHAVIOR</div>
      <div className="st-group-card">
        <SettingRow
          Icon={VolumeIcon}
          iconColor="#D97706"
          title="Sound alerts"
          subtitle="Play audio when an emergency triage result is ready"
        >
          <AccessibleToggle
            id="toggle-sound-alerts"
            label="Sound alerts"
            value={notifications.soundAlerts}
            onChange={(val) => handleNotification("soundAlerts", val)}
          />
        </SettingRow>

        <SettingRow
          Icon={VibrateIcon}
          iconColor="#7C3AED"
          title="Vibration"
          subtitle="Vibrate for critical emergency results on supported devices"
        >
          <AccessibleToggle
            id="toggle-vibration"
            label="Vibration"
            value={notifications.vibration}
            onChange={(val) => handleNotification("vibration", val)}
          />
        </SettingRow>
      </div>

      {/* Action Footer Bar */}
      <div className="st-actions-bar">
        <button
          type="button"
          className="st-save-btn"
          onClick={handleSave}
        >
          {savedMsg ? (
            <>
              <CheckIcon color="#FFFFFF" size={16} />
              Changes saved
            </>
          ) : (
            <>Save changes →</>
          )}
        </button>

        <button
          type="button"
          className={`st-reset-btn ${resetConfirm ? "confirm-state" : ""}`}
          onClick={handleReset}
        >
          {resetConfirm ? "Click again to confirm reset" : "Reset to defaults"}
        </button>
      </div>
    </div>
  );
}
