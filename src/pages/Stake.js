import React, { useContext, useState } from "react";
import { DemoContext } from "../context/DemoContext";

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
  stakeBox: {
    backgroundColor: "#1f1f2e",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    maxWidth: "500px",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#9ca3af",
    fontSize: "0.95rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#2c2c3e",
    color: "#fff",
    fontSize: "1rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  button: {
    flex: "1",
    padding: "0.75rem",
    backgroundColor: "#4f46e5",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  rewards: {
    marginTop: "1rem",
    fontSize: "1rem",
    color: "#10b981",
    fontWeight: "bold",
  },
};

const Stake = () => {
  const { balance, staked, stake, unstake } = useContext(DemoContext);

  const [amount, setAmount] = useState("");

  const handleStake = () => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0 && num <= balance) {
      stake(num);
      setAmount("");
    } else {
      alert("Invalid stake amount.");
    }
  };

  const handleUnstake = () => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0 && num <= staked) {
      unstake(num);
      setAmount("");
    } else {
      alert("Invalid unstake amount.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Stake $DEMO</h2>

      <div style={styles.stakeBox}>
        <label style={styles.label}>
          Wallet Balance: {balance.toFixed(2)} $DEMO
        </label>
        <label style={styles.label}>
          Currently Staked: {staked.toFixed(2)} $DEMO
        </label>

        <label style={styles.label}>Amount to Stake/Unstake</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={styles.input}
        />

        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={handleStake}>
            Stake
          </button>
          <button style={styles.button} onClick={handleUnstake}>
            Unstake
          </button>
        </div>

        <div style={styles.rewards}>Rewards: 12.3 $DEMO</div>
      </div>
    </div>
  );
};

export default Stake;
