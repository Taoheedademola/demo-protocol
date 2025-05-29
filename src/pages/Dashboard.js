import React, { useState, useEffect } from "react";
import axios from "axios";

const styles = {
  container: {
    padding: "1rem 1.5rem",
    color: "#fff",
    maxWidth: "100vw",
    overflowX: "hidden", // prevent horizontal scroll globally
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  cardRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap", // wrap on small screens
    justifyContent: "center",
  },
  card: {
    flex: "1 1 220px", // flexible basis + grow + shrink
    maxWidth: "320px",
    backgroundColor: "#1f1f2e",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 0 8px rgba(0,0,0,0.5)",
    minWidth: 0, // prevent shrinking overflow
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
    overflowX: "hidden", // no horizontal scroll on table container
  },
  tableHeader1: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #444",
    fontSize: "0.85rem",
    color: "#aaa",
    flexWrap: "wrap", // wrap header on small screen
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: "1px solid #333",
    flexWrap: "wrap", // wrap row on small screen
  },
  cell: {
    flex: "1 1 100px", // flexible cells, min 100px
    marginBottom: "0.4rem",
    minWidth: 0,
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
            <span style={styles.cell}>Asset</span>
            <span style={styles.cell}>Collateral</span>
            <span style={styles.cell}>APY</span>
          </div>
          <div style={styles.tableRow}>
            <span style={styles.cell}>No supply positions</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Your Borrows</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader1}>
            <span style={styles.cell}>Asset</span>
            <span style={styles.cell}>APY , APR</span>
            <span style={styles.cell}>Collateral</span>
          </div>
          <div style={styles.tableRow}>
            <span style={styles.cell}>No borrowing positions</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Markets</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader1}>
            <span style={styles.cell}>Asset</span>
            <span style={styles.cell}>Total Supplied</span>
            <span style={styles.cell}>Total Borrowed</span>
            <span style={styles.cell}>Deposit APY</span>
            <span style={styles.cell}>Collateral</span>
          </div>
          {tokenData.map((token, index) => (
            <div style={styles.tableRow} key={index}>
              <span style={styles.cell}>{token.symbol}</span>
              <span style={styles.cell}>{token.supplied}M</span>
              <span style={styles.cell}>{token.borrowed}M</span>
              <span style={styles.cell}>{token.apy}</span>
              <span style={styles.cell}>{token.collateral ? "✅" : "❌"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
