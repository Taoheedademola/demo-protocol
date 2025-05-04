import React from "react";

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

const earnOpportunities = [
  {
    pool: "ETH Staking",
    apy: "5.25%",
    balance: "0.00 ETH",
  },
  {
    pool: "USDC Vault",
    apy: "3.12%",
    balance: "0.00 USDC",
  },
  {
    pool: "DAI Flex Pool",
    apy: "2.85%",
    balance: "0.00 DAI",
  },
];

const Earn = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Earn</h2>
      <div style={styles.cardGrid}>
        {earnOpportunities.map((item, idx) => (
          <div key={idx} style={styles.card}>
            <div style={styles.cardTitle}>{item.pool}</div>
            <div style={styles.apy}>APY: {item.apy}</div>
            <div style={styles.balance}>Balance: {item.balance}</div>
            <div style={styles.actions}>
              <button style={styles.button}>Deposit</button>
              <button style={styles.button}>Withdraw</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Earn;
