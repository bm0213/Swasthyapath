import React from "react";
import strings from "../utils/strings";

export default function TriageResult({ result, lang, onFindCare, onNavigateFirstAid }) {
  const s = strings[lang] || strings["en"];
  const isHi = lang === "hi";
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isSupported] = React.useState(() => "speechSynthesis" in window);

  React.useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [result]);

  const priority = (result.priority || (result.severity === "critical" ? "high" : result.severity === "low" ? "low" : "medium")).toLowerCase();

  const priorityConfig = {
    high: {
      accent: "var(--alert)",
      bg: "var(--alert-light)",
      border: "rgba(225, 29, 72, 0.3)",
      dotColor: "var(--alert)",
      label: isHi ? "उच्च प्राथमिकता" : "HIGH PRIORITY",
      subLabel: isHi ? "तत्काल आपातकालीन अस्पताल की आवश्यकता" : "Immediate Medical Attention Required",
      recommendedCategory: "hospitals",
      recommendedLabel: isHi ? "🏥 आपातकालीन अस्पताल" : "🏥 Emergency Hospital",
      ctaText: isHi ? "पास के आपातकालीन अस्पताल खोजें" : "Find Nearby Emergency Care",
      ctaIcon: "🏥",
      showEmergencyCall: true,
    },
    medium: {
      accent: "var(--amber)",
      bg: "var(--amber-light)",
      border: "rgba(245, 158, 11, 0.3)",
      dotColor: "var(--amber)",
      label: isHi ? "मध्यम प्राथमिकता" : "MEDIUM PRIORITY",
      subLabel: isHi ? "चिकित्सीय परामर्श अनुशंसित" : "Medical Consultation Recommended",
      recommendedCategory: "clinics",
      recommendedLabel: isHi ? "🩺 पास का क्लिनिक या अस्पताल" : "🩺 Nearby Clinic or Hospital",
      ctaText: isHi ? "पास में स्वास्थ्य केंद्र खोजें" : "Find Care Near Me",
      ctaIcon: "🩺",
      showEmergencyCall: false,
    },
    low: {
      accent: "var(--teal)",
      bg: "var(--teal-light)",
      border: "rgba(22, 165, 121, 0.3)",
      dotColor: "var(--teal)",
      label: isHi ? "सामान्य प्राथमिकता" : "LOW PRIORITY",
      subLabel: isHi ? "स्व-देखभाल और प्राथमिक उपचार" : "Self-Care & Basic Support",
      recommendedCategory: "pharmacies",
      recommendedLabel: isHi ? "💊 पास की फार्मेसी / केमिस्ट" : "💊 Nearby Pharmacy & First Aid",
      ctaText: isHi ? "पास की फार्मेसी खोजें" : "Find Nearby Pharmacy",
      ctaIcon: "💊",
      showEmergencyCall: false,
    },
  };

  const p = priorityConfig[priority] || priorityConfig.medium;

  function buildSpeechText() {
    const parts = [];
    if (isHi) {
      parts.push(`आकलन: ${p.label}.`);
      parts.push(result.summary);
      if (result.doNow) parts.push(`अभी करें: ${result.doNow}`);
      parts.push(`अनुशंसित देखभाल: ${p.recommendedLabel}.`);
    } else {
      parts.push(`AI Assessment: ${p.label}.`);
      parts.push(result.summary);
      if (result.doNow) parts.push(`Do now: ${result.doNow}`);
      parts.push(`Recommended care: ${p.recommendedLabel}.`);
    }
    return parts.join(" ");
  }

  function toggleSpeech() {
    if (!isSupported) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const voiceLocaleMap = { en: "en-IN", hi: "hi-IN", ta: "ta-IN", te: "te-IN", bn: "bn-IN", mr: "mr-IN" };
    const utterance = new SpeechSynthesisUtterance(buildSpeechText());
    utterance.lang = voiceLocaleMap[lang] || "en-IN";
    utterance.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.startsWith(voiceLocaleMap[lang]?.split("-")[0] || "en"));
    if (match) utterance.voice = match;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div
      className="fade-up"
      style={{
        background: "var(--bg-card)",
        border: `1px solid var(--border)`,
        borderLeft: `4px solid ${p.accent}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        marginBottom: "1.5rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              background: p.dotColor,
              boxShadow: `0 0 8px ${p.accent}`,
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: "800",
              color: "var(--text-primary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
            }}
          >
            AI ASSESSMENT · {p.label}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isSupported && (
            <button
              onClick={toggleSpeech}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 10px",
                background: isSpeaking ? p.accent : "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                cursor: "pointer",
                color: isSpeaking ? "white" : "var(--text-secondary)",
                fontSize: "11px",
                fontWeight: "600",
                transition: "all var(--transition)",
              }}
            >
              {isSpeaking ? (
                <>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                  <span>{isHi ? "रोकें" : "Stop"}</span>
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span>{isHi ? "सुनें" : "Listen"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div style={{ padding: "18px 20px" }}>
        {/* Assessment Summary */}
        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.65",
            color: "var(--text-primary)",
            margin: "0 0 14px",
            letterSpacing: "-0.01em",
          }}
        >
          {result.summary}
        </p>

        {/* Immediate First-Aid / "Do Now" Guidance */}
        {result.doNow && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${p.accent}`,
              borderRadius: "var(--radius-md)",
              padding: "12px 14px",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "7px",
                background: `${p.accent}18`,
                color: p.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              ✓
            </div>
            <div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "800",
                  color: "var(--text-tertiary)",
                  marginBottom: "3px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {s.doNowLabel || (isHi ? "अभी करें" : "Do now")}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  lineHeight: "1.55",
                  color: "var(--text-primary)",
                  fontWeight: "500",
                }}
              >
                {result.doNow}
              </div>
            </div>
          </div>
        )}

        {/* Recommended Care Highlight Box */}
        <div
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: "700",
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "2px",
              }}
            >
              {isHi ? "अनुशंसित देखभाल का प्रकार" : "RECOMMENDED CARE"}
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {result.recommendedCareLabel || p.recommendedLabel}
            </div>
          </div>

          {/* Action CTAs inside panel */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {/* Primary Action to trigger location & nearby care */}
            <button
              onClick={() => onFindCare(result.recommendedCareCategory || p.recommendedCategory)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 18px",
                background: "var(--teal)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(22, 165, 121, 0.25)",
                transition: "all var(--transition)",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.background = "var(--teal-mid)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "var(--teal)";
              }}
            >
              <span>{result.primaryCta || p.ctaText}</span>
              <span style={{ fontSize: "14px" }}>→</span>
            </button>

            {/* High priority secondary emergency call action */}
            {p.showEmergencyCall && (
              <a
                href="tel:112"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 14px",
                  background: "var(--alert)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13px",
                  fontWeight: "700",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(225, 29, 72, 0.25)",
                  letterSpacing: "-0.01em",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>{isHi ? "112 पर कॉल करें" : "Call 112"}</span>
              </a>
            )}

            {/* Low priority link to first aid */}
            {priority === "low" && onNavigateFirstAid && (
              <button
                onClick={onNavigateFirstAid}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "8px 12px",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                <span>📖 {isHi ? "प्राथमिक उपचार गाइड" : "First Aid Guide"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Subtle Medical Disclaimer */}
        <div
          style={{
            fontSize: "11px",
            color: "var(--text-tertiary)",
            lineHeight: "1.5",
            paddingTop: "6px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "flex-start",
            gap: "6px",
          }}
        >
          <span style={{ color: "var(--text-secondary)", fontWeight: "600" }}>ℹ</span>
          <span>
            {isHi
              ? "यह मार्गदर्शन केवल सूचनात्मक है और पेशेवर चिकित्सा सलाह का स्थान नहीं लेता है। यदि आपको तत्काल आपात स्थिति लगती है, तो 112 पर कॉल करें।"
              : "This guidance is informational and does not replace professional medical advice. If you believe there is an immediate emergency, call 112."}
          </span>
        </div>
      </div>
    </div>
  );
}