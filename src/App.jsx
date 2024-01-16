import { useEffect, useState, useRef } from "react";
import Game from "./game";

function App() {
  const canvasRef = useRef(null);
  const [game, setGame] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [view, setView] = useState("guide");

  useEffect(() => {
    if (canvasRef.current !== null) {
      let gameInstance = new Game(canvasRef.current, updateScore, setView);
      setGame(gameInstance);

      canvasRef.current.height = clampedCanvasHeight();
    }
  }, [canvasRef]);

  useEffect(() => {
    if (game !== null) {
      document.addEventListener("keydown", e => handleKeyPress(e));
      canvasRef.current.addEventListener("click", () => game.jump());

      window.addEventListener("resize", () => canvasRef.current.height = clampedCanvasHeight());
    }
    return () => {
      document.removeEventListener("keydown", () => game.jump());
      canvasRef.current.removeEventListener("click", () => game.jump());
      window.removeEventListener("resize", () => canvasRef.current.height = clampedCanvasHeight());
    }
  }, [game]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score]);

  const updateScore = newScore => {
    setScore(newScore);
  }

  const handleKeyPress = e => {
    if (e.code === "Space") {
      game.jump();
    }

    if (e.code === "Escape") {
      game.togglePause();
    }
  }

  const clampedCanvasHeight = () => {
    return Math.min(Math.max(window.innerHeight, 600), 800);
  }
  const clampedCanvasWidth = () => {
    return Math.min(Math.max(window.innerWidth, 300), 500);
  }

  return (
    <div id="game-ui" style={{maxWidth: clampedCanvasWidth()}}>
      {(view === "game" || view === "paused") &&
      <>
        <div className="pause-button" onClick={() => game.togglePause()}>pause</div>
        <h1 id="score">Score: {score}</h1>
      </>
      }
      {view === "guide" &&
      <div id="start-guide">
        <h2>Get Ready!</h2>
        <div className="guide">
          <div className="keyboard">
            <div className="keyboard-row">
              <div className="key"></div>
              <div className="key"></div>
              <div className="key"></div>
              <div className="key"></div>
              <div className="key"></div>
            </div>
            <div className="keyboard-row">
              <div className="key"></div>
              <div className="key space">SPACE</div>
              <div className="key"></div>
            </div>
          </div>
          <div className="guide-or">OR</div>
          <div className="touch">CLICK<br />TAP</div>
        </div>
      </div>}
      {view === "gameover" &&
      <div id="game-over">
        <h2>Game Over!</h2>
        <div className="game-over-screen">
          <div className={`game-over-medal ${score === 0 ? "medal-poop" : score < 10 ? "medal-bronze" : score < 20 ? "medal-silver" : "medal-gold"}`}>
            {score === 0 ? "💩" : score < 10 ? "🥉" : score < 20 ? "🥈" : "🥇"}
          </div>
          <div className="game-over-score">
            <span>
              <h2>{score}</h2>
              <p>Score</p>
            </span>
            <span>
              <h2>{highScore}</h2>
              <p>Highscore</p>
            </span>
          </div>
        </div>
        <button onClick={() => game.restart()}>Play Again</button>
      </div>}
      <canvas id="game" width={clampedCanvasWidth()} ref={canvasRef}></canvas>
    </div>
  )
}

export default App
