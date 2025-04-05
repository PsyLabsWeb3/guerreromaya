import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import Spline from "@splinetool/react-spline";

// Imagen del personaje Kukulcán
// Imagen de fondo
import "./mini-games.css";

/**
 * MG1 Component - First Section of Mini-Games
 * @description Displays the introduction section featuring Kukulcan and the main game description
 * @returns {JSX.Element} The rendered MG1 component
 */
const MG1: React.FC = () => {
  // Estado para almacenar la URL de la escena de Spline según el tamaño de pantalla
  const [splineScene, setSplineScene] = useState("");

  // Efecto para cambiar la escena según el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      // URLs de las escenas para diferentes tamaños de pantalla
      const desktopScene =
        "https://prod.spline.design/YqHzo8WnzhAH6-I6/scene.splinecode";
      const mobileScene =
        "https://prod.spline.design/nf5VEio78mm9zc4S/scene.splinecode"; // Reemplazar con la URL de la escena móvil

      // Establecer la escena según el ancho de la ventana
      setSplineScene(window.innerWidth < 768 ? mobileScene : desktopScene);
    };

    // Establecer la escena inicial
    handleResize();

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener("resize", handleResize);

    // Limpiar listener al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="mg-section mg-1"
      style={{
        background:
          "url('/mzcalTempleMinigamesEDIT.png'), linear-gradient(45deg,rgba(0, 27, 59, 0),rgb(11, 11, 11))",
        backgroundSize: "cover, cover",
        backgroundBlendMode: "overlay",
        backgroundPosition: "bottom, center",
      }}
      {...variants.section}
    >
      {/* Main grid layout container */}
      <div className="mg-grid">
        {/* Left column - Kukulcan character */}
        <motion.div className="mg-image-container" {...variants.imageContainer}>
          {/* Renderizar Spline solo si hay una escena seleccionada */}
          {splineScene && <Spline scene={splineScene} />}
        </motion.div>

        {/* Right column - Main content */}
        <motion.div className="mg-text-content" {...variants.textContent}>
          {/* Main title section */}
          <div className="mg-title-container">
            <motion.h2 className="mg-title" {...variants.title}>
              KUKULCAN'S MINI-GAMES
            </motion.h2>
          </div>

          {/* Description content */}
          <div className="mg-text-wrapper">
            <motion.h3 className="text-highlight" {...variants.subtitle}>
              KUKULCAN CONTROLS A SERIES OF DYNAMIC MINI-GAMES
            </motion.h3>
            <motion.p className="mg-text">
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
};

export default MG1;
