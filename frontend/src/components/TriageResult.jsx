import React from "react";
import strings from "../utils/strings";

export default function TriageResult({ result, lang }) {
  const s = strings[lang] || strings["en"];
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isSupported] = React.useState(() => "speechSynthesis" in window);
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

  React.useEffect(() => {
    return () => { if (window.speechSynthesis) window.speechSynthesis.cancel(); };
  }, [result]);

  const severityConfig = {
    critical: {
      bg: isDark ? "#160808" : "#FFFAFA",
      border: isDark ? "#7F1D1D" : "#FECACA",
      accent: "#EF4444",
      accentDark: "#DC2626",
      text: isDark ? "#FCA5A5" : "#7F1D1D",
      subtle: isDark ? "#2D1010" : "#FEF2F2",
      label: "🔴",
    },
    urgent: {
      bg: isDark ? "#141008" : "#FFFDF5",
      border: isDark ? "#78350F" : "#FDE68A",
      accent: "#F59E0B",
      accentDark: "#D97706",
      text: isDark ? "#FCD34D" : "#78350F",
      subtle: isDark ? "#231A00" : "#FFFBEB",
      label: "🟡",
    },
    moderate: {
      bg: isDark ? "#081410" : "#F8FFFE",
      border: isDark ? "#064E3B" : "#99F6E4",
      accent: "#0D9488",
      accentDark: "#0F766E",
      text: isDark ? "#5EEAD4" : "#134E4A",
      subtle: isDark ? "#0A1F18" : "#F0FDF9",
      label: "🟢",
    },
  };

  const c = severityConfig[result.severity] || severityConfig.moderate;

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
    const utterance = new SpeechSynthesisUtterance(buildSpeechText());
    utterance.lang = voiceLocaleMap[lang] || "en-IN";
    utterance.rate = 0.88;
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
    <div className="fade-up" style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      marginBottom: "1rem",
      boxShadow: `0 0 0 1px ${c.border}40, var(--shadow-md)`,
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 18px",
        borderBottom: `1px solid ${c.border}`,
        background: c.subtle,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "10px", height: "10px", borderRadius: "50%",
            background: c.accent,
            boxShadow: `0 0 8px ${c.accent}80`,
            animation: result.severity === "critical" ? "pulse 1.5s ease infinite" : "none",
          }} />
          <span style={{
            fontSize: "14px", fontWeight: "700",
            color: c.text, letterSpacing: "-0.02em",
            fontFamily: "var(--font-display)",
          }}>
            {result.severityLabel}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "10px", fontWeight: "600",
            color: c.text, background: `${c.accent}15`,
            padding: "3px 10px", borderRadius: "20px",
            border: `1px solid ${c.border}`,
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            AI Assessment
          </span>

          {isSupported && (
            <button
              onClick={toggleSpeech}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "5px 12px",
                background: isSpeaking ? c.accent : `${c.accent}15`,
                border: `1px solid ${c.border}`,
                borderRadius: "20px", cursor: "pointer",
                color: isSpeaking ? "white" : c.text,
                fontSize: "11px", fontWeight: "600",
                transition: "all var(--transition)",
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
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                  {lang === "hi" ? "सुनें" : "Listen"}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px" }}>
        <p style={{
          fontSize: "14px", lineHeight: "1.7",
          color: "var(--text-primary)",
          marginBottom: "14px",
          letterSpacing: "-0.01em",
        }}>
          {result.summary}
        </p>

        {/* Do now */}
        {result.doNow && (
          <div style={{
            display: "flex", gap: "12px",
            background: "var(--bg-card)",
            border: `1px solid ${c.border}`,
            borderLeft: `3px solid ${c.accent}`,
            borderRadius: "var(--radius-md)",
            padding: "12px 14px", marginBottom: "14px",
          }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: `${c.accent}20`,
              display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke={c.accent} strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <div style={{
                fontSize: "10px", fontWeight: "700",
                color: c.text, marginBottom: "4px",
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                {s.doNowLabel}
              </div>
              <div style={{
                fontSize: "13px", lineHeight: "1.6",
                color: "var(--text-primary)",
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
            color: "var(--text-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.1em",
            marginBottom: "8px",
          }}>
            {s.facilitiesNeeded}
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {result.facilities.map((f) => (
              <span key={f} style={{
                padding: "4px 12px",
                background: `${c.accent}12`,
                border: `1px solid ${c.border}`,
                borderRadius: "6px",
                fontSize: "11px", fontWeight: "700",
                color: c.text,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
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
          padding: "10px 18px",
          borderTop: `1px solid ${c.border}`,
          background: c.subtle,
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                width: "3px", background: c.accent,
                borderRadius: "2px",
                animation: `soundWave 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                height: `${6 + i * 3}px`,
              }} />
            ))}
          </div>
          <span style={{
            fontSize: "11px", fontWeight: "600",
            color: c.text,
          }}>
            {lang === "hi" ? "पढ़ा जा रहा है..." : "Reading aloud..."}
          </span>
          <button onClick={toggleSpeech} style={{
            marginLeft: "auto", fontSize: "11px", fontWeight: "600",
            color: c.text, background: "none",
            border: "none", cursor: "pointer",
            textDecoration: "underline",
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