import React from "react";
import "../styles/Header.css"

export default function Header({ score, highScore }) {

  return(
    <header>
      <h1 className="title">Shinobi Memory</h1>
      <div className="scores">
        <p className="score">Score: {score}</p>
        <p className="high-score">High Score: {highScore}</p>
      </div>
    </header>
  )
}