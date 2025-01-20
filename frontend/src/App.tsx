import "./App.css";
import Spline from "@splinetool/react-spline";

function App() {
  return (
    <>
      <div></div>
      <h1
        style={{
          color: "yellow",
          fontSize: "50px",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        COMING SOON
      </h1>
      <h1>Guerrero Maya</h1>
      <h2>A unique RWA Mayan Metaverse leveraged with A.I.</h2>
      <div style={{ width: "100%", height: "100vh" }}>
        <Spline scene="https://prod.spline.design/B5p070Rp8cPtBN2x/scene.splinecode" />
      </div>
      {/* <Spline scene="https://prod.spline.design/B5p070Rp8cPtBN2x/scene.splinecode" /> */}
    </>
  );
}

export default App;
