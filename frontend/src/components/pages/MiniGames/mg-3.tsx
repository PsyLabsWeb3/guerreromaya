import React from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import templeImg from "../../../assets/images/temple.png"; // Temple image with Kukulcan
import iconGM from "../../../assets/icons/iconGMsmall.png"; // Icon import
import "./mini-games.css";

/**
 * Knowledge Testing section with quiz functionality
 * Implements a step-by-step learning process
 * Features temple imagery and interactive learning cards
 */

/** Type definition for learning step cards */
interface StepData {
  icon: string;
  title: string;
  text: string;
}

/** Learning process steps configuration */
const stepsData: StepData[] = [
  { icon: iconGM, title: "1. LEARN", text: "Ask Kukulcán about GM ecosystem" },
  {
    icon: iconGM,
    title: "2. PROVE",
    text: "Take the Quiz and prove your understanding",
  },
  {
    icon: iconGM,
    title: "3. EARN",
    text: "Get $MZCAL based on your quiz score",
  },
];

/**
 * MG3 Component - Knowledge Testing Section
 * @description Features the quiz system and learning process
 */
const MG3: React.FC = () => (
  <motion.div className="mg-section mg-3" {...variants.section}>
    {/* Title with animation */}
    <motion.div className="mg-title-container" {...variants.textContent}>
      <motion.h2 className="mg-title" {...variants.title}>
        KUKULCAN'S TRIALS
      </motion.h2>
    </motion.div>

    {/* Content container with responsive layout */}
    <motion.div className="mg-content-wrapper" {...variants.textContent}>
      {/* Hidden on desktop, visible on mobile - Temple Image */}
      <div className="mg-mobile-image">
        <motion.div className="mg-image" {...variants.imageContainer}>
          <motion.img
            src={templeImg}
            alt="Temple with Kukulcan"
            {...variants.image}
          />
        </motion.div>
      </div>

      {/* Grid layout for desktop */}
      <motion.div className="mg-content-grid">
        {/* Left column - Text */}
        <div className="mg-text-content">
          <motion.h3 className="text-highlight" {...variants.subtitle}>
            Test your knowledge of Guerrero Maya!
          </motion.h3>
          <motion.p className="mg-text" style={{ textAlign: "left" }}>
            Kukulcan AI will guide you through key topics from the ecosystem.
            Once ready, take the Quiz and earn your spot in the rewards pool.
          </motion.p>
        </div>

        {/* Right column - Image (hidden on mobile) */}
        <div className="mg-desktop-image mg-image-container">
          <motion.div className="mg-image" {...variants.imageContainer}>
            <motion.img
              src={templeImg}
              alt="Temple with Kukulcan"
              {...variants.image}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>

    {/* How It Works */}
    <div className="mg-how-it-works">
      <motion.h3 className="mg-subtitle" {...variants.subtitle}>
        How It Works
      </motion.h3>

      <div className="steps-container">
        {stepsData.map((step, index) => (
          <div key={index} className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-icon">
                  <img src={step.icon} alt={step.title} />
                </div>
                <h3 className="card-title">{step.title}</h3>
              </div>
              <div className="flip-card-back">
                <p className="card-description">{step.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="mg-button" 
        disabled 
        style={{ 
          fontSize: "1.5rem",
          fontFamily: "lato italic" 
        }}
      >
        Coming Soon
      </button>
    </div>
  </motion.div>
);

export default MG3;