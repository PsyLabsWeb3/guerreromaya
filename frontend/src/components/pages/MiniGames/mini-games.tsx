import React from "react";
import MG1 from "./mg-1";
import MG2 from "./mg-2";
import MG3 from "./mg-3";
import MG4 from "./mg-4";
import Footer from "../footer/footer";
import bgImage from "../../../assets/images/mgbg.png";

const MiniGames: React.FC = () => {
  return (
    <div className="MiniGames">
      <MG1 />
      <MG2 />
      <div
        className="mg-dark-section-wrapper"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <MG3 />
        <MG4 />
      </div>
      <Footer />
    </div>
  );
};

export default MiniGames;
