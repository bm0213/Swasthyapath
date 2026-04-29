export default function OfflineBanner({ isOnline, lang, usingCache, hasResults }) {
  // Only show offline banner when actually offline
  if (!isOnline) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "8px 14px", borderRadius: "10px",
        marginBottom: "12px",
        background: "var(--red-light)",
        border: "0.5px solid #F09595",
      }}>
        <span style={{ fontSize: "14px" }}>📵</span>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#501313" }}>
            {lang === "hi" ? "इंटरनेट नहीं है" : "You are offline"}
          </div>
          <div style={{ fontSize: "12px", color: "#791F1F", marginTop: "1px" }}>
            {lang === "hi"
              ? "पुराना डेटा दिखाया जा रहा है। कनेक्ट होने पर अपडेट होगा।"
              : "Using cached hospitals. Data will refresh when you reconnect."}
          </div>
        </div>
      </div>
    );
  }

  // Only show cached data banner when online but results came from cache
  if (isOnline && usingCache && hasResults) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "8px 14px", borderRadius: "10px",
        marginBottom: "12px",
        background: "var(--amber-light)",
        border: "0.5px solid #FAC775",
      }}>
        <span style={{ fontSize: "14px" }}>📦</span>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#633806" }}>
            {lang === "hi" ? "कैश डेटा दिखाया जा रहा है" : "Showing cached data"}
          </div>
          <div style={{ fontSize: "12px", color: "#854F0B", marginTop: "1px" }}>
            {lang === "hi"
              ? "नए अस्पताल लोड नहीं हो सके। पुराना डेटा दिखाया जा रहा है।"
              : "Could not load fresh hospitals. Showing last saved data."}
          </div>
        </div>
      </div>
    );
  }

  // Online and not using cache — show nothing
  return null;
}