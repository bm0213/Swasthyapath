import React from "react";
import strings from "../utils/strings";

export default function HospitalCard({ hospital, lang, isBest }) {
  const [showDetails, setShowDetails] = React.useState(false);
  const [showAppointment, setShowAppointment] = React.useState(false);
  const [appointment, setAppointment] = React.useState({
    name: "", phone: "", date: "", time: "", reason: "",
  });
  const [booked, setBooked] = React.useState(false);

  const s = strings[lang] || strings["en"];
  const name = lang === "hi" ? hospital.nameHi : hospital.name;

  function openMaps() {
    if (hospital.lat && hospital.lng) {
      window.open(`https://maps.google.com/?q=${hospital.lat},${hospital.lng}`, "_blank");
    }
  }

  function shareWhatsApp() {
    const mapsLink = hospital.lat && hospital.lng
      ? `https://maps.google.com/?q=${hospital.lat},${hospital.lng}`
      : "";
    const msg = `🏥 *${name}*\n📍 ${hospital.distanceKm} km away\n📞 ${hospital.phone || "N/A"}\n🚨 Emergency: ${hospital.emergencyPhone || "N/A"}\n🗺️ ${mapsLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function handleBookAppointment() {
    if (!appointment.name || !appointment.phone || !appointment.date || !appointment.time) return;
    // In a real app this would call an API
    // For now we simulate booking and open a WhatsApp message
    const msg = `🗓️ Appointment Request\nHospital: ${name}\nPatient: ${appointment.name}\nPhone: ${appointment.phone}\nDate: ${appointment.date}\nTime: ${appointment.time}\nReason: ${appointment.reason || "General consultation"}`;
    window.open(`https://wa.me/${hospital.appointmentPhone?.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setShowAppointment(false);
      setAppointment({ name: "", phone: "", date: "", time: "", reason: "" });
    }, 3000);
  }

  // Star rating renderer
  function renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{
        color: i < Math.floor(rating) ? "#F59E0B" : "#DDE3EB",
        fontSize: "11px",
      }}>★</span>
    ));
  }

  // Get today + next 7 days for appointment
  function getAvailableDates() {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  }

  const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

  return (
    <div className="fade-up" style={{
      background: "var(--bg-card)",
      border: isBest ? "1.5px solid var(--teal)" : "1px solid var(--border)",
      borderLeft: isBest ? "4px solid var(--teal)" : "1px solid var(--border)",
      borderRadius: "12px",
      marginBottom: "10px",
      overflow: "hidden",
      boxShadow: isBest ? "0 4px 16px rgba(13,122,95,0.12)" : "var(--shadow-sm)",
    }}>

      {/* Header */}
      <div style={{ padding: "14px 16px 10px" }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", gap: "12px",
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {isBest && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                fontSize: "10px", fontWeight: "700",
                color: "var(--teal)",
                background: "var(--teal-light)",
                border: "1px solid var(--teal)30",
                padding: "2px 8px", borderRadius: "4px",
                marginBottom: "6px", letterSpacing: "0.04em",
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--teal)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {s.bestMatch}
              </div>
            )}

            <div style={{
              fontSize: "15px", fontWeight: "600",
              color: "var(--text-primary)", marginBottom: "4px", lineHeight: "1.3",
            }}>
              {name}
            </div>

            {/* Type + rating + beds */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{
                fontSize: "11px", fontWeight: "600",
                padding: "2px 7px", borderRadius: "4px",
                background: hospital.type === "Government" ? "var(--navy-light)" : "var(--teal-light)",
                color: hospital.type === "Government" ? "#2563EB" : "var(--teal)",
              }}>
                {hospital.type === "Government" ? "🏛 Govt" : "🏥 Private"}
              </span>
              {hospital.rating && (
                <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  {renderStars(hospital.rating)}
                  <span style={{ fontSize: "11px", color: "var(--text-tertiary)", marginLeft: "2px" }}>
                    {hospital.rating}
                  </span>
                </div>
              )}
              {hospital.beds && (
                <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                  {hospital.beds} beds
                </span>
              )}
              <span style={{
                fontSize: "12px", fontWeight: "700",
                color: "var(--teal)",
                fontFamily: "'DM Mono', monospace",
              }}>
                {hospital.distanceKm} km
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            {hospital.lat && hospital.lng && (
              <button onClick={openMaps} title="Open in Google Maps" style={{
                width: "34px", height: "34px", borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "var(--bg-secondary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </button>
            )}
            <button onClick={shareWhatsApp} title="Share via WhatsApp" style={{
              width: "34px", height: "34px", borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--bg-secondary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div style={{
        padding: "8px 16px",
        borderTop: "1px solid var(--border)",
        display: "flex", gap: "4px", flexWrap: "wrap", alignItems: "center",
      }}>
        {hospital.facilities.map((f) => (
          <span key={f} style={{
            padding: "2px 8px",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "4px", fontSize: "11px",
            fontWeight: "600", color: "var(--text-secondary)",
            fontFamily: "'DM Mono', monospace",
          }}>
            {f}
          </span>
        ))}
      </div>

      {/* Contact row */}
      <div style={{
        padding: "10px 16px",
        borderTop: "1px solid var(--border)",
        display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center",
      }}>
        {/* Main phone */}
        {hospital.phone && (
          <a href={`tel:${hospital.phone}`} style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "5px 10px",
            background: "var(--teal-light)",
            border: "1px solid var(--teal)30",
            borderRadius: "6px", fontSize: "12px", fontWeight: "600",
            color: "var(--teal)", textDecoration: "none",
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--teal)">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            {lang === "hi" ? "कॉल" : "Call"} · {hospital.phone}
          </a>
        )}

        {/* Emergency phone */}
        {hospital.emergencyPhone && (
          <a href={`tel:${hospital.emergencyPhone}`} style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "5px 10px",
            background: "var(--alert-light)",
            border: "1px solid var(--alert)30",
            borderRadius: "6px", fontSize: "12px", fontWeight: "600",
            color: "var(--alert)", textDecoration: "none",
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--alert)">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            {lang === "hi" ? "आपातकाल" : "Emergency"} · {hospital.emergencyPhone}
          </a>
        )}

        {/* Details toggle */}
        <button
          onClick={() => setShowDetails((p) => !p)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            padding: "5px 10px",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "6px", fontSize: "12px", fontWeight: "600",
            color: "var(--text-secondary)", cursor: "pointer",
            marginLeft: "auto",
          }}
        >
          {showDetails
            ? (lang === "hi" ? "कम दिखाएं ▲" : "Less ▲")
            : (lang === "hi" ? "और जानें ▼" : "Details ▼")}
        </button>
      </div>

      {/* Expanded details */}
      {showDetails && (
        <div style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg-secondary)",
          display: "flex", flexDirection: "column", gap: "8px",
        }}>

          {/* Address */}
          {hospital.address && (
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                {hospital.address}
              </span>
            </div>
          )}

          {/* Hours */}
          {hospital.hours && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                {hospital.hours}
              </span>
            </div>
          )}

          {/* Email */}
          {hospital.email && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href={`mailto:${hospital.email}`} style={{
                fontSize: "12px", color: "#2563EB", textDecoration: "none",
              }}>
                {hospital.email}
              </a>
            </div>
          )}

          {/* Website */}
          {hospital.website && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <a href={hospital.website} target="_blank" rel="noreferrer" style={{
                fontSize: "12px", color: "#2563EB", textDecoration: "none",
              }}>
                {hospital.website.replace("https://", "")}
              </a>
            </div>
          )}

          {/* Emergency status */}
          <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
            <span style={{
              fontSize: "11px", fontWeight: "600",
              padding: "2px 8px", borderRadius: "4px",
              background: hospital.emergencyAvailable ? "var(--teal-light)" : "var(--alert-light)",
              color: hospital.emergencyAvailable ? "var(--teal)" : "var(--alert)",
              border: `1px solid ${hospital.emergencyAvailable ? "var(--teal)" : "var(--alert)"}30`,
            }}>
              {hospital.emergencyAvailable
                ? (lang === "hi" ? "✓ 24/7 आपातकाल" : "✓ 24/7 Emergency")
                : (lang === "hi" ? "✗ सीमित आपातकाल" : "✗ Limited emergency")}
            </span>
            <span style={{
              fontSize: "11px", fontWeight: "600",
              padding: "2px 8px", borderRadius: "4px",
              background: "var(--navy-light)",
              color: "#2563EB",
              border: "1px solid #2563EB20",
            }}>
              {hospital.beds} {lang === "hi" ? "बेड" : "beds"}
            </span>
          </div>
        </div>
      )}

      {/* Appointment booking button */}
      {hospital.appointmentAvailable && (
        <div style={{
          padding: "10px 16px",
          borderTop: "1px solid var(--border)",
        }}>
          <button
            onClick={() => setShowAppointment((p) => !p)}
            style={{
              width: "100%", padding: "9px",
              background: showAppointment ? "var(--bg-secondary)" : "#2563EB",
              color: showAppointment ? "var(--text-secondary)" : "white",
              border: showAppointment ? "1px solid var(--border)" : "none",
              borderRadius: "8px", fontSize: "13px", fontWeight: "600",
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", gap: "7px",
              transition: "all 0.15s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {showAppointment
              ? (lang === "hi" ? "अपॉइंटमेंट रद्द करें" : "Cancel booking")
              : (lang === "hi" ? "अपॉइंटमेंट बुक करें" : "Book appointment")}
          </button>
        </div>
      )}

      {/* Appointment form */}
      {showAppointment && hospital.appointmentAvailable && (
        <div style={{
          padding: "14px 16px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg-secondary)",
          display: "flex", flexDirection: "column", gap: "10px",
        }}>
          <div style={{
            fontSize: "12px", fontWeight: "700",
            color: "var(--text-primary)", marginBottom: "2px",
            textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            {lang === "hi" ? "अपॉइंटमेंट बुक करें" : "Book an appointment"}
          </div>

          {booked ? (
            <div style={{
              padding: "14px", textAlign: "center",
              background: "var(--teal-light)",
              border: "1px solid var(--teal)",
              borderRadius: "8px",
            }}>
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>✓</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--teal)" }}>
                {lang === "hi" ? "अपॉइंटमेंट भेजा गया!" : "Appointment request sent!"}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "3px" }}>
                {lang === "hi"
                  ? "अस्पताल जल्द ही आपसे संपर्क करेगा।"
                  : "The hospital will contact you to confirm."}
              </div>
            </div>
          ) : (
            <>
              {/* Patient name */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                  {lang === "hi" ? "मरीज का नाम *" : "Patient name *"}
                </label>
                <input
                  type="text"
                  placeholder={lang === "hi" ? "पूरा नाम दर्ज करें" : "Enter full name"}
                  value={appointment.name}
                  onChange={(e) => setAppointment((p) => ({ ...p, name: e.target.value }))}
                  style={{
                    width: "100%", padding: "8px 10px",
                    border: "1px solid var(--border)", borderRadius: "7px",
                    background: "var(--bg-card)", color: "var(--text-primary)",
                    fontSize: "13px", outline: "none",
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                  {lang === "hi" ? "फोन नंबर *" : "Phone number *"}
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={appointment.phone}
                  onChange={(e) => setAppointment((p) => ({ ...p, phone: e.target.value }))}
                  style={{
                    width: "100%", padding: "8px 10px",
                    border: "1px solid var(--border)", borderRadius: "7px",
                    background: "var(--bg-card)", color: "var(--text-primary)",
                    fontSize: "13px", outline: "none",
                  }}
                />
              </div>

              {/* Date + Time */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    {lang === "hi" ? "तारीख *" : "Date *"}
                  </label>
                  <select
                    value={appointment.date}
                    onChange={(e) => setAppointment((p) => ({ ...p, date: e.target.value }))}
                    style={{
                      width: "100%", padding: "8px 10px",
                      border: "1px solid var(--border)", borderRadius: "7px",
                      background: "var(--bg-card)", color: "var(--text-primary)",
                      fontSize: "13px", outline: "none",
                    }}
                  >
                    <option value="">{lang === "hi" ? "चुनें" : "Select"}</option>
                    {getAvailableDates().map((d) => (
                      <option key={d} value={d}>
                        {new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    {lang === "hi" ? "समय *" : "Time *"}
                  </label>
                  <select
                    value={appointment.time}
                    onChange={(e) => setAppointment((p) => ({ ...p, time: e.target.value }))}
                    style={{
                      width: "100%", padding: "8px 10px",
                      border: "1px solid var(--border)", borderRadius: "7px",
                      background: "var(--bg-card)", color: "var(--text-primary)",
                      fontSize: "13px", outline: "none",
                    }}
                  >
                    <option value="">{lang === "hi" ? "चुनें" : "Select"}</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                  {lang === "hi" ? "कारण (वैकल्पिक)" : "Reason (optional)"}
                </label>
                <input
                  type="text"
                  placeholder={lang === "hi" ? "जैसे: सीने में दर्द, बुखार..." : "e.g. Chest pain, fever..."}
                  value={appointment.reason}
                  onChange={(e) => setAppointment((p) => ({ ...p, reason: e.target.value }))}
                  style={{
                    width: "100%", padding: "8px 10px",
                    border: "1px solid var(--border)", borderRadius: "7px",
                    background: "var(--bg-card)", color: "var(--text-primary)",
                    fontSize: "13px", outline: "none",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleBookAppointment}
                disabled={!appointment.name || !appointment.phone || !appointment.date || !appointment.time}
                style={{
                  width: "100%", padding: "10px",
                  background: !appointment.name || !appointment.phone || !appointment.date || !appointment.time
                    ? "var(--border)" : "#2563EB",
                  color: !appointment.name || !appointment.phone || !appointment.date || !appointment.time
                    ? "var(--text-tertiary)" : "white",
                  border: "none", borderRadius: "8px",
                  fontSize: "13px", fontWeight: "600",
                  cursor: !appointment.name || !appointment.phone || !appointment.date || !appointment.time
                    ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "6px",
                  transition: "all 0.15s",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {lang === "hi" ? "अपॉइंटमेंट बुक करें" : "Confirm appointment"}
              </button>

              <p style={{ fontSize: "10px", color: "var(--text-tertiary)", textAlign: "center", margin: 0 }}>
                {lang === "hi"
                  ? "बुकिंग WhatsApp के माध्यम से अस्पताल को भेजी जाएगी।"
                  : "Booking will be sent to the hospital via WhatsApp for confirmation."}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}