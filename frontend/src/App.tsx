import "./App.css";

// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home3d from "./components/pages/Home/home-3d";
import MiniGames from "./components/pages/MiniGames/mini-games";
import Barrels from "./components/pages/barrels";
import Kukulcan from "./components/pages/kukulcan";
import MzCal from "./components/pages/mzcal/mzcal";
import iconSmall from "./assets/icons/iconGMsmall.png";

function App() {
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
            // paddingTop: ".5rem",
            zIndex: 1,
            borderBottom: "0.2px solid rgba(255, 255, 255, 0.4)", // Added
            height: "4rem", // Added
            alignContent: "center", // Added
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  marginRight: "4rem",
                  marginLeft: "1rem",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                <img
                  src={iconSmall}
                  alt="Logo"
                  style={{ width: "30px", height: "30px" }}
                />
              </Link>
            </li>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <li>
                <Link
                  to="/mini-games"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    marginRight: "1rem",
                    fontFamily: "inter",
                  }}
                >
                  Mini Games
                </Link>
              </li>
              <li>
                <Link
                  to="/mzcal"
                  style={{
                    color: "#f9b064",
                    textDecoration: "none",
                    marginRight: "1rem",
                    fontFamily: "inter",
                  }}
                >
                  $MZCAL
                </Link>
              </li>
              <li>
                <Link
                  to="/kukulcan"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    marginRight: "1rem",
                    fontFamily: "inter",
                  }}
                >
                  Kukulcan-AI
                </Link>
              </li>

              <li>
                <Link
                  to="/docs"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    marginRight: "1rem",
                    fontFamily: "inter",
                  }}
                >
                  Docs
                </Link>
              </li>
            </div>

            <li>
              <Link
                to="/barrels"
                style={{
                  color: "#f9b064",
                  fontFamily: "inter",
                  textDecoration: "none",
                  marginRight: "5rem",
                  fontSize: "1.5rem",
                }}
              >
                Presale
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home3d />} />
          <Route path="/mini-games" element={<MiniGames />} />
          <Route path="/barrels" element={<Barrels />} />
          <Route path="/kukulcan" element={<Kukulcan />} />
          <Route path="/mzcal" element={<MzCal />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
