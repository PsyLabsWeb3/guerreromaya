import { motion } from "framer-motion";
import { mzcalVariants } from "../../../components/animations/mzcal-variants";

const MzCal7 = () => {
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

  return (
    <motion.section
      className="mzcal-section mzcal7-container"
      variants={mzcalVariants.section}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mzcal7-background-overlay" />

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

        <motion.h3 className="mzcal7-subtitle" variants={mzcalVariants.fadeIn}>
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
    </motion.section>
  );
};

export default MzCal7;
