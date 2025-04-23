import React from "react";
import { motion } from "framer-motion";
import { variants } from "../../animations/variants";
import "./elegibility.css";

/**
 * Elegibility1 Component
 * @description First section of the Elegibility page
 */
const Elegibility1: React.FC = () => {
  return (
    <motion.div 
      className="elegibility-section elegibility-1"
      {...variants.section}
    >
      <motion.h2 
        className="elegibility-title"
        {...variants.title}
      >
        Eligibility
      </motion.h2>

      <motion.h3 
        className="elegibility-subtitle"
        {...variants.textContent}
      >
        Check if you are eligible to become a Guerrero Maya
      </motion.h3>

      <motion.div 
        className="elegibility-input-container"
        {...variants.textContent}
      >
        <input
          type="text"
          placeholder="Coming Soon"
          disabled
          className="elegibility-input elegibility-input-disabled"
        />
      </motion.div>
    </motion.div>
  );
};

export default Elegibility1;