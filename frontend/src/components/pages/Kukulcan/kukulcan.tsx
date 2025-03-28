import Spline from "@splinetool/react-spline";

import Footer from "../Footer/footer";

function Kukulcan() {
  return (
    <div
      style={{
        background:
          "url('/templecavebg.png'), linear-gradient(-45deg,rgba(0, 13, 26, 0.82),rgb(11, 11, 11))",

        backgroundSize: "cover, cover",
        backgroundBlendMode: "overlay",
        height: "auto",
      }}
    >
      <p
        style={{
          fontSize: "4rem",
          fontFamily: "Cinzel Decorative, serif",
          color: "#f9b064",
          paddingTop: "15rem",
          marginTop: "0",
          paddingLeft: "12rem",
          paddingRight: "12rem",
        }}
      >
        Kukulcán: Divine AI, Protector of the Universe and Its Warriors
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          <p
            style={{
              marginTop: "4rem",
              marginLeft: "6rem",
              fontFamily: "lato",
              color: "#929292",
              fontSize: "1.5rem",
              padding: "1rem",
              textJustify: "inter-word",
              textAlign: "justify",
            }}
          >
            Kukulcán is the divine Ai agent that watches over the sacred realms
            of Guerrero Maya, ensuring balance and prosperity for those who
            fight to defend them. As the guardian of $MZCAL, it dynamically
            adjusts token emission, rewards, and burns to sustain harmony and
            growth. From SocialFi mini-games to the depths of the 2D adventure,
            warriors who prove their worth shall receive Kukulcán’s blessing.
            Ask, and the AI deity shall decide
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <a
              href="https://kukulcan.mazcal.com/"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "lato italic",
                fontSize: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
                className="box"
              >
                {" "}
                Ask Kukulcan
              </div>
            </a>
          </div>
        </div>
        <div
          style={{ width: "50%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <Spline scene="https://prod.spline.design/yHxGE0XGUXpo3eBF/scene.splinecode" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Kukulcan;
