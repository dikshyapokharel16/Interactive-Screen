import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IdleScreen from "./components/screens/IdleScreen";
import WaitingScreen from "./components/screens/WaitingScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import PortalScreen from "./components/screens/PortalScreen";
import PortalOffer from "./components/shared/PortalOffer";
import CityQuiz from "./components/games/CityQuiz";
import TicTacToe from "./components/games/TicTacToe";

const SCREEN = {
  IDLE: "idle",
  WAITING: "waiting",
  WELCOME: "welcome",
  GAME: "game",
  PORTAL_OFFER: "portal_offer",
  PORTAL: "portal",
  FAIL: "fail",
};

function FailScreen({ onRetry, onMenu }) {
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(160deg,#FFF8EE,#FDF0E8)",
        gap: 28,
        textAlign: "center",
        padding: 40,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span style={{ fontSize: 72 }}>😅</span>
      <h2
        style={{
          fontFamily: "Poppins,sans-serif",
          fontWeight: 800,
          fontSize: "clamp(28px,4vw,52px)",
          color: "#4A6B5C",
        }}
      >
        So close! Try again?
      </h2>
      <p
        style={{
          fontFamily: "Poppins,sans-serif",
          fontSize: "clamp(16px,2vw,24px)",
          color: "#7A9E72",
        }}
      >
        You can do it together!
      </p>
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <motion.button
          onClick={onRetry}
          style={{
            padding: "18px 48px",
            background: "#7EB3C9",
            border: "none",
            borderRadius: 99,
            fontFamily: "Poppins,sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#fff",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Try again
        </motion.button>
        <motion.button
          onClick={onMenu}
          style={{
            padding: "18px 40px",
            background: "transparent",
            border: "2.5px solid #E8D5B0",
            borderRadius: 99,
            fontFamily: "Poppins,sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: "#7A7A7A",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Choose another game
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [screen, setScreen] = useState(SCREEN.IDLE);
  const [currentGame, setCurrentGame] = useState(null);

  function goIdle() {
    setScreen(SCREEN.IDLE);
    setCurrentGame(null);
  }
  function goWelcome() {
    setScreen(SCREEN.WELCOME);
  }
  function goPortal() {
    setScreen(SCREEN.PORTAL);
  }

  function handleGameFinish(result) {
    if (result === "fail") {
      setScreen(SCREEN.FAIL);
    } else {
      setScreen(SCREEN.PORTAL_OFFER);
    }
  }

  function handleSelectGame(gameId) {
    setCurrentGame(gameId);
    setScreen(SCREEN.GAME);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AnimatePresence mode="wait">
        {screen === SCREEN.IDLE && (
          <motion.div key="idle" style={{ position: "absolute", inset: 0 }}>
            <IdleScreen onTouch={() => setScreen(SCREEN.WAITING)} />
          </motion.div>
        )}

        {screen === SCREEN.WAITING && (
          <motion.div key="waiting" style={{ position: "absolute", inset: 0 }}>
            <WaitingScreen
              onPlayerFound={goWelcome}
              onTimeout={goIdle}
            />
          </motion.div>
        )}

        {screen === SCREEN.WELCOME && (
          <motion.div key="welcome" style={{ position: "absolute", inset: 0 }}>
            <WelcomeScreen onSelectGame={handleSelectGame} />
          </motion.div>
        )}

        {screen === SCREEN.GAME && (
          <motion.div
            key={`game-${currentGame}`}
            style={{ position: "absolute", inset: 0 }}
          >
            {currentGame === "quiz" && (
              <CityQuiz onFinish={handleGameFinish} />
            )}
            {currentGame === "tictactoe" && (
              <TicTacToe onFinish={handleGameFinish} />
            )}
          </motion.div>
        )}

        {screen === SCREEN.PORTAL_OFFER && (
          <motion.div
            key="portal-offer"
            style={{ position: "absolute", inset: 0 }}
          >
            <PortalOffer onYes={goPortal} onNo={goWelcome} />
          </motion.div>
        )}

        {screen === SCREEN.PORTAL && (
          <motion.div key="portal" style={{ position: "absolute", inset: 0 }}>
            <PortalScreen onEnd={goIdle} />
          </motion.div>
        )}

        {screen === SCREEN.FAIL && (
          <motion.div key="fail" style={{ position: "absolute", inset: 0 }}>
            <FailScreen
              onRetry={() => setScreen(SCREEN.GAME)}
              onMenu={goWelcome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
