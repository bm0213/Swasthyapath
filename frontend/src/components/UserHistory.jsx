import React, { useState, useEffect } from "react";

// Clean SVG Icon Library (100% SVG, no emojis)
function LockIcon({ color = "currentColor", size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function HistoryDocIcon({ color = "currentColor", size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function SearchIcon({ color = "currentColor", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SirenIcon({ color = "currentColor", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7v4a2 2 0 0 1-2 2h18a2 2 0 0 1-2-2V9a7 7 0 0 0-7-7z" />
      <path d="M12 18v3" />
      <path d="M8 21h8" />
    </svg>
  );
}

function AlertTriangleIcon({ color = "currentColor", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckCircleIcon({ color = "currentColor", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ArrowRightIcon({ color = "currentColor", size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function TrashIcon({ color = "currentColor", size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function XIcon({ color = "currentColor", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ShieldCheckIcon({ color = "currentColor", size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// Format Date Grouping Header
function getDateGroupLabel(timestamp) {
  if (!timestamp) return "PREVIOUS ASSESSMENTS";
  const d = new Date(timestamp);
  if (isNaN(d.getTime())) return "PREVIOUS ASSESSMENTS";

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday.getTime() - 86400000);
  const startOfWeek = new Date(startOfToday.getTime() - 6 * 86400000);

  if (d >= startOfToday) return "TODAY";
  if (d >= startOfYesterday) return "YESTERDAY";
  if (d >= startOfWeek) return "THIS WEEK";

  const day = d.getDate();
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

// Format Time
function formatTime(timestamp) {
  if (!timestamp) return "";
  const d = new Date(timestamp);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export default function UserHistory({ onStartTriage }) {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [clearConfirm, setClearConfirm] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("swasthya-triage-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse triage history:", e);
      }
    }
  }, []);

  function handleSingleDelete(indexToDelete, e) {
    e.stopPropagation();
    const updated = history.filter((_, i) => i !== indexToDelete);
    setHistory(updated);
    localStorage.setItem("swasthya-triage-history", JSON.stringify(updated));
    if (activeModalItem && activeModalItem.index === indexToDelete) {
      setActiveModalItem(null);
    }
  }

  function handleClearAll() {
    if (!clearConfirm) {
      setClearConfirm(true);
      setTimeout(() => setClearConfirm(false), 4000);
      return;
    }
    localStorage.removeItem("swasthya-triage-history");
    setHistory([]);
    setClearConfirm(false);
    setActiveModalItem(null);
  }

  // Filter & Search Logic
  const filteredHistory = history.map((item, originalIndex) => ({ ...item, originalIndex })).filter((item) => {
    const sTerm = search.toLowerCase();
    const matchesSearch =
      !search ||
      (item.symptoms && item.symptoms.toLowerCase().includes(sTerm)) ||
      (item.summary && item.summary.toLowerCase().includes(sTerm)) ||
      (item.severity && item.severity.toLowerCase().includes(sTerm));

    const itemSev = (item.severity || "moderate").toLowerCase();
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "critical" && itemSev === "critical") ||
      (selectedFilter === "urgent" && itemSev === "urgent") ||
      (selectedFilter === "other" && itemSev !== "critical" && itemSev !== "urgent");

    return matchesSearch && matchesFilter;
  });

  // Group by Date Label
  const groupedData = {};
  const reversedFiltered = [...filteredHistory].reverse();
  reversedFiltered.forEach((item) => {
    const label = getDateGroupLabel(item.timestamp);
    if (!groupedData[label]) groupedData[label] = [];
    groupedData[label].push(item);
  });

  // Severity Counts for Filter Pills
  const counts = {
    all: history.length,
    critical: history.filter((h) => (h.severity || "").toLowerCase() === "critical").length,
    urgent: history.filter((h) => (h.severity || "").toLowerCase() === "urgent").length,
    other: history.filter(
      (h) => (h.severity || "").toLowerCase() !== "critical" && (h.severity || "").toLowerCase() !== "urgent"
    ).length,
  };

  // Render Empty State when no history items exist
  if (history.length === 0) {
    return (
      <div className="hs-page-wrapper fade-up">
        {/* Header */}
        <div className="hs-header">
          <div>
            <div className="hs-title-lockup">
              <h1 className="hs-page-title">MY TRIAGE HISTORY</h1>
              <span className="hs-privacy-pill" title="History is saved locally in your browser storage">
                <LockIcon color="#16A579" size={13} />
                <span>STORED SECURELY ON THIS DEVICE</span>
              </span>
            </div>
            <p className="hs-page-subtitle">
              Your private record of previous emergency assessments.
            </p>
          </div>
        </div>

        {/* Premium Compact Empty State Card */}
        <div className="hs-empty-card">
          <div className="hs-empty-icon-frame">
            <HistoryDocIcon color="#16A579" size={32} />
          </div>
          <h2 className="hs-empty-title">No triage records yet</h2>
          <p className="hs-empty-sub">
            Your completed emergency assessments will appear here for quick reference and clinical history.
          </p>
          <button
            type="button"
            className="hs-empty-cta"
            onClick={() => {
              if (onStartTriage) onStartTriage();
              else window.location.hash = "#/";
            }}
          >
            Start a triage →
          </button>
        </div>
      </div>
    );
  }

  // Render Populated History
  return (
    <div className="hs-page-wrapper fade-up">
      {/* Header */}
      <div className="hs-header">
        <div>
          <div className="hs-title-lockup">
            <h1 className="hs-page-title">MY TRIAGE HISTORY</h1>
            <span className="hs-count-badge">
              {history.length} assessment{history.length > 1 ? "s" : ""}
            </span>
          </div>
          <p className="hs-page-subtitle">
            Your private record of previous emergency assessments.
          </p>
        </div>

        <div className="hs-privacy-pill" title="History is saved locally in your browser storage">
          <LockIcon color="#16A579" size={13} />
          <span>STORED SECURELY ON THIS DEVICE</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="hs-controls-row">
        {/* Search Field */}
        <div className={`hs-search-field ${searchFocused ? "focused" : ""}`}>
          <SearchIcon color="var(--text-tertiary)" size={16} />
          <input
            type="text"
            className="hs-search-input"
            placeholder="Search triage history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search triage history"
          />
          {search && (
            <button className="hs-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>

        {/* Severity Filter Pills */}
        <div className="hs-filter-bar">
          <button
            className={`hs-filter-pill ${selectedFilter === "all" ? "active" : ""}`}
            onClick={() => setSelectedFilter("all")}
          >
            All <span className="pill-count">{counts.all}</span>
          </button>
          <button
            className={`hs-filter-pill critical-pill ${selectedFilter === "critical" ? "active" : ""}`}
            onClick={() => setSelectedFilter("critical")}
          >
            Critical <span className="pill-count">{counts.critical}</span>
          </button>
          <button
            className={`hs-filter-pill urgent-pill ${selectedFilter === "urgent" ? "active" : ""}`}
            onClick={() => setSelectedFilter("urgent")}
          >
            Urgent <span className="pill-count">{counts.urgent}</span>
          </button>
          <button
            className={`hs-filter-pill ${selectedFilter === "other" ? "active" : ""}`}
            onClick={() => setSelectedFilter("other")}
          >
            Other <span className="pill-count">{counts.other}</span>
          </button>
        </div>
      </div>

      {/* Filtered 0 Results State */}
      {filteredHistory.length === 0 && (
        <div className="hs-no-results-card">
          <p className="hs-no-results-text">
            No history records match "<strong>{search}</strong>" in the selected filter.
          </p>
          <button
            className="hs-reset-filter-btn"
            onClick={() => {
              setSearch("");
              setSelectedFilter("all");
            }}
          >
            Clear Search & Filters
          </button>
        </div>
      )}

      {/* Grouped History List */}
      {Object.keys(groupedData).map((dateGroup) => (
        <div key={dateGroup} className="hs-group-block">
          <div className="hs-group-header">
            <span className="group-dot" />
            <span>{dateGroup}</span>
          </div>

          <div className="hs-records-list">
            {groupedData[dateGroup].map((item) => {
              const sev = (item.severity || "moderate").toLowerCase();
              const isCritical = sev === "critical";
              const isUrgent = sev === "urgent";

              return (
                <div
                  key={item.originalIndex}
                  className={`hs-record-card ${sev}`}
                  onClick={() => setActiveModalItem(item)}
                >
                  {/* Top Meta Line */}
                  <div className="hs-record-top">
                    <div className="hs-severity-tag-lockup">
                      <span className={`hs-severity-tag badge-${sev}`}>
                        {isCritical && <SirenIcon color="#E11D48" size={14} />}
                        {isUrgent && <AlertTriangleIcon color="#D97706" size={14} />}
                        {!isCritical && !isUrgent && <CheckCircleIcon color="#16A579" size={14} />}
                        {sev.toUpperCase()}
                      </span>
                      <span className="hs-record-time">{formatTime(item.timestamp)}</span>
                    </div>

                    <button
                      className="hs-delete-single-btn"
                      onClick={(e) => handleSingleDelete(item.originalIndex, e)}
                      title="Delete this record"
                      aria-label="Delete this record"
                    >
                      <TrashIcon color="var(--text-tertiary)" size={14} />
                    </button>
                  </div>

                  {/* Symptoms Summary */}
                  <h3 className="hs-record-symptoms">{item.symptoms}</h3>

                  {/* Clinical Summary snippet */}
                  {item.summary && (
                    <p className="hs-record-summary">{item.summary}</p>
                  )}

                  {/* Required Facilities Pills */}
                  {item.facilities && item.facilities.length > 0 && (
                    <div className="hs-record-facilities">
                      {item.facilities.map((fac) => (
                        <span key={fac} className="fac-pill">
                          {fac}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Action Footer */}
                  <div className="hs-record-footer">
                    <span className="hs-view-action">View assessment</span>
                    <ArrowRightIcon color="currentColor" size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Footer Clear All Action */}
      <div className="hs-footer-bar">
        <button
          type="button"
          className={`hs-clear-all-btn ${clearConfirm ? "confirm-state" : ""}`}
          onClick={handleClearAll}
        >
          <TrashIcon color="currentColor" size={14} />
          {clearConfirm ? "Click again to confirm clearing history" : "Clear all triage history"}
        </button>
      </div>

      {/* Clinical Record Detail Modal */}
      {activeModalItem && (
        <div className="hs-modal-backdrop" onClick={() => setActiveModalItem(null)}>
          <div className="hs-modal-card fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="hs-modal-header">
              <button className="hs-modal-back-btn" onClick={() => setActiveModalItem(null)}>
                ← Back to Triage History
              </button>

              <button className="hs-modal-close-icon" onClick={() => setActiveModalItem(null)} aria-label="Close detail view">
                <XIcon color="var(--text-secondary)" size={18} />
              </button>
            </div>

            {/* Modal Hero */}
            <div className={`hs-modal-hero ${activeModalItem.severity || "moderate"}`}>
              <div className="hs-modal-meta">
                <span className={`hs-severity-tag badge-${activeModalItem.severity || "moderate"}`}>
                  {(activeModalItem.severity || "moderate").toUpperCase()} ASSESSMENT
                </span>
                <span className="hs-modal-time">
                  {new Date(activeModalItem.timestamp).toLocaleString("en-IN")}
                </span>
              </div>
              <h2 className="hs-modal-title">Emergency Triage Assessment Record</h2>
            </div>

            {/* Modal Body Content */}
            <div className="hs-modal-body">
              {/* Symptoms */}
              <div className="hs-modal-section">
                <h3 className="hs-modal-section-label">SUBMITTED SYMPTOMS</h3>
                <p className="hs-modal-text">{activeModalItem.symptoms}</p>
              </div>

              {/* Clinical Summary */}
              {activeModalItem.summary && (
                <div className="hs-modal-section">
                  <h3 className="hs-modal-section-label">CLINICAL ASSESSMENT SUMMARY</h3>
                  <p className="hs-modal-text">{activeModalItem.summary}</p>
                </div>
              )}

              {/* Recommended Facilities */}
              {activeModalItem.facilities && activeModalItem.facilities.length > 0 && (
                <div className="hs-modal-section">
                  <h3 className="hs-modal-section-label">RECOMMENDED SPECIALTY DEPARTMENTS</h3>
                  <div className="hs-record-facilities">
                    {activeModalItem.facilities.map((fac) => (
                      <span key={fac} className="fac-pill">
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Disclaimer */}
              <div className="hs-modal-privacy-banner">
                <ShieldCheckIcon color="#16A579" size={16} />
                <span>This assessment record is stored locally on your device for personal medical history.</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="hs-modal-footer">
              <button className="hs-modal-done-btn" onClick={() => setActiveModalItem(null)}>
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}