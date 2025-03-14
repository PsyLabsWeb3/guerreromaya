import Spline from "@splinetool/react-spline";
import { useState } from "react";
import "./home-3d.css"; // Import the CSS file

function Home3D() {
  const [isLoading, setIsLoading] = useState(true);
  const handleSplineLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  return (
    <div>
      <div className={`loading-screen ${isLoading ? "visible" : "hidden"}`}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "2rem",
            color: "white",
          }}
        >
          <div
            className="loading-text"
            style={{
              marginBottom: "2rem",
              fontFamily: "cinzel-decorative",
              color: "#f9b064",
            }}
          >
            Loading...
          </div>
          <div className="snake">
            <div
              className="segment"
              style={{
                top: "10px",
                left: "-40px",
                width: "10px",
                height: "10px",
              }}
            ></div>
            <div
              className="segment"
              style={{
                top: "10px",
                left: "-30px",
                width: "10px",
                height: "10px",
              }}
            ></div>
            <div
              className="segment"
              style={{
                top: "0px",
                left: "-20px",
                width: "15px",
                height: "15px",
              }}
            >
              <div className="feather"></div>
            </div>
            <div className="segment" style={{ top: "0px", left: "0px" }}>
              <div className="feather"></div>
            </div>
            <div className="segment" style={{ top: "0px", left: "20px" }}>
              <div className="feather"></div>
            </div>
            <div className="segment" style={{ top: "0px", left: "40px" }}>
              <div className="feather"></div>
            </div>
            <div className="segment" style={{ top: "0px", left: "60px" }}>
              <div className="feather"></div>
            </div>
            <div className="segment" style={{ top: "0px", left: "80px" }}>
              <div className="feather"></div>
            </div>

            <div className="head">
              <div
                className="feather"
                style={{ left: "-2px", top: "-15px", rotate: "0deg" }}
              ></div>
              <div
                className="feather"
                style={{ left: "-10px", top: "-10px", rotate: "-30deg" }}
              ></div>
              <div
                className="feather"
                style={{ left: "-12px", top: "0px", rotate: "-60deg" }}
              ></div>
              <div
                className="feather"
                style={{ left: "-12px", top: "11px", rotate: "-72deg" }}
              ></div>
              <div
                className="feather"
                style={{ left: "-10px", top: "24px", rotate: "-80deg" }}
              ></div>

              <div className="eye"></div>

              <div
                className="fang right"
                style={{
                  left: "25px",
                  height: "15px",
                  width: "7px",
                  top: "10px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Spline
        scene="https://prod.spline.design/B5p070Rp8cPtBN2x/scene.splinecode"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onLoad={handleSplineLoad}
      />
    </div>
  );
}

export default Home3D;
