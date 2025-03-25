import React from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import templeImg from "../../../assets/images/temple.png"; // Imagen del templo con Kukulcán
import iconGM from "../../../assets/icons/iconGMsmall.png"; // Importar el icono
import "./mini-games.css";

/** Interface for step data structure */
interface StepData {
  icon: string;
  title: string;
  text: string;
}

/** Steps data for learning process */
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
 * @returns {JSX.Element} The rendered MG3 component
 */
const MG3: React.FC = () => {
  return (
    <motion.div className="mg-section mg-3" {...variants.section}>
      {/* Título con animación */}
      <motion.div className="mg-title-container" {...variants.textContent}>
        <motion.h2 className="mg-title" {...variants.title}>
          KUKULCAN'S TRIALS
        </motion.h2>
      </motion.div>

      {/* Grid con animación */}
      <motion.div className="mg-content-grid" {...variants.textContent}>
        {/* Columna izquierda - Texto */}
        <div className="mg-text-content">
          <motion.h3 className="text-highlight" {...variants.subtitle}>
            Test your knowledge of Guerrero Maya!
          </motion.h3>
          <motion.p className="mg-text">
            Kukulcan AI will guide you through key topics from the ecosystem.
            Once ready, take the Quiz and earn your spot in the rewards pool.
          </motion.p>
        </div>

        {/* Columna derecha - Imagen */}
        <div className="mg-image-container">
          <motion.div className="mg-image" {...variants.imageContainer}>
            <motion.img
              src={templeImg}
              alt="Temple with Kukulcán"
              {...variants.image}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* How It Works */}
      <div className="mg-how-it-works">
        <motion.h3 className="mg-subtitle" {...variants.subtitle}>
          How It Works
        </motion.h3>

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

        <motion.button className="mg-button" disabled {...variants.button}>
          Coming Soon
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MG3;
