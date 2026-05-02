import React from "react";
import VideoCall from "./VideoCall";
import { getSocket, generateRoomId, disconnectSocket } from "../utils/socket";

export default function DoctorChat({ lang, triageResult, forceOpen, onClose, onAmbulanceLocation, onPatientLocation }) {
  const [showChat, setShowChat] = React.useState(false);
  const [step, setStep] = React.useState("start");
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [role, setRole] = React.useState("patient");
  const [joinRoomId, setJoinRoomId] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [memberCount, setMemberCount] = React.useState(0);
  const [typingUser, setTypingUser] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [inCall, setInCall] = React.useState(false);
const [incomingCall, setIncomingCall] = React.useState(false);
const [callerName, setCallerName] = React.useState("");
  const messagesEndRef = React.useRef(null);
  const typingTimeoutRef = React.useRef(null);
  const socketRef = React.useRef(null);

  // Open chat when FAB triggers it
  React.useEffect(() => {
    if (forceOpen) setShowChat(true);
  }, [forceOpen]);

  // Notify parent when chat closes
  React.useEffect(() => {
    if (!showChat) onClose?.();
  }, [showChat]);

  const s = {
    en: {
      btnLabel: "Chat with Doctor",
      title: "Doctor Chat",
      startTitle: "Connect with a doctor",
      startDesc: "Chat in real time with a volunteer doctor while heading to hospital.",
      asPatient: "I am a patient",
      asDoctor: "I am a doctor",
      yourName: "Your name",
      namePlaceholder: "Enter your name",
      createRoom: "Create new room",
      joinRoom: "Join existing room",
      roomIdPlaceholder: "Enter room ID (e.g. AB12CD)",
      joinBtn: "Join room",
      shareCode: "Share this code with your doctor",
      copyCode: "Copy code",
      copied: "Copied!",
      waitingDoctor: "Waiting for doctor to join...",
      waitingPatient: "Waiting for patient to join...",
      membersOnline: "members online",
      typePlaceholder: "Type a message...",
      isTyping: "is typing...",
      joined: "joined the room",
      left: "left the room",
    },
    hi: {
      btnLabel: "डॉक्टर से चैट करें",
      title: "डॉक्टर चैट",
      startTitle: "डॉक्टर से जुड़ें",
      startDesc: "अस्पताल जाते समय स्वयंसेवी डॉक्टर से रीयल-टाइम चैट करें।",
      asPatient: "मैं मरीज हूं",
      asDoctor: "मैं डॉक्टर हूं",
      yourName: "आपका नाम",
      namePlaceholder: "अपना नाम दर्ज करें",
      createRoom: "नया कमरा बनाएं",
      joinRoom: "मौजूदा कमरे में शामिल हों",
      roomIdPlaceholder: "रूम ID दर्ज करें",
      joinBtn: "शामिल हों",
      shareCode: "यह कोड अपने डॉक्टर को दें",
      copyCode: "कोड कॉपी करें",
      copied: "कॉपी हो गया!",
      waitingDoctor: "डॉक्टर के जुड़ने का इंतजार है...",
      waitingPatient: "मरीज के जुड़ने का इंतजार है...",
      membersOnline: "सदस्य ऑनलाइन",
      typePlaceholder: "संदेश लिखें...",
      isTyping: "टाइप कर रहे हैं...",
      joined: "कमरे में शामिल हुए",
      left: "कमरा छोड़ दिया",
    },
  }[lang] || {};

  const str = Object.keys(s).length ? s : {
    title: "Doctor Chat", startTitle: "Connect with a doctor",
    startDesc: "Chat in real time with a volunteer doctor.",
    asPatient: "I am a patient", asDoctor: "I am a doctor",
    yourName: "Your name", namePlaceholder: "Enter your name",
    createRoom: "Create new room", joinRoom: "Join existing room",
    roomIdPlaceholder: "Enter room ID", shareCode: "Share this code with your doctor",
    copyCode: "Copy code", copied: "Copied!", waitingDoctor: "Waiting for doctor...",
    waitingPatient: "Waiting for patient...", membersOnline: "members online",
    typePlaceholder: "Type a message...", isTyping: "is typing...",
    joined: "joined", left: "left",
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function setupSocket(rid, uname, urole) {
    const socket = getSocket();
    socketRef.current = socket;
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join_room", { roomId: rid, userName: uname, role: urole });
      // If ambulance, start sharing location
      if (urole === "ambulance") {
        startSharingLocation(rid, socket, "ambulance");
      }
      // If patient, share location too
      if (urole === "patient") {
        startSharingLocation(rid, socket, "patient");
      } 
      if (urole === "patient" && triageResult) {
        setTimeout(() => {
          const infoMsg = `📋 *Triage Info*\nSeverity: ${triageResult.severityLabel}\nSummary: ${triageResult.summary}\nFacilities: ${triageResult.facilities?.join(", ")}\nDo now: ${triageResult.doNow}`;
          socket.emit("send_message", { roomId: rid, message: infoMsg, userName: "System", role: "system" });
        }, 500);
      }
    });

    socket.on("disconnect", () => setIsConnected(false));
    socket.on("room_history", (history) => setMessages(history));
    socket.on("receive_message", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("user_joined", ({ userName: uname, role: urole, memberCount: mc }) => {
      setMemberCount(mc);
      setMessages((prev) => [...prev, { id: Date.now(), type: "system", message: `${uname} (${urole}) ${str.joined}` }]);
    });
    socket.on("user_left", ({ userName: uname, memberCount: mc }) => {
      setMemberCount(mc);
      setMessages((prev) => [...prev, { id: Date.now(), type: "system", message: `${uname} ${str.left}` }]);
    });
    socket.on("user_typing", ({ userName: uname, isTyping }) => {
      setTypingUser(isTyping ? uname : "");
    });
    socket.on("ambulance_location_update", ({ lat, lng }) => {
      onAmbulanceLocation?.({ lat, lng });
    });

    socket.on("patient_location_update", ({ lat, lng }) => {
      onPatientLocation?.({ lat, lng });
    });
    socket.on("incoming_call", ({ from }) => {
      setCallerName(from);
      setIncomingCall(true);
    });
    socket.on("call_accepted", () => {
      setInCall(true);
      setIncomingCall(false);
    });
    socket.on("call_declined", () => {
      alert("Doctor declined the call.");
    });
  }
function startSharingLocation(rid, socket, urole) {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        if (urole === "ambulance") {
          socket.emit("ambulance_location", { roomId: rid, lat, lng });
        } else {
          socket.emit("patient_location", { roomId: rid, lat, lng });
        }
      },
      (err) => console.error("Location error:", err),
      { enableHighAccuracy: true, maximumAge: 3000 }
    );
    // Store watchId to clear later
    window._locationWatchId = watchId;
  }
  function handleCreate() {
    if (!userName.trim()) return;
    const rid = generateRoomId();
    setRoomId(rid);
    setupSocket(rid, userName, role);
    setStep("chat");
  }

  function handleJoin() {
    if (!userName.trim() || !joinRoomId.trim()) return;
    const rid = joinRoomId.trim().toUpperCase();
    setRoomId(rid);
    setupSocket(rid, userName, role);
    setStep("chat");
  }

  function handleSend() {
    if (!newMessage.trim() || !socketRef.current) return;
    socketRef.current.emit("send_message", { roomId, message: newMessage.trim(), userName, role });
    setNewMessage("");
    socketRef.current.emit("typing", { roomId, userName, isTyping: false });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function handleTyping(e) {
    setNewMessage(e.target.value);
    if (!socketRef.current) return;
    socketRef.current.emit("typing", { roomId, userName, isTyping: true });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("typing", { roomId, userName, isTyping: false });
    }, 1500);
  }

  function handleLeave() {
    disconnectSocket();
    setMessages([]); setStep("start"); setRoomId("");
    setMemberCount(0); setIsConnected(false);
    // Stop location sharing
    if (window._locationWatchId) {
      navigator.geolocation.clearWatch(window._locationWatchId);
      window._locationWatchId = null;
    }
  }

  function copyRoomId() {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatTime(iso) {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  if (!showChat) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 400,
      background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}>
      <div style={{
        background: "var(--bg-card)", borderRadius: "20px 20px 0 0",
        width: "100%", maxWidth: "480px", height: "85vh",
        display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{
          padding: "1rem 1.25rem", borderBottom: "0.5px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#E6F1FB", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}>
              💬
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "500", color: "var(--text-primary)" }}>
                {str.title}
              </div>
              {step === "chat" && (
                <div style={{ fontSize: "11px", color: isConnected ? "var(--teal)" : "var(--text-secondary)" }}>
                  {isConnected ? `${memberCount} ${str.membersOnline} · Room: ${roomId}` : "Connecting..."}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => { if (step === "chat") handleLeave(); setShowChat(false); }}
            style={{ background: "none", border: "none", fontSize: "22px", color: "var(--text-secondary)", cursor: "pointer" }}
          >×</button>
        </div>

        {/* Step: Start */}
        {step === "start" && (
          <div style={{ padding: "1.5rem 1.25rem", overflowY: "auto" }}>
            <div style={{ fontSize: "16px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "6px" }}>
              {str.startTitle}
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
              {str.startDesc}
            </p>

            <div style={{ display: "flex", gap: "8px", marginBottom: "1.25rem" }}>
{["patient", "doctor", "ambulance"].map((r) => (
                <button key={r} onClick={() => setRole(r)} style={{
                  flex: 1, padding: "10px",
                  border: role === r ? "1.5px solid #185FA5" : "0.5px solid var(--border)",
                  borderRadius: "10px", background: role === r ? "#E6F1FB" : "transparent",
                  color: role === r ? "#0C447C" : "var(--text-secondary)",
                  fontSize: "13px", fontWeight: role === r ? "500" : "400", cursor: "pointer",
                }}>
                {r === "patient" ? `🤒 ${str.asPatient}` : r === "doctor" ? `👨‍⚕️ ${str.asDoctor}` : `🚑 Ambulance`}
                </button>
              ))}
            </div>

            <label style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
              {str.yourName}
            </label>
            <input type="text" placeholder={str.namePlaceholder} value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{
                width: "100%", padding: "10px 12px", marginBottom: "1.25rem",
                border: "0.5px solid var(--border)", borderRadius: "10px",
                background: "var(--bg-secondary)", color: "var(--text-primary)",
                fontSize: "14px", outline: "none",
              }}
            />

            <button onClick={handleCreate} disabled={!userName.trim()} style={{
              width: "100%", padding: "12px",
              background: userName.trim() ? "#185FA5" : "var(--border)",
              color: userName.trim() ? "white" : "var(--text-tertiary)",
              border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "500",
              cursor: userName.trim() ? "pointer" : "not-allowed", marginBottom: "10px",
            }}>
              {str.createRoom} →
            </button>

            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              margin: "10px 0", color: "var(--text-tertiary)", fontSize: "12px",
            }}>
              <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
              or
              <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
            </div>

            <input type="text" placeholder={str.roomIdPlaceholder}
              value={joinRoomId} onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
              style={{
                width: "100%", padding: "10px 12px", marginBottom: "8px",
                border: "0.5px solid var(--border)", borderRadius: "10px",
                background: "var(--bg-secondary)", color: "var(--text-primary)",
                fontSize: "14px", outline: "none", letterSpacing: "0.1em",
              }}
            />
            <button onClick={handleJoin} disabled={!userName.trim() || !joinRoomId.trim()} style={{
              width: "100%", padding: "12px", background: "transparent",
              color: userName.trim() && joinRoomId.trim() ? "var(--text-primary)" : "var(--text-tertiary)",
              border: "0.5px solid var(--border)", borderRadius: "10px", fontSize: "14px",
              cursor: userName.trim() && joinRoomId.trim() ? "pointer" : "not-allowed",
            }}>
              {str.joinRoom} →
            </button>
          </div>
        )}

        {/* Step: Chat */}
        {step === "chat" && (
          <>
            {role === "patient" && memberCount <= 1 && (
              <div style={{
                margin: "10px 1.25rem 0", padding: "10px 12px",
                background: "var(--amber-light)", borderRadius: "10px",
                border: "0.5px solid #FAC775", flexShrink: 0,
              }}>
                <div style={{ fontSize: "12px", color: "#633806", marginBottom: "6px" }}>
                  {str.shareCode}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    flex: 1, fontSize: "22px", fontWeight: "700",
                    color: "#412402", letterSpacing: "0.15em", fontFamily: "monospace",
                  }}>
                    {roomId}
                  </div>
                  <button onClick={copyRoomId} style={{
                    padding: "6px 12px", fontSize: "12px", fontWeight: "500",
                    background: copied ? "var(--teal)" : "#185FA5",
                    color: "white", border: "none", borderRadius: "8px", cursor: "pointer",
                  }}>
                    {copied ? str.copied : str.copyCode}
                  </button>
                </div>
              </div>
            )}

            <div style={{
              flex: 1, overflowY: "auto", padding: "1rem 1.25rem",
              display: "flex", flexDirection: "column", gap: "8px",
            }}>
              {messages.length === 0 && (
                <div style={{ textAlign: "center", color: "var(--text-tertiary)", fontSize: "13px", marginTop: "2rem" }}>
                  {role === "patient" ? str.waitingDoctor : str.waitingPatient}
                </div>
              )}

              {messages.map((msg) => {
                if (msg.type === "system" || msg.role === "system") {
                  return (
                    <div key={msg.id} style={{ textAlign: "center", fontSize: "11px", color: "var(--text-tertiary)", padding: "4px 0" }}>
                      {msg.message}
                    </div>
                  );
                }
                const isMe = msg.userName === userName;
                return (
                  <div key={msg.id} style={{
                    display: "flex", flexDirection: isMe ? "row-reverse" : "row",
                    alignItems: "flex-end", gap: "6px",
                  }}>
                    {!isMe && (
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        background: msg.role === "doctor" ? "#E6F1FB" : "#FAECE7",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "14px", flexShrink: 0,
                      }}>
                        {msg.role === "doctor" ? "👨‍⚕️" : "🤒"}
                      </div>
                    )}
                    <div style={{ maxWidth: "75%" }}>
                      {!isMe && (
                        <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginBottom: "2px", paddingLeft: "4px" }}>
                          {msg.userName} · {msg.role}
                        </div>
                      )}
                      <div style={{
                        padding: "8px 12px",
                        background: isMe ? "#185FA5" : "var(--bg-secondary)",
                        color: isMe ? "white" : "var(--text-primary)",
                        borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        fontSize: "14px", lineHeight: "1.5",
                        whiteSpace: "pre-wrap", wordBreak: "break-word",
                      }}>
                        {msg.message}
                      </div>
                      <div style={{
                        fontSize: "10px", color: "var(--text-tertiary)", marginTop: "2px",
                        textAlign: isMe ? "right" : "left",
                        paddingLeft: isMe ? 0 : "4px", paddingRight: isMe ? "4px" : 0,
                      }}>
                        {msg.timestamp ? formatTime(msg.timestamp) : ""}
                      </div>
                    </div>
                  </div>
                );
              })}

              {typingUser && (
                <div style={{ fontSize: "12px", color: "var(--text-tertiary)", fontStyle: "italic", paddingLeft: "4px" }}>
                  {typingUser} {str.isTyping}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{
              padding: "10px 1.25rem 1.5rem", borderTop: "0.5px solid var(--border)",
              display: "flex", gap: "8px", flexShrink: 0,
            }}>
              <input type="text" placeholder={str.typePlaceholder}
                value={newMessage} onChange={handleTyping} onKeyDown={handleKeyDown}
                style={{
                  flex: 1, padding: "10px 14px",
                  border: "0.5px solid var(--border)", borderRadius: "24px",
                  background: "var(--bg-secondary)", color: "var(--text-primary)",
                  fontSize: "14px", outline: "none",
                }}
              />
              <button onClick={() => {
                socketRef.current?.emit("call_request", { roomId, userName });
                setInCall(true);
              }}
              style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: "#185FA5", border: "none",
                color: "white", fontSize: "18px", cursor: "pointer",
                display: role === "patient" ? "flex" : "none",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                📹
              </button>
              <button onClick={handleSend} disabled={!newMessage.trim()} style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: newMessage.trim() ? "#185FA5" : "var(--border)",
                border: "none", color: "white", fontSize: "16px",
                cursor: newMessage.trim() ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                ➤
              </button>
            </div>
          </>
        )}
      </div>

      {/* Incoming call notification for doctor */}
      {incomingCall && role === "doctor" && (
        <div style={{
          position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)",
          background: "white", borderRadius: "16px", padding: "16px 20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 600,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
          minWidth: "260px",
        }}>
          <div style={{ fontSize: "15px", fontWeight: "500" }}>
            📞 {callerName} is requesting a video call
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => {
              socketRef.current?.emit("call_accepted", { roomId, userName });
              setInCall(true);
              setIncomingCall(false);
            }} style={{
              padding: "8px 20px", background: "#22c55e",
              color: "white", border: "none", borderRadius: "8px",
              fontSize: "14px", cursor: "pointer",
            }}>
              ✅ Accept
            </button>
            <button onClick={() => {
              socketRef.current?.emit("call_declined", { roomId });
              setIncomingCall(false);
            }} style={{
              padding: "8px 20px", background: "#e53e3e",
              color: "white", border: "none", borderRadius: "8px",
              fontSize: "14px", cursor: "pointer",
            }}>
              ❌ Decline
            </button>
          </div>
        </div>
      )}

      {/* Video Call Screen */}
      {inCall && (
        <VideoCall
          socket={socketRef.current}
          roomId={roomId}
          userName={userName}
          role={role}
          onEnd={() => setInCall(false)}
        />
      )}

    </div>
  );
}