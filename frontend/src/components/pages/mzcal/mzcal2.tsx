import React from "react";

const MzCal2: React.FC = () => {
  return (
    <section
      style={{
        background:
          "url('/pillars&wallMASK.png'), linear-gradient(45deg,rgba(0, 13, 26, 0.82),rgb(11, 11, 11))",
        backgroundSize: "cover, cover",
        backgroundBlendMode: "overlay",
      }}
      className="mzcal-section"
    >
      <div className="mzcal-container">
        <h3 className="mzcal-subtitle">Tokenomics</h3>
        <div className="mzcal-table">
          <div className="mzcal-table-header">
            <h3 className="mzcal-table-title">Property</h3>
            <h3 className="mzcal-table-title">Details</h3>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Token Name</p>
            <p className="mzcal-text">MEZCAL</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Ticker</p>
            <p className="mzcal-text">$MZCAL</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Total Supply</p>
            <p className="mzcal-text">1,000,000,000</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Initial Supply</p>
            <p className="mzcal-text">1,000,000</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Network</p>
            <p className="mzcal-text">Mode Network</p>
          </div>
          <div className="mzcal-table-row">
            <p className="mzcal-text bold">Standard</p>
            <p className="mzcal-text">ERC-1155</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MzCal2;
