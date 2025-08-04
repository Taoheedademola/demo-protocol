import React, { useContext } from "react";
import { DemoContext } from "../context/DemoContext";

const styles = {
  container: {
    padding: "1rem 1.5rem",
    color: "#fff",
    maxWidth: "100vw",
    overflowX: "hidden",
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
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    flex: "1 1 220px",
    maxWidth: "320px",
    backgroundColor: "#1f1f2e",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 0 8px rgba(0,0,0,0.5)",
    minWidth: 0,
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
    overflowX: "hidden",
  },
  tableHeader1: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #444",
    fontSize: "0.85rem",
    color: "#aaa",
    flexWrap: "wrap",
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: "1px solid #333",
    flexWrap: "wrap",
  },
  cell: {
    flex: "1 1 100px",
    marginBottom: "0.4rem",
    minWidth: 0,
  },
};

const Dashboard = () => {
  const { suppliedTokens, borrowedTokens, tokenData } = useContext(DemoContext);

  const totalSupplied = suppliedTokens
    ?.reduce((sum, t) => sum + parseFloat(t.supplied || 0), 0)
    .toFixed(2);

  const totalBorrowed = borrowedTokens
    ?.reduce((sum, t) => sum + parseFloat(t.borrowed || 0), 0)
    .toFixed(2);

  const netWorth = (totalSupplied - totalBorrowed).toFixed(2);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard</h2>

      {/* Cards */}
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
          <div style={styles.cardValue}>{tokenData?.length || 0} available</div>
        </div>
      </div>

      {/* Supplies */}
      <div>
        <h3 style={styles.sectionTitle}>Your Supplies</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader1}>
            <span style={styles.cell}>Asset</span>
            <span style={styles.cell}>Collateral</span>
            <span style={styles.cell}>APY</span>
          </div>
          {suppliedTokens?.length > 0 ? (
            suppliedTokens.map((token, index) => (
              <div style={styles.tableRow} key={index}>
                <span style={styles.cell}>{token.symbol}</span>
                <span style={styles.cell}>
                  {token.collateral ? "✅" : "❌"}
                </span>
                <span style={styles.cell}>{token.apy}</span>
              </div>
            ))
          ) : (
            <div style={styles.tableRow}>
              <span style={styles.cell}>No supply positions</span>
            </div>
          )}
        </div>
      </div>

      {/* Borrows */}
      <div>
        <h3 style={styles.sectionTitle}>Your Borrows</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader1}>
            <span style={styles.cell}>Asset</span>
            <span style={styles.cell}>APY , APR</span>
            <span style={styles.cell}>Collateral</span>
          </div>
          {borrowedTokens?.length > 0 ? (
            borrowedTokens.map((token, index) => (
              <div style={styles.tableRow} key={index}>
                <span style={styles.cell}>{token.symbol}</span>
                <span style={styles.cell}>
                  {token.apy} , {token.apr}
                </span>
                <span style={styles.cell}>
                  {token.collateral ? "✅" : "❌"}
                </span>
              </div>
            ))
          ) : (
            <div style={styles.tableRow}>
              <span style={styles.cell}>No borrowing positions</span>
            </div>
          )}
        </div>
      </div>

      {/* Markets */}
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
          {tokenData?.length > 0 ? (
            tokenData.map((token, index) => (
              <div style={styles.tableRow} key={index}>
                <span style={styles.cell}>{token.symbol}</span>
                <span style={styles.cell}>{token.supplied}M</span>
                <span style={styles.cell}>{token.borrowed}M</span>
                <span style={styles.cell}>{token.apy}</span>
                <span style={styles.cell}>
                  {token.collateral ? "✅" : "❌"}
                </span>
              </div>
            ))
          ) : (
            <div style={styles.tableRow}>
              <span style={styles.cell}>No market data available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
