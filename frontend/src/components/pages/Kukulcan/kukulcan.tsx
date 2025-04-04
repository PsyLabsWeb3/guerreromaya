import Spline from "@splinetool/react-spline";
import Footer from "../footer/footer.tsx";
import "./kukulcan.css";

function Kukulcan() {
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
            <Spline scene="https://prod.spline.design/yHxGE0XGUXpo3eBF/scene.splinecode" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Kukulcan;
