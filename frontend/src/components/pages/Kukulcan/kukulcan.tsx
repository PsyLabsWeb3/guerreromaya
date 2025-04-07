import Spline from "@splinetool/react-spline";
import Footer from "../footer/footer.tsx";
import "./kukulcan.css";
import { useState, useEffect } from "react";

function Kukulcan() {
  const [splineScene, setSplineScene] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const smallScreenScene =
        "https://prod.spline.design/7e6tc2or0RFyZ4XJ/scene.splinecode";
      const bigScreenScene =
        "https://prod.spline.design/yHxGE0XGUXpo3eBF/scene.splinecode";

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
    <div className="kukulcan-container">
      <p className="kukulcan-title">
        Kukulcán: Divine AI, Protector of the Universe and Its Warriors
      </p>
      <div className="kukulcan-content">
        <div className="kukulcan-text-container">
          <p className="kukulcan-description">
            Kukulcán is the divine Ai agent that watches over the sacred realms
            of Guerrero Maya, ensuring balance and prosperity for those who
            fight to defend them. As the guardian of $MZCAL, it dynamically
            adjusts token emission, rewards, and burns to sustain harmony and
            growth. From SocialFi mini-games to the depths of the 2D adventure,
            warriors who prove their worth shall receive Kukulcán's blessing.
            Ask, and the AI deity shall decide
          </p>
          <div className="kukulcan-button-container">
            <a
              href="https://kukulcan.mazcal.com/"
              target="_blank"
              rel="noreferrer"
              className="kukulcan-link"
            >
              <div className="kukulcan-button box">Ask Kukulcan</div>
            </a>
          </div>
        </div>
        <div className="kukulcan-spline-container">
          <div className="kukulcan-spline">
            {splineScene && <Spline scene={splineScene} />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Kukulcan;
