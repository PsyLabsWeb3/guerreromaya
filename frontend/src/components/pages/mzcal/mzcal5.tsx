import React from 'react';
import { motion } from 'framer-motion';
import { mzcalVariants } from '../../animations/mzcal-variants';

const MzCal5: React.FC = () => {
  return (
    <motion.section 
      className="mzcal-section"
      variants={mzcalVariants.section}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mzcal-container">
        <h3 className="mzcal-subtitle">Token Distribution</h3>
        <div className="mzcal-table">
          <div className="mzcal-table-header">
            <h3 className="mzcal-table-title">Category</h3>
            <h3 className="mzcal-table-title">Allocation ($MZCAL)</h3>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Community Presale</p>
            <p className="mzcal-text">1,000,000</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Game Rewards</p>
            <p className="mzcal-text">250,000,000</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Liquidity Incentives & Staking</p>
            <p className="mzcal-text">200,000,000</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Development & Ecosystem Growth</p>
            <p className="mzcal-text">180,000,000</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Marketing & Community Initiatives</p>
            <p className="mzcal-text">150,000,000</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Treasury Reserve</p>
            <p className="mzcal-text">120,000,000</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Total Supply</p>
            <p className="mzcal-text">1,000,000,000</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MzCal5; 