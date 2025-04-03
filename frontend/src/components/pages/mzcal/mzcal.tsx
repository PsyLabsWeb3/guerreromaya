import React from "react";
import "./mzcal.css";
import MzCal1 from "./mzcal1";
import MzCal2 from "./mzcal2";
import MzCal3 from "./mzcal3";
import MzCal4 from "./mzcal4";
import MzCal5 from "./mzcal5";
import MzCal6 from "./mzcal6";
import MzCal8 from "./mzcal8";
import Footer from "../footer/footer";
// import Section2 from "./section2";
// import Section3 from "./section3";
// import Section4 from "./section4";
// import bgImage from "../../../assets/images/mzcalbg.png";

const MzCal: React.FC = () => {
  return (
    <div className="MzCal">
      <MzCal1 />
      <MzCal2 />
      <MzCal3 />
      <MzCal4 />
      <MzCal5 />
      <MzCal6 />
      {/* <MzCal7 /> */}
      <MzCal8 />
      <Footer />
      {/* <Section2 />
      <div
        className="mzcal-dark-section-wrapper"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Section3 />
        <Section4 />
      </div> */}
    </div>
  );
};

export default MzCal;
