import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mzcalVariants } from "../../animations/mzcal-variants";
import Spline from "@splinetool/react-spline";

const utilityData = [
  {
    title: "Game Transactions",
    description:
      "Buy, sell, and upgrade ERC-1155 NFTs (warriors, artifacts, and power-ups).",
    sceneUrl: "https://prod.spline.design/XuX67Z47FmKgJDcN/scene.splinecode",
  },
  {
    title: "Mini-Games & SocialFi Rewards",
    description:
      "Earn MZCAL through daily quests, leaderboards, and AI-driven campaigns.",
    sceneUrl: "https://prod.spline.design/8Aj6e9J0uETM2WKi/scene.splinecode",
  },
  {
    title: "Marketplace & Trading",
    description:
      "The main currency for NFT trading, in-game economy, and RWA mezcal investments.",
    sceneUrl: "https://prod.spline.design/mbVtcUZYLCXXa7Kv/scene.splinecode",
  },
  {
    title: "Staking & Liquidity",
    description:
      "Earn rewards by providing liquidity and staking MZCAL in ecosystem pools.",
    sceneUrl: "https://prod.spline.design/euNRIifate7FFpWH/scene.splinecode",
  },
  {
    title: "Burn Mechanisms",
    description:
      "Used for NFT enhancements, premium weapons, and exclusive assets, maintaining scarcity.",
    sceneUrl: "https://prod.spline.design/9j6b-GXrPSlKL9Xr/scene.splinecode",
  },
  {
    title: "Real-World Utility",
    description:
      "Tokenized mezcal barrels as fractionalized investments with on-chain liquidity options.",
    sceneUrl: "https://prod.spline.design/iT-OJ5QwCq7smfJO/scene.splinecode",
  },
];

const MzCal3: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const section = sectionRef.current;
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
          const progress =
            Math.abs(sectionTop - windowHeight / 2) / (sectionHeight / 2);
          const totalItems = utilityData.length - 1;
          const newIndex = Math.min(
            Math.max(Math.floor(progress * totalItems), 0),
            totalItems
          );

          if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
            setIsLoading(true);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setIsLoading(true);
  };

  const onSplineLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.section
      className="mzcal-section"
      style={{
        background:
          "url('/soilEdit.png'), linear-gradient(-95deg,rgba(0, 13, 26, 0.82),rgb(11, 11, 11))",
        backgroundSize: "cover, cover",
        backgroundBlendMode: "overlay",
      }}
      variants={mzcalVariants.section}
      initial="initial"
      animate="animate"
      exit="exit"
      ref={sectionRef}
    >
      <div className="mzcal-container">
        <h3 className="mzcal-subtitle">Utility</h3>
        <p className="mzcal-text">
          MZCAL is the core currency of Guerrero Maya, enabling in-game
          transactions, marketplace trading, and real-world asset investments
        </p>

        <motion.div
          className="mzcal-utility-scroll"
          variants={mzcalVariants.utility.container}
        >
          <motion.div
            className="mzcal-utility-list"
            variants={mzcalVariants.utility.list}
          >
            {utilityData.map((item, index) => (
              <motion.div
                key={index}
                className={`mzcal-utility-item ${
                  index === activeIndex ? "active" : ""
                }`}
                variants={mzcalVariants.utility.item}
                whileHover="hover"
                onClick={() => handleItemClick(index)}
              >
                {item.title}
              </motion.div>
            ))}
          </motion.div>

          <div className="mzcal-utility-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="mzcal-utility-description"
                variants={mzcalVariants.utility.description}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "320px",
                    background: "transparent",
                    overflow: "hidden",
                    position: "relative",
                    minHeight: "300px",
                  }}
                >
                  {isLoading && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        zIndex: 1,
                      }}
                    >
                      Loading...
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      opacity: isLoading ? 0 : 1,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    <Spline
                      ref={splineRef}
                      scene={utilityData[activeIndex].sceneUrl}
                      onLoad={onSplineLoad}
                    />
                  </div>
                </div>
                {utilityData[activeIndex].description}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MzCal3;
