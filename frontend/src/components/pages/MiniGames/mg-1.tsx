import React from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import kukulcanImg from "../../../assets/images/kukulcan.png";
import Spline from "@splinetool/react-spline";

// Imagen del personaje Kukulcán
// Imagen de fondo
import "./mini-games.css";

/**
 * MG1 Component - First Section of Mini-Games
 * @description Displays the introduction section featuring Kukulcan and the main game description
 * @returns {JSX.Element} The rendered MG1 component
 */
const MG1: React.FC = () => (
  <motion.div
    className="mg-section mg-1"
    style={{
      background:
        "url('/mezcalFields.png'), linear-gradient(-45deg,rgba(0, 13, 26, 0.82),rgb(11, 11, 11))",
      backgroundSize: "cover, cover",
      backgroundBlendMode: "overlay",
    }}
    {...variants.section}
  >
    {/* Main grid layout container */}
    <div className="mg-grid">
      {/* Left column - Kukulcan character */}
      <motion.div className="mg-image-container" {...variants.imageContainer}>
        {/* <motion.img
          src={kukulcanImg}
          alt="Kukulcán Warrior"
          className="mg-character"
          {...variants.image}
        /> */}

        <Spline scene="https://prod.spline.design/YqHzo8WnzhAH6-I6/scene.splinecode" />
      </motion.div>

      {/* Right column - Main content */}
      <motion.div className="mg-text-content" {...variants.textContent}>
        {/* Main title section */}
        <div className="mg-title-container">
          <motion.h2
            style={{ justifyContent: "center", textAlign: "center" }}
            className="mg-title"
            {...variants.title}
          >
            KUKULCAN'S MINI-GAMES
          </motion.h2>
        </div>

        {/* Description content */}
        <div className="mg-text-wrapper">
          <motion.h3
            style={{ justifyContent: "center", textAlign: "center" }}
            className="text-highlight"
            {...variants.subtitle}
          >
            KUKULCAN CONTROLS A SERIES OF DYNAMIC MINI-GAMES
          </motion.h3>
          <motion.p
            style={{ justifyContent: "center", textAlign: "center" }}
            className="mg-text"
          >
            challenging players with both on-chain and off-chain tasks. From
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
