import React, { useState, useEffect } from "react";
import axios from "axios";

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
  cardRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  card: {
    flex: "1",
    minWidth: "220px",
    backgroundColor: "#1f1f2e",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 0 8px rgba(0,0,0,0.5)",
  },
  cardTitle: {
    fontSize: "0.875rem",
    opacity: 0.7,
    marginBottom: "0.5rem",
  },
  cardValue: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    margin: "2rem 0 1rem",
  },
  table: {
    width: "100%",
    backgroundColor: "#1f1f2e",
    borderRadius: "10px",
    padding: "1rem",
    overflowX: "auto",
  },
  tableHeader: {
    color: "#aaa",
    fontSize: "0.85rem",
    borderBottom: "1px solid #444",
    paddingBottom: "0.5rem",
    marginBottom: "0.5rem",
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: "1px solid #333",
  },
  tableHeader1: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #444",
    fontSize: "0.85rem",
    color: "#aaa",
  },
};

const Dashboard = () => {
  const [tokenData, setTokenData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,binancecoin,xrp,cardano,dogecoin,solana,litecoin,polygon,chainlink",
        },
      })
      .then((response) => {
        const data = response.data.map((token) => ({
          symbol: token.symbol.toUpperCase(),
          name: token.name,
          apy: `${(Math.random() * (20 - 1) + 1).toFixed(2)}%`,
          apr: `${(Math.random() * (10 - 0.5) + 0.5).toFixed(2)}%`,
          supplied: parseFloat((Math.random() * (200 - 50) + 50).toFixed(2)),
          borrowed: parseFloat((Math.random() * (50 - 5) + 5).toFixed(2)),
          collateral: Math.random() > 0.5,
        }));
        setTokenData(data);
      })
      .catch((error) => {
        console.error("Error fetching token data: ", error);
      });
  }, []);

  const totalSupplied = tokenData
    .reduce((sum, t) => sum + t.supplied, 0)
    .toFixed(2);
  const totalBorrowed = tokenData
    .reduce((sum, t) => sum + t.borrowed, 0)
    .toFixed(2);
  const netWorth = (totalSupplied - totalBorrowed).toFixed(2);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard</h2>

      <div style={styles.cardRow}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Net Worth</div>
          <div style={styles.cardValue}>${netWorth}M</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Supply Balance</div>
          <div style={styles.cardValue}>${totalSupplied}M</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Markets</div>
          <div style={styles.cardValue}>{tokenData.length} available</div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Your Supplies</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader1}>
            <span>Asset</span>
            <span>Collateral</span>
            <span>APY</span>
          </div>
          <div style={styles.tableRow}>No supply positions</div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Your Borrows</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader1}>
            <span>Asset</span>
            <span>APY , APR</span>
            <span>Collateral</span>
          </div>
          <div style={styles.tableRow}>No borrowing positions</div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Markets</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader1}>
            <span>Asset</span>
            <span>Total Supplied</span>
            <span>Total Borrowed</span>
            <span>Deposit APY</span>
            <span>Collateral</span>
          </div>
          {tokenData.map((token, index) => (
            <div style={styles.tableRow} key={index}>
              <span>{token.symbol}</span>
              <span>{token.supplied}M</span>
              <span>{token.borrowed}M</span>
              <span>{token.apy}</span>
              <span>{token.collateral ? "✅" : "❌"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
