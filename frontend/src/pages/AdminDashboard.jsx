import React from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const ADMIN_KEY = "swasthya-admin-2024";

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: "var(--bg-card)", border: "0.5px solid var(--border)",
      borderRadius: "12px", padding: "1rem 1.25rem",
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "28px", fontWeight: "500", color: "var(--text-primary)" }}>{value}</div>
      {sub && <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>{sub}</div>}
    </div>
  );
}

function BarChart({ data, max, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {data.map((item) => (
        <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", width: "120px", flexShrink: 0, textTransform: "capitalize" }}>
            {item.name}
          </div>
          <div style={{ flex: 1, background: "var(--bg-secondary)", borderRadius: "4px", height: "20px", overflow: "hidden" }}>
            <div style={{
              width: `${Math.round((item.count / max) * 100)}%`,
              height: "100%", background: color, borderRadius: "4px",
              transition: "width 0.5s ease",
              minWidth: item.count > 0 ? "4px" : "0",
            }} />
          </div>
          <div style={{ fontSize: "12px", fontWeight: "500", color: "var(--text-primary)", width: "28px", textAlign: "right" }}>
            {item.count}
          </div>
        </div>
      ))}
    </div>
  );
}

function WeekChart({ data }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
      {data.map((d) => (
        <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{d.count}</div>
          <div style={{
            width: "100%", background: "#D85A30", borderRadius: "4px 4px 0 0",
            height: `${Math.round((d.count / max) * 56)}px`,
            minHeight: d.count > 0 ? "4px" : "0",
            transition: "height 0.5s ease",
          }} />
          <div style={{ fontSize: "10px", color: "var(--text-tertiary)", textAlign: "center" }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [lastRefresh, setLastRefresh] = React.useState(null);

  async function fetchStats() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: { "x-admin-key": ADMIN_KEY },
      });
      if (!res.ok) throw new Error("Unauthorized or server error");
      const data = await res.json();
      setStats(data);
      setLastRefresh(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchStats();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const severityColors = {
    critical: "#E24B4A",
    urgent: "#EF9F27",
    moderate: "#639922",
  };

  return (
    <div style={{
      maxWidth: "900px", margin: "0 auto",
      padding: "1.5rem 1rem 3rem",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "1.5rem", paddingBottom: "1rem",
        borderBottom: "0.5px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "#D85A30", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "18px", fontWeight: "500", color: "var(--text-primary)" }}>
              SwasthyaPath Admin
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Usage dashboard · Auto-refreshes every 30s
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {lastRefresh && (
            <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
              Last updated: {lastRefresh}
            </span>
          )}
          <button
            onClick={fetchStats}
            style={{
              padding: "6px 14px", border: "0.5px solid var(--border)",
              borderRadius: "8px", background: "var(--bg-card)",
              color: "var(--text-primary)", fontSize: "13px", cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            border: "2px solid #F5C4B3", borderTopColor: "#D85A30",
            animation: "spin 0.85s linear infinite", margin: "0 auto 12px",
          }} />
          Loading stats...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {error && (
        <div style={{
          background: "#FCEBEB", border: "0.5px solid #F09595",
          borderRadius: "12px", padding: "1rem 1.25rem", color: "#501313",
        }}>
          Error: {error}
        </div>
      )}

      {stats && !loading && (
        <>
          {/* Top stat cards */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px", marginBottom: "1.5rem",
          }}>
            <StatCard label="Total requests" value={stats.totalCount} sub="All time" color="#D85A30" />
            <StatCard label="Today" value={stats.todayCount} sub="Requests today" color="#185FA5" />
            <StatCard label="Critical" value={stats.severityBreakdown.critical} sub="All time" color="#E24B4A" />
            <StatCard label="Urgent" value={stats.severityBreakdown.urgent} sub="All time" color="#EF9F27" />
            <StatCard label="Moderate" value={stats.severityBreakdown.moderate} sub="All time" color="#639922" />
          </div>

          {/* Charts row */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "12px", marginBottom: "1.5rem",
          }}>
            {/* Weekly trend */}
            <div style={{
              background: "var(--bg-card)", border: "0.5px solid var(--border)",
              borderRadius: "12px", padding: "1rem 1.25rem",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "1rem" }}>
                Requests — last 7 days
              </div>
              <WeekChart data={stats.last7Days} />
            </div>

            {/* Severity pie-style */}
            <div style={{
              background: "var(--bg-card)", border: "0.5px solid var(--border)",
              borderRadius: "12px", padding: "1rem 1.25rem",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "1rem" }}>
                Severity breakdown
              </div>
              {Object.entries(stats.severityBreakdown).map(([sev, count]) => {
                const total = stats.totalCount || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={sev} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                      <span style={{ color: "var(--text-secondary)", textTransform: "capitalize" }}>{sev}</span>
                      <span style={{ fontWeight: "500", color: "var(--text-primary)" }}>{count} ({pct}%)</span>
                    </div>
                    <div style={{ background: "var(--bg-secondary)", borderRadius: "4px", height: "8px" }}>
                      <div style={{
                        width: `${pct}%`, height: "100%",
                        background: severityColors[sev],
                        borderRadius: "4px", transition: "width 0.5s ease",
                        minWidth: count > 0 ? "4px" : "0",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Symptoms + Facilities row */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "12px", marginBottom: "1.5rem",
          }}>
            {/* Top symptoms */}
            <div style={{
              background: "var(--bg-card)", border: "0.5px solid var(--border)",
              borderRadius: "12px", padding: "1rem 1.25rem",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "1rem" }}>
                Most common symptoms
              </div>
              {stats.topSymptoms.length > 0
                ? <BarChart data={stats.topSymptoms} max={Math.max(...stats.topSymptoms.map((s) => s.count))} color="#D85A30" />
                : <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>No data yet</div>
              }
            </div>

            {/* Top facilities */}
            <div style={{
              background: "var(--bg-card)", border: "0.5px solid var(--border)",
              borderRadius: "12px", padding: "1rem 1.25rem",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "1rem" }}>
                Most needed facilities
              </div>
              {stats.topFacilities.length > 0
                ? <BarChart data={stats.topFacilities} max={Math.max(...stats.topFacilities.map((f) => f.count))} color="#185FA5" />
                : <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>No data yet</div>
              }
            </div>
          </div>

          {/* Recent activity */}
          <div style={{
            background: "var(--bg-card)", border: "0.5px solid var(--border)",
            borderRadius: "12px", padding: "1rem 1.25rem",
          }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "1rem" }}>
              Recent activity
            </div>
            {stats.recent.length === 0 && (
              <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>No requests yet — submit symptoms in the app first.</div>
            )}
            {stats.recent.map((r) => (
              <div key={r.id} style={{
                display: "flex", alignItems: "flex-start", gap: "10px",
                padding: "10px 0", borderBottom: "0.5px solid var(--border)",
              }}>
                <span style={{
                  padding: "2px 8px", borderRadius: "20px", fontSize: "11px",
                  fontWeight: "500", flexShrink: 0,
                  background: r.severity === "critical" ? "#FCEBEB" : r.severity === "urgent" ? "#FAEEDA" : "#EAF3DE",
                  color: r.severity === "critical" ? "#501313" : r.severity === "urgent" ? "#412402" : "#173404",
                }}>
                  {r.severity}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", color: "var(--text-primary)", marginBottom: "2px" }}>
                    {r.symptoms}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                    {r.facilities?.join(", ")} · {new Date(r.timestamp).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}