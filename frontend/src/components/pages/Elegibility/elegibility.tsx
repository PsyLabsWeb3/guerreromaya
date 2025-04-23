import React from "react";
import Elegibility1 from "./elegibility1";
import "./elegibility.css";

/**
 * Main Elegibility Component
 * @description Container component for all elegibility sections
 */
const Elegibility: React.FC = () => {
  return (
    <div className="Elegibility">
      <Elegibility1 />
    </div>
  );
};

export default Elegibility;