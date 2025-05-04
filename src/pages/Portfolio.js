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
  summaryBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "#1f1f2e",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    flex: "1",
    minWidth: "200px",
    boxShadow: "0 0 8px rgba(0,0,0,0.4)",
  },
  cardTitle: {
    fontSize: "0.9rem",
    color: "#aaa",
  },
  cardValue: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    margin: "1.5rem 0 1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1f1f2e",
    borderRadius: "10px",
    overflow: "hidden",
  },
  th: {
    textAlign: "left",
    padding: "1rem",
    borderBottom: "1px solid #333",
    color: "#aaa",
    fontSize: "0.9rem",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #333",
    fontSize: "0.95rem",
  },
};

const Portfolio = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Portfolio</h2>

      <div style={styles.summaryBox}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Supplied</div>
          <div style={styles.cardValue}>$12,300</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Borrowed</div>
          <div style={styles.cardValue}>$3,100</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Net APY</div>
          <div style={styles.cardValue}>4.78%</div>
        </div>
      </div>

      <h3 style={styles.sectionTitle}>Supplied Assets</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Asset</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>APY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>ETH</td>
            <td style={styles.td}>1.2 ETH ($3,500)</td>
            <td style={styles.td}>5.25%</td>
          </tr>
          <tr>
            <td style={styles.td}>USDC</td>
            <td style={styles.td}>4,000 USDC ($4,000)</td>
            <td style={styles.td}>3.10%</td>
          </tr>
        </tbody>
      </table>

      <h3 style={styles.sectionTitle}>Borrowed Assets</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Asset</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>APR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>DAI</td>
            <td style={styles.td}>1,500 DAI ($1,500)</td>
            <td style={styles.td}>4.00%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
