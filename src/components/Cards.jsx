import React, { useState, useEffect } from "react";
import "../styles/Cards.css";
import Card from "./Card";
import GameOverModal from "./GameOverModal";
import CHARACTERS from "../utils/data";

const BEST_SCORE_KEY = "bestScore";

export default function Cards({ score, setScore, highScore, setHighScore }) {
  const [chars, setChars] = useState(CHARACTERS);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const getBestScoreFromLocalStorage = () => {
    const storedBestScore = localStorage.getItem(BEST_SCORE_KEY);
    return storedBestScore ? parseInt(storedBestScore, 10) : 0;
  };

  const updateBestScoreInLocalStorage = (newBestScore) => {
    localStorage.setItem(BEST_SCORE_KEY, newBestScore.toString());
  };

  const randomize = (characters) => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const randCharacters = shuffleArray(characters);
    setChars(randCharacters);
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
    return score !== 0 && score % 10 === 0;
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
      updateBestScoreInLocalStorage(score);
    }
    if (checkWin()) {
      setGameWon(true);
      setGameOver(true);
    }
  }, [score]);

  useEffect(() => {
    const storedBestScore = getBestScoreFromLocalStorage();
    setHighScore(storedBestScore);
  }, []);

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
