import React from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import temple2Img from "../../../assets/images/temple2.png";
import iconGM from "../../../assets/icons/iconGMsmall.png";
import "./mini-games.css";

/**
 * Community Engagement section for social interaction
 * Integrates with Cookie Data Swarm API for analytics
 * Features reward system for community participation
 */

/** Type definition for engagement process steps */
interface EngagementStep {
  icon: string;
  title: string;
  text: string;
}

/** Social engagement process configuration */
const stepsData: EngagementStep[] = [
  {
    icon: iconGM,
    title: "1. POST",
    text: "Create and post content about Guerrero Maya on X (Twitter)",
  },
  {
    icon: iconGM,
    title: "2. ANALYZE",
    text: "Kukulcán analyzes engagement using Cookie Data Swarm API",
  },
  {
    icon: iconGM,
    title: "3. EARN",
    text: "The Top 25 most engaged users receive a $MZCAL allocation",
  },
];

/**
 * MG4 Component - Community Engagement Section
 * @description Features the social engagement system and rewards process
 */
const MG4: React.FC = () => (
  <motion.div 
    className="mg-section mg-4" 
    style={{
      overflowX: "hidden",
      maxWidth: "100%"
    }}
    {...variants.section}>
    {/* Section title */}
    <motion.div className="mg-title-container" {...variants.textContent}>
      <motion.h2 className="mg-title" {...variants.title}>
        The Return of KukulcAn
      </motion.h2>
    </motion.div>

    {/* Content container with responsive layout */}
    <motion.div className="mg-content-wrapper" style={{ overflowX: 'hidden', maxWidth: '100%' }} {...variants.textContent}>
      {/* Hidden on desktop, visible on mobile - Temple Image */}
      <div className="mg-mobile-image">
        <motion.div className="mg-image" {...variants.imageContainer}>
          <motion.img
            src={temple2Img}
            alt="Second Temple"
            {...variants.image}
          />
        </motion.div>
      </div>

      {/* Grid layout for desktop */}
      <motion.div className="mg-content-grid">
        {/* Left column - Temple image (hidden on mobile) */}
        <div className="mg-desktop-image mg-image-container">
          <motion.div className="mg-image" {...variants.imageContainer}>
            <motion.img
              src={temple2Img}
              alt="Second Temple"
              {...variants.image}
            />
          </motion.div>
        </div>
        
        {/* Right column - Text content */}
        <div className="mg-text-content">
          <motion.h3 className="text-highlight" {...variants.subtitle}>
            Amplify Guerrero Maya's reach and be rewarded.
          </motion.h3>
          <motion.p className="mg-text" style={{ textAlign: "left" }}>
            Post, interact, and climb the ranks to earn exclusive rewards. Your
            activity fuels the growth of the community and gets recognized. Become
            a champion of the cause and unlock perks only the brave can reach.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>

    {/* How It Works section */}
    <div className="mg-how-it-works" style={{ overflowX: 'hidden', maxWidth: '100%' }}>
      <motion.h3 className="mg-subtitle" {...variants.subtitle}>
        How It Works
      </motion.h3>

      {/* Engagement steps cards */}
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

      {/* Call to action button */}
      <button
        className="mg-button"
        style={{ 
          marginBottom: "10rem",
          fontSize: "1.5rem",
          fontFamily: "lato italic" 
        }}
        disabled
      >
        Coming Soon
      </button>
    </div>
  </motion.div>
);

export default MG4;