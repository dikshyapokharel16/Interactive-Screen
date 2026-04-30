import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "../../data/questions";
import ProgressBar from "../shared/ProgressBar";
import Celebration from "../shared/Celebration";

const PLAYER_COLORS = {
  you: { bg: "#EAF3F8", border: "#7EB3C9", label: "You", dot: "#7EB3C9" },
  neighbor: { bg: "#FDF0E8", border: "#F4A57A", label: "Neighbor", dot: "#F4A57A" },
};

function AnswerButton({ label, index, selected, correct, revealed, onSelect }) {
  let bg = "#FFF8EE";
  let border = "#E8D5B0";
  let color = "#4A4A4A";

  if (revealed) {
    if (index === correct) {
      bg = "#A8C5A0"; border = "#7A9E72"; color = "#fff";
    } else if (selected === index && index !== correct) {
      bg = "#F4A57A"; border = "#D4845A"; color = "#fff";
    }
  } else if (selected === index) {
    bg = "#EAF3F8"; border = "#7EB3C9"; color = "#3A4A40";
  }

  return (
    <motion.button
      onClick={() => !revealed && onSelect(index)}
      style={{
        background: bg,
        border: `2.5px solid ${border}`,
        borderRadius: 16,
        padding: "18px 24px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 600,
        fontSize: "clamp(14px, 1.8vmin, 20px)",
        color,
        cursor: revealed ? "default" : "pointer",
        textAlign: "left",
        transition: "background 0.3s, border-color 0.3s",
        outline: "none",
        minHeight: 64,
      }}
      whileTap={!revealed ? { scale: 0.97 } : {}}
      whileHover={!revealed ? { scale: 1.02 } : {}}
    >
      <span style={{ opacity: 0.5, marginRight: 10 }}>
        {["A", "B", "C", "D"][index]}.
      </span>
      {label}
    </motion.button>
  );
}

function PlayerStatus({ player, answer, isTyping }) {
  const c = PLAYER_COLORS[player];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: c.bg,
        border: `2px solid ${c.border}`,
        borderRadius: 12,
        padding: "10px 18px",
        minWidth: 160,
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: c.dot,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: 15,
          color: "#4A4A4A",
        }}
      >
        {c.label}
      </span>
      {isTyping && answer === null && (
        <motion.span
          style={{ fontSize: 18 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        >
          ...
        </motion.span>
      )}
      {answer !== null && (
        <span style={{ fontSize: 18 }}>
          {answer === quizQuestions[0]?.correct ? "✓" : "✗"}
        </span>
      )}
    </div>
  );
}

export default function CityQuiz({ onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const [yourAnswer, setYourAnswer] = useState(null);
  const [neighborAnswer, setNeighborAnswer] = useState(null);
  const [neighborTyping, setNeighborTyping] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const question = quizQuestions[qIndex];

  // Reset state for new question
  useEffect(() => {
    setYourAnswer(null);
    setNeighborAnswer(null);
    setNeighborTyping(false);
    setRevealed(false);
    setCelebrating(false);
  }, [qIndex]);

  // When player answers, simulate neighbor answering after delay
  useEffect(() => {
    if (yourAnswer === null) return;

    setNeighborTyping(true);
    const delay = 1000 + Math.random() * 1200;
    const timer = setTimeout(() => {
      // Neighbor answers correctly ~70% of the time
      const nAnswer = Math.random() < 0.7
        ? question.correct
        : (question.correct + 1) % question.options.length;
      setNeighborAnswer(nAnswer);
      setNeighborTyping(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [yourAnswer]);

  // When both have answered, reveal
  useEffect(() => {
    if (yourAnswer === null || neighborAnswer === null) return;

    const timer = setTimeout(() => {
      setRevealed(true);
      const isCorrect = yourAnswer === question.correct;
      if (isCorrect) {
        setScore((s) => s + 1);
        setCelebrating(true);
        setTimeout(() => {
          setCelebrating(false);
          goNext(true);
        }, 2000);
      } else {
        setWrongCount((w) => w + 1);
        setTimeout(() => goNext(false), 1800);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [yourAnswer, neighborAnswer]);

  function goNext(wasCorrect) {
    if (!wasCorrect && wrongCount + 1 >= 3) {
      onFinish("fail");
      return;
    }
    if (qIndex + 1 >= quizQuestions.length) {
      onFinish("success", score + (wasCorrect ? 1 : 0));
    } else {
      setQIndex((i) => i + 1);
    }
  }

  return (
    <motion.div
      className="relative w-full h-full flex flex-col"
      style={{
        background: "linear-gradient(160deg, #FFF8EE 0%, #EEF5F0 60%, #EAF3F8 100%)",
        padding: "clamp(20px, 3vw, 48px)",
        gap: "clamp(16px, 2.5vh, 28px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Celebration overlay */}
      <Celebration active={celebrating} message="Correct! 🎉" />

      {/* Header: progress + player status */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(14px, 1.5vw, 18px)",
              color: "#7A9E72",
              letterSpacing: "0.06em",
            }}
          >
            CITY QUIZ
          </span>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(14px, 1.5vw, 18px)",
              color: "#7EB3C9",
            }}
          >
            {qIndex + 1} / {quizQuestions.length}
          </span>
        </div>
        <ProgressBar current={qIndex} total={quizQuestions.length} color="#7EB3C9" />

        {/* Player status row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <PlayerStatus
            player="you"
            answer={revealed ? yourAnswer : null}
            isTyping={false}
          />
          <PlayerStatus
            player="neighbor"
            answer={revealed ? neighborAnswer : null}
            isTyping={neighborTyping}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: "clamp(16px, 2vh, 24px)" }}
        >
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(20px, 3.5vmin, 40px)",
              color: "#3A4A40",
              lineHeight: 1.2,
            }}
          >
            {question.question}
          </h2>

          {/* Answer options */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(10px, 1.5vw, 18px)",
              flex: 1,
            }}
          >
            {question.options.map((opt, i) => (
              <AnswerButton
                key={i}
                label={opt}
                index={i}
                selected={yourAnswer}
                correct={question.correct}
                revealed={revealed}
                onSelect={setYourAnswer}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

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
