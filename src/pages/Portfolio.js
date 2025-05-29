import React, { useState, useEffect } from "react";

const styles = {
  container: {
    padding: "2rem",
    color: "#fff",
    maxWidth: "100%",
    overflowX: "hidden",
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
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    marginBottom: "2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1f1f2e",
    borderRadius: "10px",
    overflow: "hidden",
    minWidth: "600px",
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
  actionButton: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  repayButton: {
    backgroundColor: "#f44336",
  },
};

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await new Promise((res) =>
        setTimeout(
          () =>
            res({
              totalSupplied: 12300,
              totalBorrowed: 3100,
              netAPY: 4.78,
              suppliedAssets: [
                {
                  asset: "ETH",
                  amount: "1.2 ETH",
                  usdValue: "$3,500",
                  apy: "5.25%",
                },
                {
                  asset: "USDC",
                  amount: "4000 USDC",
                  usdValue: "$4,000",
                  apy: "3.10%",
                },
              ],
              borrowedAssets: [
                {
                  asset: "DAI",
                  amount: "1500 DAI",
                  usdValue: "$1,500",
                  apr: "4.00%",
                },
              ],
            }),
          1000
        )
      );
      setPortfolio(data);
    };

    fetchData();
  }, []);

  if (!portfolio) {
    return (
      <div style={{ color: "#fff", padding: "2rem" }}>Loading portfolio...</div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Portfolio</h2>

      <div style={styles.summaryBox}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Supplied</div>
          <div style={styles.cardValue}>
            ${portfolio.totalSupplied.toLocaleString()}
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Borrowed</div>
          <div style={styles.cardValue}>
            ${portfolio.totalBorrowed.toLocaleString()}
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Net APY</div>
          <div style={styles.cardValue}>{portfolio.netAPY}%</div>
        </div>
      </div>

      <h3 style={styles.sectionTitle}>Supplied Assets</h3>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Asset</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>APY</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.suppliedAssets.map((asset, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{asset.asset}</td>
                <td style={styles.td}>
                  {asset.amount} ({asset.usdValue})
                </td>
                <td style={styles.td}>{asset.apy}</td>
                <td style={styles.td}>
                  <button style={styles.actionButton}>Withdraw</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={styles.sectionTitle}>Borrowed Assets</h3>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Asset</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>APR</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.borrowedAssets.map((asset, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{asset.asset}</td>
                <td style={styles.td}>
                  {asset.amount} ({asset.usdValue})
                </td>
                <td style={styles.td}>{asset.apr}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.actionButton, ...styles.repayButton }}
                  >
                    Repay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
