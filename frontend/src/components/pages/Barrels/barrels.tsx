import { useState } from "react";
import "./barrels.css";

const barrels = [
  {
    id: "BARREL-001",
    age: 24,
    maturity: 48,
    apr: 20,
    rarity: "Gold",
    status: "Aging",
    value: 5000,
  },
  {
    id: "BARREL-002",
    age: 12,
    maturity: 48,
    apr: 18,
    rarity: "Silver",
    status: "Aging",
    value: 4500,
  },
];

export default function BarrelDashboard() {
  const [selectedBarrel, setSelectedBarrel] = useState(barrels[0]);

  return (
    <div className="barrels-container">
      <h2 className="barrels-title">NFT Barrel Management</h2>

      <div className="barrels-grid">
        {barrels.map((barrel) => (
          <div
            key={barrel.id}
            className="barrel-card"
            onClick={() => setSelectedBarrel(barrel)}
          >
            <h3 className="barrel-id">{barrel.id}</h3>
            <p className="barrel-rarity">{barrel.rarity} Edition</p>

            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(barrel.age / barrel.maturity) * 100}%` }}
                ></div>
              </div>
              <p className="progress-text">
                {barrel.age}/{barrel.maturity} months
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="selected-barrel">
        <h3 className="selected-barrel-title">
          Selected Barrel: {selectedBarrel.id}
        </h3>
        <p className="barrel-detail">APR: {selectedBarrel.apr}%</p>
        <p className="barrel-detail">Value: ${selectedBarrel.value}</p>
        <p className="barrel-detail">Status: {selectedBarrel.status}</p>

        <div className="action-buttons">
          <button className="action-button">Sell</button>
          <button className="action-button">Blend</button>
          <button className="action-button">Stake</button>
        </div>
      </div>
    </div>
  );
}
