import { useEffect, useState, useRef } from "react";
import Game from "./game";
import { useUpdaringRef } from "./hooks/useUpdatingRef";
import InGame from "./views/InGame.jsx";
import Paused from "./views/Paused.jsx";
import Guide from "./views/Guide.jsx";
import GameOver from "./views/GameOver.jsx";
import Loading from "./views/Loading.jsx";

function App() {
  const canvasRef = useRef(null);
  const [game, setGame] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [view, setView, viewRef] = useUpdaringRef("loading");

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
      if(viewRef.current === "game" || viewRef.current === "paused") {
        game.togglePause();
      } else if(viewRef.current === "gameover") {
        game.restart();
      }
    }
  }

  const clampedCanvasHeight = () => {
    return Math.min(Math.max(window.innerHeight, 600), 800);
  }
  const clampedCanvasWidth = () => {
    return Math.min(Math.max(window.innerWidth, 300), 500);
  }

  return (
    <div id="game-ui" style={{ maxWidth: clampedCanvasWidth() }}>
      {view === "loading" && <Loading />}
      {view === "game" && <InGame score={score} pause={() => game.togglePause()} />}
      {view === "paused" && <Paused score={score} play={() => game.togglePause()} />}
      {view === "guide" && <Guide />}
      {view === "gameover" && <GameOver score={score} highScore={highScore} restart={() => game.restart()} />}
      <canvas id="game" width={clampedCanvasWidth()} ref={canvasRef}></canvas>
    </div>
  )
}

export default App
