import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function WaitingScreen({ onPlayerFound, onTimeout }) {
  const [countdown, setCountdown] = useState(20);
  const [found, setFound] = useState(false);

  useEffect(() => {
    // Simulate 2nd player joining after 3-4 seconds
    const joinTimer = setTimeout(() => {
      setFound(true);
      setTimeout(onPlayerFound, 1800); // show "found" for a moment then proceed
    }, 3500);

    // Timeout after 20s if no player
    const timeoutTimer = setTimeout(() => {
      clearTimeout(joinTimer);
      onTimeout();
    }, 20000);

    const countdownInterval = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);

    return () => {
      clearTimeout(joinTimer);
      clearTimeout(timeoutTimer);
      clearInterval(countdownInterval);
    };
  }, [onPlayerFound, onTimeout]);

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg, #FFF8EE 0%, #EEF5F0 50%, #EAF3F8 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!found ? (
        <>
          {/* Animated searching dots */}
          <div className="flex gap-4 mb-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#7EB3C9",
                }}
                animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 4vmin, 48px)",
              color: "#4A6B5C",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Looking for a neighbor...
          </h2>

          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vmin, 22px)",
              color: "#7A9E72",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Connecting to another screen in Wolfsburg
          </p>

          {/* Radar animation */}
          <div style={{ position: "relative", width: 120, height: 120, marginBottom: 32 }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "2px solid #A8C5A0",
                }}
                animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.65,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                inset: "35%",
                borderRadius: "50%",
                background: "#A8C5A0",
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#C4B5D6",
            }}
          >
            Timeout in {countdown}s
          </p>
        </>
      ) : (
        /* Found! */
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #A8C5A0, #7EB3C9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              marginBottom: 28,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: 2 }}
          >
            ✓
          </motion.div>

          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px, 4vmin, 48px)",
              color: "#4A6B5C",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            A neighbor is ready!
          </h2>

          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(14px, 2vmin, 22px)",
              color: "#7EB3C9",
            }}
          >
            Someone nearby wants to play with you
          </p>
        </motion.div>
      )}

      {/* Rainbow bar */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "linear-gradient(90deg, #A8C5A0, #7EB3C9, #F4A57A, #C4B5D6, #A8C5A0)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
