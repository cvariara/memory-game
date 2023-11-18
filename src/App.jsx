import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Cards from "./components/Cards";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <>
      <Header score={score} highScore={highScore} />
      <Cards
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    </>
  );
}

export default App;
