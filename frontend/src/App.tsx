import "./App.css";

// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home3d from "./components/pages/Home/home-3d";
import MiniGames from "./components/pages/mini-games";

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

        <Routes>
          <Route path="/" element={<Home3d />} />
          <Route path="/mini-games" element={<MiniGames />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
