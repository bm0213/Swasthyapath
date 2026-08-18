import React from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

/* Vector SVG Icons */
function BrandCrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5V19" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function AlertCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="admin-auth-submit-arrow">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function AdminLogin({ onSuccess, onBack }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // Theme support
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem("swasthya-theme");
    return saved ? saved === "dark" : true;
  });

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("swasthya-theme", isDark ? "dark" : "light");
  }, [isDark]);

  async function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser && !trimmedPass) {
      setError("Username and password are required.");
      return;
    }
    if (!trimmedUser) {
      setError("Username is required.");
      return;
    }
    if (!trimmedPass) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmedUser, password: trimmedPass }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem("admin-auth", "true");
        onSuccess();
      } else {
        setError(data.error || "Invalid username or password.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-auth-page">
      {/* Dedicated Clean Admin Header */}
      <header className="admin-auth-header">
        <button
          type="button"
          className="admin-auth-brand"
          onClick={onBack}
          aria-label="SwasthyaPath Medical Command Center — Back to Public Portal"
        >
          <div className="admin-auth-brand-icon">
            <BrandCrossIcon />
          </div>
          <div className="admin-auth-brand-text">
            <div className="admin-auth-brand-title-row">
              <span className="admin-auth-brand-name">SwasthyaPath</span>
              <span className="admin-auth-brand-badge">
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#16A579" }} />
                Admin Portal
              </span>
            </div>
            <span className="admin-auth-brand-sub">Medical Command Center</span>
          </div>
        </button>

        <div className="admin-auth-header-actions">
          <button
            type="button"
            className="admin-auth-theme-btn"
            onClick={() => setIsDark((d) => !d)}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Light theme" : "Dark theme"}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {onBack && (
            <button
              type="button"
              className="admin-auth-exit-btn"
              onClick={onBack}
              aria-label="Return to Public Portal"
            >
              <ArrowLeftIcon />
              <span>Public Portal</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Authentication Area */}
      <main className="admin-auth-main">
        {/* Refined 10/10 Premium Medical Card */}
        <section className="admin-auth-card" aria-labelledby="admin-auth-heading">
          {/* Card Header with Refined Shield Icon & Proportions */}
          <div className="admin-auth-card-header">
            <div className="admin-auth-icon-wrap">
              <ShieldCheckIcon size={28} />
            </div>
            <div className="admin-auth-card-eyebrow">Admin Portal</div>
            <h1 id="admin-auth-heading" className="admin-auth-card-title">
              Secure administrator access
            </h1>
            <p className="admin-auth-card-desc">
              Access the SwasthyaPath medical operations dashboard.
            </p>
          </div>

          {/* Form */}
          <form className="admin-auth-form" onSubmit={handleLogin} noValidate>
            {/* Username */}
            <div className="admin-auth-field">
              <label htmlFor="admin-username" className="admin-auth-label">
                Username
              </label>
              <div className="admin-auth-input-container">
                <input
                  id="admin-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={loading}
                  className="admin-auth-input"
                  aria-required="true"
                  aria-invalid={!!error}
                />
                <span className="admin-auth-input-icon">
                  <UserIcon />
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="admin-auth-field">
              <label htmlFor="admin-password" className="admin-auth-label">
                Password
              </label>
              <div className="admin-auth-input-container">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={loading}
                  className="admin-auth-input admin-auth-input-password"
                  aria-required="true"
                  aria-invalid={!!error}
                />
                <span className="admin-auth-input-icon">
                  <LockIcon />
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="admin-auth-toggle-password-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="admin-auth-error" role="alert" aria-live="polite">
                <span className="admin-auth-error-icon">
                  <AlertCircleIcon />
                </span>
                <span>{error}</span>
              </div>
            )}

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="admin-auth-submit-btn"
              aria-label={loading ? "Signing in to admin operations dashboard..." : "Sign in to admin operations dashboard"}
            >
              {loading ? (
                <>
                  <span className="admin-auth-spinner" aria-hidden="true" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </form>

          {/* Refined Security Context Footer */}
          <div className="admin-auth-card-footer">
            <div className="admin-auth-footer-badge">
              <ShieldCheckIcon size={14} />
              <span>Authorized personnel only · Medical operations access</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}