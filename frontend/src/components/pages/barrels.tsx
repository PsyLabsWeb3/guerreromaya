import { useState } from "react";

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
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
        NFT Barrel Management
      </h2>
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {barrels.map((barrel) => (
          <div
            key={barrel.id}
            style={{
              width: "320px",
              margin: "8px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
            }}
            onClick={() => setSelectedBarrel(barrel)}
          >
            <div style={{ marginBottom: "8px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                {barrel.id}
              </h3>
              <p style={{ fontSize: "14px", color: "#666" }}>
                {barrel.rarity} Edition
              </p>
              <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                <div
                  style={{
                    height: "8px",
                    background: "#eee",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      width: `${(barrel.age / barrel.maturity) * 100}%`,
                      height: "100%",
                      background: "#4caf50",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
                <p style={{ fontSize: "12px", marginTop: "4px" }}>
                  {barrel.age}/{barrel.maturity} months
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "24px",
          marginTop: "24px",
          borderWidth: "1px",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
          Selected Barrel: {selectedBarrel.id}
        </h3>
        <p>APR: {selectedBarrel.apr}%</p>
        <p>Value: ${selectedBarrel.value}</p>
        <p>Status: {selectedBarrel.status}</p>
        <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
            }}
          >
            Sell
          </button>
          <button
            style={{
              backgroundColor: "purple",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
            }}
          >
            Blend
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
            }}
          >
            Stake
          </button>
        </div>
      </div>
    </div>
  );
}
