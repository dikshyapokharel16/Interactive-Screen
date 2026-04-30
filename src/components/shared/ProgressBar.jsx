import { motion } from "framer-motion";

export default function ProgressBar({ current, total, color = "#7EB3C9" }) {
  const pct = (current / total) * 100;
  return (
    <div
      style={{
        width: "100%",
        height: 12,
        background: "#E8D5B0",
        borderRadius: 99,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: color,
          borderRadius: 99,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
