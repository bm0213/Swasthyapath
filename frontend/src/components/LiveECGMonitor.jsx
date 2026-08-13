import React, { useEffect, useRef } from "react";

export default function LiveECGMonitor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let offset = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const width = () => canvas.getBoundingClientRect().width;
    const height = () => canvas.getBoundingClientRect().height;

    // Authentic Lead-II ECG Waveform Morphology
    const getEcgY = (x) => {
      const wavelength = 260; // distance between beats in px
      const phase = (x % wavelength) / wavelength;

      if (phase < 0.14) return 0; // Baseline
      if (phase < 0.24) return Math.sin(((phase - 0.14) / 0.10) * Math.PI) * 0.13; // P wave
      if (phase < 0.29) return 0; // PR segment
      if (phase < 0.32) return -Math.sin(((phase - 0.29) / 0.03) * Math.PI) * 0.16; // Q wave
      if (phase < 0.38) return Math.sin(((phase - 0.32) / 0.06) * Math.PI) * 0.86; // R wave (Peak spike!)
      if (phase < 0.43) return -Math.sin(((phase - 0.38) / 0.05) * Math.PI) * 0.36; // S wave
      if (phase < 0.52) return 0; // ST segment
      if (phase < 0.68) return Math.sin(((phase - 0.52) / 0.16) * Math.PI) * 0.28; // T wave
      return 0; // TP baseline rest
    };

    const render = () => {
      const w = width();
      const h = height();
      if (!w || !h) {
        if (!prefersReducedMotion) animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const centerY = h / 2;
      const amplitude = h * 0.36; // ~65-70% total visual height coverage

      if (!prefersReducedMotion) {
        offset = (offset + 1.9) % 260;
      }

      // Restrained Medical Emerald Waveform Styling
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#23C394";
      ctx.shadowColor = "rgba(35, 195, 148, 0.45)";
      ctx.shadowBlur = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const ecgVal = getEcgY(x + offset);
        const y = centerY - ecgVal * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Reset shadow for scan head
      ctx.shadowBlur = 0;

      // Subtle Scan Head Leading Dot
      if (!prefersReducedMotion) {
        const leadX = w * 0.82;
        const leadVal = getEcgY(leadX + offset);
        const leadY = centerY - leadVal * amplitude;

        ctx.beginPath();
        ctx.arc(leadX, leadY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#34D399";
        ctx.shadowColor = "#34D399";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <span className="ecg-live-label">LIVE MONITOR</span>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}


