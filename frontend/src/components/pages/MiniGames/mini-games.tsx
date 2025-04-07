import React from "react";
import MG1 from "./mg-1";
import MG2 from "./mg-2";
import MG3 from "./mg-3";
import MG4 from "./mg-4";
import Footer from "../footer/footer";
import bgImage from "../../../assets/images/mgbg.png";

/**
 * Main MiniGames component that orchestrates all game sections
 * Handles the layout structure and background management for different game sections
 * Wraps MG3 and MG4 in a dark themed container for visual consistency
 */
const MiniGames: React.FC = () => (
  <div className="MiniGames" style={{ 
    width: '100%', 
    maxWidth: '100vw', 
    overflow: 'hidden',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0
  }}>
    <div style={{ 
      overflow: 'hidden', 
      width: '100%', 
      maxWidth: '100%',
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    }}>
      <MG1 />
      <MG2 />
      <div
        className="mg-dark-section-wrapper"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          overflowX: 'hidden',
          maxWidth: '100%'
        }}
      >
        <MG3 />
        <MG4 />
      </div>
      <Footer />
    </div>
  </div>
);

export default MiniGames;
