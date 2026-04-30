import { motion } from "framer-motion";
import { CONNECTED_NEIGHBORHOOD } from "../../data/neighborhoods";

export default function PortalOffer({ onYes, onNo }) {
  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #FFF8EE 0%, #EEF5F0 50%, #EAF3F8 100%)",
        padding: "clamp(24px, 4vw, 60px)",
        gap: 32,
        textAlign: "center",
      }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated portal preview ring */}
      <div style={{ position: "relative", width: 140, height: 140 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `3px solid ${["#A8C5A0", "#7EB3C9", "#C4B5D6"][i]}`,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.3, 0.8] }}
            transition={{
              duration: 2.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: "25%",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #A8C5A0, #7EB3C9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
          }}
        >
          👋
        </div>
      </div>

      <div>
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(26px, 5vmin, 56px)",
            color: "#4A6B5C",
            lineHeight: 1.1,
            marginBottom: 14,
          }}
        >
          You did it together!
        </h2>
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(14px, 2vmin, 22px)",
            color: "#6A7A70",
          }}
        >
          Do you want to meet your neighbor in{" "}
          <span style={{ color: "#7EB3C9", fontWeight: 700 }}>
            {CONNECTED_NEIGHBORHOOD}
          </span>
          ?
        </p>
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <motion.button
          onClick={onYes}
          style={{
            padding: "20px 56px",
            background: "linear-gradient(135deg, #A8C5A0, #7EB3C9)",
            border: "none",
            borderRadius: 99,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(16px, 2.5vmin, 26px)",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 6px 24px #A8C5A055",
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          Open the Portal ✨
        </motion.button>

        <motion.button
          onClick={onNo}
          style={{
            padding: "20px 48px",
            background: "transparent",
            border: "2.5px solid #E8D5B0",
            borderRadius: 99,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(14px, 2vmin, 20px)",
            color: "#7A7A7A",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.04, borderColor: "#C4B5D6" }}
          whileTap={{ scale: 0.96 }}
        >
          Play another game
        </motion.button>
      </div>

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
