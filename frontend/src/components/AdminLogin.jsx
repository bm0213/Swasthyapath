import React from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem("admin-auth", "true");
        onSuccess();
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleLogin();
  }

  return (
    <div style={{
      minHeight: "80vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      padding: "2rem 1.25rem",
    }}>
      <div style={{
        width: "100%", maxWidth: "380px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "16px", padding: "2rem",
        boxShadow: "var(--shadow-sm)",
      }}>
        {/* Icon */}
        <div style={{
          width: "52px", height: "52px", borderRadius: "12px",
          background: "#D85A30", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: "24px", marginBottom: "1.25rem",
        }}>
          🔐
        </div>

        <div style={{
          fontSize: "20px", fontWeight: "700",
          color: "var(--text-primary)", marginBottom: "4px",
        }}>
          Admin Login
        </div>
        <div style={{
          fontSize: "12px", color: "var(--text-tertiary)",
          marginBottom: "1.5rem",
        }}>
          Sign in to access the SwasthyaPath admin dashboard
        </div>

        {/* Username */}
        <label style={{
          fontSize: "12px", fontWeight: "600",
          color: "var(--text-secondary)", display: "block",
          marginBottom: "6px",
        }}>
          Username
        </label>
        <input
          type="text"
          placeholder="Enter admin username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%", padding: "10px 12px",
            border: "1px solid var(--border)",
            borderRadius: "9px", marginBottom: "1rem",
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            fontSize: "14px", outline: "none",
            boxSizing: "border-box",
          }}
        />

        {/* Password */}
        <label style={{
          fontSize: "12px", fontWeight: "600",
          color: "var(--text-secondary)", display: "block",
          marginBottom: "6px",
        }}>
          Password
        </label>
        <div style={{ position: "relative", marginBottom: "1.25rem" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%", padding: "10px 40px 10px 12px",
              border: "1px solid var(--border)",
              borderRadius: "9px",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              fontSize: "14px", outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute", right: "10px", top: "50%",
              transform: "translateY(-50%)",
              background: "none", border: "none",
              cursor: "pointer", fontSize: "16px",
              color: "var(--text-tertiary)",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#FCEBEB", border: "1px solid #F09595",
            borderRadius: "8px", padding: "10px 12px",
            fontSize: "13px", color: "#501313",
            marginBottom: "1rem",
          }}>
            ❌ {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%", padding: "12px",
            background: loading ? "var(--border)" : "#D85A30",
            color: "white", border: "none",
            borderRadius: "9px", fontSize: "14px",
            fontWeight: "600", cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.15s",
          }}
        >
          {loading ? "Signing in..." : "Sign in →"}
        </button>
      </div>
    </div>
  );
}