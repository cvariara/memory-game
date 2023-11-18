import React from "react";

export default function Card({ character, handleClick, flipped }) {
  const handleCardClick = () => {
    if (!flipped) {
      handleClick(character);
    }
  };

  return (
    <div
      className={`card${flipped ? " flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className='front'>
        <img src={character.src} alt="" />
        <p className="char-name">{character.name}</p>
      </div>
      <div className='back'>
        <img className="back-image" src="/assets/leaf.jpg" alt="" />
      </div>
    </div>
  );
}
