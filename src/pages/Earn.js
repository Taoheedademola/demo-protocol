"use client";

import React, { useState } from "react";
import { useDemo } from "../context/DemoContext";

const styles = {
  container: {
    padding: "2rem",
    color: "#fff",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  cardGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#1f1f2e",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 0 8px rgba(0,0,0,0.4)",
    minWidth: "260px",
    flex: "1",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  apy: {
    fontSize: "0.95rem",
    color: "#9ca3af",
    marginBottom: "1rem",
  },
  balance: {
    fontSize: "0.85rem",
    marginBottom: "0.75rem",
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
  },
  button: {
    backgroundColor: "#4f46e5",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
};

const Earn = () => {
  const [opportunities, setOpportunities] = useState([
    { pool: "ETH Staking", apy: "5.25%", balance: 0, symbol: "ETH" },
    { pool: "USDC Vault", apy: "3.12%", balance: 0, symbol: "USDC" },
    { pool: "DAI Flex Pool", apy: "2.85%", balance: 0, symbol: "DAI" },
  ]);

  const { userAddress } = useDemo();

  const handleAction = (index, type) => {
    if (!userAddress) return alert("Please connect your wallet first.");

    const input = prompt(`Enter amount to ${type.toLowerCase()}:`);
    const amount = parseFloat(input);
    if (isNaN(amount) || amount <= 0) return alert("Invalid amount!");

    setOpportunities((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const newBalance =
            type === "Deposit"
              ? item.balance + amount
              : Math.max(0, item.balance - amount);
          return { ...item, balance: newBalance };
        }
        return item;
      })
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Earn</h2>
      <div style={styles.cardGrid}>
        {opportunities.map((item, idx) => (
          <div key={idx} style={styles.card}>
            <div style={styles.cardTitle}>{item.pool}</div>
            <div style={styles.apy}>APY: {item.apy}</div>
            <div style={styles.balance}>
              Balance: {item.balance.toFixed(2)} {item.symbol}
            </div>
            <div style={styles.actions}>
              <button
                style={styles.button}
                onClick={() => handleAction(idx, "Deposit")}
              >
                Deposit
              </button>
              <button
                style={styles.button}
                onClick={() => handleAction(idx, "Withdraw")}
              >
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Earn;
