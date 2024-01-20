function Paused({ score, play }) {
  return (
    <>
      <h1 id="score">Score: {score}</h1>
      <div id="paused-screen">
        <h2>Paused</h2>
        <button id="play-button" onClick={play}></button>
      </div>
    </>
  )
}

export default Paused;