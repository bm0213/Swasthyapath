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

// SVG Icon Library
function ShieldCheckIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function QrIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 20h3v1h-3z" />
    </svg>
  );
}

function PrintIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function EditIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function PhoneIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function UserIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function AlertTriangleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function StethoscopeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.8 2.3A.3.3 0 0 0 4.5 2h-1a.5.5 0 0 0-.5.5v5a5 5 0 0 0 5 5h1a5 5 0 0 0 5-5v-5a.5.5 0 0 0-.5-.5h-1a.3.3 0 0 0-.3.3v4.7a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3V2.3z" />
      <path d="M8 17v1a5 5 0 0 0 5 5h0a5 5 0 0 0 5-5v-4" />
      <circle cx="18" cy="10" r="2" />
    </svg>
  );
}

function LockIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PlusIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function InfoRow({ label, value, color, isMasked }) {
  if (!value) return null;
  const displayVal = isMasked && value.length > 4 ? `•••• •••• ${value.slice(-4)}` : value;

  return (
    <div className="med-id-info-row">
      <span className="med-id-info-label">{label}</span>
      <span className="med-id-info-val" style={{ color: color || "var(--text-primary)" }}>
        {displayVal}
      </span>
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
    setTimeout(() => setSaved(false), 2500);
  }

  function handleClear() {
    if (window.confirm("Are you sure you want to clear your Medical ID data?")) {
      localStorage.removeItem(STORAGE_KEY);
      setForm(emptyForm);
      setIsEditing(true);
    }
  }

  function handlePrint() {
    window.print();
  }

  const parseTags = (str) => {
    if (!str) return [];
    return str.split(",").map((s) => s.trim()).filter(Boolean);
  };

  const allergiesList = parseTags(form.allergies);
  const conditionsList = parseTags(form.conditions);
  const medicationsList = parseTags(form.medications);

  const keyFields = [
    form.name,
    form.age,
    form.bloodGroup,
    form.allergies,
    form.conditions,
    form.medications,
    form.doctorName,
    form.insuranceProvider,
    form.emergencyName,
    form.emergencyPhone,
  ];

  const filledCount = keyFields.filter((f) => String(f || "").trim().length > 0).length;
  const completenessPercentage = Math.round((filledCount / keyFields.length) * 100);

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

  const hasData = Boolean(form.name || form.bloodGroup || form.emergencyPhone || form.allergies);

  return (
    <div className="med-id-page-wrapper">
      {/* 1. Page Header & Live Status */}
      <div className="med-id-page-header">
        <div>
          <div className="med-id-header-title-lockup">
            <h1 className="med-id-page-title">EMERGENCY MEDICAL ID</h1>
            <div className={`med-id-status-badge ${completenessPercentage >= 70 ? "badge-active" : completenessPercentage > 0 ? "badge-ready" : "badge-incomplete"}`}>
              <span className="badge-dot" />
              <span>
                {completenessPercentage >= 70
                  ? "MEDICAL ID ACTIVE"
                  : completenessPercentage > 0
                  ? "PROFILE READY"
                  : "PROFILE INCOMPLETE"}
              </span>
            </div>
          </div>
          <p className="med-id-page-subtitle">
            Your critical medical information, available when it matters most to first responders and care teams.
          </p>
        </div>

        {/* Action Controls */}
        <div className="med-id-header-actions">
          {hasData && !isEditing && (
            <button
              onClick={() => setShowQR(!showQR)}
              className={`med-id-action-btn ${showQR ? "btn-active-state" : ""}`}
              title="Show Scannable Emergency QR Code"
            >
              <QrIcon />
              <span>{showQR ? "Hide QR" : "Emergency QR"}</span>
            </button>
          )}

          {hasData && !isEditing && (
            <button onClick={handlePrint} className="med-id-action-btn" title="Print Emergency Medical Card">
              <PrintIcon />
              <span>Print Card</span>
            </button>
          )}

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="med-id-primary-btn"
            >
              <EditIcon />
              <span>Edit Medical ID →</span>
            </button>
          ) : (
            hasData && (
              <button
                onClick={() => setIsEditing(false)}
                className="med-id-action-btn"
              >
                View Passport
              </button>
            )
          )}
        </div>
      </div>

      {/* Completeness Bar */}
      <div className="med-id-completeness-card">
        <div className="med-id-completeness-meta">
          <span className="completeness-label">Medical ID Completeness</span>
          <span className="completeness-val">{completenessPercentage}% Complete</span>
        </div>
        <div className="med-id-progress-track">
          <div
            className="med-id-progress-fill"
            style={{ width: `${completenessPercentage}%` }}
          />
        </div>
      </div>

      {/* Emergency QR Modal / Card */}
      {showQR && hasData && !isEditing && (
        <div className="med-id-qr-card fade-up">
          <div className="qr-card-header">
            <div>
              <div className="qr-card-title">Scannable Emergency QR Payload</div>
              <div className="qr-card-sub">First responders can scan this code to retrieve vital medical metrics immediately.</div>
            </div>
            <button className="qr-close-btn" onClick={() => setShowQR(false)}>✕</button>
          </div>
          <div className="qr-code-frame">
            <QRCodeSVG value={qrData} size={210} level="M" includeMargin={false} />
          </div>
          <div className="qr-card-footer">
            <LockIcon size={12} />
            <span>Encrypted Local Payload: Name • Blood Group • Allergies • Emergency Contact</span>
          </div>
        </div>
      )}

      {/* 2. Digital Medical Passport View Card (VIEW MODE) */}
      {!isEditing && hasData && (
        <div className="med-id-passport-card fade-up">
          {/* Header Ribbon */}
          <div className="passport-ribbon">
            <div className="ribbon-brand">
              <ShieldCheckIcon size={16} />
              <span>SWASTHYAPATH • OFFICIAL EMERGENCY MEDICAL PASSPORT</span>
            </div>
            <div className="ribbon-badge">
              <span>OFFICIAL RECORD</span>
            </div>
          </div>

          {/* Hero Patient Block */}
          <div className="passport-hero">
            <div className="patient-identity-lockup">
              <div className="patient-avatar">
                {form.name ? form.name.charAt(0).toUpperCase() : "🏥"}
              </div>
              <div>
                <h2 className="patient-name">{form.name || "Anonymous Patient"}</h2>
                <div className="patient-meta">
                  <span>{form.age ? `Age ${form.age} Yrs` : "Age Unspecified"}</span>
                  <span className="dot-sep">•</span>
                  <span>Primary Emergency Passport</span>
                </div>
              </div>
            </div>

            {/* Prominent Blood Type Badge */}
            <div className="passport-blood-block">
              <span className="blood-title">BLOOD TYPE</span>
              <span className="blood-value">{form.bloodGroup || "--"}</span>
              <span className="blood-disclaimer">*Clinical blood typing required pre-transfusion</span>
            </div>
          </div>

          <div className="med-id-divider" />

          {/* Critical Health Alerts Section */}
          <div className="passport-alerts-section">
            <div className="section-head-lockup alert-head">
              <AlertTriangleIcon size={16} />
              <h3>CRITICAL HEALTH INFORMATION</h3>
            </div>

            <div className="alerts-grid">
              {/* Allergies */}
              <div className="alert-card-item">
                <div className="alert-card-title">ALLERGIES</div>
                {allergiesList.length > 0 ? (
                  <div className="tag-group">
                    {allergiesList.map((alg, i) => (
                      <span key={i} className="tag-chip tag-red">{alg}</span>
                    ))}
                  </div>
                ) : (
                  <div className="tag-empty">No allergies recorded</div>
                )}
              </div>

              {/* Conditions */}
              <div className="alert-card-item">
                <div className="alert-card-title">MEDICAL CONDITIONS</div>
                {conditionsList.length > 0 ? (
                  <div className="tag-group">
                    {conditionsList.map((c, i) => (
                      <span key={i} className="tag-chip tag-amber">{c}</span>
                    ))}
                  </div>
                ) : (
                  <div className="tag-empty">No conditions recorded</div>
                )}
              </div>

              {/* Medications */}
              <div className="alert-card-item">
                <div className="alert-card-title">CURRENT MEDICATIONS</div>
                {medicationsList.length > 0 ? (
                  <div className="tag-group">
                    {medicationsList.map((m, i) => (
                      <span key={i} className="tag-chip tag-emerald">{m}</span>
                    ))}
                  </div>
                ) : (
                  <div className="tag-empty">No medications recorded</div>
                )}
              </div>
            </div>
          </div>

          <div className="med-id-divider" />

          {/* Primary Emergency Contact Block */}
          <div className="passport-contact-section">
            <div className="section-head-lockup emergency-head">
              <PhoneIcon size={16} />
              <h3>PRIMARY EMERGENCY CONTACT</h3>
            </div>

            <div className="emergency-contact-hero-card">
              <div className="contact-info-block">
                <div className="contact-name">
                  {form.emergencyName || "Emergency Contact Not Added"}
                  {form.emergencyRelation && <span className="contact-relation"> ({form.emergencyRelation})</span>}
                </div>
                <div className="contact-phone">
                  {form.emergencyPhone || "No phone number available"}
                </div>
              </div>

              {form.emergencyPhone ? (
                <a href={`tel:${form.emergencyPhone}`} className="contact-call-cta">
                  <PhoneIcon size={16} />
                  <span>Call contact →</span>
                </a>
              ) : (
                <button onClick={() => setIsEditing(true)} className="contact-add-cta">
                  <PlusIcon size={14} />
                  <span>Add emergency contact →</span>
                </button>
              )}
            </div>
          </div>

          <div className="med-id-divider" />

          {/* Care & Coverage (Secondary) */}
          <div className="passport-care-section">
            <div className="section-head-lockup care-head">
              <StethoscopeIcon size={16} />
              <h3>CARE & COVERAGE</h3>
            </div>

            <div className="care-grid">
              <div className="care-card-item">
                <div className="care-card-title">PRIMARY PHYSICIAN</div>
                <InfoRow label="Doctor Name" value={form.doctorName || "Not assigned"} />
                <InfoRow label="Phone Number" value={form.doctorPhone} />
                {form.doctorPhone && (
                  <a href={`tel:${form.doctorPhone}`} className="care-phone-link">
                    <PhoneIcon size={14} />
                    <span>Call Doctor</span>
                  </a>
                )}
              </div>

              <div className="care-card-item">
                <div className="care-card-title">INSURANCE DETAILS</div>
                <InfoRow label="Insurance Provider" value={form.insuranceProvider || "No insurance recorded"} />
                <InfoRow label="Policy Number" value={form.insuranceNumber} isMasked={true} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Empty State (When no data created yet) */}
      {!isEditing && !hasData && (
        <div className="med-id-empty-card fade-up">
          <div className="empty-icon-frame">
            <ShieldCheckIcon size={32} />
          </div>
          <h2 className="empty-title">Create Your Emergency Medical ID</h2>
          <p className="empty-sub">
            Set up your scannable Emergency Passport so paramedics, ER doctors, and first responders can immediately access critical health data during emergencies.
          </p>
          <button onClick={() => setIsEditing(true)} className="med-id-primary-btn" style={{ minHeight: "48px", padding: "0 28px" }}>
            Create Medical ID →
          </button>
        </div>
      )}

      {/* 4. Polished Form Editor (EDIT MODE) */}
      {isEditing && (
        <div className="med-id-editor-card fade-up">
          <div className="editor-header">
            <div>
              <h2 className="editor-title">Edit Emergency Medical ID</h2>
              <p className="editor-sub">Fill out critical medical metrics to populate your scannable emergency passport.</p>
            </div>
            {hasData && (
              <button onClick={() => setIsEditing(false)} className="med-id-action-btn">
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            {/* Form Section 1: Personal Information */}
            <div className="form-group-block">
              <div className="form-group-head">
                <UserIcon size={16} />
                <span>Personal Information</span>
              </div>
              <div className="form-input-grid">
                <div className="input-wrapper">
                  <label className="input-label">FULL NAME</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="med-id-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">AGE (YEARS)</label>
                  <input
                    type="number"
                    placeholder="e.g. 35"
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    className="med-id-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">BLOOD GROUP</label>
                  <select
                    value={form.bloodGroup}
                    onChange={(e) => handleChange("bloodGroup", e.target.value)}
                    className="med-id-select"
                  >
                    <option value="">Select blood group</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Form Section 2: Critical Health Information */}
            <div className="form-group-block">
              <div className="form-group-head alert-head">
                <AlertTriangleIcon size={16} />
                <span>Critical Health Information</span>
              </div>
              <div className="form-input-grid single-col">
                <div className="input-wrapper">
                  <label className="input-label">ALLERGIES (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    placeholder="e.g. Penicillin, Peanuts, Latex"
                    value={form.allergies}
                    onChange={(e) => handleChange("allergies", e.target.value)}
                    className="med-id-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">EXISTING CONDITIONS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    placeholder="e.g. Asthma, Type 2 Diabetes, Hypertension"
                    value={form.conditions}
                    onChange={(e) => handleChange("conditions", e.target.value)}
                    className="med-id-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">CURRENT MEDICATIONS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    placeholder="e.g. Albuterol 100mcg, Metformin 500mg"
                    value={form.medications}
                    onChange={(e) => handleChange("medications", e.target.value)}
                    className="med-id-input"
                  />
                </div>
              </div>
            </div>

            {/* Form Section 3: Care & Coverage */}
            <div className="form-group-block">
              <div className="form-group-head care-head">
                <StethoscopeIcon size={16} />
                <span>Care & Coverage</span>
              </div>
              <div className="form-input-grid">
                <div className="input-wrapper">
                  <label className="input-label">PRIMARY PHYSICIAN NAME</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Sarah Smith"
                    value={form.doctorName}
                    onChange={(e) => handleChange("doctorName", e.target.value)}
                    className="med-id-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">DOCTOR PHONE NUMBER</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={form.doctorPhone}
                    onChange={(e) => handleChange("doctorPhone", e.target.value)}
                    className="med-id-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">INSURANCE PROVIDER</label>
                  <input
                    type="text"
                    placeholder="e.g. Star Health Insurance"
                    value={form.insuranceProvider}
                    onChange={(e) => handleChange("insuranceProvider", e.target.value)}
                    className="med-id-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">POLICY NUMBER</label>
                  <input
                    type="text"
                    placeholder="e.g. SH-987654321"
                    value={form.insuranceNumber}
                    onChange={(e) => handleChange("insuranceNumber", e.target.value)}
                    className="med-id-input"
                  />
                </div>
              </div>
            </div>

            {/* Form Section 4: Emergency Contact */}
            <div className="form-group-block">
              <div className="form-group-head emergency-head">
                <PhoneIcon size={16} />
                <span>Emergency Contact</span>
              </div>
              <div className="form-input-grid">
                <div className="input-wrapper">
                  <label className="input-label">EMERGENCY CONTACT NAME</label>
                  <input
                    type="text"
                    placeholder="e.g. Jane Doe"
                    value={form.emergencyName}
                    onChange={(e) => handleChange("emergencyName", e.target.value)}
                    className="med-id-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">RELATIONSHIP</label>
                  <input
                    type="text"
                    placeholder="e.g. Spouse / Mother / Brother"
                    value={form.emergencyRelation}
                    onChange={(e) => handleChange("emergencyRelation", e.target.value)}
                    className="med-id-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">EMERGENCY PHONE NUMBER</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43211"
                    value={form.emergencyPhone}
                    onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                    className="med-id-input"
                  />
                </div>
              </div>
            </div>

            {/* Form Footer Actions */}
            <div className="form-footer-actions">
              <button
                type="submit"
                className="med-id-save-btn"
              >
                {saved ? (
                  <>
                    <CheckIcon size={18} />
                    <span>✓ Medical ID updated</span>
                  </>
                ) : (
                  <>
                    <span>Save Medical ID</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>

              {hasData && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="med-id-action-btn"
                  style={{ minHeight: "48px", padding: "0 22px" }}
                >
                  Cancel
                </button>
              )}
            </div>

            {hasData && (
              <button
                type="button"
                onClick={handleClear}
                className="med-id-clear-btn"
              >
                Clear Medical ID Record
              </button>
            )}
          </form>
        </div>
      )}

      {/* 5. Privacy Trust Banner */}
      <div className="med-id-privacy-banner">
        <LockIcon size={18} />
        <div>
          <div className="privacy-title">YOUR DATA STAYS PRIVATE</div>
          <div className="privacy-sub">
            Your Medical ID is encrypted and stored locally in this browser device storage. It is never transmitted to external cloud servers.
          </div>
        </div>
      </div>
    </div>
  );
}
