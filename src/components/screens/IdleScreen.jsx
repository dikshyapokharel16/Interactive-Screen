import { motion } from "framer-motion";
import { THIS_NEIGHBORHOOD } from "../../data/neighborhoods";

const PALETTE = {
  cream: "#FFF8EE",
  sage: "#A8C5A0",
  sky: "#7EB3C9",
  coral: "#F4A57A",
  sand: "#E8D5B0",
  lavender: "#C4B5D6",
  darkSage: "#7A9E72",
  darkSky: "#5A8FA8",
  darkCoral: "#D4845A",
  brown: "#8B6A4A",
  white: "#FFFFFF",
  yellow: "#F5D678",
};

const TILES = {
  vw: [
    [".", ".", "sky", "sky", "sky", "sky", ".", "."],
    [".", "sky", ".", ".", ".", ".", "sky", "."],
    ["sky", ".", "sky", ".", ".", "sky", ".", "sky"],
    ["sky", ".", ".", "sky", "sky", ".", ".", "sky"],
    ["sky", ".", "sky", ".", ".", "sky", ".", "sky"],
    [".", "sky", ".", ".", ".", ".", "sky", "."],
    [".", ".", "sky", "sky", "sky", "sky", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
  ],
  castle: [
    [".", "brown", ".", "brown", ".", "brown", ".", "."],
    ["brown", "brown", "brown", "brown", "brown", "brown", "brown", "."],
    ["brown", "sand", "sand", "sand", "sand", "sand", "brown", "."],
    ["brown", "sand", ".", "sand", "sand", ".", "sand", "."],
    ["brown", "sand", "sand", "sand", "sand", "sand", "brown", "."],
    ["brown", "sand", ".", ".", ".", "sand", "brown", "."],
    ["brown", "brown", "brown", "brown", "brown", "brown", "brown", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
  ],
  tree: [
    [".", ".", ".", "sage", ".", ".", ".", "."],
    [".", ".", "sage", "sage", "sage", ".", ".", "."],
    [".", "sage", "sage", "darkSage", "sage", "sage", ".", "."],
    ["sage", "sage", "darkSage", "sage", "darkSage", "sage", "sage", "."],
    [".", "sage", "sage", "sage", "sage", "sage", ".", "."],
    [".", ".", ".", "brown", ".", ".", ".", "."],
    [".", ".", ".", "brown", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
  ],
  house: [
    [".", ".", ".", "coral", "coral", ".", ".", "."],
    [".", ".", "coral", "coral", "coral", "coral", ".", "."],
    [".", "coral", "coral", "coral", "coral", "coral", "coral", "."],
    ["sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand"],
    ["sand", "sky", "sky", "sand", "sand", "sky", "sky", "sand"],
    ["sand", "sky", "sky", "sand", "sand", "sky", "sky", "sand"],
    ["sand", "sand", "sand", "brown", "brown", "sand", "sand", "sand"],
    [".", ".", ".", ".", ".", ".", ".", "."],
  ],
  flower: [
    [".", ".", ".", "yellow", ".", ".", ".", "."],
    [".", ".", "coral", "yellow", "coral", ".", ".", "."],
    [".", "coral", "coral", "yellow", "coral", "coral", ".", "."],
    ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "."],
    [".", "coral", "coral", "yellow", "coral", "coral", ".", "."],
    [".", ".", ".", "sage", ".", ".", ".", "."],
    [".", ".", ".", "sage", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
  ],
  car: [
    [".", ".", "sky", "sky", "sky", "sky", ".", "."],
    [".", "sky", "darkSky", "sky", "sky", "darkSky", "sky", "."],
    ["sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand"],
    ["sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand"],
    [".", "brown", ".", ".", ".", ".", "brown", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
  ],
  star: [
    [".", ".", ".", "yellow", ".", ".", ".", "."],
    [".", ".", "yellow", "yellow", "yellow", ".", ".", "."],
    [".", "yellow", "yellow", "yellow", "yellow", "yellow", ".", "."],
    ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
    [".", "yellow", "yellow", "yellow", "yellow", "yellow", ".", "."],
    [".", ".", "yellow", "yellow", "yellow", ".", ".", "."],
    [".", ".", ".", "yellow", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
  ],
};

function PixelTile({ tileKey, size = 6 }) {
  const grid = TILES[tileKey];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(8, ${size}px)`,
        gridTemplateRows: `repeat(8, ${size}px)`,
        imageRendering: "pixelated",
      }}
    >
      {grid.flat().map((colorKey, i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            backgroundColor: colorKey === "." ? "transparent" : PALETTE[colorKey],
          }}
        />
      ))}
    </div>
  );
}

function FloatingTile({ tileKey, x, y, delay, duration }) {
  return (
    <motion.div
      style={{ position: "absolute", left: `${x}%`, top: `${y}%` }}
      animate={{ y: [0, -14, 0], opacity: [0.7, 1, 0.7] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <PixelTile tileKey={tileKey} size={9} />
    </motion.div>
  );
}

const TILE_POSITIONS = [
  { tileKey: "tree",   x: 4,  y: 8,  delay: 0,   duration: 3.5 },
  { tileKey: "house",  x: 14, y: 63, delay: 0.5, duration: 4.2 },
  { tileKey: "vw",     x: 79, y: 12, delay: 1,   duration: 3.8 },
  { tileKey: "castle", x: 61, y: 58, delay: 0.3, duration: 4.0 },
  { tileKey: "flower", x: 87, y: 70, delay: 1.5, duration: 3.2 },
  { tileKey: "car",    x: 43, y: 76, delay: 0.8, duration: 4.5 },
  { tileKey: "tree",   x: 29, y: 4,  delay: 1.2, duration: 3.6 },
  { tileKey: "star",   x: 71, y: 33, delay: 0.2, duration: 2.8 },
  { tileKey: "flower", x: 7,  y: 40, delay: 1.8, duration: 4.1 },
  { tileKey: "house",  x: 51, y: 15, delay: 0.6, duration: 3.9 },
  { tileKey: "vw",     x: 21, y: 80, delay: 1.4, duration: 3.3 },
  { tileKey: "star",   x: 92, y: 43, delay: 0.9, duration: 2.6 },
];

// Colourful confetti dots scattered in background
const DOTS = [
  { x: 10, y: 20, color: "#F4A57A", size: 12, delay: 0 },
  { x: 85, y: 30, color: "#7EB3C9", size: 9,  delay: 0.7 },
  { x: 55, y: 88, color: "#C4B5D6", size: 14, delay: 1.1 },
  { x: 35, y: 50, color: "#F5D678", size: 8,  delay: 0.3 },
  { x: 68, y: 78, color: "#A8C5A0", size: 11, delay: 1.5 },
  { x: 20, y: 92, color: "#F4A57A", size: 7,  delay: 0.9 },
  { x: 92, y: 60, color: "#F5D678", size: 10, delay: 0.4 },
  { x: 48, y: 5,  color: "#7EB3C9", size: 8,  delay: 1.8 },
  { x: 75, y: 95, color: "#C4B5D6", size: 13, delay: 0.2 },
  { x: 3,  y: 72, color: "#A8C5A0", size: 9,  delay: 1.3 },
];

export default function IdleScreen({ onTouch }) {
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FFF0DC 0%, #E8F8EC 35%, #DCF0FA 65%, #F0E8FF 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={onTouch}
    >
      {/* Colourful radial blobs */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 40% 35% at 15% 20%, rgba(244,165,122,0.25) 0%, transparent 70%),
          radial-gradient(ellipse 35% 30% at 85% 15%, rgba(126,179,201,0.28) 0%, transparent 70%),
          radial-gradient(ellipse 45% 38% at 80% 80%, rgba(196,181,214,0.25) 0%, transparent 70%),
          radial-gradient(ellipse 40% 35% at 20% 80%, rgba(168,197,160,0.28) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 50% 50%, rgba(245,214,120,0.12) 0%, transparent 70%)
        `,
      }} />

      {/* Floating confetti dots */}
      {DOTS.map((dot, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: dot.color,
            opacity: 0.55,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3 + dot.delay, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating pixel art tiles */}
      {TILE_POSITIONS.map((pos, i) => (
        <FloatingTile key={i} {...pos} />
      ))}

      {/* Neighbourhood badge — top left */}
      <motion.div
        className="absolute top-7 left-8 flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(8px)",
          borderRadius: 99,
          padding: "6px 16px 6px 10px",
          border: "1.5px solid rgba(168,197,160,0.4)",
        }}
      >
        <motion.div
          style={{ width: 10, height: 10, borderRadius: "50%", background: "#5DBF72" }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: "#3A7A4A",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}>
          {THIS_NEIGHBORHOOD}
        </span>
      </motion.div>

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ gap: 18, padding: "0 32px" }}
      >
        {/* Pixel art cluster */}
        <motion.div
          className="flex gap-8 mb-2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelTile tileKey="tree" size={11} />
          <PixelTile tileKey="castle" size={11} />
          <PixelTile tileKey="vw" size={11} />
        </motion.div>

        {/* Rainbow divider */}
        <motion.div
          style={{
            width: 80,
            height: 4,
            borderRadius: 99,
            background: "linear-gradient(90deg, #F4A57A, #F5D678, #A8C5A0, #7EB3C9, #C4B5D6)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        />

        {/* Main heading — gradient text */}
        <motion.h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(44px, 9vmin, 96px)",
            textAlign: "center",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #D4845A 0%, #5A8FA8 50%, #7A9E72 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.018, 1] }}
          transition={{
            opacity: { delay: 0.2, duration: 0.7 },
            y: { delay: 0.2, duration: 0.7 },
            scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
        >
          Touch to Connect
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(15px, 2.2vmin, 24px)",
            color: "#5A7A6A",
            textAlign: "center",
            maxWidth: 420,
            lineHeight: 1.5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Meet your neighbors. Play together.
        </motion.p>

        {/* Pulsing touch ring */}
        <motion.div
          style={{
            marginTop: 12,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(244,165,122,0.15), rgba(126,179,201,0.15))",
            border: "2.5px solid transparent",
            backgroundClip: "padding-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "0 0 0 2.5px #F4A57A55, inset 0 0 0 2.5px #7EB3C955",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F4A57A, #7EB3C9)",
          }} />
          <motion.div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: "50%",
              border: "2px solid #C4B5D6",
            }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: "50%",
              border: "2px solid #F5D678",
            }}
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          />
        </motion.div>
      </div>

      {/* Animated rainbow bar at bottom */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "linear-gradient(90deg, #F4A57A, #F5D678, #A8C5A0, #7EB3C9, #C4B5D6, #F4A57A)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
