import React, { useState, useEffect } from "react";

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
    <div
      style={{
        padding: "2rem",
        color: "#fff",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        // backgroundColor removed here to make transparent
      }}
    >
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        My Portfolio
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <Card
          title="Total Supplied"
          value={`$${portfolio.totalSupplied.toLocaleString()}`}
        />
        <Card
          title="Total Borrowed"
          value={`$${portfolio.totalBorrowed.toLocaleString()}`}
        />
        <Card title="Net APY" value={`${portfolio.netAPY}%`} />
      </div>

      <TableSection
        title="Supplied Assets"
        headers={["Asset", "Amount", "APY", "Action"]}
        rows={portfolio.suppliedAssets.map((asset) => [
          asset.asset,
          `${asset.amount} (${asset.usdValue})`,
          asset.apy,
          <button style={actionStyle}>Withdraw</button>,
        ])}
      />

      <TableSection
        title="Borrowed Assets"
        headers={["Asset", "Amount", "APR", "Action"]}
        rows={portfolio.borrowedAssets.map((asset) => [
          asset.asset,
          `${asset.amount} (${asset.usdValue})`,
          asset.apr,
          <button style={{ ...actionStyle, backgroundColor: "#f44336" }}>
            Repay
          </button>,
        ])}
      />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div
    style={{
      backgroundColor: "#1f1f2e",
      borderRadius: "12px",
      padding: "1.25rem 1.5rem",
      flex: "1",
      minWidth: "200px",
      boxShadow: "0 0 8px rgba(0,0,0,0.4)",
    }}
  >
    <div style={{ fontSize: "0.9rem", color: "#aaa" }}>{title}</div>
    <div
      style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "0.5rem" }}
    >
      {value}
    </div>
  </div>
);

const TableSection = ({ title, headers, rows }) => (
  <div style={{ width: "100%", marginBottom: "2rem" }}>
    <h3
      style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}
    >
      {title}
    </h3>
    <div
      style={{
        overflowX: "auto",
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#1f1f2e",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {headers.map((h, idx) => (
              <th
                key={idx}
                style={{
                  textAlign: "left",
                  padding: "1rem",
                  borderBottom: "1px solid #333",
                  color: "#aaa",
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i}>
              {cells.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid #333",
                    fontSize: "0.95rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const actionStyle = {
  padding: "0.4rem 0.8rem",
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Portfolio;
