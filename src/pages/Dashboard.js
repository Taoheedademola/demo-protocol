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
};

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard</h2>

      <div style={styles.cardRow}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Net Worth</div>
          <div style={styles.cardValue}>$1200.00</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Supply Balance</div>
          <div style={styles.cardValue}>$0.00</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Markets</div>
          <div style={styles.cardValue}>No markets available</div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Your Supplies</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader}>Asset | APY | Collateral</div>
          <div style={styles.tableRow}>No supply positions</div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Your Borrows</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader}>Asset | APY , APR | Collateral</div>
          <div style={styles.tableRow}>No borrowing positions</div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Markets</h3>
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            Asset | Total Supplied | Total Borrowed | Deposit APY | Collateral
          </div>
          <div style={styles.tableRow}>ETH | 88.09M | 2.341M | 7.67% | ✅</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
