import React, { useState, useEffect } from "react";
import "../styles/Cards.css"
import Card from "./Card";
import GameOverModal from "./GameOverModal";
import CHARACTERS from "../utils/data";

export default function Cards({ score, setScore, highScore, setHighScore }) {
  const [chars, setChars] = useState(CHARACTERS);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const randomize = () => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const randCharacters = shuffleArray(chars);
    setChars(randCharacters);
  };


  const handleFlip = () => {
    setFlipped(true);
    setTimeout(() => {
      randomize();
      setFlipped(false);
    }, 1000);
  }

  const handleClick = (data) => {
    const currentCharacter = chars.find((char) => char.id === data.id);
    if (!currentCharacter.clicked) {
      currentCharacter.clicked = true;
      setScore((score) => score + 1);
      handleFlip();
    } else {
      setGameOver(true);
    }
  };

  const checkWin = () => {
    if (chars.every((char) => char.clicked)) return true;
    return false;
  };

  const restartGame = () => {
    if (!gameWon) setScore(0);
    else setGameWon(false);

    setGameOver(false);
    setChars(
      CHARACTERS.map((character) => {
        character.clicked = false;
        return character;
      })
    );
    randomize();
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
    if (checkWin()) {
      setGameWon(true);
      setGameOver(true);
    }
  }, [score]);

  return (
    <>
      <div className="cards">
        {chars.map((character) => (
          <Card
            key={character.id}
            character={character}
            handleClick={handleClick}
            flipped={flipped}
          />
        ))}
      </div>
      {gameOver && (
        <GameOverModal
          score={score}
          restartGame={restartGame}
          gameWon={gameWon}
        />
      )}
    </>
  );
}
