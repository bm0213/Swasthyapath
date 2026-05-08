import React from "react";

export default function UserHistory() {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    const saved = localStorage.getItem("swasthya-triage-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const severityColor = {
    critical: { bg: "#FCEBEB", color: "#501313", border: "#F09595" },
    urgent: { bg: "#FAEEDA", color: "#412402", border: "#FAC775" },
    moderate: { bg: "#EAF3DE", color: "#173404", border: "#A8D577" },
  };

  if (history.length === 0) {
    return (
      <div style={{
        maxWidth: "900px", margin: "0 auto",
        padding: "1.5rem 1.25rem 4rem",
      }}>
        <div style={{
          fontSize: "20px", fontWeight: "700",
          color: "var(--text-primary)", marginBottom: "4px",
        }}>
          My Triage History
        </div>
        <div style={{
          fontSize: "12px", color: "var(--text-tertiary)",
          marginBottom: "1.5rem",
        }}>
          Your past emergency triage records
        </div>
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px", padding: "3rem",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📋</div>
          <div style={{
            fontSize: "15px", fontWeight: "600",
            color: "var(--text-secondary)", marginBottom: "6px",
          }}>
            No triage history yet
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
            Submit symptoms on the Triage page to see your history here.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "900px", margin: "0 auto",
      padding: "1.5rem 1.25rem 4rem",
    }}>
      <div style={{
        fontSize: "20px", fontWeight: "700",
        color: "var(--text-primary)", marginBottom: "4px",
      }}>
        My Triage History
      </div>
      <div style={{
        fontSize: "12px", color: "var(--text-tertiary)",
        marginBottom: "1.5rem",
      }}>
        {history.length} record{history.length > 1 ? "s" : ""} found
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {[...history].reverse().map((item, i) => {
          const s = severityColor[item.severity] || severityColor.moderate;
          return (
            <div key={i} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "12px", padding: "1rem 1.25rem",
              boxShadow: "var(--shadow-sm)",
            }}>
              {/* Header */}
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "10px",
              }}>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px",
                  fontSize: "11px", fontWeight: "600",
                  background: s.bg, color: s.color,
                  border: `1px solid ${s.border}`,
                  textTransform: "capitalize",
                }}>
                  {item.severity}
                </span>
                <span style={{
                  fontSize: "11px", color: "var(--text-tertiary)",
                }}>
                  {new Date(item.timestamp).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Symptoms */}
              <div style={{
                fontSize: "13px", color: "var(--text-primary)",
                marginBottom: "8px", fontWeight: "500",
              }}>
                {item.symptoms}
              </div>

              {/* Summary */}
              {item.summary && (
                <div style={{
                  fontSize: "12px", color: "var(--text-secondary)",
                  marginBottom: "8px", lineHeight: "1.5",
                }}>
                  {item.summary}
                </div>
              )}

              {/* Facilities */}
              {item.facilities?.length > 0 && (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {item.facilities.map((f) => (
                    <span key={f} style={{
                      padding: "2px 8px",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px", fontSize: "11px",
                      fontWeight: "600", color: "var(--text-secondary)",
                      fontFamily: "monospace",
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Clear history button */}
      <button
        onClick={() => {
          localStorage.removeItem("swasthya-triage-history");
          setHistory([]);
        }}
        style={{
          marginTop: "1.5rem", padding: "10px 20px",
          background: "transparent",
          color: "var(--alert)",
          border: "1px solid var(--alert)40",
          borderRadius: "9px", fontSize: "13px",
          fontWeight: "600", cursor: "pointer",
        }}
      >
        🗑️ Clear history
      </button>
    </div>
  );
}