import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import iconGM from "../../../assets/icons/iconGMsmall.png";
import "./mini-games.css";

/**
 * AI-Powered Games section showcasing game types
 * Features interactive flip cards for game category display
 */

/** Type definition for game category cards */
interface CardData {
  icon: string;
  title: string;
  text: string;
}

/** Game categories configuration */
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
 */
const MG2: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Asegurarse de que el video se reproduzca en bucle y sin sonido
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error al reproducir el video:", error);
      });
    }
  }, []);

  return (
    <motion.div
      className="mg-section mg-2"
      style={{
        // backgroundColor: "#000",
        position: "relative",
        overflow: "hidden",
      }}
      {...variants.section}
    >
      {/* Video de fondo */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/videos/calendarEffectBG.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        {/* Overlay para mejorar la legibilidad del contenido */}
        <div className="video-overlay"></div>
      </div>

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
          engagement. Through interactive on-chain and off-chain mini-games,
          users will be able to learn, test their knowledge, and earn $MZCAL as
          a reward for participation. Every interaction brings you closer to
          unlocking exclusive benefits and becoming a true Guerrero Maya.
        </motion.p>

        {/* Game types cards */}
        <div className="steps-container">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              className="flip-card"
              {...variants.card}
              transition={{ ...variants.card.transition, delay: index * 0.2 }}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
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
                <div className="flip-card-back">
                  <p className="step-text">{card.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MG2;
