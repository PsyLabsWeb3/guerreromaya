import React from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import temple2Img from "../../../assets/images/temple2.png";
import iconGM from "../../../assets/icons/iconGMsmall.png";

import "./mini-games.css";

/** Interface for engagement steps data structure */
interface EngagementStep {
  icon: string;
  title: string;
  text: string;
}

/** Steps data for engagement process */
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
 * @returns {JSX.Element} The rendered MG4 component
 */
const MG4: React.FC = () => (
  <motion.div className="mg-section mg-4" {...variants.section}>
    {/* Section title */}
    <motion.div className="mg-title-container" {...variants.textContent}>
      <motion.h2 className="mg-title" {...variants.title}>
        The Return of KukulcAn
      </motion.h2>
    </motion.div>

    {/* Main content grid */}
    <motion.div className="mg-content-grid" {...variants.textContent}>
      {/* Left column - Temple image */}
      <div className="mg-image-container">
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
        <motion.p className="mg-text">
          Post, interact, and climb the ranks to earn exclusive rewards. Your
          activity fuels the growth of the community and gets recognized. Become
          a champion of the cause and unlock perks only the brave can reach.
        </motion.p>
      </div>
    </motion.div>

    {/* How It Works section */}
    <div className="mg-how-it-works">
      <motion.h3 className="mg-subtitle" {...variants.subtitle}>
        How It Works
      </motion.h3>

      {/* Engagement steps cards */}
      <div className="steps-container">
        {stepsData.map((step, index) => (
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
                    src={step.icon}
                    alt={step.title}
                    className="step-icon-image"
                    {...variants.image}
                  />
                </div>
                <motion.h3 className="step-title" {...variants.subtitle}>
                  {step.title}
                </motion.h3>
              </div>
              <div className="step-card-back">
                <p className="step-text">{step.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to action button */}
      <motion.button
        style={{ marginBottom: "10rem" }}
        className="mg-button"
        disabled
        {...variants.button}
      >
        Coming Soon
      </motion.button>
    </div>
  </motion.div>
);

export default MG4;
