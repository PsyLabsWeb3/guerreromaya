import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import Spline from "@splinetool/react-spline";
import "./mini-games.css";

/**
 * Landing section for Mini-Games featuring Kukulcan
 * Integrates a 3D Spline model for enhanced visual experience
 * Displays the main introduction and game concept
 */
const MG1: React.FC = () => {
  // Estado para almacenar la URL de la escena de Spline según el tamaño de pantalla
  const [splineScene, setSplineScene] = useState("");
  // Estado para detectar si estamos en un dispositivo móvil
  const [isMobile, setIsMobile] = useState(false);
  // Estado para detectar si estamos en desktop
  const [isDesktop, setIsDesktop] = useState(false);

  // Efecto para cambiar la escena según el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      // URLs de las escenas para diferentes tamaños de pantalla
      const desktopScene =
        "https://prod.spline.design/YqHzo8WnzhAH6-I6/scene.splinecode";
      const mobileScene =
        "https://prod.spline.design/nf5VEio78mm9zc4S/scene.splinecode"; // Reemplazar con la URL de la escena móvil

      // Detectar si estamos en un dispositivo móvil o desktop
      const mobile = window.innerWidth < 768;
      const desktop = window.innerWidth >= 992;
      setIsMobile(mobile);
      setIsDesktop(desktop);

      // Establecer la escena según el ancho de la ventana
      setSplineScene(mobile ? mobileScene : desktopScene);
    };

    // Establecer la escena inicial
    handleResize();

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener("resize", handleResize);

    // Limpiar listener al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Estilos específicos para el contenedor de Spline según el dispositivo
  const getSplineContainerStyle = () => {
    if (isMobile) {
      return { marginTop: "12rem" };
    } else if (isDesktop) {
      return {
        height: "700px",
        width: "100%",
        overflow: "visible" as const,
        position: "relative" as const,
      };
    }
    return {};
  };

  // Estilos específicos para el componente Spline según el dispositivo
  const getSplineStyle = () => {
    if (isDesktop) {
      return {
        width: "100%",
        height: "100%",
        position: "absolute" as const,
        top: "0",
        left: "0",
      };
    }
    return {};
  };

  // Estilos específicos para el contenedor de texto según el dispositivo
  const getTextContentStyle = () => {
    if (isMobile) {
      return { marginTop: "0", paddingTop: "0" };
    } else if (isDesktop) {
      return { marginTop: "-7rem", paddingTop: "0" };
    }
    return {};
  };

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
      {/* Contenedor flex responsivo */}
      <div className="mg-flex-container">
        {/* Left column - Kukulcan character */}
        <motion.div
          className="mg-image-container"
          {...variants.imageContainer}
          style={getSplineContainerStyle()}
        >
          {/* Renderizar Spline solo si hay una escena seleccionada */}
          {splineScene && (
            <div style={getSplineStyle()}>
              <Spline scene={splineScene} />
            </div>
          )}
        </motion.div>

        {/* Right column - Main content */}
        <motion.div
          className="mg-text-content"
          {...variants.textContent}
          style={getTextContentStyle()}
        >
          {/* Main title section */}
          <div
            className="mg-title-container"
            style={isMobile ? { marginTop: "0", paddingTop: "0" } : {}}
          >
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
