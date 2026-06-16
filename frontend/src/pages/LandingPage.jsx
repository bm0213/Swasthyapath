import React from "react";

const features = [
  {
    id: "home",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 20c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI Symptom Triage",
    description: "Describe symptoms in any language. Claude AI instantly assesses severity and recommends the right hospital.",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
  },
  {
    id: "firstaid",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "First Aid Guide",
    description: "Step-by-step offline first aid for 10 emergencies — Heart Attack, Snake Bite, Burns, Drowning and more.",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  },
  {
    id: "medicalid",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 9h4M7 13h10M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Medical ID",
    description: "Store your blood group, allergies, medications, and emergency contacts — accessible anytime.",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
  },
  {
    id: "history",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "My Triage History",
    description: "View your past triage records — symptoms, severity assessments, and recommended facilities.",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  },
  {
    id: "chat",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M21 12c0 4.4-4 8-9 8-1.3 0-2.5-.2-3.6-.7L3 21l1.7-4.3C3.6 15.2 3 13.7 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12h.01M12 12h.01M15 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Doctor Chat",
    description: "Real-time chat and video consultation with volunteer doctors powered by WebRTC.",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
  },
  {
    id: "sos",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "SOS Emergency",
    description: "One-tap emergency alert with live GPS location sharing to nearby hospitals and contacts.",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
  },
  {
    id: "admin",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Admin Dashboard",
    description: "Protected admin panel with full stats, severity breakdown, symptom trends and recent activity.",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
  },
  {
    id: "settings",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Settings",
    description: "Customize language, theme, font size and accessibility preferences to suit your needs.",
    color: "#6366F1",
    gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Describe Symptoms",
    description: "Type or speak your symptoms in any of 6 supported Indian languages",
    icon: "🗣️",
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Claude AI instantly assesses severity — Critical, Urgent, or Moderate",
    icon: "🤖",
  },
  {
    step: "03",
    title: "Find Hospitals",
    description: "Real GPS locates the nearest hospitals with required facilities",
    icon: "🗺️",
  },
  {
    step: "04",
    title: "Get Help",
    description: "Call, get directions, chat with a doctor, or request an ambulance",
    icon: "🚑",
  },
];

const trustBadges = [
  { icon: "🌍", label: "6 Languages", sublabel: "Multi-lingual support" },
  { icon: "📴", label: "Offline Ready", sublabel: "Works without internet" },
  { icon: "🤖", label: "AI-Powered", sublabel: "Claude by Anthropic" },
  { icon: "📍", label: "Real GPS", sublabel: "Live location tracking" },
  { icon: "📹", label: "Video Call", sublabel: "WebRTC powered" },
  { icon: "📱", label: "PWA Ready", sublabel: "Install on mobile" },
];

export default function LandingPage({ setPage, onSOS, onChat }) {
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [visibleSections, setVisibleSections] = React.useState(new Set());

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleSections((s) => new Set([...s, "hero"])), 100),
      setTimeout(() => setVisibleSections((s) => new Set([...s, "features"])), 300),
      setTimeout(() => setVisibleSections((s) => new Set([...s, "howitworks"])), 500),
      setTimeout(() => setVisibleSections((s) => new Set([...s, "trust"])), 700),
      setTimeout(() => setVisibleSections((s) => new Set([...s, "footer"])), 850),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  function handleFeatureClick(feature) {
    if (feature.id === "chat") {
      onChat?.();
    } else if (feature.id === "sos") {
      onSOS?.();
    } else {
      setPage(feature.id);
    }
  }

  const sectionStyle = (name) => ({
    opacity: visibleSections.has(name) ? 1 : 0,
    transform: visibleSections.has(name) ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  return (
    <div className="landing-page">
      {/* === HERO === */}
      <section className="landing-hero" style={sectionStyle("hero")}>
        <div className="landing-hero-bg">
          <div className="landing-hero-orb landing-hero-orb-1" />
          <div className="landing-hero-orb landing-hero-orb-2" />
          <div className="landing-hero-orb landing-hero-orb-3" />
        </div>

        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <span className="landing-hero-badge-dot" />
            AI-Powered Emergency Response
          </div>

          <h1 className="landing-hero-title">
            <span className="landing-hero-title-gradient">SwasthyaPath</span>
          </h1>
          <p className="landing-hero-subtitle">
            Emergency Medical Triage for Rural India
          </p>
          <p className="landing-hero-description">
            Describe symptoms in any language — get instant AI-powered severity assessment, 
            find the nearest hospital, chat with a doctor, or call an ambulance. All in seconds.
          </p>

          <div className="landing-hero-actions">
            <button
              className="landing-cta-primary"
              onClick={() => setPage("home")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              Start Triage Now
              <span className="landing-cta-shimmer" />
            </button>
            <button
              className="landing-cta-secondary"
              onClick={() => {
                document.getElementById("landing-features")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Features
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

          <div className="landing-hero-stats">
            {trustBadges.slice(0, 4).map((b) => (
              <div key={b.label} className="landing-hero-stat">
                <span className="landing-hero-stat-icon">{b.icon}</span>
                <span className="landing-hero-stat-label">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURES GRID === */}
      <section
        id="landing-features"
        className="landing-section"
        style={sectionStyle("features")}
      >
        <div className="landing-section-header">
          <span className="landing-section-eyebrow">Features</span>
          <h2 className="landing-section-title">Everything You Need in an Emergency</h2>
          <p className="landing-section-desc">
            From AI-powered triage to live ambulance tracking — every tool designed to save precious time.
          </p>
        </div>

        <div className="landing-features-grid">
          {features.map((f, i) => (
            <button
              key={f.id}
              className={`landing-feature-card ${hoveredCard === i ? "landing-feature-card-hovered" : ""}`}
              onClick={() => handleFeatureClick(f)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div
                className="landing-feature-icon"
                style={{
                  background: f.gradient,
                  boxShadow: hoveredCard === i ? `0 8px 24px ${f.color}40` : `0 4px 12px ${f.color}20`,
                }}
              >
                <span style={{ color: "white" }}>{f.icon}</span>
              </div>
              <div className="landing-feature-body">
                <h3 className="landing-feature-title">{f.title}</h3>
                <p className="landing-feature-desc">{f.description}</p>
              </div>
              <div className="landing-feature-arrow" style={{ color: f.color }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="landing-section" style={sectionStyle("howitworks")}>
        <div className="landing-section-header">
          <span className="landing-section-eyebrow">How It Works</span>
          <h2 className="landing-section-title">Help in 4 Simple Steps</h2>
          <p className="landing-section-desc">
            Designed for speed and simplicity — even under extreme stress.
          </p>
        </div>

        <div className="landing-steps">
          {howItWorks.map((s, i) => (
            <React.Fragment key={s.step}>
              <div className="landing-step-card">
                <div className="landing-step-number">{s.step}</div>
                <div className="landing-step-icon">{s.icon}</div>
                <h3 className="landing-step-title">{s.title}</h3>
                <p className="landing-step-desc">{s.description}</p>
              </div>
              {i < howItWorks.length - 1 && (
                <div className="landing-step-connector">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* === TRUST BADGES === */}
      <section className="landing-section" style={sectionStyle("trust")}>
        <div className="landing-trust-grid">
          {trustBadges.map((b) => (
            <div key={b.label} className="landing-trust-badge">
              <span className="landing-trust-icon">{b.icon}</span>
              <div>
                <div className="landing-trust-label">{b.label}</div>
                <div className="landing-trust-sublabel">{b.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === CTA BANNER === */}
      <section className="landing-section" style={sectionStyle("footer")}>
        <div className="landing-cta-banner">
          <h2 className="landing-cta-banner-title">
            Every Second Counts in an Emergency
          </h2>
          <p className="landing-cta-banner-desc">
            SwasthyaPath helps you find the right hospital, right now.
          </p>
          <button className="landing-cta-primary" onClick={() => setPage("home")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Start Triage Now
            <span className="landing-cta-shimmer" />
          </button>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="landing-footer" style={sectionStyle("footer")}>
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <div className="landing-footer-logo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="landing-footer-name">SwasthyaPath</span>
          </div>
          <p className="landing-footer-tagline">
            Made with ❤️ for rural India's emergency healthcare
          </p>
        </div>
      </footer>
    </div>
  );
}
