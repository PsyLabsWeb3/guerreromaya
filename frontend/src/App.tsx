import "./App.css";

// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useTouchScroll from "./components/utils/useTouchScroll";
import Navigation from "./components/nav/Navigation";
import Home3d from "./components/pages/Home/home-3d";
import MiniGames from "./components/pages/MiniGames/mini-games";
import Barrels from "./components/pages/Barrels/barrels";
import Kukulcan from "./components/pages/Kukulcan/kukulcan";

import MzCal from "./components/pages/mzcal/mzcal";

function App() {
  useTouchScroll();
  return (
    <Router>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Navigation />
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
