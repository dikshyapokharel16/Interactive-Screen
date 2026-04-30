import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCamera } from "../../hooks/useCamera";
import { CONNECTED_NEIGHBORHOOD } from "../../data/neighborhoods";

// Portal circle = 58vmin. Rings start just outside it.
const PORTAL_SIZE = "58vmin";
const RING_SIZES = [62, 68, 74, 80]; // vmin

const PARTICLE_COUNT = 28;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  angle: (i / PARTICLE_COUNT) * 360,
  // Radius in px — orbit around the edge of the portal
  // Portal radius ≈ 29vmin; on 1080px tall screen vmin≈10.8px → ~313px
  // Orbit particles at ~330-370px from center
  radius: 320 + (i % 3) * 20,
  size: 7 + (i % 4) * 3,
  color: ["#A8C5A0", "#7EB3C9", "#F4A57A", "#C4B5D6", "#F5D678"][i % 5],
  duration: 3 + (i % 3),
  delay: (i / PARTICLE_COUNT) * 2,
}));

function Particle({ angle, radius, size, color, duration, delay }) {
  const rad = (angle * Math.PI) / 180;
  const cx = Math.cos(rad) * radius;
  const cy = Math.sin(rad) * radius;
  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        x: cx - size / 2,
        y: cy - size / 2,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function PortalScreen({ onEnd }) {
  const { videoRef, status } = useCamera();
  const [portalOpen, setPortalOpen] = useState(false);
  const [countdown, setCountdown] = useState(45);

  useEffect(() => {
    const t = setTimeout(() => setPortalOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!portalOpen) return;
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(interval); onEnd(); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [portalOpen, onEnd]);

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse at center, #1a2a35 0%, #0d1a20 100%)",
        gap: "clamp(16px, 2.5vh, 32px)",
        padding: "clamp(16px, 2vh, 32px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glow rings — centered absolutely so they don't push layout */}
      {RING_SIZES.map((size, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            border: `${2.5 - i * 0.4}px solid ${["#7EB3C9", "#A8C5A0", "#C4B5D6", "#F4A57A"][i]}`,
            width: `${size}vmin`,
            height: `${size}vmin`,
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Particles — absolutely centered, behind portal */}
      <div
        style={{
          position: "absolute",
          width: `${RING_SIZES[0]}vmin`,
          height: `${RING_SIZES[0]}vmin`,
          pointerEvents: "none",
        }}
      >
        {particles.map((p) => <Particle key={p.id} {...p} />)}
      </div>

      {/* Portal circle */}
      <motion.div
        style={{
          position: "relative",
          width: PORTAL_SIZE,
          height: PORTAL_SIZE,
          borderRadius: "50%",
          overflow: "hidden",
          border: "5px solid #7EB3C9",
          boxShadow: "0 0 60px #7EB3C944, 0 0 120px #7EB3C922",
          background: "#0d1a20",
          flexShrink: 0,
          zIndex: 10,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: portalOpen ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {status === "active" && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
          />
        )}
        {status === "denied" && (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "clamp(36px, 6vmin, 64px)" }}>
            📷
          </div>
        )}
        {status === "requesting" && (
          <motion.div
            style={{ width: "100%", height: "100%", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#7EB3C9", fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(14px, 2vmin, 20px)", fontWeight: 600 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Connecting...
          </motion.div>
        )}

        {/* LIVE badge — inside top-left of portal */}
        <AnimatePresence>
          {portalOpen && status === "active" && (
            <motion.div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: "#F4A57A",
                borderRadius: 99,
                padding: "5px 14px",
                display: "flex",
                alignItems: "center",
                gap: 7,
                zIndex: 20,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                style={{ width: 9, height: 9, borderRadius: "50%", background: "#fff" }}
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800,
                fontSize: "clamp(11px, 1.6vmin, 16px)", color: "#fff", letterSpacing: "0.1em" }}>
                LIVE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Text below portal */}
      <AnimatePresence>
        {portalOpen && (
          <motion.h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(18px, 3.2vmin, 36px)",
              color: "#fff",
              textAlign: "center",
              zIndex: 10,
              lineHeight: 1.3,
              padding: "0 16px",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            You've connected! Say hello to your neighbor in{" "}
            <span style={{ color: "#7EB3C9" }}>{CONNECTED_NEIGHBORHOOD}</span> 👋
          </motion.h2>
        )}
      </AnimatePresence>

      {/* End button + countdown */}
      <AnimatePresence>
        {portalOpen && (
          <motion.div
            style={{ display: "flex", flexDirection: "column", alignItems: "center",
              gap: 8, zIndex: 20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <motion.button
              onClick={onEnd}
              style={{
                padding: "clamp(10px, 1.5vh, 16px) clamp(24px, 4vmin, 44px)",
                background: "transparent",
                border: "2px solid #7EB3C9",
                borderRadius: 99,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(13px, 1.8vmin, 18px)",
                color: "#7EB3C9",
                cursor: "pointer",
              }}
              whileHover={{ background: "#7EB3C922" }}
              whileTap={{ scale: 0.96 }}
            >
              End Connection
            </motion.button>
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400,
              fontSize: "clamp(11px, 1.4vmin, 14px)", color: "#7EB3C966" }}>
              Closes in {countdown}s
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
