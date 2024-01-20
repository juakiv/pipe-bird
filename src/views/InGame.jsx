function InGame({ score, pause }) {
  return (
    <>
      <button id="pause-button" onClick={pause}></button>
      <h1 id="score">Score: {score}</h1>
    </>
  )
}

export default InGame;