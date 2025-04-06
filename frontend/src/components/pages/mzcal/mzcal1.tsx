import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import Spline from "@splinetool/react-spline";

const MzCal1: React.FC = () => {
  const [splineScene, setSplineScene] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const smallScreenScene =
        "https://prod.spline.design/ofbwhTfJlkWakZSn/scene.splinecode";
      const bigScreenScene =
        "https://prod.spline.design/H2mx0V7kU06jXC2l/scene.splinecode";

      setSplineScene(
        window.innerWidth < 768 ? smallScreenScene : bigScreenScene
      );
    };

    // Establecer la escena inicial
    handleResize();

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener("resize", handleResize);

    // Limpiar listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section
      className="mzcal-section"
      style={{
        background:
          "url('/mzcalbg1.png'), linear-gradient(-45deg,rgba(0, 13, 26, 0.82),rgb(11, 11, 11))",
        backgroundSize: "cover, cover",
        backgroundBlendMode: "overlay",
      }}
      {...variants.section}
    >
      <div className="mzcal-container">
        <div className="mzcal-container-flex">
          <div>
            <motion.h2 className="mzcal-title" {...variants.title}>
              Ignite the Sacred Flame of $MZCAL
            </motion.h2>
            <motion.p className="mzcal-text" {...variants.textContent}>
              $MZCAL follows a circular economy guided by Kukulcán, balancing
              emission, distribution, and burns to maintain stable pricing and
              robust utility.
            </motion.p>
          </div>
          <div className="spline-section">
            {splineScene && (
              <Spline
                scene={splineScene}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MzCal1;
