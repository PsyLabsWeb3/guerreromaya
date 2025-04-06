import React from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import Spline from "@splinetool/react-spline";
import "./mini-games.css";

/**
 * Landing section for Mini-Games featuring Kukulcan
 * Integrates a 3D Spline model for enhanced visual experience
 * Displays the main introduction and game concept
 */
const MG1: React.FC = () => (
  <motion.div
    className="mg-section mg-1"
    style={{
      background:
        "url('/mezcalFields.png'), linear-gradient(-45deg,rgba(0, 13, 26, 0.82),rgb(11, 11, 11))",
      backgroundSize: "cover, cover",
      backgroundBlendMode: "overlay",
      overflow: "hidden",
      overflowY: "visible",
      maxWidth: "100vw",
      width: "100%",
      boxSizing: "border-box"
    }}
    {...variants.section}
  >
    {/* Main grid layout for two-column design */}
    <div className="mg-grid" style={{ overflow: 'hidden', maxWidth: '100%' }}>
      {/* Left column - Interactive 3D character display */}
      <motion.div className="mg-image-container" style={{ overflow: 'hidden' }} {...variants.imageContainer}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative', 
          overflow: 'hidden', 
          maxWidth: '100%'
        }}>
          <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
            <Spline 
              scene="https://prod.spline.design/YqHzo8WnzhAH6-I6/scene.splinecode"
              style={{ overflow: 'hidden' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Right column - Game introduction and description */}
      <motion.div className="mg-text-content" {...variants.textContent}>
        {/* Main title section */}
        <div className="mg-title-container">
          <motion.h2
            className="mg-title"
            style={{ textAlign: "left" }}
            {...variants.title}
          >
            KUKULCAN'S MINI-GAMES
          </motion.h2>
        </div>

        {/* Description content */}
        <div className="mg-text-wrapper">

          <motion.p
            className="mg-text"
            style={{ textAlign: "left" }}
          >
            Kukulcan controls a series of dynamic mini-games challenging players with both on-chain and off-chain tasks. From
            engagement-based campaigns to on-chain strategic tests, every
            challenge offers the chance to earn{" "}
            <strong className="highlight-text">$MZCAL</strong>.
          </motion.p>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default MG1;
