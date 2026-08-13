import React from "react";
import strings from "../utils/strings";

const MAX_CHARS = 300;

export default function SymptomInput({ lang, onSubmit, isLoading }) {
  const [text, setText] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const s = strings[lang] || strings["en"];
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
    if (!SR) return alert("Voice recognition not supported in this browser.");
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
    <div style={{ marginBottom: "1.5rem" }}>
      {/* Label & Counter Row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "4px",
            height: "14px",
            background: "var(--teal)",
            borderRadius: "2px",
          }} />
          <span style={{
            fontSize: "11px",
            fontWeight: "800",
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}>
            DESCRIBE THE EMERGENCY
          </span>
        </div>
        <span style={{
          fontSize: "11px",
          fontWeight: "600",
          color: isOverLimit ? "var(--alert)" : "var(--text-tertiary)",
          fontFamily: "var(--font-mono)",
        }}>
          {charCount} / {MAX_CHARS}
        </span>
      </div>

      {/* Input Command Card */}
      <div className="symptom-input-card" style={{
        borderColor: focused ? "var(--teal)" : isOverLimit ? "var(--alert)" : undefined,
        boxShadow: focused ? "0 0 0 3px rgba(22, 165, 121, 0.12)" : undefined,
      }}>
        <div style={{ position: "relative" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={s.placeholder || "Tell us what is happening right now..."}
            rows={4}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: "15px",
              lineHeight: "1.6",
              color: "var(--text-primary)",
              background: "transparent",
              padding: "18px 44px 18px 18px",
              letterSpacing: "-0.01em",
              boxSizing: "border-box",
            }}
          />
          {text && (
            <button
              onClick={() => setText("")}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                color: "var(--text-tertiary)",
                fontSize: "15px",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Command Toolbar */}
        <div className="symptom-input-toolbar">
          <button
            onClick={toggleMic}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              border: `1px solid ${isRecording ? "var(--alert)" : "var(--border)"}`,
              borderRadius: "8px",
              background: isRecording ? "rgba(225,29,72,0.1)" : "var(--bg-card)",
              fontSize: "13px",
              fontWeight: "600",
              color: isRecording ? "var(--alert)" : "var(--text-secondary)",
              cursor: "pointer",
              transition: "all var(--transition)",
            }}
          >
            {isRecording ? (
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--alert)",
                animation: "fabPulse 1s infinite",
              }} />
            ) : (
              <span>🎙</span>
            )}
            <span>
              {isRecording
                ? (lang === "hi" ? "सुन रहे हैं..." : "Listening...")
                : (lang === "hi" ? "आवाज से बताएं" : "Voice input")}
            </span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{
              fontSize: "11px",
              color: "var(--text-tertiary)",
              display: text ? "inline-block" : "none",
            }}>
              Ctrl+Enter
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              aria-label={
                isLoading
                  ? (lang === "hi" ? "अस्पताल खोजे जा रहे हैं" : "Searching hospitals...")
                  : text.trim()
                  ? (lang === "hi" ? "निकटतम अस्पताल खोजें" : "Find nearest hospital")
                  : (lang === "hi" ? "लक्षण दर्ज करें" : "Enter symptoms to search")
              }
              title={
                !text.trim()
                  ? (lang === "hi" ? "अस्पताल खोजने के लिए कृपया लक्षण बताएं" : "Please describe symptoms to search")
                  : isOverLimit
                  ? (lang === "hi" ? "अक्षर सीमा पार हो गई" : "Character limit exceeded")
                  : ""
              }
              className="primary-emergency-btn"
            >
              {isLoading ? (
                <div style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#FFFFFF",
                  animation: "spin 0.7s linear infinite",
                }} />
              ) : (
                <>
                  <span>
                    {!text.trim()
                      ? (lang === "hi" ? "लक्षण दर्ज करें" : "Enter symptoms to search")
                      : (lang === "hi" ? "निकटतम अस्पताल खोजें" : "Find nearest hospital")}
                  </span>
                  <span className="btn-arrow" style={{ fontSize: "16px", fontWeight: "700" }}>→</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Restrained Quick Symptom Shortcuts */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {s.quickChips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => setText(chip.text)}
            className="symptom-chip"
          >
            <span>{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}