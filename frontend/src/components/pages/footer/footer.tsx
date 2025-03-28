import React from "react";
import "./footer.css";
import GuerreroMayaLetters from "../../../assets/img/GUERREOMAYALETTERS.png";
import Monogram from "../../../assets/img/monogramaNobg.png";
import discorIcon from "../../../assets/icons/discordIcon.png";
import xIcon from "../../../assets/icons/xIcon.png";
import telegramIcon from "../../../assets/icons/telegramIcon.png";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-content">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ width: "250px" }}
              src={GuerreroMayaLetters}
              alt="Logo"
            />
            <p>Developed by @Psylabs</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ marginRight: "2rem", width: "70px", height: "auto" }}
              src={Monogram}
              alt="Logo"
            />
          </div>
          <div style={{ marginRight: "2rem" }}>
            <div className="social-icons">
              <a
                href="https://discord.gg/KGtcCJXd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                  src={discorIcon}
                  alt="Discord"
                />
              </a>
              <a
                href="https://x.com/GuerreroMaya_ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                  src={xIcon}
                  alt="Twitter"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={telegramIcon} alt="Telegram" />
              </a>
            </div>
            <p className="copyright">
              © 2025 Guerrero Maya. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
