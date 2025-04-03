import { useState } from "react";
import { motion } from "framer-motion";
import { mzcalVariants } from "../../../components/animations/mzcal-variants";
import iconGMsmall from "../../../assets/icons/iconGMsmall.png"; // Ruta corregida

const MzCal6 = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      icon: "diamond",
      title: "LIMITED ALLOCATION",
      text: "Only 10% of Supply Available!",
    },
    {
      icon: "target",
      title: "EARLY ACCESS PRICING",
      text: "Secure your tokens before market demand surges!",
    },
    {
      icon: "lightning",
      title: "FUEL THE ECONOMY",
      text: "Be part of the foundation of Guerrero Maya's AI-driven ecosystem!",
    },
  ];

  const benefits = [
    {
      icon: "🎮",
      title: "Game Utility",
      text: "Use $MZCAL for NFT warriors, upgrades, and in-game transactions.",
    },
    {
      icon: "🌟",
      title: "SocialFi & Rewards",
      text: "Earn exclusive staking and SocialFi incentives only available for early holders.",
    },
    {
      icon: "🏺",
      title: "Real-World Utility",
      text: "Invest in tokenized mezcal barrels (RWA) with built-in value appreciation.",
    },
    {
      icon: "💎",
      title: "Treasury & Sustainability",
      text: "5% of all marketplace transactions fuel long-term economic stability.",
    },
    {
      icon: "🧠",
      title: "Future of Web3",
      text: "Your entry into Web3 gaming, AI-powered economies, and real-world asset ownership.",
    },
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const renderIcon = (icon: string) => {
    return <img src={iconGMsmall} alt={icon} className="gm-icon" />;
  };

  return (
    <motion.section
      className="mzcal-section mzcal6-container"
      variants={mzcalVariants.section}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        background:
          "url('/mzcalPresaleRender.png'), linear-gradient(-45deg,rgba(0, 13, 26, 0.82),rgb(11, 11, 11))",
        backgroundSize: "cover, cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <motion.div className="mzcal6-content">
        <motion.h2
          className="mzcal6-title section-title"
          variants={mzcalVariants.fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          PRESALE
        </motion.h2>

        <motion.p
          className="mzcal6-description"
          variants={mzcalVariants.fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          The Guerrero Maya economy is awakening, and you have the exclusive
          opportunity to be among the first warriors to hold $MZCAL before its
          full-scale launch.
        </motion.p>

        <div className="mzcal6-cards-container">
          <div className="mzcal6-cards-navigation">
            {cards.map((_, index) => (
              <motion.div
                key={`nav-${index}`}
                className={`card-nav-dot ${
                  activeCard === index ? "active" : ""
                }`}
                onClick={() => setActiveCard(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <div className="mzcal6-cards-stack">
            {cards.map((card, index) => (
              <motion.article
                key={index}
                className={`mzcal6-card ${
                  index === activeCard ? "active" : ""
                }`}
                animate={{
                  scale:
                    index === activeCard
                      ? 1
                      : 0.95 - (index - activeCard) * 0.05,
                  y: (index - activeCard) * -8,
                  zIndex: cards.length - Math.abs(index - activeCard),
                  opacity:
                    index < activeCard ? 0 : 1 - (index - activeCard) * 0.2,
                  rotateX: index === activeCard ? 0 : -5,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                {renderIcon(card.icon)}
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{card.text}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="presale-allocation-strip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              margin: "3rem 0",
              padding: "1.5rem 0",
            }}
          >
            <div
              className="presale-allocation-content"
              style={{
                gap: "0.15rem",
                position: "relative",
                top: "-0.25rem",
              }}
            >
              <h3 className="presale-title" style={{ marginBottom: "1rem" }}>
                PRESALE ALLOCATION
              </h3>
              <div className="presale-amount" style={{ margin: "0" }}>
                <h2>
                  <span className="amount-number">1,000,000</span>
                  <span className="token-symbol">$MZCAL</span>
                </h2>
              </div>
              <p className="presale-price" style={{ marginTop: "1rem" }}>
                $0.99 USD each
              </p>
            </div>
          </motion.div>

          <motion.article
            className="mzcal6-card highlight-card"
            variants={mzcalVariants.card}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <p className="card-text">
              Don't wait! Join the Pre-Sale now and position yourself at the
              core of Guerrero Maya's future.
            </p>
            <div className="mzcal6-buttons">
              <motion.button
                className="mzcal-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                WHITEPAPER
              </motion.button>
              <motion.button
                className="mzcal-button primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                PRESALE
              </motion.button>
            </div>
          </motion.article>
        </div>

        {/* Sección de beneficios de mzcal7 */}
        <motion.div className="mzcal7-content">
          <motion.h2
            className="mzcal7-title"
            variants={mzcalVariants.fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            More Than Just a Token
          </motion.h2>

          <motion.div
            className="mzcal7-intro"
            variants={mzcalVariants.fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p>
              <span className="highlight">
                🔥 $MZCAL is not just a token; it's the heartbeat of Guerrero
                Maya. 🔥
              </span>
            </p>
            <p>
              Every $MZCAL you acquire in the Pre-Sale isn't just an asset—it's
              your key to an AI-powered, player-driven economy where strategy,
              ownership, and engagement define your rewards.
            </p>
          </motion.div>

          <motion.h3
            className="mzcal7-subtitle"
            variants={mzcalVariants.fadeIn}
          >
            🌟 Why Buy in the Pre-Sale?
          </motion.h3>

          <motion.div className="mzcal7-benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-card"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(249, 176, 100, 0.3)",
                }}
              >
                <span className="benefit-icon">{benefit.icon}</span>
                <h4 className="benefit-title">{benefit.title}</h4>
                <p className="benefit-text">{benefit.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default MzCal6;
