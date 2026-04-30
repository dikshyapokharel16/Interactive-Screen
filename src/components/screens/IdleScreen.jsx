import { motion } from "framer-motion";
import { THIS_NEIGHBORHOOD } from "../../data/neighborhoods";

// Pixel art tiles representing Wolfsburg culture
// Each tile is a 8x8 grid of colored cells
const TILE_SIZE = 48; // px per tile cell on screen

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

// Mini pixel art definitions (8x8, each row = array of palette keys, "." = transparent/cream)
const TILES = {
  // VW Logo simplified
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
  // Castle tower
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
  // Tree
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
  // House
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
  // Flower
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
  // Car (VW Beetle style)
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
  // Star / sparkle
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

const TILE_KEYS = Object.keys(TILES);

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
      animate={{
        y: [0, -12, 0],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <PixelTile tileKey={tileKey} size={7} />
    </motion.div>
  );
}

// Deterministic tile layout (so it doesn't re-randomize on re-render)
const TILE_POSITIONS = [
  { tileKey: "tree",    x: 5,  y: 10, delay: 0,   duration: 3.5 },
  { tileKey: "house",   x: 15, y: 65, delay: 0.5, duration: 4.2 },
  { tileKey: "vw",      x: 78, y: 15, delay: 1,   duration: 3.8 },
  { tileKey: "castle",  x: 60, y: 60, delay: 0.3, duration: 4.0 },
  { tileKey: "flower",  x: 88, y: 72, delay: 1.5, duration: 3.2 },
  { tileKey: "car",     x: 42, y: 78, delay: 0.8, duration: 4.5 },
  { tileKey: "tree",    x: 30, y: 5,  delay: 1.2, duration: 3.6 },
  { tileKey: "star",    x: 70, y: 35, delay: 0.2, duration: 2.8 },
  { tileKey: "flower",  x: 8,  y: 42, delay: 1.8, duration: 4.1 },
  { tileKey: "house",   x: 50, y: 18, delay: 0.6, duration: 3.9 },
  { tileKey: "vw",      x: 22, y: 82, delay: 1.4, duration: 3.3 },
  { tileKey: "star",    x: 93, y: 45, delay: 0.9, duration: 2.6 },
];

export default function IdleScreen({ onTouch }) {
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FFF8EE 0%, #EEF5F0 50%, #EAF3F8 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={onTouch}
    >
      {/* Floating pixel art tiles */}
      {TILE_POSITIONS.map((pos, i) => (
        <FloatingTile key={i} {...pos} />
      ))}

      {/* Neighborhood name — top right */}
      <div className="absolute top-6 right-8 flex items-center gap-2">
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#A8C5A0",
          }}
        />
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            color: "#7A9E72",
            letterSpacing: "0.04em",
          }}
        >
          {THIS_NEIGHBORHOOD}
        </span>
      </div>

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ gap: 24 }}
      >
        {/* Small pixel art cluster in center */}
        <motion.div
          className="flex gap-6 mb-4"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelTile tileKey="tree" size={9} />
          <PixelTile tileKey="castle" size={9} />
          <PixelTile tileKey="vw" size={9} />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px, 8vmin, 88px)",
            color: "#4A6B5C",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Touch to Connect
        </motion.h1>

        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(16px, 2.5vmin, 26px)",
            color: "#7A9E72",
            textAlign: "center",
          }}
        >
          Meet your neighbors. Play together.
        </p>
      </div>

      {/* Pulsing glow at bottom */}
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
