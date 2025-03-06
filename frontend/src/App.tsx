import "./App.css";
import Spline from "@splinetool/react-spline";

function App() {
  return (
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
            <a href="#home" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" style={{ color: "#fff", textDecoration: "none" }}>
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <Spline
        scene="https://prod.spline.design/B5p070Rp8cPtBN2x/scene.splinecode"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

export default App;
