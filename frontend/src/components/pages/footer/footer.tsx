import React from "react";
import "./Footer.css";
import GuerreroMayaLetters from "../../../assets/img/GUERREOMAYALETTERS.png";
import Monogram from "../../../assets/img/monogramaNobg.png";

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
            <p>Developed by Psylabs</p>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="social-icons">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/twitter.svg" alt="Twitter" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/facebook.svg" alt="Discord" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/instagram.svg" alt="Telegram" />
              </a>
            </div>
            <p className="copyright">
              © 2025 Guerrero Maya. All rights reserved.
            </p>
            <img
              style={{ marginRight: "2rem", width: "70px", height: "auto" }}
              src={Monogram}
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
