import React from "react";
import LiveECGMonitor from "../components/LiveECGMonitor";

const features = [
  {
    id: "home",
    title: "AI Symptom Triage",
    description: "Understand what may be happening and what to do next.",
    action: "Start assessment",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "firstaid",
    title: "First Aid Guide",
    description: "Clear step-by-step procedures for urgent situations.",
    action: "Open guide",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "medicalid",
    title: "Medical ID",
    description: "Keep allergies, contacts, and critical records accessible.",
    action: "Manage ID",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10h5M8 14h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "history",
    title: "Triage History",
    description: "Review past assessments and recommended facilities.",
    action: "View records",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "chat",
    title: "Doctor Consultation",
    description: "Create a room for real-time chat or video support.",
    action: "Start consult",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4.5A8 8 0 1 1 21 12Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "sos",
    title: "SOS Emergency",
    description: "Trigger emergency contacts and location sharing quickly.",
    action: "Emergency assistance",
    emergency: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v6M12 16.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "admin",
    title: "Admin Dashboard",
    description: "Monitor triage patterns, severity, and recent activity.",
    action: "Open dashboard",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="4" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="4" y="14" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="14" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "settings",
    title: "Settings",
    description: "Tune language, accessibility, and emergency preferences.",
    action: "Personalize",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M19 15a1.6 1.6 0 0 0 .32 1.76l.04.04a2 2 0 1 1-2.83 2.83l-.04-.04A1.6 1.6 0 0 0 14.73 19 1.6 1.6 0 0 0 13.8 20.45V21a1.8 1.8 0 1 1-3.6 0v-.55A1.6 1.6 0 0 0 9.27 19a1.6 1.6 0 0 0-1.76.32l-.04.04a2 2 0 1 1-2.83-2.83l.04-.04A1.6 1.6 0 0 0 5 14.73a1.6 1.6 0 0 0-1.45-.93H3a1.8 1.8 0 1 1 0-3.6h.55A1.6 1.6 0 0 0 5 9.27a1.6 1.6 0 0 0-.32-1.76l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04A1.6 1.6 0 0 0 9.27 5a1.6 1.6 0 0 0 .93-1.45V3a1.8 1.8 0 1 1 3.6 0v.55A1.6 1.6 0 0 0 14.73 5a1.6 1.6 0 0 0 1.76-.32l.04-.04a2 2 0 1 1 2.83 2.83l-.04.04A1.6 1.6 0 0 0 19 9.27a1.6 1.6 0 0 0 1.45.93H21a1.8 1.8 0 1 1 0 3.6h-.55A1.6 1.6 0 0 0 19 15Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const steps = [
  ["01", "Describe symptoms", "Use natural language or voice input."],
  ["02", "Get guided triage", "Severity, do-now advice, and required facilities."],
  ["03", "Find care nearby", "GPS-matched hospitals and emergency actions."],
  ["04", "Stay connected", "Doctor chat, video, contacts, and records."],
];

const trustBadges = [
  ["6 Languages", "Regional access"],
  ["Offline Ready", "First aid works locally"],
  ["Real GPS", "Nearby hospital matching"],
  ["Voice Input", "Accessible under stress"],
  ["WebRTC", "Video consultation"],
  ["PWA Ready", "Mobile-first response"],
];

export default function LandingPage({ setPage, onSOS, onChat }) {
  function handleFeatureClick(feature) {
    if (feature.id === "chat") onChat?.();
    else if (feature.id === "sos") onSOS?.();
    else setPage(feature.id);
  }

  return (
    <div className="landing-page fade-in">
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <span className="landing-hero-badge-dot" />
            Emergency medical guidance
          </div>
          <h1 className="landing-hero-title">SwasthyaPath</h1>
          <p className="landing-hero-subtitle">
            Emergency medical guidance, when every second matters.
          </p>
          <p className="landing-hero-description">
            Describe symptoms, understand urgency, find nearby hospitals, and connect to help through a calm healthcare command center designed for stressful moments.
          </p>
          <div className="landing-hero-actions">
            <button className="landing-cta-primary" onClick={() => setPage("home")}>
              Start Emergency Guide
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="landing-cta-secondary"
              onClick={() => document.getElementById("landing-features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Features
            </button>
          </div>
        </div>

        <div className="landing-command" aria-label="Emergency readiness preview">
          <div className="command-strip">
            <div>
              <div className="command-label">Mode</div>
              <div className="command-value">Emergency Ready</div>
            </div>
            <div>
              <div className="command-label">Response</div>
              <div className="command-value" style={{ color: "var(--teal-mid)" }}>Guided</div>
            </div>
          </div>
          <div className="vitals-line">
            <LiveECGMonitor bpm={72} />
          </div>
          <div className="command-strip">
            <div>
              <div className="command-label">Primary action</div>
              <div className="command-value">Call 112</div>
            </div>
            <div>
              <div className="command-label">Support</div>
              <div className="command-value">Hospitals + Doctor</div>
            </div>
          </div>
        </div>
      </section>

      <section id="landing-features" className="landing-section">
        <div className="landing-section-header">
          <span className="landing-section-eyebrow">Features</span>
          <h2 className="landing-section-title">One system for the first minutes of care.</h2>
          <p className="landing-section-desc">
            Each tool stays focused, scan-friendly, and medically responsible without competing with critical emergency actions.
          </p>
        </div>

        <div className="landing-features-grid">
          {features.map((f) => (
            <button
              key={f.id}
              className="landing-feature-card"
              onClick={() => handleFeatureClick(f)}
              style={f.emergency ? { borderColor: "rgba(225,29,72,0.55)" } : undefined}
            >
              <span
                className="landing-feature-icon"
                style={f.emergency ? { color: "var(--alert)", borderColor: "rgba(225,29,72,0.3)", background: "var(--alert-light)" } : undefined}
              >
                {f.icon}
              </span>
              <span>
                <span className="landing-feature-title">{f.title}</span>
                <span className="landing-feature-desc" style={{ display: "block", marginTop: 6 }}>
                  {f.description}
                </span>
              </span>
              <span className="landing-feature-action" style={f.emergency ? { color: "var(--alert)" } : undefined}>
                {f.action} →
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section-header">
          <span className="landing-section-eyebrow">Flow</span>
          <h2 className="landing-section-title">Built for decisions under pressure.</h2>
        </div>
        <div className="landing-steps">
          {steps.map(([num, title, desc]) => (
            <div className="landing-step-card" key={num}>
              <div className="landing-step-number">{num}</div>
              <h3 className="landing-step-title">{title}</h3>
              <p className="landing-step-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-trust-grid">
          {trustBadges.map(([label, sublabel]) => (
            <div key={label} className="landing-trust-badge">
              <div className="landing-trust-label">{label}</div>
              <div className="landing-trust-sublabel">{sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <strong style={{ color: "var(--text-primary)" }}>SwasthyaPath</strong>
          <span>Emergency guidance, hospital matching, first aid, and medical ID in one place.</span>
        </div>
      </footer>
    </div>
  );
}
