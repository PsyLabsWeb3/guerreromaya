import React from 'react';
import Game1 from './game1';

/**
 * Game Component - Main container for game sections
 * Manages the layout and rendering of game-related components
 */
const Game = () => {
  return (
    <div className="Game">
      <Game1 />
      {/* Aquí se añadirán los demás componentes Game2, Game3, etc. */}
    </div>
  );
};

export default Game;
