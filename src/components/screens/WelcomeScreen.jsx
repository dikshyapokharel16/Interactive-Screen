import { motion } from "framer-motion";
import { CONNECTED_NEIGHBORHOOD } from "../../data/neighborhoods";

const GAMES = [
  {
    id: "quiz",
    title: "City Quiz",
    description: "Answer questions about Wolfsburg together and discover your city!",
    emoji: "🏙️",
    color: "#7EB3C9",
    bg: "#EAF3F8",
    kidFriendly: false,
  },
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    emoji: "⭕",
    description: "Classic game — take turns to get three in a row!",
    color: "#F4A57A",
    bg: "#FDF0E8",
    kidFriendly: true,
  },
];

function GameButton({ game, onSelect, index }) {
  return (
    <motion.button
      onClick={() => onSelect(game.id)}
      style={{
        background: game.bg,
        border: `3px solid ${game.color}`,
        borderRadius: 24,
        padding: "28px 36px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
        cursor: "pointer",
        minWidth: 260,
        flex: 1,
        position: "relative",
        outline: "none",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03, boxShadow: `0 8px 32px ${game.color}55` }}
    >
      {game.kidFriendly && (
        <span
          style={{
            position: "absolute",
            top: 12,
            right: 14,
            fontSize: 11,
            fontWeight: 700,
            color: game.color,
            background: `${game.color}22`,
            padding: "3px 10px",
            borderRadius: 99,
            letterSpacing: "0.08em",
          }}
        >
          KIDS FRIENDLY
        </span>
      )}

      <span style={{ fontSize: 42 }}>{game.emoji}</span>

      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(18px, 2.8vmin, 28px)",
          color: "#3A4A40",
          lineHeight: 1.1,
        }}
      >
        {game.title}
      </span>

      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(12px, 1.6vmin, 16px)",
          color: "#6A7A70",
          lineHeight: 1.5,
        }}
      >
        {game.description}
      </span>

      <div
        style={{
          marginTop: 6,
          padding: "10px 24px",
          background: game.color,
          borderRadius: 99,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: "#fff",
          letterSpacing: "0.04em",
        }}
      >
        Let's Play
      </div>
    </motion.button>
  );
}

export default function WelcomeScreen({ onSelectGame }) {
  return (
    <motion.div
      className="relative w-full h-full flex flex-col"
      style={{
        background: "linear-gradient(160deg, #FFF8EE 0%, #EEF5F0 50%, #EAF3F8 100%)",
        padding: "clamp(24px, 4vw, 60px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: "clamp(24px, 4vh, 48px)" }}
      >
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(13px, 1.8vmin, 18px)",
            color: "#7EB3C9",
            marginBottom: 8,
            letterSpacing: "0.06em",
          }}
        >
          Connected with {CONNECTED_NEIGHBORHOOD}
        </p>
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 6vmin, 68px)",
            color: "#4A6B5C",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Choose Your Game
        </h1>
      </motion.div>

      {/* Game grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(16px, 2vw, 28px)",
          flex: 1,
          alignContent: "flex-start",
        }}
      >
        {GAMES.map((game, i) => (
          <GameButton key={game.id} game={game} onSelect={onSelectGame} index={i} />
        ))}
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
