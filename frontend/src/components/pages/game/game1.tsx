import React from 'react';
import { motion } from 'framer-motion';
import './game.css';

/**
 * Game1 Component - Hero section for the Guerrero Maya game
 * Displays the main game introduction with animated elements
 * and call-to-action buttons
 */
const Game1 = () => {
  return (
    <motion.section 
      className="game-section game1-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="game1-content">
        <h2 className="game1-title">
          Defend the Sacred Lands<br />
          <span className="subtitle">The AI-Powered Strategy Game</span>
        </h2>
        <div className="game1-text">
          A battle is unfolding in Guerrero Maya, where warriors must defend the sacred maguey fields 
          from the invasion of mythological forces. Powered by blockchain ownership and AI-driven gameplay, 
          this strategic defense game challenges players to master tactical unit placement, adaptive AI battles, 
          and $MZCAL-powered upgrades.
        </div>
        <div className="game-buttons">
          <motion.button 
            className="game-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Whitepaper
          </motion.button>
          <motion.button 
            className="game-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Coming Soon
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default Game1;
