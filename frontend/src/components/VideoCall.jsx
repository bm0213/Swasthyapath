import React, { useEffect, useRef, useState } from "react";

export default function VideoCall({ socket, roomId, userName, role, onEnd }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const [status, setStatus] = useState("connecting");

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      {
        urls: "turn:openrelay.metered.ca:80",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
      {
        urls: "turn:openrelay.metered.ca:443",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
    ],
  };
   

  useEffect(() => {
    startCall();
    socket.on("webrtc_offer", handleOffer);
    socket.on("webrtc_answer", handleAnswer);
    socket.on("webrtc_ice", handleICE);
    socket.on("call_ended", handleRemoteEnd);

    return () => {
      cleanup();
      socket.off("webrtc_offer", handleOffer);
      socket.off("webrtc_answer", handleAnswer);
      socket.off("webrtc_ice", handleICE);
      socket.off("call_ended", handleRemoteEnd);
    };
  }, []);

  async function startCall() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true, audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      const peer = new RTCPeerConnection(iceServers);
      peerRef.current = peer;

      stream.getTracks().forEach((track) => peer.addTrack(track, stream));

      peer.ontrack = (e) => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0];
        setStatus("connected");
      };

      peer.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("webrtc_ice", { roomId, candidate: e.candidate });
        }
      };

      // Patient creates the offer
      if (role === "patient") {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socket.emit("webrtc_offer", { roomId, offer });
        setStatus("ringing");
      }
    } catch (err) {
      console.error("Camera/mic error:", err);
      setStatus("error");
    }
  }

  async function handleOffer({ offer }) {
    if (!peerRef.current) return;
    await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(answer);
    socket.emit("webrtc_answer", { roomId, answer });
    setStatus("connected");
  }

  async function handleAnswer({ answer }) {
    await peerRef.current?.setRemoteDescription(new RTCSessionDescription(answer));
    setStatus("connected");
  }

  async function handleICE({ candidate }) {
    try {
      await peerRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (e) {}
  }

  function handleRemoteEnd() {
    cleanup();
    onEnd();
  }

  function cleanup() {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    peerRef.current?.close();
    peerRef.current = null;
    localStreamRef.current = null;
  }

  function endCall() {
    socket.emit("call_ended", { roomId });
    cleanup();
    onEnd();
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "#0a0a0a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      {/* Remote Video */}
      <video ref={remoteVideoRef} autoPlay playsInline
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          position: "absolute", inset: 0,
        }}
      />

      {/* Status overlay */}
      {status !== "connected" && (
        <div style={{
          position: "absolute", top: "40%",
          color: "white", fontSize: "16px", textAlign: "center", zIndex: 10,
        }}>
          {status === "ringing" && "📞 Calling doctor..."}
          {status === "connecting" && "🔄 Connecting..."}
          {status === "error" && "❌ Camera/mic access denied"}
        </div>
      )}

      {/* Local Video (Picture-in-picture) */}
      <video ref={localVideoRef} autoPlay playsInline muted
        style={{
          position: "absolute", bottom: "100px", right: "16px",
          width: "120px", height: "160px", objectFit: "cover",
          borderRadius: "12px", border: "2px solid white", zIndex: 10,
        }}
      />

      {/* Controls */}
      <div style={{
        position: "absolute", bottom: "32px",
        display: "flex", gap: "24px", zIndex: 10,
      }}>
        <button onClick={endCall} style={{
          width: "64px", height: "64px", borderRadius: "50%",
          background: "#e53e3e", border: "none",
          color: "white", fontSize: "24px", cursor: "pointer",
        }}>
          📵
        </button>
      </div>
    </div>
  );
}