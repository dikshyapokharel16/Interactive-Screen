import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Celebration from "../shared/Celebration";

const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(board) {
  for (const [a,b,c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(Boolean)) return "draw";
  return null;
}

export default function TicTacToe({ onFinish }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isYourTurn, setIsYourTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    const w = checkWinner(board);
    if (w) {
      setWinner(w);
      setCelebrating(w !== "draw");
      setTimeout(() => onFinish(w === "draw" ? "draw" : "success"), 2200);
    }
  }, [board]);

  // Simulated neighbor plays after delay
  useEffect(() => {
    if (isYourTurn || winner) return;
    const empties = board.map((v,i) => v === null ? i : null).filter(i => i !== null);
    if (!empties.length) return;
    const timer = setTimeout(() => {
      const pick = empties[Math.floor(Math.random() * empties.length)];
      setBoard(b => { const nb = [...b]; nb[pick] = "O"; return nb; });
      setIsYourTurn(true);
    }, 900 + Math.random() * 600);
    return () => clearTimeout(timer);
  }, [isYourTurn, board, winner]);

  function handleCell(i) {
    if (!isYourTurn || board[i] || winner) return;
    setBoard(b => { const nb = [...b]; nb[i] = "X"; return nb; });
    setIsYourTurn(false);
  }

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #FFF8EE 0%, #FDF0E8 100%)",
        gap: 24,
        padding: "clamp(24px, 4vw, 60px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Celebration active={celebrating} message={winner === "X" ? "You win! 🎉" : "Great game! 🤝"} />

      <h2 style={{ fontFamily:"Poppins,sans-serif", fontWeight:800, fontSize:"clamp(28px,4vw,52px)", color:"#4A6B5C" }}>
        Tic Tac Toe
      </h2>

      <div style={{ display:"flex", gap:16, marginBottom:8 }}>
        <div style={{ padding:"8px 20px", borderRadius:99, background: isYourTurn ? "#EAF3F8":"transparent", border:"2px solid #7EB3C9",
          fontFamily:"Poppins,sans-serif", fontWeight:600, fontSize:16, color:"#4A4A4A" }}>
          You (X) {isYourTurn && !winner ? "← your turn" : ""}
        </div>
        <div style={{ padding:"8px 20px", borderRadius:99, background:!isYourTurn ? "#FDF0E8":"transparent", border:"2px solid #F4A57A",
          fontFamily:"Poppins,sans-serif", fontWeight:600, fontSize:16, color:"#4A4A4A" }}>
          Neighbor (O) {!isYourTurn && !winner ? "← thinking..." : ""}
        </div>
      </div>

      {/* Board */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, width:"min(70vmin,400px)" }}>
        {board.map((val, i) => (
          <motion.button
            key={i}
            onClick={() => handleCell(i)}
            style={{
              aspectRatio:"1",
              background: val ? (val==="X"?"#EAF3F8":"#FDF0E8") : "#FFF8EE",
              border: `3px solid ${val==="X"?"#7EB3C9":val==="O"?"#F4A57A":"#E8D5B0"}`,
              borderRadius:16,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"clamp(32px,7vmin,64px)",
              fontWeight:800,
              color: val==="X"?"#7EB3C9":"#F4A57A",
              cursor: !val && isYourTurn && !winner ? "pointer":"default",
              outline:"none",
            }}
            whileTap={!val && isYourTurn ? { scale:0.92 } : {}}
          >
            {val}
          </motion.button>
        ))}
      </div>

      {/* Rainbow bar */}
      <motion.div
        style={{ position:"absolute", bottom:0, left:0, right:0, height:6,
          background:"linear-gradient(90deg,#A8C5A0,#7EB3C9,#F4A57A,#C4B5D6,#A8C5A0)", backgroundSize:"200% 100%" }}
        animate={{ backgroundPosition:["0% 0%","100% 0%"] }}
        transition={{ duration:6, repeat:Infinity, ease:"linear" }}
      />
    </motion.div>
  );
}
