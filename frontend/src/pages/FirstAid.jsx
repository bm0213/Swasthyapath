import React from "react";

const firstAidData = [
  {
    id: "heart-attack",
    emoji: "❤️",
    title: "Heart Attack",
    color: "#EF4444",
    lightColor: "#FEF2F2",
    signs: ["Chest pain or pressure", "Pain spreading to arm, neck or jaw", "Shortness of breath", "Sweating, nausea", "Dizziness or fainting"],
    steps: [
      "Call 112 immediately — do not wait.",
      "Make the person sit or lie down in a comfortable position.",
      "Loosen tight clothing around neck and chest.",
      "If the person is conscious, give aspirin (325mg) if available and not allergic.",
      "If unconscious and not breathing, start CPR — 30 chest compressions, 2 rescue breaths.",
      "Stay with the person until ambulance arrives.",
    ],
    donts: ["Do not give water or food.", "Do not leave the person alone.", "Do not let them walk around."],
    call112: true,
  },
  {
    id: "snake-bite",
    emoji: "🐍",
    title: "Snake Bite",
    color: "#7C3AED",
    lightColor: "#F5F3FF",
    signs: ["Two puncture marks on skin", "Swelling and pain at bite site", "Nausea and vomiting", "Blurred vision", "Numbness or tingling"],
    steps: [
      "Keep the person calm and still — movement speeds venom spread.",
      "Keep the bitten limb below heart level.",
      "Remove jewellery, watches, tight clothing near bite.",
      "Mark the edge of swelling with a pen and note the time.",
      "Rush to nearest hospital with anti-venom facility immediately.",
      "Try to remember the snake's appearance for doctors.",
    ],
    donts: ["Do NOT cut the wound or suck out venom.", "Do NOT apply tourniquet or ice.", "Do NOT give alcohol or painkillers."],
    call112: true,
  },
  {
    id: "burns",
    emoji: "🔥",
    title: "Burns",
    color: "#F97316",
    lightColor: "#FFF7ED",
    signs: ["Red, blistered or charred skin", "Severe pain or no pain (deep burns)", "Swelling around burn area", "Smoke inhalation symptoms"],
    steps: [
      "Remove the person from the source of burn immediately.",
      "Cool the burn with cool (not cold/ice) running water for 10-20 minutes.",
      "Remove jewellery and clothing near the burn area carefully.",
      "Cover loosely with a clean non-fluffy cloth or cling wrap.",
      "For large or deep burns, call 112 immediately.",
      "Keep the person warm to prevent shock.",
    ],
    donts: ["Do NOT use ice, butter, toothpaste or oil.", "Do NOT burst blisters.", "Do NOT remove clothing stuck to the burn."],
    call112: true,
  },
  {
    id: "drowning",
    emoji: "💧",
    title: "Drowning",
    color: "#3B82F6",
    lightColor: "#EFF6FF",
    signs: ["Unconscious after water rescue", "Not breathing normally", "Blue lips or fingertips", "Coughing up water"],
    steps: [
      "Get the person out of water safely — do not put yourself at risk.",
      "Call 112 immediately.",
      "Check if person is breathing — tilt head, lift chin.",
      "If not breathing, give 5 rescue breaths first, then start CPR.",
      "Continue CPR — 30 compressions, 2 breaths — until help arrives.",
      "Place in recovery position if breathing resumes.",
    ],
    donts: ["Do NOT hold person upside down to drain water.", "Do NOT leave them alone even if they seem okay.", "Do NOT give food or water."],
    call112: true,
  },
  {
    id: "choking",
    emoji: "😮",
    title: "Choking",
    color: "#D97706",
    lightColor: "#FFFBEB",
    signs: ["Cannot speak, cry or breathe", "Clutching throat with hands", "High-pitched noise while breathing", "Turning blue in face"],
    steps: [
      "Ask 'Are you choking?' — if they can speak/cough, encourage coughing.",
      "If unable to breathe, stand behind them and lean them forward.",
      "Give 5 firm back blows between shoulder blades with heel of hand.",
      "Give 5 abdominal thrusts (Heimlich maneuver) — hands above navel, push inward and upward.",
      "Alternate 5 back blows and 5 abdominal thrusts.",
      "If unconscious, call 112 and start CPR.",
    ],
    donts: ["Do NOT do blind finger sweeps in mouth.", "Do NOT give abdominal thrusts to pregnant women — use chest thrusts.", "Do NOT shake the person."],
    call112: true,
  },
  {
    id: "fracture",
    emoji: "🦴",
    title: "Fracture",
    color: "#0D9488",
    lightColor: "#F0FDFA",
    signs: ["Severe pain at injury site", "Swelling and bruising", "Deformity or unnatural angle", "Unable to move the limb", "Bone visible through skin (open fracture)"],
    steps: [
      "Keep the person still — do not move the injured limb.",
      "Call 112 for suspected spine, neck or hip fractures.",
      "Immobilize the limb using a makeshift splint (rolled newspaper, stick).",
      "Apply ice wrapped in cloth to reduce swelling.",
      "Elevate the injured limb if possible.",
      "For open fractures, cover with clean cloth — do not push bone back.",
    ],
    donts: ["Do NOT try to straighten the bone.", "Do NOT move the person if spine injury is suspected.", "Do NOT apply tight bandages that cut circulation."],
    call112: false,
  },
  {
    id: "seizure",
    emoji: "⚡",
    title: "Seizure",
    color: "#6366F1",
    lightColor: "#EEF2FF",
    signs: ["Uncontrolled shaking or convulsions", "Loss of consciousness", "Stiffening of body", "Staring blankly", "Temporary confusion after episode"],
    steps: [
      "Stay calm and time the seizure.",
      "Clear the area of hard or sharp objects.",
      "Lay the person on their side (recovery position) on a soft surface.",
      "Cushion their head with something soft.",
      "Do not restrain their movements.",
      "After seizure, place in recovery position and stay until fully conscious.",
      "Call 112 if seizure lasts more than 5 minutes or person doesn't regain consciousness.",
    ],
    donts: ["Do NOT put anything in their mouth.", "Do NOT hold them down.", "Do NOT give water until fully conscious."],
    call112: false,
  },
  {
    id: "bleeding",
    emoji: "🩸",
    title: "Severe Bleeding",
    color: "#DC2626",
    lightColor: "#FEF2F2",
    signs: ["Heavy blood flow that won't stop", "Blood soaking through cloth", "Wound appears deep", "Signs of shock — pale, dizzy, rapid breathing"],
    steps: [
      "Call 112 for severe or uncontrolled bleeding.",
      "Press firmly on the wound with a clean cloth or bandage.",
      "Maintain pressure continuously for at least 10 minutes.",
      "If cloth soaks through, add more on top — do not remove first cloth.",
      "Elevate the injured area above heart level if possible.",
      "Keep the person warm and lying down.",
    ],
    donts: ["Do NOT remove the cloth once applied.", "Do NOT use a tourniquet unless trained.", "Do NOT clean a deep wound with water."],
    call112: true,
  },
  {
    id: "unconscious",
    emoji: "😵",
    title: "Unconscious Person",
    color: "#64748B",
    lightColor: "#F8FAFC",
    signs: ["Not responding to voice or touch", "Eyes closed, limp body", "Irregular or no breathing", "Pale or blue skin"],
    steps: [
      "Call 112 immediately.",
      "Check for breathing — tilt head back, lift chin, look, listen, feel.",
      "If breathing, place in recovery position (on their side).",
      "If not breathing, start CPR immediately — 30 compressions, 2 breaths.",
      "Check for injuries — do not move if spine injury suspected.",
      "Stay with the person and monitor breathing until help arrives.",
    ],
    donts: ["Do NOT give anything by mouth.", "Do NOT leave them on their back if breathing (risk of choking).", "Do NOT slap or shake to revive."],
    call112: true,
  },
  {
    id: "road-accident",
    emoji: "🚗",
    title: "Road Accident",
    color: "#B45309",
    lightColor: "#FFFBEB",
    signs: ["Visible injuries", "Unconsciousness", "Trapped person", "Multiple casualties"],
    steps: [
      "Ensure your own safety — turn on hazard lights, move to safe distance.",
      "Call 112 immediately — give exact location.",
      "Do NOT move the injured person unless there is fire or immediate danger.",
      "Keep the person still and calm.",
      "Control any visible bleeding with firm pressure.",
      "Keep the person warm with a jacket or blanket.",
      "Stay on the line with 112 operator for guidance.",
    ],
    donts: ["Do NOT remove helmet unless absolutely necessary.", "Do NOT move person if spine injury suspected.", "Do NOT crowd around the victim."],
    call112: true,
  },
];

export default function FirstAid({ lang }) {
  const [selected, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [searchFocused, setSearchFocused] = React.useState(false);

  const filtered = firstAidData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Detail view
  if (selected) {
    const item = firstAidData.find((f) => f.id === selected);
    return (
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.5rem 1.5rem 4rem" }}
        className="fade-up">

        {/* Back */}
        <button
          onClick={() => setSelected(null)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-secondary)", cursor: "pointer",
            fontSize: "12px", fontWeight: "600",
            marginBottom: "1.25rem", padding: "6px 12px",
            transition: "all var(--transition)",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
        >
          ← Back to First Aid
        </button>

        {/* Hero header */}
        <div style={{
          background: item.lightColor,
          border: `1px solid ${item.color}25`,
          borderLeft: `4px solid ${item.color}`,
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem",
          marginBottom: "1rem",
          display: "flex", alignItems: "center", gap: "20px",
        }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "18px",
            background: `${item.color}15`,
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "40px",
            flexShrink: 0,
          }}>
            {item.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: "22px", fontWeight: "700",
              color: item.color, marginBottom: "8px",
              letterSpacing: "-0.3px",
              fontFamily: "var(--font-display)",
            }}>
              {item.title}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {item.call112 && (
                <a href="tel:112" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "6px 14px",
                  background: "#EF4444", color: "white",
                  borderRadius: "20px", fontSize: "12px",
                  fontWeight: "700", textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(239,68,68,0.3)",
                }}>
                  📞 Call 112 Now
                </a>
              )}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                padding: "6px 12px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "20px", fontSize: "11px",
                fontWeight: "600", color: "var(--text-secondary)",
              }}>
                ✅ Works offline
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          {/* Warning Signs */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}>
            <div style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--border)",
              background: "var(--bg-secondary)",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ fontSize: "14px" }}>⚠️</span>
              <span style={{
                fontSize: "10px", fontWeight: "700",
                color: "var(--text-tertiary)",
                textTransform: "uppercase", letterSpacing: "0.1em",
              }}>
                Warning Signs
              </span>
            </div>
            <div style={{ padding: "8px 16px" }}>
              {item.signs.map((sign, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  padding: "8px 0",
                  borderBottom: i < item.signs.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: item.color, flexShrink: 0, marginTop: "7px",
                  }} />
                  <span style={{
                    fontSize: "13px", color: "var(--text-primary)",
                    lineHeight: "1.5", letterSpacing: "-0.01em",
                  }}>
                    {sign}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div style={{
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}>
            <div style={{
              padding: "12px 16px",
              borderBottom: "1px solid #FECACA",
              background: "#FEE2E2",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ fontSize: "14px" }}>❌</span>
              <span style={{
                fontSize: "10px", fontWeight: "700",
                color: "#991B1B",
                textTransform: "uppercase", letterSpacing: "0.1em",
              }}>
                What NOT To Do
              </span>
            </div>
            <div style={{ padding: "8px 16px" }}>
              {item.donts.map((dont, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  padding: "8px 0",
                  borderBottom: i < item.donts.length - 1 ? "1px solid #FECACA" : "none",
                }}>
                  <span style={{
                    color: "#EF4444", flexShrink: 0,
                    fontWeight: "700", fontSize: "12px", marginTop: "1px",
                  }}>✕</span>
                  <span style={{
                    fontSize: "13px", color: "#7F1D1D",
                    lineHeight: "1.5", letterSpacing: "-0.01em",
                  }}>
                    {dont}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
          marginBottom: "12px",
        }}>
          <div style={{
            padding: "12px 16px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-secondary)",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{ fontSize: "14px" }}>✅</span>
            <span style={{
              fontSize: "10px", fontWeight: "700",
              color: "var(--text-tertiary)",
              textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
              Step-by-Step Instructions
            </span>
          </div>
          <div style={{ padding: "8px 16px" }}>
            {item.steps.map((step, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "14px",
                padding: "12px 0",
                borderBottom: i < item.steps.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: item.color, color: "white",
                  fontSize: "11px", fontWeight: "700",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0,
                  boxShadow: `0 2px 6px ${item.color}40`,
                }}>
                  {i + 1}
                </div>
                <span style={{
                  fontSize: "13px", color: "var(--text-primary)",
                  lineHeight: "1.65", paddingTop: "4px",
                  letterSpacing: "-0.01em",
                }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call 112 CTA */}
        {item.call112 && (
          <a href="tel:112" style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: "10px",
            padding: "16px",
            background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            color: "white",
            borderRadius: "var(--radius-lg)",
            fontSize: "15px", fontWeight: "700",
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
            transition: "all var(--transition)",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            📞 Call 112 — National Emergency
          </a>
        )}
      </div>
    );
  }

  // Grid view
  return (
    <div style={{ maxWidth: "100%", padding: "1.5rem 1.5rem 4rem" }}
      className="fade-up">

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", marginBottom: "1.5rem",
        flexWrap: "wrap", gap: "12px",
      }}>
        <div>
          <h1 style={{
            fontSize: "24px", fontWeight: "700",
            color: "var(--text-primary)", marginBottom: "4px",
            letterSpacing: "-0.4px",
            fontFamily: "var(--font-display)",
          }}>
            🚑 First Aid Guide
          </h1>
          <p style={{
            fontSize: "13px", color: "var(--text-secondary)",
            margin: 0, letterSpacing: "-0.01em",
          }}>
            Step-by-step emergency instructions for 10 critical situations
          </p>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "11px", fontWeight: "600",
          color: "var(--teal)", background: "var(--teal-light)",
          border: "1px solid var(--teal)20",
          padding: "6px 14px", borderRadius: "20px",
        }}>
          ✅ Works offline
        </div>
      </div>

      {/* Search */}
      <div style={{
        position: "relative", marginBottom: "1.5rem",
      }}>
        <svg style={{
          position: "absolute", left: "14px", top: "50%",
          transform: "translateY(-50%)",
          color: searchFocused ? "var(--teal)" : "var(--text-tertiary)",
          transition: "color var(--transition)",
          pointerEvents: "none",
        }} width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search emergencies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            width: "100%", padding: "11px 14px 11px 40px",
            border: `1.5px solid ${searchFocused ? "var(--teal)" : "var(--border)"}`,
            borderRadius: "var(--radius-md)",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            fontSize: "14px", outline: "none",
            boxSizing: "border-box",
            boxShadow: searchFocused ? "0 0 0 3px rgba(11,122,94,0.10)" : "var(--shadow-xs)",
            transition: "all var(--transition)",
          }}
        />
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "14px",
      }}>
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderTop: `3px solid ${item.color}`,
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              cursor: "pointer", textAlign: "left",
              transition: "all var(--transition)",
              display: "flex", flexDirection: "column",
              gap: "10px",
              boxShadow: "var(--shadow-xs)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-xs)";
            }}
          >
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: `${item.color}12`,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "26px",
            }}>
              {item.emoji}
            </div>
            <div>
              <div style={{
                fontSize: "13px", fontWeight: "700",
                color: "var(--text-primary)", lineHeight: "1.3",
                marginBottom: "4px", letterSpacing: "-0.01em",
              }}>
                {item.title}
              </div>
              <div style={{
                fontSize: "11px", color: "var(--text-tertiary)",
                letterSpacing: "-0.01em",
              }}>
                {item.signs.length} warning signs
              </div>
            </div>
            {item.call112 && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                fontSize: "10px", fontWeight: "700",
                color: "#EF4444",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                padding: "3px 8px", borderRadius: "20px",
                width: "fit-content",
              }}>
                🚨 Call 112
              </div>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: "center", padding: "3rem",
          color: "var(--text-tertiary)", fontSize: "14px",
        }}>
          No results for "{search}"
        </div>
      )}
    </div>
  );
}