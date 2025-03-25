import React from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import bg2 from "../../../assets/images/bg_2.png";
import iconGM from "../../../assets/icons/iconGMsmall.png";
import "./mini-games.css";

/** Interface for card data structure */
interface CardData {
  icon: string;
  title: string;
  text: string;
}

/** Card data for mini-game types */
const cardData: CardData[] = [
  {
    icon: iconGM,
    title: "ON-CHAIN MINI GAMES",
    text: "Blockchain-based challenges and rewards",
  },
  {
    icon: iconGM,
    title: "OFF-CHAIN MINI GAMES",
    text: "Web-based challenges and rewards",
  },
];

/**
 * MG2 Component - AI-Powered Games Section
 * @description Showcases the different types of mini-games available
 * @returns {JSX.Element} The rendered MG2 component
 */
const MG2: React.FC = () => (
  <motion.div
    className="mg-section mg-2"
    style={{ backgroundImage: `url(${bg2})` }}
    {...variants.section}
  >
    {/* Main content container */}
    <motion.div className="mg-container" {...variants.textContent}>
      {/* Section title */}
      <div className="mg-title-container">
        <motion.h2 className="mg-title" {...variants.title}>
          AI-POWERED MINI-GAMES
        </motion.h2>
      </div>

      {/* Description text */}
      <motion.p className="mg-text" {...variants.textContent}>
        Kukulcán will generate custom challenges based on player activity and
        engagement. Through interactive on-chain and off-chain mini-games, users
        will be able to learn, test their knowledge, and earn $MZCAL as a reward
        for participation. Every interaction brings you closer to unlocking
        exclusive benefits and becoming a true Guerrero Maya.
      </motion.p>

      {/* Game types cards */}
      <div className="steps-container">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="step-card"
            {...variants.card}
            transition={{ ...variants.card.transition, delay: index * 0.2 }}
          >
            <div className="step-card-inner">
              <div className="step-card-front">
                <div className="step-icon">
                  <motion.img
                    src={card.icon}
                    alt={card.title}
                    className="step-icon-image"
                    {...variants.image}
                  />
                </div>
                <motion.h3 className="step-title" {...variants.subtitle}>
                  {card.title}
                </motion.h3>
              </div>
              <div className="step-card-back">
                <p className="step-text">{card.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default MG2;
