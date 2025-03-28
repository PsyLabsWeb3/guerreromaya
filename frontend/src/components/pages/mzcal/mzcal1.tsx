import React from 'react';
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import mzcalbg1 from "../../../assets/images/mzcalbg1.png";

const MzCal1: React.FC = () => {
  return (
    <motion.section 
      className="mzcal-section"
      style={{ backgroundImage: `url(${mzcalbg1})` }}
      {...variants.section}
    >
      <div className="mzcal-container">
        <motion.h2 
          className="mzcal-title"
          {...variants.title}
        >
          Ignite the Sacred Flame of $MZCAL
        </motion.h2>
        <motion.p 
          className="mzcal-text"
          {...variants.textContent}
        >
          $MZCAL follows a circular economy guided by Kukulcán, balancing emission, distribution, and burns to maintain stable pricing and robust utility.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default MzCal1;
