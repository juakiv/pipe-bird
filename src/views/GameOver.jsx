function GameOver({ score, highScore, restart }) {
  return (
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
      <button onClick={restart}>Play Again</button>
    </div>
  );
}

export default GameOver;