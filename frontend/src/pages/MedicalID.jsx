import React from "react";
import { QRCodeSVG } from "qrcode.react";

const STORAGE_KEY = "swasthya-medical-id";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

const emptyForm = {
  name: "",
  age: "",
  bloodGroup: "",
  allergies: "",
  conditions: "",
  medications: "",
  doctorName: "",
  doctorPhone: "",
  insuranceProvider: "",
  insuranceNumber: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",
};

function InfoRow({ label, value, color }) {
  if (!value) return null;
  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "flex-start", padding: "8px 0",
      borderBottom: "1px solid var(--border)",
      gap: "12px",
    }}>
      <span style={{
        fontSize: "11px", fontWeight: "700",
        color: "var(--text-tertiary)",
        textTransform: "uppercase", letterSpacing: "0.06em",
        flexShrink: 0, paddingTop: "1px",
      }}>
        {label}
      </span>
      <span style={{
        fontSize: "13px", fontWeight: "600",
        color: color || "var(--text-primary)",
        textAlign: "right", lineHeight: "1.4",
      }}>
        {value}
      </span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: "10px", fontWeight: "700",
      color: "var(--text-tertiary)",
      textTransform: "uppercase", letterSpacing: "0.08em",
      marginBottom: "4px", marginTop: "20px",
      paddingBottom: "8px",
      borderBottom: "1px solid var(--border)",
    }}>
      {children}
    </div>
  );
}

export default function MedicalID() {
  const [form, setForm] = React.useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : emptyForm;
  });
  const [isEditing, setIsEditing] = React.useState(!localStorage.getItem(STORAGE_KEY));
  const [saved, setSaved] = React.useState(false);
  const [showQR, setShowQR] = React.useState(false);

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleClear() {
    if (window.confirm("Are you sure you want to clear your Medical ID?")) {
      localStorage.removeItem(STORAGE_KEY);
      setForm(emptyForm);
      setIsEditing(true);
    }
  }

  // QR code data
  const qrData = JSON.stringify({
    name: form.name,
    age: form.age,
    bloodGroup: form.bloodGroup,
    allergies: form.allergies,
    conditions: form.conditions,
    medications: form.medications,
    emergencyName: form.emergencyName,
    emergencyPhone: form.emergencyPhone,
    emergencyRelation: form.emergencyRelation,
    doctorName: form.doctorName,
    doctorPhone: form.doctorPhone,
  });

  const inputStyle = {
    width: "100%", padding: "9px 12px",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: "13px", outline: "none",
    boxSizing: "border-box",
    marginBottom: "10px",
  };

  const hasData = form.name || form.bloodGroup || form.emergencyPhone;

  return (
    <div style={{
      maxWidth: "680px", margin: "0 auto",
      padding: "1.5rem 1.25rem 4rem",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "1.25rem",
      }}>
        <div>
          <div style={{
            fontSize: "20px", fontWeight: "700",
            color: "var(--text-primary)", marginBottom: "4px",
          }}>
            🪪 Medical ID
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
            Critical health info doctors can scan in emergencies
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {hasData && !isEditing && (
            <button onClick={() => setShowQR(!showQR)} style={{
              padding: "8px 14px",
              background: showQR ? "var(--teal)" : "var(--bg-card)",
              color: showQR ? "white" : "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "8px", fontSize: "12px",
              fontWeight: "600", cursor: "pointer",
            }}>
              {showQR ? "Hide QR" : "Show QR"}
            </button>
          )}
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} style={{
              padding: "8px 14px",
              background: "#2563EB", color: "white",
              border: "none", borderRadius: "8px",
              fontSize: "12px", fontWeight: "600", cursor: "pointer",
            }}>
              ✏️ Edit
            </button>
          )}
        </div>
      </div>

      {/* QR Code */}
      {showQR && hasData && !isEditing && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px", padding: "1.5rem",
          marginBottom: "1.25rem", textAlign: "center",
          boxShadow: "var(--shadow-sm)",
        }}>
          <div style={{
            fontSize: "13px", fontWeight: "600",
            color: "var(--text-primary)", marginBottom: "4px",
          }}>
            Scan to view Medical ID
          </div>
          <div style={{
            fontSize: "11px", color: "var(--text-tertiary)",
            marginBottom: "1.25rem",
          }}>
            Show this to doctors or paramedics in an emergency
          </div>
          <div style={{
            display: "inline-block", padding: "16px",
            background: "white", borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          }}>
            <QRCodeSVG
              value={qrData}
              size={200}
              level="M"
              includeMargin={false}
            />
          </div>
          <div style={{
            marginTop: "12px", fontSize: "11px",
            color: "var(--text-tertiary)",
          }}>
            Contains: Name, Blood Group, Allergies, Emergency Contact
          </div>
        </div>
      )}

      {/* Medical ID Card View */}
      {!isEditing && hasData && (
        <div style={{
          background: "var(--bg-card)",
          border: "2px solid #E24B4A30",
          borderTop: "4px solid #E24B4A",
          borderRadius: "16px", padding: "1.25rem",
          marginBottom: "1.25rem",
          boxShadow: "var(--shadow-sm)",
        }}>
          {/* Card Header */}
          <div style={{
            display: "flex", alignItems: "center",
            gap: "12px", marginBottom: "1rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--border)",
          }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "#E24B4A", color: "white",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "22px",
              flexShrink: 0,
            }}>
              🏥
            </div>
            <div>
              <div style={{
                fontSize: "18px", fontWeight: "700",
                color: "var(--text-primary)",
              }}>
                {form.name || "Unknown"}
              </div>
              <div style={{
                fontSize: "12px", color: "var(--text-secondary)",
              }}>
                {form.age ? `Age: ${form.age}` : ""} {form.age && form.bloodGroup ? "·" : ""} {form.bloodGroup ? `Blood: ${form.bloodGroup}` : ""}
              </div>
            </div>
            {form.bloodGroup && (
              <div style={{
                marginLeft: "auto",
                width: "48px", height: "48px",
                borderRadius: "50%",
                background: "#E24B4A",
                color: "white", fontWeight: "700",
                fontSize: "14px",
                display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}>
                {form.bloodGroup}
              </div>
            )}
          </div>

          {/* Critical Info */}
          {(form.allergies || form.conditions || form.medications) && (
            <>
              <div style={{
                fontSize: "10px", fontWeight: "700",
                color: "#E24B4A",
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "8px",
              }}>
                ⚠️ Critical Medical Info
              </div>
              <InfoRow label="Allergies" value={form.allergies} color="#E24B4A" />
              <InfoRow label="Conditions" value={form.conditions} />
              <InfoRow label="Medications" value={form.medications} />
            </>
          )}

          {/* Doctor Info */}
          {(form.doctorName || form.doctorPhone) && (
            <>
              <div style={{
                fontSize: "10px", fontWeight: "700",
                color: "var(--text-tertiary)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "8px", marginTop: "16px",
              }}>
                👨‍⚕️ Doctor
              </div>
              <InfoRow label="Name" value={form.doctorName} />
              <InfoRow label="Phone" value={form.doctorPhone} />
            </>
          )}

          {/* Insurance */}
          {(form.insuranceProvider || form.insuranceNumber) && (
            <>
              <div style={{
                fontSize: "10px", fontWeight: "700",
                color: "var(--text-tertiary)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "8px", marginTop: "16px",
              }}>
                🪪 Insurance
              </div>
              <InfoRow label="Provider" value={form.insuranceProvider} />
              <InfoRow label="Policy No." value={form.insuranceNumber} />
            </>
          )}

          {/* Emergency Contact */}
          {(form.emergencyName || form.emergencyPhone) && (
            <>
              <div style={{
                fontSize: "10px", fontWeight: "700",
                color: "var(--text-tertiary)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "8px", marginTop: "16px",
              }}>
                🆘 Emergency Contact
              </div>
              <InfoRow label="Name" value={form.emergencyName} />
              <InfoRow label="Relation" value={form.emergencyRelation} />
              <InfoRow label="Phone" value={form.emergencyPhone} />
            </>
          )}

          {/* Call Emergency Contact */}
          {form.emergencyPhone && (
            <a href={`tel:${form.emergencyPhone}`} style={{
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px",
              padding: "12px", marginTop: "16px",
              background: "#E24B4A", color: "white",
              borderRadius: "10px", fontSize: "13px",
              fontWeight: "700", textDecoration: "none",
            }}>
              📞 Call Emergency Contact
            </a>
          )}
        </div>
      )}

      {/* Empty state */}
      {!isEditing && !hasData && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px", padding: "3rem",
          textAlign: "center", marginBottom: "1.25rem",
        }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🪪</div>
          <div style={{
            fontSize: "15px", fontWeight: "600",
            color: "var(--text-secondary)", marginBottom: "6px",
          }}>
            No Medical ID yet
          </div>
          <div style={{
            fontSize: "13px", color: "var(--text-tertiary)",
            marginBottom: "1.25rem",
          }}>
            Set up your Medical ID so doctors can help you faster in emergencies.
          </div>
          <button onClick={() => setIsEditing(true)} style={{
            padding: "10px 24px",
            background: "#2563EB", color: "white",
            border: "none", borderRadius: "9px",
            fontSize: "13px", fontWeight: "600", cursor: "pointer",
          }}>
            Create Medical ID
          </button>
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px", padding: "1.25rem",
          marginBottom: "1.25rem",
        }}>
          {/* Personal Info */}
          <SectionTitle>Personal Information</SectionTitle>
          <input placeholder="Full name" value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            style={inputStyle} />
          <input placeholder="Age" value={form.age} type="number"
            onChange={(e) => handleChange("age", e.target.value)}
            style={inputStyle} />
          <select value={form.bloodGroup}
            onChange={(e) => handleChange("bloodGroup", e.target.value)}
            style={{ ...inputStyle, color: form.bloodGroup ? "var(--text-primary)" : "var(--text-tertiary)" }}>
            <option value="">Select blood group</option>
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          {/* Medical Info */}
          <SectionTitle>Medical Information</SectionTitle>
          <input placeholder="Allergies (e.g. Penicillin, Peanuts)" value={form.allergies}
            onChange={(e) => handleChange("allergies", e.target.value)}
            style={inputStyle} />
          <input placeholder="Existing conditions (e.g. Diabetes, Hypertension)" value={form.conditions}
            onChange={(e) => handleChange("conditions", e.target.value)}
            style={inputStyle} />
          <input placeholder="Current medications (e.g. Metformin 500mg)" value={form.medications}
            onChange={(e) => handleChange("medications", e.target.value)}
            style={inputStyle} />

          {/* Doctor Info */}
          <SectionTitle>Doctor Information</SectionTitle>
          <input placeholder="Doctor's name" value={form.doctorName}
            onChange={(e) => handleChange("doctorName", e.target.value)}
            style={inputStyle} />
          <input placeholder="Doctor's phone number" value={form.doctorPhone}
            onChange={(e) => handleChange("doctorPhone", e.target.value)}
            style={inputStyle} />

          {/* Insurance */}
          <SectionTitle>Insurance Information</SectionTitle>
          <input placeholder="Insurance provider (e.g. Star Health)" value={form.insuranceProvider}
            onChange={(e) => handleChange("insuranceProvider", e.target.value)}
            style={inputStyle} />
          <input placeholder="Policy number" value={form.insuranceNumber}
            onChange={(e) => handleChange("insuranceNumber", e.target.value)}
            style={inputStyle} />

          {/* Emergency Contact */}
          <SectionTitle>Emergency Contact</SectionTitle>
          <input placeholder="Contact name" value={form.emergencyName}
            onChange={(e) => handleChange("emergencyName", e.target.value)}
            style={inputStyle} />
          <input placeholder="Relation (e.g. Father, Spouse)" value={form.emergencyRelation}
            onChange={(e) => handleChange("emergencyRelation", e.target.value)}
            style={inputStyle} />
          <input placeholder="Phone number" value={form.emergencyPhone}
            onChange={(e) => handleChange("emergencyPhone", e.target.value)}
            style={inputStyle} />

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button onClick={handleSave} style={{
              flex: 1, padding: "12px",
              background: saved ? "var(--teal)" : "#2563EB",
              color: "white", border: "none",
              borderRadius: "9px", fontSize: "13px",
              fontWeight: "600", cursor: "pointer",
            }}>
              {saved ? "✅ Saved!" : "💾 Save Medical ID"}
            </button>
            {hasData && (
              <button onClick={() => setIsEditing(false)} style={{
                padding: "12px 16px",
                background: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "9px", fontSize: "13px",
                cursor: "pointer",
              }}>
                Cancel
              </button>
            )}
          </div>

          {hasData && (
            <button onClick={handleClear} style={{
              width: "100%", marginTop: "8px",
              padding: "10px", background: "transparent",
              color: "var(--alert)",
              border: "1px solid var(--alert)40",
              borderRadius: "9px", fontSize: "12px",
              fontWeight: "600", cursor: "pointer",
            }}>
              🗑️ Clear Medical ID
            </button>
          )}
        </div>
      )}

      {/* Privacy note */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: "8px",
        padding: "10px 12px",
        background: "var(--teal-light)",
        border: "1px solid var(--teal)30",
        borderRadius: "8px",
        fontSize: "11px", color: "var(--text-secondary)",
        lineHeight: "1.5",
      }}>
        🔒 Your Medical ID is stored only on this device and never uploaded to any server.
      </div>
    </div>
  );
}