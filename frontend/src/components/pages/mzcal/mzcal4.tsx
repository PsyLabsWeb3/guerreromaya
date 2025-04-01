import React from 'react';
import { motion } from 'framer-motion';
import { mzcalVariants } from '../../animations/mzcal-variants';

const MzCal4: React.FC = () => {
  return (
    <motion.section 
      className="mzcal-section"
      variants={mzcalVariants.section}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mzcal-container">
        <h3 className="mzcal-subtitle">Circular & Adaptive Economy</h3>
        <p className="mzcal-text">
          The $MZCAL token powers the entire Guerrero Maya ecosystem, integrating an elastic supply model governed by Kukulcán AI. The economy follows a circular structure where tokens are strategically planned, distributed, and burned to maintain long-term stability and engagement
        </p>
      </div>
    </motion.section>
  );
};

export default MzCal4; 