import React from "react";
import strings from "../utils/strings";

export default function TriageResult({ result, lang }) {
  const s = strings[lang] || strings["en"];
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isSupported] = React.useState(() => "speechSynthesis" in window);

  // Detect dark mode reactively
  const [isDark, setIsDark] = React.useState(
    () => document.documentElement.getAttribute("data-theme") === "dark"
  );

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Stop speech when result changes
  React.useEffect(() => {
    return () => { if (window.speechSynthesis) window.speechSynthesis.cancel(); };
  }, [result]);

  const severityConfig = {
    critical: {
      bg: isDark ? "#1C0A0A" : "#FEF2F2",
      borderColor: isDark ? "#C0392B" : "#EF4444",
      accentBg: isDark ? "#C0392B" : "#EF4444",
      textColor: isDark ? "#FCA5A5" : "#7F1D1D",
      doNowBg: isDark ? "#1A0808" : "#FFFFFF",
      tagBg: isDark ? "#2D1010" : "#FFFFFF",
      subtleText: isDark ? "#F87171" : "#991B1B",
    },
    urgent: {
      bg: isDark ? "#1A1200" : "#FFFBEB",
      borderColor: isDark ? "#C07C0A" : "#F59E0B",
      accentBg: isDark ? "#C07C0A" : "#F59E0B",
      textColor: isDark ? "#FCD34D" : "#78350F",
      doNowBg: isDark ? "#221800" : "#FFFFFF",
      tagBg: isDark ? "#2A1E00" : "#FFFFFF",
      subtleText: isDark ? "#FBBF24" : "#92400E",
    },
    moderate: {
      bg: isDark ? "#051510" : "#F0FDF9",
      borderColor: isDark ? "#0A7A5F" : "#14B8A6",
      accentBg: isDark ? "#0A7A5F" : "#14B8A6",
      textColor: isDark ? "#5EEAD4" : "#134E4A",
      doNowBg: isDark ? "#081C15" : "#FFFFFF",
      tagBg: isDark ? "#0A2018" : "#FFFFFF",
      subtleText: isDark ? "#2DD4BF" : "#0F766E",
    },
  };

  const config = severityConfig[result.severity] || severityConfig.moderate;

  // Language voice map
  const voiceLocaleMap = {
    en: "en-IN", hi: "hi-IN", ta: "ta-IN",
    te: "te-IN", bn: "bn-IN", mr: "mr-IN",
  };

  function buildSpeechText() {
    const parts = [];
    if (lang === "hi") {
      parts.push(`आपातकाल की गंभीरता: ${result.severityLabel}.`);
      parts.push(result.summary);
      if (result.doNow) parts.push(`अभी करें: ${result.doNow}`);
      parts.push(`आवश्यक सुविधाएं: ${result.facilities?.join(", ")}.`);
    } else {
      parts.push(`Emergency severity: ${result.severityLabel}.`);
      parts.push(result.summary);
      if (result.doNow) parts.push(`Do now: ${result.doNow}`);
      parts.push(`Required facilities: ${result.facilities?.join(", ")}.`);
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
    const text = buildSpeechText();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLocaleMap[lang] || "en-IN";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) =>
      v.lang.startsWith(voiceLocaleMap[lang]?.split("-")[0] || "en")
    );
    if (matchingVoice) utterance.voice = matchingVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="fade-up" style={{
      background: config.bg,
      border: `1.5px solid ${config.borderColor}`,
      borderLeft: `4px solid ${config.borderColor}`,
      borderRadius: "12px",
      overflow: "hidden",
      marginBottom: "1rem",
      boxShadow: isDark
        ? `0 0 0 1px ${config.borderColor}30, 0 4px 20px ${config.borderColor}20`
        : "var(--shadow-sm)",
    }}>

      {/* Severity row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: `1px solid ${config.borderColor}30`,
        background: isDark ? `${config.borderColor}18` : "transparent",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: config.accentBg,
            boxShadow: `0 0 6px ${config.accentBg}`,
          }} />
          <span style={{
            fontSize: "13px", fontWeight: "700",
            color: config.textColor, letterSpacing: "0.02em",
          }}>
            {result.severityLabel}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "11px", fontWeight: "500",
            color: config.subtleText,
            background: `${config.accentBg}15`,
            padding: "2px 10px", borderRadius: "20px",
            border: `1px solid ${config.borderColor}30`,
          }}>
            AI Assessment
          </span>

          {isSupported && (
            <button
              onClick={toggleSpeech}
              title={isSpeaking ? "Stop" : "Read aloud"}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "4px 10px",
                background: isSpeaking ? config.accentBg : `${config.accentBg}20`,
                border: `1px solid ${config.borderColor}`,
                borderRadius: "20px",
                cursor: "pointer",
                color: isSpeaking ? "white" : config.textColor,
                fontSize: "11px", fontWeight: "600",
                transition: "all 0.15s",
              }}
            >
              {isSpeaking ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2"/>
                  </svg>
                  {lang === "hi" ? "रोकें" : "Stop"}
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  </svg>
                  {lang === "hi" ? "सुनें" : "Listen"}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "14px 16px" }}>
        <p style={{
          fontSize: "14px",
          color: isDark ? "#E8EDF2" : "var(--text-primary)",
          lineHeight: "1.65", marginBottom: "12px",
        }}>
          {result.summary}
        </p>

        {/* Do now */}
        {result.doNow && (
          <div style={{
            display: "flex", gap: "10px",
            background: config.doNowBg,
            border: `1px solid ${config.borderColor}40`,
            borderRadius: "8px",
            padding: "10px 12px", marginBottom: "12px",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={config.accentBg} strokeWidth="2"
              style={{ flexShrink: 0, marginTop: "1px" }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div>
              <div style={{
                fontSize: "11px", fontWeight: "700",
                color: config.subtleText, marginBottom: "3px",
                letterSpacing: "0.04em",
              }}>
                {s.doNowLabel}
              </div>
              <div style={{
                fontSize: "13px",
                color: isDark ? "#CBD5E1" : "var(--text-primary)",
                lineHeight: "1.55",
              }}>
                {result.doNow}
              </div>
            </div>
          </div>
        )}

        {/* Facilities */}
        <div>
          <div style={{
            fontSize: "10px", fontWeight: "700",
            color: isDark ? "#64748B" : "var(--text-tertiary)",
            marginBottom: "6px",
            textTransform: "uppercase", letterSpacing: "0.08em",
          }}>
            {s.facilitiesNeeded}
          </div>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {result.facilities.map((f) => (
              <span key={f} style={{
                padding: "3px 10px",
                background: config.tagBg,
                border: `1px solid ${config.borderColor}60`,
                borderRadius: "4px", fontSize: "12px",
                fontWeight: "700", color: config.textColor,
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.03em",
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Speaking indicator */}
      {isSpeaking && (
        <div style={{
          padding: "8px 16px",
          borderTop: `1px solid ${config.borderColor}30`,
          background: config.doNowBg,
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                width: "3px", background: config.accentBg, borderRadius: "2px",
                animation: `soundWave 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                height: `${8 + i * 3}px`,
              }} />
            ))}
          </div>
          <span style={{
            fontSize: "11px", fontWeight: "600",
            color: config.textColor, letterSpacing: "0.02em",
          }}>
            {lang === "hi" ? "पढ़ा जा रहा है..." : "Reading aloud..."}
          </span>
          <button onClick={toggleSpeech} style={{
            marginLeft: "auto", fontSize: "11px", fontWeight: "600",
            color: config.textColor, background: "none",
            border: "none", cursor: "pointer", textDecoration: "underline",
          }}>
            {lang === "hi" ? "रोकें" : "Stop"}
          </button>
        </div>
      )}

      <style>{`
        @keyframes soundWave {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}