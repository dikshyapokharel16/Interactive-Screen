import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#A8C5A0", "#7EB3C9", "#F4A57A", "#C4B5D6", "#F5D678", "#E8D5B0"];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function Confetti({ active }) {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: randomBetween(10, 90),
    color: COLORS[i % COLORS.length],
    size: randomBetween(8, 16),
    delay: randomBetween(0, 0.4),
    rotation: randomBetween(-180, 180),
  }));

  return (
    <AnimatePresence>
      {active && pieces.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            top: "20%",
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? "50%" : 2,
            background: p.color,
            zIndex: 50,
            pointerEvents: "none",
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: ["0%", "120vh"],
            opacity: [1, 1, 0],
            rotate: p.rotation,
          }}
          transition={{
            duration: randomBetween(1.2, 2),
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </AnimatePresence>
  );
}

export default function Celebration({ active, message = "Correct! 🎉" }) {
  return (
    <>
      <Confetti active={active} />
      <AnimatePresence>
        {active && (
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#A8C5A0",
              borderRadius: 24,
              padding: "24px 48px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px, 4vw, 48px)",
              color: "#fff",
              zIndex: 60,
              textAlign: "center",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 40px #A8C5A066",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
