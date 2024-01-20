function Guide() {
  return (
    <div id="start-guide">
      <h1>Get Ready!</h1>
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
    </div>
  )
}

export default Guide;