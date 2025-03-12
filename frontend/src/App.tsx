import "./App.css";
import Spline from "@splinetool/react-spline";
// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MiniGames from "./components/pages/mini-games";

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const handleSplineLoad = () => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // };

  return (
    <Router>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <nav
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            padding: "10px",
            zIndex: 1,
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <li>
              <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/mini-games"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Mini Games
              </Link>
            </li>
          </ul>
        </nav>
        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: `${isLoading ? "flex" : "none"}`,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            zIndex: 2,
          }}
        >
          <h1>Loading...</h1>
        </div> */}
        <Routes>
          <Route
            path="/"
            element={
              <Spline
                scene="https://prod.spline.design/B5p070Rp8cPtBN2x/scene.splinecode"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                // onLoad={handleSplineLoad}
              />
            }
          />
          <Route path="/mini-games" element={<MiniGames />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
