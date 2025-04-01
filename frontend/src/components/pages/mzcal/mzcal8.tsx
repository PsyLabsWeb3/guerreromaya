import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mzcalVariants } from "../../../components/animations/mzcal-variants";

interface FaqItem {
  question: string;
  answer: string | string[];
}

const MzCal8 = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "What is $MZCAL?",
      answer:
        "$MZCAL is the native token of the Guerrero Maya ecosystem, used for in-game transactions, staking, NFT trading, and real-world asset investments.",
    },
    {
      question: "Which blockchain is $MZCAL on?",
      answer:
        "$MZCAL is deployed on Mode Network, ensuring fast, low-cost, and EVM-compatible transactions.",
    },
    {
      question: "How can I acquire $MZCAL?",
      answer:
        "You can obtain $MZCAL through the presale, in-game marketplace trading, staking rewards, and SocialFi mini-games.",
    },
    {
      question: "What is the total supply of $MZCAL?",
      answer:
        "The total supply of $MZCAL is 1,000,000,000, with controlled emissions governed by Kukulcán AI.",
    },
    {
      question: "How does $MZCAL prevent inflation?",
      answer:
        "Kukulcán AI dynamically adjusts the token's emission, distribution, and burn mechanisms to maintain economic balance and long-term sustainability.",
    },
    {
      question: "What can I use $MZCAL for?",
      answer: [
        "Buying and selling in-game NFTs (ERC-1155 warriors, artifacts, and power-ups)",
        "Participating in mini-games and SocialFi engagement campaigns",
        "Investing in tokenized mezcal barrels (RWA assets)",
        "Staking & liquidity provisioning to earn additional rewards",
      ],
    },
    {
      question: "How does the mezcal barrel investment work?",
      answer:
        "Users can purchase fractionalized ownership of mezcal barrels through ERC-1155 tokens. The barrels age for 12 months, increasing their value by 20%, after which they can be claimed, resold, or used in DeFi as collateral.",
    },
    {
      question: "What is the role of Kukulcán AI in $MZCAL's economy?",
      answer:
        "Kukulcán AI controls token issuance, adjusts rewards, manages difficulty scaling, and executes burn mechanisms, ensuring a balanced and adaptive economy.",
    },
    {
      question: "How does Guerrero Maya ensure long-term sustainability?",
      answer: [
        "AI-driven emission control (1, 3, or 6-month cycles)",
        "Burn mechanisms through NFT upgrades, in-game purchases, and real-world assets",
        "5% of all marketplace transactions go to the treasury, funding ongoing ecosystem growth",
      ],
    },
  ];

  const accordionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="mzcal-section mzcal8-container"
      variants={mzcalVariants.section}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="mzcal8-content">
        <motion.h2
          className="mzcal8-title section-title"
          variants={mzcalVariants.fadeIn}
        >
          FAQs
        </motion.h2>

        <div className="mzcal8-faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`faq-question ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                whileHover={{ scale: 1.01 }}
              >
                <h3>{faq.question}</h3>
                <span className="arrow">▼</span>
              </motion.div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="faq-answer"
                    variants={accordionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {Array.isArray(faq.answer) ? (
                      <ul>
                        {faq.answer.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default MzCal8;
