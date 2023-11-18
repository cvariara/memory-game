import React, { useState, useEffect } from "react";
import "../styles/Cards.css";
import Card from "./Card";
import GameOverModal from "./GameOverModal";
import CHARACTERS from "../utils/data";

export default function Cards({ score, setScore, highScore, setHighScore }) {
  const [chars, setChars] = useState(CHARACTERS);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const randomize = (characters) => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    console.log("test");
    const randCharacters = shuffleArray(characters);
    setChars(randCharacters);
  };

  const handleFlip = (updatedCharacters) => {
    setFlipped(true);
    setTimeout(() => {
      setFlipped(false);
    }, 1500);
    randomize(updatedCharacters);
  };

  const handleClick = (data) => {
    const currentCharacter = chars.find((char) => char.id === data.id);
    const updatedCharacters = chars.map((char) =>
      char.id === data.id ? { ...char, clicked: true } : char
    );

    if (!currentCharacter.clicked) {
      setScore((score) => score + 1);
      setFlipped(true);
      setTimeout(() => {
        randomize(updatedCharacters);
        setTimeout(() => {
          setFlipped(false);
        }, 500);
      }, 1000);
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
    const updatedCharacters = chars.map((char) => ({
      ...char,
      clicked: false,
    }));
    randomize(updatedCharacters);
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
