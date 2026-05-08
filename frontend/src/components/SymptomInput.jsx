import React from "react";
import strings from "../utils/strings";

const MAX_CHARS = 300;

const CHIP_ICONS = {
  en: ["❤️", "🚗", "🤰", "⚡", "🐍"],
  hi: ["❤️", "🚗", "🤰", "⚡", "🐍"],
  ta: ["❤️", "🚗", "🤰", "⚡", "🐍"],
  te: ["❤️", "🚗", "🤰", "⚡", "🐍"],
  bn: ["❤️", "🚗", "🤰", "⚡", "🐍"],
  mr: ["❤️", "🚗", "🤰", "⚡", "🐍"],
};

export default function SymptomInput({ lang, onSubmit, isLoading }) {
  const [text, setText] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const s = strings[lang] || strings["en"];
  const icons = CHIP_ICONS[lang] || CHIP_ICONS["en"];
  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;

  function handleSubmit() {
    if (text.trim() && !isOverLimit) onSubmit(text.trim());
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && e.ctrlKey) handleSubmit();
  }

  function toggleMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Voice not supported in this browser.");
    const recognition = new SR();
    const localeMap = { hi: "hi-IN", ta: "ta-IN", te: "te-IN", bn: "bn-IN", mr: "mr-IN" };
    recognition.lang = localeMap[lang] || "en-IN";
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (e) => setText(Array.from(e.results).map((r) => r[0].transcript).join(""));
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  }

  const canSubmit = !isLoading && text.trim() && !isOverLimit;

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      {/* Label row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: "10px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "3px", height: "16px",
            background: "var(--teal)", borderRadius: "2px",
          }} />
          <span style={{
            fontSize: "11px", fontWeight: "700",
            color: "var(--text-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            {s.labelDescribe}
          </span>
        </div>
        <span style={{
          fontSize: "11px", fontWeight: "500",
          color: isOverLimit ? "var(--alert)" : "var(--text-tertiary)",
          fontFamily: "var(--font-mono)",
          transition: "color var(--transition)",
        }}>
          {charCount}/{MAX_CHARS}
        </span>
      </div>

      {/* Input card */}
      <div style={{
        background: "var(--bg-card)",
        border: `1.5px solid ${focused ? "var(--teal)" : isOverLimit ? "var(--alert)" : "var(--border)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: focused
          ? "0 0 0 3px rgba(11,122,94,0.10), var(--shadow-sm)"
          : "var(--shadow-sm)",
        transition: "border-color var(--transition), box-shadow var(--transition)",
        marginBottom: "10px",
      }}>
        <div style={{ position: "relative" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={s.placeholder}
            rows={4}
            style={{
              width: "100%", border: "none", outline: "none",
              resize: "none", fontSize: "14px", lineHeight: "1.7",
              color: "var(--text-primary)",
              background: "transparent",
              padding: "16px 44px 16px 16px",
              letterSpacing: "-0.01em",
            }}
          />
          {text && (
            <button
              onClick={() => setText("")}
              style={{
                position: "absolute", top: "12px", right: "12px",
                width: "24px", height: "24px", borderRadius: "50%",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer",
                color: "var(--text-tertiary)", fontSize: "14px",
                lineHeight: 1, transition: "all var(--transition)",
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Toolbar */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "10px 14px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg-secondary)",
        }}>
          <button
            onClick={toggleMic}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "6px 12px",
              border: `1px solid ${isRecording ? "var(--alert)" : "var(--border)"}`,
              borderRadius: "var(--radius-sm)",
              background: isRecording ? "var(--alert-light)" : "var(--bg-card)",
              fontSize: "12px", fontWeight: "500",
              color: isRecording ? "var(--alert)" : "var(--text-secondary)",
              transition: "all var(--transition)",
            }}
          >
            {isRecording ? (
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "var(--alert)",
                animation: "pulse 1s ease infinite",
              }} />
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3m0 2a1 1 0 0 0-1 1v7a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1m7 8c0 3.53-2.61 6.44-6 6.93V21h2a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2h2v-2.07C7.61 18.44 5 15.53 5 12a1 1 0 0 1 2 0 5 5 0 0 0 10 0 1 1 0 0 1 2 0z"/>
              </svg>
            )}
            {isRecording
              ? (lang === "hi" ? "सुन रहे हैं..." : "Listening...")
              : s.micLabel}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              fontSize: "10px", color: "var(--text-tertiary)",
              display: text ? "block" : "none",
            }}>
              Ctrl+Enter to submit
            </span>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{
                padding: "8px 20px",
                background: canSubmit ? "var(--teal)" : "var(--border)",
                color: canSubmit ? "white" : "var(--text-tertiary)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontSize: "13px", fontWeight: "600",
                transition: "all var(--transition)",
                display: "flex", alignItems: "center", gap: "6px",
                cursor: canSubmit ? "pointer" : "not-allowed",
                letterSpacing: "-0.01em",
                transform: canSubmit ? "translateY(0)" : "none",
              }}
              onMouseEnter={(e) => {
                if (canSubmit) e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isLoading ? (
                <div style={{
                  width: "14px", height: "14px", borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "white",
                  animation: "spin 0.7s linear infinite",
                }} />
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              )}
              {s.triageLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Quick chips */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {s.quickChips.map((chip, i) => (
          <button
            key={chip.label}
            onClick={() => setText(chip.text)}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 12px",
              border: "1px solid var(--border)",
              borderRadius: "20px", fontSize: "12px", fontWeight: "500",
              color: "var(--text-secondary)", background: "var(--bg-card)",
              transition: "all var(--transition)", cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--teal)";
              e.currentTarget.style.color = "var(--teal)";
              e.currentTarget.style.background = "var(--teal-light)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.background = "var(--bg-card)";
            }}
          >
            <span>{icons[i]}</span>
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}