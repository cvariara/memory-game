import React from "react";
import "../styles/Modal.css"

export default function GameOverModal({ score, restartGame, gameWon }) {
  const handleRestart = () => restartGame();

  return (
    <div className="modal">
      <div className="game-over">
        <p>Game Over!</p>
        {gameWon ? <p>You Win!</p> : <p>You Lose</p>}
        <p>Your final score is {score}</p>
        <button className="play" onClick={handleRestart}>Play Again?</button>
      </div>
    </div>
  );
}
