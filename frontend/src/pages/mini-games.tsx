import React from "react";
import MG1 from "../components/mg-1";
import MG2 from "../components/mg-2";
import MG3 from "../components/mg-3";
import MG4 from "../components/mg-4";
import bgImage from "../assets/images/mgbg.png";

const MiniGames: React.FC = () => {
  return (
    <div className="MiniGames">
      <MG1 />
      <MG2 />
      <div className="mg-dark-section-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
        <MG3 />
        <MG4 />
      </div>
    </div>
  );
};

export default MiniGames;
